\qecho *** Chargement des procédures de calcul

-- Products
/*
CREATE OR REPLACE VIEW credits AS
  SELECT CASE WHEN pd_reduction THEN lf_montantht*(100-fa_reduction)/100 ELSE lf_montantht END AS total, pd_numero as product, lf_quantite AS quantity, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture JOIN table_facture USING (fa_numero)
                            JOIN table_produit USING(pd_numero)
                            LEFT JOIN table_compteproduit USING (pd_numero)
                            LEFT JOIN table_comptegen USING (cg_numero)
    WHERE ci_actif AND NOT fa_perte
    ORDER BY 3;

CREATE OR REPLACE VIEW debits AS
  SELECT CASE WHEN pd_reduction THEN -la_montantht*(100-av_reduction)/100 ELSE -la_montantht END AS total, pd_numero as product, -la_quantite AS quantity, cg_numero as account, av_date AS day, table_facture.so_numero as society
    FROM table_ligneavoir JOIN table_avoir USING (av_numero)
                          JOIN table_produit USING(pd_numero)
                          JOIN table_facture USING (fa_numero)
                          LEFT JOIN table_compteproduit USING (pd_numero)
                  			  LEFT JOIN table_comptegen USING (cg_numero)
    WHERE ci_actif AND NOT fa_perte
    ORDER BY 3;

CREATE OR REPLACE VIEW products AS SELECT * FROM credits UNION ALL SELECT * FROM debits ORDER BY 3;
*/

CREATE OR REPLACE VIEW products AS
  SELECT CASE WHEN pd_reduction THEN lf_montantht*(100-fa_reduction)/100 ELSE lf_montantht END AS total, pd_numero as product, lf_quantite AS quantity, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture JOIN table_facture USING (fa_numero)
                            JOIN table_produit USING (pd_numero)
                            LEFT JOIN table_compteproduit USING (pd_numero)
                            LEFT JOIN table_comptegen USING (cg_numero)
    WHERE ci_actif AND NOT fa_perte
    ORDER BY 3;

-- Taxes
/*
CREATE OR REPLACE VIEW taxes_credits AS
  SELECT CASE WHEN pd_reduction THEN (lf_montantttc-lf_montantht)*(100-fa_reduction)/100 ELSE (lf_montantttc-lf_montantht) END AS total, px.pd_numero as product, lf_quantite AS quantity, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture JOIN table_facture USING (fa_numero)
                            JOIN table_produit USING(pd_numero)
                            JOIN table_prix px USING (px_numero)
                            LEFT JOIN table_tva USING (tv_numero)
                            LEFT JOIN table_comptegen USING (cg_numero)
    WHERE NOT fa_perte
    ORDER BY 3;

CREATE OR REPLACE VIEW taxes_debits AS
  SELECT CASE WHEN pd_reduction THEN -(la_montantttc-la_montantht)*(100-av_reduction)/100 ELSE -(la_montantttc-la_montantht) END AS total, px.pd_numero as product, -la_quantite AS quantity, cg_numero as account, av_date AS day, table_facture.so_numero as society
    FROM table_ligneavoir   JOIN table_avoir USING (av_numero)
                            JOIN table_produit USING (pd_numero)
                            JOIN table_facture USING (fa_numero)
                            JOIN table_prix px USING (px_numero)
                            LEFT JOIN table_tva USING (tv_numero)
                            LEFT JOIN table_comptegen USING (cg_numero)
    WHERE NOT fa_perte
    ORDER BY 3;

CREATE OR REPLACE VIEW taxes AS SELECT * FROM taxes_credits UNION ALL SELECT * FROM taxes_debits ORDER BY 3;
*/
CREATE OR REPLACE VIEW taxes AS
  SELECT CASE WHEN pd_reduction THEN (lf_montantttc-lf_montantht)*(100-fa_reduction)/100 ELSE (lf_montantttc-lf_montantht) END AS total, px.pd_numero as product, lf_quantite AS quantity, cg_numero as account, fa_date AS day, table_facture.so_numero as society
    FROM table_lignefacture JOIN table_facture USING (fa_numero)
                            JOIN table_produit USING(pd_numero)
                            JOIN table_prix px USING (px_numero)
                            LEFT JOIN table_tva USING (tv_numero)
                            LEFT JOIN table_comptegen USING (cg_numero)
    WHERE NOT fa_perte
    ORDER BY 3;

CREATE OR REPLACE VIEW sales AS SELECT * FROM products UNION ALL SELECT * FROM taxes ORDER BY 3;

/*
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
*/




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
  proc[nb_lines]:='SELECT ''Nombre d''''exploitants associés''::text AS "Variable"';
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
  proc[nb_lines]:='SELECT ''Montant des cotisations de coopérateurs''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations d''''exploitants''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations d''''exploitants associés''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations d''''anciens exploitants (sans bailleurs)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations d''''anciens exploitants conjoint''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations d''''anciens exploitants et bailleurs''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations d''''anciens exploitants (tous confondus)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations de bailleurs (sans anciens)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations de bailleurs (tous confondus)''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations d''''adhérents''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des cotisations hectares''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''abonnements conseil SACEA''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Montant des abonnements conseil SACEA''::text AS "Variable"';
/*
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents fidèles''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents constants''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents nouveaux''::text AS "Variable"';
  nb_lines := nb_lines + 1;
  proc[nb_lines]:='SELECT ''Nombre d''''adhérents disparus''::text AS "Variable"';
*/
/*
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
*/
  FOR x IN 1..nb_lines LOOP
    corp[x] := ' FROM ';
  END LOOP;
  first_year := true;
--  FOR p IN SELECT * FROM periode ORDER BY po_debut LOOP
  FOR p IN 1997..EXTRACT(YEAR FROM CURRENT_DATE) LOOP
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
    proc[nb_lines]:=proc[nb_lines]||', c'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''300006'') AND cs_annee='||p||') AS c'||p;
    -- Exploitants
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', e'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000052'') AND cs_annee='||p||') AS e'||p;
    -- Exploitants associés
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', e'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000162'') AND cs_annee='||p||') AS e'||p;
    -- Anciens
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', a'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000054'') AND cs_annee='||p||') AS a'||p;
    -- Conjoints anciens
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000150'') AND cs_annee='||p||') AS b'||p;
    -- Anciens et bailleurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000124'') AND cs_annee='||p||') AS b'||p;
    -- Anciens (tous)
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000124'',''500000150'',''500000054'') AND cs_annee='||p||') AS b'||p;
    -- Bailleurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000053'') AND cs_annee='||p||') AS b'||p;
    -- Bailleurs (tous)
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000124'',''500000053'') AND cs_annee='||p||') AS b'||p;
    -- Nb Adhérents
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''300006'',''500000052'',''500000054'',''500000150'',''500000053'',''500000124'',''500000162'') AND cs_annee='||p||') AS b'||p;
    -- Cumul
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''300006'',''500000052'',''500000054'',''500000150'',''500000053'',''500000124'',''500000162'') AND cs_annee<='||p||') AS b'||p;


-- MONTANTS
    -- Coopérateurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', c'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''300006'') AND cs_annee='||p||') AS c'||p;
    -- Exploitants
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', e'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000052'') AND cs_annee='||p||') AS e'||p;
    -- Exploitants associés
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', e'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000162'') AND cs_annee='||p||') AS e'||p;
    -- Anciens
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', a'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000054'') AND cs_annee='||p||') AS a'||p;
    -- Conjoints anciens
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000150'') AND cs_annee='||p||') AS b'||p;
    -- Anciens et bailleurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000124'') AND cs_annee='||p||') AS b'||p;
    -- Anciens (tous)
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000124'',''500000150'',''500000054'') AND cs_annee='||p||') AS b'||p;
    -- Bailleurs
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000053'') AND cs_annee='||p||') AS b'||p;
    -- Bailleurs (tous)
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (SELECT sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''500000124'',''500000053'') AND cs_annee='||p||') AS b'||p;
    -- Nb Adhérents
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select sum(cs_montant) AS nb FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''300006'',''500000052'',''500000054'',''500000150'',''500000053'',''500000124'',''500000162'') AND cs_annee='||p||') AS b'||p;
    -- Cotisation Hectares
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select sum(lf_montantttc) AS nb FROM table_lignefacture join table_facture using (fa_numero) where pd_numero IN (500000060,500000059,500000057,500000058,500000055,500000056) AND extract(YEAR FROM fa_date)='||p||' and fa_numero NOT IN (SELECT fa_avoir_facture FROM table_facture WHERE fa_avoir)) AS b'||p;
    -- Abon Conseil Nb
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select sum(lf_quantite) AS nb FROM table_lignefacture join table_facture using (fa_numero) where pd_numero IN (500000036,500000069,500000065) AND  extract(YEAR FROM fa_date)='||p||' and fa_numero NOT IN (SELECT fa_avoir_facture FROM table_facture WHERE fa_avoir)) AS b'||p;
    -- Abon Conseil
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select sum(lf_montantttc) AS nb FROM table_lignefacture join table_facture using (fa_numero) where pd_numero IN (500000036,500000069,500000065) AND extract(YEAR FROM fa_date)='||p||' and fa_numero NOT IN (SELECT fa_avoir_facture FROM table_facture WHERE fa_avoir)) AS b'||p;













/*
    -- Fidèles
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_personne where pe_numero IN (SELECT pe_numero FROM table_cotisation where bml_extract(cs_detail,''fdsea.forfait.produit'') IN (''300006'',''500000052'',''500000054'',''500000150'',''500000053'',''500000124'') AND cs_annee='||p||')
adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<='''||p.po_fin||''' and po_debut>='''||p.po_debut-'4 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32) group by pe_numero having count(distinct as_numero)>=5)) AS b'||p;
    -- Reste
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32))) AS b'||p;
    -- Nouveaux
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero not in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32))) AS b'||p;
    -- Disparus
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32)) and pe_numero not in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,18,19,16,25,26,27,29,32))) AS b'||p;
    -- Nouveaux Anciens exploitants
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (19,25)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (27,29,32))) AS b'||p;
*/
/*
-- Exploitants
    -- Reste
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (16,25)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (16,25))) AS b'||p;
    -- Nouveaux
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero not in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (16,25)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (16,25))) AS b'||p;
    -- Disparus
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (16,25)) and pe_numero not in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (16,25))) AS b'||p;


-- Anciens
    -- Reste
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,27,29,32))) AS b'||p;
    -- Nouveaux
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero not in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,27,29,32)) and pe_numero in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,27,29,32))) AS b'||p;
    -- Disparus
    nb_lines := nb_lines + 1;
    proc[nb_lines]:=proc[nb_lines]||', b'||p||'.nb AS "'||p||'"';
    corp[nb_lines]:=corp[nb_lines]||' (select count(distinct pe_numero) AS nb FROM table_adhesion where pe_numero in (SELECT pe_numero FROM table_adhesion join table_periode using (po_numero) where po_fin<'''||p.po_debut||''' and po_debut>='''||p.po_debut-'1 year'::interval||''' and ah_numero-500000000 in (17,27,29,32)) and pe_numero not in (SELECT pe_numero FROM table_adhesion where po_numero='||p.po_numero||' and ah_numero-500000000 in (17,27,29,32))) AS b'||p;
*/


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
    proc:=proc||'REPLACE(round(year'||current_year||'.total,2)::VARCHAR,''.'','','') AS "'||current_year||E'",\n';
    corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/01/'||current_year||''' AND ''31/12/'||current_year||''' GROUP BY 2,3) AS year'||current_year||' ON (year'||current_year||'.product=pd_numero AND year'||current_year||'.society='||num_societe||E')\n';
  END LOOP;
  corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/01/1997'' AND ''31/12/'||last_year||''' GROUP BY 2,3) AS years ON (years.product=pd_numero AND years.society='||num_societe||E')\n';
  proc:=proc||E' REPLACE(round(years.total,2)::VARCHAR,''.'','','') AS "Total"\n FROM table_produit \n'||corp;
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
      proc:=proc||'REPLACE(round(col'||m||'_'||current_year||'.total,2)::VARCHAR,''.'','','') AS "'||m||'_'||current_year||'", ';
      corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/'||m||'/'||current_year||''' AND '''||('01/'||m||'/'||current_year)::date+'1 month'::interval-'1 day'::interval||''' GROUP BY 2,3) AS col'||m||'_'||current_year||' ON (col'||m||'_'||current_year||'.product=pd_numero AND col'||m||'_'||current_year||'.society='||num_societe||E')\n';
    END LOOP;
  END LOOP;
  corp:=corp||' LEFT JOIN (SELECT '||agg||' as total, product, society FROM products where day BETWEEN ''01/01/1997'' AND ''31/12/'||last_year||''' GROUP BY 2,3) AS years ON (years.product=pd_numero AND years.society='||num_societe||E')\n';
  proc:=proc||E' REPLACE(round(years.total,2)::VARCHAR,''.'','','') AS "Total"\n FROM table_produit \n'||corp;
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
  query text;
  proc text;
  corp text;
  taxe text;
BEGIN
  msup:=0;
  sup :=0;
  table_name = 'stat_compta_mensuelle_'||num_societe||'_'||year;
  SELECT count(*) from pg_tables where tablename=table_name INTO compte;
  IF compte>0 THEN
    query:='DROP TABLE '||table_name||';';
    EXECUTE query;
  END IF;
  query:='CREATE TEMPORARY TABLE '||table_name||' AS ';
  proc:=E'SELECT cg_numero AS "Int.", INITCAP(cg_libelle) AS "Compte", RTRIM(cg_numcompte::VARCHAR, ''0''::VARCHAR) AS "N.Cpt.",\n';
  corp:='';
  FOR month IN 1..12 LOOP
    proc:=proc||'REPLACE(ROUND(z'||month||'.total,2)::VARCHAR,''.'','','') AS "'||month||' - '||year||E'",\n';
    IF month=12 THEN
      sup:=1;
      msup:=-12;
    END IF;
    corp:=corp||'LEFT JOIN (SELECT SUM(total) AS total, account, society FROM @@TABLE@@ WHERE ''01/'||month||'/'||year||'''<=day AND day<''01/'||month+1+msup||'/'||year+sup||''' GROUP BY 2,3) AS z'||month||' ON (z'||month||'.account=cg_numero AND z'||month||'.society='||num_societe||E')\n';
  END LOOP;
  corp:=corp||'LEFT JOIN (SELECT SUM(total) AS total, account, society FROM @@TABLE@@ WHERE ''1/1/'||year||'''<=day AND day<=''31/12/'||year||''' GROUP BY 2,3) AS year ON (year.account=cg_numero AND year.society='||num_societe||E')\n';

  proc:=proc||E'REPLACE(ROUND(year.total,2)::VARCHAR,''.'','','') AS "Total"\nFROM table_comptegen\n'||corp;
  proc:=proc||'WHERE (cg_numcompte::varchar like ''445%'' OR cg_numcompte::varchar like ''7%'' OR cg_numcompte::varchar like ''635%'' OR cg_numcompte::varchar like ''626%'')'; 
  proc:=proc||' AND so_numero='||num_societe;

--  query:=query||REPLACE(proc,'@@TABLE@@','products')||E'\nUNION ALL\n'||REPLACE(proc,'@@TABLE@@','taxes');
  query:=query||REPLACE(proc,'@@TABLE@@','sales');
  query:=query||' ORDER BY 3;';

--  RAISE NOTICE '>>>> %',query;
  EXECUTE query;
  RETURN 0;

END;
$$ LANGUAGE 'plpgsql' VOLATILE;



