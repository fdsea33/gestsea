/*****************************************************************************\
 *                                                                           *
 *                 F O N C T I O N S      G E S T S E A                      *
 *                                                                           *
\*****************************************************************************/

/*****************************************************************************\
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
 *                                                                           *
\*****************************************************************************/

/*****************************************************************************\
 * Procédures/Fonctions simples                                              *
\*****************************************************************************/


--===========================================================================--
-- Fonction qui calcule les nième ligne non vide d'une adresse
--DROP FUNCTION FC_AdresseLigne(integer,INTEGER);

CREATE OR REPLACE FUNCTION FC_AdresseLigne(adresse_num integer, num integer) RETURNS TEXT AS
$$
DECLARE
  lines text[4];
  compact text[4];
  d integer;
  e integer;
  r record;
BEGIN
  IF num-2>3 THEN
    RAISE EXCEPTION 'Index too big %>3',num;
  END IF;
  SELECT ad_ligne2 AS t1,ad_ligne3 AS t2,ad_ligne4 AS t3,ad_ligne5 AS t4 FROM adresse WHERE ad_numero=adresse_num INTO r;
  e := 0;
  IF LENGTH(TRIM(r.t1))>0 THEN
    compact[e] := r.t1;
    e := e +1;
  END IF;
  IF LENGTH(TRIM(r.t2))>0 THEN
    compact[e] := r.t2;
    e := e +1;
  END IF;
  IF LENGTH(TRIM(r.t3))>0 THEN
    compact[e] := r.t3;
    e := e +1;
  END IF;
  IF LENGTH(TRIM(r.t4))>0 THEN
    compact[e] := r.t4;
    e := e +1;
  END IF;
  RETURN compact[num-2];
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Procedure permettant de mettre à jour les montants du devis passé en paramètre
--DROP FUNCTION FC_CalculSommeDevis(INTEGER);

CREATE OR REPLACE FUNCTION FC_Devis_Totalize(IN num_devis INTEGER) RETURNS VOID AS
$$ UPDATE Devis SET DE_MontantHT=ROUND(T.MontantHT,2), DE_MontantTTC=ROUND(T.MontantTTC,2) FROM (SELECT sum(l_montantht*(CASE WHEN pd_reduction THEN 1-de_reduction/100 ELSE 1 END)) AS MontantHT, sum(l_montantttc*(CASE WHEN pd_reduction THEN 1-de_reduction/100 ELSE 1 END)) AS MontantTTC FROM ligne join devis using (de_numero) join produit using (pd_numero) WHERE ligne.de_numero=$1) AS T WHERE devis.de_numero=$1; $$ LANGUAGE SQL;

/*

(SELECT sum(S.MontantHT) AS TotalHT, sum(S.MontantTTC) AS TotalTTC 
            FROM
      (SELECT sum(l_montantht*((100-de_reduction)/100)) AS MontantHT, sum(l_montantttc*((100-de_reduction)/100)) AS MontantTTC
          FROM ligne join produit using (pd_numero)
          WHERE de_numero = numdevis AND pd_reduction
        UNION
        SELECT sum(l_montantht) AS MontantHT, sum(l_montantttc) AS MontantTTC
          FROM ligne join produit using (pd_numero)
          WHERE de_numero = numdevis AND NOT PD_Reduction
       ) AS S ) AS T
    where devis.DE_NUMERO  = numdevis;


  UPDATE Devis SET DE_MontantHT=T.TotalHT, DE_MontantTTC=T.TotalTTC 
    FROM (SELECT sum(S.MontantHT) AS TotalHT, sum(S.MontantTTC) AS TotalTTC 
            FROM
      (SELECT sum(l_montantht*((100-de_reduction)/100)) AS MontantHT, 
  sum(l_montantttc*((100-de_reduction)/100)) AS MontantTTC
          FROM devis left join ligne using (de_numero)
                     left join produit using (pd_numero)
          WHERE devis.de_numero = numdevis AND pd_reduction
        union
        SELECT sum(l_montantht) AS MontantHT, sum(l_montantttc) AS MontantTTC
          FROM devis left join ligne using (de_numero)
                     left join produit using (pd_numero)
          WHERE devis.de_numero = numdevis AND NOT PD_Reduction
       ) AS S ) AS T
    where devis.DE_NUMERO  = numdevis;
  RETURN true;
*/

--===========================================================================--
-- Procedure permettant de calculer le taux de réduction d'une personne à une date d
--DROP FUNCTION FC_Personne_Reduction(INTEGER,DATE);

CREATE OR REPLACE FUNCTION FC_Personne_Reduction(IN num_personne INTEGER, IN computed_on DATE) RETURNS NUMERIC AS
$$ 
DECLARE
  compte INTEGER;
  sacea TEXT;
  annee INTEGER;
BEGIN
--  RAISE EXCEPTION 'Le calcul de réduction est en cours de développement.';
  sacea := 'null';
  SELECT EXTRACT(YEAR FROM computed_on) INTO annee;
  SELECT count(*) FROM cotisation WHERE pe_numero=num_personne AND cs_annee=annee INTO compte;
  IF compte>0 THEN
    SELECT bml_extract(cs_detail,'sacea') FROM cotisation WHERE pe_numero=num_personne INTO sacea;
  ELSE
    SELECT count(*) FROM cotisation WHERE cs_societe=num_personne AND cs_annee=annee INTO compte;
    IF compte>0 THEN
      SELECT bml_extract(cs_detail,'sacea') FROM cotisation WHERE cs_societe=num_personne INTO sacea;
    ELSE
      SELECT el_personne1 FROM estlie JOIN cotisation ON (el_personne1=pe_numero) WHERE tl_code='>GERE>' AND el_personne2=num_personne INTO compte;
      IF compte is not null THEN
        SELECT bml_extract(cs_detail,'sacea') FROM table_cotisation WHERE pe_numero=compte INTO sacea;
      END IF;
    END IF;
  END IF;

  IF sacea='true' THEN
    RETURN 25.00;
  ELSIF sacea='null' THEN
    RETURN 0.00;
  ELSE
    RETURN 15.00;
  END IF;
END;
$$ LANGUAGE 'plpgsql';

--===========================================================================--
-- Calcule la premiere date utilisable d'un journal à partir d'un mois et d'une année
--DROP FUNCTION FC_Cloture(integer,integer);

CREATE OR REPLACE FUNCTION FC_Cloture(integer,integer) RETURNS date AS
$$
DECLARE
  mois ALIAS FOR $1;
  annee ALIAS FOR $2;
  cloture text;
BEGIN
  cloture:='01/';
  IF mois>=12 THEN
    cloture:=cloture||'01/'||annee+1;
  ELSE
    cloture:=cloture||to_char(mois+1,'FM09')||'/'||annee;
  END IF;
  return cloture::date;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Calcule une date de paiement en fonction de 4 paramètres
--   Date de départ
--   Nombre de jours à partir de la date de départ
--   Fin de mois
--   Nombre de jours supplémentaires

CREATE OR REPLACE FUNCTION FC_Echeance(IN done_on DATE, IN days INTEGER, IN end_of_month BOOLEAN, IN supp INTEGER) RETURNS DATE AS
$$
DECLARE
  paid_on DATE;
BEGIN
  SELECT done_on+(days||' days')::INTERVAL INTO paid_on;
  IF end_of_month THEN
    SELECT (TO_CHAR(paid_on+('1 month')::INTERVAL, 'YYYY-MM')||'-01')::DATE-('1 day')::INTERVAL INTO paid_on;
  END IF;
  SELECT paid_on+(supp||' days')::INTERVAL INTO paid_on;
  RETURN paid_on;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Scanne la table des factures et met à jour la table des adhésions pour toutes les sociétés.     --
-- Cette fonction ne peut être utilisée que par les administrateurs de la base de données.         --
-- Note cette fonction peut-être adaptée pour tout le monde en passsant par une vue.
--DROP FUNCTION FC_MAJ_Adhesion();
/*
CREATE OR REPLACE FUNCTION FC_MAJ_Adhesion() RETURNS integer AS
$$
BEGIN
  DELETE FROM Adhesion;
  ALTER SEQUENCE seq_adhesion RESTART WITH 1;
  INSERT INTO Adhesion (as_reductionmax,pe_numero,po_numero,ah_numero,fa_numero,lf_numero, as_origine)
    SELECT ah_reduction, pe_numero, po_numero, ah_numero, fa_numero, lf_numero, as_origine
      FROM VUE_Adhesion;
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;
*/

--===========================================================================--
-- Met à jour les totaux debit/crédit des pièces et journaux
--DROP FUNCTION FC_MAJ_Totaux();

CREATE OR REPLACE FUNCTION FC_MAJ_Totaux() RETURNS integer AS
$$
BEGIN
  UPDATE table_piece SET pi_credit=total.pi_credit, pi_debit=total.pi_debit 
    FROM  vue_totaux_piece AS total
    WHERE table_piece.pi_numero=total.pi_numero;
  UPDATE table_journal SET jo_credit=total.jo_credit, jo_debit=total.jo_debit 
    FROM  vue_totaux_journal AS total
    WHERE table_journal.jo_numero=total.jo_numero;
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Fusionne le produit 2 au produit 1
--DROP FUNCTION FC_FusionneProduit(integer,integer);

CREATE OR REPLACE FUNCTION FC_FusionneProduit(p1 integer, p2 integer) RETURNS boolean AS
$$
DECLARE
  unvalid boolean;
BEGIN
  SELECT a.pd_actif=b.pd_actif FROM table_produit a, table_produit b WHERE a.pd_numero=p1 AND b.pd_numero=p2 INTO unvalid;
  IF unvalid THEN
    RAISE EXCEPTION 'Les produits ont le même statut d''activité';
  END IF;
  -- Rapatriement des prix
  UPDATE table_prix SET px_actif=false, pd_numero=p1 WHERE pd_numero=p2;
  -- Rapatriement des comptes produit
  UPDATE table_compteproduit SET ci_actif=false, pd_numero=p1 WHERE pd_numero=p2;
  -- Rapatriement des lignes de devis
  UPDATE table_ligne SET pd_numero=p1 WHERE pd_numero=p2;
  -- Rapatriement des lignes de facture
  UPDATE table_lignefacture SET pd_numero=p1 WHERE pd_numero=p2;
  -- Rapatriement des lignes d'avoir
  UPDATE table_ligneavoir SET pd_numero=p1 WHERE pd_numero=p2;
  -- Rapatriement des lignes de modele
  UPDATE table_lignemodele SET pd_numero=p1 WHERE pd_numero=p2;
  -- Rapatriement des types d'adhesion
  UPDATE table_adherence SET pd_numero=p1 WHERE pd_numero=p2;
  -- Suppression du produit
  DELETE FROM table_produit WHERE pd_numero=p2;
  RETURN true;  
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Transforme le detail d'une cotisation en lignes

CREATE OR REPLACE FUNCTION fc_create_cotisation_lines(IN cs_num INTEGER) RETURNS INTEGER AS
$$
DECLARE
  c record;
  ligne text;
  num integer;
BEGIN
  SELECT * FROM table_cotisation WHERE cs_numero=cs_num INTO c;
  DELETE FROM table_lignecotisation WHERE cs_numero=cs_num;
  num := 1;
  LOOP
    ligne:=split_part(c.cs_detail,E'\n',num);
    num:=num+1;
    EXIT WHEN ligne='';
    INSERT INTO table_lignecotisation(cs_numero,key,value) VALUES (c.cs_numero, LTRIM(split_part(ligne,':',1),'{'), RTRIM(split_part(ligne,':',2),'}'));
  END LOOP;
  RETURN num;
END;
$$ LANGUAGE 'plpgsql';


--===========================================================================--
-- Fusionne le produit 2 au produit 1
--DROP FUNCTION FC_Sequence(integer,integer);

CREATE OR REPLACE FUNCTION FC_Sequence(starts integer, ends integer) RETURNS setof integer AS
$$
DECLARE
  crement integer;
  ind integer;
  rec record;
BEGIN
  SELECT CASE WHEN ends>=starts THEN 1 ELSE -1 END INTO crement;
  ind := starts;
  LOOP
--    SELECT ind INTO rec;
    RETURN NEXT ind;
    IF ind=ends THEN
      EXIT;
    END IF;
    ind := ind + crement;
  END LOOP;
  RETURN;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Fonctions Sequence
--DROP FUNCTION FC_NextVal(INTEGER);

CREATE OR REPLACE FUNCTION FC_NextVal(IN num_sequence INTEGER) RETURNS integer AS
$$
DECLARE
  total INTEGER;
  lasti INTEGER;
  i INTEGER;
  val INTEGER;
  num_cache INTEGER;
  SEQ table_sequence%ROWTYPE;
BEGIN
  SELECT * FROM table_Sequence WHERE sq_numero=num_sequence FOR UPDATE OF table_Sequence INTO SEQ;
  IF SEQ.SQ_Numero IS NULL THEN
    RAISE EXCEPTION 'La séquence n°% n''existe pas.', num_sequence;
  END IF;
  IF SEQ.SQ_Clear_Cache THEN
    DELETE FROM table_SequenceCache WHERE SQ_Numero=SEQ.SQ_Numero;
  END IF;
  SELECT count(*) FROM table_SequenceCache WHERE SQ_Numero=SEQ.SQ_Numero INTO total;
  IF total<SEQ.SQ_Nombre+1 THEN
    lasti := SEQ.SQ_Last+(SEQ.SQ_Nombre-total)+1;
    FOR i IN SEQ.SQ_Last+1..lasti LOOP
      INSERT INTO table_SequenceCache(sq_numero, sc_valeur) VALUES (SEQ.SQ_Numero, i);
    END LOOP;
    SEQ.SQ_Last := lasti;
  END IF;
  SELECT sc_numero, sc_valeur FROM table_SequenceCache WHERE NOT SC_Locked AND SQ_Numero = SEQ.SQ_Numero ORDER BY sc_valeur FOR UPDATE OF table_SequenceCache INTO num_cache, val;
  DELETE FROM table_SequenceCache WHERE SC_Numero=num_cache;
  UPDATE table_Sequence SET SQ_Last = lasti, SQ_Clear_cache=false, SQ_Used_On=CURRENT_TIMESTAMP WHERE SQ_Numero=SEQ.SQ_Numero;
  RETURN val;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Fonctions Sequence
--DROP FUNCTION FC_NextVal(TEXT);

CREATE OR REPLACE FUNCTION FC_NextVal(IN nom_sequence TEXT) RETURNS integer AS
$$
DECLARE
  val INTEGER;
  num_sequence table_sequence.sq_numero%TYPE;
BEGIN
  SELECT sq_numero FROM table_Sequence WHERE sq_nom ilike nom_sequence INTO num_sequence;
  IF num_sequence IS NULL THEN
    RAISE EXCEPTION 'La séquence ''%'' n''existe pas.', nom_sequence;
  END IF;
  SELECT FC_Nextval(num_sequence) INTO val;
  RETURN val;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Fonctions Sequence
--DROP FUNCTION FC_NextVal(TEXT);
/*
CREATE OR REPLACE FUNCTION FC_NextVal2(IN nom TEXT, IN nb integer) RETURNS TEXT AS
$$
DECLARE
  i INTEGER;
  ret TEXT;
BEGIN
  ret := '';
  FOR i IN 1..nb LOOP
    SELECT ret||' '||fc_nextval(nom) INTO ret;
  END LOOP;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;
*/


/*****************************************************************************\
 * Fonctions Triggers                                                        *
\*****************************************************************************/
-- Elles sont triées par tables dans l'ordre alphabétique.                                        

-- Activite
--===========================================================================--
-- DROP TRIGGER trigger_Activite_validation ON table_Activite;
--DROP FUNCTION TG_Activite_validation();

CREATE OR REPLACE FUNCTION TG_Activite_validation() RETURNS trigger AS
$$
DECLARE
  pour text;
  compte integer;
  temp integer;
BEGIN
  IF NEW.ZA_Qui=0 THEN
    SELECT count(*) FROM Facture WHERE NEW.ZA_Champ::integer=FA_Numfact INTO compte;
    IF compte=1 THEN
      SELECT FA_Numero, PE_Numero FROM Facture WHERE NEW.ZA_Champ::integer=FA_Numfact INTO NEW.FA_Numero, temp;
      SELECT PE_Libelle FROM Personne WHERE PE_Numero=temp INTO pour;
    ELSE
      RAISE EXCEPTION 'Le numéro de facture que vous avez donné n''existe pas.';
    END IF;
  ELSIF NEW.ZA_Qui=1 THEN
    SELECT count(*) FROM Devis WHERE 500000000+NEW.ZA_Champ::integer=DE_Numero INTO compte;
    IF compte=1 THEN
      SELECT DE_Numero, PE_Numero FROM Devis WHERE 500000000+NEW.ZA_Champ::integer=DE_Numero INTO NEW.DE_Numero, temp;      
      SELECT PE_Libelle FROM Personne WHERE PE_Numero=temp INTO pour;
    ELSE
      RAISE EXCEPTION 'Le numéro de devis que vous avez donné n''existe pas.';
    END IF;
  ELSIF NEW.ZA_Qui=2 THEN
    SELECT count(*) FROM Personne WHERE NEW.ZA_Champ::integer=PE_Numpersonne::integer INTO compte;
    IF compte=1 THEN
      SELECT PE_Numero, PE_Numero FROM Personne WHERE NEW.ZA_Champ::integer=PE_Numpersonne::integer INTO NEW.PE_Numero, temp;   
      SELECT PE_Libelle FROM Personne WHERE PE_Numero=temp INTO pour;
    ELSE
      RAISE EXCEPTION 'Le numéro de personne que vous avez donné n''existe pas.';
    END IF;
  ELSIF NEW.ZA_Qui=3 THEN
    SELECT ZG_Libelle, ZG_Numero FROM Groupe WHERE ZG_Numero=NEW.ZA_Champ::integer INTO pour, NEW.ZG_Numero;
  END IF;
  NEW.ZA_Pour = pour;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_Activite_validation 
  BEFORE INSERT OR UPDATE ON table_Activite 
  FOR EACH ROW EXECUTE PROCEDURE TG_Activite_validation();


-- Adresse
--===========================================================================--
-- DROP TRIGGER trigger_Adresse_treatments ON table_Adresse;
--DROP FUNCTION TG_Adresse_treatments();

CREATE OR REPLACE FUNCTION TG_Adresse_treatments() RETURNS trigger AS
$$
DECLARE
  op text;
BEGIN
  IF TG_OP='DELETE' THEN
    RAISE EXCEPTION 'Les adresses ne peuvent pas être supprimées !';
    RETURN OLD;
  ELSE
    op := TG_OP;
    IF TG_OP='UPDATE' THEN
      IF OLD.AD_Active AND NOT NEW.AD_Active THEN
        op := 'DELETE';
      END IF;
    END IF;
    INSERT INTO AdresseVersion(ad_numero,ak_numero,cp_numero, vi_numero, pe_numero, aw_ligne2, aw_Ligne3, aw_Ligne4, aw_Ligne5, version, operation) 
      VALUES(NEW.ad_numero, NEW.ak_numero, NEW.cp_numero, NEW.vi_numero, NEW.pe_numero, NEW.ad_ligne2, NEW.ad_Ligne3, NEW.ad_Ligne4, NEW.ad_Ligne5,NEW.lock_version,op);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_Adresse_treatments 
  AFTER INSERT OR UPDATE OR DELETE ON table_Adresse 
  FOR EACH ROW EXECUTE PROCEDURE TG_Adresse_treatments();


--===========================================================================--
-- Vérifie certaines caractéristiques d'un contact
-- DROP TRIGGER trigger_contact_validation ON table_Contact;
--DROP FUNCTION TG_Contact_validation();

CREATE OR REPLACE FUNCTION TG_Contact_validation() RETURNS trigger AS
$$
DECLARE
  ctype record;
  good boolean;
BEGIN
  SELECT * FROM contacttype WHERE ck_numero=NEW.ck_numero INTO ctype;
  good := false;
  NEW.cn_coordonnee = LOWER(REPLACE(TRIM(NEW.cn_coordonnee),' ',''));
  IF ctype.ck_number THEN
    IF NOT NEW.cn_coordonnee ~ E'^\\+?\\d{6,}$' THEN
      IF ctype.ck_email OR ctype.ck_url THEN
        good := false;
      ELSE
        RAISE EXCEPTION 'La coordonnée doit contenir que des chiffres.';
      END IF;
    END IF;
  END IF;
  IF ctype.ck_email AND NOT good THEN
    IF NOT NEW.cn_coordonnee  ~ E'^(\\w|\\_|\\-|\\.)*\@(\\w|\\_|\\-|\\.)*\\.\\w{1,5}$' THEN
      IF ctype.ck_url THEN
        good := false;
      ELSIF ctype.ck_number THEN
        RAISE EXCEPTION 'La coordonnée doit contenir un numéro ou une adresse e-mail.';
      ELSE
        RAISE EXCEPTION 'La coordonnée doit contenir une adresse e-mail.';
      END IF;
    END IF;
  END IF;
  IF ctype.ck_url AND NOT good THEN
    IF NEW.cn_coordonnee ~ E'^\\w*\\://(\\w|\\_|\\-|\\.)*\\.\\w{1,5}(/(\\w|\\_|\\-|\\.|\\=|\\&|\\?|/)*)+$' THEN
      NEW.cn_coordonnee = regexp_replace(NEW.cn_coordonnee, E'^\\w*\\://','');
    END IF;
    IF NOT NEW.cn_coordonnee  ~ E'^(\\w|\\_|\\-|\\.)*\\.\\w{1,5}(/(\\w|\\_|\\-|\\.|\\=|\\&|\\?|/)*)+$' THEN
      IF ctype.ck_url THEN
        good := false;
      ELSIF ctype.ck_number THEN
        RAISE EXCEPTION 'La coordonnée doit contenir un numéro ou une adresse web.';
      ELSIF ctype.ck_email THEN
        RAISE EXCEPTION 'La coordonnée doit contenir une adresse e-mail ou une adresse web.';
      ELSE
        RAISE EXCEPTION 'La coordonnée doit contenir une adresse web.';
      END IF;
    END IF;
  END IF;
  RETURN New;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER trigger_Contact_validation
  BEFORE INSERT OR UPDATE ON table_Contact
  FOR EACH ROW EXECUTE PROCEDURE TG_Contact_validation();




--===========================================================================--
-- DROP TRIGGER trigger_Contact_treatments ON table_contact;
--DROP FUNCTION TG_Contact_treatments();

CREATE OR REPLACE FUNCTION TG_contact_treatments() RETURNS trigger AS
$$
DECLARE
  op text;
  ok boolean;
  compte integer;
BEGIN
  IF TG_OP='DELETE' THEN
    SELECT count(*) FROM contactversion WHERE pe_numero=OLD.pe_numero INTO compte;
    IF compte>0 THEN
      RAISE EXCEPTION 'Ca ne devrait jamais arriver de supprimer un contact. Prévenez votre informaticien.';
    END IF;
--    INSERT INTO contact(ck_numero,pe_numero, cw_coordonnee, version, operation) VALUES(OLD.ck_numero, OLD.pe_numero, OLD.cn_coordonnee, OLD.lock_version, TG_OP);
    RETURN OLD;
  ELSE
    ok := true;
    IF NOT NEW.CN_Actif THEN
      op := 'DELETE';
    ELSE
      op := TG_OP;
      IF TG_OP='UPDATE' THEN
        SELECT NEW.CN_Coordonnee!=OLD.CN_Coordonnee INTO ok;
      END IF;
    END IF;
    IF ok THEN
      INSERT INTO contactversion(ck_numero,pe_numero, cw_coordonnee, version, operation, cn_numero) 
        VALUES(NEW.ck_numero, NEW.pe_numero, NEW.cn_coordonnee, NEW.lock_version, op, NEW.cn_numero);
    END IF;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_contact_treatments 
  AFTER INSERT OR UPDATE OR DELETE ON table_contact 
  FOR EACH ROW EXECUTE PROCEDURE TG_contact_treatments();


-- Cotisation
--===========================================================================--
-- Calcule la réduction devant être effectuée sur un devis
-- DROP TRIGGER trigger_Cotisation_validation  ON table_devis;
--DROP FUNCTION TG_Cotisation_validation();

CREATE OR REPLACE FUNCTION TG_Cotisation_validation() RETURNS TRIGGER AS
$$
BEGIN 
  IF TG_OP='UPDATE' THEN
    IF OLD.CS_Done AND current_user!='brice' THEN
      RETURN OLD;
    ELSE
      RETURN NEW;
    END IF;
  ELSIF TG_OP='DELETE' THEN
    IF OLD.CS_Done AND CURRENT_USER!='brice' THEN
      RAISE EXCEPTION 'Impossible de supprimer une cotisation traitée.';
    END IF;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_Cotisation_validation
  BEFORE UPDATE OR DELETE ON table_Cotisation 
  FOR EACH ROW EXECUTE PROCEDURE TG_Cotisation_validation();


-- Devis
--===========================================================================--
-- Calcule la réduction devant être effectuée sur un devis
-- DROP TRIGGER trigger_devis_validation  ON table_devis;
--DROP FUNCTION TG_Devis_validation();

CREATE OR REPLACE FUNCTION TG_Devis_validation() RETURNS TRIGGER AS
$$
DECLARE
  superuser boolean;
  compte INTEGER;
BEGIN 
  SELECT usesuper FROM pg_user WHERE usename=CURRENT_USER INTO superuser;
  IF TG_OP='INSERT' THEN
    IF NOT superuser THEN
      SELECT count(*) FROM estlie WHERE tl_numero=1003 AND el_personne1=NEW.pe_numero INTO compte;
      IF compte>0 THEN
        RAISE EXCEPTION 'La personne possède une société, il vous faut donc utiliser la société pour faire un devis.\nMerci de votre compréhension.\n\nConseil : Pour trouver la société, allez voir dans l''onglet des liens.';
      END IF;
      SELECT count(*) FROM estlie WHERE tl_numero=1006 AND el_personne1=NEW.pe_numero INTO compte;
      IF compte>0 THEN
        RAISE EXCEPTION 'La fiche est un doublon connu, il vous faut donc utiliser la fiche originale pour faire un devis.\nMerci de votre compréhension.\n\nConseil : Pour trouver la vraie fiche, allez voir dans l''onglet des liens.';
      END IF;
    END IF;
    SELECT current_societe() INTO NEW.SO_Numero;
  END IF;
  IF NEW.em_numero IS NULL THEN
    IF TG_OP='INSERT' THEN
      SELECT current_employe() INTO NEW.em_numero;
    ELSE
      NEW.em_numero = OLD.em_numero;
    END IF;
  END IF;
  IF NOT NEW.de_locked THEN
    IF TG_OP='UPDATE' THEN
      IF NEW.DE_Reduction=OLD.DE_Reduction THEN
        SELECT FC_Personne_Reduction(NEW.PE_Numero, CURRENT_DATE) INTO NEW.DE_Reduction;
      END IF;
    ELSE
      SELECT FC_Personne_Reduction(NEW.PE_Numero, CURRENT_DATE) INTO NEW.DE_Reduction;
    END IF;
  
--  IF (TG_OP='INSERT' AND NOT NEW.de_locked) OR (TG_OP='UPDATE' AND NOT superuser) THEN
--    SELECT FC_Personne_Reduction(NEW.PE_Numero, CURRENT_DATE) INTO NEW.DE_Reduction;
/*
    SELECT COALESCE(MAX(AS_ReductionMax),0.00)
      FROM Adhesion JOIN Adherence USING (AH_Numero)
                    JOIN Periode USING (PO_Numero)
                    JOIN Produit USING (PD_Numero)
      WHERE (NEW.DE_Date BETWEEN PO_Debut AND PO_Fin) AND PE_Numero=New.PE_Numero 
        AND SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe)
      INTO NEW.DE_Reduction;
*/
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_devis_validation
  BEFORE INSERT OR UPDATE ON table_devis 
  FOR EACH ROW EXECUTE PROCEDURE TG_Devis_validation();


-- Droit
--===========================================================================--
-- Met à jour le droit ajouté ou modifié sur les éléments spécifiés dans les groupetables

-- DROP TRIGGER  trigger_droit_treatments ON table_droit;
--DROP FUNCTION TG_Droit_treatments();

CREATE OR REPLACE FUNCTION TG_Droit_treatments() RETURNS TRIGGER AS
$$
DECLARE
  query     text;
  MesElements GroupeTable%ROWTYPE;
  MonProfil   DroitProfil%ROWTYPE;
  rights   record;
  tt_revoke integer;
  tt_grant  integer;
BEGIN
  tt_revoke:=0;
  tt_grant :=0;

-- revoke all on all from all;
  FOR MesElements IN SELECT * FROM GroupeTable LOOP
    SELECT 'REVOKE ALL ON '||MesElements.GT_Tables||' FROM '||TRIM(concatenate(','||usename),',')||';' FROM pg_user INTO query;
    tt_revoke:=tt_revoke+1;  
    EXECUTE query;
  END LOOP;

-- grant pro on pro to pro;
  FOR MonProfil IN SELECT * FROM DroitProfil LOOP
    FOR rights IN SELECT * FROM Droit JOIN GroupeTable USING (GT_Numero) WHERE Droit.DP_Numero=MonProfil.DP_Numero LOOP
      SELECT 'GRANT '||TRIM(TRIM(TRIM(CASE WHEN rights.DR_Select THEN 'SELECT' ELSE '' END||CASE WHEN rights.DR_Insert THEN ',INSERT' ELSE '' END,',')||CASE WHEN rights.DR_Update THEN ',UPDATE' ELSE '' END,',')||CASE WHEN rights.DR_Delete THEN ',DELETE' ELSE '' END,',') ||' ON '||rights.GT_Tables||' TO '||TRIM(concatenate(em_login||','),',')||';'
        FROM Employe 
        WHERE Employe.DP_Numero=MonProfil.DP_Numero 
          AND EM_Login IN (SELECT usename FROM pg_user) INTO query;
      tt_grant :=tt_grant+1;
      IF query IS NOT NULL THEN
        EXECUTE query;
      END IF;
    END LOOP;
  END LOOP;
  RAISE NOTICE 'REVOKE %, GRANT %.',tt_revoke,tt_grant;
  RETURN New;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_droit_treatments 
  AFTER INSERT OR DELETE OR UPDATE ON table_droit 
  FOR EACH STATEMENT EXECUTE PROCEDURE TG_Droit_treatments();



-- Ecriture
--===========================================================================--
-- Verifie si l'ecriture est modifiable ou non  et met à jour le numéro de compte
-- DROP TRIGGER trigger_ecriture_validation ON table_ecriture;
--DROP FUNCTION  TG_Ecriture_validation();

CREATE OR REPLACE FUNCTION TG_Ecriture_validation() RETURNS TRIGGER AS
$$
DECLARE
  num_ecriture integer;
  num_piece    integer;
  ok           boolean;
BEGIN
  IF TG_OP='UPDATE' OR TG_OP='DELETE' OR TG_OP='INSERT'THEN
    IF TG_OP='INSERT' THEN
      num_ecriture:=NEW.EC_Numero;
      num_piece   :=NEW.PI_Numero;
      SELECT count(*)+1 
        FROM Ecriture
        WHERE PI_Numero=num_piece
        INTO NEW.EC_Numecriture;
    ELSE
      IF TG_OP='UPDATE' THEN
        IF OLD.PI_Numero<>NEW.PI_Numero THEN
          RAISE NOTICE 'Une écriture ne peut pas changer de pièce : %',NEW.EC_Numero; 
          NEW.PI_Numero:=OLD.PI_Numero;
        END IF;
      END IF;
      num_ecriture:=OLD.EC_Numero;
      num_piece   :=OLD.PI_Numero;
    END IF;
    SELECT PI_Date>=FC_Cloture(JO_Mois,JO_Annee) AS EC_OK 
      FROM Ecriture LEFT JOIN Piece USING (PI_Numero) 
                    LEFT JOIN Journal USING (JO_Numero) 
      WHERE EC_Numero=num_ecriture INTO ok;
    IF NOT ok THEN
      RAISE EXCEPTION 'La cloture étant effectuée, il n''est plus possible de faire cela.';
      RETURN New;
    END IF;
  END IF;

  IF TG_OP='INSERT' OR TG_OP='UPDATE' THEN
    IF New.EC_Debit=0 AND New.EC_Credit=0 THEN
      RAISE EXCEPTION 'Les champs credit et debit sont tous les deux a 0.';
      RETURN New;
    ELSIF New.EC_Debit!=0 AND New.EC_Credit!=0 THEN
      RAISE EXCEPTION 'Le champ credit ou le champ debit est incorrect.';
      RETURN New;
    END IF;
    IF New.EC_Aux THEN
      SELECT CG_Numero, CG_Numcompte||'.'||CA_Numcompte 
        FROM CompteAux LEFT JOIN CompteGen USING (CG_Numero) 
        WHERE CA_Numero=New.CA_Numero 
        INTO New.CG_Numero, New.EC_Compte;
    ELSE
      SELECT CG_NumCompte||''
        FROM CompteGen
        WHERE CG_Numero=NEW.CG_Numero
        INTO NEW.EC_Compte;
      New.CA_Numero:=NULL;
    END IF;
  END IF;
  RETURN New;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_ecriture_validation
  BEFORE INSERT OR UPDATE ON table_ecriture
  FOR EACH ROW EXECUTE PROCEDURE TG_ecriture_validation();

--DROP TRIGGER trigger_ecriture_validation ON table_ecriture;
--DROP FUNCTION  TG_Ecriture_validation();

--===========================================================================--
-- Calcul les sommes Crédit/Débit au niveau de la pièce et du journal très rapidement
-- DROP TRIGGER trigger_ecriture_treatments ON table_ecriture;
--DROP FUNCTION  TG_Ecriture_treatments();

CREATE OR REPLACE FUNCTION TG_Ecriture_treatments() RETURNS TRIGGER AS
$$
DECLARE
  num_piece   integer;
  num_journal integer;
BEGIN
  IF TG_OP='INSERT' THEN
    num_piece:=NEW.pi_numero;
    UPDATE piece SET pi_debit=pi_debit+NEW.ec_debit, pi_credit=pi_credit+NEW.ec_credit WHERE pi_numero=num_piece;
    SELECT jo_numero FROM piece WHERE piece.pi_numero=NEW.pi_numero INTO num_journal;
    UPDATE journal SET jo_debit=jo_debit+NEW.ec_debit, jo_credit=jo_credit+NEW.ec_credit WHERE jo_numero=num_journal;
  ELSIF TG_OP='UPDATE' THEN
    num_piece:=NEW.pi_numero;
    UPDATE piece SET pi_debit=pi_debit+NEW.ec_debit-OLD.ec_debit, pi_credit=pi_credit+NEW.ec_credit-OLD.ec_credit WHERE pi_numero=num_piece;
    SELECT jo_numero FROM piece WHERE piece.pi_numero=NEW.pi_numero INTO num_journal;
    UPDATE journal SET jo_debit=jo_debit+NEW.ec_debit-OLD.ec_debit, jo_credit=jo_credit+NEW.ec_credit-OLD.ec_credit WHERE jo_numero=num_journal;
  ELSIF TG_OP='DELETE' THEN
    num_piece:=OLD.pi_numero;
    UPDATE piece SET pi_debit=pi_debit-OLD.ec_debit, pi_credit=pi_credit-OLD.ec_credit WHERE pi_numero=num_piece;
    SELECT jo_numero FROM piece WHERE piece.pi_numero=OLD.pi_numero INTO num_journal;
    UPDATE journal SET jo_debit=jo_debit-OLD.ec_debit, jo_credit=jo_credit-OLD.ec_credit WHERE jo_numero=num_journal;
  END IF;
  RETURN New;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_ecriture_treatments
  AFTER INSERT OR UPDATE OR DELETE ON table_ecriture
  FOR EACH ROW EXECUTE PROCEDURE TG_ecriture_treatments();


-- Employé
--===========================================================================--
-- Gère le compte utilisateur au travers de la table d'employés 
-- DROP TRIGGER trigger_employe_validation ON table_employe;
--DROP FUNCTION TG_employe_validation();

CREATE OR REPLACE FUNCTION TG_employe_validation() RETURNS TRIGGER AS
$$
DECLARE
  query text;
  mdp text;
  compte INTEGER;
BEGIN
  mdp:='********';
  IF TG_OP!='DELETE' THEN
    IF NEW.EM_Societe_Invoicing THEN
      NEW.EM_Service_Invoicing := true;
    END IF;
    IF NEW.EM_Service_Invoicing THEN
      NEW.EM_Self_Invoicing := true;
    END IF;
  END IF;

  IF TG_OP='INSERT' OR TG_OP='UPDATE' THEN
    SELECT count(*) FROM pg_user WHERE usename=NEW.EM_Login INTO compte;
  END IF;

  IF TG_OP='INSERT' THEN
    New.EM_Login:=lower(New.EM_Login);
    IF compte<=0 THEN
      query:='CREATE USER '||New.EM_Login||' NOCREATEDB ';
      IF New.EM_Super THEN
        query:=query||'CREATEUSER ';
      ELSE
        query:=query||'NOCREATEUSER ';
      END IF;
      query:=query||'ENCRYPTED PASSWORD '''||New.EM_Password||''';';
      EXECUTE query;
    END IF;
    New.EM_Password:=mdp;
    RETURN New;
  ELSIF TG_OP='UPDATE' THEN
    New.EM_Login:=lower(New.EM_Login);
    IF New.EM_Login!=lower(Old.EM_Login) THEN
      IF compte<=0 THEN
        query:='ALTER USER '||Old.EM_Login||' RENAME TO '||New.EM_Login||';';
        EXECUTE query;
      END IF;
    END IF;
    IF New.EM_Password!=mdp THEN
      query:='ALTER USER '||New.EM_Login||' ENCRYPTED PASSWORD '''||New.EM_Password||''';';
      EXECUTE query;
      New.EM_Password:=mdp;
    END IF;
    IF New.EM_Super!=Old.EM_Super THEN
      query:='ALTER USER '||New.EM_Login;
      IF New.EM_Super THEN
        query:=query||' CREATEUSER;';
      ELSE
        query:=query||' NOCREATEUSER;';
      END IF;
      EXECUTE query;
    END IF;
    RETURN New;
  ELSIF TG_OP='DELETE' THEN
    query:='DROP USER '||Old.EM_Login||';';
    EXECUTE query;
    RETURN Old;
  END IF;  
--  RETURN New;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_employe_validation
  BEFORE INSERT OR DELETE OR UPDATE ON table_employe 
  FOR EACH ROW EXECUTE PROCEDURE TG_employe_validation();


-- EstLie
--===========================================================================--
-- Verifie si l'ecriture est modifiable ou non  et met à jour le numéro de compte
-- DROP TRIGGER trigger_ecriture_validation ON table_ecriture;
--DROP FUNCTION  TG_EstLie_validation();

CREATE OR REPLACE FUNCTION TG_EstLie_validation() RETURNS TRIGGER AS
$$
DECLARE
  num_ecriture integer;
  num_piece    integer;
  ok           boolean;
BEGIN
  IF NEW.tl_code IS NULL THEN
    SELECT tl_code FROM typelien WHERE tl_numero=NEW.tl_numero INTO NEW.tl_code;
  END IF;
  IF NEW.tl_numero IS NULL THEN
    SELECT tl_numero FROM typelien WHERE tl_code=NEW.tl_code INTO NEW.tl_numero;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_estlie_validation
  BEFORE INSERT OR UPDATE ON table_estlie
  FOR EACH ROW EXECUTE PROCEDURE TG_estlie_validation();


-- Ligne
--===========================================================================--
-- Calcule les montant TTC et HT de chaque ligne sans tenir compte de la réduction
-- DROP TRIGGER trigger_ligne_validation ON table_ligne;
--DROP FUNCTION TG_ligne_validation();

CREATE OR REPLACE FUNCTION TG_ligne_validation() RETURNS TRIGGER AS
$$
DECLARE
  tarifs record;
  compte integer;
  locked boolean;
  valid boolean;
BEGIN
  SELECT de_locked FROM devis WHERE de_numero=NEW.de_numero INTO locked;
  IF locked THEN
    IF TG_OP='INSERT' THEN
      RAISE EXCEPTION 'Vous ne pouvez pas modifier un devis verrouillé.';
    ELSE
      NEW.DE_Numero    := OLD.DE_Numero;
      NEW.L_MontantHT  := OLD.L_MontantHT;
      NEW.L_MontantTTC := OLD.L_MontantTTC;
      NEW.PX_Numero    := OLD.PX_Numero;
      SELECT NEW.PD_Numero=a.PD_Numero FROM Prix AS a WHERE a.px_numero=NEW.PX_Numero INTO valid;
      IF NOT valid THEN
        NEW.PD_Numero    := OLD.PD_Numero;
      END IF;
    END IF;
  ELSE
    IF NEW.PD_Numero IS NULL AND NEW.PX_Numero IS NULL THEN
      RAISE EXCEPTION 'Vous devez renseigner le produit ou le prix !';
    ELSIF NEW.PD_Numero IS NULL AND NEW.PX_Numero IS NOT NULL THEN
      SELECT PD_Numero FROM Prix WHERE PX_Numero=NEW.PX_Numero INTO NEW.PD_Numero;
    ELSIF NEW.PD_Numero IS NOT NULL AND NEW.PX_Numero IS NOT NULL THEN
      SELECT NEW.PX_Numero IN (SELECT PX_Numero FROM Prix WHERE New.PD_Numero=PD_Numero AND PX_actif) INTO valid;
      IF NOT valid THEN
        NEW.PX_Numero := NULL;
      END IF;
    END IF;

    IF NEW.PX_Numero IS NULL THEN
      SELECT count(*) FROM Prix WHERE New.PD_Numero=PD_Numero AND px_actif INTO compte;
      IF compte<1 THEN
        RAISE EXCEPTION 'Le produit "%" ne possède pas de tarifs. Il est impossible de l''utiliser dans cette situation.', NEW.PD_Numero;
      END IF;
      SELECT PX_Numero FROM Prix WHERE New.PD_Numero=PD_Numero AND px_actif ORDER BY prix.id DESC INTO NEW.PX_Numero;
    END IF;

    SELECT PX_tarifHT, PX_tarifTTC, PX_Libelle, PX_Numero FROM Prix WHERE NEW.PX_Numero=PX_Numero INTO tarifs;
    IF tarifs.PX_tarifHT IS NULL OR tarifs.PX_tarifTTC IS NULL THEN
      RAISE EXCEPTION 'Les tarifs pour le produit "%" ne sont pas corrects.', tarifs.PX_Libelle;
    END IF;
    New.L_MontantHT  := tarifs.PX_tarifHT*New.L_Quantite;
    New.L_MontantTTC := tarifs.PX_tarifTTC*New.L_Quantite;
  END IF;
  RETURN New;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_ligne_validation 
  BEFORE INSERT OR UPDATE ON table_ligne 
  FOR EACH ROW EXECUTE PROCEDURE TG_ligne_validation();


--===========================================================================--
-- Permet d'appeler la fonction qui remet à jour les montants TTC et HT d'un devis lors d'une 
-- modification de ses lignes
-- DROP TRIGGER trigger_ligne_calculmontantsdevis ON table_ligne;
--DROP FUNCTION TG_Ligne_CalculMontantsDevis();

CREATE OR REPLACE FUNCTION tg_ligne_treatments() RETURNS TRIGGER AS
$$
BEGIN
  -- Calcul des montants 
  IF TG_OP='DELETE' THEN
    PERFORM FC_Devis_Totalize(OLD.DE_Numero);
    RETURN OLD;
  ELSE
    PERFORM FC_Devis_Totalize(NEW.DE_Numero);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER trigger_ligne_treatments
  AFTER INSERT OR DELETE OR UPDATE ON table_ligne 
  FOR EACH ROW EXECUTE PROCEDURE tg_ligne_treatments();



--===========================================================================--
-- Permet de chercher la liste des reglements d'une personne et de l'attribuer
--  au nouvel enregistrement
CREATE OR REPLACE FUNCTION tg_listereglement_validation() RETURNS TRIGGER AS
$$
BEGIN
  IF TG_OP='INSERT' THEN
    SELECT COALESCE(MAX(lr_indice),0)+1 FROM listereglement WHERE em_numero=NEW.em_numero AND mr_numero=NEW.mr_numero INTO NEW.lr_indice;
    SELECT current_societe() INTO NEW.SO_Numero;
    SELECT current_date INTO NEW.lr_date;
    NEW.lr_montant := 0;
    SELECT COALESCE(sum(rg_montant),0) FROM reglement WHERE em_numero=NEW.em_numero AND mr_numero=NEW.mr_numero AND lr_numero IS NULL INTO NEW.lr_montant;
  ELSIF TG_OP='UPDATE' THEN
    NEW.em_numero = OLD.em_numero;
    NEW.mr_numero = OLD.mr_numero;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER trigger_listereglement_validation
  BEFORE INSERT OR UPDATE ON table_listereglement 
  FOR EACH ROW EXECUTE PROCEDURE tg_listereglement_validation();

--===========================================================================--
-- Permet de chercher la liste des reglements d'une personne et de l'attribuer
--  au nouvel enregistrement
CREATE OR REPLACE FUNCTION tg_listereglement_treatments() RETURNS TRIGGER AS
$$
BEGIN
  IF TG_OP='INSERT' THEN
    UPDATE reglement SET lr_numero=NEW.lr_numero WHERE em_numero=NEW.em_numero AND mr_numero=NEW.mr_numero AND lr_numero IS NULL;
/*
    SELECT COALESCE(sum(rg_montant),0) FROM reglement r WHERE r.lr_numero=NEW.lr_numero INTO NEW.lr_montant;
    UPDATE listereglement SET lr_montant=NEW.lr_montant WHERE lr_numero=NEW.lr_numero;
    IF NEW.lr_montant=0 THEN
      RAISE EXCEPTION 'Le bordereau ne sera pas enregistré car il n''y a pas de nouveaux réglements.';
    END IF;
*/
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER trigger_listereglement_treatments
  AFTER INSERT ON table_listereglement 
  FOR EACH ROW EXECUTE PROCEDURE tg_listereglement_treatments();


--===========================================================================--
-- Permet d'appeler la fonction qui remet à jour les montants TTC et HT d'un devis lors d'une 
-- modification de ses lignes
-- DROP TRIGGER trigger_NaturePersonne_validation ON table_naturepersonne;
--DROP FUNCTION TG_NaturePersonne_validation();

CREATE OR REPLACE FUNCTION tg_NaturePersonne_validation() RETURNS TRIGGER AS
$$
BEGIN
  SELECT CASE WHEN NEW.NP_AvecTitre AND NOT NEW.NP_Inclu THEN NEW.NP_Abrev ELSE '' END INTO NEW.NP_Titre;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER trigger_NaturePersonne_validation 
  BEFORE INSERT OR UPDATE ON table_NaturePersonne
  FOR EACH ROW EXECUTE PROCEDURE tg_NaturePersonne_validation();



--===========================================================================--
-- Permet d'appeler la fonction qui remet à jour les montants TTC et HT d'un devis lors d'une 
-- modification de ses lignes
-- DROP TRIGGER trigger_NaturePersonne_treatments ON table_naturepersonne;
--DROP FUNCTION TG_NaturePersonne_treatments();

CREATE OR REPLACE FUNCTION tg_NaturePersonne_treatments() RETURNS TRIGGER AS
$$
BEGIN
  IF NEW.np_titre!=OLD.np_titre THEN
    UPDATE personne SET pe_titre = NEW.np_titre WHERE np_numero=NEW.np_numero;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER trigger_NaturePersonne_treatments 
  AFTER UPDATE ON table_NaturePersonne
  FOR EACH ROW EXECUTE PROCEDURE tg_NaturePersonne_treatments();


-- Personne
--===========================================================================--
-- Renseigne le mouchard sur les modifications effectuées sur les personnes.
-- DROP TRIGGER trigger_personne_validation ON table_personne;
--DROP FUNCTION TG_Personne_validation();

CREATE OR REPLACE FUNCTION TG_Personne_validation() RETURNS TRIGGER AS
$$
DECLARE
  description text;
  total integer;
  np record;
  test boolean;
BEGIN
  SELECT EM_Personne_Editing FROM employe WHERE em_numero=current_employe() INTO test;
  IF TG_OP='UPDATE' AND NOT test THEN
    RETURN OLD;
  END IF;

  IF TG_OP='INSERT' OR TG_OP='UPDATE' THEN
    SELECT * FROM NaturePersonne WHERE NP_Numero=NEW.NP_Numero INTO np;
    NEW.PE_Titre := np.NP_Titre;
    NEW.PE_Morale := np.np_morale;
    NEW.PE_ID  := NEW.pe_numero-1000000;
    NEW.PE_Nom := UPPER(TRIM(NEW.pe_nom));
    NEW.PE_Prenom := REPLACE(REPLACE(INITCAP(TRIM(NEW.pe_prenom)),' Et ',' et '),' & ',' et ');
    IF np.NP_AvecTitre THEN
      IF np.NP_Inclu AND NOT (NEW.PE_Nom LIKE '% '||np.NP_abrev OR NEW.PE_Nom LIKE '% '||np.NP_abrev||' %' OR NEW.PE_Nom LIKE np.NP_Abrev||' %') THEN
        RAISE EXCEPTION 'La société % doit intégrer la forme juridique % dans son nom (Exemple : %)',NEW.PE_Nom, np.NP_Abrev, np.NP_Abrev||' '||NEW.PE_Nom;
      END IF;
    END IF;
  END IF;

  IF TG_OP='INSERT' THEN
    NEW.PE_MotDePasse := FC_Password(8);
    INSERT INTO PersonneUpdate(PU_Action,PE_Numero,TP_Numero,PE_Titre,PE_Nom,PE_RegimeFiscal,PE_Morale,PE_Prenom,PE_Naissance) VALUES ('Ajout',New.PE_Numero,New.TP_Numero,New.PE_Titre,New.PE_Nom,New.PE_RegimeFiscal,New.PE_Morale,New.PE_Prenom,New.PE_Naissance);
    RETURN New;
  ELSIF TG_OP='UPDATE' THEN
/*
    IF OLD.PE_Complement!=NEW.PE_Complement THEN
      RAISE EXCEPTION 'Vous ne pouvez pas modifier le complément à cause de travaux en cours sur le logiciel. Merci de votre compréhension.';
      RETURN OLD;
    END IF;
*/
    IF OLD.NP_Numero!=NEW.NP_Numero AND CURRENT_USER!='brice' THEN
      SELECT o.np_morale!=n.np_morale FROM NaturePersonne o, NaturePersonne n WHERE o.NP_Numero=OLD.NP_Numero AND n.NP_Numero=NEW.NP_Numero INTO test;
      IF test THEN
        RAISE EXCEPTION 'Vous ne pouvez pas modifier le titre ou la forme juridique de la fiche';
        RETURN OLD;
      END IF;
    END IF;
    total:=0;
    description:='';
    IF Old.TP_Numero!=New.TP_Numero THEN
      total:=total+1;
      description:='Type de personne ('||COALESCE('['||New.TP_Numero||']','[NULL]')||'), '||description;
    END IF;
    IF Old.PE_Titre!=New.PE_Titre THEN
      total:=total+1;
      description:='Titre ('||COALESCE(New.PE_Titre,'[NULL]')||'), '||description;
    END IF;
    IF Old.PE_Nom!=New.PE_Nom THEN
      total:=total+1;
      description:='Nom ('||COALESCE(New.PE_Nom,'[NULL]')||'), '||description;
    END IF;
    IF Old.PE_RegimeFiscal!=New.PE_RegimeFiscal THEN
      total:=total+1;
      description:='Régime fiscal ('||COALESCE(New.PE_RegimeFiscal,'[NULL]')||'), '||description;
    END IF;
    IF Old.PE_Morale!=New.PE_Morale THEN
      total:=total+1;
      description:='Entité morale, '||description;
    END IF;
    IF Old.PE_Prenom!=New.PE_Prenom THEN
      total:=total+1;
      description:='Prénom ('||COALESCE(New.PE_Prenom,'[NULL]')||'), '||description;
    END IF;
/*
    IF Old.PE_Complement!=New.PE_Complement THEN
      total:=total+1;
      description:='Comp. ('||COALESCE(New.PE_Complement,'[NULL]')||'), '||description;
    END IF;
*/
    IF Old.PE_Naissance!=New.PE_Naissance THEN
      total:=total+1;
      description:='Naissance ('||COALESCE(New.PE_Naissance,'01/01/0001')||'), '||description;
    END IF;

    IF total!=0 THEN
      description:=total||' modification(s) : '||description||'...';
      INSERT INTO PersonneUpdate(PU_Action,PU_Bilan,PE_Numero,TP_Numero,PE_Titre,PE_Nom,PE_RegimeFiscal,PE_Morale,PE_Prenom,PE_Naissance) VALUES ('Modif',description,Old.PE_Numero,Old.TP_Numero,Old.PE_Titre,Old.PE_Nom,Old.PE_RegimeFiscal,Old.PE_Morale,Old.PE_Prenom,Old.PE_Naissance);
    END IF;
    RETURN New;
  ELSE
    INSERT INTO PersonneUpdate(PU_Action,PE_Numero,TP_Numero,PE_Titre,PE_Nom,PE_RegimeFiscal,PE_Morale,PE_Prenom,PE_Naissance) VALUES ('Suppr.',Old.PE_Numero,Old.TP_Numero,Old.PE_Titre,Old.PE_Nom,Old.PE_RegimeFiscal,Old.PE_Morale,Old.PE_Prenom,Old.PE_Naissance);
    RETURN Old;
  END IF;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_personne_validation
  BEFORE INSERT OR DELETE OR UPDATE ON table_personne
  FOR EACH ROW EXECUTE PROCEDURE TG_personne_validation();


--===========================================================================--
-- Met à jour les colonnes PE_Adresse, PE_Telephone, PE_Fax, PE_Canton
/*
DROP TRIGGER trigger_adresse_treatments      ON table_adresse
DROP TRIGGER trigger_codepostal_treatments   ON table_codepostal
DROP TRIGGER trigger_ville_treatments        ON table_ville
DROP TRIGGER trigger_canton_treatments       ON table_canton
DROP TRIGGER trigger_contact_treatments      ON table_contact
DROP TRIGGER trigger_estjoignable_treatments ON table_estjoignable
DROP TRIGGER trigger_Personne_treatments     ON table_Personne;
--DROP FUNCTION TG_Personne_treatments();

CREATE OR REPLACE FUNCTION TG_Personne_treatments() RETURNS trigger AS
$$
DECLARE
  adresse   text;
  canton    text;
  telephone text;
  fax       text;
BEGIN
  IF TG_RELNAME='table_adresse' THEN
    SELECT COALESCE(PE_Titre,'')||';'||COALESCE(PE_Nom,'')||';'||COALESCE(PE_Prenom,'')||';'||COALESCE(AD_Ligne3,'')||';'||COALESCE(AD_Ligne4,'')||';'||COALESCE(AD_Ligne5,'')||';'||CP_CodePostal||';'||VI_Nom 
      FROM Personne LEFT OUTER JOIN Adresse USING (PE_Numero)
                    LEFT OUTER JOIN CodePostal USING (CP_Numero)
                    LEFT OUTER JOIN Ville USING (VI_Numero)
      WHERE AD_Active AND PE_Numero=New.PE_Numero INTO adresse;
    UPDATE personne SET pe_adresse   = adresse   WHERE pe_numero=NEW.pe_numero;
  ELSIF TG_RELNAME='table_codepostal'THEN
    UPDATE personne SET 


  SELECT  INTO adresse;
  SELECT  INTO adresse;
  SELECT  INTO adresse;

  UPDATE personne SET pe_canton    = canton    WHERE pe_numero=NEW.pe_numero;
  UPDATE personne SET pe_telephone = telephone WHERE pe_numero=NEW.pe_numero;
  UPDATE personne SET pe_fax       = fax       WHERE pe_numero=NEW.pe_numero;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_adresse_treatments
  AFTER INSERT OR UPDATE ON table_adresse
  FOR EACH ROW EXECUTE PROCEDURE TG_Personne_treatments();

CREATE TRIGGER trigger_codepostal_treatments
  AFTER INSERT OR UPDATE ON table_codepostal
  FOR EACH ROW EXECUTE PROCEDURE TG_Personne_treatments();

CREATE TRIGGER trigger_ville_treatments
  AFTER INSERT OR UPDATE ON table_ville
  FOR EACH ROW EXECUTE PROCEDURE TG_Personne_treatments();

CREATE TRIGGER trigger_canton_treatments
  AFTER INSERT OR UPDATE ON table_canton
  FOR EACH ROW EXECUTE PROCEDURE TG_Personne_treatments();

CREATE TRIGGER trigger_contact_treatments
  AFTER INSERT OR UPDATE ON table_contact
  FOR EACH ROW EXECUTE PROCEDURE TG_Personne_treatments();

CREATE TRIGGER trigger_estjoignable_treatments
  AFTER INSERT OR UPDATE ON table_estjoignable
  FOR EACH ROW EXECUTE PROCEDURE TG_Personne_treatments();
*/

-- Piece
--===========================================================================--
-- Calcul les sommes Crédit/Débit
--DROP TRIGGER trigger_piece_treatments ON table_piece;
--DROP FUNCTION  TG_Piece_treatments();

/*
CREATE OR REPLACE FUNCTION TG_Piece_treatments() RETURNS TRIGGER AS
$$
DECLARE
  num_journal integer;
   
BEGIN
  IF TG_OP='INSERT' THEN
    num_journal   :=NEW.JO_Numero;
  ELSE
    num_journal   :=OLD.JO_Numero;
  END IF;
  SELECT sum(PI_Debit), sum(PI_Credit) FROM Piece WHERE JO_Numero=num_journal INTO debit, credit;
  UPDATE Journal SET JO_Debit=debit, JO_Credit=credit WHERE JO_Numero=num_journal;
  RETURN New;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_piece_treatments
  AFTER INSERT OR UPDATE OR DELETE ON table_piece
  FOR EACH ROW EXECUTE PROCEDURE TG_Piece_treatments();
*/



-- Reglement
--===========================================================================--
-- Verifie les règlements
-- DROP TRIGGER trigger_reglement_validation ON table_reglement;
--DROP FUNCTION  TG_Reglement_validation();

CREATE OR REPLACE FUNCTION TG_Reglement_validation() RETURNS TRIGGER AS
$$
DECLARE
  cheque boolean;
BEGIN
  IF TG_OP='INSERT' OR TG_OP='UPDATE' THEN
    NEW.RG_NumeroCompte := TRIM(NEW.RG_NumeroCompte);
    NEW.RG_Reference := TRIM(NEW.RG_Reference);
    SELECT current_agent()!=12 FROM ModeReglement WHERE MR_Numero=NEW.MR_Numero INTO cheque;
--    SELECT MR_cheque AND current_agent()!=12 FROM ModeReglement WHERE MR_Numero=NEW.MR_Numero INTO cheque;
    IF cheque THEN
      IF NOT NEW.RG_NumeroCompte ~ '^[a-zA-Z0-9]*$' THEN
        RAISE EXCEPTION 'Le numéro de compte est invalide. Il doit être d''un seul tenant.';
      END IF;
      IF LENGTH(NEW.RG_NumeroCompte)!=12 THEN
        RAISE EXCEPTION 'Le numéro de compte est invalide. Un numéro de compte qui tient sur 12 caractères est la troisième série de chiffres qui se trouve sur la ligne (CMC7) qui se trouve en bas du chèque.';
      END IF;
      IF NOT NEW.RG_Reference ~ '^[a-zA-Z0-9]*$' THEN
        RAISE EXCEPTION 'La référence du chèque est invalide.\nPour information : vous ne pouvez pas saisir plus d''un chèque par réglement';
      END IF;
      IF LENGTH(NEW.RG_Reference)!=7 THEN
       RAISE EXCEPTION 'Le numéro de chèque est invalide. Un numéro de chèque qui tient sur 7 caractères est la première série de chiffres qui se trouve sur la ligne (CMC7) qui se trouve en bas du chèque.';
      END IF;
    END IF;
  END IF;
  IF TG_OP='UPDATE' THEN
    IF (OLD.RG_Montant<>NEW.RG_Montant OR OLD.MR_Numero<>NEW.MR_Numero OR OLD.RG_Date<>NEW.RG_Date) AND OLD.RG_EnCompta THEN
      RAISE EXCEPTION 'Vous ne pouvez pas modifier tous les champs d''un reglèment qui a été validé. Les corrections s''effectueront par la comptabilité.';
    END IF;
  ELSIF TG_OP='DELETE' THEN
    IF OLD.RG_EnCompta THEN
      RAISE EXCEPTION 'Vous ne pouvez pas supprimer un réglèment qui a été validé. Les corrections s''effectueront par la comptabilité.';
    END IF;
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_reglement_validation
  BEFORE INSERT OR UPDATE OR DELETE ON table_reglement
  FOR EACH ROW EXECUTE PROCEDURE TG_Reglement_validation();



-- Routage
--===========================================================================--
-- Verifie les routages
-- DROP TRIGGER trigger_routage_validation ON table_routage;
--DROP FUNCTION  TG_Routage_validation();

CREATE OR REPLACE FUNCTION TG_Routage_validation() RETURNS TRIGGER AS
$$
DECLARE
  compte integer;
BEGIN
  IF NEW.ad_numero IS NULL THEN
    SELECT count(*) FROM Adresse WHERE PE_Numero=NEW.PE_Numero AND AD_Active INTO compte;
    IF compte>1 THEN
      RAISE EXCEPTION 'La personne % possède plusieurs adresses actives. Veuillez régulariser sa situation.', NEW.PE_Numero;
    ELSIF compte<1 THEN
      RAISE EXCEPTION 'La personne % ne possède pas d''adresses actives. Veuillez régulariser sa situation.', NEW.PE_Numero;  
    END IF;
    SELECT AD_Numero FROM Adresse WHERE PE_Numero=NEW.PE_Numero AND AD_Active INTO NEW.AD_Numero;
  ELSIF TG_OP='UPDATE' THEN
    IF OLD.ad_numero!=NEW.ad_numero THEN
      SELECT PE_Numero FROM Adresse WHERE AD_Numero=NEW.AD_Numero INTO NEW.pe_numero;
    END IF;
  ELSE
    SELECT PE_Numero FROM Adresse WHERE AD_Numero=NEW.AD_Numero INTO NEW.pe_numero;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_routage_validation
  BEFORE INSERT OR UPDATE ON table_routage
  FOR EACH ROW EXECUTE PROCEDURE TG_Routage_validation();


-- Sequence
--===========================================================================--
-- DROP TRIGGER trigger_Sequence_validation ON table_Sequence;
--DROP FUNCTION TG_Sequence_validation();

CREATE OR REPLACE FUNCTION TG_Sequence_validation() RETURNS trigger AS
$$
BEGIN
  NEW.SQ_nom := LOWER(REPLACE(NEW.SQ_Nom,' ',''));
  IF NOT NEW.SQ_nom ~ '^[a-z][a-z0-9]*$' THEN
    RAISE EXCEPTION 'Le nom d''une séquence ne doit commencer par une lettre et ne peut contenir que des caractères simples [a-z] et [0-9].';
  END IF;
  IF NEW.SQ_Nombre<1 THEN
    NEW.SQ_Nombre = 30;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_Sequence_validation
  BEFORE INSERT OR UPDATE ON table_Sequence 
  FOR EACH ROW EXECUTE PROCEDURE TG_Sequence_validation();

--===========================================================================--
-- DROP TRIGGER trigger_Sequence_treatments ON table_Sequence;
--DROP FUNCTION TG_Sequence_treatments();
/*
CREATE OR REPLACE FUNCTION TG_Sequence_treatments() RETURNS trigger AS
$$
DECLARE
  total INTEGER;
  lasti INTEGER;
  i INTEGER;
BEGIN
  IF NOT NEW.SQ_Clear_Cache THEN
    SELECT count(*) FROM SequenceCache WHERE SQ_Numero=NEW.SQ_Numero INTO total;
    IF total<NEW.SQ_Nombre THEN
      lasti := NEW.SQ_Last+(NEW.SQ_Nombre-total)
      FOR i IN NEW.SQ_Last+1..lasti LOOP
        INSERT INTO SequenceCache(sq_numero, sc_valeur) VALUES (NEW.SQ_Numero, i);
      END LOOP;
      NEW.SQ_Last := lasti
    END IF;
  END IF;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_Sequence_treatments 
  AFTER INSERT OR UPDATE ON table_Sequence 
  FOR EACH ROW EXECUTE PROCEDURE TG_Sequence_treatments();

*/
-- SequenceCache
--===========================================================================--
-- DROP TRIGGER trigger_SequenceCache_treatments ON table_Sequence;
--DROP FUNCTION TG_SequenceCache_treatments();
/*
CREATE OR REPLACE FUNCTION TG_SequenceCache_treatments() RETURNS trigger AS
$$
BEGIN
  IF TG_OP='UPDATE' THEN 
    RAISE EXCEPTION 'Opération interdite sur le cache des séquences.';
  END IF;
  UPDATE Sequence SET SQ_used_on=CURRENT_TIMESTAMP WHERE SQ_Numero=OLD.SQ_Numero;
  RETURN OLD;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_SequenceCache_treatments 
  AFTER UPDATE OR DELETE ON table_SequenceCache 
  FOR EACH ROW EXECUTE PROCEDURE TG_SequenceCache_treatments();
*/


-- Société
--===========================================================================--
-- Crée la séquence  pour les numéros de facture de la nouvelle société.
-- DROP TRIGGER trigger_societe_sequencecreator ON table_societe;
--DROP FUNCTION TG_societe_SequenceCreator();

CREATE OR REPLACE FUNCTION TG_societe_validation() RETURNS TRIGGER AS
$$
DECLARE
  query text;
BEGIN
  IF TG_OP='INSERT' THEN
    NEW.SO_Sequence:='seq_societe'||New.SO_Numero;
    query:='CREATE SEQUENCE '||NEW.SO_Sequence||' START 100;';
    EXECUTE query;
    query:='GRANT SELECT, INSERT, UPDATE ON '||NEW.SO_Sequence||' TO PUBLIC;';
    EXECUTE query;  
    RETURN NEW; 
  ELSIF TG_OP='DELETE' THEN
    query:='--DROP SEQUENCE '||OLD.SO_Sequence||';';
    EXECUTE query;
    RETURN Old;
  END IF;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_societe_validation
  BEFORE INSERT OR DELETE ON table_societe 
  FOR EACH ROW EXECUTE PROCEDURE TG_societe_validation();



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
  IF d.so_numero=1 THEN
    SELECT FC_Personne_Reduction(d.PE_Numero,CURRENT_DATE) INTO r;
    -- Adhésion à 10 €
    IF r=0 THEN
      SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO a;
      SELECT count(*) FROM lignefacture JOIN facture USING (FA_Numero) WHERE pe_numero=d.pe_numero AND pd_numero=100051 AND fa_date BETWEEN a||'-01-01' AND a||'-12-31' INTO c;
      IF c<=0 THEN
        message := message||'La personne n''est pas adhérente et n''a pas payé de cotisation à 10€. Est-ce normal ?\n';
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
  insert into facture (fa_numero, pe_numero, fa_date, fa_reduction, fa_libelle, fa_numfact, fa_montantht, fa_montantttc, de_numero, ag_numero)
    select num_facture, pe_numero, current_date, de_reduction, de_libelle, num_numfact, de_montantht, de_montantttc, de_numero, em_agent
      from devis join employe using (em_numero) where de_numero = num_devis;
-- Création des lignes de la facture
  insert into lignefacture (fa_numero, pd_numero, lf_montantht, lf_montantttc, lf_quantite, px_numero, lf_notes)  
    select num_facture, pd_numero, l_montantht, l_montantttc, l_quantite, px_numero, l_notes 
      from ligne where de_numero = num_devis;

-- Mise à jour des adhésions
/*
  INSERT INTO Adhesion (as_reductionmax,pe_numero,po_numero,ah_numero,fa_numero,lf_numero, as_origine)
    SELECT ah_reduction, pe_numero, po_numero, ah_numero, fa_numero, lf_numero, as_origine
      FROM VUE_Adhesion
      WHERE FA_Numero=num_facture;
*/
-- Verrouillage le devis
  UPDATE devis SET de_locked=true WHERE de_numero=num_devis;
 return num_facture;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



/*

CREATE OR REPLACE FUNCTION FC_DevisVersFacture(IN num_devis integer) RETURNS integer AS
$$
DECLARE
  num_facture   integer;
  date_facture  date;
  num_societe   integer;
  num_numfact   integer;
  num_exercice  integer;
  nom_journal   text;
  num_journal   integer;
  num_piece     integer;
  num_personne  integer;
  nom_personne  text;
  nom_sequence  text;
  compte        integer;
  locked        boolean;
  montant       numeric;
BEGIN
-- Test des séquences
  SELECT nextval('seq_piece') INTO compte;
  SELECT nextval('seq_ecriture') INTO compte;
  SELECT nextval('seq_compteaux') INTO compte;
-- On verifie que l'on a pas de compte auxilaires bidon (si la requete plante c'est que y'a des trucs mauvais)
  SELECT count(to_number(ca_numcompte::text, '99999999'::text)) FROM compteaux INTO compte;
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
  SELECT DE_Locked FROM Devis WHERE DE_Numero=num_devis INTO locked;
  IF locked THEN
    RAISE EXCEPTION 'Ce devis a déjà été passé en facturation. Il n''est plus possible de recommencer l''opération.';
    RETURN 0;
  END IF;
-- On vérifie que tous les produits utilisent le même journal
  SELECT Count(DISTINCT JO_Numero) FROM Ligne LEFT JOIN Produit USING (PD_Numero) WHERE DE_Numero=num_devis GROUP BY JO_Numero INTO compte;
  IF compte>1 THEN
    RAISE EXCEPTION 'Ce devis contient des produits affectés à différents journaux.';
    RETURN 2;
  END IF;
-- On recupère le numero de societe
  select into num_societe distinct so_numero from ligne join produit using (pd_numero) where de_numero = num_devis;
-- On vérifie que le compte général 4110000 existe sinon on le crée
  SELECT count(*) FROM CompteGen WHERE  cg_numcompte=4110000 INTO compte;
  IF compte>1 THEN
    RAISE EXCEPTION 'Deux comptes généraux 4110000 existent au lieu d''un unique. Veuillez régulariser la situation.';
  ELSIF compte<1 THEN
    INSERT INTO comptegen VALUES (nextval('seq_comptegen'),4110000,'Clients',1,true,true,true,true,num_societe,true,false);
  END IF;
-- On vérifie que le client a un compte auxiliaire et on lui crée si nécessaire
  SELECT pe_numero FROM Devis WHERE de_numero=num_devis INTO num_personne;
  SELECT pe_libelle FROM personne WHERE pe_numero=num_personne INTO nom_personne;
  SELECT count(*) FROM CompteAux LEFT JOIN CompteGen USING (cg_numero) WHERE  cg_numcompte=4110000 and num_personne-1000000 = to_number(ca_numcompte, '9999999999') INTO compte;
  IF compte>1 THEN
    RAISE EXCEPTION 'La personne % possède plus d''un compte. Veuillez régulariser la situation.',num_personne;
    RETURN 3;
  ELSIF compte<1 THEN
    INSERT INTO CompteAux(ca_numero,   cg_numero, ca_numcompte, ca_libelle, ac_numero, ca_debit)
      SELECT nextval('seq_compteaux'), cg_numero, to_char(num_personne-1000000,'FM0000009'),nom_personne,ac_numero,true
        FROM comptegen
        WHERE cg_numcompte=4110000;
  END IF;

--  RAISE NOTICE 'Verif OK';
-- copie les données du devis dans la facture
---  select into num_facture copieDevisFacture(num_devis);

  select nextval('seq_facture') into num_facture;
  select so_sequence from societe where so_numero = num_societe into nom_sequence;
--  raise notice 'Numfacture cdf % ',num_numfact;
  num_numfact:=num_facture;

  insert into facture (fa_numero, pe_numero, fa_date, fa_reduction, fa_libelle, fa_numfact, fa_montantht, fa_montantttc, de_numero, ag_numero)
    select num_facture, pe_numero, current_date, de_reduction, de_libelle, num_numfact, de_montantht, de_montantttc, de_numero, em_agent
      from devis left join employe using (em_numero)
      where de_numero = num_devis;

  insert into lignefacture (fa_numero, pd_numero, lf_numero, lf_montantht, lf_montantttc, lf_quantite, px_numero, lf_notes)  
    select num_facture, pd_numero, nextval('seq_lignefacture'), l_montantht, l_montantttc, l_quantite, px_numero, l_notes
      from ligne
      where de_numero = num_devis;

--  select count(*) from lignefacture where fa_numero=num_facture into compte;
--  raise notice 'La facture comporte % ligne(s).',compte;

-- Mise à jour des adhésions
  INSERT INTO Adhesion (as_reductionmax,pe_numero,po_numero,ah_numero,fa_numero,lf_numero, as_origine)
    SELECT ah_reduction, pe_numero, po_numero, ah_numero, fa_numero, lf_numero, as_origine
      FROM VUE_Adhesion
      WHERE FA_Numero=num_facture;

-- lance les ecritures dans la compta si montant ttc > 0
  SELECT DE_MontantTTC FROM Devis WHERE DE_Numero=num_devis INTO montant;
  IF montant>0 THEN
--    perform factureEcriture(num_facture, num_societe);
--     RAISE NOTICE 'Facture OK';

---- Création de la pièce
------ numéro de l'exercice actif pour la societe en cours
    SELECT ex_numero from exercice where ex_actif is true and so_numero = num_societe INTO num_exercice;

------ libelle de la piece + numéro du journal concerné
    SELECT DISTINCT jo_abbrev, jo_numero 
      FROM lignefacture join produit using (pd_numero) join journal using (jo_numero)
      WHERE fa_numero = num_facture INTO nom_journal, num_journal;

    SELECT fa_date from facture where fa_numero = num_facture INTO date_facture; -- date
    SELECT nextval('seq_piece') INTO num_piece;                                  -- numéro de la piece

    INSERT INTO piece(pi_numero, pi_libelle, pi_date, jo_numero, pi_numpiece, ex_numero)  -- insertion
              VALUES (num_piece, '['||num_personne||'] '||nom_journal|| ' du ' || date_facture, date_facture, num_journal, num_piece, num_exercice);
--     RAISE NOTICE 'Piece OK';

---- Création des écritures
  -- TVA
  insert into ecriture(ec_numero, ec_libelle, ec_credit, ec_debit, pi_numero, cg_numero, ec_aux, pf_numero, ca_numero,fa_numero, ex_numero)
    select nextval('seq_ecriture'), 'Total TVA ' || tv_taux ||'%', montantTVA, 0, num_piece, cg_numero, false, 1,  NULL, num_facture, num_exercice
      from vue_montantTVA join comptegen using (cg_numero)
      where fa_numero = num_facture and so_numero = num_societe;
--     RAISE NOTICE 'ecr1 OK';
  -- Ecriture
  INSERT INTO ecriture(ec_numero, ec_libelle, ec_debit, pi_numero, cg_numero, ec_aux, pf_numero, ec_credit, fa_numero, ex_numero)
    SELECT nextval('seq_ecriture'), PD_Libelle, 0, num_piece, cg_numero, false, 1, LF_MontantHT, num_facture, num_exercice
      from facture join lignefacture using (fa_numero) join produit using (pd_numero) join compteproduit using (pd_numero)
      where fa_numero = num_facture and ci_actif = true;
--     RAISE NOTICE 'ecr2 OK';
  -- Contre-partie
  insert into ecriture(ec_numero, ec_libelle, ec_debit, pi_numero, cg_numero, ca_numero, ec_aux, pf_numero, ec_credit,fa_numero, ex_numero)
    select nextval('seq_ecriture'), '['||ca_numcompte||']['||fa_numfact||'] '||PE_Fullname, sum(LF_MontantTTC), num_piece, cg_numero, ca_numero, true, 1, 0, num_facture, num_exercice
      from
        facture join lignefacture using (fa_numero) 
                join produit using (pd_numero)
                join compteaux on (pe_numero-1000000 = to_number(ca_numcompte, '9999999999'))
                join comptegen using (cg_numero)
      join personne using (pe_numero)
      where fa_numero = num_facture and comptegen.so_numero = num_societe and comptegen.cg_numcompte=4110000
      group by fa_numero,ca_numero,fa_numfact,cg_numero,ca_numcompte,pe_fullname;
--     RAISE NOTICE 'ecr3 OK';
  END IF;
-- verrouille le devis
  UPDATE devis SET de_locked=true WHERE de_numero=num_devis;
-- renvoie le vrai numero de facture dépendant de la société
--  SELECT fa_numfact from facture where fa_numero=num_facture INTO num_numfact;
--  raise notice 'Numfacture 1 %',num_numfact;
  select nextval(nom_sequence) into num_numfact;
  UPDATE facture SET FA_NumFact=num_numfact WHERE fa_numero=num_facture;
 return num_facture;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;





*/



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
  insert into ligneavoir (av_numero, pd_numero, la_numero, la_montantht, la_montantttc, la_quantite, px_numero)
  select num_avoir, pd_numero, nextval('seq_lignefacture'), lf_montantht, lf_montantttc, lf_quantite, px_numero
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

--DROP FUNCTION testset(integer);
/*
CREATE OR REPLACE function testset(integer) returns setof varchar AS
$$
DECLARE
BEGIN
  FOR i IN 1..$1 LOOP
    RETURN NEXT 'Test de setof text';
  END LOOP;
  RETURN;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;
*/











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

  IF bml_extract(detail,'cotisation.type')='conjoint' THEN
    SELECT cs_detail FROM cotisation WHERE cs_numero=bml_extract(detail, 'cotisation.reference') INTO detail2;
--    SELECT cs_detail FROM cotisation WHERE bml_extract(cs_detail, 'fdsea.conjoint.numero')=cotis.pe_numero INTO detail2;
    detail := bml_put(detail, 'cotisation.societe', bml_extract(detail2, 'cotisation.societe'));
    detail := bml_put(detail, 'fdsea.forfait.produit', bml_extract(detail2, 'fdsea.conjoint.produit'));
    detail := bml_put(detail, 'fdsea.forfait.montant', bml_extract(detail2, 'fdsea.conjoint.montant'));
    detail := bml_put(detail, 'fdsea.hectare','false');
    detail := bml_put(detail, 'reglement.numero', bml_extract(detail2, 'reglement.numero'));
    detail := bml_put(detail, 'aava', 'false');
    detail := bml_put(detail, 'sacea', 'false');
  ELSIF bml_extract(detail,'cotisation.type')='associe' THEN
    SELECT cs_detail FROM cotisation WHERE cs_numero=bml_extract(detail, 'cotisation.reference') INTO detail2;
    IF detail2 IS NULL THEN
      RAISE EXCEPTION 'Erreur pas de cotisation';
    END IF;
    detail := bml_put(detail, 'cotisation.societe', bml_extract(detail2, 'cotisation.societe'));
    detail := bml_put(detail, 'fdsea.forfait.produit', bml_extract(detail2, 'fdsea.associe.produit'));
    detail := bml_put(detail, 'fdsea.forfait.montant', bml_extract(detail2, 'fdsea.associe.montant')::numeric/bml_extract(detail2, 'fdsea.associe.nombre')::numeric);
    detail := bml_put(detail, 'fdsea.hectare','false');
    detail := bml_put(detail, 'reglement.numero', bml_extract(detail2, 'reglement.numero'));
    detail := bml_put(detail, 'aava', 'false');
    detail := bml_put(detail, 'sacea', 'false');
--    RAISE EXCEPTION 'Erreur pas de cotisation  sdfqsdlmfjsdklfj';
  ELSIF bml_extract(detail,'cotisation.type')='ja' THEN
    RAISE EXCEPTION 'Ohohohohoho pas de JA maintenant !';
/*
    SELECT fc_ajouterja(cotis.pe_numero,true);
    detail := bml_put(detail, 'fdsea', 'false');
    detail := bml_put(detail, 'aava', 'false');
    detail := bml_put(detail, 'sacea', 'false');
*/
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
  UPDATE table_cotisation SET cs_valid=true, cs_done=true, cs_report=report, cs_detail=bml_sort(detail), cs_societe=num_gerance, cs_montant=COALESCE(total_fdsea,0)+COALESCE(total_sacea,0)+COALESCE(total_aava,0) WHERE cs_numero=num_cotisation;
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
--DROP FUNCTION FC_LatexClean(text);

CREATE OR REPLACE FUNCTION FC_LatexClean(latexte text) RETURNS text AS
$$
DECLARE
  latex text;
BEGIN
  latex := COALESCE(latexte,'');
  IF LENGTH(latex)>0 THEN
    latex := REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(latex,'$',E'\\$'),'%',E'\\%'),'[','$[$'),']','$]$'),'&',E'\\&');
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
        q_as:=q_as||'FC_LatexClean(('||TRIM(param)||')::text) AS p'||nparam;
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
      fonction:=fonction||E'  IF ('||cond||E')::boolean THEN\n';
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
    RAISE NOTICE 'Fonction %',i.fcn;
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












/* 
 *
 */
CREATE OR REPLACE FUNCTION FC_Simple_Facture(IN num_personne INTEGER, IN num_prix INTEGER, IN reg_date DATE, IN reg_banque VARCHAR(32), IN reg_compte VARCHAR(32), IN reg_cheque VARCHAR(32), IN num_modereglement INTEGER) RETURNS TEXT AS
$$
DECLARE
  num_numfact TEXT;
  num_devis devis.de_numero%TYPE;
  num_facture facture.fa_numero%TYPE;
  reg_montant reglement.rg_montant%TYPE;
  num_reglement reglement.rg_numero%TYPE;
  test BOOLEAN;
BEGIN
  SELECT em_reglement FROM employe WHERE em_login=CURRENT_USER INTO test;
  IF NOT test THEN
    RAISE EXCEPTION 'Vous n''avez pas le droit de faire de facturation rapide.';
  END IF;
  SELECT em.self_invoicing FROM employe WHERE em_login=CURRENT_USER INTO test;
  IF NOT test THEN
    RAISE EXCEPTION 'Vous n''avez pas le droit de facturer.';
  END IF;
  SELECT nextval('seq_devis') INTO num_devis;
  INSERT INTO devis(pe_numero, de_numero, de_libelle, em_numero) SELECT num_personne, num_devis, '[MAJCC] Abonnement du '||CURRENT_DATE, current_employe();
  INSERT INTO ligne(de_numero, px_numero, l_quantite) VALUES (num_devis, num_prix, 1);
  
  SELECT de_montantttc, nextval('seq_reglement') FROM devis WHERE de_numero=num_devis INTO reg_montant, num_reglement;
  
  INSERT INTO reglement(pe_numero, rg_numero, rg_montant, rg_date, rg_libellebanque, rg_numerocompte, rg_reference, em_numero, mr_numero) SELECT num_personne, num_reglement, reg_montant, reg_date, reg_banque, reg_compte, reg_cheque, current_employe(), num_modereglement;

  SELECT FC_DevisVersFacture(num_devis) INTO num_facture;

  INSERT INTO facturereglement(rg_numero,fa_numero) VALUES (num_reglement, num_facture);  

  SELECT num_numfact FROM facture WHERE fa_numero=num_facture;
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



CREATE OR REPLACE VIEW vue_evoplus AS 
  SELECT ev.*, pe_id, pe_libelle, CURRENT_DATE AS ev_date, COALESCE(ad1||' -- ','')||COALESCE(ad2||' -- ','')||COALESCE(ad3||' -- ','')||cp||' '||ville AS adline, 
(CASE WHEN NOT proposition AND (opt_num=2 OR opt_num=4) THEN 0.00 ELSE sacea_ttc::numeric END)::numeric(16,2) AS op1_sacea, 
0.00::numeric AS op2_sacea, 
(CASE WHEN ((NOT proposition AND (opt_num=1 OR opt_num=2)) OR (proposition AND aava)) THEN 31.00 ELSE 0.00 END)::numeric(16,2) AS op1_aava, 
(CASE WHEN aava THEN 31.00 ELSE 0.00 END)::numeric(16,2) AS op2_aava, 
(CASE WHEN NOT proposition THEN opt_ttc WHEN proposition AND aava THEN opt1 ELSE opt3 END)::numeric(16,2) AS op1_total, 
(CASE WHEN aava THEN opt2 ELSE opt4 END)::numeric(16,2) AS op2_total,
CASE WHEN pe_numero IN (SELECT pe_numero FROM vue_cotisation_all WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)) THEN 'DEJA ADH!' WHEN proposition THEN 'P' ELSE 'A' END AS nature
    FROM table_evoplus ev join personne USING (pe_numero);


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
    FROM (SELECT filename FROM table_evoplus WHERE lot=num_lot and pe_numero not in (select pe_numero from table_cotisation where cs_annee=2008) and pe_numero not in (select COALESCE(cs_societe,0) from table_cotisation where cs_annee=2008) ORDER BY id) x
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





