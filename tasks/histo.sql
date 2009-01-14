DROP VIEW VUE_Historique;
-- Affiche tous les adhérents avec les années pour lesquelles ils ont cotisé
CREATE OR REPLACE VIEW VUE_Historique AS
  SELECT distinct on (p.pe_numero) ct_nom as "Canton", 
       '="'||to_char(pe_id,'FM099999')||'"' as "N°Pers", 
       pe_titre as "Titre", 
       pe_nom as "Nom", 
       INITCAP(pe_prenom) as "Prenom", 
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (300006,500000052)) THEN 'X' ELSE '' END AS "Exploitant",
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (500000124,500000053)) THEN 'X' ELSE '' END AS "Bailleur",
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (500000054,500000124,500000150)) THEN 'X' ELSE '' END AS "Ancien",
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND cs_nature='ja') THEN 'X' ELSE '' END AS "J.A.",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=1997) THEN 'X' else '' END as "97",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=1998) THEN 'X' else '' END as "98",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=1999) THEN 'X' else '' END as "99",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2000) THEN 'X' else '' END as "00",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2001) THEN 'X' else '' END as "01",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2002) THEN 'X' else '' END as "02",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2003) THEN 'X' else '' END as "03",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2004) THEN 'X' else '' END as "04",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2005) THEN 'X' else '' END as "05",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2006) THEN 'X' else '' END as "06",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2007) THEN 'X' else '' END as "07",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2008) THEN 'X' else '' END as "08",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2009) THEN 'X' else '' END as "09",
       '="'||tel.cn_coordonnee||'"' as "Téléphone",
       '="'||fax.cn_coordonnee||'"' as "Fax",
       '="'||port.cn_coordonnee||'"' as "Portable",
       '="'||email.cn_coordonnee||'"' as "E-mail",
       FC_AdresseLigne(a.ad_numero,2) AS "Ligne 2",
       FC_AdresseLigne(a.ad_numero,3) AS "Ligne 3",
       FC_AdresseLigne(a.ad_numero,4) AS "Ligne 4",
       FC_AdresseLigne(a.ad_numero,5) AS "Ligne 5",
       cp_codepostal as "CP",
       vi_nom as "Commune",
       COALESCE(Ad_Ligne2||', ','')||COALESCE(Ad_Ligne3||', ','')||COALESCE(Ad_Ligne4||', ','')||COALESCE(Ad_Ligne5,'') AS "Lignes",
-- Productions
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=52) THEN 'X' ELSE '' END AS "Avi.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=53) THEN 'X' ELSE '' END AS "G.C.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=54) THEN 'X' ELSE '' END AS "Lait",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=55) THEN 'X' ELSE '' END AS "Viande",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=56) THEN 'X' ELSE '' END AS "F/L",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=57) THEN 'X' ELSE '' END AS "Pépin.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=58) THEN 'X' ELSE '' END AS "Tabac",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=59) THEN 'X' ELSE '' END AS "Viti.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=60) THEN 'X' ELSE '' END AS "Autre",
    p.pe_numero
  from table_personne AS p
       left join table_adresse AS a on (a.pe_numero=p.pe_numero AND ad_active IS NOT FALSE)
       left join table_codepostal using (cp_numero)
       left join table_ville using (vi_numero)
       left join table_canton using (ct_numero)
       left join table_contact AS email ON (p.pe_numero=email.pe_numero AND email.cn_actif IS NOT FALSE AND email.ck_numero=104)
       left join table_contact AS fax   ON (p.pe_numero=fax.pe_numero   AND fax.cn_actif   IS NOT FALSE AND fax.ck_numero=105)
       left join table_contact AS port  ON (p.pe_numero=port.pe_numero  AND port.cn_actif  IS NOT FALSE AND port.ck_numero=106)
       left join table_contact AS tel   ON (p.pe_numero=tel.pe_numero   AND tel.cn_actif   IS NOT FALSE AND tel.ck_numero=107)
  where true
--    not p.pe_numero in (select pe_numero from table_attribut where ta_numero=500000002 or cr_numero=109) 
    and not pe_nom like 'ZZ%'
--    and ad_active 
    and pe_actif
  order by p.pe_numero;







DROP VIEW VUE_Historique2;
-- Affiche tous les adhérents avec les années pour lesquelles ils ont cotisé
CREATE OR REPLACE VIEW VUE_Historique2 AS
  SELECT distinct on (p.pe_numero) ct_nom as "Canton", 
       '="'||to_char(pe_id,'FM099999')||'"' as "N°Pers", 
       pe_titre as "Titre", 
       pe_nom as "Nom", 
       INITCAP(pe_prenom) as "Prenom", 
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (300006,500000052)) THEN 'X' ELSE '' END AS "Exploitant",
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (500000124,500000053)) THEN 'X' ELSE '' END AS "Bailleur",
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (500000054,500000124,500000150)) THEN 'X' ELSE '' END AS "Ancien",
       CASE WHEN p.pe_numero IN (select pe_numero from table_cotisation where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-1 AND cs_nature='ja') THEN 'X' ELSE '' END AS "J.A.",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=1997) THEN 'X' else '' END as "97",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=1998) THEN 'X' else '' END as "98",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=1999) THEN 'X' else '' END as "99",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2000) THEN 'X' else '' END as "00",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2001) THEN 'X' else '' END as "01",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2002) THEN 'X' else '' END as "02",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2003) THEN 'X' else '' END as "03",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2004) THEN 'X' else '' END as "04",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2005) THEN 'X' else '' END as "05",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2006) THEN 'X' else '' END as "06",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2007) THEN 'X' else '' END as "07",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2008) THEN 'X' else '' END as "08",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2009) THEN 'X' else '' END as "09",
       '="'||tel.cn_coordonnee||'"' as "Téléphone",
       '="'||fax.cn_coordonnee||'"' as "Fax",
       '="'||port.cn_coordonnee||'"' as "Portable",
       '="'||email.cn_coordonnee||'"' as "E-mail",
       FC_AdresseLigne(a.ad_numero,2) AS "Ligne 2",
       FC_AdresseLigne(a.ad_numero,3) AS "Ligne 3",
       FC_AdresseLigne(a.ad_numero,4) AS "Ligne 4",
       FC_AdresseLigne(a.ad_numero,5) AS "Ligne 5",
       cp_codepostal as "CP",
       vi_nom as "Commune",
       COALESCE(Ad_Ligne2||', ','')||COALESCE(Ad_Ligne3||', ','')||COALESCE(Ad_Ligne4||', ','')||COALESCE(Ad_Ligne5,'') AS "Lignes",
-- Productions
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=52) THEN 'X' ELSE '' END AS "Avi.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=53) THEN 'X' ELSE '' END AS "G.C.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=54) THEN 'X' ELSE '' END AS "Lait",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=55) THEN 'X' ELSE '' END AS "Viande",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=56) THEN 'X' ELSE '' END AS "F/L",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=57) THEN 'X' ELSE '' END AS "Pépin.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=58) THEN 'X' ELSE '' END AS "Tabac",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=59) THEN 'X' ELSE '' END AS "Viti.",
       CASE WHEN p.pe_numero IN (SELECT pe_numero from table_attribut where cr_numero=60) THEN 'X' ELSE '' END AS "Autre",
    p.pe_numero
  from table_personne AS p
       left join table_adresse AS a on (a.pe_numero=p.pe_numero AND ad_active IS NOT FALSE)
       left join table_codepostal using (cp_numero)
       left join table_ville using (vi_numero)
       left join table_canton using (ct_numero)
       left join table_contact AS email ON (p.pe_numero=email.pe_numero AND email.cn_actif IS NOT FALSE AND email.ck_numero=104)
       left join table_contact AS fax   ON (p.pe_numero=fax.pe_numero   AND fax.cn_actif   IS NOT FALSE AND fax.ck_numero=105)
       left join table_contact AS port  ON (p.pe_numero=port.pe_numero  AND port.cn_actif  IS NOT FALSE AND port.ck_numero=106)
       left join table_contact AS tel   ON (p.pe_numero=tel.pe_numero   AND tel.cn_actif   IS NOT FALSE AND tel.ck_numero=107)
  where true
--    not p.pe_numero in (select pe_numero from table_attribut where ta_numero=500000002 or cr_numero=109) 
    and not pe_nom like 'ZZ%'
--    and ad_active 
    and pe_actif
  order by p.pe_numero;



\a
\f ;
\timing

\o claf.csv
SELECT DISTINCT er.pe_numero, COALESCE(NULLIF(TRIM(peac_titre),''),pe_canton) AS canton, re_nom, 
  CASE WHEN er.pe_numero in (select pe_numero from table_cotisation where cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)-1) THEN 'X' else '' END as "N-1",
  CASE WHEN er.pe_numero in (select pe_numero from table_cotisation where cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)) THEN 'X' else '' END as "N",
  pe_adresse, 
  tel.cn_value, fax.cn_value, port.cn_value, mail.cn_value
  FROM estresponsable er join vue_personne using (pe_numero) join responsabilite using (re_numero) 
  LEFT JOIN vue_contacts AS Tel  ON (Tel.PE_Numero=er.PE_Numero AND Tel.CK_Numero=107)
  LEFT JOIN vue_contacts AS Fax  ON (Fax.PE_Numero=er.PE_Numero AND Fax.CK_Numero=105) 
  LEFT JOIN vue_contacts AS Port ON (Port.PE_Numero=er.PE_Numero AND Port.CK_Numero=106) 
  LEFT JOIN vue_contacts AS Mail ON (Mail.PE_Numero=er.PE_Numero AND Mail.CK_Numero=104)
  WHERE re_numero in (33,62,34,61) order by 1;
\o

\o sacea_a+.csv
SELECT * FROM vue_historique 
  WHERE pe_numero IN (SELECT pe_numero FROM vue_current_cotisation WHERE bml_extract(cs_detail, 'sacea')='true')
;
\o

\o sacea_a+_sans_email.csv
SELECT * FROM vue_historique 
  WHERE pe_numero IN (SELECT pe_numero FROM vue_current_cotisation WHERE bml_extract(cs_detail, 'sacea')='true')
    AND pe_numero NOT IN (SELECT pe_numero FROM contact WHERE ck_numero=104)
;
\o

\o historique.csv
SELECT * FROM vue_historique;
\o

\o historique_3A.csv
SELECT * FROM vue_historique WHERE pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee BETWEEN EXTRACT(YEAR FROM CURRENT_DATE)-2 AND EXTRACT(YEAR FROM CURRENT_DATE));
\o

\o historique_2A.csv
SELECT * FROM vue_historique WHERE pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee BETWEEN EXTRACT(YEAR FROM CURRENT_DATE)-1 AND EXTRACT(YEAR FROM CURRENT_DATE));
\o

\o historique_1A.csv
SELECT * FROM vue_historique WHERE pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee = EXTRACT(YEAR FROM CURRENT_DATE));
\o

\o historique_avec_personnes_seulement.csv
SELECT * FROM vue_historique2;
\o

\a
