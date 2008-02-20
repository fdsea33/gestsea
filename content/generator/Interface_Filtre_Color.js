function Filtre_Color_ChargerCouleur(couleur)
{
	var colorpicker=top.document.getElementById("colorpicker");
	colorpicker.value=couleur;
}

function Filtre_Color_SauverCouleur()
{
	var colorpicker=top.document.getElementById("colorpicker");
	window.arguments[0][0]=colorpicker.value;
	window.arguments[0][1]=true;
}
