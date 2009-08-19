CREATE OR REPLACE FUNCTION b2s(IN v BOOLEAN) RETURNS TEXT AS
$$
BEGIN
  RETURN CASE WHEN v THEN 'true' ELSE 'false' END;
END 
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION stamps(IN r ANYELEMENT) RETURNS TEXT AS
$$
BEGIN
  RETURN E' updated_at="'||r.updated_at::VARCHAR||E'"';
END 
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION gst2eky(IN num_societe INTEGER) RETURNS TEXT AS
$$
DECLARE
  t TEXT;
  r RECORD;
BEGIN
  t:='';
  t:=t||E'<?xml version="1.0"?>\n';
  t:=t||E'<backup creator="Brice">\n';
  t:=t||E'  <company >\n';
  -- Comptes comptables
  t:=t||E'    <rows reflection="accounts">\n';  
  FOR r IN SELECT * FROM table_comptegen WHERE so_numero=num_societe LOOP
  t:=t||E'      <row name="'||r.cg_libelle||E'" is_debit="'||b2s(r.cg_debit)||stamps(r)||E'">\n';
  END LOOP;
  t:=t||E'    </rows>\n';  

  t:=t||E'  <company>\n';
  t:=t||E'</backup>';  
  RETURN t;
END
$$ LANGUAGE 'plpgsql';

\t
\a
\timing
\o sacea.xml
SELECT gst2eky(1);
\o fdsea.xml
SELECT gst2eky(2);
\o aava.xml
SELECT gst2eky(3);
\o sci.xml
SELECT gst2eky(500000009);
\o
\timing
\a
\t


