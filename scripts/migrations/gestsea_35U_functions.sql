/*****************************************************************************\
 * Fonctions Devis - Facture - Avoir                                         *
\*****************************************************************************/

--===========================================================================--
-- "Préventionne" (Prévient en cas de problèmes)

CREATE OR REPLACE FUNCTION FC_Prevention_Facturation(IN num_devis integer) RETURNS TEXT AS
$$
DECLARE
  message TEXT;
  d Devis%ROWTYPE;
  r NUMERIC;
  c INTEGER;
  a INTEGER;
BEGIN
  message := '';
  SELECT * FROM Devis WHERE DE_Numero=num_devis INTO d;
  SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO a;
  IF d.so_numero=1 THEN
    SELECT FC_Personne_Reduction(d.PE_Numero,CURRENT_DATE) INTO r;
    -- Adhésion à 10 €
    IF r=0 THEN
      SELECT count(*) FROM lignefacture JOIN facture f USING (FA_Numero) WHERE f.pe_numero=d.pe_numero AND pd_numero=100051 AND fa_date BETWEEN a||'-01-01' AND a||'-12-31' INTO c;
      IF c<=0 THEN
        SELECT count(*) FROM ligne WHERE de_numero=d.de_numero AND pd_numero=100051 INTO c;
        IF c<=0 THEN
          message := message||'La personne n''est pas adhérente et n''a pas payé de cotisation à 10€. Est-ce normal ?\n';
        END IF;
      END IF;
    END IF;
    -- Frais de ports
    SELECT count(*) FROM ligne JOIN produit USING (pd_numero) WHERE de_numero=d.de_numero AND (pd_libelle ilike 'port %' OR pd_libelle ilike '%poste%') INTO c;
    IF c<=0 THEN
      message := message||'Le devis ne contient aucun frais de poste. Est-ce normal ?\n';
    END IF;
    -- Réduction
    IF r!=d.de_reduction THEN
      message := message||'La réduction du devis qui était de '||d.de_reduction||'% est passé à ';
      message := message||r||'%. Faut-il mettre à jour le taux de réduction ?\n';
    END IF;
    message := message||'\n';
  END IF;
  message := message||'Voulez-vous réellement passer ce devis en facture ?';
  RETURN message;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Procedure permettant de passer un devis en facture avec les écritures comptables qui vont bien  --
-- là où il le faut.
--DROP FUNCTION FC_DevisVersFacture(integer);

CREATE OR REPLACE FUNCTION FC_DevisVersFacture(IN num_devis integer) RETURNS integer AS
$$
DECLARE
  num_facture   integer;
  num_societe   integer;
  num_numfact   integer;
  compte        integer;
  locked        boolean;
  montant       numeric;
  estimate      devis%ROWTYPE;
  employee      employe%ROWTYPE;
BEGIN
  SELECT * FROM Devis WHERE DE_Numero=num_devis INTO estimate;
  SELECT * FROM Employe WHERE EM_Numero=current_employe() INTO employee;
  IF NOT employee.EM_Societe_Invoicing THEN
    IF employee.EM_Service_Invoicing THEN
      SELECT em_service FROM Employe WHERE EM_Login=Estimate.created_by INTO compte;
      IF compte!=Employee.EM_Service THEN
        RAISE EXCEPTION 'Vous ne pouvez pas facturer un devis d''une personne d''un autre service.';
      END IF; 
    ELSE
      IF NOT employee.EM_Self_Invoicing THEN
        RAISE EXCEPTION 'Vous ne pouvez pas facturer de devis.';
      ELSIF Estimate.created_by!=Employee.EM_Login THEN
        RAISE EXCEPTION 'Vous ne pouvez pas facturer un devis que vous n''avez pas créé.';
      END IF;
    END IF;
  END IF;

  SELECT count(*) FROM Devis WHERE DE_Numero=num_devis INTO compte;
  IF compte<=0 THEN
    RAISE EXCEPTION 'Ce numéro de devis ne correspond à aucun devis existant.';
    RETURN 1;
  END IF;
-- On verifie que l'on a un nombre de ligne>0
  SELECT count(*) FROM Ligne WHERE DE_Numero=num_devis INTO compte;
  IF compte<=0 THEN
    RAISE EXCEPTION 'Ce devis ne contient pas lignes. Il n''est pas possible de le passer en facturation.';
    RETURN 1;
  END IF;
-- On verifie que le devis n'est pas déjà passé en facture
  SELECT DE_Locked, so_numero FROM Devis WHERE DE_Numero=num_devis INTO locked, num_societe;
  IF locked THEN
    RAISE EXCEPTION 'Ce devis a déjà été passé en facturation. Il n''est plus possible de recommencer l''opération.';
    RETURN 0;
  END IF;

-- Récupération des numéros
  SELECT nextval('seq_facture') into num_facture;
  SELECT fc_nextval(sq_numero) FROM societe where so_numero = num_societe INTO num_numfact;
-- Creation de la facture
  insert into facture (fa_numero, pe_numero, fa_date, fa_reduction, fa_libelle, fa_numfact, fa_montantht, fa_montantttc, de_numero, ag_numero, ad_numero)
    select num_facture, pe_numero, current_date, de_reduction, de_libelle, num_numfact, de_montantht, de_montantttc, de_numero, em_agent, ad_numero
      from devis join employe using (em_numero) where de_numero = num_devis;
-- Création des lignes de la facture
  insert into lignefacture (fa_numero, pd_numero, lf_montantht, lf_montantttc, lf_quantite, px_numero, lf_notes, pe_numero)  
    select num_facture, pd_numero, l_montantht, l_montantttc, l_quantite, px_numero, l_notes, pe_numero
      from ligne where de_numero = num_devis;

-- Verrouillage le devis
  UPDATE devis SET de_locked=true WHERE de_numero=num_devis;
 return num_facture;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Réalise seulement les écritures comptables en fonction d'une facture
-- en mode administrateur
--DROP FUNCTION FC_FactureVersCompta(integer);

CREATE OR REPLACE FUNCTION FC_FactureVersCompta(integer) RETURNS integer AS
$$
DECLARE
  num_facture ALIAS FOR $1;
  date_facture date;
  num_societe  integer;
  num_numfact  integer;
  num_exercice integer;
  nom_journal  text;
  num_journal  integer;
  num_piece    integer;
  num_personne integer;
  nom_personne text;
  compte       integer;
  montant      numeric;
BEGIN
--  RAISE NOTICE ':: %',num_facture;
-- On recupere la societe
  SELECT so_numero FROM table_facture WHERE fa_numero=num_facture INTO num_societe;

-- On verifie que l'on a un nombre de ligne>0
  SELECT Count(*) FROM table_LigneFacture WHERE fa_Numero=num_facture INTO compte;
  IF compte<=0 THEN
    RAISE NOTICE '[VIDE] %',num_facture;
    RETURN 1;
  END IF;
-- On verifie que l'on a pas de compte auxilaires bidon (si la requete plante c'est que y'a des trucs mauvais)
  SELECT count(to_number(ca_numcompte::text, '99999999'::text)) FROM table_compteaux LEFT JOIN table_comptegen USING (cg_numero) WHERE so_numero=num_societe INTO compte;
-- On vérifie que le client a un compte auxiliaire et on lui crée si nécessaire
  SELECT pe_numero  FROM table_facture  WHERE fa_numero=num_facture  INTO num_personne;
  SELECT COALESCE(pe_titre||' ','')||COALESCE(pe_nom||' ','')||COALESCE(pe_prenom,'') AS pe_libelle FROM table_personne WHERE pe_numero=num_personne INTO nom_personne;
  SELECT count(*) FROM table_CompteAux LEFT JOIN table_CompteGen USING (cg_numero) WHERE so_numero=num_societe AND cg_numcompte=4110000 AND num_personne-1000000 = to_number(ca_numcompte, '9999999999') INTO compte;
  IF compte>1 THEN
    RAISE NOTICE '[2CPT] %',num_facture;
    RETURN 3;
  ELSIF compte<1 THEN
    INSERT INTO table_CompteAux(ca_numero, cg_numero, ca_numcompte, ca_libelle, ac_numero, ca_debit)
      SELECT nextval('seq_compteaux'), cg_numero, to_char(num_personne-1000000,'FM0000009'),nom_personne,ac_numero,true
        FROM table_comptegen
        WHERE cg_numcompte=4110000 AND so_numero=num_societe;
  END IF;

-- lance les ecritures dans la compta si montant ttc > 0
  SELECT fa_MontantTTC FROM table_facture WHERE fa_numero=num_facture INTO montant;
  IF montant<=0 THEN
    RAISE NOTICE '[ZERO] %',num_facture;
  END IF;
  SELECT count(*) from table_lignefacture where pd_numero is not null and fa_numero=num_facture INTO compte;
  IF compte<=0 THEN
    RAISE NOTICE '[PASP] %',num_facture;
  END IF;
  IF montant>0 AND compte>0 THEN
---- Création de la pièce
------ numéro de l'exercice actif pour la societe en cours
    SELECT ex_numero from table_exercice where ex_actif is true and so_numero = num_societe INTO num_exercice;

------ libelle de la piece + numéro du journal concerné
    SELECT DISTINCT jo_abbrev, jo_numero 
      FROM table_lignefacture join table_produit using (pd_numero) join table_journal using (jo_numero)
      WHERE fa_numero = num_facture
      INTO nom_journal, num_journal;

    SELECT fa_date from table_facture where fa_numero = num_facture INTO date_facture; -- date
    SELECT nextval('seq_piece') INTO num_piece;                                  -- numéro de la piece

    -- insertion
    INSERT INTO table_piece(pi_numero, pi_libelle, pi_date, jo_numero, pi_numpiece, ex_numero)
              VALUES (num_piece, '['||num_personne||'] '||nom_journal|| ' du ' || date_facture, date_facture, num_journal, num_piece, num_exercice);

---- Création des écritures
  -- TVA
  insert into table_ecriture(ec_numero, ec_libelle, ec_credit, ec_debit, pi_numero, cg_numero, ec_aux, pf_numero, ca_numero, fa_numero, ex_numero)
    select nextval('seq_ecriture'), 'Total TVA '||tv_taux||'%', montantTVA, 0, num_piece, cg_numero, false, 1,  NULL, num_facture,num_exercice
      from vue_tousmontantsTVA join table_comptegen using (cg_numero)
      where fa_numero = num_facture and table_comptegen.so_numero = num_societe;
  -- Ecriture
  INSERT INTO table_ecriture(ec_numero, ec_libelle, ec_debit, pi_numero, cg_numero, ec_aux, pf_numero, ec_credit,fa_numero, ex_numero)
    SELECT nextval('seq_ecriture'), PD_Libelle, 0, num_piece, cg_numero, false, 1, LF_MontantHT, num_facture, num_exercice
      from table_facture join table_lignefacture using (fa_numero) join table_produit using (pd_numero) join table_compteproduit using (pd_numero)
      where fa_numero = num_facture and ci_actif = true;
  -- Contre-partie
  insert into table_ecriture(ec_numero, ec_libelle, ec_debit, pi_numero, cg_numero, ca_numero, ec_aux, pf_numero, ec_credit,fa_numero,ex_numero)
    select nextval('seq_ecriture'), '['||COALESCE(ca_numcompte,'XXXXXXX')||']['||COALESCE(fa_numfact,9999999999)
||'] '||COALESCE(pe_nom||' ','')||COALESCE(pe_prenom||' ','')||COALESCE('('||pe_titre||')',''), 
sum(LF_MontantTTC), num_piece, cg_numero, ca_numero, true, 1, 0, num_facture, num_exercice
      from
        table_facture join table_lignefacture using (fa_numero) 
                      join table_produit using (pd_numero)
                      join table_compteaux on (pe_numero-1000000 = to_number(ca_numcompte, '9999999999'))
                      join table_comptegen using (cg_numero)
                      join table_personne using (pe_numero)
      where fa_numero=num_facture AND table_comptegen.so_numero = table_facture.so_numero  and table_comptegen.cg_numcompte=4110000
      group by fa_numero,ca_numero,fa_numfact,cg_numero,ca_numcompte, pe_nom,pe_prenom, pe_titre;

  END IF;

  return num_piece;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

--===========================================================================--
-- Réalise seulement les écritures comptables en fonction d'un avoir
-- en mode administrateur
--DROP FUNCTION FC_AvoirVersCompta(integer);

CREATE OR REPLACE FUNCTION FC_AvoirVersCompta(integer) RETURNS integer AS
$$
DECLARE
  num_avoir ALIAS FOR $1;
  num_facture  integer;
  date_facture date;
  date_avoir   date;
  num_societe  integer;
  num_personne integer;
  nom_personne text;
  num_numfact  integer;
  num_exercice integer;
  nom_journal  text;
  num_journal  integer;
  num_piece    integer;
  compte       integer;
  montant      numeric;
BEGIN
--  RAISE NOTICE ':: %',num_facture;
-- On recupere la societe
  SELECT so_numero FROM table_avoir left join table_facture using (fa_numero) WHERE av_numero=num_avoir INTO num_societe;

  SELECT fa_numero FROM table_facture INTO num_facture;

-- On verifie que l'on a un nombre de ligne>0
  SELECT Count(*) FROM table_LigneAvoir WHERE av_Numero=num_avoir INTO compte;
  IF compte<=0 THEN
    RAISE NOTICE '[VIDE] %',num_avoir;
    RETURN 1;
  END IF;
-- On verifie que l'on a pas de compte auxilaires bidon (si la requete plante c'est que y'a des trucs mauvais)
  SELECT count(to_number(ca_numcompte::text, '99999999'::text)) FROM table_compteaux LEFT JOIN table_comptegen USING (cg_numero) WHERE so_numero=num_societe INTO compte;
-- On vérifie que le client a un compte auxiliaire et on lui crée si nécessaire
  SELECT pe_numero  FROM table_avoir LEFT JOIN table_facture USING (fa_numero) WHERE av_numero=num_avoir  INTO num_personne;
  SELECT COALESCE(pe_titre||' ','')||COALESCE(pe_nom||' ','')||COALESCE(pe_prenom,'') AS pe_libelle FROM table_personne WHERE pe_numero=num_personne INTO nom_personne;
  SELECT count(*) FROM table_CompteAux LEFT JOIN table_CompteGen USING (cg_numero) WHERE so_numero=num_societe AND cg_numcompte=4110000 AND num_personne-1000000 = to_number(ca_numcompte, '9999999999') INTO compte;
  IF compte>1 THEN
    RAISE NOTICE '[2CPT] %',num_avoir;
    RETURN 3;
  ELSIF compte<1 THEN
    INSERT INTO table_CompteAux(ca_numero, cg_numero, ca_numcompte, ca_libelle, ac_numero, ca_debit)
      SELECT nextval('seq_compteaux'), cg_numero, to_char(num_personne-1000000,'FM0000009'),nom_personne,ac_numero,true
        FROM table_comptegen
        WHERE cg_numcompte=4110000 AND so_numero=num_societe;
  END IF;

-- lance les ecritures dans la compta si montant ttc > 0
  SELECT av_MontantTTC FROM table_avoir WHERE av_numero=num_avoir INTO montant;
  IF montant<=0 THEN
    RAISE NOTICE '[ZERO] %',num_avoir;
  END IF;
  SELECT count(*) from table_ligneavoir where pd_numero is not null and av_numero=num_avoir INTO compte;
  IF compte<=0 THEN
    RAISE NOTICE '[PASP] %',num_avoir;
  END IF;
  IF montant>0 AND compte>0 THEN
---- Création de la pièce
------ numéro de l'exercice actif pour la societe en cours
    SELECT ex_numero from table_exercice where ex_actif is true and so_numero = num_societe INTO num_exercice;

------ libelle de la piece + numéro du journal concerné
    SELECT DISTINCT jo_abbrev, jo_numero 
      FROM table_ligneavoir join table_produit using (pd_numero) join table_journal using (jo_numero)
      WHERE av_numero = num_avoir
      INTO nom_journal, num_journal;

    SELECT fa_date from table_avoir where fa_numero = num_avoir INTO date_avoir; -- date
    SELECT nextval('seq_piece') INTO num_piece;                                  -- numéro de la piece

    -- insertion
    insert into piece(pi_numero, pi_libelle, pi_date, jo_numero, pi_numpiece, ex_numero)
       values (num_piece, 'AVOIR '||nom_journal || ' DU ' || date_avoir, date_avoir, num_journal, num_piece, num_exercice);

    --- Création des écritures inverses
    insert into table_ecriture(ec_numero, ec_libelle, ec_debit, pi_numero, cg_numero, ca_numero, ec_aux, pf_numero, ec_credit, ex_numero, av_numero)
    select nextval('seq_ecriture'), '(A)'||ec_libelle, ec_credit, num_piece, cg_numero, ca_numero, ec_aux, 3, ec_debit, num_exercice, num_avoir
    from table_ecriture
      where fa_numero = num_facture;

  END IF;

  return num_piece;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Permet de faire un avoir global sur une facture
--DROP FUNCTION FC_FactureVersAvoir(integer);

CREATE OR REPLACE FUNCTION FC_FactureVersAvoir(integer) RETURNS integer AS
$$
DECLARE
  num_facture ALIAS FOR $1;
  nom_seq      text;
  num_societe  integer;
  num_avoir    integer;
  date_avoir   date;
  num_numfact  integer;
  num_exercice integer;
  nom_journal  text;
  num_journal  integer;
  num_piece    integer;
  compte       integer;
  montant      numeric;
BEGIN
  -- Vérifie que la facture ne soit pas déjà passée en avoir
  SELECT count(*) from avoir WHERE fa_numero=num_facture INTO compte;
  IF compte>0 THEN
    RAISE EXCEPTION 'Cette facture a déjà été passée en avoir, il n''est pas possible de recommencer';
  END IF;

  -- Copie des données de la facture
  select into num_avoir nextval('seq_avoir');

  select current_societe() into num_societe;
  num_numfact:=num_avoir;    


  --- Base de la facture
  insert into avoir (av_numero, pe_numero, fa_numero, av_date, av_reduction, av_numfact, av_montantht, av_montantttc)
  select num_avoir, pe_numero, fa_numero, current_date, fa_reduction, num_numfact, fa_montantht, fa_montantttc
    from facture
    where fa_numero = num_facture;

  --- Lignes de la facture
  insert into ligneavoir (av_numero, pd_numero, la_numero, la_montantht, la_montantttc, la_quantite, px_numero, pe_numero)
  select num_avoir, pd_numero, nextval('seq_lignefacture'), lf_montantht, lf_montantttc, lf_quantite, px_numero, pe_numero
    from lignefacture
    where fa_numero = num_facture;

  SELECT COALESCE(fa_montantttc,0) FROM facture where fa_numero=num_facture INTO montant;
  IF montant<=0 THEN
    RAISE NOTICE 'La facture étant à zéro elle ne passera pas en comptabilité.';
  END IF;

  IF montant>0 THEN
  -- Passage en comptabilité
    --- Création de la pièce
    ---- Numéro de l'exercice actif pour la societe en cours
    select ex_numero from exercice where ex_actif is true and so_numero = num_societe into num_exercice;

    ---- Libelle de la piece + numéro du journal concerné
    select distinct jo_abbrev, jo_numero
        from ligneavoir join produit using (pd_numero) join journal using (jo_numero)
        where av_numero = num_avoir    
    into nom_journal, num_journal;

    select av_date from avoir where av_numero = num_avoir into date_avoir;
    select nextval('seq_piece') into num_piece;

    insert into piece(pi_numero, pi_libelle, pi_date, jo_numero, pi_numpiece, ex_numero)
       values (num_piece, 'AVOIR '||nom_journal || ' DU ' || date_avoir, date_avoir, num_journal, num_piece, num_exercice);

    --- Création des écritures inverses

    insert into ecriture(ec_numero, ec_libelle, ec_debit, pi_numero, cg_numero, ca_numero, ec_aux, pf_numero, ec_credit, ex_numero, av_numero)
    select nextval('seq_ecriture'), '(A)'||ec_libelle, ec_credit, num_piece, cg_numero, ca_numero, ec_aux, 3, ec_debit, num_exercice, num_avoir
    from ecriture
      where fa_numero = num_facture;

  END IF;
  -- Fin
  select so_sequence from societe where so_numero = num_societe into nom_seq;
  select nextval(nom_seq) into num_numfact;
  UPDATE Avoir SET av_numfact=num_numfact WHERE av_numero=num_avoir;
  return num_numfact;
END
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Permet de valider de manière définitive un règlement
-- En mode administrateur pour plus de fiabilité et de rapidité
--DROP FUNCTION FC_ReglementVersCompta(integer);

CREATE OR REPLACE FUNCTION FC_ReglementVersCompta(integer) RETURNS integer AS
$$
DECLARE
  num_reglement  ALIAS FOR $1;
  num_personne   integer;
  num_exercice   integer;
  num_journal    integer;
  num_piece      integer;
  num_societe    integer;
  num_employe    integer;
  num_service    integer;
  nom_personne   text;
  date_reglement date;
  cg_reglement   integer;
  compte         integer;
  total          numeric;
  total_reparti  numeric;
  total_abs      numeric;
  total_local    numeric;
  r              record;
  troptard       boolean;
BEGIN
  SELECT pe_numero, rg_montant, rg_date, current_societe(), cg_numero, rg_encompta 
    FROM reglement LEFT JOIN modereglement USING (MR_Numero) 
    WHERE rg_numero=num_reglement 
    INTO num_personne, total, date_reglement, num_societe, cg_reglement, troptard;

  SELECT COALESCE(sum(COALESCE(rp_montant,0)),0) AS reparti, COALESCE(sum(abs(COALESCE(rp_montant,0))),0) 
    FROM repartition 
    WHERE rg_numero=num_reglement 
    INTO total_reparti, total_abs;

  -- Vérifications
  IF troptard THEN
    RAISE EXCEPTION 'Le réglement a déjà été validé en comptabilité.';
  END IF;

  total_local:=total-total_reparti;

  IF total_reparti<0  OR total_reparti<>total_abs THEN
    RAISE EXCEPTION 'Les reversements ont des montants suspects voir incorrects. Veuillez vérifier et corriger.';
  END IF;

  IF total_local<0 THEN
    RAISE EXCEPTION 'Attention les reversements du reglèment sont plus important que la valeur du montant total.';
  END IF;

  SELECT em_numero, em_service FROM employe WHERE em_login=current_user INTO num_employe, num_service;

  FOR r IN SELECT so_numero FROM (SELECT num_societe AS SO_Numero UNION SELECT MP_Societe AS SO_Numero FROM ModeRepartition) as socie LOOP
    UPDATE employe SET em_service=se_numero FROM service WHERE se_societe=r.so_numero and em_numero=num_employe;    
    SELECT count(*) FROM exercice WHERE ex_actif INTO compte; 
    IF compte<1 THEN
      RAISE EXCEPTION 'Il existe pas d''exercice en cours. Or il doit en exister un seul. Veuillez régulariser la situation.';
    ELSIF compte>1 THEN
      RAISE EXCEPTION 'Il existe plus d''un exercice en cours. Or il ne doit en exister qu''un seul. Veuillez régulariser la situation.';
    END IF;
    SELECT count(*) FROM journal WHERE tj_numero=2 INTO compte;
    IF compte<1 THEN
      INSERT INTO journal (jo_numero, jo_abbrev, jo_libelle, tj_numero) VALUES (nextval('seq_journal'), 'BC', 'Banques', 2);
    ELSIF compte>1 THEN
      RAISE EXCEPTION 'Il existe plus d''un journal de banque. Or il ne doit en exister qu''un seul. Veuillez régulariser la situation.';
    END IF;
    SELECT count(*) FROM CompteGen WHERE cg_numcompte=4110000 INTO compte;
    IF compte<1 THEN
      INSERT INTO comptegen (cg_numero, cg_numcompte, cg_libelle, ac_numero) VALUES (nextval('seq_comptegen'), 4110000, 'Clients', 1);
    ELSIF compte>1 THEN
      RAISE EXCEPTION 'Il existe plus d''un compte général client. Or il ne doit en exister qu''un seul. Veuillez régulariser la situation.';
    END IF;
    SELECT count(*) FROM CompteAux LEFT JOIN CompteGen USING (cg_numero) 
      WHERE cg_numcompte=4110000 and num_personne-1000000 = to_number(ca_numcompte, '9999999999') INTO compte;
    IF compte>1 THEN
      RAISE EXCEPTION 'La personne % possède plus d''un compte. Veuillez régulariser la situation.',num_personne;
    ELSIF compte<1 THEN
      SELECT pe_fullname FROM personne WHERE pe_numero=num_personne INTO nom_personne;
      INSERT INTO CompteAux(ca_numero, cg_numero, ca_numcompte, ca_libelle, ac_numero, ca_debit)
        SELECT nextval('seq_compteaux'), cg_numero, to_char(num_personne-1000000,'FM0000009'),nom_personne,ac_numero,true
          FROM comptegen
          WHERE cg_numcompte=4110000;
    END IF;
  END LOOP;

  SELECT nextval('seq_piece') INTO num_piece;
  SELECT jo_numero FROM journal WHERE tj_numero=2 INTO num_journal;
  SELECT ex_numero FROM exercice WHERE ex_actif INTO num_exercice;

-- Création de la comptabilité
  UPDATE employe SET em_service=num_service WHERE em_numero=num_employe;

  INSERT INTO piece (pi_numero, pi_libelle, pi_date, jo_numero, pi_numpiece, ex_numero)
    VALUES (num_piece, '['||num_personne||'] Règlement du '||date_reglement, date_reglement, num_journal, num_piece, num_exercice);

-- Ecriture dans la societe en cours
  INSERT INTO ecriture (ec_numero, ec_libelle, ec_credit, ec_debit, pi_numero, cg_numero, ec_aux, ca_numero, ex_numero, rg_numero, pf_numero)
    SELECT nextval('seq_ecriture'), '['||num_personne||'] Versement', total_local, 0, num_piece, cg_numero, true, ca_numero, num_exercice, num_reglement, 2
      FROM compteaux JOIN comptegen USING (cg_numero)
      WHERE cg_numcompte=4110000 AND num_personne-1000000 = to_number(ca_numcompte, '9999999999');

  FOR r IN SELECT rp_montant, cg_numero, mp_societe, so_libelle FROM repartition LEFT JOIN moderepartition USING (MP_Numero) LEFT JOIN societe USING (SO_Numero) WHERE rg_numero=num_reglement LOOP
    INSERT INTO ecriture (ec_numero, ec_libelle, ec_credit, ec_debit, pi_numero, cg_numero, ec_aux, ca_numero, ex_numero, rg_numero, pf_numero)
      VALUES (nextval('seq_ecriture'), '['||num_personne||'] Versement ('||r.so_libelle||')', r.rp_montant, 0, num_piece, r.cg_numero, false, NULL, num_exercice, num_reglement, 2);
  END LOOP;

  INSERT INTO ecriture (ec_numero, ec_libelle, ec_credit, ec_debit, pi_numero, cg_numero, ec_aux, ca_numero, ex_numero, rg_numero, pf_numero)
    VALUES (nextval('seq_ecriture'), '['||num_personne||'] Total réglé', 0, total, num_piece, cg_reglement, false, NULL, num_exercice, num_reglement, 2);

-- Ecritures pour les autres sociétés
  SELECT count(*)  FROM repartition WHERE rg_numero=num_reglement INTO compte;
  IF compte>0 THEN
    FOR r IN SELECT mp_societe, rp_montant FROM repartition JOIN moderepartition USING (MP_Numero) WHERE rg_numero=num_reglement LOOP
      IF num_societe<>r.mp_societe THEN
        UPDATE employe SET em_service=se_numero FROM service WHERE se_societe=r.mp_societe and em_numero=num_employe;
        SELECT nextval('seq_piece') INTO num_piece;
        SELECT jo_numero FROM journal WHERE tj_numero=2 INTO num_journal;
        SELECT ex_numero FROM exercice WHERE ex_actif INTO num_exercice;

        INSERT INTO piece (pi_numero, pi_libelle, pi_date, jo_numero, pi_numpiece, ex_numero)
          VALUES (num_piece, '['||num_personne||'] Règlement du '||date_reglement, date_reglement, num_journal, num_piece, num_exercice);

        INSERT INTO ecriture (ec_numero, ec_libelle, ec_credit, ec_debit, pi_numero, cg_numero, ec_aux, ca_numero, ex_numero, rg_numero, pf_numero)
          SELECT nextval('seq_ecriture'), '['||num_personne||'] Versement', r.rp_montant, 0, num_piece, cg_numero, true, ca_numero, num_exercice, num_reglement, 2
            FROM compteaux JOIN comptegen USING (cg_numero)
            WHERE cg_numcompte=4110000 AND num_personne-1000000 = to_number(ca_numcompte, '9999999999');

        SELECT cg_numero FROM ModeRepartition WHERE MP_Societe=num_societe INTO cg_reglement;

        INSERT INTO ecriture (ec_numero, ec_libelle, ec_credit, ec_debit, pi_numero, cg_numero, ec_aux, ca_numero, ex_numero, rg_numero, pf_numero)
          VALUES (nextval('seq_ecriture'), '['||num_personne||'] Total à régler', 0, r.rp_montant, num_piece, cg_reglement, false, NULL, num_exercice, num_reglement, 2);
      END IF;
    END LOOP;
  END IF;

  UPDATE employe SET em_service=num_service WHERE em_numero=num_employe;

  UPDATE reglement SET rg_encompta=true WHERE rg_numero=num_reglement;

  RETURN num_reglement;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


/*****************************************************************************\
 * Fonctions Comptabilité                                                    *
\*****************************************************************************/


--===========================================================================--
-- Permet de cloturer un mois (mois/année) d'un journal
--DROP FUNCTION FC_ClotureJournal(integer,integer,integer);

CREATE OR REPLACE FUNCTION FC_ClotureJournal(integer,integer,integer) RETURNS integer AS
$$
DECLARE
  num_journal alias for $1;
  mois alias for $2;
  annee alias for $3;
  ok boolean;
  derniere record;
BEGIN
  SELECT jo_mois,jo_annee FROM journal WHERE jo_numero=num_journal INTO derniere;
  IF FC_Cloture(mois,annee)<FC_Cloture(derniere.jo_mois,derniere.jo_annee) THEN
    RAISE EXCEPTION 'Il n''est pas possible de décloturer un journal aussi facilement.';
  END IF;
  SELECT COALESCE(sum(pi_credit)=sum(pi_debit),true) FROM piece 
    WHERE jo_numero=num_journal AND pi_date<FC_Cloture(mois,annee) INTO ok;
  IF ok THEN
    UPDATE Journal SET jo_mois=mois, jo_annee=annee WHERE jo_numero=num_journal;
  ELSE
    RAISE EXCEPTION 'Le journal n''est pas équilibré jusqu'' à la date de cloture.';
  END IF;
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


/*****************************************************************************\
 * Fonctions Routage                                                         *
\*****************************************************************************/

--===========================================================================--
-- Permet de lancer un routage groupé à partir des catégories d'attributs
--DROP FUNCTION FC_RoutageCategorie(integer,integer);

CREATE OR REPLACE FUNCTION FC_RoutageCategorie(integer,integer,integer,integer) RETURNS integer AS
$$
DECLARE
  num_facture   ALIAS FOR $1;
  num_categorie ALIAS FOR $2;
  num_debut     ALIAS FOR $3;
  num_fin       ALIAS FOR $4;
  compte1       integer;
  compte2       integer;
BEGIN
  SELECT count(distinct pe_numero) 
    FROM attribut JOIN adresse USING (PE_Numero)
    WHERE ad_active AND cr_numero=num_categorie
    INTO compte1;
  SELECT count(distinct pe_numero) 
    FROM attribut LEFT JOIN adresse USING (PE_Numero)
    WHERE ad_active AND cr_numero=num_categorie
    INTO compte2;
  IF compte1<>compte2 THEN
    RAISE EXCEPTION 'Attention des personnes sont sans adresse.';
  END IF;
  INSERT INTO routage (ro_numero, ad_numero, pe_numero, ro_debutservice, ro_finservice, ro_quantite, fa_numero)
    SELECT nextval('seq_routage'), ad_numero, pe_numero, num_debut, num_fin, 1, num_facture
      FROM attribut JOIN adresse USING (PE_Numero)
      WHERE ad_active AND cr_numero=num_categorie;
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



/*****************************************************************************\
 * Fonctions Coupon-Réponse                                                  *
\*****************************************************************************/


--===========================================================================--
-- Procedure permettant d'enregistrer facilement des coupons-réponses standard
--           DROP FUNCTION FC_Cotisation_vers_facture(integer);

--  
CREATE OR REPLACE FUNCTION FC_cotisation_vers_facture(IN num_cotisation INTEGER) RETURNS BOOLEAN AS
$$
DECLARE
  num_gerance personne.pe_numero%TYPE;
  num_payeur personne.pe_numero%TYPE;
--  num_societe societe.so_numero%TYPE;
  num_service service.se_numero%TYPE;
  num_employe employe.em_numero%TYPE;
  num_encaisseur employe.em_numero%TYPE;
  num_groupe impressiongroupe.ig_numero%TYPE;
  num_adresse     adresse.ad_numero%TYPE;
  num_devis       devis.de_numero%TYPE;
  num_devis_fdsea devis.de_numero%TYPE;
  num_devis_sacea devis.de_numero%TYPE;
  num_devis_aava  devis.de_numero%TYPE;
  num_facture_fdsea facture.fa_numero%TYPE;
  num_facture_sacea facture.fa_numero%TYPE;
  num_facture_aava  facture.fa_numero%TYPE;
  num_produit produit.pd_numero%TYPE;
  num_prix prix.px_numero%TYPE;
  num_reglement reglement.rg_numero%TYPE;
  total NUMERIC;
  complement NUMERIC;
  total_fdsea NUMERIC;
  total_sacea NUMERIC;
  total_aava  NUMERIC;
  total_dons  NUMERIC;
  detail cotisation.cs_detail%TYPE;
  detail2 cotisation.cs_detail%TYPE;
  cotis cotisation%ROWTYPE;
  valid BOOLEAN;
  hectare BOOLEAN;
  report TEXT;
  i INTEGER;
BEGIN
--  RAISE EXCEPTION 'La procedure de traitement des cotisations est en cours de developpement.';
  SELECT * FROM cotisation WHERE cs_numero=num_cotisation INTO cotis;
  IF cotis.cs_numero IS NULL THEN
    RAISE EXCEPTION 'La cotisation n°% n''existe pas.', num_cotisation;
  END IF;
  IF cotis.cs_done THEN
    RETURN true;
  END IF;
  detail := cotis.cs_detail;
  SELECT pe_numero FROM table_personne WHERE bml_extract(detail, 'cotisation.societe')=pe_numero::text INTO num_gerance;

  IF bml_extract(detail,'cotisation.type')='ja' THEN
    RAISE EXCEPTION 'Ohohohohoho pas de JA maintenant !';
    UPDATE table_cotisation SET cs_done=true, cs_societe=num_gerance, cs_valid = true, cs_report='*** JA ***' WHERE cs_numero=num_cotisation;
    RETURN true;
  ELSIF bml_extract(detail,'cotisation.type') NOT IN ('standard', 'conjoint', 'associe') THEN
--    RAISE EXCEPTION 'La procedure de traitement des cotisations est en cours de developpement.';
    UPDATE table_cotisation SET cs_done=false, cs_valid = false, cs_report=bml_extract(detail,'cotisation.type') WHERE cs_numero=num_cotisation;
    RETURN false;
  END IF;


  -- Validation
  report := '**************';
  SELECT nextval('seq_impressiongroupe') INTO num_groupe;
  INSERT INTO table_impressiongroupe (ig_numero, il_numero, ig_date) VALUES (num_groupe,1,CURRENT_DATE);
  UPDATE cotisation SET ig_numero=num_groupe WHERE cs_numero=num_cotisation;
  detail := bml_put(detail,'cotisation.impression.groupe',num_groupe);
  IF bml_extract(detail,'conjoint') THEN
    UPDATE cotisation SET CS_Duo=true WHERE CS_Numero=num_cotisation;
  END IF;

  SELECT rg_numero, em_numero, pe_numero FROM table_reglement WHERE rg_numero LIKE bml_extract(detail,'reglement.numero') INTO num_reglement, num_encaisseur, num_payeur;
  IF num_reglement IS NULL THEN
    report := report||E'\nPas de réglement :\n'||detail;
    UPDATE table_cotisation SET cs_valid = false, cs_report=report WHERE cs_numero=num_cotisation;
    RETURN false;
  END IF;

  num_payeur := cotis.pe_numero;
  IF num_gerance IS NOT NULL THEN
    num_payeur := num_gerance;
  END IF;

  -- Sauvegarde du statut de l'utilisateur
  SELECT EM_Service, EM_Numero FROM Employe WHERE em_login=CURRENT_USER INTO num_service, num_employe;

  -- Devis FDSEA
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=2;
  SELECT nextval('seq_devis') INTO num_devis;
  detail := bml_put(detail,'fdsea.devis',num_devis);
  report := report||E'\nDevis FDSEA N°'||num_devis;
  INSERT INTO devis (de_numero, pe_numero, de_libelle, em_numero) VALUES (num_devis, num_payeur, '[CR] Cotisation du '||CURRENT_DATE, num_encaisseur);
  hectare := false;
  IF bml_extract(detail,'fdsea.hectare')='true' THEN
    FOR i IN 1..bml_extract(detail,'fdsea.hectare.nombre') LOOP
      report := report||E'\nCotisation hectare N°'||i;
      SELECT px_numero FROM prix WHERE pd_numero=bml_extract(detail,'fdsea.hectare.'||i||E'.produit') INTO num_prix;
      IF num_prix IS NULL THEN
        report := report||E' : Pas de prix actifs';
        UPDATE table_cotisation SET cs_valid = false, cs_report=report WHERE cs_numero=num_cotisation;
        RETURN false;
      END IF;
      detail := bml_put(detail,'fdsea.hectare.'||i||'.prix',num_prix);
      INSERT INTO ligne (de_numero, px_numero, l_quantite) VALUES (num_devis, num_prix, bml_extract(detail,'fdsea.hectare.'||i||'.quantite')::numeric);
      hectare:=true;
    END LOOP;
  END IF;
  SELECT DE_MontantTTC FROM devis WHERE de_numero=num_devis INTO total;
--  SELECT bml_extract(detail,'fdsea.hectare.montant')=DE_MontantTTC FROM devis WHERE de_numero=num_devis INTO valid;
  IF bml_extract(detail,'fdsea.hectare.montant')::numeric!=total THEN
    report := report||E'\nLes montants TTC ne correspondent pas : '||total||' au lieu de '||bml_extract(detail,'fdsea.hectare.montant');
    UPDATE table_cotisation SET cs_valid = false, cs_report=report WHERE cs_numero=num_cotisation;
    RETURN false;
  END IF;
  SELECT px_numero FROM prix WHERE pd_numero=bml_extract(detail,'fdsea.forfait.produit')::integer AND px_tarifttc=COALESCE(bml_extract(detail,'fdsea.forfait.montant')::numeric,0)::numeric INTO num_prix;
  IF num_prix IS NULL THEN
    report := report||E'\nPas de prix actifs pour le montant du forfait correspondant';
    UPDATE table_cotisation SET cs_valid = false, cs_report=report WHERE cs_numero=num_cotisation;
    RETURN false;
  END IF;
  detail := bml_put(detail,'fdsea.forfait.prix',num_prix);
  INSERT INTO ligne (de_numero, px_numero) SELECT num_devis, num_prix;
  num_devis_fdsea := num_devis;

  -- Devis SACEA
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=1;
  SELECT nextval('seq_devis') INTO num_devis;
  detail := bml_put(detail,'sacea.devis',num_devis);
  report := report||E'\nDevis SACEA N°'||num_devis;
  INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero) SELECT num_devis, num_payeur, '[CR] Abonnement conseil du '||CURRENT_DATE, num_encaisseur;
  SELECT px_numero FROM prix WHERE pd_numero=CASE WHEN bml_extract(detail,'sacea')::boolean THEN bml_extract(detail,'sacea.produit')::integer ELSE 500000095 END AND px_tarifttc=COALESCE(bml_extract(detail,'sacea.montant')::numeric,0)::numeric INTO num_prix;
  IF num_prix IS NULL THEN
    report := report||' : Pas de prix actifs pour le montant correspondant';
    UPDATE table_cotisation SET cs_valid = false, cs_report=report WHERE cs_numero=num_cotisation;
    RETURN false;
  END IF;
  detail := bml_put(detail,'sacea.prix',num_prix);
  INSERT INTO ligne (de_numero, px_numero) VALUES (num_devis, num_prix);
  num_devis_sacea := num_devis;

  -- Devis AAVA
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=3;
  num_devis_aava := NULL;
  IF bml_extract(detail,'aava')::boolean THEN
    SELECT nextval('seq_devis') INTO num_devis;
    detail := bml_put(detail,'aava.devis',num_devis);
    report := report||E'\nDevis AAVA N°'||num_devis;
    INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero) SELECT num_devis, num_payeur, '[CR] Abonnement du '||CURRENT_DATE, num_encaisseur;
    SELECT px_numero FROM prix WHERE pd_numero=bml_extract(detail,'aava.produit')::integer INTO num_prix;
    IF num_prix IS NULL THEN
      report := report||' : Pas de prix actifs pour le montant correspondant';
      UPDATE table_cotisation SET cs_valid = false, cs_report=report WHERE cs_numero=num_cotisation;
      RETURN false;
    END IF;
    detail := bml_put(detail,'aava.prix',num_prix);
    INSERT INTO ligne (de_numero, px_numero, l_quantite) VALUES (num_devis, num_prix, COALESCE(bml_extract(detail,'aava.quantite')::integer,1)::integer);
    SELECT DE_MontantTTC FROM devis WHERE de_numero=num_devis INTO total;
    IF bml_extract(detail,'aava.montant')::numeric!=total THEN
      report := report||E'\nLes montants TTC ne correspondent pas : '||total||' au lieu de '||bml_extract(detail,'aava.montant');
      UPDATE table_cotisation SET cs_valid = false, cs_report=report WHERE cs_numero=num_cotisation;
      RETURN false;
    END IF;
    num_devis_aava := num_devis;
  END IF;

  -- Facturation
  report := report||E'\nFacturation';

  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=2;
  SELECT FC_DevisVersFacture(num_devis_fdsea) INTO num_facture_fdsea;
  INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe, 'facture', num_facture_fdsea); 
  IF (bml_extract(detail,'fdsea.forfait.produit')='500000052' AND hectare) OR (bml_extract(detail,'fdsea.forfait.produit')!='500000052' AND bml_extract(detail,'cotisation.type')!='conjoint') THEN
    INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe, 'carte', num_facture_fdsea); 
  END IF;
  detail := bml_put(detail,'fdsea.facture',num_facture_fdsea);

  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=1;
  SELECT FC_DevisVersFacture(num_devis_sacea) INTO num_facture_sacea;
  INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe, 'facture', num_facture_sacea);
  detail := bml_put(detail,'sacea.facture',num_facture_sacea);

  IF num_devis_aava IS NOT NULL THEN
    UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=3;
    SELECT FC_DevisVersFacture(num_devis_aava) INTO num_facture_aava;
    INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe, 'facture', num_facture_aava); 
		SELECT COALESCE(bml_extract(detail,'aava.adresse')::integer,0) INTO num_adresse;
		IF num_adresse=0 THEN
			SELECT ad_numero FROM adresse WHERE ad_active AND pe_numero=cotis.pe_numero INTO num_adresse;
			IF num_adresse IS NULL THEN
				RAISE EXCEPTION 'La personne n°% n'' a pas d''adresses pour le routage (cotisation n°%)', cotis.pe_numero, num_cotisation;
			END IF;
		END IF;
    INSERT INTO routage(ad_numero, ro_debutservice, ro_finservice, ro_quantite, fa_numero)
      VALUES (num_adresse, bml_extract(detail,'aava.debut')::integer, bml_extract(detail,'aava.fin')::integer, bml_extract(detail,'aava.quantite')::integer, num_facture_aava);
    detail := bml_put(detail,'aava.facture',num_facture_aava);
  END IF;

  -- Reglement
  SELECT COALESCE(fa_montantttc,0) FROM table_facture WHERE fa_numero=num_facture_fdsea INTO total_fdsea;
  SELECT COALESCE(fa_montantttc,0) FROM table_facture WHERE fa_numero=num_facture_sacea INTO total_sacea;
  SELECT COALESCE(fa_montantttc,0) FROM table_facture WHERE fa_numero=num_facture_aava  INTO total_aava;
  detail := bml_put(detail,'fdsea.montant',total_fdsea);
  detail := bml_put(detail,'sacea.montant',total_sacea);
  detail := bml_put(detail,'aava.montant',COALESCE(total_aava,0));
--  detail := bml_put(detail,'cotisation.montant',total_fdsea+total_sacea+total_aava);

  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=2;

  complement := 0;
  IF NULLIF(bml_extract(detail,'reglement.complement.numero'),'null') IS NULL THEN
    INSERT INTO facturereglement (rg_numero, fa_numero, fr_partiel, fr_montant) VALUES (num_reglement,num_facture_fdsea,true,total_fdsea);
  ELSE
    SELECT rg_montant FROM table_reglement WHERE rg_numero=bml_extract(detail,'reglement.complement.numero') INTO complement;
    INSERT INTO facturereglement (rg_numero, fa_numero, fr_partiel, fr_montant) VALUES (bml_extract(detail,'reglement.complement.numero')::integer,num_facture_fdsea,false,complement);
    INSERT INTO facturereglement (rg_numero, fa_numero, fr_partiel, fr_montant) SELECT num_reglement,num_facture_fdsea,true,total_fdsea-complement;
  END IF;

  IF bml_extract(detail,'sacea')::boolean THEN
    INSERT INTO repartition(rg_numero, mp_numero, rp_montant)
      SELECT num_reglement, mp_numero, total_sacea FROM moderepartition WHERE mp_societe=1;
    INSERT INTO facturereglement (rg_numero, fa_numero, fr_partiel, fr_montant)
      VALUES (num_reglement,num_facture_sacea,true,total_sacea);
  END IF;

  IF bml_extract(detail,'aava')::boolean THEN 
    INSERT INTO repartition(rg_numero, mp_numero, rp_montant)
      SELECT num_reglement, mp_numero, total_aava FROM moderepartition WHERE mp_societe=3;
    INSERT INTO facturereglement (rg_numero, fa_numero, fr_partiel, fr_montant)
      VALUES (num_reglement,num_facture_aava,true,total_aava);
  END IF;

  IF bml_extract(detail,'fdsea.conjoint')::boolean THEN 
    total_fdsea := total_fdsea+bml_extract(detail,'fdsea.conjoint.montant')::float;
  END IF;

  IF bml_extract(detail,'fdsea.conjoint')::boolean THEN 
    total_fdsea := total_fdsea+bml_extract(detail,'fdsea.associe.montant')::float;
  END IF;

  SELECT rg_montant+complement-(total_sacea+total_aava+total_fdsea) FROM reglement WHERE rg_numero=num_reglement INTO total_dons;
  IF (total_dons!=0 AND bml_extract(detail,'reglement.don')::boolean) THEN 
    INSERT INTO repartition(rg_numero, mp_numero, rp_montant)
      SELECT num_reglement, mp_numero, total_dons FROM moderepartition WHERE mp_societe=2;
  END IF;
  detail := bml_put(detail,'reglement.don.montant', CASE WHEN bml_extract(detail,'reglement.don')='true' THEN total_dons ELSE 0 END);

  UPDATE employe SET EM_Service=num_service WHERE EM_Numero=num_employe;
  report := report||E'\n**************';
  UPDATE table_cotisation SET cs_valid=true, cs_done=true, cs_report=report, cs_detail=bml_sort(detail), cs_societe=num_gerance, cs_montant=COALESCE(total_fdsea,0)+COALESCE(total_sacea,0)+COALESCE(total_aava,0), cs_reduction=CASE WHEN bml_extract(detail,'sacea')='true' THEN 25.00 ELSE 15.00 END  WHERE cs_numero=num_cotisation;
  RETURN true;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;












--===========================================================================--
-- Permet de recréer une string de cotisation à partir d'un n° de personne et d'une année

CREATE OR REPLACE FUNCTION FC_cotisation(IN num_personne INTEGER, IN annee INTEGER) RETURNS TEXT AS
$$
DECLARE
  detail cotisation.cs_detail%TYPE;
  lf table_lignefacture%ROWTYPE;
BEGIN
  SELECT l.* FROM table_lignefacture l JOIN table_facture USING (fa_numero) LEFT JOIN table_avoir USING (fa_numero) WHERE av_numero IS NULL AND EXTRACT(YEAR FROM fa_date)=annee AND pd_numero IN (500000124, 500000053, 500000150, 500000054, 500000052, 500000130, 500000162, 300006) AND pe_numero=num_personne ORDER BY pd_numero INTO lf;
  IF lf.fa_numero IS NULL THEN
    RETURN '{saved:false}';
  END IF;
  detail := '';
  detail := bml_put(detail,'saved','true');
  detail := bml_put(detail,'fdsea.facture',lf.fa_numero::text);
  detail := bml_put(detail,'fdsea.forfait.produit',lf.pd_numero::text);
  detail := bml_put(detail,'fdsea.forfait.prix',lf.px_numero::text);
  detail := bml_put(detail,'fdsea.forfait.montant',lf.lf_montantttc::text);
  detail := bml_put(detail,'fdsea.hectare','unknown');
  detail := bml_put(detail,'fdsea.conjoint','unknown');
  detail := bml_put(detail,'fdsea.associe','unknown');
  detail := bml_put(detail,'cotisation.personne',num_personne::text);
  detail := bml_put(detail,'cotisation.annee',annee::text);
  detail := bml_put(detail,'cotisation.type',CASE WHEN lf.pd_numero=500000162 THEN 'associe' WHEN lf.pd_numero=500000150 THEN 'conjoint' ELSE 'standard' END);
  SELECT l.* FROM table_lignefacture l JOIN table_facture USING (fa_numero) LEFT JOIN table_avoir USING (fa_numero) WHERE av_numero IS NULL AND EXTRACT(YEAR FROM fa_date)=annee AND pd_numero-500000000 IN (36,65,69) AND pe_numero=num_personne INTO lf;
  IF lf.fa_numero IS NULL THEN
    detail := bml_put(detail,'sacea','false');
  ELSE
    detail := bml_put(detail,'sacea','true');
    detail := bml_put(detail,'sacea.facture',lf.fa_numero::text);
    detail := bml_put(detail,'sacea.produit',lf.pd_numero::text);
    detail := bml_put(detail,'sacea.prix',lf.px_numero::text);
    detail := bml_put(detail,'sacea.montant',lf.lf_montantttc::text);
  END IF;
  SELECT l.* FROM table_lignefacture l JOIN table_facture USING (fa_numero) LEFT JOIN table_avoir USING (fa_numero) WHERE av_numero IS NULL AND EXTRACT(YEAR FROM fa_date)=annee AND pd_numero-500000000 IN (96) AND pe_numero=num_personne INTO lf;
  IF lf.fa_numero IS NULL THEN
    detail := bml_put(detail,'aava','false');
  ELSE
    detail := bml_put(detail,'aava','true');
    detail := bml_put(detail,'aava.facture',lf.fa_numero::text);
    detail := bml_put(detail,'aava.produit',lf.pd_numero::text);
    detail := bml_put(detail,'aava.prix',lf.px_numero::text);
    detail := bml_put(detail,'aava.quantite',lf.lf_quantite::text);
    detail := bml_put(detail,'aava.montant',lf.lf_montantttc::text);
  END IF;
  RETURN detail;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


















/*****************************************************************************\
 * Fonctions impressions                                                     *
\*****************************************************************************/


--===========================================================================--
-- Procedure permettant d'enregistrer facilement des coupons-réponses standard
--DROP FUNCTION FC_LC(text);

CREATE OR REPLACE FUNCTION FC_LC(IN latexte text) RETURNS text AS
$$
DECLARE
  latex text;
BEGIN
  latex := COALESCE(latexte,'');
  IF LENGTH(latex)>0 THEN
    latex := REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(latex,'€',E'\\EUR'),'$',E'\\$'),'%',E'\\%'),'[','$[$'),']','$]$'),'&',E'\\&');
  END IF;
  RETURN latex;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;





--===========================================================================--
-- Procedure permettant d'enregistrer facilement des coupons-réponses standard
--DROP FUNCTION FC_CreerFonctionPrint(text,text,text,boolean);

CREATE OR REPLACE FUNCTION FC_CreerFonctionPrint(text,text,text,boolean) RETURNS integer AS
$$
DECLARE
  modele       ALIAS FOR $1;
  nom_fonction ALIAS FOR $2;
  directory    ALIAS FOR $3;
  latex        ALIAS FOR $4;
  fonction     text;
  query        text;
  q_select     text;
  q_suite      text;
  q_as         text;
  entete       text;
  cond         text;
  compteur     integer;
  ligne        text;
  number       integer;
  plast        integer; -- prodondeur de bloc
  last         integer[64]; -- 0 BEGIN  1 IF  2 ELSE
  pparam       integer; -- profondeur parametrique
  nbparam      integer[64]; -- nombre de param
  numvar       integer[64]; -- numero des records
  param        text;
  nparam       integer;
  kw_document  text;
  kw_record    text;
BEGIN
  kw_document := 'z';
  kw_record := 'r';
  compteur:=0;
  plast   :=0;
  pparam  :=0;
  entete:=E'CREATE OR REPLACE FUNCTION '||nom_fonction||E'(pkey INTEGER) RETURNS text AS \n \$\$\n DECLARE\n';
--  entete:=entete||E'  pkey   ALIAS FOR \$1;\n';
  entete:=entete||E'  '||kw_document||E' text;\n';
  entete:=entete||E'  source text;\n';
  entete:=entete||E'  cible text;\n';
  entete:=entete||E'  res integer;\n';
  fonction:='';
  fonction:=fonction||E'BEGIN\n';
--  fonction:=fonction||E'  SELECT to_char(CURRENT_TIMESTAMP,''YYYYMMDD_HH24MISS_'')||to_char(floor(9999999999*random()),''FM0999999999'') INTO source;\n';
  fonction:=fonction||E'  SELECT to_char(CURRENT_TIMESTAMP,''YYYYMMDD_HH24MISS_'')||pkey INTO '||kw_document||E';\n';
  fonction:=fonction||E'  cible :=current_user||''_'||nom_fonction||E'_''||'||kw_document||E'||''.pdf'';\n';
  fonction:=fonction||E'  source:=current_user||''_'||nom_fonction||E'_''||'||kw_document||E'||''.tex'';\n';
  fonction:=fonction||E'  '||kw_document||E':='''';\n';
--  fonction:=fonction||E'  RAISE NOTICE ''>> %'',source;\n';
--  RAISE NOTICE '%',modele;
  ligne   :=E'\% Genere par Brice TEXIER';
  number  :=1;
  WHILE NOT ligne ILIKE E'%\\end{document}%' LOOP
-- traitement de la ligne
--    ligne:=replace(ligne,':NUMBER:',number);
--    RAISE NOTICE '% : %',number,ligne;
    fonction:=fonction||repeat('  ',plast);
    IF ligne LIKE E'\\%%BEGIN:%SELECT%' THEN
      query   :=SUBSTRING(ligne FROM POSITION('BEGIN:' IN ligne)+6);
      query   :=SUBSTRING(query FOR LENGTH(query)-1);
      query   :=REPLACE(query,':KEY:','pkey');
      q_select:=SUBSTRING(query FROM POSITION('SELECT' IN query)+6);
      q_suite :='';
      IF POSITION('FROM' IN q_select)>0 THEN
        q_select:=SUBSTRING(q_select FOR POSITION('FROM' IN q_select)-1);
        q_suite :=SUBSTRING(query FROM POSITION('FROM' IN query));
      END IF;
--      RAISE NOTICE 'q_select <%>',q_select;
      nparam:=0;
      q_as  :='';
      LOOP
        nparam := nparam+1;
        param  := SPLIT_PART(q_select,',',nparam);
        IF REPLACE(param,' ','')='' THEN
          EXIT;
        END IF;
        IF q_as<>'' THEN
          q_as:=q_as||E', ';
        END IF;
        IF POSITION('DISTINCT' IN param)>0 THEN
          param:=SUBSTRING(param FROM POSITION('DISTINCT' IN param)+8);
          q_as:=q_as||E'DISTINCT ';
        END IF;
        q_as:=q_as||'FC_LC(('||TRIM(param)||')::text) AS p'||nparam;
--        q_as:=q_as||E'REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(('||param||E')::text,''''),''$'',''\\\\$''),''%'',''\\\\%''),''['',''\$[\$''),'']'',''\$]\$''),''&'',''\\\\&'') AS p'||nparam;
      END LOOP;
      query:='SELECT '||q_as||E' '||q_suite;
  --    RAISE NOTICE 'query %',query;
      IF pparam>0 THEN
        FOR i IN 1..nbparam[pparam] LOOP
          query:=REPLACE(query,'<'||i-1||E'>',kw_record||numvar[pparam]||E'.p'||i);
        END LOOP;
      END IF;

      compteur       := compteur+1;
      plast          := plast+1;
      last[plast]    := 0;
      pparam         := pparam+1;
      nbparam[pparam]:= nparam-1;
      numvar[pparam] := compteur;

      fonction:=fonction||E'  FOR '||kw_record||compteur||E' IN '||query||E' LOOP\n';
      entete:=entete||E'  '||kw_record||compteur||E' record;\n';
    ELSIF ligne LIKE E'\%%IF:%' THEN
      cond:=SUBSTRING(ligne FROM POSITION('IF:' IN ligne)+3);
      cond:=REPLACE(cond,':KEY:','pkey');
      IF pparam>0 THEN
        FOR i IN 1..nbparam[pparam] LOOP
          cond:=REPLACE(cond,'<'||i-1||E'>',kw_record||numvar[pparam]||E'.p'||i);
        END LOOP;
      END IF;
      fonction:=fonction||E'  IF ('||TRIM(cond)||E')::boolean THEN\n';
      plast          := plast+1;
      last[plast]    := 1;
    ELSIF ligne LIKE E'\\%%ELSE' THEN
      fonction:=fonction||E'ELSE\n';
    ELSIF ligne LIKE E'\\%%END%' THEN
--      RAISE NOTICE 'END % %',plast,compteur;
      IF plast<=0 THEN
        RAISE EXCEPTION 'Le modèle est mal formaté. Un END est inattendu. Ligne %', number;
      END IF;
      IF last[plast]=0   THEN
        fonction:=fonction||E'END LOOP;\n';
        plast :=plast-1;
        pparam:=pparam-1;
      ELSIF last[plast]=1 THEN
        fonction:=fonction||E'END IF;\n';
        plast :=plast-1;
      ELSE
        RAISE EXCEPTION 'Le modèle est mal formaté. Type de boucle inconnu. Ligne %', number;
      END IF;
    ELSE     
      IF TRIM(ligne) NOT LIKE E'\\%%'THEN
        ligne:='  '||kw_document||':='||kw_document||'||E'''||TRIM(TRIM(quote_literal(TRIM(ligne)),'E'),'''')||E'\\n'';\n';
        IF pparam>0 THEN
          FOR i IN 1..nbparam[pparam] LOOP
            ligne:=REPLACE(ligne,'<'||i-1||E'>','''||'||kw_record||numvar[pparam]||E'.p'||i||E'||E''');
          END LOOP;
        END IF;
        fonction:=fonction||ligne;
      END IF;
    END IF;    
    ligne:=split_part(modele,E'\n',number);
    number:=number+1;
  END LOOP;
  fonction:=fonction||E'  '||kw_document||E':='||kw_document||E'||E''\\\\end{document}'';\n';
--  fonction:=fonction||E'  RAISE NOTICE ''[%]'', '||kw_document||E';\n';
  fonction:=fonction||E'  SELECT writefile('''||directory||E'/''||source,'||kw_document||E') INTO res;\n';
  fonction:=fonction||E'  SELECT execution(''chmod 777 '||directory||E'/''||source) INTO res;\n';
  IF latex THEN
    fonction:=fonction||E'  SELECT execution(''cd '||directory||E' ; pdflatex ''||source||'' ; pdflatex ''||source||E'' ; chmod 755 ''||cible||'' ;'') INTO res;\n';
--    fonction:=fonction||E'  SELECT execution(''cd '||directory||E' ; pdflatex ''||source||E'' ; pdflatex ''||source||E'' ; chmod 755 ''||cible||E'' ; rm -f ''||source) INTO res;\n';
--    fonction=fonction||E'  SELECT execution(''rm -f '||directory||E'/''||source) INTO res;\n';
  END IF;
  fonction:=fonction||E'  RETURN ''file://'||directory||E'/''||cible;\n';
  fonction:=fonction||E'END;\n\$\$ LANGUAGE ''plpgsql'' VOLATILE;';
  fonction:=entete||fonction;
-- Execution de la requete
--  RAISE NOTICE '=> %', modele;
--  RAISE NOTICE '=>  %', fonction;
  EXECUTE fonction;
  
  RETURN 0; 
--  RETURN modele; 
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Procedure permettant d'enregistrer facilement des coupons-réponses standard
--DROP FUNCTION FC_CreerFonctionPrint(text,text,text,boolean);

CREATE OR REPLACE FUNCTION FC_CreerFonctionPrintByDate(integer,text,text,boolean) RETURNS integer AS
$$
DECLARE
  num_modele   ALIAS FOR $1;
  nom_fonction ALIAS FOR $2;
  directory    ALIAS FOR $3;
  latex        ALIAS FOR $4;
  modele       text;
  corps        integer;
  fonction     text;
  query        text;
  q_select     text;
  q_suite      text;
  q_as         text;
  entete       text;
  cond         text;
  compteur     integer;
  ligne        text;
  number       integer;
  plast        integer; -- prodondeur de bloc
  last         integer[64]; -- 0 BEGIN  1 IF  2 ELSE
  pparam       integer; -- profondeur parametrique
  nbparam      integer[64]; -- nombre de param
  numvar       integer[64]; -- numero des records
  param        text;
  nparam       integer;
  matable      text;
  madate       text;
  macle        text;
BEGIN
  SELECT IM_KeyTable, IM_KeyDate, IM_KeyCle, IM_Modele FROM Impression WHERE IM_Numero=num_modele INTO matable, madate, macle, modele;
  compteur:=0;
  plast   :=0;
  pparam  :=0;
  corps   :=0;
  entete:='CREATE OR REPLACE FUNCTION '||nom_fonction||E'(date,date) RETURNS text AS \n \$\$\n DECLARE\n'; --*
--  entete:=entete||E'  pkey   ALIAS FOR \$1;\n'; --*
  entete:=entete||E'  debut  ALIAS FOR \$1;\n'; --*
  entete:=entete||E'  fin    ALIAS FOR \$2;\n'; --*
  entete:=entete||E'  enreg  record;\n'; --*
  entete:=entete||E'  num_societe integer;\n'; --*
  entete:=entete||E'  doc    text;\n';
  entete:=entete||E'  source text;\n';
  entete:=entete||E'  cible  text;\n';
  entete:=entete||E'  res    integer;\n';
  fonction:='';
  fonction:=fonction||E'BEGIN\n';
  fonction:=fonction||E'  doc:='''';\n';
  fonction:=fonction||E'  SELECT to_char(CURRENT_TIMESTAMP,''YYYYMMDD_HH24MISS'')||to_char(floor(99999*random()),''00000''), current_societe() INTO source, num_societe;\n'; --*
  fonction:=fonction||E'  cible :=current_user||''_'||nom_fonction||E'_''||source||''.pdf'';\n';
  fonction:=fonction||E'  source:=current_user||''_'||nom_fonction||E'_''||source||''.tex'';\n';
--  fonction:=fonction||E'  RAISE NOTICE ''>> %'',source;\n';
  ligne   :=E'\% Genere par Brice Texier';
  number  :=1;
  WHILE NOT ligne ILIKE E'%\\end{document}%' LOOP
-- traitement de la ligne
--    ligne:=replace(ligne,':NUMBER:',number);
    fonction:=fonction||repeat('  ',plast+corps);
    IF ligne LIKE E'\%%BEGIN:%SELECT%' THEN
      query   :=SUBSTRING(ligne FROM POSITION('BEGIN:' IN ligne)+6);
      query   :=SUBSTRING(query FOR LENGTH(query)-1);
      query   :=REPLACE(query,':KEY:','enreg.'||macle);
      q_select:=SUBSTRING(query FROM POSITION('SELECT' IN query)+6);
      q_suite :='';
      IF POSITION('FROM' IN q_select)>0 THEN
        q_select:=SUBSTRING(q_select FOR POSITION('FROM' IN q_select)-1);
        q_suite :=SUBSTRING(query FROM POSITION('FROM' IN query));
      END IF;
--      RAISE NOTICE 'q_select <%>',q_select;
      nparam:=0;
      q_as  :='';
      LOOP
        nparam := nparam+1;
        param  := SPLIT_PART(q_select,',',nparam);
        IF REPLACE(param,' ','')='' THEN
          EXIT;
        END IF;
        IF q_as<>'' THEN
          q_as:=q_as||E', ';
        END IF;
        IF POSITION('DISTINCT' IN param)>0 THEN
          param:=SUBSTRING(param FROM POSITION('DISTINCT' IN param)+8);
          q_as:=q_as||E'DISTINCT ';
        END IF;
        q_as:=q_as||E'REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(('||param||E')::text,''''),''$'',''\\\\$''),''%'',''\\\\%''),''['',''\$[\$''),'']'',''\$]\$''),''&'',''\\\\&'') AS p'||nparam;
      END LOOP;
      query:='SELECT '||q_as||E' '||q_suite;
  --    RAISE NOTICE 'query %',query;
      IF pparam>0 THEN
        FOR i IN 1..nbparam[pparam] LOOP
          query:=REPLACE(query,'<'||i-1||E'>','record'||numvar[pparam]||E'.p'||i);
        END LOOP;
      END IF;

      compteur       := compteur+1;
      plast          := plast+1;
      last[plast]    := 0;
      pparam         := pparam+1;
      nbparam[pparam]:= nparam-1;
      numvar[pparam] := compteur;

      fonction:=fonction||E'  FOR record'||compteur||E' IN '||query||E' LOOP\n';
      entete:=entete||E'  record'||compteur||E' record;\n';
    ELSIF ligne LIKE E'\%%IF:%' THEN
      cond:=SUBSTRING(ligne FROM POSITION('IF:' IN ligne)+3);
      cond:=REPLACE(cond,':KEY:','enreg.'||macle);
      IF pparam>0 THEN
        FOR i IN 1..nbparam[pparam] LOOP
          cond:=REPLACE(cond,'<'||i-1||E'>','record'||numvar[pparam]||E'.p'||i);
        END LOOP;
      END IF;
      fonction:=fonction||E'  IF ('||cond||E')::boolean THEN\n';
      plast          := plast+1;
      last[plast]    := 1;
    ELSIF ligne LIKE E'\%%ELSE' THEN
      fonction:=fonction||E'ELSE\n';
    ELSIF ligne LIKE E'\%%END%' THEN
--      RAISE NOTICE 'END % %',plast,compteur;
      IF plast<=0 THEN
        RAISE EXCEPTION 'Le modèle est mal formaté. Un END est inattendu. Ligne %', number;
      END IF;
      IF last[plast]=0   THEN
        fonction:=fonction||E'END LOOP;\n';
        plast :=plast-1;
        pparam:=pparam-1;
      ELSIF last[plast]=1 THEN
        fonction:=fonction||E'END IF;\n';
        plast :=plast-1;
      ELSE
        RAISE EXCEPTION 'Le modèle est mal formaté. Type de boucle inconnu. Ligne %', number;
      END IF;
    ELSE      
      ligne:='  doc:=doc||'||quote_literal(ligne)||E'||''\\n'''||E';\n';
      IF pparam>0 THEN
        FOR i IN 1..nbparam[pparam] LOOP
          ligne:=REPLACE(ligne,'<'||i-1||E'>','''||record'||numvar[pparam]||E'.p'||i||E'||''');
        END LOOP;
      END IF;
      fonction:=fonction||ligne;
      IF ligne ILIKE E'%\\begin{document}%' THEN --*
        fonction:=fonction||E'  FOR enreg IN SELECT '||macle||E' FROM table_'||matable||E' WHERE debut<='||madate||E' AND '||madate||E'<=fin AND so_numero=num_societe LOOP\n';     --*
        corps:=1;
      END IF; --*      
    END IF;    
    ligne:=split_part(modele,E'\n',number);
    number:=number+1;
  END LOOP;
  fonction:=fonction||E'  END LOOP;\n'; --*
  fonction:=fonction||E'  doc:=doc||''\\\\end{document}'';\n';
--  fonction:=fonction||E'  RAISE NOTICE ''[%]'', doc;\n';
 
  fonction:=fonction||E'  SELECT writefile('''||directory||E'/''||source,doc) INTO res;\n';
  fonction:=fonction||E'  SELECT execution(''chmod 777 '||directory||E'/''||source) INTO res;\n';
  IF latex THEN
    fonction:=fonction||E'  SELECT execution(''cd '||directory||E' ; pdflatex ''||source||'' ; pdflatex ''||source||'' ; chmod 755 ''||cible||'' ;'') INTO res;\n';
--    fonction:=fonction||E'  SELECT execution(''cd '||directory||E' ; pdflatex ''||source||E'' ; pdflatex ''||source||E'' ; chmod 755 ''||cible||E'' ; rm -f ''||source) INTO res;\n';
--    fonction=fonction||E'  SELECT execution(''rm -f '||directory||E'/''||source) INTO res;\n';
  END IF;
  fonction:=fonction||E'  RETURN ''file://'||directory||E'/''||cible;\n';
  fonction:=fonction||E'END;\n\$\$ LANGUAGE ''plpgsql'' VOLATILE;';
  fonction:=entete||fonction;
-- Execution de la requete
--  RAISE NOTICE '=> %', modele;
--  RAISE NOTICE '=>  %', fonction;
  EXECUTE fonction;
  
  RETURN 0; 
--  RETURN modele; 
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Procédure créant les fonctions d'impression pour toutes les sociétés                            --
-- Fonctionne seulement en mode administrateur
-- Le repertoire ne doit pas avoir de '/' final
--DROP FUNCTION FC_CreerImpressions(text);

CREATE OR REPLACE FUNCTION FC_CreerImpressions(text) RETURNS integer AS
$$
DECLARE
  repertoire ALIAS FOR $1;
  i record;
  total integer;
  mini integer;
BEGIN
  total:=0;
  SELECT ROUND(MIN(im_numero),-3) FROM table_impression INTO mini;
  FOR i IN SELECT 'pi_'||im_numero-mini AS fcn, im_modele, im_numero FROM table_impression WHERE IM_Defaut LOOP
    PERFORM FC_CreerFonctionPrint(i.im_modele, i.fcn, repertoire, true);
    UPDATE table_impression SET im_fonction=i.fcn WHERE im_numero=i.im_numero;
--    RAISE NOTICE 'Fonction %',i.fcn;
    total:=total+1;
  END LOOP;
  RETURN total;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

--===========================================================================--
-- Cherche un modele par la table puis par le nom si nécessaire
--DROP FUNCTION FC_ChercheModele(text);
CREATE OR REPLACE FUNCTION FC_ChercheFonction(mot text) RETURNS text AS
$$
DECLARE
  fonction text;
BEGIN
  SELECT IM_Fonction FROM Impression WHERE IM_Nom ILIKE mot and IM_Societe=current_societe() AND IM_Defaut INTO fonction;
  IF fonction IS NULL THEN
    SELECT IM_Fonction FROM Impression WHERE IM_KeyTable ILIKE mot and IM_Societe=current_societe() AND IM_Defaut INTO fonction;
    IF fonction IS NULL THEN
      RAISE EXCEPTION 'Le modèle "%" est introuvable.', mot;
    END IF;
  END IF;
  RETURN fonction;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Imprime un document en allant chercher le modèle en fonction de la table passée en parametre.
--DROP FUNCTION FC_Imprime(text,integer);

CREATE OR REPLACE FUNCTION FC_Imprime(text,integer) RETURNS text AS
$$
DECLARE
  nom_table  ALIAS FOR $1;
  num_record ALIAS FOR $2;
  num_modele text;
  query      text;
  adresse    text;
  r          record;
BEGIN
  SELECT im_fonction FROM impression WHERE im_keytable ilike nom_table INTO num_modele;
  query='SELECT '||num_modele||E'('||num_record||E') as fichier;';
--  RAISE NOTICE 'query %',query;
  FOR r IN EXECUTE query LOOP
    adresse:=r.fichier;
  END LOOP;
  RETURN adresse;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--DROP FUNCTION FC_Imprime2(text,integer);

CREATE OR REPLACE FUNCTION FC_Imprime2(IN nom_logique TEXT,IN cle integer) RETURNS text AS
$$
DECLARE
  query      text;
  adresse    text;
BEGIN
  SELECT 'SELECT '||im_fonction||E'('||cle||E');' FROM impression WHERE im_nom ilike nom_logique AND IM_Defaut INTO query;
--  RAISE NOTICE '>> %', COALESCE(query,'x');
  IF query IS NULL THEN
    RAISE EXCEPTION 'Le modèle % n''existe pas', COALESCE(nom_logique,'[unknown]');
  END IF;
  EXECUTE query INTO adresse;
  RETURN adresse;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--------------------------------------------------
/*
SELECT FC_CreerFonctionPrint ('\\documentclass[a4paper]{article}\n\\usepackage[francais]{babel}\n\\begin{document}\n%BEGIN: SELECT current_user, current_date, :KEY:;\n Je suis <0> et on est le <1> (<2>).\n%IF:<0>=''brice''\n C''est sur c''est moi.\n%ELSE\nMais c''est pas sur en fait.\n%END\n%END\n \\end{document}','test58','/tmp',true);

SELECT test58(5);
*/

--===========================================================================--
-- Imprime un document en allant chercher le modèle en fonction de la table passée en parametre.
--DROP FUNCTION FC_ImprimeLot(integer,date,date);

CREATE OR REPLACE FUNCTION FC_ImprimeLot(IN num_lot INTEGER, IN modele VARCHAR, IN debut DATE, IN fin DATE) RETURNS text AS
$$
DECLARE
  s INTEGER;
  num_service INTEGER;
  adresse TEXT;
  query TEXT;
BEGIN
  -- Enregistrement service debut
  SELECT EM_Service FROM Table_Employe WHERE EM_Login=CURRENT_USER INTO num_service;
  -- Impressions des documents séparément
  FOR s IN 1..3 LOOP
    -- Passage dans la societe s
    UPDATE table_employe 
      SET EM_Service=se_numero 
      FROM table_service 
      WHERE se_societe=s AND em_login=current_user;
    -- Impression de tous les documents de la societe
    UPDATE table_impressiondocument 
      SET ID_Filename=FC_Imprime2(ID_Modele, ID_Cle::integer)
      FROM table_facture, table_impressiongroupe AS groupe
      WHERE groupe.ig_numero=table_impressiondocument.ig_numero 
        AND IL_Numero=num_lot AND ID_Modele=modele AND FA_MontantTTC>0 AND (fa_date BETWEEN debut AND fin)
        AND ID_Cle::integer=FA_Numero AND SO_Numero=s;
  END LOOP;
  -- Concatenation des documents
  SELECT '/tmp/'||current_user||E'_lot_pi_'||modele||'_'||to_char(debut,'YYYYMMDD')||'_'||to_char(fin,'YYYYMMDD')||'_'||to_char(CURRENT_TIMESTAMP,'YYYYMMDD_HH24MISS_US')||E'.pdf' INTO adresse;
  SELECT 'SELECT execution(''cd /tmp && touch '||adresse||E' && chmod 755 '||adresse||E' && gs -q -sPAPERSIZE=letter -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile='||adresse||concatenate(' '||SUBSTR(COALESCE(ID_Filename,''),8))||E''');'
    FROM (SELECT id_filename
    FROM table_impressiondocument 
         JOIN table_impressiongroupe USING (IG_Numero)
         JOIN table_facture ON (ID_Cle=FA_Numero) 
    WHERE true
        AND IL_Numero=num_lot AND ID_Modele=modele AND FA_MontantTTC>0 AND (fa_date BETWEEN debut AND fin)
       ORDER BY fa_numero) x
    INTO query;
/*
  SELECT 'SELECT execution(''cd /tmp &&  touch '||adresse||E' && chmod 755 '||adresse||E' && gs -q -sPAPERSIZE=letter -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile='||adresse||concatenate(' '||SUBSTR(COALESCE(ID_Filename,''),8))||E''');'
    FROM table_impressiondocument 
         JOIN table_impressiongroupe USING (IG_Numero)
         JOIN table_facture ON (ID_Cle=FA_Numero) 
    WHERE true
        AND IL_Numero=num_lot AND ID_Modele=modele AND FA_MontantTTC>0 AND (fa_date BETWEEN debut AND fin)
    GROUP BY IL_Numero
    ORDER BY IL_Numero
    INTO query;
*/
--  RAISE NOTICE '> Query : %', query;
  IF query IS NOT NULL THEN
    EXECUTE query;
  ELSE
    RAISE EXCEPTION 'Pas de documents pour l''impression.';
  END IF;
  -- Restauration du service
  UPDATE table_employe SET EM_Service=num_service WHERE EM_Login=CURRENT_USER;

  RETURN 'file://'||adresse;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;





--===========================================================================--
-- Imprime un document en allant chercher le modèle en fonction de la table passée en parametre.
--DROP FUNCTION FC_ImprimeLot(integer,date,date);

CREATE OR REPLACE FUNCTION FC_ImprimeGroupe(IN num_groupe INTEGER) RETURNS text AS
$$
DECLARE
  s INTEGER;
  num_service INTEGER;
  adresse TEXT;
  query TEXT;
BEGIN
  -- Enregistrement service debut
  SELECT EM_Service FROM Table_Employe WHERE EM_Login=CURRENT_USER INTO num_service;
  -- Impressions des documents séparément
  FOR s IN 1..3 LOOP
    -- Passage dans la societe s
    UPDATE table_employe 
      SET EM_Service=se_numero 
      FROM table_service 
      WHERE se_societe=s AND em_login=current_user;
    -- Impression de tous les documents de la societe
    UPDATE table_impressiondocument 
      SET ID_Filename=FC_Imprime2(ID_Modele, ID_Cle::integer)
      FROM table_facture
      WHERE num_groupe=table_impressiondocument.ig_numero 
        AND FA_MontantTTC>0 AND ID_Cle::integer=FA_Numero AND SO_Numero=s;
  END LOOP;
  -- Concatenation des documents
  SELECT '/tmp/'||current_user||E'_lot_pi_'||to_char(CURRENT_TIMESTAMP,'YYYYMMDD_HH24MISS_US')||E'.pdf' INTO adresse;
  SELECT 'SELECT execution(''cd /tmp && touch '||adresse||E' && chmod 755 '||adresse||E' && gs -q -sPAPERSIZE=letter -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile='||adresse||concatenate(' '||SUBSTR(COALESCE(ID_Filename,''),8))||E''');'
    FROM (SELECT id_filename
    FROM table_impressiondocument JOIN table_facture ON (ID_Cle=FA_Numero)
    WHERE num_groupe=table_impressiondocument.ig_numero AND FA_MontantTTC>0
       ORDER BY fa_numero) x
    INTO query;
/*
  SELECT 'SELECT execution(''cd /tmp &&  touch '||adresse||E' && chmod 755 '||adresse||E' && gs -q -sPAPERSIZE=letter -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile='||adresse||concatenate(' '||SUBSTR(COALESCE(ID_Filename,''),8))||E''');'
    FROM table_impressiondocument 
         JOIN table_impressiongroupe USING (IG_Numero)
         JOIN table_facture ON (ID_Cle=FA_Numero) 
    WHERE true
        AND IL_Numero=num_lot AND ID_Modele=modele AND FA_MontantTTC>0 AND (fa_date BETWEEN debut AND fin)
    GROUP BY IL_Numero
    ORDER BY IL_Numero
    INTO query;
*/
--  RAISE NOTICE '> Query : %', query;
  IF query IS NOT NULL THEN
    EXECUTE query;
  ELSE
    RAISE NOTICE 'Pas d''impressions.';
  END IF;
  -- Restauration du service
  UPDATE table_employe SET EM_Service=num_service WHERE EM_Login=CURRENT_USER;

  RETURN 'file://'||adresse;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;






CREATE OR REPLACE FUNCTION FC_ImprimeLot2(IN num_lot INTEGER, IN modele VARCHAR, IN debut DATE, IN fin DATE) RETURNS text AS
$$
DECLARE
  s INTEGER;
  num_service INTEGER;
  adresse TEXT;
  query TEXT;
BEGIN
  -- Concatenation des documents
  SELECT '/tmp/'||current_user||E'_lot_pi_'||to_char(CURRENT_TIMESTAMP,'YYYYMMDD_HH24MISS_US')||E'.pdf' INTO adresse;
  SELECT 'SELECT execution(''cd /tmp && touch '||adresse||E' && chmod 755 '||adresse||E' && gs -q -sPAPERSIZE=letter -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile='||adresse||concatenate(' '||SUBSTR(COALESCE(ID_Filename,''),8))||E''');'
    FROM (SELECT id_filename
    FROM table_impressiondocument 
         JOIN table_impressiongroupe USING (IG_Numero)
         JOIN table_facture ON (ID_Cle=FA_Numero) 
    WHERE true
        AND IL_Numero=num_lot AND ID_Modele=modele AND FA_MontantTTC>0 AND (fa_date BETWEEN debut AND fin)
       ORDER BY fa_numero LIMIT 100) x
    INTO query;
--  RAISE NOTICE '> Query : %', query;
  IF query IS NOT NULL THEN
    EXECUTE query;
  ELSE
    RAISE NOTICE 'Pas d''impressions.';
  END IF;

  RETURN 'file://'||adresse;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

/*
UPDATE table_cotisation SET cs_detail = bml_put(cs_detail,'fdsea.montant',f.fa_montantttc::text) FROM table_facture WHERE fa_numero=bml_extract('fdsea.facture');
UPDATE table_cotisation SET cs_detail = bml_put(cs_detail,'sacea.montant',f.fa_montantttc::text) FROM table_facture WHERE fa_numero=bml_extract('sacea.facture');
UPDATE table_cotisation SET cs_detail = bml_put(cs_detail,'aava.montant',f.fa_montantttc::text) FROM table_facture WHERE fa_numero=bml_extract('aava.facture');
UPDATE table_cotisation SET cs_detail = bml_put(cs_detail,'cotisation.montant', (bml_extract(cs_detail,'fdsea.montant')::numeric+bml_extract(cs_detail,'sacea.montant')::numeric+bml_extract(cs_detail,'aava.montant')::numeric)::text);
*/


CREATE OR REPLACE FUNCTION FC_AjouterJA(IN num_personne INTEGER, IN num_personnesoc INTEGER) RETURNS BOOLEAN AS
$$
DECLARE
  num_service service.se_numero%TYPE;
  num_employe employe.em_numero%TYPE;
  num_devis       devis.de_numero%TYPE;
  num_devis_sacea devis.de_numero%TYPE;
  num_devis_aava  devis.de_numero%TYPE;
  num_facture_sacea facture.fa_numero%TYPE;
  num_facture_aava  facture.fa_numero%TYPE;
  detail TEXT;
  annee INTEGER;
  num_soc INTEGER;
  compte INTEGER;
BEGIN
  SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO annee;
  SELECT count(*) FROM cotisation where cs_annee=annee AND pe_numero=num_personne AND 'ja'=bml_extract(cs_detail,'cotisation.type') INTO compte;
  IF compte>0 THEN
    RAISE EXCEPTION 'Une cotisation JA est déjà enregistrée pour la fiche % et l''année %',num_personne-1000000,annee;
  END IF;

  -- Sauvegarde du statut de l'utilisateur
  SELECT EM_Service, EM_Numero FROM Employe WHERE em_login=CURRENT_USER INTO num_service, num_employe;
  SELECT pe_numero FROM personne WHERE pe_numero=CASE WHEN num_personnesoc<1000000 THEN num_personnesoc+1000000 ELSE num_personnesoc END INTO num_soc;
  IF num_soc IS NOT NULL THEN
    SELECT count(*) FROM estlie WHERE el_personne1=num_personne AND el_personne2=num_soc AND tl_numero=1003 INTO compte;
    IF compte<=0 THEN
      INSERT INTO estlie(el_personne1,el_personne2,tl_numero) VALUES (num_personne,num_soc,1003);
    END IF;
  END IF;

  detail := '';
  detail := bml_put(detail,'saved', 'true');
  detail := bml_put(detail,'cotisation.annee', annee::text);
  detail := bml_put(detail,'cotisation.montant', '0');
  detail := bml_put(detail,'cotisation.type', 'ja');
  detail := bml_put(detail,'cotisation.personne', num_personne);
  detail := bml_put(detail,'cotisation.societe', COALESCE(num_soc::text,''));
  detail := bml_put(detail,'fdsea', 'false');
  detail := bml_put(detail,'fdsea.associe', 'false');
  detail := bml_put(detail,'fdsea.conjoint', 'false');
  detail := bml_put(detail,'fdsea.hectare', 'false');

  -- Devis SACEA
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=1;
  SELECT nextval('seq_devis') INTO num_devis;
  INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero) SELECT num_devis, num_personne, '[JA] Abonnement conseil du '||CURRENT_DATE, current_employe();
  INSERT INTO ligne (de_numero, pd_numero) VALUES (num_devis, 500000123);
  num_devis_sacea := num_devis;
  SELECT FC_DevisVersFacture(num_devis_sacea) INTO num_facture_sacea;
  detail := bml_put(detail,'sacea', 'false');
  detail := bml_put(detail,'sacea.devis', num_devis_sacea::text);
  detail := bml_put(detail,'sacea.facture', num_facture_sacea::text);

  -- Devis AAVA
--  IF aava THEN
    UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=3;
    SELECT nextval('seq_devis') INTO num_devis;
    INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero) SELECT num_devis, num_personne, '[JA] Abonnement du '||CURRENT_DATE,  current_employe();
    INSERT INTO ligne (de_numero, pd_numero, l_quantite) VALUES (num_devis, 500000109, 1);
    num_devis_aava := num_devis;
    SELECT FC_DevisVersFacture(num_devis_aava) INTO num_facture_aava;  
    INSERT INTO routage (pe_numero, ad_numero, ro_debutservice, ro_finservice, fa_numero, ro_quantite) 
      SELECT pe_numero, a.ad_numero, MAX(ro_finservice)+1, MAX(ro_finservice)+22, num_facture_aava,1 FROM routage r left join adresse a USING (pe_numero) where pe_numero=num_personne group by 1,2 ORDER BY 3 DESC LIMIT 1;
--      SELECT pe_numero, ad_numero, MAX(ro_finservice))+1, MAX(ro_finservice))+22 FROM routage left join adresse USING (pe_numero) WHERE pe_numero=num_personne;
  detail := bml_put(detail,'aava', 'true');
  detail := bml_put(detail,'aava.devis', num_devis_aava::text);
  detail := bml_put(detail,'aava.facture', num_facture_aava::text);
--  END IF;

  UPDATE employe SET EM_Service=num_service WHERE EM_Numero=num_employe;
  INSERT INTO cotisation (cs_numero, pe_numero,cs_societe, cs_detail, cs_annee, cs_done, cs_valid, cs_nature) VALUES (nextval('table_cotisation_cs_numero_seq'), num_personne, num_soc, detail, annee, true, true, 'ja');
  RETURN true;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;




CREATE OR REPLACE FUNCTION FC_Ajouter_GS(IN num_personne INTEGER, IN num_reglement INTEGER, IN num_fac_fdsea INTEGER) RETURNS BOOLEAN AS
$$
DECLARE
  num_service service.se_numero%TYPE;
  num_employe employe.em_numero%TYPE;
  num_devis       devis.de_numero%TYPE;
  num_devis_fdsea devis.de_numero%TYPE;
  num_devis_sacea devis.de_numero%TYPE;
  num_facture_fdsea facture.fa_numero%TYPE;
  num_facture_sacea facture.fa_numero%TYPE;
  num_groupe impressiongroupe.ig_numero%TYPE;
  detail TEXT;
  annee INTEGER;
  num_soc INTEGER;
  compte INTEGER;
  montant NUMERIC;
BEGIN
  SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO annee;
  SELECT count(*) FROM personne where pe_numero=num_personne INTO compte;
  IF compte<=0 THEN
    RAISE EXCEPTION 'La cotisation GS ne peut pas être enregistrée car la fiche % n''existe pas',num_personne-1000000;
  END IF;
  SELECT count(*) FROM cotisation where cs_annee=annee AND pe_numero=num_personne AND cs_nature='gs' INTO compte;
  IF compte>0 THEN
    RAISE EXCEPTION 'Une cotisation GS est déjà enregistrée pour la fiche % et l''année %',num_personne-1000000,annee;
  END IF;
  SELECT count(*) FROM table_reglement where rg_numero=num_reglement AND so_numero=2 INTO compte;
  IF compte<=0 THEN
    RAISE EXCEPTION 'La cotisation GS ne peut pas être enregistrée car le règlement % n''existe pas', num_reglement;
  END IF;
  IF num_fac_fdsea IS NOT NULL THEN
    SELECT count(*) FROM table_facture where fa_numero=num_fac_fdsea AND so_numero=2 INTO compte;
    IF compte<=0 THEN
      RAISE EXCEPTION 'La cotisation GS ne peut pas être enregistrée car la facture % n''existe pas', num_fac_fdsea;
    END IF;
  END IF;

  -- Impression
  SELECT nextval('seq_impressiongroupe') INTO num_groupe;
  INSERT INTO table_impressiongroupe (ig_numero, il_numero, ig_date) VALUES (num_groupe,1,CURRENT_DATE);

  -- Sauvegarde du statut de l'utilisateur
  SELECT EM_Service, EM_Numero FROM Employe WHERE em_login=CURRENT_USER INTO num_service, num_employe;

  detail := '';
  detail := bml_put(detail,'saved', 'true');
  detail := bml_put(detail,'reglement.numero', num_reglement::text);
  -- FDSEA
  num_facture_fdsea := num_fac_fdsea;
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=2;
  IF num_facture_fdsea IS NULL THEN
    SELECT nextval('seq_devis') INTO num_devis;
    INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero) SELECT num_devis, num_personne, '[GS] Cotisation du '||CURRENT_DATE, num_employe;
    INSERT INTO ligne(de_numero, pd_numero) VALUES (num_devis, 500000172);
    num_devis_fdsea := num_devis;
    SELECT FC_DevisVersFacture(num_devis_fdsea) INTO num_facture_fdsea;
    INSERT INTO table_facturereglement(rg_numero, fa_numero) VALUES (num_reglement, num_facture_fdsea);
  END IF;
  INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe, 'facture', num_facture_fdsea);
  INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe, 'carte', num_facture_fdsea); 
  SELECT fa_montantttc FROM table_facture WHERE fa_numero=num_facture_fdsea INTO montant;
  detail := bml_put(detail,'fdsea', 'true');
  detail := bml_put(detail,'fdsea.devis', num_devis_fdsea::text);
  detail := bml_put(detail,'fdsea.facture', num_facture_fdsea::text);
  detail := bml_put(detail,'fdsea.montant', montant::text);
  detail := bml_put(detail,'fdsea.associe', 'false');
  detail := bml_put(detail,'fdsea.conjoint', 'false');
  detail := bml_put(detail,'fdsea.hectare', 'false');

  -- SACEA
  detail := bml_put(detail,'sacea', 'false'); -- 15 % quand même
/*
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=1;
  SELECT nextval('seq_devis') INTO num_devis;
  INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero) SELECT num_devis, num_personne, '[GS] Abonnement conseil du '||CURRENT_DATE, current_employe();
  INSERT INTO ligne (de_numero, pd_numperero) VALUES (num_devis, 500000123);
  num_devis_sacea := num_devis;
  SELECT FC_DevisVersFacture(num_devis_sacea) INTO num_facture_sacea;
  detail := bml_put(detail,'sacea.devis', num_devis_sacea::text);
  detail := bml_put(detail,'sacea.facture', num_facture_sacea::text);
*/
  -- COTISATION
  UPDATE employe SET EM_Service=num_service WHERE EM_Numero=num_employe;
  INSERT INTO cotisation (cs_numero, pe_numero,cs_societe, cs_detail, cs_annee, cs_done, cs_valid, cs_nature, cs_montant, ig_numero) VALUES (nextval('table_cotisation_cs_numero_seq'), num_personne, NULL, detail, annee, true, true, 'gs', montant, num_groupe);
  RETURN true;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;







/* 
 *
 */
CREATE OR REPLACE FUNCTION FC_Simple_Facture(IN num_personne INTEGER, IN num_prix INTEGER, IN quantity INTEGER, IN reg_date DATE, IN reg_banque VARCHAR(32), IN reg_compte VARCHAR(32), IN reg_cheque VARCHAR(32), IN num_modereglement INTEGER) RETURNS TEXT AS
$$
DECLARE
  num_numfact TEXT;
  num_devis devis.de_numero%TYPE;
  num_facture facture.fa_numero%TYPE;
  reg_montant reglement.rg_montant%TYPE;
  num_reglement reglement.rg_numero%TYPE;
  num_groupe impressiongroupe.ig_numero%TYPE;
  test BOOLEAN;
BEGIN
  SELECT em_reglement FROM employe WHERE em_login=CURRENT_USER INTO test;
  IF NOT test THEN
    RAISE EXCEPTION 'Vous n''avez pas le droit de faire de facturation rapide.';
  END IF;
  SELECT em_self_invoicing FROM employe WHERE em_login=CURRENT_USER INTO test;
  IF NOT test THEN
    RAISE EXCEPTION 'Vous n''avez pas le droit de facturer.';
  END IF;
  SELECT nextval('seq_devis') INTO num_devis;
  INSERT INTO devis(pe_numero, de_numero, de_libelle, em_numero) SELECT num_personne, num_devis, '[MAJCC] Abonnement du '||CURRENT_DATE, current_employe();
  INSERT INTO ligne(de_numero, px_numero, l_quantite) SELECT num_devis, num_prix, COALESCE(quantity,1);
  
  SELECT de_montantttc, nextval('seq_reglement') FROM devis WHERE de_numero=num_devis INTO reg_montant, num_reglement;
  

  SELECT FC_DevisVersFacture(num_devis) INTO num_facture;

  IF num_modereglement IS NOT NULL THEN
    INSERT INTO reglement(pe_numero, rg_numero, rg_montant, rg_date, rg_libellebanque, rg_numerocompte, rg_reference, em_numero, mr_numero) SELECT num_personne, num_reglement, reg_montant, reg_date, reg_banque, reg_compte, reg_cheque, current_employe(), num_modereglement;
    INSERT INTO facturereglement(rg_numero,fa_numero) VALUES (num_reglement, num_facture);  
  END IF;

  SELECT nextval('seq_impressiongroupe') INTO num_groupe;
  INSERT INTO impressiongroupe (ig_numero, il_numero, ig_date) VALUES (num_groupe,2,CURRENT_DATE);
  INSERT INTO impressiondocument (id_numero, ig_numero,id_modele,id_cle) VALUES (nextval('table_impressiondocument_id_numero_seq'), num_groupe, 'facture', num_facture);

  SELECT fa_numfact FROM facture WHERE fa_numero=num_facture INTO num_numfact;
  RETURN num_numfact;
END;
$$ LANGUAGE 'plpgsql';



CREATE OR REPLACE FUNCTION FC_Facture_Une_Ligne(IN num_personne INTEGER, IN num_produit INTEGER, IN quantity NUMERIC, IN notes VARCHAR) RETURNS TEXT AS
$$
DECLARE
  num_numfact facture.fa_numfact%TYPE;
  num_devis devis.de_numero%TYPE;
  num_facture facture.fa_numero%TYPE;
  test BOOLEAN;
BEGIN
  SELECT em_self_invoicing FROM employe WHERE em_login=CURRENT_USER INTO test;
  IF NOT test THEN
    RAISE EXCEPTION 'Vous n''avez pas le droit de facturer.';
  END IF;
  SELECT nextval('seq_devis') INTO num_devis;
  INSERT INTO devis(pe_numero, de_numero, de_libelle, em_numero) SELECT num_personne, num_devis, pd_libelle, current_employe() FROM produit WHERE pd_numero=num_produit;
  INSERT INTO ligne(de_numero, pd_numero, l_quantite, l_notes) VALUES (num_devis, num_produit, quantity, notes);
  
  SELECT FC_DevisVersFacture(num_devis) INTO num_facture;

  SELECT fa_numfact FROM facture WHERE fa_numero=num_facture INTO num_numfact;
  RETURN num_numfact;
END;
$$ LANGUAGE 'plpgsql';





CREATE OR REPLACE FUNCTION to_num(IN s TEXT) RETURNS TEXT AS
$$
DECLARE
  ret TEXT;
BEGIN
  SELECT ROUND(COALESCE(s::numeric,0),2)::numeric(16,2)::text INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql';



CREATE OR REPLACE FUNCTION FC_evoplus_print(IN default_lot INTEGER) RETURNS TEXT AS
$$
DECLARE
  adresse TEXt;
  query TEXT;
  sommaire TEXT;
  compte INTEGER;
  num_lot INTEGER;
BEGIN
  IF default_lot IS NULL THEN
    SELECT count(*) FROM table_evoplus WHERE lot IS NULL INTO compte;
    IF compte>0 THEN
      SELECT COALESCE(max(lot),0)+1 FROM table_evoplus INTO num_lot;
      UPDATE table_evoplus SET lot=num_lot WHERE lot IS NULL;
    ELSE 
      SELECT COALESCE(max(lot),0) FROM table_evoplus INTO num_lot;
    END IF;
  ELSE
    num_lot := default_lot;
  END IF;

  SELECT SUBSTR(COALESCE(FC_Imprime2('evoplusrem', num_lot),''),8) INTO sommaire;

  UPDATE table_evoplus SET Filename=FC_Imprime2('evoplus', id) WHERE lot=num_lot;
  -- Concatenation des documents
  SELECT '/tmp/evolot.pdf' INTO adresse;
  SELECT 'SELECT execution(''cd /tmp && touch '||adresse||E' && chmod 755 '||adresse||E' && gs -q -sPAPERSIZE=letter -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile='||adresse||' '||sommaire||concatenate(' '||SUBSTR(COALESCE(filename,''),8))||E''');'
    FROM (SELECT filename FROM table_evoplus WHERE lot=num_lot and statut not ilike '%DEJA ADH%' and pe_numero not in (select pe_numero from table_cotisation where cs_annee=2008) and pe_numero not in (select COALESCE(cs_societe,0) from table_cotisation where cs_annee=2008) ORDER BY id) x
    INTO query;
  RAISE NOTICE '> Query : %', query;
  IF query IS NOT NULL THEN
    EXECUTE query;
  ELSE
    RAISE NOTICE 'Pas d''impressions.';
  END IF;
  RETURN 'file://'||adresse;
END;
$$ LANGUAGE 'plpgsql';





