-- Mise à jour des noms/prénoms
--UPDATE table_personne SET pe_nom=UPPER(TRIM(pe_nom)), pe_prenom=REPLACE(REPLACE(INITCAP(TRIM(pe_prenom)),' Et ',' et '),' & ',' et ');
-- Mise a jour des mots de passe (nouveaux)
--UPDATE table_personne SET pe_motdepasse=FC_Password(8) WHERE LENGTH(COALESCE(pe_motdepasse,''))<8;

-- Création des comptes MySQL
-- Si une personne possède plusieurs adresses e-mail alors seule une sera utilisée.
\f ;
\a
\t
\o joomla.sql
\qecho -- Insertion/mise à jour des jos_users
\qecho UPDATE jos_users SET block=1 WHERE id>=1000000;
SELECT 'INSERT INTO jos_users(id,name,username,email,password,usertype,block,gid,registerDate) VALUES (30,''Service informatique'',''d56b699830e77ba53855679cb1d252da'',''informatique@fdsea33.fr'',''c210316aa28429797908af0d5b50cad7'',''Registered'',0,18,CURRENT_TIMESTAMP)'
||concatenate(',('||pe.pe_numero||',''' 
|| REPLACE(SUBSTR( TRIM( COALESCE(pe_titre||' ', '') || COALESCE(UPPER(pe_nom)||' ','') || COALESCE(INITCAP(pe_prenom),'')) ,1,42) ,'''','''''')
||''',''fdsea'||pe.pe_numero-1000000||''','''||LOWER(COALESCE(cn_coordonnee,''))
||''','''|| md5(pe_motdepasse)||''',''Registered'','||CASE WHEN pe.pe_numero=1016535 OR pe.pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE 
(cs_annee=EXTRACT(YEAR FROM CURRENT_DATE) OR (EXTRACT(MONTH FROM CURRENT_DATE)<=2 AND cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)-1))
) THEN '0' ELSE '1' END||',18,CURRENT_TIMESTAMP' ||')')
||' ON DUPLICATE KEY UPDATE email=VALUES(email),name=VALUES(name),gid=VALUES(gid),usertype=VALUES(usertype),password=VALUES(password),block=VALUES(block);' AS "Inserts"
  FROM table_personne AS pe LEFT JOIN table_contact AS co ON (pe.pe_numero=co.pe_numero AND co.cn_actif is not false AND co.ck_numero=104)
  WHERE pe.pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee>=2007);

\qecho -- Insertion/Mise à jour des aro(s)
SELECT 'INSERT INTO jos_core_acl_aro(section_value,value,order_value,name,hidden) VALUES (''users'',30,0,''Service informatique'',0)'
||concatenate(',(''users'', '||pe.pe_numero||',0,''' 
|| REPLACE(SUBSTR( TRIM( COALESCE(pe_titre||' ', '') || COALESCE(UPPER(pe_nom)||' ','') || COALESCE(INITCAP(pe_prenom),'')) ,1,42) ,'''','''''')
||''',0)')
||' ON DUPLICATE KEY UPDATE name=VALUES(name),order_value=VALUES(order_value),hidden=VALUES(hidden);' AS "Inserts"
  FROM table_personne AS pe
  WHERE pe.pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee>=2007);
-- Toujours laisser  po_debut>='01/01/2007'


\qecho -- Mise à jour du map aro-groups
\qecho INSERT INTO jos_core_acl_groups_aro_map(group_id,aro_id) SELECT 18, aro_id FROM jos_core_acl_aro AS a WHERE a.value>=1000000  ON DUPLICATE KEY UPDATE group_id=VALUES(group_id);


\qecho -- Ajout au groupe A (7)
\qecho DELETE FROM jos_gm_membre WHERE (id_membre>=1000000 OR id_membre=63) AND id_groupe=7;
SELECT 'INSERT INTO jos_gm_membre(id_membre,id_groupe) VALUES (63,7)'
||concatenate(',('||pe_numero||',7)')
||' ON DUPLICATE KEY UPDATE id_membre=VALUES(id_membre);' AS "Inserts"
  FROM table_cotisation
  WHERE (cs_annee=EXTRACT(YEAR FROM CURRENT_DATE) OR (EXTRACT(MONTH FROM CURRENT_DATE)<=2 AND cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)-1));

       
\qecho -- Ajout au groupe A+ (6)
\qecho DELETE FROM jos_gm_membre WHERE (id_membre>=1000000 OR id_membre=63) AND id_groupe=6;
SELECT 'INSERT INTO jos_gm_membre(id_membre,id_groupe) VALUES (63,6)'
||concatenate(',('||pe_numero||',6)')
||' ON DUPLICATE KEY UPDATE id_membre=VALUES(id_membre);' AS "Inserts"
  FROM table_cotisation
  WHERE ((cs_annee=EXTRACT(YEAR FROM CURRENT_DATE) OR (EXTRACT(MONTH FROM CURRENT_DATE)<=2 AND cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)-1))
      AND bml_extract(cs_detail, 'sacea.produit')::integer-500000000 IN (36,65,69))
    OR pe_numero = 1016535
;
-- R.A.VITI
/*
  FROM table_adhesion
       JOIN table_personne USING (pe_numero)
       JOIN table_periode USING (po_numero) 
  WHERE CURRENT_DATE BETWEEN po_debut AND po_fin AND ah_numero IN (SELECT ah_numero FROM table_adherence WHERE ah_libelle ILIKE '%conseil%');
*/
\qecho -- Ajout au groupe MajCC (10)
\qecho DELETE FROM jos_gm_membre WHERE (id_membre>=1000000 OR id_membre=63) AND id_groupe=10;
SELECT 'INSERT INTO jos_gm_membre(id_membre,id_groupe) VALUES (63,10)'
||concatenate(',('||pe_numero||',10)')
||' ON DUPLICATE KEY UPDATE id_membre=VALUES(id_membre);' AS "Inserts"
  FROM (SELECT DISTINCT f.pe_numero FROM table_lignefacture 
       JOIN table_adherence USING (pd_numero)
       JOIN table_facture f USING (fa_numero)
  WHERE ah_libelle LIKE '[MAJCC]%'
    AND fa_date+'12 months'::INTERVAL > CURRENT_DATE
--    AND fa_date+'8 months'::INTERVAL BETWEEN (EXTRACT(YEAR FROM CURRENT_DATE)||'-01-01')::date AND (EXTRACT(YEAR FROM CURRENT_DATE)||'-12-31')::date 
--    AND fa_date+'6 months 15 days'::INTERVAL BETWEEN ((EXTRACT(YEAR FROM CURRENT_DATE)-1)||'-07-15')::date AND (EXTRACT(YEAR FROM CURRENT_DATE)||'-07-16')::date 
UNION ALL
SELECT DISTINCT el_personne1 FROM table_lignefacture 
       JOIN table_adherence USING (pd_numero)
       JOIN table_facture f USING (fa_numero)
       JOIN table_estlie el ON (f.pe_numero=el_personne2)
  WHERE ah_libelle LIKE '[MAJCC]%' AND el.tl_numero=1003
    AND fa_date+'12 months'::INTERVAL > CURRENT_DATE
--    AND fa_date+'8 months'::INTERVAL BETWEEN (EXTRACT(YEAR FROM CURRENT_DATE)||'-01-01')::date AND (EXTRACT(YEAR FROM CURRENT_DATE)||'-12-31')::date 
--    AND fa_date+'6 months 15 days'::INTERVAL BETWEEN ((EXTRACT(YEAR FROM CURRENT_DATE)-1)||'-07-15')::date AND (EXTRACT(YEAR FROM CURRENT_DATE)||'-07-16')::date 
) AS x;

-- Fichier des mots de passe
\o website_passwords.csv
\qecho Personne;Nom;CP;Ville;Login;Password;Société;Nom
SELECT p.pe_numero, p.pe_libelle, p.pe_cp, p.pe_ville, 'fdsea'||p.pe_id, p.pe_motdepasse, s.pe_numero, s.pe_libelle
  FROM vue_personne p LEFT JOIN estlie on (el_personne1=p.pe_numero) 
       LEFT JOIN vue_personne s on (el_personne2=s.pe_numero)
  WHERE (tl_numero=1003 OR tl_numero IS NULL)
    and p.pe_numero IN (SELECT pe_numero FROM cotisation WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)+(CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)<=2 THEN -1 ELSE 0 END))
  ORDER BY p.pe_numero
;

\o
\a
\t
