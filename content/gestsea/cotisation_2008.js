function DeleteDataSource(object)
{
  var sources=object.database.GetDataSources();
  var ds;
  while (sources.hasMoreElements()){
    ds=sources.getNext();
    object.database.RemoveDataSource(ds);
  }
}


function find_first(query){
  var result=pgsql_query(query);
  if (result.rowCount<=0)
    return null;
  else {
    var enumr=result.enumerate();
    enumr.first();
    var a = new Array();
    for (var i=0;i<result.columnCount;i++)
      a.push(enumr.getVariant(i));
    return a;
  }
}

function requete(query)
{
  result=pgsql_query(query);
  if (result.rowCount<=0)
    return null;
  else {
    var enumr=result.enumerate();
    enumr.first();
    return enumr.getVariant(0);
  }
}

function find_all(query)
{
  result=pgsql_query(query);
  if (result.rowCount<=0)
    return null;
  else {
    var enumr=result.enumerate();
    enumr.first();
    var a = new Array();
    for (i=0;i<result.rowCount;i++){
      a.push(new Array())
      for (j=0;j<result.columnCount;j++)
        a[i].push(enumr.getVariant(j));
      enumr.next();
    }
    return a;
  }
}

/* ***              D O M             *** */

function elem(id){
  var e = top.document.getElementById(id);
  if (e==null) 
    alert('L\'élément "'+id+'" est introuvable dans le document.');
  return e;
}

function relem(tid,rep){
  var reg = new RegExp("#", "ig");
  return elem(tid.replace(reg, rep));
}

/* Remplit une grille correctement */
/* Renvoie le composant grid */
function grid_fill(object,query){
  var result = pgsql_query(query);
  var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
  var grid = elem(object);
  DeleteDataSource(grid);
  grid.database.AddDataSource(ds);
  grid.builder.rebuild();
  return grid;
}


/* Remplit une liste correctement en concervant la ligne sélectionnée */
/* Renvoie le composant liste */
function listbox_fill(id, query){
  var result = pgsql_query(query);
  var list = elem(id);
  var idx = list.selectedIndex;

  DeleteDataSource(list);
  var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
  list.database.AddDataSource(ds);
  list.builder.rebuild();
  if (result.rowCount>0){
    if (idx<0) list.selectedIndex=0;
    else{
      if (idx>=result.rowCount) list.selectedIndex=result.rowCount-1;
      else list.selectedIndex=idx;
    }
  }
  list.setAttribute("lines",result.rowCount);
  return list;
}



function menulist_fill(id, query, selectedValue){
  var menulist = elem(id);
  var idx      = menulist.selectedIndex;
  var result   = pgsql_query(query);

  DeleteDataSource(menulist);
  if (result.rowCount>0){
    var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
    menulist.database.AddDataSource(ds);
  }
  menulist.builder.rebuild();
  menulist.selectedIndex=0;
  menulist.setAttribute("lines",result.rowCount);
  if (selectedValue!=null) {
    menulist.value = selectedValue;
  }
  return menulist;
}

function checkbox_check(id, value, cond) {
  var c = elem(id);
  var valid = true;
  if (cond==true || cond==false) valid = cond;
  if (valid && c.checked!=value) {
    c.checked = value;
    c.doCommand();
  }
  return c;
}



elem("wg-status-text").label = 'Library';


/*
********************************************************************************
********************************************************************************
********************************************************************************
********************************************************************************
********************************************************************************
*/

var PROD_COT_EXPLOITANT      = 500000052;
var PROD_COT_BAILLEUR        = 500000053;
var PROD_COT_ANCIEN          = 500000054;
var PROD_COT_BAILLEUR_ANCIEN = 500000124;
var PROD_COT_CONJOINT_ANCIEN = 500000;
var PROD_COT_ASSOCIE         = 500000;

var PROD_COT   = new Array(PROD_COT_EXPLOITANT, PROD_COT_BAILLEUR, PROD_COT_ANCIEN, PROD_COT_BAILLEUR_ANCIEN, 0);
var PROD_HECT  = new Array(500000055, 500000056, 500000057, 500000058, 500000059, 500000060, 500000144, 0);
var PROD_CONJ  = new Array(500000150, 0);
var PROD_ASSO  = new Array(500000162, 0);
var PROD_SACEA = new Array(500000036, 500000065, 500000069, 0);
var PROD_AAVA  = new Array(500000096, 0);

var CONTACTTYPES = new Array(107,105,106,104,108);

elem("wg-status-text").label = 'Constantes';


var num_service;
var num_employe;

function jeTravaillePour(abbrev)
{
  var query="UPDATE employe SET em_service=se_numero FROM service JOIN societe ON (se_societe=so_numero) where so_abbrev='"+abbrev+"' and em_login=CURRENT_USER;";
  pgsql_update(query);
}

function current_value(id) {
  var menulist = elem(id);
  if (menulist.selectedIndex>-1) return menulist.selectedItem.value;
  else return null;
}

/* Retourne le numéro de la personne en cours */
function current_personne(){
  return current_value("wg-personne-menulist");
}

/* Retourne le numéro de la societe en cours */
function current_societe(){
  if (elem("wg-societe-checkbox").checked)
    return current_value("wg-societe-menulist");
  else return null;
}

/* Retourne le numéro de la conjoint en cours */
function current_conjoint(){
  if (elem("wg-conjoint-checkbox").checked)
    return current_value("wg-conjoint-menulist");
  else return null;
}

/* Retourne le numéro de la conjoint en cours */
function current_associe(){
  if (elem("wg-associe-checkbox").checked)
    return current_value("wg-associe-menulist");
  else return null;
}

/* Retourne le numéro du responsable en cours */
function current_responsable(){
  return current_value("wg-cotisation-responsable-menulist");
}

function current_year(variation){
	if (isNaN(variation))	variation = 0;
  return requete("SELECT EXTRACT(YEAR FROM CURRENT_DATE)::integer+("+variation+");");
}

/* Retourne l'année en cours avec une variation potentielle */
function current_annee(variation){
	if (isNaN(variation))	variation = 0;
  var annee = elem("wg-cotisation-annee-menulist").value*1+variation*1;
  return annee+'';
}

elem("wg-status-text").label = 'Fonctions env';


/* Fonction de chargement */
function wg_onload() {

  pgsql_init(true);
  if (!pgsql_getConnectionState()){
    window.close();
    return false;
  }
  
  num_employe=requete("SELECT em_numero FROM employe  WHERE em_login=current_user;");
  num_service=requete("SELECT em_service FROM employe WHERE em_login=current_user;");

  // Responsables
  menulist_fill("wg-cotisation-responsable-menulist", "SELECT em_libelle, em_numero FROM employe join service on (em_service=se_numero) WHERE em_reglement and se_societe = 2");

  // Années
  menulist_fill("wg-cotisation-annee-menulist", "SELECT 'Année '||fc_sequence AS an_libelle, fc_sequence AS an_numero FROM FC_Sequence((EXTRACT(YEAR FROM CURRENT_DATE)-2)::integer,(EXTRACT(YEAR FROM CURRENT_DATE)+0)::integer);",current_year());

  // Formes juridiques
  menulist_fill("wg-societe-titre", "SELECT np_libelle, np_numero FROM naturepersonne WHERE np_morale ORDER BY 1 ;");
  
  jeTravaillePour('FDS');
  // Mode de reglements
  menulist_fill('wg-reglement-mode', "SELECT mr_libelle, mr_numero FROM modereglement WHERE mr_actif ORDER BY 1;");
  
  // Cotisations principales  
  grid_fill("wg-cotisation-radiogroup","SELECT INITCAP(TRIM(SUBSTR(pd_libelle,POSITION(']' IN pd_libelle)+12))) AS px_libelle, px_tarifttc::float, pd_numero FROM produit LEFT JOIN prix using (pd_numero) WHERE px_Actif AND PD_Numero IN ("+PROD_COT.join(',')+");");
  elem('wg-cotisation-radiogroup').selectedIndex = 0;
  wg_cotisation_select();
  // Cotisations à l'hectare
  grid_fill("wg-hectare-rows", "SELECT SUBSTR(INITCAP(TRIM(SUBSTR(pd_libelle,POSITION(']' IN pd_libelle)+1))),1,20) AS pd_libelle, px_tarifttc as pd_tarif, pd_numero FROM produit LEFT JOIN prix using (pd_numero) WHERE px_Actif AND PD_Numero IN ("+PROD_HECT.join(',')+") ORDER BY pd_numero ASC;");
  // Tarifs conjoint
  grid_fill("wg-conjoint-radiogroup", "SELECT px_tarifttc::float||'€ - '||pd_titre AS px_libelle, px_tarifttc, pd_numero FROM produit LEFT JOIN prix using (pd_numero) WHERE px_Actif AND pd_numero IN ("+PROD_CONJ.join(',')+") ORDER BY px_tarifttc;");
  elem('wg-conjoint-radiogroup').selectedIndex = 0;
  // Tarifs associe
  grid_fill("wg-associe-radiogroup", "SELECT px_tarifttc::float||'€ - '||pd_titre AS px_libelle, px_tarifttc, pd_numero FROM produit LEFT JOIN prix using (pd_numero) WHERE px_Actif AND pd_numero IN ("+PROD_ASSO.join(',')+") ORDER BY px_tarifttc;");
  elem('wg-associe-radiogroup').selectedIndex = 0;


  // AAVA
  jeTravaillePour('AAV');
  grid_fill("wg-journal-radiogroup", "SELECT px_tarifttc::float||'€ - '||pd_titre AS px_libelle, px_tarifttc, pd_numero FROM produit LEFT JOIN prix using (pd_numero) WHERE px_Actif AND pd_numero IN ("+PROD_AAVA.join(',')+") ORDER BY px_tarifttc;").selectedIndex = 0;
  
  // SACEA
  jeTravaillePour('SAC');
  grid_fill('wg-conseil-radiogroup', "SELECT px_tarifttc::float||'€ - '||pd_titre AS px_libelle, px_tarifttc, pd_numero FROM produit LEFT JOIN prix using (pd_numero) WHERE px_Actif AND pd_numero IN ("+PROD_SACEA.join(',')+") ORDER BY px_tarifttc;").selectedIndex = 0;

  // Retablissement
  pgsql_update("UPDATE employe SET em_service="+num_service+" WHERE em_numero="+num_employe+";");

  // Reglement
  checkbox_check("wg-reglement-nouveau-checkbox",true);

  wg_totalize();
  return true;
}

function wg_onclose() {
  return confirm("Voulez-vous réellement quitter le logiciel ?");
}

elem("wg-status-text").label = 'Fonctions Event';

/*
function wg_build_associates(count) {
  grid_fill("wg-associates-box","SELECT fc_sequence AS xx_numero FROM FC_Sequence(1,"+count+");");
  var nodelist = top.document.getElementsByTagName('checkbox');
  var i,node;
  for(i=0;i<nodelist.length;i++) {
    node = nodelist.item(i);
    if (node.getAttribute('associate')=='true') {
      node.doCommand();
      node.doCommand();
    }
  }
}
*/

function wg_cotisation_select() {
  var cotisation=elem("wg-cotisation-radiogroup").value;
  if (cotisation == PROD_COT_BAILLEUR) {
/*
    elem("wg-hectare-groupbox").hidden  = true;
    elem("wg-hectare-checkbox").checked = false;
*/
    elem("wg-conjoint-groupbox").hidden  = true;
    elem("wg-conjoint-checkbox").checked = false;
  } else if (cotisation == PROD_COT_ANCIEN) {
/*
    elem("wg-hectare-groupbox").hidden  = true;
    elem("wg-hectare-checkbox").checked = false;
*/
    elem("wg-conjoint-groupbox").hidden  = false;
  } else if (cotisation == PROD_COT_BAILLEUR_ANCIEN) {
/*
    elem("wg-hectare-groupbox").hidden  = true;
    elem("wg-hectare-checkbox").checked = false;
*/
    elem("wg-conjoint-groupbox").hidden  = false;
  } else if (cotisation == PROD_COT_EXPLOITANT) {
/*
    elem("wg-hectare-groupbox").hidden  = false;
*/
    elem("wg-conjoint-groupbox").hidden  = true;
    elem("wg-conjoint-checkbox").checked = false;
  }
}

elem("wg-status-text").label = 'Fonctions Complémentaires';

/* Remplit la liste des personnes */
function wg_personne_search(){
  var queryend = "FROM personne join naturepersonne using (np_numero) WHERE pe_description ILIKE REPLACE('%"+elem('wg-personne-menulist').value+"%',' ','%') AND NOT np_morale AND pe_numero NOT IN (SELECT el_personne1 from estlie where tl_numero=1006)";
  var query;
  if (requete("SELECT count(*) "+queryend)==0)
    query = "SELECT 'Pas de résultats pour la recherche' AS pe_description, 0 AS pe_numero;";
  else
    query = "SELECT pe_description, pe_numero "+queryend+" ORDER BY pe_nom";
  menulist_fill('wg-personne-menulist',query);
}

/* Charge tous les éléments relatifs à la personne en cours */
function wg_personne_load(){
  // Fiche
  var num_personne = wg_entity_load('personne');
  // Conjoint
  if (num_personne!=null) {
    if (elem('wg-personne-titre').value==21) elem('wg-conjoint-titre').value = 25;
    else elem('wg-conjoint-titre').value = 23;
  }
  // Société
  menulist_fill("wg-societe-menulist", "SELECT pe_description, pe_numero FROM estlie join personne on (pe_numero=el_personne2) WHERE tl_numero=1003 AND el_personne1="+num_personne);
  wg_societe_load();
  // Associes
  checkbox_check('wg-associe-checkbox', false);
  return num_personne;
}


/* Remplit la liste des societes */
function wg_societe_search(){
  var queryend = "FROM personne join table_naturepersonne using (np_numero) WHERE pe_description ILIKE REPLACE('%"+elem('wg-societe-menulist').value+"%',' ','%') AND np_morale";
  var query;
  if (requete("SELECT count(*) "+queryend)==0)
    query = "SELECT 'Pas de résultats pour la recherche' AS pe_description, 0 AS pe_numero;";
  else
    query = "SELECT pe_description, pe_numero "+queryend+" ORDER BY pe_nom;";
  menulist_fill('wg-societe-menulist',query);
}


function wg_societe_load() {
//  alert(elem("wg-societe-menulist").selectedIndex);
  if (elem("wg-societe-menulist").selectedIndex>=0) 
    checkbox_check("wg-societe-checkbox", true);
  // Fiche
  var num_societe = wg_entity_load('societe');
  // Conjoint
  if (num_societe!=null) {
    checkbox_check('wg-societe-checkbox', true);
  }
  // Associes
  wg_associe_list();
//  checkbox_check('wg-associe-checkbox', true);
  
  return num_societe;
}



function wg_personne_duplicate() {
  // Adresse
  elem("wg-personne-adresse").value = "";
  for (x=2;x<6;x++)
    elem("wg-personne-ligne"+x).value = elem("wg-societe-ligne"+x).value;
  elem("wg-personne-cp").value = elem("wg-societe-cp").value;
  wg_load_cities("wg-personne-ville", elem("wg-societe-cp").value, elem("wg-societe-ville").value);
  // Contacts
  for (x=0;x<CONTACTTYPES.length;x++) {
    elem("wg-personne-contact"+x).setAttribute("number","");
    elem("wg-personne-contact"+x).value = elem("wg-societe-contact"+x).value;
  }
}


function wg_journal_load_adresses() {
  var num_personne = (elem('wg-journal-societe-checkbox').checked) ? current_societe() : current_personne() ;
  grid_fill("wg-journal-adresses","SELECT ad_numero, ad_libelle FROM adresse WHERE ad_active AND pe_numero="+num_personne+";").selectedIndex = 0;

}



function wg_cotisation_load(personne, annee) {
  var c;
  elem("wg-reglement-date").value = '01/01/2008';
  elem("wg-reglement-banque").value = '';
  elem("wg-reglement-compte").value = '';
  elem("wg-reglement-mode").selectedIndex = 0;
  elem("wg-reglement-cheque").value = '';
  var rows = elem("wg-hectare-rows");
  for (var i=1;i<rows.childNodes.length;i++)
    rows.childNodes[i].childNodes[0].checked = false;


  // FDSEA
  var facture = requete("SELECT fa_numero FROM table_lignefacture JOIN table_facture USING (fa_numero) WHERE so_numero=2 AND PE_Numero="+personne+" AND EXTRACT(YEAR FROM FA_Date)="+annee+" AND PD_Numero IN ("+PROD_COT.join(',')+");");
  if (facture!=null) {

    var reg = requete("SELECT rg_numero FROM table_facturereglement WHERE fa_numero="+facture+";");
    if (reg!=null) {
      var reglement = find_first("SELECT pe_numero, rg_libellebanque, rg_numerocompte, mr_numero FROM table_reglement WHERE rg_numero="+reg+";");
      if (reglement!=null) {
        
        c = checkbox_check('wg-reglement-nouveau-checkbox',true);
/*
        if (reglement[0]!=personne) elem("wg-reglement-nouveau-checkbox").checked = false;
        else elem("wg-reglement-nouveau-checkbox").checked = true;
*/
        if (c.checked) {
          elem("wg-reglement-banque").value = reglement[1];
          elem("wg-reglement-compte").value = reglement[2];
          elem("wg-reglement-mode").value   = reglement[3];
        }
      }
    }

    var cotisation = requete("SELECT pd_numero FROM table_lignefacture WHERE fa_numero="+facture+" AND pd_numero IN ("+PROD_COT.join(',')+");");
    if (cotisation!=null) {
      elem("wg-cotisation-radiogroup").value = cotisation;
      elem("wg-cotisation-radiogroup").doCommand();
    }

    if (cotisation == PROD_COT_EXPLOITANT) { }
    if (cotisation == PROD_COT_BAILLEUR_ANCIEN || cotisation == PROD_COT_ANCIEN) {  }
  }

  // SACEA
  facture = requete("SELECT fa_numero FROM table_lignefacture JOIN table_facture USING (fa_numero) WHERE so_numero=1 AND PE_Numero="+personne+" AND EXTRACT(YEAR FROM FA_Date)="+annee+" AND PD_Numero IN ("+PROD_SACEA.join(',')+");");
  if (facture!=null) {
    var produit = requete("SELECT pd_numero FROM table_lignefacture WHERE fa_numero="+facture+" AND pd_numero IN ("+PROD_SACEA.join(',')+");");
    if (produit!=null) {
      elem("wg-conseil-radiogroup").value = produit;
      elem("wg-conseil-radiogroup").doCommand();
    }
  }

  // AAVA
  facture = requete("SELECT fa_numero FROM table_lignefacture JOIN table_facture USING (fa_numero) WHERE so_numero=1 AND PE_Numero="+personne+" AND EXTRACT(YEAR FROM FA_Date)="+annee+" AND PD_Numero IN ("+PROD_AAVA.join(',')+");");
  if (facture!=null) {
    var produit = requete("SELECT pd_numero FROM table_lignefacture WHERE fa_numero="+facture+" AND pd_numero IN ("+PROD_AAVA.join(',')+");");
    if (produit!=null) {
      elem("wg-journal-radiogroup").value = produit;
      elem("wg-journal-radiogroup").doCommand();
    }
  }
  wg_totalize();
}


function wg_load_cities(id, cp, city) {
  if (cp=='' || cp==null || cp==undefined || isNaN(cp)) cp = 0;
  menulist_fill(id, "SELECT vi_nom, vi_numero FROM table_codepostal join table_villecp  using (cp_numero) join table_ville using (vi_numero) WHERE cp_codepostal='"+cp+"' ORDER BY 1", city);
}




function wg_reglement_search(){
  var sw=elem('wg-reglement-menulist').value;
  var query="SELECT 'N°'||rg_numero||' : '||rg_montant||'€ payés le '||rg_date||' par '||pe_nom||' (N°'||pe_numero-1000000||')' AS rg_libelle, rg_numero from table_reglement join table_personne using (pe_numero) where so_numero=2 AND (rg_numero like '"+sw+"' OR pe_numero-1000000 like '"+sw+"' OR pe_nom ilike '%'||REPLACE('"+sw+"',' ','%')||'%');";
  menulist_fill("wg-reglement-menulist",query);
}

function wg_reglement_load(){
  var menulist = elem("wg-reglement-menulist");
  if (menulist.selectedIndex>-1) {
    elem("wg-reglement-tiersreglement-detail").value = requete("SELECT 'N°'||rg_numero||' : '||rg_montant||'€ payés le '||rg_date||' par '||pe_nom||COALESCE(' '||pe_prenom,'')||' (N°'||pe_numero-1000000||')' FROM table_reglement join personne USING (pe_numero) WHERE rg_numero="+menulist.selectedItem.value);
    elem("wg-reglement-tiersreglement-adresse").value = requete("SELECT COALESCE(ad_libelle,'') FROM table_reglement left join adresse USING (pe_numero) WHERE rg_numero="+menulist.selectedItem.value);
  } else elem("wg-reglement-tiersreglement-detail").value = "";
}


function wg_regsupp_search(){
  var sw=elem('wg-regsupp-menulist').value;
  var query="SELECT 'N°'||rg_numero||' : '||rg_montant||'€ payés le '||rg_date||' par '||pe_nom||' (N°'||pe_numero-1000000||')' AS rg_libelle, rg_numero from table_reglement join table_personne using (pe_numero) where so_numero=2 AND (rg_numero like '"+sw+"' OR pe_numero-1000000 like '"+sw+"' OR pe_nom ilike '%'||REPLACE('"+sw+"',' ','%')||'%');";
  menulist_fill("wg-regsupp-menulist",query);
}

function wg_regsupp_load(){
//  var menulist = elem("wg-regsupp-menulist");
}



function wg_conjoint_search(){
  var query;
  var word = elem('wg-conjoint-menulist').value;
  var queryend = "FROM personne WHERE pe_description ILIKE REPLACE('%"+word+"%',' ','%') AND pe_nom ilike '"+elem("wg-personne-nom").value+"'  AND np_numero IN (21,23,25)";
  if (requete("SELECT count(*) "+queryend)==0)
    queryend = "FROM personne WHERE pe_description ILIKE REPLACE('%"+word+"%',' ','%') AND np_numero IN (21,23,25)";
  if (requete("SELECT count(*) "+queryend)==0) {
    elem("wg-conjoint-prenom").value = word;
    elem("wg-conjoint-nom").value = "";
    elem("wg-conjoint-nouveau-checkbox").checked = true;
    query = "SELECT 'Pas de résultats pour la recherche' AS pe_description, 0 AS pe_numero;";
  } else {
    query = "SELECT pe_description, pe_numero "+queryend+" ORDER BY pe_prenom";
  }
  menulist_fill('wg-conjoint-menulist',query);
}

function wg_conjoint_load(){
  var menulist = elem("wg-conjoint-menulist");
  if (menulist.selectedIndex>-1) {
    if (menulist.selectedItem.value!=0) {
      var personne = find_first("SELECT np_numero, pe_prenom, pe_nom FROM personne WHERE pe_numero="+menulist.selectedItem.value);
      if (personne[0]==21 || personne[0]==23 || personne[0]==25) {
        elem('wg-conjoint-extitre').value = '';
        elem('wg-conjoint-titre').value  = personne[0];
      } else {
        elem('wg-conjoint-extitre').value = requete("SELECT np_abrev||' ['||np_numero||']' FROM naturepersonne WHERE np_numero="+personne[0]);
        elem('wg-conjoint-titre').selectedIndex = -1;
      }
      elem("wg-conjoint-prenom").value = personne[1];
      elem("wg-conjoint-nom").value = personne[2];
      elem("wg-conjoint-nouveau-checkbox").checked = false;
    }
  }
}

/* Associé */

function wg_associe_check() {
/*
  if (elem('wg-associe-checkbox').checked) {
    if (!elem('wg-societe-checkbox').checked) {
      alert('Une société doit être déclarée pour pouvoir enregistrer les associés qui la gèrent.')
      elem('wg-associe-checkbox').checked = false;
      return false;
    }
    if (!elem('wg-societe-nouveau-checkbox').checked && elem('wg-societe-menulist').selectedIndex<0) {
      alert('La société doit être renseignée pour pouvoir enregistrer les associés qui la gèrent.')
      elem('wg-associe-checkbox').checked = false;
      return false;
    }
    if (elem('wg-societe-nouveau-checkbox').checked || elem('wg-personne-nouveau-checkbox').checked) {
      wg_send_cotisation(false);
    }
    elem('wg-associe-list').hidden=false;
    wg_associe_list();
  }
*/

    if (elem('wg-societe-nouveau-checkbox').checked || elem('wg-personne-nouveau-checkbox').checked) {
      wg_send_cotisation(false);
    }
    elem('wg-associe-list').hidden=!elem('wg-associe-checkbox').checked;
    wg_associe_list();

//  wg_totalize();
  return true;
}

function wg_associe_list() {
  if (!elem('wg-associe-list').hidden) {
    listbox_fill('wg-associe-listbox',"SELECT pe_description||' ['||el_personne2-1000000||']' AS pe_description, pe_numero, el_numero FROM estlie join personne on (el_personne1=pe_numero) WHERE (el_personne1!="+current_personne()+" AND el_personne2="+current_societe()+" AND tl_numero=1003) OR (el_personne2="+current_personne()+" AND tl_numero=1007)");
    wg_totalize();
  }
}

/* Remplit la liste des personnes */
function wg_associe_search(){
  var queryend = "FROM personne join naturepersonne using (np_numero) WHERE pe_description ILIKE REPLACE('%"+elem('wg-associe-menulist').value+"%',' ','%') AND NOT np_morale AND pe_numero NOT IN (SELECT el_personne1 from estlie where tl_numero=1006)";
  var query;
  if (requete("SELECT count(*) "+queryend)==0)
    query = "SELECT 'Pas de résultats pour la recherche' AS pe_description, 0 AS pe_numero;";
  else
    query = "SELECT pe_description, pe_numero "+queryend+" ORDER BY pe_nom";
  return menulist_fill('wg-associe-menulist',query);
}

/* Charge tous les éléments relatifs à la personne en cours */
function wg_associe_load(){
  return wg_entity_load('associe');
}

var gAssocieMode='SELECT';

function wg_associe_add() {
  elem('wg-associe-menulist').removeAllItems();
  wg_entity_load('associe');
  elem('wg-associe').hidden=false;
  elem('wg-associe-update-buttons').hidden=!elem('wg-associe').hidden;
  gAssocieMode = 'INSERT';
  return gAssocieMode;
}

function wg_associe_edit() {
  if (elem('wg-associe-listbox').selectedIndex<0) {
    alert('Vous devez sélectionner une personne de la liste pour pouvoir la modifier');
    return false;
  }
  var num_personne = elem('wg-associe-listbox').selectedItem.firstChild.getAttribute("numero");
  menulist_fill('wg-associe-menulist','SELECT pe_description,pe_numero FROM personne WHERE pe_numero='+num_personne+';');
  wg_entity_load('associe');
  elem('wg-associe').hidden=false;
  elem('wg-associe-update-buttons').hidden=!elem('wg-associe').hidden;
  elem('wg-associe-menulist').hidden=!elem('wg-associe').hidden;
  elem('wg-associe-nouveau-checkbox').hidden=!elem('wg-associe').hidden;
  gAssocieMode = 'UPDATE';
  return gAssocieMode;
}

function wg_associe_remove() {
//  var num_societe = current_societe();
/*
  if (num_societe==null) {
    alert("Pas de société => pas d'associés!");
    return null;
  }
*/
  if (elem('wg-associe-listbox').selectedIndex<0) {
    alert('Vous devez sélectionner une personne de la liste pour pouvoir la modifier');
    return false;
  }
  if (confirm('Vous voulez vraiment enlever le lien ?')) {
    if (confirm("Vraiment vraiment ? C'est quand même très bizarre...")) {
      num_lien = elem('wg-associe-listbox').selectedItem.firstChild.getAttribute("lien");
      query = "DELETE FROM estlie WHERE el_numero="+num_lien;
      pgsql_update(query);
      wg_associe_list();
    }
  }
  return true;
}

function wg_associe_validate() {
  var num_associe = wg_entity_save('associe', true);
  var num_societe = current_societe();
  var num_personne = current_personne();
/*
  if (num_societe==null) {
    alert("Pas de société => pas d'associés !");
    return null;
  }
*/
  // Création/Mise à jour du lien Mise à jour du total
  if (num_associe!=null) {
    var typelien=1003;
    var num_ref = num_societe;
    if (num_societe==null) {
      typelien=1007;
      num_ref = num_personne;
    }
    var count = requete("SELECT el_numero FROM estlie WHERE el_personne1="+num_associe+" AND el_personne2="+num_ref+" AND tl_numero="+typelien);
    if (count==null) {
      query = "INSERT INTO estlie (el_personne1, el_personne2, tl_numero, el_debut) VALUES("+num_associe+","+num_ref+","+typelien+", CURRENT_TIMESTAMP);";
      pgsql_update(query);
    }
    wg_associe_cancel();
    wg_associe_list();
  }
  return num_associe;
}

function wg_associe_cancel() {
  elem('wg-associe').hidden=true;
  elem('wg-associe-update-buttons').hidden=!elem('wg-associe').hidden;
  elem('wg-associe-menulist').hidden=!elem('wg-associe').hidden;
  elem('wg-associe-nouveau-checkbox').hidden=!elem('wg-associe').hidden;
  gAssocieMode = 'SELECT';
  return gAssocieMode;  
}






/* Routage */
function wg_routage_load_history(complement) {
  var prefix = (complement==null) ? "" : "wg-"+complement+"-";
  var personne;
  switch (complement) {
    case "personne": personne = current_personne(); break;
    case "societe": personne = current_societe(); break;
    case "associe": personne = current_associe(); break;
    default: alert("RO34 : Gros problème interne. Prévenir Brice!"); return null; break;
  }
  menulist_fill(prefix+'routage-menulist',"SELECT ro_libelle, ro_numero FROM routage WHERE pe_numero="+personne+" ORDER BY 1 DESC");
  wg_routage_load_current(complement);
  return null;
}

function wg_routage_load_current(complement) {
  var prefix = (complement==null) ? "" : "wg-"+complement+"-";
  elem(prefix+'routage-update').disabled = true;
  elem(prefix+'routage-numero').value = "";
  elem(prefix+'routage-debut').value  = "";
  elem(prefix+'routage-fin').value    = "";
  if (elem(prefix+'routage-menulist').selectedIndex>-1) {
    var routage = elem(prefix+'routage-menulist').selectedItem.value;
    if (routage>0) {
      elem(prefix+'routage-numero').value = routage;
      elem(prefix+'routage-debut').value = requete("SELECT ro_debutservice FROM routage WHERE ro_numero="+routage);
      elem(prefix+'routage-fin').value   = requete("SELECT ro_finservice FROM routage WHERE ro_numero="+routage);
      elem(prefix+'routage-update').disabled = false;
    }
  }
}

function wg_routage_update_current(complement) {
  var prefix = (complement==null) ? "" : "wg-"+complement+"-";
  if (elem(prefix+'routage-numero').value>0) {
    var query = "UPDATE routage SET ro_debutservice="+elem(prefix+'routage-debut').value+", ro_finservice="+elem(prefix+'routage-fin').value+" WHERE ro_numero="+elem(prefix+'routage-numero').value+";";
    pgsql_update(query);
    wg_routage_load_history(complement);
  } else {
    alert("Il faut sélectionner un routage à modifier");
  }
}

elem("wg-status-text").label = 'Fonctions Load';


function arrondi(x) {
  return Math.round(100*x)/100;
}

/* Calcule tous les totaux */
function wg_totalize(){
//  return false;
  var i,somme=0;
  var total=0;
  // Cotisation forfaitaire
  somme = elem('wg-cotisation-radiogroup').selectedItem.getAttribute("tarif");
  elem('wg-cotisation-total').value = somme;
  total += 1*somme;

  // Cotisations à l'hectare
  somme = 0;
  var rows=elem("wg-hectare-rows");
  var row;
  for (i=1;i<rows.childNodes.length;i++){
    row = rows.childNodes[i];
    if (row.childNodes[0].checked) {
      row.childNodes[2].value = 1*arrondi(row.childNodes[1].value*row.childNodes[1].getAttribute("tarif"));
      if (elem("wg-hectare-checkbox").checked)
        somme += 1*row.childNodes[2].value;
    } else {
      row.childNodes[2].value = 0;
    }
  }
  somme = arrondi(somme);
  elem("wg-hectare-total").value = somme;
  total += 1*somme;

  // Cotisation conjoint
  somme = 0;
  if (elem("wg-conjoint-checkbox").checked)
    somme = 1*elem("wg-conjoint-radiogroup").selectedItem.getAttribute("tarif");
  elem('wg-conjoint-total').value = somme;
  total += 1*somme;

  // Cotisations associés
  somme = 0;
  var quantite = 0, qt=0;
  var listbox = elem("wg-associe-listbox");
  for (i=1;i<listbox.childNodes.length;i++){
    if (listbox.childNodes[i].firstChild) {
      qt += 1;
      if (listbox.childNodes[i].firstChild.checked && elem("wg-associe-checkbox").checked) {
        quantite += 1;
        somme += 1*elem("wg-associe-radiogroup").selectedItem.getAttribute("tarif")+0;
      }
    }
  }
  somme = arrondi(somme);
  elem("wg-associe-nombre").value = quantite;
  elem("wg-associe-total").value = 1*somme;
  elem("wg-associe-tab").label = "Associés ("+quantite+"/"+qt+") "+somme+"€";
  total += 1*somme;

  // Abonnement SACEA
  somme = 0;
  if (elem("wg-conseil-checkbox").checked)
    somme = 1*elem("wg-conseil-radiogroup").selectedItem.getAttribute("tarif");
  elem('wg-conseil-total').value = somme;
  total += 1*somme;

  // Abonnement AAVA
  somme = 0;
  if (elem("wg-journal-checkbox").checked)
    somme = 1*elem('wg-journal-nbex').value*elem("wg-journal-radiogroup").selectedItem.getAttribute("tarif");
  elem('wg-journal-total').value = somme;
  total += 1*somme;

  // Associés

  total = arrondi(total);

  if (1*elem("wg-reglement-montant").value==0 || elem("wg-reglement-montant").value==elem("wg-total").value)
    elem("wg-reglement-montant").value=total;
  elem("wg-total").value=total;
}

elem("wg-status-text").label = 'Fonctions total';















function wg_entity_load(complement, only_clean) {
  var prefix = (complement==null) ? "wg-" : "wg-"+complement+"-";
  elem(prefix+'extitre').value = '';
  elem(prefix+'titre').selectedIndex = 0;
  elem(prefix+'nom').value     = '';
  elem(prefix+'prenom').value  = '';
  elem(prefix+"adresse").value = '';
  for (var x=2;x<6;x++)
    elem(prefix+"ligne"+x).value = '';
  elem(prefix+"cp").value = '';
  wg_load_cities(prefix+"ville",'');
  for (x=0;x<CONTACTTYPES.length;x++) {
    elem(prefix+"contact"+x).setAttribute("number",'');
    elem(prefix+"contact"+x).value = '';
  }

  if (only_clean==true) return null;

  var num_entity;
  var morale;
  switch (complement) {
    case "societe" : num_entity = current_societe(); morale='true'; break;
    case "personne" : num_entity = current_personne(); morale='false'; break;
    case "associe" : num_entity = current_associe(); morale='false'; break;
    default : alert("Type de fiche inconnu ("+complement+")! Prévenir Brice!"); break;
  }
  if (num_entity==null) return null;

  // Nom
  var nom = find_first("SELECT np_numero, pe_nom, COALESCE(pe_prenom,''), np_morale::text FROM personne join naturepersonne using (np_numero) WHERE pe_numero="+num_entity);
  if (nom[3]==morale) {
    elem(prefix+'extitre').value = '';
    elem(prefix+'titre').value  = nom[0];
/*
    if (elem(prefix+'titre').value==21) elem('wg-conjoint-titre').value = 25;
    else elem('wg-conjoint-titre').value = 23;
*/
  } else {
    elem(prefix+'extitre').value = requete("SELECT np_abrev||' ['||np_numero||']' FROM naturepersonne WHERE np_numero="+nom[0]);
    elem(prefix+'titre').selectedIndex = -1;
  }
  elem(prefix+'nom').value    = nom[1];
  elem(prefix+'prenom').value = nom[2];
  // Adresse
  var adresse = find_first("SELECT ad_numero, pe_numero, COALESCE(ad_ligne2,''), COALESCE(ad_ligne3,''), COALESCE(ad_ligne4, ''), COALESCE(ad_ligne5, ''), cp_numero, cp_codepostal, vi_numero FROM adresse join codepostal using (cp_numero) WHERE pe_numero="+num_entity);
  if (adresse!=null) {
    elem(prefix+"adresse").value = adresse[0];
    for (x=2;x<6;x++)
      elem(prefix+"ligne"+x).value = adresse[x];
    elem(prefix+"cp").value = adresse[7];
    wg_load_cities(prefix+"ville",adresse[7],adresse[8]);
  }
  // Contacts
  var contact;
  for (x=0;x<CONTACTTYPES.length;x++) {
    contact = find_first("SELECT cn_numero, COALESCE(cn_coordonnee) FROM contact WHERE pe_numero="+num_entity+" AND ck_numero="+CONTACTTYPES[x]);
    if (contact!=null) {
      elem(prefix+"contact"+x).setAttribute("number",contact[0]);
      elem(prefix+"contact"+x).value = contact[1];
    } else {
      elem(prefix+"contact"+x).setAttribute("number","");
      elem(prefix+"contact"+x).value = "";
    }
  }
  // Routages
  wg_routage_load_history(complement);
  if (complement!="associe") {
    // Cotisation 
	  wg_cotisation_load(num_entity, current_annee(-1));
    // Avenir Aquitain
    wg_journal_load_adresses();
  }
  return num_entity;
}









function wg_entity_save(complement, validate) {
  var prefix = (complement==null) ? "wg-" : "wg-"+complement+"-";
  var num_entity;
  var morale = false;
  switch (complement) {
    case "societe" : num_entity = current_societe(); morale = true; break;
    case "personne" : num_entity = current_personne(); break;
    case "associe" : num_entity = current_associe(); break;
    default : alert("Type de fiche inconnu ("+complement+")! Prévenir Brice!"); break;
  }
  if (validate==true) {
    var valide = true;
    var erreurs = "Il y a des erreurs ("+complement+"):\n";
    if (!elem(prefix+"nouveau-checkbox").checked && (num_entity<=0 || num_entity==null)) {
      erreurs += wg_error("Il faut choisir un(e) "+complement+" de la liste");
      valide = false;
    }
    if (elem(prefix+"nom").value.length<2) {
      erreurs += wg_error("Il faut saisir le nom");
      valide = false;
    }
    if (morale && elem(prefix+"prenom").value.length>0) {
      erreurs += wg_error("Il ne faut pas saisir de prenom pour la société. Dans le cas où celui-ci est renseigné, il faut le déplacer soit dans le nom soit dans le destinataire de l'adresse");
      valide = false;
    }
    if (!morale && elem(prefix+"prenom").value.length<2) {
      erreurs += wg_error("Il faut saisir le nom");
      valide = false;
    }
    if (elem(prefix+"titre").selectedIndex<0) {
      erreurs += wg_error("Il faut sélectionner un titre");
      valide = false;
    }
    if (elem(prefix+"ville").selectedIndex<0) {
      erreurs += wg_error("Il faut choisir un code postal valide et une ville pour l'adresse");
      valide = false;
    }
    if (morale && !elem(prefix+"nouveau-checkbox").checked && elem(prefix+"titre").getAttribute("morale")=='false') {
      erreurs += wg_error("Il faut choisir une société qui ne soit pas un monsieur, une madame ou une mademoiselle.");
      valide = false;
    }
	  if (elem(prefix+"nouveau-checkbox").checked) {
	    query = "SELECT count(*) FROM personne WHERE pe_nom ilike '"+elem(prefix+"nom").value+"' AND pe_prenom ilike '"+elem(prefix+"prenom").value+"' AND pe_cp ilike '"+elem(prefix+"cp").value+"' AND pe_ville ILIKE '"+elem(prefix+"ville").label+"';";
	    if (requete(query)>0) {
	      erreurs += wg_error("Il semble y avoir déjà une fiche. Vous ne pourrez pas en créer une identique. Contactez Brice si nécessaire.\n(Requête : "+query+")");
	      valide = false;
	    }
	  }
    if (!valide) {
      alert(erreurs);
      return null;
    }
  }

/*
  if (num_entity==null) {
    alert("La "+complement+" n'est pas sélectionnée. Merci de prévenir Brice.");
    return null;
  }
*/
  if (elem(prefix+"nouveau-checkbox").checked) {
    num_entity = requete("SELECT nextval('seq_personne');");
    query = "INSERT INTO personne (pe_numero, pe_nom, pe_prenom, np_numero, tp_numero, ep_numero) VALUES ("+num_entity+",'"+elem(prefix+"nom").value+"','"+elem(prefix+"prenom").value+"',"+elem(prefix+"titre").value+",3,500000002);";
  } else {
    query = "UPDATE personne SET pe_nom='"+elem(prefix+"nom").value+"', pe_prenom='"+elem(prefix+"prenom").value+"', np_numero="+elem(prefix+"titre").value+", ep_numero=500000002 WHERE pe_numero="+num_entity;
  }
  pgsql_update(query);
  menulist_fill(prefix+"menulist","SELECT pe_description, pe_numero FROM personne WHERE pe_numero="+num_entity);
  elem(prefix+"nouveau-checkbox").checked = false;

  num_codepostal = requete("SELECT cp_numero FROM table_codepostal join table_villecp  using (cp_numero) join table_ville using (vi_numero) WHERE cp_codepostal='"+elem(prefix+"cp").value+"' AND vi_numero="+elem(prefix+"ville").value+";");
  if (num_codepostal==null) {
    alert("Le code postal que vous avez indiqué précédemment n'existe plus!\n Prévenir Brice S.V.P.");
    return null;
  }
  num_adresse = elem(prefix+"adresse").value;
  if (elem(prefix+"nouveau-checkbox").checked || num_adresse=='') {
    num_adresse = requete("SELECT nextval('seq_adresse');");
    query = "INSERT INTO adresse (ad_numero, pe_numero, cp_numero, vi_numero, ak_numero, ad_ligne2, ad_ligne3, ad_ligne4, ad_ligne5) VALUES ("+num_adresse+","+num_entity+","+num_codepostal+","+elem(prefix+"ville").value+",101, NULLIF('"+elem(prefix+"ligne2").value+"',''), NULLIF('"+elem(prefix+"ligne3").value+"',''), NULLIF('"+elem(prefix+"ligne4").value+"',''), NULLIF('"+elem(prefix+"ligne5").value+"',''));";
  } else {
    query = "UPDATE adresse SET cp_numero="+num_codepostal+", vi_numero="+elem(prefix+"ville").value+", ad_ligne2=NULLIF('"+elem(prefix+"ligne2").value+"',''), ad_ligne3=NULLIF('"+elem(prefix+"ligne3").value+"',''), ad_ligne4=NULLIF('"+elem(prefix+"ligne4").value+"',''), ad_ligne5=NULLIF('"+elem(prefix+"ligne5").value+"','') WHERE ad_numero="+num_adresse+";";
  }
  elem(prefix+"adresse").value = num_adresse;
  pgsql_update(query);
  menulist_fill(prefix+"menulist","SELECT pe_description, pe_numero FROM personne WHERE pe_numero="+num_entity);

  var coordonnee;
  for (x=0;x<CONTACTTYPES.length;x++) {
    num_contact = elem(prefix+"contact"+x).getAttribute("number");
    coordonnee = elem(prefix+"contact"+x).value;
    if (coordonnee.length>6) {
      if (!isNaN(num_contact) && num_contact>0) {
        query = "UPDATE contact SET cn_coordonnee='"+coordonnee+"' WHERE cn_numero="+num_contact;
      } else {
        num_contact = requete("SELECT nextval('seq_contact');");
        query = "INSERT INTO contact(cn_numero,ck_numero,pe_numero,cn_coordonnee) VALUES ("+num_contact+","+CONTACTTYPES[x]+","+num_entity+", '"+coordonnee+"');";
        elem(prefix+"contact"+x).setAttribute("number",num_contact);
      }
      pgsql_update(query);
    } else {
      elem(prefix+"contact"+x).setAttribute("number","");
      elem(prefix+"contact"+x).value = "";
    }
  }

  return num_entity;
}












function wg_error(detail) {
  return " - "+detail+"\n";
}

var REG1 = new RegExp("{", "ig");
var REG2 = new RegExp("}", "ig");
var REG3 = new RegExp("'", "ig");
//res = str.replace(reg, "''");


function wg_bml_field(nom,valeur) {
  return '{'+nom+':'+(valeur+'').replace(REG1,"[").replace(REG2,"]").replace(REG3,"''")+'}\n';
}

function wg_checkbox(id) {
  if (elem(id).checked) return "true";
  else return "false";
}


/* Valide et enregistre la cotisation */
function wg_send_cotisation(send_query){
  var query;
  var annee = current_annee();
  var bulletin = wg_bml_field('save','true');
  var erreurs = 'Rapport des erreurs\n';
  var valide = true;
  var num_codepostal, num_adresse;
  var num_contact;
  var num_cotisation;
  elem("wg-status-f").label = "1";
  elem('wg-save-button').disabled = true;
  elem('wg-send-button').disabled = true;

  // Total
  wg_totalize();
  elem("wg-status-f").label = "1.1";

  // Validation des éléments saisis
  var num_personne=current_personne();
  if (!elem("wg-personne-nouveau-checkbox").checked && elem("wg-personne-extitre").value!='' && !(num_personne<=0 || num_personne==null)) {
    erreurs += wg_error("Il faut choisir une personne qui soit un monsieur, une madame ou une mademoiselle.");
    valide = false;
  }
	if (!elem("wg-personne-nouveau-checkbox").checked && (num_personne<=0 || num_personne==null)) {
    erreurs += wg_error("Il faut choisir une personne de la liste pour pouvoir lui affecter une cotisation.");
    valide = false;
  }
  if (send_query && !elem("wg-personne-nouveau-checkbox").checked && !(num_personne<=0 || num_personne==null)) {
    num_cotisation = requete("SELECT cs_numero FROM cotisation WHERE cs_annee="+annee+" AND pe_numero="+num_personne+";");
    if (num_cotisation!=null) {
      if (confirm("Une cotisation a déjà été enregistrée pour la personne (CX"+num_cotisation+"). Voulez-vous arrêter la validation de la cotisation ?")) {
        erreurs += wg_error("Cotisation annulée. (Une cotisation a déjà été enregistrée pour la personne (CX"+num_cotisation+"))");
        valide = false;
      }
    }
  }
  elem("wg-status-f").label = "1.2";

  if (elem("wg-personne-nom").value.length<2) {
    erreurs += wg_error("Il faut saisir le nom de la personne.");
    valide = false;
  }
  if (elem("wg-personne-prenom").value.length<2) {
    erreurs += wg_error("Il faut saisir le prénom de la personne.");
    valide = false;
  }
  if (elem("wg-personne-ville").selectedIndex<0) {
    erreurs += wg_error("Il faut choisir un code postal valide et une ville pour l'adresse de la personne.");
    valide = false;
  }

  if (elem('wg-personne-nouveau-checkbox').checked) {
    query = "SELECT count(*) FROM personne WHERE pe_nom ilike '"+elem("wg-personne-nom").value+"' AND pe_prenom ilike '"+elem("wg-personne-prenom").value+"' AND pe_cp ilike '"+elem("wg-personne-cp").value+"' AND pe_ville ILIKE '"+elem("wg-personne-ville").label+"';"
    if (requete(query)>0) {
      erreurs += wg_error("Il semble que la personne existe déjà. Vous ne pourrez pas en créer une identique. Contactez Brice si nécessaire.");
      valide = false;
    }
  }


  elem("wg-status-f").label = "1.3";

  var num_societe = null;
  if (elem("wg-societe-checkbox").checked) {
    num_societe = current_societe();
    if (!elem("wg-societe-nouveau-checkbox").checked && (num_societe<=0 || num_societe==null)) {
      erreurs += wg_error("Il faut choisir une société de la liste si la case 'Société' est cochée.");
      valide = false;
    }
    if (elem("wg-societe-nom").value.length<2) {
      erreurs += wg_error("Il faut saisir le nom de la societe.");
      valide = false;
    }
    if (elem("wg-societe-prenom").value.length>0) {
      erreurs += wg_error("Il ne faut pas saisir de prenom pour la société. Dans le cas où celui-ci est renseigné, il faut le déplacer soit dans le nom soit dans le destinataire de l'adresse");
      valide = false;
    }
    if (elem("wg-societe-titre").selectedIndex<0) {
      erreurs += wg_error("Il faut sélectionner un titre pour la société.");
      valide = false;
    }
    if (elem("wg-societe-ville").selectedIndex<0) {
      erreurs += wg_error("Il faut choisir un code postal valide et une ville pour l'adresse de la société.");
      valide = false;
    }
    if (!elem("wg-societe-nouveau-checkbox").checked && elem("wg-societe-titre").getAttribute("morale")=='false') {
      erreurs += wg_error("Il faut choisir une société qui ne soit pas un monsieur, une madame ou une mademoiselle.");
      valide = false;
    }
	  if (elem('wg-societe-nouveau-checkbox').checked) {
	    query = "SELECT count(*) FROM personne WHERE pe_nom ilike '"+elem("wg-societe-nom").value+"' AND pe_cp ilike '"+elem("wg-societe-cp").value+"' AND pe_ville ILIKE '"+elem("wg-societe-ville").label+"';";
	    if (requete(query)>0) {
	      erreurs += wg_error("Il semble que la société existe déjà. Vous ne pourrez pas en créer une identique. Contactez Brice si nécessaire.");
	      valide = false;
	    }
	  }
/*
      var num_cotisation = requete("SELECT cs_numero FROM cotisation WHERE cs_annee="+annee+" AND pe_numero="+num_societe+";");
      if (num_cotisation!=null) {
        erreurs += wg_error("Une cotisation pour la société a déjà été enregistrée (CX"+num_cotisation+")");
        valide = false;
      }
*/
  }
  elem("wg-status-f").label = "1.4";

  var num_conjoint = current_conjoint();
  if (elem("wg-conjoint-checkbox").checked) {
    if (!elem("wg-conjoint-nouveau-checkbox").checked && elem("wg-conjoint-extitre").value!='' && !(num_conjoint<=0 || num_conjoint==null)) {
      erreurs += wg_error("Il faut choisir un conjoint qui soit un monsieur, une madame ou une mademoiselle.");
      valide = false;
    } 
		if (!elem("wg-conjoint-nouveau-checkbox").checked && (num_conjoint<=0 || num_conjoint==null)) {
      erreurs += wg_error("Il faut choisir un conjoint de la liste pour pouvoir l'affecter.");
      valide = false;
    }
    if (send_query && !elem("wg-conjoint-nouveau-checkbox").checked && !(num_conjoint<=0 || num_conjoint==null)) {
      var num_cotisation = requete("SELECT cs_numero FROM cotisation WHERE cs_annee="+annee+" AND pe_numero="+num_conjoint+";");
      if (num_cotisation!=null) {
        if (confirm("Une cotisation a déjà été enregistrée pour le conjoint (CX"+num_cotisation+"). Voulez-vous arrêter la validation de la cotisation ?")) {
          erreurs += wg_error("Une cotisation a déjà été enregistrée pour le conjoint (CX"+num_cotisation+")");
          valide = false;
        }
      }
    }

    if (elem("wg-conjoint-titre").selectedIndex < 0) {
      erreurs += wg_error("Il faut choisir un titre pour le conjoint.");
      valide = false;
    }
    if (elem("wg-conjoint-prenom").value.length<2) {
      erreurs += wg_error("Il faut saisir au moins le prénom du conjoint pour créer sa fiche");
      valide = false;
    }

    if (elem("wg-conjoint-nom").value=='') elem("wg-conjoint-nom").value = elem("wg-personne-nom").value;
    if (elem('wg-conjoint-nouveau-checkbox').checked) {
      query = "SELECT count(*) FROM personne WHERE pe_nom ilike '"+elem("wg-conjoint-nom").value+"' AND pe_prenom ilike '"+elem("wg-conjoint-prenom").value+"' AND pe_cp ilike '"+elem("wg-personne-cp").value+"' AND pe_ville ILIKE '"+elem("wg-personne-ville").label+"';"
      if (requete(query)>0) {
        erreurs += wg_error("Il semble que le conjoint existe déjà. Vous ne pourrez pas en créer un identique. Contactez Brice si nécessaire.");
        valide = false;
      }
    }
  }
  elem("wg-status-f").label = "1.5";

  
  if (send_query) {
    if (elem("wg-regsupp-checkbox").checked && elem("wg-regsupp-menulist").selectedIndex<0) {
	    erreurs += wg_error("S'il y a un réglement supplémentaire, il faut le sélectionner dans la liste.");
 	    valide = false;
    }

		if (elem("wg-reglement-nouveau-checkbox").checked) {
	    if (!elem('wg-societe-checkbox').checked && elem('wg-reglement-societe-checkbox').checked) {
  	    erreurs += wg_error("Si le réglement est au nom de la société, vous devez renseigner la société.");
  	    valide = false;
  	  }
  	  if (elem("wg-reglement-montant").value.length<2) {
  	    erreurs += wg_error("Il faut renseigner le montant du réglement");
  	    valide = false;
  	  }
	    if (!isDateValid(elem("wg-reglement-date").value)) {
	      erreurs += wg_error("Il faut renseigner la date du réglement correctement (JJ/MM/AAAA)");
	      valide = false;
	    }
	    if (elem("wg-reglement-mode").selectedIndex<0) {
	      erreurs += wg_error("Il faut renseigner le mode de réglement");
	      valide = false;
	    }
	    if (elem("wg-reglement-banque").value.length<2) {
	      erreurs += wg_error("Il faut renseigner la banque du réglement");
	      valide = false;
	    }
	    if (elem("wg-reglement-compte").value.length!=12) {
	      erreurs += wg_error("Il faut renseigner le N°Compte du réglement sur 12 caractères");
	      valide = false;
	    }
	    if (elem("wg-reglement-cheque").value.length!=7) {
	      erreurs += wg_error("Il faut renseigner le N°Cheque du réglement sur 7 caractères");
	      valide = false;
	    }
	  } else {
	    if (elem("wg-reglement-menulist").selectedIndex<0) {
  	    erreurs += wg_error("Il faut sélectionner un réglement");
  	    valide = false;
  	  }
  	}
	}
  elem("wg-status-f").label = "1.6";

  

  if (!valide) {
    alert(erreurs);
    elem('wg-save-button').disabled = false;
    elem('wg-send-button').disabled = false;
    return false;
  }
  elem("wg-status-f").label = "2";


  // Sauvegarde/Mise à jour des fiches des personnes et société, et des liens!!!
  num_personne = wg_entity_save('personne');
  if (elem("wg-societe-checkbox").checked) {
    num_societe = wg_entity_save('societe');
    // Ajout modification du lien
    var count = requete("SELECT el_numero FROM estlie WHERE el_personne1="+num_personne+" AND el_personne2="+num_societe+" AND tl_numero=1003;");
    if (count==null) {
      query = "INSERT INTO estlie (el_personne1, el_personne2, tl_numero, el_debut) VALUES("+num_personne+","+num_societe+",1003, CURRENT_TIMESTAMP);";
      pgsql_update(query);
    }
  }
  
  if (elem("wg-conjoint-checkbox").checked) {
    num_conjoint = current_conjoint();
    if (elem("wg-conjoint-nouveau-checkbox").checked) {
      num_conjoint = requete("SELECT nextval('seq_personne');");
      query = "INSERT INTO personne (pe_numero, pe_nom, pe_prenom, np_numero, tp_numero, ep_numero, pe_morale) VALUES ("+num_conjoint+",'"+elem("wg-conjoint-nom").value+"','"+elem("wg-conjoint-prenom").value+"',"+elem("wg-conjoint-titre").value+",3,500000002,false);";
    } else {
      query = "UPDATE personne SET pe_nom='"+elem("wg-conjoint-nom").value+"', pe_prenom='"+elem("wg-conjoint-prenom").value+"', np_numero="+elem("wg-conjoint-titre").value+", ep_numero=500000002, pe_morale=true WHERE pe_numero="+num_conjoint;
    }
//    alert(query);
    pgsql_update(query);
    menulist_fill("wg-conjoint-menulist","SELECT pe_description, pe_numero FROM personne WHERE pe_numero="+num_conjoint);
    num_conjoint = current_conjoint();

    if (elem("wg-conjoint-nouveau-checkbox").checked) {
      num_codepostal = requete("SELECT cp_numero FROM table_codepostal join table_villecp  using (cp_numero) join table_ville using (vi_numero) WHERE cp_codepostal='"+elem("wg-personne-cp").value+"' AND vi_numero="+elem("wg-personne-ville").value+";");
      if (num_codepostal==null) {
        alert("Le code postal que vous avez indiqué précédemment n'existe plus!\n Prévenir Brice S.V.P.");
        return false;
      }
      num_adresse = requete("SELECT nextval('seq_adresse');");
      query = "INSERT INTO adresse (ad_numero, pe_numero, cp_numero, vi_numero, ak_numero, ad_ligne2, ad_ligne3, ad_ligne4, ad_ligne5) VALUES ("+num_adresse+","+num_conjoint+","+num_codepostal+","+elem("wg-personne-ville").value+",101, NULLIF('"+elem("wg-personne-ligne2").value+"',''), NULLIF('"+elem("wg-personne-ligne3").value+"',''), NULLIF('"+elem("wg-personne-ligne4").value+"',''), NULLIF('"+elem("wg-personne-ligne5").value+"',''));";
      pgsql_update(query);
    }

    menulist_fill("wg-conjoint-menulist","SELECT pe_description, pe_numero FROM personne WHERE pe_numero="+num_conjoint);

    elem("wg-conjoint-nouveau-checkbox").checked = false;

    // Ajout modification du lien
    var count = requete("SELECT el_numero FROM estlie WHERE el_personne1="+num_personne+" AND el_personne2="+num_conjoint+" AND tl_numero=1005;");
    if (count==null) {
      query = "INSERT INTO estlie (el_personne1, el_personne2, tl_numero, el_debut) VALUES("+num_personne+","+num_conjoint+",1005, CURRENT_TIMESTAMP);";
      pgsql_update(query);
    }
  }
  elem("wg-status-f").label = "3";


  // Collecte des éléments du bulletin
  bulletin += wg_bml_field("fdsea.forfait.produit", elem("wg-cotisation-radiogroup").value);
  bulletin += wg_bml_field("fdsea.forfait.montant", elem("wg-cotisation-total").value);

  bulletin += wg_bml_field("fdsea.hectare", wg_checkbox("wg-hectare-checkbox"));
  if (elem("wg-hectare-checkbox").checked) {
    var rows = elem("wg-hectare-rows");
    var row;
    var n=0;
    for (i=1;i<rows.childNodes.length;i++){
      row = rows.childNodes[i];
      if (row.childNodes[0].checked && row.childNodes[1].value*1>0){
        n += 1;
        bulletin += wg_bml_field("fdsea.hectare."+n+".produit", row.childNodes[0].getAttribute("numero"));
        bulletin += wg_bml_field("fdsea.hectare."+n+".quantite", row.childNodes[1].value);
        bulletin += wg_bml_field("fdsea.hectare."+n+".montant", row.childNodes[2].value);
      }
    }
    bulletin += wg_bml_field("fdsea.hectare.montant", elem("wg-hectare-total").value);
    bulletin += wg_bml_field("fdsea.hectare.nombre", n+'');
  }

  bulletin += wg_bml_field("fdsea.conjoint", wg_checkbox("wg-conjoint-checkbox"));
  if (elem("wg-conjoint-checkbox").checked) {
    bulletin += wg_bml_field("fdsea.conjoint.numero", current_conjoint());    
    bulletin += wg_bml_field("fdsea.conjoint.produit", elem("wg-conjoint-radiogroup").value);    
    bulletin += wg_bml_field("fdsea.conjoint.montant", elem("wg-conjoint-total").value);    
  }

  bulletin += wg_bml_field("fdsea.associe", wg_checkbox("wg-associe-checkbox"));
  if (elem("wg-associe-checkbox").checked) {
    var listbox = elem("wg-associe-listbox");
    var n = 0;
    for (i=1;i<listbox.childNodes.length;i++){
      if (listbox.childNodes[i].firstChild) {
        if (listbox.childNodes[i].firstChild.checked && elem("wg-associe-checkbox").checked) {
          n += 1;
          bulletin += wg_bml_field("fdsea.associe."+n+".numero", listbox.childNodes[i].firstChild.getAttribute("numero"));
        }
      }
    }
    bulletin += wg_bml_field("fdsea.associe.nombre", n+'');
    bulletin += wg_bml_field("fdsea.associe.produit", elem("wg-associe-radiogroup").value);
    bulletin += wg_bml_field("fdsea.associe.montant", elem("wg-associe-total").value);    
  }

  bulletin += wg_bml_field("sacea", wg_checkbox("wg-conseil-checkbox"));
  if (elem("wg-conseil-checkbox").checked) {
    bulletin += wg_bml_field("sacea.produit", elem("wg-conseil-radiogroup").value);
    bulletin += wg_bml_field("sacea.montant", elem("wg-conseil-total").value);
  }

  elem("wg-status-f").label = "3.5";


  bulletin += wg_bml_field("aava", wg_checkbox("wg-journal-checkbox"));
  if (elem("wg-journal-checkbox").checked) {
    bulletin += wg_bml_field("aava.produit", elem("wg-journal-radiogroup").value);
    bulletin += wg_bml_field("aava.debut", elem("wg-journal-debut").value);
    bulletin += wg_bml_field("aava.fin", elem("wg-journal-fin").value);
    bulletin += wg_bml_field("aava.quantite", elem("wg-journal-nbex").value);
    bulletin += wg_bml_field("aava.adresse", elem("wg-journal-adresses").value);
    bulletin += wg_bml_field("aava.montant", elem("wg-journal-total").value);
  }
  elem("wg-status-f").label = "3.6";

  bulletin += wg_bml_field("cotisation.normal", "true");
  bulletin += wg_bml_field("cotisation.type", "standard");
  bulletin += wg_bml_field("cotisation.total", elem("wg-total").value);
  bulletin += wg_bml_field("cotisation.personne", current_personne());
  bulletin += wg_bml_field("cotisation.societe", current_societe());
  bulletin += wg_bml_field("cotisation.annee", current_annee());

  elem("wg-status-f").label = "3.7";

  bulletin += wg_bml_field("reglement.don", wg_checkbox("wg-reglement-don-checkbox"));
  bulletin += wg_bml_field("reglement.nouveau", wg_checkbox("wg-reglement-nouveau-checkbox"));
  if (elem("wg-reglement-nouveau-checkbox").checked) {
    bulletin += wg_bml_field("reglement.societe", wg_checkbox("wg-reglement-societe-checkbox"));
    bulletin += wg_bml_field("reglement.societe.numero", current_societe());
    bulletin += wg_bml_field("reglement.montant", elem("wg-reglement-montant").value);
    bulletin += wg_bml_field("reglement.date", elem("wg-reglement-date").value);
    bulletin += wg_bml_field("reglement.mode", elem("wg-reglement-mode").value);
    bulletin += wg_bml_field("reglement.banque", elem("wg-reglement-banque").value);
    bulletin += wg_bml_field("reglement.compte", elem("wg-reglement-compte").value);
    bulletin += wg_bml_field("reglement.cheque", elem("wg-reglement-cheque").value);
  } else {
    bulletin += wg_bml_field("reglement.numero", elem("wg-reglement-menulist").selectedItem.value);
  }

  if (elem("wg-regsupp-checkbox").checked) {
    bulletin += wg_bml_field("reglement.complement.numero", elem("wg-regsupp-menulist").selectedItem.value);
  }

  //  alert(bulletin);
  elem("wg-status-f").label = "4";


  // Traitement de la cotisation
  if (send_query==true) {
    if (!confirm('Voulez-vous valider la saisie de cette cotisation ?'))
      return false;
    var numeros = "Numéros à inscrire sur le bulletin d'adhésion :\n"
    // Création du réglement et ajout au bulletin
  
//    if (elem("wg-reglement-menulist").selectedIndex>0)
//      num_reglement = elem("wg-reglement-menulist").selectedItem.value;
    if (elem("wg-reglement-nouveau-checkbox").checked) {
      bulletin += wg_bml_field("reglement.saved", "true");
      num_reglement = requete("SELECT nextval('seq_reglement');");
      num_regleur = (elem('wg-reglement-societe-checkbox').checked) ? current_societe() : current_personne() ;
      if (null==pgsql_update("INSERT INTO reglement(rg_numero, pe_numero, rg_libellebanque, rg_numerocompte, rg_reference, rg_montant, rg_date, mr_numero, so_numero, em_numero) VALUES ("+num_reglement+","+num_regleur+",'"+elem("wg-reglement-banque").value+"','"+elem("wg-reglement-compte").value+"','"+elem("wg-reglement-cheque").value+"',"+elem("wg-reglement-montant").value+",'"+elem("wg-reglement-date").value+"',"+elem("wg-reglement-mode").value+",2,"+current_responsable()+");"))
        return false;
      else {
        checkbox_check('wg-reglement-nouveau-checkbox',false);
        var query="SELECT 'N°'||rg_numero||' : '||rg_montant||'€ payés le '||rg_date||' par '||pe_nom||' (N°'||pe_numero-1000000||')' AS rg_libelle, rg_numero from table_reglement join table_personne using (pe_numero) where rg_numero="+num_reglement+";";
        menulist_fill("wg-reglement-menulist",query);
        wg_reglement_load();
      }
      bulletin += wg_bml_field("reglement.numero", num_reglement);
    } else {
  //    if (elem("wg-reglement-menulist").selectedIndex>0)
      num_reglement = elem("wg-reglement-menulist").selectedItem.value;
    }
    numeros += wg_error("RG"+num_reglement);

    var num_cotisation = requete("SELECT nextval('table_cotisation_cs_numero_seq')");
    var reference = num_cotisation;
    query="INSERT INTO cotisation (cs_numero, pe_numero, cs_annee, cs_detail, cs_standard) VALUES ("+num_cotisation+","+num_personne+", "+annee+", '"+bulletin+"', true);";
    pgsql_update(query);
    numeros += wg_error("CX"+num_cotisation);

    if (elem("wg-conjoint-checkbox").checked) {
      num_cotisation = requete("SELECT nextval('table_cotisation_cs_numero_seq')");
      numeros += wg_error("CX"+num_cotisation);
      bulletin  = wg_bml_field("saved", "true");
      bulletin += wg_bml_field("cotisation.normal", "false");
      bulletin += wg_bml_field("cotisation.type", "conjoint");
      bulletin += wg_bml_field("cotisation.annee", current_annee());
      bulletin += wg_bml_field("cotisation.reference", reference);
      query="INSERT INTO cotisation (cs_numero, pe_numero, cs_annee, cs_detail, cs_standard) VALUES ("+num_cotisation+","+current_conjoint()+", "+annee+", '"+bulletin+"', false);";
      pgsql_update(query);
    }

    if (elem("wg-associe-checkbox").checked) {
      var listbox = elem("wg-associe-listbox");
      for (i=1;i<listbox.childNodes.length;i++){
        if (listbox.childNodes[i].firstChild) {
          if (listbox.childNodes[i].firstChild.checked && elem("wg-associe-checkbox").checked) {
            num_cotisation = requete("SELECT nextval('table_cotisation_cs_numero_seq')");
            numeros += wg_error("CX"+num_cotisation);
            bulletin  = wg_bml_field("saved", "true");
            bulletin += wg_bml_field("cotisation.normal", "false");
            bulletin += wg_bml_field("cotisation.type", "associe");
            bulletin += wg_bml_field("cotisation.annee", current_annee());
            bulletin += wg_bml_field("cotisation.reference", reference);
            query="INSERT INTO cotisation (cs_numero, pe_numero, cs_annee, cs_detail, cs_standard) VALUES ("+num_cotisation+","+listbox.childNodes[i].firstChild.getAttribute("numero")+", "+annee+", '"+bulletin+"', false);";
            pgsql_update(query);
          }
        }
      }
    }

    alert(numeros);

		// nettoyage des champs
		//	Personne
		menulist_fill('wg-personne-menulist', 'SELECT pe_numero, pe_description FROM personne WHERE pe_numero IS NULL;');
		wg_entity_load('personne');
		//	Societe
		menulist_fill('wg-societe-menulist', 'SELECT pe_numero, pe_description FROM personne WHERE pe_numero IS NULL;');
		wg_entity_load('societe');
		//	Associe
		menulist_fill('wg-associe-menulist', 'SELECT pe_numero, pe_description FROM personne WHERE pe_numero IS NULL;');
		wg_entity_load('associe');

    elem("wg-regsupp-checkbox").checked = false;

  }
  elem('wg-save-button').disabled = false;
  elem('wg-send-button').disabled = false;
  elem("wg-status-f").label = "100";
  return true;
}






elem("wg-status-text").label = 'cotisation_2008.js chargé.';
//alert("Fichier chargé");
