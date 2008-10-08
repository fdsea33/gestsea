
--DROP VIEW vue_evoplus;
\a
\f ;
\o /tmp/evoplus_reglements.csv
SELECT 
--DISTINCT ON (e.pe_numero) 
e.source,
e.pe_numero,
e.titre,
e.nom,
e.complement,
e.ad1,
e.ad2,
e.ad3,
cp,
ville,
naissance,
'="'||telephone||'"' AS telephone,
'="'||fax||'"' AS fax,
'="'||portable||'"' AS portable,
REPLACE(CASE WHEN opt_num=1 THEN opt1 WHEN opt_num=2 THEN opt2 WHEN opt_num=3 THEN opt3 WHEN opt_num=4 THEN opt4 ELSE '' END::text,'.',',') AS opt_ttc,
e.created_at::date AS date_livraison, 
CASE WHEN e.pe_numero IN (SELECT pe_numero FROM table_attribut WHERE cr_numero=224)
THEN fc_delai(e.created_at::date,'2 months, eom')
ELSE r.created_at::date END AS date_reglement, 
CASE WHEN e.pe_numero IN (SELECT pe_numero FROM table_attribut WHERE cr_numero=224) THEN 'ANNULATION' 
WHEN e.created_at>c.created_at+'2 weeks'::interval THEN 'ANNULATION'
ELSE REPLACE(rg_montant::text,'.',',') END AS montant_regle,
'' AS "DATE",
CASE WHEN e.pe_numero IN (SELECT pe_numero FROM table_attribut WHERE cr_numero=224) THEN 'STOP ADH' 
WHEN e.created_at>c.created_at+'2 weeks'::interval THEN 'DEJA ADH!'
ELSE '' END AS "STATUT",
'' AS "REMARQUES"
  FROM table_evoplus e left join table_cotisation c on (cs_annee=2008 and e.pe_numero IN (c.pe_numero,COALESCE(c.cs_societe,0))) LEFT JOIN table_reglement r on (rg_numero=bml_extract(c.cs_detail,'reglement.numero')::integer)
  WHERE 
    (proposition is false and not statut ilike 'deja adh%') 
--    (rg_numero is not null or proposition is false) 
--    AND e.pe_numero NOT IN (SELECT pe_numero FROM table_attribut WHERE cr_numero=224)
  ORDER BY e.created_at;
\o
\a

--
