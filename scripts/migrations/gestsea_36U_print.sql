/*****************************************************************************\
 * Divers                                                                    *
\*****************************************************************************/

--===========================================================================--

CREATE OR REPLACE VIEW VUE_MontantTVA AS
  SELECT totaltva.tv_numero, totaltva.tv_taux, totaltva.fa_numero, totaltva.montanttva, totaltva.cg_numero
    FROM ( SELECT table_prix.tv_numero, lignefacture.fa_numero, tva.tv_taux, sum(lignefacture.lf_montantttc - lignefacture.lf_montantht) AS montanttva, tva.cg_numero
             FROM lignefacture LEFT JOIN table_prix USING (px_numero)
                               LEFT JOIN tva USING (tv_numero)
             GROUP BY tva.tv_taux, table_prix.tv_numero, lignefacture.fa_numero, tva.cg_numero) totaltva
    WHERE totaltva.montanttva > 0::numeric;

--===========================================================================--

CREATE OR REPLACE VIEW VUE_TousMontantsTVA AS
  SELECT totaltva.tv_numero, totaltva.tv_taux, totaltva.fa_numero, totaltva.montanttva, totaltva.cg_numero
    FROM ( SELECT tv_numero, fa_numero, tv_taux, sum(lf_montantttc - lf_montantht) AS montanttva, cg_numero
             FROM table_lignefacture LEFT JOIN table_prix USING (px_numero)
                                     LEFT JOIN table_tva USING (tv_numero)
             GROUP BY tv_taux, tv_numero, fa_numero, cg_numero) totaltva
    WHERE montanttva > 0;

--===========================================================================--
/*
CREATE OR REPLACE VIEW adhere AS
SELECT table_adhesion.pe_numero, table_adhesion.as_reductionmax, periode.po_libelle, table_adherence.ah_libelle
   FROM table_adhesion
   LEFT JOIN periode USING (po_numero)
   LEFT JOIN table_adherence USING (ah_numero)
  ORDER BY periode.po_debut;
*/
--===========================================================================--

/*
DROP VIEW VUE_Compte;

CREATE OR REPLACE VIEW VUE_Compte AS
  SELECT ec_numero, CASE WHEN EC_Aux THEN cgaux.CG_numcompte||'.'||ca_numcompte ELSE cg.cg_numcompte||'' END  as cm_compte
    FROM table_ecriture LEFT JOIN table_comptegen as cg USING (cg_numero)
                        LEFT JOIN table_compteaux as ca USING (ca_numero)
                        LEFT JOIN table_comptegen as cgaux ON (ca.cg_numero=cgaux.cg_numero);
*/

--===========================================================================--
/*
CREATE OR REPLACE VIEW VUE_reglementvente AS
 SELECT ventes.ve_numero, ventes.ve_date, trunc(ventes.ve_montantttc::numeric, 2) AS ve_montantttc, ventes.ve_modereglement, ventes.ve_banque, ventes.ve_numcheque, trunc(ventes.ve_montantht::numeric, 2) AS ve_montantht, trunc((ventes.ve_montantttc - ventes.ve_montantht)::numeric, 2) AS tva, trunc(ventes.ve_montantttc::numeric, 2) AS ve_montanttotal
   FROM old_ventes ventes;
*/
--===========================================================================--

-- DROP VIEW VUE_Facture_Regle;

CREATE OR REPLACE VIEW VUE_Facture_Regle AS
  SELECT fa.fa_numero, fa.fa_montantttc, round(COALESCE(partiel.total, 0::numeric) + COALESCE(entier.total, 0::numeric), 2) AS fa_regle, ABS(fa.fa_montantttc-(COALESCE(partiel.total, 0::numeric) + COALESCE(entier.total, 0::numeric)))<0.7 AS fa_ok, fa.so_numero, fa.fa_date AS rf_date, fa.ag_numero, table_agent.ag_initiales
   FROM table_facture fa JOIN table_agent USING (ag_numero)
   LEFT JOIN ( SELECT table_facturereglement.fa_numero, COALESCE(sum(table_reglement.rg_montant), 0::numeric) AS total
      FROM table_facturereglement
   JOIN table_reglement USING (rg_numero)
  WHERE NOT table_facturereglement.fr_partiel
  GROUP BY table_facturereglement.fa_numero) entier USING (fa_numero)
   LEFT JOIN ( SELECT table_facturereglement.fa_numero, COALESCE(sum(table_facturereglement.fr_montant), 0::numeric) AS total
   FROM table_facturereglement
  WHERE table_facturereglement.fr_partiel
  GROUP BY table_facturereglement.fa_numero) partiel USING (fa_numero);



/*
CREATE OR REPLACE VIEW VUE_Facture_Regle AS
  SELECT table_facture.fa_numero, 
         table_facture.fa_montantttc, 
         ROUND((COALESCE(partiel.total,0)+COALESCE(entier.total,0))::numeric,2) AS fa_regle, 
         table_facture.fa_montantttc=COALESCE(partiel.total,0)+COALESCE(entier.total,0) AS fa_ok 
    FROM table_facture LEFT JOIN
     (SELECT table_facture.fa_numero, COALESCE(SUM(rg_montant),0) as total 
       FROM table_facture LEFT JOIN table_facturereglement USING (fa_numero) 
                          LEFT JOIN table_reglement USING (RG_Numero) 
       WHERE NOT FR_partiel
       GROUP BY table_facture.fa_numero) as entier USING(fa_numero)
     LEFT JOIN 
     (SELECT fa_numero, COALESCE(SUM(fr_montant),0) as total 
        FROM table_facture LEFT JOIN table_facturereglement USING(FA_Numero)
        WHERE FR_partiel 
        GROUP BY fa_numero) as partiel USING(fa_numero);
*/

--===========================================================================--

--DROP VIEW VUE_FDSEA_Cotisation;

CREATE OR REPLACE VIEW VUE_FDSEA_Cotisation AS
  SELECT COALESCE(cotisation>0,false) AS FC_OK, PE_Numero-1000000 AS FC_Numero, EXTRACT (YEAR FROM FA_date) AS FC_Annee, SUBSTRING(PE_Libelle FOR 33) AS FC_Nom, FA_Numero
    FROM table_facture LEFT JOIN (SELECT fa_numero, count(lf_numero) as cotisation FROM table_lignefacture
                                    WHERE PD_Numero IN (500000054,500000053,500000052, 500000124, 300001, 300004, 300005, 300006)
                                    GROUP BY fa_numero) as tutu using(fa_numero)
                       LEFT JOIN Personne USING(PE_Numero);


--DROP VIEW VUE_FDSEA_Don;
/*
CREATE OR REPLACE VIEW VUE_FDSEA_Don AS 
  SELECT sum(rp_montant) AS FD_Montant, FA_numero 
    FROM repartition left join facturereglement using (rg_numero) 
                     left join facture using (fa_numero) 
    WHERE MP_Numero=105
    GROUP BY FA_Numero;
*/

--===========================================================================--

--DROP VIEW VUE_AAVA_Destinataire;
CREATE OR REPLACE VIEW VUE_AAVA_Destinataire AS 
  SELECT to_char(PE_ID,'FM099999') AS DS_Numero,
         TRIM(COALESCE(PE_Titre||' ','')||PE_Nom||COALESCE(PE_Prenom,'')) AS DS_Nom,
         AD_Ligne2 AS DS_Ligne2,
         AD_Ligne3 AS DS_Ligne3,
         AD_Ligne4 AS DS_Ligne4,
         AD_Ligne5 AS DS_Ligne5,
         CP_codepostal AS DS_CP,
         VI_Nom AS DS_Ville,
         RO_DebutService AS DS_Debut,
         RO_FinService AS DS_Fin,
         RO_Quantite AS DS_nbEx,
         FA_Numero
  FROM table_Routage JOIN table_Personne USING (PE_Numero) 
                     JOIN table_Adresse USING (AD_Numero)
                     JOIN table_Codepostal USING (CP_Numero) 
                     JOIN table_Ville USING (VI_Numero)
  WHERE AD_Active;

/*****************************************************************************\
 * Impression des factures                                                   *
\*****************************************************************************/

--===========================================================================--
--DROP VIEW VUE_FactureEntete;
--DROP VIEW VUE_PRINT_Facture_Entete;
CREATE OR REPLACE VIEW VUE_PRINT_Facture_Entete AS
SELECT 
to_char(table_facture.PE_Numero-1000000,'FM0999999') AS pe_numpersonne, -- 0
pe_titre,                        -- 1
pe_nom,                          -- 2
pe_prenom,                       -- 3
ad_Ligne2,                       -- 16
ad_Ligne3,                       -- 4
ad_Ligne4,                       -- 5
ad_Ligne5,                       -- 6
cp_codepostal,                   -- 7
vi_nom,                          -- 8
fa_numFact,                      -- 9 
FC_DateEnLettre(fa_date) AS fa_date, -- 10
fa_numero,                       -- 11
cp_bureau,                       -- 12
se_nom,                          -- 13
fa_ok,                           -- 14
fa_regle,                        -- 15
FC_DateEnLettre(fc_delai(fa_date,COALESCE(dl.cs_valeur,'90 days'))) AS fa_reglement, -- 17
DE_Numero,                       -- 18
FC_DateEnLettre(DE_Date) AS DE_Date --19
FROM table_facture JOIN table_personne    USING (pe_numero)
                   JOIN table_adresse     USING (pe_numero)
                   JOIN table_codepostal  USING (cp_numero)
                   JOIN table_ville       USING (vi_numero)
                   JOIN vue_facture_regle USING (fa_numero)
                   JOIN table_devis       USING (de_numero),
     employe JOIN service ON (EM_Service=SE_Numero)
      LEFT JOIN table_constante dl ON (dl.cs_nom='PAYMENT_ON')
WHERE AD_Active AND EM_Login=CURRENT_USER AND table_facture.so_numero=current_societe();


--===========================================================================--
--DROP VIEW VUE_FactureLignes;
CREATE OR REPLACE VIEW VUE_FactureLignes AS
SELECT 
PD_Code        AS LK_Code,
pd_titre       AS LK_Libelle,                             -- 0
CASE WHEN PD_SansQuantite THEN 1 ELSE LF_Quantite END::float 
               AS LK_Quantite,                                   -- 1 
ROUND(CASE WHEN PD_SansQuantite THEN LF_MontantHT ELSE PX_TarifHT END, 2)
               AS LK_PrixUnitaireHT,
LF_MontantHT   AS LK_MontantHT,
LF_MontantTTC-LF_MontantHT
               AS LK_MontantTVA,
TV_TauxTVA     AS LK_TauxTVA,
(NOT(LF_Notes IS NULL OR LF_Notes=''))::boolean 
               AS LK_NonVide, -- 5
LF_Notes       AS LK_Notes,                                 -- 6

CASE WHEN PD_SansQuantite THEN ROUND((lf_montantht)::NUMERIC, 2) ELSE round((lf_montantht/lf_quantite)::NUMERIC, 2) END 
               AS LK_Montant,                                    -- 2
round((lf_montantht)::NUMERIC, 2) AS LK_Total,        -- 3
tv_code AS LK_TVA,                                    -- 4
fa_numero                                             -- 7
FROM facture LEFT JOIN ligneFacture USING (fa_numero)
       LEFT JOIN produit      USING (pd_numero)
       LEFT JOIN table_prix         USING (px_numero)
       LEFT JOIN tva          USING (tv_numero)
  WHERE lf_montantht != 0;



--===========================================================================--
--DROP VIEW VUE_FactureReduction;
CREATE OR REPLACE VIEW VUE_FactureReduction AS
SELECT 
'Remise de '||fa_reduction||'% sur : '||PD_Titre 
               AS RK_Libelle,                                        -- 0
CASE WHEN PD_SansQuantite THEN 1 ELSE LF_Quantite END::float
               AS RK_Quantite,
ROUND((CASE WHEN PD_SansQuantite THEN ROUND(LF_MontantHT, 2) ELSE PX_TarifHT END)*(-FA_Reduction/100),2)
               AS RK_PrixUnitaireHT,
ROUND(-LF_MontantHT*FA_Reduction/100,2)
               AS RK_MontantHT,
ROUND((LF_MontantHT-LF_MontantTTC)*FA_Reduction/100,2)
               AS RK_MontantTVA,
TV_TauxTVA     AS RK_TauxTVA,

--trunc(fa_reduction::numeric,2) AS RK_Quantite,               -- 1
0.00           AS RK_Montant,                                            -- 2
ROUND(-LF_MontantHT*FA_Reduction/100,2)
--trunc(0-(sum(lf_montantht)*fa_reduction)/100, 2) 
               AS RK_Total,  -- 3
'*'::text      AS RK_TVA,                                                 -- 4
fa_numero                                                      -- 5
FROM facture LEFT JOIN lignefacture USING (fa_numero)
             LEFT JOIN produit      USING (pd_numero)
             LEFT JOIN table_prix         USING (px_numero)
             LEFT JOIN tva          USING (tv_numero)
WHERE pd_reduction = true AND lf_montantttc>0 AND fa_reduction>0;
--GROUP BY RK_Libelle, fa_reduction, RK_tva, fa_numero;  


--===========================================================================--
--DROP VIEW VUE_PRINT_Facture_Reglement;
CREATE OR REPLACE VIEW VUE_PRINT_Facture_Reglement AS
  SELECT 
    RG_Date AS RF_Date,                  -- 0
    CASE WHEN FR_Partiel THEN FR_Montant
    ELSE RG_Montant END AS RF_Montant,   -- 1
    SPLIT_PART(MR_Libelle,' ',1) AS RF_Mode,               -- 2
    UPPER(RG_libellebanque) AS RF_Banque,       -- 3
    RG_numerocompte AS RF_Compte,        -- 4
    RG_reference AS RF_Cheque,           -- 5
    CASE WHEN FR_Acompte THEN '*'
    ELSE '' END AS RF_Acompte,           -- 6
    table_FactureReglement.FA_Numero     -- 7
  FROM table_FactureReglement JOIN table_Reglement USING (RG_Numero)
                              JOIN table_ModeReglement USING (MR_Numero);



--===========================================================================--
--DROP VIEW VUE_FactureAccompte;
CREATE OR REPLACE VIEW VUE_FactureAccompte AS
SELECT 
'Acompte'::text
               AS AK_Libelle,       -- 0
1.00::float    AS AK_quantite,      -- 1
0-FA_Accompte  AS AK_Montant,       -- 2
0-FA_Accompte  AS AK_total,         -- 3
0              AS AK_TVA,           -- 4
FA_numero                           -- 5
FROM facture
WHERE fa_accompte <> 0 AND fa_accompte IS NOT NULL;


--===========================================================================--
--DROP VIEW VUE_PRINT_FactureTVA;
CREATE OR REPLACE VIEW VUE_PRINT_Facture_TVA AS
SELECT 
S.tv_code AS TVA_Code,            -- 0 *
sum(S.base) AS TVA_Base,          -- 1 Base
S.tv_taux AS TVA_Taux,            -- 2 Taux
sum(S.tva_total) AS TVA_Montant,  -- 3 Montant
fa_numero                         -- 4
FROM (SELECT tv_code, round(sum(lf_montantht*(1-(fa_reduction/100))), 2) AS base, tv_taux, round(sum(lf_montantht*(1-(fa_reduction/100))*tv_taux/100), 2) AS tva_total, FA_Numero
       FROM facture LEFT JOIN ligneFacture USING (fa_numero)
                    LEFT JOIN produit      USING (pd_numero)
                    LEFT JOIN table_prix         USING (px_numero)
                    LEFT JOIN tva          USING (tv_numero)
       WHERE tv_code > 0 AND pd_reduction = true AND lf_montantht > 0
       GROUP BY tv_code,tv_taux,fa_numero
     UNION
     SELECT tv_code, round(sum(lf_montantht), 2) AS base, tv_taux, round(sum(lf_montantht)*tv_taux/100, 2) AS tva_total, fa_numero
       FROM facture LEFT JOIN ligneFacture USING (fa_numero)
                    LEFT JOIN produit      USING (pd_numero)
                    LEFT JOIN table_prix         USING (px_numero)
                    LEFT JOIN tva          USING (tv_numero)
       WHERE tv_code > 0 AND pd_reduction = false AND lf_montantht > 0
       GROUP BY tv_code, tv_taux, fa_numero) AS S
GROUP BY tv_code, tv_taux, fa_numero;

--===========================================================================--
--DROP VIEW VUE_FactureTotaux;
CREATE OR REPLACE VIEW VUE_FactureTotaux AS
SELECT 
(f.fa_montantht-COALESCE(f.fa_accompte,0))  AS TT_montantHT,  -- 0
f.fa_montantttc-f.fa_montantht  AS TT_tva,        -- 1
f.fa_montantttc-COALESCE(f.fa_accompte,0) AS TT_montantTTC, -- 2
f.fa_montantttc-COALESCE(f.fa_accompte,0)-r.fa_regle AS TT_Solde, --3
f.fa_numero                                     -- 5
FROM facture as f join vue_facture_regle as r using (fa_numero);


/*****************************************************************************\
 * Impression des devis                                                      *
\*****************************************************************************/

--===========================================================================--
--DROP VIEW VUE_PRINT_devis_entete;
CREATE OR REPLACE VIEW VUE_PRINT_devis_entete AS
  SELECT DISTINCT 
PE_Numpersonne,  
COALESCE(PE_Titre,'') AS PE_Titre, 
PE_Nom, 
COALESCE(PE_Prenom,'') AS PE_Prenom, 
COALESCE(AD_Ligne2,'') AS AD_Ligne2, 
COALESCE(AD_Ligne3,'') AS AD_Ligne3, 
COALESCE(AD_Ligne4,'') AS AD_Ligne4, 
COALESCE(AD_Ligne5,'') AS AD_Ligne5, 
CP_CodePostal, 
VI_Nom, 
DE_Numero, 
FC_DateEnLettre(DE_Date) AS DE_Date, 
COALESCE(CP_Bureau,'') 
               AS CP_Bureau, 
SE_Nom, 
CASE WHEN DE_Acompte THEN 'true' ELSE 'false' END 
               AS DE_Acompte, 
DE_Lettre, 
DE_Introduction, 
TRIM(TRIM(DE_Civilites),',') AS DE_Civilites, 
AG_Libelle     AS DE_Agent, 
SE_Numero,
FC_DateEnLettre((DE_Date+'1 month'::interval)::date)
               AS DE_DateValidite
    FROM Devis LEFT JOIN Personne USING (PE_Numero) 
               LEFT JOIN Adresse USING (PE_Numero) 
               LEFT JOIN Ville USING (VI_Numero) 
               LEFT JOIN CodePostal USING (CP_Numero)
               LEFT JOIN Employe USING (EM_Numero)
               LEFT JOIN Agent ON (EM_Agent=AG_Numero)
               LEFT JOIN Service ON (EM_Service=SE_Numero)
    WHERE AD_Active;


--===========================================================================--
--DROP VIEW VUE_PRINT_devis_ligne;
CREATE OR REPLACE VIEW VUE_PRINT_devis_ligne AS 
  SELECT 
pd_code        AS L_Code, 
pd_titre       AS L_Libelle, 
(CASE WHEN PD_SansQuantite THEN 1 ELSE L_Quantite END)::float
               AS L_Quantite, 
ROUND(CASE WHEN PD_SansQuantite THEN L_montantht ELSE px_tarifht END,2)
               AS L_PrixUnitaireHT, 
L_montantht    AS L_MontantHT, 
L_MontantTTC-L_MontantHT 
               AS L_MontantTVA, 
TV_TauxTVA     AS L_TauxTVA, 
CASE WHEN L_Notes IS NULL OR L_Notes='' THEN false ELSE true END 
               AS L_NonVide, 
L_Notes        AS L_Notes, 
pd_titre       AS PD_Libelle, -- todel
CASE WHEN PD_SansQuantite THEN L_montantht ELSE ROUND(px_tarifht,2) END 
               AS PX_Tarifht, -- todel
tv_code        AS TV_Code,    -- todel
DE_Numero 
    FROM ligne JOIN produit USING (PD_Numero) 
               JOIN Table_Prix USING (PX_Numero) 
               JOIN TVA USING (TV_Numero);


--===========================================================================--
--DROP VIEW VUE_PRINT_devis_remise;
CREATE OR REPLACE VIEW VUE_PRINT_devis_remise AS 
  SELECT 
'Remise de '||DE_reduction||'% sur : '||PD_Titre 
               AS RD_Libelle,
(CASE WHEN PD_SansQuantite THEN round(1.00::NUMERIC, 2) ELSE L_Quantite END)::float 
               AS RD_Quantite, 
ROUND((CASE WHEN PD_SansQuantite THEN L_montantht ELSE ROUND(px_tarifht,2) END)*(-DE_Reduction/100),2)
               AS RD_PrixUnitaireHT, 
ROUND(-L_MontantHT*DE_Reduction/100, 2) 
               AS RD_MontantHT, 
ROUND((L_MontantHT-L_MontantTTC)*DE_Reduction/100, 2) 
               AS RD_MontantTVA, 
TV_TauxTVA     AS RD_TauxTVA,

de_reduction   AS RD_Reduction, 
--0               AS RD_MontantHT, 
trunc((0 - ligne.l_montantht) * de_reduction / 100, 2) AS RD_total, 
'*'::text AS RD_TVA, 
DE_Numero
    FROM Devis LEFT JOIN ligne USING (DE_Numero) 
               LEFT JOIN Produit USING (PD_Numero)
               LEFT JOIN Table_Prix USING (PX_Numero) 
               LEFT JOIN TVA USING (TV_Numero)
   WHERE DE_Reduction>0 and PD_reduction=true;


--===========================================================================--
--DROP VIEW VUE_devistva;
CREATE OR REPLACE VIEW VUE_devistva AS
  SELECT s.tv_code AS tva_code, sum(s.base) AS tva_base, s.tv_taux AS tva_taux, sum(s.tva_total) AS tva_montant, s.de_numero
   FROM ( 
     SELECT tva.tv_code, trunc(sum(ligne.l_montantht * (1::numeric - devis.de_reduction / 100::numeric)), 2) AS base, tva.tv_taux, trunc(sum(ligne.l_montantht * (1::numeric - devis.de_reduction / 100::numeric) * tva.tv_taux / 100::numeric), 2) AS tva_total, devis.de_numero
       FROM devis
            LEFT JOIN ligne USING (de_numero)
            LEFT JOIN produit USING (pd_numero)
            LEFT JOIN table_prix USING (px_numero)
            LEFT JOIN tva USING (tv_numero)
       WHERE tva.tv_code > 0 AND produit.pd_reduction = true AND ligne.l_montantht > 0::numeric
       GROUP BY tva.tv_code, tva.tv_taux, devis.de_numero
     UNION
       SELECT tva.tv_code, trunc(sum(ligne.l_montantht), 2) AS base, tva.tv_taux, trunc(sum(ligne.l_montantht) * tva.tv_taux / 100::numeric, 2) AS tva_total, devis.de_numero
         FROM devis
           LEFT JOIN ligne USING (de_numero)
           LEFT JOIN produit USING (pd_numero)
           LEFT JOIN table_prix USING (px_numero)
           LEFT JOIN tva USING (tv_numero)
         WHERE tva.tv_code > 0 AND produit.pd_reduction = false AND ligne.l_montantht > 0::numeric
         GROUP BY tva.tv_code, tva.tv_taux, devis.de_numero) s
GROUP BY s.tv_code, s.tv_taux, s.de_numero;


/*****************************************************************************\
 * Impression des avoirs                                                     *
\*****************************************************************************/


--===========================================================================--
--DROP VIEW VUE_AvoirEntete;
CREATE OR REPLACE VIEW VUE_AvoirEntete AS
SELECT 
pe_numpersonne,                  -- 0
pe_titre,                        -- 1
pe_nom,                          -- 2
pe_prenom,                       -- 3
ad_Ligne2,
ad_Ligne3,                       -- 4
ad_Ligne4,                       -- 5
ad_Ligne5,                       -- 6
cp_codepostal,                   -- 7
vi_nom,                          -- 8
av_numFact,                      -- 9 
FC_DateEnLettre(av_date) AS av_date,  -- 10
av_numero,                       -- 11
cp_bureau,                       -- 12
se_nom,                          -- 13
false AS fa_ok                   -- 14
FROM avoir LEFT JOIN personne   USING (pe_numero)
           LEFT JOIN adresse    USING (pe_numero)
           LEFT JOIN codepostal USING (cp_numero)
           LEFT JOIN ville      USING (vi_numero),
   employe LEFT JOIN service ON (EM_Service=SE_Numero)
WHERE EM_Login=CURRENT_USER AND AD_Active;


--===========================================================================--
--DROP VIEW VUE_AvoirLignes;



CREATE OR REPLACE VIEW VUE_AvoirLignes AS
SELECT 
pd_code AS LK_Code,
pd_titre AS LK_Libelle,                                    -- 0
CASE WHEN PD_SansQuantite 
  THEN round(1.00::NUMERIC, 2)
  ELSE la_quantite END::float 
AS LK_Quantite,        -- 1 
CASE WHEN PD_SansQuantite 
  THEN round((la_montantht)::NUMERIC, 2) 
  ELSE round(la_montantht/la_quantite, 2) 
END AS LK_Montant, -- 2
round((la_montantht)::NUMERIC, 2) AS LK_Total,               -- 3
tv_code AS LK_TVA,                                           -- 4

ROUND(CASE WHEN PD_SansQuantite THEN LA_MontantHT ELSE PX_TarifHT END, 2)
               AS LK_PrixUnitaireHT,
LA_MontantHT   AS LK_MontantHT,
LA_MontantTTC-LA_MontantHT
               AS LK_MontantTVA,
TV_TauxTVA     AS LK_TauxTVA,
(NOT(LA_Notes IS NULL OR LA_Notes=''))::boolean 
               AS LK_NonVide, -- 5
LA_Notes       AS LK_Notes,                                 -- 6


av_numero                                                    -- 5
FROM avoir LEFT JOIN ligneAvoir USING (av_numero)
     LEFT JOIN produit    USING (pd_numero)
     LEFT JOIN table_prix       USING (px_numero)
     LEFT JOIN tva        USING (tv_numero);
--WHERE la_montantht >= 0;


--===========================================================================--
--DROP VIEW VUE_AvoirReduction;
CREATE OR REPLACE VIEW VUE_AvoirReduction AS
SELECT 
'Remise de '||av_reduction||' sur : '||pd_titre AS RK_Libelle,      -- 0
--round(av_reduction::numeric,2) AS RK_Quantite, -- 1
--0 AS RK_Montant,             -- 2
--round(0-(sum(la_montantht)*av_reduction)/100, 2) AS RK_Total, -- 3
--'*' AS RK_TVA,               -- 4

CASE WHEN PD_SansQuantite THEN 1 ELSE LA_Quantite END::float
               AS RK_Quantite,
ROUND((CASE WHEN PD_SansQuantite THEN ROUND(LA_MontantHT, 2) ELSE PX_TarifHT END)*(-AV_Reduction/100),2)
               AS RK_PrixUnitaireHT,
ROUND(-LA_MontantHT*AV_Reduction/100,2)
               AS RK_MontantHT,
ROUND((LA_MontantHT-LA_MontantTTC)*AV_Reduction/100,2)
               AS RK_MontantTVA,
TV_TauxTVA     AS RK_TauxTVA,

--trunc(fa_reduction::numeric,2) AS RK_Quantite,               -- 1
0.00           AS RK_Montant,                                            -- 2
ROUND(-LA_MontantHT*AV_Reduction/100,2)
--trunc(0-(sum(lf_montantht)*fa_reduction)/100, 2) 
               AS RK_Total,  -- 3
'*'::text      AS RK_TVA,                                                 -- 4


av_numero                    -- 5
FROM avoir LEFT JOIN ligneavoir USING (av_numero)
           LEFT JOIN produit    USING (pd_numero)
           LEFT JOIN table_prix         USING (px_numero)
           LEFT JOIN tva          USING (tv_numero)
           
WHERE pd_reduction = true AND la_montantttc>0 AND av_reduction>0;
--GROUP BY RK_Libelle, av_reduction, RK_tva, av_numero;




--===========================================================================--
--DROP VIEW VUE_AvoirTVA;
CREATE OR REPLACE VIEW VUE_AvoirTVA AS
SELECT 
S.tv_code AS TVA_Code,            -- 0
sum(S.base) AS TVA_Base,          -- 1
S.tv_taux AS TVA_Taux,            -- 2
sum(S.tva_total) AS TVA_Montant,  -- 3
av_numero                         -- 4
FROM (SELECT tv_code, trunc(sum(la_montantht*(1-(av_reduction/100))), 2) AS base, tv_taux, trunc(sum(la_montantht*(1-(av_reduction/100))*tv_taux/100), 2) AS tva_total, AV_Numero
       FROM avoir   LEFT JOIN ligneavoir   USING (av_numero)
                    LEFT JOIN produit      USING (pd_numero)
                    LEFT JOIN table_prix         USING (px_numero)
                    LEFT JOIN tva          USING (tv_numero)
       WHERE tv_code > 0 AND pd_reduction = true AND la_montantht > 0
       GROUP BY tv_code,tv_taux,av_numero
     UNION
     SELECT tv_code, trunc(sum(la_montantht), 2) AS base, tv_taux, trunc(sum(la_montantht)*tv_taux/100, 2) AS tva_total, av_numero
       FROM avoir   LEFT JOIN ligneavoir   USING (av_numero)
                    LEFT JOIN produit      USING (pd_numero)
                    LEFT JOIN table_prix         USING (px_numero)
                    LEFT JOIN tva          USING (tv_numero)
       WHERE tv_code > 0 AND pd_reduction = false AND la_montantht > 0
       GROUP BY tv_code, tv_taux, av_numero) AS S
GROUP BY tv_code, tv_taux, av_numero;


--===========================================================================--
--DROP VIEW VUE_AvoirTotaux;
CREATE OR REPLACE VIEW VUE_AvoirTotaux AS
SELECT 
av_montantht                AS TT_montantHT,  -- 0
av_montantttc-av_montantht  AS TT_tva,        -- 1
av_montantttc               AS TT_montantTTC, -- 2
av_numero                                     -- 3
FROM avoir;



/*****************************************************************************\
 * Impression des bordereaux de reglement                                    *
\*****************************************************************************/

/* Les constantes utilisées sont 
 * 100 Date de début de bordereau
 * 101 Date de fin de bordereau
 *  
 */


--===========================================================================--
--DROP VIEW VUE_PRINT_Bordereau_entete;
/*
CREATE OR REPLACE VIEW VUE_PRINT_Bordereau_Entete AS
SELECT 
a.cs_valeur AS BR_debut, 
b.cs_valeur AS BR_Fin,
sum(rg_montant) AS BR_Total,
count(rg_numero) AS BR_Count,
'13306.00013.04211839200.52'::text AS BR_Compte
FROM reglement left join personne using(pe_numero), constante as a, constante as b 
WHERE a.cs_valeur::date<=reglement.updated_at AND reglement.updated_at<=(b.cs_valeur||' 23:59')::timestamp AND a.cs_type=100 AND b.cs_type=101
  AND SUBSTRING(rg_mode FOR 2)|| SUBSTRING(rg_mode FROM LENGTH(rg_mode)-1) like 'ChCA'
GROUP BY a.cs_valeur, b.cs_valeur;
*/

--===========================================================================--
--DROP VIEW VUE_PRINT_Bordereau_Lignes;
/*
CREATE OR REPLACE VIEW VUE_PRINT_Bordereau_Lignes AS
SELECT 
SUBSTRING(rg_mode FOR 2)|| SUBSTRING(rg_mode FROM LENGTH(rg_mode)-1) AS RG_ModeReglement,                                    -- 0
PE_NumPersonne AS PE_Numero, -- 1
substring(initcap(PE_Libelle) for 18) as pe_libelle, -- 2
substring(initcap(rg_libellebanque) for 18) as RG_Banque, -- 3
rg_numerocompte as RG_Compte, -- 4
rg_reference as RG_Cheque, -- 5
RG_Date,  -- 6
RG_Montant -- 7
FROM reglement left join personne using(pe_numero), constante as a, constante as b
WHERE a.cs_valeur::date<=reglement.updated_at AND reglement.updated_at<=(b.cs_valeur||' 23:59')::timestamp AND a.cs_type=100 AND b.cs_type=101 
  AND SUBSTRING(rg_mode FOR 2)|| SUBSTRING(rg_mode FROM LENGTH(rg_mode)-1) like 'ChCA'
ORDER BY rg_date, pe_libelle;

*/

--===========================================================================--
--DROP VIEW VUE_PRINT_ListeReglement_entete;

CREATE OR REPLACE VIEW VUE_PRINT_ListeReglement_Entete AS
SELECT 
MR_Compte AS BR_Compte,
LR_Numero AS BR_Numero,
CURRENT_TIMESTAMP AS BR_PrintedOn,
sum(rg_montant) AS BR_Total,
count(rg_numero) AS BR_Count,
LR_Numero
FROM reglement r join modereglement m USING (mr_numero) join listereglement l using (lr_numero)
GROUP BY 1,2,3;


--===========================================================================--
--DROP VIEW VUE_PRINT_ListeReglement_Lignes;

CREATE OR REPLACE VIEW VUE_PRINT_ListeReglement_Lignes AS
SELECT 
rg_mode AS RG_ModeReglement,                                    -- 0
to_char(pe_numero-1000000,'FM099999') AS PE_Numero, -- 1
substring(TRIM(COALESCE(PE_Titre||' ')||PE_Nom||COALESCE(' '||PE_Prenom,'')) for 18) as pe_libelle, -- 2
substring(UPPER(rg_libellebanque) for 18) as RG_Banque, -- 3
SUBSTRING(rg_numerocompte FOR 12) as RG_Compte, -- 4
SUBSTRING(rg_reference FOR 7) as RG_Cheque, -- 5
RG_Date,  -- 6
RG_Montant, -- 7
LR_Numero
FROM reglement join table_personne using (pe_numero) join listereglement l using (lr_numero)
ORDER BY rg_date, pe_libelle;

/*****************************************************************************\
 * Impression des cartes                                                     *
\*****************************************************************************/

--===========================================================================--
--DROP VIEW VUE_PRINT_Carte;
CREATE OR REPLACE VIEW VUE_PRINT_Carte AS
SELECT 
'fdsea'||(adherent.pe_numero-1000000) AS CK_login,                  -- 0
adherent.pe_motdepasse as CK_password,                   -- 1
to_char(adherent.pe_numero-1000000,'FM099999') AS ck_numpersonne,                  -- 2
substr(TRIM(COALESCE(adherent.PE_Titre||' ','')||adherent.PE_Nom||COALESCE(' '||adherent.PE_Prenom,'')),1,26) AS ck_Libelle,--3
conjoint.pe_numero IS NOT NULL OR societe.pe_numero IS NOT NULL AS ck_duo,
CASE WHEN conjoint.pe_numero IS NOT NULL THEN to_char(conjoint.pe_numero-1000000,'FM099999') WHEN societe.pe_numero IS NOT NULL THEN to_char(societe.pe_numero-1000000,'FM099999') ELSE '---' END AS ck_numpersonne2,
substr(TRIM(CASE WHEN conjoint.pe_numero IS NOT NULL THEN COALESCE(conjoint.PE_Titre||' ','')||conjoint.PE_Nom||COALESCE(' '||conjoint.PE_Prenom,'') WHEN societe.pe_numero IS NOT NULL THEN COALESCE(societe.PE_Titre||' ','')||societe.PE_Nom||COALESCE(' '||societe.PE_Prenom,'') ELSE '---' END),1,24) AS ck_libelle2,
adherent.pe_numero,
fa_numero                        -- 4
FROM table_facture JOIN table_cotisation c ON (bml_extract(cs_detail,'fdsea.facture')=fa_numero)
  LEFT JOIN table_personne adherent ON (c.pe_numero=adherent.pe_numero)
  LEFT JOIN table_personne conjoint ON (bml_extract(cs_detail,'fdsea.conjoint.numero')=conjoint.pe_numero)
  LEFT JOIN table_personne societe ON (bml_extract(cs_detail,'cotisation.societe')=societe.pe_numero);

GRANT SELECT ON VUE_PRINT_Carte TO PUBLIC;


/*****************************************************************************\
 * Relance des factures impayées                                             *
\*****************************************************************************/

--===========================================================================--

--DROP VIEW VUE_PRINT_Relance_factures;
CREATE OR REPLACE VIEW VUE_PRINT_Relance_factures AS 
SELECT fa.fa_numero AS cle, fa.fa_numero, fa.fa_numfact, fa.pe_numero, fa.fa_date, fc_dateenlettre(fa.fa_date) AS fa_datel, CASE WHEN current_date>fc_delai(fa.fa_date,COALESCE(r3.cs_valeur,'30 days, eom, 2 months')) THEN 3 WHEN current_date>fc_delai(fa.fa_date,COALESCE(r2.cs_valeur, '30 days, eom, 1 month')) THEN 2 WHEN current_date>fc_delai(fa.fa_date,COALESCE(r1.cs_valeur,'30 days, eom')) THEN 1 ELSE 0 END AS fa_niveau, fa_montantttc, COALESCE(fa_regle,0.00) AS fa_regle, fa_montantttc-COALESCE(fa_regle,0.00) AS fa_reste , CASE WHEN fa_next_reflation_on>CURRENT_DATE THEN fa_next_reflation_on::TEXT ELSE '-' END AS fa_relance, fa_next_reflation_on
FROM table_facture fa LEFT JOIN ( SELECT fa_numero, sum(fr_montant) as fa_regle FROM table_facturereglement GROUP BY 1) fr USING (fa_numero) left join table_avoir using (fa_numero) LEFT JOIN table_constante r1 ON (r1.cs_nom='FIRST_REFLATION') LEFT JOIN table_constante r2 ON (r1.cs_nom='SECOND_REFLATION') LEFT JOIN table_constante r3 ON (r1.cs_nom='THIRD_REFLATION')
WHERE abs(COALESCE(fa_regle,0)-fa_montantttc)>0 and fa_date>='1/1/2006' and not fa_perte and av_numero is null and fa.SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);


--DROP VIEW VUE_PRINT_Relance_Solde;
CREATE OR REPLACE VIEW VUE_PRINT_Relance_Solde AS 
SELECT x.*, debit-credit AS solde, round(((debit-credit)*p.cs_valeur::float)::numeric,2) AS penalty, (CASE WHEN debit<COALESCE(l.cs_valeur,'300')::float THEN 1 ELSE 3 END) AS nb_regl
  FROM (SELECT pe_numero, count(fa_numero) AS nombre, sum(fa_montantttc) AS debit, sum(fa_regle) AS credit, max(fa_niveau) AS fa_niveau FROM vue_print_relance_factures WHERE fa_next_reflation_on<=CURRENT_DATE GROUP BY 1) AS x 
    LEFT JOIN table_constante l ON (l.cs_nom='DOWNPAYMENT_LIMIT') 
    LEFT JOIN table_constante m ON (m.cs_nom='MINIMUM_FOR_REFLATION')
    LEFT JOIN table_constante p ON (p.cs_nom='DELAY_PENALTY')
  WHERE (debit-credit)>COALESCE(m.cs_valeur,'1')::float
;


--DROP VIEW VUE_PRINT_Relance_Entete;
CREATE OR REPLACE VIEW VUE_PRINT_Relance_Entete AS 
SELECT pe_numero, pe_numpersonne, fa_niveau AS ry_niveau, nombre AS ry_nombre, debit as ry_debit, credit as ry_credit, solde as ry_solde, nb_regl as ry_nb_regl, pe_libelle, ad_ligne2, ad_ligne3, ad_ligne4, ad_ligne5, cp_codepostal, vi_nom, fc_dateenlettre(current_date) AS made_on, fc_dateenlettre((current_date+'8 days'::interval)::date) AS RY_Huitaine, penalty AS RY_Penalty 
FROM vue_print_relance_solde join personne using (pe_numero) left join adresse using (pe_numero) left join codepostal using (cp_numero) left join ville using (vi_numero)
WHERE fa_niveau>0;

