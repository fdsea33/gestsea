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
-- Vérifie certaines caractéristiques d'une adresse
-- DROP TRIGGER trigger_adresse_validation ON table_adresse;
--DROP FUNCTION TG_adresse_validation();

CREATE OR REPLACE FUNCTION TG_adresse_validation() RETURNS trigger AS
$$
DECLARE
  compte INTEGER;
BEGIN
  IF NEW.AK_Numero IS NULL THEN
    SELECT AK_Numero FROM TypeAdresse ORDER BY 1 INTO NEW.AK_Numero;
  END IF;
  SELECT count(*) FROM Adresse WHERE pe_numero=NEW.pe_numero AND AD_Default INTO compte;
  IF compte<=0 THEN
    NEW.AD_Default := true;
  END IF;
  IF NEW.AD_Default AND compte>=1 THEN
    IF TG_OP='INSERT' THEN
      UPDATE Adresse SET AD_Default=false WHERE pe_numero=NEW.PE_Numero;
    ELSE
      UPDATE Adresse SET AD_Default=false WHERE pe_numero=NEW.PE_Numero AND AD_Numero!=OLD.AD_Numero;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


CREATE TRIGGER trigger_adresse_validation
  BEFORE INSERT OR UPDATE ON table_adresse
  FOR EACH ROW EXECUTE PROCEDURE TG_adresse_validation();



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
  r record;
  good boolean;
BEGIN
  IF TG_OP='UPDATE' THEN
    NEW.pe_numero := OLD.pe_numero;
  END IF;
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
  RETURN NEW;
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
/*
  IF TG_OP='INSERT' THEN
    IF NEW.el_numero IS NULL THEN
      SELECT np_morale FROM personne join naturepersonne using (np_numero) WHERE pe_numero=NEW.pe_numero INTO ok;
      IF ok THEN
        -- Ajout des contact chez les gérants
        SELECT FC_Update_Contacts(el_numero) FROM estlie WHERE el_personne2=NEW.pe_numero AND tl_code='>GERE>';
        INSERT INTO contact (cn_coordonnee,ck_numero,pe_numero, el_numero) 
        SELECT NEW.cn_coordonnee, NEW.ck_numero, el_personne1, el_numero
          FROM estlie
          WHERE el_personne2=NEW.pe_numero AND tl_code='>GERE>';

      ELSE
        -- Ajout des contact dans les sociétés
        SELECT FC_Update_Contacts(el_numero) FROM estlie WHERE el_personne1=NEW.pe_numero AND tl_code='>GERE>';

        INSERT INTO contact (cn_coordonnee,ck_numero,pe_numero, el_numero)
        SELECT NEW.cn_coordonnee, NEW.ck_numero, el_personne2, el_numero
          FROM estlie
          WHERE el_personne1=NEW.pe_numero AND tl_code='>GERE>';
      END IF;
    END IF;
  END IF;
    INSERT INTO contact (cn_coordonnee,ck_numero,pe_numero) 
    SELECT NEW.cn_coordonnee, NEW.ck_numero, p.pe_numero 
      FROM personne p LEFT JOIN estlie el ON (p.pe_numero=CASE WHEN el_personne1=NEW.pe_numero THEN el_personne2 ELSE el_personne1 END AND NEW.pe_numero IN (el_personne1,el_personne2,0) AND tl_code='>GERE>')
      WHERE pe_numero NOT IN (SELECT pe_numero FROM contact WHERE cn_coordonnee=NEW.cn_coordonnee);



      WHERE pe_numero IN (SELECT CASE WHEN el_personne1=NEW.pe_numero THEN el_personne2 ELSE el_personne1 END AS pe_numero FROM estlie WHERE NEW.pe_numero IN (el_personne1, el_personne2) AND tl_code='>GERE>') 
        AND pe_numero NOT IN (SELECT pe_numero FROM contact )


    FOR r IN SELECT CASE WHEN el_personne1=NEW.pe_numero THEN el_personne2 ELSE el_personne1 END AS pe_numero FROM estlie WHERE NEW.pe_numero IN (el_personne1, el_personne2) AND tl_code='>GERE>' LOOP
    END LOOP
  END IF;

  IF TG_OP='UPDATE' THEN
    IF NEW.cn_copying THEN
      NEW.cn_copying := false
    ELSE
      UPDATE contact SET cn_coordonnee=NEW.cn_coordonnee, ck_numero=NEW.ck_numero, cn_actif=NEW.cn_actif, cn_copying=true WHERE cn_coordonnee=OLD.cn_coordonnee AND cn_coordonnee!=NEW.cn_coordonnee AND id!=OLD.id;
    END IF;
  END IF;
*/
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
/*
      IF NEW.DE_Reduction=OLD.DE_Reduction THEN
        SELECT FC_Personne_Reduction(NEW.PE_Numero, CURRENT_DATE) INTO NEW.DE_Reduction;
      END IF;
*/
      -- Un acompte doit être versé si le montant du devis excède les 300 euros
      SELECT CASE WHEN NEW.DE_MontantTTC>=300 THEN true ELSE false END INTO NEW.DE_Acompte;
    ELSE
      SELECT FC_Personne_Reduction(NEW.PE_Numero, NEW.DE_Date) INTO NEW.DE_Reduction;
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
    IF NEW.EM_cancel_invoice THEN
      NEW.EM_Societe_Invoicing := true;
    END IF;
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
  IF TG_OP='UPDATE' THEN
    IF NEW.tl_code!=OLD.tl_code THEN
      SELECT tl_numero FROM typelien WHERE tl_code=NEW.tl_code INTO NEW.tl_numero;      
    ELSE
      SELECT tl_code FROM typelien WHERE tl_numero=NEW.tl_numero INTO NEW.tl_code;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_estlie_validation
  BEFORE INSERT OR UPDATE ON table_estlie
  FOR EACH ROW EXECUTE PROCEDURE TG_estlie_validation();

--===========================================================================--
-- DROP TRIGGER trigger_estlie_treatments ON table_estlie;
--DROP FUNCTION  TG_estlie_treatments();
/*
CREATE OR REPLACE FUNCTION TG_estlie_treatments() RETURNS TRIGGER AS
$$
BEGIN
  FC_update_contacts(NEW.el_numero)
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_estlie_treatments
  AFTER INSERT OR UPDATE ON table_estlie
  FOR EACH ROW EXECUTE PROCEDURE TG_estlie_treatments();
*/

-- Facture
--===========================================================================--
-- Remplit le champ 'Montant' des liens entre facture et règlement
-- DROP TRIGGER trigger_facture_validation ON table_facture;
--DROP FUNCTION  TG_facture_validation();

CREATE OR REPLACE FUNCTION TG_facture_validation() RETURNS TRIGGER AS
$$
DECLARE
  test BOOLEAN;
BEGIN
  IF TG_OP='UPDATE' THEN
    SELECT usesuper FROM pg_user WHERE usename=CURRENT_USER INTO test;
    IF NOT test THEN
      NEW.AD_Numero := OLD.AD_Numero;
      NEW.PE_Numero := OLD.PE_Numero;
    END IF;
    IF NEW.fa_avoir!=OLD.fa_avoir THEN
      RAISE EXCEPTION 'Il est impossible de changer une facture en avoir.';
    END IF;
    IF NEW.fa_avoir_facture!=OLD.fa_avoir_facture THEN
      RAISE EXCEPTION 'Il est impossible de changer la facture d''origine d''un avoir.';
    END IF;
  END IF;


  IF NEW.fa_avoir THEN
    IF NEW.fa_montantht>0 THEN
      RAISE EXCEPTION 'Les montants d''un avoir sont forcément inférieurs à 0.';
    END IF;
    IF NEW.fa_avoir_facture IS NULL THEN
      RAISE EXCEPTION 'La facture d''origine est obligatoirement renseigné';
    END IF;
    SELECT fa_perte FROM facture WHERE fa_numero=NEW.fa_avoir_facture INTO test;
    IF test THEN
      RAISE EXCEPTION 'La facture d''origine d''un avoir ne peut pas être en perte'; 
    END IF;
  END IF;
	
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_facture_validation
  BEFORE INSERT OR UPDATE ON table_facture
  FOR EACH ROW EXECUTE PROCEDURE TG_facture_validation();



-- FactureReglement
--===========================================================================--
-- Remplit le champ 'Montant' des liens entre facture et règlement
-- DROP TRIGGER trigger_ecriture_validation ON table_ecriture;
--DROP FUNCTION  TG_FactureReglement_validation();

CREATE OR REPLACE FUNCTION TG_FactureReglement_validation() RETURNS TRIGGER AS
$$
BEGIN
  IF NOT NEW.FR_Partiel THEN
    SELECT RG_Montant FROM Reglement WHERE RG_Numero=NEW.RG_Numero INTO NEW.FR_Montant;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_FactureReglement_validation
  BEFORE INSERT OR UPDATE ON table_FactureReglement
  FOR EACH ROW EXECUTE PROCEDURE TG_FactureReglement_validation();


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
--      SELECT NEW.PX_Numero IN (SELECT PX_Numero FROM Prix WHERE New.PD_Numero=PD_Numero AND PX_actif) INTO valid;
--      IF NOT valid THEN
--        NEW.PX_Numero := NULL;
--      END IF;
    END IF;

    IF NEW.PX_Numero IS NULL THEN
      SELECT count(*) FROM Prix WHERE New.PD_Numero=PD_Numero AND px_actif INTO compte;
      IF compte<1 THEN
        RAISE EXCEPTION 'Le produit "%" ne possède pas de tarifs. Il est impossible de l''utiliser dans cette situation.', NEW.PD_Numero;
      END IF;
      SELECT PX_Numero FROM Prix WHERE New.PD_Numero=PD_Numero AND px_actif ORDER BY prix.id DESC INTO NEW.PX_Numero;
    END IF;

    SELECT PX_tarifHT, PX_tarifTTC, PD_Libelle, PX_Numero FROM vue_prix_all join Produit USING (pd_numero) WHERE NEW.PX_Numero=PX_Numero INTO tarifs;
    IF tarifs.PX_tarifHT IS NULL OR tarifs.PX_tarifTTC IS NULL THEN
      RAISE EXCEPTION 'Les tarifs pour le produit "%" ne sont pas corrects.', tarifs.PD_Libelle;
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




-- LigneFacture
--===========================================================================--
-- Calcule les montant TTC et HT de chaque LigneFacture sans tenir compte de la réduction
-- DROP TRIGGER trigger_LigneFacture_validation ON table_LigneFacture;
--DROP FUNCTION TG_LigneFacture_validation();

CREATE OR REPLACE FUNCTION TG_LigneFacture_validation() RETURNS TRIGGER AS
$$
DECLARE
BEGIN
  SELECT fa_avoir FROM facture WHERE fa_numero=NEW.fa_numero INTO NEW.lf_avoir;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_LigneFacture_validation 
  BEFORE INSERT OR UPDATE ON table_LigneFacture 
  FOR EACH ROW EXECUTE PROCEDURE TG_LigneFacture_validation();



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
-- On empèche de modifier des chèques qui ne sont pas à soi
    SELECT (COALESCE(NEW.created_by,'*')=current_user)::BOOLEAN OR usesuper FROM pg_user WHERE usename=current_user INTO cheque;
    IF NOT cheque THEN
      RAISE EXCEPTION 'Vous n''avez pas le droit de modifier un réglement que vous n''avez pas créé.\nContactez votre administrateur si nécessaire.';
    END IF;
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
    UPDATE facturereglement SET fr_montant=NEW.rg_montant WHERE NOT fr_partiel and rg_numero=NEW.rg_numero;
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


--===========================================================================--
-- Verifie les règlements
-- DROP TRIGGER trigger_reglement_treatments ON table_reglement;
--DROP FUNCTION  TG_Reglement_treatments();

CREATE OR REPLACE FUNCTION TG_Reglement_treatments() RETURNS TRIGGER AS
$$
BEGIN
  UPDATE facturereglement SET fr_montant=NEW.rg_montant WHERE NOT fr_partiel and rg_numero=NEW.rg_numero;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE TRIGGER trigger_reglement_treatments
  AFTER UPDATE ON table_reglement
  FOR EACH ROW EXECUTE PROCEDURE TG_Reglement_treatments();



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
    SELECT count(*) FROM Adresse WHERE PE_Numero=NEW.PE_Numero AND AD_Active AND AD_Default INTO compte;
    IF compte>1 THEN
      RAISE EXCEPTION 'La personne % possède plusieurs adresses actives. Veuillez régulariser sa situation.', NEW.PE_Numero;
    ELSIF compte<1 THEN
      RAISE EXCEPTION 'La personne % ne possède pas d''adresses actives. Veuillez régulariser sa situation.', NEW.PE_Numero;  
    END IF;
    SELECT AD_Numero FROM Adresse WHERE PE_Numero=NEW.PE_Numero AND AD_Active AND AD_Default INTO NEW.AD_Numero;
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
    query:='GRANT SELECT, USAGE, UPDATE ON '||NEW.SO_Sequence||' TO PUBLIC;';
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


