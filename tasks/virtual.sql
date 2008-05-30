\f ;
\t
\o virtual.txt
SELECT '\nviticulteurs2007@fdsea33.fr\t\tservice.syndical@fdsea33.fr '||concatenate(mail||' ')
  FROM (SELECT distinct cn_coordonnee AS mail
    FROM table_contact
    WHERE cn_actif 
      AND pe_numero NOT IN (1011482)
      AND ck_numero=104
      AND pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee=2007)
--      AND pe_numero IN (SELECT pe_numero FROM table_adhesion JOIN table_adherence USING (ah_numero) WHERE ah_libelle ILIKE '%[FDSEA]%' AND po_numero=500000011)
      AND (pe_numero IN (SELECT pe_numero FROM table_personne WHERE pe_titre ilike 'SC%' OR pe_nom ilike 'VIGN%' OR pe_nom ilike 'CH.%')
        OR pe_numero IN (SELECT pe_numero FROM table_attribut WHERE cr_numero=59 OR cr_numero=115 OR cr_numero=134))
) AS viti;

\qecho 
SELECT '\nadherents2007@fdsea33.fr\t\tservice.syndical@fdsea33.fr '||concatenate(mail||' ')
  FROM (SELECT distinct cn_coordonnee AS mail
    FROM table_contact
    WHERE cn_actif 
      AND pe_numero NOT IN (1011482,1018116,1002682)
      AND ck_numero=104
      AND pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee=2007)
--      AND pe_numero IN (SELECT pe_numero FROM vue_adhesion WHERE ah_libelle ILIKE '[FDSEA]%' AND cs_annee=2007)
) AS x;

\qecho 
SELECT '\nadherents2008@fdsea33.fr\t\tservice.syndical@fdsea33.fr '||concatenate(mail||' ')
  FROM (SELECT distinct cn_coordonnee AS mail
    FROM table_contact
    WHERE cn_actif 
      AND pe_numero NOT IN (1011482,1018116,1002682)
      AND ck_numero=104
      AND pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee=2008)
--      AND pe_numero IN (SELECT pe_numero FROM vue_adhesion WHERE ah_libelle ILIKE '[FDSEA]%' AND cs_annee=2008)
) AS x;

\qecho 
SELECT '\ncerealiers2007@fdsea33.fr\t\tservice.syndical@fdsea33.fr '||concatenate(mail||' ')
  FROM (SELECT distinct cn_coordonnee AS mail
    FROM table_contact
    WHERE cn_actif 
      AND pe_numero NOT IN (1011482,1018116,1002682)
      AND ck_numero=104
      AND pe_numero IN (SELECT pe_numero FROM table_adhesion JOIN table_adherence USING (ah_numero) WHERE ah_libelle ILIKE '%[FDSEA]%' AND po_numero=500000011)
      AND (pe_numero in (SELECT pe_numero from table_lignefacture join table_facture using (fa_numero) where pd_numero=500000060)
        OR pe_numero in (SELECT pe_numero from table_attribut where cr_numero=53))
) AS cerealiers;


\t
\o
/*
SELECT distinct cn_coordonnee AS mail
    FROM table_estjoignable join table_contact using (cn_numero) 
    WHERE ej_actif 
      AND cn_type='E-MAIL'
      AND pe_numero IN (SELECT pe_numero FROM table_adhesion JOIN table_adherence USING (ah_numero) WHERE ah_libelle ILIKE '%[FDSEA]%' AND po_numero=500000011)
      AND (pe_numero IN (SELECT pe_numero FROM table_personne WHERE pe_titre ilike 'SC%' OR pe_nom ilike 'VIGN%' OR pe_nom ilike 'CH.%')
        OR pe_numero IN (SELECT pe_numero FROM table_attribut WHERE cr_numero=59 OR cr_numero=115 OR cr_numero=134));
*/
