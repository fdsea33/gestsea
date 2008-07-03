DROP VIEW VUE_Historique;
-- Affiche tous les adhérents avec les années pour lesquelles ils ont cotisé
CREATE OR REPLACE VIEW VUE_Historique AS
  SELECT distinct on (p.pe_numero) ct_nom as "Canton", 
       '="'||to_char(pe_id,'FM099999')||'"' as "N°Pers", 
       pe_titre as "Titre", 
       pe_nom as "Nom", 
       INITCAP(pe_prenom) as "Prenom", 
       CASE WHEN p.pe_numero IN (select pe_numero from vue_cotisation_all where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-2 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (300006,500000052)) THEN 'X' ELSE '' END AS "Exploitant",
       CASE WHEN p.pe_numero IN (select pe_numero from vue_cotisation_all where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-2 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (500000124,500000053)) THEN 'X' ELSE '' END AS "Bailleur",
       CASE WHEN p.pe_numero IN (select pe_numero from vue_cotisation_all where cs_annee>=EXTRACT(YEAR FROM CURRENT_DATE)-2 AND BML_EXTRACT(cs_detail,'fdsea.forfait.produit')::integer IN (500000054,500000124,500000150)) THEN 'X' ELSE '' END AS "Ancien",

--SELECT pe_numero FROM table_adhesion WHERE po_numero IN (SELECT po_numero from table_periode WHERE EXTRACT(YEAR FROM po_fin)=EXTRACT(YEAR FROM CURRENT_DATE)) AND ah_numero IN (500000016,500000025)) THEN 'X' ELSE '' END AS "Exploitant",


--       CASE WHEN p.pe_numero IN (SELECT pe_numero FROM table_adhesion WHERE po_numero IN (SELECT po_numero from table_periode WHERE EXTRACT(YEAR FROM po_fin)=EXTRACT(YEAR FROM CURRENT_DATE)) AND ah_numero IN (500000016,500000025)) THEN 'X' ELSE '' END AS "Exploitant",
--       CASE WHEN p.pe_numero IN (SELECT pe_numero FROM table_adhesion WHERE po_numero IN (SELECT po_numero from table_periode WHERE EXTRACT(YEAR FROM po_fin)=EXTRACT(YEAR FROM CURRENT_DATE)) AND ah_numero IN (500000018,500000029,500000026)) THEN 'X' ELSE '' END AS "Bailleur",
--       CASE WHEN p.pe_numero IN (SELECT pe_numero FROM table_adhesion WHERE po_numero IN (SELECT po_numero from table_periode WHERE EXTRACT(YEAR FROM po_fin)=EXTRACT(YEAR FROM CURRENT_DATE)) AND ah_numero IN (500000017,500000027,500000029,500000032)) THEN 'X' ELSE '' END AS "Ancien",
--       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion join table_periode using (po_numero) where po_debut>='01/01/2000' and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029,500000032)) THEN 'X' ELSE '' END as "Depuis 2000" ,
--            WHEN p.pe_numero not in (select pe_numero from table_adhesion where ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'N''a jamais adhéré (a partir de 1997)' 
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=1997) THEN 'X' else '' END as "1997",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=1998) THEN 'X' else '' END as "1998",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=1999) THEN 'X' else '' END as "1999",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2000) THEN 'X' else '' END as "2000",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2001) THEN 'X' else '' END as "2001",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2002) THEN 'X' else '' END as "2002",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2003) THEN 'X' else '' END as "2003",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2004) THEN 'X' else '' END as "2004",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2005) THEN 'X' else '' END as "2005",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2006) THEN 'X' else '' END as "2006",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2007) THEN 'X' else '' END as "2007",
       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2008) THEN 'X' else '' END as "2008",
--       CASE WHEN p.pe_numero in (select pe_numero from vue_cotisation_all where cs_annee=2008 and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) THEN 'X' else '' END as "2008" ,
/*
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000002 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' ELSE '' END as "1997" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000003 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "1998" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000004 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "1999" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000005 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "2000" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000006 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "2001" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000007 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "2002" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000008 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "2003" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000000 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "2004" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000001 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029)) THEN 'X' else '' END as "2005" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000009 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029,500000032)) THEN 'X' else '' END as "2006" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000011 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029,500000032)) THEN 'X' else '' END as "2007" ,
       CASE WHEN p.pe_numero in (select pe_numero from table_adhesion where po_numero=500000011 and ah_numero in (500000017,500000018,500000019,500000016,500000025,500000026,500000027,500000029,500000032)) THEN 'X' else '' END as "2008" ,
*/
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
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=1997) THEN 'X' else '' END as "1997",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=1998) THEN 'X' else '' END as "1998",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=1999) THEN 'X' else '' END as "1999",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2000) THEN 'X' else '' END as "2000",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2001) THEN 'X' else '' END as "2001",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2002) THEN 'X' else '' END as "2002",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2003) THEN 'X' else '' END as "2003",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2004) THEN 'X' else '' END as "2004",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2005) THEN 'X' else '' END as "2005",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2006) THEN 'X' else '' END as "2006",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2007) THEN 'X' else '' END as "2007",
       CASE WHEN p.pe_numero in (select pe_numero from table_cotisation where cs_annee=2008) THEN 'X' else '' END as "2008",
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
\o historique.csv
SELECT * FROM vue_historique;
\o

\o historique_3A.csv
SELECT * FROM vue_historique WHERE pe_numero IN (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) WHERE po_debut BETWEEN '01/01/'||EXTRACT(YEAR FROM CURRENT_DATE)-2 AND '01/01/'||EXTRACT(YEAR FROM CURRENT_DATE));
\o

\o historique_2A.csv
SELECT * FROM vue_historique WHERE pe_numero IN (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) WHERE po_debut BETWEEN '01/01/'||EXTRACT(YEAR FROM CURRENT_DATE)-1 AND '01/01/'||EXTRACT(YEAR FROM CURRENT_DATE));
\o

\o historique_avec_personnes_seulement.csv
SELECT * FROM vue_historique2;
\o

\a
