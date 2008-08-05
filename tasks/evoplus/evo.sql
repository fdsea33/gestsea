-- CSV IMPORT
BEGIN;
COPY table_evoplus(
source,          -- source                            - a
numero,          -- numero
titre,           -- titre
nom,             -- nom/prenom
complement,      -- complement
ad1,             -- ad1
ad2,             -- ad2
ad3,             -- ad3
cp,              -- cp
ville,           -- ville
naissance,       -- né le
telephone,       -- tel
fax,             -- fax                               - m
portable,        -- portable
qualification,   -- qualif
base_ht,         -- forfait (qualif cout)
productions,     -- productions
fuel_m3,         -- fuel m3
eco_fuel,        -- eco fuel
eco_fuel_tipp,   -- eco fuel tipp
hectares_nb,     -- nb hectare
salaries_nb,     -- salaries nb
sacea_ttc,       -- abt conseil cout
h1_ha,           -- aocreg ha
h1_ht,           -- aocreg ht
h2_ha,           -- aoccom ha                         - z
h2_ht,           -- aoccom ht                         - aa
empty_ab,        -- 
h3_ha,           -- tclarbo ha
h3_ht,           -- tclarbo ht
empty_ae,        -- 
h4_ha,           -- cereales ha
h4_ht,           -- cereales ht
empty_ah,        --
h5_ha,           -- herbage ha
h5_ht,           -- herbage ht
empty_ak,        --
h6_ha,           -- maraich ha
h6_ht,           -- maraich ht
empty_an,        --
cm_nb,           -- cm nb                             - am
cm_ht,           -- cm ht
cm_noms,         -- cm noms
--,                         : Actif ! Non Actif ! SACEA ! lAAVA !   
opt1,            -- option1 :   X   !           !   X   !   X
opt2,            -- option2 :   X   OU    X     !       !   X
opt3,            -- option3 :   X   !           !   X   !
opt4,            -- option4 :   X   OU    X     !       !          
opt_num,         -- option retenu                **************
opt_ttc,         -- cout retenu
statut,          -- statut
remarque,        -- remarque
proposition  -- est une proposition
) FROM '/tmp/evo_clean.csv' CSV;



-- Temporaire
--UPDATE table_evoplus SET avec_aava='' WHERE lot IS NULL;

update table_evoplus set pe_numero=p.pe_numero from vue_personne p where p.pe_libelle ilike '%'||nom||'%' and p.pe_numero ilike numero||'%' and length(numero)<=6 and table_evoplus.pe_numero<1000000;

--UPDATE table_evoplus SET pe_numero=CASE WHEN numero::integer>=1000000 THEN numero::integer ELSE numero::integer+900000 END, 
UPDATE table_evoplus SET pe_numero=numero::integer,
h1_ha=to_num(h1_ha), h2_ha=to_num(h2_ha), h3_ha=to_num(h3_ha), h4_ha=to_num(h4_ha), h5_ha=to_num(h5_ha), h6_ha=to_num(h6_ha),
h1_ht=to_num(h1_ht), h2_ht=to_num(h2_ht), h3_ht=to_num(h3_ht), h4_ht=to_num(h4_ht), h5_ht=to_num(h5_ht), h6_ht=to_num(h6_ht), 
cm_ht=to_num(cm_ht), cm_nb=COALESCE(cm_nb::numeric,0)::float::text,
base_ht=to_num(base_ht), sacea_ttc=to_num(sacea_ttc), opt_ttc=to_num(opt_ttc),  opt1=to_num(opt1), opt2=to_num(opt2), opt3=to_num(opt3), opt4=to_num(opt4) WHERE lot IS NULL;

-- Temporaire
UPDATE table_evoplus SET opt_num=CASE WHEN opt_ttc=opt1 THEN 1 WHEN opt_ttc=opt2 THEN 2 WHEN opt_ttc=opt3 THEN 3 WHEN opt_ttc=opt4 THEN 4 END WHERE lot IS NULL AND opt_num IS NULL;

UPDATE table_evoplus SET aava=CASE WHEN opt_num=1 OR opt_num=2 OR opt3::float=0 OR opt4::float=0 THEN true ELSE false END WHERE lot IS NULL;


--DROP VIEW vue_evoplus;
\a
\f ;
\o /tmp/evoplus_reglements.csv
SELECT e.*, CASE WHEN cs_numero IS NOT NULL THEN 1 END AS cotisation_traitee, e.created_at::date AS date_livraison, r.created_at::date AS date_reglement, REPLACE(rg_montant::text,'.',',') AS montant_regle 
  FROM table_evoplus e left join table_cotisation c on (cs_annee=2008 and e.pe_numero IN (c.pe_numero,COALESCE(c.cs_societe,0))) LEFT JOIN table_reglement r on (rg_numero=bml_extract(c.cs_detail,'reglement.numero')::integer and e.created_at<c.created_at)
  WHERE (rg_numero is not null or proposition is false) order by e.id;
\o
\a

--

SELECT FC_evoplus_print(NULL);
COMMIT;

/*




CREATE OR REPLACE FUNCTION FC_evoplus_traite() RETURNS BOOLEAN AS
$$
DECLARE
  num_lot;
BEGIN
  SELECT max(lot)+1 FROM table_evoplus INTO num_lot;
  COPY table_evoplus_tmp FROM '/tmp/evo_a.csv' CSV;
  INSERT INTO table_evoplus(
lot,
pe_numero,
proposition,
SOURCE,
NUMERO,
TITRE,
NOM_PRENOM,
COMPLEMENT,
ADRESSE1,
ADRESSE2,
ADRESSE3,
CP,
VILLE,
NAISSANCE,
TEL,
FAX,
PORTABLE,
QUALIFICATION_ACTIVITE,
COUT_ACTIVITE,
PRODUCTIONS,
FUEL_M3,
ECO_fuel,
ECO_fuel_TIPP,
HECTARES_NB ,
SALARIES_PERMANENTS_NB,
SACEA_COUT,
AOCREG_HA,
AOCREG_COUT,
AOCCOM_HA,
AOCCOM_COUT,
TCLARBO_HA,
TCLARBO_COUT,
CEREALES_HA,
CEREALES_COUT,
HERBAGERES_HA,
HERBAGERES_COUT,
MARAICHAGE_M2,
MARAICHAGE_COUT,
CM_SUPP_NB,
CM_SUPP_COUT,
CM_SUPP_NOMS,
OPTION_1,
OPTION_2,
COUT_RETENU,
STATUT,
REMARQUES) SELECT
num_lot,
col_b,
false,
col_a,
col_b,
col_c,
col_d,
col_e,
col_f,
col_g,
col_h,
col_i,
col_j,
col_k,
col_l,
col_m,
col_n,
col_o,
col_p,
col_q,
col_r,  -- fuel m3
col_s,  -- eco fuel
col_t,  -- eco fuel tipp
col_u,  -- nb hectare
col_v,  -- salaries nb
col_w,  -- abt conseil cout
col_x,  -- aocreg ha
col_y,  -- aocreg ht
col_z,  -- aoccom ha
col_aa, -- aoccom ht
col_ac, -- tclarbo ha
col_ad, -- tclarbo ht
col_af, -- cereales ha
col_ag, -- cereales ht
col_ai, -- herbage ha
col_aj, -- herbage ht
col_al, -- maraich ha
col_am, -- maraich ht
col_ao, -- cm nb
col_ap, -- cm ht
col_aq, -- cm noms
col_ar, -- opt1
col_as, -- opt2
col_at, -- cout retenu
col_au, -- statut
col_av  -- remarque
FROM table_evoplus_tmp;

  DELETE FROM table_evoplus_tmp;
  RETURN true;
END;
$$ LANGUAGE 'plpgsql';

SELECT FC_evoplus_traite();




*/
