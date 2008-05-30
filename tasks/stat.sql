\qecho *** Chargement des procédures de calcul


DROP VIEW credits CASCADE;

CREATE OR REPLACE VIEW credits AS
  SELECT CASE WHEN pd_reduction THEN lf_montantht*(100-fa_reduction)/100 ELSE lf_montantht END AS total, pd_numero as product, lf_quantite AS quantity, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture LEFT JOIN table_facture USING (fa_numero)
                            LEFT JOIN table_produit USING(pd_numero)
                            LEFT JOIN table_compteproduit USING (pd_numero)
			    LEFT JOIN table_comptegen USING (cg_numero)
    WHERE ci_actif
    ORDER BY 3;


CREATE OR REPLACE VIEW debits AS
  SELECT CASE WHEN pd_reduction THEN -la_montantht*(100-av_reduction)/100 ELSE -la_montantht END AS total, pd_numero as product, -la_quantite AS quantity, cg_numero as account, av_date AS day, table_facture.so_numero as society
    FROM table_ligneavoir LEFT JOIN table_avoir USING (av_numero)
                          LEFT JOIN table_produit USING(pd_numero)
                          LEFT JOIN table_facture USING (fa_numero)
                          LEFT JOIN table_compteproduit USING (pd_numero)
			  LEFT JOIN table_comptegen USING (cg_numero)
    WHERE ci_actif
    ORDER BY 3;



DROP VIEW products CASCADE;

CREATE OR REPLACE VIEW products AS
  SELECT CASE WHEN pd_reduction THEN lf_montantht*(100-fa_reduction)/100 ELSE lf_montantht END AS total, pd_numero as product, lf_quantite AS quantity, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture LEFT JOIN table_facture USING (fa_numero)
                            LEFT JOIN table_produit USING(pd_numero)
                            LEFT JOIN table_compteproduit USING (pd_numero)
			    LEFT JOIN table_comptegen USING (cg_numero)
    WHERE ci_actif
  UNION ALL
  SELECT CASE WHEN pd_reduction THEN -la_montantht*(100-av_reduction)/100 ELSE -la_montantht END AS total, pd_numero as product, -la_quantite AS quantity, cg_numero as account, av_date AS day, table_facture.so_numero as society
    FROM table_ligneavoir LEFT JOIN table_avoir USING (av_numero)
                          LEFT JOIN table_produit USING(pd_numero)
                          LEFT JOIN table_facture USING (fa_numero)
                          LEFT JOIN table_compteproduit USING (pd_numero)
			  LEFT JOIN table_comptegen USING (cg_numero)
    WHERE ci_actif
    ORDER BY 3;





CREATE OR REPLACE FUNCTION stat_adhesion(num_societe integer) RETURNS INTEGER AS
$$
DECLARE
  compte integer;
  table_name text;
  query text;
  proc text[];
  corp text[];
  first_year boolean;
  p record;
  nb_lines integer;
BEGIN
  table_name := 'stat_adhesion_'||num_societe;
  SELECT count(*) from pg_tables where table_name ilike tablename INTO compte;
  IF compte>0 THEN
    query:='DROP TABLE '||table_name||';';
    EXECUTE query;
  END IF;
  nb_lines := 0;
  query:='CREATE TEMPORARY TABLE '||table_name||' AS ';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre de coopérateurs''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''exploitants''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''anciens exploitants (sans bailleurs)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''anciens exploitants conjoint''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''anciens exploitants et bailleurs''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''anciens exploitants (tous confondus)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre de bailleurs (sans anciens)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre de bailleurs (tous confondus)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents distincts cumulés''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents fidèles''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents constants''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents nouveaux''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents disparus''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents nouveaux ANCIENS EXPLOITANTS''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents EXPLOITANTS constants''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents EXPLOITANTS nouveaux''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents EXPLOITANTS disparus''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents ANCIENS constants''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents ANCIENS nouveaux''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents ANCIENS disparus''::text AS "Variable"';
  FOR x IN 1..nb_lines LOOP
    corp[x] := ' FROM ';
  END LOOP;
  first_year := true;
  FOR p IN SELECT * FROM periode ORDER BY po_debut LOOP
    IF first_year THEN
      first_year := false;
    ELSE
      FOR x IN 1..nb_lines LOOP
        corp[x] := corp[x]||',';
      END LOOP;
    END IF;
    nb_lines := 0;
    -- Coopérateurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', c'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero in (500000019) AND po_numero='||p.po_numero||') AS c'||p.po_numero;
    -- Exploitants
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', e'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero in (500000016,500000025) AND po_numero='||p.po_numero||') AS e'||p.po_numero;
    -- Anciens
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', a'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero-500000000 in (17,27) AND po_numero='||p.po_numero||') AS a'||p.po_numero;
    -- Conjoints anciens
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero-500000000 in (32) AND po_numero='||p.po_numero||') AS b'||p.po_numero;
    -- Anciens et bailleurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero-500000000 in (29) AND po_numero='||p.po_numero||') AS b'||p.po_numero;
    -- Anciens (tous)
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero-500000000 in (17,27,29,32) AND po_numero='||p.po_numero||') AS b'||p.po_numero;
    -- Bailleurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero-500000000 in (18,26) AND po_numero='||p.po_numero||') AS b'||p.po_numero;
    -- Bailleurs (tous)
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero-500000000 in (18,26,29) AND po_numero='||p.po_numero||') AS b'||p.po_numero;
    -- Nb Adhérents
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where ah_numero-500000000 in (17,18,19,16,25,26,27,29,32) AND po_numero='||p.po_numero||') AS b'||p.po_numero;
    -- Cumul
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion join table_periode using (po_numero) where po_fin<='''||p.po_fin||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) AS b'||p.po_numero;
    -- Fidèles
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<='''||p.po_fin||''' and po_debut>='''||p.po_debut-'4 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32) group by pe_numero having count(distinct as_numero)>=5)) AS b'||p.po_numero;
    -- Reste
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32))) AS b'||p.po_numero;
    -- Nouveaux
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero not in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32))) AS b'||p.po_numero;
    -- Disparus
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) and pe_numero not in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32))) AS b'||p.po_numero;
    -- Nouveaux Anciens exploitants
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (19,25)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (27,29,32))) AS b'||p.po_numero;


-- Exploitants
    -- Reste
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (16,25)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (16,25))) AS b'||p.po_numero;
    -- Nouveaux
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero not in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (16,25)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (16,25))) AS b'||p.po_numero;
    -- Disparus
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (16,25)) and pe_numero not in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (16,25))) AS b'||p.po_numero;


-- Anciens
    -- Reste
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,27,29,32))) AS b'||p.po_numero;
    -- Nouveaux
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero not in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,27,29,32))) AS b'||p.po_numero;
    -- Disparus
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p.po_numero||'.nb AS "'||EXTRACT(YEAR FROM p.po_debut)||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,27,29,32)) and pe_numero not in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,27,29,32))) AS b'||p.po_numero;



  END LOOP;
  FOR x IN 1..nb_lines LOOP
    IF x<>1 THEN
     query:=query||' UNION ALL ';
    END IF;
    query:=query||proc[x]||corp[x];
  END LOOP;

--  RAISE NOTICE '>>>> %',query;
  EXECUTE query;
  RETURN nb_lines;

END;
$$ LANGUAGE 'plpgsql' VOLATILE;











CREATE OR REPLACE FUNCTION stat_activite_annuelle(num_societe integer,code text) RETURNS INTEGER AS
$$
DECLARE
  month integer;
  compte integer;
  proc text;
  corp text;
  table_name text;
  current_year integer;
  last_year integer;
  agg text;
BEGIN
  corp:='';
  IF code='M' THEN
    agg := 'sum(total)';
  ELSIF code = 'Q' THEN
    agg := 'sum(quantity)';
  ELSE
    RAISE EXCEPTION 'Donnée de sortie inconnue : "%"', code;
  END IF;
  table_name = 'stat_activite_annuelle_'||num_societe||code;
  SELECT count(*) from pg_tables where table_name ilike tablename INTO compte;
  IF compte>0 THEN
    proc:='DROP TABLE '||table_name||';';
    EXECUTE proc;
  END IF;
  proc:='CREATE TEMPORARY TABLE '||table_name||' AS ';
  proc:=proc||'SELECT ';
  proc:=proc||' pd_id AS "N° P.",';
  proc:=proc||' initcap(pd_libelle) AS "Produit",';
  proc:=proc||' CASE WHEN pd_actif THEN ''actif'' ELSE ''inactif'' END AS "Etat",';
  SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO last_year;
  FOR current_year IN 1997..last_year LOOP
    proc:=proc||'REPLACE(round(year'||current_year||'.total,2),''.'','','') AS "'||current_year||'",\n';
    corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/01/'||current_year||''' AND ''31/12/'||current_year||''' GROUP BY 2,3) AS year'||current_year||' ON (year'||current_year||'.product=pd_numero AND year'||current_year||'.society='||num_societe||')\n';
  END LOOP;
  corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/01/1997'' AND ''31/12/'||last_year||''' GROUP BY 2,3) AS years ON (years.product=pd_numero AND years.society='||num_societe||')\n';
  proc:=proc||' REPLACE(round(years.total,2),''.'','','') AS "Total"\n FROM table_produit \n'||corp;
  proc:=proc||' WHERE so_numero='||num_societe;
  proc:=proc||' ORDER BY 3,2';

--  RAISE NOTICE '>>>> %',proc;
  EXECUTE proc;
  RETURN 0;

END;
$$ LANGUAGE 'plpgsql' VOLATILE;




CREATE OR REPLACE FUNCTION stat_activite_mensuelle(num_societe integer,code text) RETURNS INTEGER AS
$$
DECLARE
  month integer;
  compte integer;
  proc text;
  corp text;
  table_name text;
  current_year integer;
  last_year integer;
  m integer;
  agg text;
BEGIN
  corp:='';
  IF code='M' THEN
    agg := 'sum(total)';
  ELSIF code = 'Q' THEN
    agg := 'sum(quantity)';
  ELSE
    RAISE EXCEPTION 'Donnée de sortie inconnue : "%"', code;
  END IF;
  table_name = 'stat_activite_mensuelle_'||num_societe||code;
  SELECT count(*) from pg_tables where table_name ilike tablename INTO compte;
  IF compte>0 THEN
    proc:='DROP TABLE '||table_name||';';
    EXECUTE proc;
  END IF;
  proc:='CREATE TEMPORARY TABLE '||table_name||' AS ';
  proc:=proc||'SELECT ';
  proc:=proc||' pd_id AS "N° P.",';
  proc:=proc||' initcap(pd_libelle) AS "Produit",';
  proc:=proc||' CASE WHEN pd_actif THEN ''actif'' ELSE ''inactif'' END AS "Etat",';
  SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO last_year;
  FOR current_year IN 1997..last_year LOOP
    FOR m IN 1..12 LOOP
      proc:=proc||'REPLACE(round(col'||m||'_'||current_year||'.total,2),''.'','','') AS "'||m||'_'||current_year||'", ';
      corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/'||m||'/'||current_year||''' AND '''||('01/'||m||'/'||current_year)::date+'1 month'::interval-'1 day'::interval||''' GROUP BY 2,3) AS col'||m||'_'||current_year||' ON (col'||m||'_'||current_year||'.product=pd_numero AND col'||m||'_'||current_year||'.society='||num_societe||')\n';
    END LOOP;
  END LOOP;
  corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/01/1997'' AND ''31/12/'||last_year||''' GROUP BY 2,3) AS years ON (years.product=pd_numero AND years.society='||num_societe||')\n';
  proc:=proc||' REPLACE(round(years.total,2),''.'','','') AS "Total"\n FROM table_produit \n'||corp;
  proc:=proc||' WHERE so_numero='||num_societe;
  proc:=proc||' ORDER BY 3,2';

--  RAISE NOTICE '>>>> %',proc;
  EXECUTE proc;
  RETURN 0;

END;
$$ LANGUAGE 'plpgsql' VOLATILE;

  




CREATE OR REPLACE FUNCTION stat_compta_mensuelle(integer,integer) RETURNS INTEGER AS
$$
DECLARE
  num_societe ALIAS FOR $1;
  year ALIAS FOR $2;
  sup integer;
  msup integer;
  month integer;
  compte integer;
  table_name text;
  proc text;
  corp text;
BEGIN
  msup:=0;
  sup :=0;
  corp:='';
  table_name = 'stat_compta_mensuelle_'||num_societe||'_'||year;
  SELECT count(*) from pg_tables where tablename=table_name INTO compte;
  IF compte>0 THEN
    proc:='DROP TABLE '||table_name||';';
    EXECUTE proc;
  END IF;
  proc:='CREATE TEMPORARY TABLE '||table_name||' AS ';
  proc:=proc||'SELECT ';
  proc:=proc||' cg_numero AS "Int.",';
  proc:=proc||' initcap(cg_libelle) AS "Compte",';
  proc:=proc||' rtrim(cg_numcompte,''0'') AS "N.Cpt.",\n';
  FOR month IN 1..12 LOOP
    proc:=proc||'REPLACE(round(month'||month||'.total,2),''.'','','') AS "Débit '||month||'/'||year||'",\n';
    proc:=proc||'REPLACE(round(month'||month||'.total,2),''.'','','') AS "Crédit '||month||'/'||year||'",\n';
--    proc:=proc||'REPLACE(round(month'||month||'.total,2),''.'','','') AS "'||month||'/'||year||'",\n';
    IF month=12 THEN
      sup:=1;
      msup:=-12;
    END IF;
    corp:=corp||'  LEFT JOIN (SELECT sum(total) as total, account, society FROM debits where ''01/'||month||'/'||year||'''<=day AND day<''01/'||month+1+msup||'/'||year+sup||''' GROUP BY 2,3) AS month'||month||' ON (month'||month||'.account=cg_numero AND month'||month||'.society='||num_societe||')\n';
    corp:=corp||'  LEFT JOIN (SELECT sum(total) as total, account, society FROM credits where ''01/'||month||'/'||year||'''<=day AND day<''01/'||month+1+msup||'/'||year+sup||''' GROUP BY 2,3) AS month'||month||' ON (month'||month||'.account=cg_numero AND month'||month||'.society='||num_societe||')\n';
--    corp:=corp||'  LEFT JOIN (SELECT sum(total) as total, account, society FROM products where ''01/'||month||'/'||year||'''<=day AND day<''01/'||month+1+msup||'/'||year+sup||''' GROUP BY 2,3) AS month'||month||' ON (month'||month||'.account=cg_numero AND month'||month||'.society='||num_societe||')\n';
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

SELECT stat_compta_mensuelle(1,2008);
SELECT stat_compta_mensuelle(2,2008);
SELECT stat_compta_mensuelle(3,2008);
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


