const ACTIVE_EXTRACT=true;
const TAILLE_LETTRE = 10;
const TAILLE_IMAGE = 32;
/* répértoire du générateur */
const GEN_PATH = "chrome://gestsea/content/generator/";
const LIMIT = 50;

const MODE_ADDON_LIMIT_PREV = 0;
const MODE_ADDON_LIMIT_NEXT = 1;
const MODE_ADDON_LIMIT_GOTO = 2;
/*
  include utils_xul.js
  include pgsql.js
  include generator_sql.js
  include pointer.js
*/

var CURRENT_ID_GLOBAL=0;

function GenererNewId()
{
    CURRENT_ID_GLOBAL++;
    return CURRENT_ID_GLOBAL;
}

/* ********* INTERFACEFILTRAGE *************** */
function clInterfaceFiltrage()
{
    this.my_Filtre=new clFiltre();
    this.my_ComposantSQL=null;
    this.my_Champs="";
    this.my_CompoAuto=true;
    this.my_NomChamps="";
    this.my_Jointure=null;
    this.my_ComposantSQLConstructeur=new Array();
    
    this.my_Id=GenererNewId();
    /* pour la désactivation du filtre  */
    this.my_CompoXul=null;
    this.CompoXulDesactivable=false;
}

clInterfaceFiltrage.prototype.getId=
    function()
{
    return this.my_Id;
}

clInterfaceFiltrage.prototype.ActiverComposant=
    function(bool)
{
    if (this.CompoXulDesactivable)
    {
	this.my_CompoXul.disabled=!bool;
    }
}

clInterfaceFiltrage.prototype.setComposantConstructeur =
    function(Composant)
{
    this.my_ComposantSQLConstructeur.push(Composant);
    //this.OnComposantAttache();
}
/*
  clInterfaceFiltrage.prototype.OnComposantAttache =
  function()
  {}
*/
clInterfaceFiltrage.prototype.setComposant =
    function(Composant,Jointure){
	this.my_ComposantSQL=Composant;

	var joint;

	/* Pour jointure descendante */
	if (Jointure!=null)
	{
	    joint=new clJointureMulti();

	    /* on doit faire une jointure au sens large dans le sens descendant */
	    joint.ClonerLarge(Jointure);

	    joint.ReConstruire(joint.getFirstCle());

	    this.my_Jointure=joint;
	}
	this.my_ComposantSQL.AjouterFiltre(joint,this.my_Filtre,"AND");
	this.my_ComposantSQL.ActiverFiltres(true);
	this.AfterSetComposant(Composant,Jointure);
    }


clInterfaceFiltrage.prototype.AfterSetComposant =
    function(Composant,Jointure){}

clInterfaceFiltrage.prototype.getCompoAuto =
    function(){
	return this.my_CompoAuto;
    }


clInterfaceFiltrage.prototype.setNomChamps =
    function(NomChamps){
	this.my_NomChamps=NomChamps;
    }


clInterfaceFiltrage.prototype.setChamps =
    function(Champs){
	this.my_Champs=Champs;
    }

clInterfaceFiltrage.prototype.AftersetValeur =
    function()
{}

clInterfaceFiltrage.prototype.setValeur =
    function(Valeur){
	this.my_Valeur=Valeur;
	this.AftersetValeur(Valeur);
    }


/* function privée */
clInterfaceFiltrage.prototype.CalculerCondition =
    function(Val,strict){
	if (Val!=null)
	this.my_Valeur=Val;

	if (strict==null)
	strict=true;

	var cond;

	if (this.my_Valeur!=null && this.my_Valeur!="")
	{
	    var ValValide=ValiderChaine(this.my_Valeur);
	    if (strict)
		cond=this.my_Champs+"='"+ValValide+"'";
	    else
		cond=this.my_Champs+" ilike '%"+ValValide+"%' ";

	}
	else
	cond=this.my_Champs+" is NULL";

	this.my_Filtre.setCondition(cond);
	return cond;
    }



clInterfaceFiltrage.prototype.EntrerVal =
    function(){
	var val;
	if (this.my_Valeur!=null)
	val=this.my_Valeur;

	var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	var input = {value: val};
	var check = {value: false};

	var result = prompts.prompt(window, "Filtrage sur "+this.my_NomChamps, "Entrez une valeur pour filtrer le champ "+this.my_NomChamps, input, "Recherche stricte", check);
	// input.value is the string user entered
	// check.value indicates whether or not the checkbox is checked
	// result - whether user clicked OK (true) or Cancel

	if (result)
	{
	    this.CalculerCondition(input.value,check.value);
	    this.Activer(true);
	}
	return result;
    }


clInterfaceFiltrage.prototype.Activer =
    function(etat){
	this.my_Filtre.Activer(etat);
	if (this.my_ComposantSQL!=null)
	this.my_ComposantSQL.RefreshTotal();
    }


clInterfaceFiltrage.prototype.GenererXUL =
    function(ParentXul,Compo){}


/* ********* INTERFACEFILTRAGEVIDE *************** */
clInterfaceFiltrageVide.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageVide()
{
    this.parent=clInterfaceFiltrage;
    this.parent();
}


/* ********* INTERFACEFILTRAGEMENULIST *************** */
clInterfaceFiltrageMenuListe.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageMenuListe()
{
    this.parent=clInterfaceFiltrage;
    this.parent();
}

clInterfaceFiltrageMenuListe.prototype.Filtrer =
    function(Val){
	var Activer=(Val!=null && Val!='');

	if (Activer)
	{
	    this.my_Valeur=Val;
	    var ValValide=ValiderChaine(this.my_Valeur);
	    var Cond=this.my_Champs+" ilike '"+ValValide+"%' ";
	    this.my_Filtre.setCondition(Cond);
	}
	this.Activer(Activer);
	return Activer;
    }

/* ********* INTERFACEFILTRAGEDEFAUT *************** */
clInterfaceFiltrageDefaut.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageDefaut()
{
    this.parent=clInterfaceFiltrage;
    //this.my_InterfaceXUL="InterfaceFiltrageDefaut.xul";
    this.parent();
    this.my_ImageEtat=null;
}


clInterfaceFiltrageDefaut.prototype.OnClick =
    function(mode){
	switch (mode){
	    case 1:
	    this.CalculerCondition();
	    this.Activer(true);
	    this.my_ImageEtat.setAttribute("class","icon_filtre_defaut_actif");
	    break;

	    case 2:
	    if (this.EntrerVal())
	    {
		this.my_ImageEtat.setAttribute("class","icon_filtre_defaut_actif");
	    }
	    break;

	    case 3:
	    this.my_ImageEtat.setAttribute("class","icon_filtre_defaut_inactif");
	    this.Activer(false);
	    break;
	}
    }

clInterfaceFiltrageDefaut.prototype.GenererXUL =
    function(ParentXul,Compo){

	var image,popup,menuitem;
	var myDoc=top.document;
	var ref=AddVar(this);
	var id=genererId();

	if (this.my_ComposantSQL==null)
	{
	    var label;
	    label=myDoc.createElement("label");
	    label.setAttribute("value","(Pas de maître pour filtrer)");
	    ParentXul.appendChild(label);
	    return;
	}

	image=myDoc.createElement("toolbarbutton");
	image.setAttribute("class","icon_filtre_defaut_inactif");
	image.setAttribute("popup",id);
	image.setAttribute("tooltiptext","Filtrer '"+this.my_ComposantSQL.NomChamps+"' sur '"+this.my_NomChamps+"'");
	ParentXul.appendChild(image);

	popup=myDoc.createElement("popup");
	popup.setAttribute("id",id);
	ParentXul.appendChild(popup);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Filtrer sur la valeur en cours");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(1);");
	popup.appendChild(menuitem);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Filtrer sur une valeur");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(2);");
	popup.appendChild(menuitem);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Défiltrer");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(3);");
	popup.appendChild(menuitem);

	this.my_CompoXul=image;

	this.my_ImageEtat=image;
    }

/* ********* INTERFACEFILTRAGEPERMANANT *************** */
clInterfaceFiltragePermanant.prototype=new clInterfaceFiltrage();

function clInterfaceFiltragePermanant()
{
    this.parent=clInterfaceFiltrage;
    //this.my_InterfaceXUL="InterfaceFiltrageDefaut.xul";
    this.parent();
}

clInterfaceFiltragePermanant.prototype.AftersetValeur =
    function(Valeur){
	/* refresh auto du filtre */
	if (this.my_Filtre.getEtat())
	{
	    this.CalculerCondition();
	    this.Activer(true);
	}
    }


clInterfaceFiltragePermanant.prototype.GenererXUL =
    function(){
	this.CalculerCondition();
	this.Activer(true);
    }

/* ********* INTERFACEFILTRAGEHautBas *************** */
clInterfaceFiltrageContenuHautBas.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageContenuHautBas(FiltreDessus)
{
    this.parent=clInterfaceFiltrage;
    //this.my_InterfaceXUL="InterfaceFiltrageDefaut.xul";
    this.parent();
    this.my_CompoAuto=false;
    this.my_ImageEtat=null;
    /* le filtre du dessous si on est sur le filtre du dessus et inversement */
    this.LAutreFiltre=null;
    this.Haut=(FiltreDessus==null);
    if (FiltreDessus==null)
	{
	    this.classActif="icon_FlecheBas";
	    this.classInActif="icon_FlecheBas_Inactif";
	}
    else
	{
	    this.classActif="icon_FlecheHaut";
	    this.classInActif="icon_FlecheHaut_Inactif";
	    this.LAutreFiltre=FiltreDessus;
	    FiltreDessus.LAutreFiltre=this;
	}
}

clInterfaceFiltrageContenuHautBas.prototype.AftersetValeur =
    function(Valeur){
	/* refresh auto du filtre */
	if (this.my_Filtre.getEtat())
	{
	    this.CalculerCondition();
	    this.Activer(true);
	}
    }


clInterfaceFiltrageContenuHautBas.prototype.OnClickActiver =
    function()
{
    this.CalculerCondition();
    this.Activer(true);
    this.my_ImageEtat.setAttribute("class",this.classActif);
}

clInterfaceFiltrageContenuHautBas.prototype.OnClickDeActiver =
    function()
{
    this.my_ImageEtat.setAttribute("class",this.classInActif);
    this.Activer(false);
}


clInterfaceFiltrageContenuHautBas.prototype.OnClick =
    function(){
	if (!this.my_Filtre.getEtat())
	{
	    this.LAutreFiltre.OnClickDeActiver();
	    this.OnClickActiver();
	}
	else
	{
	    this.OnClickDeActiver();
	    this.LAutreFiltre.OnClickActiver();
	}
    }

clInterfaceFiltrageContenuHautBas.prototype.GenererXUL =
    function(ParentXul,Compo){

	var image;
	var myDoc=top.document;
	var ref=AddVar(this);

	//<autorepeatbutton class="autorepeatbutton-up" oncommand="this.parentNode.scrollByIndex(-1); event.preventBubble();"/>


	if (this.my_ComposantSQL==null)
	{
	    var label;
	    label=myDoc.createElement("label");
	    label.setAttribute("value","(Pas de maître pour filtrer)");
	    ParentXul.appendChild(label);
	    return;
	}

	image=myDoc.createElement("toolbarbutton");
	image.setAttribute("tooltiptext","Filtrer '"+this.my_ComposantSQL.NomChamps+"' sur '"+this.my_NomChamps+"'");
	image.setAttribute("oncommand","GetVar("+ref+").OnClick();");
	ParentXul.appendChild(image);

	this.my_CompoXul=image;

	this.my_ImageEtat=image;

	/* Un des 2 filtres doit être actif */
	if (this.Haut)
	{
	    this.CalculerCondition();
	    this.Activer(true);
	    image.setAttribute("class",this.classActif);
	}
	else
	image.setAttribute("class",this.classInActif);
    }



/* ********* INTERFACEFILTRAGEBOOL *************** */
clInterfaceFiltrageBool.prototype=new clInterfaceFiltrageDefaut();

function clInterfaceFiltrageBool()
{
    this.parent=clInterfaceFiltrageDefaut;
    this.parent();
    //this.my_ImageEtat=null;
}

clInterfaceFiltrageBool.prototype.CalculerCondition =
    function(Val){
	if (Val!=null)
	this.my_Valeur=Val;

	var cond;

	if (this.my_Valeur)
	{
	    cond=this.my_Champs+"= true";

	}
	else
	cond=this.my_Champs+"= false";

	this.my_Filtre.setCondition(cond);
    }


clInterfaceFiltrageBool.prototype.EntrerVal =
    function(){
	var val;
	if (this.my_Valeur!=null)
	val=this.my_Valeur;

	var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	var check = {value: val};

	prompts.alertCheck(window, "Filtrage sur "+this.my_NomChamps, "Cocher pour OUI décocher pour NON",this.my_NomChamps, check);

	this.CalculerCondition(check.value);
	this.Activer(true);

	return true;
    }


/* ********* INTERFACEFILTRAGECOLOR *************** */
clInterfaceFiltrageColor.prototype=new clInterfaceFiltrageDefaut();

function clInterfaceFiltrageColor()
{
    this.parent=clInterfaceFiltrageDefaut;
    this.parent();
    //this.my_ImageEtat=null;
}

clInterfaceFiltrageColor.prototype.EntrerVal =
    function(){
	var val;
	if (this.my_Valeur!=null)
	val=this.my_Valeur;

	var Param=new Array();
	Param.push(val);
	Param.push(false);

	/* on modifie param par fx de bord */
	window.openDialog(GEN_PATH+"Interface_Filtre_Color.xul", "showmore", "centerscreen,close=no,modal,chrome,scrollbars,resizable=no",Param);

	if (Param[1])
	{
	    this.CalculerCondition(Param[0]);
	    this.Activer(true);
	}

	return (Param[1]);
    }

/* ********* INTERFACEFILTRAGEPERMANANTCUSTOM *************** */
clInterfaceFiltragePermanantCustom.prototype=new clInterfaceFiltrage();

function clInterfaceFiltragePermanantCustom(Condition)
{
    this.parent=clInterfaceFiltrage;
    this.my_CompoAuto=false;
    this.my_Filtre.setCondition(Condition);
    this.my_CompoAuto=false;
}

clInterfaceFiltragePermanantCustom.prototype.GenererXUL =
    function(){
	this.Activer(true);
    }

/* ********* INTERFACEFILTRAGECUSTOM *************** */
clInterfaceFiltrageCustom.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageCustom(Nom,Condition)
{
    this.parent=clInterfaceFiltrage;
    this.parent();
    this.my_Nom=Nom;
    this.my_Cond=Condition;
    this.my_Filtre.setCondition(Condition);
    this.my_button=null;
    this.actif=true;
    this.my_CompoAuto=false;
}

clInterfaceFiltrageCustom.prototype.OnClick =
    function(){
	this.Activer(this.actif);
	this.actif=!(this.actif);
	//this.my_button.oncommand="GetVar("+ref+").OnClick();";
    }


clInterfaceFiltrageCustom.prototype.GenererXUL =
    function(ParentXul,Compo){
	var button;
	var myDoc=top.document;
	var ref=AddVar(this);

	button=myDoc.createElement("radio");
	button.setAttribute("label",this.my_Nom);
	button.setAttribute("oncommand","GetVar("+ref+").OnClick();");
	ParentXul.appendChild(button);

	this.my_button=button;

	this.my_CompoXul=button;

	return button;
    }




/* ********* INTERFACEFILTRAGEENSXCUSTOM *************** */
clInterfaceFiltrageEnsXCustom.prototype=new clInterfaceFiltrage();

/* tableau avec (nom,condition) */
function clInterfaceFiltrageEnsXCustom(Tab_Nom_Condition)
{
    if (arguments.length==0)
	return;

    this.parent=clInterfaceFiltrage;
    this.parent();
    var i;
    var It;
    this.my_TabFiltreCustom=new Array();
    for(i=0;i<Tab_Nom_Condition.length;i+=2)
	{
	    It=new clInterfaceFiltrageCustom(Tab_Nom_Condition[i],Tab_Nom_Condition[i+1]);
	    this.my_TabFiltreCustom.push(It);
	}
    this.my_CompoAuto=false;
}


clInterfaceFiltrageEnsXCustom.prototype.AfterSetComposant =
    function(Composant,Jointure){
	var i;
	for(i=0;i<this.my_TabFiltreCustom.length;i++)
	{
	    this.my_TabFiltreCustom[i].setComposant(Composant,Jointure);
	}
    }


clInterfaceFiltrageEnsXCustom.prototype.OnClick =
    function(id){
	if (id!=-1)
	{
	    var Condition=this.my_TabFiltreCustom[id].my_Cond;
	    this.my_Filtre.setCondition(Condition);
	    this.Activer(true);
	}
	else
	{
	    this.Activer(false);
	}
    }


clInterfaceFiltrageEnsXCustom.prototype.GenererXUL =
    function(ParentXul,Compo){
	var button,but_slave;
	var myDoc=top.document;
	var ref=AddVar(this);
	var RadioGroup;

	RadioGroup=myDoc.createElement("radiogroup");
	RadioGroup.setAttribute("orient","horizontal");
	ParentXul.appendChild(RadioGroup);

	button=myDoc.createElement("radio");
	button.setAttribute("label","Tout");
	button.setAttribute("selected","true");
	button.setAttribute("oncommand","GetVar("+ref+").OnClick(-1);");
	RadioGroup.appendChild(button);

	for(i=0;i<this.my_TabFiltreCustom.length;i++)
	{
	    but_slave = this.my_TabFiltreCustom[i].GenererXUL(RadioGroup,Compo);
	    but_slave.setAttribute("oncommand","GetVar("+ref+").OnClick("+i+");");
	}

	this.my_CompoXul=RadioGroup;

	this.my_button=button;
    }


/* ********* INTERFACEFILTRAGERELATIONONGLET *************** */
clInterfaceFiltrageRelationOnglet.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageRelationOnglet(NomOnglet,FctOuvertureOnglet,FctFermetureOnglet,LiaisonForte)
{
    this.parent=clInterfaceFiltrage;
    this.parent();
    if (LiaisonForte==null)
	LiaisonForte=false;
    //this.my_Filtre.setCondition(Condition);
    this.actif=true;
    this.NomOnglet=NomOnglet;
    this.FctOuvertureOnglet=FctOuvertureOnglet;
    this.FctFermetureOnglet=FctFermetureOnglet;
    this.my_CompoAuto=false;
    this.my_cond='';
    this.ComposantConstructeur=null;
    this.my_Filtre.setActiveSurUnion(false);

    /* ce filtre est desactivable */
    this.CompoXulDesactivable=!LiaisonForte;
}

clInterfaceFiltrageRelationOnglet.prototype.Defiltrer =
    function()
{
    this.Activer(false);
}

clInterfaceFiltrageRelationOnglet.prototype.AjouterCle =
    function(Cle)
{
    if (this.my_cond!='')
    this.my_cond+=" OR "+this.my_Champs+"="+Cle;
    else
    this.my_cond=this.my_Champs+"="+Cle;

    this.my_Filtre.setCondition(this.my_cond);
    this.Activer(true);
}

clInterfaceFiltrageRelationOnglet.prototype.OnClick =
    function(ComposantConstructeur){
	var AllCle=ComposantConstructeur.getAllCleVal();
	var val;

	this.my_cond='';

	if(AllCle.length==0)
	this.my_cond=this.my_Champs+" is NULL";

	for(i=0;i<AllCle.length;i++)
	{
	    if (i!=0)
		this.my_cond+=" OR ";

	    val=AllCle[i];

	    if(val!="" && val!=null)
		this.my_cond+=this.my_Champs+"="+val;
	    else
		this.my_cond+=this.my_Champs+" is NULL";
	}

	this.my_Filtre.setCondition(this.my_cond);
	this.Activer(true);
	this.FctOuvertureOnglet(this.getId());
	this.my_ComposantSQL.my_ReqRefresh.setUnion(null);
	this.my_ComposantSQL.RefreshTotal();
    }

clInterfaceFiltrageRelationOnglet.prototype.Refresh =
    function(){
	this.ComposantConstructeur.RefreshTotal();
    }

clInterfaceFiltrageRelationOnglet.prototype.OnClose =
    function(suppr,appellerFct){
	/* si on est actif */
	if (appellerFct==null)
	appellerFct=true;

	if (this.my_Filtre.getEtat())
	{
	    /* mode ajout ou mise à jour */
	    if (!suppr)
		{
		    /* on refresh le composant */
		    //      var TabCle=this.my_ComposantSQL.getAllCleVal();
		    var ReqNewCle=new clReqSQL();
		    /* pour le select */
		    ReqNewCle.Cloner(this.ComposantConstructeur.my_ReqInterne,SELECT);
		    ReqNewCle.Cloner(this.ComposantConstructeur.my_ReqInterne,FROM);

		    /* pour le where */
		    ReqNewCle.Cloner(this.my_ComposantSQL.my_ReqRefresh.getUnion(),WHERE);
		    //       var i;
		    //       for (i=0;i<TabCle.length;i++)
		    //       {
		    //         ReqNewCle.AddWhere(this.ComposantConstructeur.getCle()+" = "+TabCle[i],"OR");
		    //       }
		    //       ReqNewCle.setUnion(this.ComposantConstructeur.my_ReqRefresh.getUnion());

		    this.ComposantConstructeur.Union(ReqNewCle);
		}

	    this.ComposantConstructeur.RefreshTotal();
	    this.Activer(false);

	    if (appellerFct && this.FctFermetureOnglet!=null)
		this.FctFermetureOnglet();
	}
    }



clInterfaceFiltrageRelationOnglet.prototype.GenererXUL =
    function(ParentXul,ComposantConstructeur){
	var button;
	var myDoc=top.document;
	var ref=AddVar(this);
	this.ComposantConstructeur=ComposantConstructeur;
	var refCompo=AddVar(ComposantConstructeur);

	button=myDoc.createElement("button");
	button.setAttribute("label","Gerer "+this.NomOnglet);
	button.setAttribute("oncommand","GetVar("+ref+").OnClick(GetVar("+refCompo+"));");
	ParentXul.appendChild(button);

	this.my_CompoXul=button;
	/*
	  button=myDoc.createElement("button");
	  button.setAttribute("label","Close "+this.NomOnglet);
	  button.setAttribute("oncommand","GetVar("+ref+").OnClose();");
	  ParentXul.appendChild(button);
	*/

    }

/* ********* INTERFACEFILTRAGECOLDEFAUT *************** */
clInterfaceFiltrageColDefaut.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageColDefaut()
{
    this.parent=clInterfaceFiltrage;
    this.parent();
    this.my_ImageEtat=null;
}


clInterfaceFiltrageColDefaut.prototype.OnClick =
    function(mode){
	switch (mode){
	    case 1:
	    this.CalculerCondition();
	    this.Activer(true);
	    this.my_ImageEtat.setAttribute("class","icon_filtre_col_active");
	    break;

	    case 2:
	    if (this.EntrerVal())
	    {
		this.my_ImageEtat.setAttribute("class","icon_filtre_col_active");
	    }
	    break;

	    case 3:
	    this.my_ImageEtat.setAttribute("class","icon_filtre_col");
	    this.Activer(false);
	    break;
	}
    }

clInterfaceFiltrageColDefaut.prototype.GenererXUL =
    function(ParentXul,Compo){
	var deck,image,popup,menuitem;
	var myDoc=top.document;
	var ref=AddVar(this);
	var id=genererId();

	popup=myDoc.createElement("popup");
	popup.setAttribute("id",id);
	ParentXul.appendChild(popup);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Filtrer sur la ligne en cours");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(1);");
	popup.appendChild(menuitem);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Filtrer sur une valeur");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(2);");
	popup.appendChild(menuitem);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Défiltrer");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(3);");
	popup.appendChild(menuitem);

	deck=myDoc.createElement("deck");
	ParentXul.appendChild(deck);

	image=myDoc.createElement("image");
	image.setAttribute("class","icon_filtre_col");
	image.setAttribute("popup",id);
	image.setAttribute("tooltiptext","Filtrer '"+this.my_ComposantSQL.NomChamps+"' sur la colonne '"+this.my_NomChamps+"'");
	deck.appendChild(image);

	this.my_CompoXul=image;

	this.my_ImageEtat=image;
    }

/* ********* INTERFACEFILTRAGEARBREDEFAUT *************** */
clInterfaceFiltrageArbreDefaut.prototype=new clInterfaceFiltrage();

function clInterfaceFiltrageArbreDefaut()
{
    this.parent=clInterfaceFiltrage;
    this.parent();
    this.my_tree=null;
    this.my_ImageEtat=null;
    this.TabFiltreCol=null;
}


clInterfaceFiltrageArbreDefaut.prototype.setArbre =
    function(tree)
{
    this.my_tree=tree;
}

clInterfaceFiltrageArbreDefaut.prototype.setTabFiltreCol =
    function(TabFiltreCol)
{
    this.TabFiltreCol=TabFiltreCol;
}

/* doit être appellé après setTabFiltreCol */
clInterfaceFiltrageArbreDefaut.prototype.setComposant =
    function(Composant,Jointure){
	this.my_ComposantSQL=Composant;

	var joint;

	/* Pour jointure descendante */
	if (Jointure!=null)
	{
	    joint=new clJointureMulti();

	    /* on doit faire une jointure au sens large dans le sens descendant */
	    joint.ClonerLarge(Jointure);
      
	    joint.ReConstruire(joint.getFirstCle());



	    /* pour le filtre par colonne */
	    var i;
	    for(i=0;i<this.TabFiltreCol.length;i++)
		{
		    if (this.TabFiltreCol[i].my_Jointure!=null)
			joint.Fusionner(this.TabFiltreCol[i].my_Jointure);
		}

	    this.my_Jointure=joint;
	}
	this.my_ComposantSQL.AjouterFiltre(joint,this.my_Filtre,"AND");
	this.my_ComposantSQL.ActiverFiltres(true);
    }


clInterfaceFiltrageArbreDefaut.prototype.OnClick =
    function(mode){

	/* on filtre sur l'union de toute les cles */
	var tree=this.my_tree;
	var i,val;
	var IdCol=tree.treeBoxObject.columns.getColumnAt(0);
	var cond="";

	switch (mode){
	case 1:
	    /* au moins une des ligne */
	    if(tree.view.rowCount==0)
		cond=this.my_Champs+" is NULL";

	    for(i=0;i<tree.view.rowCount;i++)
		{
		    if (i!=0)
			cond=cond+" OR ";
		    val=tree.view.getCellValue(i,IdCol);
		    if(val!="" && val!=null)
			cond=cond+this.my_Champs+"="+val;
		    else
			cond=cond+this.my_Champs+" is NULL";
		}
      
	    this.my_Filtre.setCondition(cond);

	    this.Activer(true);
	    this.my_ImageEtat.setAttribute("class","icon_filtre_defaut_actif");
	    break;

	case 2:
	    /* ligne en cours */
	    this.CalculerCondition();
	    this.Activer(true);
	    this.my_ImageEtat.setAttribute("class","icon_filtre_defaut_actif");
	    break;

	case 3:
	    /* par colonne */
	    var cond="";
	    var SousCond;
	    var premier=true;
	    var i;
	    for(i=0;i<this.TabFiltreCol.length;i++)
		{
		    SousCond=this.TabFiltreCol[i].my_Filtre.getCondition();
		    if (SousCond!="" && this.TabFiltreCol[i].my_Filtre.getEtat())
			{
			    if (!premier)
				cond+=" AND ";
			    cond+=SousCond;
			    premier=false;
			}
		}
	    this.my_Filtre.setCondition(cond);
	    this.Activer(true);
	    this.my_ImageEtat.setAttribute("class","icon_filtre_defaut_actif");
	    break;

	case 4:
	    this.Activer(false);
	    this.my_ImageEtat.setAttribute("class","icon_filtre_defaut_inactif");
	    break;
	}


	if (actif)
	{

	}
	this.Activer(actif);
    }

clInterfaceFiltrageArbreDefaut.prototype.GenererXUL =
    function(ParentXul,Compo){

	var image,menupopup,menuitem,menu,sous_menupopup,menuseparator;
	var myDoc=top.document;
	var ref=AddVar(this);
	var id=genererId();

	if (this.my_ComposantSQL==null)
	{
	    var label;
	    label=myDoc.createElement("label");
	    label.setAttribute("value","(Pas de maître pour filtrer)");
	    ParentXul.appendChild(label);
	    return;
	}

	image=myDoc.createElement("toolbarbutton");
	image.setAttribute("class","icon_filtre_defaut_inactif");
	image.setAttribute("popup",id);
	image.setAttribute("tooltiptext","Filtrer '"+this.my_ComposantSQL.NomChamps+"' sur '"+this.my_NomChamps+"'");
	ParentXul.appendChild(image);

	menupopup=myDoc.createElement("menupopup");
	menupopup.setAttribute("id",id);
	ParentXul.appendChild(menupopup);

	menu=myDoc.createElement("menu");
	menu.setAttribute("label","Filtrer '"+this.my_ComposantSQL.NomChamps+"' dont '"+this.my_NomChamps+"' correspond aux lignes affichées");
	menupopup.appendChild(menu);

	sous_menupopup=myDoc.createElement("menupopup");
	menu.appendChild(sous_menupopup);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Au moins une des lignes");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(1);");
	sous_menupopup.appendChild(menuitem);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Ligne en cours");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(2);");
	sous_menupopup.appendChild(menuitem);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Filtrer par colonne");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(3);");
	menupopup.appendChild(menuitem);

	menuseparator=myDoc.createElement("menuseparator");
	menupopup.appendChild(menuseparator);

	menuitem=myDoc.createElement("menuitem");
	menuitem.setAttribute("label","Défiltrer");
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick(4);");
	menupopup.appendChild(menuitem);

	this.my_CompoXul=image;

	this.my_ImageEtat=image;

    }


/* ********* ADDON ELEMENT *************** */
function clAddon_Element()
{
    this.mes_ComposXUL=new Array();
    this.my_ComposantSQL=null;
    this.desactivable=true;
}

clAddon_Element.prototype.ActiverComposant =
    function(bool)
{
    if (!this.desactivable)
    return;
    if (bool==null)
    bool=true;
    var i;
    for (i=0;i<this.mes_ComposXUL.length;i++)
    this.mes_ComposXUL[i].disabled=!bool;
}

clAddon_Element.prototype.Attacher =
    function(ComposantSQL)
{
    this.my_ComposantSQL=ComposantSQL;
}


clAddon_Element.prototype.GenererXUL =
    function(Composant)
{}


clAddon_Element.prototype.OnClick =
    function()
{}

/* ********* ADDON Refresh  *************** */
clAddon_Refresh.prototype=new clAddon_Element();

function clAddon_Refresh()
{
    this.parent=clAddon_Element;
    this.parent();
    this.desactivable=false;
}

clAddon_Refresh.prototype.GenererXUL =
    function(ParentXul)
{
    var mydoc=top.document;
    var button;
    var ref=AddVar(this);
    button = mydoc.createElement("toolbarbutton");
    button.setAttribute("tooltiptext","Rafraichir");
    button.setAttribute("id","reload-button");
    button.setAttribute("class","toolbarbutton-1 chromeclass-toolbar-additional");
    button.setAttribute("oncommand","GetVar("+ref+").OnClick()");
    this.mes_ComposXUL.push(button);
    ParentXul.appendChild(button);
}


clAddon_Refresh.prototype.OnClick =
    function()
{
    //prompt("res:"+this.my_ComposantSQL.my_ReqRefresh.GenererReq(),this.my_ComposantSQL.my_ReqRefresh.GenererReq());
    this.my_ComposantSQL.RefreshTotal();
}

/* ********* ADDON Fctmenupopup  *************** */
clAddon_Fctmenupopup.prototype=new clAddon_Element();

function clAddon_Fctmenupopup(Label,TabLabel,TabFct,TabParams)
{
    this.parent=clAddon_Element;
    this.parent();
    this.Label=Label;
    this.mes_Label=TabLabel;
    this.mes_Fct=TabFct;
    this.mes_Params=TabParams;
}

clAddon_Fctmenupopup.prototype.GenererXUL =
    function(ParentXul)
{
    var mydoc=top.document;
    var button,popup,menuitem;

    var ref=AddVar(this);
    var id=genererId();
    var i;

    button = mydoc.createElement("button");
    button.setAttribute("label",this.Label);
    button.setAttribute("popup",id);
    this.mes_ComposXUL.push(button);
    ParentXul.appendChild(button);

    popup=mydoc.createElement("popup");
    popup.setAttribute("id",id);
    ParentXul.appendChild(popup);

    for(i=0;i<this.mes_Label.length;i++)
    {
	menuitem=mydoc.createElement("menuitem");
	menuitem.setAttribute("label",this.mes_Label[i]);
	menuitem.setAttribute("oncommand","GetVar("+ref+").OnClick("+i+");");
	popup.appendChild(menuitem);
    }

}

clAddon_Fctmenupopup.prototype.OnClick =
    function(id)
{
    this.mes_Fct[id](this.mes_Params[id]);
}

/* ********* ADDON Appel Fonction  *************** */
clAddon_AppelFct.prototype=new clAddon_Element();

function clAddon_AppelFct(Label,Fct,Params)
{
    this.parent=clAddon_Element;
    this.parent();
    this.Label=Label;
    this.my_Fct=Fct;
    this.my_Params=Params;
}

clAddon_AppelFct.prototype.GenererXUL =
    function(ParentXul)
{
    var mydoc=top.document;
    var ref=AddVar(this);
    var button;

    button = mydoc.createElement("button");
    button.setAttribute("label",this.Label);
    button.setAttribute("oncommand","GetVar("+ref+").OnClick()");
    this.mes_ComposXUL.push(button);
    ParentXul.appendChild(button);
}


clAddon_AppelFct.prototype.OnClick =
    function()
{
    this.my_Fct(this.my_Params);
}

/* ********* ADDON Extract  *************** */
clAddon_Extract.prototype=new clAddon_Element();

function clAddon_Extract()
{
    this.parent=clAddon_Element;
    this.parent();
}

clAddon_Extract.prototype.GenererXUL =
    function(ParentXul)
{
    var mydoc=top.document;
    var ref=AddVar(this);
    var button;

    button = mydoc.createElement("button");
    button.setAttribute("label","Export");
    button.setAttribute("oncommand","GetVar("+ref+").OnClick()");
    this.mes_ComposXUL.push(button);
    ParentXul.appendChild(button);
}


clAddon_Extract.prototype.OnClick =
    function()
{
    SaveToTSV(this.my_ComposantSQL.my_ReqRefresh);
}

/* ********* ADDON FILTRE TOTAL  *************** */
clAddon_FiltreTotal.prototype=new clAddon_Element();

function clAddon_FiltreTotal()
{
    this.parent=clAddon_Element;
    this.parent();
}

clAddon_FiltreTotal.prototype.GenererXUL =
    function(ParentXul)
{
    var mydoc=top.document;
    var ref=AddVar(this);
    var checkbox;

    checkbox = mydoc.createElement("checkbox");
    checkbox.setAttribute("label","Filtrer les nouveaux enregistrements");
    checkbox.setAttribute("oncommand","GetVar("+ref+").OnClick()");
    this.mes_ComposXUL.push(checkbox);
    ParentXul.appendChild(checkbox);
}


clAddon_FiltreTotal.prototype.OnClick =
    function()
{
    if (this.mes_ComposXUL[0].checked=="true") 
    this.my_ComposantSQL.my_ReqRefresh.setFiltrageTotal("true");
    else this.my_ComposantSQL.my_ReqRefresh.setFiltrageTotal("false");
    
    this.my_ComposantSQL.Refresh();
}

/* ********* ADDON LIMIT  *************** */
clAddon_Limit.prototype=new clAddon_Element();

function clAddon_Limit()
{
    this.parent=clAddon_Element;
    this.parent();
    this.desactivable=false;
}

clAddon_Limit.prototype.GenererXUL =
    function(ParentXul)
{
    var mydoc=top.document;
    var button,label,textbox,hbox;
    var ref=AddVar(this);

    hbox = mydoc.createElement("hbox");
    hbox.setAttribute("pack","center");
    hbox.setAttribute("align","center");
    ParentXul.appendChild(hbox);

    button = mydoc.createElement("toolbarbutton");
    button.setAttribute("tooltiptext","Page précédente");
    button.setAttribute("id","back-button");
    button.setAttribute("class","toolbarbutton-1 chromeclass-toolbar-additional");
    button.setAttribute("oncommand","GetVar("+ref+").OnClick(MODE_ADDON_LIMIT_PREV)");
    hbox.appendChild(button);
    this.mes_ComposXUL.push(button);

    button = mydoc.createElement("toolbarbutton");
    button.setAttribute("tooltiptext","Page suivante");
    button.setAttribute("id","forward-button");
    button.setAttribute("class","toolbarbutton-1 chromeclass-toolbar-additional");
    button.setAttribute("oncommand","GetVar("+ref+").OnClick(MODE_ADDON_LIMIT_NEXT)");
    hbox.appendChild(button);
    this.mes_ComposXUL.push(button);

    textbox = mydoc.createElement("textbox");
    textbox.setAttribute("tooltiptext","Page en cours");
    textbox.setAttribute("width","40");
    textbox.setAttribute("value","1");
    hbox.appendChild(textbox);
    this.mes_ComposXUL.push(textbox);

    button = mydoc.createElement("toolbarbutton");
    button.setAttribute("tooltiptext","Aller à la page ...");
    button.setAttribute("id","go-button");
    button.setAttribute("oncommand","GetVar("+ref+").OnClick(MODE_ADDON_LIMIT_GOTO)");
    hbox.appendChild(button);
    this.mes_ComposXUL.push(button);

    label = mydoc.createElement("label");
    label.setAttribute("value","/");
    //label.setAttribute("value","54");
    hbox.appendChild(label);

    label = mydoc.createElement("label");
    label.setAttribute("tooltiptext","Nombre de page");
    //label.setAttribute("value","54");
    hbox.appendChild(label);
    this.mes_ComposXUL.push(label);
}

clAddon_Limit.prototype.setPageEnCours =
    function(Page)
{
    this.mes_ComposXUL[2].value=Page;
    this.mes_ComposXUL[2].setAttribute("value",Page);
}

clAddon_Limit.prototype.setNbPage =
    function(Nb)
{
    this.mes_ComposXUL[4].value=Nb;//+Nb;
    this.mes_ComposXUL[4].setAttribute("value",Nb);//value='3';//+Nb;
}

clAddon_Limit.prototype.OnClick =
    function(sens)
{
    var DoitRefresh=false;
    switch(sens){
    case MODE_ADDON_LIMIT_NEXT:
	DoitRefresh=this.my_ComposantSQL.GotoNextPage();
	break;
    case MODE_ADDON_LIMIT_PREV:
	DoitRefresh=this.my_ComposantSQL.GotoPrevPage();
	break;
    case MODE_ADDON_LIMIT_GOTO:
	if (isNaN(this.mes_ComposXUL[2].value))
	    {
		alert(this.mes_ComposXUL[2].value+" n'est pas un numéro de page valide");
	    }
	else
	    DoitRefresh=this.my_ComposantSQL.GotoPage(this.mes_ComposXUL[2].value);
	break;
    }
    if (DoitRefresh)
    {
	this.my_ComposantSQL.ConserverLaSelection=false;
	this.my_ComposantSQL.RefreshContenu();
	this.my_ComposantSQL.Refresh();
	this.my_ComposantSQL.ConserverLaSelection=true;
    }
}


/* ********* Structure CleMaitre *************** */
function stCleMaitre(Cle,Valeur) {
    this.Cle=Cle;
    this.Valeur=Valeur;
}


/* ********* COMPOSANTSQL *************** */

/* retourne le filtre par defaut */
function clComposantSQL(Affichable,TabInterfaceFiltrage,NomChamps) {
    if (arguments.length==0)
	return;

    this.AEteGenererXul=false;
    this.DebugInfo=null;
    //  this.ComposantInactif=true;

    /* pour optimiser l'affichage on limites les requetes */
    this.my_OffSet=0;
    this.isLimited=false;
    this.my_NbPage=0;
    this.my_LimitAddOn=new clAddon_Limit();

    /* Pour la génération des composants xul */
    this.my_CompoForAddOn = null;
    this.my_CompoForFiltre = null;

    this.my_CompoXULRefresh = null;

    this.ConserverLaSelection=true;

    /* les composants add on (apparaissent à coté des filtres) */
    this.TabCompoAddOn=new Array();

    this.my_Affichable=Affichable;
    Affichable.Attacher(this);

    this.ClePrimaire=getCle(this.my_Affichable.getTable());

    this.my_IFiltreParDefaut=clComposantSQL.prototype.FiltreParDefaut();

    if (TabInterfaceFiltrage!=null)
	this.my_TabInterfaceFiltrage=TabInterfaceFiltrage;
    else
	this.my_TabInterfaceFiltrage=new Array(this.my_IFiltreParDefaut);

    var i;

    this.NomChamps=NomChamps;


    for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    if (NomChamps!=null)
		this.my_TabInterfaceFiltrage[i].setNomChamps(NomChamps);
	    /* on attache ses filtres */
	    this.my_TabInterfaceFiltrage[i].setComposantConstructeur(this);
	}

    this.my_CompoXUL=null;

    this.my_EnsCleMaitre=new Array();

    /* Requete interne non filtrée */
    this.my_ReqInterne=new clReqSQL();
    this.my_ReqInterne.Cloner(Affichable.getReqSQL());
    this.my_ReqInterne.AddSelect(this.ClePrimaire);

    var i,joint,slave,slaves,Compo;

    slaves=Affichable.getEsclaves();

    var CleMaitre;


    /* Requete a afficher => eventuellement filtrée par le maitre */
    this.my_ReqRefresh=new clReqSQLFiltrable();
    this.my_ReqContenu=new clReqSQLFiltrable();

    /* pour les liste déroulante le contenu est une requete =! de celle de refresh */
    this.HasContenu=false;
    //    this.my_ReqRefresh.Cloner(this.my_ReqInterne);

    for(i=0;i<slaves.length;i++)
	{
	    slave=slaves[i];

	    joint=slave.getJointure();
	    CleMaitre=new stCleMaitre();
	    Compo=slave.getAttribut().GetComposant();
	    /* si on n'as pas de jointure on est dans la meme table */
	    if (joint!=null)
		CleMaitre.Cle=joint.getFirstCle();
	    else
		{
		    /* on recherche la cle primaire */
		    CleMaitre.Cle=getCle(slave.getAttribut().getTable());
		}

	    this.my_EnsCleMaitre.push(CleMaitre);

	    /* pour les filtres auto */
	    if (Compo!=null)
		Compo.CheckCompoMaitreDesFiltres(this,joint);

	    this.my_ReqInterne.AddSelect(CleMaitre.Cle);
	}

    this.my_ReqRefresh.Cloner(this.my_ReqInterne);
    this.my_ReqContenu.Cloner(this.my_ReqInterne);

    this.AfterRefreshUser=null;

    /* event user */
    this.OnChangeUser=null;
    this.OnChangeUserParams=null;
}


/* Methode de classe */
clComposantSQL.prototype.FiltreParDefaut=
    function()
{
    return (new clInterfaceFiltrageDefaut());
}


clComposantSQL.prototype.Hide =
    function(bool)
{
    if (bool==null)
    {
	bool=true;
    }
    if (this.AEteGenererXul)
    this.my_CompoXUL.hidden=bool;
}

clComposantSQL.prototype.getTable =
    function(){
	return this.my_Affichable.getTable();
    }


/* pour rendre un composant limit */
clComposantSQL.prototype.Limit =
    function()
{
    this.isLimited=true;
    this.AddCompoAddOn(this.my_LimitAddOn);
}



clComposantSQL.prototype.Focus =
    function()
{
    if (this.AEteGenererXul)
    this.my_CompoXUL.focus();
}


clComposantSQL.prototype.getLabel =
    function()
{
    return this.NomChamps;
}

/* full = vrai pour désactivation total (pour les arbres => plus de filtrage ni selection) */
clComposantSQL.prototype.ActiverComposant =
    function(bool,full)
{
    if (this.AEteGenererXul)
    {
	if (bool==null)
	bool=true;
	if (full==null)
	full=false;

	this.my_CompoXUL.disabled=!bool;
	this.my_CompoXUL.setAttribute("FullDisabled",(full ? 'true' : 'false'));

	//this.ComposantInactif=!bool;

	/* on active ou désactive ses filtres */
	var i;
	for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	this.my_TabInterfaceFiltrage[i].ActiverComposant(bool);

	/* idem pour les addon */
	for(i=0;i<this.TabCompoAddOn.length;i++)
	this.TabCompoAddOn[i].ActiverComposant(bool);
    }
}

/* pour les fitres auto (ie par defaut) */
clComposantSQL.prototype.CheckCompoMaitreDesFiltres =
    function(Compo,joint){
	var i,IFiltre;
	for (i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    IFiltre=this.my_TabInterfaceFiltrage[i];
	    if (IFiltre.getCompoAuto())
		{
		    IFiltre.setComposant(Compo,joint);
		}
	}

    }

clComposantSQL.prototype.CalculerPage=
    function(offset)
{
    if (offset==null)
    offset=this.my_OffSet;
    return Math.floor(offset/LIMIT)+1;
}

/* Pour gérer les limtes */
clComposantSQL.prototype.GotoPage=
    function(NumPage)
{
    /* pour eviter le refresh si on est déjà sur la bonne page */
    if (this.CalculerPage()==NumPage)
    return false;

    if (NumPage<=0 || NumPage>this.my_NbPage)
    {
	alert("La page "+NumPage+" n'existe pas !");
	return false;
    }
    /* cas normal */
    this.my_OffSet=(NumPage-1)*LIMIT;
    this.my_LimitAddOn.setPageEnCours(NumPage);
    return true;
}

clComposantSQL.prototype.GotoNextPage=
    function()
{
    var DoitRefresh=true;
    var NewOffSet=this.my_OffSet+LIMIT;

    if (NewOffSet>=this.my_NbPage*LIMIT)
    DoitRefresh=false;
    else
    this.my_OffSet=NewOffSet;

    if (DoitRefresh)
    this.my_LimitAddOn.setPageEnCours(this.CalculerPage());

    return DoitRefresh;
}

clComposantSQL.prototype.GotoPrevPage=
    function()
{
    var DoitRefresh=true;
    var NewOffSet=this.my_OffSet-LIMIT;

    if (NewOffSet<0)
    DoitRefresh=false;
    else
    this.my_OffSet=NewOffSet;

    if (DoitRefresh)
    this.my_LimitAddOn.setPageEnCours(this.CalculerPage());

    return DoitRefresh;
}



clComposantSQL.prototype.setDebugInfo=
    function(Valeur)
{
    this.DebugInfo=Valeur;
}

clComposantSQL.prototype.getComposantXul=
    function()
{
    return this.my_CompoXUL;
}

clComposantSQL.prototype.getValue =
    function()
{
    if (this.AEteGenererXul)
    return this.my_CompoXUL.value;
}

clComposantSQL.prototype.getFiltreParDefaut=
    function()
{
    return this.my_IFiltreParDefaut;
}

clComposantSQL.prototype.setFiltre =
    function(TabInterfaceFiltrage)
{
    if (TabInterfaceFiltrage!=null)
    this.my_TabInterfaceFiltrage=TabInterfaceFiltrage;
    else
    this.my_TabInterfaceFiltrage=new Array(new clInterfaceFiltrageDefaut());
}


clComposantSQL.prototype.AjouterFiltre =
    function(Liaison,Filtre,Operateur)
{
    if (this.HasContenu)
    this.my_ReqContenu.AjouterFiltre(Liaison,Filtre,Operateur);
    else
    this.my_ReqRefresh.AjouterFiltre(Liaison,Filtre,Operateur);
}


clComposantSQL.prototype.ActiverFiltres =
    function(bool)
{
    if (this.HasContenu)
    this.my_ReqContenu.ActiverFiltres(bool);
    else
    this.my_ReqRefresh.ActiverFiltres(bool);
}


clComposantSQL.prototype.RefreshEsclaves =
    function()
{
    if (!this.AEteGenererXul)
    return;

    var i,slaves,joint,slave,att,ReqMaitre;

    slaves=this.my_Affichable.getEsclaves();

    if (slaves.length!=this.my_EnsCleMaitre.length)
    {
	alert("Erreur de programmation\nclComposantSQL.RefreshEsclave taille de tableau esclaves différente");
	return;
    }

    for (i=0;i<slaves.length;i++)
    {
	slave=slaves[i];
	att=slave.getAttribut();

	joint=slave.getJointure();
	ReqMaitre=new clReqSQL();
	//      ReqMaitre.Fusionner(att.getReqSQL());
	if (joint!=null)
	{
	    joint.ReConstruire(this.my_EnsCleMaitre[i].Valeur);
	    ReqMaitre=joint.getReqSQL();
	}
	else
	{
	    ReqMaitre.AddWhere(this.my_EnsCleMaitre[i].Cle+"="+this.my_EnsCleMaitre[i].Valeur);
	}
	att.GetComposant().RefreshByMaitre(ReqMaitre);

    }
}

clComposantSQL.prototype.RefreshByMaitre =
    function(ReqSQL){
	if (!this.AEteGenererXul)
	return;

	this.my_ReqRefresh.Cloner(this.my_ReqInterne);
	this.my_ReqRefresh.Fusionner(ReqSQL);
	this.Refresh();
	this.AfterRefreshByMaitre();
    }

clComposantSQL.prototype.AfterRefreshByMaitre =
    function(){
    }

clComposantSQL.prototype.OnRefresh =
    function(){}

clComposantSQL.prototype.Refresh =
    function(){
	if (!this.AEteGenererXul)
	return;

	/* on execute la requete */
	var query=this.my_ReqRefresh.GenererReq();
	if ((this.isLimited) && (!this.HasContenu))
	{
	    query+=" limit "+LIMIT+" offset "+this.my_OffSet;
	}
	//alert("requete=\n"+query);
	var result=pgsql_query(query);
	this.RefreshMyCompo(result);
	this.RefreshFiltre();
	this.OnRefresh();
	if (this.AfterRefreshUser!=null)
	{
	    this.AfterRefreshUser(this);
	}
    }

clComposantSQL.prototype.RefreshMyCompoContenu =
    function(requete_result)
{}

clComposantSQL.prototype.RefreshContenu =
    function()
{
    if (this.HasContenu)
    {
	/* on execute la requete */
	var query=this.my_ReqContenu.GenererReq();
	if (this.isLimited)
	{
	    query+=" limit "+LIMIT+" offset "+this.my_OffSet;
	}
	var result=pgsql_query(query);
	this.RefreshMyCompoContenu(result);
    }
}

clComposantSQL.prototype.RefreshNbPage =
    function()
{
    if (this.isLimited)
    {
	this.my_OffSet=0;
	var query=this.my_ReqContenu.GenererReq();
	this.my_NbPage=Math.ceil(CalculerNombreDeLigne(query)/LIMIT);

	this.my_LimitAddOn.setNbPage(this.my_NbPage);
	this.my_LimitAddOn.setPageEnCours(1);

    }
}

clComposantSQL.prototype.OnChange =
    function(){
	if (this.OnChangeUser!=null)
	this.OnChangeUser(this.OnChangeUserParams);
    }

/* pour rafraichir le contenu */
clComposantSQL.prototype.RefreshTotal =
    function(){
	if (!this.AEteGenererXul)
	return;
	//this.isRefreshingTotally=true;
	this.RefreshNbPage();
	this.RefreshContenu();
	this.Refresh();
	//this.isRefreshingTotally=false;
    }

/* fait un union sur la requete de refresh */
clComposantSQL.prototype.Union =
    function(ReqSQL){
	this.my_ReqRefresh.setUnion(ReqSQL);
    }


clComposantSQL.prototype.RefreshFiltre =
    function(){

    }


clComposantSQL.prototype.setChampsFiltrable =
    function(Champs){
	var i;
	for (i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    this.my_TabInterfaceFiltrage[i].setChamps(Champs);
	}

    }

clComposantSQL.prototype.AddCompoAddOn =
    function(CompoAddOn)
{
    this.TabCompoAddOn.push(CompoAddOn);
    CompoAddOn.Attacher(this);
}

clComposantSQL.prototype.GenererXULAddon =
    function(ParentXul)
{
    var i;
    for(i=0;i<this.TabCompoAddOn.length;i++)
    this.TabCompoAddOn[i].GenererXUL(ParentXul);
}

clComposantSQL.prototype.GenererXUL =
    function(ParentXul){

	this.AEteGenererXul=true;

	var hbox;
	var mydoc=top.document;

	hbox = mydoc.createElement("hbox");
	//hbox.setAttribute("align","start");
	//hbox.setAttribute("flex","1");
	//hbox.setAttribute("equalsize","always");
	//hbox.setAttribute("style","padding:10px; border:2px solid blue");

	ParentXul.appendChild(hbox);

	if (this.DebugInfo!=null)
	{
	    var label=mydoc.createElement("label");
	    label.setAttribute("value",this.DebugInfo);
	    hbox.appendChild(label);
	}

	/* le composant => met à jour this.my_CompoForAddOn et this.my_CompoForFiltre */
	this.GenererCompoXUL(hbox);

	if (this.my_CompoForAddOn==null)
	this.my_CompoForAddOn=hbox;

	if (this.my_CompoForFiltre==null)
	this.my_CompoForFiltre=hbox;

	/* les boutons en plus */
	this.GenererXULAddon(this.my_CompoForAddOn);

	/* les filtres */
	this.GenererFiltreXUL(this.my_CompoForFiltre);

	this.ActiverComposant(false);
	this.RefreshNbPage();
	this.RefreshContenu();

	return hbox;
    }


clComposantSQL.prototype.GenererCompoXUL =
    function(ParentXul){}

clComposantSQL.prototype.GenererFiltreXUL =
    function(ParentXul){
	var i;
	for (i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    this.my_TabInterfaceFiltrage[i].GenererXUL(ParentXul,this);
	}
    }


/* protected */
clComposantSQL.prototype.RefreshMyCompo =
    function(requete_result){

    }


/* ********* CompoSimple *************** */
clCompoSimple.prototype = new clComposantSQL();

function clCompoSimple(Attribut,TabInterfaceFiltrage,NomChamps) {
    if (arguments.length==0)
	return;

    this.parent=clComposantSQL;
    this.parent(Attribut,TabInterfaceFiltrage,NomChamps);

    this.setChampsFiltrable(Attribut.getNomAttributBD());
}


clCompoSimple.prototype.RefreshMyCompo =
    function(requete_result){
	var IdColonne=requete_result.getColumnIndex(this.my_Affichable.getNomAttributBD());
	if (IdColonne==-1)
	{
	    alert("Erreur interne: la colonne n'existe pas !");
	    return;
	}

	/* on prends que la 1ère ligne */
	var enumerator = requete_result.enumerate();
	enumerator.beforeFirst();

	if (requete_result.rowCount>0)
	{
	    enumerator.next();

	    var CodeValue=enumerator.getVariant(IdColonne);
	    if (CodeValue!=null)
		this.my_CompoXUL.value=CodeValue;
	    else
		this.my_CompoXUL.value="";
	}
	else
	this.my_CompoXUL.value="";
    }


clCompoSimple.prototype.RefreshFiltre =
    function(){
	var i;
	for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    this.my_TabInterfaceFiltrage[i].setValeur(this.getValue());
	}
    }


/* ********* CompoLabel *************** */
clCompolabel.prototype = new clCompoSimple();

function clCompolabel(Attribut,TabInterfaceFiltrage,Texte) {
    if (arguments.length==0)
	return;

    this.parent=clCompoSimple;
    this.parent(Attribut,TabInterfaceFiltrage,Texte);
}


clCompolabel.prototype.GenererCompoXUL =
    function(ParentXul){
	var label,hbox;
	var mydoc=top.document;

	hbox = mydoc.createElement("hbox");
	hbox.setAttribute("align","center");
	hbox.setAttribute("flex","1");
	//  hbox.setAttribute("equalsize","always");
	//hbox.setAttribute("style","padding:10px; border:2px solid yellow");
	ParentXul.appendChild(hbox);

	label = mydoc.createElement("label");
	label.setAttribute("class","labelize-uniline");
	label.setAttribute("value",this.NomChamps);
	//label.setAttribute("control","");
	hbox.appendChild(label);

	label = mydoc.createElement("label");
	label.setAttribute("flex","1");
	label.setAttribute("disabled","true");

	label.setAttribute("style","min-width:100px");

	hbox.appendChild(label);

	this.my_CompoXUL=label;

	return hbox;
    }

/* ********* CompoTextBox *************** */
clCompoTextBox.prototype = new clCompoSimple();

function clCompoTextBox(Attribut,TabInterfaceFiltrage,Texte,MotDePasse,MultiLine) {
    if (arguments.length==0)
	return;

    this.parent=clCompoSimple;
    this.parent(Attribut,TabInterfaceFiltrage,Texte);

    if (MotDePasse!=null)
	this.MotDePasse=MotDePasse;
    else
	this.MotDePasse=false;

    if (MultiLine!=null)
	this.MultiLine=MultiLine;
    else
	this.MultiLine=false;

}


clCompoTextBox.prototype.GenererCompoXUL =
    function(ParentXul){
	var label,textbox,hbox;
	var mydoc=top.document;
	var ref=AddVar(this);

	if (this.MultiLine) hbox = mydoc.createElement("vbox");
	else hbox = mydoc.createElement("hbox");
	if (!this.MultiLine) hbox.setAttribute("align","center");
	hbox.setAttribute("flex","1");
	//  if (!this.MultiLine) hbox.setAttribute("equalsize","always");
	//hbox.setAttribute("style","padding:10px; border:2px solid yellow");
	ParentXul.appendChild(hbox);

	label = mydoc.createElement("label");
        if (this.MultiLine) this.NomChamps = this.NomChamps+' :';
	if (this.MultiLine) label.setAttribute("class","labelize-multiline");
	else label.setAttribute("class","labelize-uniline");
	label.setAttribute("value",this.NomChamps);
	//label.setAttribute("control","");
	hbox.appendChild(label);

	textbox = mydoc.createElement("textbox");
	textbox.setAttribute("flex","1");
	textbox.setAttribute("disabled","true");
	textbox.setAttribute("onkeyup","GetVar("+ref+").OnChange(event)");

	textbox.setAttribute("style","min-width:100px");

	if (this.MotDePasse) textbox.setAttribute("type","password");
	textbox.setAttribute("multiline",this.MultiLine);
        if (this.MultiLine) textbox.setAttribute("rows","8");
	hbox.appendChild(textbox);

	this.my_CompoXUL=textbox;

	return hbox;
    }



/* ********* CompoCheckBox *************** */
clCompoCheckBox.prototype = new clCompoSimple();

function clCompoCheckBox(Attribut,TabInterfaceFiltrage,Texte) {
    if (arguments.length==0)
	return;

    var TabIFiltre;

    IFiltreParDefaut=clCompoCheckBox.prototype.FiltreParDefaut();

    if (TabInterfaceFiltrage!=null)
	TabIFiltre=TabInterfaceFiltrage;
    else
	TabIFiltre=new Array(IFiltreParDefaut);

    this.parent=clCompoSimple;
    this.parent(Attribut,TabIFiltre,Texte);

    this.my_IFiltreParDefaut=IFiltreParDefaut;
}

/* Methode de classe */
clCompoCheckBox.prototype.FiltreParDefaut=
    function()
{
    return (new clInterfaceFiltrageBool());
}


clCompoCheckBox.prototype.RefreshMyCompo =
    function(requete_result){
	var IdColonne=requete_result.getColumnIndex(this.my_Affichable.getNomAttributBD());
	if (IdColonne==-1)
	{
	    alert("Erreur interne: la colonne n'existe pas !");
	    return;
	}

	/* on prends que la 1ère ligne */
	var enumerator = requete_result.enumerate();
	enumerator.beforeFirst();

	if (requete_result.rowCount>0)
	{
	    enumerator.next();

	    var CodeValue=enumerator.getVariant(IdColonne);
	    if (CodeValue!=null)
		this.my_CompoXUL.checked=CodeValue;
	    else
		this.my_CompoXUL.checked=false;
	}
	else
	this.my_CompoXUL.checked=false;

	this.my_CompoXUL.value=this.my_CompoXUL.checked;
    }

clCompoCheckBox.prototype.GenererCompoXUL =
    function(ParentXul){
	var checkbox;
	var mydoc=top.document;
	var ref=AddVar(this);

	var hbox = mydoc.createElement("hbox");
	hbox.setAttribute("align","center");
	hbox.setAttribute("flex","1");
	ParentXul.appendChild(hbox);
	/*
	  var label = mydoc.createElement("label");
	  label.setAttribute("value",this.NomChamps);
	  label.setAttribute("class","labelize-uniline");
	  hbox.appendChild(label);
	*/
	checkbox = mydoc.createElement("checkbox");
	checkbox.setAttribute("disabled","true");
	checkbox.setAttribute("dir","reverse");
	checkbox.setAttribute("label",this.NomChamps);
	checkbox.setAttribute("class","labelize-uniline");
	checkbox.setAttribute("value","false");
	checkbox.setAttribute("oncommand","this.value=this.checked; GetVar("+ref+").OnChange();");
	hbox.appendChild(checkbox);

	this.my_CompoXUL=checkbox;

	return hbox;
    }



/* ********* CompoColor *************** */
clCompoColor.prototype = new clCompoSimple();

function clCompoColor(Attribut,TabInterfaceFiltrage,Texte) {
    if (arguments.length==0)
	return;

    var TabIFiltre;

    IFiltreParDefaut=clCompoColor.prototype.FiltreParDefaut();

    if (TabInterfaceFiltrage!=null)
	TabIFiltre=TabInterfaceFiltrage;
    else
	TabIFiltre=new Array(IFiltreParDefaut);

    this.parent=clCompoSimple;
    this.parent(Attribut,TabIFiltre,Texte);

    this.my_IFiltreParDefaut=IFiltreParDefaut;
}

/* Methode de classe */
clCompoColor.prototype.FiltreParDefaut=
    function()
{
    return (new clInterfaceFiltrageColor());
}

clCompoColor.prototype.RefreshMyCompo =
    function(requete_result){
	var IdColonne=requete_result.getColumnIndex(this.my_Affichable.getNomAttributBD());
	if (IdColonne==-1)
	{
	    alert("Erreur interne: la colonne n'existe pas !");
	    return;
	}

	/* on prends que la 1ère ligne */
	var enumerator = requete_result.enumerate();
	enumerator.beforeFirst();

	if (requete_result.rowCount>0)
	{
	    enumerator.next();

	    var CodeValue=enumerator.getVariant(IdColonne);
	    //if (CodeValue!=null)
	    this.my_CompoXUL.value=CodeValue;
	}
	else
	this.my_CompoXUL.value=null;
    }


clCompoColor.prototype.GenererCompoXUL =
    function(ParentXul){
	var label,colorpicker,hbox;
	var mydoc=top.document;

	hbox = mydoc.createElement("hbox");
	hbox.setAttribute("align","center");
	hbox.setAttribute("flex","1");
	//  hbox.setAttribute("equalsize","always");
	ParentXul.appendChild(hbox);

	label = mydoc.createElement("label");
	label.setAttribute("value",this.NomChamps);
	label.setAttribute("class","labelize-uniline");
	hbox.appendChild(label);

	colorpicker = mydoc.createElement("colorpicker");
	colorpicker.setAttribute("type","button");
	colorpicker.setAttribute("disabled","true");

	hbox.appendChild(colorpicker);

	this.my_CompoXUL=colorpicker;

	return hbox;
    }


/* ********* CompoListeDeroulanteStatic *************** */
clCompoListeDeroulanteStatic.prototype = new clCompoSimple();

/* TabValeur: Les valeurs de la liste déroulante */
function clCompoListeDeroulanteStatic(Attribut,TabInterfaceFiltrage,Texte,TabValeur) {
    if (arguments.length==0)
	return;

    this.parent=clCompoSimple;
    this.parent(Attribut,TabInterfaceFiltrage,Texte);
    this.TabValeur=TabValeur;
}

clCompoListeDeroulanteStatic.prototype.getCleVal =
    function(){
	var menulist=this.my_CompoXUL;
	if (menulist.selectedIndex!=-1)
	{
	    return menulist.selectedItem.value;
	}
	else
	{
	    return -1;
	}
    }


clCompoListeDeroulanteStatic.prototype.getAllCleVal =
    function(){
	var res=new Array();
	var menulist=this.my_CompoXUL;

	items = menulist.lastChild.childNodes;

	if (items.length>1)
	{
	    for(i=1;i<items.length;i++)
		{
		    res.push(items[i].value);
		}
	}
	return res;
    }

clCompoListeDeroulanteStatic.prototype.RefreshMyCompo =
    function(requete_result){

	/* on prends que la 1ère ligne */
	var enumerator = requete_result.enumerate();
	enumerator.beforeFirst();

	if (requete_result.rowCount>0)
	{
	    enumerator.next();

	    var CodeValue=enumerator.getVariant(0);
	    if (CodeValue!=null)
		this.my_CompoXUL.value=CodeValue;
	    else
		this.my_CompoXUL.value="";
	}
	else
	this.my_CompoXUL.value="";
    }

clCompoListeDeroulanteStatic.prototype.GenererCompoXUL =
    function(ParentXul){

	var label,menulist,menupopup,menuitem,button,hbox;
	var mydoc=top.document;

	/*
	  POUR EVITER UN BUG XUL => SINON LE MENULIST N'AS PAS DE MENUPOPUP
	  je sais c'est n'importe quoi de devoir ajouter un bouton caché qui sert à rien
	  mais y a que comme ça que j'arrive à faire marcher le code, sinon le tout premier
	  menulist ne marche pas
	*/
	hbox = mydoc.createElement("hbox");
	hbox.setAttribute("align","center");
	hbox.setAttribute("flex","1");
	//  hbox.setAttribute("equalsize","always");
	ParentXul.appendChild(hbox);


	button = mydoc.createElement("button");
	button.setAttribute("hidden","true");
	hbox.appendChild(button);

	label = mydoc.createElement("label");
	label.setAttribute("value",this.NomChamps);
	label.setAttribute("class","labelize-uniline");
	hbox.appendChild(label);

	menulist = mydoc.createElement("menulist");

	menulist.setAttribute("style","min-width:200px");
	menulist.setAttribute("disabled","true");
	menulist.setAttribute("flex","1");
	hbox.appendChild(menulist);

	menupopup = mydoc.createElement("menupopup");
	menulist.appendChild(menupopup);

	menuitem = mydoc.createElement("menuitem");
	menupopup.appendChild(menuitem);

	var i;

	/* valeur pour les champs null */
	menulist.appendItem ( "<Pas de valeur>" , "" );
	for(i=0;i<this.TabValeur.length;i++)
	{
	    menulist.appendItem (this.TabValeur[i], this.TabValeur[i]);
	}

	this.my_CompoXUL=menulist;

	return hbox;
    }


/* ********* CompoListeDeroulanteSimple *************** */

clCompoListeDeroulanteSimple.prototype = new clCompoSimple();

function clCompoListeDeroulanteSimple(Attribut,TabInterfaceFiltrage,Texte) {
    if (arguments.length==0)
	return;

    this.parent=clCompoSimple;
    this.parent(Attribut,TabInterfaceFiltrage,Texte);

    this.my_ReqInterne.AddOrderByPremierChamps();
    this.my_ReqRefresh.AddOrderByPremierChamps();
    this.my_ReqInterne.SetDistinct('true');
    this.my_ReqRefresh.SetDistinct('true');

    this.setChampsFiltrable(this.ClePrimaire);
    this.HasContenu=true;

    this.ItemNull=null;
    this.my_FiltreInterne=new clInterfaceFiltrageMenuListe();
    this.my_FiltreInterne.setComposant(this);

    this.my_FiltreInterne.setChamps(Attribut.getNomAttributBD());

    /* event user */
    //this.OnChangeUser=null;
    //this.OnChangeUserParams=null;
}

clCompoListeDeroulanteSimple.prototype.getCleVal =
    function(){
	return CompoListeDeroulante_getCleVal(this);
    }


clCompoListeDeroulanteSimple.prototype.getAllCleVal =
    function(){
	return CompoListeDeroulante_getAllCleVal(this);
    }


clCompoListeDeroulanteSimple.prototype.RefreshMyCompoContenu =
    function(requete_result){
	CompoListeDeroulante_RefreshMyCompoContenu(this,requete_result);
    }

clCompoListeDeroulanteSimple.prototype.RefreshMyCompo =
    function(requete_result){
	CompoListeDeroulante_RefreshMyCompo(this,requete_result);
    }

clCompoListeDeroulanteSimple.prototype.OnSelect =
    function()
{
    CompoListeDeroulante_OnSelect(this);
}

clCompoListeDeroulanteSimple.prototype.SelectItem =
    function(cle)
{
    return CompoListeDeroulante_SelectItem(this,cle);
}

clCompoListeDeroulanteSimple.prototype.OnChange =
    function(evt){
	CompoListeDeroulante_OnChange(this,evt);
    }

clCompoListeDeroulanteSimple.prototype.OnHiddenPopup =
    function(){
	CompoListeDeroulante_OnHiddenPopup(this);
    }

clCompoListeDeroulanteSimple.prototype.OnBlur =
    function(){
	return CompoListeDeroulante_OnBlur(this);
    }

clCompoListeDeroulanteSimple.prototype.GenererCompoXUL =
    function(ParentXul){
	return CompoListeDeroulante_GenererCompoXUL(this,ParentXul);
    }


clCompoListeDeroulanteSimple.prototype.RefreshMyCompoContenu =
    function(requete_result){
	CompoListeDeroulante_RefreshMyCompoContenu(this,requete_result);
    }

clCompoListeDeroulanteSimple.prototype.getValue =
    function(){
	return CompoListeDeroulante_getValue(this);
    }

/* ********* CompoMulti *************** */
clCompoMulti.prototype = new clComposantSQL();

function clCompoMulti(EnsAttribut,TabInterfaceFiltrage,NomChamps,TabNomsCols) {
    if (arguments.length==0)
	return;

    this.parent=clComposantSQL;
    this.parent(EnsAttribut,TabInterfaceFiltrage,NomChamps);

    this.my_ReqInterne.AddOrderByPremierChamps();
    this.my_ReqRefresh.AddOrderByPremierChamps();

    if (TabNomsCols!=null)
	this.TabNomsCols=TabNomsCols;
    else
	this.TabNomsCols=new Array();


    if (this.my_Affichable.getLiaison_Attributs().length!=this.TabNomsCols.length)
	{
	    alert("Erreur de programmation:\n> La classe clCompoListe doit avoir autant d'attribut dans EnsAttribut que d'élément dans son TabNomsCols");
	    return;
	}

    this.setChampsFiltrable(this.ClePrimaire);

    /* on cree un sous filtre par attribut */
    this.my_TabSousFiltres=new Array();
    var i,ItFiltrage;
    var TabLiaisonAtt=EnsAttribut.getLiaison_Attributs();
    for(i=0;i<TabLiaisonAtt.length;i++)
	{
	    ItFiltrage=new clInterfaceFiltrageColDefaut();
	    ItFiltrage.setChamps(TabLiaisonAtt[i].getAttribut().getNomAttributBD());
	    ItFiltrage.setComposant(this,TabLiaisonAtt[i].getJointure());

	    ItFiltrage.setNomChamps(TabNomsCols[i]);

	    this.my_TabSousFiltres.push(ItFiltrage);
	}
}

clCompoMulti.prototype.getCle =
    function(){
	return this.ClePrimaire;
    }

clCompoMulti.prototype.getCleVal =
    function(){}


clCompoMulti.prototype.getAllCleVal =
    function(){}

clCompoMulti.prototype.RefreshFiltre =
    function(){
	var i,val;

	val = this.getCleVal();
	if (val==-1)
	val = null;

	for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    this.my_TabInterfaceFiltrage[i].setValeur(val);
	}
    }

// clCompoMulti.prototype.GenererFiltreXUL =
//     function(ParentXul){
//   var i;

//   for (i=0;i<this.my_TabInterfaceFiltrage.length;i++)
//   {
//       this.my_TabInterfaceFiltrage[i].GenererXUL(ParentXul,this);
//   }

//   for (i=0;i<this.my_TabSousFiltres.length;i++)
//   {
//       this.my_TabSousFiltres[i].GenererXUL(ParentXul,this);
//   }
//     }


/* ********* CompoListe *************** */
clCompoListe.prototype = new clCompoMulti();

function clCompoListe(EnsAttribut,TabInterfaceFiltrage,TabNomsCols,NomChamps,SingleSelect,isDom) {
    if (arguments.length==0)
	return;

    var TabIFiltre;

    IFiltreParDefaut=clCompoListe.prototype.FiltreParDefaut();

    if (TabInterfaceFiltrage!=null)
	TabIFiltre=TabInterfaceFiltrage;
    else
	TabIFiltre=new Array(IFiltreParDefaut);

    this.parent=clCompoMulti;
    this.parent(EnsAttribut,TabIFiltre,NomChamps,TabNomsCols);

    var i;
    for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    if (this.my_TabInterfaceFiltrage[i] instanceof clInterfaceFiltrageArbreDefaut)
		this.my_TabInterfaceFiltrage[i].setTabFiltreCol(this.my_TabSousFiltres);
	}

    this.my_IFiltreParDefaut=IFiltreParDefaut;

    this.my_IFiltreParDefaut.setTabFiltreCol(this.my_TabSousFiltres);

    this.my_LastSelectedCle=-1;

    if (SingleSelect!=null)
	this.SingleSelect=SingleSelect;
    else
	this.SingleSelect=true;

    if (isDom==null)
	this.isDom=false;
    else
	this.isDom=isDom;

    /* le contenu est toujours égal à ce que */
    this.my_ReqContenu=this.my_ReqRefresh;

    //  this.OnChangeUser=null;
    //  this.OnChangeUserParams=null;

}

/* Methode de classe */
clCompoListe.prototype.FiltreParDefaut=
    function()
{
    return (new clInterfaceFiltrageArbreDefaut());
}

clCompoListe.prototype.getCleVal =
    function(){
	var tree=this.my_CompoXUL;
	if (tree.view!=null && tree.currentIndex!=-1)
	{
	    return tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(0));
	}
	else
	{
	    return -1;
	}
    }


clCompoListe.prototype.getAllCleVal =
    function(){
	var res=new Array();
	var tree=this.my_CompoXUL;
	if (tree.view!=null)
	{
	    for(i=0;i<tree.view.rowCount;i++)
		{
		    res.push(tree.view.getCellValue(i, tree.treeBoxObject.columns.getColumnAt(0)));
		}
	}
	return res;
    }


// clCompoListe.prototype.RefreshFiltre =
//     function(){
//   var i,val;
//   var tree=this.my_CompoXUL;

//   if (tree.view!=null && tree.currentIndex!=-1)
//   {
//       val= tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(0));

//       for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
//     {
//         this.my_TabInterfaceFiltrage[i].setValeur(val);
//     }
//   }
//   else
//   {
//       val=null;
//       for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
//       {
//     this.my_TabInterfaceFiltrage[i].setValeur(val);
//       }
//   }

//     }

clCompoListe.prototype.RefreshMyCompo =
    function(requete_result){
	var tree=this.my_CompoXUL;
	var sources=tree.database.GetDataSources();
	var oldds;

	while (sources.hasMoreElements()) {
	    oldds = sources.getNext();
	    tree.database.RemoveDataSource(oldds);

	}
	/* on efface les items ajouté avec content (on est dans un arbre mixte rdf/content) */
	var ds=requete_result.QueryInterface(Components.interfaces.nsIRDFDataSource);
	tree.database.AddDataSource(ds);

	if (this.isDom)
	{
	    var Tab = ChercherCompo(tree,"treechildren",2);
	    if(Tab.length>=2)
		{
		    var parNode=Tab[1].parentNode;
		    parNode.removeChild(Tab[1]);
		}
	}

	tree.builder.rebuild();
    }



/* retourne true si l'item existe, false sinon */
clCompoListe.prototype.SelectItem =
    function(cle)
{
    var tree=this.my_CompoXUL;
    /* colonne de la cle */
    var IdCol=tree.treeBoxObject.columns.getColumnAt(0);
    var i,val;
    /* on cherche sur la page en cours*/
    if (this.ConserverLaSelection)
    {
	if (tree.view!=null)
	    {
		for(i=0;i<tree.view.rowCount;i++)
		    {
			val = tree.view.getCellValue(i,IdCol);
			if (val==cle)
			    {
				tree.view.selection.select(i);
				return true;
			    }
		    }

		/* la clé n'est pas sur la page en cours donc on lance la requete et on cherche la cle */

		var query=this.my_ReqRefresh.GenererReq();
		var result=pgsql_query(query);
		var enumerator = result.enumerate();
		var offset=-1;
		var trouve = false;
		var encore = true;

		/* si il n'y a pas de résultat */
		if (result.rowCount==0)
		    return false;

		// on recherche sa position dans l'enumerator
		var IdColReq=result.getColumnIndex(this.ClePrimaire);
		enumerator.beforeFirst();

		while (!trouve && encore) {
		    encore = enumerator.next();
		    trouve = ( enumerator.getVariant(IdColReq) == cle );
		    offset++;
		}

		if (!trouve)
		    return false;

		/* on se met sur la bonne page */
		var NewPage=this.CalculerPage(offset);
		this.my_OffSet=(NewPage-1)*LIMIT;
		this.my_LimitAddOn.setPageEnCours(NewPage);
		this.Refresh();//MyCompo(result);

		if (tree.view!=null)
		    {
			for(i=0;i<tree.view.rowCount;i++)
			    {
				val = tree.view.getCellValue(i,IdCol);
				if (val==cle)
				    {
					tree.view.selection.select(i);
					return true;
				    }
			    }
		    }
	    }
	return false;
    }
    else
    tree.view.selection.select(0);
    return true;
}

/*
  On force la désactivation/activaion
  Attention ici this n'est pas le compoliste mais l'objet xul qui a capté l'event
*/
clCompoListe.prototype.OnEvent =
    function(evt){
	//alert(this.firstChild.disabled+"/"+this.firstChild.getAttribute("FullDisabled"));
	if(this.firstChild.disabled && this.firstChild.getAttribute("FullDisabled")=="true")
	evt.stopPropagation();
    }


clCompoListe.prototype.GenererXUL =
    function(ParentXul){

	this.AEteGenererXul=true;

	var groupbox,caption,vbox;

	var hbox,boxH,boxB;
	var mydoc=top.document;

	groupbox = mydoc.createElement("vbox");
	groupbox.setAttribute("flex","1");
	ParentXul.appendChild(groupbox);

	/*
	  if (this.NomChamps!=null)
	  {
	  caption = mydoc.createElement("caption");
	  caption.setAttribute("label",this.NomChamps);
	  groupbox.appendChild(caption);
	  }
	*/
	vbox = mydoc.createElement("vbox");
	vbox.setAttribute("flex","1");
	//vbox.setAttribute("style","padding:10px; border:2px solid black");

	groupbox.appendChild(vbox);

	boxH = mydoc.createElement("hbox");
	boxH.setAttribute("flex","1");
	//boxH.setAttribute("style","padding:10px; border:2px solid red");
	vbox.appendChild(boxH);

	boxB = mydoc.createElement("hbox");
	//boxB.setAttribute("style","padding:10px; border:2px solid blue");
	boxB.setAttribute("pack","center");
	boxB.setAttribute("align","center");
	vbox.appendChild(boxB);

	if (this.DebugInfo!=null)
	{
	    var label = mydoc.createElement("label");
	    label.setAttribute("value",this.DebugInfo);
	    boxB.appendChild(label);
	}

	this.GenererCompoXUL(boxH);

	/* les boutons en plus */
	this.GenererXULAddon(boxB);

	boxB = mydoc.createElement("hbox");
	boxB.setAttribute("pack","center");
	vbox.appendChild(boxB);


	this.GenererFiltreXUL(boxB);

	this.ActiverComposant(false);
	this.RefreshNbPage();
	this.RefreshContenu();

	return groupbox;
    }


clCompoListe.prototype.OnSelect =
    function(){
	var tree=this.my_CompoXUL;
	var i,max,val;
	const ColAvSlave=1; // colonne pour la cle primaire

	max=this.my_EnsCleMaitre.length;

	if (tree.view==null || tree.currentIndex==-1)
	{
	    /* pour les champs null */
	    val=-1;
	    for(i=0;i<max;i++)
		{
		    this.my_EnsCleMaitre[i].Valeur = val;
		}

	    for(i=0;i<this.my_TabSousFiltres.length;i++)
		{
		    this.my_TabSousFiltres[i].setValeur(val);
		}
	}
	else
	{
	    this.my_LastSelectedCle=this.getCleVal();
	    for(i=0;i<max;i++)
	    {
		val= tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(i+ColAvSlave));
		/* pour les clé null on met à -1 */
		if(val=="")
		    val=-1;
		this.my_EnsCleMaitre[i].Valeur = val;
	    }

	    for(i=0;i<this.my_TabSousFiltres.length;i++)
	    {
		val = tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(i+max+ColAvSlave));
		this.my_TabSousFiltres[i].setValeur(val);
	    }
	}

	this.RefreshFiltre();
	this.RefreshEsclaves();

	if (this.OnChangeUser!=null)
	this.OnChangeUser(this.OnChangeUserParams);

    }

clCompoListe.prototype.ForceNextSelection =
    function(cle)
{
    this.my_LastSelectedCle=cle;
}

clCompoListe.prototype.OnRefresh =
    function(){
	var tree=this.my_CompoXUL;
	if (tree.view!=null && tree.view.rowCount!=0)
	{
	    if (this.my_LastSelectedCle==-1 || !this.SelectItem(this.my_LastSelectedCle))
		tree.view.selection.select(0);
	}
    }

clCompoListe.prototype.AfterRefreshByMaitre =
    function(){
	var tree=this.my_CompoXUL;
	if (tree.view!=null && tree.view.rowCount!=0)
	{
	    //if (this.my_LastSelectedCle==-1 || !this.SelectItem(this.my_LastSelectedCle))
	    tree.view.selection.select(0);
	}
	//  else
	//  tree.view.selection.select(-1);
	else
	{
	    this.OnSelect();
	    //      this.RefreshFiltre();
	    //      this.RefreshEsclaves();
	}
    }

clCompoListe.prototype.GenererCompoXUL =
    function(ParentXul){
	var tree,template,treechildren,treeitem,treerow,treecell;
	var treecols,splitter,treecol,treecol,label;
	var boxEvent;

	var TailleCol;

	var LiaisonAtt=this.my_Affichable.getLiaison_Attributs();

	var mydoc=top.document;
	var i;
	/*        on génère l'arbre            */

	boxEvent = mydoc.createElement("box");
	boxEvent.setAttribute("flex","1");
	ParentXul.appendChild(boxEvent);

	tree = mydoc.createElement("tree");

	tree.setAttribute("flex","1");

	if (this.SingleSelect==true)
	tree.setAttribute("seltype","single");
	else
	tree.setAttribute("seltype","multiple");

	/* pour avoir une taille minimal */

	tree.setAttribute("style","min-height:100px;min-width:"+this.TabNomsCols.length*50+"px");
	tree.setAttribute("enableColumnDrag","true");
	tree.setAttribute("datasources","rdf:null");
	tree.setAttribute("ref","SQL:ResultRoot");
	/* pour la désactivation totale*/
	tree.setAttribute("FullDisabled","false");
	if (!this.isDom)
	tree.setAttribute("flags","dont-build-content");
	//tree.setAttribute("hidecolumnpicker","true");
	/* on select */
	var ref=AddVar(this);
	tree.setAttribute("onselect","GetVar("+ref+").OnSelect();");
	tree.setAttribute("disabled","true");

	boxEvent.appendChild(tree);

	/* on génère les colonnes */
	treecols = mydoc.createElement("treecols");
	treecols.setAttribute("onclick","GetVar("+ref+").SelectItem(GetVar("+ref+").my_LastSelectedCle)");

	tree.appendChild(treecols);

	/* pour la cle */
	treecol = mydoc.createElement("treecol");
	treecol.setAttribute("flex","1");
	//treecol.setAttribute("label","Colonne Systeme:"+this.my_EnsCleMaitre[i].Cle);
	treecol.setAttribute("label","CLE");
	treecol.setAttribute("ignoreincolumnpicker","true");
	treecol.setAttribute("hidden","true");
	treecol.setAttribute("primary","true");
	treecols.appendChild(treecol);


	/* colonnee cachées pour les esclaves */
	for(i=0;i<this.my_EnsCleMaitre.length;i++)
	{
	    treecol = mydoc.createElement("treecol");
	    treecol.setAttribute("flex","1");
	    treecol.setAttribute("label",this.my_EnsCleMaitre[i].Cle);
	    //treecol.setAttribute("label","");
	    treecol.setAttribute("hidden","true");
	    treecol.setAttribute("ignoreincolumnpicker","true");
	    treecol.setAttribute("primary","true");
	    treecols.appendChild(treecol);
	}

	var reg = new RegExp("^hidden_", "i");
	var hidden = false;
	var treecol_label = '';
	for(i=0;i<this.TabNomsCols.length;i++)
	{
	    /* pour les séparateur de colonnes */
	    if (i!=0)
		{
		    splitter = mydoc.createElement("splitter");
		    splitter.setAttribute("class","tree-splitter");
		    treecols.appendChild(splitter);
		}
	    hidden=false;
	    treecol_label = this.TabNomsCols[i];
	    if (reg.test(treecol_label)) {
		treecol_label = treecol_label.replace(reg, "");
		hidden=true;
	    }
	    /* génération du code xul des colonnes */

	    treecol = mydoc.createElement("treecol");

	    treecol.setAttribute("label",treecol_label);
	    treecol.setAttribute("flex",treecol_label.length);
	    if (hidden) treecol.setAttribute("hidden","true");

	    // La construction dynamique empeche l'utilisation de persist
	    //      treecol.setAttribute("persist","hidden width");
	    treecol.setAttribute("id",LiaisonAtt[i].getAttribut().getNomAttributBD());

	    /* pour avoir une taille correcte */
	    var TailleCol=treecol_label.length*TAILLE_LETTRE+TAILLE_IMAGE;
	    //treecol.setAttribute("style","min-width:"+TailleCol+"px");

	    //      treecol.setAttribute("class","sortDirectionIndicator");
	    //treecol.setAttribute("onmousedown","alert('ok')");

	    label = mydoc.createElement("label");
	    label.setAttribute("value",treecol_label);
	    label.setAttribute("flex","1");
	    label.setAttribute("align","left");
	    treecol.appendChild(label);

	    //      treecol.setAttribute("label",this.TabNomsCols[i]);
	    treecol.setAttribute("sort","rdf:http://www.mozilla.org/SQL-rdf#"+LiaisonAtt[i].getAttribut().getNomAttributBD());

	    this.my_TabSousFiltres[i].GenererXUL(treecol);

	    treecols.appendChild(treecol);



	    /* on trie sur la première colonne */
	    if (i==0)
		{
		    //treecol.setAttribute("primary","true");
		    treecol.setAttribute("sortDirection","ascending");
		    treecol.setAttribute("sortActive","true");
		}
	}

	template = mydoc.createElement("template");
	tree.appendChild(template);

	treechildren = mydoc.createElement("treechildren");
	template.appendChild(treechildren);

	treeitem = mydoc.createElement("treeitem");
	treeitem.setAttribute("uri","rdf:*");
	treechildren.appendChild(treeitem);

	/* on génère les lignes */

	treerow = mydoc.createElement("treerow");
	treeitem.appendChild(treerow);

	/* pour la cle */
	treecell = mydoc.createElement("treecell");
	treecell.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#"+this.ClePrimaire);
	treecell.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#"+this.ClePrimaire);
	treerow.appendChild(treecell);

	for(i=0;i<this.my_EnsCleMaitre.length;i++)
	{
	    treecell = mydoc.createElement("treecell");
	    treecell.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#"+this.my_EnsCleMaitre[i].Cle);
	    treecell.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#"+this.my_EnsCleMaitre[i].Cle);
	    treerow.appendChild(treecell);
	}


	/* pour les lignes dans l'arbre */
	for(i=0;i<LiaisonAtt.length;i++)
	{
	    treecell = mydoc.createElement("treecell");
	    treecell.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#"+LiaisonAtt[i].getAttribut().getNomAttributBD());
	    treecell.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#"+LiaisonAtt[i].getAttribut().getNomAttributBD());
	    treerow.appendChild(treecell);

	}

	/*         fin generation arbre           */
	/*
	  button=mydoc.createElement("button");
	  button.setAttribute("label","reset");
	  button.setAttribute("oncommand","GetVar("+ref+").OnCommand();");
	  groupbox.appendChild(button);
	*/
	this.my_CompoXUL=tree;

	var i;
	for(i=0;i<this.my_TabInterfaceFiltrage.length;i++)
	{
	    if (this.my_TabInterfaceFiltrage[i] instanceof clInterfaceFiltrageArbreDefaut)
		this.my_TabInterfaceFiltrage[i].setArbre(tree);

	}
	//this.my_IFiltreParDefaut.setArbre(tree);



	//   /* CAR ON UTILISE PLUS DONT-BUILT-CONTENT ON DOIT FORCER LE BUILD AVEC UNE REQUETE NON VIDE */

	//   var query=this.my_ReqRefresh.GenererReq();
	//   var result=pgsql_query(query);
	//   if (result.rowCount==0)
	//   {
	//       alert("Attention risques de bugs car table vide !");
	//   }
	//   var ds=result.QueryInterface(Components.interfaces.nsIRDFDataSource);
	//   this.my_CompoXUL.database.AddDataSource(ds);
	//   this.my_CompoXUL.builder.rebuild();
	this.AddCompoAddOn(new clAddon_Refresh());
	if (ACTIVE_EXTRACT)
	this.AddCompoAddOn(new clAddon_Extract());
	this.Limit();
	/* pour force la désactivation */
	boxEvent.addEventListener("mousedown",this.OnEvent,true);
	boxEvent.addEventListener("keypress",this.OnEvent,true);

	return tree;
    }

// clCompoListe.prototype.GenererFiltreXUL =
//     function(ParentXul){
//   var i;

//   for (i=0;i<this.my_TabInterfaceFiltrage.length;i++)
//   {
//       this.my_TabInterfaceFiltrage[i].GenererXUL(ParentXul,this);
//   }
//   /* sinon on les génère dessous*/
//   //for (i=0;i<this.my_TabSousFiltres.length;i++)
//   //{
//   //
//   //}
//     }


/* ********* CompoListeDeroulanteMulti *************** */
clCompoListeDeroulanteMulti.prototype = new clCompoMulti();

function clCompoListeDeroulanteMulti(EnsAttribut,TabInterfaceFiltrage,TabNomsCols,NomChamps) {
    if (arguments.length==0)
	return;

    var TabIFiltre;

    //   IFiltreParDefaut=new clInterfaceFiltrageArbreDefaut();

    //if (TabInterfaceFiltrage!=null)

    TabIFiltre = TabInterfaceFiltrage;

    //else
    //TabIFiltre=new Array(IFiltreParDefaut);

    this.parent=clCompoMulti;
    this.parent(EnsAttribut,TabIFiltre,NomChamps,TabNomsCols);

    this.HasContenu=true;
    this.my_ReqInterne.AddWhere(this.ClePrimaire+' is not null');
    this.my_ReqInterne.SetDistinct('true');
    this.my_ReqContenu.Cloner(this.my_ReqInterne);

    this.ItemNull=null;
    this.my_FiltreInterne=new clInterfaceFiltrageMenuListe();
    this.my_FiltreInterne.setComposant(this);

    var LiaisonAtt=this.my_Affichable.getLiaison_Attributs();
    var PremiereColonne=LiaisonAtt[0].getAttribut().getNomAttributBD();

    this.my_FiltreInterne.setChamps(PremiereColonne);

    //this.OnChangeUser=null;
    //  this.OnChangeUserParams=null;
    /*
      this.my_IFiltreParDefaut=IFiltreParDefaut;

      this.my_IFiltreParDefaut.setTabFiltreCol(this.my_TabSousFiltres);

      this.my_OldSelection=-1;
    */
}


clCompoListeDeroulanteMulti.prototype.getCleVal =
    function(){
	return CompoListeDeroulante_getCleVal(this);
    }


clCompoListeDeroulanteMulti.prototype.getAllCleVal =
    function(){
	return CompoListeDeroulante_getAllCleVal(this);
    }


clCompoListeDeroulanteMulti.prototype.RefreshMyCompoContenu =
    function(requete_result){
	CompoListeDeroulante_RefreshMyCompoContenu(this,requete_result);
    }

clCompoListeDeroulanteMulti.prototype.RefreshMyCompo =
    function(requete_result){
	CompoListeDeroulante_RefreshMyCompo(this,requete_result);
    }


clCompoListeDeroulanteMulti.prototype.OnSelect =
    function()
{
    CompoListeDeroulante_OnSelect(this);
}

clCompoListeDeroulanteMulti.prototype.SelectItem =
    function(cle)
{
    return CompoListeDeroulante_SelectItem(this,cle);
}

clCompoListeDeroulanteMulti.prototype.OnChange =
    function(evt){
	CompoListeDeroulante_OnChange(this,evt);
    }

clCompoListeDeroulanteMulti.prototype.OnHiddenPopup =
    function(){
	CompoListeDeroulante_OnHiddenPopup(this);
    }

clCompoListeDeroulanteMulti.prototype.OnBlur =
    function(){
	return CompoListeDeroulante_OnBlur(this);
    }


clCompoListeDeroulanteMulti.prototype.GenererCompoXUL =
    function(ParentXul){
	return CompoListeDeroulante_GenererCompoXUL(this,ParentXul);
    }

clCompoListeDeroulanteMulti.prototype.getValue =
    function(){
	return CompoListeDeroulante_getValue(this);
    }


































/* ********* Factorisation des listes déroulante *************** */

function CompoListeDeroulante_RefreshMyCompoContenu(ListeDeroulante,result)
{
    /* on rafraichi notre contenu */
    var sources=ListeDeroulante.my_CompoXULRefresh.database.GetDataSources();
    var oldds;

    while (sources.hasMoreElements()) {
	oldds = sources.getNext();
	ListeDeroulante.my_CompoXULRefresh.database.RemoveDataSource(oldds);
    }

    //var query=requete_result.GenererReq();
    //alert(query);
    //var result=pgsql_query(query);
    var ds=result.QueryInterface(Components.interfaces.nsIRDFDataSource);
    ListeDeroulante.my_CompoXULRefresh.database.AddDataSource(ds);
    ListeDeroulante.my_CompoXULRefresh.builder.rebuild();

    //ListeDeroulante.Refresh();
}

function CompoListeDeroulante_getValue(ListeDeroulante)
{
    return CompoListeDeroulante_getCleVal(ListeDeroulante);
}

function CompoListeDeroulante_getCleVal(ListeDeroulante)
{
    var menulist=ListeDeroulante.my_CompoXUL;
    if (menulist.selectedIndex!=-1)
	{
	    return menulist.selectedItem.getAttribute("value"); //.value ne marche pas sur l'item null
	}
    else
	{
	    return -1;
	}
}


function CompoListeDeroulante_getAllCleVal(ListeDeroulante)
{
    var res=new Array();
    var menulist=ListeDeroulante.my_CompoXUL;

    items = menulist.firstChild.childNodes;

    if (items.length>2)
	{
	    for(i=2;i<items.length;i++)
		{
		    res.push(items[i].value);
		}
	}
    return res;
}

function CompoListeDeroulante_RefreshMyCompo(ListeDeroulante,requete_result)
{

    var IdColonne=requete_result.getColumnIndex(ListeDeroulante.ClePrimaire);
    if (IdColonne==-1)
	{
	    alert("Erreur interne: la colonne n'existe pas !");
	    return;
	}

    /* on prends que la 1ère ligne */
    var enumerator = requete_result.enumerate();
    enumerator.beforeFirst();

    if (requete_result.rowCount>0)
	{
	    enumerator.next();

	    var CodeValue=enumerator.getVariant(IdColonne);
	    if (CodeValue!=null)
		ListeDeroulante.SelectItem(CodeValue);
	    else
		ListeDeroulante.my_CompoXUL.selectedItem=ListeDeroulante.ItemNull;
	}
    else
	ListeDeroulante.my_CompoXUL.selectedItem=ListeDeroulante.ItemNull;
}

function CompoListeDeroulante_SelectItem(ListeDeroulante,cle)
{
    var menulist=ListeDeroulante.my_CompoXUL;
    /* colonne de la cle */
    //var IdCol=tree.treeBoxObject.columns.getColumnAt(0);
    var i,val;
    var menulist=ListeDeroulante.my_CompoXUL;

    items = menulist.firstChild.childNodes;

    /* on cherche sur la page en cours*/

    if (ListeDeroulante.ConserverLaSelection)
	{

	    if (items.length>2)
		{
		    for(i=2;i<items.length;i++)
			{
			    val = items[i].value;
			    if (val==cle)
				{
				    //menulist.value=cle;
				    menulist.selectedItem=items[i];
				    ListeDeroulante.OnSelect();
				    return true;
				}
			}
		}

	    /* la clé n'est pas sur la page en cours donc on lance la requete et on cherche la cle */

	    var query=ListeDeroulante.my_ReqContenu.GenererReq();
	    var result=pgsql_query(query);
	    var enumerator = result.enumerate();
	    var offset=-1;
	    var trouve = false;
	    var encore = true;

	    /* si il n'y a pas de résultat */
	    if (result.rowCount==0)
		{
		    menulist.selectedItem=ListeDeroulante.ItemNull;
		    ListeDeroulante.OnSelect();
		    return false;
		}

	    // on recherche sa position dans l'enumerator
	    var IdColReq=result.getColumnIndex(ListeDeroulante.ClePrimaire);
	    enumerator.beforeFirst();

	    while (!trouve && encore) {
		encore = enumerator.next();
		trouve = ( enumerator.getVariant(IdColReq) == cle );
		offset++;
	    }

	    if (!trouve)
		{
		    menulist.selectedItem=ListeDeroulante.ItemNull;
		    ListeDeroulante.OnSelect();
		    return false;
		}

	    /* on se met sur la bonne page */
	    var NewPage=ListeDeroulante.CalculerPage(offset);
	    ListeDeroulante.my_OffSet=(NewPage-1)*LIMIT;
	    ListeDeroulante.my_LimitAddOn.setPageEnCours(NewPage);

	    /* on execute la requete */
	    var query=ListeDeroulante.my_ReqContenu.GenererReq();
	    if (ListeDeroulante.isLimited)
		{
		    query+=" limit "+LIMIT+" offset "+ListeDeroulante.my_OffSet;
		}
	    var result=pgsql_query(query);
	    ListeDeroulante.RefreshMyCompoContenu(result);

	    //ListeDeroulante.RefreshContenu();//MyCompo(result);

	    items = menulist.firstChild.childNodes;

	    if (items.length>2)
		{
		    for(i=2;i<items.length;i++)
			{
			    val = items[i].value;
			    if (val==cle)
				{
				    //menulist.value=cle;
				    menulist.selectedItem=items[i];
				    ListeDeroulante.OnSelect();
				    return true;
				}
			}
		}
	    menulist.selectedItem=ListeDeroulante.ItemNull;
	    ListeDeroulante.OnSelect();
	    return false;
	}
    else
	{
	    menulist.selectedItem=ListeDeroulante.ItemNull;
	    ListeDeroulante.OnSelect();
	    return true;
	}
}

function CompoListeDeroulante_OnHiddenPopup(ListeDeroulante)
{
    var CleAv=ListeDeroulante.getCleVal();
    var Old_ConserverLaSelection=ListeDeroulante.ConserverLaSelection;
    ListeDeroulante.ConserverLaSelection=false;
    ListeDeroulante.my_FiltreInterne.Activer(false);
    ListeDeroulante.ConserverLaSelection=Old_ConserverLaSelection;
    ListeDeroulante.SelectItem(CleAv);

    if (ListeDeroulante.OnChangeUser!=null)
	ListeDeroulante.OnChangeUser(ListeDeroulante,ListeDeroulante.OnChangeUserParams);
}

function CompoListeDeroulante_OnBlur(ListeDeroulante)
{
    /* on doit finir l'autocompletion */
    var FiltreActif;
    var menulist=ListeDeroulante.my_CompoXUL;
    FiltreActif = ListeDeroulante.my_FiltreInterne.Filtrer(menulist.inputField.value);

    if (FiltreActif)
	{
	    /* on selectionne le premier non null */
	    items = menulist.firstChild.childNodes;
	    if (items.length>4)
		{
		    menulist.selectedItem=items[4];
		}
	    else
		menulist.selectedItem=ListeDeroulante.ItemNull;
	}

    CompoListeDeroulante_OnHiddenPopup(ListeDeroulante);

    return true;
}

function CompoListeDeroulante_OnChange(ListeDeroulante,evt)
{
    var FiltreActif;
    var menulist=ListeDeroulante.my_CompoXUL;
    /* si on appuie sur entrée */
    if (evt.keyCode==evt.DOM_VK_RETURN )
	dump(menulist.open);

    if (evt.keyCode==evt.DOM_VK_RETURN && !(menulist.open))
	{
	    FiltreActif = ListeDeroulante.my_FiltreInterne.Filtrer(menulist.inputField.value);

	    if (FiltreActif)
		{
		    /* on selectionne le premier non null */
		    items = menulist.firstChild.childNodes;
		    if (items.length>4)
			{
			    menulist.selectedItem=items[4];
			}
		    else
			menulist.selectedItem=ListeDeroulante.ItemNull;
		    menulist.open=true;
		}
	}
}

function CompoListeDeroulante_OnSelect(ListeDeroulante)
{
    //alert("val:"+ListeDeroulante.getValue(ListeDeroulante));
    ListeDeroulante.RefreshFiltre();
    //ListeDeroulante.RefreshEsclaves();
}

function CompoListeDeroulante_GenererCompoXUL(ListeDeroulante,ParentXul)
{

    var label,menulist,template,menupopup,menuitem,button,hbox,vbox,hboxOr;
    var mydoc=top.document;

    if (ListeDeroulante instanceof clCompoListeDeroulanteMulti)
	var LiaisonAtt=ListeDeroulante.my_Affichable.getLiaison_Attributs();

    /*
      POUR EVITER UN BUG XUL => SINON LE MENULIST N'AS PAS DE MENUPOPUP
      je sais c'est n'importe quoi de devoir ajouter un bouton caché qui sert à rien
      mais y a que comme ça que j'arrive à faire marcher le code, sinon le tout premier
      menulist ne marche pas
    */
    hboxOr = mydoc.createElement("hbox");
    hboxOr.setAttribute("align","center");
    hboxOr.setAttribute("flex","1");
    //    hboxOr.setAttribute("equalsize","always");
    ParentXul.appendChild(hboxOr);

    //  button = mydoc.createElement("button");
    //  button.setAttribute("hidden","true");
    //  hboxOr.appendChild(button);

    label = mydoc.createElement("label");
    label.setAttribute("class","labelize-uniline");
    label.setAttribute("value",ListeDeroulante.NomChamps);
    hboxOr.appendChild(label);

    menulist = mydoc.createElement("menulist");
    menulist.setAttribute("editable","true");
    var ref=AddVar(ListeDeroulante);
    //menulist.setAttribute("onkeyup","GetVar("+ref+").OnChange(event)");
    menulist.setAttribute("style","min-width:200px");
    menulist.setAttribute("disabled","true");
    menulist.setAttribute("disableautoselect","true");
    menulist.setAttribute("flex","1");

    hboxOr.appendChild(menulist);

    menulist.inputField.setAttribute("onblur","return GetVar("+ref+").OnBlur(event)");
    menulist.inputField.setAttribute("onkeyup","GetVar("+ref+").OnChange(event)");

    //menulist.addEventListener("keyup",ListeDeroulante.OnChange,false);

    menupopup = mydoc.createElement("menupopup");
    menupopup.setAttribute("datasources","rdf:null");
    menupopup.setAttribute("ref","SQL:ResultRoot");
    menupopup.setAttribute("ignorekeys","true");
    menupopup.setAttribute("onpopuphidden","GetVar("+ref+").OnHiddenPopup()");
    menulist.appendChild(menupopup);

    /* Pour les addon*/
    hbox = mydoc.createElement("hbox");
    hbox.setAttribute("flex","1");
    hbox.setAttribute("pack","center");
    hbox.setAttribute("class","menulistAddOn");
    menupopup.appendChild(hbox);
    ListeDeroulante.my_CompoForAddOn = hbox;

    /* ENTETE DES COLONNES */
    hbox = mydoc.createElement("hbox");
    //    hbox.setAttribute("equalsize","always");
    hbox.setAttribute("class","menulistheader");
    menupopup.appendChild(hbox);

    if (ListeDeroulante instanceof clCompoListeDeroulanteMulti)
	{
	    var StrMenuItemLabel="rdf:http://www.mozilla.org/SQL-rdf#"+LiaisonAtt[0].getAttribut().getNomAttributBD();
	    for(i=0;i<ListeDeroulante.TabNomsCols.length;i++)
		{
		    /*
		      if(i!=0)
		      StrMenuItemLabel+="  -  ";

		      StrMenuItemLabel+=ListeDeroulante.TabNomsCols[i]+" : ";
		      StrMenuItemLabel+="rdf:http://www.mozilla.org/SQL-rdf#"+LiaisonAtt[i].getAttribut().getNomAttributBD();
		    */
		    label = mydoc.createElement("label");
		    label.setAttribute("value",ListeDeroulante.TabNomsCols[i]);
		    label.setAttribute("flex","1");
		    hbox.appendChild(label);
		}
	}

    template = mydoc.createElement("template");
    menupopup.appendChild(template);

    /* valeur pour les champs null */
    menuitem = mydoc.createElement("menuitem");
    menuitem.setAttribute("label","<Pas de valeur>");
    menuitem.setAttribute("value","-1");
    menupopup.appendChild(menuitem);
    ListeDeroulante.ItemNull=menuitem;

    menuitem = mydoc.createElement("menuitem");
    menuitem.setAttribute("uri","rdf:*");

    if (ListeDeroulante instanceof clCompoListeDeroulanteMulti)
	menuitem.setAttribute("label",StrMenuItemLabel);
    else
	menuitem.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#"+ListeDeroulante.my_Affichable.getNomAttributBD());

    //    menuitem.setAttribute("equalsize","always");
    menuitem.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#"+ListeDeroulante.ClePrimaire);
    template.appendChild(menuitem);


    if (ListeDeroulante instanceof clCompoListeDeroulanteMulti)
	{
	    for(i=0;i<ListeDeroulante.TabNomsCols.length;i++)
		{
		    label = mydoc.createElement("label");
		    label.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#"+LiaisonAtt[i].getAttribut().getNomAttributBD());
		    label.setAttribute("flex","1");
		    menuitem.appendChild(label);
		}
	}

    ListeDeroulante.my_CompoXUL=menulist;
    ListeDeroulante.my_CompoXULRefresh=menupopup;

    /* on execute la requete */
    //var query=ListeDeroulante.my_ReqInterne.GenererReq();
    //var result=pgsql_query(query);

    //alert("requete=\n"+query+"\nNb res:"+result.rowCount);

    //var ds=result.QueryInterface(Components.interfaces.nsIRDFDataSource);
    //menupopup.database.AddDataSource(ds);
    //menupopup.builder.rebuild();

    ListeDeroulante.AddCompoAddOn(new clAddon_Refresh());
    ListeDeroulante.Limit();

    return hboxOr;
}
