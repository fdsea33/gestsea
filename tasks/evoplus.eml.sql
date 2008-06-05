\a
\t
\f |
\o /tmp/evoplus.eml
\qecho To: evoplus@wanadoo.fr
\qecho Bcc: brice.texier@fdsea33.fr
\qecho From: brice.texier@fdsea33.fr
\qecho Content-type: text/plain; charset=UTF-8
SELECT 'Subject: [FDSEA33] Mise à jour du '||CURRENT_DATE;
\qecho 
\qecho Bonjour,
\qecho 
\qecho Voici le statut des 'DEJA ADH ?' :
\a
\t
SELECT pe_numero AS "N°", nom, created_at::date AS "Livré le", CASE WHEN pe_numero IN (select pe_numero FROM vue_cotisation where cs_annee=2008) THEN 'ADH2008' ELSE 'NON ADH' END AS "DEJA ADH?" from table_evoplus where statut ilike '%DEJA ADH%' ORDER BY 3;
\t
\a
\qecho 
SELECT 'Voici les propositions enregistrées hier ('||(CURRENT_DATE-'1 day'::INTERVAL)::date||') :';
\a
\t
SELECT e.pe_numero AS "N°", nom, e.created_at::date AS "Livré le", c.cs_montant, c.created_at::date AS "Retour le"  from table_evoplus e left join table_cotisation c  on (c.cs_annee=2008 and e.pe_numero in (c.pe_numero, c.cs_societe)) where proposition and cs_numero is not null AND c.created_at::date=(CURRENT_DATE-'1 day'::INTERVAL)::date;
\t
\a
\qecho 
SELECT 'Voici les propositions enregistrées depuis 1 mois (depuis le '||(CURRENT_DATE-'1 month'::INTERVAL)::date||') :';
\a
\t
SELECT e.pe_numero AS "N°", nom, e.created_at::date AS "Livré le", c.cs_montant, c.created_at::date AS "Retour le"  from table_evoplus e left join table_cotisation c  on (c.cs_annee=2008 and e.pe_numero in (c.pe_numero, c.cs_societe)) where proposition and cs_numero is not null AND c.created_at::date>=(CURRENT_DATE-'1 month'::INTERVAL)::date;
\t
\a
\qecho 
\qecho Cordialement,
\qecho 
\qecho Brice TEXIER
\t
\a

