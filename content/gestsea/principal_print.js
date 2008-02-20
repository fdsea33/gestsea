/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function pgsql_query(query){
    //alert("pgsql");
    return opener.pgsql_query(query);
}

function print_onload(){
    // Récuperation des modèles de la société pour laquelle travaille l'agent en ce moment
    var query="SELECT IM_Libelle, IM_Numero FROM Impression;";
    //    alert();
    fill_list("print-modele-list",query);
}

function print_generer(){
    var list = elem("print-modele-list");
    if (list.selectedIndex>=0) {
	var radio=elem("print-radio");
	var modnum=list.selectedItem.value;
	alert(modnum);
	switch(radio.selectedIndex){
	case 0:
	    //alert("Un seul document : "+elem("print-numero").value);
	    var numero = elem("print-numero").value;
	    if (numero!="")
		opener.latex_ImprimerUnDocument(modnum,numero);
	    else
		alert("Vous devez compléter l'identifiant du document à imprimer");
	    break;
	case 1:
	    //alert("Plusieurs documents à partir du : "+elem("print-date-debut").value);
	    if (isDateValid(elem("print-date-debut").value) && isDateValid(elem("print-date-fin").value))
		opener.latex_ImprimerPlusieursDocuments(modnum,elem("print-date-debut").value,elem("print-date-fin").value);
	    else
		alert("Les dates ne sont pas valides.");
	    break;
	default:
	    alert("Vous devez choisir un mode d'impression.");
	}
    }else alert("Vous devez choisir un modèle d'impression");
}
