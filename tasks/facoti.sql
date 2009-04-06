
-- Création de la fonction
CREATE OR REPLACE FUNCTION fc_finish_cotisations(IN started_on DATE, IN stopped_on DATE) RETURNS BOOLEAN AS
$$
DECLARE
  f TEXT;
BEGIN
  PERFORM fc_cotisation_vers_facture(cs_numero) FROM cotisation WHERE not cs_done ORDER BY cs_numero;
  SELECT fc_imprimelot(1,'facture',started_on, stopped_on) INTO f;
  PERFORM execution('mv '||SUBSTR(f,8)||' /tmp/FCM_'||to_char(started_on,'YYYYMMDD')||'_'||to_char(stopped_on,'YYYYMMDD')||'.pdf');
  SELECT fc_imprimelot(1,'carte',started_on, stopped_on) INTO f;
  PERFORM execution('mv '||SUBSTR(f,8)||' /tmp/LCM_'||to_char(started_on,'YYYYMMDD')||'_'||to_char(stopped_on,'YYYYMMDD')||'.pdf');
  RETURN true;
END;
$$ 
LANGUAGE 'plpgsql';

-- Mise en application de la fonction
SELECT fc_finish_cotisations((CURRENT_DATE-'6 days'::INTERVAL)::DATE, (CURRENT_DATE-'0 days'::INTERVAL)::DATE);

-- Creation de la vue des cerealiers ALVEA
DROP VIEW VUE_Cerealiers;

CREATE OR REPLACE VIEW VUE_Cerealiers AS
  SELECT c.pe_numero AS cs_personne, cs_societe, fa_numero, cs_numero FROM table_lignefacture join table_facture f using (fa_numero) JOIN table_cotisation c ON (f.pe_numero IN (c.pe_numero, c.cs_societe)) WHERE pd_numero=500000058 and extract(year from fa_date)=EXTRACT(YEAR FROM CURRENT_DATE);

-- Extraction du fichier ALVEA
\f ;
\a
\t

\o /tmp/alvea_maj.csv

\qecho ;Personne;;;;;;;;;;;Société;;;;;;;;;;;
\qecho Céréalier;N°;Titre;Nom;Prenom;Ligne_2;Ligne_3;Ligne_4;Ligne_5;CP;Ville;Telephone;N°; Titre;Nom;Prenom;Ligne_2;Ligne_3;Ligne_4;Ligne_5;CP;Ville;Telephone
SELECT CASE WHEN c.cs_numero IN (SELECT cs_numero FROM VUE_Cerealiers) THEN 'X' ELSE '' END AS cereal, p.pe_id, p.pe_adresse, '="'||p.pe_telephone||'"', s.pe_id, s.pe_adresse, '="'||s.pe_telephone||'"'
  FROM table_cotisation c join vue_personne p using (pe_numero) LEFT JOIN vue_personne s ON (c.cs_societe=s.pe_numero) 
  WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE) AND (c.created_at::date BETWEEN (CURRENT_DATE-'6 days'::INTERVAL)::DATE AND (CURRENT_DATE-'0 days'::INTERVAL)::DATE)
ORDER BY 1 DESC, p.pe_nom
;

SELECT '', p.pe_id, p.pe_adresse, '="'||p.pe_telephone||'"','', '', ''
  FROM table_lignefacture l JOIN table_facture f USING (fa_numero) JOIN vue_personne p ON (l.pe_numero=p.pe_numero)
  WHERE (f.created_at::date BETWEEN (CURRENT_DATE-'6 days'::INTERVAL)::DATE AND (CURRENT_DATE-'0 days'::INTERVAL)::DATE)
    AND pd_numero=500000180
ORDER BY 1 DESC, p.pe_nom
;

\o    
\f |
\a
\t


\f ;
\a
\t
\o /tmp/alvea.csv

\qecho ;Personne;;;;;;;;;;;Société;;;;;;;;;;;
\qecho Céréalier;N°;Titre;Nom;Prenom;Ligne_2;Ligne_3;Ligne_4;Ligne_5;CP;Ville;Telephone;N°; Titre;Nom;Prenom;Ligne_2;Ligne_3;Ligne_4;Ligne_5;CP;Ville;Telephone
-- Personnel FDSEA/SACEA/AAVA
SELECT '', p.pe_id, p.pe_adresse, '="'||p.pe_telephone||'"','', '', ''
  FROM table_attribut JOIN vue_personne p USING (pe_numero)
  WHERE cr_numero=217
ORDER BY 1 DESC, p.pe_nom
;
-- Salariés
SELECT '', p.pe_id, p.pe_adresse, '="'||p.pe_telephone||'"','', '', ''
  FROM table_lignefacture l JOIN table_facture f USING (fa_numero) JOIN vue_personne p ON (l.pe_numero=p.pe_numero)
  WHERE (f.created_at::date BETWEEN ('01/01/'||EXTRACT(YEAR FROM CURRENT_DATE))::DATE AND CURRENT_DATE)
    AND pd_numero=500000180
ORDER BY 1 DESC, p.pe_nom
;
-- Adhérents
SELECT CASE WHEN c.cs_numero IN (SELECT cs_numero FROM VUE_Cerealiers) THEN 'X' ELSE '' END AS cereal, p.pe_id, p.pe_adresse, '="'||p.pe_telephone||'"', s.pe_id, s.pe_adresse, '="'||s.pe_telephone||'"'
  FROM table_cotisation c join vue_personne p using (pe_numero) LEFT JOIN vue_personne s ON (c.cs_societe=s.pe_numero) 
  WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)
ORDER BY 1 DESC, p.pe_nom
;

\o
\f |
\a
\t


