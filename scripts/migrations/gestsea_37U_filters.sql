
CREATE OR REPLACE VIEW VUE_Employe_Reglement AS
  SELECT employe.*, em_numero AS cle FROM employe join service on (em_service=se_numero) WHERE em_reglement AND se_societe IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW VUE_Adresse AS
--  SELECT pe_numero-1000000||'. '||COALESCE(ad_libelle,'???') AS ad_full, adresse.*, ad_numero AS cle FROM adresse ORDER BY 1;
  SELECT ad_numero AS cle, ad_numero, pe_numero, pe_id||'. '||TRIM(COALESCE(PE_Titre||' ','')||PE_Nom||COALESCE(' '||PE_Prenom,''))||', '||COALESCE(Ad_Ligne2||', ','')||COALESCE(Ad_Ligne3||', ','')||COALESCE(Ad_Ligne4||', ','')||COALESCE(Ad_Ligne5||', ','')||CP_CodePostal||' '||VI_Nom AS AD_Libelle
    FROM table_Adresse JOIN table_CodePostal AS CP USING (CP_Numero) JOIN table_Ville AS VI USING (VI_Numero) JOIN table_Personne USING (PE_Numero)
    WHERE AD_Active AND pe_actif
    ORDER BY pe_numero;
