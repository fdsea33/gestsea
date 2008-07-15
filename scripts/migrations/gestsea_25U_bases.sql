/*****************************************************************************
 * Fonctions de base                                                         *
 *****************************************************************************/

CREATE OR REPLACE FUNCTION strcat(IN s1 text, IN s2 text) RETURNS text AS $$ SELECT $1||$2 $$ LANGUAGE SQL IMMUTABLE;
-- CREATE OR REPLACE FUNCTION strcat(IN s1 text, IN s2 text) RETURNS text AS $$ SELECT COALESCE($1,'')||COALESCE($2,'') $$ LANGUAGE SQL IMMUTABLE;

-- DROP AGGREGATE concatenate (text);
CREATE AGGREGATE concatenate (
    sfunc = strcat,
    basetype = text,
    stype = text,
    initcond = ''
);





--===========================================================================--
-- Procedure permettant d'extraire une valeur d'un fichier au format BML(Brice Meta Language)
-- SELECT SUBSTRING('{saved:false.,}{tutu:456, SDSD' FROM '%{titi:#"_[^}]*#"}%' FOR '#');
-- les mots clé sont sous la forme [a-z0-9.]*[a-z0-9]+-

-- Fonctions BML (Brice Meta Language)

-- DROP FUNCTION bml_extract(TEXT, TEXT);
-- substring('{toto:asdflkslf}{titi:bsdfsfssd}{tutu:csdfsfd}' FROM '{tutu:(.[^}]*)}');

CREATE OR REPLACE FUNCTION bml_extract(IN detail TEXT, IN keyword TEXT) RETURNS TEXT AS
$$ SELECT substring($1 FROM '{'||TRIM(LOWER($2)||':(.[^}{]*)}')) $$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION bml_delete(IN detail TEXT, IN keyword TEXT) RETURNS TEXT AS
$$ SELECT REPLACE(regexp_replace($1,'{'||TRIM(LOWER($2))||':.[^}{]*}','','g'),E'\n\n',E'\n') $$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION bml_put(IN detail TEXT, IN keyword TEXT, IN val TEXT) RETURNS TEXT AS
$$ SELECT bml_delete($1,$2)||'{'||TRIM(LOWER(COALESCE($2,'unknown')))||':'||COALESCE($3,'')||E'}\n' $$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION bml_sort(IN detail0 TEXT) RETURNS TEXT AS
$$
DECLARE
	detail TEXT;
  bml TEXT[]; 
  tablename TEXT;
  sorted TEXT;
  i INTEGER;
BEGIN
	detail := detail0;
	LOOP
		IF NOT detail LIKE E'%\n\n%' THEN
			EXIT;
		END IF;
		SELECT REPLACE(detail, E'\n\n', E'\n') INTO detail;
	END LOOP;
  bml := string_to_array(TRIM(TRIM(TRIM(TRIM(detail,E'\n'),'}'),E'\n'),'{'),E'}\n{');
	IF array_upper(bml,1)>1 THEN
	  tablename :=  'bml_sort_'||MD5(current_timestamp||RANDOM());
  	EXECUTE 'CREATE TEMPORARY TABLE '||tablename||' (keyword TEXT, val TEXT);';
  	FOR i IN array_lower(bml,1)..array_upper(bml,1) LOOP
  	  EXECUTE 'INSERT INTO '||tablename||' VALUES ('''||SUBSTRING(bml[i] FROM '.[^:]*')||''','''||SUBSTR(SUBSTRING(bml[i] FROM ':.*'),2)||''');';
	  END LOOP;
  	EXECUTE E'SELECT concatenate(''{''||LOWER(TRIM(keyword))||'':''||val||E''}\\n'') FROM (SELECT * FROM '||tablename||' ORDER BY keyword) x;' INTO sorted;
	  EXECUTE 'DROP TABLE '||tablename||';';
	ELSE
		sorted := detail;
	END IF;
  RETURN sorted;
END; 
$$ LANGUAGE PLPGSQL VOLATILE;





/*****************************************************************************
 * Vues de base                                                              *
 *****************************************************************************/

--===========================================================================--
-- Permet de connaitre pour qui travaille la personne
--DROP VIEW vue_current_societe;
CREATE OR REPLACE VIEW vue_current_societe AS
  SELECT SE_Societe FROM table_Service, table_Employe 
  WHERE EM_Service=SE_Numero AND EM_Login=CURRENT_USER;

GRANT SELECT ON vue_current_societe TO PUBLIC;

--===========================================================================--
-- Permet de savoir qui est la personne qui est connecté
--DROP VIEW vue_current_agent;
CREATE OR REPLACE VIEW vue_current_agent AS
  SELECT table_employe.em_agent
     FROM table_employe
     WHERE table_employe.em_login::name = "current_user"();

GRANT SELECT ON vue_current_agent TO PUBLIC;

--===========================================================================--
-- Permet de savoir qui est l'employe qui est connecté
--DROP VIEW vue_current_employe;
CREATE OR REPLACE VIEW vue_current_employe AS
  SELECT table_employe.em_numero
     FROM table_employe
     WHERE table_employe.em_login::name = "current_user"();

GRANT SELECT ON vue_current_employe TO PUBLIC;


/*****************************************************************************
 * Fonctions de bases                                                        *
 *****************************************************************************/

--===========================================================================--
-- Renvoie le numéro de la société en cours
-- DROP FUNCTION current_societe();

CREATE OR REPLACE FUNCTION current_societe() RETURNS INTEGER AS
$$
DECLARE
  ret integer;
BEGIN
  SELECT SE_Societe FROM vue_current_societe INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Renvoie le numéro de l'agent en cours
--DROP FUNCTION current_agent();

CREATE OR REPLACE FUNCTION current_agent() RETURNS INTEGER AS
$$
DECLARE
  ret integer;
BEGIN
  SELECT EM_Agent FROM vue_current_agent INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Renvoie le numéro de l'employe en cours
-- DROP FUNCTION current_employe();

CREATE OR REPLACE FUNCTION current_employe() RETURNS INTEGER AS
$$
DECLARE
  ret integer;
BEGIN
  SELECT EM_Numero FROM vue_current_employe INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Calcul un mot de passe lisible sans (0OIl1)

CREATE OR REPLACE FUNCTION FC_Password(IN size INTEGER) RETURNS text AS
$$
DECLARE 
  pass text;
  i integer;
  chars CONSTANT char[64] = '{A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,m,n,o,p,q,r,s,t,u,v,w,x,y,z,2,3,4,5,6,7,8,9,2,3,4,5,6,7,8}';
BEGIN
  pass:='';
  FOR i IN 1..size LOOP
    pass:=pass||chars[(62*random()+1)::integer];
  END LOOP;
  RETURN pass;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;



--===========================================================================--
-- Calcule la premiere date utilisable d'un journal à partir d'un mois et
-- d'une année
-- DROP FUNCTION FC_MoisEnLettre(integer);

CREATE OR REPLACE FUNCTION FC_MoisEnLettre(integer) RETURNS text AS
$$
DECLARE
  mois ALIAS FOR $1;
  ret text;
BEGIN
  SELECT CASE
           WHEN mois=00 THEN 'Janvier'
           WHEN mois=01 THEN 'Février'
           WHEN mois=02 THEN 'Mars'
           WHEN mois=03 THEN 'Avril'
           WHEN mois=04 THEN 'Mai'
           WHEN mois=05 THEN 'Juin'
           WHEN mois=06 THEN 'Juillet'
           WHEN mois=07 THEN 'Août'
           WHEN mois=08 THEN 'Septembre'
           WHEN mois=09 THEN 'Octobre'
           WHEN mois=10 THEN 'Novembre'
           WHEN mois=11 THEN 'Décembre'
           ELSE 'Mois inconnu'
         END AS LeMois INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

--===========================================================================--
-- Calcule la premiere date utilisable d'un journal à partir d'un mois et
-- d'une année
-- DROP FUNCTION FC_MoisEnLettre(integer);

CREATE OR REPLACE FUNCTION FC_DateEnLettre(in jour date) RETURNS text AS
$$
DECLARE
  ret text;
BEGIN
  SELECT EXTRACT(DAY FROM jour)||' '||lower(fc_moisenlettre(EXTRACT(MONTH FROM jour)::integer-1))||' '||EXTRACT(YEAR FROM jour) INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Calcule une date de paiement en fonction de 4 paramètres
--   Date de départ
--   Nombre de jours à partir de la date de départ / Interval
--   Fin de mois
--   Nombre de jours supplémentaires / Interval
/*
CREATE OR REPLACE FUNCTION FC_Delai(IN done_on DATE, IN days INTEGER, IN end_of_month BOOLEAN, IN supp INTEGER) RETURNS DATE AS
$$
DECLARE
  paid_on DATE;
BEGIN
  SELECT done_on+(days||' days')::INTERVAL INTO paid_on;
  IF end_of_month THEN
    SELECT (TO_CHAR(paid_on+('1 month')::INTERVAL, 'YYYY-MM')||'-01')::DATE-('1 day')::INTERVAL INTO paid_on;
  END IF;
  SELECT paid_on+(supp||' days')::INTERVAL INTO paid_on;
  RETURN paid_on;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;

CREATE OR REPLACE FUNCTION FC_Delai(IN done_on DATE, IN days INTERVAL, IN end_of_month BOOLEAN, IN supp INTERVAL) RETURNS DATE AS
$$
DECLARE
  paid_on DATE;
BEGIN
  SELECT done_on+days INTO paid_on;
  IF end_of_month THEN
    SELECT (TO_CHAR(paid_on+('1 month')::INTERVAL, 'YYYY-MM')||'-01')::DATE-('1 day')::INTERVAL INTO paid_on;
  END IF;
  SELECT paid_on+supp INTO paid_on;
  RETURN paid_on;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;
*/
CREATE OR REPLACE FUNCTION FC_Delai(IN done_on DATE, IN delay VARCHAR) RETURNS DATE AS
$$
DECLARE
  paid_on DATE;
  i INTEGER;
  d VARCHAR;
BEGIN
  i := 1;
  paid_on := done_on;
  LOOP 
    SELECT LOWER(TRIM(SPLIT_PART(delay,',',i))) INTO d;
    EXIT WHEN d ILIKE '';
    IF d IN ('eom','end of month','fdm','fin de mois') THEN
      SELECT (TO_CHAR(paid_on+('1 month')::INTERVAL, 'YYYY-MM')||'-01')::DATE-('1 day')::INTERVAL INTO paid_on;
    ELSIF d ~ '^(\\d+\\s+(sec|second|min|minute|hour|day|week|month|year|decade|century|millennium)(s)?(\\sago)?(\\s+|$))+$' THEN
      SELECT paid_on+d::INTERVAL INTO paid_on;
    ELSE
      RAISE EXCEPTION 'L''expression ''%'' est invalide (délai : ''%'').', d, delay;
    END IF;
    i := i + 1;
  END LOOP;
  RETURN paid_on;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;




--===========================================================================--
-- Permet de réaliser un cast de boolean -> text
CREATE OR REPLACE FUNCTION FC_text(boolean) RETURNS text AS
$$ SELECT CASE WHEN $1 THEN 'true' ELSE 'false' END $$ LANGUAGE SQL IMMUTABLE;

CREATE CAST (boolean AS text) WITH FUNCTION FC_text(boolean);

-- Permet de réaliser un cast de text->boolean
CREATE OR REPLACE FUNCTION FC_booleen(text) RETURNS boolean AS
$$ SELECT CASE WHEN $1='false' THEN false ELSE true END $$ LANGUAGE SQL IMMUTABLE;

CREATE CAST (text AS boolean) WITH FUNCTION FC_booleen(text);


--===========================================================================--
-- Permet de voir les totaux calculé crédit/débit des journaux et pièces

CREATE OR REPLACE VIEW vue_totaux_piece AS
  SELECT pi_numero, sum(ec_credit) AS pi_credit, sum(ec_debit) AS pi_debit 
    FROM table_ecriture
    GROUP BY pi_numero;

CREATE OR REPLACE VIEW vue_totaux_journal AS
  SELECT jo_numero, sum(pi_credit) AS jo_credit, sum(pi_debit) AS jo_debit 
    FROM table_piece
    GROUP BY jo_numero;


--===========================================================================--
-- Permet de voir les journaux à router
-- DROP VIEW current_routage;

CREATE OR REPLACE VIEW vue_current_routage AS 
  SELECT DISTINCT RO_Numero AS cle, CS_Valeur AS RC_Numero, p.PE_Numero AS RC_NCLI, PE_Titre AS RC_TITR, COALESCE(PE_Nom||' ','')||COALESCE(PE_Prenom,'') AS RC_NOMP, AD_Ligne2 AS RC_CIDE, AD_Ligne3 AS RC_AD1, AD_Ligne4 AS RC_AD2, AD_Ligne5 AS RC_AD3, CP_Codepostal AS RC_CPOS, VI_Nom AS RC_BURD, RO_Quantite AS RC_NBEX
  FROM table_Constante, table_Routage JOIN table_Personne p USING (PE_Numero) 
                                      JOIN table_Adresse USING (AD_Numero) 
                                      JOIN table_Codepostal USING (CP_Numero) 
                                      JOIN table_Ville USING (VI_Numero)
  WHERE CS_Valeur::integer BETWEEN RO_DebutService AND RO_FinService AND CS_Nom='CURRENT_NUMBER'
  ORDER BY RC_CPOS, RC_BURD, RC_NOMP;
	
GRANT SELECT ON vue_current_routage TO PUBLIC;


--===========================================================================--
-- Permet de voir les abonnes a relancer

-- DROP VIEW current_relance;
CREATE OR REPLACE VIEW vue_current_relance AS 
  SELECT DISTINCT ro_numero AS cle, 
         ro_finservice AS RL_DernierNumero, 
         ro_finservice::INTEGER-present.cs_valeur::INTEGER AS RL_Niveau, 
         table_routage.pe_numero, pe_titre, pe_nom, pe_prenom, 
         ad_ligne2, ad_ligne3, ad_ligne4, ad_ligne5, cp_codepostal, vi_nom, telephone.cn_coordonnee AS rl_telephone, portable.cn_coordonnee AS rl_portable
    FROM table_Constante AS passe,
         table_Constante AS present,
         table_Constante AS futur,
         table_Routage LEFT JOIN table_Personne USING (PE_Numero) 
           LEFT JOIN table_Adresse USING (PE_Numero) 
           LEFT JOIN table_Facture USING (FA_Numero)
           LEFT JOIN table_Avoir USING (FA_Numero)
           LEFT JOIN table_LigneFacture USING (FA_Numero)
           LEFT JOIN table_Codepostal USING (CP_Numero) 
           LEFT JOIN table_Ville USING (VI_Numero)
           LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact WHERE cn_actif AND ck_numero=107) AS telephone ON (table_Personne.pe_numero=telephone.pe_numero)
           LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact WHERE cn_actif AND ck_numero=106) AS portable ON (table_Personne.pe_numero=portable.pe_numero)
    WHERE NOT RO_Suspendu
      AND passe.cs_nom='PAST_NUMBER' AND futur.cs_nom='FUTURE_NUMBER' AND present.cs_nom='CURRENT_NUMBER' 
      AND present.cs_valeur::integer+futur.cs_valeur::integer>=ro_finservice AND ro_finservice>=present.cs_valeur::integer-passe.cs_valeur::integer 
      AND NOT ro_numero IN (SELECT ro_numero FROM (SELECT r.ro_numero, count(s) as total from table_routage as r left join table_routage as s using (pe_numero) where s.ro_finservice>r.ro_finservice group by r.ro_numero) as suivants WHERE total>=1)
      AND AD_Active
      AND pd_numero IN (500000094,500000098,500000099)
      AND AV_Numero IS NULL;


GRANT SELECT ON vue_current_relance TO PUBLIC;





--===========================================================================--
-- Permet de voir les adhérent FDSEA qui ne recoivent pas le journal

CREATE OR REPLACE VIEW vue_current_relance_adherent AS 
  SELECT DISTINCT ON (p.PE_Numero) p.pe_numero AS cle, p.pe_numero, p.pe_titre, p.pe_nom, p.pe_prenom, 
ad_ligne2, ad_ligne3, ad_ligne4, ad_ligne5, cp_codepostal, vi_nom, 
telephone.cn_coordonnee AS rl_telephone, portable.cn_coordonnee AS rl_portable
  FROM table_cotisation join table_Personne p USING (PE_Numero)
        left join table_personne s on (COALESCE(cs_societe,0)=s.pe_numero)
             JOIN table_Adresse a on (a.pe_numero=p.pe_Numero) 
             JOIN table_Codepostal USING (CP_Numero) 
             JOIN table_Ville USING (VI_Numero)
           LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact WHERE cn_actif AND ck_numero=107) AS telephone ON (p.pe_numero=telephone.pe_numero)
           LEFT JOIN (SELECT pe_numero, cn_coordonnee FROM table_contact WHERE cn_actif AND ck_numero=106) AS portable ON (p.pe_numero=portable.pe_numero)
  WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE) AND BML_EXTRACT(CS_DETAIL, 'cotisation.type')!='ja'
/*
    AND p.PE_Numero NOT IN (SELECT pe_numero FROM table_lignefacture JOIN table_facture USING (fa_numero) WHERE pd_numero-500000000 IN (96,109,125,94,100) AND fa_date>=('01/01/'||EXTRACT(YEAR FROM CURRENT_DATE))::date)
    AND s.PE_Numero NOT IN (SELECT pe_numero FROM table_lignefacture JOIN table_facture USING (fa_numero) WHERE pd_numero-500000000 IN (96,109,125,94,100) AND fa_date>=('01/01/'||EXTRACT(YEAR FROM CURRENT_DATE))::date)
*/
    AND p.pe_numero NOT IN (select rc_ncli FROM vue_current_routage)
    AND s.pe_numero NOT IN (select rc_ncli FROM vue_current_routage)
    AND ad_active;
	
GRANT SELECT ON vue_current_relance_adherent TO PUBLIC;





--===========================================================================--
-- Renvoie le numéro de la dernière période en cours pour une date donnée
-- et une
--DROP FUNCTION FC_DernierePeriode();

CREATE OR REPLACE FUNCTION FC_DernierePeriode(LA_Date date, LA_Adherence integer) RETURNS integer AS
$$
DECLARE
  ret integer;
BEGIN
  SELECT PO_Numero FROM PeriodeAdherence JOIN Periode USING (po_numero) WHERE PO_Debut<=LA_Date AND LA_Date<=PO_Fin AND AH_Numero=LA_Adherence ORDER BY PO_Fin DESC INTO ret;
  RETURN ret;
END;
$$ LANGUAGE 'plpgsql' VOLATILE;


--===========================================================================--
-- Permet de voir les abonnes
--DROP VIEW VUE_Adhesion;
/*
CREATE OR REPLACE VIEW VUE_Adhesion AS
  SELECT ah_reduction, CASE WHEN el_personne1 IS NULL OR el_personne2 IS NULL THEN pe_numero WHEN el_personne1=pe_numero THEN el_personne2 ELSE el_personne1 END AS pe_numero, po_numero, ah_numero, fa_numero, lf_numero, pe_numero AS as_origine
    FROM table_lignefacture JOIN table_facture USING (fa_numero)
      JOIN table_adherence ah USING (pd_numero)
      LEFT JOIN table_periodeadherence USING (AH_Numero)
      LEFT JOIN table_periode USING(PO_Numero)
      LEFT JOIN table_estlie el ON (ah.tl_numero=el.tl_numero AND ah.tl_numero IS NOT NULL AND AH_Cascade AND ((AH_LienDirect AND el_personne2=pe_numero) OR (AH_LienIndirect AND el_personne1=pe_numero)))
     WHERE fa_numero NOT IN (SELECT fa_numero FROM table_avoir WHERE fa_numero is not null)
       AND FA_Date BETWEEN PO_Debut AND PO_Fin;
*/
/*
    FROM table_facture LEFT JOIN table_avoir USING (FA_Numero)
                       LEFT JOIN table_lignefacture USING (FA_Numero)
                       LEFT JOIN table_adherence USING (PD_Numero)
                       LEFT JOIN table_periodeadherence USING (AH_Numero)
                       LEFT JOIN table_periode USING (PO_Numero)
    WHERE av_numero IS NULL AND AH_Numero IS NOT NULL AND PO_Numero=FC_DernierePeriode(FA_Date, AH_Numero);--PO_Debut<=FA_Date AND FA_Date<=PO_Fin;
*/

--DROP VIEW vue_adhesion;


/*
CREATE OR REPLACE VIEW vue_adhesion AS
  SELECT *
    FROM table_lignefacture JOIN table_facture USING(FA_Numero)
                            JOIN table_adherence USING (pd_numero);
*/


CREATE OR REPLACE VIEW vue_adhesion AS
  SELECT cs_numero, cs_annee, pe_numero AS cs_personne, NULLIF(NULLIF(bml_extract(cs_detail,'cotisation.societe'),'null'),0) AS cs_societe, ah_reduction, ah_libelle 
    FROM table_lignefacture JOIN table_cotisation ON (fa_numero=bml_extract(cs_detail,'sacea.facture')) 
                            JOIN table_adherence USING (pd_numero);

CREATE OR REPLACE VIEW vue_adhesion_all AS
  SELECT cs_numero, cs_annee, pe_numero, ah_reduction, ah_libelle FROM table_cotisation join table_adherence on (bml_extract(cs_detail,'fdsea.forfait.produit')=pd_numero)
  UNION ALL
  SELECT cs_numero, cs_annee, p.pe_numero, ah_reduction, ah_libelle FROM table_cotisation join table_adherence on (bml_extract(cs_detail,'fdsea.forfait.produit')=pd_numero) join table_personne p on (bml_extract(cs_detail,'cotisation.societe')=p.pe_numero);


/*
CREATE OR REPLACE VIEW vue_ad2 AS
  SELECT cs_numero, cs_annee, pe_numero, ah_reduction FROM table_lignefacture JOIN table_cotisation ON (fa_numero=bml_extract(cs_detail,'sacea.facture')) JOIN table_adherence USING (pd_numero)
  UNION ALL
  SELECT cs_numero, cs_annee, bml_extract(cs_detail,'cotisation.societe')::integer AS pe_numero, ah_reduction FROM table_lignefacture JOIN table_cotisation ON (fa_numero=bml_extract(cs_detail,'sacea.facture')) JOIN table_adherence USING (pd_numero) WHERE  bml_extract(cs_detail,'cotisation.societe')!='null';
*/
--===========================================================================--
--

--DROP VIEW VUe_Cotisation_All;

CREATE OR REPLACE VIEW VUE_Cotisation_All AS
  SELECT cs_numero, cs_annee, pe_numero, cs_detail, cs_montant FROM table_cotisation
  UNION ALL
  SELECT cs_numero, cs_annee, cs_societe AS pe_numero, cs_detail, cs_montant FROM table_cotisation WHERE cs_societe IS NOT NULL;

--DROP VIEW VUe_Cotisation;

CREATE OR REPLACE VIEW VUE_Cotisation AS
SELECT cs_numero AS cle, cs_annee, pe_numero, cs_detail, CASE WHEN bml_extract(cs_detail,'sacea')='true' THEN 'A+' ELSE '' END AS cs_type, bml_extract(cs_detail,'fdsea.montant')||' €' as cs_fdsea, CASE WHEN bml_extract(cs_detail,'sacea.produit')='500000036' THEN '0-5 s.' WHEN bml_extract(cs_detail,'sacea.produit')='500000065' THEN '6-10 s.' WHEN bml_extract(cs_detail,'sacea.produit')='500000069' THEN '11+ s.' ELSE '' END as cs_sacea, COALESCE(bml_extract(cs_detail,'aava.quantite')::float::text||' ex.','') as cs_aava, cs_montant||' €' as cs_total
  FROM vue_cotisation_all c;



CREATE OR REPLACE VIEW vue_personne AS 
  SELECT DISTINCT ON (pe_numero) table_personne.*, TRIM(COALESCE(PE_Titre||' ','')|| COALESCE(PE_Nom,'')|| COALESCE(' '||PE_Prenom,'')) AS PE_Libelle, COALESCE(PE_Nom||' ','')|| COALESCE(PE_Prenom,'')||COALESCE(' ('||NULLIF(TRIM(PE_Titre),'')||')','') AS PE_Fullname, to_char(PE_ID,'FM099999') AS PE_NumPersonne, Tel.CN_Coordonnee AS PE_telephone, Fax.CN_Coordonnee AS PE_Fax, Port.CN_Coordonnee AS PE_Portable, CT_Nom, COALESCE(PE_Titre,'')||';'|| COALESCE(PE_Nom,'')||';'|| COALESCE(PE_Prenom,'')||';'||COALESCE(AD_Ligne2,'')||';'|| COALESCE(Ad_Ligne3,'')||';'|| COALESCE(Ad_Ligne4,'')||';'|| COALESCE(Ad_Ligne5,'')||';'|| CP_CodePostal||';'|| VI_Nom AS PE_Adresse, VI_Nom AS PE_Ville, CP_CodePostal AS PE_CP, CT_Nom AS PE_Canton, to_char(PE_ID,'FM099999')||' - '||TRIM(COALESCE(PE_Titre||' ','')|| COALESCE(PE_Nom,'')|| COALESCE(' '||PE_Prenom,''))||' ('||COALESCE(CP_CodePostal,'?')||' '||COALESCE(vi_nom,'???')||')' AS PE_Description
 ,table_personne.pe_numero AS cle
    FROM table_personne LEFT JOIN table_Adresse AS a ON (a.PE_Numero=table_Personne.PE_Numero AND AD_Active IS NOT False) LEFT JOIN table_Codepostal USING (CP_Numero) LEFT JOIN table_Ville USING (VI_Numero) LEFT JOIN table_Canton USING (CT_Numero) LEFT JOIN table_Contact AS Tel ON (Tel.PE_Numero=table_Personne.PE_Numero AND Tel.CN_Actif IS NOT false AND Tel.CK_Numero=107) LEFT JOIN table_Contact AS Fax  ON (Fax.PE_Numero=table_Personne.PE_Numero AND Fax.CN_Actif IS NOT false AND Fax.CK_Numero=105) LEFT JOIN table_Contact AS Port  ON (Port.PE_Numero=table_Personne.PE_Numero AND Port.CN_Actif IS NOT false AND Port.CK_Numero=106);




--===========================================================================--
--


CREATE OR REPLACE VIEW vue_evoplus AS 
  SELECT ev.*, pe_id, pe_libelle, CURRENT_DATE AS ev_date, COALESCE(ad1||' -- ','')||COALESCE(ad2||' -- ','')||COALESCE(ad3||' -- ','')||cp||' '||ville AS adline, 
(CASE WHEN NOT proposition AND (opt_num=2 OR opt_num=4) THEN 0.00 ELSE sacea_ttc::numeric END)::numeric(16,2) AS op1_sacea, 
0.00::numeric AS op2_sacea, 
(CASE WHEN ((NOT proposition AND (opt_num=1 OR opt_num=2)) OR (proposition AND aava)) THEN 31.00 ELSE 0.00 END)::numeric(16,2) AS op1_aava, 
(CASE WHEN aava THEN 31.00 ELSE 0.00 END)::numeric(16,2) AS op2_aava, 
(CASE WHEN NOT proposition THEN opt_ttc WHEN proposition AND aava THEN opt1 ELSE opt3 END)::numeric(16,2) AS op1_total, 
(CASE WHEN aava THEN opt2 ELSE opt4 END)::numeric(16,2) AS op2_total,
CASE WHEN pe_numero IN (SELECT pe_numero FROM vue_cotisation_all WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)) THEN 'DEJA ADH!' WHEN proposition THEN 'P' ELSE 'A' END||' / '||statut AS nature
    FROM table_evoplus ev join vue_personne USING (pe_numero);



--===========================================================================--
--
--DROP VIEW VUE_facture_A_Regler;
CREATE OR REPLACE VIEW VUE_facture_A_Regler AS 
SELECT fa.fa_numero AS cle, fa.fa_numero, fa.fa_numfact, fa.pe_numero, fa.fa_date, fc_dateenlettre(fa.fa_date) AS fa_datel, CASE WHEN current_date>fc_delai(fa.fa_date,COALESCE(r3.cs_valeur,'30 days, eom, 2 months')) THEN 3 WHEN current_date>fc_delai(fa.fa_date,COALESCE(r2.cs_valeur, '30 days, eom, 1 month')) THEN 2 WHEN current_date>fc_delai(fa.fa_date,COALESCE(r1.cs_valeur,'30 days, eom')) THEN 1 ELSE 0 END AS fa_niveau, fa_montantttc, COALESCE(fa_regle,0.00) AS fa_regle, fa_montantttc-COALESCE(fa_regle,0.00) AS fa_reste , CASE WHEN fa_next_reflation_on>CURRENT_DATE THEN fa_next_reflation_on::TEXT ELSE '-' END AS fa_relance, fa_next_reflation_on, de_date, fa_penalty
FROM table_facture fa JOIN table_devis USING (de_numero) LEFT JOIN ( SELECT fa_numero, sum(fr_montant) as fa_regle FROM table_facturereglement GROUP BY 1) fr USING (fa_numero) left join table_avoir using (fa_numero) LEFT JOIN table_constante r1 ON (r1.cs_nom='FIRST_REFLATION') LEFT JOIN table_constante r2 ON (r1.cs_nom='SECOND_REFLATION') LEFT JOIN table_constante r3 ON (r1.cs_nom='THIRD_REFLATION')
WHERE abs(COALESCE(fa_regle,0)-fa_montantttc)>0 and fa_date>='1/1/2006' and not fa_perte and av_numero is null and fa.SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);


--DROP VIEW VUE_Reglement_A_Facturer;
CREATE OR REPLACE VIEW VUE_Reglement_A_Facturer AS 
SELECT rg.rg_numero AS cle, rg.*, COALESCE(rg_facture,0.00) AS rg_facture, rg_montant-COALESCE(rg_facture,0) as rg_reste
FROM table_reglement rg LEFT JOIN ( SELECT rg_numero, sum(fr_montant) as rg_facture FROM table_facturereglement GROUP BY 1) fr USING (rg_numero) 
WHERE abs(rg_montant-COALESCE(rg_facture,0))>0 and SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);



--DROP VIEW VUE_Devis_A_Facturer;
CREATE OR REPLACE VIEW VUE_Devis_A_Facturer AS 
SELECT de_numero AS cle, de.*
FROM table_devis de 
WHERE NOT de_locked and SO_Numero IN (SELECT SE_Societe FROM VUE_CURRENT_Societe);





