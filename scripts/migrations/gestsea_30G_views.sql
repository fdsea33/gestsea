-- Introduction
    /* Voici le MCD du projet . */
-- Suppression des vues

-- Creation des vues sur tables et des règles qui vont avec
CREATE OR REPLACE VIEW "societe" AS
   SELECT table_societe.so_numero, table_societe.so_libelle, table_societe.so_abbrev, table_societe.pe_numero, table_societe.so_detail, table_societe.so_sequence, table_societe.ts_numero, table_societe.sq_numero, table_societe.created_at, table_societe.created_by, table_societe.updated_at, table_societe.updated_by, table_societe.lock_version, table_societe.id 
     FROM "table_societe";

CREATE OR REPLACE VIEW "droit" AS
   SELECT table_droit.dr_numero, table_droit.dp_numero, table_droit.gt_numero, table_droit.dr_select, table_droit.dr_insert, table_droit.dr_update, table_droit.dr_delete, table_droit.created_at, table_droit.created_by, table_droit.updated_at, table_droit.updated_by, table_droit.lock_version, table_droit.id, CASE WHEN DR_Select THEN 'Lecture' ELSE '' END || CASE WHEN DR_Insert AND DR_Select THEN ', Ajout' WHEN DR_Insert THEN 'Ajout' ELSE '' END || CASE WHEN DR_Update AND (DR_Select OR DR_Insert) THEN ', Modification' WHEN DR_Update THEN 'Modification' ELSE '' END || CASE WHEN DR_Delete AND (DR_Insert OR DR_Update OR DR_Delete) THEN ', Suppression' WHEN DR_Delete THEN 'Suppression' ELSE '' END AS DR_Droits 
     FROM "table_droit";

CREATE OR REPLACE VIEW "service" AS
   SELECT table_service.se_numero, table_service.se_nom, table_service.se_societe, table_service.se_agent, table_service.created_at, table_service.created_by, table_service.updated_at, table_service.updated_by, table_service.lock_version, table_service.id 
     FROM "table_service";

CREATE OR REPLACE VIEW "groupetable" AS
   SELECT table_groupetable.gt_numero, table_groupetable.gt_libelle, table_groupetable.gt_tables, table_groupetable.created_at, table_groupetable.created_by, table_groupetable.updated_at, table_groupetable.updated_by, table_groupetable.lock_version, table_groupetable.id 
     FROM "table_groupetable";

CREATE OR REPLACE VIEW "employe" AS
   SELECT table_employe.em_numero, table_employe.dp_numero, table_employe.em_emploi, table_employe.em_service, table_employe.em_agent, table_employe.em_login, table_employe.em_reglement, table_employe.em_self_invoicing, table_employe.em_service_invoicing, table_employe.em_societe_invoicing, table_employe.em_personne_editing, table_employe.em_acces, table_employe.em_password, table_employe.em_super, table_employe.created_at, table_employe.created_by, table_employe.updated_at, table_employe.updated_by, table_employe.lock_version, table_employe.id, AG_Prenom||' '||AG_Nom||' (Service '||SE_Nom||')' AS EM_Libelle 
     FROM "table_employe" JOIN table_Agent ON (EM_Agent=AG_Numero) JOIN table_Service ON (EM_Service=SE_Numero)
    ORDER BY AG_Nom, AG_Prenom;

CREATE OR REPLACE VIEW "constante" AS
   SELECT table_constante.cs_numero, table_constante.cs_type, table_constante.cs_valeur, table_constante.created_at, table_constante.created_by, table_constante.updated_at, table_constante.updated_by, table_constante.lock_version, table_constante.id 
     FROM "table_constante";

CREATE OR REPLACE VIEW "typeadresse" AS
   SELECT table_typeadresse.ak_numero, table_typeadresse.ak_nom, table_typeadresse.created_at, table_typeadresse.created_by, table_typeadresse.updated_at, table_typeadresse.updated_by, table_typeadresse.lock_version, table_typeadresse.id 
     FROM "table_typeadresse";

CREATE OR REPLACE VIEW "adresse" AS
   SELECT table_adresse.ad_numero, table_adresse.ak_numero, table_adresse.cp_numero, table_adresse.vi_numero, table_adresse.pe_numero, table_adresse.ad_active, table_adresse.ad_ligne2, table_adresse.ad_ligne3, table_adresse.ad_ligne4, table_adresse.ad_ligne5, table_adresse.ad_datestop, table_adresse.created_at, table_adresse.created_by, table_adresse.updated_at, table_adresse.updated_by, table_adresse.lock_version, table_adresse.id, COALESCE(Ad_Ligne2||', ','')||COALESCE(Ad_Ligne3||', ','')||COALESCE(Ad_Ligne4||', ','')||COALESCE(Ad_Ligne5||', ','')||CP_CodePostal||' '||VI_Nom AS AD_Libelle, COALESCE(Ad_Ligne2,'')||';'||COALESCE(Ad_Ligne3,'')||';'||COALESCE(Ad_Ligne4,'')||';'||COALESCE(Ad_Ligne5,'')||';'||CP_CodePostal||';'||VI_Nom AS AD_CSV, AK_Nom AS AD_Type 
     FROM "table_adresse" JOIN table_TypeAdresse USING (AK_Numero) JOIN table_CodePostal AS CP USING (CP_Numero) JOIN table_Ville AS VI USING (VI_Numero) 
    WHERE AD_Active;

CREATE OR REPLACE VIEW "adresseversion" AS
   SELECT table_adresseversion.aw_numero, table_adresseversion.ad_numero, table_adresseversion.ak_numero, table_adresseversion.cp_numero, table_adresseversion.vi_numero, table_adresseversion.pe_numero, table_adresseversion.aw_ligne2, table_adresseversion.aw_ligne3, table_adresseversion.aw_ligne4, table_adresseversion.aw_ligne5, table_adresseversion.version, table_adresseversion.operation, table_adresseversion.created_at, table_adresseversion.created_by, table_adresseversion.updated_at, table_adresseversion.updated_by, table_adresseversion.lock_version, table_adresseversion.id, COALESCE(Aw_Ligne2||', ','')||COALESCE(Aw_Ligne3||', ','')||COALESCE(Aw_Ligne4||', ','')||COALESCE(Aw_Ligne5||', ','')||CP_CodePostal||' '||VI_Nom AS AW_Libelle, COALESCE(Aw_Ligne2,'')||';'||COALESCE(Aw_Ligne3,'')||';'||COALESCE(Aw_Ligne4,'')||';'||COALESCE(Aw_Ligne5,'')||';'||CP_CodePostal||';'||VI_Nom AS AW_CSV, AK_Nom AS AW_Type 
     FROM "table_adresseversion" JOIN table_TypeAdresse USING (AK_Numero) JOIN table_CodePostal AS CP USING (CP_Numero) JOIN table_Ville AS VI USING (VI_Numero);

CREATE OR REPLACE VIEW "canton" AS
   SELECT table_canton.ct_numero, table_canton.ct_nom, table_canton.created_at, table_canton.created_by, table_canton.updated_at, table_canton.updated_by, table_canton.lock_version, table_canton.id 
     FROM "table_canton";

CREATE OR REPLACE VIEW "appartienta" AS
   SELECT table_appartienta.ct_numero, table_appartienta.gc_numero, table_appartienta.created_at, table_appartienta.created_by, table_appartienta.updated_at, table_appartienta.updated_by, table_appartienta.lock_version, table_appartienta.id 
     FROM "table_appartienta";

CREATE OR REPLACE VIEW "groupecanton" AS
   SELECT table_groupecanton.gc_numero, table_groupecanton.gc_nom, table_groupecanton.created_at, table_groupecanton.created_by, table_groupecanton.updated_at, table_groupecanton.updated_by, table_groupecanton.lock_version, table_groupecanton.id 
     FROM "table_groupecanton";

CREATE OR REPLACE VIEW "codepostal" AS
   SELECT table_codepostal.cp_numero, table_codepostal.cp_codepostal, table_codepostal.cp_bureau, table_codepostal.created_at, table_codepostal.created_by, table_codepostal.updated_at, table_codepostal.updated_by, table_codepostal.lock_version, table_codepostal.id 
     FROM "table_codepostal";

CREATE OR REPLACE VIEW "villecp" AS
   SELECT table_villecp.vi_numero, table_villecp.cp_numero, table_villecp.created_at, table_villecp.created_by, table_villecp.updated_at, table_villecp.updated_by, table_villecp.lock_version, table_villecp.id 
     FROM "table_villecp";

CREATE OR REPLACE VIEW "ville" AS
   SELECT table_ville.vi_numero, table_ville.vi_nom, table_ville.ct_numero, table_ville.created_at, table_ville.created_by, table_ville.updated_at, table_ville.updated_by, table_ville.lock_version, table_ville.id 
     FROM "table_ville";

CREATE OR REPLACE VIEW "contacttype" AS
   SELECT table_contacttype.ck_numero, table_contacttype.ck_code, table_contacttype.ck_nom, table_contacttype.ck_number, table_contacttype.ck_email, table_contacttype.ck_url, table_contacttype.created_at, table_contacttype.created_by, table_contacttype.updated_at, table_contacttype.updated_by, table_contacttype.lock_version, table_contacttype.id 
     FROM "table_contacttype";

CREATE OR REPLACE VIEW "contact" AS
   SELECT table_contact.cn_numero, table_contact.cn_coordonnee, table_contact.cn_actif, table_contact.ck_numero, table_contact.pe_numero, table_contact.created_at, table_contact.created_by, table_contact.updated_at, table_contact.updated_by, table_contact.lock_version, table_contact.id 
     FROM "table_contact" 
    WHERE CN_Actif;

CREATE OR REPLACE VIEW "contactversion" AS
   SELECT table_contactversion.cw_numero, table_contactversion.cw_coordonnee, table_contactversion.ck_numero, table_contactversion.pe_numero, table_contactversion.cn_numero, table_contactversion.version, table_contactversion.operation, table_contactversion.created_at, table_contactversion.created_by, table_contactversion.updated_at, table_contactversion.updated_by, table_contactversion.lock_version, table_contactversion.id 
     FROM "table_contactversion";

CREATE OR REPLACE VIEW "typelien" AS
   SELECT table_typelien.tl_numero, table_typelien.tl_code, table_typelien.tl_libelle, table_typelien.tl_action12, table_typelien.tl_action21, table_typelien.tl_description, table_typelien.created_at, table_typelien.created_by, table_typelien.updated_at, table_typelien.updated_by, table_typelien.lock_version, table_typelien.id 
     FROM "table_typelien";

CREATE OR REPLACE VIEW "estlie" AS
   SELECT table_estlie.el_numero, table_estlie.el_personne1, table_estlie.el_personne2, table_estlie.el_actif, table_estlie.tl_numero, table_estlie.tl_code, table_estlie.el_debut, table_estlie.el_fin, table_estlie.created_at, table_estlie.created_by, table_estlie.updated_at, table_estlie.updated_by, table_estlie.lock_version, table_estlie.id, TRIM(COALESCE(p1.PE_Titre||' ','')||COALESCE(p1.PE_Nom,'')||COALESCE(' '||p1.PE_Prenom,'')||' / '||p1.pe_id) AS EL_Libelle1, TRIM(COALESCE(p2.PE_Titre||' ','')||COALESCE(p2.PE_Nom,'')||COALESCE(' '||p2.PE_Prenom,'')||' / '||p2.pe_id) AS EL_Libelle2, TL_Action12, TL_Action21 
     FROM "table_estlie" JOIN table_Personne AS p1 ON (EL_Personne1=p1.PE_Numero) JOIN table_Personne AS p2 ON (EL_Personne2=p2.PE_Numero) JOIN table_TypeLien USING (TL_Numero) 
    WHERE EL_Actif;

CREATE OR REPLACE VIEW "naturepersonne" AS
   SELECT table_naturepersonne.np_numero, table_naturepersonne.np_nom, table_naturepersonne.np_abrev, table_naturepersonne.np_titre, table_naturepersonne.np_morale, table_naturepersonne.np_avectitre, table_naturepersonne.np_inclu, table_naturepersonne.np_temporaire, table_naturepersonne.np_genre, table_naturepersonne.created_at, table_naturepersonne.created_by, table_naturepersonne.updated_at, table_naturepersonne.updated_by, table_naturepersonne.lock_version, table_naturepersonne.id, TRIM(CASE WHEN NP_Inclu THEN COALESCE(NULLIF(TRIM(NP_Abrev),'')||', ','') ELSE '' END||NP_Nom||CASE WHEN NOT NP_AvecTitre THEN ' *' ELSE '' END) AS NP_Libelle 
     FROM "table_naturepersonne"
    ORDER BY 16;

CREATE OR REPLACE VIEW "personne" AS
   SELECT table_personne.pe_numero, table_personne.pe_id, table_personne.tp_numero, table_personne.np_numero, table_personne.pe_titre, table_personne.pe_nom, table_personne.pe_regimefiscal, table_personne.pe_actif, table_personne.pe_morale, table_personne.deleted, table_personne.pe_prenom, table_personne.pe_motdepasse, table_personne.pe_naissance, table_personne.pe_numtvaic, table_personne.created_at, table_personne.created_by, table_personne.updated_at, table_personne.updated_by, table_personne.lock_version, table_personne.id, TRIM(COALESCE(PE_Titre||' ','')|| COALESCE(PE_Nom,'')|| COALESCE(' '||PE_Prenom,'')) AS PE_Libelle, COALESCE(PE_Nom||' ','')|| COALESCE(PE_Prenom,'')||COALESCE(' ('||NULLIF(TRIM(PE_Titre),'')||')','') AS PE_Fullname, to_char(PE_ID,'FM099999') AS PE_NumPersonne, to_char(PE_ID,'FM099999')||' - '||TRIM(COALESCE(PE_Titre||' ','')|| COALESCE(PE_Nom,'')|| COALESCE(' '||PE_Prenom,'')) AS PE_Description 
     FROM "table_personne";

CREATE OR REPLACE VIEW "personneupdate" AS
   SELECT table_personneupdate.pu_numero, table_personneupdate.pu_action, table_personneupdate.pu_bilan, table_personneupdate.pe_numero, table_personneupdate.tp_numero, table_personneupdate.pe_titre, table_personneupdate.pe_nom, table_personneupdate.pe_regimefiscal, table_personneupdate.pe_morale, table_personneupdate.pe_prenom, table_personneupdate.pe_naissance, table_personneupdate.created_at, table_personneupdate.created_by, table_personneupdate.updated_at, table_personneupdate.updated_by, table_personneupdate.lock_version, table_personneupdate.id, COALESCE(PE_Titre||' ','')||COALESCE(PE_Nom||' ','')||COALESCE(PE_Prenom,'') AS PE_Libelle, to_char(PE_Numero-1000000,'0999999') AS PE_NumPersonne, to_char(updated_at,'YYYY-MM-DD HH24:MI:SS.US') AS PU_Date 
     FROM "table_personneupdate";

CREATE OR REPLACE VIEW "estresponsable" AS
   SELECT table_estresponsable.peac_numero, table_estresponsable.pe_numero, table_estresponsable.re_numero, table_estresponsable.peac_periodedebut, table_estresponsable.peac_periodefin, table_estresponsable.peac_titre, table_estresponsable.peac_fini, table_estresponsable.created_at, table_estresponsable.created_by, table_estresponsable.updated_at, table_estresponsable.updated_by, table_estresponsable.lock_version, table_estresponsable.id, CASE WHEN PEAC_Fini THEN 'Terminé' ELSE 'En cours' END AS PEAC_Status 
     FROM "table_estresponsable";

CREATE OR REPLACE VIEW "responsabilite" AS
   SELECT table_responsabilite.re_numero, table_responsabilite.re_code, table_responsabilite.re_nom, table_responsabilite.re_famille, table_responsabilite.created_at, table_responsabilite.created_by, table_responsabilite.updated_at, table_responsabilite.updated_by, table_responsabilite.lock_version, table_responsabilite.id 
     FROM "table_responsabilite";

CREATE OR REPLACE VIEW "attribut" AS
   SELECT table_attribut.at_numero, table_attribut.pe_numero, table_attribut.ta_numero, table_attribut.cr_numero, table_attribut.at_valeur, table_attribut.created_at, table_attribut.created_by, table_attribut.updated_at, table_attribut.updated_by, table_attribut.lock_version, table_attribut.id 
     FROM "table_attribut";

CREATE OR REPLACE VIEW "typeattribut" AS
   SELECT table_typeattribut.ta_numero, table_typeattribut.ta_nom, table_typeattribut.created_at, table_typeattribut.created_by, table_typeattribut.updated_at, table_typeattribut.updated_by, table_typeattribut.lock_version, table_typeattribut.id 
     FROM "table_typeattribut";

CREATE OR REPLACE VIEW "categorie" AS
   SELECT table_categorie.cr_numero, table_categorie.cr_libelle, table_categorie.ta_numero, table_categorie.cr_description, table_categorie.created_at, table_categorie.created_by, table_categorie.updated_at, table_categorie.updated_by, table_categorie.lock_version, table_categorie.id 
     FROM "table_categorie";

CREATE OR REPLACE VIEW "tva" AS
   SELECT table_tva.tv_numero, table_tva.tv_code, ROUND(table_tva.tv_taux,2) AS tv_taux, table_tva.tv_actif, table_tva.so_numero, table_tva.cg_numero, table_tva.created_at, table_tva.created_by, table_tva.updated_at, table_tva.updated_by, table_tva.lock_version, table_tva.id, to_char(TV_Taux,'FM90.90')||'%' AS TV_TauxTVA, TV_Taux||' % ('||TV_Code||')' AS TV_Pourcentage, CASE WHEN TV_Actif THEN 'Actif' ELSE 'Inactif' END AS TV_Etat 
     FROM "table_tva" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "typepersonne" AS
   SELECT table_typepersonne.tp_numero, table_typepersonne.tp_type, table_typepersonne.created_at, table_typepersonne.created_by, table_typepersonne.updated_at, table_typepersonne.updated_by, table_typepersonne.lock_version, table_typepersonne.id 
     FROM "table_typepersonne"
    ORDER BY TP_Type;

CREATE OR REPLACE VIEW "typetache" AS
   SELECT table_typetache.th_numero, table_typetache.th_libelle, table_typetache.th_description, table_typetache.created_at, table_typetache.created_by, table_typetache.updated_at, table_typetache.updated_by, table_typetache.lock_version, table_typetache.id 
     FROM "table_typetache";

CREATE OR REPLACE VIEW "appel" AS
   SELECT table_appel.ap_numero, table_appel.ap_libelle, table_appel.th_numero, table_appel.ap_date, table_appel.ap_description, ROUND(table_appel.ap_duree,2) AS ap_duree, table_appel.pe_numero, table_appel.created_at, table_appel.created_by, table_appel.updated_at, table_appel.updated_by, table_appel.lock_version, table_appel.id, TO_CHAR(AP_DATE,'YYYY-MM-DD') AS AP_RDate 
     FROM "table_appel";

CREATE OR REPLACE VIEW "typesociete" AS
   SELECT table_typesociete.ts_numero, table_typesociete.ts_libelle, table_typesociete.created_at, table_typesociete.created_by, table_typesociete.updated_at, table_typesociete.updated_by, table_typesociete.lock_version, table_typesociete.id 
     FROM "table_typesociete";

CREATE OR REPLACE VIEW "adherence" AS
   SELECT table_adherence.ah_numero, table_adherence.pd_numero, table_adherence.ah_libelle, ROUND(table_adherence.ah_reduction,2) AS ah_reduction, table_adherence.ah_cascade, table_adherence.tl_numero, table_adherence.ah_liendirect, table_adherence.ah_lienindirect, table_adherence.created_at, table_adherence.created_by, table_adherence.updated_at, table_adherence.updated_by, table_adherence.lock_version, table_adherence.id 
     FROM "table_adherence";

CREATE OR REPLACE VIEW "periodeadherence" AS
   SELECT table_periodeadherence.po_numero, table_periodeadherence.ah_numero, table_periodeadherence.created_at, table_periodeadherence.created_by, table_periodeadherence.updated_at, table_periodeadherence.updated_by, table_periodeadherence.lock_version, table_periodeadherence.id 
     FROM "table_periodeadherence";

CREATE OR REPLACE VIEW "adhesion" AS
   SELECT table_adhesion.as_numero, ROUND(table_adhesion.as_reductionmax,2) AS as_reductionmax, table_adhesion.pe_numero, table_adhesion.po_numero, table_adhesion.ah_numero, table_adhesion.fa_numero, table_adhesion.lf_numero, table_adhesion.as_origine, table_adhesion.created_at, table_adhesion.created_by, table_adhesion.updated_at, table_adhesion.updated_by, table_adhesion.lock_version, table_adhesion.id 
     FROM "table_adhesion";

CREATE OR REPLACE VIEW "periode" AS
   SELECT table_periode.po_numero, table_periode.po_debut, table_periode.po_fin, table_periode.created_at, table_periode.created_by, table_periode.updated_at, table_periode.updated_by, table_periode.lock_version, table_periode.id, EXTRACT(YEAR FROM PO_Debut)||CASE WHEN EXTRACT(YEAR FROM PO_Debut)!=EXTRACT(YEAR FROM PO_Fin) THEN '/'||EXTRACT(YEAR FROM PO_Fin) ELSE '' END AS PO_Annee, 'Du '||PO_Debut||' au '||PO_Fin AS PO_Libelle 
     FROM "table_periode";

CREATE OR REPLACE VIEW "observation" AS
   SELECT table_observation.ob_numero, table_observation.pe_numero, table_observation.ob_observation, table_observation.ob_niveau, table_observation.created_at, table_observation.created_by, table_observation.updated_at, table_observation.updated_by, table_observation.lock_version, table_observation.id 
     FROM "table_observation";

CREATE OR REPLACE VIEW "typejournal" AS
   SELECT table_typejournal.tj_numero, table_typejournal.tj_libelle, table_typejournal.created_at, table_typejournal.created_by, table_typejournal.updated_at, table_typejournal.updated_by, table_typejournal.lock_version, table_typejournal.id 
     FROM "table_typejournal";

CREATE OR REPLACE VIEW "modele" AS
   SELECT table_modele.mo_numero, table_modele.mo_libelle, table_modele.so_numero, table_modele.created_at, table_modele.created_by, table_modele.updated_at, table_modele.updated_by, table_modele.lock_version, table_modele.id 
     FROM "table_modele" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "lignemodele" AS
   SELECT table_lignemodele.lm_numero, table_lignemodele.pd_numero, table_lignemodele.mo_numero, ROUND(table_lignemodele.lm_quantite,2) AS lm_quantite, ROUND(table_lignemodele.lm_montantht,2) AS lm_montantht, ROUND(table_lignemodele.lm_montantttc,2) AS lm_montantttc, table_lignemodele.created_at, table_lignemodele.created_by, table_lignemodele.updated_at, table_lignemodele.updated_by, table_lignemodele.lock_version, table_lignemodele.id 
     FROM "table_lignemodele" JOIN table_Produit USING (PD_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "produit" AS
   SELECT table_produit.pd_numero, table_produit.pd_id, table_produit.pd_libelle, table_produit.pd_titre, table_produit.jo_numero, table_produit.so_numero, table_produit.pd_actif, table_produit.pd_sansquantite, table_produit.pd_reduction, table_produit.created_at, table_produit.created_by, table_produit.updated_at, table_produit.updated_by, table_produit.lock_version, table_produit.id, CASE WHEN PD_Actif THEN 'Actif' ELSE 'Inactif' END AS PD_Etat, 'P'||to_char(pd_id,'FM0999') AS pd_code 
     FROM "table_produit" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe)
    ORDER BY pd_libelle;

CREATE OR REPLACE VIEW "prix" AS
   SELECT table_prix.px_numero, table_prix.tv_numero, table_prix.pd_numero, ROUND(table_prix.px_tarifht,4) AS px_tarifht, ROUND(table_prix.px_tarifttc,4) AS px_tarifttc, table_prix.px_actif, table_prix.px_datedebut, table_prix.px_datefin, table_prix.created_at, table_prix.created_by, table_prix.updated_at, table_prix.updated_by, table_prix.lock_version, table_prix.id, pd_libelle||' / '||px_tarifht::float||'€ HT' AS px_libelle, pd_actif AND px_actif AS px_vendable 
     FROM "table_prix" JOIN table_Produit USING (PD_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe) AND px_actif
    ORDER BY pd_libelle;

CREATE OR REPLACE VIEW "ligne" AS
   SELECT table_ligne.l_numero, table_ligne.pd_numero, table_ligne.de_numero, ROUND(table_ligne.l_quantite,4) AS l_quantite, ROUND(table_ligne.l_montantht,2) AS l_montantht, ROUND(table_ligne.l_montantttc,2) AS l_montantttc, table_ligne.px_numero, table_ligne.l_notes, table_ligne.created_at, table_ligne.created_by, table_ligne.updated_at, table_ligne.updated_by, table_ligne.lock_version, table_ligne.id 
     FROM "table_ligne" JOIN table_Produit USING (PD_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "devis" AS
   SELECT table_devis.de_numero, table_devis.pe_numero, table_devis.so_numero, table_devis.de_date, table_devis.de_libelle, ROUND(table_devis.de_reduction,2) AS de_reduction, ROUND(table_devis.de_montantht,2) AS de_montantht, ROUND(table_devis.de_montantttc,2) AS de_montantttc, table_devis.em_numero, table_devis.de_locked, table_devis.de_acompte, table_devis.de_lettre, table_devis.de_civilites, table_devis.de_introduction, table_devis.created_at, table_devis.created_by, table_devis.updated_at, table_devis.updated_by, table_devis.lock_version, table_devis.id, NOT DE_Locked AS PX_Vendable, CASE WHEN DE_Acompte THEN ROUND(0.3*DE_MontantTTC,2) ELSE 0 END AS DE_MontantAcompte 
     FROM "table_devis" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "lignefacture" AS
   SELECT table_lignefacture.lf_numero, table_lignefacture.fa_numero, table_lignefacture.px_numero, table_lignefacture.pd_numero, ROUND(table_lignefacture.lf_quantite,2) AS lf_quantite, ROUND(table_lignefacture.lf_montantht,2) AS lf_montantht, ROUND(table_lignefacture.lf_montantttc,2) AS lf_montantttc, table_lignefacture.lf_notes, table_lignefacture.created_at, table_lignefacture.created_by, table_lignefacture.updated_at, table_lignefacture.updated_by, table_lignefacture.lock_version, table_lignefacture.id 
     FROM "table_lignefacture" JOIN table_Produit USING (PD_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "facture" AS
   SELECT table_facture.fa_numero, table_facture.de_numero, table_facture.pe_numero, table_facture.ag_numero, table_facture.fa_numfact, table_facture.fa_date, table_facture.fa_perte, ROUND(table_facture.fa_reduction,2) AS fa_reduction, ROUND(table_facture.fa_montantht,2) AS fa_montantht, ROUND(table_facture.fa_montantttc,2) AS fa_montantttc, ROUND(table_facture.fa_accompte,2) AS fa_accompte, table_facture.fa_annotation, table_facture.fa_libelle, table_facture.so_numero, table_facture.created_at, table_facture.created_by, table_facture.updated_at, table_facture.updated_by, table_facture.lock_version, table_facture.id, CASE WHEN fa_perte THEN 'En perte' ELSE '-' END AS fa_etat 
     FROM "table_facture" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "ligneavoir" AS
   SELECT table_ligneavoir.la_numero, table_ligneavoir.pd_numero, table_ligneavoir.av_numero, table_ligneavoir.px_numero, ROUND(table_ligneavoir.la_quantite,2) AS la_quantite, ROUND(table_ligneavoir.la_montantht,2) AS la_montantht, ROUND(table_ligneavoir.la_montantttc,2) AS la_montantttc, table_ligneavoir.la_notes, table_ligneavoir.created_at, table_ligneavoir.created_by, table_ligneavoir.updated_at, table_ligneavoir.updated_by, table_ligneavoir.lock_version, table_ligneavoir.id 
     FROM "table_ligneavoir" JOIN table_Produit USING (PD_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "avoir" AS
   SELECT DISTINCT table_avoir.av_numero, table_avoir.pe_numero, table_avoir.fa_numero, table_avoir.av_numfact, table_avoir.av_date, ROUND(table_avoir.av_montantht,2) AS av_montantht, ROUND(table_avoir.av_montantttc,2) AS av_montantttc, ROUND(table_avoir.av_reduction,2) AS av_reduction, table_avoir.created_at, table_avoir.created_by, table_avoir.updated_at, table_avoir.updated_by, table_avoir.lock_version, table_avoir.id 
     FROM "table_avoir" JOIN table_LigneAvoir USING (AV_Numero) JOIN table_Produit USING (PD_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "routage" AS
   SELECT table_routage.ro_numero, table_routage.ad_numero, table_routage.pe_numero, table_routage.ro_debutservice, table_routage.ro_finservice, table_routage.ro_quantite, table_routage.ro_suspendu, table_routage.ro_dernierroute, table_routage.fa_numero, table_routage.created_at, table_routage.created_by, table_routage.updated_at, table_routage.updated_by, table_routage.lock_version, 'du '||RO_DebutService||' au '||RO_FinService||' ('||RO_Numero||')' AS RO_Libelle 
     FROM "table_routage";

CREATE OR REPLACE VIEW "agent" AS
   SELECT table_agent.ag_numero, table_agent.ag_nom, table_agent.ag_prenom, table_agent.ag_initiales, table_agent.ag_actif, table_agent.eq_numero, table_agent.ag_role, table_agent.ag_telephone, table_agent.ag_mobile, table_agent.ag_email, table_agent.ag_commentaire, table_agent.created_at, table_agent.created_by, table_agent.updated_at, table_agent.updated_by, table_agent.lock_version, table_agent.id, COALESCE(AG_Prenom||' ','')||COALESCE(AG_Nom,'') AS AG_Libelle 
     FROM "table_agent";

CREATE OR REPLACE VIEW "equipe" AS
   SELECT table_equipe.eq_numero, table_equipe.eq_nom, table_equipe.created_at, table_equipe.created_by, table_equipe.updated_at, table_equipe.updated_by, table_equipe.lock_version, table_equipe.id 
     FROM "table_equipe";

CREATE OR REPLACE VIEW "exercice" AS
   SELECT table_exercice.ex_numero, table_exercice.so_numero, table_exercice.ex_datedebut, table_exercice.ex_datefin, table_exercice.ex_cloture, table_exercice.ex_password, table_exercice.ex_compteattente, table_exercice.ex_actif, table_exercice.created_at, table_exercice.created_by, table_exercice.updated_at, table_exercice.updated_by, table_exercice.lock_version, table_exercice.id, EXTRACT (YEAR FROM EX_DateDebut) AS EX_Libelle 
     FROM "table_exercice" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "journal" AS
   SELECT table_journal.jo_numero, table_journal.jo_abbrev, table_journal.jo_libelle, ROUND(table_journal.jo_debit,2) AS jo_debit, ROUND(table_journal.jo_credit,2) AS jo_credit, table_journal.so_numero, table_journal.tj_numero, table_journal.cg_numero, table_journal.jo_mois, table_journal.jo_annee, table_journal.jo_contrepartie, table_journal.jo_provisoire, table_journal.jo_visible, table_journal.jo_sequence, table_journal.created_at, table_journal.created_by, table_journal.updated_at, table_journal.updated_by, table_journal.lock_version, table_journal.id, FC_MoisEnLettre(COALESCE(JO_Mois-1,12))||' '||JO_Annee AS JO_MoisLettre, CASE WHEN JO_Contrepartie THEN 'Oui' ELSE 'Non' END AS JO_CP 
     FROM "table_journal" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "piece" AS
   SELECT table_piece.pi_numero, table_piece.jo_numero, table_piece.pi_numpiece, table_piece.ex_numero, table_piece.pi_libelle, ROUND(table_piece.pi_debit,2) AS pi_debit, ROUND(table_piece.pi_credit,2) AS pi_credit, table_piece.pi_date, table_piece.pi_numseq, table_piece.created_at, table_piece.created_by, table_piece.updated_at, table_piece.updated_by, table_piece.lock_version, table_piece.id, CASE WHEN PI_Debit=PI_Credit THEN 'OUI' ELSE 'NON' END AS PI_Equilibre 
     FROM "table_piece" JOIN table_Exercice USING (EX_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "ecriture" AS
   SELECT table_ecriture.ec_numero, table_ecriture.ec_numecriture, table_ecriture.pi_numero, table_ecriture.ex_numero, table_ecriture.cg_numero, table_ecriture.ca_numero, table_ecriture.ec_aux, table_ecriture.pf_numero, table_ecriture.ec_compte, table_ecriture.ec_libelle, ROUND(table_ecriture.ec_debit,2) AS ec_debit, ROUND(table_ecriture.ec_credit,2) AS ec_credit, table_ecriture.pt_numero, table_ecriture.av_numero, table_ecriture.lt_numero, table_ecriture.db_numero, table_ecriture.rg_numero, table_ecriture.fa_numero, table_ecriture.created_at, table_ecriture.created_by, table_ecriture.updated_at, table_ecriture.updated_by, table_ecriture.lock_version, table_ecriture.id, CASE WHEN EC_Aux THEN true ELSE cg.CG_Lettrable END AS EC_Lettrable, CASE WHEN EC_Aux THEN true ELSE cg.CG_Pointable END AS EC_Pointable 
     FROM "table_ecriture" JOIN table_CompteGen AS cg USING (CG_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "comptegen" AS
   SELECT table_comptegen.cg_numero, table_comptegen.cg_numcompte, table_comptegen.cg_libelle, table_comptegen.ac_numero, table_comptegen.cg_accepteaux, table_comptegen.cg_utilisable, table_comptegen.cg_lettrable, table_comptegen.cg_pointable, table_comptegen.so_numero, table_comptegen.cg_groupable, table_comptegen.cg_debit, table_comptegen.created_at, table_comptegen.created_by, table_comptegen.updated_at, table_comptegen.updated_by, table_comptegen.lock_version, table_comptegen.id, CG_NumCompte||' '||CG_Libelle AS CG_Nom, COALESCE(SUM(ec_debit),0) AS cg_vdebit, COALESCE(SUM(ec_credit),0) AS cg_vcredit 
     FROM "table_comptegen" LEFT JOIN table_Ecriture USING(cg_numero), table_Acces AS a, table_Acces AS b, table_Employe 
    WHERE table_CompteGen.AC_Numero=a.AC_Numero AND EM_Login=CURRENT_USER AND EM_Acces=b.AC_Numero AND a.AC_Niveau>=b.AC_Niveau AND SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe) 
 GROUP BY  table_comptegen.cg_numero, table_comptegen.cg_numcompte, table_comptegen.cg_libelle, table_comptegen.ac_numero, table_comptegen.cg_accepteaux, table_comptegen.cg_utilisable, table_comptegen.cg_lettrable, table_comptegen.cg_pointable, table_comptegen.so_numero, table_comptegen.cg_groupable, table_comptegen.cg_debit, table_comptegen.created_at, table_comptegen.created_by, table_comptegen.updated_at, table_comptegen.updated_by, table_comptegen.lock_version, table_comptegen.id;

CREATE OR REPLACE VIEW "compteproduit" AS
   SELECT table_compteproduit.ci_numero, table_compteproduit.pd_numero, table_compteproduit.cg_numero, table_compteproduit.ci_actif, table_compteproduit.created_at, table_compteproduit.created_by, table_compteproduit.updated_at, table_compteproduit.updated_by, table_compteproduit.lock_version, table_compteproduit.id 
     FROM "table_compteproduit" JOIN table_CompteGen AS CG USING (CG_Numero) JOIN table_Produit AS PD USING (PD_Numero) 
    WHERE CG.SO_Numero=PD.SO_Numero AND PD.SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "compteaux" AS
   SELECT table_compteaux.ca_numero, table_compteaux.cg_numero, table_compteaux.ca_numcompte, table_compteaux.ca_libelle, table_compteaux.ac_numero, table_compteaux.ca_debit, table_compteaux.created_at, table_compteaux.created_by, table_compteaux.updated_at, table_compteaux.updated_by, table_compteaux.lock_version, table_compteaux.id, CA_Numero||' '||CA_Libelle AS CA_Nom, COALESCE(SUM(ec_debit),0) AS ca_vdebit, COALESCE(SUM(ec_credit),0) AS ca_vcredit 
     FROM "table_compteaux" JOIN table_CompteGen USING (CG_Numero) LEFT OUTER JOIN table_Ecriture USING(ca_numero), table_Acces AS a, table_Acces AS b, table_Employe 
    WHERE table_CompteAux.AC_Numero=a.AC_Numero AND EM_Login=CURRENT_USER AND EM_Acces=b.AC_Numero AND a.AC_Niveau>b.AC_Niveau AND SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe) 
 GROUP BY  table_compteaux.ca_numero, table_compteaux.cg_numero, table_compteaux.ca_numcompte, table_compteaux.ca_libelle, table_compteaux.ac_numero, table_compteaux.ca_debit, table_compteaux.created_at, table_compteaux.created_by, table_compteaux.updated_at, table_compteaux.updated_by, table_compteaux.lock_version, table_compteaux.id;

CREATE OR REPLACE VIEW "acces" AS
   SELECT table_acces.ac_numero, table_acces.ac_libelle, table_acces.ac_niveau, table_acces.created_at, table_acces.created_by, table_acces.updated_at, table_acces.updated_by, table_acces.lock_version, table_acces.id, AC_Libelle||' ('||AC_Niveau||')' AS AC_Nom 
     FROM "table_acces";

CREATE OR REPLACE VIEW "pointage" AS
   SELECT table_pointage.pt_numero, table_pointage.pt_date, table_pointage.pt_releve, ROUND(table_pointage.pt_debit,2) AS pt_debit, ROUND(table_pointage.pt_credit,2) AS pt_credit, table_pointage.so_numero, table_pointage.created_at, table_pointage.created_by, table_pointage.updated_at, table_pointage.updated_by, table_pointage.lock_version, table_pointage.id 
     FROM "table_pointage" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "lettrage" AS
   SELECT table_lettrage.lt_numero, table_lettrage.lt_lettre, table_lettrage.so_numero, table_lettrage.created_at, table_lettrage.created_by, table_lettrage.updated_at, table_lettrage.updated_by, table_lettrage.lock_version, table_lettrage.id 
     FROM "table_lettrage" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "prefixe" AS
   SELECT table_prefixe.pf_numero, table_prefixe.pf_nom, table_prefixe.created_at, table_prefixe.created_by, table_prefixe.updated_at, table_prefixe.updated_by, table_prefixe.lock_version, table_prefixe.id 
     FROM "table_prefixe";

CREATE OR REPLACE VIEW "facturereglement" AS
   SELECT table_facturereglement.fr_numero, table_facturereglement.rg_numero, table_facturereglement.fa_numero, table_facturereglement.fr_acompte, table_facturereglement.fr_partiel, ROUND(table_facturereglement.fr_montant,2) AS fr_montant, table_facturereglement.created_at, table_facturereglement.created_by, table_facturereglement.updated_at, table_facturereglement.updated_by, table_facturereglement.lock_version, table_facturereglement.id, CASE WHEN fr_partiel::boolean THEN 'Partiel' ELSE 'Entier' END AS fr_type 
     FROM "table_facturereglement";

CREATE OR REPLACE VIEW "modereglement" AS
   SELECT table_modereglement.mr_numero, table_modereglement.mr_libelle, table_modereglement.mr_compte, table_modereglement.cg_numero, table_modereglement.so_numero, table_modereglement.mr_cheque, table_modereglement.mr_actif, table_modereglement.mr_description, table_modereglement.created_at, table_modereglement.created_by, table_modereglement.updated_at, table_modereglement.updated_by, table_modereglement.lock_version, table_modereglement.id 
     FROM "table_modereglement" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "listereglement" AS
   SELECT table_listereglement.lr_numero, table_listereglement.lr_indice, table_listereglement.lr_commentaire, table_listereglement.em_numero, ROUND(table_listereglement.lr_montant,2) AS lr_montant, table_listereglement.lr_date, table_listereglement.mr_numero, table_listereglement.so_numero, table_listereglement.created_at, table_listereglement.created_by, table_listereglement.updated_at, table_listereglement.updated_by, table_listereglement.lock_version, table_listereglement.id 
     FROM "table_listereglement" 
    WHERE table_ListeReglement.SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "reglement" AS
   SELECT table_reglement.rg_numero, table_reglement.pe_numero, ROUND(table_reglement.rg_montant,2) AS rg_montant, table_reglement.rg_date, table_reglement.em_numero, table_reglement.lr_numero, table_reglement.mr_numero, table_reglement.so_numero, table_reglement.rg_encompta, table_reglement.rg_libellebanque, table_reglement.rg_numerocompte, table_reglement.rg_reference, table_reglement.created_at, table_reglement.created_by, table_reglement.updated_at, table_reglement.updated_by, table_reglement.lock_version, table_reglement.id, CASE WHEN RG_EnCompta::boolean THEN 'Validé' ELSE 'En cours' END AS RG_Etat, MR_Libelle AS RG_Mode, RG_Numero||' - '||RG_Montant||' Euros du '||RG_Date AS RG_Libelle 
     FROM "table_reglement" JOIN table_ModeReglement AS memere USING (MR_Numero) 
    WHERE table_Reglement.SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "moderepartition" AS
   SELECT table_moderepartition.mp_numero, table_moderepartition.mp_libelle, table_moderepartition.cg_numero, table_moderepartition.so_numero, table_moderepartition.mp_actif, table_moderepartition.mp_societe, table_moderepartition.mp_description, table_moderepartition.created_at, table_moderepartition.created_by, table_moderepartition.updated_at, table_moderepartition.updated_by, table_moderepartition.lock_version, table_moderepartition.id 
     FROM "table_moderepartition" 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "repartition" AS
   SELECT table_repartition.rp_numero, table_repartition.rg_numero, table_repartition.mp_numero, ROUND(table_repartition.rp_montant,2) AS rp_montant, table_repartition.created_at, table_repartition.created_by, table_repartition.updated_at, table_repartition.updated_by, table_repartition.lock_version, table_repartition.id 
     FROM "table_repartition" JOIN table_Reglement USING (RG_Numero) 
    WHERE SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "impression" AS
   SELECT table_impression.im_numero, table_impression.im_libelle, table_impression.im_nom, table_impression.im_societe, table_impression.im_modele, table_impression.im_defaut, table_impression.im_keytable, table_impression.im_keycle, table_impression.im_keydate, table_impression.im_fonction, table_impression.created_at, table_impression.created_by, table_impression.updated_at, table_impression.updated_by, table_impression.lock_version, table_impression.id 
     FROM "table_impression" 
    WHERE IM_Societe IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);

CREATE OR REPLACE VIEW "impressionlot" AS
   SELECT table_impressionlot.il_numero, table_impressionlot.il_nom, table_impressionlot.created_at, table_impressionlot.created_by, table_impressionlot.updated_at, table_impressionlot.updated_by, table_impressionlot.lock_version, table_impressionlot.id 
     FROM "table_impressionlot";

CREATE OR REPLACE VIEW "impressiongroupe" AS
   SELECT table_impressiongroupe.ig_numero, table_impressiongroupe.il_numero, table_impressiongroupe.ig_date, table_impressiongroupe.created_at, table_impressiongroupe.created_by, table_impressiongroupe.updated_at, table_impressiongroupe.updated_by, table_impressiongroupe.lock_version, table_impressiongroupe.id 
     FROM "table_impressiongroupe";

CREATE OR REPLACE VIEW "impressiondocument" AS
   SELECT table_impressiondocument.id_numero, table_impressiondocument.ig_numero, table_impressiondocument.id_cle, table_impressiondocument.id_modele, table_impressiondocument.id_filename, table_impressiondocument.created_at, table_impressiondocument.created_by, table_impressiondocument.updated_at, table_impressiondocument.updated_by, table_impressiondocument.lock_version, table_impressiondocument.id 
     FROM "table_impressiondocument";

CREATE OR REPLACE VIEW "cotisation" AS
   SELECT table_cotisation.cs_numero, table_cotisation.pe_numero, table_cotisation.cs_societe, table_cotisation.ig_numero, table_cotisation.cs_standard, table_cotisation.cs_annee, table_cotisation.cs_detail, table_cotisation.cs_duo, table_cotisation.cs_done, table_cotisation.cs_valid, table_cotisation.cs_report, table_cotisation.cs_nature, ROUND(table_cotisation.cs_montant,2) AS cs_montant, table_cotisation.created_at, table_cotisation.created_by, table_cotisation.updated_at, table_cotisation.updated_by, table_cotisation.lock_version, table_cotisation.id 
     FROM "table_cotisation";

CREATE OR REPLACE VIEW "lignecotisation" AS
   SELECT table_lignecotisation.lc_numero, table_lignecotisation.cs_numero, table_lignecotisation.key, table_lignecotisation.value, table_lignecotisation.created_at, table_lignecotisation.created_by, table_lignecotisation.updated_at, table_lignecotisation.updated_by, table_lignecotisation.lock_version, table_lignecotisation.id 
     FROM "table_lignecotisation";

CREATE OR REPLACE VIEW "droitprofil" AS
   SELECT table_droitprofil.dp_numero, table_droitprofil.dp_libelle, table_droitprofil.dp_notes, table_droitprofil.created_at, table_droitprofil.created_by, table_droitprofil.updated_at, table_droitprofil.updated_by, table_droitprofil.lock_version, table_droitprofil.id 
     FROM "table_droitprofil";

CREATE OR REPLACE VIEW "activite" AS
   SELECT table_activite.za_numero, table_activite.za_heuredebut, table_activite.za_heurefin, table_activite.za_date, table_activite.za_duree, table_activite.em_numero, table_activite.zt_numero, table_activite.zs_numero, table_activite.zl_numero, table_activite.za_pour, table_activite.za_qui, table_activite.za_champ, table_activite.fa_numero, table_activite.de_numero, table_activite.pe_numero, table_activite.zg_numero, table_activite.created_at, table_activite.created_by, table_activite.updated_at, table_activite.updated_by, table_activite.lock_version, table_activite.id 
     FROM "table_activite";

CREATE OR REPLACE VIEW "tache" AS
   SELECT table_tache.zt_numero, table_tache.zt_libelle, table_tache.zt_phrase, table_tache.zt_notes, table_tache.created_at, table_tache.created_by, table_tache.updated_at, table_tache.updated_by, table_tache.lock_version, table_tache.id 
     FROM "table_tache";

CREATE OR REPLACE VIEW "typesujet" AS
   SELECT table_typesujet.zu_numero, table_typesujet.zu_libelle, table_typesujet.zu_notes, table_typesujet.created_at, table_typesujet.created_by, table_typesujet.updated_at, table_typesujet.updated_by, table_typesujet.lock_version, table_typesujet.id 
     FROM "table_typesujet";

CREATE OR REPLACE VIEW "sujet" AS
   SELECT table_sujet.zs_numero, table_sujet.zs_libelle, table_sujet.zu_numero, table_sujet.zs_notes, table_sujet.created_at, table_sujet.created_by, table_sujet.updated_at, table_sujet.updated_by, table_sujet.lock_version, table_sujet.id 
     FROM "table_sujet";

CREATE OR REPLACE VIEW "lieu" AS
   SELECT table_lieu.zl_numero, table_lieu.zl_libelle, table_lieu.zl_notes, table_lieu.created_at, table_lieu.created_by, table_lieu.updated_at, table_lieu.updated_by, table_lieu.lock_version, table_lieu.id 
     FROM "table_lieu";

CREATE OR REPLACE VIEW "groupe" AS
   SELECT table_groupe.zg_numero, table_groupe.zg_libelle, table_groupe.zg_notes, table_groupe.created_at, table_groupe.created_by, table_groupe.updated_at, table_groupe.updated_by, table_groupe.lock_version, table_groupe.id 
     FROM "table_groupe";

CREATE OR REPLACE VIEW "nonadherent" AS
   SELECT table_nonadherent.na_numero, table_nonadherent.pe_numero, table_nonadherent.na_titre, table_nonadherent.na_nom, table_nonadherent.na_prenom, table_nonadherent.na_adresse1, table_nonadherent.na_adresse2, table_nonadherent.na_cp, table_nonadherent.na_ville, table_nonadherent.na_tel, table_nonadherent.na_date, table_nonadherent.na_na, table_nonadherent.ag_numero, table_nonadherent.na_raison, table_nonadherent.created_at, table_nonadherent.created_by, table_nonadherent.updated_at, table_nonadherent.updated_by, table_nonadherent.lock_version, table_nonadherent.id 
     FROM "table_nonadherent";

CREATE OR REPLACE VIEW "sequence" AS
   SELECT table_sequence.sq_numero, table_sequence.sq_nom, table_sequence.sq_last, table_sequence.sq_nombre, table_sequence.sq_used_on, table_sequence.sq_clear_cache, table_sequence.created_at, table_sequence.created_by, table_sequence.updated_at, table_sequence.updated_by, table_sequence.lock_version, table_sequence.id 
     FROM "table_sequence";

CREATE OR REPLACE VIEW "sequencecache" AS
   SELECT table_sequencecache.sc_numero, table_sequencecache.sq_numero, table_sequencecache.sc_valeur, table_sequencecache.sc_locked, table_sequencecache.created_at, table_sequencecache.created_by, table_sequencecache.updated_at, table_sequencecache.updated_by, table_sequencecache.lock_version, table_sequencecache.id 
     FROM "table_sequencecache";

CREATE OR REPLACE VIEW "evoplus" AS
   SELECT table_evoplus.source, table_evoplus.numero, table_evoplus.titre, table_evoplus.nom, table_evoplus.complement, table_evoplus.ad1, table_evoplus.ad2, table_evoplus.ad3, table_evoplus.cp, table_evoplus.ville, table_evoplus.naissance, table_evoplus.telephone, table_evoplus.fax, table_evoplus.portable, table_evoplus.qualification, table_evoplus.base_ht, table_evoplus.productions, table_evoplus.fuel_m3, table_evoplus.eco_fuel, table_evoplus.eco_fuel_tipp, table_evoplus.hectares_nb, table_evoplus.salaries_nb, table_evoplus.sacea_ttc, table_evoplus.h1_ha, table_evoplus.h1_ht, table_evoplus.h2_ha, table_evoplus.h2_ht, table_evoplus.empty_ab, table_evoplus.h3_ha, table_evoplus.h3_ht, table_evoplus.empty_ae, table_evoplus.h4_ha, table_evoplus.h4_ht, table_evoplus.empty_ah, table_evoplus.h5_ha, table_evoplus.h5_ht, table_evoplus.empty_ak, table_evoplus.h6_ha, table_evoplus.h6_ht, table_evoplus.empty_an, table_evoplus.cm_nb, table_evoplus.cm_ht, table_evoplus.cm_noms, table_evoplus.opt1, table_evoplus.opt2, table_evoplus.opt3, table_evoplus.opt4, table_evoplus.opt_num, table_evoplus.opt_ttc, table_evoplus.statut, table_evoplus.remarque, table_evoplus.proposition, table_evoplus.aava, table_evoplus.created_at, table_evoplus.created_by, table_evoplus.filename, table_evoplus.pe_numero, table_evoplus.lot, table_evoplus.id 
     FROM "table_evoplus";

CREATE OR REPLACE RULE rule_acces_insert AS
  ON INSERT TO "acces"
  DO INSTEAD INSERT INTO "table_acces"(ac_numero, ac_libelle, ac_niveau, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ac_numero, new.ac_libelle, new.ac_niveau, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_acces_update AS
  ON UPDATE TO "acces"
  DO INSTEAD UPDATE "table_acces" SET ac_numero=new.ac_numero, ac_libelle=new.ac_libelle, ac_niveau=new.ac_niveau, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AC_Numero=AC_Numero;
CREATE OR REPLACE RULE rule_acces_delete AS
  ON DELETE TO "acces"
  DO INSTEAD DELETE FROM "table_acces" WHERE old.AC_Numero=AC_Numero;

CREATE OR REPLACE RULE rule_activite_insert AS
  ON INSERT TO "activite"
  DO INSTEAD INSERT INTO "table_activite"(za_numero, za_heuredebut, za_heurefin, za_date, za_duree, em_numero, zt_numero, zs_numero, zl_numero, za_pour, za_qui, za_champ, fa_numero, de_numero, pe_numero, zg_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.za_numero,nextval('seq_activite')), new.za_heuredebut, new.za_heurefin, new.za_date, COALESCE(NEW.za_duree,0), COALESCE(NEW.em_numero,current_employe()), new.zt_numero, new.zs_numero, new.zl_numero, new.za_pour, new.za_qui, new.za_champ, new.fa_numero, new.de_numero, new.pe_numero, new.zg_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_activite_update AS
  ON UPDATE TO "activite"
  DO INSTEAD UPDATE "table_activite" SET za_numero=COALESCE(NEW.za_numero,nextval('seq_activite')), za_heuredebut=new.za_heuredebut, za_heurefin=new.za_heurefin, za_date=new.za_date, za_duree=COALESCE(NEW.za_duree,0), em_numero=COALESCE(NEW.em_numero,current_employe()), zt_numero=new.zt_numero, zs_numero=new.zs_numero, zl_numero=new.zl_numero, za_pour=new.za_pour, za_qui=new.za_qui, za_champ=new.za_champ, fa_numero=new.fa_numero, de_numero=new.de_numero, pe_numero=new.pe_numero, zg_numero=new.zg_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.ZA_Numero=ZA_Numero;
CREATE OR REPLACE RULE rule_activite_delete AS
  ON DELETE TO "activite"
  DO INSTEAD DELETE FROM "table_activite" WHERE old.ZA_Numero=ZA_Numero;

CREATE OR REPLACE RULE rule_adherence_insert AS
  ON INSERT TO "adherence"
  DO INSTEAD INSERT INTO "table_adherence"(ah_numero, pd_numero, ah_libelle, ah_reduction, ah_cascade, tl_numero, ah_liendirect, ah_lienindirect, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ah_numero, new.pd_numero, new.ah_libelle, ROUND(COALESCE(NEW.ah_reduction,0),2), COALESCE(NEW.ah_cascade,false), new.tl_numero, COALESCE(NEW.ah_liendirect,false), COALESCE(NEW.ah_lienindirect,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_adherence_update AS
  ON UPDATE TO "adherence"
  DO INSTEAD UPDATE "table_adherence" SET ah_numero=new.ah_numero, pd_numero=new.pd_numero, ah_libelle=new.ah_libelle, ah_reduction=ROUND(COALESCE(NEW.ah_reduction,0),2), ah_cascade=COALESCE(NEW.ah_cascade,false), tl_numero=new.tl_numero, ah_liendirect=COALESCE(NEW.ah_liendirect,false), ah_lienindirect=COALESCE(NEW.ah_lienindirect,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AH_Numero=AH_Numero;
CREATE OR REPLACE RULE rule_adherence_delete AS
  ON DELETE TO "adherence"
  DO INSTEAD DELETE FROM "table_adherence" WHERE old.AH_Numero=AH_Numero;

CREATE OR REPLACE RULE rule_adhesion_insert AS
  ON INSERT TO "adhesion"
  DO INSTEAD INSERT INTO "table_adhesion"(as_numero, as_reductionmax, pe_numero, po_numero, ah_numero, fa_numero, lf_numero, as_origine, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.as_numero,nextval('seq_adhesion')), ROUND(new.as_reductionmax,2), new.pe_numero, new.po_numero, new.ah_numero, new.fa_numero, new.lf_numero, new.as_origine, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_adhesion_update AS
  ON UPDATE TO "adhesion"
  DO INSTEAD UPDATE "table_adhesion" SET as_numero=COALESCE(NEW.as_numero,nextval('seq_adhesion')), as_reductionmax=ROUND(new.as_reductionmax,2), pe_numero=new.pe_numero, po_numero=new.po_numero, ah_numero=new.ah_numero, fa_numero=new.fa_numero, lf_numero=new.lf_numero, as_origine=new.as_origine, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AS_Numero=AS_Numero;
CREATE OR REPLACE RULE rule_adhesion_delete AS
  ON DELETE TO "adhesion"
  DO INSTEAD DELETE FROM "table_adhesion" WHERE old.AS_Numero=AS_Numero;

CREATE OR REPLACE RULE rule_adresse_insert AS
  ON INSERT TO "adresse"
  DO INSTEAD INSERT INTO "table_adresse"(ad_numero, ak_numero, cp_numero, vi_numero, pe_numero, ad_active, ad_ligne2, ad_ligne3, ad_ligne4, ad_ligne5, ad_datestop, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ad_numero, new.ak_numero, new.cp_numero, new.vi_numero, new.pe_numero, COALESCE(NEW.ad_active,true), new.ad_ligne2, new.ad_ligne3, new.ad_ligne4, new.ad_ligne5, new.ad_datestop, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_adresse_update AS
  ON UPDATE TO "adresse"
  DO INSTEAD UPDATE "table_adresse" SET ad_numero=new.ad_numero, ak_numero=new.ak_numero, cp_numero=new.cp_numero, vi_numero=new.vi_numero, pe_numero=new.pe_numero, ad_active=COALESCE(NEW.ad_active,true), ad_ligne2=new.ad_ligne2, ad_ligne3=new.ad_ligne3, ad_ligne4=new.ad_ligne4, ad_ligne5=new.ad_ligne5, ad_datestop=new.ad_datestop, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AD_Numero=AD_Numero;
CREATE OR REPLACE RULE rule_adresse_delete AS
  ON DELETE TO "adresse"
  DO INSTEAD DELETE FROM "table_adresse" WHERE old.AD_Numero=AD_Numero;

CREATE OR REPLACE RULE rule_adresseversion_insert AS
  ON INSERT TO "adresseversion"
  DO INSTEAD INSERT INTO "table_adresseversion"(aw_numero, ad_numero, ak_numero, cp_numero, vi_numero, pe_numero, aw_ligne2, aw_ligne3, aw_ligne4, aw_ligne5, version, operation, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.aw_numero,nextval('seq_adresseversion')), new.ad_numero, new.ak_numero, new.cp_numero, new.vi_numero, new.pe_numero, new.aw_ligne2, new.aw_ligne3, new.aw_ligne4, new.aw_ligne5, new.version, new.operation, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_adresseversion_update AS
  ON UPDATE TO "adresseversion"
  DO INSTEAD UPDATE "table_adresseversion" SET aw_numero=COALESCE(NEW.aw_numero,nextval('seq_adresseversion')), ad_numero=new.ad_numero, ak_numero=new.ak_numero, cp_numero=new.cp_numero, vi_numero=new.vi_numero, pe_numero=new.pe_numero, aw_ligne2=new.aw_ligne2, aw_ligne3=new.aw_ligne3, aw_ligne4=new.aw_ligne4, aw_ligne5=new.aw_ligne5, version=new.version, operation=new.operation, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AW_Numero=AW_Numero;
CREATE OR REPLACE RULE rule_adresseversion_delete AS
  ON DELETE TO "adresseversion"
  DO INSTEAD DELETE FROM "table_adresseversion" WHERE old.AW_Numero=AW_Numero;

CREATE OR REPLACE RULE rule_agent_insert AS
  ON INSERT TO "agent"
  DO INSTEAD INSERT INTO "table_agent"(ag_numero, ag_nom, ag_prenom, ag_initiales, ag_actif, eq_numero, ag_role, ag_telephone, ag_mobile, ag_email, ag_commentaire, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ag_numero, new.ag_nom, new.ag_prenom, new.ag_initiales, COALESCE(NEW.ag_actif,true), new.eq_numero, new.ag_role, new.ag_telephone, new.ag_mobile, new.ag_email, new.ag_commentaire, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_agent_update AS
  ON UPDATE TO "agent"
  DO INSTEAD UPDATE "table_agent" SET ag_numero=new.ag_numero, ag_nom=new.ag_nom, ag_prenom=new.ag_prenom, ag_initiales=new.ag_initiales, ag_actif=COALESCE(NEW.ag_actif,true), eq_numero=new.eq_numero, ag_role=new.ag_role, ag_telephone=new.ag_telephone, ag_mobile=new.ag_mobile, ag_email=new.ag_email, ag_commentaire=new.ag_commentaire, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AG_Numero=AG_Numero;
CREATE OR REPLACE RULE rule_agent_delete AS
  ON DELETE TO "agent"
  DO INSTEAD DELETE FROM "table_agent" WHERE old.AG_Numero=AG_Numero;

CREATE OR REPLACE RULE rule_appartienta_insert AS
  ON INSERT TO "appartienta"
  DO INSTEAD INSERT INTO "table_appartienta"(ct_numero, gc_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ct_numero, new.gc_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_appartienta_update AS
  ON UPDATE TO "appartienta"
  DO INSTEAD UPDATE "table_appartienta" SET ct_numero=new.ct_numero, gc_numero=new.gc_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CT_Numero=CT_Numero AND new.GC_Numero=GC_Numero;
CREATE OR REPLACE RULE rule_appartienta_delete AS
  ON DELETE TO "appartienta"
  DO INSTEAD DELETE FROM "table_appartienta" WHERE old.CT_Numero=CT_Numero AND old.GC_Numero=GC_Numero;

CREATE OR REPLACE RULE rule_appel_insert AS
  ON INSERT TO "appel"
  DO INSTEAD INSERT INTO "table_appel"(ap_numero, ap_libelle, th_numero, ap_date, ap_description, ap_duree, pe_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ap_numero, new.ap_libelle, new.th_numero, COALESCE(NEW.ap_date,CURRENT_DATE), new.ap_description, ROUND(new.ap_duree,2), new.pe_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_appel_update AS
  ON UPDATE TO "appel"
  DO INSTEAD UPDATE "table_appel" SET ap_numero=new.ap_numero, ap_libelle=new.ap_libelle, th_numero=new.th_numero, ap_date=COALESCE(NEW.ap_date,CURRENT_DATE), ap_description=new.ap_description, ap_duree=ROUND(new.ap_duree,2), pe_numero=new.pe_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AP_Numero=AP_Numero;
CREATE OR REPLACE RULE rule_appel_delete AS
  ON DELETE TO "appel"
  DO INSTEAD DELETE FROM "table_appel" WHERE old.AP_Numero=AP_Numero;

CREATE OR REPLACE RULE rule_attribut_insert AS
  ON INSERT TO "attribut"
  DO INSTEAD INSERT INTO "table_attribut"(at_numero, pe_numero, ta_numero, cr_numero, at_valeur, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.at_numero, new.pe_numero, new.ta_numero, new.cr_numero, new.at_valeur, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_attribut_update AS
  ON UPDATE TO "attribut"
  DO INSTEAD UPDATE "table_attribut" SET at_numero=new.at_numero, pe_numero=new.pe_numero, ta_numero=new.ta_numero, cr_numero=new.cr_numero, at_valeur=new.at_valeur, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AT_Numero=AT_Numero;
CREATE OR REPLACE RULE rule_attribut_delete AS
  ON DELETE TO "attribut"
  DO INSTEAD DELETE FROM "table_attribut" WHERE old.AT_Numero=AT_Numero;

CREATE OR REPLACE RULE rule_avoir_insert AS
  ON INSERT TO "avoir"
  DO INSTEAD INSERT INTO "table_avoir"(av_numero, pe_numero, fa_numero, av_numfact, av_date, av_montantht, av_montantttc, av_reduction, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.av_numero, new.pe_numero, new.fa_numero, new.av_numfact, COALESCE(NEW.av_date,CURRENT_DATE), ROUND(new.av_montantht,2), ROUND(new.av_montantttc,2), ROUND(new.av_reduction,2), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_avoir_update AS
  ON UPDATE TO "avoir"
  DO INSTEAD UPDATE "table_avoir" SET av_numero=new.av_numero, pe_numero=new.pe_numero, fa_numero=new.fa_numero, av_numfact=new.av_numfact, av_date=COALESCE(NEW.av_date,CURRENT_DATE), av_montantht=ROUND(new.av_montantht,2), av_montantttc=ROUND(new.av_montantttc,2), av_reduction=ROUND(new.av_reduction,2), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AV_Numero=AV_Numero;
CREATE OR REPLACE RULE rule_avoir_delete AS
  ON DELETE TO "avoir"
  DO INSTEAD DELETE FROM "table_avoir" WHERE old.AV_Numero=AV_Numero;

CREATE OR REPLACE RULE rule_canton_insert AS
  ON INSERT TO "canton"
  DO INSTEAD INSERT INTO "table_canton"(ct_numero, ct_nom, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ct_numero, new.ct_nom, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_canton_update AS
  ON UPDATE TO "canton"
  DO INSTEAD UPDATE "table_canton" SET ct_numero=new.ct_numero, ct_nom=new.ct_nom, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CT_Numero=CT_Numero;
CREATE OR REPLACE RULE rule_canton_delete AS
  ON DELETE TO "canton"
  DO INSTEAD DELETE FROM "table_canton" WHERE old.CT_Numero=CT_Numero;

CREATE OR REPLACE RULE rule_categorie_insert AS
  ON INSERT TO "categorie"
  DO INSTEAD INSERT INTO "table_categorie"(cr_numero, cr_libelle, ta_numero, cr_description, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.cr_numero, new.cr_libelle, new.ta_numero, new.cr_description, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_categorie_update AS
  ON UPDATE TO "categorie"
  DO INSTEAD UPDATE "table_categorie" SET cr_numero=new.cr_numero, cr_libelle=new.cr_libelle, ta_numero=new.ta_numero, cr_description=new.cr_description, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CR_Numero=CR_Numero;
CREATE OR REPLACE RULE rule_categorie_delete AS
  ON DELETE TO "categorie"
  DO INSTEAD DELETE FROM "table_categorie" WHERE old.CR_Numero=CR_Numero;

CREATE OR REPLACE RULE rule_codepostal_insert AS
  ON INSERT TO "codepostal"
  DO INSTEAD INSERT INTO "table_codepostal"(cp_numero, cp_codepostal, cp_bureau, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.cp_numero, new.cp_codepostal, new.cp_bureau, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_codepostal_update AS
  ON UPDATE TO "codepostal"
  DO INSTEAD UPDATE "table_codepostal" SET cp_numero=new.cp_numero, cp_codepostal=new.cp_codepostal, cp_bureau=new.cp_bureau, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CP_Numero=CP_Numero;
CREATE OR REPLACE RULE rule_codepostal_delete AS
  ON DELETE TO "codepostal"
  DO INSTEAD DELETE FROM "table_codepostal" WHERE old.CP_Numero=CP_Numero;

CREATE OR REPLACE RULE rule_compteaux_insert AS
  ON INSERT TO "compteaux"
  DO INSTEAD INSERT INTO "table_compteaux"(ca_numero, cg_numero, ca_numcompte, ca_libelle, ac_numero, ca_debit, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ca_numero, new.cg_numero, new.ca_numcompte, new.ca_libelle, new.ac_numero, new.ca_debit, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_compteaux_update AS
  ON UPDATE TO "compteaux"
  DO INSTEAD UPDATE "table_compteaux" SET ca_numero=new.ca_numero, cg_numero=new.cg_numero, ca_numcompte=new.ca_numcompte, ca_libelle=new.ca_libelle, ac_numero=new.ac_numero, ca_debit=new.ca_debit, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CA_Numero=CA_Numero;
CREATE OR REPLACE RULE rule_compteaux_delete AS
  ON DELETE TO "compteaux"
  DO INSTEAD DELETE FROM "table_compteaux" WHERE old.CA_Numero=CA_Numero;

CREATE OR REPLACE RULE rule_comptegen_insert AS
  ON INSERT TO "comptegen"
  DO INSTEAD INSERT INTO "table_comptegen"(cg_numero, cg_numcompte, cg_libelle, ac_numero, cg_accepteaux, cg_utilisable, cg_lettrable, cg_pointable, so_numero, cg_groupable, cg_debit, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.cg_numero, new.cg_numcompte, new.cg_libelle, new.ac_numero, COALESCE(NEW.cg_accepteaux,true), COALESCE(NEW.cg_utilisable,true), COALESCE(NEW.cg_lettrable,true), COALESCE(NEW.cg_pointable,false), COALESCE(NEW.so_numero,current_societe()), new.cg_groupable, new.cg_debit, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_comptegen_update AS
  ON UPDATE TO "comptegen"
  DO INSTEAD UPDATE "table_comptegen" SET cg_numero=new.cg_numero, cg_numcompte=new.cg_numcompte, cg_libelle=new.cg_libelle, ac_numero=new.ac_numero, cg_accepteaux=COALESCE(NEW.cg_accepteaux,true), cg_utilisable=COALESCE(NEW.cg_utilisable,true), cg_lettrable=COALESCE(NEW.cg_lettrable,true), cg_pointable=COALESCE(NEW.cg_pointable,false), so_numero=COALESCE(NEW.so_numero,current_societe()), cg_groupable=new.cg_groupable, cg_debit=new.cg_debit, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CG_Numero=CG_Numero;
CREATE OR REPLACE RULE rule_comptegen_delete AS
  ON DELETE TO "comptegen"
  DO INSTEAD DELETE FROM "table_comptegen" WHERE old.CG_Numero=CG_Numero;

CREATE OR REPLACE RULE rule_compteproduit_insert AS
  ON INSERT TO "compteproduit"
  DO INSTEAD INSERT INTO "table_compteproduit"(ci_numero, pd_numero, cg_numero, ci_actif, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ci_numero, new.pd_numero, new.cg_numero, COALESCE(NEW.ci_actif,true), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_compteproduit_update AS
  ON UPDATE TO "compteproduit"
  DO INSTEAD UPDATE "table_compteproduit" SET ci_numero=new.ci_numero, pd_numero=new.pd_numero, cg_numero=new.cg_numero, ci_actif=COALESCE(NEW.ci_actif,true), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CI_Numero=CI_Numero;
CREATE OR REPLACE RULE rule_compteproduit_delete AS
  ON DELETE TO "compteproduit"
  DO INSTEAD DELETE FROM "table_compteproduit" WHERE old.CI_Numero=CI_Numero;

CREATE OR REPLACE RULE rule_constante_insert AS
  ON INSERT TO "constante"
  DO INSTEAD INSERT INTO "table_constante"(cs_numero, cs_type, cs_valeur, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.cs_numero,nextval('seq_constante')), new.cs_type, new.cs_valeur, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_constante_update AS
  ON UPDATE TO "constante"
  DO INSTEAD UPDATE "table_constante" SET cs_numero=COALESCE(NEW.cs_numero,nextval('seq_constante')), cs_type=new.cs_type, cs_valeur=new.cs_valeur, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CS_Numero=CS_Numero;
CREATE OR REPLACE RULE rule_constante_delete AS
  ON DELETE TO "constante"
  DO INSTEAD DELETE FROM "table_constante" WHERE old.CS_Numero=CS_Numero;

CREATE OR REPLACE RULE rule_contact_insert AS
  ON INSERT TO "contact"
  DO INSTEAD INSERT INTO "table_contact"(cn_numero, cn_coordonnee, cn_actif, ck_numero, pe_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.cn_numero, new.cn_coordonnee, COALESCE(NEW.cn_actif,true), new.ck_numero, new.pe_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_contact_update AS
  ON UPDATE TO "contact"
  DO INSTEAD UPDATE "table_contact" SET cn_numero=new.cn_numero, cn_coordonnee=new.cn_coordonnee, cn_actif=COALESCE(NEW.cn_actif,true), ck_numero=new.ck_numero, pe_numero=new.pe_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CN_Numero=CN_Numero;
CREATE OR REPLACE RULE rule_contact_delete AS
  ON DELETE TO "contact"
  DO INSTEAD DELETE FROM "table_contact" WHERE old.CN_Numero=CN_Numero;

CREATE OR REPLACE RULE rule_contacttype_insert AS
  ON INSERT TO "contacttype"
  DO INSTEAD INSERT INTO "table_contacttype"(ck_numero, ck_code, ck_nom, ck_number, ck_email, ck_url, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.ck_numero,nextval('seq_contacttype')), new.ck_code, new.ck_nom, COALESCE(NEW.ck_number,false), COALESCE(NEW.ck_email,false), COALESCE(NEW.ck_url,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_contacttype_update AS
  ON UPDATE TO "contacttype"
  DO INSTEAD UPDATE "table_contacttype" SET ck_numero=COALESCE(NEW.ck_numero,nextval('seq_contacttype')), ck_code=new.ck_code, ck_nom=new.ck_nom, ck_number=COALESCE(NEW.ck_number,false), ck_email=COALESCE(NEW.ck_email,false), ck_url=COALESCE(NEW.ck_url,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CK_Numero=CK_Numero;
CREATE OR REPLACE RULE rule_contacttype_delete AS
  ON DELETE TO "contacttype"
  DO INSTEAD DELETE FROM "table_contacttype" WHERE old.CK_Numero=CK_Numero;

CREATE OR REPLACE RULE rule_contactversion_insert AS
  ON INSERT TO "contactversion"
  DO INSTEAD INSERT INTO "table_contactversion"(cw_numero, cw_coordonnee, ck_numero, pe_numero, cn_numero, version, operation, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.cw_numero,nextval('seq_contactversion')), new.cw_coordonnee, new.ck_numero, new.pe_numero, new.cn_numero, new.version, new.operation, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_contactversion_update AS
  ON UPDATE TO "contactversion"
  DO INSTEAD UPDATE "table_contactversion" SET cw_numero=COALESCE(NEW.cw_numero,nextval('seq_contactversion')), cw_coordonnee=new.cw_coordonnee, ck_numero=new.ck_numero, pe_numero=new.pe_numero, cn_numero=new.cn_numero, version=new.version, operation=new.operation, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CW_Numero=CW_Numero;
CREATE OR REPLACE RULE rule_contactversion_delete AS
  ON DELETE TO "contactversion"
  DO INSTEAD DELETE FROM "table_contactversion" WHERE old.CW_Numero=CW_Numero;

CREATE OR REPLACE RULE rule_cotisation_insert AS
  ON INSERT TO "cotisation"
  DO INSTEAD INSERT INTO "table_cotisation"(cs_numero, pe_numero, cs_societe, ig_numero, cs_standard, cs_annee, cs_detail, cs_duo, cs_done, cs_valid, cs_report, cs_nature, cs_montant, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.cs_numero, new.pe_numero, new.cs_societe, new.ig_numero, COALESCE(NEW.cs_standard,false), new.cs_annee, COALESCE(NEW.cs_detail,'{saved:false}'), COALESCE(NEW.cs_duo,false), COALESCE(NEW.cs_done,false), COALESCE(NEW.cs_valid,false), new.cs_report, new.cs_nature, ROUND(COALESCE(NEW.cs_montant,0),2), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_cotisation_update AS
  ON UPDATE TO "cotisation"
  DO INSTEAD UPDATE "table_cotisation" SET cs_numero=new.cs_numero, pe_numero=new.pe_numero, cs_societe=new.cs_societe, ig_numero=new.ig_numero, cs_standard=COALESCE(NEW.cs_standard,false), cs_annee=new.cs_annee, cs_detail=COALESCE(NEW.cs_detail,'{saved:false}'), cs_duo=COALESCE(NEW.cs_duo,false), cs_done=COALESCE(NEW.cs_done,false), cs_valid=COALESCE(NEW.cs_valid,false), cs_report=new.cs_report, cs_nature=new.cs_nature, cs_montant=ROUND(COALESCE(NEW.cs_montant,0),2), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.CS_Numero=CS_Numero;
CREATE OR REPLACE RULE rule_cotisation_delete AS
  ON DELETE TO "cotisation"
  DO INSTEAD DELETE FROM "table_cotisation" WHERE old.CS_Numero=CS_Numero;

CREATE OR REPLACE RULE rule_devis_insert AS
  ON INSERT TO "devis"
  DO INSTEAD INSERT INTO "table_devis"(de_numero, pe_numero, so_numero, de_date, de_libelle, de_reduction, de_montantht, de_montantttc, em_numero, de_locked, de_acompte, de_lettre, de_civilites, de_introduction, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.de_numero, new.pe_numero, new.so_numero, COALESCE(NEW.de_date,CURRENT_DATE), new.de_libelle, ROUND(new.de_reduction,2), ROUND(new.de_montantht,2), ROUND(new.de_montantttc,2), new.em_numero, COALESCE(NEW.de_locked,false), COALESCE(NEW.de_acompte,false), COALESCE(NEW.de_lettre,false), new.de_civilites, new.de_introduction, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_devis_update AS
  ON UPDATE TO "devis"
  DO INSTEAD UPDATE "table_devis" SET de_numero=new.de_numero, pe_numero=new.pe_numero, so_numero=new.so_numero, de_date=COALESCE(NEW.de_date,CURRENT_DATE), de_libelle=new.de_libelle, de_reduction=ROUND(new.de_reduction,2), de_montantht=ROUND(new.de_montantht,2), de_montantttc=ROUND(new.de_montantttc,2), em_numero=new.em_numero, de_locked=COALESCE(NEW.de_locked,false), de_acompte=COALESCE(NEW.de_acompte,false), de_lettre=COALESCE(NEW.de_lettre,false), de_civilites=new.de_civilites, de_introduction=new.de_introduction, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.DE_Numero=DE_Numero;
CREATE OR REPLACE RULE rule_devis_delete AS
  ON DELETE TO "devis"
  DO INSTEAD DELETE FROM "table_devis" WHERE old.DE_Numero=DE_Numero;

CREATE OR REPLACE RULE rule_droit_insert AS
  ON INSERT TO "droit"
  DO INSTEAD INSERT INTO "table_droit"(dr_numero, dp_numero, gt_numero, dr_select, dr_insert, dr_update, dr_delete, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.dr_numero, new.dp_numero, new.gt_numero, COALESCE(NEW.dr_select,false), COALESCE(NEW.dr_insert,false), COALESCE(NEW.dr_update,false), COALESCE(NEW.dr_delete,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_droit_update AS
  ON UPDATE TO "droit"
  DO INSTEAD UPDATE "table_droit" SET dr_numero=new.dr_numero, dp_numero=new.dp_numero, gt_numero=new.gt_numero, dr_select=COALESCE(NEW.dr_select,false), dr_insert=COALESCE(NEW.dr_insert,false), dr_update=COALESCE(NEW.dr_update,false), dr_delete=COALESCE(NEW.dr_delete,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.DR_Numero=DR_Numero;
CREATE OR REPLACE RULE rule_droit_delete AS
  ON DELETE TO "droit"
  DO INSTEAD DELETE FROM "table_droit" WHERE old.DR_Numero=DR_Numero;

CREATE OR REPLACE RULE rule_droitprofil_insert AS
  ON INSERT TO "droitprofil"
  DO INSTEAD INSERT INTO "table_droitprofil"(dp_numero, dp_libelle, dp_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.dp_numero,nextval('seq_droitprofil')), new.dp_libelle, new.dp_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_droitprofil_update AS
  ON UPDATE TO "droitprofil"
  DO INSTEAD UPDATE "table_droitprofil" SET dp_numero=COALESCE(NEW.dp_numero,nextval('seq_droitprofil')), dp_libelle=new.dp_libelle, dp_notes=new.dp_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.DP_Numero=DP_Numero;
CREATE OR REPLACE RULE rule_droitprofil_delete AS
  ON DELETE TO "droitprofil"
  DO INSTEAD DELETE FROM "table_droitprofil" WHERE old.DP_Numero=DP_Numero;

CREATE OR REPLACE RULE rule_ecriture_insert AS
  ON INSERT TO "ecriture"
  DO INSTEAD INSERT INTO "table_ecriture"(ec_numero, ec_numecriture, pi_numero, ex_numero, cg_numero, ca_numero, ec_aux, pf_numero, ec_compte, ec_libelle, ec_debit, ec_credit, pt_numero, av_numero, lt_numero, db_numero, rg_numero, fa_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ec_numero, new.ec_numecriture, new.pi_numero, new.ex_numero, new.cg_numero, new.ca_numero, new.ec_aux, new.pf_numero, new.ec_compte, new.ec_libelle, ROUND(COALESCE(NEW.ec_debit,0),2), ROUND(COALESCE(NEW.ec_credit,0),2), new.pt_numero, new.av_numero, new.lt_numero, new.db_numero, new.rg_numero, new.fa_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_ecriture_update AS
  ON UPDATE TO "ecriture"
  DO INSTEAD UPDATE "table_ecriture" SET ec_numero=new.ec_numero, ec_numecriture=new.ec_numecriture, pi_numero=new.pi_numero, ex_numero=new.ex_numero, cg_numero=new.cg_numero, ca_numero=new.ca_numero, ec_aux=new.ec_aux, pf_numero=new.pf_numero, ec_compte=new.ec_compte, ec_libelle=new.ec_libelle, ec_debit=ROUND(COALESCE(NEW.ec_debit,0),2), ec_credit=ROUND(COALESCE(NEW.ec_credit,0),2), pt_numero=new.pt_numero, av_numero=new.av_numero, lt_numero=new.lt_numero, db_numero=new.db_numero, rg_numero=new.rg_numero, fa_numero=new.fa_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.EC_Numero=EC_Numero;
CREATE OR REPLACE RULE rule_ecriture_delete AS
  ON DELETE TO "ecriture"
  DO INSTEAD DELETE FROM "table_ecriture" WHERE old.EC_Numero=EC_Numero;

CREATE OR REPLACE RULE rule_employe_insert AS
  ON INSERT TO "employe"
  DO INSTEAD INSERT INTO "table_employe"(em_numero, dp_numero, em_emploi, em_service, em_agent, em_login, em_reglement, em_self_invoicing, em_service_invoicing, em_societe_invoicing, em_personne_editing, em_acces, em_password, em_super, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.em_numero, new.dp_numero, new.em_emploi, new.em_service, new.em_agent, new.em_login, COALESCE(NEW.em_reglement,false), COALESCE(NEW.em_self_invoicing,true), COALESCE(NEW.em_service_invoicing,false), COALESCE(NEW.em_societe_invoicing,false), COALESCE(NEW.em_personne_editing,false), new.em_acces, new.em_password, COALESCE(NEW.em_super,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_employe_update AS
  ON UPDATE TO "employe"
  DO INSTEAD UPDATE "table_employe" SET em_numero=new.em_numero, dp_numero=new.dp_numero, em_emploi=new.em_emploi, em_service=new.em_service, em_agent=new.em_agent, em_login=new.em_login, em_reglement=COALESCE(NEW.em_reglement,false), em_self_invoicing=COALESCE(NEW.em_self_invoicing,true), em_service_invoicing=COALESCE(NEW.em_service_invoicing,false), em_societe_invoicing=COALESCE(NEW.em_societe_invoicing,false), em_personne_editing=COALESCE(NEW.em_personne_editing,false), em_acces=new.em_acces, em_password=new.em_password, em_super=COALESCE(NEW.em_super,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.EM_Numero=EM_Numero;
CREATE OR REPLACE RULE rule_employe_delete AS
  ON DELETE TO "employe"
  DO INSTEAD DELETE FROM "table_employe" WHERE old.EM_Numero=EM_Numero;

CREATE OR REPLACE RULE rule_equipe_insert AS
  ON INSERT TO "equipe"
  DO INSTEAD INSERT INTO "table_equipe"(eq_numero, eq_nom, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.eq_numero, new.eq_nom, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_equipe_update AS
  ON UPDATE TO "equipe"
  DO INSTEAD UPDATE "table_equipe" SET eq_numero=new.eq_numero, eq_nom=new.eq_nom, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.EQ_Numero=EQ_Numero;
CREATE OR REPLACE RULE rule_equipe_delete AS
  ON DELETE TO "equipe"
  DO INSTEAD DELETE FROM "table_equipe" WHERE old.EQ_Numero=EQ_Numero;

CREATE OR REPLACE RULE rule_estlie_insert AS
  ON INSERT TO "estlie"
  DO INSTEAD INSERT INTO "table_estlie"(el_numero, el_personne1, el_personne2, el_actif, tl_numero, tl_code, el_debut, el_fin, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.el_numero,nextval('seq_estlie')), new.el_personne1, new.el_personne2, COALESCE(NEW.el_actif,true), new.tl_numero, new.tl_code, COALESCE(NEW.el_debut,CURRENT_TIMESTAMP), new.el_fin, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_estlie_update AS
  ON UPDATE TO "estlie"
  DO INSTEAD UPDATE "table_estlie" SET el_numero=COALESCE(NEW.el_numero,nextval('seq_estlie')), el_personne1=new.el_personne1, el_personne2=new.el_personne2, el_actif=COALESCE(NEW.el_actif,true), tl_numero=new.tl_numero, tl_code=new.tl_code, el_debut=COALESCE(NEW.el_debut,CURRENT_TIMESTAMP), el_fin=new.el_fin, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.EL_Numero=EL_Numero;
CREATE OR REPLACE RULE rule_estlie_delete AS
  ON DELETE TO "estlie"
  DO INSTEAD DELETE FROM "table_estlie" WHERE old.EL_Numero=EL_Numero;

CREATE OR REPLACE RULE rule_estresponsable_insert AS
  ON INSERT TO "estresponsable"
  DO INSTEAD INSERT INTO "table_estresponsable"(peac_numero, pe_numero, re_numero, peac_periodedebut, peac_periodefin, peac_titre, peac_fini, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.peac_numero, new.pe_numero, new.re_numero, new.peac_periodedebut, new.peac_periodefin, new.peac_titre, COALESCE(NEW.peac_fini,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_estresponsable_update AS
  ON UPDATE TO "estresponsable"
  DO INSTEAD UPDATE "table_estresponsable" SET peac_numero=new.peac_numero, pe_numero=new.pe_numero, re_numero=new.re_numero, peac_periodedebut=new.peac_periodedebut, peac_periodefin=new.peac_periodefin, peac_titre=new.peac_titre, peac_fini=COALESCE(NEW.peac_fini,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PEAC_Numero=PEAC_Numero;
CREATE OR REPLACE RULE rule_estresponsable_delete AS
  ON DELETE TO "estresponsable"
  DO INSTEAD DELETE FROM "table_estresponsable" WHERE old.PEAC_Numero=PEAC_Numero;

CREATE OR REPLACE RULE rule_evoplus_insert AS
  ON INSERT TO "evoplus"
  DO INSTEAD INSERT INTO "table_evoplus"(source, numero, titre, nom, complement, ad1, ad2, ad3, cp, ville, naissance, telephone, fax, portable, qualification, base_ht, productions, fuel_m3, eco_fuel, eco_fuel_tipp, hectares_nb, salaries_nb, sacea_ttc, h1_ha, h1_ht, h2_ha, h2_ht, empty_ab, h3_ha, h3_ht, empty_ae, h4_ha, h4_ht, empty_ah, h5_ha, h5_ht, empty_ak, h6_ha, h6_ht, empty_an, cm_nb, cm_ht, cm_noms, opt1, opt2, opt3, opt4, opt_num, opt_ttc, statut, remarque, proposition, aava, created_at, created_by, filename, pe_numero, lot, id) VALUES (new.source, new.numero, new.titre, new.nom, new.complement, new.ad1, new.ad2, new.ad3, new.cp, new.ville, new.naissance, new.telephone, new.fax, new.portable, new.qualification, new.base_ht, new.productions, new.fuel_m3, new.eco_fuel, new.eco_fuel_tipp, new.hectares_nb, new.salaries_nb, new.sacea_ttc, new.h1_ha, new.h1_ht, new.h2_ha, new.h2_ht, new.empty_ab, new.h3_ha, new.h3_ht, new.empty_ae, new.h4_ha, new.h4_ht, new.empty_ah, new.h5_ha, new.h5_ht, new.empty_ak, new.h6_ha, new.h6_ht, new.empty_an, new.cm_nb, new.cm_ht, new.cm_noms, new.opt1, new.opt2, new.opt3, new.opt4, new.opt_num, new.opt_ttc, new.statut, new.remarque, COALESCE(NEW.proposition,false), COALESCE(NEW.aava,false), CURRENT_TIMESTAMP, CURRENT_USER, new.filename, new.pe_numero, new.lot, DEFAULT);
CREATE OR REPLACE RULE rule_evoplus_update AS
  ON UPDATE TO "evoplus"
  DO INSTEAD UPDATE "table_evoplus" SET source=new.source, numero=new.numero, titre=new.titre, nom=new.nom, complement=new.complement, ad1=new.ad1, ad2=new.ad2, ad3=new.ad3, cp=new.cp, ville=new.ville, naissance=new.naissance, telephone=new.telephone, fax=new.fax, portable=new.portable, qualification=new.qualification, base_ht=new.base_ht, productions=new.productions, fuel_m3=new.fuel_m3, eco_fuel=new.eco_fuel, eco_fuel_tipp=new.eco_fuel_tipp, hectares_nb=new.hectares_nb, salaries_nb=new.salaries_nb, sacea_ttc=new.sacea_ttc, h1_ha=new.h1_ha, h1_ht=new.h1_ht, h2_ha=new.h2_ha, h2_ht=new.h2_ht, empty_ab=new.empty_ab, h3_ha=new.h3_ha, h3_ht=new.h3_ht, empty_ae=new.empty_ae, h4_ha=new.h4_ha, h4_ht=new.h4_ht, empty_ah=new.empty_ah, h5_ha=new.h5_ha, h5_ht=new.h5_ht, empty_ak=new.empty_ak, h6_ha=new.h6_ha, h6_ht=new.h6_ht, empty_an=new.empty_an, cm_nb=new.cm_nb, cm_ht=new.cm_ht, cm_noms=new.cm_noms, opt1=new.opt1, opt2=new.opt2, opt3=new.opt3, opt4=new.opt4, opt_num=new.opt_num, opt_ttc=new.opt_ttc, statut=new.statut, remarque=new.remarque, proposition=COALESCE(NEW.proposition,false), aava=COALESCE(NEW.aava,false), created_at=OLD.created_at, created_by=OLD.created_by, filename=new.filename, pe_numero=new.pe_numero, lot=new.lot, id=OLD.id WHERE new.id=id;
CREATE OR REPLACE RULE rule_evoplus_delete AS
  ON DELETE TO "evoplus"
  DO INSTEAD DELETE FROM "table_evoplus" WHERE old.id=id;

CREATE OR REPLACE RULE rule_exercice_insert AS
  ON INSERT TO "exercice"
  DO INSTEAD INSERT INTO "table_exercice"(ex_numero, so_numero, ex_datedebut, ex_datefin, ex_cloture, ex_password, ex_compteattente, ex_actif, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ex_numero, COALESCE(NEW.so_numero,current_societe()), new.ex_datedebut, new.ex_datefin, COALESCE(NEW.ex_cloture,false), COALESCE(NEW.ex_password,md5('root')), new.ex_compteattente, new.ex_actif, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_exercice_update AS
  ON UPDATE TO "exercice"
  DO INSTEAD UPDATE "table_exercice" SET ex_numero=new.ex_numero, so_numero=COALESCE(NEW.so_numero,current_societe()), ex_datedebut=new.ex_datedebut, ex_datefin=new.ex_datefin, ex_cloture=COALESCE(NEW.ex_cloture,false), ex_password=COALESCE(NEW.ex_password,md5('root')), ex_compteattente=new.ex_compteattente, ex_actif=new.ex_actif, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.EX_Numero=EX_Numero;
CREATE OR REPLACE RULE rule_exercice_delete AS
  ON DELETE TO "exercice"
  DO INSTEAD DELETE FROM "table_exercice" WHERE old.EX_Numero=EX_Numero;

CREATE OR REPLACE RULE rule_facture_insert AS
  ON INSERT TO "facture"
  DO INSTEAD INSERT INTO "table_facture"(fa_numero, de_numero, pe_numero, ag_numero, fa_numfact, fa_date, fa_perte, fa_reduction, fa_montantht, fa_montantttc, fa_accompte, fa_annotation, fa_libelle, so_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.fa_numero, new.de_numero, new.pe_numero, new.ag_numero, new.fa_numfact, COALESCE(NEW.fa_date,CURRENT_DATE), COALESCE(NEW.fa_perte,false), ROUND(COALESCE(NEW.fa_reduction,0),2), ROUND(COALESCE(NEW.fa_montantht,0),2), ROUND(COALESCE(NEW.fa_montantttc,0),2), ROUND(new.fa_accompte,2), new.fa_annotation, new.fa_libelle, COALESCE(NEW.so_numero,current_societe()), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_facture_update AS
  ON UPDATE TO "facture"
  DO INSTEAD UPDATE "table_facture" SET fa_numero=new.fa_numero, de_numero=new.de_numero, pe_numero=new.pe_numero, ag_numero=new.ag_numero, fa_numfact=new.fa_numfact, fa_date=COALESCE(NEW.fa_date,CURRENT_DATE), fa_perte=COALESCE(NEW.fa_perte,false), fa_reduction=ROUND(COALESCE(NEW.fa_reduction,0),2), fa_montantht=ROUND(COALESCE(NEW.fa_montantht,0),2), fa_montantttc=ROUND(COALESCE(NEW.fa_montantttc,0),2), fa_accompte=ROUND(new.fa_accompte,2), fa_annotation=new.fa_annotation, fa_libelle=new.fa_libelle, so_numero=COALESCE(NEW.so_numero,current_societe()), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.FA_Numero=FA_Numero;
CREATE OR REPLACE RULE rule_facture_delete AS
  ON DELETE TO "facture"
  DO INSTEAD DELETE FROM "table_facture" WHERE old.FA_Numero=FA_Numero;

CREATE OR REPLACE RULE rule_facturereglement_insert AS
  ON INSERT TO "facturereglement"
  DO INSTEAD INSERT INTO "table_facturereglement"(fr_numero, rg_numero, fa_numero, fr_acompte, fr_partiel, fr_montant, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.fr_numero,nextval('seq_facturereglement')), new.rg_numero, new.fa_numero, COALESCE(NEW.fr_acompte,false), COALESCE(NEW.fr_partiel,false), ROUND(new.fr_montant,2), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_facturereglement_update AS
  ON UPDATE TO "facturereglement"
  DO INSTEAD UPDATE "table_facturereglement" SET fr_numero=COALESCE(NEW.fr_numero,nextval('seq_facturereglement')), rg_numero=new.rg_numero, fa_numero=new.fa_numero, fr_acompte=COALESCE(NEW.fr_acompte,false), fr_partiel=COALESCE(NEW.fr_partiel,false), fr_montant=ROUND(new.fr_montant,2), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.FR_Numero=FR_Numero;
CREATE OR REPLACE RULE rule_facturereglement_delete AS
  ON DELETE TO "facturereglement"
  DO INSTEAD DELETE FROM "table_facturereglement" WHERE old.FR_Numero=FR_Numero;

CREATE OR REPLACE RULE rule_groupe_insert AS
  ON INSERT TO "groupe"
  DO INSTEAD INSERT INTO "table_groupe"(zg_numero, zg_libelle, zg_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.zg_numero,nextval('seq_groupe')), new.zg_libelle, new.zg_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_groupe_update AS
  ON UPDATE TO "groupe"
  DO INSTEAD UPDATE "table_groupe" SET zg_numero=COALESCE(NEW.zg_numero,nextval('seq_groupe')), zg_libelle=new.zg_libelle, zg_notes=new.zg_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.ZG_Numero=ZG_Numero;
CREATE OR REPLACE RULE rule_groupe_delete AS
  ON DELETE TO "groupe"
  DO INSTEAD DELETE FROM "table_groupe" WHERE old.ZG_Numero=ZG_Numero;

CREATE OR REPLACE RULE rule_groupecanton_insert AS
  ON INSERT TO "groupecanton"
  DO INSTEAD INSERT INTO "table_groupecanton"(gc_numero, gc_nom, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.gc_numero, new.gc_nom, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_groupecanton_update AS
  ON UPDATE TO "groupecanton"
  DO INSTEAD UPDATE "table_groupecanton" SET gc_numero=new.gc_numero, gc_nom=new.gc_nom, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.GC_Numero=GC_Numero;
CREATE OR REPLACE RULE rule_groupecanton_delete AS
  ON DELETE TO "groupecanton"
  DO INSTEAD DELETE FROM "table_groupecanton" WHERE old.GC_Numero=GC_Numero;

CREATE OR REPLACE RULE rule_groupetable_insert AS
  ON INSERT TO "groupetable"
  DO INSTEAD INSERT INTO "table_groupetable"(gt_numero, gt_libelle, gt_tables, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.gt_numero, new.gt_libelle, new.gt_tables, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_groupetable_update AS
  ON UPDATE TO "groupetable"
  DO INSTEAD UPDATE "table_groupetable" SET gt_numero=new.gt_numero, gt_libelle=new.gt_libelle, gt_tables=new.gt_tables, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.GT_Numero=GT_Numero;
CREATE OR REPLACE RULE rule_groupetable_delete AS
  ON DELETE TO "groupetable"
  DO INSTEAD DELETE FROM "table_groupetable" WHERE old.GT_Numero=GT_Numero;

CREATE OR REPLACE RULE rule_impression_insert AS
  ON INSERT TO "impression"
  DO INSTEAD INSERT INTO "table_impression"(im_numero, im_libelle, im_nom, im_societe, im_modele, im_defaut, im_keytable, im_keycle, im_keydate, im_fonction, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.im_numero, new.im_libelle, new.im_nom, COALESCE(NEW.im_societe,current_societe()), new.im_modele, new.im_defaut, new.im_keytable, new.im_keycle, new.im_keydate, COALESCE(NEW.im_fonction,'no_name'), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_impression_update AS
  ON UPDATE TO "impression"
  DO INSTEAD UPDATE "table_impression" SET im_numero=new.im_numero, im_libelle=new.im_libelle, im_nom=new.im_nom, im_societe=COALESCE(NEW.im_societe,current_societe()), im_modele=new.im_modele, im_defaut=new.im_defaut, im_keytable=new.im_keytable, im_keycle=new.im_keycle, im_keydate=new.im_keydate, im_fonction=COALESCE(NEW.im_fonction,'no_name'), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.IM_Numero=IM_Numero;
CREATE OR REPLACE RULE rule_impression_delete AS
  ON DELETE TO "impression"
  DO INSTEAD DELETE FROM "table_impression" WHERE old.IM_Numero=IM_Numero;

CREATE OR REPLACE RULE rule_impressiondocument_insert AS
  ON INSERT TO "impressiondocument"
  DO INSTEAD INSERT INTO "table_impressiondocument"(id_numero, ig_numero, id_cle, id_modele, id_filename, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.id_numero, new.ig_numero, new.id_cle, new.id_modele, new.id_filename, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_impressiondocument_update AS
  ON UPDATE TO "impressiondocument"
  DO INSTEAD UPDATE "table_impressiondocument" SET id_numero=new.id_numero, ig_numero=new.ig_numero, id_cle=new.id_cle, id_modele=new.id_modele, id_filename=new.id_filename, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.ID_Numero=ID_Numero;
CREATE OR REPLACE RULE rule_impressiondocument_delete AS
  ON DELETE TO "impressiondocument"
  DO INSTEAD DELETE FROM "table_impressiondocument" WHERE old.ID_Numero=ID_Numero;

CREATE OR REPLACE RULE rule_impressiongroupe_insert AS
  ON INSERT TO "impressiongroupe"
  DO INSTEAD INSERT INTO "table_impressiongroupe"(ig_numero, il_numero, ig_date, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ig_numero, new.il_numero, new.ig_date, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_impressiongroupe_update AS
  ON UPDATE TO "impressiongroupe"
  DO INSTEAD UPDATE "table_impressiongroupe" SET ig_numero=new.ig_numero, il_numero=new.il_numero, ig_date=new.ig_date, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.IG_Numero=IG_Numero;
CREATE OR REPLACE RULE rule_impressiongroupe_delete AS
  ON DELETE TO "impressiongroupe"
  DO INSTEAD DELETE FROM "table_impressiongroupe" WHERE old.IG_Numero=IG_Numero;

CREATE OR REPLACE RULE rule_impressionlot_insert AS
  ON INSERT TO "impressionlot"
  DO INSTEAD INSERT INTO "table_impressionlot"(il_numero, il_nom, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.il_numero, new.il_nom, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_impressionlot_update AS
  ON UPDATE TO "impressionlot"
  DO INSTEAD UPDATE "table_impressionlot" SET il_numero=new.il_numero, il_nom=new.il_nom, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.IL_Numero=IL_Numero;
CREATE OR REPLACE RULE rule_impressionlot_delete AS
  ON DELETE TO "impressionlot"
  DO INSTEAD DELETE FROM "table_impressionlot" WHERE old.IL_Numero=IL_Numero;

CREATE OR REPLACE RULE rule_journal_insert AS
  ON INSERT TO "journal"
  DO INSTEAD INSERT INTO "table_journal"(jo_numero, jo_abbrev, jo_libelle, jo_debit, jo_credit, so_numero, tj_numero, cg_numero, jo_mois, jo_annee, jo_contrepartie, jo_provisoire, jo_visible, jo_sequence, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.jo_numero, new.jo_abbrev, new.jo_libelle, ROUND(COALESCE(NEW.jo_debit,0),2), ROUND(COALESCE(NEW.jo_credit,0),2), COALESCE(NEW.so_numero,current_societe()), new.tj_numero, new.cg_numero, COALESCE(NEW.jo_mois,1), COALESCE(NEW.jo_annee,1900), COALESCE(NEW.jo_contrepartie,false), COALESCE(NEW.jo_provisoire,false), COALESCE(NEW.jo_visible,true), new.jo_sequence, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_journal_update AS
  ON UPDATE TO "journal"
  DO INSTEAD UPDATE "table_journal" SET jo_numero=new.jo_numero, jo_abbrev=new.jo_abbrev, jo_libelle=new.jo_libelle, jo_debit=ROUND(COALESCE(NEW.jo_debit,0),2), jo_credit=ROUND(COALESCE(NEW.jo_credit,0),2), so_numero=COALESCE(NEW.so_numero,current_societe()), tj_numero=new.tj_numero, cg_numero=new.cg_numero, jo_mois=COALESCE(NEW.jo_mois,1), jo_annee=COALESCE(NEW.jo_annee,1900), jo_contrepartie=COALESCE(NEW.jo_contrepartie,false), jo_provisoire=COALESCE(NEW.jo_provisoire,false), jo_visible=COALESCE(NEW.jo_visible,true), jo_sequence=new.jo_sequence, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.JO_Numero=JO_Numero;
CREATE OR REPLACE RULE rule_journal_delete AS
  ON DELETE TO "journal"
  DO INSTEAD DELETE FROM "table_journal" WHERE old.JO_Numero=JO_Numero;

CREATE OR REPLACE RULE rule_lettrage_insert AS
  ON INSERT TO "lettrage"
  DO INSTEAD INSERT INTO "table_lettrage"(lt_numero, lt_lettre, so_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.lt_numero, new.lt_lettre, COALESCE(NEW.so_numero,current_societe()), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_lettrage_update AS
  ON UPDATE TO "lettrage"
  DO INSTEAD UPDATE "table_lettrage" SET lt_numero=new.lt_numero, lt_lettre=new.lt_lettre, so_numero=COALESCE(NEW.so_numero,current_societe()), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.LT_Numero=LT_Numero;
CREATE OR REPLACE RULE rule_lettrage_delete AS
  ON DELETE TO "lettrage"
  DO INSTEAD DELETE FROM "table_lettrage" WHERE old.LT_Numero=LT_Numero;

CREATE OR REPLACE RULE rule_lieu_insert AS
  ON INSERT TO "lieu"
  DO INSTEAD INSERT INTO "table_lieu"(zl_numero, zl_libelle, zl_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.zl_numero,nextval('seq_lieu')), new.zl_libelle, new.zl_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_lieu_update AS
  ON UPDATE TO "lieu"
  DO INSTEAD UPDATE "table_lieu" SET zl_numero=COALESCE(NEW.zl_numero,nextval('seq_lieu')), zl_libelle=new.zl_libelle, zl_notes=new.zl_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.ZL_Numero=ZL_Numero;
CREATE OR REPLACE RULE rule_lieu_delete AS
  ON DELETE TO "lieu"
  DO INSTEAD DELETE FROM "table_lieu" WHERE old.ZL_Numero=ZL_Numero;

CREATE OR REPLACE RULE rule_ligne_insert AS
  ON INSERT TO "ligne"
  DO INSTEAD INSERT INTO "table_ligne"(l_numero, pd_numero, de_numero, l_quantite, l_montantht, l_montantttc, px_numero, l_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.l_numero,nextval('seq_ligne')), new.pd_numero, new.de_numero, ROUND(COALESCE(NEW.l_quantite,1),4), ROUND(new.l_montantht,2), ROUND(new.l_montantttc,2), new.px_numero, new.l_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_ligne_update AS
  ON UPDATE TO "ligne"
  DO INSTEAD UPDATE "table_ligne" SET l_numero=COALESCE(NEW.l_numero,nextval('seq_ligne')), pd_numero=new.pd_numero, de_numero=new.de_numero, l_quantite=ROUND(COALESCE(NEW.l_quantite,1),4), l_montantht=ROUND(new.l_montantht,2), l_montantttc=ROUND(new.l_montantttc,2), px_numero=new.px_numero, l_notes=new.l_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.L_Numero=L_Numero;
CREATE OR REPLACE RULE rule_ligne_delete AS
  ON DELETE TO "ligne"
  DO INSTEAD DELETE FROM "table_ligne" WHERE old.L_Numero=L_Numero;

CREATE OR REPLACE RULE rule_ligneavoir_insert AS
  ON INSERT TO "ligneavoir"
  DO INSTEAD INSERT INTO "table_ligneavoir"(la_numero, pd_numero, av_numero, px_numero, la_quantite, la_montantht, la_montantttc, la_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.la_numero, new.pd_numero, new.av_numero, new.px_numero, ROUND(COALESCE(NEW.la_quantite,0),2), ROUND(new.la_montantht,2), ROUND(new.la_montantttc,2), new.la_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_ligneavoir_update AS
  ON UPDATE TO "ligneavoir"
  DO INSTEAD UPDATE "table_ligneavoir" SET la_numero=new.la_numero, pd_numero=new.pd_numero, av_numero=new.av_numero, px_numero=new.px_numero, la_quantite=ROUND(COALESCE(NEW.la_quantite,0),2), la_montantht=ROUND(new.la_montantht,2), la_montantttc=ROUND(new.la_montantttc,2), la_notes=new.la_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.LA_Numero=LA_Numero;
CREATE OR REPLACE RULE rule_ligneavoir_delete AS
  ON DELETE TO "ligneavoir"
  DO INSTEAD DELETE FROM "table_ligneavoir" WHERE old.LA_Numero=LA_Numero;

CREATE OR REPLACE RULE rule_lignecotisation_insert AS
  ON INSERT TO "lignecotisation"
  DO INSTEAD INSERT INTO "table_lignecotisation"(lc_numero, cs_numero, key, value, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.lc_numero, new.cs_numero, new.key, new.value, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_lignecotisation_update AS
  ON UPDATE TO "lignecotisation"
  DO INSTEAD UPDATE "table_lignecotisation" SET lc_numero=new.lc_numero, cs_numero=new.cs_numero, key=new.key, value=new.value, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.LC_Numero=LC_Numero;
CREATE OR REPLACE RULE rule_lignecotisation_delete AS
  ON DELETE TO "lignecotisation"
  DO INSTEAD DELETE FROM "table_lignecotisation" WHERE old.LC_Numero=LC_Numero;

CREATE OR REPLACE RULE rule_lignefacture_insert AS
  ON INSERT TO "lignefacture"
  DO INSTEAD INSERT INTO "table_lignefacture"(lf_numero, fa_numero, px_numero, pd_numero, lf_quantite, lf_montantht, lf_montantttc, lf_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.lf_numero,nextval('seq_lignefacture')), new.fa_numero, new.px_numero, new.pd_numero, ROUND(COALESCE(NEW.lf_quantite,0),2), ROUND(new.lf_montantht,2), ROUND(new.lf_montantttc,2), new.lf_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_lignefacture_update AS
  ON UPDATE TO "lignefacture"
  DO INSTEAD UPDATE "table_lignefacture" SET lf_numero=COALESCE(NEW.lf_numero,nextval('seq_lignefacture')), fa_numero=new.fa_numero, px_numero=new.px_numero, pd_numero=new.pd_numero, lf_quantite=ROUND(COALESCE(NEW.lf_quantite,0),2), lf_montantht=ROUND(new.lf_montantht,2), lf_montantttc=ROUND(new.lf_montantttc,2), lf_notes=new.lf_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.LF_Numero=LF_Numero;
CREATE OR REPLACE RULE rule_lignefacture_delete AS
  ON DELETE TO "lignefacture"
  DO INSTEAD DELETE FROM "table_lignefacture" WHERE old.LF_Numero=LF_Numero;

CREATE OR REPLACE RULE rule_lignemodele_insert AS
  ON INSERT TO "lignemodele"
  DO INSTEAD INSERT INTO "table_lignemodele"(lm_numero, pd_numero, mo_numero, lm_quantite, lm_montantht, lm_montantttc, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.lm_numero, new.pd_numero, new.mo_numero, ROUND(COALESCE(NEW.lm_quantite,1),2), ROUND(new.lm_montantht,2), ROUND(new.lm_montantttc,2), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_lignemodele_update AS
  ON UPDATE TO "lignemodele"
  DO INSTEAD UPDATE "table_lignemodele" SET lm_numero=new.lm_numero, pd_numero=new.pd_numero, mo_numero=new.mo_numero, lm_quantite=ROUND(COALESCE(NEW.lm_quantite,1),2), lm_montantht=ROUND(new.lm_montantht,2), lm_montantttc=ROUND(new.lm_montantttc,2), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.LM_Numero=LM_Numero;
CREATE OR REPLACE RULE rule_lignemodele_delete AS
  ON DELETE TO "lignemodele"
  DO INSTEAD DELETE FROM "table_lignemodele" WHERE old.LM_Numero=LM_Numero;

CREATE OR REPLACE RULE rule_listereglement_insert AS
  ON INSERT TO "listereglement"
  DO INSTEAD INSERT INTO "table_listereglement"(lr_numero, lr_indice, lr_commentaire, em_numero, lr_montant, lr_date, mr_numero, so_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.lr_numero,nextval('seq_listereglement')), COALESCE(NEW.lr_indice,1), new.lr_commentaire, new.em_numero, ROUND(COALESCE(NEW.lr_montant,0),2), new.lr_date, new.mr_numero, COALESCE(NEW.so_numero,current_societe()), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_listereglement_update AS
  ON UPDATE TO "listereglement"
  DO INSTEAD UPDATE "table_listereglement" SET lr_numero=COALESCE(NEW.lr_numero,nextval('seq_listereglement')), lr_indice=COALESCE(NEW.lr_indice,1), lr_commentaire=new.lr_commentaire, em_numero=new.em_numero, lr_montant=ROUND(COALESCE(NEW.lr_montant,0),2), lr_date=new.lr_date, mr_numero=new.mr_numero, so_numero=COALESCE(NEW.so_numero,current_societe()), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.LR_Numero=LR_Numero;
CREATE OR REPLACE RULE rule_listereglement_delete AS
  ON DELETE TO "listereglement"
  DO INSTEAD DELETE FROM "table_listereglement" WHERE old.LR_Numero=LR_Numero;

CREATE OR REPLACE RULE rule_modereglement_insert AS
  ON INSERT TO "modereglement"
  DO INSTEAD INSERT INTO "table_modereglement"(mr_numero, mr_libelle, mr_compte, cg_numero, so_numero, mr_cheque, mr_actif, mr_description, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.mr_numero, new.mr_libelle, new.mr_compte, new.cg_numero, COALESCE(NEW.so_numero,current_societe()), COALESCE(NEW.mr_cheque,false), COALESCE(NEW.mr_actif,true), new.mr_description, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_modereglement_update AS
  ON UPDATE TO "modereglement"
  DO INSTEAD UPDATE "table_modereglement" SET mr_numero=new.mr_numero, mr_libelle=new.mr_libelle, mr_compte=new.mr_compte, cg_numero=new.cg_numero, so_numero=COALESCE(NEW.so_numero,current_societe()), mr_cheque=COALESCE(NEW.mr_cheque,false), mr_actif=COALESCE(NEW.mr_actif,true), mr_description=new.mr_description, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.MR_Numero=MR_Numero;
CREATE OR REPLACE RULE rule_modereglement_delete AS
  ON DELETE TO "modereglement"
  DO INSTEAD DELETE FROM "table_modereglement" WHERE old.MR_Numero=MR_Numero;

CREATE OR REPLACE RULE rule_moderepartition_insert AS
  ON INSERT TO "moderepartition"
  DO INSTEAD INSERT INTO "table_moderepartition"(mp_numero, mp_libelle, cg_numero, so_numero, mp_actif, mp_societe, mp_description, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.mp_numero, new.mp_libelle, new.cg_numero, COALESCE(NEW.so_numero,current_societe()), COALESCE(NEW.mp_actif,true), new.mp_societe, new.mp_description, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_moderepartition_update AS
  ON UPDATE TO "moderepartition"
  DO INSTEAD UPDATE "table_moderepartition" SET mp_numero=new.mp_numero, mp_libelle=new.mp_libelle, cg_numero=new.cg_numero, so_numero=COALESCE(NEW.so_numero,current_societe()), mp_actif=COALESCE(NEW.mp_actif,true), mp_societe=new.mp_societe, mp_description=new.mp_description, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.MP_Numero=MP_Numero;
CREATE OR REPLACE RULE rule_moderepartition_delete AS
  ON DELETE TO "moderepartition"
  DO INSTEAD DELETE FROM "table_moderepartition" WHERE old.MP_Numero=MP_Numero;

CREATE OR REPLACE RULE rule_modele_insert AS
  ON INSERT TO "modele"
  DO INSTEAD INSERT INTO "table_modele"(mo_numero, mo_libelle, so_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.mo_numero, new.mo_libelle, COALESCE(NEW.so_numero,current_societe()), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_modele_update AS
  ON UPDATE TO "modele"
  DO INSTEAD UPDATE "table_modele" SET mo_numero=new.mo_numero, mo_libelle=new.mo_libelle, so_numero=COALESCE(NEW.so_numero,current_societe()), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.MO_Numero=MO_Numero;
CREATE OR REPLACE RULE rule_modele_delete AS
  ON DELETE TO "modele"
  DO INSTEAD DELETE FROM "table_modele" WHERE old.MO_Numero=MO_Numero;

CREATE OR REPLACE RULE rule_naturepersonne_insert AS
  ON INSERT TO "naturepersonne"
  DO INSTEAD INSERT INTO "table_naturepersonne"(np_numero, np_nom, np_abrev, np_titre, np_morale, np_avectitre, np_inclu, np_temporaire, np_genre, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.np_numero,nextval('seq_naturepersonne')), new.np_nom, new.np_abrev, new.np_titre, COALESCE(NEW.np_morale,false), COALESCE(NEW.np_avectitre,false), COALESCE(NEW.np_inclu,false), COALESCE(NEW.np_temporaire,false), COALESCE(NEW.np_genre,'MORALE'), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_naturepersonne_update AS
  ON UPDATE TO "naturepersonne"
  DO INSTEAD UPDATE "table_naturepersonne" SET np_numero=COALESCE(NEW.np_numero,nextval('seq_naturepersonne')), np_nom=new.np_nom, np_abrev=new.np_abrev, np_titre=new.np_titre, np_morale=COALESCE(NEW.np_morale,false), np_avectitre=COALESCE(NEW.np_avectitre,false), np_inclu=COALESCE(NEW.np_inclu,false), np_temporaire=COALESCE(NEW.np_temporaire,false), np_genre=COALESCE(NEW.np_genre,'MORALE'), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.NP_Numero=NP_Numero;
CREATE OR REPLACE RULE rule_naturepersonne_delete AS
  ON DELETE TO "naturepersonne"
  DO INSTEAD DELETE FROM "table_naturepersonne" WHERE old.NP_Numero=NP_Numero;

CREATE OR REPLACE RULE rule_nonadherent_insert AS
  ON INSERT TO "nonadherent"
  DO INSTEAD INSERT INTO "table_nonadherent"(na_numero, pe_numero, na_titre, na_nom, na_prenom, na_adresse1, na_adresse2, na_cp, na_ville, na_tel, na_date, na_na, ag_numero, na_raison, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.na_numero,nextval('seq_nonadherent')), new.pe_numero, new.na_titre, new.na_nom, new.na_prenom, new.na_adresse1, new.na_adresse2, new.na_cp, new.na_ville, new.na_tel, new.na_date, new.na_na, new.ag_numero, new.na_raison, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_nonadherent_update AS
  ON UPDATE TO "nonadherent"
  DO INSTEAD UPDATE "table_nonadherent" SET na_numero=COALESCE(NEW.na_numero,nextval('seq_nonadherent')), pe_numero=new.pe_numero, na_titre=new.na_titre, na_nom=new.na_nom, na_prenom=new.na_prenom, na_adresse1=new.na_adresse1, na_adresse2=new.na_adresse2, na_cp=new.na_cp, na_ville=new.na_ville, na_tel=new.na_tel, na_date=new.na_date, na_na=new.na_na, ag_numero=new.ag_numero, na_raison=new.na_raison, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.NA_Numero=NA_Numero;
CREATE OR REPLACE RULE rule_nonadherent_delete AS
  ON DELETE TO "nonadherent"
  DO INSTEAD DELETE FROM "table_nonadherent" WHERE old.NA_Numero=NA_Numero;

CREATE OR REPLACE RULE rule_observation_insert AS
  ON INSERT TO "observation"
  DO INSTEAD INSERT INTO "table_observation"(ob_numero, pe_numero, ob_observation, ob_niveau, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ob_numero, new.pe_numero, new.ob_observation, new.ob_niveau, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_observation_update AS
  ON UPDATE TO "observation"
  DO INSTEAD UPDATE "table_observation" SET ob_numero=new.ob_numero, pe_numero=new.pe_numero, ob_observation=new.ob_observation, ob_niveau=new.ob_niveau, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.OB_Numero=OB_Numero;
CREATE OR REPLACE RULE rule_observation_delete AS
  ON DELETE TO "observation"
  DO INSTEAD DELETE FROM "table_observation" WHERE old.OB_Numero=OB_Numero;

CREATE OR REPLACE RULE rule_periode_insert AS
  ON INSERT TO "periode"
  DO INSTEAD INSERT INTO "table_periode"(po_numero, po_debut, po_fin, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.po_numero, new.po_debut, new.po_fin, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_periode_update AS
  ON UPDATE TO "periode"
  DO INSTEAD UPDATE "table_periode" SET po_numero=new.po_numero, po_debut=new.po_debut, po_fin=new.po_fin, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PO_Numero=PO_Numero;
CREATE OR REPLACE RULE rule_periode_delete AS
  ON DELETE TO "periode"
  DO INSTEAD DELETE FROM "table_periode" WHERE old.PO_Numero=PO_Numero;

CREATE OR REPLACE RULE rule_periodeadherence_insert AS
  ON INSERT TO "periodeadherence"
  DO INSTEAD INSERT INTO "table_periodeadherence"(po_numero, ah_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.po_numero, new.ah_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_periodeadherence_update AS
  ON UPDATE TO "periodeadherence"
  DO INSTEAD UPDATE "table_periodeadherence" SET po_numero=new.po_numero, ah_numero=new.ah_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PO_Numero=PO_Numero AND new.AH_Numero=AH_Numero;
CREATE OR REPLACE RULE rule_periodeadherence_delete AS
  ON DELETE TO "periodeadherence"
  DO INSTEAD DELETE FROM "table_periodeadherence" WHERE old.PO_Numero=PO_Numero AND old.AH_Numero=AH_Numero;

CREATE OR REPLACE RULE rule_personne_insert AS
  ON INSERT TO "personne"
  DO INSTEAD INSERT INTO "table_personne"(pe_numero, pe_id, tp_numero, np_numero, pe_titre, pe_nom, pe_regimefiscal, pe_actif, pe_morale, deleted, pe_prenom, pe_motdepasse, pe_naissance, pe_numtvaic, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.pe_numero, DEFAULT, COALESCE(NEW.tp_numero,3), new.np_numero, new.pe_titre, new.pe_nom, COALESCE(NEW.pe_regimefiscal,'NON RENSEIGNE'), COALESCE(NEW.pe_actif,true), COALESCE(NEW.pe_morale,false), COALESCE(NEW.deleted,false), new.pe_prenom, new.pe_motdepasse, new.pe_naissance, new.pe_numtvaic, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_personne_update AS
  ON UPDATE TO "personne"
  DO INSTEAD UPDATE "table_personne" SET pe_numero=new.pe_numero, pe_id=OLD.PE_ID, tp_numero=COALESCE(NEW.tp_numero,3), np_numero=new.np_numero, pe_titre=new.pe_titre, pe_nom=new.pe_nom, pe_regimefiscal=COALESCE(NEW.pe_regimefiscal,'NON RENSEIGNE'), pe_actif=COALESCE(NEW.pe_actif,true), pe_morale=COALESCE(NEW.pe_morale,false), deleted=COALESCE(NEW.deleted,false), pe_prenom=new.pe_prenom, pe_motdepasse=new.pe_motdepasse, pe_naissance=new.pe_naissance, pe_numtvaic=new.pe_numtvaic, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PE_Numero=PE_Numero;
CREATE OR REPLACE RULE rule_personne_delete AS
  ON DELETE TO "personne"
  DO INSTEAD DELETE FROM "table_personne" WHERE old.PE_Numero=PE_Numero;

CREATE OR REPLACE RULE rule_personneupdate_insert AS
  ON INSERT TO "personneupdate"
  DO INSTEAD INSERT INTO "table_personneupdate"(pu_numero, pu_action, pu_bilan, pe_numero, tp_numero, pe_titre, pe_nom, pe_regimefiscal, pe_morale, pe_prenom, pe_naissance, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.pu_numero,nextval('seq_personneupdate')), new.pu_action, new.pu_bilan, new.pe_numero, new.tp_numero, new.pe_titre, new.pe_nom, COALESCE(NEW.pe_regimefiscal,'NON RENSEIGNE'), COALESCE(NEW.pe_morale,false), new.pe_prenom, new.pe_naissance, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_personneupdate_update AS
  ON UPDATE TO "personneupdate"
  DO INSTEAD UPDATE "table_personneupdate" SET pu_numero=COALESCE(NEW.pu_numero,nextval('seq_personneupdate')), pu_action=new.pu_action, pu_bilan=new.pu_bilan, pe_numero=new.pe_numero, tp_numero=new.tp_numero, pe_titre=new.pe_titre, pe_nom=new.pe_nom, pe_regimefiscal=COALESCE(NEW.pe_regimefiscal,'NON RENSEIGNE'), pe_morale=COALESCE(NEW.pe_morale,false), pe_prenom=new.pe_prenom, pe_naissance=new.pe_naissance, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PU_Numero=PU_Numero;
CREATE OR REPLACE RULE rule_personneupdate_delete AS
  ON DELETE TO "personneupdate"
  DO INSTEAD DELETE FROM "table_personneupdate" WHERE old.PU_Numero=PU_Numero;

CREATE OR REPLACE RULE rule_piece_insert AS
  ON INSERT TO "piece"
  DO INSTEAD INSERT INTO "table_piece"(pi_numero, jo_numero, pi_numpiece, ex_numero, pi_libelle, pi_debit, pi_credit, pi_date, pi_numseq, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.pi_numero, new.jo_numero, new.pi_numpiece, new.ex_numero, new.pi_libelle, ROUND(COALESCE(NEW.pi_debit,0),2), ROUND(COALESCE(NEW.pi_credit,0),2), COALESCE(NEW.pi_date,CURRENT_DATE), new.pi_numseq, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_piece_update AS
  ON UPDATE TO "piece"
  DO INSTEAD UPDATE "table_piece" SET pi_numero=new.pi_numero, jo_numero=new.jo_numero, pi_numpiece=new.pi_numpiece, ex_numero=new.ex_numero, pi_libelle=new.pi_libelle, pi_debit=ROUND(COALESCE(NEW.pi_debit,0),2), pi_credit=ROUND(COALESCE(NEW.pi_credit,0),2), pi_date=COALESCE(NEW.pi_date,CURRENT_DATE), pi_numseq=new.pi_numseq, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PI_Numero=PI_Numero;
CREATE OR REPLACE RULE rule_piece_delete AS
  ON DELETE TO "piece"
  DO INSTEAD DELETE FROM "table_piece" WHERE old.PI_Numero=PI_Numero;

CREATE OR REPLACE RULE rule_pointage_insert AS
  ON INSERT TO "pointage"
  DO INSTEAD INSERT INTO "table_pointage"(pt_numero, pt_date, pt_releve, pt_debit, pt_credit, so_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.pt_numero, COALESCE(NEW.pt_date,CURRENT_DATE), new.pt_releve, ROUND(COALESCE(NEW.pt_debit,0),2), ROUND(COALESCE(NEW.pt_credit,0),2), COALESCE(NEW.so_numero,current_societe()), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_pointage_update AS
  ON UPDATE TO "pointage"
  DO INSTEAD UPDATE "table_pointage" SET pt_numero=new.pt_numero, pt_date=COALESCE(NEW.pt_date,CURRENT_DATE), pt_releve=new.pt_releve, pt_debit=ROUND(COALESCE(NEW.pt_debit,0),2), pt_credit=ROUND(COALESCE(NEW.pt_credit,0),2), so_numero=COALESCE(NEW.so_numero,current_societe()), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PT_Numero=PT_Numero;
CREATE OR REPLACE RULE rule_pointage_delete AS
  ON DELETE TO "pointage"
  DO INSTEAD DELETE FROM "table_pointage" WHERE old.PT_Numero=PT_Numero;

CREATE OR REPLACE RULE rule_prefixe_insert AS
  ON INSERT TO "prefixe"
  DO INSTEAD INSERT INTO "table_prefixe"(pf_numero, pf_nom, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.pf_numero, new.pf_nom, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_prefixe_update AS
  ON UPDATE TO "prefixe"
  DO INSTEAD UPDATE "table_prefixe" SET pf_numero=new.pf_numero, pf_nom=new.pf_nom, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PF_Numero=PF_Numero;
CREATE OR REPLACE RULE rule_prefixe_delete AS
  ON DELETE TO "prefixe"
  DO INSTEAD DELETE FROM "table_prefixe" WHERE old.PF_Numero=PF_Numero;

CREATE OR REPLACE RULE rule_prix_insert AS
  ON INSERT TO "prix"
  DO INSTEAD INSERT INTO "table_prix"(px_numero, tv_numero, pd_numero, px_tarifht, px_tarifttc, px_actif, px_datedebut, px_datefin, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.px_numero,nextval('seq_prix')), new.tv_numero, new.pd_numero, ROUND(new.px_tarifht,4), ROUND(new.px_tarifttc,4), COALESCE(NEW.px_actif,true), COALESCE(NEW.px_datedebut,CURRENT_TIMESTAMP), new.px_datefin, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_prix_update AS
  ON UPDATE TO "prix"
  DO INSTEAD UPDATE "table_prix" SET px_numero=COALESCE(NEW.px_numero,nextval('seq_prix')), tv_numero=new.tv_numero, pd_numero=new.pd_numero, px_tarifht=ROUND(new.px_tarifht,4), px_tarifttc=ROUND(new.px_tarifttc,4), px_actif=COALESCE(NEW.px_actif,true), px_datedebut=COALESCE(NEW.px_datedebut,CURRENT_TIMESTAMP), px_datefin=new.px_datefin, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PX_Numero=PX_Numero;
CREATE OR REPLACE RULE rule_prix_delete AS
  ON DELETE TO "prix"
  DO INSTEAD DELETE FROM "table_prix" WHERE old.PX_Numero=PX_Numero;

CREATE OR REPLACE RULE rule_produit_insert AS
  ON INSERT TO "produit"
  DO INSTEAD INSERT INTO "table_produit"(pd_numero, pd_id, pd_libelle, pd_titre, jo_numero, so_numero, pd_actif, pd_sansquantite, pd_reduction, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.pd_numero, DEFAULT, new.pd_libelle, new.pd_titre, new.jo_numero, COALESCE(NEW.so_numero,current_societe()), COALESCE(NEW.pd_actif,true), COALESCE(NEW.pd_sansquantite,false), COALESCE(NEW.pd_reduction,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_produit_update AS
  ON UPDATE TO "produit"
  DO INSTEAD UPDATE "table_produit" SET pd_numero=new.pd_numero, pd_id=OLD.PD_ID, pd_libelle=new.pd_libelle, pd_titre=new.pd_titre, jo_numero=new.jo_numero, so_numero=COALESCE(NEW.so_numero,current_societe()), pd_actif=COALESCE(NEW.pd_actif,true), pd_sansquantite=COALESCE(NEW.pd_sansquantite,false), pd_reduction=COALESCE(NEW.pd_reduction,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.PD_Numero=PD_Numero;
CREATE OR REPLACE RULE rule_produit_delete AS
  ON DELETE TO "produit"
  DO INSTEAD DELETE FROM "table_produit" WHERE old.PD_Numero=PD_Numero;

CREATE OR REPLACE RULE rule_reglement_insert AS
  ON INSERT TO "reglement"
  DO INSTEAD INSERT INTO "table_reglement"(rg_numero, pe_numero, rg_montant, rg_date, em_numero, lr_numero, mr_numero, so_numero, rg_encompta, rg_libellebanque, rg_numerocompte, rg_reference, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.rg_numero, new.pe_numero, ROUND(new.rg_montant,2), new.rg_date, new.em_numero, new.lr_numero, new.mr_numero, COALESCE(NEW.so_numero,current_societe()), COALESCE(NEW.rg_encompta,false), new.rg_libellebanque, new.rg_numerocompte, new.rg_reference, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_reglement_update AS
  ON UPDATE TO "reglement"
  DO INSTEAD UPDATE "table_reglement" SET rg_numero=new.rg_numero, pe_numero=new.pe_numero, rg_montant=ROUND(new.rg_montant,2), rg_date=new.rg_date, em_numero=new.em_numero, lr_numero=new.lr_numero, mr_numero=new.mr_numero, so_numero=COALESCE(NEW.so_numero,current_societe()), rg_encompta=COALESCE(NEW.rg_encompta,false), rg_libellebanque=new.rg_libellebanque, rg_numerocompte=new.rg_numerocompte, rg_reference=new.rg_reference, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.RG_Numero=RG_Numero;
CREATE OR REPLACE RULE rule_reglement_delete AS
  ON DELETE TO "reglement"
  DO INSTEAD DELETE FROM "table_reglement" WHERE old.RG_Numero=RG_Numero;

CREATE OR REPLACE RULE rule_repartition_insert AS
  ON INSERT TO "repartition"
  DO INSTEAD INSERT INTO "table_repartition"(rp_numero, rg_numero, mp_numero, rp_montant, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.rp_numero,nextval('seq_repartition')), new.rg_numero, new.mp_numero, ROUND(new.rp_montant,2), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_repartition_update AS
  ON UPDATE TO "repartition"
  DO INSTEAD UPDATE "table_repartition" SET rp_numero=COALESCE(NEW.rp_numero,nextval('seq_repartition')), rg_numero=new.rg_numero, mp_numero=new.mp_numero, rp_montant=ROUND(new.rp_montant,2), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.RP_Numero=RP_Numero;
CREATE OR REPLACE RULE rule_repartition_delete AS
  ON DELETE TO "repartition"
  DO INSTEAD DELETE FROM "table_repartition" WHERE old.RP_Numero=RP_Numero;

CREATE OR REPLACE RULE rule_responsabilite_insert AS
  ON INSERT TO "responsabilite"
  DO INSTEAD INSERT INTO "table_responsabilite"(re_numero, re_code, re_nom, re_famille, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.re_numero, new.re_code, new.re_nom, new.re_famille, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_responsabilite_update AS
  ON UPDATE TO "responsabilite"
  DO INSTEAD UPDATE "table_responsabilite" SET re_numero=new.re_numero, re_code=new.re_code, re_nom=new.re_nom, re_famille=new.re_famille, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.RE_Numero=RE_Numero;
CREATE OR REPLACE RULE rule_responsabilite_delete AS
  ON DELETE TO "responsabilite"
  DO INSTEAD DELETE FROM "table_responsabilite" WHERE old.RE_Numero=RE_Numero;

CREATE OR REPLACE RULE rule_routage_insert AS
  ON INSERT TO "routage"
  DO INSTEAD INSERT INTO "table_routage"(ro_numero, ad_numero, pe_numero, ro_debutservice, ro_finservice, ro_quantite, ro_suspendu, ro_dernierroute, fa_numero, created_at, created_by, updated_at, updated_by, lock_version) VALUES (COALESCE(NEW.ro_numero,nextval('seq_routage')), new.ad_numero, new.pe_numero, new.ro_debutservice, new.ro_finservice, COALESCE(NEW.ro_quantite,1), COALESCE(NEW.ro_suspendu,false), new.ro_dernierroute, new.fa_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0);
CREATE OR REPLACE RULE rule_routage_update AS
  ON UPDATE TO "routage"
  DO INSTEAD UPDATE "table_routage" SET ro_numero=COALESCE(NEW.ro_numero,nextval('seq_routage')), ad_numero=new.ad_numero, pe_numero=new.pe_numero, ro_debutservice=new.ro_debutservice, ro_finservice=new.ro_finservice, ro_quantite=COALESCE(NEW.ro_quantite,1), ro_suspendu=COALESCE(NEW.ro_suspendu,false), ro_dernierroute=new.ro_dernierroute, fa_numero=new.fa_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1 WHERE new.RO_Numero=RO_Numero;
CREATE OR REPLACE RULE rule_routage_delete AS
  ON DELETE TO "routage"
  DO INSTEAD DELETE FROM "table_routage" WHERE old.RO_Numero=RO_Numero;

CREATE OR REPLACE RULE rule_sequence_insert AS
  ON INSERT TO "sequence"
  DO INSTEAD INSERT INTO "table_sequence"(sq_numero, sq_nom, sq_last, sq_nombre, sq_used_on, sq_clear_cache, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.sq_numero, new.sq_nom, COALESCE(NEW.sq_last,1), COALESCE(NEW.sq_nombre,50), COALESCE(NEW.sq_used_on,CURRENT_TIMESTAMP), COALESCE(NEW.sq_clear_cache,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_sequence_update AS
  ON UPDATE TO "sequence"
  DO INSTEAD UPDATE "table_sequence" SET sq_numero=new.sq_numero, sq_nom=new.sq_nom, sq_last=COALESCE(NEW.sq_last,1), sq_nombre=COALESCE(NEW.sq_nombre,50), sq_used_on=COALESCE(NEW.sq_used_on,CURRENT_TIMESTAMP), sq_clear_cache=COALESCE(NEW.sq_clear_cache,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.SQ_Numero=SQ_Numero;
CREATE OR REPLACE RULE rule_sequence_delete AS
  ON DELETE TO "sequence"
  DO INSTEAD DELETE FROM "table_sequence" WHERE old.SQ_Numero=SQ_Numero;

CREATE OR REPLACE RULE rule_sequencecache_insert AS
  ON INSERT TO "sequencecache"
  DO INSTEAD INSERT INTO "table_sequencecache"(sc_numero, sq_numero, sc_valeur, sc_locked, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.sc_numero, new.sq_numero, new.sc_valeur, COALESCE(NEW.sc_locked,false), CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_sequencecache_update AS
  ON UPDATE TO "sequencecache"
  DO INSTEAD UPDATE "table_sequencecache" SET sc_numero=new.sc_numero, sq_numero=new.sq_numero, sc_valeur=new.sc_valeur, sc_locked=COALESCE(NEW.sc_locked,false), created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.SC_Numero=SC_Numero;
CREATE OR REPLACE RULE rule_sequencecache_delete AS
  ON DELETE TO "sequencecache"
  DO INSTEAD DELETE FROM "table_sequencecache" WHERE old.SC_Numero=SC_Numero;

CREATE OR REPLACE RULE rule_service_insert AS
  ON INSERT TO "service"
  DO INSTEAD INSERT INTO "table_service"(se_numero, se_nom, se_societe, se_agent, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.se_numero, new.se_nom, new.se_societe, new.se_agent, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_service_update AS
  ON UPDATE TO "service"
  DO INSTEAD UPDATE "table_service" SET se_numero=new.se_numero, se_nom=new.se_nom, se_societe=new.se_societe, se_agent=new.se_agent, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.SE_Numero=SE_Numero;
CREATE OR REPLACE RULE rule_service_delete AS
  ON DELETE TO "service"
  DO INSTEAD DELETE FROM "table_service" WHERE old.SE_Numero=SE_Numero;

CREATE OR REPLACE RULE rule_societe_insert AS
  ON INSERT TO "societe"
  DO INSTEAD INSERT INTO "table_societe"(so_numero, so_libelle, so_abbrev, pe_numero, so_detail, so_sequence, ts_numero, sq_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.so_numero, new.so_libelle, new.so_abbrev, new.pe_numero, new.so_detail, new.so_sequence, new.ts_numero, new.sq_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_societe_update AS
  ON UPDATE TO "societe"
  DO INSTEAD UPDATE "table_societe" SET so_numero=new.so_numero, so_libelle=new.so_libelle, so_abbrev=new.so_abbrev, pe_numero=new.pe_numero, so_detail=new.so_detail, so_sequence=new.so_sequence, ts_numero=new.ts_numero, sq_numero=new.sq_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.SO_Numero=SO_Numero;
CREATE OR REPLACE RULE rule_societe_delete AS
  ON DELETE TO "societe"
  DO INSTEAD DELETE FROM "table_societe" WHERE old.SO_Numero=SO_Numero;

CREATE OR REPLACE RULE rule_sujet_insert AS
  ON INSERT TO "sujet"
  DO INSTEAD INSERT INTO "table_sujet"(zs_numero, zs_libelle, zu_numero, zs_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.zs_numero,nextval('seq_sujet')), new.zs_libelle, new.zu_numero, new.zs_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_sujet_update AS
  ON UPDATE TO "sujet"
  DO INSTEAD UPDATE "table_sujet" SET zs_numero=COALESCE(NEW.zs_numero,nextval('seq_sujet')), zs_libelle=new.zs_libelle, zu_numero=new.zu_numero, zs_notes=new.zs_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.ZS_Numero=ZS_Numero;
CREATE OR REPLACE RULE rule_sujet_delete AS
  ON DELETE TO "sujet"
  DO INSTEAD DELETE FROM "table_sujet" WHERE old.ZS_Numero=ZS_Numero;

CREATE OR REPLACE RULE rule_tache_insert AS
  ON INSERT TO "tache"
  DO INSTEAD INSERT INTO "table_tache"(zt_numero, zt_libelle, zt_phrase, zt_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.zt_numero,nextval('seq_tache')), new.zt_libelle, new.zt_phrase, new.zt_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_tache_update AS
  ON UPDATE TO "tache"
  DO INSTEAD UPDATE "table_tache" SET zt_numero=COALESCE(NEW.zt_numero,nextval('seq_tache')), zt_libelle=new.zt_libelle, zt_phrase=new.zt_phrase, zt_notes=new.zt_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.ZT_Numero=ZT_Numero;
CREATE OR REPLACE RULE rule_tache_delete AS
  ON DELETE TO "tache"
  DO INSTEAD DELETE FROM "table_tache" WHERE old.ZT_Numero=ZT_Numero;

CREATE OR REPLACE RULE rule_tva_insert AS
  ON INSERT TO "tva"
  DO INSTEAD INSERT INTO "table_tva"(tv_numero, tv_code, tv_taux, tv_actif, so_numero, cg_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.tv_numero, new.tv_code, ROUND(COALESCE(NEW.tv_taux,0),2), COALESCE(NEW.tv_actif,true), COALESCE(NEW.so_numero,current_societe()), new.cg_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_tva_update AS
  ON UPDATE TO "tva"
  DO INSTEAD UPDATE "table_tva" SET tv_numero=new.tv_numero, tv_code=new.tv_code, tv_taux=ROUND(COALESCE(NEW.tv_taux,0),2), tv_actif=COALESCE(NEW.tv_actif,true), so_numero=COALESCE(NEW.so_numero,current_societe()), cg_numero=new.cg_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.TV_Numero=TV_Numero;
CREATE OR REPLACE RULE rule_tva_delete AS
  ON DELETE TO "tva"
  DO INSTEAD DELETE FROM "table_tva" WHERE old.TV_Numero=TV_Numero;

CREATE OR REPLACE RULE rule_typeadresse_insert AS
  ON INSERT TO "typeadresse"
  DO INSTEAD INSERT INTO "table_typeadresse"(ak_numero, ak_nom, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.ak_numero,nextval('seq_typeadresse')), new.ak_nom, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typeadresse_update AS
  ON UPDATE TO "typeadresse"
  DO INSTEAD UPDATE "table_typeadresse" SET ak_numero=COALESCE(NEW.ak_numero,nextval('seq_typeadresse')), ak_nom=new.ak_nom, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.AK_Numero=AK_Numero;
CREATE OR REPLACE RULE rule_typeadresse_delete AS
  ON DELETE TO "typeadresse"
  DO INSTEAD DELETE FROM "table_typeadresse" WHERE old.AK_Numero=AK_Numero;

CREATE OR REPLACE RULE rule_typeattribut_insert AS
  ON INSERT TO "typeattribut"
  DO INSTEAD INSERT INTO "table_typeattribut"(ta_numero, ta_nom, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ta_numero, new.ta_nom, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typeattribut_update AS
  ON UPDATE TO "typeattribut"
  DO INSTEAD UPDATE "table_typeattribut" SET ta_numero=new.ta_numero, ta_nom=new.ta_nom, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.TA_Numero=TA_Numero;
CREATE OR REPLACE RULE rule_typeattribut_delete AS
  ON DELETE TO "typeattribut"
  DO INSTEAD DELETE FROM "table_typeattribut" WHERE old.TA_Numero=TA_Numero;

CREATE OR REPLACE RULE rule_typejournal_insert AS
  ON INSERT TO "typejournal"
  DO INSTEAD INSERT INTO "table_typejournal"(tj_numero, tj_libelle, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.tj_numero, new.tj_libelle, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typejournal_update AS
  ON UPDATE TO "typejournal"
  DO INSTEAD UPDATE "table_typejournal" SET tj_numero=new.tj_numero, tj_libelle=new.tj_libelle, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.TJ_Numero=TJ_Numero;
CREATE OR REPLACE RULE rule_typejournal_delete AS
  ON DELETE TO "typejournal"
  DO INSTEAD DELETE FROM "table_typejournal" WHERE old.TJ_Numero=TJ_Numero;

CREATE OR REPLACE RULE rule_typelien_insert AS
  ON INSERT TO "typelien"
  DO INSTEAD INSERT INTO "table_typelien"(tl_numero, tl_code, tl_libelle, tl_action12, tl_action21, tl_description, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.tl_numero,nextval('seq_typelien')), COALESCE(NEW.tl_code,('>'::text || fc_password(7))), new.tl_libelle, COALESCE(NEW.tl_action12,'[NoAction]'), COALESCE(NEW.tl_action21,'[NoReverseAction]'), new.tl_description, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typelien_update AS
  ON UPDATE TO "typelien"
  DO INSTEAD UPDATE "table_typelien" SET tl_numero=COALESCE(NEW.tl_numero,nextval('seq_typelien')), tl_code=COALESCE(NEW.tl_code,('>'::text || fc_password(7))), tl_libelle=new.tl_libelle, tl_action12=COALESCE(NEW.tl_action12,'[NoAction]'), tl_action21=COALESCE(NEW.tl_action21,'[NoReverseAction]'), tl_description=new.tl_description, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.TL_Numero=TL_Numero;
CREATE OR REPLACE RULE rule_typelien_delete AS
  ON DELETE TO "typelien"
  DO INSTEAD DELETE FROM "table_typelien" WHERE old.TL_Numero=TL_Numero;

CREATE OR REPLACE RULE rule_typepersonne_insert AS
  ON INSERT TO "typepersonne"
  DO INSTEAD INSERT INTO "table_typepersonne"(tp_numero, tp_type, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.tp_numero, new.tp_type, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typepersonne_update AS
  ON UPDATE TO "typepersonne"
  DO INSTEAD UPDATE "table_typepersonne" SET tp_numero=new.tp_numero, tp_type=new.tp_type, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.TP_Numero=TP_Numero;
CREATE OR REPLACE RULE rule_typepersonne_delete AS
  ON DELETE TO "typepersonne"
  DO INSTEAD DELETE FROM "table_typepersonne" WHERE old.TP_Numero=TP_Numero;

CREATE OR REPLACE RULE rule_typesociete_insert AS
  ON INSERT TO "typesociete"
  DO INSTEAD INSERT INTO "table_typesociete"(ts_numero, ts_libelle, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.ts_numero, new.ts_libelle, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typesociete_update AS
  ON UPDATE TO "typesociete"
  DO INSTEAD UPDATE "table_typesociete" SET ts_numero=new.ts_numero, ts_libelle=new.ts_libelle, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.TS_Numero=TS_Numero;
CREATE OR REPLACE RULE rule_typesociete_delete AS
  ON DELETE TO "typesociete"
  DO INSTEAD DELETE FROM "table_typesociete" WHERE old.TS_Numero=TS_Numero;

CREATE OR REPLACE RULE rule_typesujet_insert AS
  ON INSERT TO "typesujet"
  DO INSTEAD INSERT INTO "table_typesujet"(zu_numero, zu_libelle, zu_notes, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (COALESCE(NEW.zu_numero,nextval('seq_typesujet')), new.zu_libelle, new.zu_notes, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typesujet_update AS
  ON UPDATE TO "typesujet"
  DO INSTEAD UPDATE "table_typesujet" SET zu_numero=COALESCE(NEW.zu_numero,nextval('seq_typesujet')), zu_libelle=new.zu_libelle, zu_notes=new.zu_notes, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.ZU_Numero=ZU_Numero;
CREATE OR REPLACE RULE rule_typesujet_delete AS
  ON DELETE TO "typesujet"
  DO INSTEAD DELETE FROM "table_typesujet" WHERE old.ZU_Numero=ZU_Numero;

CREATE OR REPLACE RULE rule_typetache_insert AS
  ON INSERT TO "typetache"
  DO INSTEAD INSERT INTO "table_typetache"(th_numero, th_libelle, th_description, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.th_numero, new.th_libelle, new.th_description, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_typetache_update AS
  ON UPDATE TO "typetache"
  DO INSTEAD UPDATE "table_typetache" SET th_numero=new.th_numero, th_libelle=new.th_libelle, th_description=new.th_description, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.TH_Numero=TH_Numero;
CREATE OR REPLACE RULE rule_typetache_delete AS
  ON DELETE TO "typetache"
  DO INSTEAD DELETE FROM "table_typetache" WHERE old.TH_Numero=TH_Numero;

CREATE OR REPLACE RULE rule_ville_insert AS
  ON INSERT TO "ville"
  DO INSTEAD INSERT INTO "table_ville"(vi_numero, vi_nom, ct_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.vi_numero, new.vi_nom, new.ct_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_ville_update AS
  ON UPDATE TO "ville"
  DO INSTEAD UPDATE "table_ville" SET vi_numero=new.vi_numero, vi_nom=new.vi_nom, ct_numero=new.ct_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.VI_Numero=VI_Numero;
CREATE OR REPLACE RULE rule_ville_delete AS
  ON DELETE TO "ville"
  DO INSTEAD DELETE FROM "table_ville" WHERE old.VI_Numero=VI_Numero;

CREATE OR REPLACE RULE rule_villecp_insert AS
  ON INSERT TO "villecp"
  DO INSTEAD INSERT INTO "table_villecp"(vi_numero, cp_numero, created_at, created_by, updated_at, updated_by, lock_version, id) VALUES (new.vi_numero, new.cp_numero, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0, DEFAULT);
CREATE OR REPLACE RULE rule_villecp_update AS
  ON UPDATE TO "villecp"
  DO INSTEAD UPDATE "table_villecp" SET vi_numero=new.vi_numero, cp_numero=new.cp_numero, created_at=OLD.created_at, created_by=OLD.created_by, updated_at=CURRENT_TIMESTAMP, updated_by=CURRENT_USER, lock_version=OLD.lock_version+1, id=OLD.id WHERE new.VI_Numero=VI_Numero AND new.CP_Numero=CP_Numero;
CREATE OR REPLACE RULE rule_villecp_delete AS
  ON DELETE TO "villecp"
  DO INSTEAD DELETE FROM "table_villecp" WHERE old.VI_Numero=VI_Numero AND old.CP_Numero=CP_Numero;

CREATE OR REPLACE RULE rule_Adresse_DELETE AS
  ON DELETE TO Adresse
  DO INSTEAD (UPDATE table_adresse SET AD_Active=FALSE, AD_DateStop=CURRENT_DATE WHERE ad_numero=OLD.AD_Numero);

CREATE OR REPLACE RULE rule_Contact_DELETE AS
  ON DELETE TO Contact
  DO INSTEAD (UPDATE table_contact SET CN_Actif=FALSE WHERE cn_numero=OLD.CN_Numero);

CREATE OR REPLACE RULE rule_EstLie_DELETE AS
  ON DELETE TO EstLie
  DO INSTEAD (UPDATE table_estlie SET EL_Actif=FALSE, EL_Fin=CURRENT_TIMESTAMP WHERE el_numero=OLD.EL_Numero);

CREATE OR REPLACE RULE rule_Prix_DELETE AS
  ON DELETE TO Prix
  DO INSTEAD (UPDATE table_prix SET PX_Actif=FALSE, PX_DateFin=CURRENT_TIMESTAMP WHERE PX_numero=OLD.PX_Numero);

CREATE OR REPLACE RULE rule_Prix_UPDATE AS
  ON UPDATE TO Prix
  DO INSTEAD (INSERT INTO table_prix (TV_Numero, PD_Numero,PX_TarifHT,PX_TarifTTC,PX_Actif,PX_DateDebut, PX_DateFin, created_at,created_by,updated_at,updated_by,lock_version) VALUES (NEW.TV_Numero,OLD.PD_Numero,NEW.PX_TarifHT,NEW.PX_TarifTTC, true,CURRENT_TIMESTAMP, NULL, CURRENT_TIMESTAMP, CURRENT_USER, CURRENT_TIMESTAMP, CURRENT_USER, 0); UPDATE table_prix SET PX_Actif=FALSE, PX_DateFin=CURRENT_TIMESTAMP WHERE PX_numero=OLD.PX_Numero);



-- Revoke et Grant

---- Views
REVOKE ALL ON "constante" FROM PUBLIC;
REVOKE ALL ON "typeadresse" FROM PUBLIC;
REVOKE ALL ON "adresse" FROM PUBLIC;
REVOKE ALL ON "adresseversion" FROM PUBLIC;
REVOKE ALL ON "canton" FROM PUBLIC;
REVOKE ALL ON "appartienta" FROM PUBLIC;
REVOKE ALL ON "groupecanton" FROM PUBLIC;
REVOKE ALL ON "codepostal" FROM PUBLIC;
REVOKE ALL ON "villecp" FROM PUBLIC;
REVOKE ALL ON "ville" FROM PUBLIC;
REVOKE ALL ON "contacttype" FROM PUBLIC;
REVOKE ALL ON "contact" FROM PUBLIC;
REVOKE ALL ON "contactversion" FROM PUBLIC;
REVOKE ALL ON "typelien" FROM PUBLIC;
REVOKE ALL ON "estlie" FROM PUBLIC;
REVOKE ALL ON "naturepersonne" FROM PUBLIC;
REVOKE ALL ON "personne" FROM PUBLIC;
REVOKE ALL ON "personneupdate" FROM PUBLIC;
REVOKE ALL ON "estresponsable" FROM PUBLIC;
REVOKE ALL ON "responsabilite" FROM PUBLIC;
REVOKE ALL ON "attribut" FROM PUBLIC;
REVOKE ALL ON "typeattribut" FROM PUBLIC;
REVOKE ALL ON "categorie" FROM PUBLIC;
REVOKE ALL ON "tva" FROM PUBLIC;
REVOKE ALL ON "typepersonne" FROM PUBLIC;
REVOKE ALL ON "typetache" FROM PUBLIC;
REVOKE ALL ON "appel" FROM PUBLIC;
REVOKE ALL ON "societe" FROM PUBLIC;
REVOKE ALL ON "typesociete" FROM PUBLIC;
REVOKE ALL ON "adherence" FROM PUBLIC;
REVOKE ALL ON "periodeadherence" FROM PUBLIC;
REVOKE ALL ON "adhesion" FROM PUBLIC;
REVOKE ALL ON "periode" FROM PUBLIC;
REVOKE ALL ON "observation" FROM PUBLIC;
REVOKE ALL ON "typejournal" FROM PUBLIC;
REVOKE ALL ON "modele" FROM PUBLIC;
REVOKE ALL ON "lignemodele" FROM PUBLIC;
REVOKE ALL ON "produit" FROM PUBLIC;
REVOKE ALL ON "prix" FROM PUBLIC;
REVOKE ALL ON "ligne" FROM PUBLIC;
REVOKE ALL ON "devis" FROM PUBLIC;
REVOKE ALL ON "lignefacture" FROM PUBLIC;
REVOKE ALL ON "facture" FROM PUBLIC;
REVOKE ALL ON "ligneavoir" FROM PUBLIC;
REVOKE ALL ON "avoir" FROM PUBLIC;
REVOKE ALL ON "routage" FROM PUBLIC;
REVOKE ALL ON "service" FROM PUBLIC;
REVOKE ALL ON "employe" FROM PUBLIC;
REVOKE ALL ON "agent" FROM PUBLIC;
REVOKE ALL ON "equipe" FROM PUBLIC;
REVOKE ALL ON "exercice" FROM PUBLIC;
REVOKE ALL ON "journal" FROM PUBLIC;
REVOKE ALL ON "piece" FROM PUBLIC;
REVOKE ALL ON "ecriture" FROM PUBLIC;
REVOKE ALL ON "comptegen" FROM PUBLIC;
REVOKE ALL ON "compteproduit" FROM PUBLIC;
REVOKE ALL ON "compteaux" FROM PUBLIC;
REVOKE ALL ON "acces" FROM PUBLIC;
REVOKE ALL ON "pointage" FROM PUBLIC;
REVOKE ALL ON "lettrage" FROM PUBLIC;
REVOKE ALL ON "prefixe" FROM PUBLIC;
REVOKE ALL ON "facturereglement" FROM PUBLIC;
REVOKE ALL ON "modereglement" FROM PUBLIC;
REVOKE ALL ON "listereglement" FROM PUBLIC;
REVOKE ALL ON "reglement" FROM PUBLIC;
REVOKE ALL ON "moderepartition" FROM PUBLIC;
REVOKE ALL ON "repartition" FROM PUBLIC;
REVOKE ALL ON "impression" FROM PUBLIC;
REVOKE ALL ON "impressionlot" FROM PUBLIC;
REVOKE ALL ON "impressiongroupe" FROM PUBLIC;
REVOKE ALL ON "impressiondocument" FROM PUBLIC;
REVOKE ALL ON "cotisation" FROM PUBLIC;
REVOKE ALL ON "lignecotisation" FROM PUBLIC;
REVOKE ALL ON "groupetable" FROM PUBLIC;
REVOKE ALL ON "droit" FROM PUBLIC;
REVOKE ALL ON "droitprofil" FROM PUBLIC;
REVOKE ALL ON "activite" FROM PUBLIC;
REVOKE ALL ON "tache" FROM PUBLIC;
REVOKE ALL ON "typesujet" FROM PUBLIC;
REVOKE ALL ON "sujet" FROM PUBLIC;
REVOKE ALL ON "lieu" FROM PUBLIC;
REVOKE ALL ON "groupe" FROM PUBLIC;
REVOKE ALL ON "nonadherent" FROM PUBLIC;
REVOKE ALL ON "sequence" FROM PUBLIC;
REVOKE ALL ON "sequencecache" FROM PUBLIC;
REVOKE ALL ON "evoplus" FROM PUBLIC;
GRANT ALL ON "routage" TO brice;
