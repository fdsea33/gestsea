/*
CREATE OR REPLACE FUNCTION fc_create_cotis_lines() RETURNS BOOLEAN  AS
$$
DECLARE
  c record;
  ligne text;
  num integer;
BEGIN
  FOR c IN SELECT * FROM table_cotisation LOOP
    DELETE FROM table_lignecotisation WHERE cs_numero=c.cs_numero;
    num := 1;
    LOOP
      ligne:=split_part(c.cs_detail,E'\n',num);
      num:=num+1;
      EXIT WHEN ligne='';
      INSERT INTO table_lignecotisation(cs_numero,key,value) VALUES (c.cs_numero, LTRIM(split_part(ligne,':',1),'{'), RTRIM(split_part(ligne,':',2),'}'));
    END LOOP;
  END LOOP;
  RETURN 0;
END;
$$
LANGUAGE 'plpgsql';
*/



SELECT fc_create_cotisation_lines(cs_numero) FROM table_cotisation ORDER BY cs_numero;
