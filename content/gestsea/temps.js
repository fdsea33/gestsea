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


function current_date(){
    return elem("current-date").value;
}


function elem(x) {
    return top.document.getElementById(x);
}


function tps_activite_cancel(){
    tps_liste_charge();
    tps_activite_enable(false);
}


function tps_activite_commit(){

    var qui = elem("pour-radiogroup").selectedIndex;

    // Vérification du pour
    if (!verifyTime(elem("de-textbox"))) return;
    if (!verifyTime(elem("a-textbox"))) return; 
    if (elem("duree-textbox").value<=0) {
	alert("La durée de l'activité est trop courte.");
	return;
    }

    if ((qui<3 && elem("pour-textbox").value=="") || (qui==3 && elem("groupe-menulist").selectedIndex<0)) {
	alert("Vous devez spécifier pour qui vous avez effectué cette activité");
	return;
    }

    // Validation
    var heuredebut;
    var heurefin;
    if (elem("de-textbox").value=="") heuredebut = "NULL";
    else heuredebut = "'"+cleanTime(elem("de-textbox").value)+"'";
    if (elem("a-textbox").value=="")  heurefin   = "NULL";
    else heurefin   = "'"+cleanTime(elem("a-textbox").value)+"'";
    /*
    var pourky, pourkyquoi;
    switch(qui) {
    case 0: pourky = "fa_numero"; break;
    case 1: pourky = "de_numero"; break; 
    case 2: pourky = "pe_numero"; break;
    case 3: pourky = "zg_numero"; break;
    }
    */
    if (qui==3) pourkyquoi = elem("groupe-menulist").selectedItem.value;
    else pourkyquoi = elem("pour-textbox").value;

    var query;

    if (Mode=="NOUVEAU") {
	query = "INSERT INTO activite (za_numero, za_date, za_heuredebut, za_heurefin, za_duree, em_numero, zt_numero, zs_numero, zl_numero, za_qui, za_champ";
	query +=") VALUES (";
	query += "nextval('seq_activite'),";
	query += "'"+current_date()+"',";
	query += heuredebut+",";
	query += heurefin+",";
	query += elem("duree-textbox").value+",";
	query += current_employe()+",";
	query += elem("tache-menulist").selectedItem.value+",";
	query += elem("sujet-menulist").selectedItem.value+",";
	query += elem("lieu-menulist").selectedItem.value+",";
	query += qui+","+pourkyquoi;
	query += ");";
    } else {
	query  = "UPDATE activite SET ";
	query += "za_heuredebut="+heuredebut+",";
	query += "za_heurefin="+heurefin+",";
	query += "za_duree="+elem("duree-textbox").value+",";
	query += "zt_numero="+elem("tache-menulist").selectedItem.value+",";
	query += "zs_numero="+elem("sujet-menulist").selectedItem.value+",";
	query += "zl_numero="+elem("lieu-menulist").selectedItem.value+",";
	query += "za_qui="+qui+",";
	query += "za_champ="+pourkyquoi;
	query+="WHERE za_numero="+Numero+";";
    }

    if (pgsql_update(query)) {
    
	// Retour à la normale
	lastTime = elem("a-textbox").value;
	tps_activite_cancel();
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


function tps_activite_display() {
    var tree = elem("activite-menulist");
    Numero = tree.view.getCellValue(tree.currentIndex,tree.columns.getColumnAt(4));
    var query = "SELECT zt_numero, zu_numero, zs_numero, zl_numero, za_qui, za_champ, zg_numero, za_heuredebut, za_heurefin, za_duree"
	+" FROM activite LEFT JOIN tache USING (zt_numero)"
	+"               LEFT JOIN sujet USING (zs_numero)"
	+"               LEFT JOIN typesujet USING (zu_numero)"
	+"               LEFT JOIN lieu USING (zl_numero)"
	+"               LEFT JOIN groupe USING (zg_numero)"
	+"WHERE za_numero="+Numero+";";
    var result = pgsql_query(query);
    var i = 0;
    if (result.rowCount>0){
	var enumer = result.enumerate();
	enumer.first();
	selectRow("tache-menulist", enumer.getVariant(0));
	selectRow("theme-menulist", enumer.getVariant(1));
	tps_activite_load_sujets();
	selectRow("sujet-menulist", enumer.getVariant(2));
	selectRow("lieu-menulist",  enumer.getVariant(3));
	elem("pour-radiogroup").selectedIndex = enumer.getVariant(4);
	var qui = elem("pour-radiogroup").selectedIndex;
	if (qui<3) elem("pour-textbox").value = enumer.getVariant(5);
	else selectRow("groupe-menulist",  enumer.getVariant(6));
	/*
	var qui0 = enumer.getVariant(i++);
	var qui1 = enumer.getVariant(i++);
	var qui2 = enumer.getVariant(i++);
	var qui3 = enumer.getVariant(i++);
	*/
	elem("de-textbox").value = cleanTime(enumer.getVariant(7));
	elem("a-textbox").value = cleanTime(enumer.getVariant(8));
	elem("duree-textbox").value = enumer.getVariant(9);

	/*
	switch(qui) {
	case 0: elem("pour-textbox").value=qui0;break;
	case 1: elem("pour-textbox").value=qui1;break;
	case 2: elem("pour-textbox").value=qui2;break;
	case 3: selectRow("groupe-menulist",qui3);break;
	}
	*/
	tps_activite_load_pour();
    } else {
	return false;
    }
    
    return true;
}

function tps_activite_enable(state) {
    var newState = !state;
    elem("tache-menulist").disabled=newState;
    elem("theme-menulist").disabled=newState;
    elem("sujet-menulist").disabled=newState;
    elem("lieu-menulist").disabled=newState;
    elem("pour-radiogroup").disabled=newState;
    elem("pour-textbox").disabled=newState;
    elem("groupe-menulist").disabled=newState;
    elem("de-textbox").disabled=newState;
    elem("a-textbox").disabled=newState;
    elem("duree-textbox").disabled=newState;
    elem("date-update").disabled=!newState;
    elem("activite-insert").hidden=!newState;
    elem("activite-update").hidden=!newState;
    elem("activite-delete").hidden=!newState;
    elem("activite-commit").hidden=newState;
    elem("activite-cancel").hidden=newState;
}

function tps_activite_insert() {
    Mode="NOUVEAU";
    // Deverrouillage
    tps_activite_enable(true);
    // Pré-remplissage
    elem("de-textbox").value=lastTime;
}

function tps_activite_update() {
    Mode="MODIFIE";
    if (tps_activite_display())
	tps_activite_enable(true);
}

function tps_activite_delete() {
    if (confirm("Etes-vous sûr(e) de vouloir supprimer l'activité?")) {
	var tree = elem("activite-menulist");
	Numero = tree.view.getCellValue(tree.currentIndex,tree.columns.getColumnAt(4));
	var query="DELETE FROM activite WHERE za_numero="+Numero+";";
	pgsql_update(query);
	tps_liste_charge();
    }
}

function tps_activite_load_all(){
    var query;
    // Chargement des taches
    query = "SELECT DISTINCT zt_phrase, zt_numero FROM tache;";
    fill_list("tache-menulist",query);

    // Chargement des thèmes 
    query = "SELECT DISTINCT zu_libelle, zu_numero FROM typesujet;";
    fill_list("theme-menulist",query);
    tps_activite_load_sujets();

    // Chargement des lieux
    query = "SELECT DISTINCT zl_libelle, zl_numero FROM lieu;";
    fill_list("lieu-menulist",query);

    // Chargement des groupes
    query = "SELECT DISTINCT zg_libelle, zg_numero FROM groupe;";
    fill_list("groupe-menulist",query);
    
    tps_activite_load_pour();
}

function tps_activite_load_pour(){
    var radio = elem("pour-radiogroup").selectedIndex;
    if (radio<=2) {
	elem("pour-textbox").hidden=false;
	elem("groupe-menulist").hidden=true;
    } else {
	elem("groupe-menulist").hidden=false;
	elem("pour-textbox").hidden=true;
    }
}

function tps_activite_load_sujets(){
    var theme = elem("theme-menulist").selectedItem;
    if (theme) {
	var query = "SELECT DISTINCT zs_libelle, zs_numero FROM sujet WHERE zu_numero="+theme.value+";";
	fill_list("sujet-menulist",query);
    }
}




function tps_date_cancel(){
    tps_date_enable(false);

    // Rafraichissement de la liste
    tps_liste_charge();    
}

function tps_date_commit(){
    // Verification de la date

    // Si OK, validation de la nouvelle date
    tps_date_enable(false);

    // Rafraichissement de la liste
    tps_liste_charge();
}

function tps_date_enable(state){
    var newState = state;
    elem("activite-insert").disabled=newState;
    elem("activite-update").disabled=newState;
    elem("activite-delete").disabled=newState;
    elem("current-date").disabled=!newState;
    elem("date-update").hidden=newState;
    elem("date-commit").hidden=!newState;
    elem("date-cancel").hidden=!newState;
}

function tps_date_update(){
    tps_date_enable(true);
}2



function tps_info_load() {
    var query = "SELECT AG_Nom, AG_Prenom, EM_Numero FROM Employe LEFT JOIN Agent ON (EM_Agent=AG_Numero) WHERE EM_Numero=current_employe();";
    var result = pgsql_query(query);
    var i = 0;
    if (result.rowCount>0){
	var enumer = result.enumerate();
	enumer.first();
	elem("agent-nom").value = enumer.getVariant(i++);
	elem("agent-prenom").value = enumer.getVariant(i++);
	elem("current-employe").value = enumer.getVariant(i++);
    } else {
	alert("Error");
    }
}



function tps_liste_charge() {
    elem("activite-update").disabled=true;
    elem("activite-delete").disabled=true;

    var query = "SELECT zt_numero, zt_libelle, zs_numero, zs_libelle, zl_numero, zl_libelle, za_numero, za_pour, za_duree, za_heuredebut, za_heurefin"
	+" FROM Activite LEFT JOIN Tache USING (zt_numero) LEFT JOIN Sujet USING (zs_numero)"
	+" LEFT JOIN Lieu USING (zl_numero)"
	+" WHERE em_numero="+current_employe()+" and '"+current_date()+"'= za_date;";
    var tree = fill_tree('activite-menulist', query);
  
    query = "SELECT sum(za_duree), count(za_numero) FROM Activite WHERE em_numero="+current_employe()+" and '"+current_date()+"'= za_date;";
    var result = pgsql_query(query);
    var i = 0;
    if (result.rowCount>0){
	var enumer = result.enumerate();
	enumer.first();
	elem("stat-total-horaire").value = enumer.getVariant(i++)+" min ("+toTime(enumer.getVariant(i-1))+")";
	elem("stat-nombre").value = enumer.getVariant(i++);
    } else {
	//	alert("Error");
    }
    
  
    if (tree.view.rowCount>0) {
	elem("activite-update").disabled=false;
	elem("activite-delete").disabled=false;
    }

    tps_activite_enable(false);
}

function tps_onload() {
    // Connexion
    pgsql_init(true);
    if (!pgsql_getConnectionState()){
	window.close();
    }
    
    // Chargement des informations personnelles
    tps_info_load();
    // Chargement de la date
    var pDate = new Date();
    elem("current-date").value = pDate.getDate()+"/"+(1*pDate.getMonth()+1)+"/"+pDate.getFullYear();
    // Chargement de la liste principale
    tps_liste_charge();
    tps_activite_load_all();
    //    alert("bonjour");
}

//alert("OK");
