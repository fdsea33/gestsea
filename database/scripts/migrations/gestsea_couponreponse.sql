
--===========================================================================--
-- Procedure permettant d'enregistrer facilement des coupons-réponses standard
--           DROP FUNCTION FC_CouponReponse(integer, integer, numeric, numeric, numeric, numeric, numeric, numeric, integer, integer, date, integer, varchar, varchar, varchar, varchar, numeric, integer, integer, integer, integer);

CREATE OR REPLACE FUNCTION FC_CouponReponse(integer, integer, numeric, numeric, numeric, numeric, numeric, numeric, numeric, integer, integer, date, integer, varchar, varchar, varchar, varchar, numeric, integer, integer, integer, integer, integer) RETURNS setof text AS
$$
DECLARE
  num_personne ALIAS FOR $1;
  cotisation   ALIAS FOR $2;
  cotis1       ALIAS FOR $3;
  cotis2       ALIAS FOR $4;
  cotis3       ALIAS FOR $5;
  cotis4       ALIAS FOR $6;
  cotis5       ALIAS FOR $7;
  cotis6       ALIAS FOR $8;
  cotis7       ALIAS FOR $9;
  sacea        ALIAS FOR $10;
  aava         ALIAS FOR $11;
  reg_date     ALIAS FOR $12;
  reg_mode     ALIAS FOR $13;
  reg_banque   ALIAS FOR $14;
  reg_compte   ALIAS FOR $15;
  reg_cheque   ALIAS FOR $16;
  production   ALIAS FOR $17;
  montant      ALIAS FOR $18;
  rodebut      ALIAS FOR $19;
  rofin        ALIAS FOR $20;
  ronbex       ALIAS FOR $21;
  roadresse    ALIAS FOR $22;
  num_reg      ALIAS FOR $23;
  cotishectare numeric[];
  num_devis       integer;
  num_facture_fds integer;
  num_facture_sac integer;
  num_facture_aav integer;
  num_numfact_fds integer;
  num_numfact_sac integer;
  num_numfact_aav integer;
  num_societe     integer;
  num_service     integer;
  num_employe     integer;
  num_piece       integer;
  num_reglement   integer;
  num_payeurfinal integer;
  num_groupe      integer;
  total_sac       numeric;
  total_aav       numeric;
  total_fds       numeric;
  dons            numeric;
  total           numeric;
  compte          integer;
  annee           integer;
  adresse         text;
BEGIN
  -- Verif
  IF sacea<=0 AND cotisation<=0 THEN
    RAISE EXCEPTION 'Votre coupon-réponse ne tient pas la route : c''est juste un abonnement journal.';
    RETURN;
  END IF;  
  
  -- Enregistrement de la société et du service actuel
  SELECT current_societe() INTO num_societe;
  SELECT EM_Service, EM_Numero FROM Employe WHERE em_login=CURRENT_USER INTO num_service, num_employe;

  -- Productions à mettre à jour
  DELETE FROM attribut WHERE pe_numero=num_personne AND ta_numero=500000000;
  FOR i IN 1..8 LOOP
    IF substring(production from i for 1)='1' THEN
      INSERT INTO attribut (at_numero, pe_numero, ta_numero, cr_numero)
        VALUES (nextval('seq_attribut'), num_personne, 500000000, i+51);
    END IF;
  END LOOP;
  IF substring(production from 9 for 1)='1' THEN
    INSERT INTO attribut (at_numero, pe_numero, ta_numero, cr_numero, at_valeur)
      SELECT nextval('seq_attribut'), num_personne, 500000000, 60, substring(production from 10);
  END IF;

  

  SELECT nextval('seq_impressiongroupe') INTO num_groupe;
  INSERT INTO table_impressiongroupe (ig_numero, il_numero, ig_date) VALUES (num_groupe,1,CURRENT_DATE);

  SELECT EXTRACT(YEAR FROM CURRENT_DATE)::integer INTO annee;
--  SELECT count(*) FROM table_cotisation WHERE pe_numero=num_personne AND cs_annee=annee INTO total;
--  SELECT count(*) FROM table_cotisation WHERE pe_numero=num_personne AND cs_annee=annee INTO total;
  SELECT count(*) FROM table_facture left join table_avoir USING (fa_numero) WHERE av_numero IS NULL AND fa_libelle like '[CR]%' and so_numero=2 and EXTRACT(YEAR FROM fa_date)=annee AND pe_numero=num_personne INTO total;
  IF total>=1 THEN
    RAISE EXCEPTION 'La cotisation semble être déjà enregistrée pour l''adhérent % et l''année %.',num_personne-1000000,annee;
  END IF;
  INSERT INTO table_cotisation(pe_numero,cs_annee) VALUES (num_personne,annee);


  -- Devis SACEA
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=1;

  SELECT nextval('seq_devis') INTO num_devis;
  INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero)
    SELECT num_devis, num_personne, '[CR] Abonnement conseil du '||CURRENT_DATE, current_employe();
  RAISE NOTICE 'Devis SACEA %', num_devis;
  IF sacea>0 THEN -- devis normal
    INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, sacea);
  ELSE  -- devis adhérent FDSEA -> -15% réduction
    -- Forfait Adhérent FDSEA
    INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000095);
  END IF;
  RAISE NOTICE 'Devis SACEA %', num_devis;
  SELECT FC_DevisVersFacture(num_devis) INTO num_numfact_sac;
  RAISE NOTICE 'Devis SACEA %', num_devis;
  SELECT COALESCE(fa_montantttc,0.00), fa_numero FROM facture WHERE fa_numfact=num_numfact_sac INTO total_sac, num_facture_sac;


  -- Devis AAVA
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=3;

  total_aav:=0;
  IF aava>0 THEN
    SELECT nextval('seq_devis') INTO num_devis;
    INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero)
      SELECT num_devis, num_personne, '[CR] Abonnement du '||CURRENT_DATE, current_employe();
    RAISE NOTICE 'Devis AAVA %', num_devis;
    INSERT INTO ligne (l_numero, de_numero, pd_numero, l_quantite) VALUES (nextval('seq_ligne'), num_devis, aava, ronbex);
    SELECT FC_DevisVersFacture(num_devis) INTO num_numfact_aav;
    SELECT COALESCE(fa_montantttc,0.00), fa_numero FROM facture WHERE fa_numfact=num_numfact_aav INTO total_aav, num_facture_aav;
    INSERT INTO routage(ro_numero, ad_numero, pe_numero, ro_debutservice, ro_finservice, ro_quantite, fa_numero)
      VALUES (nextval('seq_routage'), roadresse, num_personne, rodebut, rofin, ronbex, num_facture_aav);
  END IF;


  -- Devis FDSEA
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=2;

  total_fds:=0;
  IF cotisation>0 THEN  
    SELECT nextval('seq_devis') INTO num_devis;
    INSERT INTO devis(de_numero, pe_numero, de_libelle, em_numero)
      VALUES ( num_devis, num_personne, '[CR] Cotisation du '||CURRENT_DATE, current_employe());
    RAISE NOTICE 'Devis FDSEA %.', num_devis;
  
    IF cotisation=1 THEN    -- ancien
      INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000054);
    ELSIF cotisation=2 THEN -- bailleur
      INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000053);
    ELSIF cotisation=3 THEN -- ancien et bailleur
      INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000124);
    ELSIF cotisation=4 THEN -- exploitant
      INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000052);
    ELSIF cotisation=5 THEN -- ancien + soutien
      INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000054);
      INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000130);
    ELSIF cotisation=6 THEN -- conjoint ancien
      INSERT INTO ligne (l_numero, de_numero, pd_numero) VALUES (nextval('seq_ligne'), num_devis, 500000150);
    ELSE
      RAISE EXCEPTION 'Le type de cotisation choisi est inconnu : %', cotisation;
    END IF;
  
    cotishectare[1]:=cotis1;
    cotishectare[2]:=cotis2;
    cotishectare[3]:=cotis3;
    cotishectare[4]:=cotis4;
    cotishectare[5]:=cotis5;
    cotishectare[6]:=cotis6;
    cotishectare[7]:=cotis7;
    FOR i IN 1..6 LOOP
      IF cotishectare[i]>0 THEN
        INSERT INTO ligne (l_numero, de_numero, pd_numero, l_quantite) VALUES (nextval('seq_ligne'), num_devis, 500000054+i,cotishectare[i]);
      END IF;
    END LOOP;
    IF cotishectare[7]>0 THEN
      INSERT INTO ligne (l_numero, de_numero, pd_numero, l_quantite) VALUES (nextval('seq_ligne'), num_devis, 500000144,cotishectare[7]);
    END IF;
    SELECT FC_DevisVersFacture(num_devis) INTO num_numfact_fds;
    SELECT COALESCE(fa_montantttc,0.00), fa_numero FROM facture WHERE fa_numfact=num_numfact_fds INTO total_fds, num_facture_fds;
  END IF;
  

  -- Reglement
  dons:=montant-(total_sac+total_aav+total_fds);
  RAISE NOTICE 'Dont dons %', dons;
  IF num_reg IS NULL THEN
    SELECT nextval('seq_reglement') INTO num_reglement;
    INSERT INTO reglement (rg_numero, pe_numero, rg_libellebanque, rg_numerocompte, rg_montant, rg_date, rg_reference, mr_numero)
      VALUES (num_reglement, num_personne, reg_banque, reg_compte, montant, reg_date, reg_cheque, reg_mode);
  ELSE
    num_reglement:=num_reg;
  END IF;

  IF total_fds>0 THEN
    INSERT INTO facturereglement (fr_numero, rg_numero, fa_numero, fr_partiel, fr_montant)
     VALUES (nextval('seq_facturereglement'),num_reglement,num_facture_fds,true,total_fds);
  END IF;

  IF total_sac>0 THEN 
    INSERT INTO repartition(rp_numero, rg_numero, mp_numero, rp_montant)
      SELECT nextval('seq_repartition'), num_reglement, mp_numero, total_sac
        FROM moderepartition 
        WHERE mp_societe=1;
  END IF;
  INSERT INTO facturereglement (fr_numero, rg_numero, fa_numero, fr_partiel, fr_montant)
  VALUES (nextval('seq_facturereglement'),num_reglement,num_facture_sac,true,total_sac);

  IF total_aav>0 THEN 
    INSERT INTO repartition(rp_numero, rg_numero, mp_numero, rp_montant)
      SELECT nextval('seq_repartition'), num_reglement, mp_numero, total_aav
        FROM moderepartition 
        WHERE mp_societe=3;
    INSERT INTO facturereglement (fr_numero, rg_numero, fa_numero, fr_partiel, fr_montant)
   VALUES (nextval('seq_facturereglement'),num_reglement,num_facture_aav,true,total_aav);
  END IF;

  IF dons>0 THEN 
    INSERT INTO repartition(rp_numero, rg_numero, mp_numero, rp_montant)
      SELECT nextval('seq_repartition'), num_reglement, mp_numero, dons
        FROM moderepartition 
        WHERE mp_societe=2;
  END IF;

--  SELECT FC_ReglementVersCompta(num_reglement) INTO num_piece;

  -- Impression des factures
  INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe,'facture',num_facture_sac);
  IF aava>0 THEN
    INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe,'facture',num_facture_aav);
  END IF;
  IF cotisation>0 THEN
    INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe,'facture',num_facture_fds);
    IF (cotisation<6) THEN
    INSERT INTO table_impressiondocument (ig_numero,id_modele,id_cle) VALUES (num_groupe,'carte',num_facture_fds);
    END IF;
  END IF;
  RETURN NEXT 'Cotisation enregistrée';
   
/*
  UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=1;
  SELECT FC_Imprime('facture', num_facture_sac) INTO adresse;
  RETURN NEXT adresse;
  RAISE NOTICE 'Facture SACEA % de % euros : %',num_numfact_sac, total_sac, adresse;

  IF aava>0 THEN
    UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=3;
    SELECT FC_Imprime('facture', num_facture_aav) INTO adresse;
    RETURN NEXT adresse;
    RAISE NOTICE 'Facture AAVA % de % euros : %',num_numfact_aav, total_aav, adresse;
  END IF;

  IF cotisation>0 THEN
    UPDATE employe SET EM_Service=SE_Numero FROM service WHERE employe.EM_Numero=num_employe AND SE_Societe=2;
    SELECT FC_Imprime('facture', num_facture_fds) INTO adresse;
    RETURN NEXT adresse;
    RAISE NOTICE 'Facture FDSEA % de % euros : %',num_numfact_fds, total_fds, adresse;
  END IF;
*/

  UPDATE employe SET EM_Service=num_service WHERE EM_Numero=num_employe;

  RETURN;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

