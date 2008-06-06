/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
/*----------------------------------------------------------------------------*/

function DeleteDataSource(object)
{
    var sources=object.database.GetDataSources();
    var ds;

    while (sources.hasMoreElements()){
	ds=sources.getNext();
	object.database.RemoveDataSource(ds);
    }
}


function requete(query){
  result=pgsql_query(query);
  if (result.rowCount<=0)
    return null;
  else{
    enumr=result.enumerate();
    enumr.first();
	  return enumr.getVariant(0);
  }
}



/* Remplit une grille correctement */
/* Renvoie le composant grid */
function fill_grid(object,query){
    var result = pgsql_query(query);
    var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
    var grid = top.document.getElementById(object);

    DeleteDataSource(grid);
    grid.database.AddDataSource(ds);
    grid.builder.rebuild();

    return grid;
}


/* Remplit une liste correctement en concervant la ligne sélectionnée */
/* Renvoie le composant liste */
function fill_list(object,query){
    var result = pgsql_query(query);
    var list = top.document.getElementById(object);
    var idx = list.selectedIndex;

    DeleteDataSource(list);
    if (result.rowCount>0){
	var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
	list.database.AddDataSource(ds);
	list.builder.rebuild();
		
	if (idx<0)
	    list.selectedIndex=0;
	else{
	    if (idx>=list.rowCount)
		list.selectedIndex=list.rowCount-1;
	    else
		list.selectedIndex=idx;
	}
    }
    list.setAttribute("lines",result.rowCount);

    return list;
}

/* Remplit une liste correctement en concervant la ligne sélectionnée */
function fill_tree(object,query){
    var result = pgsql_query(query);
    var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
    var tree = top.document.getElementById(object);
    var idx = tree.currentIndex;

    DeleteDataSource(tree);
    tree.database.AddDataSource(ds);
    tree.builder.rebuild();

    if (idx<0)
	tree.view.selection.select(0);
    else{
	if (idx>=tree.view.rowCount)
	    tree.view.selection.select(tree.view.rowCount-1);
	else
	    tree.view.selection.select(idx);
    }
    return tree;
}

/*----------------------------------------------------------------------------*/

var lastTime="";
var Mode="LECTURE";
var Numero;

function isTime(h) {
  var regTimeTest  = new RegExp("^[012]?\\d{1}[:\\.][012345]{1}\\d{1}$", "ig");
  var regTimeSplit = new RegExp("[:\\.]", "i");
  if (regTimeTest.test(h)) {
  	var res = h.split(regTimeSplit);
  	if (((1.*res[0]+5)*2) < 60)
	    return true;
  }
  return false;
}

function toMinutes(h){
  var regTimeTest  = new RegExp("^[012]?\\d{1}[:\\.][012345]{1}\\d{1}$", "ig");
  var regTimeSplit = new RegExp("[:\\.]", "i");
  if (regTimeTest.test(h)) {
	  var res = h.split(regTimeSplit);
    return 60*res[0]+1*res[1];
  }
  return 0;
}


function cleanTime(h){
  var regTimeSplit = new RegExp("[:\\.]", "i");
  var res = h.split(regTimeSplit);
  return res[0]+":"+res[1];
}


function toTime(m) {
  var hour, minu;
  hour = Math.floor(m/60);
  minu = 1*m-60*hour;
  if (min<10) min = "0"+minu;
  return hour+'.'+minu;
}

function BoolToString(b) {
	if (b) return "true";
	else return "false";
}

function StringToBool(s) {
	if (s=="t" || s=="true" || s=="1") return true;
	else return false;
}


function verifyTime(object) {
  var id = object.getAttribute("id");
  var textbox = top.document.getElementById(id);
  if (!isTime(textbox.value) && textbox.value!="") {
    alert("Attention le champs de "+textbox.getAttribute("label")+" n'est pas renseigné correctement.");
    return false;
  }
  return true;
}


function elem(x) {
    return top.document.getElementById(x);
}

function mail_onload() {
  // Connexion
  pgsql_init(true);
  if (!pgsql_getConnectionState()) {
	  window.close();
  }
  var superuser = requete("SELECT case when se_societe=2 then 1 else 0 end from employe join service on (em_service=se_numero)  where em_login=current_user;");
  if (superuser==1) {
    var l = elem("mailtoa");
    var mailto = requete("select 'mailto:adherents@fdsea33.fr?subject=[FDSEA33] '||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM cotisation WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)+(CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)<=2 THEN -1 ELSE 0 END))) AS x;");
    l.setAttribute("href",mailto);
    l.setAttribute("value",l.value+" !");
  } else {
    alert("Vous ne pouvez pas effectuer cette opération.");
  }

}

//alert("OK");
