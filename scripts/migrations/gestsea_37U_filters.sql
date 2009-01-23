
CREATE OR REPLACE VIEW VUE_Employe_Reglement AS
  SELECT employe.*, em_numero AS cle FROM employe join service on (em_service=se_numero) WHERE em_reglement AND se_societe IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);


CREATE OR REPLACE VIEW VUE_Employe_Devis AS
  SELECT employe.*, em_numero AS cle from employe JOIN service ON (em_service=se_numero) WHERE se_societe IN (SELECT SE_Societe FROM VUE_CURRENT_Societe); 
--SELECT tous.*, tous.em_numero AS cle FROM table_employe moi JOIN table_service ON (em_login=current_user and moi.em_service=se_numero) LEFT JOIN table_employe tous ON (tous.em_service=se_numero);

CREATE OR REPLACE VIEW VUE_Prix AS
  SELECT TRIM(pd_libelle)||' / '||px_tarifht::float||'€ HT' AS px_libelle, px_numero AS cle, px.*
    FROM table_prix px JOIN table_Produit USING (PD_Numero)
    WHERE px_actif AND pd_actif
      AND SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe)
    ORDER BY pd_libelle, px_tarifht;

CREATE OR REPLACE VIEW VUE_Adresse AS
--  SELECT pe_numero-1000000||'. '||COALESCE(ad_libelle,'???') AS ad_full, adresse.*, ad_numero AS cle FROM adresse ORDER BY 1;
  SELECT ad_numero AS cle, ad_numero, pe_numero, pe_id||'. '||TRIM(COALESCE(PE_Titre||' ','')||PE_Nom||COALESCE(' '||PE_Prenom,''))||', '||COALESCE(Ad_Ligne2||', ','')||COALESCE(Ad_Ligne3||', ','')||COALESCE(Ad_Ligne4||', ','')||COALESCE(Ad_Ligne5||', ','')||CP_CodePostal||' '||VI_Nom AS AD_Libelle
    FROM table_Adresse JOIN table_CodePostal AS CP USING (CP_Numero) JOIN table_Ville AS VI USING (VI_Numero) JOIN table_Personne USING (PE_Numero)
    WHERE AD_Active AND pe_actif
    ORDER BY pe_numero;

CREATE OR REPLACE VIEW VUE_Allowed_Personne AS 
  SELECT personne.*, pe_numero AS cle FROM personne WHERE pe_actif AND pe_numero NOT IN (SELECT el_personne1 FROM estlie WHERE tl_numero=1006);


CREATE OR REPLACE VIEW vue_contacts AS 
  SELECT pe_numero, ck_numero, trim(trim(concatenate(distinct(cn_coordonnee)||' | ')),'|') AS cn_value
    FROM (SELECT *, cn_coordonnee||CASE WHEN pe_numero!=true_pe_numero THEN '*' ELSE '' END AS cn_value, pe_numero=true_pe_numero AS cn_direct FROM contact) AS vue_contact
    GROUP BY pe_numero, ck_numero;

CREATE OR REPLACE VIEW vue_current_cotisation AS
  SELECT * 
    FROM cotisation 
    WHERE
-- année N
       cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)
     OR (
-- année N-1
       NOT cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)
       AND cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND EXTRACT(MONTH FROM CURRENT_DATE)<=2)
;

/*

(cs_annee=EXTRACT(YEAR FROM CURRENT_DATE) OR (EXTRACT(MONTH FROM CURRENT_DATE)<=2 AND cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)-1))

*/
  
