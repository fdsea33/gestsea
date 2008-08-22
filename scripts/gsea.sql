\i migrations/gestsea_21U_clean.sql
\i migrations/gestsea_25U_bases.sql
\i migrations/gestsea_29U_noviews.sql
\i migrations/gestsea_30G_views.sql
\i migrations/gestsea_34U_print.sql
\i migrations/gestsea_35U_functions.sql
\i migrations/gestsea_37U_filters.sql
-- Mise à jour des droits
UPDATE table_groupetable SET gt_tables=(SELECT trim(trim(trim(concatenate(', '||relname)),',')) from pg_class c join pg_namespace n ON n.oid=c.relnamespace where relkind='S' and n.nspname='public') WHERE gt_libelle='SEQUENCES';
UPDATE table_groupetable SET gt_tables=(SELECT trim(trim(trim(concatenate(', '||relname)),',')) from pg_class c join pg_namespace n ON n.oid=c.relnamespace where relkind='v' and n.nspname='public' AND relname ilike 'vue_%') WHERE gt_libelle='PRINTVIEWS';
UPDATE table_groupetable SET gt_tables=(SELECT trim(trim(trim(concatenate(', '||relname)),',')) from pg_class c join pg_namespace n ON n.oid=c.relnamespace where n.nspname='public' and c.relkind!='i') WHERE gt_libelle='ALL';
UPDATE droit SET updated_by=current_user WHERE dr_numero=0;
-- Mise à jour des fonctions d'impression
SELECT FC_CreerImpressions('/tmp');
