
CREATE OR REPLACE FUNCTION pgsql2xml() RETURNS TEXT AS 
$$
DECLARE
  xml TEXT;
  word TEXT;
  total INTEGER;
  t record;
  c record;
  ct record;
  ku record;
BEGIN
  xml:= '<?xml version="1.0" encoding="UTF-8"?>\n';
  SELECT current_database() INTO word;
  xml:=xml||'<analysis name="'||current_database()||'">\n';
  -- Recuperation des tables du schema public
  FOR t IN SELECT pc.oid AS pcrelid,* FROM pg_catalog.pg_class pc JOIN pg_catalog.pg_namespace pn ON (pc.relnamespace=pn.oid) WHERE nspname='public' AND relkind='r' ORDER BY relname LOOP
    xml:=xml||'  <table name="'||t.relname||'" label="'||INITCAP(REPLACE(t.relname,'_',' '))||'">\n';
    FOR c IN SELECT * FROM pg_class pc JOIN pg_attribute pa ON (pa.attrelid=pc.oid) JOIN pg_type pt ON (pt.oid = pa.atttypid) LEFT JOIN pg_attrdef ad ON (pc.oid=ad.adrelid AND adnum=attnum) WHERE pc.relname=t.relname AND pa.attnum > 0 AND NOT pa.attisdropped LOOP
      xml:=xml||'    <column name="'||c.attname||'" label="'||INITCAP(REPLACE(c.attname,'_',' '))||'"';
      xml:=xml||' type="'||UPPER(c.typname);

      IF c.atttypmod>0 THEN
        xml:=xml||'('||c.atttypmod-4||')';
      END IF;
/*
      ELSIF c.udt_name='numeric' AND c.numeric_precision IS NOT NULL THEN
        xml:=xml||'('||c.numeric_precision;
        IF c.numeric_scale > 0 THEN
          xml:=xml||','||COALESCE(c.numeric_scale,0);
        END IF;
        xml:=xml||')';
      END IF;
*/
      xml:=xml||'"';
      IF c.attnotnull THEN
        xml:=xml||' notnull="true"';
      END IF;
      IF c.atthasdef THEN
        xml:=xml||' default="'||c.adsrc||'"';
      END IF;

      FOR ct IN SELECT * from pg_constraint where conrelid=t.pcrelid AND c.attnum = ANY(conkey) LOOP
        IF ct.contype='p' THEN
          xml:=xml||' pkey="true"';
        ELSIF ct.contype='f' THEN
          SELECT COALESCE(pc.relname||'('||pa.attname||')','72') FROM pg_attribute pa JOIN pg_class pc ON (attrelid=pc.oid) WHERE pc.oid=ct.confrelid AND attnum=ct.confkey[1] INTO word;
          xml:=xml||' fkey="'||word||'" opt="ou'||ct.confupdtype||'od'||ct.confdeltype||'"';
        END IF;
      END LOOP;
/*
      FOR ct IN SELECT * FROM information_schema.constraint_column_usage WHERE table_name=t.table_name AND column_name=c.column_name LOOP
        SELECT * FROM information_schema.key_column_usage WHERE constraint_name=ct.constraint_name INTO ku;
        IF ku.position_in_unique_constraint IS NULL THEN
          -- Primary Key
          xml:=xml||' pkey="true"';
        ELSE
          -- Foreign key
          xml:=xml||' fkey="'||ku.table_name||'('||ku.column_name||')"';
        END IF;
      END LOOP;
*/
      xml:=xml||'/>\n';
    END LOOP;
    xml:=xml||'  </table>\n\n';
  END LOOP;
  xml:=xml||'</analysis>\n';
  RETURN xml;
END;
$$
LANGUAGE 'plpgsql';

\t
\a

SELECT pgsql2xml();

\a
\t


DROP FUNCTION pgsql2xml();