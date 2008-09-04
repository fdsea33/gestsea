
--DROP VIEW vue_evoplus;
\a
\f ;
\o /tmp/evoplus_reglements.csv
SELECT e.*, CASE WHEN cs_numero IS NOT NULL THEN 1 END AS cotisation_traitee, e.created_at::date AS date_livraison, r.created_at::date AS date_reglement, REPLACE(rg_montant::text,'.',',') AS montant_regle 
  FROM table_evoplus e left join table_cotisation c on (cs_annee=2008 and e.pe_numero IN (c.pe_numero,COALESCE(c.cs_societe,0))) LEFT JOIN table_reglement r on (rg_numero=bml_extract(c.cs_detail,'reglement.numero')::integer and e.created_at<c.created_at)
  WHERE (rg_numero is not null or proposition is false) order by e.id;
\o
\a

--
