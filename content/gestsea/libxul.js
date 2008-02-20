// Nécessite les fichiers suivants :
// - pgsql.js

function elem(id){
    return top.document.getElementById(id);
}

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
function fill_listo(list,query){
    var result = pgsql_query(query);
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


/* Fonction utilisée pour vérifier la présence d'enregistrements spécifiques */
function pas_de_resultat(query){
    var result=pgsql_query(query);
    if (result.rowCount>0)
	return false;
    else
	return true;
}
