-- Introduction
    /* Voici le MCD du projet . */
-- Suppression des sequences
DROP SEQUENCE "seq_acces" CASCADE;
DROP SEQUENCE "seq_activite" CASCADE;
DROP SEQUENCE "seq_adherence" CASCADE;
DROP SEQUENCE "seq_adhesion" CASCADE;
DROP SEQUENCE "seq_adresse" CASCADE;
DROP SEQUENCE "seq_adresseversion" CASCADE;
DROP SEQUENCE "seq_agent" CASCADE;
DROP SEQUENCE "seq_appel" CASCADE;
DROP SEQUENCE "seq_attribut" CASCADE;
DROP SEQUENCE "seq_avoir" CASCADE;
DROP SEQUENCE "seq_canton" CASCADE;
DROP SEQUENCE "seq_categorie" CASCADE;
DROP SEQUENCE "seq_codepostal" CASCADE;
DROP SEQUENCE "seq_compteaux" CASCADE;
DROP SEQUENCE "seq_comptegen" CASCADE;
DROP SEQUENCE "seq_compteproduit" CASCADE;
DROP SEQUENCE "seq_constante" CASCADE;
DROP SEQUENCE "seq_contact" CASCADE;
DROP SEQUENCE "seq_contacttype" CASCADE;
DROP SEQUENCE "seq_contactversion" CASCADE;
DROP SEQUENCE "seq_devis" CASCADE;
DROP SEQUENCE "seq_droit" CASCADE;
DROP SEQUENCE "seq_droitprofil" CASCADE;
DROP SEQUENCE "seq_ecriture" CASCADE;
DROP SEQUENCE "seq_employe" CASCADE;
DROP SEQUENCE "seq_equipe" CASCADE;
DROP SEQUENCE "seq_estlie" CASCADE;
DROP SEQUENCE "seq_estresponsable" CASCADE;
DROP SEQUENCE "seq_exercice" CASCADE;
DROP SEQUENCE "seq_facture" CASCADE;
DROP SEQUENCE "seq_facturereglement" CASCADE;
DROP SEQUENCE "seq_groupe" CASCADE;
DROP SEQUENCE "seq_groupecanton" CASCADE;
DROP SEQUENCE "seq_groupetable" CASCADE;
DROP SEQUENCE "seq_impression" CASCADE;
DROP SEQUENCE "seq_journal" CASCADE;
DROP SEQUENCE "seq_lettrage" CASCADE;
DROP SEQUENCE "seq_lieu" CASCADE;
DROP SEQUENCE "seq_ligne" CASCADE;
DROP SEQUENCE "seq_ligneavoir" CASCADE;
DROP SEQUENCE "seq_lignefacture" CASCADE;
DROP SEQUENCE "seq_lignemodele" CASCADE;
DROP SEQUENCE "seq_listereglement" CASCADE;
DROP SEQUENCE "seq_modele" CASCADE;
DROP SEQUENCE "seq_modereglement" CASCADE;
DROP SEQUENCE "seq_moderepartition" CASCADE;
DROP SEQUENCE "seq_naturepersonne" CASCADE;
DROP SEQUENCE "seq_nonadherent" CASCADE;
DROP SEQUENCE "seq_observation" CASCADE;
DROP SEQUENCE "seq_periode" CASCADE;
DROP SEQUENCE "seq_personne" CASCADE;
DROP SEQUENCE "seq_personneupdate" CASCADE;
DROP SEQUENCE "seq_piece" CASCADE;
DROP SEQUENCE "seq_pointage" CASCADE;
DROP SEQUENCE "seq_prefixe" CASCADE;
DROP SEQUENCE "seq_prix" CASCADE;
DROP SEQUENCE "seq_produit" CASCADE;
DROP SEQUENCE "seq_reglement" CASCADE;
DROP SEQUENCE "seq_repartition" CASCADE;
DROP SEQUENCE "seq_responsabilite" CASCADE;
DROP SEQUENCE "seq_routage" CASCADE;
DROP SEQUENCE "seq_service" CASCADE;
DROP SEQUENCE "seq_societe" CASCADE;
DROP SEQUENCE "seq_sujet" CASCADE;
DROP SEQUENCE "seq_tache" CASCADE;
DROP SEQUENCE "seq_tva" CASCADE;
DROP SEQUENCE "seq_typeadresse" CASCADE;
DROP SEQUENCE "seq_typeattribut" CASCADE;
DROP SEQUENCE "seq_typejournal" CASCADE;
DROP SEQUENCE "seq_typelien" CASCADE;
DROP SEQUENCE "seq_typepersonne" CASCADE;
DROP SEQUENCE "seq_typesociete" CASCADE;
DROP SEQUENCE "seq_typesujet" CASCADE;
DROP SEQUENCE "seq_typetache" CASCADE;
DROP SEQUENCE "seq_ville" CASCADE;

-- Suppression des contraintes foreign key
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_em_numero;
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_zt_numero;
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_zs_numero;
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_zl_numero;
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_fa_numero;
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_de_numero;
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_pe_numero;
ALTER TABLE "table_activite"
  DROP CONSTRAINT fk_table_activite_zg_numero;
ALTER TABLE "table_adherence"
  DROP CONSTRAINT fk_table_adherence_pd_numero;
ALTER TABLE "table_adherence"
  DROP CONSTRAINT fk_table_adherence_tl_numero;
ALTER TABLE "table_adhesion"
  DROP CONSTRAINT fk_table_adhesion_pe_numero;
ALTER TABLE "table_adhesion"
  DROP CONSTRAINT fk_table_adhesion_po_numero;
ALTER TABLE "table_adhesion"
  DROP CONSTRAINT fk_table_adhesion_ah_numero;
ALTER TABLE "table_adhesion"
  DROP CONSTRAINT fk_table_adhesion_fa_numero;
ALTER TABLE "table_adhesion"
  DROP CONSTRAINT fk_table_adhesion_lf_numero;
ALTER TABLE "table_adhesion"
  DROP CONSTRAINT fk_table_adhesion_as_origine;
ALTER TABLE "table_adresse"
  DROP CONSTRAINT fk_table_adresse_ak_numero;
ALTER TABLE "table_adresse"
  DROP CONSTRAINT fk_table_adresse_cp_numero;
ALTER TABLE "table_adresse"
  DROP CONSTRAINT fk_table_adresse_vi_numero;
ALTER TABLE "table_adresse"
  DROP CONSTRAINT fk_table_adresse_pe_numero;
ALTER TABLE "table_adresseversion"
  DROP CONSTRAINT fk_table_adresseversion_ad_numero;
ALTER TABLE "table_adresseversion"
  DROP CONSTRAINT fk_table_adresseversion_ak_numero;
ALTER TABLE "table_adresseversion"
  DROP CONSTRAINT fk_table_adresseversion_cp_numero;
ALTER TABLE "table_adresseversion"
  DROP CONSTRAINT fk_table_adresseversion_vi_numero;
ALTER TABLE "table_adresseversion"
  DROP CONSTRAINT fk_table_adresseversion_pe_numero;
ALTER TABLE "table_agent"
  DROP CONSTRAINT fk_table_agent_eq_numero;
ALTER TABLE "table_appartienta"
  DROP CONSTRAINT fk_table_appartienta_ct_numero;
ALTER TABLE "table_appartienta"
  DROP CONSTRAINT fk_table_appartienta_gc_numero;
ALTER TABLE "table_appel"
  DROP CONSTRAINT fk_table_appel_th_numero;
ALTER TABLE "table_appel"
  DROP CONSTRAINT fk_table_appel_pe_numero;
ALTER TABLE "table_attribut"
  DROP CONSTRAINT fk_table_attribut_pe_numero;
ALTER TABLE "table_attribut"
  DROP CONSTRAINT fk_table_attribut_ta_numero;
ALTER TABLE "table_attribut"
  DROP CONSTRAINT fk_table_attribut_cr_numero;
ALTER TABLE "table_avoir"
  DROP CONSTRAINT fk_table_avoir_pe_numero;
ALTER TABLE "table_avoir"
  DROP CONSTRAINT fk_table_avoir_fa_numero;
ALTER TABLE "table_categorie"
  DROP CONSTRAINT fk_table_categorie_ta_numero;
ALTER TABLE "table_compteaux"
  DROP CONSTRAINT fk_table_compteaux_cg_numero;
ALTER TABLE "table_compteaux"
  DROP CONSTRAINT fk_table_compteaux_ac_numero;
ALTER TABLE "table_comptegen"
  DROP CONSTRAINT fk_table_comptegen_ac_numero;
ALTER TABLE "table_comptegen"
  DROP CONSTRAINT fk_table_comptegen_so_numero;
ALTER TABLE "table_compteproduit"
  DROP CONSTRAINT fk_table_compteproduit_pd_numero;
ALTER TABLE "table_compteproduit"
  DROP CONSTRAINT fk_table_compteproduit_cg_numero;
ALTER TABLE "table_contact"
  DROP CONSTRAINT fk_table_contact_ck_numero;
ALTER TABLE "table_contact"
  DROP CONSTRAINT fk_table_contact_pe_numero;
ALTER TABLE "table_contactversion"
  DROP CONSTRAINT fk_table_contactversion_ck_numero;
ALTER TABLE "table_contactversion"
  DROP CONSTRAINT fk_table_contactversion_pe_numero;
ALTER TABLE "table_contactversion"
  DROP CONSTRAINT fk_table_contactversion_cn_numero;
ALTER TABLE "table_cotisation"
  DROP CONSTRAINT fk_table_cotisation_pe_numero;
ALTER TABLE "table_cotisation"
  DROP CONSTRAINT fk_table_cotisation_cs_societe;
ALTER TABLE "table_cotisation"
  DROP CONSTRAINT fk_table_cotisation_ig_numero;
ALTER TABLE "table_devis"
  DROP CONSTRAINT fk_table_devis_pe_numero;
ALTER TABLE "table_devis"
  DROP CONSTRAINT fk_table_devis_so_numero;
ALTER TABLE "table_devis"
  DROP CONSTRAINT fk_table_devis_em_numero;
ALTER TABLE "table_droit"
  DROP CONSTRAINT fk_table_droit_dp_numero;
ALTER TABLE "table_droit"
  DROP CONSTRAINT fk_table_droit_gt_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_pi_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_ex_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_cg_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_ca_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_pf_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_pt_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_av_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_lt_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_rg_numero;
ALTER TABLE "table_ecriture"
  DROP CONSTRAINT fk_table_ecriture_fa_numero;
ALTER TABLE "table_employe"
  DROP CONSTRAINT fk_table_employe_dp_numero;
ALTER TABLE "table_employe"
  DROP CONSTRAINT fk_table_employe_em_service;
ALTER TABLE "table_employe"
  DROP CONSTRAINT fk_table_employe_em_agent;
ALTER TABLE "table_employe"
  DROP CONSTRAINT fk_table_employe_em_acces;
ALTER TABLE "table_estlie"
  DROP CONSTRAINT fk_table_estlie_el_personne1;
ALTER TABLE "table_estlie"
  DROP CONSTRAINT fk_table_estlie_el_personne2;
ALTER TABLE "table_estlie"
  DROP CONSTRAINT fk_table_estlie_tl_numero;
ALTER TABLE "table_estlie"
  DROP CONSTRAINT fk_table_estlie_tl_code;
ALTER TABLE "table_estresponsable"
  DROP CONSTRAINT fk_table_estresponsable_pe_numero;
ALTER TABLE "table_estresponsable"
  DROP CONSTRAINT fk_table_estresponsable_re_numero;
ALTER TABLE "table_evoplus"
  DROP CONSTRAINT fk_table_evoplus_pe_numero;
ALTER TABLE "table_exercice"
  DROP CONSTRAINT fk_table_exercice_so_numero;
ALTER TABLE "table_facture"
  DROP CONSTRAINT fk_table_facture_de_numero;
ALTER TABLE "table_facture"
  DROP CONSTRAINT fk_table_facture_pe_numero;
ALTER TABLE "table_facture"
  DROP CONSTRAINT fk_table_facture_ag_numero;
ALTER TABLE "table_facture"
  DROP CONSTRAINT fk_table_facture_so_numero;
ALTER TABLE "table_facturereglement"
  DROP CONSTRAINT fk_table_facturereglement_rg_numero;
ALTER TABLE "table_facturereglement"
  DROP CONSTRAINT fk_table_facturereglement_fa_numero;
ALTER TABLE "table_impression"
  DROP CONSTRAINT fk_table_impression_im_societe;
ALTER TABLE "table_impressiondocument"
  DROP CONSTRAINT fk_table_impressiondocument_ig_numero;
ALTER TABLE "table_impressiongroupe"
  DROP CONSTRAINT fk_table_impressiongroupe_il_numero;
ALTER TABLE "table_journal"
  DROP CONSTRAINT fk_table_journal_so_numero;
ALTER TABLE "table_journal"
  DROP CONSTRAINT fk_table_journal_tj_numero;
ALTER TABLE "table_journal"
  DROP CONSTRAINT fk_table_journal_cg_numero;
ALTER TABLE "table_ligne"
  DROP CONSTRAINT fk_table_ligne_pd_numero;
ALTER TABLE "table_ligne"
  DROP CONSTRAINT fk_table_ligne_de_numero;
ALTER TABLE "table_ligne"
  DROP CONSTRAINT fk_table_ligne_px_numero;
ALTER TABLE "table_ligneavoir"
  DROP CONSTRAINT fk_table_ligneavoir_pd_numero;
ALTER TABLE "table_ligneavoir"
  DROP CONSTRAINT fk_table_ligneavoir_av_numero;
ALTER TABLE "table_ligneavoir"
  DROP CONSTRAINT fk_table_ligneavoir_px_numero;
ALTER TABLE "table_lignecotisation"
  DROP CONSTRAINT fk_table_lignecotisation_cs_numero;
ALTER TABLE "table_lignefacture"
  DROP CONSTRAINT fk_table_lignefacture_fa_numero;
ALTER TABLE "table_lignefacture"
  DROP CONSTRAINT fk_table_lignefacture_px_numero;
ALTER TABLE "table_lignefacture"
  DROP CONSTRAINT fk_table_lignefacture_pd_numero;
ALTER TABLE "table_lignemodele"
  DROP CONSTRAINT fk_table_lignemodele_pd_numero;
ALTER TABLE "table_lignemodele"
  DROP CONSTRAINT fk_table_lignemodele_mo_numero;
ALTER TABLE "table_listereglement"
  DROP CONSTRAINT fk_table_listereglement_em_numero;
ALTER TABLE "table_listereglement"
  DROP CONSTRAINT fk_table_listereglement_mr_numero;
ALTER TABLE "table_listereglement"
  DROP CONSTRAINT fk_table_listereglement_so_numero;
ALTER TABLE "table_modereglement"
  DROP CONSTRAINT fk_table_modereglement_cg_numero;
ALTER TABLE "table_modereglement"
  DROP CONSTRAINT fk_table_modereglement_so_numero;
ALTER TABLE "table_moderepartition"
  DROP CONSTRAINT fk_table_moderepartition_cg_numero;
ALTER TABLE "table_moderepartition"
  DROP CONSTRAINT fk_table_moderepartition_so_numero;
ALTER TABLE "table_moderepartition"
  DROP CONSTRAINT fk_table_moderepartition_mp_societe;
ALTER TABLE "table_modele"
  DROP CONSTRAINT fk_table_modele_so_numero;
ALTER TABLE "table_observation"
  DROP CONSTRAINT fk_table_observation_pe_numero;
ALTER TABLE "table_periodeadherence"
  DROP CONSTRAINT fk_table_periodeadherence_po_numero;
ALTER TABLE "table_periodeadherence"
  DROP CONSTRAINT fk_table_periodeadherence_ah_numero;
ALTER TABLE "table_personne"
  DROP CONSTRAINT fk_table_personne_tp_numero;
ALTER TABLE "table_personne"
  DROP CONSTRAINT fk_table_personne_np_numero;
ALTER TABLE "table_piece"
  DROP CONSTRAINT fk_table_piece_jo_numero;
ALTER TABLE "table_piece"
  DROP CONSTRAINT fk_table_piece_ex_numero;
ALTER TABLE "table_prix"
  DROP CONSTRAINT fk_table_prix_tv_numero;
ALTER TABLE "table_prix"
  DROP CONSTRAINT fk_table_prix_pd_numero;
ALTER TABLE "table_produit"
  DROP CONSTRAINT fk_table_produit_jo_numero;
ALTER TABLE "table_produit"
  DROP CONSTRAINT fk_table_produit_so_numero;
ALTER TABLE "table_reglement"
  DROP CONSTRAINT fk_table_reglement_pe_numero;
ALTER TABLE "table_reglement"
  DROP CONSTRAINT fk_table_reglement_em_numero;
ALTER TABLE "table_reglement"
  DROP CONSTRAINT fk_table_reglement_lr_numero;
ALTER TABLE "table_reglement"
  DROP CONSTRAINT fk_table_reglement_mr_numero;
ALTER TABLE "table_reglement"
  DROP CONSTRAINT fk_table_reglement_so_numero;
ALTER TABLE "table_repartition"
  DROP CONSTRAINT fk_table_repartition_rg_numero;
ALTER TABLE "table_repartition"
  DROP CONSTRAINT fk_table_repartition_mp_numero;
ALTER TABLE "table_routage"
  DROP CONSTRAINT fk_table_routage_ad_numero;
ALTER TABLE "table_routage"
  DROP CONSTRAINT fk_table_routage_pe_numero;
ALTER TABLE "table_routage"
  DROP CONSTRAINT fk_table_routage_fa_numero;
ALTER TABLE "table_sequencecache"
  DROP CONSTRAINT fk_table_sequencecache_sq_numero;
ALTER TABLE "table_service"
  DROP CONSTRAINT fk_table_service_se_societe;
ALTER TABLE "table_service"
  DROP CONSTRAINT fk_table_service_se_agent;
ALTER TABLE "table_societe"
  DROP CONSTRAINT fk_table_societe_pe_numero;
ALTER TABLE "table_societe"
  DROP CONSTRAINT fk_table_societe_ts_numero;
ALTER TABLE "table_societe"
  DROP CONSTRAINT fk_table_societe_sq_numero;
ALTER TABLE "table_sujet"
  DROP CONSTRAINT fk_table_sujet_zu_numero;
ALTER TABLE "table_tva"
  DROP CONSTRAINT fk_table_tva_so_numero;
ALTER TABLE "table_tva"
  DROP CONSTRAINT fk_table_tva_cg_numero;
ALTER TABLE "table_ville"
  DROP CONSTRAINT fk_table_ville_ct_numero;
ALTER TABLE "table_villecp"
  DROP CONSTRAINT fk_table_villecp_vi_numero;
ALTER TABLE "table_villecp"
  DROP CONSTRAINT fk_table_villecp_cp_numero;

-- Suppression des tables
DROP TABLE "table_acces" CASCADE;
DROP TABLE "table_activite" CASCADE;
DROP TABLE "table_adherence" CASCADE;
DROP TABLE "table_adhesion" CASCADE;
DROP TABLE "table_adresse" CASCADE;
DROP TABLE "table_adresseversion" CASCADE;
DROP TABLE "table_agent" CASCADE;
DROP TABLE "table_appartienta" CASCADE;
DROP TABLE "table_appel" CASCADE;
DROP TABLE "table_attribut" CASCADE;
DROP TABLE "table_avoir" CASCADE;
DROP TABLE "table_canton" CASCADE;
DROP TABLE "table_categorie" CASCADE;
DROP TABLE "table_codepostal" CASCADE;
DROP TABLE "table_compteaux" CASCADE;
DROP TABLE "table_comptegen" CASCADE;
DROP TABLE "table_compteproduit" CASCADE;
DROP TABLE "table_constante" CASCADE;
DROP TABLE "table_contact" CASCADE;
DROP TABLE "table_contacttype" CASCADE;
DROP TABLE "table_contactversion" CASCADE;
DROP TABLE "table_cotisation" CASCADE;
DROP TABLE "table_devis" CASCADE;
DROP TABLE "table_droit" CASCADE;
DROP TABLE "table_droitprofil" CASCADE;
DROP TABLE "table_ecriture" CASCADE;
DROP TABLE "table_employe" CASCADE;
DROP TABLE "table_equipe" CASCADE;
DROP TABLE "table_estlie" CASCADE;
DROP TABLE "table_estresponsable" CASCADE;
DROP TABLE "table_evoplus" CASCADE;
DROP TABLE "table_exercice" CASCADE;
DROP TABLE "table_facture" CASCADE;
DROP TABLE "table_facturereglement" CASCADE;
DROP TABLE "table_groupe" CASCADE;
DROP TABLE "table_groupecanton" CASCADE;
DROP TABLE "table_groupetable" CASCADE;
DROP TABLE "table_impression" CASCADE;
DROP TABLE "table_impressiondocument" CASCADE;
DROP TABLE "table_impressiongroupe" CASCADE;
DROP TABLE "table_impressionlot" CASCADE;
DROP TABLE "table_journal" CASCADE;
DROP TABLE "table_lettrage" CASCADE;
DROP TABLE "table_lieu" CASCADE;
DROP TABLE "table_ligne" CASCADE;
DROP TABLE "table_ligneavoir" CASCADE;
DROP TABLE "table_lignecotisation" CASCADE;
DROP TABLE "table_lignefacture" CASCADE;
DROP TABLE "table_lignemodele" CASCADE;
DROP TABLE "table_listereglement" CASCADE;
DROP TABLE "table_modereglement" CASCADE;
DROP TABLE "table_moderepartition" CASCADE;
DROP TABLE "table_modele" CASCADE;
DROP TABLE "table_naturepersonne" CASCADE;
DROP TABLE "table_nonadherent" CASCADE;
DROP TABLE "table_observation" CASCADE;
DROP TABLE "table_periode" CASCADE;
DROP TABLE "table_periodeadherence" CASCADE;
DROP TABLE "table_personne" CASCADE;
DROP TABLE "table_personneupdate" CASCADE;
DROP TABLE "table_piece" CASCADE;
DROP TABLE "table_pointage" CASCADE;
DROP TABLE "table_prefixe" CASCADE;
DROP TABLE "table_prix" CASCADE;
DROP TABLE "table_produit" CASCADE;
DROP TABLE "table_reglement" CASCADE;
DROP TABLE "table_repartition" CASCADE;
DROP TABLE "table_responsabilite" CASCADE;
DROP TABLE "table_routage" CASCADE;
DROP TABLE "table_sequence" CASCADE;
DROP TABLE "table_sequencecache" CASCADE;
DROP TABLE "table_service" CASCADE;
DROP TABLE "table_societe" CASCADE;
DROP TABLE "table_sujet" CASCADE;
DROP TABLE "table_tache" CASCADE;
DROP TABLE "table_tva" CASCADE;
DROP TABLE "table_typeadresse" CASCADE;
DROP TABLE "table_typeattribut" CASCADE;
DROP TABLE "table_typejournal" CASCADE;
DROP TABLE "table_typelien" CASCADE;
DROP TABLE "table_typepersonne" CASCADE;
DROP TABLE "table_typesociete" CASCADE;
DROP TABLE "table_typesujet" CASCADE;
DROP TABLE "table_typetache" CASCADE;
DROP TABLE "table_ville" CASCADE;
DROP TABLE "table_villecp" CASCADE;

-- Creation des sequences
CREATE SEQUENCE "seq_acces" START 100;
CREATE SEQUENCE "seq_activite" START 100;
CREATE SEQUENCE "seq_adherence" START 100;
CREATE SEQUENCE "seq_adhesion" START 100;
CREATE SEQUENCE "seq_adresse" START 1000000;
CREATE SEQUENCE "seq_adresseversion" START 100;
CREATE SEQUENCE "seq_agent" START 100;
CREATE SEQUENCE "seq_appel" START 100;
CREATE SEQUENCE "seq_attribut" START 100;
CREATE SEQUENCE "seq_avoir" START 100;
CREATE SEQUENCE "seq_canton" START 1000000;
CREATE SEQUENCE "seq_categorie" START 100;
CREATE SEQUENCE "seq_codepostal" START 1000000;
CREATE SEQUENCE "seq_compteaux" START 100;
CREATE SEQUENCE "seq_comptegen" START 100;
CREATE SEQUENCE "seq_compteproduit" START 100;
CREATE SEQUENCE "seq_constante" START 1000;
CREATE SEQUENCE "seq_contact" START 1000000;
CREATE SEQUENCE "seq_contacttype" START 100;
CREATE SEQUENCE "seq_contactversion" START 100;
CREATE SEQUENCE "seq_devis" START 100;
CREATE SEQUENCE "seq_droit" START 100;
CREATE SEQUENCE "seq_droitprofil" START 100;
CREATE SEQUENCE "seq_ecriture" START 100;
CREATE SEQUENCE "seq_employe" START 100;
CREATE SEQUENCE "seq_equipe" START 100;
CREATE SEQUENCE "seq_estlie" START 100;
CREATE SEQUENCE "seq_estresponsable" START 1000000;
CREATE SEQUENCE "seq_exercice" START 100;
CREATE SEQUENCE "seq_facture" START 100;
CREATE SEQUENCE "seq_facturereglement" START 100;
CREATE SEQUENCE "seq_groupe" START 100;
CREATE SEQUENCE "seq_groupecanton" START 100;
CREATE SEQUENCE "seq_groupetable" START 100;
CREATE SEQUENCE "seq_impression" START 100;
CREATE SEQUENCE "seq_journal" START 100;
CREATE SEQUENCE "seq_lettrage" START 100;
CREATE SEQUENCE "seq_lieu" START 100;
CREATE SEQUENCE "seq_ligne" START 100;
CREATE SEQUENCE "seq_ligneavoir" START 100;
CREATE SEQUENCE "seq_lignefacture" START 100;
CREATE SEQUENCE "seq_lignemodele" START 100;
CREATE SEQUENCE "seq_listereglement" START 100;
CREATE SEQUENCE "seq_modele" START 100;
CREATE SEQUENCE "seq_modereglement" START 100;
CREATE SEQUENCE "seq_moderepartition" START 100;
CREATE SEQUENCE "seq_naturepersonne" START 10;
CREATE SEQUENCE "seq_nonadherent" START 100;
CREATE SEQUENCE "seq_observation" START 100;
CREATE SEQUENCE "seq_periode" START 100;
CREATE SEQUENCE "seq_personne" START 1017666;
CREATE SEQUENCE "seq_personneupdate" START 1;
CREATE SEQUENCE "seq_piece" START 100;
CREATE SEQUENCE "seq_pointage" START 100;
CREATE SEQUENCE "seq_prefixe" START 100;
CREATE SEQUENCE "seq_prix" START 100;
CREATE SEQUENCE "seq_produit" START 100;
CREATE SEQUENCE "seq_reglement" START 100;
CREATE SEQUENCE "seq_repartition" START 100;
CREATE SEQUENCE "seq_responsabilite" START 1000000;
CREATE SEQUENCE "seq_routage" START 1000000;
CREATE SEQUENCE "seq_service" START 100;
CREATE SEQUENCE "seq_societe" START 100;
CREATE SEQUENCE "seq_sujet" START 100;
CREATE SEQUENCE "seq_tache" START 100;
CREATE SEQUENCE "seq_tva" START 1000000;
CREATE SEQUENCE "seq_typeadresse" START 100;
CREATE SEQUENCE "seq_typeattribut" START 100;
CREATE SEQUENCE "seq_typejournal" START 100;
CREATE SEQUENCE "seq_typelien" START 1000;
CREATE SEQUENCE "seq_typepersonne" START 1000000;
CREATE SEQUENCE "seq_typesociete" START 100;
CREATE SEQUENCE "seq_typesujet" START 100;
CREATE SEQUENCE "seq_typetache" START 100;
CREATE SEQUENCE "seq_ville" START 1000000;

-- Creation des tables
CREATE TABLE "table_societe"
(
  "so_numero" INTEGER,
  "so_libelle" VARCHAR(64) UNIQUE,
  "so_abbrev" VARCHAR(3) UNIQUE,
  "pe_numero" INTEGER,
  "so_detail" VARCHAR,
  "so_sequence" VARCHAR(32),
  "ts_numero" INTEGER,
  "sq_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_droit"
(
  "dr_numero" INTEGER,
  "dp_numero" INTEGER,
  "gt_numero" INTEGER,
  "dr_select" BOOLEAN,
  "dr_insert" BOOLEAN,
  "dr_update" BOOLEAN,
  "dr_delete" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_service"
(
  "se_numero" INTEGER,
  "se_nom" VARCHAR,
  "se_societe" INTEGER,
  "se_agent" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_groupetable"
(
  "gt_numero" INTEGER,
  "gt_libelle" VARCHAR(64),
  "gt_tables" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_employe"
(
  "em_numero" INTEGER,
  "dp_numero" INTEGER,
  "em_emploi" VARCHAR,
  "em_service" INTEGER,
  "em_agent" INTEGER,
  "em_login" VARCHAR,
  "em_reglement" BOOLEAN,
  "em_self_invoicing" BOOLEAN,
  "em_service_invoicing" BOOLEAN,
  "em_societe_invoicing" BOOLEAN,
  "em_personne_editing" BOOLEAN,
  "em_acces" INTEGER,
  "em_password" VARCHAR(16),
  "em_super" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_constante"
(
  "cs_numero" INTEGER,
  "cs_type" INTEGER,
  "cs_valeur" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typeadresse"
(
  "ak_numero" INTEGER,
  "ak_nom" VARCHAR(32) UNIQUE,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_adresse"
(
  "ad_numero" INTEGER,
  "ak_numero" INTEGER,
  "cp_numero" INTEGER,
  "vi_numero" INTEGER,
  "pe_numero" INTEGER,
  "ad_active" BOOLEAN,
  "ad_ligne2" VARCHAR(38),
  "ad_ligne3" VARCHAR(38),
  "ad_ligne4" VARCHAR(38),
  "ad_ligne5" VARCHAR(38),
  "ad_datestop" DATE,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_adresseversion"
(
  "aw_numero" INTEGER,
  "ad_numero" INTEGER,
  "ak_numero" INTEGER,
  "cp_numero" INTEGER,
  "vi_numero" INTEGER,
  "pe_numero" INTEGER,
  "aw_ligne2" VARCHAR(38),
  "aw_ligne3" VARCHAR(38),
  "aw_ligne4" VARCHAR(38),
  "aw_ligne5" VARCHAR(38),
  "version" INTEGER,
  "operation" VARCHAR(16),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_canton"
(
  "ct_numero" INTEGER,
  "ct_nom" VARCHAR(128),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_appartienta"
(
  "ct_numero" INTEGER,
  "gc_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL,
  PRIMARY KEY (CT_Numero, GC_Numero)
);

CREATE TABLE "table_groupecanton"
(
  "gc_numero" INTEGER,
  "gc_nom" VARCHAR(128),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_codepostal"
(
  "cp_numero" INTEGER,
  "cp_codepostal" VARCHAR(12),
  "cp_bureau" VARCHAR(128),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_villecp"
(
  "vi_numero" INTEGER,
  "cp_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL,
  PRIMARY KEY (VI_Numero, CP_Numero)
);

CREATE TABLE "table_ville"
(
  "vi_numero" INTEGER,
  "vi_nom" VARCHAR(128),
  "ct_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_contacttype"
(
  "ck_numero" INTEGER,
  "ck_code" VARCHAR(4) UNIQUE,
  "ck_nom" VARCHAR(64) UNIQUE,
  "ck_number" BOOLEAN,
  "ck_email" BOOLEAN,
  "ck_url" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_contact"
(
  "cn_numero" INTEGER,
  "cn_coordonnee" VARCHAR(255),
  "cn_actif" BOOLEAN,
  "ck_numero" INTEGER,
  "pe_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_contactversion"
(
  "cw_numero" INTEGER,
  "cw_coordonnee" VARCHAR(255),
  "ck_numero" INTEGER,
  "pe_numero" INTEGER,
  "cn_numero" INTEGER,
  "version" INTEGER,
  "operation" VARCHAR(16),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typelien"
(
  "tl_numero" INTEGER,
  "tl_code" VARCHAR(8),
  "tl_libelle" VARCHAR(64) UNIQUE,
  "tl_action12" VARCHAR(128),
  "tl_action21" VARCHAR(128),
  "tl_description" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_estlie"
(
  "el_numero" INTEGER,
  "el_personne1" INTEGER,
  "el_personne2" INTEGER,
  "el_actif" BOOLEAN,
  "tl_numero" INTEGER,
  "tl_code" VARCHAR(8),
  "el_debut" TIMESTAMP,
  "el_fin" TIMESTAMP,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_naturepersonne"
(
  "np_numero" INTEGER,
  "np_nom" VARCHAR(64) UNIQUE,
  "np_abrev" VARCHAR(32),
  "np_titre" VARCHAR(32),
  "np_morale" BOOLEAN,
  "np_avectitre" BOOLEAN,
  "np_inclu" BOOLEAN,
  "np_temporaire" BOOLEAN,
  "np_genre" VARCHAR(16),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_personne"
(
  "pe_numero" INTEGER,
  "pe_id" INTEGER,
  "tp_numero" INTEGER,
  "np_numero" INTEGER,
  "pe_titre" VARCHAR(32),
  "pe_nom" VARCHAR(48),
  "pe_regimefiscal" VARCHAR(32),
  "pe_actif" BOOLEAN,
  "pe_morale" BOOLEAN,
  "deleted" BOOLEAN,
  "pe_prenom" VARCHAR(32),
  "pe_motdepasse" VARCHAR(32),
  "pe_naissance" DATE,
  "pe_numtvaic" VARCHAR(32),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_personneupdate"
(
  "pu_numero" INTEGER,
  "pu_action" VARCHAR(10),
  "pu_bilan" VARCHAR,
  "pe_numero" INTEGER,
  "tp_numero" INTEGER,
  "pe_titre" VARCHAR(32),
  "pe_nom" VARCHAR(512),
  "pe_regimefiscal" VARCHAR(32),
  "pe_morale" BOOLEAN,
  "pe_prenom" VARCHAR(32),
  "pe_naissance" DATE,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_estresponsable"
(
  "peac_numero" INTEGER,
  "pe_numero" INTEGER,
  "re_numero" INTEGER,
  "peac_periodedebut" DATE,
  "peac_periodefin" DATE,
  "peac_titre" VARCHAR(32),
  "peac_fini" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_responsabilite"
(
  "re_numero" INTEGER,
  "re_code" VARCHAR(32) UNIQUE,
  "re_nom" VARCHAR(32),
  "re_famille" VARCHAR(32),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_attribut"
(
  "at_numero" INTEGER,
  "pe_numero" INTEGER,
  "ta_numero" INTEGER,
  "cr_numero" INTEGER,
  "at_valeur" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typeattribut"
(
  "ta_numero" INTEGER,
  "ta_nom" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_categorie"
(
  "cr_numero" INTEGER,
  "cr_libelle" VARCHAR(64),
  "ta_numero" INTEGER,
  "cr_description" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_tva"
(
  "tv_numero" INTEGER,
  "tv_code" INTEGER,
  "tv_taux" NUMERIC,
  "tv_actif" BOOLEAN,
  "so_numero" INTEGER,
  "cg_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typepersonne"
(
  "tp_numero" INTEGER,
  "tp_type" VARCHAR(32) UNIQUE,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typetache"
(
  "th_numero" INTEGER,
  "th_libelle" VARCHAR,
  "th_description" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_appel"
(
  "ap_numero" INTEGER,
  "ap_libelle" VARCHAR,
  "th_numero" INTEGER,
  "ap_date" DATE,
  "ap_description" VARCHAR,
  "ap_duree" NUMERIC,
  "pe_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typesociete"
(
  "ts_numero" INTEGER,
  "ts_libelle" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_adherence"
(
  "ah_numero" INTEGER,
  "pd_numero" INTEGER,
  "ah_libelle" VARCHAR,
  "ah_reduction" NUMERIC,
  "ah_cascade" BOOLEAN,
  "tl_numero" INTEGER,
  "ah_liendirect" BOOLEAN,
  "ah_lienindirect" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_periodeadherence"
(
  "po_numero" INTEGER,
  "ah_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL,
  PRIMARY KEY (PO_Numero, AH_Numero)
);

CREATE TABLE "table_adhesion"
(
  "as_numero" INTEGER,
  "as_reductionmax" NUMERIC,
  "pe_numero" INTEGER,
  "po_numero" INTEGER,
  "ah_numero" INTEGER,
  "fa_numero" INTEGER,
  "lf_numero" INTEGER,
  "as_origine" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_periode"
(
  "po_numero" INTEGER,
  "po_debut" DATE,
  "po_fin" DATE,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_observation"
(
  "ob_numero" INTEGER,
  "pe_numero" INTEGER,
  "ob_observation" VARCHAR,
  "ob_niveau" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typejournal"
(
  "tj_numero" INTEGER,
  "tj_libelle" VARCHAR(32),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_modele"
(
  "mo_numero" INTEGER,
  "mo_libelle" VARCHAR(64),
  "so_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_lignemodele"
(
  "lm_numero" INTEGER,
  "pd_numero" INTEGER,
  "mo_numero" INTEGER,
  "lm_quantite" NUMERIC,
  "lm_montantht" NUMERIC(16,2),
  "lm_montantttc" NUMERIC(16,2),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_produit"
(
  "pd_numero" INTEGER,
  "pd_id" SERIAL,
  "pd_libelle" VARCHAR,
  "pd_titre" VARCHAR(64),
  "jo_numero" INTEGER,
  "so_numero" INTEGER,
  "pd_actif" BOOLEAN,
  "pd_sansquantite" BOOLEAN,
  "pd_reduction" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_prix"
(
  "px_numero" INTEGER,
  "tv_numero" INTEGER,
  "pd_numero" INTEGER,
  "px_tarifht" NUMERIC(16,4),
  "px_tarifttc" NUMERIC(16,4),
  "px_actif" BOOLEAN,
  "px_datedebut" TIMESTAMP,
  "px_datefin" TIMESTAMP,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_ligne"
(
  "l_numero" INTEGER,
  "pd_numero" INTEGER,
  "de_numero" INTEGER,
  "l_quantite" NUMERIC(16,4),
  "l_montantht" NUMERIC(16,2),
  "l_montantttc" NUMERIC(16,2),
  "px_numero" INTEGER,
  "l_notes" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_devis"
(
  "de_numero" INTEGER,
  "pe_numero" INTEGER,
  "so_numero" INTEGER,
  "de_date" DATE,
  "de_libelle" VARCHAR,
  "de_reduction" NUMERIC,
  "de_montantht" NUMERIC(16,2),
  "de_montantttc" NUMERIC(16,2),
  "em_numero" INTEGER,
  "de_locked" BOOLEAN,
  "de_acompte" BOOLEAN,
  "de_lettre" BOOLEAN,
  "de_civilites" VARCHAR,
  "de_introduction" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_lignefacture"
(
  "lf_numero" INTEGER,
  "fa_numero" INTEGER,
  "px_numero" INTEGER,
  "pd_numero" INTEGER,
  "lf_quantite" NUMERIC,
  "lf_montantht" NUMERIC(16,2),
  "lf_montantttc" NUMERIC(16,2),
  "lf_notes" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_facture"
(
  "fa_numero" INTEGER,
  "de_numero" INTEGER,
  "pe_numero" INTEGER,
  "ag_numero" INTEGER,
  "fa_numfact" INTEGER,
  "fa_date" DATE,
  "fa_perte" BOOLEAN,
  "fa_reduction" NUMERIC,
  "fa_montantht" NUMERIC(16,2),
  "fa_montantttc" NUMERIC(16,2),
  "fa_accompte" NUMERIC(16,2),
  "fa_annotation" TEXT,
  "fa_libelle" TEXT,
  "so_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_ligneavoir"
(
  "la_numero" INTEGER,
  "pd_numero" INTEGER,
  "av_numero" INTEGER,
  "px_numero" INTEGER,
  "la_quantite" NUMERIC,
  "la_montantht" NUMERIC(16,2),
  "la_montantttc" NUMERIC(16,2),
  "la_notes" TEXT,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_avoir"
(
  "av_numero" INTEGER,
  "pe_numero" INTEGER,
  "fa_numero" INTEGER,
  "av_numfact" INTEGER,
  "av_date" DATE,
  "av_montantht" NUMERIC(16,2),
  "av_montantttc" NUMERIC(16,2),
  "av_reduction" NUMERIC,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_routage"
(
  "ro_numero" INTEGER,
  "ad_numero" INTEGER,
  "pe_numero" INTEGER,
  "ro_debutservice" INTEGER,
  "ro_finservice" INTEGER,
  "ro_quantite" INTEGER,
  "ro_suspendu" BOOLEAN,
  "ro_dernierroute" INTEGER,
  "fa_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER
);

CREATE TABLE "table_agent"
(
  "ag_numero" INTEGER,
  "ag_nom" VARCHAR(64),
  "ag_prenom" VARCHAR(64),
  "ag_initiales" VARCHAR(8) UNIQUE,
  "ag_actif" BOOLEAN,
  "eq_numero" INTEGER,
  "ag_role" VARCHAR(128),
  "ag_telephone" VARCHAR(16),
  "ag_mobile" VARCHAR(16),
  "ag_email" VARCHAR(64),
  "ag_commentaire" VARCHAR(128),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_equipe"
(
  "eq_numero" INTEGER,
  "eq_nom" VARCHAR(64),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_exercice"
(
  "ex_numero" INTEGER,
  "so_numero" INTEGER,
  "ex_datedebut" DATE,
  "ex_datefin" DATE,
  "ex_cloture" BOOLEAN,
  "ex_password" VARCHAR,
  "ex_compteattente" INTEGER,
  "ex_actif" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_journal"
(
  "jo_numero" INTEGER,
  "jo_abbrev" VARCHAR(4),
  "jo_libelle" VARCHAR,
  "jo_debit" NUMERIC,
  "jo_credit" NUMERIC,
  "so_numero" INTEGER,
  "tj_numero" INTEGER,
  "cg_numero" INTEGER,
  "jo_mois" INTEGER,
  "jo_annee" INTEGER,
  "jo_contrepartie" BOOLEAN,
  "jo_provisoire" BOOLEAN,
  "jo_visible" BOOLEAN,
  "jo_sequence" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_piece"
(
  "pi_numero" INTEGER,
  "jo_numero" INTEGER,
  "pi_numpiece" INTEGER,
  "ex_numero" INTEGER,
  "pi_libelle" VARCHAR,
  "pi_debit" NUMERIC,
  "pi_credit" NUMERIC,
  "pi_date" DATE,
  "pi_numseq" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_ecriture"
(
  "ec_numero" INTEGER,
  "ec_numecriture" INTEGER,
  "pi_numero" INTEGER,
  "ex_numero" INTEGER,
  "cg_numero" INTEGER,
  "ca_numero" INTEGER,
  "ec_aux" BOOLEAN CHECK(CG_Numero IS NOT NULL AND NOT EC_Aux OR CA_Numero IS NOT NULL AND EC_Aux),
  "pf_numero" INTEGER,
  "ec_compte" VARCHAR(16),
  "ec_libelle" VARCHAR,
  "ec_debit" NUMERIC,
  "ec_credit" NUMERIC,
  "pt_numero" INTEGER,
  "av_numero" INTEGER,
  "lt_numero" INTEGER,
  "db_numero" INTEGER,
  "rg_numero" INTEGER,
  "fa_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_comptegen"
(
  "cg_numero" INTEGER,
  "cg_numcompte" INTEGER,
  "cg_libelle" VARCHAR,
  "ac_numero" INTEGER,
  "cg_accepteaux" BOOLEAN,
  "cg_utilisable" BOOLEAN,
  "cg_lettrable" BOOLEAN,
  "cg_pointable" BOOLEAN,
  "so_numero" INTEGER,
  "cg_groupable" BOOLEAN,
  "cg_debit" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_compteproduit"
(
  "ci_numero" INTEGER,
  "pd_numero" INTEGER,
  "cg_numero" INTEGER,
  "ci_actif" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_compteaux"
(
  "ca_numero" INTEGER,
  "cg_numero" INTEGER,
  "ca_numcompte" VARCHAR,
  "ca_libelle" VARCHAR,
  "ac_numero" INTEGER,
  "ca_debit" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_acces"
(
  "ac_numero" INTEGER,
  "ac_libelle" VARCHAR(64),
  "ac_niveau" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_pointage"
(
  "pt_numero" INTEGER,
  "pt_date" DATE,
  "pt_releve" VARCHAR,
  "pt_debit" NUMERIC,
  "pt_credit" NUMERIC,
  "so_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_lettrage"
(
  "lt_numero" INTEGER,
  "lt_lettre" VARCHAR(10),
  "so_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_prefixe"
(
  "pf_numero" INTEGER,
  "pf_nom" VARCHAR(8),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_facturereglement"
(
  "fr_numero" INTEGER,
  "rg_numero" INTEGER,
  "fa_numero" INTEGER,
  "fr_acompte" BOOLEAN,
  "fr_partiel" BOOLEAN,
  "fr_montant" NUMERIC,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_modereglement"
(
  "mr_numero" INTEGER,
  "mr_libelle" VARCHAR(64),
  "mr_compte" VARCHAR(64),
  "cg_numero" INTEGER,
  "so_numero" INTEGER,
  "mr_cheque" BOOLEAN,
  "mr_actif" BOOLEAN,
  "mr_description" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_listereglement"
(
  "lr_numero" INTEGER,
  "lr_indice" INTEGER,
  "lr_commentaire" TEXT,
  "em_numero" INTEGER,
  "lr_montant" NUMERIC,
  "lr_date" DATE,
  "mr_numero" INTEGER,
  "so_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_reglement"
(
  "rg_numero" INTEGER,
  "pe_numero" INTEGER,
  "rg_montant" NUMERIC,
  "rg_date" DATE,
  "em_numero" INTEGER,
  "lr_numero" INTEGER,
  "mr_numero" INTEGER,
  "so_numero" INTEGER,
  "rg_encompta" BOOLEAN,
  "rg_libellebanque" VARCHAR(32),
  "rg_numerocompte" VARCHAR(32),
  "rg_reference" VARCHAR(32),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_moderepartition"
(
  "mp_numero" INTEGER,
  "mp_libelle" VARCHAR(64),
  "cg_numero" INTEGER,
  "so_numero" INTEGER,
  "mp_actif" BOOLEAN,
  "mp_societe" INTEGER,
  "mp_description" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_repartition"
(
  "rp_numero" INTEGER,
  "rg_numero" INTEGER,
  "mp_numero" INTEGER,
  "rp_montant" NUMERIC,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_impression"
(
  "im_numero" INTEGER,
  "im_libelle" VARCHAR(64),
  "im_nom" VARCHAR(32),
  "im_societe" INTEGER,
  "im_modele" VARCHAR,
  "im_defaut" BOOLEAN,
  "im_keytable" VARCHAR(32),
  "im_keycle" VARCHAR(32),
  "im_keydate" VARCHAR(32),
  "im_fonction" VARCHAR(64),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_impressionlot"
(
  "il_numero" SERIAL,
  "il_nom" VARCHAR(32),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_impressiongroupe"
(
  "ig_numero" SERIAL,
  "il_numero" INTEGER,
  "ig_date" VARCHAR(32),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_impressiondocument"
(
  "id_numero" SERIAL,
  "ig_numero" INTEGER,
  "id_cle" VARCHAR(32),
  "id_modele" VARCHAR(32),
  "id_filename" VARCHAR(512),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_cotisation"
(
  "cs_numero" SERIAL,
  "pe_numero" INTEGER,
  "cs_societe" INTEGER,
  "ig_numero" INTEGER,
  "cs_standard" BOOLEAN,
  "cs_annee" INTEGER,
  "cs_detail" TEXT,
  "cs_duo" BOOLEAN,
  "cs_done" BOOLEAN,
  "cs_valid" BOOLEAN,
  "cs_report" TEXT,
  "cs_nature" VARCHAR(16),
  "cs_montant" NUMERIC(16,2),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_lignecotisation"
(
  "lc_numero" SERIAL,
  "cs_numero" INTEGER,
  "key" VARCHAR(255),
  "value" TEXT,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_droitprofil"
(
  "dp_numero" INTEGER,
  "dp_libelle" VARCHAR(64) UNIQUE,
  "dp_notes" VARCHAR,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_activite"
(
  "za_numero" INTEGER,
  "za_heuredebut" TIME,
  "za_heurefin" TIME,
  "za_date" DATE,
  "za_duree" INTEGER,
  "em_numero" INTEGER,
  "zt_numero" INTEGER,
  "zs_numero" INTEGER,
  "zl_numero" INTEGER,
  "za_pour" VARCHAR(256),
  "za_qui" INTEGER,
  "za_champ" VARCHAR,
  "fa_numero" INTEGER,
  "de_numero" INTEGER,
  "pe_numero" INTEGER,
  "zg_numero" INTEGER,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_tache"
(
  "zt_numero" INTEGER,
  "zt_libelle" VARCHAR(128) UNIQUE,
  "zt_phrase" VARCHAR(128) UNIQUE,
  "zt_notes" VARCHAR(1024),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_typesujet"
(
  "zu_numero" INTEGER,
  "zu_libelle" VARCHAR(128) UNIQUE,
  "zu_notes" VARCHAR(1024),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_sujet"
(
  "zs_numero" INTEGER,
  "zs_libelle" VARCHAR(128) UNIQUE,
  "zu_numero" INTEGER,
  "zs_notes" VARCHAR(1024),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_lieu"
(
  "zl_numero" INTEGER,
  "zl_libelle" VARCHAR(128) UNIQUE,
  "zl_notes" VARCHAR(1024),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_groupe"
(
  "zg_numero" INTEGER,
  "zg_libelle" VARCHAR(128) UNIQUE,
  "zg_notes" VARCHAR(1024),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_nonadherent"
(
  "na_numero" INTEGER,
  "pe_numero" INTEGER,
  "na_titre" VARCHAR(8),
  "na_nom" VARCHAR(32),
  "na_prenom" VARCHAR(32),
  "na_adresse1" VARCHAR(38),
  "na_adresse2" VARCHAR(38),
  "na_cp" VARCHAR(5),
  "na_ville" VARCHAR(32),
  "na_tel" VARCHAR(128),
  "na_date" DATE,
  "na_na" BOOLEAN,
  "ag_numero" INTEGER,
  "na_raison" VARCHAR(256),
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_sequence"
(
  "sq_numero" SERIAL,
  "sq_nom" VARCHAR(64) UNIQUE,
  "sq_last" INTEGER,
  "sq_nombre" INTEGER,
  "sq_used_on" TIMESTAMP,
  "sq_clear_cache" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_sequencecache"
(
  "sc_numero" SERIAL,
  "sq_numero" INTEGER,
  "sc_valeur" INTEGER,
  "sc_locked" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR(32),
  "lock_version" INTEGER,
  "id" SERIAL
);

CREATE TABLE "table_evoplus"
(
  "source" TEXT,
  "numero" TEXT,
  "titre" TEXT,
  "nom" TEXT,
  "complement" TEXT,
  "ad1" TEXT,
  "ad2" TEXT,
  "ad3" TEXT,
  "cp" TEXT,
  "ville" TEXT,
  "naissance" TEXT,
  "telephone" TEXT,
  "fax" TEXT,
  "portable" TEXT,
  "qualification" TEXT,
  "base_ht" TEXT,
  "productions" TEXT,
  "fuel_m3" TEXT,
  "eco_fuel" TEXT,
  "eco_fuel_tipp" TEXT,
  "hectares_nb" TEXT,
  "salaries_nb" TEXT,
  "sacea_ttc" TEXT,
  "h1_ha" TEXT,
  "h1_ht" TEXT,
  "h2_ha" TEXT,
  "h2_ht" TEXT,
  "empty_ab" TEXT,
  "h3_ha" TEXT,
  "h3_ht" TEXT,
  "empty_ae" TEXT,
  "h4_ha" TEXT,
  "h4_ht" TEXT,
  "empty_ah" TEXT,
  "h5_ha" TEXT,
  "h5_ht" TEXT,
  "empty_ak" TEXT,
  "h6_ha" TEXT,
  "h6_ht" TEXT,
  "empty_an" TEXT,
  "cm_nb" TEXT,
  "cm_ht" TEXT,
  "cm_noms" TEXT,
  "opt1" TEXT,
  "opt2" TEXT,
  "opt3" TEXT,
  "opt4" TEXT,
  "opt_num" INTEGER,
  "opt_ttc" TEXT,
  "statut" TEXT,
  "remarque" TEXT,
  "proposition" BOOLEAN,
  "aava" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR(32),
  "filename" VARCHAR(512),
  "pe_numero" INTEGER,
  "lot" INTEGER,
  "id" SERIAL
);


---- Tables
REVOKE ALL ON "table_constante" FROM PUBLIC;
REVOKE ALL ON "table_typeadresse" FROM PUBLIC;
REVOKE ALL ON "table_adresse" FROM PUBLIC;
REVOKE ALL ON "table_adresseversion" FROM PUBLIC;
REVOKE ALL ON "table_canton" FROM PUBLIC;
REVOKE ALL ON "table_appartienta" FROM PUBLIC;
REVOKE ALL ON "table_groupecanton" FROM PUBLIC;
REVOKE ALL ON "table_codepostal" FROM PUBLIC;
REVOKE ALL ON "table_villecp" FROM PUBLIC;
REVOKE ALL ON "table_ville" FROM PUBLIC;
REVOKE ALL ON "table_contacttype" FROM PUBLIC;
REVOKE ALL ON "table_contact" FROM PUBLIC;
REVOKE ALL ON "table_contactversion" FROM PUBLIC;
REVOKE ALL ON "table_typelien" FROM PUBLIC;
REVOKE ALL ON "table_estlie" FROM PUBLIC;
REVOKE ALL ON "table_naturepersonne" FROM PUBLIC;
REVOKE ALL ON "table_personne" FROM PUBLIC;
REVOKE ALL ON "table_personneupdate" FROM PUBLIC;
REVOKE ALL ON "table_estresponsable" FROM PUBLIC;
REVOKE ALL ON "table_responsabilite" FROM PUBLIC;
REVOKE ALL ON "table_attribut" FROM PUBLIC;
REVOKE ALL ON "table_typeattribut" FROM PUBLIC;
REVOKE ALL ON "table_categorie" FROM PUBLIC;
REVOKE ALL ON "table_tva" FROM PUBLIC;
REVOKE ALL ON "table_typepersonne" FROM PUBLIC;
REVOKE ALL ON "table_typetache" FROM PUBLIC;
REVOKE ALL ON "table_appel" FROM PUBLIC;
REVOKE ALL ON "table_societe" FROM PUBLIC;
REVOKE ALL ON "table_typesociete" FROM PUBLIC;
REVOKE ALL ON "table_adherence" FROM PUBLIC;
REVOKE ALL ON "table_periodeadherence" FROM PUBLIC;
REVOKE ALL ON "table_adhesion" FROM PUBLIC;
REVOKE ALL ON "table_periode" FROM PUBLIC;
REVOKE ALL ON "table_observation" FROM PUBLIC;
REVOKE ALL ON "table_typejournal" FROM PUBLIC;
REVOKE ALL ON "table_modele" FROM PUBLIC;
REVOKE ALL ON "table_lignemodele" FROM PUBLIC;
REVOKE ALL ON "table_produit" FROM PUBLIC;
REVOKE ALL ON "table_prix" FROM PUBLIC;
REVOKE ALL ON "table_ligne" FROM PUBLIC;
REVOKE ALL ON "table_devis" FROM PUBLIC;
REVOKE ALL ON "table_lignefacture" FROM PUBLIC;
REVOKE ALL ON "table_facture" FROM PUBLIC;
REVOKE ALL ON "table_ligneavoir" FROM PUBLIC;
REVOKE ALL ON "table_avoir" FROM PUBLIC;
REVOKE ALL ON "table_routage" FROM PUBLIC;
REVOKE ALL ON "table_service" FROM PUBLIC;
REVOKE ALL ON "table_employe" FROM PUBLIC;
REVOKE ALL ON "table_agent" FROM PUBLIC;
REVOKE ALL ON "table_equipe" FROM PUBLIC;
REVOKE ALL ON "table_exercice" FROM PUBLIC;
REVOKE ALL ON "table_journal" FROM PUBLIC;
REVOKE ALL ON "table_piece" FROM PUBLIC;
REVOKE ALL ON "table_ecriture" FROM PUBLIC;
REVOKE ALL ON "table_comptegen" FROM PUBLIC;
REVOKE ALL ON "table_compteproduit" FROM PUBLIC;
REVOKE ALL ON "table_compteaux" FROM PUBLIC;
REVOKE ALL ON "table_acces" FROM PUBLIC;
REVOKE ALL ON "table_pointage" FROM PUBLIC;
REVOKE ALL ON "table_lettrage" FROM PUBLIC;
REVOKE ALL ON "table_prefixe" FROM PUBLIC;
REVOKE ALL ON "table_facturereglement" FROM PUBLIC;
REVOKE ALL ON "table_modereglement" FROM PUBLIC;
REVOKE ALL ON "table_listereglement" FROM PUBLIC;
REVOKE ALL ON "table_reglement" FROM PUBLIC;
REVOKE ALL ON "table_moderepartition" FROM PUBLIC;
REVOKE ALL ON "table_repartition" FROM PUBLIC;
REVOKE ALL ON "table_impression" FROM PUBLIC;
REVOKE ALL ON "table_impressionlot" FROM PUBLIC;
REVOKE ALL ON "table_impressiongroupe" FROM PUBLIC;
REVOKE ALL ON "table_impressiondocument" FROM PUBLIC;
REVOKE ALL ON "table_cotisation" FROM PUBLIC;
REVOKE ALL ON "table_lignecotisation" FROM PUBLIC;
REVOKE ALL ON "table_groupetable" FROM PUBLIC;
REVOKE ALL ON "table_droit" FROM PUBLIC;
REVOKE ALL ON "table_droitprofil" FROM PUBLIC;
REVOKE ALL ON "table_activite" FROM PUBLIC;
REVOKE ALL ON "table_tache" FROM PUBLIC;
REVOKE ALL ON "table_typesujet" FROM PUBLIC;
REVOKE ALL ON "table_sujet" FROM PUBLIC;
REVOKE ALL ON "table_lieu" FROM PUBLIC;
REVOKE ALL ON "table_groupe" FROM PUBLIC;
REVOKE ALL ON "table_nonadherent" FROM PUBLIC;
REVOKE ALL ON "table_sequence" FROM PUBLIC;
REVOKE ALL ON "table_sequencecache" FROM PUBLIC;
REVOKE ALL ON "table_evoplus" FROM PUBLIC;

---- Séquences
GRANT SELECT, INSERT, UPDATE ON seq_acces TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_activite TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_adherence TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_adhesion TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_adresse TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_adresseversion TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_agent TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_appel TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_attribut TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_avoir TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_canton TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_categorie TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_codepostal TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_compteaux TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_comptegen TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_compteproduit TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_constante TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_contact TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_contacttype TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_contactversion TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_devis TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_droit TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_droitprofil TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_ecriture TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_employe TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_equipe TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_estlie TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_estresponsable TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_exercice TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_facture TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_facturereglement TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_groupe TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_groupecanton TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_groupetable TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_impression TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_journal TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_lettrage TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_lieu TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_ligne TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_ligneavoir TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_lignefacture TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_lignemodele TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_listereglement TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_modele TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_modereglement TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_moderepartition TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_naturepersonne TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_nonadherent TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_observation TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_periode TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_personne TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_personneupdate TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_piece TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_pointage TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_prefixe TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_prix TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_produit TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_reglement TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_repartition TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_responsabilite TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_routage TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_service TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_societe TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_sujet TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_tache TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_tva TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typeadresse TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typeattribut TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typejournal TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typelien TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typepersonne TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typesociete TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typesujet TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_typetache TO PUBLIC;
GRANT SELECT, INSERT, UPDATE ON seq_ville TO PUBLIC;
