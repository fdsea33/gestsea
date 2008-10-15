-- CREATE LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pgsql2xml() RETURNS TEXT AS 
$$
DECLARE
  xml TEXT;
  word TEXT;
  total INTEGER;
  car VARCHAR(2);
  t record;
  c record;
  ct record;
  ku record;
  table_prefix text;
BEGIN
  xml:= E'<?xml version="1.0" encoding="UTF-8"?>\n';
  SELECT current_database() INTO word;
  xml:=xml||E'<analysis name="'||current_database()||E'">\n';
/*
  table_prefix := '';
  SELECT relname FROM pg_catalog.pg_class pc JOIN pg_catalog.pg_namespace pn ON (pc.relnamespace=pn.oid) WHERE nspname='public' AND relkind='r' INTO firstref;
  
  car := '--';
  FOR t IN SELECT pc.oid AS pcrelid,* FROM pg_catalog.pg_class pc JOIN pg_catalog.pg_namespace pn ON (pc.relnamespace=pn.oid) WHERE nspname='public' AND relkind='r' ORDER BY relname LOOP
    
  END LOOP;
*/


  -- Recuperation des tables du schema public
  FOR t IN SELECT pc.oid AS pcrelid,* FROM pg_catalog.pg_class pc JOIN pg_catalog.pg_namespace pn ON (pc.relnamespace=pn.oid) WHERE nspname='public' AND relkind='r' ORDER BY relname LOOP
    xml:=xml||E'  <table name="'||t.relname||E'" label="'||INITCAP(REPLACE(t.relname,E'_',E' '))||E'">\n';
    FOR c IN SELECT * FROM pg_class pc JOIN pg_attribute pa ON (pa.attrelid=pc.oid) JOIN pg_type pt ON (pt.oid = pa.atttypid) LEFT JOIN pg_attrdef ad ON (pc.oid=ad.adrelid AND adnum=attnum) WHERE pc.relname=t.relname AND pa.attnum > 0 AND NOT pa.attisdropped LOOP
      xml:=xml||E'    <column name="'||c.attname||E'" label="'||INITCAP(REPLACE(c.attname,E'_',E' '))||E'"';
      xml:=xml||E' type="'||UPPER(c.typname);

      IF c.atttypmod>0 THEN
        xml:=xml||E'('||c.atttypmod-4||E')';
      END IF;
/*
      ELSIF c.udt_name=E'numeric' AND c.numeric_precision IS NOT NULL THEN
        xml:=xml||E'('||c.numeric_precision;
        IF c.numeric_scale > 0 THEN
          xml:=xml||E','||COALESCE(c.numeric_scale,0);
        END IF;
        xml:=xml||E')';
      END IF;
*/
      xml:=xml||E'"';
      IF c.attnotnull THEN
        xml:=xml||E' notnull="true"';
      END IF;
      IF c.atthasdef THEN
        xml:=xml||E' default="'||c.adsrc||E'"';
      END IF;

      FOR ct IN SELECT * from pg_constraint where conrelid=t.pcrelid AND c.attnum = ANY(conkey) LOOP
        IF ct.contype=E'p' THEN
          xml:=xml||E' pkey="true"';
        ELSIF ct.contype=E'f' THEN
          SELECT COALESCE(pc.relname||E'('||pa.attname||E')',E'72') FROM pg_attribute pa JOIN pg_class pc ON (attrelid=pc.oid) WHERE pc.oid=ct.confrelid AND attnum=ct.confkey[1] INTO word;
          xml:=xml||E' fkey="'||word||E'" opt="ou'||ct.confupdtype||E'od'||ct.confdeltype||E'"';
        END IF;
      END LOOP;
/*
      FOR ct IN SELECT * FROM information_schema.constraint_column_usage WHERE table_name=t.table_name AND column_name=c.column_name LOOP
        SELECT * FROM information_schema.key_column_usage WHERE constraint_name=ct.constraint_name INTO ku;
        IF ku.position_in_unique_constraint IS NULL THEN
          -- Primary Key
          xml:=xml||E' pkey="true"';
        ELSE
          -- Foreign key
          xml:=xml||E' fkey="'||ku.table_name||E'('||ku.column_name||E')"';
        END IF;
      END LOOP;
*/
      xml:=xml||E'/>\n';
    END LOOP;
    xml:=xml||E'  </table>\n\n';
  END LOOP;
  xml:=xml||E'</analysis>\n';
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
