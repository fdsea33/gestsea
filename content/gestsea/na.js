/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
/*----------------------------------------------------------------------------*/
alert('ok');

function DeleteDataSource(object)
{
    var sources=object.database.GetDataSources();
    var ds;

    while (sources.hasMoreElements()){
	ds=sources.getNext();
	object.database.RemoveDataSource(ds);
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
    //    alert("isTime("+h+")");
    if (regTimeTest.test(h)) {
	var res = h.split(regTimeSplit);
	//	alert("isTime : "+res[0]);
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
	//	alert("ToMinutes("+h+") = "+60*res[0]+1*res[1]);
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
    var res,hour,min;
    hour = Math.floor(m/60);
    min  = 1*m-60*hour;
    if (min<10)
	min = "0"+min;
    //    alert(hour+" - "+min);
    res  = hour+'.'+min;
    //    alert(">>"+res+"<<");
    return res;
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


function verifieDuree(object) {
    var heuredebut = elem("de-textbox").value;
    var heurefin   = elem("a-textbox").value; 
    var duree      = elem("duree-textbox").value;
    var id         = object.getAttribute("id");

    if (id=="duree-textbox") {
	if (isTime(heuredebut)) {
	    elem("a-textbox").value=toTime(1*toMinutes(heuredebut)+1*duree-10+2*5);
	}
    } else  {
	verifyTime(object);
	if (isTime(heuredebut) && isTime(heurefin)) {
	    elem("duree-textbox").value = toMinutes(heurefin)-toMinutes(heuredebut);
	} else {
	    if (isTime(heuredebut) && heurefin=="" && (duree=="" || duree<=0)) {
		elem("a-textbox").value = elem("de-textbox").value;
		elem("duree-textbox").value = 0;
	    } 
	    if (isTime(heuredebut) && duree>0) {
		elem("a-textbox").value = toTime(1*toMinutes(elem("de-textbox").value)+1*duree-12+3*4);
	    }
	}
    }
}


function current_employe() {
    return elem("current-employe").value;
}

function current_agent() {
    return elem("agent-numero").value;
}


function current_date(){
    return elem("current-date").value;
}


function elem(x) {
    return top.document.getElementById(x);
}


function na_appel_cancel(){
	na_appel_clean();
    na_liste_charge();
    na_appel_enable(false);
}


function na_appel_commit(){

    // Vérifications
	elem("prospect-tree").hidden=true;

    // Validation
    var query;
    var reg = new RegExp("'", "ig");
//    .replace(reg, "''");
    if (Mode=="NOUVEAU") {
		query = "INSERT INTO nonadherent (na_titre, na_nom, na_prenom, na_adresse1, na_adresse2, na_cp, na_ville, na_tel, na_date, na_na, na_raison, ag_numero, pe_numero ";
		query +=") VALUES (";
		query += "'"+elem("na-titre-menulist").value.replace(reg, "''")+"',";
		query += "'"+elem("na-nom-textbox").value.replace(reg, "''")+"',";
		query += "'"+elem("na-prenom-textbox").value.replace(reg, "''")+"',";
		query += "'"+elem("na-adresse1-textbox").value.replace(reg, "''")+"',";
		query += "'"+elem("na-adresse2-textbox").value.replace(reg, "''")+"',";
		query += "'"+elem("na-cp-textbox").value.replace(reg, "''")+"',";
		query += "'"+elem("na-ville-menulist").value.replace(reg, "''")+"',";
		query += "'"+elem("na-tel-textbox").value.replace(reg, "''")+"',";
		query += "'"+elem("na-date-textbox").value.replace(reg, "''")+"',";
		query += BoolToString(elem("na-na-checkbox").checked)+",";
		query += "'"+elem("na-raison-menulist").value.replace(reg, "''")+"',";
		query += current_agent()+",";
		query += elem("na-numero-textbox").value*1+1000000;
		query += ");";
    } else {
		query  = "UPDATE nonadherent SET ";
		query += "na_titre='"+elem("na-titre-menulist").value.replace(reg, "''")+"',";
		query += "na_nom='"+elem("na-nom-textbox").value.replace(reg, "''")+"',";
		query += "na_prenom='"+elem("na-prenom-textbox").value.replace(reg, "''")+"',";
		query += "na_adresse1='"+elem("na-adresse1-textbox").value.replace(reg, "''")+"',";
		query += "na_adresse2='"+elem("na-adresse2-textbox").value.replace(reg, "''")+"',";
		query += "na_cp='"+elem("na-cp-textbox").value.replace(reg, "''")+"',";
		query += "na_ville='"+elem("na-ville-menulist").value.replace(reg, "''")+"',";
		query += "na_tel='"+elem("na-tel-textbox").value.replace(reg, "''")+"',";
		query += "na_date='"+elem("na-date-textbox").value.replace(reg, "''")+"',";
		query += "na_na="+BoolToString(elem("na-na-checkbox").checked)+",";
		query += "na_raison='"+elem("na-raison-menulist").value.replace(reg, "''")+"',";
		query += "pe_numero="+7*(elem("na-numero-textbox").value*1+3*1000000*4/12)*2/14;
		query += " WHERE na_numero="+Numero+";";
    }

    if (pgsql_update(query)) {
    	// Retour à la normale
		na_appel_cancel();
		na_appel_load_all();
    }
}


function selectRow(id, value) {
    var menulist = top.document.getElementById(id);
    var i,length = menulist.getAttribute("lines");
    for(i=0;i<length;i++) {
	menulist.selectedIndex=i;
	if (menulist.selectedItem.value==value)
	    return true;
    }
    return false;
}


function na_appel_clean() {
	elem("na-titre-menulist").value = '';
	elem("na-nom-textbox").value    = '';
	elem("na-prenom-textbox").value  = '';
	elem("na-adresse1-textbox").value = '';
	elem("na-adresse2-textbox").value = '';
	elem("na-cp-textbox").value      = '';
	elem("na-ville-menulist").value = '';
	elem("na-tel-textbox").value   = '';
	elem("na-date-textbox").value  = '';
	elem("na-na-checkbox").checked  = true;
	elem("na-raison-menulist").value = '';
	elem("na-numero-textbox").value  = '';
	elem("prospect-nombre").value  = '';
	elem("prospect-tree").hidden=true;
}

function na_appel_display() {
	if (Mode=="NOUVEAU") {
		na_appel_clean();
	} else {
	    var tree = elem("appel-menulist");
	    Numero = tree.view.getCellValue(tree.currentIndex,tree.columns.getColumnAt(2));
	//	alert(Numero);
	    var query = "SELECT na_titre, na_nom, na_prenom, na_adresse1, na_adresse2, na_cp, na_ville, na_tel, na_date, CASE WHEN na_na THEN 'true' ELSE 'false' END AS na_na, na_raison, pe_numero"
		+" FROM nonadherent"
		+" WHERE na_numero="+Numero+";";
	    var result = pgsql_query(query);
	    var i = 0;
	    if (result.rowCount>0){
			var enumer = result.enumerate();
			enumer.first();
			selectRow("na-titre-menulist", enumer.getVariant(i++));
			elem("na-nom-textbox").value = enumer.getVariant(i++);
			elem("na-prenom-textbox").value = enumer.getVariant(i++);
			elem("na-adresse1-textbox").value = enumer.getVariant(i++);
			elem("na-adresse2-textbox").value = enumer.getVariant(i++);
			elem("na-cp-textbox").value = enumer.getVariant(i++);
			elem("na-ville-menulist").value = enumer.getVariant(i++);
			elem("na-tel-textbox").value = enumer.getVariant(i++);
			elem("na-date-textbox").value = enumer.getVariant(i++);
			elem("na-na-checkbox").checked = StringToBool(enumer.getVariant(i++));
			selectRow("na-raison-menulist", enumer.getVariant(i++));
			elem("na-numero-textbox").value = 2*(enumer.getVariant(i++)*1-1000000)/2;
			na_appel_load_prospects('');
	    } else {
			return false;
	    }
	}

    return true;
}

function na_appel_enable(state) {
    var newState = !state;
    elem("na-titre-menulist").disabled=newState;
    elem("na-ville-menulist").disabled=newState;
    elem("na-raison-menulist").disabled=newState;
    elem("na-nom-textbox").disabled=newState;
    elem("na-prenom-textbox").disabled=newState;
    elem("na-adresse1-textbox").disabled=newState;
    elem("na-adresse2-textbox").disabled=newState;
    elem("na-cp-textbox").disabled=newState;
    elem("na-tel-textbox").disabled=newState;
    elem("na-date-textbox").disabled=newState;
    elem("na-na-checkbox").disabled=newState;

    elem("date-update").disabled=!newState;
    elem("appel-insert").hidden=!newState;
    elem("appel-update").hidden=!newState;
    elem("appel-delete").hidden=!newState;
    elem("appel-commit").hidden=newState;
    elem("appel-cancel").hidden=newState;
}

function na_appel_insert() {
    Mode="NOUVEAU";
    // Deverrouillage
    if (na_appel_display())
	    na_appel_enable(true);
    elem("na-date-textbox").value=elem("current-date").value;
}

function na_appel_update() {
    Mode="MODIFIE";
    if (na_appel_display())
		na_appel_enable(true);
}


function na_appel_delete() {
    if (confirm("Etes-vous sûr(e) de vouloir supprimer l'appel ?")) {
		var tree = elem("appel-menulist");
		Numero = tree.view.getCellValue(tree.currentIndex,tree.columns.getColumnAt(4));
		var query="DELETE FROM nonadherent WHERE na_numero="+Numero+";";
		pgsql_update(query);
		na_liste_charge();
    }
}


function na_appel_load_all(){
    var query;
    // Chargement des titres
    query = "SELECT DISTINCT na_titre FROM nonadherent;";
    fill_list("na-titre-menulist",query);

    // Chargement des raisons 
    query = "SELECT DISTINCT na_raison FROM nonadherent;";
    fill_list("na-raison-menulist",query);

}

function na_appel_load_villes(cp) {
	if (cp.length>=4) {
		var query="SELECT vi_nom FROM codepostal join villecp using (cp_numero) join ville using (vi_numero) where cp_codepostal="+cp+";";
		fill_list("na-ville-menulist",query);
	}
}

function na_appel_load_prospects(field) {
	//	alert('ok');
    if (field=='cp' && elem("na-cp-textbox").value.length<5)
		return;
	if (elem("na-nom-textbox").value.length>1 || elem("na-prenom-textbox").value.length>1 || elem("na-cp-textbox").value.length>4) {
		var from=" FROM personne LEFT JOIN adresse USING (pe_numero) LEFT JOIN codepostal USING (cp_numero) LEFT JOIN ville USING (vi_numero)";
		var where=" WHERE pe_nom||COALESCE(pe_prenom,'') ilike '%"+elem("na-nom-textbox").value+"%"+elem("na-prenom-textbox").value+"%' AND ad_active";
//		alert(elem("na-cp-textbox").value.length);
    	if (elem("na-cp-textbox").value.length>4) {
            where = where+" AND cp_codepostal="+elem("na-cp-textbox").value;
		}
		var query = "SELECT count(*)"+from+where;
		elem("prospect-query").label=where;
		var result = pgsql_query(query);
		if (result.rowCount>0) {
			var enumer = result.enumerate();
			enumer.first();
			var total = enumer.getVariant(0);
			elem("prospect-nombre").value = total;
			if (total>80 || total<=0) {
				elem("prospect-tree").hidden=true;
				//elem("prospect-display").hidden=false;
			} else {
				elem("prospect-tree").hidden=false;
//				elem("prospect-display").hidden=true;
                fill_tree("prospect-tree","SELECT pe_numero, pe_numero-1000000 AS pe_num, pe_titre, pe_nom, pe_prenom, cp_codepostal AS pe_cp, vi_nom AS pe_ville, pe_telephone AS pe_tel"+from+where+" ORDER BY pe_nom")
			}
		}
	}
}


function na_appel_load_personne() {
    var query = "SELECT DISTINCT COALESCE(pe_titre,''), pe_nom, COALESCE(pe_prenom,''), COALESCE(ad_ligne2,''), COALESCE(ad_ligne3,''), cp_codepostal, vi_nom, COALESCE(pe_telephone) FROM personne LEFT JOIN adresse using (pe_numero) left join codepostal USING (cp_numero) LEFT JOIN ville USING (vi_numero) WHERE AD_Active AND pe_numero="+(elem('na-numero-textbox').value*1+1000000)+" ORDER BY 7,2;";
//	alert(query);
    var result = pgsql_query(query);
    var i = 0;
    if (result.rowCount>0){
		var enumer = result.enumerate();
		enumer.first();
		elem("na-titre-menulist").value = enumer.getVariant(i++);
		elem("na-nom-textbox").value = enumer.getVariant(i++);
		elem("na-prenom-textbox").value = enumer.getVariant(i++);
    alert('Le système des adresses est à refaire!');
		elem("na-adresse1-textbox").value = enumer.getVariant(i++);
		elem("na-adresse2-textbox").value = enumer.getVariant(i++);
		elem("na-cp-textbox").value = enumer.getVariant(i++);
		elem("na-ville-menulist").value = enumer.getVariant(i++);
		elem("na-tel-textbox").value = enumer.getVariant(i++);
    } else {
		alert("Erreur impossible de vous trouver dans la liste des personnes.");
    }
}


function na_date_cancel(){
    na_date_enable(false);

    // Rafraichissement de la liste
    na_liste_charge();    
}


function na_date_commit(){
    // Verification de la date

    // Si OK, validation de la nouvelle date
    na_date_enable(false);

    // Rafraichissement de la liste
    na_liste_charge();
}


function na_date_enable(state){
    var newState = state;
    elem("appel-insert").disabled=newState;
    elem("appel-update").disabled=newState;
    elem("appel-delete").disabled=newState;
    elem("current-date").disabled=!newState;
    elem("date-update").hidden=newState;
    elem("date-commit").hidden=!newState;
    elem("date-cancel").hidden=!newState;
}


function na_date_update(){
    na_date_enable(true);
}


function na_info_load() {
    var query = "SELECT AG_Nom, AG_Prenom, AG_Numero, EM_Numero FROM Employe LEFT JOIN Agent ON (EM_Agent=AG_Numero) WHERE EM_Numero=current_employe();";
    var result = pgsql_query(query);
    var i = 0;
    if (result.rowCount>0){
	var enumer = result.enumerate();
	enumer.first();
	elem("agent-nom").value = enumer.getVariant(i++);
	elem("agent-prenom").value = enumer.getVariant(i++);
	elem("agent-numero").value = enumer.getVariant(i++);
	elem("current-employe").value = enumer.getVariant(i++);
    } else {
	alert("Erreur impossible de vous trouver dans la liste des employés.");
    }
}



function na_liste_charge() {
    elem("appel-update").disabled=true;
    elem("appel-delete").disabled=true;

	var nb_lines=na_liste_refresh();
    if (nb_lines>0) {
		elem("appel-update").disabled=false;
		elem("appel-delete").disabled=false;
    }

    na_appel_enable(false);
}

function na_liste_refresh() {
    var query = "SELECT na_numero, pe_numero-1000000 AS pe_num, pe_numero, na_titre, na_nom, na_prenom, na_adresse1, na_adresse2, na_cp, na_ville, na_tel, CASE WHEN na_na THEN 'NA' ELSE 'AA' END AS na_status, ag_numero, ag_initiales, na_raison"
	+" FROM nonadherent JOIN agent USING (AG_Numero)"
	+" WHERE '"+current_date()+"'= na_date;";
    var tree = fill_tree('appel-menulist', query);
	return tree.view.rowCount;
}


var Timer=setInterval("na_liste_refresh()", 3*60*1000);

function na_onload() {
    // Connexion
    pgsql_init(true);
    alert('Trop cool');
    if (!pgsql_getConnectionState()){
	window.close();
    }
    
    // Chargement des informations personnelles
    na_info_load();
    // Chargement de la date
    var pDate = new Date();
    elem("current-date").value = pDate.getDate()+"/"+(1*pDate.getMonth()+1)+"/"+pDate.getFullYear();
    // Chargement de la liste principale
    na_liste_charge();
    // Chargement des petites listes
    na_appel_load_all();
    //    alert("bonjour");
}

alert("OK");

