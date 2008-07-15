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

SELECT stat_compta_mensuelle(1,EXTRACT(YEAR FROM CURRENT_DATE)::integer);
SELECT stat_compta_mensuelle(2,EXTRACT(YEAR FROM CURRENT_DATE)::integer);
SELECT stat_compta_mensuelle(3,EXTRACT(YEAR FROM CURRENT_DATE)::integer);
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
\o ./sacea_compta_2008.csv
SELECT * FROM stat_compta_mensuelle_1_2008;

-- FDSEA
\o ./fdsea_A_HT
SELECT * FROM stat_activite_annuelle_2M;
\o ./fdsea_A_QTE
SELECT * FROM stat_activite_annuelle_2Q;
\o ./fdsea_M_HT
SELECT * FROM stat_activite_mensuelle_2M;
\o ./fdsea_M_QTE
SELECT * FROM stat_activite_mensuelle_2Q;
\o ./fdsea_compta_2008.csv
SELECT * FROM stat_compta_mensuelle_2_2008;

-- AAVA
\o ./aava_A_HT
SELECT * FROM stat_activite_annuelle_3M;
\o ./aava_A_QTE
SELECT * FROM stat_activite_annuelle_3Q;
\o ./aava_M_HT
SELECT * FROM stat_activite_mensuelle_3M;
\o ./aava_M_QTE
SELECT * FROM stat_activite_mensuelle_3Q;
\o ./aava_compta_2008.csv
SELECT * FROM stat_compta_mensuelle_3_2008;


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


