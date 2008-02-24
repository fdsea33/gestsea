-- Mise à jour des références
UPDATE table_cotisation SET cs_detail=bml_put(table_cotisation.cs_detail,'cotisation.reference', ref.cs_numero::text) FROM table_cotisation ref WHERE bml_extract(ref.cs_detail, 'fdsea.conjoint.numero')=table_cotisation.pe_numero and bml_extract(table_cotisation.cs_detail, 'cotisation.type')='conjoint';

-- Mise à jour des détails
update table_cotisation SET cs_detail=bml_sort(cs_detail);

BEGIN;

INSERT INTO table_sequence (sq_nom, sq_nombre) VALUES ('facsacea',30);
INSERT INTO table_sequence (sq_nom, sq_nombre) VALUES ('facfdsea',30);
INSERT INTO table_sequence (sq_nom, sq_nombre) VALUES ('facaava',30);
INSERT INTO table_sequence (sq_nom, sq_nombre) VALUES ('facsci',30);

UPDATE table_sequence SET sq_last=last_value FROM seq_sacea WHERE sq_nom='facsacea';
UPDATE table_sequence SET sq_last=last_value FROM seq_fdsea WHERE sq_nom='facfdsea';
UPDATE table_sequence SET sq_last=last_value FROM seq_aveniraquit WHERE sq_nom='facaava';
UPDATE table_sequence SET sq_last=last_value FROM seq_500000009 WHERE sq_nom='facsci';

UPDATE table_societe SET sq_numero=s.sq_numero FROM table_sequence s WHERE s.sq_nom='facsacea' and so_numero=1;
UPDATE table_societe SET sq_numero=s.sq_numero FROM table_sequence s WHERE s.sq_nom='facfdsea' and so_numero=2;
UPDATE table_societe SET sq_numero=s.sq_numero FROM table_sequence s WHERE s.sq_nom='facaava' and so_numero=3;
UPDATE table_societe SET sq_numero=s.sq_numero FROM table_sequence s WHERE s.sq_nom='facsci' and so_numero=500000009;

COMMIT;
