/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
var CompoPerso;
var Max;

function remplir_arbre(result)
{
	var tree=top.document.getElementById("arbre");

	var sources=tree.database.GetDataSources();
	var oldds;

	while (sources.hasMoreElements()) {
		oldds = sources.getNext();
		tree.database.RemoveDataSource(oldds);
	}

	var ds=result.QueryInterface(Components.interfaces.nsIRDFDataSource);
	tree.database.AddDataSource(ds);

	tree.builder.rebuild();
}

function OnLoadPop(PCompoPerso,res)
{
	Max=res.rowCount;
	top.document.getElementById("MaxEnrg").value=Max;
	CompoPerso=PCompoPerso;
	remplir_arbre(res);
}


function tree_select(tree)
{
	if (tree.view!=null && tree.currentIndex!=-1)
	{
		var cle=tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(0));
		CompoPerso.ForceNextSelection(cle);
		CompoPerso.SelectItem(cle);
	}
}
