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



function wg_onload() {
  var num_personne = opener.current_personne;
  var morale = requete("SELECT CASE WHEN np_morale THEN 1 ELSE 0 END FROM personne join naturepersonne USING (np_numero) WHERE pe_numero="+num_personne);
  if (morale=='1') {
    alert("Vous devez changer de fiche, les sociétés ne peuvent pas avoir de compte sur le site web.\n Allez voir dans les liens.");
    window.close();
    return;
  }

  var pmail = requete("SELECT cn_coordonnee FROM contact WHERE cn_actif AND ck_numero=104 and pe_numero="+num_personne);
  var pid   = requete("SELECT pe_id FROM personne WHERE pe_numero="+num_personne);
  var ppass = requete("SELECT pe_motdepasse FROM personne WHERE pe_numero="+num_personne);
  var mailto = "mailto:"+pmail+"?subject=[FDSEA33] Identifiants de connexion au site www.fdsea33.fr&body=Bonjour,%0A%0AVoici les informations nécessaires pour vous connecter sur le site :%0A - Nom d\'utilisateur : fdsea"+pid+"%0A - Mot de passe : "+ppass+"%0A%0ACordialement,%0A%0ALe Service Informatique de la FDSEA";
  var l = elem("mailto");
  l.setAttribute("value",pmail);
  l.setAttribute("href",mailto);
/*
  l = elem("mailtoa");
  mailto = requete("select 'mailto:service.syndical@fdsea33.fr?subject=[FDSEA33] '||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM table_contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM table_attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM table_cotisation WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)+(CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)<=2 THEN -1 ELSE 0 END))) AS x;");
  l.setAttribute("href",mailto);
*/
}

//alert("OK c'est chargé au moins");
