function AllerAOnglet(i)
{
        top.document.getElementById("Main_Tabbox").selectedIndex=i;
        top.document.getElementById(Onglet).hidden=false;
}
function FermerOnglet(Onglet)
{
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(-1);
        top.document.getElementById(Onglet).hidden=true;
}
function Suppr_ListeDessous(event)
{
   if(event.type!="keypress" || event.keyCode!=event.DOM_VK_DELETE)
        return;

   tree=event.target;

   if (tree.disabled || tree.view==null || tree.currentIndex==-1)
        return;

    var SelectedItem =  tree.view.getItemAtIndex(tree.currentIndex);
    var treeChildren =  SelectedItem.parentNode;
    treeChildren.removeChild(SelectedItem);
}

function DoubleClic_ArbreDessus(ListeDessus,ListeDessous)
{
    if(ListeDessous.disabled || ListeDessus.view==null || ListeDessus.currentIndex==-1)
        return;

    /* on regarde si cet item n'existe pas déjà */
    if(ListeDessous.view!=null)
        {
            var ValDessus=ListeDessus.view.getCellValue(ListeDessus.currentIndex,ListeDessus.treeBoxObject.columns.getColumnAt(0));
            for(i=0;i<ListeDessous.view.rowCount;i++)
                {
                    if( ListeDessous.view.getCellValue(i,ListeDessous.treeBoxObject.columns.getColumnAt(0)) == ValDessus )
                        {
                            alert("Cet élément est déjà présent");
                            return;
                        }
                }
        }

    var item =  ListeDessus.view.getItemAtIndex(ListeDessus.currentIndex).cloneNode(true);

    /* si il n'y a pas de tree children pour le content */    
    var Tab=ChercherCompo(ListeDessous,"treechildren",2);
    var treechildren;
    if(Tab.length!=2)
        {
            /* on crée le treechildren */
            var mydoc = top.document;
            treechildren = mydoc.createElement("treechildren");
            ListeDessous.appendChild(treechildren);
        }
    else
        {
            /* Le TarNode est le treechildren */
            treechildren = Tab[1];
        }
    treechildren.appendChild(item);
}
/* TABLEAU GLOBALE QUI CONTIENT LES COMPOSANTS D'INTERFACE */

var TAB_GLOBAL_COMPO = new Array();
/* pour associer des attributs aux composants */
function stProprieteCompo()
{
        this.Action_en_cours=null;
        this.NewCle=null;
}
var TAB_COMPO_PPTES = new Array(625);
/* on init le tableau */
var id
for(id=0;id<TAB_COMPO_PPTES.length;id++)
{
        TAB_COMPO_PPTES[id] = new stProprieteCompo();
}
const INSERT=1;
const DELETE=2;
const UPDATE=3;

function GetValAt(i)
{
    /* ON CONVERTIE EN CHAINE DE CARACTERE  */
    return ""+TAB_GLOBAL_COMPO[i].getValue();
}

function GetSQLCompoAt(i)
{
    return TAB_GLOBAL_COMPO[i];
}



/* *********************************************** 
         FONCTIONS POUR L'ONGLET Personnes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Personnes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Personnes");
}

function Insert_Personnes_Liste_des_personnes0()
{
 TAB_COMPO_PPTES[606].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[606].NewCle = getNewCle("table_personne");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[606].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[611];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[612];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[613];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[614];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[615];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[616];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[617];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[618];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[622];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[606];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[606].NewCle;
}

function Delete_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[606].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[606];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[606].Action_en_cours = DELETE;
         User_Delete_Personnes_Liste_des_personnes0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[606].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[606].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[606].NewCle = TAB_GLOBAL_COMPO[606].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[606].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[611];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[612];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[613];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[614];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[615];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[616];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[617];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[618];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[622];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
return TAB_COMPO_PPTES[606].NewCle;
}

function Validate_Personnes_Liste_des_personnes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[606];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[606].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Liste_des_personnes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Liste_des_personnes0(Maitre))==-1)
                return -1;
        break;
 }
 /* On construit la requete pour ajouter les nouvelles cles */
 if (NewCle!=null)
 {
         var ReqNewCle=new clReqSQL();
         var OldUnion=Maitre.my_ReqRefresh.getUnion();
        if (OldUnion==null)
        {
                ReqNewCle.Cloner(Maitre.my_ReqInterne);
        }
        else
        {
                ReqNewCle.Cloner(OldUnion);
        }
         ReqNewCle.AddWhere(Maitre.getCle()+" = "+NewCle,"OR");
        Maitre.Union(ReqNewCle);
 }
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[606].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[611];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[612];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[613];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[614];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[615];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[616];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[617];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[618];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[622];
 Esclave_8.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[606].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[606].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Liste_des_personnes0()
{
 TAB_COMPO_PPTES[606].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[606].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[611];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[612];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[613];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[614];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[615];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[616];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[617];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[618];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[622];
 Esclave_8.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
}





function personne_Chargement()
{
pgsql_init(true);
if (!pgsql_getConnectionState())
{
        top.close();
        return;
}
Init_ALeDroit();
var query='SELECT current_user, current_date;';
var result=pgsql_query(query);
if (result.rowCount>0){var enum=result.enumerate();enum.first(); var user_name = enum.getVariant(0); window.title = user_name+' - '+window.title; stlog = top.document.getElementById('status_login'); if (stlog!=null) {stlog.label='Nom d\'utilisateur : '+user_name;} }
var Col_N0_N_Pers__De_Personnes_Liste_des_personnes0=new clAttribut("pe_numero","table_personne",null);

var Col_N1_Titre_De_Personnes_Liste_des_personnes0=new clAttribut("pe_titre","table_personne",null);

var Col_N2_Nom_De_Personnes_Liste_des_personnes0=new clAttribut("pe_nom","table_personne",null);

var Col_N3_Prénom_De_Personnes_Liste_des_personnes0=new clAttribut("pe_prenom","table_personne",null);

var Personnes_Numéro_1=new clAttribut("pe_id","table_personne",null);


	/* Ce composant représente: table_personne.pe_id sous le nom "Numéro" */
var Compo_Personnes_Numéro_1=new clCompolabel(Personnes_Numéro_1,null,"Numéro",undefined,undefined);
var Personnes_Titre_ou_F_J__2=new clAttribut("np_libelle","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_libelle sous le nom "Titre ou F.J." */
var Compo_Personnes_Titre_ou_F_J__2=new clCompoListeDeroulanteSimple(Personnes_Titre_ou_F_J__2,null,"Titre ou F.J.");
var Joint_Esclave_Personnes_Titre_ou_F_J__2=new clJointureMulti("table_personne",
	new Array(
	new stJointure("naturepersonne","np_numero","np_numero",null,false)
	));
var Personnes_Nom_ou_D_S__3=new clAttribut("pe_nom","table_personne",null);


	/* Ce composant représente: table_personne.pe_nom sous le nom "Nom ou D.S." */
var Compo_Personnes_Nom_ou_D_S__3=new clCompoTextBox(Personnes_Nom_ou_D_S__3,null,"Nom ou D.S.",false,false);
var Personnes_Prénom_4=new clAttribut("pe_prenom","table_personne",null);


	/* Ce composant représente: table_personne.pe_prenom sous le nom "Prénom" */
var Compo_Personnes_Prénom_4=new clCompoTextBox(Personnes_Prénom_4,null,"Prénom",false,false);
var Personnes_N_TVA_intrac__5=new clAttribut("pe_numtvaic","table_personne",null);


	/* Ce composant représente: table_personne.pe_numtvaic sous le nom "N°TVA intrac." */
var Compo_Personnes_N_TVA_intrac__5=new clCompoTextBox(Personnes_N_TVA_intrac__5,null,"N°TVA intrac.",false,false);
var Personnes_Né_e__le_6=new clAttribut("pe_naissance","table_personne",null);


	/* Ce composant représente: table_personne.pe_naissance sous le nom "Né(e) le" */
var Compo_Personnes_Né_e__le_6=new clCompoTextBox(Personnes_Né_e__le_6,null,"Né(e) le",false,false);
var Personnes_La_personne_est_active__et_peut_être_contactée__7=new clAttribut("pe_actif","table_personne",null);


	/* Ce composant représente: table_personne.pe_actif sous le nom "La personne est active (et peut être contactée)" */
var Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7=new clCompoCheckBox(Personnes_La_personne_est_active__et_peut_être_contactée__7,null,"La personne est active (et peut être contactée)");
var Col_N0_Libellé_De_Personnes_Adhésions_8=new clAttribut("ah_libelle","adherence",null);

var Joint_Col_N0_Libellé_De_Personnes_Adhésions_8=new clJointureMulti("adhesion",
	new Array(
	new stJointure("adherence","ah_numero","ah_numero",null,true)
	));
var Col_N1_Du_De_Personnes_Adhésions_8=new clAttribut("po_debut","periode",null);

var Joint_Col_N1_Du_De_Personnes_Adhésions_8=new clJointureMulti("adhesion",
	new Array(
	new stJointure("periode","po_numero","po_numero",null,true)
	));
var Col_N2_Au_De_Personnes_Adhésions_8=new clAttribut("po_fin","periode",null);

var Joint_Col_N2_Au_De_Personnes_Adhésions_8=new clJointureMulti("adhesion",
	new Array(
	new stJointure("periode","po_numero","po_numero",null,true)
	));
var Personnes_Adhésions_8=new clEnsembleAttributs("adhesion",
	new Array(
	new clLiaison(Joint_Col_N0_Libellé_De_Personnes_Adhésions_8,Col_N0_Libellé_De_Personnes_Adhésions_8)
	,new clLiaison(Joint_Col_N1_Du_De_Personnes_Adhésions_8,Col_N1_Du_De_Personnes_Adhésions_8)
	,new clLiaison(Joint_Col_N2_Au_De_Personnes_Adhésions_8,Col_N2_Au_De_Personnes_Adhésions_8)
	),
	null);

var Titre_Personnes_Adhésions_8=new Array("Libellé","Du","Au");

	/* Ce composant représente: des éléments de la table adhesion sous le nom "Adhésions" */
var Compo_Personnes_Adhésions_8=new clCompoListe(Personnes_Adhésions_8,null,Titre_Personnes_Adhésions_8,"Adhésions",true,false);
var Joint_Esclave_Personnes_Adhésions_8=new clJointureMulti("table_personne",
	new Array(
	new stJointure("adhesion","pe_numero","pe_numero",null,false)
	));
var Col_N0_Importance_De_Personnes_Observations_9=new clAttribut("ob_niveau","observation",null);

var Col_N1_Description_De_Personnes_Observations_9=new clAttribut("ob_observation","observation",null);

var Personnes_Observations_9=new clEnsembleAttributs("observation",
	new Array(
	new clLiaison(null,Col_N0_Importance_De_Personnes_Observations_9)
	,new clLiaison(null,Col_N1_Description_De_Personnes_Observations_9)
	),
	null);

var Titre_Personnes_Observations_9=new Array("Importance","Description");

	/* Ce composant représente: des éléments de la table observation sous le nom "Observations" */
var Compo_Personnes_Observations_9=new clCompoListe(Personnes_Observations_9,null,Titre_Personnes_Observations_9,"Observations",true,false);
var Joint_Esclave_Personnes_Observations_9=new clJointureMulti("table_personne",
	new Array(
	new stJointure("observation","pe_numero","pe_numero",null,false)
	));
var Personnes_Liste_des_personnes0=new clEnsembleAttributs("table_personne",
	new Array(
	new clLiaison(null,Col_N0_N_Pers__De_Personnes_Liste_des_personnes0)
	,new clLiaison(null,Col_N1_Titre_De_Personnes_Liste_des_personnes0)
	,new clLiaison(null,Col_N2_Nom_De_Personnes_Liste_des_personnes0)
	,new clLiaison(null,Col_N3_Prénom_De_Personnes_Liste_des_personnes0)
	),
	new Array(
	new clLiaison(null,Personnes_Numéro_1)
	,new clLiaison(Joint_Esclave_Personnes_Titre_ou_F_J__2,Personnes_Titre_ou_F_J__2)
	,new clLiaison(null,Personnes_Nom_ou_D_S__3)
	,new clLiaison(null,Personnes_Prénom_4)
	,new clLiaison(null,Personnes_N_TVA_intrac__5)
	,new clLiaison(null,Personnes_Né_e__le_6)
	,new clLiaison(null,Personnes_La_personne_est_active__et_peut_être_contactée__7)
	,new clLiaison(Joint_Esclave_Personnes_Adhésions_8,Personnes_Adhésions_8)
	,new clLiaison(Joint_Esclave_Personnes_Observations_9,Personnes_Observations_9)
	));

var Titre_Personnes_Liste_des_personnes0=new Array("N°Pers.","Titre","Nom","Prénom");

	/* Ce composant représente: des éléments de la table table_personne sous le nom "Liste des personnes" */
var Compo_Personnes_Liste_des_personnes0=new clCompoListe(Personnes_Liste_des_personnes0,new Array(new clInterfaceFiltrageVide()),Titre_Personnes_Liste_des_personnes0,"Liste des personnes",true,false);

	/* Ce composant représente: table_personne.undefined sous le nom "Liste des personnes" */
Compo_Personnes_Liste_des_personnes0.AddCompoAddOn(new clAddon_Fctmenupopup("Rechercher",new Array("Par numéro","Par nom","Par code postal","Par ville","Par contact"),new Array(Recherche_Num,Recherche_Nom,Recherche_CP,Recherche_Ville,Recherche_Contact),new Array(Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0)));
 if(ALeDroit(0,"table_personne"))
 {
Compo_Personnes_Liste_des_personnes0.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0"));

 }

	/* On l'ajoute au tableau global à l'indice 606*/
top.TAB_GLOBAL_COMPO[606]=Compo_Personnes_Liste_des_personnes0;

	/* Ce composant représente: des éléments de la table table_personne sous le nom "Numéro" */
 if(ALeDroit(0,"table_personne"))
 {
Compo_Personnes_Numéro_1.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 611*/
top.TAB_GLOBAL_COMPO[611]=Compo_Personnes_Numéro_1;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Titre ou F.J." */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Personnes_Titre_ou_F_J__2.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 612*/
top.TAB_GLOBAL_COMPO[612]=Compo_Personnes_Titre_ou_F_J__2;

	/* Ce composant représente: des éléments de la table table_personne sous le nom "Nom ou D.S." */
 if(ALeDroit(0,"table_personne"))
 {
Compo_Personnes_Nom_ou_D_S__3.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 613*/
top.TAB_GLOBAL_COMPO[613]=Compo_Personnes_Nom_ou_D_S__3;

	/* Ce composant représente: des éléments de la table table_personne sous le nom "Prénom" */
 if(ALeDroit(0,"table_personne"))
 {
Compo_Personnes_Prénom_4.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 614*/
top.TAB_GLOBAL_COMPO[614]=Compo_Personnes_Prénom_4;

	/* Ce composant représente: des éléments de la table table_personne sous le nom "N°TVA intrac." */
 if(ALeDroit(0,"table_personne"))
 {
Compo_Personnes_N_TVA_intrac__5.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 615*/
top.TAB_GLOBAL_COMPO[615]=Compo_Personnes_N_TVA_intrac__5;

	/* Ce composant représente: des éléments de la table table_personne sous le nom "Né(e) le" */
 if(ALeDroit(0,"table_personne"))
 {
Compo_Personnes_Né_e__le_6.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 616*/
top.TAB_GLOBAL_COMPO[616]=Compo_Personnes_Né_e__le_6;

	/* Ce composant représente: des éléments de la table table_personne sous le nom "La personne est active (et peut être contactée)" */
 if(ALeDroit(0,"table_personne"))
 {
Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 617*/
top.TAB_GLOBAL_COMPO[617]=Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7;

	/* Ce composant représente: adhesion.undefined sous le nom "Adhésions" */
 if(ALeDroit(0,"adhesion"))
 {
Compo_Personnes_Adhésions_8.GenererXUL(top.document.getElementById("Personnes_Adhésions_8"));

 }

	/* On l'ajoute au tableau global à l'indice 618*/
top.TAB_GLOBAL_COMPO[618]=Compo_Personnes_Adhésions_8;

	/* Ce composant représente: observation.undefined sous le nom "Observations" */
 if(ALeDroit(0,"observation"))
 {
Compo_Personnes_Observations_9.GenererXUL(top.document.getElementById("Personnes_Observations_9"));

 }

	/* On l'ajoute au tableau global à l'indice 622*/
top.TAB_GLOBAL_COMPO[622]=Compo_Personnes_Observations_9;
 if(ALeDroit(5,"table_personne"))
 {
/* On refresh les composants non dépendents de l'onget Personnes*/
var Composant_0 = TAB_GLOBAL_COMPO[606];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Personnes").hidden=true;
if (top.document.getElementById("Onglet_Personnes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"table_personne"))
 {
nb_button++;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").hidden=true;

 }
 if(ALeDroit(4,"table_personne"))
 {
nb_button++;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").hidden=true;

 }
 if(ALeDroit(1,"table_personne"))
 {
nb_button++;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Personnes_Liste_des_personnes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Liste_des_personnes0").hidden=true;
        top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").hidden=true;
}
ConstruireOngletEstLie("tabbox_Personnes_Liste_des_personnes0",606);
Compo_Personnes_Liste_des_personnes0.OnChangeUser=RefreshOngletEstLie;
Compo_Personnes_Liste_des_personnes0.OnChangeUserParams=Compo_Personnes_Liste_des_personnes0;
}
