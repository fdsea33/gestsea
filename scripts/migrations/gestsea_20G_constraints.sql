-- Introduction
    /* Voici le MCD du projet . */
-- Indexes
CREATE INDEX idx_table_cotisation_cs_nature ON table_cotisation(cs_nature);
CREATE INDEX idx_table_activite_em_numero ON table_activite(em_numero);
CREATE INDEX idx_table_activite_zt_numero ON table_activite(zt_numero);
CREATE INDEX idx_table_activite_zs_numero ON table_activite(zs_numero);
CREATE INDEX idx_table_activite_zl_numero ON table_activite(zl_numero);
CREATE INDEX idx_table_activite_fa_numero ON table_activite(fa_numero);
CREATE INDEX idx_table_activite_de_numero ON table_activite(de_numero);
CREATE INDEX idx_table_activite_pe_numero ON table_activite(pe_numero);
CREATE INDEX idx_table_activite_zg_numero ON table_activite(zg_numero);
CREATE INDEX idx_table_adherence_pd_numero ON table_adherence(pd_numero);
CREATE INDEX idx_table_adherence_tl_numero ON table_adherence(tl_numero);
CREATE INDEX idx_table_adhesion_pe_numero ON table_adhesion(pe_numero);
CREATE INDEX idx_table_adhesion_po_numero ON table_adhesion(po_numero);
CREATE INDEX idx_table_adhesion_ah_numero ON table_adhesion(ah_numero);
CREATE INDEX idx_table_adhesion_fa_numero ON table_adhesion(fa_numero);
CREATE INDEX idx_table_adhesion_lf_numero ON table_adhesion(lf_numero);
CREATE INDEX idx_table_adhesion_as_origine ON table_adhesion(as_origine);
CREATE INDEX idx_table_adresse_ak_numero ON table_adresse(ak_numero);
CREATE INDEX idx_table_adresse_cp_numero ON table_adresse(cp_numero);
CREATE INDEX idx_table_adresse_vi_numero ON table_adresse(vi_numero);
CREATE INDEX idx_table_adresse_pe_numero ON table_adresse(pe_numero);
CREATE INDEX idx_table_adresseversion_ad_numero ON table_adresseversion(ad_numero);
CREATE INDEX idx_table_adresseversion_ak_numero ON table_adresseversion(ak_numero);
CREATE INDEX idx_table_adresseversion_cp_numero ON table_adresseversion(cp_numero);
CREATE INDEX idx_table_adresseversion_vi_numero ON table_adresseversion(vi_numero);
CREATE INDEX idx_table_adresseversion_pe_numero ON table_adresseversion(pe_numero);
CREATE INDEX idx_table_agent_eq_numero ON table_agent(eq_numero);
CREATE INDEX idx_table_appartienta_ct_numero ON table_appartienta(ct_numero);
CREATE INDEX idx_table_appartienta_gc_numero ON table_appartienta(gc_numero);
CREATE INDEX idx_table_appel_th_numero ON table_appel(th_numero);
CREATE INDEX idx_table_appel_pe_numero ON table_appel(pe_numero);
CREATE INDEX idx_table_attribut_pe_numero ON table_attribut(pe_numero);
CREATE INDEX idx_table_attribut_ta_numero ON table_attribut(ta_numero);
CREATE INDEX idx_table_attribut_cr_numero ON table_attribut(cr_numero);
CREATE INDEX idx_table_avoir_pe_numero ON table_avoir(pe_numero);
CREATE INDEX idx_table_avoir_fa_numero ON table_avoir(fa_numero);
CREATE INDEX idx_table_categorie_ta_numero ON table_categorie(ta_numero);
CREATE INDEX idx_table_compteaux_cg_numero ON table_compteaux(cg_numero);
CREATE INDEX idx_table_compteaux_ac_numero ON table_compteaux(ac_numero);
CREATE INDEX idx_table_comptegen_ac_numero ON table_comptegen(ac_numero);
CREATE INDEX idx_table_comptegen_so_numero ON table_comptegen(so_numero);
CREATE INDEX idx_table_compteproduit_pd_numero ON table_compteproduit(pd_numero);
CREATE INDEX idx_table_compteproduit_cg_numero ON table_compteproduit(cg_numero);
CREATE INDEX idx_table_contact_ck_numero ON table_contact(ck_numero);
CREATE INDEX idx_table_contact_pe_numero ON table_contact(pe_numero);
CREATE INDEX idx_table_contactversion_ck_numero ON table_contactversion(ck_numero);
CREATE INDEX idx_table_contactversion_pe_numero ON table_contactversion(pe_numero);
CREATE INDEX idx_table_contactversion_cn_numero ON table_contactversion(cn_numero);
CREATE INDEX idx_table_cotisation_pe_numero ON table_cotisation(pe_numero);
CREATE INDEX idx_table_cotisation_cs_societe ON table_cotisation(cs_societe);
CREATE INDEX idx_table_cotisation_ig_numero ON table_cotisation(ig_numero);
CREATE INDEX idx_table_devis_pe_numero ON table_devis(pe_numero);
CREATE INDEX idx_table_devis_so_numero ON table_devis(so_numero);
CREATE INDEX idx_table_devis_em_numero ON table_devis(em_numero);
CREATE INDEX idx_table_droit_dp_numero ON table_droit(dp_numero);
CREATE INDEX idx_table_droit_gt_numero ON table_droit(gt_numero);
CREATE INDEX idx_table_ecriture_pi_numero ON table_ecriture(pi_numero);
CREATE INDEX idx_table_ecriture_ex_numero ON table_ecriture(ex_numero);
CREATE INDEX idx_table_ecriture_cg_numero ON table_ecriture(cg_numero);
CREATE INDEX idx_table_ecriture_ca_numero ON table_ecriture(ca_numero);
CREATE INDEX idx_table_ecriture_pf_numero ON table_ecriture(pf_numero);
CREATE INDEX idx_table_ecriture_pt_numero ON table_ecriture(pt_numero);
CREATE INDEX idx_table_ecriture_av_numero ON table_ecriture(av_numero);
CREATE INDEX idx_table_ecriture_lt_numero ON table_ecriture(lt_numero);
CREATE INDEX idx_table_ecriture_rg_numero ON table_ecriture(rg_numero);
CREATE INDEX idx_table_ecriture_fa_numero ON table_ecriture(fa_numero);
CREATE INDEX idx_table_employe_dp_numero ON table_employe(dp_numero);
CREATE INDEX idx_table_employe_em_service ON table_employe(em_service);
CREATE INDEX idx_table_employe_em_agent ON table_employe(em_agent);
CREATE INDEX idx_table_employe_em_acces ON table_employe(em_acces);
CREATE INDEX idx_table_estlie_el_personne1 ON table_estlie(el_personne1);
CREATE INDEX idx_table_estlie_el_personne2 ON table_estlie(el_personne2);
CREATE INDEX idx_table_estlie_tl_numero ON table_estlie(tl_numero);
CREATE INDEX idx_table_estlie_tl_code ON table_estlie(tl_code);
CREATE INDEX idx_table_estresponsable_pe_numero ON table_estresponsable(pe_numero);
CREATE INDEX idx_table_estresponsable_re_numero ON table_estresponsable(re_numero);
CREATE INDEX idx_table_evoplus_pe_numero ON table_evoplus(pe_numero);
CREATE INDEX idx_table_exercice_so_numero ON table_exercice(so_numero);
CREATE INDEX idx_table_facture_de_numero ON table_facture(de_numero);
CREATE INDEX idx_table_facture_pe_numero ON table_facture(pe_numero);
CREATE INDEX idx_table_facture_ag_numero ON table_facture(ag_numero);
CREATE INDEX idx_table_facture_so_numero ON table_facture(so_numero);
CREATE INDEX idx_table_facturereglement_rg_numero ON table_facturereglement(rg_numero);
CREATE INDEX idx_table_facturereglement_fa_numero ON table_facturereglement(fa_numero);
CREATE INDEX idx_table_impression_im_societe ON table_impression(im_societe);
CREATE INDEX idx_table_impressiondocument_ig_numero ON table_impressiondocument(ig_numero);
CREATE INDEX idx_table_impressiongroupe_il_numero ON table_impressiongroupe(il_numero);
CREATE INDEX idx_table_journal_so_numero ON table_journal(so_numero);
CREATE INDEX idx_table_journal_tj_numero ON table_journal(tj_numero);
CREATE INDEX idx_table_journal_cg_numero ON table_journal(cg_numero);
CREATE INDEX idx_table_ligne_pd_numero ON table_ligne(pd_numero);
CREATE INDEX idx_table_ligne_de_numero ON table_ligne(de_numero);
CREATE INDEX idx_table_ligne_px_numero ON table_ligne(px_numero);
CREATE INDEX idx_table_ligneavoir_pd_numero ON table_ligneavoir(pd_numero);
CREATE INDEX idx_table_ligneavoir_av_numero ON table_ligneavoir(av_numero);
CREATE INDEX idx_table_ligneavoir_px_numero ON table_ligneavoir(px_numero);
CREATE INDEX idx_table_lignecotisation_cs_numero ON table_lignecotisation(cs_numero);
CREATE INDEX idx_table_lignefacture_fa_numero ON table_lignefacture(fa_numero);
CREATE INDEX idx_table_lignefacture_px_numero ON table_lignefacture(px_numero);
CREATE INDEX idx_table_lignefacture_pd_numero ON table_lignefacture(pd_numero);
CREATE INDEX idx_table_lignemodele_pd_numero ON table_lignemodele(pd_numero);
CREATE INDEX idx_table_lignemodele_mo_numero ON table_lignemodele(mo_numero);
CREATE INDEX idx_table_listereglement_em_numero ON table_listereglement(em_numero);
CREATE INDEX idx_table_listereglement_mr_numero ON table_listereglement(mr_numero);
CREATE INDEX idx_table_listereglement_so_numero ON table_listereglement(so_numero);
CREATE INDEX idx_table_modereglement_cg_numero ON table_modereglement(cg_numero);
CREATE INDEX idx_table_modereglement_so_numero ON table_modereglement(so_numero);
CREATE INDEX idx_table_moderepartition_cg_numero ON table_moderepartition(cg_numero);
CREATE INDEX idx_table_moderepartition_so_numero ON table_moderepartition(so_numero);
CREATE INDEX idx_table_moderepartition_mp_societe ON table_moderepartition(mp_societe);
CREATE INDEX idx_table_modele_so_numero ON table_modele(so_numero);
CREATE INDEX idx_table_observation_pe_numero ON table_observation(pe_numero);
CREATE INDEX idx_table_periodeadherence_po_numero ON table_periodeadherence(po_numero);
CREATE INDEX idx_table_periodeadherence_ah_numero ON table_periodeadherence(ah_numero);
CREATE INDEX idx_table_personne_tp_numero ON table_personne(tp_numero);
CREATE INDEX idx_table_personne_np_numero ON table_personne(np_numero);
CREATE INDEX idx_table_piece_jo_numero ON table_piece(jo_numero);
CREATE INDEX idx_table_piece_ex_numero ON table_piece(ex_numero);
CREATE INDEX idx_table_prix_tv_numero ON table_prix(tv_numero);
CREATE INDEX idx_table_prix_pd_numero ON table_prix(pd_numero);
CREATE INDEX idx_table_produit_jo_numero ON table_produit(jo_numero);
CREATE INDEX idx_table_produit_so_numero ON table_produit(so_numero);
CREATE INDEX idx_table_reglement_pe_numero ON table_reglement(pe_numero);
CREATE INDEX idx_table_reglement_em_numero ON table_reglement(em_numero);
CREATE INDEX idx_table_reglement_lr_numero ON table_reglement(lr_numero);
CREATE INDEX idx_table_reglement_mr_numero ON table_reglement(mr_numero);
CREATE INDEX idx_table_reglement_so_numero ON table_reglement(so_numero);
CREATE INDEX idx_table_repartition_rg_numero ON table_repartition(rg_numero);
CREATE INDEX idx_table_repartition_mp_numero ON table_repartition(mp_numero);
CREATE INDEX idx_table_routage_ad_numero ON table_routage(ad_numero);
CREATE INDEX idx_table_routage_pe_numero ON table_routage(pe_numero);
CREATE INDEX idx_table_routage_fa_numero ON table_routage(fa_numero);
CREATE INDEX idx_table_sequencecache_sq_numero ON table_sequencecache(sq_numero);
CREATE INDEX idx_table_service_se_societe ON table_service(se_societe);
CREATE INDEX idx_table_service_se_agent ON table_service(se_agent);
CREATE INDEX idx_table_societe_pe_numero ON table_societe(pe_numero);
CREATE INDEX idx_table_societe_ts_numero ON table_societe(ts_numero);
CREATE INDEX idx_table_societe_sq_numero ON table_societe(sq_numero);
CREATE INDEX idx_table_sujet_zu_numero ON table_sujet(zu_numero);
CREATE INDEX idx_table_tva_so_numero ON table_tva(so_numero);
CREATE INDEX idx_table_tva_cg_numero ON table_tva(cg_numero);
CREATE INDEX idx_table_ville_ct_numero ON table_ville(ct_numero);
CREATE INDEX idx_table_villecp_vi_numero ON table_villecp(vi_numero);
CREATE INDEX idx_table_villecp_cp_numero ON table_villecp(cp_numero);

-- Primary keys
ALTER TABLE "table_acces"
  ADD CONSTRAINT pk_table_acces_ac_numero PRIMARY KEY (ac_numero);
ALTER TABLE "table_activite"
  ADD CONSTRAINT pk_table_activite_za_numero PRIMARY KEY (za_numero);
ALTER TABLE "table_adherence"
  ADD CONSTRAINT pk_table_adherence_ah_numero PRIMARY KEY (ah_numero);
ALTER TABLE "table_adhesion"
  ADD CONSTRAINT pk_table_adhesion_as_numero PRIMARY KEY (as_numero);
ALTER TABLE "table_adresse"
  ADD CONSTRAINT pk_table_adresse_ad_numero PRIMARY KEY (ad_numero);
ALTER TABLE "table_adresseversion"
  ADD CONSTRAINT pk_table_adresseversion_aw_numero PRIMARY KEY (aw_numero);
ALTER TABLE "table_agent"
  ADD CONSTRAINT pk_table_agent_ag_numero PRIMARY KEY (ag_numero);
ALTER TABLE "table_appel"
  ADD CONSTRAINT pk_table_appel_ap_numero PRIMARY KEY (ap_numero);
ALTER TABLE "table_attribut"
  ADD CONSTRAINT pk_table_attribut_at_numero PRIMARY KEY (at_numero);
ALTER TABLE "table_avoir"
  ADD CONSTRAINT pk_table_avoir_av_numero PRIMARY KEY (av_numero);
ALTER TABLE "table_canton"
  ADD CONSTRAINT pk_table_canton_ct_numero PRIMARY KEY (ct_numero);
ALTER TABLE "table_categorie"
  ADD CONSTRAINT pk_table_categorie_cr_numero PRIMARY KEY (cr_numero);
ALTER TABLE "table_codepostal"
  ADD CONSTRAINT pk_table_codepostal_cp_numero PRIMARY KEY (cp_numero);
ALTER TABLE "table_compteaux"
  ADD CONSTRAINT pk_table_compteaux_ca_numero PRIMARY KEY (ca_numero);
ALTER TABLE "table_comptegen"
  ADD CONSTRAINT pk_table_comptegen_cg_numero PRIMARY KEY (cg_numero);
ALTER TABLE "table_compteproduit"
  ADD CONSTRAINT pk_table_compteproduit_ci_numero PRIMARY KEY (ci_numero);
ALTER TABLE "table_constante"
  ADD CONSTRAINT pk_table_constante_cs_numero PRIMARY KEY (cs_numero);
ALTER TABLE "table_contact"
  ADD CONSTRAINT pk_table_contact_cn_numero PRIMARY KEY (cn_numero);
ALTER TABLE "table_contacttype"
  ADD CONSTRAINT pk_table_contacttype_ck_numero PRIMARY KEY (ck_numero);
ALTER TABLE "table_contactversion"
  ADD CONSTRAINT pk_table_contactversion_cw_numero PRIMARY KEY (cw_numero);
ALTER TABLE "table_cotisation"
  ADD CONSTRAINT pk_table_cotisation_cs_numero PRIMARY KEY (cs_numero);
ALTER TABLE "table_devis"
  ADD CONSTRAINT pk_table_devis_de_numero PRIMARY KEY (de_numero);
ALTER TABLE "table_droit"
  ADD CONSTRAINT pk_table_droit_dr_numero PRIMARY KEY (dr_numero);
ALTER TABLE "table_droitprofil"
  ADD CONSTRAINT pk_table_droitprofil_dp_numero PRIMARY KEY (dp_numero);
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT pk_table_ecriture_ec_numero PRIMARY KEY (ec_numero);
ALTER TABLE "table_employe"
  ADD CONSTRAINT pk_table_employe_em_numero PRIMARY KEY (em_numero);
ALTER TABLE "table_equipe"
  ADD CONSTRAINT pk_table_equipe_eq_numero PRIMARY KEY (eq_numero);
ALTER TABLE "table_estlie"
  ADD CONSTRAINT pk_table_estlie_el_numero PRIMARY KEY (el_numero);
ALTER TABLE "table_estresponsable"
  ADD CONSTRAINT pk_table_estresponsable_peac_numero PRIMARY KEY (peac_numero);
ALTER TABLE "table_evoplus"
  ADD CONSTRAINT pk_table_evoplus_id PRIMARY KEY (id);
ALTER TABLE "table_exercice"
  ADD CONSTRAINT pk_table_exercice_ex_numero PRIMARY KEY (ex_numero);
ALTER TABLE "table_facture"
  ADD CONSTRAINT pk_table_facture_fa_numero PRIMARY KEY (fa_numero);
ALTER TABLE "table_facturereglement"
  ADD CONSTRAINT pk_table_facturereglement_fr_numero PRIMARY KEY (fr_numero);
ALTER TABLE "table_groupe"
  ADD CONSTRAINT pk_table_groupe_zg_numero PRIMARY KEY (zg_numero);
ALTER TABLE "table_groupecanton"
  ADD CONSTRAINT pk_table_groupecanton_gc_numero PRIMARY KEY (gc_numero);
ALTER TABLE "table_groupetable"
  ADD CONSTRAINT pk_table_groupetable_gt_numero PRIMARY KEY (gt_numero);
ALTER TABLE "table_impression"
  ADD CONSTRAINT pk_table_impression_im_numero PRIMARY KEY (im_numero);
ALTER TABLE "table_impressiondocument"
  ADD CONSTRAINT pk_table_impressiondocument_id_numero PRIMARY KEY (id_numero);
ALTER TABLE "table_impressiongroupe"
  ADD CONSTRAINT pk_table_impressiongroupe_ig_numero PRIMARY KEY (ig_numero);
ALTER TABLE "table_impressionlot"
  ADD CONSTRAINT pk_table_impressionlot_il_numero PRIMARY KEY (il_numero);
ALTER TABLE "table_journal"
  ADD CONSTRAINT pk_table_journal_jo_numero PRIMARY KEY (jo_numero);
ALTER TABLE "table_lettrage"
  ADD CONSTRAINT pk_table_lettrage_lt_numero PRIMARY KEY (lt_numero);
ALTER TABLE "table_lieu"
  ADD CONSTRAINT pk_table_lieu_zl_numero PRIMARY KEY (zl_numero);
ALTER TABLE "table_ligne"
  ADD CONSTRAINT pk_table_ligne_l_numero PRIMARY KEY (l_numero);
ALTER TABLE "table_ligneavoir"
  ADD CONSTRAINT pk_table_ligneavoir_la_numero PRIMARY KEY (la_numero);
ALTER TABLE "table_lignecotisation"
  ADD CONSTRAINT pk_table_lignecotisation_lc_numero PRIMARY KEY (lc_numero);
ALTER TABLE "table_lignefacture"
  ADD CONSTRAINT pk_table_lignefacture_lf_numero PRIMARY KEY (lf_numero);
ALTER TABLE "table_lignemodele"
  ADD CONSTRAINT pk_table_lignemodele_lm_numero PRIMARY KEY (lm_numero);
ALTER TABLE "table_listereglement"
  ADD CONSTRAINT pk_table_listereglement_lr_numero PRIMARY KEY (lr_numero);
ALTER TABLE "table_modereglement"
  ADD CONSTRAINT pk_table_modereglement_mr_numero PRIMARY KEY (mr_numero);
ALTER TABLE "table_moderepartition"
  ADD CONSTRAINT pk_table_moderepartition_mp_numero PRIMARY KEY (mp_numero);
ALTER TABLE "table_modele"
  ADD CONSTRAINT pk_table_modele_mo_numero PRIMARY KEY (mo_numero);
ALTER TABLE "table_naturepersonne"
  ADD CONSTRAINT pk_table_naturepersonne_np_numero PRIMARY KEY (np_numero);
ALTER TABLE "table_nonadherent"
  ADD CONSTRAINT pk_table_nonadherent_na_numero PRIMARY KEY (na_numero);
ALTER TABLE "table_observation"
  ADD CONSTRAINT pk_table_observation_ob_numero PRIMARY KEY (ob_numero);
ALTER TABLE "table_periode"
  ADD CONSTRAINT pk_table_periode_po_numero PRIMARY KEY (po_numero);
ALTER TABLE "table_personne"
  ADD CONSTRAINT pk_table_personne_pe_numero PRIMARY KEY (pe_numero);
ALTER TABLE "table_personneupdate"
  ADD CONSTRAINT pk_table_personneupdate_pu_numero PRIMARY KEY (pu_numero);
ALTER TABLE "table_piece"
  ADD CONSTRAINT pk_table_piece_pi_numero PRIMARY KEY (pi_numero);
ALTER TABLE "table_pointage"
  ADD CONSTRAINT pk_table_pointage_pt_numero PRIMARY KEY (pt_numero);
ALTER TABLE "table_prefixe"
  ADD CONSTRAINT pk_table_prefixe_pf_numero PRIMARY KEY (pf_numero);
ALTER TABLE "table_prix"
  ADD CONSTRAINT pk_table_prix_px_numero PRIMARY KEY (px_numero);
ALTER TABLE "table_produit"
  ADD CONSTRAINT pk_table_produit_pd_numero PRIMARY KEY (pd_numero);
ALTER TABLE "table_reglement"
  ADD CONSTRAINT pk_table_reglement_rg_numero PRIMARY KEY (rg_numero);
ALTER TABLE "table_repartition"
  ADD CONSTRAINT pk_table_repartition_rp_numero PRIMARY KEY (rp_numero);
ALTER TABLE "table_responsabilite"
  ADD CONSTRAINT pk_table_responsabilite_re_numero PRIMARY KEY (re_numero);
ALTER TABLE "table_routage"
  ADD CONSTRAINT pk_table_routage_ro_numero PRIMARY KEY (ro_numero);
ALTER TABLE "table_sequence"
  ADD CONSTRAINT pk_table_sequence_sq_numero PRIMARY KEY (sq_numero);
ALTER TABLE "table_sequencecache"
  ADD CONSTRAINT pk_table_sequencecache_sc_numero PRIMARY KEY (sc_numero);
ALTER TABLE "table_service"
  ADD CONSTRAINT pk_table_service_se_numero PRIMARY KEY (se_numero);
ALTER TABLE "table_societe"
  ADD CONSTRAINT pk_table_societe_so_numero PRIMARY KEY (so_numero);
ALTER TABLE "table_sujet"
  ADD CONSTRAINT pk_table_sujet_zs_numero PRIMARY KEY (zs_numero);
ALTER TABLE "table_tache"
  ADD CONSTRAINT pk_table_tache_zt_numero PRIMARY KEY (zt_numero);
ALTER TABLE "table_tva"
  ADD CONSTRAINT pk_table_tva_tv_numero PRIMARY KEY (tv_numero);
ALTER TABLE "table_typeadresse"
  ADD CONSTRAINT pk_table_typeadresse_ak_numero PRIMARY KEY (ak_numero);
ALTER TABLE "table_typeattribut"
  ADD CONSTRAINT pk_table_typeattribut_ta_numero PRIMARY KEY (ta_numero);
ALTER TABLE "table_typejournal"
  ADD CONSTRAINT pk_table_typejournal_tj_numero PRIMARY KEY (tj_numero);
ALTER TABLE "table_typelien"
  ADD CONSTRAINT pk_table_typelien_tl_numero PRIMARY KEY (tl_numero);
ALTER TABLE "table_typepersonne"
  ADD CONSTRAINT pk_table_typepersonne_tp_numero PRIMARY KEY (tp_numero);
ALTER TABLE "table_typesociete"
  ADD CONSTRAINT pk_table_typesociete_ts_numero PRIMARY KEY (ts_numero);
ALTER TABLE "table_typesujet"
  ADD CONSTRAINT pk_table_typesujet_zu_numero PRIMARY KEY (zu_numero);
ALTER TABLE "table_typetache"
  ADD CONSTRAINT pk_table_typetache_th_numero PRIMARY KEY (th_numero);
ALTER TABLE "table_ville"
  ADD CONSTRAINT pk_table_ville_vi_numero PRIMARY KEY (vi_numero);

-- Foreign keys
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_em_numero
  FOREIGN KEY (em_numero) REFERENCES table_Employe(EM_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_zt_numero
  FOREIGN KEY (zt_numero) REFERENCES table_Tache(ZT_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_zs_numero
  FOREIGN KEY (zs_numero) REFERENCES table_Sujet(ZS_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_zl_numero
  FOREIGN KEY (zl_numero) REFERENCES table_Lieu(ZL_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_fa_numero
  FOREIGN KEY (fa_numero) REFERENCES table_Facture(FA_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_de_numero
  FOREIGN KEY (de_numero) REFERENCES table_Devis(DE_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_activite"
  ADD CONSTRAINT fk_table_activite_zg_numero
  FOREIGN KEY (zg_numero) REFERENCES table_Groupe(ZG_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_adherence"
  ADD CONSTRAINT fk_table_adherence_pd_numero
  FOREIGN KEY (pd_numero) REFERENCES table_Produit(PD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adherence"
  ADD CONSTRAINT fk_table_adherence_tl_numero
  FOREIGN KEY (tl_numero) REFERENCES table_TypeLien(TL_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adhesion"
  ADD CONSTRAINT fk_table_adhesion_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adhesion"
  ADD CONSTRAINT fk_table_adhesion_po_numero
  FOREIGN KEY (po_numero) REFERENCES table_Periode(PO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adhesion"
  ADD CONSTRAINT fk_table_adhesion_ah_numero
  FOREIGN KEY (ah_numero) REFERENCES table_Adherence(AH_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adhesion"
  ADD CONSTRAINT fk_table_adhesion_fa_numero
  FOREIGN KEY (fa_numero) REFERENCES table_Facture(FA_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_adhesion"
  ADD CONSTRAINT fk_table_adhesion_lf_numero
  FOREIGN KEY (lf_numero) REFERENCES table_LigneFacture(FA_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_adhesion"
  ADD CONSTRAINT fk_table_adhesion_as_origine
  FOREIGN KEY (as_origine) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresse"
  ADD CONSTRAINT fk_table_adresse_ak_numero
  FOREIGN KEY (ak_numero) REFERENCES table_TypeAdresse(AK_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresse"
  ADD CONSTRAINT fk_table_adresse_cp_numero
  FOREIGN KEY (cp_numero) REFERENCES table_CodePostal(CP_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresse"
  ADD CONSTRAINT fk_table_adresse_vi_numero
  FOREIGN KEY (vi_numero) REFERENCES table_Ville(VI_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresse"
  ADD CONSTRAINT fk_table_adresse_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresseversion"
  ADD CONSTRAINT fk_table_adresseversion_ad_numero
  FOREIGN KEY (ad_numero) REFERENCES table_Adresse(AD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresseversion"
  ADD CONSTRAINT fk_table_adresseversion_ak_numero
  FOREIGN KEY (ak_numero) REFERENCES table_TypeAdresse(AK_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresseversion"
  ADD CONSTRAINT fk_table_adresseversion_cp_numero
  FOREIGN KEY (cp_numero) REFERENCES table_CodePostal(CP_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresseversion"
  ADD CONSTRAINT fk_table_adresseversion_vi_numero
  FOREIGN KEY (vi_numero) REFERENCES table_Ville(VI_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_adresseversion"
  ADD CONSTRAINT fk_table_adresseversion_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_agent"
  ADD CONSTRAINT fk_table_agent_eq_numero
  FOREIGN KEY (eq_numero) REFERENCES table_Equipe(EQ_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_appartienta"
  ADD CONSTRAINT fk_table_appartienta_ct_numero
  FOREIGN KEY (ct_numero) REFERENCES table_Canton(CT_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_appartienta"
  ADD CONSTRAINT fk_table_appartienta_gc_numero
  FOREIGN KEY (gc_numero) REFERENCES table_GroupeCanton(GC_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_appel"
  ADD CONSTRAINT fk_table_appel_th_numero
  FOREIGN KEY (th_numero) REFERENCES table_TypeTache(TH_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_appel"
  ADD CONSTRAINT fk_table_appel_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero);
ALTER TABLE "table_attribut"
  ADD CONSTRAINT fk_table_attribut_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_attribut"
  ADD CONSTRAINT fk_table_attribut_ta_numero
  FOREIGN KEY (ta_numero) REFERENCES table_TypeAttribut(TA_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_attribut"
  ADD CONSTRAINT fk_table_attribut_cr_numero
  FOREIGN KEY (cr_numero) REFERENCES table_Categorie(CR_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_avoir"
  ADD CONSTRAINT fk_table_avoir_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_avoir"
  ADD CONSTRAINT fk_table_avoir_fa_numero
  FOREIGN KEY (fa_numero) REFERENCES table_Facture(FA_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_categorie"
  ADD CONSTRAINT fk_table_categorie_ta_numero
  FOREIGN KEY (ta_numero) REFERENCES table_TypeAttribut(TA_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_compteaux"
  ADD CONSTRAINT fk_table_compteaux_cg_numero
  FOREIGN KEY (cg_numero) REFERENCES table_CompteGen(CG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_compteaux"
  ADD CONSTRAINT fk_table_compteaux_ac_numero
  FOREIGN KEY (ac_numero) REFERENCES table_Acces(AC_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_comptegen"
  ADD CONSTRAINT fk_table_comptegen_ac_numero
  FOREIGN KEY (ac_numero) REFERENCES table_Acces(AC_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_comptegen"
  ADD CONSTRAINT fk_table_comptegen_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_compteproduit"
  ADD CONSTRAINT fk_table_compteproduit_pd_numero
  FOREIGN KEY (pd_numero) REFERENCES table_Produit(PD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_compteproduit"
  ADD CONSTRAINT fk_table_compteproduit_cg_numero
  FOREIGN KEY (cg_numero) REFERENCES table_CompteGen(CG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_contact"
  ADD CONSTRAINT fk_table_contact_ck_numero
  FOREIGN KEY (ck_numero) REFERENCES table_ContactType(CK_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_contact"
  ADD CONSTRAINT fk_table_contact_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_contactversion"
  ADD CONSTRAINT fk_table_contactversion_ck_numero
  FOREIGN KEY (ck_numero) REFERENCES table_ContactType(CK_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_contactversion"
  ADD CONSTRAINT fk_table_contactversion_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_contactversion"
  ADD CONSTRAINT fk_table_contactversion_cn_numero
  FOREIGN KEY (cn_numero) REFERENCES table_Contact(CN_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_cotisation"
  ADD CONSTRAINT fk_table_cotisation_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_cotisation"
  ADD CONSTRAINT fk_table_cotisation_cs_societe
  FOREIGN KEY (cs_societe) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_cotisation"
  ADD CONSTRAINT fk_table_cotisation_ig_numero
  FOREIGN KEY (ig_numero) REFERENCES table_ImpressionGroupe(IG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_devis"
  ADD CONSTRAINT fk_table_devis_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_devis"
  ADD CONSTRAINT fk_table_devis_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_devis"
  ADD CONSTRAINT fk_table_devis_em_numero
  FOREIGN KEY (em_numero) REFERENCES table_Employe(EM_Numero);
ALTER TABLE "table_droit"
  ADD CONSTRAINT fk_table_droit_dp_numero
  FOREIGN KEY (dp_numero) REFERENCES table_DroitProfil(DP_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_droit"
  ADD CONSTRAINT fk_table_droit_gt_numero
  FOREIGN KEY (gt_numero) REFERENCES table_GroupeTable(GT_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_pi_numero
  FOREIGN KEY (pi_numero) REFERENCES table_Piece(PI_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_ex_numero
  FOREIGN KEY (ex_numero) REFERENCES table_Exercice(EX_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_cg_numero
  FOREIGN KEY (cg_numero) REFERENCES table_CompteGen(CG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_ca_numero
  FOREIGN KEY (ca_numero) REFERENCES table_CompteAux(CA_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_pf_numero
  FOREIGN KEY (pf_numero) REFERENCES table_Prefixe(PF_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_pt_numero
  FOREIGN KEY (pt_numero) REFERENCES table_Pointage(PT_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_av_numero
  FOREIGN KEY (av_numero) REFERENCES table_Avoir(AV_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_lt_numero
  FOREIGN KEY (lt_numero) REFERENCES table_Lettrage(LT_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_rg_numero
  FOREIGN KEY (rg_numero) REFERENCES table_Reglement(RG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ecriture"
  ADD CONSTRAINT fk_table_ecriture_fa_numero
  FOREIGN KEY (fa_numero) REFERENCES table_Facture(FA_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_employe"
  ADD CONSTRAINT fk_table_employe_dp_numero
  FOREIGN KEY (dp_numero) REFERENCES table_DroitProfil(DP_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_employe"
  ADD CONSTRAINT fk_table_employe_em_service
  FOREIGN KEY (em_service) REFERENCES table_Service(SE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_employe"
  ADD CONSTRAINT fk_table_employe_em_agent
  FOREIGN KEY (em_agent) REFERENCES table_Agent(AG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_employe"
  ADD CONSTRAINT fk_table_employe_em_acces
  FOREIGN KEY (em_acces) REFERENCES table_Acces(AC_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_estlie"
  ADD CONSTRAINT fk_table_estlie_el_personne1
  FOREIGN KEY (el_personne1) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_estlie"
  ADD CONSTRAINT fk_table_estlie_el_personne2
  FOREIGN KEY (el_personne2) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_estlie"
  ADD CONSTRAINT fk_table_estlie_tl_numero
  FOREIGN KEY (tl_numero) REFERENCES table_TypeLien(TL_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_estlie"
  ADD CONSTRAINT fk_table_estlie_tl_code
  FOREIGN KEY (tl_code) REFERENCES table_TypeLien(TL_Code)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_estresponsable"
  ADD CONSTRAINT fk_table_estresponsable_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_estresponsable"
  ADD CONSTRAINT fk_table_estresponsable_re_numero
  FOREIGN KEY (re_numero) REFERENCES table_Responsabilite(RE_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_evoplus"
  ADD CONSTRAINT fk_table_evoplus_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero);
ALTER TABLE "table_exercice"
  ADD CONSTRAINT fk_table_exercice_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero);
ALTER TABLE "table_facture"
  ADD CONSTRAINT fk_table_facture_de_numero
  FOREIGN KEY (de_numero) REFERENCES table_Devis(DE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_facture"
  ADD CONSTRAINT fk_table_facture_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_facture"
  ADD CONSTRAINT fk_table_facture_ag_numero
  FOREIGN KEY (ag_numero) REFERENCES table_Agent(AG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_facture"
  ADD CONSTRAINT fk_table_facture_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_facturereglement"
  ADD CONSTRAINT fk_table_facturereglement_rg_numero
  FOREIGN KEY (rg_numero) REFERENCES table_Reglement(RG_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_facturereglement"
  ADD CONSTRAINT fk_table_facturereglement_fa_numero
  FOREIGN KEY (fa_numero) REFERENCES table_Facture(FA_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_impression"
  ADD CONSTRAINT fk_table_impression_im_societe
  FOREIGN KEY (im_societe) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_impressiondocument"
  ADD CONSTRAINT fk_table_impressiondocument_ig_numero
  FOREIGN KEY (ig_numero) REFERENCES table_ImpressionGroupe(IG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_impressiongroupe"
  ADD CONSTRAINT fk_table_impressiongroupe_il_numero
  FOREIGN KEY (il_numero) REFERENCES table_ImpressionLot(IL_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_journal"
  ADD CONSTRAINT fk_table_journal_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_journal"
  ADD CONSTRAINT fk_table_journal_tj_numero
  FOREIGN KEY (tj_numero) REFERENCES table_TypeJournal(TJ_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_journal"
  ADD CONSTRAINT fk_table_journal_cg_numero
  FOREIGN KEY (cg_numero) REFERENCES table_CompteGen(CG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ligne"
  ADD CONSTRAINT fk_table_ligne_pd_numero
  FOREIGN KEY (pd_numero) REFERENCES table_Produit(PD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ligne"
  ADD CONSTRAINT fk_table_ligne_de_numero
  FOREIGN KEY (de_numero) REFERENCES table_Devis(DE_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_ligne"
  ADD CONSTRAINT fk_table_ligne_px_numero
  FOREIGN KEY (px_numero) REFERENCES table_Prix(PX_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ligneavoir"
  ADD CONSTRAINT fk_table_ligneavoir_pd_numero
  FOREIGN KEY (pd_numero) REFERENCES table_Produit(PD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ligneavoir"
  ADD CONSTRAINT fk_table_ligneavoir_av_numero
  FOREIGN KEY (av_numero) REFERENCES table_Avoir(AV_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ligneavoir"
  ADD CONSTRAINT fk_table_ligneavoir_px_numero
  FOREIGN KEY (px_numero) REFERENCES table_Prix(PX_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_lignecotisation"
  ADD CONSTRAINT fk_table_lignecotisation_cs_numero
  FOREIGN KEY (cs_numero) REFERENCES table_Cotisation(CS_Numero)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
ALTER TABLE "table_lignefacture"
  ADD CONSTRAINT fk_table_lignefacture_fa_numero
  FOREIGN KEY (fa_numero) REFERENCES table_Facture(FA_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_lignefacture"
  ADD CONSTRAINT fk_table_lignefacture_px_numero
  FOREIGN KEY (px_numero) REFERENCES table_Prix(PX_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_lignefacture"
  ADD CONSTRAINT fk_table_lignefacture_pd_numero
  FOREIGN KEY (pd_numero) REFERENCES table_Produit(PD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_lignemodele"
  ADD CONSTRAINT fk_table_lignemodele_pd_numero
  FOREIGN KEY (pd_numero) REFERENCES table_Produit(PD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_lignemodele"
  ADD CONSTRAINT fk_table_lignemodele_mo_numero
  FOREIGN KEY (mo_numero) REFERENCES table_Modele(MO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_listereglement"
  ADD CONSTRAINT fk_table_listereglement_em_numero
  FOREIGN KEY (em_numero) REFERENCES table_Employe(EM_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_listereglement"
  ADD CONSTRAINT fk_table_listereglement_mr_numero
  FOREIGN KEY (mr_numero) REFERENCES table_ModeReglement(MR_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_listereglement"
  ADD CONSTRAINT fk_table_listereglement_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_modereglement"
  ADD CONSTRAINT fk_table_modereglement_cg_numero
  FOREIGN KEY (cg_numero) REFERENCES table_CompteGen(CG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_modereglement"
  ADD CONSTRAINT fk_table_modereglement_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_moderepartition"
  ADD CONSTRAINT fk_table_moderepartition_cg_numero
  FOREIGN KEY (cg_numero) REFERENCES table_CompteGen(CG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_moderepartition"
  ADD CONSTRAINT fk_table_moderepartition_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_moderepartition"
  ADD CONSTRAINT fk_table_moderepartition_mp_societe
  FOREIGN KEY (mp_societe) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_modele"
  ADD CONSTRAINT fk_table_modele_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_observation"
  ADD CONSTRAINT fk_table_observation_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_periodeadherence"
  ADD CONSTRAINT fk_table_periodeadherence_po_numero
  FOREIGN KEY (po_numero) REFERENCES table_Periode(PO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_periodeadherence"
  ADD CONSTRAINT fk_table_periodeadherence_ah_numero
  FOREIGN KEY (ah_numero) REFERENCES table_Adherence(AH_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_personne"
  ADD CONSTRAINT fk_table_personne_tp_numero
  FOREIGN KEY (tp_numero) REFERENCES table_TypePersonne(TP_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_personne"
  ADD CONSTRAINT fk_table_personne_np_numero
  FOREIGN KEY (np_numero) REFERENCES table_NaturePersonne(NP_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_piece"
  ADD CONSTRAINT fk_table_piece_jo_numero
  FOREIGN KEY (jo_numero) REFERENCES table_Journal(JO_Numero) 
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_piece"
  ADD CONSTRAINT fk_table_piece_ex_numero
  FOREIGN KEY (ex_numero) REFERENCES table_Exercice(EX_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_prix"
  ADD CONSTRAINT fk_table_prix_tv_numero
  FOREIGN KEY (tv_numero) REFERENCES table_Tva(TV_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_prix"
  ADD CONSTRAINT fk_table_prix_pd_numero
  FOREIGN KEY (pd_numero) REFERENCES table_Produit(PD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_produit"
  ADD CONSTRAINT fk_table_produit_jo_numero
  FOREIGN KEY (jo_numero) REFERENCES table_Journal(JO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_produit"
  ADD CONSTRAINT fk_table_produit_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_reglement"
  ADD CONSTRAINT fk_table_reglement_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_reglement"
  ADD CONSTRAINT fk_table_reglement_em_numero
  FOREIGN KEY (em_numero) REFERENCES table_Employe(EM_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_reglement"
  ADD CONSTRAINT fk_table_reglement_lr_numero
  FOREIGN KEY (lr_numero) REFERENCES table_ListeReglement(LR_Numero)
    ON DELETE SET NULL 
    ON UPDATE CASCADE;
ALTER TABLE "table_reglement"
  ADD CONSTRAINT fk_table_reglement_mr_numero
  FOREIGN KEY (mr_numero) REFERENCES table_ModeReglement(MR_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_reglement"
  ADD CONSTRAINT fk_table_reglement_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_repartition"
  ADD CONSTRAINT fk_table_repartition_rg_numero
  FOREIGN KEY (rg_numero) REFERENCES table_Reglement(RG_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_repartition"
  ADD CONSTRAINT fk_table_repartition_mp_numero
  FOREIGN KEY (mp_numero) REFERENCES table_ModeRepartition(MP_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_routage"
  ADD CONSTRAINT fk_table_routage_ad_numero
  FOREIGN KEY (ad_numero) REFERENCES table_Adresse(AD_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_routage"
  ADD CONSTRAINT fk_table_routage_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_routage"
  ADD CONSTRAINT fk_table_routage_fa_numero
  FOREIGN KEY (fa_numero) REFERENCES table_Facture(FA_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_sequencecache"
  ADD CONSTRAINT fk_table_sequencecache_sq_numero
  FOREIGN KEY (sq_numero) REFERENCES table_Sequence(SQ_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_service"
  ADD CONSTRAINT fk_table_service_se_societe
  FOREIGN KEY (se_societe) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_service"
  ADD CONSTRAINT fk_table_service_se_agent
  FOREIGN KEY (se_agent) REFERENCES table_Agent(AG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_societe"
  ADD CONSTRAINT fk_table_societe_pe_numero
  FOREIGN KEY (pe_numero) REFERENCES table_Personne(PE_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_societe"
  ADD CONSTRAINT fk_table_societe_ts_numero
  FOREIGN KEY (ts_numero) REFERENCES table_TypeSociete(TS_Numero);
ALTER TABLE "table_societe"
  ADD CONSTRAINT fk_table_societe_sq_numero
  FOREIGN KEY (sq_numero) REFERENCES table_Sequence(SQ_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_sujet"
  ADD CONSTRAINT fk_table_sujet_zu_numero
  FOREIGN KEY (zu_numero) REFERENCES table_TypeSujet(ZU_Numero)
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
ALTER TABLE "table_tva"
  ADD CONSTRAINT fk_table_tva_so_numero
  FOREIGN KEY (so_numero) REFERENCES table_Societe(SO_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_tva"
  ADD CONSTRAINT fk_table_tva_cg_numero
  FOREIGN KEY (cg_numero) REFERENCES table_CompteGen(CG_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_ville"
  ADD CONSTRAINT fk_table_ville_ct_numero
  FOREIGN KEY (ct_numero) REFERENCES table_Canton(CT_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_villecp"
  ADD CONSTRAINT fk_table_villecp_vi_numero
  FOREIGN KEY (vi_numero) REFERENCES table_Ville(VI_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;
ALTER TABLE "table_villecp"
  ADD CONSTRAINT fk_table_villecp_cp_numero
  FOREIGN KEY (cp_numero) REFERENCES table_CodePostal(CP_Numero)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;

-- Unique

-- Default
ALTER TABLE "table_acces" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_acces" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_acces" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_acces" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_activite" ALTER "za_numero" SET DEFAULT nextval('seq_activite');
ALTER TABLE "table_activite" ALTER "za_heuredebut" SET DEFAULT NULL;
ALTER TABLE "table_activite" ALTER "za_heurefin" SET DEFAULT NULL;
ALTER TABLE "table_activite" ALTER "za_duree" SET DEFAULT 0;
ALTER TABLE "table_activite" ALTER "em_numero" SET DEFAULT current_employe();
ALTER TABLE "table_activite" ALTER "za_pour" SET DEFAULT NULL;
ALTER TABLE "table_activite" ALTER "fa_numero" SET DEFAULT NULL;
ALTER TABLE "table_activite" ALTER "de_numero" SET DEFAULT NULL;
ALTER TABLE "table_activite" ALTER "pe_numero" SET DEFAULT NULL;
ALTER TABLE "table_activite" ALTER "zg_numero" SET DEFAULT NULL;
ALTER TABLE "table_activite" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_activite" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_activite" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_activite" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_adherence" ALTER "ah_reduction" SET DEFAULT 0;
ALTER TABLE "table_adherence" ALTER "ah_cascade" SET DEFAULT false;
ALTER TABLE "table_adherence" ALTER "ah_liendirect" SET DEFAULT false;
ALTER TABLE "table_adherence" ALTER "ah_lienindirect" SET DEFAULT false;
ALTER TABLE "table_adherence" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adherence" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adherence" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_adherence" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_adhesion" ALTER "as_numero" SET DEFAULT nextval('seq_adhesion');
ALTER TABLE "table_adhesion" ALTER "as_reductionmax" SET DEFAULT NULL;
ALTER TABLE "table_adhesion" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adhesion" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adhesion" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_adhesion" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_adresse" ALTER "ad_active" SET DEFAULT true;
ALTER TABLE "table_adresse" ALTER "ad_ligne2" SET DEFAULT NULL;
ALTER TABLE "table_adresse" ALTER "ad_ligne3" SET DEFAULT NULL;
ALTER TABLE "table_adresse" ALTER "ad_ligne4" SET DEFAULT NULL;
ALTER TABLE "table_adresse" ALTER "ad_ligne5" SET DEFAULT NULL;
ALTER TABLE "table_adresse" ALTER "ad_datestop" SET DEFAULT NULL;
ALTER TABLE "table_adresse" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adresse" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adresse" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_adresse" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_adresseversion" ALTER "aw_numero" SET DEFAULT nextval('seq_adresseversion');
ALTER TABLE "table_adresseversion" ALTER "aw_ligne2" SET DEFAULT NULL;
ALTER TABLE "table_adresseversion" ALTER "aw_ligne3" SET DEFAULT NULL;
ALTER TABLE "table_adresseversion" ALTER "aw_ligne4" SET DEFAULT NULL;
ALTER TABLE "table_adresseversion" ALTER "aw_ligne5" SET DEFAULT NULL;
ALTER TABLE "table_adresseversion" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adresseversion" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_adresseversion" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_adresseversion" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_agent" ALTER "ag_actif" SET DEFAULT true;
ALTER TABLE "table_agent" ALTER "eq_numero" SET DEFAULT NULL;
ALTER TABLE "table_agent" ALTER "ag_role" SET DEFAULT NULL;
ALTER TABLE "table_agent" ALTER "ag_telephone" SET DEFAULT NULL;
ALTER TABLE "table_agent" ALTER "ag_mobile" SET DEFAULT NULL;
ALTER TABLE "table_agent" ALTER "ag_email" SET DEFAULT NULL;
ALTER TABLE "table_agent" ALTER "ag_commentaire" SET DEFAULT NULL;
ALTER TABLE "table_agent" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_agent" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_agent" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_agent" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_appartienta" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_appartienta" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_appartienta" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_appartienta" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_appel" ALTER "ap_date" SET DEFAULT CURRENT_DATE;
ALTER TABLE "table_appel" ALTER "ap_description" SET DEFAULT NULL;
ALTER TABLE "table_appel" ALTER "ap_duree" SET DEFAULT NULL;
ALTER TABLE "table_appel" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_appel" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_appel" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_appel" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_attribut" ALTER "at_valeur" SET DEFAULT NULL;
ALTER TABLE "table_attribut" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_attribut" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_attribut" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_attribut" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_avoir" ALTER "av_date" SET DEFAULT CURRENT_DATE;
ALTER TABLE "table_avoir" ALTER "av_montantht" SET DEFAULT NULL;
ALTER TABLE "table_avoir" ALTER "av_montantttc" SET DEFAULT NULL;
ALTER TABLE "table_avoir" ALTER "av_reduction" SET DEFAULT NULL;
ALTER TABLE "table_avoir" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_avoir" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_avoir" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_avoir" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_canton" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_canton" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_canton" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_canton" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_categorie" ALTER "cr_description" SET DEFAULT NULL;
ALTER TABLE "table_categorie" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_categorie" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_categorie" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_categorie" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_codepostal" ALTER "cp_bureau" SET DEFAULT NULL;
ALTER TABLE "table_codepostal" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_codepostal" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_codepostal" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_codepostal" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_compteaux" ALTER "ca_debit" SET DEFAULT NULL;
ALTER TABLE "table_compteaux" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_compteaux" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_compteaux" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_compteaux" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_comptegen" ALTER "cg_accepteaux" SET DEFAULT true;
ALTER TABLE "table_comptegen" ALTER "cg_utilisable" SET DEFAULT true;
ALTER TABLE "table_comptegen" ALTER "cg_lettrable" SET DEFAULT true;
ALTER TABLE "table_comptegen" ALTER "cg_pointable" SET DEFAULT false;
ALTER TABLE "table_comptegen" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_comptegen" ALTER "cg_groupable" SET DEFAULT NULL;
ALTER TABLE "table_comptegen" ALTER "cg_debit" SET DEFAULT NULL;
ALTER TABLE "table_comptegen" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_comptegen" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_comptegen" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_comptegen" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_compteproduit" ALTER "ci_actif" SET DEFAULT true;
ALTER TABLE "table_compteproduit" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_compteproduit" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_compteproduit" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_compteproduit" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_constante" ALTER "cs_numero" SET DEFAULT nextval('seq_constante');
ALTER TABLE "table_constante" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_constante" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_constante" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_constante" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_contact" ALTER "cn_actif" SET DEFAULT true;
ALTER TABLE "table_contact" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_contact" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_contact" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_contact" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_contacttype" ALTER "ck_numero" SET DEFAULT nextval('seq_contacttype');
ALTER TABLE "table_contacttype" ALTER "ck_number" SET DEFAULT false;
ALTER TABLE "table_contacttype" ALTER "ck_email" SET DEFAULT false;
ALTER TABLE "table_contacttype" ALTER "ck_url" SET DEFAULT false;
ALTER TABLE "table_contacttype" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_contacttype" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_contacttype" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_contacttype" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_contactversion" ALTER "cw_numero" SET DEFAULT nextval('seq_contactversion');
ALTER TABLE "table_contactversion" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_contactversion" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_contactversion" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_contactversion" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_cotisation" ALTER "cs_standard" SET DEFAULT false;
ALTER TABLE "table_cotisation" ALTER "cs_detail" SET DEFAULT '{saved:false}';
ALTER TABLE "table_cotisation" ALTER "cs_duo" SET DEFAULT false;
ALTER TABLE "table_cotisation" ALTER "cs_done" SET DEFAULT false;
ALTER TABLE "table_cotisation" ALTER "cs_valid" SET DEFAULT false;
ALTER TABLE "table_cotisation" ALTER "cs_montant" SET DEFAULT 0;
ALTER TABLE "table_cotisation" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_cotisation" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_cotisation" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_cotisation" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_devis" ALTER "de_date" SET DEFAULT CURRENT_DATE;
ALTER TABLE "table_devis" ALTER "de_libelle" SET DEFAULT NULL;
ALTER TABLE "table_devis" ALTER "de_locked" SET DEFAULT false;
ALTER TABLE "table_devis" ALTER "de_acompte" SET DEFAULT false;
ALTER TABLE "table_devis" ALTER "de_lettre" SET DEFAULT false;
ALTER TABLE "table_devis" ALTER "de_civilites" SET DEFAULT NULL;
ALTER TABLE "table_devis" ALTER "de_introduction" SET DEFAULT NULL;
ALTER TABLE "table_devis" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_devis" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_devis" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_devis" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_droit" ALTER "dr_select" SET DEFAULT false;
ALTER TABLE "table_droit" ALTER "dr_insert" SET DEFAULT false;
ALTER TABLE "table_droit" ALTER "dr_update" SET DEFAULT false;
ALTER TABLE "table_droit" ALTER "dr_delete" SET DEFAULT false;
ALTER TABLE "table_droit" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_droit" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_droit" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_droit" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_droitprofil" ALTER "dp_numero" SET DEFAULT nextval('seq_droitprofil');
ALTER TABLE "table_droitprofil" ALTER "dp_notes" SET DEFAULT NULL;
ALTER TABLE "table_droitprofil" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_droitprofil" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_droitprofil" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_droitprofil" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_ecriture" ALTER "cg_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "ca_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "ec_debit" SET DEFAULT 0;
ALTER TABLE "table_ecriture" ALTER "ec_credit" SET DEFAULT 0;
ALTER TABLE "table_ecriture" ALTER "pt_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "av_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "lt_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "db_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "rg_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "fa_numero" SET DEFAULT NULL;
ALTER TABLE "table_ecriture" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ecriture" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ecriture" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_ecriture" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_employe" ALTER "em_reglement" SET DEFAULT false;
ALTER TABLE "table_employe" ALTER "em_self_invoicing" SET DEFAULT true;
ALTER TABLE "table_employe" ALTER "em_service_invoicing" SET DEFAULT false;
ALTER TABLE "table_employe" ALTER "em_societe_invoicing" SET DEFAULT false;
ALTER TABLE "table_employe" ALTER "em_personne_editing" SET DEFAULT false;
ALTER TABLE "table_employe" ALTER "em_super" SET DEFAULT false;
ALTER TABLE "table_employe" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_employe" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_employe" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_employe" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_equipe" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_equipe" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_equipe" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_equipe" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_estlie" ALTER "el_numero" SET DEFAULT nextval('seq_estlie');
ALTER TABLE "table_estlie" ALTER "el_actif" SET DEFAULT true;
ALTER TABLE "table_estlie" ALTER "el_debut" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_estlie" ALTER "el_fin" SET DEFAULT NULL;
ALTER TABLE "table_estlie" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_estlie" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_estlie" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_estlie" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_estresponsable" ALTER "peac_periodefin" SET DEFAULT NULL;
ALTER TABLE "table_estresponsable" ALTER "peac_titre" SET DEFAULT NULL;
ALTER TABLE "table_estresponsable" ALTER "peac_fini" SET DEFAULT false;
ALTER TABLE "table_estresponsable" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_estresponsable" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_estresponsable" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_estresponsable" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_evoplus" ALTER "proposition" SET DEFAULT false;
ALTER TABLE "table_evoplus" ALTER "aava" SET DEFAULT false;
ALTER TABLE "table_evoplus" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_evoplus" ALTER "created_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_exercice" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_exercice" ALTER "ex_cloture" SET DEFAULT false;
ALTER TABLE "table_exercice" ALTER "ex_password" SET DEFAULT md5('root');
ALTER TABLE "table_exercice" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_exercice" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_exercice" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_exercice" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_facture" ALTER "fa_date" SET DEFAULT CURRENT_DATE;
ALTER TABLE "table_facture" ALTER "fa_perte" SET DEFAULT false;
ALTER TABLE "table_facture" ALTER "fa_reduction" SET DEFAULT 0;
ALTER TABLE "table_facture" ALTER "fa_montantht" SET DEFAULT 0;
ALTER TABLE "table_facture" ALTER "fa_montantttc" SET DEFAULT 0;
ALTER TABLE "table_facture" ALTER "fa_accompte" SET DEFAULT NULL;
ALTER TABLE "table_facture" ALTER "fa_annotation" SET DEFAULT NULL;
ALTER TABLE "table_facture" ALTER "fa_libelle" SET DEFAULT NULL;
ALTER TABLE "table_facture" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_facture" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_facture" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_facture" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_facture" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_facturereglement" ALTER "fr_numero" SET DEFAULT nextval('seq_facturereglement');
ALTER TABLE "table_facturereglement" ALTER "fr_acompte" SET DEFAULT false;
ALTER TABLE "table_facturereglement" ALTER "fr_partiel" SET DEFAULT false;
ALTER TABLE "table_facturereglement" ALTER "fr_montant" SET DEFAULT 0;
ALTER TABLE "table_facturereglement" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_facturereglement" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_facturereglement" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_facturereglement" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_groupe" ALTER "zg_numero" SET DEFAULT nextval('seq_groupe');
ALTER TABLE "table_groupe" ALTER "zg_notes" SET DEFAULT NULL;
ALTER TABLE "table_groupe" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_groupe" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_groupe" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_groupe" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_groupecanton" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_groupecanton" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_groupecanton" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_groupecanton" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_groupetable" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_groupetable" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_groupetable" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_groupetable" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_impression" ALTER "im_societe" SET DEFAULT current_societe();
ALTER TABLE "table_impression" ALTER "im_keydate" SET DEFAULT NULL;
ALTER TABLE "table_impression" ALTER "im_fonction" SET DEFAULT 'no_name';
ALTER TABLE "table_impression" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impression" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impression" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_impression" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_impressiondocument" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impressiondocument" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impressiondocument" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_impressiondocument" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_impressiongroupe" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impressiongroupe" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impressiongroupe" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_impressiongroupe" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_impressionlot" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impressionlot" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_impressionlot" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_impressionlot" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_journal" ALTER "jo_debit" SET DEFAULT 0;
ALTER TABLE "table_journal" ALTER "jo_credit" SET DEFAULT 0;
ALTER TABLE "table_journal" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_journal" ALTER "tj_numero" SET DEFAULT NULL;
ALTER TABLE "table_journal" ALTER "cg_numero" SET DEFAULT NULL;
ALTER TABLE "table_journal" ALTER "jo_mois" SET DEFAULT 1;
ALTER TABLE "table_journal" ALTER "jo_annee" SET DEFAULT 1900;
ALTER TABLE "table_journal" ALTER "jo_contrepartie" SET DEFAULT false;
ALTER TABLE "table_journal" ALTER "jo_provisoire" SET DEFAULT false;
ALTER TABLE "table_journal" ALTER "jo_visible" SET DEFAULT true;
ALTER TABLE "table_journal" ALTER "jo_sequence" SET DEFAULT NULL;
ALTER TABLE "table_journal" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_journal" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_journal" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_journal" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_lettrage" ALTER "lt_lettre" SET DEFAULT NULL;
ALTER TABLE "table_lettrage" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_lettrage" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lettrage" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lettrage" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_lettrage" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_lieu" ALTER "zl_numero" SET DEFAULT nextval('seq_lieu');
ALTER TABLE "table_lieu" ALTER "zl_notes" SET DEFAULT NULL;
ALTER TABLE "table_lieu" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lieu" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lieu" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_lieu" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_ligne" ALTER "l_numero" SET DEFAULT nextval('seq_ligne');
ALTER TABLE "table_ligne" ALTER "l_quantite" SET DEFAULT 1;
ALTER TABLE "table_ligne" ALTER "px_numero" SET DEFAULT NULL;
ALTER TABLE "table_ligne" ALTER "l_notes" SET DEFAULT NULL;
ALTER TABLE "table_ligne" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ligne" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ligne" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_ligne" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_ligneavoir" ALTER "la_quantite" SET DEFAULT 0;
ALTER TABLE "table_ligneavoir" ALTER "la_montantht" SET DEFAULT NULL;
ALTER TABLE "table_ligneavoir" ALTER "la_montantttc" SET DEFAULT NULL;
ALTER TABLE "table_ligneavoir" ALTER "la_notes" SET DEFAULT NULL;
ALTER TABLE "table_ligneavoir" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ligneavoir" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ligneavoir" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_ligneavoir" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_lignecotisation" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lignecotisation" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lignecotisation" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_lignecotisation" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_lignefacture" ALTER "lf_numero" SET DEFAULT nextval('seq_lignefacture');
ALTER TABLE "table_lignefacture" ALTER "px_numero" SET DEFAULT NULL;
ALTER TABLE "table_lignefacture" ALTER "pd_numero" SET DEFAULT NULL;
ALTER TABLE "table_lignefacture" ALTER "lf_quantite" SET DEFAULT 0;
ALTER TABLE "table_lignefacture" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lignefacture" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lignefacture" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_lignefacture" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_lignemodele" ALTER "lm_quantite" SET DEFAULT 1;
ALTER TABLE "table_lignemodele" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lignemodele" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_lignemodele" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_lignemodele" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_listereglement" ALTER "lr_numero" SET DEFAULT nextval('seq_listereglement');
ALTER TABLE "table_listereglement" ALTER "lr_indice" SET DEFAULT 1;
ALTER TABLE "table_listereglement" ALTER "lr_montant" SET DEFAULT 0;
ALTER TABLE "table_listereglement" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_listereglement" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_listereglement" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_listereglement" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_listereglement" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_modereglement" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_modereglement" ALTER "mr_cheque" SET DEFAULT false;
ALTER TABLE "table_modereglement" ALTER "mr_actif" SET DEFAULT true;
ALTER TABLE "table_modereglement" ALTER "mr_description" SET DEFAULT NULL;
ALTER TABLE "table_modereglement" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_modereglement" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_modereglement" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_modereglement" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_moderepartition" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_moderepartition" ALTER "mp_actif" SET DEFAULT true;
ALTER TABLE "table_moderepartition" ALTER "mp_societe" SET DEFAULT NULL;
ALTER TABLE "table_moderepartition" ALTER "mp_description" SET DEFAULT NULL;
ALTER TABLE "table_moderepartition" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_moderepartition" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_moderepartition" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_moderepartition" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_modele" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_modele" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_modele" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_modele" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_modele" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_naturepersonne" ALTER "np_numero" SET DEFAULT nextval('seq_naturepersonne');
ALTER TABLE "table_naturepersonne" ALTER "np_morale" SET DEFAULT false;
ALTER TABLE "table_naturepersonne" ALTER "np_avectitre" SET DEFAULT false;
ALTER TABLE "table_naturepersonne" ALTER "np_inclu" SET DEFAULT false;
ALTER TABLE "table_naturepersonne" ALTER "np_temporaire" SET DEFAULT false;
ALTER TABLE "table_naturepersonne" ALTER "np_genre" SET DEFAULT 'MORALE';
ALTER TABLE "table_naturepersonne" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_naturepersonne" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_naturepersonne" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_naturepersonne" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_nonadherent" ALTER "na_numero" SET DEFAULT nextval('seq_nonadherent');
ALTER TABLE "table_nonadherent" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_nonadherent" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_nonadherent" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_nonadherent" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_observation" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_observation" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_observation" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_observation" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_periode" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_periode" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_periode" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_periode" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_periodeadherence" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_periodeadherence" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_periodeadherence" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_periodeadherence" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_personne" ALTER "tp_numero" SET DEFAULT 3;
ALTER TABLE "table_personne" ALTER "pe_regimefiscal" SET DEFAULT 'NON RENSEIGNE';
ALTER TABLE "table_personne" ALTER "pe_actif" SET DEFAULT true;
ALTER TABLE "table_personne" ALTER "pe_morale" SET DEFAULT false;
ALTER TABLE "table_personne" ALTER "deleted" SET DEFAULT false;
ALTER TABLE "table_personne" ALTER "pe_prenom" SET DEFAULT NULL;
ALTER TABLE "table_personne" ALTER "pe_motdepasse" SET DEFAULT NULL;
ALTER TABLE "table_personne" ALTER "pe_naissance" SET DEFAULT NULL;
ALTER TABLE "table_personne" ALTER "pe_numtvaic" SET DEFAULT NULL;
ALTER TABLE "table_personne" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_personne" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_personne" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_personne" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_personneupdate" ALTER "pu_numero" SET DEFAULT nextval('seq_personneupdate');
ALTER TABLE "table_personneupdate" ALTER "pu_action" SET DEFAULT NULL;
ALTER TABLE "table_personneupdate" ALTER "pu_bilan" SET DEFAULT NULL;
ALTER TABLE "table_personneupdate" ALTER "pe_regimefiscal" SET DEFAULT 'NON RENSEIGNE';
ALTER TABLE "table_personneupdate" ALTER "pe_morale" SET DEFAULT false;
ALTER TABLE "table_personneupdate" ALTER "pe_prenom" SET DEFAULT NULL;
ALTER TABLE "table_personneupdate" ALTER "pe_naissance" SET DEFAULT NULL;
ALTER TABLE "table_personneupdate" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_personneupdate" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_personneupdate" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_personneupdate" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_piece" ALTER "pi_debit" SET DEFAULT 0;
ALTER TABLE "table_piece" ALTER "pi_credit" SET DEFAULT 0;
ALTER TABLE "table_piece" ALTER "pi_date" SET DEFAULT CURRENT_DATE;
ALTER TABLE "table_piece" ALTER "pi_numseq" SET DEFAULT NULL;
ALTER TABLE "table_piece" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_piece" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_piece" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_piece" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_pointage" ALTER "pt_date" SET DEFAULT CURRENT_DATE;
ALTER TABLE "table_pointage" ALTER "pt_debit" SET DEFAULT 0;
ALTER TABLE "table_pointage" ALTER "pt_credit" SET DEFAULT 0;
ALTER TABLE "table_pointage" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_pointage" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_pointage" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_pointage" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_pointage" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_prefixe" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_prefixe" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_prefixe" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_prefixe" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_prix" ALTER "px_numero" SET DEFAULT nextval('seq_prix');
ALTER TABLE "table_prix" ALTER "px_actif" SET DEFAULT true;
ALTER TABLE "table_prix" ALTER "px_datedebut" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_prix" ALTER "px_datefin" SET DEFAULT NULL;
ALTER TABLE "table_prix" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_prix" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_prix" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_prix" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_produit" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_produit" ALTER "pd_actif" SET DEFAULT true;
ALTER TABLE "table_produit" ALTER "pd_sansquantite" SET DEFAULT false;
ALTER TABLE "table_produit" ALTER "pd_reduction" SET DEFAULT false;
ALTER TABLE "table_produit" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_produit" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_produit" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_produit" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_reglement" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_reglement" ALTER "rg_encompta" SET DEFAULT false;
ALTER TABLE "table_reglement" ALTER "rg_libellebanque" SET DEFAULT NULL;
ALTER TABLE "table_reglement" ALTER "rg_numerocompte" SET DEFAULT NULL;
ALTER TABLE "table_reglement" ALTER "rg_reference" SET DEFAULT NULL;
ALTER TABLE "table_reglement" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_reglement" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_reglement" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_reglement" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_repartition" ALTER "rp_numero" SET DEFAULT nextval('seq_repartition');
ALTER TABLE "table_repartition" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_repartition" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_repartition" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_repartition" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_responsabilite" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_responsabilite" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_responsabilite" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_responsabilite" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_routage" ALTER "ro_numero" SET DEFAULT nextval('seq_routage');
ALTER TABLE "table_routage" ALTER "ro_quantite" SET DEFAULT 1;
ALTER TABLE "table_routage" ALTER "ro_suspendu" SET DEFAULT false;
ALTER TABLE "table_routage" ALTER "ro_dernierroute" SET DEFAULT NULL;
ALTER TABLE "table_routage" ALTER "fa_numero" SET DEFAULT NULL;
ALTER TABLE "table_routage" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_routage" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_routage" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_routage" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_sequence" ALTER "sq_last" SET DEFAULT 1;
ALTER TABLE "table_sequence" ALTER "sq_nombre" SET DEFAULT 50;
ALTER TABLE "table_sequence" ALTER "sq_used_on" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_sequence" ALTER "sq_clear_cache" SET DEFAULT false;
ALTER TABLE "table_sequence" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_sequence" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_sequence" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_sequence" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_sequencecache" ALTER "sc_locked" SET DEFAULT false;
ALTER TABLE "table_sequencecache" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_sequencecache" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_sequencecache" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_sequencecache" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_service" ALTER "se_agent" SET DEFAULT NULL;
ALTER TABLE "table_service" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_service" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_service" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_service" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_societe" ALTER "pe_numero" SET DEFAULT NULL;
ALTER TABLE "table_societe" ALTER "so_detail" SET DEFAULT NULL;
ALTER TABLE "table_societe" ALTER "ts_numero" SET DEFAULT NULL;
ALTER TABLE "table_societe" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_societe" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_societe" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_societe" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_sujet" ALTER "zs_numero" SET DEFAULT nextval('seq_sujet');
ALTER TABLE "table_sujet" ALTER "zs_notes" SET DEFAULT NULL;
ALTER TABLE "table_sujet" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_sujet" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_sujet" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_sujet" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_tache" ALTER "zt_numero" SET DEFAULT nextval('seq_tache');
ALTER TABLE "table_tache" ALTER "zt_notes" SET DEFAULT NULL;
ALTER TABLE "table_tache" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_tache" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_tache" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_tache" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_tva" ALTER "tv_taux" SET DEFAULT 0;
ALTER TABLE "table_tva" ALTER "tv_actif" SET DEFAULT true;
ALTER TABLE "table_tva" ALTER "so_numero" SET DEFAULT current_societe();
ALTER TABLE "table_tva" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_tva" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_tva" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_tva" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typeadresse" ALTER "ak_numero" SET DEFAULT nextval('seq_typeadresse');
ALTER TABLE "table_typeadresse" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typeadresse" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typeadresse" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typeadresse" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typeattribut" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typeattribut" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typeattribut" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typeattribut" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typejournal" ALTER "tj_libelle" SET DEFAULT NULL;
ALTER TABLE "table_typejournal" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typejournal" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typejournal" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typejournal" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typelien" ALTER "tl_numero" SET DEFAULT nextval('seq_typelien');
ALTER TABLE "table_typelien" ALTER "tl_code" SET DEFAULT ('>'::text || fc_password(7));
ALTER TABLE "table_typelien" ALTER "tl_action12" SET DEFAULT '[NoAction]';
ALTER TABLE "table_typelien" ALTER "tl_action21" SET DEFAULT '[NoReverseAction]';
ALTER TABLE "table_typelien" ALTER "tl_description" SET DEFAULT NULL;
ALTER TABLE "table_typelien" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typelien" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typelien" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typelien" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typepersonne" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typepersonne" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typepersonne" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typepersonne" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typesociete" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typesociete" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typesociete" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typesociete" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typesujet" ALTER "zu_numero" SET DEFAULT nextval('seq_typesujet');
ALTER TABLE "table_typesujet" ALTER "zu_notes" SET DEFAULT NULL;
ALTER TABLE "table_typesujet" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typesujet" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typesujet" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typesujet" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_typetache" ALTER "th_description" SET DEFAULT NULL;
ALTER TABLE "table_typetache" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typetache" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_typetache" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_typetache" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_ville" ALTER "ct_numero" SET DEFAULT NULL;
ALTER TABLE "table_ville" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ville" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_ville" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_ville" ALTER "lock_version" SET DEFAULT 0;
ALTER TABLE "table_villecp" ALTER "created_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_villecp" ALTER "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "table_villecp" ALTER "updated_by" SET DEFAULT CURRENT_USER;
ALTER TABLE "table_villecp" ALTER "lock_version" SET DEFAULT 0;

-- Not null
ALTER TABLE "table_acces" ALTER "ac_numero" SET NOT NULL ;
ALTER TABLE "table_acces" ALTER "ac_libelle" SET NOT NULL ;
ALTER TABLE "table_acces" ALTER "ac_niveau" SET NOT NULL ;
ALTER TABLE "table_acces" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_acces" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "za_numero" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "za_date" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "za_duree" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "em_numero" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "zt_numero" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "zs_numero" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "zl_numero" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "za_qui" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "za_champ" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_activite" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "ah_numero" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "pd_numero" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "ah_libelle" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "ah_reduction" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "ah_cascade" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "ah_liendirect" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "ah_lienindirect" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_adherence" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "as_numero" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "po_numero" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "ah_numero" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "fa_numero" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "lf_numero" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "as_origine" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_adhesion" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "ad_numero" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "ak_numero" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "cp_numero" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "vi_numero" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "ad_active" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_adresse" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "aw_numero" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "ad_numero" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "ak_numero" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "cp_numero" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "vi_numero" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "version" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "operation" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_adresseversion" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_agent" ALTER "ag_numero" SET NOT NULL ;
ALTER TABLE "table_agent" ALTER "ag_nom" SET NOT NULL ;
ALTER TABLE "table_agent" ALTER "ag_prenom" SET NOT NULL ;
ALTER TABLE "table_agent" ALTER "ag_initiales" SET NOT NULL ;
ALTER TABLE "table_agent" ALTER "ag_actif" SET NOT NULL ;
ALTER TABLE "table_agent" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_agent" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_appartienta" ALTER "ct_numero" SET NOT NULL ;
ALTER TABLE "table_appartienta" ALTER "gc_numero" SET NOT NULL ;
ALTER TABLE "table_appartienta" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_appartienta" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_appel" ALTER "ap_numero" SET NOT NULL ;
ALTER TABLE "table_appel" ALTER "ap_libelle" SET NOT NULL ;
ALTER TABLE "table_appel" ALTER "th_numero" SET NOT NULL ;
ALTER TABLE "table_appel" ALTER "ap_date" SET NOT NULL ;
ALTER TABLE "table_appel" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_appel" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_appel" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_attribut" ALTER "at_numero" SET NOT NULL ;
ALTER TABLE "table_attribut" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_attribut" ALTER "ta_numero" SET NOT NULL ;
ALTER TABLE "table_attribut" ALTER "cr_numero" SET NOT NULL ;
ALTER TABLE "table_attribut" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_attribut" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_avoir" ALTER "av_numero" SET NOT NULL ;
ALTER TABLE "table_avoir" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_avoir" ALTER "fa_numero" SET NOT NULL ;
ALTER TABLE "table_avoir" ALTER "av_numfact" SET NOT NULL ;
ALTER TABLE "table_avoir" ALTER "av_date" SET NOT NULL ;
ALTER TABLE "table_avoir" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_avoir" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_canton" ALTER "ct_numero" SET NOT NULL ;
ALTER TABLE "table_canton" ALTER "ct_nom" SET NOT NULL ;
ALTER TABLE "table_canton" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_canton" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_categorie" ALTER "cr_numero" SET NOT NULL ;
ALTER TABLE "table_categorie" ALTER "cr_libelle" SET NOT NULL ;
ALTER TABLE "table_categorie" ALTER "ta_numero" SET NOT NULL ;
ALTER TABLE "table_categorie" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_categorie" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_codepostal" ALTER "cp_numero" SET NOT NULL ;
ALTER TABLE "table_codepostal" ALTER "cp_codepostal" SET NOT NULL ;
ALTER TABLE "table_codepostal" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_codepostal" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_compteaux" ALTER "ca_numero" SET NOT NULL ;
ALTER TABLE "table_compteaux" ALTER "cg_numero" SET NOT NULL ;
ALTER TABLE "table_compteaux" ALTER "ca_numcompte" SET NOT NULL ;
ALTER TABLE "table_compteaux" ALTER "ca_libelle" SET NOT NULL ;
ALTER TABLE "table_compteaux" ALTER "ac_numero" SET NOT NULL ;
ALTER TABLE "table_compteaux" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_compteaux" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "cg_numero" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "cg_numcompte" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "cg_libelle" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "ac_numero" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "cg_accepteaux" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "cg_utilisable" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "cg_lettrable" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "cg_pointable" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_comptegen" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_compteproduit" ALTER "ci_numero" SET NOT NULL ;
ALTER TABLE "table_compteproduit" ALTER "pd_numero" SET NOT NULL ;
ALTER TABLE "table_compteproduit" ALTER "cg_numero" SET NOT NULL ;
ALTER TABLE "table_compteproduit" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_compteproduit" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_constante" ALTER "cs_numero" SET NOT NULL ;
ALTER TABLE "table_constante" ALTER "cs_type" SET NOT NULL ;
ALTER TABLE "table_constante" ALTER "cs_valeur" SET NOT NULL ;
ALTER TABLE "table_constante" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_constante" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_contact" ALTER "cn_numero" SET NOT NULL ;
ALTER TABLE "table_contact" ALTER "cn_coordonnee" SET NOT NULL ;
ALTER TABLE "table_contact" ALTER "cn_actif" SET NOT NULL ;
ALTER TABLE "table_contact" ALTER "ck_numero" SET NOT NULL ;
ALTER TABLE "table_contact" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_contact" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_contact" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "ck_numero" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "ck_code" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "ck_nom" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "ck_number" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "ck_email" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "ck_url" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_contacttype" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "cw_numero" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "cw_coordonnee" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "ck_numero" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "cn_numero" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "version" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "operation" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_contactversion" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_numero" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_standard" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_annee" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_detail" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_duo" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_done" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_valid" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_nature" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "cs_montant" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_cotisation" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "de_numero" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "em_numero" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "de_acompte" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "de_lettre" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_devis" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "dr_numero" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "dp_numero" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "gt_numero" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "dr_select" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "dr_insert" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "dr_update" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "dr_delete" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_droit" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_droitprofil" ALTER "dp_numero" SET NOT NULL ;
ALTER TABLE "table_droitprofil" ALTER "dp_libelle" SET NOT NULL ;
ALTER TABLE "table_droitprofil" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_droitprofil" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ec_numero" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ec_numecriture" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "pi_numero" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ex_numero" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ec_aux" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "pf_numero" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ec_compte" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ec_libelle" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ec_debit" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "ec_credit" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_ecriture" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_numero" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "dp_numero" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_emploi" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_service" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_agent" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_login" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_reglement" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_self_invoicing" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_service_invoicing" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_societe_invoicing" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_personne_editing" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_acces" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_password" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "em_super" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_employe" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_equipe" ALTER "eq_numero" SET NOT NULL ;
ALTER TABLE "table_equipe" ALTER "eq_nom" SET NOT NULL ;
ALTER TABLE "table_equipe" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_equipe" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "el_numero" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "el_personne1" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "el_personne2" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "el_actif" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "tl_numero" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "tl_code" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "el_debut" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_estlie" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_estresponsable" ALTER "peac_numero" SET NOT NULL ;
ALTER TABLE "table_estresponsable" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_estresponsable" ALTER "re_numero" SET NOT NULL ;
ALTER TABLE "table_estresponsable" ALTER "peac_periodedebut" SET NOT NULL ;
ALTER TABLE "table_estresponsable" ALTER "peac_fini" SET NOT NULL ;
ALTER TABLE "table_estresponsable" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_estresponsable" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_evoplus" ALTER "proposition" SET NOT NULL ;
ALTER TABLE "table_evoplus" ALTER "aava" SET NOT NULL ;
ALTER TABLE "table_evoplus" ALTER "created_at" SET NOT NULL ;
ALTER TABLE "table_evoplus" ALTER "created_by" SET NOT NULL ;
ALTER TABLE "table_evoplus" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "ex_numero" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "ex_datedebut" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "ex_datefin" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "ex_cloture" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "ex_password" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_exercice" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "fa_numero" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "de_numero" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "ag_numero" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "fa_numfact" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "fa_date" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "fa_perte" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "fa_reduction" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "fa_montantht" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "fa_montantttc" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_facture" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "fr_numero" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "rg_numero" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "fa_numero" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "fr_acompte" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "fr_partiel" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "fr_montant" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_facturereglement" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_groupe" ALTER "zg_numero" SET NOT NULL ;
ALTER TABLE "table_groupe" ALTER "zg_libelle" SET NOT NULL ;
ALTER TABLE "table_groupe" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_groupe" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_groupecanton" ALTER "gc_numero" SET NOT NULL ;
ALTER TABLE "table_groupecanton" ALTER "gc_nom" SET NOT NULL ;
ALTER TABLE "table_groupecanton" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_groupecanton" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_groupetable" ALTER "gt_numero" SET NOT NULL ;
ALTER TABLE "table_groupetable" ALTER "gt_libelle" SET NOT NULL ;
ALTER TABLE "table_groupetable" ALTER "gt_tables" SET NOT NULL ;
ALTER TABLE "table_groupetable" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_groupetable" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_numero" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_libelle" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_nom" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_societe" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_modele" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_defaut" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_keytable" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_keycle" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "im_fonction" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_impression" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_impressiondocument" ALTER "id_numero" SET NOT NULL ;
ALTER TABLE "table_impressiondocument" ALTER "ig_numero" SET NOT NULL ;
ALTER TABLE "table_impressiondocument" ALTER "id_cle" SET NOT NULL ;
ALTER TABLE "table_impressiondocument" ALTER "id_modele" SET NOT NULL ;
ALTER TABLE "table_impressiondocument" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_impressiondocument" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_impressiongroupe" ALTER "ig_numero" SET NOT NULL ;
ALTER TABLE "table_impressiongroupe" ALTER "il_numero" SET NOT NULL ;
ALTER TABLE "table_impressiongroupe" ALTER "ig_date" SET NOT NULL ;
ALTER TABLE "table_impressiongroupe" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_impressiongroupe" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_impressionlot" ALTER "il_numero" SET NOT NULL ;
ALTER TABLE "table_impressionlot" ALTER "il_nom" SET NOT NULL ;
ALTER TABLE "table_impressionlot" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_impressionlot" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_numero" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_abbrev" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_libelle" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_debit" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_credit" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_mois" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_annee" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_contrepartie" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_provisoire" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "jo_visible" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_journal" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_lettrage" ALTER "lt_numero" SET NOT NULL ;
ALTER TABLE "table_lettrage" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_lettrage" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_lettrage" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_lieu" ALTER "zl_numero" SET NOT NULL ;
ALTER TABLE "table_lieu" ALTER "zl_libelle" SET NOT NULL ;
ALTER TABLE "table_lieu" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_lieu" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_ligne" ALTER "l_numero" SET NOT NULL ;
ALTER TABLE "table_ligne" ALTER "pd_numero" SET NOT NULL ;
ALTER TABLE "table_ligne" ALTER "de_numero" SET NOT NULL ;
ALTER TABLE "table_ligne" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_ligne" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_ligneavoir" ALTER "la_numero" SET NOT NULL ;
ALTER TABLE "table_ligneavoir" ALTER "pd_numero" SET NOT NULL ;
ALTER TABLE "table_ligneavoir" ALTER "av_numero" SET NOT NULL ;
ALTER TABLE "table_ligneavoir" ALTER "px_numero" SET NOT NULL ;
ALTER TABLE "table_ligneavoir" ALTER "la_quantite" SET NOT NULL ;
ALTER TABLE "table_ligneavoir" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_ligneavoir" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_lignecotisation" ALTER "lc_numero" SET NOT NULL ;
ALTER TABLE "table_lignecotisation" ALTER "key" SET NOT NULL ;
ALTER TABLE "table_lignecotisation" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_lignecotisation" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_lignefacture" ALTER "lf_numero" SET NOT NULL ;
ALTER TABLE "table_lignefacture" ALTER "fa_numero" SET NOT NULL ;
ALTER TABLE "table_lignefacture" ALTER "lf_quantite" SET NOT NULL ;
ALTER TABLE "table_lignefacture" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_lignefacture" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_lignemodele" ALTER "lm_numero" SET NOT NULL ;
ALTER TABLE "table_lignemodele" ALTER "pd_numero" SET NOT NULL ;
ALTER TABLE "table_lignemodele" ALTER "mo_numero" SET NOT NULL ;
ALTER TABLE "table_lignemodele" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_lignemodele" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "lr_numero" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "em_numero" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "lr_montant" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "lr_date" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "mr_numero" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_listereglement" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "mr_numero" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "mr_libelle" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "mr_compte" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "cg_numero" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "mr_cheque" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "mr_actif" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_modereglement" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_moderepartition" ALTER "mp_numero" SET NOT NULL ;
ALTER TABLE "table_moderepartition" ALTER "mp_libelle" SET NOT NULL ;
ALTER TABLE "table_moderepartition" ALTER "cg_numero" SET NOT NULL ;
ALTER TABLE "table_moderepartition" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_moderepartition" ALTER "mp_actif" SET NOT NULL ;
ALTER TABLE "table_moderepartition" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_moderepartition" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_modele" ALTER "mo_numero" SET NOT NULL ;
ALTER TABLE "table_modele" ALTER "mo_libelle" SET NOT NULL ;
ALTER TABLE "table_modele" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_modele" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_modele" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_numero" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_nom" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_abrev" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_titre" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_morale" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_avectitre" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_inclu" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_temporaire" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "np_genre" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_naturepersonne" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_nonadherent" ALTER "na_numero" SET NOT NULL ;
ALTER TABLE "table_nonadherent" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_nonadherent" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_observation" ALTER "ob_numero" SET NOT NULL ;
ALTER TABLE "table_observation" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_observation" ALTER "ob_observation" SET NOT NULL ;
ALTER TABLE "table_observation" ALTER "ob_niveau" SET NOT NULL ;
ALTER TABLE "table_observation" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_observation" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_periode" ALTER "po_numero" SET NOT NULL ;
ALTER TABLE "table_periode" ALTER "po_debut" SET NOT NULL ;
ALTER TABLE "table_periode" ALTER "po_fin" SET NOT NULL ;
ALTER TABLE "table_periode" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_periode" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_periodeadherence" ALTER "po_numero" SET NOT NULL ;
ALTER TABLE "table_periodeadherence" ALTER "ah_numero" SET NOT NULL ;
ALTER TABLE "table_periodeadherence" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_periodeadherence" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "tp_numero" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "np_numero" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "pe_titre" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "pe_nom" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "pe_regimefiscal" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "pe_actif" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "pe_morale" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "deleted" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_personne" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "pu_numero" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "tp_numero" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "pe_titre" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "pe_nom" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "pe_regimefiscal" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "pe_morale" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_personneupdate" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "pi_numero" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "jo_numero" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "pi_numpiece" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "ex_numero" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "pi_libelle" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "pi_debit" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "pi_credit" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "pi_date" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_piece" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "pt_numero" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "pt_date" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "pt_releve" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "pt_debit" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "pt_credit" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_pointage" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_prefixe" ALTER "pf_numero" SET NOT NULL ;
ALTER TABLE "table_prefixe" ALTER "pf_nom" SET NOT NULL ;
ALTER TABLE "table_prefixe" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_prefixe" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "px_numero" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "tv_numero" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "pd_numero" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "px_tarifht" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "px_tarifttc" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "px_actif" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_prix" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "pd_numero" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "pd_id" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "pd_libelle" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "pd_titre" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "jo_numero" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "pd_actif" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "pd_sansquantite" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "pd_reduction" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_produit" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "rg_numero" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "rg_montant" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "rg_date" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "em_numero" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "mr_numero" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "rg_encompta" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_reglement" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_repartition" ALTER "rp_numero" SET NOT NULL ;
ALTER TABLE "table_repartition" ALTER "rg_numero" SET NOT NULL ;
ALTER TABLE "table_repartition" ALTER "mp_numero" SET NOT NULL ;
ALTER TABLE "table_repartition" ALTER "rp_montant" SET NOT NULL ;
ALTER TABLE "table_repartition" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_repartition" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_responsabilite" ALTER "re_numero" SET NOT NULL ;
ALTER TABLE "table_responsabilite" ALTER "re_code" SET NOT NULL ;
ALTER TABLE "table_responsabilite" ALTER "re_nom" SET NOT NULL ;
ALTER TABLE "table_responsabilite" ALTER "re_famille" SET NOT NULL ;
ALTER TABLE "table_responsabilite" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_responsabilite" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "ro_numero" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "ad_numero" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "pe_numero" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "ro_debutservice" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "ro_finservice" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "ro_quantite" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "ro_suspendu" SET NOT NULL ;
ALTER TABLE "table_routage" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "sq_numero" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "sq_nom" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "sq_last" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "sq_nombre" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "sq_used_on" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "sq_clear_cache" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_sequence" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_sequencecache" ALTER "sc_numero" SET NOT NULL ;
ALTER TABLE "table_sequencecache" ALTER "sq_numero" SET NOT NULL ;
ALTER TABLE "table_sequencecache" ALTER "sc_valeur" SET NOT NULL ;
ALTER TABLE "table_sequencecache" ALTER "sc_locked" SET NOT NULL ;
ALTER TABLE "table_sequencecache" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_sequencecache" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_service" ALTER "se_numero" SET NOT NULL ;
ALTER TABLE "table_service" ALTER "se_nom" SET NOT NULL ;
ALTER TABLE "table_service" ALTER "se_societe" SET NOT NULL ;
ALTER TABLE "table_service" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_service" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_societe" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_societe" ALTER "so_libelle" SET NOT NULL ;
ALTER TABLE "table_societe" ALTER "so_abbrev" SET NOT NULL ;
ALTER TABLE "table_societe" ALTER "so_sequence" SET NOT NULL ;
ALTER TABLE "table_societe" ALTER "sq_numero" SET NOT NULL ;
ALTER TABLE "table_societe" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_societe" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_sujet" ALTER "zs_numero" SET NOT NULL ;
ALTER TABLE "table_sujet" ALTER "zs_libelle" SET NOT NULL ;
ALTER TABLE "table_sujet" ALTER "zu_numero" SET NOT NULL ;
ALTER TABLE "table_sujet" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_sujet" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_tache" ALTER "zt_numero" SET NOT NULL ;
ALTER TABLE "table_tache" ALTER "zt_libelle" SET NOT NULL ;
ALTER TABLE "table_tache" ALTER "zt_phrase" SET NOT NULL ;
ALTER TABLE "table_tache" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_tache" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "tv_numero" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "tv_code" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "tv_taux" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "tv_actif" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "so_numero" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "cg_numero" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_tva" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typeadresse" ALTER "ak_numero" SET NOT NULL ;
ALTER TABLE "table_typeadresse" ALTER "ak_nom" SET NOT NULL ;
ALTER TABLE "table_typeadresse" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typeadresse" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typeattribut" ALTER "ta_numero" SET NOT NULL ;
ALTER TABLE "table_typeattribut" ALTER "ta_nom" SET NOT NULL ;
ALTER TABLE "table_typeattribut" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typeattribut" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typejournal" ALTER "tj_numero" SET NOT NULL ;
ALTER TABLE "table_typejournal" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typejournal" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typelien" ALTER "tl_numero" SET NOT NULL ;
ALTER TABLE "table_typelien" ALTER "tl_code" SET NOT NULL ;
ALTER TABLE "table_typelien" ALTER "tl_libelle" SET NOT NULL ;
ALTER TABLE "table_typelien" ALTER "tl_action12" SET NOT NULL ;
ALTER TABLE "table_typelien" ALTER "tl_action21" SET NOT NULL ;
ALTER TABLE "table_typelien" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typelien" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typepersonne" ALTER "tp_numero" SET NOT NULL ;
ALTER TABLE "table_typepersonne" ALTER "tp_type" SET NOT NULL ;
ALTER TABLE "table_typepersonne" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typepersonne" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typesociete" ALTER "ts_numero" SET NOT NULL ;
ALTER TABLE "table_typesociete" ALTER "ts_libelle" SET NOT NULL ;
ALTER TABLE "table_typesociete" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typesociete" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typesujet" ALTER "zu_numero" SET NOT NULL ;
ALTER TABLE "table_typesujet" ALTER "zu_libelle" SET NOT NULL ;
ALTER TABLE "table_typesujet" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typesujet" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_typetache" ALTER "th_numero" SET NOT NULL ;
ALTER TABLE "table_typetache" ALTER "th_libelle" SET NOT NULL ;
ALTER TABLE "table_typetache" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_typetache" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_ville" ALTER "vi_numero" SET NOT NULL ;
ALTER TABLE "table_ville" ALTER "vi_nom" SET NOT NULL ;
ALTER TABLE "table_ville" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_ville" ALTER "id" SET NOT NULL ;
ALTER TABLE "table_villecp" ALTER "vi_numero" SET NOT NULL ;
ALTER TABLE "table_villecp" ALTER "cp_numero" SET NOT NULL ;
ALTER TABLE "table_villecp" ALTER "lock_version" SET NOT NULL ;
ALTER TABLE "table_villecp" ALTER "id" SET NOT NULL ;
