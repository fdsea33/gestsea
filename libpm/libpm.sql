
CREATE OR REPLACE FUNCTION execution(text)
  RETURNS int4 AS
'/var/lib/postgresql/addons/libpm/libpm.so','execution'
  LANGUAGE 'c' IMMUTABLE;

CREATE OR REPLACE FUNCTION writefile(text,text)
  RETURNS int4 AS
'/var/lib/postgresql/addons/libpm/libpm.so','writefile'
  LANGUAGE 'c' IMMUTABLE;
