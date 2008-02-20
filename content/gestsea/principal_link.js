/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function pgsql_query(query) { return opener.pgsql_query(query);}
function pgsql_update(query){ return opener.pgsql_update(query);}

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
		
	  if (idx<0) list.selectedIndex=0;
  	else{
  	  if (idx>=list.rowCount)	list.selectedIndex=list.rowCount-1;
	    else list.selectedIndex=idx;
	  }
  }
  list.setAttribute("lines",result.rowCount);
  return list;
}


function elem(id){
  var e = top.document.getElementById(id);
  if (e==null) { alert("L'élément "+id+' est introuvable.'); }
  return e;
}



function wg_onload(){
  var num_personne = opener.current_personne;
	if (opener.current_mode=='update') {
		elem('wg-target').hidden = true;
		fill_list('wg-personne-menulist',"SELECT pe_description, pe_numero FROM personne WHERE pe_numero="+opener.current_target+";");
	}
  elem('wg-personne').value = requete('SELECT pe_libelle FROM personne WHERE pe_numero='+num_personne+';');
  fill_list('wg-typelien-menulist','SELECT tl_action12 AS tl_action, tl_numero, true AS tl_direct FROM typelien WHERE LENGTH(TRIM(TL_Action12))>0 AND TL_Numero>1000 UNION ALL SELECT tl_action21 AS tl_action, tl_numero, false AS tl_direct FROM typelien WHERE LENGTH(TRIM(TL_Action21))>0 AND TL_Numero>1000 ORDER BY 1;');
  wg_display_result();
}

function wg_display_result() {
  var texte;
  texte = 'Résultat : '+elem('wg-personne').value;
  action = elem('wg-typelien-menulist');
  if (action.selectedItem!=null)
    texte += ' '+action.selectedItem.label+' ';
  else
    texte += ' ? ';
  personne = elem('wg-personne-menulist');
  if (personne.selectedItem!=null)
    texte += ' '+requete('SELECT pe_libelle FROM personne WHERE pe_numero='+personne.selectedItem.value+';');
  else
    texte += 'Y';
  elem('wg-result').value = texte;
}

var old_search=''

function wg_find_people(texte) {
//	var texte = elem('wg-personne-menulist').value;
//  	alert('>> '+texte);
	if (texte.length>3) {
    var queryend = "FROM personne WHERE ep_numero=500000002 AND pe_description ilike REPLACE('%"+texte+"%',' ','%');";
//	alert(queryend);
    var total = requete('SELECT count(DISTINCT pe_numero) '+queryend);
    elem('wg-total').value = total;
//	alert(total);
	  if (total>100) {
		  total = total +1;
//    alert('Il y a trop de résultats possibles, précisez votre recherche');
    } else {
      fill_list('wg-personne-menulist',"SELECT DISTINCT pe_description, pe_numero "+queryend);
    }
    old_search = texte;
    wg_display_result();
  }
}

function wg_ondialogaccept(){
	var query;
  var action = elem('wg-typelien-menulist');
  var personne = elem('wg-personne-menulist');
  if (personne.selectedItem!=null && action.selectedItem!=null) {
    var p1;
    var p2;
    var tl;
    tl = action.value;
  	if (action.selectedItem.getAttribute('direct')=='true') {
      p1 = opener.current_personne;
      p2 = personne.selectedItem.value;
    } else {
      p2 = opener.current_personne;
      p1 = personne.selectedItem.value;
    }
		if (opener.current_mode=='update') {
      var el = opener.current_lien;
			if (el==null) {
				alert("Pas de lien!");
				return 0;
			}
     	query = "UPDATE estlie SET el_personne1="+p1+",el_personne2="+p2+", tl_numero="+tl+" WHERE el_numero="+el+';';
		} else
     	query = "INSERT INTO estlie (el_personne1,el_personne2,tl_numero, el_debut) VALUES ("+p1+','+p2+','+tl+',CURRENT_DATE);';
//		alert(query);
    pgsql_update(query);
		opener.RefreshOngletEstLie(opener.current_compo);
  }
}

//alert("OK c'est chargé au moins");
