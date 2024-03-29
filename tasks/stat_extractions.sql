\qecho *** Extraction des données
\timing
\o ./stats.log
SELECT stat_adhesion(2);
SELECT stat_activite_annuelle(1,'M');
SELECT stat_activite_annuelle(1,'Q');
SELECT stat_activite_mensuelle(1,'M');
SELECT stat_activite_mensuelle(1,'Q');
SELECT stat_activite_annuelle(2,'M');
SELECT stat_activite_annuelle(2,'Q');
SELECT stat_activite_mensuelle(2,'M');
SELECT stat_activite_mensuelle(2,'Q');
SELECT stat_activite_annuelle(3,'M');
SELECT stat_activite_annuelle(3,'Q');
SELECT stat_activite_mensuelle(3,'M');
SELECT stat_activite_mensuelle(3,'Q');

SELECT stat_compta_mensuelle(1,2007);
SELECT stat_compta_mensuelle(2,2007);
SELECT stat_compta_mensuelle(3,2007);
SELECT stat_compta_mensuelle(1,2008);
SELECT stat_compta_mensuelle(2,2008);
SELECT stat_compta_mensuelle(3,2008);
SELECT stat_compta_mensuelle(1,2009);
SELECT stat_compta_mensuelle(2,2009);
SELECT stat_compta_mensuelle(3,2009);
\o
\timing

\qecho *** Sauvegarde
\a
\f ;
-- Adhesions
\o ./fdsea_adhesions
SELECT * FROM stat_adhesion_2;
-- SACEA
\o ./sacea_A_HT
SELECT * FROM stat_activite_annuelle_1M;
\o ./sacea_A_QTE
SELECT * FROM stat_activite_annuelle_1Q;
\o ./sacea_M_HT
SELECT * FROM stat_activite_mensuelle_1M;
\o ./sacea_M_QTE
SELECT * FROM stat_activite_mensuelle_1Q;
\o ./sacea_compta_2007.csv
SELECT * FROM stat_compta_mensuelle_1_2007;
\o ./sacea_compta_2008.csv
SELECT * FROM stat_compta_mensuelle_1_2008;
\o ./sacea_compta_2009.csv
SELECT * FROM stat_compta_mensuelle_1_2009;
\o ./sacea_produits.csv
SELECT cg_numcompte, pd_libelle,pd_numero from table_produit p left join table_compteproduit using (pd_numero) left join table_comptegen using (cg_numero) where ci_actif and pd_numero in (SELECT pd_numero FROM table_lignefacture join table_facture using (fa_numero) where fa_date>CURRENT_DATE-'1 year'::INTERVAL) AND p.so_numero=1 order by pd_libelle;

-- FDSEA
\o ./fdsea_A_HT
SELECT * FROM stat_activite_annuelle_2M;
\o ./fdsea_A_QTE
SELECT * FROM stat_activite_annuelle_2Q;
\o ./fdsea_M_HT
SELECT * FROM stat_activite_mensuelle_2M;
\o ./fdsea_M_QTE
SELECT * FROM stat_activite_mensuelle_2Q;
\o ./fdsea_compta_2007.csv
SELECT * FROM stat_compta_mensuelle_2_2007;
\o ./fdsea_compta_2008.csv
SELECT * FROM stat_compta_mensuelle_2_2008;
\o ./fdsea_compta_2009.csv
SELECT * FROM stat_compta_mensuelle_2_2009;
\o ./fdsea_produits.csv
SELECT cg_numcompte, pd_libelle,pd_numero from table_produit p left join table_compteproduit using (pd_numero) left join table_comptegen using (cg_numero) where ci_actif and pd_numero in (SELECT pd_numero FROM table_lignefacture join table_facture using (fa_numero) where fa_date>CURRENT_DATE-'1 year'::INTERVAL) AND p.so_numero=2 order by pd_libelle;

-- AAVA
\o ./aava_A_HT
SELECT * FROM stat_activite_annuelle_3M;
\o ./aava_A_QTE
SELECT * FROM stat_activite_annuelle_3Q;
\o ./aava_M_HT
SELECT * FROM stat_activite_mensuelle_3M;
\o ./aava_M_QTE
SELECT * FROM stat_activite_mensuelle_3Q;
\o ./aava_compta_2007.csv
SELECT * FROM stat_compta_mensuelle_3_2007;
\o ./aava_compta_2008.csv
SELECT * FROM stat_compta_mensuelle_3_2008;
\o ./aava_compta_2009.csv
SELECT * FROM stat_compta_mensuelle_3_2009;
\o ./aava_produits.csv
SELECT cg_numcompte, pd_libelle,pd_numero from table_produit p left join table_compteproduit using (pd_numero) left join table_comptegen using (cg_numero) where ci_actif and pd_numero in (SELECT pd_numero FROM table_lignefacture join table_facture using (fa_numero) where fa_date>CURRENT_DATE-'1 year'::INTERVAL) AND p.so_numero=3 order by pd_libelle;



/*
\o ./activite_annuelle_fdsea.csv
SELECT * FROM stat_activite_annuelle_2M;
SELECT * FROM stat_activite_annuelle_2Q;
\o ./activite_annuelle_aava.csv
SELECT * FROM stat_activite_annuelle_3M;
SELECT * FROM stat_activite_annuelle_3Q;
\o ./activite_mensuelle_fdsea.csv
SELECT * FROM stat_activite_mensuelle_2M;
SELECT * FROM stat_activite_mensuelle_2Q;
\o ./activite_mensuelle_aava.csv
SELECT * FROM stat_activite_mensuelle_3M;
SELECT * FROM stat_activite_mensuelle_3Q;
*/
\o
\a
/*
\qecho *** Nettoyage

DROP TABLE stat_adhesion_2;
DROP TABLE stat_activite_annuelle_1M;
DROP TABLE stat_activite_annuelle_1Q;
DROP TABLE stat_activite_annuelle_2M;
DROP TABLE stat_activite_annuelle_2Q;
DROP TABLE stat_activite_annuelle_3M;
DROP TABLE stat_activite_annuelle_3Q;
DROP TABLE stat_activite_mensuelle_1M;
DROP TABLE stat_activite_mensuelle_1Q;
DROP TABLE stat_activite_mensuelle_2M;
DROP TABLE stat_activite_mensuelle_2Q;
DROP TABLE stat_activite_mensuelle_3M;
DROP TABLE stat_activite_mensuelle_3Q;
*/
\qecho *** Extractions terminées


