
CREATE OR REPLACE FUNCTION fc_avoir() RETURNS INTEGER AS 
$$
DECLARE
  total INTEGER;
  ret integer;
  f record;
BEGIN
  UPDATE missing_numfact SET avoir_facture = NULL;
  FOR f IN SELECT * FROM missing_numfact ORDER BY id LOOP
    ret := NULL;
    select count(id)
      from missing_numfact 
      where avoir_facture is null -- n'a pas d'avoir
        and id not in (select avoir_facture from missing_numfact where avoir_facture is not null) -- n'est pas un avoir
        and fa_date BETWEEN f.fa_date-'10 days'::interval AND fa_date
        AND id < f.id
      INTO total;
    IF total>0 THEN
      select id 
        from missing_numfact 
      where avoir_facture is null -- n'a pas d'avoir
        and id not in (select avoir_facture from missing_numfact where avoir_facture is not null) -- n'est pas un avoir
        and fa_date BETWEEN f.fa_date-'10 days'::interval AND fa_date
        AND id < f.id
        OFFSET round(total*random())
      INTO ret;
    END IF;
    IF random()>0.80 THEN
      ret := NULL;
    END IF;
    UPDATE missing_numfact SET avoir_facture = ret WHERE id = f.id;
  END LOOP;
  SELECT count(*) from missing_numfact where avoir_facture is not null INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql';



CREATE OR REPLACE FUNCTION fc_lignes(IN num_facture INTEGER) RETURNS INTEGER AS 
$$
DECLARE
  total INTEGER;
  qte INTEGER;
  num_orig INTEGER;
  i INTEGER;
  nb INTEGER;
  ret integer;
  f record;
  prix record;
  made_on date;
BEGIN
  SELECT *, (fa_numero NOT IN (SELECT fa_avoir_facture FROM table_facture WHERE fa_avoir))::boolean AS fa_free, (fa_numero IN (SELECT fa_numero FROM table_lignefacture))::boolean AS fa_full from table_facture WHERE fa_numero=num_facture INTO f;

  IF f.fa_avoir AND NOT f.fa_full THEN -- Produits dans les 2

    RAISE NOTICE '>> Double %', num_facture;
    num_orig := f.fa_avoir_facture; -- Ce n'est pas vraiment ça mais c'est optimisé
    SELECT fa_date FROM table_facture WHERE fa_numero=num_orig INTO made_on;
    SELECT round(3*random()+1) INTO nb;
    FOR i IN 1..nb LOOP
      SELECT count(*) FROM table_prix left join table_produit using (pd_numero) where so_numero=1 AND made_on between px_datedebut and COALESCE(px_datefin,'31/12/3000') AND px_tarifht<500 INTO total;
      IF total<=0 THEN
        RAISE EXCEPTION 'Not enought prices in % for %', made_on, num_facture;
      END IF;
      SELECT * FROM table_prix left join table_produit using (pd_numero) where so_numero=1 AND made_on between px_datedebut and COALESCE(px_datefin,'31/12/3000') AND px_tarifht<500 OFFSET round(total*random()) INTO prix;
      SELECT CASE WHEN prix.px_tarifttc>200 THEN 1 ELSE round(3*random()+1) END INTO qte;
      INSERT INTO table_lignefacture(fa_numero, pd_numero, px_numero, lf_quantite, lf_montantht, lf_montantttc)
        VALUES (num_facture, prix.pd_numero, prix.px_numero, -qte, -qte*prix.px_tarifht, -qte*prix.px_tarifttc);
      INSERT INTO table_lignefacture(fa_numero, pd_numero, px_numero, lf_quantite, lf_montantht, lf_montantttc)
        VALUES (num_orig, prix.pd_numero, prix.px_numero, qte, qte*prix.px_tarifht, qte*prix.px_tarifttc);
    END LOOP;
    UPDATE table_facture SET fa_montantht=ht, fa_montantttc=ttc FROM (SELECT fa_numero AS numf, sum(lf_montantht) AS ht, sum(lf_montantttc) AS ttc FROM table_lignefacture GROUP BY 1) AS x WHERE numf=fa_numero AND fa_numero IN (num_facture,num_orig);
    ret := nb;

  ELSIF f.fa_free AND NOT f.fa_full THEN -- Produits à 0 seulement !

    RAISE NOTICE '>> Simple %', num_facture;
    made_on := f.fa_date;
    SELECT round(1*random()+1) INTO nb;
    FOR i IN 1..nb LOOP
      SELECT count(*) FROM table_prix left join table_produit using (pd_numero) where so_numero=1 AND made_on between px_datedebut and COALESCE(px_datefin,'31/12/3000') AND px_tarifttc=0 INTO total;
      IF total<=0 THEN
        RAISE EXCEPTION 'Not enought prices in % for %', made_on, num_facture;
      END IF;
      SELECT * FROM table_prix left join table_produit using (pd_numero) where so_numero=1 AND made_on between px_datedebut and COALESCE(px_datefin,'31/12/3000') AND px_tarifttc=0 OFFSET round(total*random()) INTO prix;
      SELECT round(10*random()+1) INTO qte;
      INSERT INTO table_lignefacture(fa_numero, pd_numero, px_numero, lf_quantite, lf_montantht, lf_montantttc)
        VALUES (num_facture, prix.pd_numero, prix.px_numero, qte, qte*prix.px_tarifht, qte*prix.px_tarifttc);
    END LOOP;
    UPDATE table_facture SET fa_montantht=COALESCE(ht,0), fa_montantttc=COALESCE(ttc,0) FROM (SELECT fa_numero AS numf, sum(lf_montantht) AS ht, sum(lf_montantttc) AS ttc FROM table_lignefacture GROUP BY 1) AS x WHERE numf=fa_numero AND fa_numero = num_facture;
    ret := nb;

  ELSE 

    RAISE NOTICE 'Rien à faire pour la facture %', num_facture;
    ret := -1;

  END IF;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql';

-- Création de la fonction d'impression
SELECT fc_print_build(im_modele, 'pi_fs', '/tmp/fs', 'fa_numfact||to_char(fa_date,''_YYYYMMDD_'')||CASE WHEN fa_avoir THEN ''A'' ELSE ''F'' END FROM table_facture WHERE fa_numero=pkey', 'latex') from table_impression where im_numero=500000072;

-- Factures manquantes
SELECT count(*) from fc_sequence(2005003025, 2005010174) AS n where n not in (SELECT fa_numfact from table_facture where fa_date between '01/01/2006' AND '31/12/2007' AND so_numero=1) AND n not in (SELECT n from missing_numfact);
-- Factures en trop
SELECT fa_numfact from table_facture where fa_date between '01/01/2006' AND '31/12/2007' AND so_numero=1 and fa_numfact not in (SELECT * from fc_sequence(2005003025, 2005010174) AS n);

/*
SELECT fc_avoir();

UPDATE missing_numfact SET fa_avoir_facture=NULL;

UPDATE missing_numfact SET 
so_numero = 1,
fa_avoir = avoir_facture IS NOT NULL,
fa_numero = nextval('seq_facture'),
ag_numero = (ARRAY[12,12,11,10]::int[])[round(3*random())+1], 
pe_numero = 1000000+(ARRAY[1935,9076,9076,8772,577,1292,7051,1966]::int[])[round(7*random())+1], 
label=CASE WHEN random()>0.6 THEN 'TEST' WHEN random()>0.4 THEN 'Test' ELSE 'Essai' END||' '||CASE WHEN random()>0.6 THEN 'fac' WHEN random()>0.4 THEN 'FACTURE' WHEN random()>0.4 THEN 'Facture' ELSE '' END||CASE WHEN random()>0.5 THEN ' '||round(id/2.2)+1 ELSE '' END||CASE WHEN avoir_facture IS NOT NULL AND random()>0.7 THEN ' + AV' ELSE '' END;
UPDATE missing_numfact SET pe_numero = f.pe_numero, ag_numero=f.ag_numero, label=f.label, fa_avoir_facture=f.fa_numero FROM missing_numfact f WHERE f.id=COALESCE(missing_numfact.avoir_facture,0);


SELECT * from missing_numfact WHERE avoir_facture is not null AND id in (select avoir_facture from missing_numfact where  avoir_facture is not null);

*/