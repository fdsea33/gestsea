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

    /* on regarde si cet item n'existe pas d�j� */
    if(ListeDessous.view!=null)
        {
            var ValDessus=ListeDessus.view.getCellValue(ListeDessus.currentIndex,ListeDessus.treeBoxObject.columns.getColumnAt(0));
            for(i=0;i<ListeDessous.view.rowCount;i++)
                {
                    if( ListeDessous.view.getCellValue(i,ListeDessous.treeBoxObject.columns.getColumnAt(0)) == ValDessus )
                        {
                            alert("Cet �l�ment est d�j� pr�sent");
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
            /* on cr�e le treechildren */
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
var TAB_COMPO_PPTES = new Array(731);
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
         FONCTIONS POUR L'ONGLET Activit�s
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Activit�s()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Activit�s");
}

function Insert_Activit�s_Liste_des_activit�s0()
{
 TAB_COMPO_PPTES[693].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[693].NewCle = getNewCle("activite");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[693].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[700];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[701];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[702];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[703];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[704];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[705];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[706];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[707];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[708];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[709];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Annuler_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Insert_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Delete_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Update_Activit�s_Liste_des_activit�s0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[693];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[693].NewCle;
}

function Delete_Activit�s_Liste_des_activit�s0()
{
 if (TAB_GLOBAL_COMPO[693].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[693];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[693].Action_en_cours = DELETE;
         User_Delete_Activit�s_Liste_des_activit�s0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Activit�s_Liste_des_activit�s0()
{
 if (TAB_GLOBAL_COMPO[693].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[693].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[693].NewCle = TAB_GLOBAL_COMPO[693].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[693].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[700];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[701];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[702];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[703];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[704];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[705];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[706];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[707];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[708];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[709];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Annuler_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Insert_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Delete_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Update_Activit�s_Liste_des_activit�s0").disabled=true;
return TAB_COMPO_PPTES[693].NewCle;
}

function Validate_Activit�s_Liste_des_activit�s0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[693];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[693].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Activit�s_Liste_des_activit�s0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Activit�s_Liste_des_activit�s0(Maitre))==-1)
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
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[693].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[700];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[701];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[702];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[703];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[704];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[705];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[706];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[707];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[708];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[709];
 Esclave_9.ActiverComposant(false);
top.document.getElementById("Validate_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Annuler_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Insert_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Delete_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Update_Activit�s_Liste_des_activit�s0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[693].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[693].Action_en_cours = null;
 return NewCle;
}

function Annuler_Activit�s_Liste_des_activit�s0()
{
 TAB_COMPO_PPTES[693].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[693].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[700];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[701];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[702];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[703];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[704];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[705];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[706];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[707];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[708];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[709];
 Esclave_9.ActiverComposant(false);
top.document.getElementById("Validate_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Annuler_Activit�s_Liste_des_activit�s0").disabled=true;
top.document.getElementById("Insert_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Delete_Activit�s_Liste_des_activit�s0").disabled=false;
top.document.getElementById("Update_Activit�s_Liste_des_activit�s0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET T�ches
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_T�ches()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_T�ches");
}

function Insert_T�ches_Liste_des_t�ches0()
{
 TAB_COMPO_PPTES[710].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[710].NewCle = getNewCle("tache");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[710].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[712];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[713];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[714];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Annuler_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Insert_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Delete_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Update_T�ches_Liste_des_t�ches0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[710];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[710].NewCle;
}

function Delete_T�ches_Liste_des_t�ches0()
{
 if (TAB_GLOBAL_COMPO[710].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[710];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[710].Action_en_cours = DELETE;
         User_Delete_T�ches_Liste_des_t�ches0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_T�ches_Liste_des_t�ches0()
{
 if (TAB_GLOBAL_COMPO[710].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[710].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[710].NewCle = TAB_GLOBAL_COMPO[710].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[710].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[712];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[713];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[714];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Annuler_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Insert_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Delete_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Update_T�ches_Liste_des_t�ches0").disabled=true;
return TAB_COMPO_PPTES[710].NewCle;
}

function Validate_T�ches_Liste_des_t�ches0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[710];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[710].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_T�ches_Liste_des_t�ches0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_T�ches_Liste_des_t�ches0(Maitre))==-1)
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
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[710].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[712];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[713];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[714];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Annuler_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Insert_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Delete_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Update_T�ches_Liste_des_t�ches0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[710].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[710].Action_en_cours = null;
 return NewCle;
}

function Annuler_T�ches_Liste_des_t�ches0()
{
 TAB_COMPO_PPTES[710].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[710].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[712];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[713];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[714];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Annuler_T�ches_Liste_des_t�ches0").disabled=true;
top.document.getElementById("Insert_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Delete_T�ches_Liste_des_t�ches0").disabled=false;
top.document.getElementById("Update_T�ches_Liste_des_t�ches0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Sujets
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Sujets()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Sujets");
}

function Insert_Sujets_Liste_des_types_de_sujets0()
{
 TAB_COMPO_PPTES[719].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[719].NewCle = getNewCle("typesujet");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[719].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[721];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[722];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=false;
 var Esclave_2=TAB_GLOBAL_COMPO[723];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Annuler_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Insert_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Delete_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Update_Sujets_Liste_des_types_de_sujets0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[719];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[719].NewCle;
}

function Delete_Sujets_Liste_des_types_de_sujets0()
{
 if (TAB_GLOBAL_COMPO[719].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[719];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[719].Action_en_cours = DELETE;
         User_Delete_Sujets_Liste_des_types_de_sujets0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Sujets_Liste_des_types_de_sujets0()
{
 if (TAB_GLOBAL_COMPO[719].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[719].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[719].NewCle = TAB_GLOBAL_COMPO[719].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[719].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[721];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[722];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=false;
 var Esclave_2=TAB_GLOBAL_COMPO[723];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Annuler_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Insert_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Delete_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Update_Sujets_Liste_des_types_de_sujets0").disabled=true;
return TAB_COMPO_PPTES[719].NewCle;
}

function Validate_Sujets_Liste_des_types_de_sujets0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[719];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[719].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Sujets_Liste_des_types_de_sujets0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Sujets_Liste_des_types_de_sujets0(Maitre))==-1)
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
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[719].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[721];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[722];
 Esclave_1.ActiverComposant(false);
Annuler_Sujets_Sujets_3();
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=true;
 var Esclave_2=TAB_GLOBAL_COMPO[723];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Annuler_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Insert_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Delete_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Update_Sujets_Liste_des_types_de_sujets0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[719].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[719].Action_en_cours = null;
 return NewCle;
}

function Annuler_Sujets_Liste_des_types_de_sujets0()
{
 TAB_COMPO_PPTES[719].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[719].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[721];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[722];
 Esclave_1.ActiverComposant(false);
Annuler_Sujets_Sujets_3();
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=true;
 var Esclave_2=TAB_GLOBAL_COMPO[723];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Annuler_Sujets_Liste_des_types_de_sujets0").disabled=true;
top.document.getElementById("Insert_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Delete_Sujets_Liste_des_types_de_sujets0").disabled=false;
top.document.getElementById("Update_Sujets_Liste_des_types_de_sujets0").disabled=false;
}

function Insert_Sujets_Sujets_3()
{
 if (TAB_COMPO_PPTES[719].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Sujets_Liste_des_types_de_sujets0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Sujets_Liste_des_types_de_sujets0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                                return -1;
                        }
                        Insert_Sujets_Sujets_3();
                }
                 return;
         }
 TAB_COMPO_PPTES[723].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[723].NewCle = getNewCle("sujet");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[723].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[725];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[726];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[723];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[723].NewCle;
}

function Delete_Sujets_Sujets_3()
{
 if (TAB_GLOBAL_COMPO[723].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[723];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[723].Action_en_cours = DELETE;
         User_Delete_Sujets_Sujets_3(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Sujets_Sujets_3()
{
 if (TAB_GLOBAL_COMPO[723].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[723].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[723].NewCle = TAB_GLOBAL_COMPO[723].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[723].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[725];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[726];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=true;
return TAB_COMPO_PPTES[723].NewCle;
}

function Validate_Sujets_Sujets_3(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[723];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[723].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Sujets_Sujets_3(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Sujets_Sujets_3(Maitre))==-1)
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
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[723].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[725];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[726];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[723].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[723].Action_en_cours = null;
 return NewCle;
}

function Annuler_Sujets_Sujets_3()
{
 TAB_COMPO_PPTES[723].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[723].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[725];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[726];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Annuler_Sujets_Sujets_3").disabled=true;
top.document.getElementById("Insert_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Delete_Sujets_Sujets_3").disabled=false;
top.document.getElementById("Update_Sujets_Sujets_3").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Groupe
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Groupe()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Groupe");
}

function Insert_Groupe_Liste_des_groupes0()
{
 TAB_COMPO_PPTES[727].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[727].NewCle = getNewCle("groupe");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[727].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[729];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[730];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Annuler_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Insert_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Delete_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Update_Groupe_Liste_des_groupes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[727];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[727].NewCle;
}

function Delete_Groupe_Liste_des_groupes0()
{
 if (TAB_GLOBAL_COMPO[727].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[727];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[727].Action_en_cours = DELETE;
         User_Delete_Groupe_Liste_des_groupes0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Groupe_Liste_des_groupes0()
{
 if (TAB_GLOBAL_COMPO[727].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[727].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[727].NewCle = TAB_GLOBAL_COMPO[727].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[727].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[729];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[730];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Annuler_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Insert_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Delete_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Update_Groupe_Liste_des_groupes0").disabled=true;
return TAB_COMPO_PPTES[727].NewCle;
}

function Validate_Groupe_Liste_des_groupes0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[727];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[727].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Groupe_Liste_des_groupes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Groupe_Liste_des_groupes0(Maitre))==-1)
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
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[727].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[729];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[730];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Annuler_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Insert_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Delete_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Update_Groupe_Liste_des_groupes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[727].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[727].Action_en_cours = null;
 return NewCle;
}

function Annuler_Groupe_Liste_des_groupes0()
{
 TAB_COMPO_PPTES[727].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[727].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[729];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[730];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Annuler_Groupe_Liste_des_groupes0").disabled=true;
top.document.getElementById("Insert_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Delete_Groupe_Liste_des_groupes0").disabled=false;
top.document.getElementById("Update_Groupe_Liste_des_groupes0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Lieu
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Lieu()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Lieu");
}

function Insert_Lieu_Liste_des_lieus0()
{
 TAB_COMPO_PPTES[715].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[715].NewCle = getNewCle("lieu");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[715].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[717];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[718];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Annuler_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Insert_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Delete_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Update_Lieu_Liste_des_lieus0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[715];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[715].NewCle;
}

function Delete_Lieu_Liste_des_lieus0()
{
 if (TAB_GLOBAL_COMPO[715].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[715];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[715].Action_en_cours = DELETE;
         User_Delete_Lieu_Liste_des_lieus0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Lieu_Liste_des_lieus0()
{
 if (TAB_GLOBAL_COMPO[715].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[715].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[715].NewCle = TAB_GLOBAL_COMPO[715].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[715].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[717];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[718];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Annuler_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Insert_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Delete_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Update_Lieu_Liste_des_lieus0").disabled=true;
return TAB_COMPO_PPTES[715].NewCle;
}

function Validate_Lieu_Liste_des_lieus0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[715];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[715].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Lieu_Liste_des_lieus0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Lieu_Liste_des_lieus0(Maitre))==-1)
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
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[715].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[717];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[718];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Annuler_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Insert_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Delete_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Update_Lieu_Liste_des_lieus0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[715].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[715].Action_en_cours = null;
 return NewCle;
}

function Annuler_Lieu_Liste_des_lieus0()
{
 TAB_COMPO_PPTES[715].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[715].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[717];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[718];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Annuler_Lieu_Liste_des_lieus0").disabled=true;
top.document.getElementById("Insert_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Delete_Lieu_Liste_des_lieus0").disabled=false;
top.document.getElementById("Update_Lieu_Liste_des_lieus0").disabled=false;
}





function moto_Chargement()
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
var Col_N0_Employ�_De_Activit�s_Liste_des_activit�s0=new clAttribut("em_libelle","employe",null);

var Joint_Col_N0_Employ�_De_Activit�s_Liste_des_activit�s0=new clJointureMulti("activite",
	new Array(
	new stJointure("employe","em_numero","em_numero",null,true)
	));
var Col_N1_T�che_De_Activit�s_Liste_des_activit�s0=new clAttribut("zt_libelle","tache",null);

var Joint_Col_N1_T�che_De_Activit�s_Liste_des_activit�s0=new clJointureMulti("activite",
	new Array(
	new stJointure("tache","zt_numero","zt_numero",null,true)
	));
var Col_N2_Sujet_De_Activit�s_Liste_des_activit�s0=new clAttribut("zs_libelle","sujet",null);

var Joint_Col_N2_Sujet_De_Activit�s_Liste_des_activit�s0=new clJointureMulti("activite",
	new Array(
	new stJointure("sujet","zs_numero","zs_numero",null,true)
	));
var Col_N3_Pour_De_Activit�s_Liste_des_activit�s0=new clAttribut("za_pour","activite",null);

var Col_N4_Date_De_Activit�s_Liste_des_activit�s0=new clAttribut("za_date","activite",null);

var Col_N5_Dur�e_De_Activit�s_Liste_des_activit�s0=new clAttribut("za_duree","activite",null);

var Activit�s_J_ai_1=new clAttribut("zt_phrase","tache",null);


	/* Ce composant repr�sente: tache.zt_phrase sous le nom "J'ai" */
var Compo_Activit�s_J_ai_1=new clCompoListeDeroulanteSimple(Activit�s_J_ai_1,null,"J'ai");
var Joint_Esclave_Activit�s_J_ai_1=new clJointureMulti("activite",
	new Array(
	new stJointure("tache","zt_numero","zt_numero",null,false)
	));
var Activit�s_au_sujet_de_2=new clAttribut("zs_libelle","sujet",null);


	/* Ce composant repr�sente: sujet.zs_libelle sous le nom "au sujet de" */
var Compo_Activit�s_au_sujet_de_2=new clCompoListeDeroulanteSimple(Activit�s_au_sujet_de_2,null,"au sujet de");
var Joint_Esclave_Activit�s_au_sujet_de_2=new clJointureMulti("activite",
	new Array(
	new stJointure("sujet","zs_numero","zs_numero",null,false)
	));
var Activit�s_�_3=new clAttribut("zl_libelle","lieu",null);


	/* Ce composant repr�sente: lieu.zl_libelle sous le nom "�" */
var Compo_Activit�s_�_3=new clCompoListeDeroulanteSimple(Activit�s_�_3,null,"�");
var Joint_Esclave_Activit�s_�_3=new clJointureMulti("activite",
	new Array(
	new stJointure("lieu","zl_numero","zl_numero",null,false)
	));
var Activit�s_Pendant__en_minutes__4=new clAttribut("za_duree","activite",null);


	/* Ce composant repr�sente: activite.za_duree sous le nom "Pendant (en minutes)" */
var Compo_Activit�s_Pendant__en_minutes__4=new clCompoTextBox(Activit�s_Pendant__en_minutes__4,null,"Pendant (en minutes)",false,false);
var Activit�s_Le_5=new clAttribut("za_date","activite",null);


	/* Ce composant repr�sente: activite.za_date sous le nom "Le" */
var Compo_Activit�s_Le_5=new clCompoTextBox(Activit�s_Le_5,null,"Le",false,false);
var Activit�s_de___HH_MM___6=new clAttribut("za_heuredebut","activite",null);


	/* Ce composant repr�sente: activite.za_heuredebut sous le nom "de ('HH:MM')" */
var Compo_Activit�s_de___HH_MM___6=new clCompoTextBox(Activit�s_de___HH_MM___6,null,"de ('HH:MM')",false,false);
var Activit�s_�___HH_MM___7=new clAttribut("za_heurefin","activite",null);


	/* Ce composant repr�sente: activite.za_heurefin sous le nom "� ('HH:MM')" */
var Compo_Activit�s_�___HH_MM___7=new clCompoTextBox(Activit�s_�___HH_MM___7,null,"� ('HH:MM')",false,false);
var Activit�s_Pour_quelle_nature_de_personne___8=new clAttribut("za_qui","activite",null);


	/* Ce composant repr�sente: activite.za_qui sous le nom "Pour quelle nature de personne ?" */
var Compo_Activit�s_Pour_quelle_nature_de_personne___8=new clCompoListeDeroulanteStatic(Activit�s_Pour_quelle_nature_de_personne___8,null,"Pour quelle nature de personne ?",new Array('0','1','2','3'));
var Activit�s_0__1__2__Valeur__N_facture__devis_____9=new clAttribut("za_champ","activite",null);


	/* Ce composant repr�sente: activite.za_champ sous le nom "0, 1, 2. Valeur (N�facture, devis...)" */
var Compo_Activit�s_0__1__2__Valeur__N_facture__devis_____9=new clCompoTextBox(Activit�s_0__1__2__Valeur__N_facture__devis_____9,null,"0, 1, 2. Valeur (N�facture, devis...)",false,false);
var Activit�s_3__Groupe_10=new clAttribut("zg_libelle","groupe",null);


	/* Ce composant repr�sente: groupe.zg_libelle sous le nom "3. Groupe" */
var Compo_Activit�s_3__Groupe_10=new clCompoListeDeroulanteSimple(Activit�s_3__Groupe_10,null,"3. Groupe");
var Joint_Esclave_Activit�s_3__Groupe_10=new clJointureMulti("activite",
	new Array(
	new stJointure("groupe","zg_numero","zg_numero",null,false)
	));
var Activit�s_Liste_des_activit�s0=new clEnsembleAttributs("activite",
	new Array(
	new clLiaison(Joint_Col_N0_Employ�_De_Activit�s_Liste_des_activit�s0,Col_N0_Employ�_De_Activit�s_Liste_des_activit�s0)
	,new clLiaison(Joint_Col_N1_T�che_De_Activit�s_Liste_des_activit�s0,Col_N1_T�che_De_Activit�s_Liste_des_activit�s0)
	,new clLiaison(Joint_Col_N2_Sujet_De_Activit�s_Liste_des_activit�s0,Col_N2_Sujet_De_Activit�s_Liste_des_activit�s0)
	,new clLiaison(null,Col_N3_Pour_De_Activit�s_Liste_des_activit�s0)
	,new clLiaison(null,Col_N4_Date_De_Activit�s_Liste_des_activit�s0)
	,new clLiaison(null,Col_N5_Dur�e_De_Activit�s_Liste_des_activit�s0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Activit�s_J_ai_1,Activit�s_J_ai_1)
	,new clLiaison(Joint_Esclave_Activit�s_au_sujet_de_2,Activit�s_au_sujet_de_2)
	,new clLiaison(Joint_Esclave_Activit�s_�_3,Activit�s_�_3)
	,new clLiaison(null,Activit�s_Pendant__en_minutes__4)
	,new clLiaison(null,Activit�s_Le_5)
	,new clLiaison(null,Activit�s_de___HH_MM___6)
	,new clLiaison(null,Activit�s_�___HH_MM___7)
	,new clLiaison(null,Activit�s_Pour_quelle_nature_de_personne___8)
	,new clLiaison(null,Activit�s_0__1__2__Valeur__N_facture__devis_____9)
	,new clLiaison(Joint_Esclave_Activit�s_3__Groupe_10,Activit�s_3__Groupe_10)
	));

var Titre_Activit�s_Liste_des_activit�s0=new Array("Employ�","T�che","Sujet","Pour","Date","Dur�e");

	/* Ce composant repr�sente: des �l�ments de la table activite sous le nom "Liste des activit�s" */
var Compo_Activit�s_Liste_des_activit�s0=new clCompoListe(Activit�s_Liste_des_activit�s0,new Array(new clInterfaceFiltrageVide()),Titre_Activit�s_Liste_des_activit�s0,"Liste des activit�s",true,false);

	/* Ce composant repr�sente: activite.undefined sous le nom "Liste des activit�s" */
 if(ALeDroit(0,"activite"))
 {
Compo_Activit�s_Liste_des_activit�s0.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0"));

 }

	/* On l'ajoute au tableau global � l'indice 693*/
top.TAB_GLOBAL_COMPO[693]=Compo_Activit�s_Liste_des_activit�s0;

	/* Ce composant repr�sente: des �l�ments de la table tache sous le nom "J'ai" */
 if(ALeDroit(0,"tache"))
 {
Compo_Activit�s_J_ai_1.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 700*/
top.TAB_GLOBAL_COMPO[700]=Compo_Activit�s_J_ai_1;

	/* Ce composant repr�sente: des �l�ments de la table sujet sous le nom "au sujet de" */
 if(ALeDroit(0,"sujet"))
 {
Compo_Activit�s_au_sujet_de_2.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 701*/
top.TAB_GLOBAL_COMPO[701]=Compo_Activit�s_au_sujet_de_2;

	/* Ce composant repr�sente: des �l�ments de la table lieu sous le nom "�" */
 if(ALeDroit(0,"lieu"))
 {
Compo_Activit�s_�_3.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 702*/
top.TAB_GLOBAL_COMPO[702]=Compo_Activit�s_�_3;

	/* Ce composant repr�sente: des �l�ments de la table activite sous le nom "Pendant (en minutes)" */
 if(ALeDroit(0,"activite"))
 {
Compo_Activit�s_Pendant__en_minutes__4.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 703*/
top.TAB_GLOBAL_COMPO[703]=Compo_Activit�s_Pendant__en_minutes__4;

	/* Ce composant repr�sente: des �l�ments de la table activite sous le nom "Le" */
 if(ALeDroit(0,"activite"))
 {
Compo_Activit�s_Le_5.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 704*/
top.TAB_GLOBAL_COMPO[704]=Compo_Activit�s_Le_5;

	/* Ce composant repr�sente: des �l�ments de la table activite sous le nom "de ('HH:MM')" */
 if(ALeDroit(0,"activite"))
 {
Compo_Activit�s_de___HH_MM___6.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 705*/
top.TAB_GLOBAL_COMPO[705]=Compo_Activit�s_de___HH_MM___6;

	/* Ce composant repr�sente: des �l�ments de la table activite sous le nom "� ('HH:MM')" */
 if(ALeDroit(0,"activite"))
 {
Compo_Activit�s_�___HH_MM___7.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 706*/
top.TAB_GLOBAL_COMPO[706]=Compo_Activit�s_�___HH_MM___7;

	/* Ce composant repr�sente: des �l�ments de la table activite sous le nom "Pour quelle nature de personne ?" */
 if(ALeDroit(0,"activite"))
 {
Compo_Activit�s_Pour_quelle_nature_de_personne___8.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 707*/
top.TAB_GLOBAL_COMPO[707]=Compo_Activit�s_Pour_quelle_nature_de_personne___8;

	/* Ce composant repr�sente: des �l�ments de la table activite sous le nom "0, 1, 2. Valeur (N�facture, devis...)" */
 if(ALeDroit(0,"activite"))
 {
Compo_Activit�s_0__1__2__Valeur__N_facture__devis_____9.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 708*/
top.TAB_GLOBAL_COMPO[708]=Compo_Activit�s_0__1__2__Valeur__N_facture__devis_____9;

	/* Ce composant repr�sente: des �l�ments de la table groupe sous le nom "3. Groupe" */
 if(ALeDroit(0,"groupe"))
 {
Compo_Activit�s_3__Groupe_10.GenererXUL(top.document.getElementById("Activit�s_Liste_des_activit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 709*/
top.TAB_GLOBAL_COMPO[709]=Compo_Activit�s_3__Groupe_10;
var Col_N0_Libell�_De_T�ches_Liste_des_t�ches0=new clAttribut("zt_libelle","tache",null);

var T�ches_Libell�_1=new clAttribut("zt_libelle","tache",null);


	/* Ce composant repr�sente: tache.zt_libelle sous le nom "Libell�" */
var Compo_T�ches_Libell�_1=new clCompoTextBox(T�ches_Libell�_1,null,"Libell�",false,false);
var T�ches_J_ai_2=new clAttribut("zt_phrase","tache",null);


	/* Ce composant repr�sente: tache.zt_phrase sous le nom "J'ai" */
var Compo_T�ches_J_ai_2=new clCompoTextBox(T�ches_J_ai_2,null,"J'ai",false,false);
var T�ches_Notes_3=new clAttribut("zt_notes","tache",null);


	/* Ce composant repr�sente: tache.zt_notes sous le nom "Notes" */
var Compo_T�ches_Notes_3=new clCompoTextBox(T�ches_Notes_3,null,"Notes",false,true);
var T�ches_Liste_des_t�ches0=new clEnsembleAttributs("tache",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_T�ches_Liste_des_t�ches0)
	),
	new Array(
	new clLiaison(null,T�ches_Libell�_1)
	,new clLiaison(null,T�ches_J_ai_2)
	,new clLiaison(null,T�ches_Notes_3)
	));

var Titre_T�ches_Liste_des_t�ches0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table tache sous le nom "Liste des t�ches" */
var Compo_T�ches_Liste_des_t�ches0=new clCompoListe(T�ches_Liste_des_t�ches0,new Array(new clInterfaceFiltrageVide()),Titre_T�ches_Liste_des_t�ches0,"Liste des t�ches",true,false);

	/* Ce composant repr�sente: tache.undefined sous le nom "Liste des t�ches" */
 if(ALeDroit(0,"tache"))
 {
Compo_T�ches_Liste_des_t�ches0.GenererXUL(top.document.getElementById("T�ches_Liste_des_t�ches0"));

 }

	/* On l'ajoute au tableau global � l'indice 710*/
top.TAB_GLOBAL_COMPO[710]=Compo_T�ches_Liste_des_t�ches0;

	/* Ce composant repr�sente: des �l�ments de la table tache sous le nom "Libell�" */
 if(ALeDroit(0,"tache"))
 {
Compo_T�ches_Libell�_1.GenererXUL(top.document.getElementById("T�ches_Liste_des_t�ches0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 712*/
top.TAB_GLOBAL_COMPO[712]=Compo_T�ches_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table tache sous le nom "J'ai" */
 if(ALeDroit(0,"tache"))
 {
Compo_T�ches_J_ai_2.GenererXUL(top.document.getElementById("T�ches_Liste_des_t�ches0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 713*/
top.TAB_GLOBAL_COMPO[713]=Compo_T�ches_J_ai_2;

	/* Ce composant repr�sente: des �l�ments de la table tache sous le nom "Notes" */
 if(ALeDroit(0,"tache"))
 {
Compo_T�ches_Notes_3.GenererXUL(top.document.getElementById("T�ches_Liste_des_t�ches0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 714*/
top.TAB_GLOBAL_COMPO[714]=Compo_T�ches_Notes_3;
var Col_N0_Libell�_De_Sujets_Liste_des_types_de_sujets0=new clAttribut("zu_libelle","typesujet",null);

var Sujets_Libell�_1=new clAttribut("zu_libelle","typesujet",null);


	/* Ce composant repr�sente: typesujet.zu_libelle sous le nom "Libell�" */
var Compo_Sujets_Libell�_1=new clCompoTextBox(Sujets_Libell�_1,null,"Libell�",false,false);
var Sujets_Notes_2=new clAttribut("zu_notes","typesujet",null);


	/* Ce composant repr�sente: typesujet.zu_notes sous le nom "Notes" */
var Compo_Sujets_Notes_2=new clCompoTextBox(Sujets_Notes_2,null,"Notes",false,true);
var Col_N0_Libell�_De_Sujets_Sujets_3=new clAttribut("zs_libelle","sujet",null);

var Sujets_Libell�_4=new clAttribut("zs_libelle","sujet",null);


	/* Ce composant repr�sente: sujet.zs_libelle sous le nom "Libell�" */
var Compo_Sujets_Libell�_4=new clCompoTextBox(Sujets_Libell�_4,null,"Libell�",false,false);
var Sujets_Notes_5=new clAttribut("zs_notes","sujet",null);


	/* Ce composant repr�sente: sujet.zs_notes sous le nom "Notes" */
var Compo_Sujets_Notes_5=new clCompoTextBox(Sujets_Notes_5,null,"Notes",false,true);
var Sujets_Sujets_3=new clEnsembleAttributs("sujet",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Sujets_Sujets_3)
	),
	new Array(
	new clLiaison(null,Sujets_Libell�_4)
	,new clLiaison(null,Sujets_Notes_5)
	));

var Titre_Sujets_Sujets_3=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table sujet sous le nom "Sujets" */
var Compo_Sujets_Sujets_3=new clCompoListe(Sujets_Sujets_3,null,Titre_Sujets_Sujets_3,"Sujets",true,false);
var Joint_Esclave_Sujets_Sujets_3=new clJointureMulti("typesujet",
	new Array(
	new stJointure("sujet","zu_numero","zu_numero",null,false)
	));
var Sujets_Liste_des_types_de_sujets0=new clEnsembleAttributs("typesujet",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Sujets_Liste_des_types_de_sujets0)
	),
	new Array(
	new clLiaison(null,Sujets_Libell�_1)
	,new clLiaison(null,Sujets_Notes_2)
	,new clLiaison(Joint_Esclave_Sujets_Sujets_3,Sujets_Sujets_3)
	));

var Titre_Sujets_Liste_des_types_de_sujets0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table typesujet sous le nom "Liste des types de sujets" */
var Compo_Sujets_Liste_des_types_de_sujets0=new clCompoListe(Sujets_Liste_des_types_de_sujets0,new Array(new clInterfaceFiltrageVide()),Titre_Sujets_Liste_des_types_de_sujets0,"Liste des types de sujets",true,false);

	/* Ce composant repr�sente: typesujet.undefined sous le nom "Liste des types de sujets" */
 if(ALeDroit(0,"typesujet"))
 {
Compo_Sujets_Liste_des_types_de_sujets0.GenererXUL(top.document.getElementById("Sujets_Liste_des_types_de_sujets0"));

 }

	/* On l'ajoute au tableau global � l'indice 719*/
top.TAB_GLOBAL_COMPO[719]=Compo_Sujets_Liste_des_types_de_sujets0;

	/* Ce composant repr�sente: des �l�ments de la table typesujet sous le nom "Libell�" */
 if(ALeDroit(0,"typesujet"))
 {
Compo_Sujets_Libell�_1.GenererXUL(top.document.getElementById("Sujets_Liste_des_types_de_sujets0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 721*/
top.TAB_GLOBAL_COMPO[721]=Compo_Sujets_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table typesujet sous le nom "Notes" */
 if(ALeDroit(0,"typesujet"))
 {
Compo_Sujets_Notes_2.GenererXUL(top.document.getElementById("Sujets_Liste_des_types_de_sujets0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 722*/
top.TAB_GLOBAL_COMPO[722]=Compo_Sujets_Notes_2;

	/* Ce composant repr�sente: sujet.undefined sous le nom "Sujets" */
 if(ALeDroit(0,"sujet"))
 {
Compo_Sujets_Sujets_3.GenererXUL(top.document.getElementById("Sujets_Sujets_3"));

 }

	/* On l'ajoute au tableau global � l'indice 723*/
top.TAB_GLOBAL_COMPO[723]=Compo_Sujets_Sujets_3;

	/* Ce composant repr�sente: des �l�ments de la table sujet sous le nom "Libell�" */
 if(ALeDroit(0,"sujet"))
 {
Compo_Sujets_Libell�_4.GenererXUL(top.document.getElementById("Sujets_Sujets_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 725*/
top.TAB_GLOBAL_COMPO[725]=Compo_Sujets_Libell�_4;

	/* Ce composant repr�sente: des �l�ments de la table sujet sous le nom "Notes" */
 if(ALeDroit(0,"sujet"))
 {
Compo_Sujets_Notes_5.GenererXUL(top.document.getElementById("Sujets_Sujets_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 726*/
top.TAB_GLOBAL_COMPO[726]=Compo_Sujets_Notes_5;
var Col_N0_Libell�_De_Groupe_Liste_des_groupes0=new clAttribut("zg_libelle","groupe",null);

var Groupe_Libell�_1=new clAttribut("zg_libelle","groupe",null);


	/* Ce composant repr�sente: groupe.zg_libelle sous le nom "Libell�" */
var Compo_Groupe_Libell�_1=new clCompoTextBox(Groupe_Libell�_1,null,"Libell�",false,false);
var Groupe_Notes_2=new clAttribut("zg_notes","groupe",null);


	/* Ce composant repr�sente: groupe.zg_notes sous le nom "Notes" */
var Compo_Groupe_Notes_2=new clCompoTextBox(Groupe_Notes_2,null,"Notes",false,true);
var Groupe_Liste_des_groupes0=new clEnsembleAttributs("groupe",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Groupe_Liste_des_groupes0)
	),
	new Array(
	new clLiaison(null,Groupe_Libell�_1)
	,new clLiaison(null,Groupe_Notes_2)
	));

var Titre_Groupe_Liste_des_groupes0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table groupe sous le nom "Liste des groupes" */
var Compo_Groupe_Liste_des_groupes0=new clCompoListe(Groupe_Liste_des_groupes0,new Array(new clInterfaceFiltrageVide()),Titre_Groupe_Liste_des_groupes0,"Liste des groupes",true,false);

	/* Ce composant repr�sente: groupe.undefined sous le nom "Liste des groupes" */
 if(ALeDroit(0,"groupe"))
 {
Compo_Groupe_Liste_des_groupes0.GenererXUL(top.document.getElementById("Groupe_Liste_des_groupes0"));

 }

	/* On l'ajoute au tableau global � l'indice 727*/
top.TAB_GLOBAL_COMPO[727]=Compo_Groupe_Liste_des_groupes0;

	/* Ce composant repr�sente: des �l�ments de la table groupe sous le nom "Libell�" */
 if(ALeDroit(0,"groupe"))
 {
Compo_Groupe_Libell�_1.GenererXUL(top.document.getElementById("Groupe_Liste_des_groupes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 729*/
top.TAB_GLOBAL_COMPO[729]=Compo_Groupe_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table groupe sous le nom "Notes" */
 if(ALeDroit(0,"groupe"))
 {
Compo_Groupe_Notes_2.GenererXUL(top.document.getElementById("Groupe_Liste_des_groupes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 730*/
top.TAB_GLOBAL_COMPO[730]=Compo_Groupe_Notes_2;
var Col_N0_Libell�_De_Lieu_Liste_des_lieus0=new clAttribut("zl_libelle","lieu",null);

var Lieu_Libell�_1=new clAttribut("zl_libelle","lieu",null);


	/* Ce composant repr�sente: lieu.zl_libelle sous le nom "Libell�" */
var Compo_Lieu_Libell�_1=new clCompoTextBox(Lieu_Libell�_1,null,"Libell�",false,false);
var Lieu_Notes_2=new clAttribut("zl_notes","lieu",null);


	/* Ce composant repr�sente: lieu.zl_notes sous le nom "Notes" */
var Compo_Lieu_Notes_2=new clCompoTextBox(Lieu_Notes_2,null,"Notes",false,true);
var Lieu_Liste_des_lieus0=new clEnsembleAttributs("lieu",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Lieu_Liste_des_lieus0)
	),
	new Array(
	new clLiaison(null,Lieu_Libell�_1)
	,new clLiaison(null,Lieu_Notes_2)
	));

var Titre_Lieu_Liste_des_lieus0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table lieu sous le nom "Liste des lieus" */
var Compo_Lieu_Liste_des_lieus0=new clCompoListe(Lieu_Liste_des_lieus0,new Array(new clInterfaceFiltrageVide()),Titre_Lieu_Liste_des_lieus0,"Liste des lieus",true,false);

	/* Ce composant repr�sente: lieu.undefined sous le nom "Liste des lieus" */
 if(ALeDroit(0,"lieu"))
 {
Compo_Lieu_Liste_des_lieus0.GenererXUL(top.document.getElementById("Lieu_Liste_des_lieus0"));

 }

	/* On l'ajoute au tableau global � l'indice 715*/
top.TAB_GLOBAL_COMPO[715]=Compo_Lieu_Liste_des_lieus0;

	/* Ce composant repr�sente: des �l�ments de la table lieu sous le nom "Libell�" */
 if(ALeDroit(0,"lieu"))
 {
Compo_Lieu_Libell�_1.GenererXUL(top.document.getElementById("Lieu_Liste_des_lieus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 717*/
top.TAB_GLOBAL_COMPO[717]=Compo_Lieu_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table lieu sous le nom "Notes" */
 if(ALeDroit(0,"lieu"))
 {
Compo_Lieu_Notes_2.GenererXUL(top.document.getElementById("Lieu_Liste_des_lieus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 718*/
top.TAB_GLOBAL_COMPO[718]=Compo_Lieu_Notes_2;
 if(ALeDroit(5,"activite"))
 {
/* On refresh les composants non d�pendents de l'onget Activit�s*/
var Composant_0 = TAB_GLOBAL_COMPO[693];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Activit�s").hidden=true;
if (top.document.getElementById("Onglet_Activit�s").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"activite"))
 {
nb_button++;
top.document.getElementById("Insert_Activit�s_Liste_des_activit�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Activit�s_Liste_des_activit�s0").hidden=true;

 }
 if(ALeDroit(4,"activite"))
 {
nb_button++;
top.document.getElementById("Delete_Activit�s_Liste_des_activit�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Activit�s_Liste_des_activit�s0").hidden=true;

 }
 if(ALeDroit(1,"activite"))
 {
nb_button++;
top.document.getElementById("Update_Activit�s_Liste_des_activit�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Activit�s_Liste_des_activit�s0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Activit�s_Liste_des_activit�s0").hidden=true;
        top.document.getElementById("Annuler_Activit�s_Liste_des_activit�s0").hidden=true;
}
 if(ALeDroit(5,"tache"))
 {
/* On refresh les composants non d�pendents de l'onget T�ches*/
var Composant_0 = TAB_GLOBAL_COMPO[710];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_T�ches").hidden=true;
if (top.document.getElementById("Onglet_T�ches").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"tache"))
 {
nb_button++;
top.document.getElementById("Insert_T�ches_Liste_des_t�ches0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_T�ches_Liste_des_t�ches0").hidden=true;

 }
 if(ALeDroit(4,"tache"))
 {
nb_button++;
top.document.getElementById("Delete_T�ches_Liste_des_t�ches0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_T�ches_Liste_des_t�ches0").hidden=true;

 }
 if(ALeDroit(1,"tache"))
 {
nb_button++;
top.document.getElementById("Update_T�ches_Liste_des_t�ches0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_T�ches_Liste_des_t�ches0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_T�ches_Liste_des_t�ches0").hidden=true;
        top.document.getElementById("Annuler_T�ches_Liste_des_t�ches0").hidden=true;
}
 if(ALeDroit(5,"typesujet"))
 {
/* On refresh les composants non d�pendents de l'onget Sujets*/
var Composant_0 = TAB_GLOBAL_COMPO[719];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Sujets").hidden=true;
if (top.document.getElementById("Onglet_Sujets").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typesujet"))
 {
nb_button++;
top.document.getElementById("Insert_Sujets_Liste_des_types_de_sujets0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Sujets_Liste_des_types_de_sujets0").hidden=true;

 }
 if(ALeDroit(4,"typesujet"))
 {
nb_button++;
top.document.getElementById("Delete_Sujets_Liste_des_types_de_sujets0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Sujets_Liste_des_types_de_sujets0").hidden=true;

 }
 if(ALeDroit(1,"typesujet"))
 {
nb_button++;
top.document.getElementById("Update_Sujets_Liste_des_types_de_sujets0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Sujets_Liste_des_types_de_sujets0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Sujets_Liste_des_types_de_sujets0").hidden=true;
        top.document.getElementById("Annuler_Sujets_Liste_des_types_de_sujets0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"sujet"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Sujets_Sujets_3").hidden=true;

 }
 if(ALeDroit(4,"sujet"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Sujets_Sujets_3").hidden=true;

 }
 if(ALeDroit(1,"sujet"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Sujets_Sujets_3").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Sujets_Sujets_3").hidden=true;
        top.document.getElementById("Annuler_Sujets_Sujets_3").hidden=true;
}
 if(ALeDroit(5,"groupe"))
 {
/* On refresh les composants non d�pendents de l'onget Groupe*/
var Composant_0 = TAB_GLOBAL_COMPO[727];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Groupe").hidden=true;
if (top.document.getElementById("Onglet_Groupe").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"groupe"))
 {
nb_button++;
top.document.getElementById("Insert_Groupe_Liste_des_groupes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Groupe_Liste_des_groupes0").hidden=true;

 }
 if(ALeDroit(4,"groupe"))
 {
nb_button++;
top.document.getElementById("Delete_Groupe_Liste_des_groupes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Groupe_Liste_des_groupes0").hidden=true;

 }
 if(ALeDroit(1,"groupe"))
 {
nb_button++;
top.document.getElementById("Update_Groupe_Liste_des_groupes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Groupe_Liste_des_groupes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Groupe_Liste_des_groupes0").hidden=true;
        top.document.getElementById("Annuler_Groupe_Liste_des_groupes0").hidden=true;
}
 if(ALeDroit(5,"lieu"))
 {
/* On refresh les composants non d�pendents de l'onget Lieu*/
var Composant_0 = TAB_GLOBAL_COMPO[715];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Lieu").hidden=true;
if (top.document.getElementById("Onglet_Lieu").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"lieu"))
 {
nb_button++;
top.document.getElementById("Insert_Lieu_Liste_des_lieus0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Lieu_Liste_des_lieus0").hidden=true;

 }
 if(ALeDroit(4,"lieu"))
 {
nb_button++;
top.document.getElementById("Delete_Lieu_Liste_des_lieus0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Lieu_Liste_des_lieus0").hidden=true;

 }
 if(ALeDroit(1,"lieu"))
 {
nb_button++;
top.document.getElementById("Update_Lieu_Liste_des_lieus0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Lieu_Liste_des_lieus0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Lieu_Liste_des_lieus0").hidden=true;
        top.document.getElementById("Annuler_Lieu_Liste_des_lieus0").hidden=true;
}
}
