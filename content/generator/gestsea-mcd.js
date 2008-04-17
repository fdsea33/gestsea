/* Constantes de types */
const TYPE_UNKNOWN       = -1;
const TYPE_UNDEFINED     = 0;
const TYPE_STRING        = 1;
const TYPE_INT           = 2;
const TYPE_FLOAT         = 3;
const TYPE_DECIMAL       = 4;
const TYPE_DATE	         = 5;
const TYPE_TIME          = 6;
const TYPE_DATETIME      = 7;
const TYPE_BOOL          = 8;
const TYPE_GEOMETRY      = 9;

/*
Les fonctions renvoient des chaines avec Majuscules

function mcd_getType(table,champs);
function mcd_obligatoire(table,champs);
function mcd_getTables();
function mcd_getTablesLabel();
function mcd_getChampsLogique(table);
function mcd_getChampsLabel(table);
function mcd_getMinChampsLogique(table);
function mcd_getMinChampsLabel(table);
function mcd_getLiens();
function mcd_getTablesCouleur();
function mcd_getTablesNote();
*/

/* Renvoie le type d'un attribut */
function mcd_getType(table,champs)
{
  var type;
  switch(table.toLowerCase()){
    case 'table_acces':
    case 'acces':
      switch(champs.toLowerCase()){
        case 'ac_numero': type=TYPE_INT;break;
        case 'ac_libelle': type=TYPE_STRING;break;
        case 'ac_niveau': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_activite':
    case 'activite':
      switch(champs.toLowerCase()){
        case 'za_numero': type=TYPE_INT;break;
        case 'za_heuredebut': type=TYPE_UNKNOWN;break;
        case 'za_heurefin': type=TYPE_UNKNOWN;break;
        case 'za_date': type=TYPE_DATE;break;
        case 'za_duree': type=TYPE_INT;break;
        case 'em_numero': type=TYPE_INT;break;
        case 'zt_numero': type=TYPE_INT;break;
        case 'zs_numero': type=TYPE_INT;break;
        case 'zl_numero': type=TYPE_INT;break;
        case 'za_pour': type=TYPE_STRING;break;
        case 'za_qui': type=TYPE_INT;break;
        case 'za_champ': type=TYPE_STRING;break;
        case 'fa_numero': type=TYPE_INT;break;
        case 'de_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'zg_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_adherence':
    case 'adherence':
      switch(champs.toLowerCase()){
        case 'ah_numero': type=TYPE_INT;break;
        case 'pd_numero': type=TYPE_INT;break;
        case 'ah_libelle': type=TYPE_STRING;break;
        case 'ah_reduction': type=TYPE_FLOAT;break;
        case 'ah_cascade': type=TYPE_BOOL;break;
        case 'tl_numero': type=TYPE_INT;break;
        case 'ah_liendirect': type=TYPE_BOOL;break;
        case 'ah_lienindirect': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_adhesion':
    case 'adhesion':
      switch(champs.toLowerCase()){
        case 'as_numero': type=TYPE_INT;break;
        case 'as_reductionmax': type=TYPE_FLOAT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'po_numero': type=TYPE_INT;break;
        case 'ah_numero': type=TYPE_INT;break;
        case 'fa_numero': type=TYPE_INT;break;
        case 'lf_numero': type=TYPE_INT;break;
        case 'as_origine': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_adresse':
    case 'adresse':
      switch(champs.toLowerCase()){
        case 'ad_numero': type=TYPE_INT;break;
        case 'ak_numero': type=TYPE_INT;break;
        case 'cp_numero': type=TYPE_INT;break;
        case 'vi_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'ad_active': type=TYPE_BOOL;break;
        case 'ad_ligne2': type=TYPE_STRING;break;
        case 'ad_ligne3': type=TYPE_STRING;break;
        case 'ad_ligne4': type=TYPE_STRING;break;
        case 'ad_ligne5': type=TYPE_STRING;break;
        case 'ad_datestop': type=TYPE_DATE;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_adresseversion':
    case 'adresseversion':
      switch(champs.toLowerCase()){
        case 'aw_numero': type=TYPE_INT;break;
        case 'ad_numero': type=TYPE_INT;break;
        case 'ak_numero': type=TYPE_INT;break;
        case 'cp_numero': type=TYPE_INT;break;
        case 'vi_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'aw_ligne2': type=TYPE_STRING;break;
        case 'aw_ligne3': type=TYPE_STRING;break;
        case 'aw_ligne4': type=TYPE_STRING;break;
        case 'aw_ligne5': type=TYPE_STRING;break;
        case 'version': type=TYPE_INT;break;
        case 'operation': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_agent':
    case 'agent':
      switch(champs.toLowerCase()){
        case 'ag_numero': type=TYPE_INT;break;
        case 'ag_nom': type=TYPE_STRING;break;
        case 'ag_prenom': type=TYPE_STRING;break;
        case 'ag_initiales': type=TYPE_STRING;break;
        case 'ag_actif': type=TYPE_BOOL;break;
        case 'eq_numero': type=TYPE_INT;break;
        case 'ag_role': type=TYPE_STRING;break;
        case 'ag_telephone': type=TYPE_STRING;break;
        case 'ag_mobile': type=TYPE_STRING;break;
        case 'ag_email': type=TYPE_STRING;break;
        case 'ag_commentaire': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_appartienta':
    case 'appartienta':
      switch(champs.toLowerCase()){
        case 'ct_numero': type=TYPE_INT;break;
        case 'gc_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_appel':
    case 'appel':
      switch(champs.toLowerCase()){
        case 'ap_numero': type=TYPE_INT;break;
        case 'ap_libelle': type=TYPE_STRING;break;
        case 'th_numero': type=TYPE_INT;break;
        case 'ap_date': type=TYPE_DATE;break;
        case 'ap_description': type=TYPE_STRING;break;
        case 'ap_duree': type=TYPE_FLOAT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_attribut':
    case 'attribut':
      switch(champs.toLowerCase()){
        case 'at_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'ta_numero': type=TYPE_INT;break;
        case 'cr_numero': type=TYPE_INT;break;
        case 'at_valeur': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_avoir':
    case 'avoir':
      switch(champs.toLowerCase()){
        case 'av_numero': type=TYPE_INT;break;
        case 'fa_numero': type=TYPE_INT;break;
        case 'av_numfact': type=TYPE_INT;break;
        case 'av_date': type=TYPE_DATE;break;
        case 'av_montantht': type=TYPE_FLOAT;break;
        case 'av_montantttc': type=TYPE_FLOAT;break;
        case 'av_reduction': type=TYPE_FLOAT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_canton':
    case 'canton':
      switch(champs.toLowerCase()){
        case 'ct_numero': type=TYPE_INT;break;
        case 'ct_nom': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_categorie':
    case 'categorie':
      switch(champs.toLowerCase()){
        case 'cr_numero': type=TYPE_INT;break;
        case 'cr_libelle': type=TYPE_STRING;break;
        case 'ta_numero': type=TYPE_INT;break;
        case 'cr_description': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_codepostal':
    case 'codepostal':
      switch(champs.toLowerCase()){
        case 'cp_numero': type=TYPE_INT;break;
        case 'cp_codepostal': type=TYPE_STRING;break;
        case 'cp_bureau': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_compteaux':
    case 'compteaux':
      switch(champs.toLowerCase()){
        case 'ca_numero': type=TYPE_INT;break;
        case 'cg_numero': type=TYPE_INT;break;
        case 'ca_numcompte': type=TYPE_STRING;break;
        case 'ca_libelle': type=TYPE_STRING;break;
        case 'ac_numero': type=TYPE_INT;break;
        case 'ca_debit': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_comptegen':
    case 'comptegen':
      switch(champs.toLowerCase()){
        case 'cg_numero': type=TYPE_INT;break;
        case 'cg_numcompte': type=TYPE_INT;break;
        case 'cg_libelle': type=TYPE_STRING;break;
        case 'ac_numero': type=TYPE_INT;break;
        case 'cg_accepteaux': type=TYPE_BOOL;break;
        case 'cg_utilisable': type=TYPE_BOOL;break;
        case 'cg_lettrable': type=TYPE_BOOL;break;
        case 'cg_pointable': type=TYPE_BOOL;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'cg_groupable': type=TYPE_BOOL;break;
        case 'cg_debit': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_compteproduit':
    case 'compteproduit':
      switch(champs.toLowerCase()){
        case 'ci_numero': type=TYPE_INT;break;
        case 'pd_numero': type=TYPE_INT;break;
        case 'cg_numero': type=TYPE_INT;break;
        case 'ci_actif': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_constante':
    case 'constante':
      switch(champs.toLowerCase()){
        case 'cs_numero': type=TYPE_INT;break;
        case 'cs_type': type=TYPE_INT;break;
        case 'cs_valeur': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_contact':
    case 'contact':
      switch(champs.toLowerCase()){
        case 'cn_numero': type=TYPE_INT;break;
        case 'cn_coordonnee': type=TYPE_STRING;break;
        case 'cn_actif': type=TYPE_BOOL;break;
        case 'ck_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_contacttype':
    case 'contacttype':
      switch(champs.toLowerCase()){
        case 'ck_numero': type=TYPE_INT;break;
        case 'ck_code': type=TYPE_STRING;break;
        case 'ck_nom': type=TYPE_STRING;break;
        case 'ck_number': type=TYPE_BOOL;break;
        case 'ck_email': type=TYPE_BOOL;break;
        case 'ck_url': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_contactversion':
    case 'contactversion':
      switch(champs.toLowerCase()){
        case 'cw_numero': type=TYPE_INT;break;
        case 'cw_coordonnee': type=TYPE_STRING;break;
        case 'ck_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'cn_numero': type=TYPE_INT;break;
        case 'version': type=TYPE_INT;break;
        case 'operation': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_cotisation':
    case 'cotisation':
      switch(champs.toLowerCase()){
        case 'cs_numero': type=TYPE_UNKNOWN;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'cs_societe': type=TYPE_INT;break;
        case 'ig_numero': type=TYPE_INT;break;
        case 'cs_standard': type=TYPE_BOOL;break;
        case 'cs_annee': type=TYPE_INT;break;
        case 'cs_detail': type=TYPE_STRING;break;
        case 'cs_duo': type=TYPE_BOOL;break;
        case 'cs_done': type=TYPE_BOOL;break;
        case 'cs_valid': type=TYPE_BOOL;break;
        case 'cs_report': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_devis':
    case 'devis':
      switch(champs.toLowerCase()){
        case 'de_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'de_date': type=TYPE_DATE;break;
        case 'de_libelle': type=TYPE_STRING;break;
        case 'de_reduction': type=TYPE_FLOAT;break;
        case 'de_montantht': type=TYPE_FLOAT;break;
        case 'de_montantttc': type=TYPE_FLOAT;break;
        case 'em_numero': type=TYPE_INT;break;
        case 'de_locked': type=TYPE_BOOL;break;
        case 'de_acompte': type=TYPE_BOOL;break;
        case 'de_lettre': type=TYPE_BOOL;break;
        case 'de_civilites': type=TYPE_STRING;break;
        case 'de_introduction': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_droit':
    case 'droit':
      switch(champs.toLowerCase()){
        case 'dr_numero': type=TYPE_INT;break;
        case 'dp_numero': type=TYPE_INT;break;
        case 'gt_numero': type=TYPE_INT;break;
        case 'dr_select': type=TYPE_BOOL;break;
        case 'dr_insert': type=TYPE_BOOL;break;
        case 'dr_update': type=TYPE_BOOL;break;
        case 'dr_delete': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_droitprofil':
    case 'droitprofil':
      switch(champs.toLowerCase()){
        case 'dp_numero': type=TYPE_INT;break;
        case 'dp_libelle': type=TYPE_STRING;break;
        case 'dp_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_ecriture':
    case 'ecriture':
      switch(champs.toLowerCase()){
        case 'ec_numero': type=TYPE_INT;break;
        case 'ec_numecriture': type=TYPE_INT;break;
        case 'pi_numero': type=TYPE_INT;break;
        case 'ex_numero': type=TYPE_INT;break;
        case 'cg_numero': type=TYPE_INT;break;
        case 'ca_numero': type=TYPE_INT;break;
        case 'ec_aux': type=TYPE_BOOL;break;
        case 'pf_numero': type=TYPE_INT;break;
        case 'ec_compte': type=TYPE_STRING;break;
        case 'ec_libelle': type=TYPE_STRING;break;
        case 'ec_debit': type=TYPE_FLOAT;break;
        case 'ec_credit': type=TYPE_FLOAT;break;
        case 'pt_numero': type=TYPE_INT;break;
        case 'av_numero': type=TYPE_INT;break;
        case 'lt_numero': type=TYPE_INT;break;
        case 'db_numero': type=TYPE_INT;break;
        case 'rg_numero': type=TYPE_INT;break;
        case 'fa_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_employe':
    case 'employe':
      switch(champs.toLowerCase()){
        case 'em_numero': type=TYPE_INT;break;
        case 'dp_numero': type=TYPE_INT;break;
        case 'em_emploi': type=TYPE_STRING;break;
        case 'em_service': type=TYPE_INT;break;
        case 'em_agent': type=TYPE_INT;break;
        case 'em_login': type=TYPE_STRING;break;
        case 'em_reglement': type=TYPE_BOOL;break;
        case 'em_acces': type=TYPE_INT;break;
        case 'em_password': type=TYPE_STRING;break;
        case 'em_super': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_equipe':
    case 'equipe':
      switch(champs.toLowerCase()){
        case 'eq_numero': type=TYPE_INT;break;
        case 'eq_nom': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_estlie':
    case 'estlie':
      switch(champs.toLowerCase()){
        case 'el_numero': type=TYPE_INT;break;
        case 'el_personne1': type=TYPE_INT;break;
        case 'el_personne2': type=TYPE_INT;break;
        case 'el_actif': type=TYPE_BOOL;break;
        case 'tl_numero': type=TYPE_INT;break;
        case 'el_debut': type=TYPE_DATETIME;break;
        case 'el_fin': type=TYPE_DATETIME;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_estresponsable':
    case 'estresponsable':
      switch(champs.toLowerCase()){
        case 'peac_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 're_numero': type=TYPE_INT;break;
        case 'peac_periodedebut': type=TYPE_DATE;break;
        case 'peac_periodefin': type=TYPE_DATE;break;
        case 'peac_titre': type=TYPE_STRING;break;
        case 'peac_fini': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_evoplus':
    case 'evoplus':
      switch(champs.toLowerCase()){
        case 'source': type=TYPE_STRING;break;
        case 'numero': type=TYPE_STRING;break;
        case 'titre': type=TYPE_STRING;break;
        case 'nom': type=TYPE_STRING;break;
        case 'complement': type=TYPE_STRING;break;
        case 'ad1': type=TYPE_STRING;break;
        case 'ad2': type=TYPE_STRING;break;
        case 'ad3': type=TYPE_STRING;break;
        case 'cp': type=TYPE_STRING;break;
        case 'ville': type=TYPE_STRING;break;
        case 'naissance': type=TYPE_STRING;break;
        case 'telephone': type=TYPE_STRING;break;
        case 'fax': type=TYPE_STRING;break;
        case 'portable': type=TYPE_STRING;break;
        case 'qualification': type=TYPE_STRING;break;
        case 'base_ht': type=TYPE_STRING;break;
        case 'productions': type=TYPE_STRING;break;
        case 'fuel_m3': type=TYPE_STRING;break;
        case 'eco_fuel': type=TYPE_STRING;break;
        case 'eco_fuel_tipp': type=TYPE_STRING;break;
        case 'hectares_nb': type=TYPE_STRING;break;
        case 'salaries_nb': type=TYPE_STRING;break;
        case 'sacea_ttc': type=TYPE_STRING;break;
        case 'h1_ha': type=TYPE_STRING;break;
        case 'h1_ht': type=TYPE_STRING;break;
        case 'h2_ha': type=TYPE_STRING;break;
        case 'h2_ht': type=TYPE_STRING;break;
        case 'empty_ab': type=TYPE_STRING;break;
        case 'h3_ha': type=TYPE_STRING;break;
        case 'h3_ht': type=TYPE_STRING;break;
        case 'empty_ae': type=TYPE_STRING;break;
        case 'h4_ha': type=TYPE_STRING;break;
        case 'h4_ht': type=TYPE_STRING;break;
        case 'empty_ah': type=TYPE_STRING;break;
        case 'h5_ha': type=TYPE_STRING;break;
        case 'h5_ht': type=TYPE_STRING;break;
        case 'empty_ak': type=TYPE_STRING;break;
        case 'h6_ha': type=TYPE_STRING;break;
        case 'h6_ht': type=TYPE_STRING;break;
        case 'empty_an': type=TYPE_STRING;break;
        case 'cm_nb': type=TYPE_STRING;break;
        case 'cm_ht': type=TYPE_STRING;break;
        case 'cm_noms': type=TYPE_STRING;break;
        case 'opt1': type=TYPE_STRING;break;
        case 'opt2': type=TYPE_STRING;break;
        case 'opt3': type=TYPE_STRING;break;
        case 'opt4': type=TYPE_STRING;break;
        case 'opt_num': type=TYPE_INT;break;
        case 'opt_ttc': type=TYPE_STRING;break;
        case 'statut': type=TYPE_STRING;break;
        case 'remarque': type=TYPE_STRING;break;
        case 'proposition': type=TYPE_BOOL;break;
        case 'aava': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'filename': type=TYPE_STRING;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'lot': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_exercice':
    case 'exercice':
      switch(champs.toLowerCase()){
        case 'ex_numero': type=TYPE_INT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'ex_datedebut': type=TYPE_DATE;break;
        case 'ex_datefin': type=TYPE_DATE;break;
        case 'ex_cloture': type=TYPE_BOOL;break;
        case 'ex_password': type=TYPE_STRING;break;
        case 'ex_compteattente': type=TYPE_INT;break;
        case 'ex_actif': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_facture':
    case 'facture':
      switch(champs.toLowerCase()){
        case 'fa_numero': type=TYPE_INT;break;
        case 'de_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'ag_numero': type=TYPE_INT;break;
        case 'fa_numfact': type=TYPE_INT;break;
        case 'fa_date': type=TYPE_DATE;break;
        case 'fa_perte': type=TYPE_BOOL;break;
        case 'fa_reduction': type=TYPE_FLOAT;break;
        case 'fa_montantht': type=TYPE_FLOAT;break;
        case 'fa_montantttc': type=TYPE_FLOAT;break;
        case 'fa_accompte': type=TYPE_FLOAT;break;
        case 'fa_annotation': type=TYPE_STRING;break;
        case 'fa_libelle': type=TYPE_STRING;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_facturereglement':
    case 'facturereglement':
      switch(champs.toLowerCase()){
        case 'fr_numero': type=TYPE_INT;break;
        case 'rg_numero': type=TYPE_INT;break;
        case 'fa_numero': type=TYPE_INT;break;
        case 'fr_acompte': type=TYPE_BOOL;break;
        case 'fr_partiel': type=TYPE_BOOL;break;
        case 'fr_montant': type=TYPE_FLOAT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_groupe':
    case 'groupe':
      switch(champs.toLowerCase()){
        case 'zg_numero': type=TYPE_INT;break;
        case 'zg_libelle': type=TYPE_STRING;break;
        case 'zg_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_groupecanton':
    case 'groupecanton':
      switch(champs.toLowerCase()){
        case 'gc_numero': type=TYPE_INT;break;
        case 'gc_nom': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_groupetable':
    case 'groupetable':
      switch(champs.toLowerCase()){
        case 'gt_numero': type=TYPE_INT;break;
        case 'gt_libelle': type=TYPE_STRING;break;
        case 'gt_tables': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_impression':
    case 'impression':
      switch(champs.toLowerCase()){
        case 'im_numero': type=TYPE_INT;break;
        case 'im_libelle': type=TYPE_STRING;break;
        case 'im_nom': type=TYPE_STRING;break;
        case 'im_societe': type=TYPE_INT;break;
        case 'im_modele': type=TYPE_STRING;break;
        case 'im_defaut': type=TYPE_BOOL;break;
        case 'im_keytable': type=TYPE_STRING;break;
        case 'im_keycle': type=TYPE_STRING;break;
        case 'im_keydate': type=TYPE_STRING;break;
        case 'im_fonction': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_impressiondocument':
    case 'impressiondocument':
      switch(champs.toLowerCase()){
        case 'id_numero': type=TYPE_UNKNOWN;break;
        case 'ig_numero': type=TYPE_INT;break;
        case 'id_cle': type=TYPE_STRING;break;
        case 'id_modele': type=TYPE_STRING;break;
        case 'id_filename': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_impressiongroupe':
    case 'impressiongroupe':
      switch(champs.toLowerCase()){
        case 'ig_numero': type=TYPE_UNKNOWN;break;
        case 'il_numero': type=TYPE_INT;break;
        case 'ig_date': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_impressionlot':
    case 'impressionlot':
      switch(champs.toLowerCase()){
        case 'il_numero': type=TYPE_UNKNOWN;break;
        case 'il_nom': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_journal':
    case 'journal':
      switch(champs.toLowerCase()){
        case 'jo_numero': type=TYPE_INT;break;
        case 'jo_abbrev': type=TYPE_STRING;break;
        case 'jo_libelle': type=TYPE_STRING;break;
        case 'jo_debit': type=TYPE_FLOAT;break;
        case 'jo_credit': type=TYPE_FLOAT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'tj_numero': type=TYPE_INT;break;
        case 'cg_numero': type=TYPE_INT;break;
        case 'jo_mois': type=TYPE_INT;break;
        case 'jo_annee': type=TYPE_INT;break;
        case 'jo_contrepartie': type=TYPE_BOOL;break;
        case 'jo_provisoire': type=TYPE_BOOL;break;
        case 'jo_visible': type=TYPE_BOOL;break;
        case 'jo_sequence': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_lettrage':
    case 'lettrage':
      switch(champs.toLowerCase()){
        case 'lt_numero': type=TYPE_INT;break;
        case 'lt_lettre': type=TYPE_STRING;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_lieu':
    case 'lieu':
      switch(champs.toLowerCase()){
        case 'zl_numero': type=TYPE_INT;break;
        case 'zl_libelle': type=TYPE_STRING;break;
        case 'zl_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_ligne':
    case 'ligne':
      switch(champs.toLowerCase()){
        case 'l_numero': type=TYPE_INT;break;
        case 'pd_numero': type=TYPE_INT;break;
        case 'de_numero': type=TYPE_INT;break;
        case 'l_quantite': type=TYPE_FLOAT;break;
        case 'l_montantht': type=TYPE_FLOAT;break;
        case 'l_montantttc': type=TYPE_FLOAT;break;
        case 'px_numero': type=TYPE_INT;break;
        case 'l_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_ligneavoir':
    case 'ligneavoir':
      switch(champs.toLowerCase()){
        case 'la_numero': type=TYPE_INT;break;
        case 'pd_numero': type=TYPE_INT;break;
        case 'av_numero': type=TYPE_INT;break;
        case 'px_numero': type=TYPE_INT;break;
        case 'la_quantite': type=TYPE_FLOAT;break;
        case 'la_montantht': type=TYPE_FLOAT;break;
        case 'la_montantttc': type=TYPE_FLOAT;break;
        case 'la_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_lignefacture':
    case 'lignefacture':
      switch(champs.toLowerCase()){
        case 'lf_numero': type=TYPE_INT;break;
        case 'fa_numero': type=TYPE_INT;break;
        case 'px_numero': type=TYPE_INT;break;
        case 'pd_numero': type=TYPE_INT;break;
        case 'lf_quantite': type=TYPE_FLOAT;break;
        case 'lf_montantht': type=TYPE_FLOAT;break;
        case 'lf_montantttc': type=TYPE_FLOAT;break;
        case 'lf_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_lignemodele':
    case 'lignemodele':
      switch(champs.toLowerCase()){
        case 'lm_numero': type=TYPE_INT;break;
        case 'pd_numero': type=TYPE_INT;break;
        case 'mo_numero': type=TYPE_INT;break;
        case 'lm_quantite': type=TYPE_FLOAT;break;
        case 'lm_montantht': type=TYPE_FLOAT;break;
        case 'lm_montantttc': type=TYPE_FLOAT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_listereglement':
    case 'listereglement':
      switch(champs.toLowerCase()){
        case 'lr_numero': type=TYPE_INT;break;
        case 'lr_indice': type=TYPE_INT;break;
        case 'lr_commentaire': type=TYPE_STRING;break;
        case 'em_numero': type=TYPE_INT;break;
        case 'lr_montant': type=TYPE_FLOAT;break;
        case 'lr_date': type=TYPE_DATE;break;
        case 'mr_numero': type=TYPE_INT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_modereglement':
    case 'modereglement':
      switch(champs.toLowerCase()){
        case 'mr_numero': type=TYPE_INT;break;
        case 'mr_libelle': type=TYPE_STRING;break;
        case 'mr_compte': type=TYPE_STRING;break;
        case 'cg_numero': type=TYPE_INT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'mr_cheque': type=TYPE_BOOL;break;
        case 'mr_actif': type=TYPE_BOOL;break;
        case 'mr_description': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_moderepartition':
    case 'moderepartition':
      switch(champs.toLowerCase()){
        case 'mp_numero': type=TYPE_INT;break;
        case 'mp_libelle': type=TYPE_STRING;break;
        case 'cg_numero': type=TYPE_INT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'mp_actif': type=TYPE_BOOL;break;
        case 'mp_societe': type=TYPE_INT;break;
        case 'mp_description': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_modele':
    case 'modele':
      switch(champs.toLowerCase()){
        case 'mo_numero': type=TYPE_INT;break;
        case 'mo_libelle': type=TYPE_STRING;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_naturepersonne':
    case 'naturepersonne':
      switch(champs.toLowerCase()){
        case 'np_numero': type=TYPE_INT;break;
        case 'np_nom': type=TYPE_STRING;break;
        case 'np_abrev': type=TYPE_STRING;break;
        case 'np_titre': type=TYPE_STRING;break;
        case 'np_morale': type=TYPE_BOOL;break;
        case 'np_avectitre': type=TYPE_BOOL;break;
        case 'np_inclu': type=TYPE_BOOL;break;
        case 'np_temporaire': type=TYPE_BOOL;break;
        case 'np_genre': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_nonadherent':
    case 'nonadherent':
      switch(champs.toLowerCase()){
        case 'na_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'na_titre': type=TYPE_STRING;break;
        case 'na_nom': type=TYPE_STRING;break;
        case 'na_prenom': type=TYPE_STRING;break;
        case 'na_adresse1': type=TYPE_STRING;break;
        case 'na_adresse2': type=TYPE_STRING;break;
        case 'na_cp': type=TYPE_STRING;break;
        case 'na_ville': type=TYPE_STRING;break;
        case 'na_tel': type=TYPE_STRING;break;
        case 'na_date': type=TYPE_DATE;break;
        case 'na_na': type=TYPE_BOOL;break;
        case 'ag_numero': type=TYPE_INT;break;
        case 'na_raison': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_observation':
    case 'observation':
      switch(champs.toLowerCase()){
        case 'ob_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'ob_observation': type=TYPE_STRING;break;
        case 'ob_niveau': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_periode':
    case 'periode':
      switch(champs.toLowerCase()){
        case 'po_numero': type=TYPE_INT;break;
        case 'po_debut': type=TYPE_DATE;break;
        case 'po_fin': type=TYPE_DATE;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_periodeadherence':
    case 'periodeadherence':
      switch(champs.toLowerCase()){
        case 'po_numero': type=TYPE_INT;break;
        case 'ah_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_personne':
    case 'personne':
      switch(champs.toLowerCase()){
        case 'pe_numero': type=TYPE_INT;break;
        case 'pe_id': type=TYPE_INT;break;
        case 'tp_numero': type=TYPE_INT;break;
        case 'np_numero': type=TYPE_INT;break;
        case 'pe_titre': type=TYPE_STRING;break;
        case 'pe_nom': type=TYPE_STRING;break;
        case 'pe_regimefiscal': type=TYPE_STRING;break;
        case 'pe_actif': type=TYPE_BOOL;break;
        case 'pe_morale': type=TYPE_BOOL;break;
        case 'deleted': type=TYPE_BOOL;break;
        case 'pe_prenom': type=TYPE_STRING;break;
        case 'pe_motdepasse': type=TYPE_STRING;break;
        case 'pe_naissance': type=TYPE_DATE;break;
        case 'pe_numtvaic': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_personneupdate':
    case 'personneupdate':
      switch(champs.toLowerCase()){
        case 'pu_numero': type=TYPE_INT;break;
        case 'pu_action': type=TYPE_STRING;break;
        case 'pu_bilan': type=TYPE_STRING;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'tp_numero': type=TYPE_INT;break;
        case 'pe_titre': type=TYPE_STRING;break;
        case 'pe_nom': type=TYPE_STRING;break;
        case 'pe_regimefiscal': type=TYPE_STRING;break;
        case 'pe_morale': type=TYPE_BOOL;break;
        case 'pe_prenom': type=TYPE_STRING;break;
        case 'pe_naissance': type=TYPE_DATE;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_piece':
    case 'piece':
      switch(champs.toLowerCase()){
        case 'pi_numero': type=TYPE_INT;break;
        case 'jo_numero': type=TYPE_INT;break;
        case 'pi_numpiece': type=TYPE_INT;break;
        case 'ex_numero': type=TYPE_INT;break;
        case 'pi_libelle': type=TYPE_STRING;break;
        case 'pi_debit': type=TYPE_FLOAT;break;
        case 'pi_credit': type=TYPE_FLOAT;break;
        case 'pi_date': type=TYPE_DATE;break;
        case 'pi_numseq': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_pointage':
    case 'pointage':
      switch(champs.toLowerCase()){
        case 'pt_numero': type=TYPE_INT;break;
        case 'pt_date': type=TYPE_DATE;break;
        case 'pt_releve': type=TYPE_STRING;break;
        case 'pt_debit': type=TYPE_FLOAT;break;
        case 'pt_credit': type=TYPE_FLOAT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_prefixe':
    case 'prefixe':
      switch(champs.toLowerCase()){
        case 'pf_numero': type=TYPE_INT;break;
        case 'pf_nom': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_prix':
    case 'prix':
      switch(champs.toLowerCase()){
        case 'px_numero': type=TYPE_INT;break;
        case 'tv_numero': type=TYPE_INT;break;
        case 'pd_numero': type=TYPE_INT;break;
        case 'px_tarifht': type=TYPE_FLOAT;break;
        case 'px_tarifttc': type=TYPE_FLOAT;break;
        case 'px_actif': type=TYPE_BOOL;break;
        case 'px_datedebut': type=TYPE_DATETIME;break;
        case 'px_datefin': type=TYPE_DATETIME;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_produit':
    case 'produit':
      switch(champs.toLowerCase()){
        case 'pd_numero': type=TYPE_INT;break;
        case 'pd_id': type=TYPE_UNKNOWN;break;
        case 'pd_libelle': type=TYPE_STRING;break;
        case 'pd_titre': type=TYPE_STRING;break;
        case 'jo_numero': type=TYPE_INT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'pd_actif': type=TYPE_BOOL;break;
        case 'pd_sansquantite': type=TYPE_BOOL;break;
        case 'pd_reduction': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_reglement':
    case 'reglement':
      switch(champs.toLowerCase()){
        case 'rg_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'rg_montant': type=TYPE_FLOAT;break;
        case 'rg_date': type=TYPE_DATE;break;
        case 'em_numero': type=TYPE_INT;break;
        case 'lr_numero': type=TYPE_INT;break;
        case 'mr_numero': type=TYPE_INT;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'rg_encompta': type=TYPE_BOOL;break;
        case 'rg_libellebanque': type=TYPE_STRING;break;
        case 'rg_numerocompte': type=TYPE_STRING;break;
        case 'rg_reference': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_repartition':
    case 'repartition':
      switch(champs.toLowerCase()){
        case 'rp_numero': type=TYPE_INT;break;
        case 'rg_numero': type=TYPE_INT;break;
        case 'mp_numero': type=TYPE_INT;break;
        case 'rp_montant': type=TYPE_FLOAT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_responsabilite':
    case 'responsabilite':
      switch(champs.toLowerCase()){
        case 're_numero': type=TYPE_INT;break;
        case 're_code': type=TYPE_STRING;break;
        case 're_nom': type=TYPE_STRING;break;
        case 're_famille': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_routage':
    case 'routage':
      switch(champs.toLowerCase()){
        case 'ro_numero': type=TYPE_INT;break;
        case 'ad_numero': type=TYPE_INT;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'ro_debutservice': type=TYPE_INT;break;
        case 'ro_finservice': type=TYPE_INT;break;
        case 'ro_quantite': type=TYPE_INT;break;
        case 'ro_suspendu': type=TYPE_BOOL;break;
        case 'ro_dernierroute': type=TYPE_INT;break;
        case 'fa_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_sequence':
    case 'sequence':
      switch(champs.toLowerCase()){
        case 'sq_numero': type=TYPE_UNKNOWN;break;
        case 'sq_nom': type=TYPE_STRING;break;
        case 'sq_last': type=TYPE_INT;break;
        case 'sq_nombre': type=TYPE_INT;break;
        case 'sq_used_on': type=TYPE_DATETIME;break;
        case 'sq_clear_cache': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_sequencecache':
    case 'sequencecache':
      switch(champs.toLowerCase()){
        case 'sc_numero': type=TYPE_UNKNOWN;break;
        case 'sq_numero': type=TYPE_INT;break;
        case 'sc_valeur': type=TYPE_INT;break;
        case 'sc_locked': type=TYPE_BOOL;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_service':
    case 'service':
      switch(champs.toLowerCase()){
        case 'se_numero': type=TYPE_INT;break;
        case 'se_nom': type=TYPE_STRING;break;
        case 'se_societe': type=TYPE_INT;break;
        case 'se_agent': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_societe':
    case 'societe':
      switch(champs.toLowerCase()){
        case 'so_numero': type=TYPE_INT;break;
        case 'so_libelle': type=TYPE_STRING;break;
        case 'so_abbrev': type=TYPE_STRING;break;
        case 'pe_numero': type=TYPE_INT;break;
        case 'so_detail': type=TYPE_STRING;break;
        case 'so_sequence': type=TYPE_STRING;break;
        case 'ts_numero': type=TYPE_INT;break;
        case 'sq_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_sujet':
    case 'sujet':
      switch(champs.toLowerCase()){
        case 'zs_numero': type=TYPE_INT;break;
        case 'zs_libelle': type=TYPE_STRING;break;
        case 'zu_numero': type=TYPE_INT;break;
        case 'zs_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_tache':
    case 'tache':
      switch(champs.toLowerCase()){
        case 'zt_numero': type=TYPE_INT;break;
        case 'zt_libelle': type=TYPE_STRING;break;
        case 'zt_phrase': type=TYPE_STRING;break;
        case 'zt_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_tva':
    case 'tva':
      switch(champs.toLowerCase()){
        case 'tv_numero': type=TYPE_INT;break;
        case 'tv_code': type=TYPE_INT;break;
        case 'tv_taux': type=TYPE_FLOAT;break;
        case 'tv_actif': type=TYPE_BOOL;break;
        case 'so_numero': type=TYPE_INT;break;
        case 'cg_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typeadresse':
    case 'typeadresse':
      switch(champs.toLowerCase()){
        case 'ak_numero': type=TYPE_INT;break;
        case 'ak_nom': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typeattribut':
    case 'typeattribut':
      switch(champs.toLowerCase()){
        case 'ta_numero': type=TYPE_INT;break;
        case 'ta_nom': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typejournal':
    case 'typejournal':
      switch(champs.toLowerCase()){
        case 'tj_numero': type=TYPE_INT;break;
        case 'tj_libelle': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typelien':
    case 'typelien':
      switch(champs.toLowerCase()){
        case 'tl_numero': type=TYPE_INT;break;
        case 'tl_libelle': type=TYPE_STRING;break;
        case 'tl_action12': type=TYPE_STRING;break;
        case 'tl_action21': type=TYPE_STRING;break;
        case 'tl_description': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typepersonne':
    case 'typepersonne':
      switch(champs.toLowerCase()){
        case 'tp_numero': type=TYPE_INT;break;
        case 'tp_type': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typesociete':
    case 'typesociete':
      switch(champs.toLowerCase()){
        case 'ts_numero': type=TYPE_INT;break;
        case 'ts_libelle': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typesujet':
    case 'typesujet':
      switch(champs.toLowerCase()){
        case 'zu_numero': type=TYPE_INT;break;
        case 'zu_libelle': type=TYPE_STRING;break;
        case 'zu_notes': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_typetache':
    case 'typetache':
      switch(champs.toLowerCase()){
        case 'th_numero': type=TYPE_INT;break;
        case 'th_libelle': type=TYPE_STRING;break;
        case 'th_description': type=TYPE_STRING;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_ville':
    case 'ville':
      switch(champs.toLowerCase()){
        case 'vi_numero': type=TYPE_INT;break;
        case 'vi_nom': type=TYPE_STRING;break;
        case 'ct_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
    case 'table_villecp':
    case 'villecp':
      switch(champs.toLowerCase()){
        case 'vi_numero': type=TYPE_INT;break;
        case 'cp_numero': type=TYPE_INT;break;
        case 'created_at': type=TYPE_DATETIME;break;
        case 'created_by': type=TYPE_STRING;break;
        case 'updated_at': type=TYPE_DATETIME;break;
        case 'updated_by': type=TYPE_STRING;break;
        case 'lock_version': type=TYPE_INT;break;
        case 'id': type=TYPE_UNKNOWN;break;
        default: type=TYPE_UNDEFINED;
      }
      break;
  
    default: 
      type=TYPE_UNDEFINED;
      try{type=gsea_getType(table,champs);} 
      catch(e){type=TYPE_UNDEFINED;};
  }
  return type;
}

/* Renvoie le label d'un attribut */
function mcd_getLabel(table,champs)
{
  var label;
  switch(table.toLowerCase()){
    case 'table_acces':
    case 'acces':
      switch(champs.toLowerCase()){
        case 'ac_numero': label="";break;
        case 'ac_libelle': label="";break;
        case 'ac_niveau': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_activite':
    case 'activite':
      switch(champs.toLowerCase()){
        case 'za_numero': label="";break;
        case 'za_heuredebut': label="";break;
        case 'za_heurefin': label="";break;
        case 'za_date': label="";break;
        case 'za_duree': label="";break;
        case 'em_numero': label="";break;
        case 'zt_numero': label="";break;
        case 'zs_numero': label="";break;
        case 'zl_numero': label="";break;
        case 'za_pour': label="";break;
        case 'za_qui': label="";break;
        case 'za_champ': label="";break;
        case 'fa_numero': label="";break;
        case 'de_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'zg_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_adherence':
    case 'adherence':
      switch(champs.toLowerCase()){
        case 'ah_numero': label="";break;
        case 'pd_numero': label="";break;
        case 'ah_libelle': label="";break;
        case 'ah_reduction': label="";break;
        case 'ah_cascade': label="";break;
        case 'tl_numero': label="";break;
        case 'ah_liendirect': label="";break;
        case 'ah_lienindirect': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_adhesion':
    case 'adhesion':
      switch(champs.toLowerCase()){
        case 'as_numero': label="";break;
        case 'as_reductionmax': label="";break;
        case 'pe_numero': label="";break;
        case 'po_numero': label="";break;
        case 'ah_numero': label="";break;
        case 'fa_numero': label="";break;
        case 'lf_numero': label="";break;
        case 'as_origine': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_adresse':
    case 'adresse':
      switch(champs.toLowerCase()){
        case 'ad_numero': label="";break;
        case 'ak_numero': label="";break;
        case 'cp_numero': label="";break;
        case 'vi_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'ad_active': label="";break;
        case 'ad_ligne2': label="";break;
        case 'ad_ligne3': label="";break;
        case 'ad_ligne4': label="";break;
        case 'ad_ligne5': label="";break;
        case 'ad_datestop': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_adresseversion':
    case 'adresseversion':
      switch(champs.toLowerCase()){
        case 'aw_numero': label="";break;
        case 'ad_numero': label="";break;
        case 'ak_numero': label="";break;
        case 'cp_numero': label="";break;
        case 'vi_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'aw_ligne2': label="";break;
        case 'aw_ligne3': label="";break;
        case 'aw_ligne4': label="";break;
        case 'aw_ligne5': label="";break;
        case 'version': label="Version de l'original";break;
        case 'operation': label="Opération effectuée";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_agent':
    case 'agent':
      switch(champs.toLowerCase()){
        case 'ag_numero': label="";break;
        case 'ag_nom': label="";break;
        case 'ag_prenom': label="";break;
        case 'ag_initiales': label="";break;
        case 'ag_actif': label="";break;
        case 'eq_numero': label="";break;
        case 'ag_role': label="";break;
        case 'ag_telephone': label="";break;
        case 'ag_mobile': label="";break;
        case 'ag_email': label="";break;
        case 'ag_commentaire': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_appartienta':
    case 'appartienta':
      switch(champs.toLowerCase()){
        case 'ct_numero': label="";break;
        case 'gc_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_appel':
    case 'appel':
      switch(champs.toLowerCase()){
        case 'ap_numero': label="";break;
        case 'ap_libelle': label="";break;
        case 'th_numero': label="";break;
        case 'ap_date': label="";break;
        case 'ap_description': label="";break;
        case 'ap_duree': label="";break;
        case 'pe_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_attribut':
    case 'attribut':
      switch(champs.toLowerCase()){
        case 'at_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'ta_numero': label="";break;
        case 'cr_numero': label="";break;
        case 'at_valeur': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_avoir':
    case 'avoir':
      switch(champs.toLowerCase()){
        case 'av_numero': label="";break;
        case 'fa_numero': label="";break;
        case 'av_numfact': label="";break;
        case 'av_date': label="";break;
        case 'av_montantht': label="";break;
        case 'av_montantttc': label="";break;
        case 'av_reduction': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_canton':
    case 'canton':
      switch(champs.toLowerCase()){
        case 'ct_numero': label="";break;
        case 'ct_nom': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_categorie':
    case 'categorie':
      switch(champs.toLowerCase()){
        case 'cr_numero': label="";break;
        case 'cr_libelle': label="";break;
        case 'ta_numero': label="";break;
        case 'cr_description': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_codepostal':
    case 'codepostal':
      switch(champs.toLowerCase()){
        case 'cp_numero': label="";break;
        case 'cp_codepostal': label="";break;
        case 'cp_bureau': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_compteaux':
    case 'compteaux':
      switch(champs.toLowerCase()){
        case 'ca_numero': label="";break;
        case 'cg_numero': label="";break;
        case 'ca_numcompte': label="";break;
        case 'ca_libelle': label="";break;
        case 'ac_numero': label="";break;
        case 'ca_debit': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_comptegen':
    case 'comptegen':
      switch(champs.toLowerCase()){
        case 'cg_numero': label="";break;
        case 'cg_numcompte': label="";break;
        case 'cg_libelle': label="";break;
        case 'ac_numero': label="";break;
        case 'cg_accepteaux': label="";break;
        case 'cg_utilisable': label="";break;
        case 'cg_lettrable': label="";break;
        case 'cg_pointable': label="";break;
        case 'so_numero': label="";break;
        case 'cg_groupable': label="";break;
        case 'cg_debit': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_compteproduit':
    case 'compteproduit':
      switch(champs.toLowerCase()){
        case 'ci_numero': label="";break;
        case 'pd_numero': label="";break;
        case 'cg_numero': label="";break;
        case 'ci_actif': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_constante':
    case 'constante':
      switch(champs.toLowerCase()){
        case 'cs_numero': label="";break;
        case 'cs_type': label="";break;
        case 'cs_valeur': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_contact':
    case 'contact':
      switch(champs.toLowerCase()){
        case 'cn_numero': label="";break;
        case 'cn_coordonnee': label="";break;
        case 'cn_actif': label="";break;
        case 'ck_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_contacttype':
    case 'contacttype':
      switch(champs.toLowerCase()){
        case 'ck_numero': label="";break;
        case 'ck_code': label="";break;
        case 'ck_nom': label="";break;
        case 'ck_number': label="";break;
        case 'ck_email': label="";break;
        case 'ck_url': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_contactversion':
    case 'contactversion':
      switch(champs.toLowerCase()){
        case 'cw_numero': label="";break;
        case 'cw_coordonnee': label="";break;
        case 'ck_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'cn_numero': label="";break;
        case 'version': label="Version de l'original";break;
        case 'operation': label="Opération effectuée";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_cotisation':
    case 'cotisation':
      switch(champs.toLowerCase()){
        case 'cs_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'cs_societe': label="";break;
        case 'ig_numero': label="";break;
        case 'cs_standard': label="";break;
        case 'cs_annee': label="";break;
        case 'cs_detail': label="";break;
        case 'cs_duo': label="";break;
        case 'cs_done': label="";break;
        case 'cs_valid': label="";break;
        case 'cs_report': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_devis':
    case 'devis':
      switch(champs.toLowerCase()){
        case 'de_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'so_numero': label="";break;
        case 'de_date': label="";break;
        case 'de_libelle': label="";break;
        case 'de_reduction': label="";break;
        case 'de_montantht': label="";break;
        case 'de_montantttc': label="";break;
        case 'em_numero': label="";break;
        case 'de_locked': label="";break;
        case 'de_acompte': label="";break;
        case 'de_lettre': label="";break;
        case 'de_civilites': label="";break;
        case 'de_introduction': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_droit':
    case 'droit':
      switch(champs.toLowerCase()){
        case 'dr_numero': label="";break;
        case 'dp_numero': label="";break;
        case 'gt_numero': label="";break;
        case 'dr_select': label="";break;
        case 'dr_insert': label="";break;
        case 'dr_update': label="";break;
        case 'dr_delete': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_droitprofil':
    case 'droitprofil':
      switch(champs.toLowerCase()){
        case 'dp_numero': label="";break;
        case 'dp_libelle': label="";break;
        case 'dp_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_ecriture':
    case 'ecriture':
      switch(champs.toLowerCase()){
        case 'ec_numero': label="";break;
        case 'ec_numecriture': label="";break;
        case 'pi_numero': label="";break;
        case 'ex_numero': label="";break;
        case 'cg_numero': label="";break;
        case 'ca_numero': label="";break;
        case 'ec_aux': label="";break;
        case 'pf_numero': label="";break;
        case 'ec_compte': label="";break;
        case 'ec_libelle': label="";break;
        case 'ec_debit': label="";break;
        case 'ec_credit': label="";break;
        case 'pt_numero': label="";break;
        case 'av_numero': label="";break;
        case 'lt_numero': label="";break;
        case 'db_numero': label="";break;
        case 'rg_numero': label="";break;
        case 'fa_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_employe':
    case 'employe':
      switch(champs.toLowerCase()){
        case 'em_numero': label="";break;
        case 'dp_numero': label="";break;
        case 'em_emploi': label="";break;
        case 'em_service': label="";break;
        case 'em_agent': label="";break;
        case 'em_login': label="";break;
        case 'em_reglement': label="";break;
        case 'em_acces': label="";break;
        case 'em_password': label="";break;
        case 'em_super': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_equipe':
    case 'equipe':
      switch(champs.toLowerCase()){
        case 'eq_numero': label="";break;
        case 'eq_nom': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_estlie':
    case 'estlie':
      switch(champs.toLowerCase()){
        case 'el_numero': label="";break;
        case 'el_personne1': label="";break;
        case 'el_personne2': label="";break;
        case 'el_actif': label="";break;
        case 'tl_numero': label="";break;
        case 'el_debut': label="";break;
        case 'el_fin': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_estresponsable':
    case 'estresponsable':
      switch(champs.toLowerCase()){
        case 'peac_numero': label="";break;
        case 'pe_numero': label="";break;
        case 're_numero': label="";break;
        case 'peac_periodedebut': label="";break;
        case 'peac_periodefin': label="";break;
        case 'peac_titre': label="";break;
        case 'peac_fini': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_evoplus':
    case 'evoplus':
      switch(champs.toLowerCase()){
        case 'source': label="";break;
        case 'numero': label="";break;
        case 'titre': label="";break;
        case 'nom': label="";break;
        case 'complement': label="";break;
        case 'ad1': label="";break;
        case 'ad2': label="";break;
        case 'ad3': label="";break;
        case 'cp': label="";break;
        case 'ville': label="";break;
        case 'naissance': label="";break;
        case 'telephone': label="";break;
        case 'fax': label="";break;
        case 'portable': label="";break;
        case 'qualification': label="";break;
        case 'base_ht': label="";break;
        case 'productions': label="";break;
        case 'fuel_m3': label="";break;
        case 'eco_fuel': label="";break;
        case 'eco_fuel_tipp': label="";break;
        case 'hectares_nb': label="";break;
        case 'salaries_nb': label="";break;
        case 'sacea_ttc': label="";break;
        case 'h1_ha': label="";break;
        case 'h1_ht': label="";break;
        case 'h2_ha': label="";break;
        case 'h2_ht': label="";break;
        case 'empty_ab': label="";break;
        case 'h3_ha': label="";break;
        case 'h3_ht': label="";break;
        case 'empty_ae': label="";break;
        case 'h4_ha': label="";break;
        case 'h4_ht': label="";break;
        case 'empty_ah': label="";break;
        case 'h5_ha': label="";break;
        case 'h5_ht': label="";break;
        case 'empty_ak': label="";break;
        case 'h6_ha': label="";break;
        case 'h6_ht': label="";break;
        case 'empty_an': label="";break;
        case 'cm_nb': label="";break;
        case 'cm_ht': label="";break;
        case 'cm_noms': label="";break;
        case 'opt1': label="";break;
        case 'opt2': label="";break;
        case 'opt3': label="";break;
        case 'opt4': label="";break;
        case 'opt_num': label="";break;
        case 'opt_ttc': label="";break;
        case 'statut': label="";break;
        case 'remarque': label="";break;
        case 'proposition': label="";break;
        case 'aava': label="";break;
        case 'created_at': label="";break;
        case 'created_by': label="";break;
        case 'filename': label="";break;
        case 'pe_numero': label="";break;
        case 'lot': label="";break;
        case 'id': label="";break;
        default: label="";
      }
      break;
    case 'table_exercice':
    case 'exercice':
      switch(champs.toLowerCase()){
        case 'ex_numero': label="";break;
        case 'so_numero': label="";break;
        case 'ex_datedebut': label="";break;
        case 'ex_datefin': label="";break;
        case 'ex_cloture': label="";break;
        case 'ex_password': label="";break;
        case 'ex_compteattente': label="";break;
        case 'ex_actif': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_facture':
    case 'facture':
      switch(champs.toLowerCase()){
        case 'fa_numero': label="";break;
        case 'de_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'ag_numero': label="";break;
        case 'fa_numfact': label="";break;
        case 'fa_date': label="";break;
        case 'fa_perte': label="";break;
        case 'fa_reduction': label="";break;
        case 'fa_montantht': label="";break;
        case 'fa_montantttc': label="";break;
        case 'fa_accompte': label="";break;
        case 'fa_annotation': label="";break;
        case 'fa_libelle': label="";break;
        case 'so_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_facturereglement':
    case 'facturereglement':
      switch(champs.toLowerCase()){
        case 'fr_numero': label="";break;
        case 'rg_numero': label="";break;
        case 'fa_numero': label="";break;
        case 'fr_acompte': label="";break;
        case 'fr_partiel': label="";break;
        case 'fr_montant': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_groupe':
    case 'groupe':
      switch(champs.toLowerCase()){
        case 'zg_numero': label="";break;
        case 'zg_libelle': label="";break;
        case 'zg_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_groupecanton':
    case 'groupecanton':
      switch(champs.toLowerCase()){
        case 'gc_numero': label="";break;
        case 'gc_nom': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_groupetable':
    case 'groupetable':
      switch(champs.toLowerCase()){
        case 'gt_numero': label="";break;
        case 'gt_libelle': label="";break;
        case 'gt_tables': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_impression':
    case 'impression':
      switch(champs.toLowerCase()){
        case 'im_numero': label="";break;
        case 'im_libelle': label="";break;
        case 'im_nom': label="";break;
        case 'im_societe': label="";break;
        case 'im_modele': label="";break;
        case 'im_defaut': label="";break;
        case 'im_keytable': label="";break;
        case 'im_keycle': label="";break;
        case 'im_keydate': label="";break;
        case 'im_fonction': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_impressiondocument':
    case 'impressiondocument':
      switch(champs.toLowerCase()){
        case 'id_numero': label="";break;
        case 'ig_numero': label="";break;
        case 'id_cle': label="";break;
        case 'id_modele': label="";break;
        case 'id_filename': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_impressiongroupe':
    case 'impressiongroupe':
      switch(champs.toLowerCase()){
        case 'ig_numero': label="";break;
        case 'il_numero': label="";break;
        case 'ig_date': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_impressionlot':
    case 'impressionlot':
      switch(champs.toLowerCase()){
        case 'il_numero': label="";break;
        case 'il_nom': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_journal':
    case 'journal':
      switch(champs.toLowerCase()){
        case 'jo_numero': label="";break;
        case 'jo_abbrev': label="";break;
        case 'jo_libelle': label="";break;
        case 'jo_debit': label="";break;
        case 'jo_credit': label="";break;
        case 'so_numero': label="";break;
        case 'tj_numero': label="";break;
        case 'cg_numero': label="";break;
        case 'jo_mois': label="";break;
        case 'jo_annee': label="";break;
        case 'jo_contrepartie': label="";break;
        case 'jo_provisoire': label="";break;
        case 'jo_visible': label="";break;
        case 'jo_sequence': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_lettrage':
    case 'lettrage':
      switch(champs.toLowerCase()){
        case 'lt_numero': label="";break;
        case 'lt_lettre': label="";break;
        case 'so_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_lieu':
    case 'lieu':
      switch(champs.toLowerCase()){
        case 'zl_numero': label="";break;
        case 'zl_libelle': label="";break;
        case 'zl_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_ligne':
    case 'ligne':
      switch(champs.toLowerCase()){
        case 'l_numero': label="";break;
        case 'pd_numero': label="";break;
        case 'de_numero': label="";break;
        case 'l_quantite': label="";break;
        case 'l_montantht': label="";break;
        case 'l_montantttc': label="";break;
        case 'px_numero': label="";break;
        case 'l_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_ligneavoir':
    case 'ligneavoir':
      switch(champs.toLowerCase()){
        case 'la_numero': label="";break;
        case 'pd_numero': label="";break;
        case 'av_numero': label="";break;
        case 'px_numero': label="";break;
        case 'la_quantite': label="";break;
        case 'la_montantht': label="";break;
        case 'la_montantttc': label="";break;
        case 'la_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_lignefacture':
    case 'lignefacture':
      switch(champs.toLowerCase()){
        case 'lf_numero': label="";break;
        case 'fa_numero': label="";break;
        case 'px_numero': label="";break;
        case 'pd_numero': label="";break;
        case 'lf_quantite': label="";break;
        case 'lf_montantht': label="";break;
        case 'lf_montantttc': label="";break;
        case 'lf_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_lignemodele':
    case 'lignemodele':
      switch(champs.toLowerCase()){
        case 'lm_numero': label="";break;
        case 'pd_numero': label="";break;
        case 'mo_numero': label="";break;
        case 'lm_quantite': label="";break;
        case 'lm_montantht': label="";break;
        case 'lm_montantttc': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_listereglement':
    case 'listereglement':
      switch(champs.toLowerCase()){
        case 'lr_numero': label="";break;
        case 'lr_indice': label="";break;
        case 'lr_commentaire': label="";break;
        case 'em_numero': label="";break;
        case 'lr_montant': label="";break;
        case 'lr_date': label="";break;
        case 'mr_numero': label="";break;
        case 'so_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_modereglement':
    case 'modereglement':
      switch(champs.toLowerCase()){
        case 'mr_numero': label="";break;
        case 'mr_libelle': label="";break;
        case 'mr_compte': label="";break;
        case 'cg_numero': label="";break;
        case 'so_numero': label="";break;
        case 'mr_cheque': label="";break;
        case 'mr_actif': label="";break;
        case 'mr_description': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_moderepartition':
    case 'moderepartition':
      switch(champs.toLowerCase()){
        case 'mp_numero': label="";break;
        case 'mp_libelle': label="";break;
        case 'cg_numero': label="";break;
        case 'so_numero': label="";break;
        case 'mp_actif': label="";break;
        case 'mp_societe': label="";break;
        case 'mp_description': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_modele':
    case 'modele':
      switch(champs.toLowerCase()){
        case 'mo_numero': label="";break;
        case 'mo_libelle': label="";break;
        case 'so_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_naturepersonne':
    case 'naturepersonne':
      switch(champs.toLowerCase()){
        case 'np_numero': label="";break;
        case 'np_nom': label="";break;
        case 'np_abrev': label="";break;
        case 'np_titre': label="";break;
        case 'np_morale': label="";break;
        case 'np_avectitre': label="";break;
        case 'np_inclu': label="";break;
        case 'np_temporaire': label="";break;
        case 'np_genre': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_nonadherent':
    case 'nonadherent':
      switch(champs.toLowerCase()){
        case 'na_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'na_titre': label="";break;
        case 'na_nom': label="";break;
        case 'na_prenom': label="";break;
        case 'na_adresse1': label="";break;
        case 'na_adresse2': label="";break;
        case 'na_cp': label="";break;
        case 'na_ville': label="";break;
        case 'na_tel': label="";break;
        case 'na_date': label="";break;
        case 'na_na': label="";break;
        case 'ag_numero': label="";break;
        case 'na_raison': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_observation':
    case 'observation':
      switch(champs.toLowerCase()){
        case 'ob_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'ob_observation': label="";break;
        case 'ob_niveau': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_periode':
    case 'periode':
      switch(champs.toLowerCase()){
        case 'po_numero': label="";break;
        case 'po_debut': label="";break;
        case 'po_fin': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_periodeadherence':
    case 'periodeadherence':
      switch(champs.toLowerCase()){
        case 'po_numero': label="";break;
        case 'ah_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_personne':
    case 'personne':
      switch(champs.toLowerCase()){
        case 'pe_numero': label="";break;
        case 'pe_id': label="";break;
        case 'tp_numero': label="";break;
        case 'np_numero': label="";break;
        case 'pe_titre': label="";break;
        case 'pe_nom': label="";break;
        case 'pe_regimefiscal': label="";break;
        case 'pe_actif': label="";break;
        case 'pe_morale': label="";break;
        case 'deleted': label="";break;
        case 'pe_prenom': label="";break;
        case 'pe_motdepasse': label="";break;
        case 'pe_naissance': label="";break;
        case 'pe_numtvaic': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_personneupdate':
    case 'personneupdate':
      switch(champs.toLowerCase()){
        case 'pu_numero': label="";break;
        case 'pu_action': label="";break;
        case 'pu_bilan': label="";break;
        case 'pe_numero': label="";break;
        case 'tp_numero': label="";break;
        case 'pe_titre': label="";break;
        case 'pe_nom': label="";break;
        case 'pe_regimefiscal': label="";break;
        case 'pe_morale': label="";break;
        case 'pe_prenom': label="";break;
        case 'pe_naissance': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_piece':
    case 'piece':
      switch(champs.toLowerCase()){
        case 'pi_numero': label="";break;
        case 'jo_numero': label="";break;
        case 'pi_numpiece': label="";break;
        case 'ex_numero': label="";break;
        case 'pi_libelle': label="";break;
        case 'pi_debit': label="";break;
        case 'pi_credit': label="";break;
        case 'pi_date': label="";break;
        case 'pi_numseq': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_pointage':
    case 'pointage':
      switch(champs.toLowerCase()){
        case 'pt_numero': label="";break;
        case 'pt_date': label="";break;
        case 'pt_releve': label="";break;
        case 'pt_debit': label="";break;
        case 'pt_credit': label="";break;
        case 'so_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_prefixe':
    case 'prefixe':
      switch(champs.toLowerCase()){
        case 'pf_numero': label="";break;
        case 'pf_nom': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_prix':
    case 'prix':
      switch(champs.toLowerCase()){
        case 'px_numero': label="";break;
        case 'tv_numero': label="";break;
        case 'pd_numero': label="";break;
        case 'px_tarifht': label="";break;
        case 'px_tarifttc': label="";break;
        case 'px_actif': label="";break;
        case 'px_datedebut': label="";break;
        case 'px_datefin': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_produit':
    case 'produit':
      switch(champs.toLowerCase()){
        case 'pd_numero': label="";break;
        case 'pd_id': label="";break;
        case 'pd_libelle': label="";break;
        case 'pd_titre': label="";break;
        case 'jo_numero': label="";break;
        case 'so_numero': label="";break;
        case 'pd_actif': label="";break;
        case 'pd_sansquantite': label="";break;
        case 'pd_reduction': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_reglement':
    case 'reglement':
      switch(champs.toLowerCase()){
        case 'rg_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'rg_montant': label="";break;
        case 'rg_date': label="";break;
        case 'em_numero': label="";break;
        case 'lr_numero': label="";break;
        case 'mr_numero': label="";break;
        case 'so_numero': label="";break;
        case 'rg_encompta': label="";break;
        case 'rg_libellebanque': label="";break;
        case 'rg_numerocompte': label="";break;
        case 'rg_reference': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_repartition':
    case 'repartition':
      switch(champs.toLowerCase()){
        case 'rp_numero': label="";break;
        case 'rg_numero': label="";break;
        case 'mp_numero': label="";break;
        case 'rp_montant': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_responsabilite':
    case 'responsabilite':
      switch(champs.toLowerCase()){
        case 're_numero': label="";break;
        case 're_code': label="";break;
        case 're_nom': label="";break;
        case 're_famille': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_routage':
    case 'routage':
      switch(champs.toLowerCase()){
        case 'ro_numero': label="";break;
        case 'ad_numero': label="";break;
        case 'pe_numero': label="";break;
        case 'ro_debutservice': label="";break;
        case 'ro_finservice': label="";break;
        case 'ro_quantite': label="";break;
        case 'ro_suspendu': label="";break;
        case 'ro_dernierroute': label="";break;
        case 'fa_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        default: label="";
      }
      break;
    case 'table_sequence':
    case 'sequence':
      switch(champs.toLowerCase()){
        case 'sq_numero': label="";break;
        case 'sq_nom': label="";break;
        case 'sq_last': label="";break;
        case 'sq_nombre': label="";break;
        case 'sq_used_on': label="";break;
        case 'sq_clear_cache': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_sequencecache':
    case 'sequencecache':
      switch(champs.toLowerCase()){
        case 'sc_numero': label="";break;
        case 'sq_numero': label="";break;
        case 'sc_valeur': label="";break;
        case 'sc_locked': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_service':
    case 'service':
      switch(champs.toLowerCase()){
        case 'se_numero': label="";break;
        case 'se_nom': label="";break;
        case 'se_societe': label="";break;
        case 'se_agent': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_societe':
    case 'societe':
      switch(champs.toLowerCase()){
        case 'so_numero': label="";break;
        case 'so_libelle': label="";break;
        case 'so_abbrev': label="";break;
        case 'pe_numero': label="";break;
        case 'so_detail': label="";break;
        case 'so_sequence': label="";break;
        case 'ts_numero': label="";break;
        case 'sq_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_sujet':
    case 'sujet':
      switch(champs.toLowerCase()){
        case 'zs_numero': label="";break;
        case 'zs_libelle': label="";break;
        case 'zu_numero': label="";break;
        case 'zs_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_tache':
    case 'tache':
      switch(champs.toLowerCase()){
        case 'zt_numero': label="";break;
        case 'zt_libelle': label="";break;
        case 'zt_phrase': label="";break;
        case 'zt_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_tva':
    case 'tva':
      switch(champs.toLowerCase()){
        case 'tv_numero': label="";break;
        case 'tv_code': label="";break;
        case 'tv_taux': label="";break;
        case 'tv_actif': label="";break;
        case 'so_numero': label="";break;
        case 'cg_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typeadresse':
    case 'typeadresse':
      switch(champs.toLowerCase()){
        case 'ak_numero': label="";break;
        case 'ak_nom': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typeattribut':
    case 'typeattribut':
      switch(champs.toLowerCase()){
        case 'ta_numero': label="";break;
        case 'ta_nom': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typejournal':
    case 'typejournal':
      switch(champs.toLowerCase()){
        case 'tj_numero': label="";break;
        case 'tj_libelle': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typelien':
    case 'typelien':
      switch(champs.toLowerCase()){
        case 'tl_numero': label="";break;
        case 'tl_libelle': label="";break;
        case 'tl_action12': label="";break;
        case 'tl_action21': label="";break;
        case 'tl_description': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typepersonne':
    case 'typepersonne':
      switch(champs.toLowerCase()){
        case 'tp_numero': label="";break;
        case 'tp_type': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typesociete':
    case 'typesociete':
      switch(champs.toLowerCase()){
        case 'ts_numero': label="";break;
        case 'ts_libelle': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typesujet':
    case 'typesujet':
      switch(champs.toLowerCase()){
        case 'zu_numero': label="";break;
        case 'zu_libelle': label="";break;
        case 'zu_notes': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_typetache':
    case 'typetache':
      switch(champs.toLowerCase()){
        case 'th_numero': label="";break;
        case 'th_libelle': label="";break;
        case 'th_description': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_ville':
    case 'ville':
      switch(champs.toLowerCase()){
        case 'vi_numero': label="";break;
        case 'vi_nom': label="";break;
        case 'ct_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
    case 'table_villecp':
    case 'villecp':
      switch(champs.toLowerCase()){
        case 'vi_numero': label="";break;
        case 'cp_numero': label="";break;
        case 'created_at': label="Date de creation";break;
        case 'created_by': label="Login du createur";break;
        case 'updated_at': label="Date de mise à jour";break;
        case 'updated_by': label="Login du modificateur";break;
        case 'lock_version': label="Numero de version";break;
        case 'id': label="ID";break;
        default: label="";
      }
      break;
  
    default: label="";
  }
  return label;
}

/* Renvoie si c'est obligatoire de renseigner le champs */
function mcd_obligatoire(table,champs)
{
  var obligatoire;
  switch(table.toLowerCase()){
    case 'table_acces':
    case 'acces':
      switch(champs.toLowerCase()){
        case 'ac_numero': obligatoire=true;break;
        case 'ac_libelle': obligatoire=true;break;
        case 'ac_niveau': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_activite':
    case 'activite':
      switch(champs.toLowerCase()){
        case 'za_numero': obligatoire=true;break;
        case 'za_heuredebut': obligatoire=false;break;
        case 'za_heurefin': obligatoire=false;break;
        case 'za_date': obligatoire=true;break;
        case 'za_duree': obligatoire=true;break;
        case 'em_numero': obligatoire=true;break;
        case 'zt_numero': obligatoire=true;break;
        case 'zs_numero': obligatoire=true;break;
        case 'zl_numero': obligatoire=true;break;
        case 'za_pour': obligatoire=false;break;
        case 'za_qui': obligatoire=true;break;
        case 'za_champ': obligatoire=true;break;
        case 'fa_numero': obligatoire=false;break;
        case 'de_numero': obligatoire=false;break;
        case 'pe_numero': obligatoire=false;break;
        case 'zg_numero': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_adherence':
    case 'adherence':
      switch(champs.toLowerCase()){
        case 'ah_numero': obligatoire=true;break;
        case 'pd_numero': obligatoire=true;break;
        case 'ah_libelle': obligatoire=true;break;
        case 'ah_reduction': obligatoire=true;break;
        case 'ah_cascade': obligatoire=true;break;
        case 'tl_numero': obligatoire=false;break;
        case 'ah_liendirect': obligatoire=true;break;
        case 'ah_lienindirect': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_adhesion':
    case 'adhesion':
      switch(champs.toLowerCase()){
        case 'as_numero': obligatoire=true;break;
        case 'as_reductionmax': obligatoire=false;break;
        case 'pe_numero': obligatoire=true;break;
        case 'po_numero': obligatoire=true;break;
        case 'ah_numero': obligatoire=true;break;
        case 'fa_numero': obligatoire=true;break;
        case 'lf_numero': obligatoire=true;break;
        case 'as_origine': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_adresse':
    case 'adresse':
      switch(champs.toLowerCase()){
        case 'ad_numero': obligatoire=true;break;
        case 'ak_numero': obligatoire=true;break;
        case 'cp_numero': obligatoire=true;break;
        case 'vi_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'ad_active': obligatoire=true;break;
        case 'ad_ligne2': obligatoire=false;break;
        case 'ad_ligne3': obligatoire=false;break;
        case 'ad_ligne4': obligatoire=false;break;
        case 'ad_ligne5': obligatoire=false;break;
        case 'ad_datestop': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_adresseversion':
    case 'adresseversion':
      switch(champs.toLowerCase()){
        case 'aw_numero': obligatoire=true;break;
        case 'ad_numero': obligatoire=true;break;
        case 'ak_numero': obligatoire=true;break;
        case 'cp_numero': obligatoire=true;break;
        case 'vi_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'aw_ligne2': obligatoire=false;break;
        case 'aw_ligne3': obligatoire=false;break;
        case 'aw_ligne4': obligatoire=false;break;
        case 'aw_ligne5': obligatoire=false;break;
        case 'version': obligatoire=true;break;
        case 'operation': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_agent':
    case 'agent':
      switch(champs.toLowerCase()){
        case 'ag_numero': obligatoire=true;break;
        case 'ag_nom': obligatoire=true;break;
        case 'ag_prenom': obligatoire=true;break;
        case 'ag_initiales': obligatoire=true;break;
        case 'ag_actif': obligatoire=true;break;
        case 'eq_numero': obligatoire=false;break;
        case 'ag_role': obligatoire=false;break;
        case 'ag_telephone': obligatoire=false;break;
        case 'ag_mobile': obligatoire=false;break;
        case 'ag_email': obligatoire=false;break;
        case 'ag_commentaire': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_appartienta':
    case 'appartienta':
      switch(champs.toLowerCase()){
        case 'ct_numero': obligatoire=true;break;
        case 'gc_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_appel':
    case 'appel':
      switch(champs.toLowerCase()){
        case 'ap_numero': obligatoire=true;break;
        case 'ap_libelle': obligatoire=true;break;
        case 'th_numero': obligatoire=true;break;
        case 'ap_date': obligatoire=true;break;
        case 'ap_description': obligatoire=false;break;
        case 'ap_duree': obligatoire=false;break;
        case 'pe_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_attribut':
    case 'attribut':
      switch(champs.toLowerCase()){
        case 'at_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'ta_numero': obligatoire=true;break;
        case 'cr_numero': obligatoire=true;break;
        case 'at_valeur': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_avoir':
    case 'avoir':
      switch(champs.toLowerCase()){
        case 'av_numero': obligatoire=true;break;
        case 'fa_numero': obligatoire=true;break;
        case 'av_numfact': obligatoire=true;break;
        case 'av_date': obligatoire=true;break;
        case 'av_montantht': obligatoire=false;break;
        case 'av_montantttc': obligatoire=false;break;
        case 'av_reduction': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_canton':
    case 'canton':
      switch(champs.toLowerCase()){
        case 'ct_numero': obligatoire=true;break;
        case 'ct_nom': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_categorie':
    case 'categorie':
      switch(champs.toLowerCase()){
        case 'cr_numero': obligatoire=true;break;
        case 'cr_libelle': obligatoire=true;break;
        case 'ta_numero': obligatoire=true;break;
        case 'cr_description': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_codepostal':
    case 'codepostal':
      switch(champs.toLowerCase()){
        case 'cp_numero': obligatoire=true;break;
        case 'cp_codepostal': obligatoire=true;break;
        case 'cp_bureau': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_compteaux':
    case 'compteaux':
      switch(champs.toLowerCase()){
        case 'ca_numero': obligatoire=true;break;
        case 'cg_numero': obligatoire=true;break;
        case 'ca_numcompte': obligatoire=true;break;
        case 'ca_libelle': obligatoire=true;break;
        case 'ac_numero': obligatoire=true;break;
        case 'ca_debit': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_comptegen':
    case 'comptegen':
      switch(champs.toLowerCase()){
        case 'cg_numero': obligatoire=true;break;
        case 'cg_numcompte': obligatoire=true;break;
        case 'cg_libelle': obligatoire=true;break;
        case 'ac_numero': obligatoire=true;break;
        case 'cg_accepteaux': obligatoire=true;break;
        case 'cg_utilisable': obligatoire=true;break;
        case 'cg_lettrable': obligatoire=true;break;
        case 'cg_pointable': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'cg_groupable': obligatoire=false;break;
        case 'cg_debit': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_compteproduit':
    case 'compteproduit':
      switch(champs.toLowerCase()){
        case 'ci_numero': obligatoire=true;break;
        case 'pd_numero': obligatoire=true;break;
        case 'cg_numero': obligatoire=true;break;
        case 'ci_actif': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_constante':
    case 'constante':
      switch(champs.toLowerCase()){
        case 'cs_numero': obligatoire=true;break;
        case 'cs_type': obligatoire=true;break;
        case 'cs_valeur': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_contact':
    case 'contact':
      switch(champs.toLowerCase()){
        case 'cn_numero': obligatoire=true;break;
        case 'cn_coordonnee': obligatoire=true;break;
        case 'cn_actif': obligatoire=true;break;
        case 'ck_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_contacttype':
    case 'contacttype':
      switch(champs.toLowerCase()){
        case 'ck_numero': obligatoire=true;break;
        case 'ck_code': obligatoire=true;break;
        case 'ck_nom': obligatoire=true;break;
        case 'ck_number': obligatoire=true;break;
        case 'ck_email': obligatoire=true;break;
        case 'ck_url': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_contactversion':
    case 'contactversion':
      switch(champs.toLowerCase()){
        case 'cw_numero': obligatoire=true;break;
        case 'cw_coordonnee': obligatoire=true;break;
        case 'ck_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'cn_numero': obligatoire=true;break;
        case 'version': obligatoire=true;break;
        case 'operation': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_cotisation':
    case 'cotisation':
      switch(champs.toLowerCase()){
        case 'cs_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'cs_societe': obligatoire=false;break;
        case 'ig_numero': obligatoire=false;break;
        case 'cs_standard': obligatoire=true;break;
        case 'cs_annee': obligatoire=true;break;
        case 'cs_detail': obligatoire=true;break;
        case 'cs_duo': obligatoire=true;break;
        case 'cs_done': obligatoire=true;break;
        case 'cs_valid': obligatoire=true;break;
        case 'cs_report': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_devis':
    case 'devis':
      switch(champs.toLowerCase()){
        case 'de_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'de_date': obligatoire=false;break;
        case 'de_libelle': obligatoire=false;break;
        case 'de_reduction': obligatoire=false;break;
        case 'de_montantht': obligatoire=false;break;
        case 'de_montantttc': obligatoire=false;break;
        case 'em_numero': obligatoire=true;break;
        case 'de_locked': obligatoire=false;break;
        case 'de_acompte': obligatoire=true;break;
        case 'de_lettre': obligatoire=true;break;
        case 'de_civilites': obligatoire=false;break;
        case 'de_introduction': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_droit':
    case 'droit':
      switch(champs.toLowerCase()){
        case 'dr_numero': obligatoire=true;break;
        case 'dp_numero': obligatoire=true;break;
        case 'gt_numero': obligatoire=true;break;
        case 'dr_select': obligatoire=true;break;
        case 'dr_insert': obligatoire=true;break;
        case 'dr_update': obligatoire=true;break;
        case 'dr_delete': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_droitprofil':
    case 'droitprofil':
      switch(champs.toLowerCase()){
        case 'dp_numero': obligatoire=true;break;
        case 'dp_libelle': obligatoire=true;break;
        case 'dp_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_ecriture':
    case 'ecriture':
      switch(champs.toLowerCase()){
        case 'ec_numero': obligatoire=true;break;
        case 'ec_numecriture': obligatoire=true;break;
        case 'pi_numero': obligatoire=true;break;
        case 'ex_numero': obligatoire=true;break;
        case 'cg_numero': obligatoire=false;break;
        case 'ca_numero': obligatoire=false;break;
        case 'ec_aux': obligatoire=true;break;
        case 'pf_numero': obligatoire=true;break;
        case 'ec_compte': obligatoire=true;break;
        case 'ec_libelle': obligatoire=true;break;
        case 'ec_debit': obligatoire=true;break;
        case 'ec_credit': obligatoire=true;break;
        case 'pt_numero': obligatoire=false;break;
        case 'av_numero': obligatoire=false;break;
        case 'lt_numero': obligatoire=false;break;
        case 'db_numero': obligatoire=false;break;
        case 'rg_numero': obligatoire=false;break;
        case 'fa_numero': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_employe':
    case 'employe':
      switch(champs.toLowerCase()){
        case 'em_numero': obligatoire=true;break;
        case 'dp_numero': obligatoire=true;break;
        case 'em_emploi': obligatoire=true;break;
        case 'em_service': obligatoire=true;break;
        case 'em_agent': obligatoire=true;break;
        case 'em_login': obligatoire=true;break;
        case 'em_reglement': obligatoire=true;break;
        case 'em_acces': obligatoire=true;break;
        case 'em_password': obligatoire=true;break;
        case 'em_super': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_equipe':
    case 'equipe':
      switch(champs.toLowerCase()){
        case 'eq_numero': obligatoire=true;break;
        case 'eq_nom': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_estlie':
    case 'estlie':
      switch(champs.toLowerCase()){
        case 'el_numero': obligatoire=true;break;
        case 'el_personne1': obligatoire=true;break;
        case 'el_personne2': obligatoire=true;break;
        case 'el_actif': obligatoire=true;break;
        case 'tl_numero': obligatoire=true;break;
        case 'el_debut': obligatoire=true;break;
        case 'el_fin': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_estresponsable':
    case 'estresponsable':
      switch(champs.toLowerCase()){
        case 'peac_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 're_numero': obligatoire=true;break;
        case 'peac_periodedebut': obligatoire=true;break;
        case 'peac_periodefin': obligatoire=false;break;
        case 'peac_titre': obligatoire=false;break;
        case 'peac_fini': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_evoplus':
    case 'evoplus':
      switch(champs.toLowerCase()){
        case 'source': obligatoire=false;break;
        case 'numero': obligatoire=false;break;
        case 'titre': obligatoire=false;break;
        case 'nom': obligatoire=false;break;
        case 'complement': obligatoire=false;break;
        case 'ad1': obligatoire=false;break;
        case 'ad2': obligatoire=false;break;
        case 'ad3': obligatoire=false;break;
        case 'cp': obligatoire=false;break;
        case 'ville': obligatoire=false;break;
        case 'naissance': obligatoire=false;break;
        case 'telephone': obligatoire=false;break;
        case 'fax': obligatoire=false;break;
        case 'portable': obligatoire=false;break;
        case 'qualification': obligatoire=false;break;
        case 'base_ht': obligatoire=false;break;
        case 'productions': obligatoire=false;break;
        case 'fuel_m3': obligatoire=false;break;
        case 'eco_fuel': obligatoire=false;break;
        case 'eco_fuel_tipp': obligatoire=false;break;
        case 'hectares_nb': obligatoire=false;break;
        case 'salaries_nb': obligatoire=false;break;
        case 'sacea_ttc': obligatoire=false;break;
        case 'h1_ha': obligatoire=false;break;
        case 'h1_ht': obligatoire=false;break;
        case 'h2_ha': obligatoire=false;break;
        case 'h2_ht': obligatoire=false;break;
        case 'empty_ab': obligatoire=false;break;
        case 'h3_ha': obligatoire=false;break;
        case 'h3_ht': obligatoire=false;break;
        case 'empty_ae': obligatoire=false;break;
        case 'h4_ha': obligatoire=false;break;
        case 'h4_ht': obligatoire=false;break;
        case 'empty_ah': obligatoire=false;break;
        case 'h5_ha': obligatoire=false;break;
        case 'h5_ht': obligatoire=false;break;
        case 'empty_ak': obligatoire=false;break;
        case 'h6_ha': obligatoire=false;break;
        case 'h6_ht': obligatoire=false;break;
        case 'empty_an': obligatoire=false;break;
        case 'cm_nb': obligatoire=false;break;
        case 'cm_ht': obligatoire=false;break;
        case 'cm_noms': obligatoire=false;break;
        case 'opt1': obligatoire=false;break;
        case 'opt2': obligatoire=false;break;
        case 'opt3': obligatoire=false;break;
        case 'opt4': obligatoire=false;break;
        case 'opt_num': obligatoire=false;break;
        case 'opt_ttc': obligatoire=false;break;
        case 'statut': obligatoire=false;break;
        case 'remarque': obligatoire=false;break;
        case 'proposition': obligatoire=true;break;
        case 'aava': obligatoire=true;break;
        case 'created_at': obligatoire=true;break;
        case 'created_by': obligatoire=true;break;
        case 'filename': obligatoire=false;break;
        case 'pe_numero': obligatoire=false;break;
        case 'lot': obligatoire=false;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_exercice':
    case 'exercice':
      switch(champs.toLowerCase()){
        case 'ex_numero': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'ex_datedebut': obligatoire=true;break;
        case 'ex_datefin': obligatoire=true;break;
        case 'ex_cloture': obligatoire=true;break;
        case 'ex_password': obligatoire=true;break;
        case 'ex_compteattente': obligatoire=false;break;
        case 'ex_actif': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_facture':
    case 'facture':
      switch(champs.toLowerCase()){
        case 'fa_numero': obligatoire=true;break;
        case 'de_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'ag_numero': obligatoire=true;break;
        case 'fa_numfact': obligatoire=true;break;
        case 'fa_date': obligatoire=true;break;
        case 'fa_perte': obligatoire=true;break;
        case 'fa_reduction': obligatoire=true;break;
        case 'fa_montantht': obligatoire=true;break;
        case 'fa_montantttc': obligatoire=true;break;
        case 'fa_accompte': obligatoire=false;break;
        case 'fa_annotation': obligatoire=false;break;
        case 'fa_libelle': obligatoire=false;break;
        case 'so_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_facturereglement':
    case 'facturereglement':
      switch(champs.toLowerCase()){
        case 'fr_numero': obligatoire=true;break;
        case 'rg_numero': obligatoire=true;break;
        case 'fa_numero': obligatoire=true;break;
        case 'fr_acompte': obligatoire=true;break;
        case 'fr_partiel': obligatoire=true;break;
        case 'fr_montant': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_groupe':
    case 'groupe':
      switch(champs.toLowerCase()){
        case 'zg_numero': obligatoire=true;break;
        case 'zg_libelle': obligatoire=true;break;
        case 'zg_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_groupecanton':
    case 'groupecanton':
      switch(champs.toLowerCase()){
        case 'gc_numero': obligatoire=true;break;
        case 'gc_nom': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_groupetable':
    case 'groupetable':
      switch(champs.toLowerCase()){
        case 'gt_numero': obligatoire=true;break;
        case 'gt_libelle': obligatoire=true;break;
        case 'gt_tables': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_impression':
    case 'impression':
      switch(champs.toLowerCase()){
        case 'im_numero': obligatoire=true;break;
        case 'im_libelle': obligatoire=true;break;
        case 'im_nom': obligatoire=true;break;
        case 'im_societe': obligatoire=true;break;
        case 'im_modele': obligatoire=true;break;
        case 'im_defaut': obligatoire=true;break;
        case 'im_keytable': obligatoire=true;break;
        case 'im_keycle': obligatoire=true;break;
        case 'im_keydate': obligatoire=false;break;
        case 'im_fonction': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_impressiondocument':
    case 'impressiondocument':
      switch(champs.toLowerCase()){
        case 'id_numero': obligatoire=true;break;
        case 'ig_numero': obligatoire=true;break;
        case 'id_cle': obligatoire=true;break;
        case 'id_modele': obligatoire=true;break;
        case 'id_filename': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_impressiongroupe':
    case 'impressiongroupe':
      switch(champs.toLowerCase()){
        case 'ig_numero': obligatoire=true;break;
        case 'il_numero': obligatoire=true;break;
        case 'ig_date': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_impressionlot':
    case 'impressionlot':
      switch(champs.toLowerCase()){
        case 'il_numero': obligatoire=true;break;
        case 'il_nom': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_journal':
    case 'journal':
      switch(champs.toLowerCase()){
        case 'jo_numero': obligatoire=true;break;
        case 'jo_abbrev': obligatoire=true;break;
        case 'jo_libelle': obligatoire=true;break;
        case 'jo_debit': obligatoire=true;break;
        case 'jo_credit': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'tj_numero': obligatoire=false;break;
        case 'cg_numero': obligatoire=false;break;
        case 'jo_mois': obligatoire=true;break;
        case 'jo_annee': obligatoire=true;break;
        case 'jo_contrepartie': obligatoire=true;break;
        case 'jo_provisoire': obligatoire=true;break;
        case 'jo_visible': obligatoire=true;break;
        case 'jo_sequence': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_lettrage':
    case 'lettrage':
      switch(champs.toLowerCase()){
        case 'lt_numero': obligatoire=true;break;
        case 'lt_lettre': obligatoire=false;break;
        case 'so_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_lieu':
    case 'lieu':
      switch(champs.toLowerCase()){
        case 'zl_numero': obligatoire=true;break;
        case 'zl_libelle': obligatoire=true;break;
        case 'zl_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_ligne':
    case 'ligne':
      switch(champs.toLowerCase()){
        case 'l_numero': obligatoire=true;break;
        case 'pd_numero': obligatoire=true;break;
        case 'de_numero': obligatoire=true;break;
        case 'l_quantite': obligatoire=false;break;
        case 'l_montantht': obligatoire=false;break;
        case 'l_montantttc': obligatoire=false;break;
        case 'px_numero': obligatoire=false;break;
        case 'l_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_ligneavoir':
    case 'ligneavoir':
      switch(champs.toLowerCase()){
        case 'la_numero': obligatoire=true;break;
        case 'pd_numero': obligatoire=true;break;
        case 'av_numero': obligatoire=true;break;
        case 'px_numero': obligatoire=true;break;
        case 'la_quantite': obligatoire=true;break;
        case 'la_montantht': obligatoire=false;break;
        case 'la_montantttc': obligatoire=false;break;
        case 'la_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_lignefacture':
    case 'lignefacture':
      switch(champs.toLowerCase()){
        case 'lf_numero': obligatoire=true;break;
        case 'fa_numero': obligatoire=true;break;
        case 'px_numero': obligatoire=false;break;
        case 'pd_numero': obligatoire=false;break;
        case 'lf_quantite': obligatoire=true;break;
        case 'lf_montantht': obligatoire=false;break;
        case 'lf_montantttc': obligatoire=false;break;
        case 'lf_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_lignemodele':
    case 'lignemodele':
      switch(champs.toLowerCase()){
        case 'lm_numero': obligatoire=true;break;
        case 'pd_numero': obligatoire=true;break;
        case 'mo_numero': obligatoire=true;break;
        case 'lm_quantite': obligatoire=false;break;
        case 'lm_montantht': obligatoire=false;break;
        case 'lm_montantttc': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_listereglement':
    case 'listereglement':
      switch(champs.toLowerCase()){
        case 'lr_numero': obligatoire=true;break;
        case 'lr_indice': obligatoire=false;break;
        case 'lr_commentaire': obligatoire=false;break;
        case 'em_numero': obligatoire=true;break;
        case 'lr_montant': obligatoire=true;break;
        case 'lr_date': obligatoire=true;break;
        case 'mr_numero': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_modereglement':
    case 'modereglement':
      switch(champs.toLowerCase()){
        case 'mr_numero': obligatoire=true;break;
        case 'mr_libelle': obligatoire=true;break;
        case 'mr_compte': obligatoire=true;break;
        case 'cg_numero': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'mr_cheque': obligatoire=true;break;
        case 'mr_actif': obligatoire=true;break;
        case 'mr_description': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_moderepartition':
    case 'moderepartition':
      switch(champs.toLowerCase()){
        case 'mp_numero': obligatoire=true;break;
        case 'mp_libelle': obligatoire=true;break;
        case 'cg_numero': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'mp_actif': obligatoire=true;break;
        case 'mp_societe': obligatoire=false;break;
        case 'mp_description': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_modele':
    case 'modele':
      switch(champs.toLowerCase()){
        case 'mo_numero': obligatoire=true;break;
        case 'mo_libelle': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_naturepersonne':
    case 'naturepersonne':
      switch(champs.toLowerCase()){
        case 'np_numero': obligatoire=true;break;
        case 'np_nom': obligatoire=true;break;
        case 'np_abrev': obligatoire=true;break;
        case 'np_titre': obligatoire=true;break;
        case 'np_morale': obligatoire=true;break;
        case 'np_avectitre': obligatoire=true;break;
        case 'np_inclu': obligatoire=true;break;
        case 'np_temporaire': obligatoire=true;break;
        case 'np_genre': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_nonadherent':
    case 'nonadherent':
      switch(champs.toLowerCase()){
        case 'na_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=false;break;
        case 'na_titre': obligatoire=false;break;
        case 'na_nom': obligatoire=false;break;
        case 'na_prenom': obligatoire=false;break;
        case 'na_adresse1': obligatoire=false;break;
        case 'na_adresse2': obligatoire=false;break;
        case 'na_cp': obligatoire=false;break;
        case 'na_ville': obligatoire=false;break;
        case 'na_tel': obligatoire=false;break;
        case 'na_date': obligatoire=false;break;
        case 'na_na': obligatoire=false;break;
        case 'ag_numero': obligatoire=false;break;
        case 'na_raison': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_observation':
    case 'observation':
      switch(champs.toLowerCase()){
        case 'ob_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'ob_observation': obligatoire=true;break;
        case 'ob_niveau': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_periode':
    case 'periode':
      switch(champs.toLowerCase()){
        case 'po_numero': obligatoire=true;break;
        case 'po_debut': obligatoire=true;break;
        case 'po_fin': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_periodeadherence':
    case 'periodeadherence':
      switch(champs.toLowerCase()){
        case 'po_numero': obligatoire=true;break;
        case 'ah_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_personne':
    case 'personne':
      switch(champs.toLowerCase()){
        case 'pe_numero': obligatoire=true;break;
        case 'pe_id': obligatoire=false;break;
        case 'tp_numero': obligatoire=true;break;
        case 'np_numero': obligatoire=true;break;
        case 'pe_titre': obligatoire=true;break;
        case 'pe_nom': obligatoire=true;break;
        case 'pe_regimefiscal': obligatoire=true;break;
        case 'pe_actif': obligatoire=true;break;
        case 'pe_morale': obligatoire=true;break;
        case 'deleted': obligatoire=true;break;
        case 'pe_prenom': obligatoire=false;break;
        case 'pe_motdepasse': obligatoire=false;break;
        case 'pe_naissance': obligatoire=false;break;
        case 'pe_numtvaic': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_personneupdate':
    case 'personneupdate':
      switch(champs.toLowerCase()){
        case 'pu_numero': obligatoire=true;break;
        case 'pu_action': obligatoire=false;break;
        case 'pu_bilan': obligatoire=false;break;
        case 'pe_numero': obligatoire=true;break;
        case 'tp_numero': obligatoire=true;break;
        case 'pe_titre': obligatoire=true;break;
        case 'pe_nom': obligatoire=true;break;
        case 'pe_regimefiscal': obligatoire=true;break;
        case 'pe_morale': obligatoire=true;break;
        case 'pe_prenom': obligatoire=false;break;
        case 'pe_naissance': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_piece':
    case 'piece':
      switch(champs.toLowerCase()){
        case 'pi_numero': obligatoire=true;break;
        case 'jo_numero': obligatoire=true;break;
        case 'pi_numpiece': obligatoire=true;break;
        case 'ex_numero': obligatoire=true;break;
        case 'pi_libelle': obligatoire=true;break;
        case 'pi_debit': obligatoire=true;break;
        case 'pi_credit': obligatoire=true;break;
        case 'pi_date': obligatoire=true;break;
        case 'pi_numseq': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_pointage':
    case 'pointage':
      switch(champs.toLowerCase()){
        case 'pt_numero': obligatoire=true;break;
        case 'pt_date': obligatoire=true;break;
        case 'pt_releve': obligatoire=true;break;
        case 'pt_debit': obligatoire=true;break;
        case 'pt_credit': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_prefixe':
    case 'prefixe':
      switch(champs.toLowerCase()){
        case 'pf_numero': obligatoire=true;break;
        case 'pf_nom': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_prix':
    case 'prix':
      switch(champs.toLowerCase()){
        case 'px_numero': obligatoire=true;break;
        case 'tv_numero': obligatoire=true;break;
        case 'pd_numero': obligatoire=true;break;
        case 'px_tarifht': obligatoire=true;break;
        case 'px_tarifttc': obligatoire=true;break;
        case 'px_actif': obligatoire=true;break;
        case 'px_datedebut': obligatoire=false;break;
        case 'px_datefin': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_produit':
    case 'produit':
      switch(champs.toLowerCase()){
        case 'pd_numero': obligatoire=true;break;
        case 'pd_id': obligatoire=true;break;
        case 'pd_libelle': obligatoire=true;break;
        case 'pd_titre': obligatoire=true;break;
        case 'jo_numero': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'pd_actif': obligatoire=true;break;
        case 'pd_sansquantite': obligatoire=true;break;
        case 'pd_reduction': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_reglement':
    case 'reglement':
      switch(champs.toLowerCase()){
        case 'rg_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'rg_montant': obligatoire=true;break;
        case 'rg_date': obligatoire=true;break;
        case 'em_numero': obligatoire=true;break;
        case 'lr_numero': obligatoire=false;break;
        case 'mr_numero': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'rg_encompta': obligatoire=true;break;
        case 'rg_libellebanque': obligatoire=false;break;
        case 'rg_numerocompte': obligatoire=false;break;
        case 'rg_reference': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_repartition':
    case 'repartition':
      switch(champs.toLowerCase()){
        case 'rp_numero': obligatoire=true;break;
        case 'rg_numero': obligatoire=true;break;
        case 'mp_numero': obligatoire=true;break;
        case 'rp_montant': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_responsabilite':
    case 'responsabilite':
      switch(champs.toLowerCase()){
        case 're_numero': obligatoire=true;break;
        case 're_code': obligatoire=true;break;
        case 're_nom': obligatoire=true;break;
        case 're_famille': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_routage':
    case 'routage':
      switch(champs.toLowerCase()){
        case 'ro_numero': obligatoire=true;break;
        case 'ad_numero': obligatoire=true;break;
        case 'pe_numero': obligatoire=true;break;
        case 'ro_debutservice': obligatoire=true;break;
        case 'ro_finservice': obligatoire=true;break;
        case 'ro_quantite': obligatoire=true;break;
        case 'ro_suspendu': obligatoire=true;break;
        case 'ro_dernierroute': obligatoire=false;break;
        case 'fa_numero': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_sequence':
    case 'sequence':
      switch(champs.toLowerCase()){
        case 'sq_numero': obligatoire=true;break;
        case 'sq_nom': obligatoire=true;break;
        case 'sq_last': obligatoire=true;break;
        case 'sq_nombre': obligatoire=true;break;
        case 'sq_used_on': obligatoire=true;break;
        case 'sq_clear_cache': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_sequencecache':
    case 'sequencecache':
      switch(champs.toLowerCase()){
        case 'sc_numero': obligatoire=true;break;
        case 'sq_numero': obligatoire=true;break;
        case 'sc_valeur': obligatoire=true;break;
        case 'sc_locked': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_service':
    case 'service':
      switch(champs.toLowerCase()){
        case 'se_numero': obligatoire=true;break;
        case 'se_nom': obligatoire=true;break;
        case 'se_societe': obligatoire=true;break;
        case 'se_agent': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_societe':
    case 'societe':
      switch(champs.toLowerCase()){
        case 'so_numero': obligatoire=true;break;
        case 'so_libelle': obligatoire=true;break;
        case 'so_abbrev': obligatoire=true;break;
        case 'pe_numero': obligatoire=false;break;
        case 'so_detail': obligatoire=false;break;
        case 'so_sequence': obligatoire=true;break;
        case 'ts_numero': obligatoire=false;break;
        case 'sq_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_sujet':
    case 'sujet':
      switch(champs.toLowerCase()){
        case 'zs_numero': obligatoire=true;break;
        case 'zs_libelle': obligatoire=true;break;
        case 'zu_numero': obligatoire=true;break;
        case 'zs_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_tache':
    case 'tache':
      switch(champs.toLowerCase()){
        case 'zt_numero': obligatoire=true;break;
        case 'zt_libelle': obligatoire=true;break;
        case 'zt_phrase': obligatoire=true;break;
        case 'zt_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_tva':
    case 'tva':
      switch(champs.toLowerCase()){
        case 'tv_numero': obligatoire=true;break;
        case 'tv_code': obligatoire=true;break;
        case 'tv_taux': obligatoire=true;break;
        case 'tv_actif': obligatoire=true;break;
        case 'so_numero': obligatoire=true;break;
        case 'cg_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typeadresse':
    case 'typeadresse':
      switch(champs.toLowerCase()){
        case 'ak_numero': obligatoire=true;break;
        case 'ak_nom': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typeattribut':
    case 'typeattribut':
      switch(champs.toLowerCase()){
        case 'ta_numero': obligatoire=true;break;
        case 'ta_nom': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typejournal':
    case 'typejournal':
      switch(champs.toLowerCase()){
        case 'tj_numero': obligatoire=true;break;
        case 'tj_libelle': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typelien':
    case 'typelien':
      switch(champs.toLowerCase()){
        case 'tl_numero': obligatoire=true;break;
        case 'tl_libelle': obligatoire=true;break;
        case 'tl_action12': obligatoire=true;break;
        case 'tl_action21': obligatoire=true;break;
        case 'tl_description': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typepersonne':
    case 'typepersonne':
      switch(champs.toLowerCase()){
        case 'tp_numero': obligatoire=true;break;
        case 'tp_type': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typesociete':
    case 'typesociete':
      switch(champs.toLowerCase()){
        case 'ts_numero': obligatoire=true;break;
        case 'ts_libelle': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typesujet':
    case 'typesujet':
      switch(champs.toLowerCase()){
        case 'zu_numero': obligatoire=true;break;
        case 'zu_libelle': obligatoire=true;break;
        case 'zu_notes': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_typetache':
    case 'typetache':
      switch(champs.toLowerCase()){
        case 'th_numero': obligatoire=true;break;
        case 'th_libelle': obligatoire=true;break;
        case 'th_description': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_ville':
    case 'ville':
      switch(champs.toLowerCase()){
        case 'vi_numero': obligatoire=true;break;
        case 'vi_nom': obligatoire=true;break;
        case 'ct_numero': obligatoire=false;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
    case 'table_villecp':
    case 'villecp':
      switch(champs.toLowerCase()){
        case 'vi_numero': obligatoire=true;break;
        case 'cp_numero': obligatoire=true;break;
        case 'created_at': obligatoire=false;break;
        case 'created_by': obligatoire=false;break;
        case 'updated_at': obligatoire=false;break;
        case 'updated_by': obligatoire=false;break;
        case 'lock_version': obligatoire=true;break;
        case 'id': obligatoire=true;break;
        default: obligatoire=false;
      }
      break;
  
    default: 
      obligatoire=false;
      try{obligatoire=gsea_obligatoire(table,champs);}
      catch(e) {obligatoire=false;}
  }
  return obligatoire;
}

/* Renvoie la clé primaire de la table*/
function mcd_getCle(table)
{
  var champs;
  switch(table.toLowerCase()){
      case 'table_acces': 
    case 'acces': champs='AC_Numero';break;
    case 'table_activite': 
    case 'activite': champs='ZA_Numero';break;
    case 'table_adherence': 
    case 'adherence': champs='AH_Numero';break;
    case 'table_adhesion': 
    case 'adhesion': champs='AS_Numero';break;
    case 'table_adresse': 
    case 'adresse': champs='AD_Numero';break;
    case 'table_adresseversion': 
    case 'adresseversion': champs='AW_Numero';break;
    case 'table_agent': 
    case 'agent': champs='AG_Numero';break;
    case 'table_appartienta': 
    case 'appartienta': champs='';break;
    case 'table_appel': 
    case 'appel': champs='AP_Numero';break;
    case 'table_attribut': 
    case 'attribut': champs='AT_Numero';break;
    case 'table_avoir': 
    case 'avoir': champs='AV_Numero';break;
    case 'table_canton': 
    case 'canton': champs='CT_Numero';break;
    case 'table_categorie': 
    case 'categorie': champs='CR_Numero';break;
    case 'table_codepostal': 
    case 'codepostal': champs='CP_Numero';break;
    case 'table_compteaux': 
    case 'compteaux': champs='CA_Numero';break;
    case 'table_comptegen': 
    case 'comptegen': champs='CG_Numero';break;
    case 'table_compteproduit': 
    case 'compteproduit': champs='CI_Numero';break;
    case 'table_constante': 
    case 'constante': champs='CS_Numero';break;
    case 'table_contact': 
    case 'contact': champs='CN_Numero';break;
    case 'table_contacttype': 
    case 'contacttype': champs='CK_Numero';break;
    case 'table_contactversion': 
    case 'contactversion': champs='CW_Numero';break;
    case 'table_cotisation': 
    case 'cotisation': champs='CS_Numero';break;
    case 'table_devis': 
    case 'devis': champs='DE_Numero';break;
    case 'table_droit': 
    case 'droit': champs='DR_Numero';break;
    case 'table_droitprofil': 
    case 'droitprofil': champs='DP_Numero';break;
    case 'table_ecriture': 
    case 'ecriture': champs='EC_Numero';break;
    case 'table_employe': 
    case 'employe': champs='EM_Numero';break;
    case 'table_equipe': 
    case 'equipe': champs='EQ_Numero';break;
    case 'table_estlie': 
    case 'estlie': champs='EL_Numero';break;
    case 'table_estresponsable': 
    case 'estresponsable': champs='PEAC_Numero';break;
    case 'table_evoplus': 
    case 'evoplus': champs='id';break;
    case 'table_exercice': 
    case 'exercice': champs='EX_Numero';break;
    case 'table_facture': 
    case 'facture': champs='FA_Numero';break;
    case 'table_facturereglement': 
    case 'facturereglement': champs='FR_Numero';break;
    case 'table_groupe': 
    case 'groupe': champs='ZG_Numero';break;
    case 'table_groupecanton': 
    case 'groupecanton': champs='GC_Numero';break;
    case 'table_groupetable': 
    case 'groupetable': champs='GT_Numero';break;
    case 'table_impression': 
    case 'impression': champs='IM_Numero';break;
    case 'table_impressiondocument': 
    case 'impressiondocument': champs='ID_Numero';break;
    case 'table_impressiongroupe': 
    case 'impressiongroupe': champs='IG_Numero';break;
    case 'table_impressionlot': 
    case 'impressionlot': champs='IL_Numero';break;
    case 'table_journal': 
    case 'journal': champs='JO_Numero';break;
    case 'table_lettrage': 
    case 'lettrage': champs='LT_Numero';break;
    case 'table_lieu': 
    case 'lieu': champs='ZL_Numero';break;
    case 'table_ligne': 
    case 'ligne': champs='L_Numero';break;
    case 'table_ligneavoir': 
    case 'ligneavoir': champs='LA_Numero';break;
    case 'table_lignefacture': 
    case 'lignefacture': champs='LF_Numero';break;
    case 'table_lignemodele': 
    case 'lignemodele': champs='LM_Numero';break;
    case 'table_listereglement': 
    case 'listereglement': champs='LR_Numero';break;
    case 'table_modereglement': 
    case 'modereglement': champs='MR_Numero';break;
    case 'table_moderepartition': 
    case 'moderepartition': champs='MP_Numero';break;
    case 'table_modele': 
    case 'modele': champs='MO_Numero';break;
    case 'table_naturepersonne': 
    case 'naturepersonne': champs='NP_Numero';break;
    case 'table_nonadherent': 
    case 'nonadherent': champs='NA_Numero';break;
    case 'table_observation': 
    case 'observation': champs='OB_Numero';break;
    case 'table_periode': 
    case 'periode': champs='PO_Numero';break;
    case 'table_periodeadherence': 
    case 'periodeadherence': champs='';break;
    case 'table_personne': 
    case 'personne': champs='PE_Numero';break;
    case 'table_personneupdate': 
    case 'personneupdate': champs='PU_Numero';break;
    case 'table_piece': 
    case 'piece': champs='PI_Numero';break;
    case 'table_pointage': 
    case 'pointage': champs='PT_Numero';break;
    case 'table_prefixe': 
    case 'prefixe': champs='PF_Numero';break;
    case 'table_prix': 
    case 'prix': champs='PX_Numero';break;
    case 'table_produit': 
    case 'produit': champs='PD_Numero';break;
    case 'table_reglement': 
    case 'reglement': champs='RG_Numero';break;
    case 'table_repartition': 
    case 'repartition': champs='RP_Numero';break;
    case 'table_responsabilite': 
    case 'responsabilite': champs='RE_Numero';break;
    case 'table_routage': 
    case 'routage': champs='RO_Numero';break;
    case 'table_sequence': 
    case 'sequence': champs='SQ_Numero';break;
    case 'table_sequencecache': 
    case 'sequencecache': champs='SC_Numero';break;
    case 'table_service': 
    case 'service': champs='SE_Numero';break;
    case 'table_societe': 
    case 'societe': champs='SO_Numero';break;
    case 'table_sujet': 
    case 'sujet': champs='ZS_Numero';break;
    case 'table_tache': 
    case 'tache': champs='ZT_Numero';break;
    case 'table_tva': 
    case 'tva': champs='TV_Numero';break;
    case 'table_typeadresse': 
    case 'typeadresse': champs='AK_Numero';break;
    case 'table_typeattribut': 
    case 'typeattribut': champs='TA_Numero';break;
    case 'table_typejournal': 
    case 'typejournal': champs='TJ_Numero';break;
    case 'table_typelien': 
    case 'typelien': champs='TL_Numero';break;
    case 'table_typepersonne': 
    case 'typepersonne': champs='TP_Numero';break;
    case 'table_typesociete': 
    case 'typesociete': champs='TS_Numero';break;
    case 'table_typesujet': 
    case 'typesujet': champs='ZU_Numero';break;
    case 'table_typetache': 
    case 'typetache': champs='TH_Numero';break;
    case 'table_ville': 
    case 'ville': champs='VI_Numero';break;
    case 'table_villecp': 
    case 'villecp': champs='';break;

    default: return null;
  }
  return champs.toLowerCase();
}


/* Renvoie la séquence de la clé primaire de la table */
function mcd_getSequence(t) {
  var s;
  switch(t.toLowerCase()){
      case 'table_acces': case 'acces': s='seq_acces';break;
    case 'table_activite': case 'activite': s='seq_activite';break;
    case 'table_adherence': case 'adherence': s='seq_adherence';break;
    case 'table_adhesion': case 'adhesion': s='seq_adhesion';break;
    case 'table_adresse': case 'adresse': s='seq_adresse';break;
    case 'table_adresseversion': case 'adresseversion': s='seq_adresseversion';break;
    case 'table_agent': case 'agent': s='seq_agent';break;
    case 'table_appartienta': case 'appartienta': s='#';break;
    case 'table_appel': case 'appel': s='seq_appel';break;
    case 'table_attribut': case 'attribut': s='seq_attribut';break;
    case 'table_avoir': case 'avoir': s='seq_avoir';break;
    case 'table_canton': case 'canton': s='seq_canton';break;
    case 'table_categorie': case 'categorie': s='seq_categorie';break;
    case 'table_codepostal': case 'codepostal': s='seq_codepostal';break;
    case 'table_compteaux': case 'compteaux': s='seq_compteaux';break;
    case 'table_comptegen': case 'comptegen': s='seq_comptegen';break;
    case 'table_compteproduit': case 'compteproduit': s='seq_compteproduit';break;
    case 'table_constante': case 'constante': s='seq_constante';break;
    case 'table_contact': case 'contact': s='seq_contact';break;
    case 'table_contacttype': case 'contacttype': s='seq_contacttype';break;
    case 'table_contactversion': case 'contactversion': s='seq_contactversion';break;
    case 'table_cotisation': case 'cotisation': s='*';break;
    case 'table_devis': case 'devis': s='seq_devis';break;
    case 'table_droit': case 'droit': s='seq_droit';break;
    case 'table_droitprofil': case 'droitprofil': s='seq_droitprofil';break;
    case 'table_ecriture': case 'ecriture': s='seq_ecriture';break;
    case 'table_employe': case 'employe': s='seq_employe';break;
    case 'table_equipe': case 'equipe': s='seq_equipe';break;
    case 'table_estlie': case 'estlie': s='seq_estlie';break;
    case 'table_estresponsable': case 'estresponsable': s='seq_estresponsable';break;
    case 'table_evoplus': case 'evoplus': s='*';break;
    case 'table_exercice': case 'exercice': s='seq_exercice';break;
    case 'table_facture': case 'facture': s='seq_facture';break;
    case 'table_facturereglement': case 'facturereglement': s='seq_facturereglement';break;
    case 'table_groupe': case 'groupe': s='seq_groupe';break;
    case 'table_groupecanton': case 'groupecanton': s='seq_groupecanton';break;
    case 'table_groupetable': case 'groupetable': s='seq_groupetable';break;
    case 'table_impression': case 'impression': s='seq_impression';break;
    case 'table_impressiondocument': case 'impressiondocument': s='*';break;
    case 'table_impressiongroupe': case 'impressiongroupe': s='*';break;
    case 'table_impressionlot': case 'impressionlot': s='*';break;
    case 'table_journal': case 'journal': s='seq_journal';break;
    case 'table_lettrage': case 'lettrage': s='seq_lettrage';break;
    case 'table_lieu': case 'lieu': s='seq_lieu';break;
    case 'table_ligne': case 'ligne': s='seq_ligne';break;
    case 'table_ligneavoir': case 'ligneavoir': s='seq_ligneavoir';break;
    case 'table_lignefacture': case 'lignefacture': s='seq_lignefacture';break;
    case 'table_lignemodele': case 'lignemodele': s='seq_lignemodele';break;
    case 'table_listereglement': case 'listereglement': s='seq_listereglement';break;
    case 'table_modereglement': case 'modereglement': s='seq_modereglement';break;
    case 'table_moderepartition': case 'moderepartition': s='seq_moderepartition';break;
    case 'table_modele': case 'modele': s='seq_modele';break;
    case 'table_naturepersonne': case 'naturepersonne': s='seq_naturepersonne';break;
    case 'table_nonadherent': case 'nonadherent': s='seq_nonadherent';break;
    case 'table_observation': case 'observation': s='seq_observation';break;
    case 'table_periode': case 'periode': s='seq_periode';break;
    case 'table_periodeadherence': case 'periodeadherence': s='#';break;
    case 'table_personne': case 'personne': s='seq_personne';break;
    case 'table_personneupdate': case 'personneupdate': s='seq_personneupdate';break;
    case 'table_piece': case 'piece': s='seq_piece';break;
    case 'table_pointage': case 'pointage': s='seq_pointage';break;
    case 'table_prefixe': case 'prefixe': s='seq_prefixe';break;
    case 'table_prix': case 'prix': s='seq_prix';break;
    case 'table_produit': case 'produit': s='seq_produit';break;
    case 'table_reglement': case 'reglement': s='seq_reglement';break;
    case 'table_repartition': case 'repartition': s='seq_repartition';break;
    case 'table_responsabilite': case 'responsabilite': s='seq_responsabilite';break;
    case 'table_routage': case 'routage': s='seq_routage';break;
    case 'table_sequence': case 'sequence': s='*';break;
    case 'table_sequencecache': case 'sequencecache': s='*';break;
    case 'table_service': case 'service': s='seq_service';break;
    case 'table_societe': case 'societe': s='seq_societe';break;
    case 'table_sujet': case 'sujet': s='seq_sujet';break;
    case 'table_tache': case 'tache': s='seq_tache';break;
    case 'table_tva': case 'tva': s='seq_tva';break;
    case 'table_typeadresse': case 'typeadresse': s='seq_typeadresse';break;
    case 'table_typeattribut': case 'typeattribut': s='seq_typeattribut';break;
    case 'table_typejournal': case 'typejournal': s='seq_typejournal';break;
    case 'table_typelien': case 'typelien': s='seq_typelien';break;
    case 'table_typepersonne': case 'typepersonne': s='seq_typepersonne';break;
    case 'table_typesociete': case 'typesociete': s='seq_typesociete';break;
    case 'table_typesujet': case 'typesujet': s='seq_typesujet';break;
    case 'table_typetache': case 'typetache': s='seq_typetache';break;
    case 'table_ville': case 'ville': s='seq_ville';break;
    case 'table_villecp': case 'villecp': s='#';break;

    default: s = null;
  }
  return s;
}




  