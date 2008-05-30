--DROP TABLE tmp_ja;

CREATE TEMPORARY TABLE tmp_ja (nom text, login text, email text, pass text, salt text, pe_numero integer);

COPY tmp_ja (nom,login,email) FROM '/tmp/jaweb.csv' CSV HEADER;

UPDATE tmp_ja SET pe_numero=nextval('seq_adhesion'),salt=fc_password(16), pass=fc_password(8),nom=REPLACE(REPLACE(INITCAP(TRIM(nom)),' Et ',' et '),' & ',' et '), login=lower(login);

\f ;
\a
\t

\o jaweb2.csv
SELECT * FROM tmp_ja;

\o jaweb_mysql.sql
\qecho DELETE FROM jos_users WHERE id>=10000;
\qecho DELETE FROM jos_jos_core_acl_aro WHERE value>=10000;
\qecho -- Insertion/mise à jour des jos_users
\qecho UPDATE jos_users SET block=1 WHERE id>=1000000;
SELECT 'INSERT INTO jos_users(id,name,username,email,password,usertype,block,gid,registerDate) VALUES (30,''Service informatique'',''d56b699830e77ba53855679cb1d252da'',''informatique@fdsea33.fr'',''c210316aa28429797908af0d5b50cad7'',''Registered'',0,18,CURRENT_TIMESTAMP)'
||concatenate(',('||pe_numero||',''' 
|| REPLACE(SUBSTR( TRIM(nom) ,1,42) ,'''','''''')
||''','''||login||''','''||LOWER(COALESCE(email,''))
||''','''|| md5(pass||salt)||':'||salt||''',''Registered'','||'0'||',18,CURRENT_TIMESTAMP' ||')')
||' ON DUPLICATE KEY UPDATE email=VALUES(email),name=VALUES(name),gid=VALUES(gid),usertype=VALUES(usertype),password=VALUES(password),block=VALUES(block);' AS "Inserts"
  FROM tmp_ja;

\qecho -- Insertion/Mise à jour des aro(s)
SELECT 'INSERT INTO jos_core_acl_aro(section_value,value,order_value,name,hidden) VALUES (''users'',30,0,''Service informatique'',0)'
||concatenate(',(''users'', '||pe_numero||',0,''' 
|| REPLACE(SUBSTR( TRIM(nom) ,1,42) ,'''','''''')
||''',0)')
||' ON DUPLICATE KEY UPDATE name=VALUES(name),order_value=VALUES(order_value),hidden=VALUES(hidden);' AS "Inserts"
  FROM tmp_ja;
-- Toujours laisser  po_debut>='01/01/2007'


\qecho -- Mise à jour du map aro-groups
\qecho INSERT INTO jos_core_acl_groups_aro_map(group_id,aro_id) SELECT 18, aro_id FROM jos_core_acl_aro AS a WHERE a.value>=10000 ON DUPLICATE KEY UPDATE group_id=VALUES(group_id);

\o
\a
\t
