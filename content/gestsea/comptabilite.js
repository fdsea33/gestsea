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
var TAB_COMPO_PPTES = new Array(109);
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
         FONCTIONS POUR L'ONGLET Exercice
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Exercice()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Exercice");
}

function Insert_Exercice_Liste_des_exercices_comptables0()
{
 TAB_COMPO_PPTES[3].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[3].NewCle = getNewCle("exercice");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[3].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[6];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[7];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[8];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[9];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[10];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[11];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Annuler_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Insert_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Delete_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Update_Exercice_Liste_des_exercices_comptables0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[3];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[3].NewCle;
}

function Delete_Exercice_Liste_des_exercices_comptables0()
{
 if (TAB_GLOBAL_COMPO[3].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[3];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[3].Action_en_cours = DELETE;
         User_Delete_Exercice_Liste_des_exercices_comptables0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Exercice_Liste_des_exercices_comptables0()
{
 if (TAB_GLOBAL_COMPO[3].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[3].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[3].NewCle = TAB_GLOBAL_COMPO[3].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[3].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[6];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[7];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[8];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[9];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[10];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[11];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Annuler_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Insert_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Delete_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Update_Exercice_Liste_des_exercices_comptables0").disabled=true;
return TAB_COMPO_PPTES[3].NewCle;
}

function Validate_Exercice_Liste_des_exercices_comptables0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[3];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[3].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Exercice_Liste_des_exercices_comptables0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Exercice_Liste_des_exercices_comptables0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[3].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[6];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[7];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[8];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[9];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[10];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[11];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Annuler_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Insert_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Delete_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Update_Exercice_Liste_des_exercices_comptables0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[3].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[3].Action_en_cours = null;
 return NewCle;
}

function Annuler_Exercice_Liste_des_exercices_comptables0()
{
 TAB_COMPO_PPTES[3].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[3].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[6];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[7];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[8];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[9];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[10];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[11];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Annuler_Exercice_Liste_des_exercices_comptables0").disabled=true;
top.document.getElementById("Insert_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Delete_Exercice_Liste_des_exercices_comptables0").disabled=false;
top.document.getElementById("Update_Exercice_Liste_des_exercices_comptables0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Journaux
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Journaux()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Journaux");
}

function Insert_Journaux_Liste_des_journaux0()
{
 TAB_COMPO_PPTES[18].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[18].NewCle = getNewCle("journal");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[18].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[23];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[24];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[25];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[26];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[27];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[28];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[29];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[30];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Annuler_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Insert_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Delete_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Update_Journaux_Liste_des_journaux0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[18];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[18].NewCle;
}

function Delete_Journaux_Liste_des_journaux0()
{
 if (TAB_GLOBAL_COMPO[18].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[18];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[18].Action_en_cours = DELETE;
         User_Delete_Journaux_Liste_des_journaux0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Journaux_Liste_des_journaux0()
{
 if (TAB_GLOBAL_COMPO[18].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[18].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[18].NewCle = TAB_GLOBAL_COMPO[18].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[18].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[23];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[24];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[25];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[26];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[27];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[28];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[29];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[30];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Annuler_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Insert_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Delete_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Update_Journaux_Liste_des_journaux0").disabled=true;
return TAB_COMPO_PPTES[18].NewCle;
}

function Validate_Journaux_Liste_des_journaux0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[18];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[18].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Journaux_Liste_des_journaux0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Journaux_Liste_des_journaux0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[18].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[23];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[24];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[25];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[26];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[27];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[28];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[29];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[30];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Annuler_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Insert_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Delete_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Update_Journaux_Liste_des_journaux0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[18].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[18].Action_en_cours = null;
 return NewCle;
}

function Annuler_Journaux_Liste_des_journaux0()
{
 TAB_COMPO_PPTES[18].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[18].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[23];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[24];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[25];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[26];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[27];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[28];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[29];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[30];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Annuler_Journaux_Liste_des_journaux0").disabled=true;
top.document.getElementById("Insert_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Delete_Journaux_Liste_des_journaux0").disabled=false;
top.document.getElementById("Update_Journaux_Liste_des_journaux0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Pi�ces
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Pi�ces_0;
 var Filtre_DepFor_Pi�ces_1;
function Retour_Pi�ces()
{
 if (Filtre_DepFor_Pi�ces_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Pi�ces_0.FctFermetureOnglet();
 }
 if (Filtre_DepFor_Pi�ces_1.my_Filtre.getEtat())
 {
         Filtre_DepFor_Pi�ces_1.FctFermetureOnglet();
 }
}
function Gerer_Pi�ces(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas �tre en mode insertion */
if(TAB_COMPO_PPTES[18].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Journaux_Liste_des_journaux0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Journaux_Liste_des_journaux0();
                if (CleValide==-1)
                {
                        alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                        return;
                }
        }
        else
                 return;
}
/* On d�sactive les autres filtres */
if (Filtre_DepFor_Pi�ces_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Pi�ces_0.OnClose(true,false);
}
if (Filtre_DepFor_Pi�ces_1.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Pi�ces_1.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Pi�ces");
}

function OuvrirOnglet_Pi�ces()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Pi�ces");
}

function Insert_Pi�ces_Liste_des_pi�ces_comptables0()
{
 TAB_COMPO_PPTES[37].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[37].NewCle = getNewCle("piece");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[37].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[43];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[44];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=false;
 var Esclave_2=TAB_GLOBAL_COMPO[45];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Annuler_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Insert_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Delete_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Update_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[37];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[37].NewCle;
}

function Delete_Pi�ces_Liste_des_pi�ces_comptables0()
{
 if (TAB_GLOBAL_COMPO[37].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[37];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[37].Action_en_cours = DELETE;
         User_Delete_Pi�ces_Liste_des_pi�ces_comptables0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Pi�ces_0.Refresh();
        Filtre_DepFor_Pi�ces_1.Refresh();
 }
}

function Update_Pi�ces_Liste_des_pi�ces_comptables0()
{
 if (TAB_GLOBAL_COMPO[37].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[37].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[37].NewCle = TAB_GLOBAL_COMPO[37].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[37].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[43];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[44];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=false;
 var Esclave_2=TAB_GLOBAL_COMPO[45];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Annuler_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Insert_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Delete_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Update_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
return TAB_COMPO_PPTES[37].NewCle;
}

function Validate_Pi�ces_Liste_des_pi�ces_comptables0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[37];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[37].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Pi�ces_Liste_des_pi�ces_comptables0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Pi�ces_Liste_des_pi�ces_comptables0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[37].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[43];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[44];
 Esclave_1.ActiverComposant(false);
Annuler_Pi�ces_�critures_3();
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=true;
 var Esclave_2=TAB_GLOBAL_COMPO[45];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Annuler_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Insert_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Delete_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Update_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[37].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Pi�ces_0.Refresh();
 Filtre_DepFor_Pi�ces_1.Refresh();
 }
 TAB_COMPO_PPTES[37].Action_en_cours = null;
 return NewCle;
}

function Annuler_Pi�ces_Liste_des_pi�ces_comptables0()
{
 TAB_COMPO_PPTES[37].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[37].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[43];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[44];
 Esclave_1.ActiverComposant(false);
Annuler_Pi�ces_�critures_3();
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=true;
 var Esclave_2=TAB_GLOBAL_COMPO[45];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Annuler_Pi�ces_Liste_des_pi�ces_comptables0").disabled=true;
top.document.getElementById("Insert_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Delete_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
top.document.getElementById("Update_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;
}

function Insert_Pi�ces_�critures_3()
{
 if (TAB_COMPO_PPTES[37].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Pi�ces_Liste_des_pi�ces_comptables0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Pi�ces_Liste_des_pi�ces_comptables0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                                return -1;
                        }
                        Insert_Pi�ces_�critures_3();
                }
                 return;
         }
 TAB_COMPO_PPTES[45].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[45].NewCle = getNewCle("ecriture");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[45].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[52];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[53];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[54];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[55];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[56];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[57];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[58];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[45];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[57].my_CompoXUL.value="0.00";
TAB_GLOBAL_COMPO[58].my_CompoXUL.value="0.00";

return TAB_COMPO_PPTES[45].NewCle;
}

function Delete_Pi�ces_�critures_3()
{
 if (TAB_GLOBAL_COMPO[45].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[45];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[45].Action_en_cours = DELETE;
         User_Delete_Pi�ces_�critures_3(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Pi�ces_�critures_3()
{
 if (TAB_GLOBAL_COMPO[45].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[45].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[45].NewCle = TAB_GLOBAL_COMPO[45].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[45].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[52];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[53];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[54];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[55];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[56];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[57];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[58];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=true;
return TAB_COMPO_PPTES[45].NewCle;
}

function Validate_Pi�ces_�critures_3(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[45];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[45].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Pi�ces_�critures_3(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Pi�ces_�critures_3(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[45].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[52];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[53];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[54];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[55];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[56];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[57];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[58];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[45].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[45].Action_en_cours = null;
 return NewCle;
}

function Annuler_Pi�ces_�critures_3()
{
 TAB_COMPO_PPTES[45].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[45].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[52];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[53];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[54];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[55];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[56];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[57];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[58];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Annuler_Pi�ces_�critures_3").disabled=true;
top.document.getElementById("Insert_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Delete_Pi�ces_�critures_3").disabled=false;
top.document.getElementById("Update_Pi�ces_�critures_3").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Ecritures
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Ecritures_0;
 var Filtre_DepFor_Ecritures_1;
 var Filtre_DepFor_Ecritures_2;
function Retour_Ecritures()
{
 if (Filtre_DepFor_Ecritures_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Ecritures_0.FctFermetureOnglet();
 }
 if (Filtre_DepFor_Ecritures_1.my_Filtre.getEtat())
 {
         Filtre_DepFor_Ecritures_1.FctFermetureOnglet();
 }
 if (Filtre_DepFor_Ecritures_2.my_Filtre.getEtat())
 {
         Filtre_DepFor_Ecritures_2.FctFermetureOnglet();
 }
}
function Gerer_Ecritures(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas �tre en mode insertion */
if(TAB_COMPO_PPTES[94].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0();
                if (CleValide==-1)
                {
                        alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                        return;
                }
        }
        else
                 return;
}
/* On d�sactive les autres filtres */
if (Filtre_DepFor_Ecritures_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Ecritures_0.OnClose(true,false);
}
if (Filtre_DepFor_Ecritures_1.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Ecritures_1.OnClose(true,false);
}
if (Filtre_DepFor_Ecritures_2.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Ecritures_2.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Ecritures");
}

function OuvrirOnglet_Ecritures()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Ecritures");
}

function Insert_Ecritures_Liste_des_�critures_comptables0()
{
 TAB_COMPO_PPTES[59].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[59].NewCle = getNewCle("ecriture");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[59].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[64];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[65];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[66];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[67];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[68];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[69];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Annuler_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Insert_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Delete_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Update_Ecritures_Liste_des_�critures_comptables0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[59];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[59].NewCle;
}

function Delete_Ecritures_Liste_des_�critures_comptables0()
{
 if (TAB_GLOBAL_COMPO[59].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[59];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[59].Action_en_cours = DELETE;
         User_Delete_Ecritures_Liste_des_�critures_comptables0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Ecritures_0.Refresh();
        Filtre_DepFor_Ecritures_1.Refresh();
        Filtre_DepFor_Ecritures_2.Refresh();
 }
}

function Update_Ecritures_Liste_des_�critures_comptables0()
{
 if (TAB_GLOBAL_COMPO[59].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[59].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[59].NewCle = TAB_GLOBAL_COMPO[59].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[59].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[64];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[65];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[66];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[67];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[68];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[69];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Annuler_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Insert_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Delete_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Update_Ecritures_Liste_des_�critures_comptables0").disabled=true;
return TAB_COMPO_PPTES[59].NewCle;
}

function Validate_Ecritures_Liste_des_�critures_comptables0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[59];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[59].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Ecritures_Liste_des_�critures_comptables0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Ecritures_Liste_des_�critures_comptables0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[59].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[64];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[65];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[66];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[67];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[68];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[69];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Annuler_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Insert_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Delete_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Update_Ecritures_Liste_des_�critures_comptables0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[59].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Ecritures_0.Refresh();
 Filtre_DepFor_Ecritures_1.Refresh();
 Filtre_DepFor_Ecritures_2.Refresh();
 }
 TAB_COMPO_PPTES[59].Action_en_cours = null;
 return NewCle;
}

function Annuler_Ecritures_Liste_des_�critures_comptables0()
{
 TAB_COMPO_PPTES[59].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[59].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[64];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[65];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[66];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[67];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[68];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[69];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Annuler_Ecritures_Liste_des_�critures_comptables0").disabled=true;
top.document.getElementById("Insert_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Delete_Ecritures_Liste_des_�critures_comptables0").disabled=false;
top.document.getElementById("Update_Ecritures_Liste_des_�critures_comptables0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Comptes g�n�raux
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Comptes_g�n�raux()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Comptes_g�n�raux");
}

function Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0()
{
 TAB_COMPO_PPTES[70].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[70].NewCle = getNewCle("comptegen");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[70].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[75];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[76];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[77];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[78];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[79];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[80];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[81];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[82];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[83];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[84];
 Esclave_9.ActiverComposant(true);
 var Esclave_10=TAB_GLOBAL_COMPO[88];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Annuler_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[70];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[70].NewCle;
}

function Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0()
{
 if (TAB_GLOBAL_COMPO[70].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[70];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[70].Action_en_cours = DELETE;
         User_Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0()
{
 if (TAB_GLOBAL_COMPO[70].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[70].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[70].NewCle = TAB_GLOBAL_COMPO[70].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[70].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[75];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[76];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[77];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[78];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[79];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[80];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[81];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[82];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[83];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[84];
 Esclave_9.ActiverComposant(true);
 var Esclave_10=TAB_GLOBAL_COMPO[88];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Annuler_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
return TAB_COMPO_PPTES[70].NewCle;
}

function Validate_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[70];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[70].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[70].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[75];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[76];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[77];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[78];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[79];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[80];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[81];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[82];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[83];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[84];
 Esclave_9.ActiverComposant(false);
 var Esclave_10=TAB_GLOBAL_COMPO[88];
 Esclave_10.ActiverComposant(false);
top.document.getElementById("Validate_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Annuler_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[70].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[70].Action_en_cours = null;
 return NewCle;
}

function Annuler_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0()
{
 TAB_COMPO_PPTES[70].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[70].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[75];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[76];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[77];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[78];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[79];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[80];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[81];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[82];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[83];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[84];
 Esclave_9.ActiverComposant(false);
 var Esclave_10=TAB_GLOBAL_COMPO[88];
 Esclave_10.ActiverComposant(false);
top.document.getElementById("Validate_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Annuler_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=true;
top.document.getElementById("Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
top.document.getElementById("Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Comptes auxiliaires
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Comptes_auxiliaires_0;
function Retour_Comptes_auxiliaires()
{
 if (Filtre_DepFor_Comptes_auxiliaires_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Comptes_auxiliaires_0.FctFermetureOnglet();
 }
}
function Gerer_Comptes_auxiliaires(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas �tre en mode insertion */
if(TAB_COMPO_PPTES[70].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0();
                if (CleValide==-1)
                {
                        alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                        return;
                }
        }
        else
                 return;
}
/* On d�sactive les autres filtres */
if (Filtre_DepFor_Comptes_auxiliaires_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Comptes_auxiliaires_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Comptes_auxiliaires");
}

function OuvrirOnglet_Comptes_auxiliaires()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Comptes_auxiliaires");
}

function Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0()
{
 TAB_COMPO_PPTES[94].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[94].NewCle = getNewCle("compteaux");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[94].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[99];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[100];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[101];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[102];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[103];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Annuler_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[94];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[94].NewCle;
}

function Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0()
{
 if (TAB_GLOBAL_COMPO[94].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[94];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[94].Action_en_cours = DELETE;
         User_Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Comptes_auxiliaires_0.Refresh();
 }
}

function Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0()
{
 if (TAB_GLOBAL_COMPO[94].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[94].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[94].NewCle = TAB_GLOBAL_COMPO[94].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[94].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[99];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[100];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[101];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[102];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[103];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Annuler_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
return TAB_COMPO_PPTES[94].NewCle;
}

function Validate_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[94];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[94].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[94].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[99];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[100];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[101];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[102];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[103];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Annuler_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[94].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Comptes_auxiliaires_0.Refresh();
 }
 TAB_COMPO_PPTES[94].Action_en_cours = null;
 return NewCle;
}

function Annuler_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0()
{
 TAB_COMPO_PPTES[94].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[94].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[99];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[100];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[101];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[102];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[103];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Annuler_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=true;
top.document.getElementById("Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
top.document.getElementById("Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;
}





function comptabilite_Chargement()
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
var Col_N0_Du_De_Exercice_Liste_des_exercices_comptables0=new clAttribut("ex_datedebut","exercice",null);

var Col_N1_Au_De_Exercice_Liste_des_exercices_comptables0=new clAttribut("ex_datefin","exercice",null);

var Exercice_Du_1=new clAttribut("ex_datedebut","exercice",null);


	/* Ce composant repr�sente: exercice.ex_datedebut sous le nom "Du" */
var Compo_Exercice_Du_1=new clCompoTextBox(Exercice_Du_1,null,"Du",false,false);
var Exercice_Au_2=new clAttribut("ex_datefin","exercice",null);


	/* Ce composant repr�sente: exercice.ex_datefin sous le nom "Au" */
var Compo_Exercice_Au_2=new clCompoTextBox(Exercice_Au_2,null,"Au",false,false);
var Exercice_Cl�tur�_3=new clAttribut("ex_cloture","exercice",null);


	/* Ce composant repr�sente: exercice.ex_cloture sous le nom "Cl�tur�" */
var Compo_Exercice_Cl�tur�_3=new clCompoCheckBox(Exercice_Cl�tur�_3,null,"Cl�tur�");
var Exercice_Compte_d_attente_4=new clAttribut("ex_compteattente","exercice",null);


	/* Ce composant repr�sente: exercice.ex_compteattente sous le nom "Compte d'attente" */
var Compo_Exercice_Compte_d_attente_4=new clCompoTextBox(Exercice_Compte_d_attente_4,null,"Compte d'attente",false,false);
var Exercice_Exercice_en_cours_5=new clAttribut("ex_actif","exercice",null);


	/* Ce composant repr�sente: exercice.ex_actif sous le nom "Exercice en cours" */
var Compo_Exercice_Exercice_en_cours_5=new clCompoCheckBox(Exercice_Exercice_en_cours_5,null,"Exercice en cours");
var Col_N0_N__De_Exercice_Pi�ces_de_l_exercice_6=new clAttribut("pi_numpiece","piece",null);

var Col_N1_Date_De_Exercice_Pi�ces_de_l_exercice_6=new clAttribut("pi_date","piece",null);

var Col_N2_Journal_De_Exercice_Pi�ces_de_l_exercice_6=new clAttribut("jo_libelle","journal",null);

var Joint_Col_N2_Journal_De_Exercice_Pi�ces_de_l_exercice_6=new clJointureMulti("piece",
	new Array(
	new stJointure("journal","jo_numero","jo_numero",null,true)
	));
var Col_N3_Equilibr�_De_Exercice_Pi�ces_de_l_exercice_6=new clAttribut("pi_equilibre","piece",null);

var Col_N4_D�bit_De_Exercice_Pi�ces_de_l_exercice_6=new clAttribut("pi_debit","piece",null);

var Col_N5_Cr�dit_De_Exercice_Pi�ces_de_l_exercice_6=new clAttribut("pi_credit","piece",null);

var Exercice_Pi�ces_de_l_exercice_6=new clEnsembleAttributs("piece",
	new Array(
	new clLiaison(null,Col_N0_N__De_Exercice_Pi�ces_de_l_exercice_6)
	,new clLiaison(null,Col_N1_Date_De_Exercice_Pi�ces_de_l_exercice_6)
	,new clLiaison(Joint_Col_N2_Journal_De_Exercice_Pi�ces_de_l_exercice_6,Col_N2_Journal_De_Exercice_Pi�ces_de_l_exercice_6)
	,new clLiaison(null,Col_N3_Equilibr�_De_Exercice_Pi�ces_de_l_exercice_6)
	,new clLiaison(null,Col_N4_D�bit_De_Exercice_Pi�ces_de_l_exercice_6)
	,new clLiaison(null,Col_N5_Cr�dit_De_Exercice_Pi�ces_de_l_exercice_6)
	),
	null);

var Titre_Exercice_Pi�ces_de_l_exercice_6=new Array("N�","Date","Journal","Equilibr�","D�bit","Cr�dit");

	/* Ce composant repr�sente: des �l�ments de la table piece sous le nom "Pi�ces de l'exercice" */
var Compo_Exercice_Pi�ces_de_l_exercice_6=new clCompoListe(Exercice_Pi�ces_de_l_exercice_6,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Pi�ces_0=new clInterfaceFiltrageRelationOnglet("Pi�ces",Gerer_Pi�ces,OuvrirOnglet_Exercice,true)),Titre_Exercice_Pi�ces_de_l_exercice_6,"Pi�ces de l'exercice",true,false);
var Joint_Esclave_Exercice_Pi�ces_de_l_exercice_6=new clJointureMulti("exercice",
	new Array(
	new stJointure("piece","ex_numero","ex_numero",null,false)
	));
var Exercice_Liste_des_exercices_comptables0=new clEnsembleAttributs("exercice",
	new Array(
	new clLiaison(null,Col_N0_Du_De_Exercice_Liste_des_exercices_comptables0)
	,new clLiaison(null,Col_N1_Au_De_Exercice_Liste_des_exercices_comptables0)
	),
	new Array(
	new clLiaison(null,Exercice_Du_1)
	,new clLiaison(null,Exercice_Au_2)
	,new clLiaison(null,Exercice_Cl�tur�_3)
	,new clLiaison(null,Exercice_Compte_d_attente_4)
	,new clLiaison(null,Exercice_Exercice_en_cours_5)
	,new clLiaison(Joint_Esclave_Exercice_Pi�ces_de_l_exercice_6,Exercice_Pi�ces_de_l_exercice_6)
	));

var Titre_Exercice_Liste_des_exercices_comptables0=new Array("Du","Au");

	/* Ce composant repr�sente: des �l�ments de la table exercice sous le nom "Liste des exercices comptables" */
var Compo_Exercice_Liste_des_exercices_comptables0=new clCompoListe(Exercice_Liste_des_exercices_comptables0,new Array(new clInterfaceFiltrageVide()),Titre_Exercice_Liste_des_exercices_comptables0,"Liste des exercices comptables",true,false);

	/* Ce composant repr�sente: exercice.undefined sous le nom "Liste des exercices comptables" */
 if(ALeDroit(0,"exercice"))
 {
Compo_Exercice_Liste_des_exercices_comptables0.GenererXUL(top.document.getElementById("Exercice_Liste_des_exercices_comptables0"));

 }

	/* On l'ajoute au tableau global � l'indice 3*/
top.TAB_GLOBAL_COMPO[3]=Compo_Exercice_Liste_des_exercices_comptables0;

	/* Ce composant repr�sente: des �l�ments de la table exercice sous le nom "Du" */
 if(ALeDroit(0,"exercice"))
 {
Compo_Exercice_Du_1.GenererXUL(top.document.getElementById("Exercice_Liste_des_exercices_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 6*/
top.TAB_GLOBAL_COMPO[6]=Compo_Exercice_Du_1;

	/* Ce composant repr�sente: des �l�ments de la table exercice sous le nom "Au" */
 if(ALeDroit(0,"exercice"))
 {
Compo_Exercice_Au_2.GenererXUL(top.document.getElementById("Exercice_Liste_des_exercices_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 7*/
top.TAB_GLOBAL_COMPO[7]=Compo_Exercice_Au_2;

	/* Ce composant repr�sente: des �l�ments de la table exercice sous le nom "Cl�tur�" */
 if(ALeDroit(0,"exercice"))
 {
Compo_Exercice_Cl�tur�_3.GenererXUL(top.document.getElementById("Exercice_Liste_des_exercices_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 8*/
top.TAB_GLOBAL_COMPO[8]=Compo_Exercice_Cl�tur�_3;

	/* Ce composant repr�sente: des �l�ments de la table exercice sous le nom "Compte d'attente" */
 if(ALeDroit(0,"exercice"))
 {
Compo_Exercice_Compte_d_attente_4.GenererXUL(top.document.getElementById("Exercice_Liste_des_exercices_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 9*/
top.TAB_GLOBAL_COMPO[9]=Compo_Exercice_Compte_d_attente_4;

	/* Ce composant repr�sente: des �l�ments de la table exercice sous le nom "Exercice en cours" */
 if(ALeDroit(0,"exercice"))
 {
Compo_Exercice_Exercice_en_cours_5.GenererXUL(top.document.getElementById("Exercice_Liste_des_exercices_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 10*/
top.TAB_GLOBAL_COMPO[10]=Compo_Exercice_Exercice_en_cours_5;

	/* Ce composant repr�sente: piece.undefined sous le nom "Pi�ces de l'exercice" */
 if(ALeDroit(0,"piece"))
 {
Compo_Exercice_Pi�ces_de_l_exercice_6.GenererXUL(top.document.getElementById("Exercice_Pi�ces_de_l_exercice_6"));

 }

	/* On l'ajoute au tableau global � l'indice 11*/
top.TAB_GLOBAL_COMPO[11]=Compo_Exercice_Pi�ces_de_l_exercice_6;
var Col_N0_Abbr__De_Journaux_Liste_des_journaux0=new clAttribut("jo_abbrev","journal",null);

var Col_N1_Libell�_De_Journaux_Liste_des_journaux0=new clAttribut("jo_libelle","journal",null);

var Col_N2_D�but_De_Journaux_Liste_des_journaux0=new clAttribut("jo_moislettre","journal",null);

var Col_N3_Contrepartie_De_Journaux_Liste_des_journaux0=new clAttribut("jo_cp","journal",null);

var Journaux_Type_de_journal_1=new clAttribut("tj_libelle","typejournal",null);


	/* Ce composant repr�sente: typejournal.tj_libelle sous le nom "Type de journal" */
var Compo_Journaux_Type_de_journal_1=new clCompoListeDeroulanteSimple(Journaux_Type_de_journal_1,null,"Type de journal");
var Joint_Esclave_Journaux_Type_de_journal_1=new clJointureMulti("journal",
	new Array(
	new stJointure("typejournal","tj_numero","tj_numero",null,false)
	));
var Journaux_Abbr�viation_2=new clAttribut("jo_abbrev","journal",null);


	/* Ce composant repr�sente: journal.jo_abbrev sous le nom "Abbr�viation" */
var Compo_Journaux_Abbr�viation_2=new clCompoTextBox(Journaux_Abbr�viation_2,null,"Abbr�viation",false,false);
var Journaux_Libell�_3=new clAttribut("jo_libelle","journal",null);


	/* Ce composant repr�sente: journal.jo_libelle sous le nom "Libell�" */
var Compo_Journaux_Libell�_3=new clCompoTextBox(Journaux_Libell�_3,null,"Libell�",false,false);
var Journaux_Provisoire_4=new clAttribut("jo_provisoire","journal",null);


	/* Ce composant repr�sente: journal.jo_provisoire sous le nom "Provisoire" */
var Compo_Journaux_Provisoire_4=new clCompoCheckBox(Journaux_Provisoire_4,null,"Provisoire");
var Journaux_Visible_5=new clAttribut("jo_visible","journal",null);


	/* Ce composant repr�sente: journal.jo_visible sous le nom "Visible" */
var Compo_Journaux_Visible_5=new clCompoCheckBox(Journaux_Visible_5,null,"Visible");
var Journaux_Contrepartie_6=new clAttribut("jo_contrepartie","journal",null);


	/* Ce composant repr�sente: journal.jo_contrepartie sous le nom "Contrepartie" */
var Compo_Journaux_Contrepartie_6=new clCompoCheckBox(Journaux_Contrepartie_6,null,"Contrepartie");
var Journaux_Compte_de_la_contrepartie_7=new clAttribut("cg_nom","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_nom sous le nom "Compte de la contrepartie" */
var Compo_Journaux_Compte_de_la_contrepartie_7=new clCompoListeDeroulanteSimple(Journaux_Compte_de_la_contrepartie_7,null,"Compte de la contrepartie");
var Joint_Esclave_Journaux_Compte_de_la_contrepartie_7=new clJointureMulti("journal",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Col_N0_N__Pi�ce_De_Journaux_Pi�ces_comptables_8=new clAttribut("pi_numpiece","piece",null);

var Col_N1_Date_De_Journaux_Pi�ces_comptables_8=new clAttribut("pi_date","piece",null);

var Col_N2_Libell�_De_Journaux_Pi�ces_comptables_8=new clAttribut("pi_libelle","piece",null);

var Col_N3_Equilibr�_De_Journaux_Pi�ces_comptables_8=new clAttribut("pi_equilibre","piece",null);

var Col_N4_D�bit_De_Journaux_Pi�ces_comptables_8=new clAttribut("pi_debit","piece",null);

var Col_N5_Cr�dit_De_Journaux_Pi�ces_comptables_8=new clAttribut("pi_credit","piece",null);

var Journaux_Pi�ces_comptables_8=new clEnsembleAttributs("piece",
	new Array(
	new clLiaison(null,Col_N0_N__Pi�ce_De_Journaux_Pi�ces_comptables_8)
	,new clLiaison(null,Col_N1_Date_De_Journaux_Pi�ces_comptables_8)
	,new clLiaison(null,Col_N2_Libell�_De_Journaux_Pi�ces_comptables_8)
	,new clLiaison(null,Col_N3_Equilibr�_De_Journaux_Pi�ces_comptables_8)
	,new clLiaison(null,Col_N4_D�bit_De_Journaux_Pi�ces_comptables_8)
	,new clLiaison(null,Col_N5_Cr�dit_De_Journaux_Pi�ces_comptables_8)
	),
	null);

var Titre_Journaux_Pi�ces_comptables_8=new Array("N� Pi�ce","Date","Libell�","Equilibr�","D�bit","Cr�dit");

	/* Ce composant repr�sente: des �l�ments de la table piece sous le nom "Pi�ces comptables" */
var Compo_Journaux_Pi�ces_comptables_8=new clCompoListe(Journaux_Pi�ces_comptables_8,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Pi�ces_1=new clInterfaceFiltrageRelationOnglet("Pi�ces",Gerer_Pi�ces,OuvrirOnglet_Journaux,true)),Titre_Journaux_Pi�ces_comptables_8,"Pi�ces comptables",true,false);
var Joint_Esclave_Journaux_Pi�ces_comptables_8=new clJointureMulti("journal",
	new Array(
	new stJointure("piece","jo_numero","jo_numero",null,false)
	));
var Journaux_Liste_des_journaux0=new clEnsembleAttributs("journal",
	new Array(
	new clLiaison(null,Col_N0_Abbr__De_Journaux_Liste_des_journaux0)
	,new clLiaison(null,Col_N1_Libell�_De_Journaux_Liste_des_journaux0)
	,new clLiaison(null,Col_N2_D�but_De_Journaux_Liste_des_journaux0)
	,new clLiaison(null,Col_N3_Contrepartie_De_Journaux_Liste_des_journaux0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Journaux_Type_de_journal_1,Journaux_Type_de_journal_1)
	,new clLiaison(null,Journaux_Abbr�viation_2)
	,new clLiaison(null,Journaux_Libell�_3)
	,new clLiaison(null,Journaux_Provisoire_4)
	,new clLiaison(null,Journaux_Visible_5)
	,new clLiaison(null,Journaux_Contrepartie_6)
	,new clLiaison(Joint_Esclave_Journaux_Compte_de_la_contrepartie_7,Journaux_Compte_de_la_contrepartie_7)
	,new clLiaison(Joint_Esclave_Journaux_Pi�ces_comptables_8,Journaux_Pi�ces_comptables_8)
	));

var Titre_Journaux_Liste_des_journaux0=new Array("Abbr.","Libell�","D�but","Contrepartie");

	/* Ce composant repr�sente: des �l�ments de la table journal sous le nom "Liste des journaux" */
var Compo_Journaux_Liste_des_journaux0=new clCompoListe(Journaux_Liste_des_journaux0,new Array(new clInterfaceFiltrageVide()),Titre_Journaux_Liste_des_journaux0,"Liste des journaux",true,false);

	/* Ce composant repr�sente: journal.undefined sous le nom "Liste des journaux" */
 if(ALeDroit(0,"journal"))
 {
Compo_Journaux_Liste_des_journaux0.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0"));

 }

	/* On l'ajoute au tableau global � l'indice 18*/
top.TAB_GLOBAL_COMPO[18]=Compo_Journaux_Liste_des_journaux0;

	/* Ce composant repr�sente: des �l�ments de la table typejournal sous le nom "Type de journal" */
 if(ALeDroit(0,"typejournal"))
 {
Compo_Journaux_Type_de_journal_1.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 23*/
top.TAB_GLOBAL_COMPO[23]=Compo_Journaux_Type_de_journal_1;

	/* Ce composant repr�sente: des �l�ments de la table journal sous le nom "Abbr�viation" */
 if(ALeDroit(0,"journal"))
 {
Compo_Journaux_Abbr�viation_2.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 24*/
top.TAB_GLOBAL_COMPO[24]=Compo_Journaux_Abbr�viation_2;

	/* Ce composant repr�sente: des �l�ments de la table journal sous le nom "Libell�" */
 if(ALeDroit(0,"journal"))
 {
Compo_Journaux_Libell�_3.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 25*/
top.TAB_GLOBAL_COMPO[25]=Compo_Journaux_Libell�_3;

	/* Ce composant repr�sente: des �l�ments de la table journal sous le nom "Provisoire" */
 if(ALeDroit(0,"journal"))
 {
Compo_Journaux_Provisoire_4.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 26*/
top.TAB_GLOBAL_COMPO[26]=Compo_Journaux_Provisoire_4;

	/* Ce composant repr�sente: des �l�ments de la table journal sous le nom "Visible" */
 if(ALeDroit(0,"journal"))
 {
Compo_Journaux_Visible_5.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 27*/
top.TAB_GLOBAL_COMPO[27]=Compo_Journaux_Visible_5;

	/* Ce composant repr�sente: des �l�ments de la table journal sous le nom "Contrepartie" */
 if(ALeDroit(0,"journal"))
 {
Compo_Journaux_Contrepartie_6.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 28*/
top.TAB_GLOBAL_COMPO[28]=Compo_Journaux_Contrepartie_6;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Compte de la contrepartie" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Journaux_Compte_de_la_contrepartie_7.GenererXUL(top.document.getElementById("Journaux_Liste_des_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 29*/
top.TAB_GLOBAL_COMPO[29]=Compo_Journaux_Compte_de_la_contrepartie_7;

	/* Ce composant repr�sente: piece.undefined sous le nom "Pi�ces comptables" */
 if(ALeDroit(0,"piece"))
 {
Compo_Journaux_Pi�ces_comptables_8.GenererXUL(top.document.getElementById("Journaux_Pi�ces_comptables_8"));

 }

	/* On l'ajoute au tableau global � l'indice 30*/
top.TAB_GLOBAL_COMPO[30]=Compo_Journaux_Pi�ces_comptables_8;
var Col_N0_N_Pi�ce_De_Pi�ces_Liste_des_pi�ces_comptables0=new clAttribut("pi_numpiece","piece",null);

var Col_N1_Libell�_De_Pi�ces_Liste_des_pi�ces_comptables0=new clAttribut("pi_libelle","piece",null);

var Col_N2_Equilibr�_De_Pi�ces_Liste_des_pi�ces_comptables0=new clAttribut("pi_equilibre","piece",null);

var Col_N3_D�bit_De_Pi�ces_Liste_des_pi�ces_comptables0=new clAttribut("pi_debit","piece",null);

var Col_N4_Cr�dit_De_Pi�ces_Liste_des_pi�ces_comptables0=new clAttribut("pi_credit","piece",null);

var Pi�ces_Libell�_1=new clAttribut("pi_libelle","piece",null);


	/* Ce composant repr�sente: piece.pi_libelle sous le nom "Libell�" */
var Compo_Pi�ces_Libell�_1=new clCompoTextBox(Pi�ces_Libell�_1,null,"Libell�",false,false);
var Pi�ces_Date_2=new clAttribut("pi_date","piece",null);


	/* Ce composant repr�sente: piece.pi_date sous le nom "Date" */
var Compo_Pi�ces_Date_2=new clCompoTextBox(Pi�ces_Date_2,null,"Date",false,false);
var Col_N0_N__De_Pi�ces_�critures_3=new clAttribut("ec_numecriture","ecriture",null);

var Col_N1_Pref__De_Pi�ces_�critures_3=new clAttribut("pf_nom","prefixe",null);

var Joint_Col_N1_Pref__De_Pi�ces_�critures_3=new clJointureMulti("ecriture",
	new Array(
	new stJointure("prefixe","pf_numero","pf_numero",null,true)
	));
var Col_N2_Libell�_De_Pi�ces_�critures_3=new clAttribut("ec_libelle","ecriture",null);

var Col_N3_Compte_De_Pi�ces_�critures_3=new clAttribut("ec_compte","ecriture",null);

var Col_N4_Pointage_De_Pi�ces_�critures_3=new clAttribut("pt_releve","pointage",null);

var Joint_Col_N4_Pointage_De_Pi�ces_�critures_3=new clJointureMulti("ecriture",
	new Array(
	new stJointure("pointage","pt_numero","pt_numero",null,true)
	));
var Col_N5_Lettrage_De_Pi�ces_�critures_3=new clAttribut("lt_lettre","lettrage",null);

var Joint_Col_N5_Lettrage_De_Pi�ces_�critures_3=new clJointureMulti("ecriture",
	new Array(
	new stJointure("lettrage","lt_numero","lt_numero",null,true)
	));
var Pi�ces_Compte_g�n�ral_4=new clAttribut("cg_nom","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_nom sous le nom "Compte g�n�ral" */
var Compo_Pi�ces_Compte_g�n�ral_4=new clCompoListeDeroulanteSimple(Pi�ces_Compte_g�n�ral_4,null,"Compte g�n�ral");
var Joint_Esclave_Pi�ces_Compte_g�n�ral_4=new clJointureMulti("ecriture",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Pi�ces_Ecriture_sur_compte_auxiliaire_5=new clAttribut("ec_aux","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_aux sous le nom "Ecriture sur compte auxiliaire" */
var Compo_Pi�ces_Ecriture_sur_compte_auxiliaire_5=new clCompoCheckBox(Pi�ces_Ecriture_sur_compte_auxiliaire_5,null,"Ecriture sur compte auxiliaire");
var Pi�ces_Compte_auxiliaire_6=new clAttribut("ca_libelle","compteaux",null);


	/* Ce composant repr�sente: compteaux.ca_libelle sous le nom "Compte auxiliaire" */
var Compo_Pi�ces_Compte_auxiliaire_6=new clCompoListeDeroulanteSimple(Pi�ces_Compte_auxiliaire_6,null,"Compte auxiliaire");
var Joint_Esclave_Pi�ces_Compte_auxiliaire_6=new clJointureMulti("ecriture",
	new Array(
	new stJointure("compteaux","ca_numero","ca_numero",null,false)
	));
var Pi�ces_Pr�fixe_7=new clAttribut("pf_nom","prefixe",null);


	/* Ce composant repr�sente: prefixe.pf_nom sous le nom "Pr�fixe" */
var Compo_Pi�ces_Pr�fixe_7=new clCompoListeDeroulanteSimple(Pi�ces_Pr�fixe_7,null,"Pr�fixe");
var Joint_Esclave_Pi�ces_Pr�fixe_7=new clJointureMulti("ecriture",
	new Array(
	new stJointure("prefixe","pf_numero","pf_numero",null,false)
	));
var Pi�ces_Libell�_8=new clAttribut("ec_libelle","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_libelle sous le nom "Libell�" */
var Compo_Pi�ces_Libell�_8=new clCompoTextBox(Pi�ces_Libell�_8,null,"Libell�",false,false);
var Pi�ces_D�bit_9=new clAttribut("ec_debit","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_debit sous le nom "D�bit" */
var Compo_Pi�ces_D�bit_9=new clCompoTextBox(Pi�ces_D�bit_9,null,"D�bit",false,false);
var Pi�ces_Cr�dit_10=new clAttribut("ec_credit","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_credit sous le nom "Cr�dit" */
var Compo_Pi�ces_Cr�dit_10=new clCompoTextBox(Pi�ces_Cr�dit_10,null,"Cr�dit",false,false);
var Pi�ces_�critures_3=new clEnsembleAttributs("ecriture",
	new Array(
	new clLiaison(null,Col_N0_N__De_Pi�ces_�critures_3)
	,new clLiaison(Joint_Col_N1_Pref__De_Pi�ces_�critures_3,Col_N1_Pref__De_Pi�ces_�critures_3)
	,new clLiaison(null,Col_N2_Libell�_De_Pi�ces_�critures_3)
	,new clLiaison(null,Col_N3_Compte_De_Pi�ces_�critures_3)
	,new clLiaison(Joint_Col_N4_Pointage_De_Pi�ces_�critures_3,Col_N4_Pointage_De_Pi�ces_�critures_3)
	,new clLiaison(Joint_Col_N5_Lettrage_De_Pi�ces_�critures_3,Col_N5_Lettrage_De_Pi�ces_�critures_3)
	),
	new Array(
	new clLiaison(Joint_Esclave_Pi�ces_Compte_g�n�ral_4,Pi�ces_Compte_g�n�ral_4)
	,new clLiaison(null,Pi�ces_Ecriture_sur_compte_auxiliaire_5)
	,new clLiaison(Joint_Esclave_Pi�ces_Compte_auxiliaire_6,Pi�ces_Compte_auxiliaire_6)
	,new clLiaison(Joint_Esclave_Pi�ces_Pr�fixe_7,Pi�ces_Pr�fixe_7)
	,new clLiaison(null,Pi�ces_Libell�_8)
	,new clLiaison(null,Pi�ces_D�bit_9)
	,new clLiaison(null,Pi�ces_Cr�dit_10)
	));

var Titre_Pi�ces_�critures_3=new Array("N�","Pref.","Libell�","Compte","Pointage","Lettrage");

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "�critures" */
var Compo_Pi�ces_�critures_3=new clCompoListe(Pi�ces_�critures_3,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Ecritures_0=new clInterfaceFiltrageRelationOnglet("Ecritures",Gerer_Ecritures,OuvrirOnglet_Pi�ces,true)),Titre_Pi�ces_�critures_3,"�critures",true,false);
var Joint_Esclave_Pi�ces_�critures_3=new clJointureMulti("piece",
	new Array(
	new stJointure("ecriture","pi_numero","pi_numero",null,false)
	));
var Pi�ces_Liste_des_pi�ces_comptables0=new clEnsembleAttributs("piece",
	new Array(
	new clLiaison(null,Col_N0_N_Pi�ce_De_Pi�ces_Liste_des_pi�ces_comptables0)
	,new clLiaison(null,Col_N1_Libell�_De_Pi�ces_Liste_des_pi�ces_comptables0)
	,new clLiaison(null,Col_N2_Equilibr�_De_Pi�ces_Liste_des_pi�ces_comptables0)
	,new clLiaison(null,Col_N3_D�bit_De_Pi�ces_Liste_des_pi�ces_comptables0)
	,new clLiaison(null,Col_N4_Cr�dit_De_Pi�ces_Liste_des_pi�ces_comptables0)
	),
	new Array(
	new clLiaison(null,Pi�ces_Libell�_1)
	,new clLiaison(null,Pi�ces_Date_2)
	,new clLiaison(Joint_Esclave_Pi�ces_�critures_3,Pi�ces_�critures_3)
	));

var Titre_Pi�ces_Liste_des_pi�ces_comptables0=new Array("N�Pi�ce","Libell�","Equilibr�","D�bit","Cr�dit");

	/* Ce composant repr�sente: des �l�ments de la table piece sous le nom "Liste des pi�ces comptables" */
var Compo_Pi�ces_Liste_des_pi�ces_comptables0=new clCompoListe(Pi�ces_Liste_des_pi�ces_comptables0,new Array(new clInterfaceFiltrageVide()),Titre_Pi�ces_Liste_des_pi�ces_comptables0,"Liste des pi�ces comptables",true,false);

	/* Ce composant repr�sente: piece.undefined sous le nom "Liste des pi�ces comptables" */
 if(ALeDroit(0,"piece"))
 {
Compo_Pi�ces_Liste_des_pi�ces_comptables0.GenererXUL(top.document.getElementById("Pi�ces_Liste_des_pi�ces_comptables0"));

 }

	/* On l'ajoute au tableau global � l'indice 37*/
top.TAB_GLOBAL_COMPO[37]=Compo_Pi�ces_Liste_des_pi�ces_comptables0;

	/* Ce composant repr�sente: des �l�ments de la table piece sous le nom "Libell�" */
 if(ALeDroit(0,"piece"))
 {
Compo_Pi�ces_Libell�_1.GenererXUL(top.document.getElementById("Pi�ces_Liste_des_pi�ces_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 43*/
top.TAB_GLOBAL_COMPO[43]=Compo_Pi�ces_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table piece sous le nom "Date" */
 if(ALeDroit(0,"piece"))
 {
Compo_Pi�ces_Date_2.GenererXUL(top.document.getElementById("Pi�ces_Liste_des_pi�ces_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 44*/
top.TAB_GLOBAL_COMPO[44]=Compo_Pi�ces_Date_2;

	/* Ce composant repr�sente: ecriture.undefined sous le nom "�critures" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Pi�ces_�critures_3.GenererXUL(top.document.getElementById("Pi�ces_�critures_3"));

 }

	/* On l'ajoute au tableau global � l'indice 45*/
top.TAB_GLOBAL_COMPO[45]=Compo_Pi�ces_�critures_3;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Compte g�n�ral" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Pi�ces_Compte_g�n�ral_4.GenererXUL(top.document.getElementById("Pi�ces_�critures_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 52*/
top.TAB_GLOBAL_COMPO[52]=Compo_Pi�ces_Compte_g�n�ral_4;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Ecriture sur compte auxiliaire" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Pi�ces_Ecriture_sur_compte_auxiliaire_5.GenererXUL(top.document.getElementById("Pi�ces_�critures_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 53*/
top.TAB_GLOBAL_COMPO[53]=Compo_Pi�ces_Ecriture_sur_compte_auxiliaire_5;

	/* Ce composant repr�sente: des �l�ments de la table compteaux sous le nom "Compte auxiliaire" */
 if(ALeDroit(0,"compteaux"))
 {
Compo_Pi�ces_Compte_auxiliaire_6.GenererXUL(top.document.getElementById("Pi�ces_�critures_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 54*/
top.TAB_GLOBAL_COMPO[54]=Compo_Pi�ces_Compte_auxiliaire_6;

	/* Ce composant repr�sente: des �l�ments de la table prefixe sous le nom "Pr�fixe" */
 if(ALeDroit(0,"prefixe"))
 {
Compo_Pi�ces_Pr�fixe_7.GenererXUL(top.document.getElementById("Pi�ces_�critures_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 55*/
top.TAB_GLOBAL_COMPO[55]=Compo_Pi�ces_Pr�fixe_7;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Libell�" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Pi�ces_Libell�_8.GenererXUL(top.document.getElementById("Pi�ces_�critures_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 56*/
top.TAB_GLOBAL_COMPO[56]=Compo_Pi�ces_Libell�_8;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "D�bit" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Pi�ces_D�bit_9.GenererXUL(top.document.getElementById("Pi�ces_�critures_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 57*/
top.TAB_GLOBAL_COMPO[57]=Compo_Pi�ces_D�bit_9;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Cr�dit" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Pi�ces_Cr�dit_10.GenererXUL(top.document.getElementById("Pi�ces_�critures_3_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 58*/
top.TAB_GLOBAL_COMPO[58]=Compo_Pi�ces_Cr�dit_10;
var Col_N0_Libell�_De_Ecritures_Liste_des_�critures_comptables0=new clAttribut("ec_libelle","ecriture",null);

var Col_N1_D�bit_De_Ecritures_Liste_des_�critures_comptables0=new clAttribut("ec_debit","ecriture",null);

var Col_N2_Cr�dit_De_Ecritures_Liste_des_�critures_comptables0=new clAttribut("ec_credit","ecriture",null);

var Col_N3_Compte_De_Ecritures_Liste_des_�critures_comptables0=new clAttribut("ec_compte","ecriture",null);

var Ecritures_Libell�_1=new clAttribut("ec_libelle","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_libelle sous le nom "Libell�" */
var Compo_Ecritures_Libell�_1=new clCompolabel(Ecritures_Libell�_1,null,"Libell�",undefined,undefined);
var Ecritures_Compte_2=new clAttribut("ec_compte","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_compte sous le nom "Compte" */
var Compo_Ecritures_Compte_2=new clCompolabel(Ecritures_Compte_2,null,"Compte",undefined,undefined);
var Ecritures_D�bit_3=new clAttribut("ec_debit","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_debit sous le nom "D�bit" */
var Compo_Ecritures_D�bit_3=new clCompolabel(Ecritures_D�bit_3,null,"D�bit",undefined,undefined);
var Ecritures_Cr�dit_4=new clAttribut("ec_credit","ecriture",null);


	/* Ce composant repr�sente: ecriture.ec_credit sous le nom "Cr�dit" */
var Compo_Ecritures_Cr�dit_4=new clCompolabel(Ecritures_Cr�dit_4,null,"Cr�dit",undefined,undefined);
var Ecritures_Pointage_5=new clAttribut("pt_releve","pointage",null);


	/* Ce composant repr�sente: pointage.pt_releve sous le nom "Pointage" */
var Compo_Ecritures_Pointage_5=new clCompoListeDeroulanteSimple(Ecritures_Pointage_5,null,"Pointage");
var Joint_Esclave_Ecritures_Pointage_5=new clJointureMulti("ecriture",
	new Array(
	new stJointure("pointage","pt_numero","pt_numero",null,false)
	));
var Ecritures_Lettrage_6=new clAttribut("lt_lettre","lettrage",null);


	/* Ce composant repr�sente: lettrage.lt_lettre sous le nom "Lettrage" */
var Compo_Ecritures_Lettrage_6=new clCompoListeDeroulanteSimple(Ecritures_Lettrage_6,null,"Lettrage");
var Joint_Esclave_Ecritures_Lettrage_6=new clJointureMulti("ecriture",
	new Array(
	new stJointure("lettrage","lt_numero","lt_numero",null,false)
	));
var Ecritures_Liste_des_�critures_comptables0=new clEnsembleAttributs("ecriture",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Ecritures_Liste_des_�critures_comptables0)
	,new clLiaison(null,Col_N1_D�bit_De_Ecritures_Liste_des_�critures_comptables0)
	,new clLiaison(null,Col_N2_Cr�dit_De_Ecritures_Liste_des_�critures_comptables0)
	,new clLiaison(null,Col_N3_Compte_De_Ecritures_Liste_des_�critures_comptables0)
	),
	new Array(
	new clLiaison(null,Ecritures_Libell�_1)
	,new clLiaison(null,Ecritures_Compte_2)
	,new clLiaison(null,Ecritures_D�bit_3)
	,new clLiaison(null,Ecritures_Cr�dit_4)
	,new clLiaison(Joint_Esclave_Ecritures_Pointage_5,Ecritures_Pointage_5)
	,new clLiaison(Joint_Esclave_Ecritures_Lettrage_6,Ecritures_Lettrage_6)
	));

var Titre_Ecritures_Liste_des_�critures_comptables0=new Array("Libell�","D�bit","Cr�dit","Compte");

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Liste des �critures comptables" */
var Compo_Ecritures_Liste_des_�critures_comptables0=new clCompoListe(Ecritures_Liste_des_�critures_comptables0,new Array(new clInterfaceFiltrageVide()),Titre_Ecritures_Liste_des_�critures_comptables0,"Liste des �critures comptables",true,false);

	/* Ce composant repr�sente: ecriture.undefined sous le nom "Liste des �critures comptables" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Ecritures_Liste_des_�critures_comptables0.GenererXUL(top.document.getElementById("Ecritures_Liste_des_�critures_comptables0"));

 }

	/* On l'ajoute au tableau global � l'indice 59*/
top.TAB_GLOBAL_COMPO[59]=Compo_Ecritures_Liste_des_�critures_comptables0;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Libell�" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Ecritures_Libell�_1.GenererXUL(top.document.getElementById("Ecritures_Liste_des_�critures_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 64*/
top.TAB_GLOBAL_COMPO[64]=Compo_Ecritures_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Compte" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Ecritures_Compte_2.GenererXUL(top.document.getElementById("Ecritures_Liste_des_�critures_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 65*/
top.TAB_GLOBAL_COMPO[65]=Compo_Ecritures_Compte_2;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "D�bit" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Ecritures_D�bit_3.GenererXUL(top.document.getElementById("Ecritures_Liste_des_�critures_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 66*/
top.TAB_GLOBAL_COMPO[66]=Compo_Ecritures_D�bit_3;

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Cr�dit" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Ecritures_Cr�dit_4.GenererXUL(top.document.getElementById("Ecritures_Liste_des_�critures_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 67*/
top.TAB_GLOBAL_COMPO[67]=Compo_Ecritures_Cr�dit_4;

	/* Ce composant repr�sente: des �l�ments de la table pointage sous le nom "Pointage" */
 if(ALeDroit(0,"pointage"))
 {
Compo_Ecritures_Pointage_5.GenererXUL(top.document.getElementById("Ecritures_Liste_des_�critures_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 68*/
top.TAB_GLOBAL_COMPO[68]=Compo_Ecritures_Pointage_5;

	/* Ce composant repr�sente: des �l�ments de la table lettrage sous le nom "Lettrage" */
 if(ALeDroit(0,"lettrage"))
 {
Compo_Ecritures_Lettrage_6.GenererXUL(top.document.getElementById("Ecritures_Liste_des_�critures_comptables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 69*/
top.TAB_GLOBAL_COMPO[69]=Compo_Ecritures_Lettrage_6;
var Col_N0_N__de_compte_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0=new clAttribut("cg_numcompte","comptegen",null);

var Col_N1_Libell�_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0=new clAttribut("cg_libelle","comptegen",null);

var Col_N2_D�bit_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0=new clAttribut("cg_vdebit","comptegen",null);

var Col_N3_Cr�dit_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0=new clAttribut("cg_vcredit","comptegen",null);

var Comptes_g�n�raux_Num�ro_de_compte_1=new clAttribut("cg_numcompte","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_numcompte sous le nom "Num�ro de compte" */
var Compo_Comptes_g�n�raux_Num�ro_de_compte_1=new clCompoTextBox(Comptes_g�n�raux_Num�ro_de_compte_1,null,"Num�ro de compte",false,false);
var Comptes_g�n�raux_Libell�_2=new clAttribut("cg_libelle","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_libelle sous le nom "Libell�" */
var Compo_Comptes_g�n�raux_Libell�_2=new clCompoTextBox(Comptes_g�n�raux_Libell�_2,null,"Libell�",false,false);
var Comptes_g�n�raux_Niveau_d_acc�s_3=new clAttribut("ac_nom","acces",null);


	/* Ce composant repr�sente: acces.ac_nom sous le nom "Niveau d'acc�s" */
var Compo_Comptes_g�n�raux_Niveau_d_acc�s_3=new clCompoListeDeroulanteSimple(Comptes_g�n�raux_Niveau_d_acc�s_3,null,"Niveau d'acc�s");
var Joint_Esclave_Comptes_g�n�raux_Niveau_d_acc�s_3=new clJointureMulti("comptegen",
	new Array(
	new stJointure("acces","ac_numero","ac_numero",null,false)
	));
var Comptes_g�n�raux_Le_compte_peut_avoir_des_compte_auxiliaires_4=new clAttribut("cg_accepteaux","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_accepteaux sous le nom "Le compte peut avoir des compte auxiliaires" */
var Compo_Comptes_g�n�raux_Le_compte_peut_avoir_des_compte_auxiliaires_4=new clCompoCheckBox(Comptes_g�n�raux_Le_compte_peut_avoir_des_compte_auxiliaires_4,null,"Le compte peut avoir des compte auxiliaires");
var Comptes_g�n�raux_Le_compte_est_utilisable_5=new clAttribut("cg_utilisable","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_utilisable sous le nom "Le compte est utilisable" */
var Compo_Comptes_g�n�raux_Le_compte_est_utilisable_5=new clCompoCheckBox(Comptes_g�n�raux_Le_compte_est_utilisable_5,null,"Le compte est utilisable");
var Comptes_g�n�raux_Le_compte_est_lettrable_6=new clAttribut("cg_lettrable","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_lettrable sous le nom "Le compte est lettrable" */
var Compo_Comptes_g�n�raux_Le_compte_est_lettrable_6=new clCompoCheckBox(Comptes_g�n�raux_Le_compte_est_lettrable_6,null,"Le compte est lettrable");
var Comptes_g�n�raux_Le_compte_est_pointable_7=new clAttribut("cg_pointable","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_pointable sous le nom "Le compte est pointable" */
var Compo_Comptes_g�n�raux_Le_compte_est_pointable_7=new clCompoCheckBox(Comptes_g�n�raux_Le_compte_est_pointable_7,null,"Le compte est pointable");
var Comptes_g�n�raux_Le_compte_est_groupable_8=new clAttribut("cg_groupable","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_groupable sous le nom "Le compte est groupable" */
var Compo_Comptes_g�n�raux_Le_compte_est_groupable_8=new clCompoCheckBox(Comptes_g�n�raux_Le_compte_est_groupable_8,null,"Le compte est groupable");
var Comptes_g�n�raux_Le_compte_est_un_d�bit_9=new clAttribut("cg_debit","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_debit sous le nom "Le compte est un d�bit" */
var Compo_Comptes_g�n�raux_Le_compte_est_un_d�bit_9=new clCompoCheckBox(Comptes_g�n�raux_Le_compte_est_un_d�bit_9,null,"Le compte est un d�bit");
var Col_N0_N__de_compte_De_Comptes_g�n�raux_Comptes_auxiliaires_10=new clAttribut("ca_numcompte","compteaux",null);

var Col_N1_Libell�_De_Comptes_g�n�raux_Comptes_auxiliaires_10=new clAttribut("ca_libelle","compteaux",null);

var Col_N2_Acc�s_De_Comptes_g�n�raux_Comptes_auxiliaires_10=new clAttribut("ac_nom","acces",null);

var Joint_Col_N2_Acc�s_De_Comptes_g�n�raux_Comptes_auxiliaires_10=new clJointureMulti("compteaux",
	new Array(
	new stJointure("acces","ac_numero","ac_numero",null,true)
	));
var Comptes_g�n�raux_Comptes_auxiliaires_10=new clEnsembleAttributs("compteaux",
	new Array(
	new clLiaison(null,Col_N0_N__de_compte_De_Comptes_g�n�raux_Comptes_auxiliaires_10)
	,new clLiaison(null,Col_N1_Libell�_De_Comptes_g�n�raux_Comptes_auxiliaires_10)
	,new clLiaison(Joint_Col_N2_Acc�s_De_Comptes_g�n�raux_Comptes_auxiliaires_10,Col_N2_Acc�s_De_Comptes_g�n�raux_Comptes_auxiliaires_10)
	),
	null);

var Titre_Comptes_g�n�raux_Comptes_auxiliaires_10=new Array("N� de compte","Libell�","Acc�s");

	/* Ce composant repr�sente: des �l�ments de la table compteaux sous le nom "Comptes auxiliaires" */
var Compo_Comptes_g�n�raux_Comptes_auxiliaires_10=new clCompoListe(Comptes_g�n�raux_Comptes_auxiliaires_10,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Comptes_auxiliaires_0=new clInterfaceFiltrageRelationOnglet("Comptes auxiliaires",Gerer_Comptes_auxiliaires,OuvrirOnglet_Comptes_g�n�raux,true)),Titre_Comptes_g�n�raux_Comptes_auxiliaires_10,"Comptes auxiliaires",true,false);
var Joint_Esclave_Comptes_g�n�raux_Comptes_auxiliaires_10=new clJointureMulti("comptegen",
	new Array(
	new stJointure("compteaux","cg_numero","cg_numero",null,false)
	));
var Col_N0_Libell�_De_Comptes_g�n�raux_Ecriture_11=new clAttribut("ec_libelle","ecriture",null);

var Col_N1_D�bit_De_Comptes_g�n�raux_Ecriture_11=new clAttribut("ec_debit","ecriture",null);

var Col_N2_Cr�dit_De_Comptes_g�n�raux_Ecriture_11=new clAttribut("ec_credit","ecriture",null);

var Col_N3_Lettrage_De_Comptes_g�n�raux_Ecriture_11=new clAttribut("lt_lettre","lettrage",null);

var Joint_Col_N3_Lettrage_De_Comptes_g�n�raux_Ecriture_11=new clJointureMulti("ecriture",
	new Array(
	new stJointure("lettrage","lt_numero","lt_numero",null,true)
	));
var Col_N4_Pointage_De_Comptes_g�n�raux_Ecriture_11=new clAttribut("pt_releve","pointage",null);

var Joint_Col_N4_Pointage_De_Comptes_g�n�raux_Ecriture_11=new clJointureMulti("ecriture",
	new Array(
	new stJointure("pointage","pt_numero","pt_numero",null,true)
	));
var Comptes_g�n�raux_Ecriture_11=new clEnsembleAttributs("ecriture",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Comptes_g�n�raux_Ecriture_11)
	,new clLiaison(null,Col_N1_D�bit_De_Comptes_g�n�raux_Ecriture_11)
	,new clLiaison(null,Col_N2_Cr�dit_De_Comptes_g�n�raux_Ecriture_11)
	,new clLiaison(Joint_Col_N3_Lettrage_De_Comptes_g�n�raux_Ecriture_11,Col_N3_Lettrage_De_Comptes_g�n�raux_Ecriture_11)
	,new clLiaison(Joint_Col_N4_Pointage_De_Comptes_g�n�raux_Ecriture_11,Col_N4_Pointage_De_Comptes_g�n�raux_Ecriture_11)
	),
	null);

var Titre_Comptes_g�n�raux_Ecriture_11=new Array("Libell�","D�bit","Cr�dit","Lettrage","Pointage");

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Ecriture" */
var Compo_Comptes_g�n�raux_Ecriture_11=new clCompoListe(Comptes_g�n�raux_Ecriture_11,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Ecritures_1=new clInterfaceFiltrageRelationOnglet("Ecritures",Gerer_Ecritures,OuvrirOnglet_Comptes_g�n�raux,true)),Titre_Comptes_g�n�raux_Ecriture_11,"Ecriture",true,false);
var Joint_Esclave_Comptes_g�n�raux_Ecriture_11=new clJointureMulti("comptegen",
	new Array(
	new stJointure("ecriture","cg_numero","cg_numero",null,false)
	));
var Comptes_g�n�raux_Liste_des_comptes_g�n�raux0=new clEnsembleAttributs("comptegen",
	new Array(
	new clLiaison(null,Col_N0_N__de_compte_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0)
	,new clLiaison(null,Col_N1_Libell�_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0)
	,new clLiaison(null,Col_N2_D�bit_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0)
	,new clLiaison(null,Col_N3_Cr�dit_De_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0)
	),
	new Array(
	new clLiaison(null,Comptes_g�n�raux_Num�ro_de_compte_1)
	,new clLiaison(null,Comptes_g�n�raux_Libell�_2)
	,new clLiaison(Joint_Esclave_Comptes_g�n�raux_Niveau_d_acc�s_3,Comptes_g�n�raux_Niveau_d_acc�s_3)
	,new clLiaison(null,Comptes_g�n�raux_Le_compte_peut_avoir_des_compte_auxiliaires_4)
	,new clLiaison(null,Comptes_g�n�raux_Le_compte_est_utilisable_5)
	,new clLiaison(null,Comptes_g�n�raux_Le_compte_est_lettrable_6)
	,new clLiaison(null,Comptes_g�n�raux_Le_compte_est_pointable_7)
	,new clLiaison(null,Comptes_g�n�raux_Le_compte_est_groupable_8)
	,new clLiaison(null,Comptes_g�n�raux_Le_compte_est_un_d�bit_9)
	,new clLiaison(Joint_Esclave_Comptes_g�n�raux_Comptes_auxiliaires_10,Comptes_g�n�raux_Comptes_auxiliaires_10)
	,new clLiaison(Joint_Esclave_Comptes_g�n�raux_Ecriture_11,Comptes_g�n�raux_Ecriture_11)
	));

var Titre_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0=new Array("N� de compte","Libell�","D�bit","Cr�dit");

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Liste des comptes g�n�raux" */
var Compo_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0=new clCompoListe(Comptes_g�n�raux_Liste_des_comptes_g�n�raux0,new Array(new clInterfaceFiltrageVide()),Titre_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0,"Liste des comptes g�n�raux",true,false);

	/* Ce composant repr�sente: comptegen.undefined sous le nom "Liste des comptes g�n�raux" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0"));

 }

	/* On l'ajoute au tableau global � l'indice 70*/
top.TAB_GLOBAL_COMPO[70]=Compo_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Num�ro de compte" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Num�ro_de_compte_1.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 75*/
top.TAB_GLOBAL_COMPO[75]=Compo_Comptes_g�n�raux_Num�ro_de_compte_1;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Libell�" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Libell�_2.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 76*/
top.TAB_GLOBAL_COMPO[76]=Compo_Comptes_g�n�raux_Libell�_2;

	/* Ce composant repr�sente: des �l�ments de la table acces sous le nom "Niveau d'acc�s" */
 if(ALeDroit(0,"acces"))
 {
Compo_Comptes_g�n�raux_Niveau_d_acc�s_3.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 77*/
top.TAB_GLOBAL_COMPO[77]=Compo_Comptes_g�n�raux_Niveau_d_acc�s_3;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Le compte peut avoir des compte auxiliaires" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Le_compte_peut_avoir_des_compte_auxiliaires_4.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 78*/
top.TAB_GLOBAL_COMPO[78]=Compo_Comptes_g�n�raux_Le_compte_peut_avoir_des_compte_auxiliaires_4;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Le compte est utilisable" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Le_compte_est_utilisable_5.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 79*/
top.TAB_GLOBAL_COMPO[79]=Compo_Comptes_g�n�raux_Le_compte_est_utilisable_5;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Le compte est lettrable" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Le_compte_est_lettrable_6.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 80*/
top.TAB_GLOBAL_COMPO[80]=Compo_Comptes_g�n�raux_Le_compte_est_lettrable_6;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Le compte est pointable" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Le_compte_est_pointable_7.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 81*/
top.TAB_GLOBAL_COMPO[81]=Compo_Comptes_g�n�raux_Le_compte_est_pointable_7;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Le compte est groupable" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Le_compte_est_groupable_8.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 82*/
top.TAB_GLOBAL_COMPO[82]=Compo_Comptes_g�n�raux_Le_compte_est_groupable_8;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Le compte est un d�bit" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Comptes_g�n�raux_Le_compte_est_un_d�bit_9.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Liste_des_comptes_g�n�raux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 83*/
top.TAB_GLOBAL_COMPO[83]=Compo_Comptes_g�n�raux_Le_compte_est_un_d�bit_9;

	/* Ce composant repr�sente: compteaux.undefined sous le nom "Comptes auxiliaires" */
 if(ALeDroit(0,"compteaux"))
 {
Compo_Comptes_g�n�raux_Comptes_auxiliaires_10.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Comptes_auxiliaires_10"));

 }

	/* On l'ajoute au tableau global � l'indice 84*/
top.TAB_GLOBAL_COMPO[84]=Compo_Comptes_g�n�raux_Comptes_auxiliaires_10;

	/* Ce composant repr�sente: ecriture.undefined sous le nom "Ecriture" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Comptes_g�n�raux_Ecriture_11.GenererXUL(top.document.getElementById("Comptes_g�n�raux_Ecriture_11"));

 }

	/* On l'ajoute au tableau global � l'indice 88*/
top.TAB_GLOBAL_COMPO[88]=Compo_Comptes_g�n�raux_Ecriture_11;
var Col_N0_N__de_compte_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0=new clAttribut("ca_numcompte","compteaux",null);

var Col_N1_Libell�_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0=new clAttribut("ca_libelle","compteaux",null);

var Col_N2_D�bit_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0=new clAttribut("ca_vdebit","compteaux",null);

var Col_N3_Cr�dit_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0=new clAttribut("ca_vcredit","compteaux",null);

var Comptes_auxiliaires_Num�ro_de_compte_1=new clAttribut("ca_numcompte","compteaux",null);


	/* Ce composant repr�sente: compteaux.ca_numcompte sous le nom "Num�ro de compte" */
var Compo_Comptes_auxiliaires_Num�ro_de_compte_1=new clCompoTextBox(Comptes_auxiliaires_Num�ro_de_compte_1,null,"Num�ro de compte",false,false);
var Comptes_auxiliaires_Libell�_2=new clAttribut("ca_libelle","compteaux",null);


	/* Ce composant repr�sente: compteaux.ca_libelle sous le nom "Libell�" */
var Compo_Comptes_auxiliaires_Libell�_2=new clCompoTextBox(Comptes_auxiliaires_Libell�_2,null,"Libell�",false,false);
var Comptes_auxiliaires_Niveau_d_acc�s_3=new clAttribut("ac_nom","acces",null);


	/* Ce composant repr�sente: acces.ac_nom sous le nom "Niveau d'acc�s" */
var Compo_Comptes_auxiliaires_Niveau_d_acc�s_3=new clCompoListeDeroulanteSimple(Comptes_auxiliaires_Niveau_d_acc�s_3,null,"Niveau d'acc�s");
var Joint_Esclave_Comptes_auxiliaires_Niveau_d_acc�s_3=new clJointureMulti("compteaux",
	new Array(
	new stJointure("acces","ac_numero","ac_numero",null,false)
	));
var Comptes_auxiliaires_Le_compte_est_un_d�bit_4=new clAttribut("ca_debit","compteaux",null);


	/* Ce composant repr�sente: compteaux.ca_debit sous le nom "Le compte est un d�bit" */
var Compo_Comptes_auxiliaires_Le_compte_est_un_d�bit_4=new clCompoCheckBox(Comptes_auxiliaires_Le_compte_est_un_d�bit_4,null,"Le compte est un d�bit");
var Col_N0_Libell�_De_Comptes_auxiliaires_Ecriture_5=new clAttribut("ec_libelle","ecriture",null);

var Col_N1_D�bit_De_Comptes_auxiliaires_Ecriture_5=new clAttribut("ec_debit","ecriture",null);

var Col_N2_Cr�dit_De_Comptes_auxiliaires_Ecriture_5=new clAttribut("ec_credit","ecriture",null);

var Col_N3_Lettrage_De_Comptes_auxiliaires_Ecriture_5=new clAttribut("lt_lettre","lettrage",null);

var Joint_Col_N3_Lettrage_De_Comptes_auxiliaires_Ecriture_5=new clJointureMulti("ecriture",
	new Array(
	new stJointure("lettrage","lt_numero","lt_numero",null,true)
	));
var Col_N4_Pointage_De_Comptes_auxiliaires_Ecriture_5=new clAttribut("pt_releve","pointage",null);

var Joint_Col_N4_Pointage_De_Comptes_auxiliaires_Ecriture_5=new clJointureMulti("ecriture",
	new Array(
	new stJointure("pointage","pt_numero","pt_numero",null,true)
	));
var Comptes_auxiliaires_Ecriture_5=new clEnsembleAttributs("ecriture",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Comptes_auxiliaires_Ecriture_5)
	,new clLiaison(null,Col_N1_D�bit_De_Comptes_auxiliaires_Ecriture_5)
	,new clLiaison(null,Col_N2_Cr�dit_De_Comptes_auxiliaires_Ecriture_5)
	,new clLiaison(Joint_Col_N3_Lettrage_De_Comptes_auxiliaires_Ecriture_5,Col_N3_Lettrage_De_Comptes_auxiliaires_Ecriture_5)
	,new clLiaison(Joint_Col_N4_Pointage_De_Comptes_auxiliaires_Ecriture_5,Col_N4_Pointage_De_Comptes_auxiliaires_Ecriture_5)
	),
	null);

var Titre_Comptes_auxiliaires_Ecriture_5=new Array("Libell�","D�bit","Cr�dit","Lettrage","Pointage");

	/* Ce composant repr�sente: des �l�ments de la table ecriture sous le nom "Ecriture" */
var Compo_Comptes_auxiliaires_Ecriture_5=new clCompoListe(Comptes_auxiliaires_Ecriture_5,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Ecritures_2=new clInterfaceFiltrageRelationOnglet("Ecritures",Gerer_Ecritures,OuvrirOnglet_Comptes_auxiliaires,true)),Titre_Comptes_auxiliaires_Ecriture_5,"Ecriture",true,false);
var Joint_Esclave_Comptes_auxiliaires_Ecriture_5=new clJointureMulti("compteaux",
	new Array(
	new stJointure("ecriture","ca_numero","ca_numero",null,false)
	));
var Comptes_auxiliaires_Liste_des_comptes_auxiliaires0=new clEnsembleAttributs("compteaux",
	new Array(
	new clLiaison(null,Col_N0_N__de_compte_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0)
	,new clLiaison(null,Col_N1_Libell�_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0)
	,new clLiaison(null,Col_N2_D�bit_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0)
	,new clLiaison(null,Col_N3_Cr�dit_De_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0)
	),
	new Array(
	new clLiaison(null,Comptes_auxiliaires_Num�ro_de_compte_1)
	,new clLiaison(null,Comptes_auxiliaires_Libell�_2)
	,new clLiaison(Joint_Esclave_Comptes_auxiliaires_Niveau_d_acc�s_3,Comptes_auxiliaires_Niveau_d_acc�s_3)
	,new clLiaison(null,Comptes_auxiliaires_Le_compte_est_un_d�bit_4)
	,new clLiaison(Joint_Esclave_Comptes_auxiliaires_Ecriture_5,Comptes_auxiliaires_Ecriture_5)
	));

var Titre_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0=new Array("N� de compte","Libell�","D�bit","Cr�dit");

	/* Ce composant repr�sente: des �l�ments de la table compteaux sous le nom "Liste des comptes auxiliaires" */
var Compo_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0=new clCompoListe(Comptes_auxiliaires_Liste_des_comptes_auxiliaires0,new Array(new clInterfaceFiltrageVide()),Titre_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0,"Liste des comptes auxiliaires",true,false);

	/* Ce composant repr�sente: compteaux.undefined sous le nom "Liste des comptes auxiliaires" */
 if(ALeDroit(0,"compteaux"))
 {
Compo_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0.GenererXUL(top.document.getElementById("Comptes_auxiliaires_Liste_des_comptes_auxiliaires0"));

 }

	/* On l'ajoute au tableau global � l'indice 94*/
top.TAB_GLOBAL_COMPO[94]=Compo_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0;

	/* Ce composant repr�sente: des �l�ments de la table compteaux sous le nom "Num�ro de compte" */
 if(ALeDroit(0,"compteaux"))
 {
Compo_Comptes_auxiliaires_Num�ro_de_compte_1.GenererXUL(top.document.getElementById("Comptes_auxiliaires_Liste_des_comptes_auxiliaires0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 99*/
top.TAB_GLOBAL_COMPO[99]=Compo_Comptes_auxiliaires_Num�ro_de_compte_1;

	/* Ce composant repr�sente: des �l�ments de la table compteaux sous le nom "Libell�" */
 if(ALeDroit(0,"compteaux"))
 {
Compo_Comptes_auxiliaires_Libell�_2.GenererXUL(top.document.getElementById("Comptes_auxiliaires_Liste_des_comptes_auxiliaires0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 100*/
top.TAB_GLOBAL_COMPO[100]=Compo_Comptes_auxiliaires_Libell�_2;

	/* Ce composant repr�sente: des �l�ments de la table acces sous le nom "Niveau d'acc�s" */
 if(ALeDroit(0,"acces"))
 {
Compo_Comptes_auxiliaires_Niveau_d_acc�s_3.GenererXUL(top.document.getElementById("Comptes_auxiliaires_Liste_des_comptes_auxiliaires0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 101*/
top.TAB_GLOBAL_COMPO[101]=Compo_Comptes_auxiliaires_Niveau_d_acc�s_3;

	/* Ce composant repr�sente: des �l�ments de la table compteaux sous le nom "Le compte est un d�bit" */
 if(ALeDroit(0,"compteaux"))
 {
Compo_Comptes_auxiliaires_Le_compte_est_un_d�bit_4.GenererXUL(top.document.getElementById("Comptes_auxiliaires_Liste_des_comptes_auxiliaires0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 102*/
top.TAB_GLOBAL_COMPO[102]=Compo_Comptes_auxiliaires_Le_compte_est_un_d�bit_4;

	/* Ce composant repr�sente: ecriture.undefined sous le nom "Ecriture" */
 if(ALeDroit(0,"ecriture"))
 {
Compo_Comptes_auxiliaires_Ecriture_5.GenererXUL(top.document.getElementById("Comptes_auxiliaires_Ecriture_5"));

 }

	/* On l'ajoute au tableau global � l'indice 103*/
top.TAB_GLOBAL_COMPO[103]=Compo_Comptes_auxiliaires_Ecriture_5;
Filtre_DepFor_Pi�ces_0.setComposant(TAB_GLOBAL_COMPO[37],null);
Filtre_DepFor_Pi�ces_1.setComposant(TAB_GLOBAL_COMPO[37],null);
Filtre_DepFor_Ecritures_0.setComposant(TAB_GLOBAL_COMPO[59],null);
Filtre_DepFor_Ecritures_1.setComposant(TAB_GLOBAL_COMPO[59],null);
Filtre_DepFor_Ecritures_2.setComposant(TAB_GLOBAL_COMPO[59],null);
Filtre_DepFor_Comptes_auxiliaires_0.setComposant(TAB_GLOBAL_COMPO[94],null);
 if(ALeDroit(5,"exercice"))
 {
/* On refresh les composants non d�pendents de l'onget Exercice*/
var Composant_0 = TAB_GLOBAL_COMPO[3];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Exercice").hidden=true;
if (top.document.getElementById("Onglet_Exercice").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"exercice"))
 {
nb_button++;
top.document.getElementById("Insert_Exercice_Liste_des_exercices_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Exercice_Liste_des_exercices_comptables0").hidden=true;

 }
 if(ALeDroit(4,"exercice"))
 {
nb_button++;
top.document.getElementById("Delete_Exercice_Liste_des_exercices_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Exercice_Liste_des_exercices_comptables0").hidden=true;

 }
 if(ALeDroit(1,"exercice"))
 {
nb_button++;
top.document.getElementById("Update_Exercice_Liste_des_exercices_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Exercice_Liste_des_exercices_comptables0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Exercice_Liste_des_exercices_comptables0").hidden=true;
        top.document.getElementById("Annuler_Exercice_Liste_des_exercices_comptables0").hidden=true;
}
 if(ALeDroit(5,"journal"))
 {
/* On refresh les composants non d�pendents de l'onget Journaux*/
var Composant_0 = TAB_GLOBAL_COMPO[18];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Journaux").hidden=true;
if (top.document.getElementById("Onglet_Journaux").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"journal"))
 {
nb_button++;
top.document.getElementById("Insert_Journaux_Liste_des_journaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Journaux_Liste_des_journaux0").hidden=true;

 }
 if(ALeDroit(4,"journal"))
 {
nb_button++;
top.document.getElementById("Delete_Journaux_Liste_des_journaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Journaux_Liste_des_journaux0").hidden=true;

 }
 if(ALeDroit(1,"journal"))
 {
nb_button++;
top.document.getElementById("Update_Journaux_Liste_des_journaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Journaux_Liste_des_journaux0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Journaux_Liste_des_journaux0").hidden=true;
        top.document.getElementById("Annuler_Journaux_Liste_des_journaux0").hidden=true;
}
 if(ALeDroit(5,"piece"))
 {
/* On refresh les composants non d�pendents de l'onget Pi�ces*/
var Composant_0 = TAB_GLOBAL_COMPO[37];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Pi�ces").hidden=true;
if (top.document.getElementById("Onglet_Pi�ces").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"piece"))
 {
nb_button++;
top.document.getElementById("Insert_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Pi�ces_Liste_des_pi�ces_comptables0").hidden=true;

 }
 if(ALeDroit(4,"piece"))
 {
nb_button++;
top.document.getElementById("Delete_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Pi�ces_Liste_des_pi�ces_comptables0").hidden=true;

 }
 if(ALeDroit(1,"piece"))
 {
nb_button++;
top.document.getElementById("Update_Pi�ces_Liste_des_pi�ces_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Pi�ces_Liste_des_pi�ces_comptables0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Pi�ces_Liste_des_pi�ces_comptables0").hidden=true;
        top.document.getElementById("Annuler_Pi�ces_Liste_des_pi�ces_comptables0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"ecriture"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Pi�ces_�critures_3").hidden=true;

 }
 if(ALeDroit(4,"ecriture"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Pi�ces_�critures_3").hidden=true;

 }
 if(ALeDroit(1,"ecriture"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Pi�ces_�critures_3").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Pi�ces_�critures_3").hidden=true;
        top.document.getElementById("Annuler_Pi�ces_�critures_3").hidden=true;
}
 if(ALeDroit(5,"ecriture"))
 {
/* On refresh les composants non d�pendents de l'onget Ecritures*/
var Composant_0 = TAB_GLOBAL_COMPO[59];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Ecritures").hidden=true;
if (top.document.getElementById("Onglet_Ecritures").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"ecriture"))
 {
nb_button++;
top.document.getElementById("Insert_Ecritures_Liste_des_�critures_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Ecritures_Liste_des_�critures_comptables0").hidden=true;

 }
 if(ALeDroit(4,"ecriture"))
 {
nb_button++;
top.document.getElementById("Delete_Ecritures_Liste_des_�critures_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Ecritures_Liste_des_�critures_comptables0").hidden=true;

 }
 if(ALeDroit(1,"ecriture"))
 {
nb_button++;
top.document.getElementById("Update_Ecritures_Liste_des_�critures_comptables0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Ecritures_Liste_des_�critures_comptables0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Ecritures_Liste_des_�critures_comptables0").hidden=true;
        top.document.getElementById("Annuler_Ecritures_Liste_des_�critures_comptables0").hidden=true;
}
 if(ALeDroit(5,"comptegen"))
 {
/* On refresh les composants non d�pendents de l'onget Comptes g�n�raux*/
var Composant_0 = TAB_GLOBAL_COMPO[70];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Comptes_g�n�raux").hidden=true;
if (top.document.getElementById("Onglet_Comptes_g�n�raux").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"comptegen"))
 {
nb_button++;
top.document.getElementById("Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").hidden=true;

 }
 if(ALeDroit(4,"comptegen"))
 {
nb_button++;
top.document.getElementById("Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").hidden=true;

 }
 if(ALeDroit(1,"comptegen"))
 {
nb_button++;
top.document.getElementById("Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").hidden=true;
        top.document.getElementById("Annuler_Comptes_g�n�raux_Liste_des_comptes_g�n�raux0").hidden=true;
}
 if(ALeDroit(5,"compteaux"))
 {
/* On refresh les composants non d�pendents de l'onget Comptes auxiliaires*/
var Composant_0 = TAB_GLOBAL_COMPO[94];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Comptes_auxiliaires").hidden=true;
if (top.document.getElementById("Onglet_Comptes_auxiliaires").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"compteaux"))
 {
nb_button++;
top.document.getElementById("Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").hidden=true;

 }
 if(ALeDroit(4,"compteaux"))
 {
nb_button++;
top.document.getElementById("Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").hidden=true;

 }
 if(ALeDroit(1,"compteaux"))
 {
nb_button++;
top.document.getElementById("Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").hidden=true;
        top.document.getElementById("Annuler_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0").hidden=true;
}
}
