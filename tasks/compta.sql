
DROP VIEW products CASCADE;
/*
CREATE OR REPLACE VIEW products AS
  SELECT sum(lf_montantht) AS total, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture JOIN table_facture USING (fa_numero)
                            JOIN table_compteproduit USING (pd_numero)
			    JOIN table_comptegen USING (cg_numero)
    WHERE lf_montantht>0
    GROUP BY 2,3,4;

CREATE OR REPLACE VIEW losses AS
  SELECT -sum(la_montantht) AS total, cg_numero as account, av_date AS day, table_facture.so_numero as society
    FROM table_ligneavoir JOIN table_avoir USING (av_numero)
                          JOIN table_facture USING (fa_numero)
                          JOIN table_compteproduit USING (pd_numero)
			  JOIN table_comptegen USING (cg_numero)
    WHERE la_montantht>0
    GROUP BY 2,3,4;
*/

CREATE OR REPLACE VIEW products AS
  SELECT CASE WHEN pd_reduction THEN lf_montantht*(100-fa_reduction)/100 ELSE lf_montantht END AS total, ag_numero as agent, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture LEFT JOIN table_facture USING (fa_numero)
                            LEFT JOIN table_produit USING(pd_numero)
                            LEFT JOIN table_compteproduit USING (pd_numero)
			    LEFT JOIN table_comptegen USING (cg_numero)
    WHERE lf_montantht>0 AND ci_actif
  UNION ALL
  SELECT CASE WHEN pd_reduction THEN -la_montantht*(100-av_reduction)/100 ELSE -la_montantht END AS total, ag_numero as agent, cg_numero as account, av_date AS day, table_facture.so_numero as society
    FROM table_ligneavoir LEFT JOIN table_avoir USING (av_numero)
                          LEFT JOIN table_produit USING(pd_numero)
                          LEFT JOIN table_facture USING (fa_numero)
                          LEFT JOIN table_compteproduit USING (pd_numero)
			  LEFT JOIN table_comptegen USING (cg_numero)
    WHERE la_montantht>0 AND ci_actif
    ORDER BY 3;
/*

CREATE OR REPLACE VIEW losses AS
  SELECT CASE WHEN pd_reduction THEN -la_montantht*(100-av_reduction)/100 ELSE -la_montantht END AS total, cg_numero as account, av_date AS day, table_facture.so_numero as society
    FROM table_ligneavoir LEFT JOIN table_avoir USING (av_numero)
                          LEFT JOIN table_produit USING(pd_numero)
                          LEFT JOIN table_facture USING (fa_numero)
                          LEFT JOIN table_compteproduit USING (pd_numero)
			  LEFT JOIN table_comptegen USING (cg_numero)
    WHERE la_montantht>0 AND ci_actif;

DROP VIEW fusion;
CREATE OR REPLACE VIEW fusion AS 
  SELECT total, account, day, society FROM products UNION ALL SELECT total, account, day, society FROM losses;
*/


CREATE OR REPLACE FUNCTION FC_comptabilite(integer,integer) RETURNS INTEGER AS
$$
DECLARE
  num_societe ALIAS FOR $1;
  year ALIAS FOR $2;
  sup integer;
  msup integer;
  month integer;
  compte integer;
  proc text;
  corp text;
BEGIN
  msup:=0;
  sup :=0;
  corp:='';
  SELECT count(*) from pg_tables where tablename='compta_'||num_societe||'_'||year INTO compte;
  IF compte>0 THEN
    proc:='DROP TABLE compta_'||num_societe||'_'||year||';';
    EXECUTE proc;
  END IF;
  proc:='CREATE TEMPORARY TABLE compta_'||num_societe||'_'||year||' AS ';
  proc:=proc||'SELECT ';
  proc:=proc||' cg_numero AS "Int.",';
  proc:=proc||' initcap(cg_libelle) AS "Compte",';
  proc:=proc||' rtrim(cg_numcompte,''0'') AS "N.Cpt.",\n';
  FOR month IN 1..12 LOOP
    proc:=proc||'REPLACE(round(month'||month||'.total,2),''.'','','') AS "'||month||'/'||year||'",\n';
    IF month=12 THEN
      sup:=1;
      msup:=-12;
    END IF;
    corp:=corp||'  LEFT JOIN (SELECT sum(total) as total, account, society FROM products where ''01/'||month||'/'||year||'''<=day AND day<''01/'||month+1+msup||'/'||year+sup||''' GROUP BY 2,3) AS month'||month||' ON (month'||month||'.account=cg_numero AND month'||month||'.society='||num_societe||')\n';
  END LOOP;

  corp:=corp||'  LEFT JOIN (SELECT sum(total) as total, account, society FROM products where ''01/01/'||year||'''<=day AND day<=''31/12/'||year||''' GROUP BY 2,3) AS year ON (year.account=cg_numero AND year.society='||num_societe||')\n';

  proc:=proc||' REPLACE(year.total,''.'','','') AS "Total"\n  FROM table_comptegen \n'||corp;
  proc:=proc||' WHERE (cg_numcompte::varchar like ''7%'' OR cg_numcompte::varchar like ''635%'' OR cg_numcompte::varchar like ''626%'')'; 
  proc:=proc||' AND so_numero='||num_societe;
  proc:=proc||' ORDER BY 3';

--  RAISE NOTICE '>>>> %',proc;
  EXECUTE proc;
  RETURN 0;

END;
$$ LANGUAGE 'plpgsql' VOLATILE;

/*
SELECT FC_comptabilite(1,2006);
SELECT * FROM compta_1_2006;
SELECT FC_comptabilite(1,2005);
SELECT * FROM compta_1_2005;
*/

--SELECT FC_comptabilite(1,2005);
/*
SELECT FC_comptabilite(1,2006);

SELECT FC_comptabilite(2,2005);
SELECT FC_comptabilite(2,2006);
*/

SELECT FC_comptabilite(1,2007);
SELECT FC_comptabilite(2,2007);

--SELECT * FROM compta_1_2006;
--SELECT * FROM compta_1_2005;

\a
\f ;
\o compta-sacea-2007.csv
SELECT * FROM compta_1_2007;
\o compta-fdsea-2007.csv
SELECT * FROM compta_2_2007;
\o
/*
\o compta-fdsea-2006.csv
SELECT * FROM compta_1_2006;
\o
*/
\a
