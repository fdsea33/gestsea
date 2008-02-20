/*****************************************************************************
 * Mise à zéro de toutes les fonctions publiques                             *
 *****************************************************************************/

CREATE OR REPLACE FUNCTION FC_MakeClean(IN schemaname TEXT) RETURNS VOID AS
$$
DECLARE
  r record;
  ok boolean;
BEGIN
  -- Suppression des triggers
  FOR r IN SELECT 'DROP TRIGGER '||CAST(t.tgname AS pg_catalog.text)||' ON '||c.relname||' CASCADE;' AS query FROM pg_catalog.pg_trigger t JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid JOIN pg_catalog.pg_proc p ON p.oid=tgfoid JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname=schemaname LOOP
    EXECUTE r.query;
  END LOOP;

  -- Suppression des vues
  FOR r IN SELECT c.relname AS viewname FROM pg_class c LEFT JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relkind = 'v'::"char" AND n.nspname=schemaname ORDER BY 1 LOOP
    SELECT count(*)>0 FROM  pg_class c WHERE c.relkind = 'v'::"char" AND relname=r.viewname INTO ok;
    IF ok THEN
      EXECUTE 'DROP VIEW '||schemaname||'.'||r.viewname||' CASCADE;';
    END IF;
  END LOOP;

  -- Suppression des fonctions
  FOR r IN SELECT 'DROP FUNCTION '||schemaname||'.'||p.proname||'('||pg_catalog.oidvectortypes(p.proargtypes)||') CASCADE;' AS query FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang WHERE p.prorettype <> 'pg_catalog.cstring'::pg_catalog.regtype AND (p.proargtypes[0] IS NULL OR p.proargtypes[0] <> 'pg_catalog.cstring'::pg_catalog.regtype) AND NOT p.proisagg AND n.nspname=schemaname AND l.lanname IN ('sql','plpgsql') LOOP
    EXECUTE r.query;
  END LOOP;
END; 
$$ LANGUAGE 'plpgsql';


SELECT FC_MakeClean('public');

--DROP FUNCTION FC_MakeClean(TEXT);

/*
SELECT n.nspname,p.proname, CASE WHEN p.proretset THEN 'setof ' ELSE '' END ||pg_catalog.format_type(p.prorettype, NULL), pg_catalog.oidvectortypes(p.proargtypes)
-- if (verbose)
--, r.rolname, l.lanname, p.prosrc, pg_catalog.obj_description(p.oid, 'pg_proc')
-- if (!verbose)
  FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
-- else
--  FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang JOIN pg_catalog.pg_roles r ON r.oid = p.proowner
  WHERE p.prorettype <> 'pg_catalog.cstring'::pg_catalog.regtype AND (p.proargtypes[0] IS NULL OR p.proargtypes[0] <> 'pg_catalog.cstring'::pg_catalog.regtype) AND NOT p.proisagg
  ORDER BY 1, 2, 3, 4;

SELECT p.oid, n.nspname, p.proname,l.lanname, r.rolname, CASE WHEN p.proretset THEN 'setof ' ELSE '' END ||pg_catalog.format_type(p.prorettype, NULL), pg_catalog.oidvectortypes(p.proargtypes)
  FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang JOIN pg_catalog.pg_roles r ON r.oid = p.proowner
--  FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
  WHERE p.prorettype <> 'pg_catalog.cstring'::pg_catalog.regtype AND (p.proargtypes[0] IS NULL OR p.proargtypes[0] <> 'pg_catalog.cstring'::pg_catalog.regtype) AND NOT p.proisagg
    AND n.nspname='public' AND l.lanname IN ('sql','plpgsql')
  ORDER BY 1, 2, 3, 4;

SELECT 'DROP FUNCTION '||n.nspname||'.'||p.proname||'('||pg_catalog.oidvectortypes(p.proargtypes)||');'
  FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang JOIN pg_catalog.pg_roles r ON r.oid = p.proowner
--  FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
  WHERE p.prorettype <> 'pg_catalog.cstring'::pg_catalog.regtype AND (p.proargtypes[0] IS NULL OR p.proargtypes[0] <> 'pg_catalog.cstring'::pg_catalog.regtype) AND NOT p.proisagg
    AND n.nspname='public' AND l.lanname IN ('sql','plpgsql')
  ORDER BY 1;
*/
/*
DELETE FROM pg_catalog.pg_proc WHERE oid IN (SELECT p.oid
  FROM pg_catalog.pg_proc p LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
  WHERE p.prorettype <> 'pg_catalog.cstring'::pg_catalog.regtype AND (p.proargtypes[0] IS NULL OR p.proargtypes[0] <> 'pg_catalog.cstring'::pg_catalog.regtype) AND NOT p.proisagg
    AND n.nspname='public' AND l.lanname IN ('sql','plpgsql'));
*/
