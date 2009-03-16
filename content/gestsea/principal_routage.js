/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function pgsql_query(query){ return opener.pgsql_query(query); }
function pgsql_update(query){ return opener.pgsql_update(query); }

function DeleteDataSource(object) {
  var sources=object.database.GetDataSources();
  var ds;
  while (sources.hasMoreElements()){
  	ds=sources.getNext();
	  object.database.RemoveDataSource(ds);
  }
  return null;
}

function requete(query) {
  result=pgsql_query(query);
  if (result.rowCount<=0) {
    return null;
  } else {
    enumr=result.enumerate();
    enumr.first();
    return enumr.getVariant(0);
  }
  return null;
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
		
	  if (idx<0) {
      list.selectedIndex=0;
  	} else {
  	  if (idx>=list.rowCount) {
        list.selectedIndex=list.rowCount-1;
	    } else {
        list.selectedIndex=idx;
      }
	  }
  }
  list.setAttribute("lines",result.rowCount);
  return list;
}


function elem(id){return top.document.getElementById(id);}

function ro_start(){
  var num=opener.FactureEnCours;
  elem('r-facture').value = requete('SELECT fa_numfact FROM facture WHERE fa_numero='+num+';');
  elem('r-personne').value = requete('SELECT pe_numero FROM facture WHERE fa_numero='+num+';');
  fill_list('r-typelien-menulist','SELECT tl_action12 AS tl_action, tl_numero, true AS tl_direct FROM typelien WHERE LENGTH(TRIM(TL_Action12))>0 AND TL_Numero>1000 UNION ALL SELECT tl_action21 AS tl_action, tl_numero, false AS tl_direct FROM typelien WHERE LENGTH(TRIM(TL_Action21))>0 AND TL_Numero>1000 ORDER BY 1;');
  /*
    fill_list('r-typeattribut-menulist','SELECT ta_nom, ta_numero FROM typeattribut;');
    ro_charge_categorie(elem('r-typeattribut-menulist').selectedItem.value);
    elem('r-debut').value=requete('SELECT cs_valeur FROM constante WHERE cs_type=1;');
    elem('r-fin').value=1*elem('r-debut').value+21;
  */
  return true;
}

function ro_charge_categorie(ta_num) {
  fill_list('r-categorie-menulist','SELECT cr_libelle, cr_numero FROM categorie WHERE ta_numero='+ta_num+';');
}

function ro_charge_detail(cr_num) {
  elem('c-detail').value=requete('SELECT count(*) AS nb FROM attribut WHERE cr_numero='+cr_num+';')+' personne(s) concernée(s)';
}

function ro_routage_create() {
  var tl = elem('r-typelien-menulist');
  var tl_num = tl.selectedItem.value;
  var direct = tl.selectedItem.getAttribute('direct');
  var debut  = elem('r-debut').value;
  var fin    = elem('r-fin').value;
  var total = requete('SELECT count(*) FROM personne WHERE pe_numero IN (SELECT CASE WHEN '+direct+' THEN el_personne2 ELSE el_personne1 END FROM estlie WHERE '+elem('r-personne').value+' = CASE WHEN '+direct+' THEN el_personne1 ELSE el_personne2 END)');
  if (total>0) {
    if (confirm('Il y a '+total+' personne(s) à ajouter au routage. Voulez-vous continuer ?')) {
      pgsql_query("SELECT FC_Route_par_lien("+opener.FactureEnCours+", "+tl_num+", "+direct+", '"+debut+"', '"+fin+"');");
      opener.CurrentCompo.Refresh();
      alert("Opération terminée");
    } else {
      alert('Aucune personne à ajouter au routage');
    }
  }

  /*
    var cr_num = elem('r-categorie-menulist').selectedItem.value;
    pgsql_query("SELECT FC_RoutageCategorie("+opener.FactureEnCours+", "+cr_num+","+debut+","+fin+");");
  */
  return true;
}



function ro_routage_update() {
  if (confirm("Etes-vous sûr(e) de modifier ces routages ?")) {
    var where = ro_where();
    var attributes = ro_attributes();
    elem('last-query').label = "UPDATE routage SET "+attributes+" WHERE fa_numero="+opener.FactureEnCours+" AND "+where+";";
 	  pgsql_update("UPDATE routage SET "+attributes+" WHERE fa_numero="+opener.FactureEnCours+" AND "+where+";");    
    opener.CurrentCompo.Refresh();
    alert('Routages mis à jour');
  }  
  return true;
}

function ro_routage_delete() {
  if (confirm("Etes-vous sûr(e) de vouloir supprimer ces routages associés à cette facture ?")) {
    var where = ro_where();
 	  pgsql_update("DELETE FROM routage WHERE fa_numero="+opener.FactureEnCours+" AND "+where+";");
    opener.CurrentCompo.Refresh();
    alert('Routages supprimés');
  }
  return true;
}


function ro_where() {
  var where='true';
  if (elem('r-filter-debut-checkbox').checked) {
    where += ' AND ro_debutservice '+elem('r-filter-debut-menulist').selectedItem.value+' '+elem('r-filter-debut').value
  }
  if (elem('r-filter-fin-checkbox').checked) {
    where += ' AND ro_finservice '+elem('r-filter-fin-menulist').selectedItem.value+' '+elem('r-filter-fin').value
  }
  return where;
}

function ro_attributes() {
  var attributes = 'updated_at=current_timestamp';
  if (elem('r-new-debut-checkbox').checked) {
    attributes += ', ro_debutservice='+elem('r-new-debut').value
  }
  if (elem('r-new-fin-checkbox').checked) {
    attributes += ', ro_finservice='+elem('r-new-fin').value
  }
  return attributes;
}



/*
alert("OK c'est chargé au moins "+opener.location.pathname);
*/
