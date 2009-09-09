
-- Création de la fonction
CREATE OR REPLACE FUNCTION fc_print_lot(IN num_lot INTEGER, IN started_on DATE, IN stopped_on DATE) RETURNS BOOLEAN AS
$$
DECLARE
  f TEXT;
BEGIN
  SELECT fc_imprimelot(num_lot, 'facture', started_on, stopped_on) INTO f;
  PERFORM execution('mv '||SUBSTR(f,8)||' /tmp/LOT_'||num_lot::VARCHAR||'_'||to_char(started_on,'YYYYMMDD')||'_'||to_char(stopped_on,'YYYYMMDD')||'.pdf');
  RETURN true;
END;
$$ LANGUAGE 'plpgsql';


SELECT fc_print_lot(2, CURRENT_DATE, CURRENT_DATE);

