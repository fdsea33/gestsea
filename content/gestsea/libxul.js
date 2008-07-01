/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
// Nécessite les fichiers suivants :
// - pgsql.js

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


/*
 *
 *     *******      *****    *      *
 *      *     *    *     *   **    **
 *      *     *   *       *  * *  * *
 *      *     *   *       *  *  **  *
 *      *     *    *     *   *      *
 *     *******      *****    *      *
 *
 */


function DeleteDataSource(object) {
  var sources=object.database.GetDataSources();
  var ds;
  while (sources.hasMoreElements()) {
    ds=sources.getNext();
    object.database.RemoveDataSource(ds);
  }
}



/* Retourne l'élément dans le document
 */
function elem(id){
  var e = top.document.getElementById(id);
  if (e==null) 
    alert('L\'élément "'+id+'" est introuvable dans le document.');
  return e;
}

/* Remplit une grille correctement
 * Renvoie le composant grid
 */
function grid_fill(id,query){
  var result = pgsql_query(query);
  var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
  var grid = elem(id);
  DeleteDataSource(grid);
  grid.database.AddDataSource(ds);
  grid.builder.rebuild();
  return grid;
}
function fill_grid(id,q) {return grid_fill(id,q);}


/* Remplit une liste correctement en conservant la ligne sélectionnée
 * Renvoie le composant liste
 */
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
function fill_list(id,q) {return listbox_fill(id,q);}


/* Remplit une liste déroulante correctement
 * Renvoie le composant liste
 */
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

/* Retourne la valeur courante d'une menulist
 */
function menulist_value(id) {
  var menulist = elem(id);
  if (menulist.selectedIndex>-1) return menulist.selectedItem.value;
  else return null;
}


/* Coche la case avec l'éxécution de la command liée 
 * Renvoie le composant checkbox 
 */
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

/* Coche la case avec l'éxécution de la command liée 
 * Renvoie le composant checkbox 
 */
function radiogroup_select(id, value, cond) {
  var c = elem(id);
  var valid = true;
  if (cond==true || cond==false) valid = cond;
  if (valid && c.checked!=value) {
    c.selectedIndex = value;
    c.doCommand();
  }
  return c;
}


/* Remplit une liste correctement en concervant la ligne sélectionnée */
function tree_fill(id,query){
    var result = pgsql_query(query);
    var ds = result.QueryInterface(Components.interfaces.nsIRDFDataSource);
    var tree = elem(id);
    var idx = tree.currentIndex;

    DeleteDataSource(tree);
    tree.database.AddDataSource(ds);
    tree.builder.rebuild();

    if (idx<0)
    	tree.view.selection.select(0);
    else {
    	if (idx>=tree.view.rowCount)
	      tree.view.selection.select(tree.view.rowCount-1);
    	else
  	    tree.view.selection.select(idx);
    }
    return tree;
}


/* Fonction utilisée pour vérifier la présence d'enregistrements spécifiques
 */
function pas_de_resultat(query){
  var result=pgsql_query(query);
  if (result.rowCount>0)
    return false;
  else
	  return true;
}
function a_un_resultat(q) {return !pas_de_resultat(q);}

