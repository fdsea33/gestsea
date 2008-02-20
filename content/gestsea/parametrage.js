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
var TAB_COMPO_PPTES = new Array(1066);
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
         FONCTIONS POUR L'ONGLET Acc�s
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Acc�s_0;
function Retour_Acc�s()
{
 if (Filtre_Dep_Acc�s_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Acc�s_0.FctFermetureOnglet();
 }
}
function Gerer_Acc�s(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Acc�s_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Acc�s_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Acc�s");
}

function OuvrirOnglet_Acc�s()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Acc�s");
}

function Insert_Acc�s_Liste_des_niveaux_d_acc�s0()
{
 TAB_COMPO_PPTES[794].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[794].NewCle = getNewCle("acces");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[794].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[798];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[799];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Annuler_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Insert_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Delete_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Update_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[794];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[794].NewCle;
}

function Delete_Acc�s_Liste_des_niveaux_d_acc�s0()
{
 if (TAB_GLOBAL_COMPO[794].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[794];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[794].Action_en_cours = DELETE;
         User_Delete_Acc�s_Liste_des_niveaux_d_acc�s0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Acc�s_0.OnClose(true);
 }
}

function Update_Acc�s_Liste_des_niveaux_d_acc�s0()
{
 if (TAB_GLOBAL_COMPO[794].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[794].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[794].NewCle = TAB_GLOBAL_COMPO[794].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[794].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[798];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[799];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Annuler_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Insert_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Delete_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Update_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
return TAB_COMPO_PPTES[794].NewCle;
}

function Validate_Acc�s_Liste_des_niveaux_d_acc�s0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[794];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[794].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Acc�s_Liste_des_niveaux_d_acc�s0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Acc�s_Liste_des_niveaux_d_acc�s0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[794].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[798];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[799];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Annuler_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Insert_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Delete_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Update_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[794].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Acc�s_0.OnClose(false);
 }
 TAB_COMPO_PPTES[794].Action_en_cours = null;
 return NewCle;
}

function Annuler_Acc�s_Liste_des_niveaux_d_acc�s0()
{
 TAB_COMPO_PPTES[794].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[794].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[798];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[799];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Annuler_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=true;
top.document.getElementById("Insert_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Delete_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
top.document.getElementById("Update_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Adh�rence
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Adh�rence()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Adh�rence");
}

function Insert_Adh�rence_Liste_des_adh�rences0()
{
 TAB_COMPO_PPTES[1006].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1006].NewCle = getNewCle("adherence");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1006].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1012];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1013];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1014];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1018];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Annuler_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Insert_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Delete_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Update_Adh�rence_Liste_des_adh�rences0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1006];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1006].NewCle;
}

function Delete_Adh�rence_Liste_des_adh�rences0()
{
 if (TAB_GLOBAL_COMPO[1006].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1006];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1006].Action_en_cours = DELETE;
         User_Delete_Adh�rence_Liste_des_adh�rences0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Adh�rence_Liste_des_adh�rences0()
{
 if (TAB_GLOBAL_COMPO[1006].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1006].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1006].NewCle = TAB_GLOBAL_COMPO[1006].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1006].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1012];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1013];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1014];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1018];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Annuler_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Insert_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Delete_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Update_Adh�rence_Liste_des_adh�rences0").disabled=true;
return TAB_COMPO_PPTES[1006].NewCle;
}

function Validate_Adh�rence_Liste_des_adh�rences0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1006];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1006].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Adh�rence_Liste_des_adh�rences0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Adh�rence_Liste_des_adh�rences0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1006].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1012];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1013];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1014];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1018];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Annuler_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Insert_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Delete_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Update_Adh�rence_Liste_des_adh�rences0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1006].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1006].Action_en_cours = null;
 return NewCle;
}

function Annuler_Adh�rence_Liste_des_adh�rences0()
{
 TAB_COMPO_PPTES[1006].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1006].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1012];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1013];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1014];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1018];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Annuler_Adh�rence_Liste_des_adh�rences0").disabled=true;
top.document.getElementById("Insert_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Delete_Adh�rence_Liste_des_adh�rences0").disabled=false;
top.document.getElementById("Update_Adh�rence_Liste_des_adh�rences0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Agents
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Agents_0;
 var Filtre_Dep_Agents_1;
function Retour_Agents()
{
 if (Filtre_Dep_Agents_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Agents_0.FctFermetureOnglet();
 }
 if (Filtre_Dep_Agents_1.my_Filtre.getEtat())
 {
         Filtre_Dep_Agents_1.FctFermetureOnglet();
 }
}
function Gerer_Agents(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Agents_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Agents_0.OnClose(true,false);
}
if (Filtre_Dep_Agents_1.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Agents_1.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Agents");
}

function OuvrirOnglet_Agents()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Agents");
}

function Insert_Agents_Liste_des_agents0()
{
 TAB_COMPO_PPTES[918].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[918].NewCle = getNewCle("agent");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[918].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[924];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[925];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[926];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[927];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[928];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[929];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[930];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[931];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[932];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[933];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Annuler_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[918];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[918].NewCle;
}

function Delete_Agents_Liste_des_agents0()
{
 if (TAB_GLOBAL_COMPO[918].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[918];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[918].Action_en_cours = DELETE;
         User_Delete_Agents_Liste_des_agents0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Agents_0.OnClose(true);
        Filtre_Dep_Agents_1.OnClose(true);
 }
}

function Update_Agents_Liste_des_agents0()
{
 if (TAB_GLOBAL_COMPO[918].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[918].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[918].NewCle = TAB_GLOBAL_COMPO[918].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[918].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[924];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[925];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[926];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[927];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[928];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[929];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[930];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[931];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[932];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[933];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Annuler_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=true;
return TAB_COMPO_PPTES[918].NewCle;
}

function Validate_Agents_Liste_des_agents0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[918];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[918].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Agents_Liste_des_agents0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Agents_Liste_des_agents0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[918].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[924];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[925];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[926];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[927];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[928];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[929];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[930];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[931];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[932];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[933];
 Esclave_9.ActiverComposant(false);
top.document.getElementById("Validate_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Annuler_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[918].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Agents_0.OnClose(false);
 Filtre_Dep_Agents_1.OnClose(false);
 }
 TAB_COMPO_PPTES[918].Action_en_cours = null;
 return NewCle;
}

function Annuler_Agents_Liste_des_agents0()
{
 TAB_COMPO_PPTES[918].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[918].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[924];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[925];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[926];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[927];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[928];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[929];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[930];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[931];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[932];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[933];
 Esclave_9.ActiverComposant(false);
top.document.getElementById("Validate_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Annuler_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Cantons
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Cantons_0;
function Retour_Cantons()
{
 if (Filtre_Dep_Cantons_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Cantons_0.FctFermetureOnglet();
 }
}
function Gerer_Cantons(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Cantons_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Cantons_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Cantons");
}

function OuvrirOnglet_Cantons()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Cantons");
}

function Insert_Cantons_Liste_des_cantons0()
{
 TAB_COMPO_PPTES[963].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[963].NewCle = getNewCle("canton");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[963].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[966];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[967];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[963];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[963].NewCle;
}

function Delete_Cantons_Liste_des_cantons0()
{
 if (TAB_GLOBAL_COMPO[963].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[963];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[963].Action_en_cours = DELETE;
         User_Delete_Cantons_Liste_des_cantons0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Cantons_0.OnClose(true);
 }
}

function Update_Cantons_Liste_des_cantons0()
{
 if (TAB_GLOBAL_COMPO[963].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[963].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[963].NewCle = TAB_GLOBAL_COMPO[963].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[963].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[966];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[967];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=true;
return TAB_COMPO_PPTES[963].NewCle;
}

function Validate_Cantons_Liste_des_cantons0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[963];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[963].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Cantons_Liste_des_cantons0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Cantons_Liste_des_cantons0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[963].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[966];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[967];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[963].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Cantons_0.OnClose(false);
 }
 TAB_COMPO_PPTES[963].Action_en_cours = null;
 return NewCle;
}

function Annuler_Cantons_Liste_des_cantons0()
{
 TAB_COMPO_PPTES[963].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[963].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[966];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[967];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Codes postaux
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Codes_postaux()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Codes_postaux");
}

function Insert_Codes_postaux_Liste_des_codes_postaux0()
{
 TAB_COMPO_PPTES[943].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[943].NewCle = getNewCle("codepostal");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[943].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[947];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[948];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[952];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[943];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[943].NewCle;
}

function Delete_Codes_postaux_Liste_des_codes_postaux0()
{
 if (TAB_GLOBAL_COMPO[943].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[943];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[943].Action_en_cours = DELETE;
         User_Delete_Codes_postaux_Liste_des_codes_postaux0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Codes_postaux_Liste_des_codes_postaux0()
{
 if (TAB_GLOBAL_COMPO[943].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[943].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[943].NewCle = TAB_GLOBAL_COMPO[943].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[943].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[947];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[948];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[952];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
return TAB_COMPO_PPTES[943].NewCle;
}

function Validate_Codes_postaux_Liste_des_codes_postaux0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[943];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[943].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Codes_postaux_Liste_des_codes_postaux0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Codes_postaux_Liste_des_codes_postaux0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[943].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[947];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[948];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[952];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[943].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[943].Action_en_cours = null;
 return NewCle;
}

function Annuler_Codes_postaux_Liste_des_codes_postaux0()
{
 TAB_COMPO_PPTES[943].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[943].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[947];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[948];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[952];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Profils de droits
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Profils_de_droits_0;
function Retour_Profils_de_droits()
{
 if (Filtre_Dep_Profils_de_droits_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Profils_de_droits_0.FctFermetureOnglet();
 }
}
function Gerer_Profils_de_droits(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Profils_de_droits_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Profils_de_droits_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Profils_de_droits");
}

function OuvrirOnglet_Profils_de_droits()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Profils_de_droits");
}

function Insert_Profils_de_droits_Liste_des_profils_de_droits0()
{
 TAB_COMPO_PPTES[902].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[902].NewCle = getNewCle("droitprofil");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[902].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[904];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[905];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[902];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[902].NewCle;
}

function Delete_Profils_de_droits_Liste_des_profils_de_droits0()
{
 if (TAB_GLOBAL_COMPO[902].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[902];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[902].Action_en_cours = DELETE;
         User_Delete_Profils_de_droits_Liste_des_profils_de_droits0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Profils_de_droits_0.OnClose(true);
 }
}

function Update_Profils_de_droits_Liste_des_profils_de_droits0()
{
 if (TAB_GLOBAL_COMPO[902].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[902].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[902].NewCle = TAB_GLOBAL_COMPO[902].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[902].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[904];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[905];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
return TAB_COMPO_PPTES[902].NewCle;
}

function Validate_Profils_de_droits_Liste_des_profils_de_droits0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[902];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[902].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Profils_de_droits_Liste_des_profils_de_droits0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Profils_de_droits_Liste_des_profils_de_droits0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[902].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[904];
 Esclave_0.ActiverComposant(false);
Annuler_Profils_de_droits_Droits_2();
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[905];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[902].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Profils_de_droits_0.OnClose(false);
 }
 TAB_COMPO_PPTES[902].Action_en_cours = null;
 return NewCle;
}

function Annuler_Profils_de_droits_Liste_des_profils_de_droits0()
{
 TAB_COMPO_PPTES[902].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[902].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[904];
 Esclave_0.ActiverComposant(false);
Annuler_Profils_de_droits_Droits_2();
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[905];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
}

function Insert_Profils_de_droits_Droits_2()
{
 if (TAB_COMPO_PPTES[902].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Profils_de_droits_Liste_des_profils_de_droits0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Profils_de_droits_Liste_des_profils_de_droits0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                                return -1;
                        }
                        Insert_Profils_de_droits_Droits_2();
                }
                 return;
         }
 TAB_COMPO_PPTES[905].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[905].NewCle = getNewCle("droit");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[905].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[908];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[909];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[910];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[911];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[912];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[905];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[909].my_CompoXUL.value=true;
TAB_GLOBAL_COMPO[909].my_CompoXUL.checked=true;

return TAB_COMPO_PPTES[905].NewCle;
}

function Delete_Profils_de_droits_Droits_2()
{
 if (TAB_GLOBAL_COMPO[905].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[905];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[905].Action_en_cours = DELETE;
         User_Delete_Profils_de_droits_Droits_2(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Profils_de_droits_Droits_2()
{
 if (TAB_GLOBAL_COMPO[905].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[905].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[905].NewCle = TAB_GLOBAL_COMPO[905].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[905].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[908];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[909];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[910];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[911];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[912];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
return TAB_COMPO_PPTES[905].NewCle;
}

function Validate_Profils_de_droits_Droits_2(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[905];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[905].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Profils_de_droits_Droits_2(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Profils_de_droits_Droits_2(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[905].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[908];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[909];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[910];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[911];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[912];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[905].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[905].Action_en_cours = null;
 return NewCle;
}

function Annuler_Profils_de_droits_Droits_2()
{
 TAB_COMPO_PPTES[905].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[905].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[908];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[909];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[910];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[911];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[912];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Employ�s
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Employ�s_0;
function Retour_Employ�s()
{
 if (Filtre_DepFor_Employ�s_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Employ�s_0.FctFermetureOnglet();
 }
}
function Gerer_Employ�s(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas �tre en mode insertion */
if(TAB_COMPO_PPTES[880].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Services_Liste_des_services0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Services_Liste_des_services0();
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
if (Filtre_DepFor_Employ�s_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Employ�s_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Employ�s");
}

function OuvrirOnglet_Employ�s()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Employ�s");
}

function Insert_Employ�s_Liste_des_employ�s0()
{
 TAB_COMPO_PPTES[890].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[890].NewCle = getNewCle("employe");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[890].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[894];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[895];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[896];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[897];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[898];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[899];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[900];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[901];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Annuler_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Insert_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Delete_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Update_Employ�s_Liste_des_employ�s0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[890];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[890].NewCle;
}

function Delete_Employ�s_Liste_des_employ�s0()
{
 if (TAB_GLOBAL_COMPO[890].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[890];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[890].Action_en_cours = DELETE;
         User_Delete_Employ�s_Liste_des_employ�s0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Employ�s_0.Refresh();
 }
}

function Update_Employ�s_Liste_des_employ�s0()
{
 if (TAB_GLOBAL_COMPO[890].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[890].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[890].NewCle = TAB_GLOBAL_COMPO[890].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[890].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[894];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[895];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[896];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[897];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[898];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[899];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[900];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[901];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Annuler_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Insert_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Delete_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Update_Employ�s_Liste_des_employ�s0").disabled=true;
return TAB_COMPO_PPTES[890].NewCle;
}

function Validate_Employ�s_Liste_des_employ�s0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[890];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[890].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Employ�s_Liste_des_employ�s0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Employ�s_Liste_des_employ�s0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[890].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[894];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[895];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[896];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[897];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[898];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[899];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[900];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[901];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Annuler_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Insert_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Delete_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Update_Employ�s_Liste_des_employ�s0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[890].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Employ�s_0.Refresh();
 }
 TAB_COMPO_PPTES[890].Action_en_cours = null;
 return NewCle;
}

function Annuler_Employ�s_Liste_des_employ�s0()
{
 TAB_COMPO_PPTES[890].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[890].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[894];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[895];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[896];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[897];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[898];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[899];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[900];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[901];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Annuler_Employ�s_Liste_des_employ�s0").disabled=true;
top.document.getElementById("Insert_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Delete_Employ�s_Liste_des_employ�s0").disabled=false;
top.document.getElementById("Update_Employ�s_Liste_des_employ�s0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET �quipes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_�quipes_0;
function Retour_�quipes()
{
 if (Filtre_Dep_�quipes_0.my_Filtre.getEtat())
 {
         Filtre_Dep_�quipes_0.FctFermetureOnglet();
 }
}
function Gerer_�quipes(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_�quipes_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_�quipes_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_�quipes");
}

function OuvrirOnglet_�quipes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_�quipes");
}

function Insert_�quipes_Liste_des_�quipes0()
{
 TAB_COMPO_PPTES[934].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[934].NewCle = getNewCle("equipe");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[934].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[936];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Annuler_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Insert_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Delete_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Update_�quipes_Liste_des_�quipes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[934];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[934].NewCle;
}

function Delete_�quipes_Liste_des_�quipes0()
{
 if (TAB_GLOBAL_COMPO[934].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[934];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[934].Action_en_cours = DELETE;
         User_Delete_�quipes_Liste_des_�quipes0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_�quipes_0.OnClose(true);
 }
}

function Update_�quipes_Liste_des_�quipes0()
{
 if (TAB_GLOBAL_COMPO[934].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[934].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[934].NewCle = TAB_GLOBAL_COMPO[934].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[934].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[936];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Annuler_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Insert_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Delete_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Update_�quipes_Liste_des_�quipes0").disabled=true;
return TAB_COMPO_PPTES[934].NewCle;
}

function Validate_�quipes_Liste_des_�quipes0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[934];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[934].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_�quipes_Liste_des_�quipes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_�quipes_Liste_des_�quipes0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[934].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[936];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Annuler_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Insert_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Delete_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Update_�quipes_Liste_des_�quipes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[934].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_�quipes_0.OnClose(false);
 }
 TAB_COMPO_PPTES[934].Action_en_cours = null;
 return NewCle;
}

function Annuler_�quipes_Liste_des_�quipes0()
{
 TAB_COMPO_PPTES[934].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[934].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[936];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Annuler_�quipes_Liste_des_�quipes0").disabled=true;
top.document.getElementById("Insert_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Delete_�quipes_Liste_des_�quipes0").disabled=false;
top.document.getElementById("Update_�quipes_Liste_des_�quipes0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Etats de personne
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Etats_de_personne()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Etats_de_personne");
}

function Insert_Etats_de_personne_Liste_des_�tats_de_personne0()
{
 TAB_COMPO_PPTES[863].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[863].NewCle = getNewCle("etatpersonne");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[863].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[865];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Annuler_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Insert_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Delete_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Update_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[863];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[863].NewCle;
}

function Delete_Etats_de_personne_Liste_des_�tats_de_personne0()
{
 if (TAB_GLOBAL_COMPO[863].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[863];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[863].Action_en_cours = DELETE;
         User_Delete_Etats_de_personne_Liste_des_�tats_de_personne0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Etats_de_personne_Liste_des_�tats_de_personne0()
{
 if (TAB_GLOBAL_COMPO[863].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[863].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[863].NewCle = TAB_GLOBAL_COMPO[863].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[863].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[865];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Annuler_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Insert_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Delete_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Update_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
return TAB_COMPO_PPTES[863].NewCle;
}

function Validate_Etats_de_personne_Liste_des_�tats_de_personne0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[863];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[863].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Etats_de_personne_Liste_des_�tats_de_personne0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Etats_de_personne_Liste_des_�tats_de_personne0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[863].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[865];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Annuler_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Insert_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Delete_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Update_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[863].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[863].Action_en_cours = null;
 return NewCle;
}

function Annuler_Etats_de_personne_Liste_des_�tats_de_personne0()
{
 TAB_COMPO_PPTES[863].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[863].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[865];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Annuler_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Insert_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Delete_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Update_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Groupe de tables
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Groupe_de_tables_0;
function Retour_Groupe_de_tables()
{
 if (Filtre_Dep_Groupe_de_tables_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Groupe_de_tables_0.FctFermetureOnglet();
 }
}
function Gerer_Groupe_de_tables(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Groupe_de_tables_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Groupe_de_tables_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Groupe_de_tables");
}

function OuvrirOnglet_Groupe_de_tables()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Groupe_de_tables");
}

function Insert_Groupe_de_tables_Liste_des_groupes_de_tables0()
{
 TAB_COMPO_PPTES[913].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[913].NewCle = getNewCle("groupetable");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[913].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[916];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[917];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[913];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[913].NewCle;
}

function Delete_Groupe_de_tables_Liste_des_groupes_de_tables0()
{
 if (TAB_GLOBAL_COMPO[913].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[913];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[913].Action_en_cours = DELETE;
         User_Delete_Groupe_de_tables_Liste_des_groupes_de_tables0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Groupe_de_tables_0.OnClose(true);
 }
}

function Update_Groupe_de_tables_Liste_des_groupes_de_tables0()
{
 if (TAB_GLOBAL_COMPO[913].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[913].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[913].NewCle = TAB_GLOBAL_COMPO[913].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[913].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[916];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[917];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
return TAB_COMPO_PPTES[913].NewCle;
}

function Validate_Groupe_de_tables_Liste_des_groupes_de_tables0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[913];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[913].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Groupe_de_tables_Liste_des_groupes_de_tables0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Groupe_de_tables_Liste_des_groupes_de_tables0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[913].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[916];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[917];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[913].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Groupe_de_tables_0.OnClose(false);
 }
 TAB_COMPO_PPTES[913].Action_en_cours = null;
 return NewCle;
}

function Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0()
{
 TAB_COMPO_PPTES[913].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[913].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[916];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[917];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Groupes de cantons
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Groupes_de_cantons()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Groupes_de_cantons");
}

function Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0()
{
 TAB_COMPO_PPTES[831].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[831].NewCle = getNewCle("groupecanton");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[831].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[834];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[838];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[831];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[831].NewCle;
}

function Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0()
{
 if (TAB_GLOBAL_COMPO[831].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[831];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[831].Action_en_cours = DELETE;
         User_Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0()
{
 if (TAB_GLOBAL_COMPO[831].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[831].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[831].NewCle = TAB_GLOBAL_COMPO[831].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[831].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[834];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[838];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
return TAB_COMPO_PPTES[831].NewCle;
}

function Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[831];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[831].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[831].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[834];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[838];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[831].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[831].Action_en_cours = null;
 return NewCle;
}

function Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0()
{
 TAB_COMPO_PPTES[831].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[831].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[834];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[838];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Mod�les d'impressions
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Mod�les_d_impressions()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Mod�les_d_impressions");
}

function Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0()
{
 TAB_COMPO_PPTES[1045].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1045].NewCle = getNewCle("impression");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1045].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1048];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1049];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1050];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1051];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1052];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1053];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1054];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1045];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1045].NewCle;
}

function Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1045].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1045];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1045].Action_en_cours = DELETE;
         User_Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1045].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1045].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1045].NewCle = TAB_GLOBAL_COMPO[1045].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1045].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1048];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1049];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1050];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1051];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1052];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1053];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1054];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
return TAB_COMPO_PPTES[1045].NewCle;
}

function Validate_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1045];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1045].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1045].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1048];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1049];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1050];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1051];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1052];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1053];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1054];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1045].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1045].Action_en_cours = null;
 return NewCle;
}

function Annuler_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0()
{
 TAB_COMPO_PPTES[1045].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1045].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1048];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1049];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1050];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1051];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1052];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1053];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1054];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Impressions
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Impressions()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Impressions");
}

function Insert_Impressions_Liste_des_mod�les_d_impressions0()
{
 TAB_COMPO_PPTES[1055].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1055].NewCle = getNewCle("table_impression");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1055].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1058];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1059];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1060];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1061];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1062];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1063];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1064];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1065];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Insert_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Delete_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Update_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1055];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1055].NewCle;
}

function Delete_Impressions_Liste_des_mod�les_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1055].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1055];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1055].Action_en_cours = DELETE;
         User_Delete_Impressions_Liste_des_mod�les_d_impressions0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Impressions_Liste_des_mod�les_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1055].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1055].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1055].NewCle = TAB_GLOBAL_COMPO[1055].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1055].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1058];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1059];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1060];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1061];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1062];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1063];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1064];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1065];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Insert_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Delete_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Update_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
return TAB_COMPO_PPTES[1055].NewCle;
}

function Validate_Impressions_Liste_des_mod�les_d_impressions0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1055];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1055].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Impressions_Liste_des_mod�les_d_impressions0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Impressions_Liste_des_mod�les_d_impressions0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1055].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1058];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1059];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1060];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1061];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1062];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1063];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1064];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1065];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Insert_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Delete_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Update_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1055].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1055].Action_en_cours = null;
 return NewCle;
}

function Annuler_Impressions_Liste_des_mod�les_d_impressions0()
{
 TAB_COMPO_PPTES[1055].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1055].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1058];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1059];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1060];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1061];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1062];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1063];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1064];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1065];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Impressions_Liste_des_mod�les_d_impressions0").disabled=true;
top.document.getElementById("Insert_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Delete_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
top.document.getElementById("Update_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Mod�les
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Mod�les()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Mod�les");
}

function Insert_Mod�les_Liste_des_mod�les0()
{
 TAB_COMPO_PPTES[1033].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1033].NewCle = getNewCle("modele");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1033].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1035];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1036];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Annuler_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Insert_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Delete_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Update_Mod�les_Liste_des_mod�les0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1033];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1033].NewCle;
}

function Delete_Mod�les_Liste_des_mod�les0()
{
 if (TAB_GLOBAL_COMPO[1033].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1033];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1033].Action_en_cours = DELETE;
         User_Delete_Mod�les_Liste_des_mod�les0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Mod�les_Liste_des_mod�les0()
{
 if (TAB_GLOBAL_COMPO[1033].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1033].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1033].NewCle = TAB_GLOBAL_COMPO[1033].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1033].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1035];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1036];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Annuler_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Insert_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Delete_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Update_Mod�les_Liste_des_mod�les0").disabled=true;
return TAB_COMPO_PPTES[1033].NewCle;
}

function Validate_Mod�les_Liste_des_mod�les0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1033];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1033].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Mod�les_Liste_des_mod�les0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Mod�les_Liste_des_mod�les0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1033].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1035];
 Esclave_0.ActiverComposant(false);
Annuler_Mod�les_Lignes_du_mod�le_2();
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1036];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Annuler_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Insert_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Delete_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Update_Mod�les_Liste_des_mod�les0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1033].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1033].Action_en_cours = null;
 return NewCle;
}

function Annuler_Mod�les_Liste_des_mod�les0()
{
 TAB_COMPO_PPTES[1033].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1033].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1035];
 Esclave_0.ActiverComposant(false);
Annuler_Mod�les_Lignes_du_mod�le_2();
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1036];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Annuler_Mod�les_Liste_des_mod�les0").disabled=true;
top.document.getElementById("Insert_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Delete_Mod�les_Liste_des_mod�les0").disabled=false;
top.document.getElementById("Update_Mod�les_Liste_des_mod�les0").disabled=false;
}

function Insert_Mod�les_Lignes_du_mod�le_2()
{
 if (TAB_COMPO_PPTES[1033].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Mod�les_Liste_des_mod�les0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Mod�les_Liste_des_mod�les0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                                return -1;
                        }
                        Insert_Mod�les_Lignes_du_mod�le_2();
                }
                 return;
         }
 TAB_COMPO_PPTES[1036].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1036].NewCle = getNewCle("lignemodele");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1036].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1041];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1042];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1043];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1044];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1036];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1036].NewCle;
}

function Delete_Mod�les_Lignes_du_mod�le_2()
{
 if (TAB_GLOBAL_COMPO[1036].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1036];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1036].Action_en_cours = DELETE;
         User_Delete_Mod�les_Lignes_du_mod�le_2(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Mod�les_Lignes_du_mod�le_2()
{
 if (TAB_GLOBAL_COMPO[1036].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1036].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1036].NewCle = TAB_GLOBAL_COMPO[1036].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1036].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1041];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1042];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1043];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1044];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=true;
return TAB_COMPO_PPTES[1036].NewCle;
}

function Validate_Mod�les_Lignes_du_mod�le_2(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1036];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1036].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Mod�les_Lignes_du_mod�le_2(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Mod�les_Lignes_du_mod�le_2(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1036].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1041];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1042];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1043];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1044];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1036].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1036].Action_en_cours = null;
 return NewCle;
}

function Annuler_Mod�les_Lignes_du_mod�le_2()
{
 TAB_COMPO_PPTES[1036].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1036].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1041];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1042];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1043];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1044];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").disabled=true;
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").disabled=false;
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Mode de r�glements
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Mode_de_r�glements()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Mode_de_r�glements");
}

function Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0()
{
 TAB_COMPO_PPTES[800].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[800].NewCle = getNewCle("modereglement");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[800].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[804];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[805];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[806];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[807];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[808];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[809];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Annuler_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[800];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[800].NewCle;
}

function Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0()
{
 if (TAB_GLOBAL_COMPO[800].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[800];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[800].Action_en_cours = DELETE;
         User_Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0()
{
 if (TAB_GLOBAL_COMPO[800].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[800].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[800].NewCle = TAB_GLOBAL_COMPO[800].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[800].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[804];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[805];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[806];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[807];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[808];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[809];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Annuler_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
return TAB_COMPO_PPTES[800].NewCle;
}

function Validate_Mode_de_r�glements_Liste_des_modes_de_r�glement0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[800];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[800].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[800].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[804];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[805];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[806];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[807];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[808];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[809];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Annuler_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[800].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[800].Action_en_cours = null;
 return NewCle;
}

function Annuler_Mode_de_r�glements_Liste_des_modes_de_r�glement0()
{
 TAB_COMPO_PPTES[800].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[800].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[804];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[805];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[806];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[807];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[808];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[809];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Annuler_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=true;
top.document.getElementById("Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
top.document.getElementById("Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Modes de r�partition
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Modes_de_r�partition()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Modes_de_r�partition");
}

function Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0()
{
 TAB_COMPO_PPTES[810].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[810].NewCle = getNewCle("moderepartition");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[810].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[818];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Annuler_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[810];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[810].NewCle;
}

function Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0()
{
 if (TAB_GLOBAL_COMPO[810].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[810];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[810].Action_en_cours = DELETE;
         User_Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0()
{
 if (TAB_GLOBAL_COMPO[810].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[810].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[810].NewCle = TAB_GLOBAL_COMPO[810].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[810].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[818];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Annuler_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
return TAB_COMPO_PPTES[810].NewCle;
}

function Validate_Modes_de_r�partition_Liste_des_modes_de_r�partition0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[810];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[810].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[810].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[818];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Annuler_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[810].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[810].Action_en_cours = null;
 return NewCle;
}

function Annuler_Modes_de_r�partition_Liste_des_modes_de_r�partition0()
{
 TAB_COMPO_PPTES[810].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[810].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[818];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Annuler_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=true;
top.document.getElementById("Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
top.document.getElementById("Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Natures de personne
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Natures_de_personne()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Natures_de_personne");
}

function Insert_Natures_de_personne_Liste_des_�tats_de_personne0()
{
 TAB_COMPO_PPTES[852].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[852].NewCle = getNewCle("naturepersonne");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[852].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[857];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[858];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[859];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[860];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[861];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[862];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Update_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[852];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[852].NewCle;
}

function Delete_Natures_de_personne_Liste_des_�tats_de_personne0()
{
 if (TAB_GLOBAL_COMPO[852].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[852];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[852].Action_en_cours = DELETE;
         User_Delete_Natures_de_personne_Liste_des_�tats_de_personne0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Natures_de_personne_Liste_des_�tats_de_personne0()
{
 if (TAB_GLOBAL_COMPO[852].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[852].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[852].NewCle = TAB_GLOBAL_COMPO[852].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[852].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[857];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[858];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[859];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[860];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[861];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[862];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Update_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
return TAB_COMPO_PPTES[852].NewCle;
}

function Validate_Natures_de_personne_Liste_des_�tats_de_personne0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[852];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[852].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Natures_de_personne_Liste_des_�tats_de_personne0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Natures_de_personne_Liste_des_�tats_de_personne0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[852].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[857];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[858];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[859];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[860];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[861];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[862];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Update_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[852].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[852].Action_en_cours = null;
 return NewCle;
}

function Annuler_Natures_de_personne_Liste_des_�tats_de_personne0()
{
 TAB_COMPO_PPTES[852].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[852].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[857];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[858];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[859];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[860];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[861];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[862];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=true;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
top.document.getElementById("Update_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET P�riodes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_P�riodes_0;
function Retour_P�riodes()
{
 if (Filtre_Dep_P�riodes_0.my_Filtre.getEtat())
 {
         Filtre_Dep_P�riodes_0.FctFermetureOnglet();
 }
}
function Gerer_P�riodes(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_P�riodes_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_P�riodes_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_P�riodes");
}

function OuvrirOnglet_P�riodes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_P�riodes");
}

function Insert_P�riodes_Liste_des_p�riodes0()
{
 TAB_COMPO_PPTES[1021].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1021].NewCle = getNewCle("periode");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1021].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1025];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1026];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Annuler_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Insert_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Delete_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Update_P�riodes_Liste_des_p�riodes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1021];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1021].NewCle;
}

function Delete_P�riodes_Liste_des_p�riodes0()
{
 if (TAB_GLOBAL_COMPO[1021].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1021];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1021].Action_en_cours = DELETE;
         User_Delete_P�riodes_Liste_des_p�riodes0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_P�riodes_0.OnClose(true);
 }
}

function Update_P�riodes_Liste_des_p�riodes0()
{
 if (TAB_GLOBAL_COMPO[1021].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1021].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1021].NewCle = TAB_GLOBAL_COMPO[1021].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1021].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1025];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1026];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Annuler_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Insert_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Delete_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Update_P�riodes_Liste_des_p�riodes0").disabled=true;
return TAB_COMPO_PPTES[1021].NewCle;
}

function Validate_P�riodes_Liste_des_p�riodes0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1021];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1021].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_P�riodes_Liste_des_p�riodes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_P�riodes_Liste_des_p�riodes0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1021].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1025];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1026];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Annuler_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Insert_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Delete_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Update_P�riodes_Liste_des_p�riodes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1021].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_P�riodes_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1021].Action_en_cours = null;
 return NewCle;
}

function Annuler_P�riodes_Liste_des_p�riodes0()
{
 TAB_COMPO_PPTES[1021].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1021].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1025];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1026];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Annuler_P�riodes_Liste_des_p�riodes0").disabled=true;
top.document.getElementById("Insert_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Delete_P�riodes_Liste_des_p�riodes0").disabled=false;
top.document.getElementById("Update_P�riodes_Liste_des_p�riodes0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Pr�fixes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Pr�fixes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Pr�fixes");
}

function Insert_Pr�fixes_Liste_des_pr�fixes0()
{
 TAB_COMPO_PPTES[1030].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1030].NewCle = getNewCle("prefixe");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1030].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1032];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Annuler_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Insert_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Delete_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Update_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1030];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1030].NewCle;
}

function Delete_Pr�fixes_Liste_des_pr�fixes0()
{
 if (TAB_GLOBAL_COMPO[1030].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1030];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1030].Action_en_cours = DELETE;
         User_Delete_Pr�fixes_Liste_des_pr�fixes0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Pr�fixes_Liste_des_pr�fixes0()
{
 if (TAB_GLOBAL_COMPO[1030].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1030].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1030].NewCle = TAB_GLOBAL_COMPO[1030].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1030].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1032];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Annuler_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Insert_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Delete_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Update_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
return TAB_COMPO_PPTES[1030].NewCle;
}

function Validate_Pr�fixes_Liste_des_pr�fixes0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1030];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1030].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Pr�fixes_Liste_des_pr�fixes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Pr�fixes_Liste_des_pr�fixes0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1030].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1032];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Annuler_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Insert_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Delete_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Update_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1030].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1030].Action_en_cours = null;
 return NewCle;
}

function Annuler_Pr�fixes_Liste_des_pr�fixes0()
{
 TAB_COMPO_PPTES[1030].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1030].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1032];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Annuler_Pr�fixes_Liste_des_pr�fixes0").disabled=true;
top.document.getElementById("Insert_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Delete_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
top.document.getElementById("Update_Pr�fixes_Liste_des_pr�fixes0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Produits
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Produits_0;
 var Filtre_Dep_Produits_1;
function Retour_Produits()
{
 if (Filtre_Dep_Produits_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Produits_0.FctFermetureOnglet();
 }
 if (Filtre_Dep_Produits_1.my_Filtre.getEtat())
 {
         Filtre_Dep_Produits_1.FctFermetureOnglet();
 }
}
function Gerer_Produits(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Produits_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Produits_0.OnClose(true,false);
}
if (Filtre_Dep_Produits_1.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Produits_1.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Produits");
}

function OuvrirOnglet_Produits()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Produits");
}

function Insert_Produits_Liste_des_produits0()
{
 TAB_COMPO_PPTES[984].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[984].NewCle = getNewCle("produit");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[984].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[987];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[988];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[989];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[990];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[991];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[992];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
 var Esclave_6=TAB_GLOBAL_COMPO[993];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1001];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[984];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[990].my_CompoXUL.value=true;
TAB_GLOBAL_COMPO[990].my_CompoXUL.checked=true;

return TAB_COMPO_PPTES[984].NewCle;
}

function Delete_Produits_Liste_des_produits0()
{
 if (TAB_GLOBAL_COMPO[984].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[984];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[984].Action_en_cours = DELETE;
         User_Delete_Produits_Liste_des_produits0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Produits_0.OnClose(true);
        Filtre_Dep_Produits_1.OnClose(true);
 }
}

function Update_Produits_Liste_des_produits0()
{
 if (TAB_GLOBAL_COMPO[984].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[984].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[984].NewCle = TAB_GLOBAL_COMPO[984].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[984].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[987];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[988];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[989];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[990];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[991];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[992];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
 var Esclave_6=TAB_GLOBAL_COMPO[993];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1001];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=true;
return TAB_COMPO_PPTES[984].NewCle;
}

function Validate_Produits_Liste_des_produits0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[984];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[984].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Produits_Liste_des_produits0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Produits_Liste_des_produits0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[984].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[987];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[988];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[989];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[990];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[991];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[992];
 Esclave_5.ActiverComposant(false);
Annuler_Produits_Prix_7();
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
 var Esclave_6=TAB_GLOBAL_COMPO[993];
 Esclave_6.ActiverComposant(false);
Annuler_Produits_Comptes_g�n�raux_11();
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1001];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[984].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Produits_0.OnClose(false);
 Filtre_Dep_Produits_1.OnClose(false);
 }
 TAB_COMPO_PPTES[984].Action_en_cours = null;
 return NewCle;
}

function Annuler_Produits_Liste_des_produits0()
{
 TAB_COMPO_PPTES[984].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[984].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[987];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[988];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[989];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[990];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[991];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[992];
 Esclave_5.ActiverComposant(false);
Annuler_Produits_Prix_7();
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
 var Esclave_6=TAB_GLOBAL_COMPO[993];
 Esclave_6.ActiverComposant(false);
Annuler_Produits_Comptes_g�n�raux_11();
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1001];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=false;
}

function Insert_Produits_Prix_7()
{
 if (TAB_COMPO_PPTES[984].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Produits_Liste_des_produits0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Produits_Liste_des_produits0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                                return -1;
                        }
                        Insert_Produits_Prix_7();
                }
                 return;
         }
 TAB_COMPO_PPTES[993].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[993].NewCle = getNewCle("prix");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[993].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=false;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=false;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[993];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[1000].my_CompoXUL.selectedIndex=1;

return TAB_COMPO_PPTES[993].NewCle;
}

function Delete_Produits_Prix_7()
{
 if (TAB_GLOBAL_COMPO[993].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[993];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[993].Action_en_cours = DELETE;
         User_Delete_Produits_Prix_7(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Produits_Prix_7()
{
 if (TAB_GLOBAL_COMPO[993].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[993].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[993].NewCle = TAB_GLOBAL_COMPO[993].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[993].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=false;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=false;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
return TAB_COMPO_PPTES[993].NewCle;
}

function Validate_Produits_Prix_7(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[993];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[993].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Produits_Prix_7(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Produits_Prix_7(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[993].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[993].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[993].Action_en_cours = null;
 return NewCle;
}

function Annuler_Produits_Prix_7()
{
 TAB_COMPO_PPTES[993].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[993].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
}

function Insert_Produits_Comptes_g�n�raux_11()
{
 if (TAB_COMPO_PPTES[984].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Produits_Liste_des_produits0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Produits_Liste_des_produits0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                                return -1;
                        }
                        Insert_Produits_Comptes_g�n�raux_11();
                }
                 return;
         }
 TAB_COMPO_PPTES[1001].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1001].NewCle = getNewCle("compteproduit");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1001].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1004];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1005];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1001];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1001].NewCle;
}

function Delete_Produits_Comptes_g�n�raux_11()
{
 if (TAB_GLOBAL_COMPO[1001].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1001];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1001].Action_en_cours = DELETE;
         User_Delete_Produits_Comptes_g�n�raux_11(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Produits_Comptes_g�n�raux_11()
{
 if (TAB_GLOBAL_COMPO[1001].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1001].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1001].NewCle = TAB_GLOBAL_COMPO[1001].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1001].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1004];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1005];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=true;
return TAB_COMPO_PPTES[1001].NewCle;
}

function Validate_Produits_Comptes_g�n�raux_11(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1001];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1001].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Produits_Comptes_g�n�raux_11(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Produits_Comptes_g�n�raux_11(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1001].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1004];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1005];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1001].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1001].Action_en_cours = null;
 return NewCle;
}

function Annuler_Produits_Comptes_g�n�raux_11()
{
 TAB_COMPO_PPTES[1001].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1001].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1004];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1005];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Responsabilit�s
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Responsabilit�s()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Responsabilit�s");
}

function Insert_Responsabilit�s_Responsabilit�s0()
{
 TAB_COMPO_PPTES[969].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[969].NewCle = getNewCle("responsabilite");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[969].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[973];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[974];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[975];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Annuler_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Insert_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Delete_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Update_Responsabilit�s_Responsabilit�s0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[969];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[969].NewCle;
}

function Delete_Responsabilit�s_Responsabilit�s0()
{
 if (TAB_GLOBAL_COMPO[969].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[969];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[969].Action_en_cours = DELETE;
         User_Delete_Responsabilit�s_Responsabilit�s0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Responsabilit�s_Responsabilit�s0()
{
 if (TAB_GLOBAL_COMPO[969].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[969].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[969].NewCle = TAB_GLOBAL_COMPO[969].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[969].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[973];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[974];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[975];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Annuler_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Insert_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Delete_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Update_Responsabilit�s_Responsabilit�s0").disabled=true;
return TAB_COMPO_PPTES[969].NewCle;
}

function Validate_Responsabilit�s_Responsabilit�s0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[969];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[969].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Responsabilit�s_Responsabilit�s0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Responsabilit�s_Responsabilit�s0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[969].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[973];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[974];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[975];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Annuler_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Insert_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Delete_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Update_Responsabilit�s_Responsabilit�s0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[969].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[969].Action_en_cours = null;
 return NewCle;
}

function Annuler_Responsabilit�s_Responsabilit�s0()
{
 TAB_COMPO_PPTES[969].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[969].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[973];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[974];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[975];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Annuler_Responsabilit�s_Responsabilit�s0").disabled=true;
top.document.getElementById("Insert_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Delete_Responsabilit�s_Responsabilit�s0").disabled=false;
top.document.getElementById("Update_Responsabilit�s_Responsabilit�s0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Services
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Services_0;
function Retour_Services()
{
 if (Filtre_DepFor_Services_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Services_0.FctFermetureOnglet();
 }
}
function Gerer_Services(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas �tre en mode insertion */
if(TAB_COMPO_PPTES[869].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Soci�t�s_Liste_des_soci�t�s0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Soci�t�s_Liste_des_soci�t�s0();
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
if (Filtre_DepFor_Services_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Services_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Services");
}

function OuvrirOnglet_Services()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Services");
}

function Insert_Services_Liste_des_services0()
{
 TAB_COMPO_PPTES[880].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[880].NewCle = getNewCle("service");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[880].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[884];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[885];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[886];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[880];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[880].NewCle;
}

function Delete_Services_Liste_des_services0()
{
 if (TAB_GLOBAL_COMPO[880].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[880];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[880].Action_en_cours = DELETE;
         User_Delete_Services_Liste_des_services0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Services_0.Refresh();
 }
}

function Update_Services_Liste_des_services0()
{
 if (TAB_GLOBAL_COMPO[880].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[880].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[880].NewCle = TAB_GLOBAL_COMPO[880].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[880].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[884];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[885];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[886];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=true;
return TAB_COMPO_PPTES[880].NewCle;
}

function Validate_Services_Liste_des_services0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[880];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[880].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Services_Liste_des_services0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Services_Liste_des_services0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[880].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[884];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[885];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[886];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[880].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Services_0.Refresh();
 }
 TAB_COMPO_PPTES[880].Action_en_cours = null;
 return NewCle;
}

function Annuler_Services_Liste_des_services0()
{
 TAB_COMPO_PPTES[880].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[880].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[884];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[885];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[886];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Soci�t�s
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Soci�t�s()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Soci�t�s");
}

function Insert_Soci�t�s_Liste_des_soci�t�s0()
{
 TAB_COMPO_PPTES[869].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[869].NewCle = getNewCle("societe");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[869].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[872];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[873];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[874];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[875];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[876];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[877];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Annuler_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Insert_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Delete_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Update_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[869];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[869].NewCle;
}

function Delete_Soci�t�s_Liste_des_soci�t�s0()
{
 if (TAB_GLOBAL_COMPO[869].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[869];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[869].Action_en_cours = DELETE;
         User_Delete_Soci�t�s_Liste_des_soci�t�s0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Soci�t�s_Liste_des_soci�t�s0()
{
 if (TAB_GLOBAL_COMPO[869].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[869].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[869].NewCle = TAB_GLOBAL_COMPO[869].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[869].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[872];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[873];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[874];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[875];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[876];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[877];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Annuler_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Insert_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Delete_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Update_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
return TAB_COMPO_PPTES[869].NewCle;
}

function Validate_Soci�t�s_Liste_des_soci�t�s0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[869];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[869].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Soci�t�s_Liste_des_soci�t�s0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Soci�t�s_Liste_des_soci�t�s0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[869].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[872];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[873];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[874];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[875];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[876];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[877];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Annuler_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Insert_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Delete_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Update_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[869].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[869].Action_en_cours = null;
 return NewCle;
}

function Annuler_Soci�t�s_Liste_des_soci�t�s0()
{
 TAB_COMPO_PPTES[869].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[869].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[872];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[873];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[874];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[875];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[876];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[877];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Annuler_Soci�t�s_Liste_des_soci�t�s0").disabled=true;
top.document.getElementById("Insert_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Delete_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
top.document.getElementById("Update_Soci�t�s_Liste_des_soci�t�s0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET TVA
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_TVA_0;
function Retour_TVA()
{
 if (Filtre_Dep_TVA_0.my_Filtre.getEtat())
 {
         Filtre_Dep_TVA_0.FctFermetureOnglet();
 }
}
function Gerer_TVA(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_TVA_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_TVA_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_TVA");
}

function OuvrirOnglet_TVA()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_TVA");
}

function Insert_TVA_Liste_des_T_V_A_0()
{
 TAB_COMPO_PPTES[976].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[976].NewCle = getNewCle("tva");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[976].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[980];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[981];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[982];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[983];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[976];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[976].NewCle;
}

function Delete_TVA_Liste_des_T_V_A_0()
{
 if (TAB_GLOBAL_COMPO[976].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[976];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[976].Action_en_cours = DELETE;
         User_Delete_TVA_Liste_des_T_V_A_0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_TVA_0.OnClose(true);
 }
}

function Update_TVA_Liste_des_T_V_A_0()
{
 if (TAB_GLOBAL_COMPO[976].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[976].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[976].NewCle = TAB_GLOBAL_COMPO[976].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[976].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[980];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[981];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[982];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[983];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=true;
return TAB_COMPO_PPTES[976].NewCle;
}

function Validate_TVA_Liste_des_T_V_A_0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[976];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[976].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_TVA_Liste_des_T_V_A_0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_TVA_Liste_des_T_V_A_0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[976].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[980];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[981];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[982];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[983];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[976].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_TVA_0.OnClose(false);
 }
 TAB_COMPO_PPTES[976].Action_en_cours = null;
 return NewCle;
}

function Annuler_TVA_Liste_des_T_V_A_0()
{
 TAB_COMPO_PPTES[976].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[976].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[980];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[981];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[982];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[983];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types d'adresses
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Types_d_adresses()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_d_adresses");
}

function Insert_Types_d_adresses_Liste_des_types_d_adresses0()
{
 TAB_COMPO_PPTES[846].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[846].NewCle = getNewCle("typeadresse");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[846].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[848];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[846];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[846].NewCle;
}

function Delete_Types_d_adresses_Liste_des_types_d_adresses0()
{
 if (TAB_GLOBAL_COMPO[846].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[846];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[846].Action_en_cours = DELETE;
         User_Delete_Types_d_adresses_Liste_des_types_d_adresses0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_d_adresses_Liste_des_types_d_adresses0()
{
 if (TAB_GLOBAL_COMPO[846].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[846].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[846].NewCle = TAB_GLOBAL_COMPO[846].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[846].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[848];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
return TAB_COMPO_PPTES[846].NewCle;
}

function Validate_Types_d_adresses_Liste_des_types_d_adresses0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[846];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[846].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_d_adresses_Liste_des_types_d_adresses0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_d_adresses_Liste_des_types_d_adresses0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[846].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[848];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[846].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[846].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_d_adresses_Liste_des_types_d_adresses0()
{
 TAB_COMPO_PPTES[846].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[846].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[848];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types d'attribut
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Types_d_attribut()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_d_attribut");
}

function Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0()
{
 TAB_COMPO_PPTES[823].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[823].NewCle = getNewCle("typeattribut");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[823].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[826];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[827];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[823];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[823].NewCle;
}

function Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0()
{
 if (TAB_GLOBAL_COMPO[823].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[823];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[823].Action_en_cours = DELETE;
         User_Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0()
{
 if (TAB_GLOBAL_COMPO[823].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[823].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[823].NewCle = TAB_GLOBAL_COMPO[823].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[823].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[826];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[827];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
return TAB_COMPO_PPTES[823].NewCle;
}

function Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[823];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[823].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[823].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[826];
 Esclave_0.ActiverComposant(false);
Annuler_Types_d_attribut_Cat�gories_2();
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[827];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[823].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[823].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0()
{
 TAB_COMPO_PPTES[823].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[823].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[826];
 Esclave_0.ActiverComposant(false);
Annuler_Types_d_attribut_Cat�gories_2();
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[827];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
}

function Insert_Types_d_attribut_Cat�gories_2()
{
 if (TAB_COMPO_PPTES[823].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas �tais correctement ins�r�");
                                return -1;
                        }
                        Insert_Types_d_attribut_Cat�gories_2();
                }
                 return;
         }
 TAB_COMPO_PPTES[827].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[827].NewCle = getNewCle("categorie");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[827].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[829];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[830];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[827];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[827].NewCle;
}

function Delete_Types_d_attribut_Cat�gories_2()
{
 if (TAB_GLOBAL_COMPO[827].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[827];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[827].Action_en_cours = DELETE;
         User_Delete_Types_d_attribut_Cat�gories_2(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_d_attribut_Cat�gories_2()
{
 if (TAB_GLOBAL_COMPO[827].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[827].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[827].NewCle = TAB_GLOBAL_COMPO[827].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[827].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[829];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[830];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=true;
return TAB_COMPO_PPTES[827].NewCle;
}

function Validate_Types_d_attribut_Cat�gories_2(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[827];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[827].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_d_attribut_Cat�gories_2(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_d_attribut_Cat�gories_2(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[827].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[829];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[830];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[827].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[827].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_d_attribut_Cat�gories_2()
{
 TAB_COMPO_PPTES[827].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[827].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[829];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[830];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de contacts
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Types_de_contacts()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_contacts");
}

function Insert_Types_de_contacts_Liste_des_types_de_contacts0()
{
 TAB_COMPO_PPTES[955].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[955].NewCle = getNewCle("contacttype");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[955].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[958];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[959];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[960];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[961];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[962];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[955];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[955].NewCle;
}

function Delete_Types_de_contacts_Liste_des_types_de_contacts0()
{
 if (TAB_GLOBAL_COMPO[955].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[955];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[955].Action_en_cours = DELETE;
         User_Delete_Types_de_contacts_Liste_des_types_de_contacts0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_contacts_Liste_des_types_de_contacts0()
{
 if (TAB_GLOBAL_COMPO[955].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[955].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[955].NewCle = TAB_GLOBAL_COMPO[955].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[955].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[958];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[959];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[960];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[961];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[962];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
return TAB_COMPO_PPTES[955].NewCle;
}

function Validate_Types_de_contacts_Liste_des_types_de_contacts0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[955];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[955].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_contacts_Liste_des_types_de_contacts0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_contacts_Liste_des_types_de_contacts0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[955].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[958];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[959];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[960];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[961];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[962];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[955].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[955].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_contacts_Liste_des_types_de_contacts0()
{
 TAB_COMPO_PPTES[955].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[955].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[958];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[959];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[960];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[961];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[962];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de journaux
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Types_de_journaux()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_journaux");
}

function Insert_Types_de_journaux_Liste_des_types_de_journaux0()
{
 TAB_COMPO_PPTES[1027].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1027].NewCle = getNewCle("typejournal");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1027].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1029];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1027];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1027].NewCle;
}

function Delete_Types_de_journaux_Liste_des_types_de_journaux0()
{
 if (TAB_GLOBAL_COMPO[1027].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1027];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1027].Action_en_cours = DELETE;
         User_Delete_Types_de_journaux_Liste_des_types_de_journaux0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_journaux_Liste_des_types_de_journaux0()
{
 if (TAB_GLOBAL_COMPO[1027].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[1027].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[1027].NewCle = TAB_GLOBAL_COMPO[1027].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1027].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1029];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
return TAB_COMPO_PPTES[1027].NewCle;
}

function Validate_Types_de_journaux_Liste_des_types_de_journaux0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1027];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1027].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_journaux_Liste_des_types_de_journaux0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_journaux_Liste_des_types_de_journaux0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1027].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1029];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1027].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1027].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_journaux_Liste_des_types_de_journaux0()
{
 TAB_COMPO_PPTES[1027].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[1027].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1029];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de lien
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Types_de_lien_0;
function Retour_Types_de_lien()
{
 if (Filtre_Dep_Types_de_lien_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Types_de_lien_0.FctFermetureOnglet();
 }
}
function Gerer_Types_de_lien(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Types_de_lien_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Types_de_lien_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_lien");
}

function OuvrirOnglet_Types_de_lien()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_lien");
}

function Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0()
{
 TAB_COMPO_PPTES[840].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[840].NewCle = getNewCle("typelien");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[840].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[842];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[843];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[844];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[845];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[840];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[840].NewCle;
}

function Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0()
{
 if (TAB_GLOBAL_COMPO[840].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[840];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[840].Action_en_cours = DELETE;
         User_Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Types_de_lien_0.OnClose(true);
 }
}

function Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0()
{
 if (TAB_GLOBAL_COMPO[840].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[840].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[840].NewCle = TAB_GLOBAL_COMPO[840].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[840].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[842];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[843];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[844];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[845];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
return TAB_COMPO_PPTES[840].NewCle;
}

function Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[840];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[840].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[840].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[842];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[843];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[844];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[845];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[840].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Types_de_lien_0.OnClose(false);
 }
 TAB_COMPO_PPTES[840].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0()
{
 TAB_COMPO_PPTES[840].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[840].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[842];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[843];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[844];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[845];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de personne
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Types_de_personne()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_personne");
}

function Insert_Types_de_personne_Liste_des_types_de_personne0()
{
 TAB_COMPO_PPTES[849].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[849].NewCle = getNewCle("typepersonne");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[849].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[851];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[849];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[849].NewCle;
}

function Delete_Types_de_personne_Liste_des_types_de_personne0()
{
 if (TAB_GLOBAL_COMPO[849].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[849];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[849].Action_en_cours = DELETE;
         User_Delete_Types_de_personne_Liste_des_types_de_personne0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_personne_Liste_des_types_de_personne0()
{
 if (TAB_GLOBAL_COMPO[849].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[849].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[849].NewCle = TAB_GLOBAL_COMPO[849].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[849].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[851];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
return TAB_COMPO_PPTES[849].NewCle;
}

function Validate_Types_de_personne_Liste_des_types_de_personne0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[849];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[849].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_personne_Liste_des_types_de_personne0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_personne_Liste_des_types_de_personne0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[849].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[851];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[849].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[849].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_personne_Liste_des_types_de_personne0()
{
 TAB_COMPO_PPTES[849].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[849].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[851];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de soci�t�s
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Types_de_soci�t�s_0;
function Retour_Types_de_soci�t�s()
{
 if (Filtre_Dep_Types_de_soci�t�s_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Types_de_soci�t�s_0.FctFermetureOnglet();
 }
}
function Gerer_Types_de_soci�t�s(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Types_de_soci�t�s_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Types_de_soci�t�s_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_soci�t�s");
}

function OuvrirOnglet_Types_de_soci�t�s()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_soci�t�s");
}

function Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0()
{
 TAB_COMPO_PPTES[866].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[866].NewCle = getNewCle("typesociete");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[866].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[868];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Annuler_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[866];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[866].NewCle;
}

function Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0()
{
 if (TAB_GLOBAL_COMPO[866].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[866];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[866].Action_en_cours = DELETE;
         User_Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Types_de_soci�t�s_0.OnClose(true);
 }
}

function Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0()
{
 if (TAB_GLOBAL_COMPO[866].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[866].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[866].NewCle = TAB_GLOBAL_COMPO[866].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[866].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[868];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Annuler_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
return TAB_COMPO_PPTES[866].NewCle;
}

function Validate_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[866];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[866].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[866].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[868];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Annuler_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[866].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Types_de_soci�t�s_0.OnClose(false);
 }
 TAB_COMPO_PPTES[866].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0()
{
 TAB_COMPO_PPTES[866].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[866].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[868];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Annuler_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=true;
top.document.getElementById("Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
top.document.getElementById("Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de t�ches
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Types_de_t�ches()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_t�ches");
}

function Insert_Types_de_t�ches_Liste_des_types_de_t�ches0()
{
 TAB_COMPO_PPTES[819].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[819].NewCle = getNewCle("typetache");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[819].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[821];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[822];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Annuler_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Insert_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Delete_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Update_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[819];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[819].NewCle;
}

function Delete_Types_de_t�ches_Liste_des_types_de_t�ches0()
{
 if (TAB_GLOBAL_COMPO[819].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[819];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[819].Action_en_cours = DELETE;
         User_Delete_Types_de_t�ches_Liste_des_types_de_t�ches0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_t�ches_Liste_des_types_de_t�ches0()
{
 if (TAB_GLOBAL_COMPO[819].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[819].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[819].NewCle = TAB_GLOBAL_COMPO[819].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[819].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[821];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[822];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Annuler_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Insert_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Delete_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Update_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
return TAB_COMPO_PPTES[819].NewCle;
}

function Validate_Types_de_t�ches_Liste_des_types_de_t�ches0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[819];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[819].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_t�ches_Liste_des_types_de_t�ches0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_t�ches_Liste_des_types_de_t�ches0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[819].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[821];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[822];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Annuler_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Insert_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Delete_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Update_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[819].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[819].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_t�ches_Liste_des_types_de_t�ches0()
{
 TAB_COMPO_PPTES[819].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[819].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[821];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[822];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Annuler_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=true;
top.document.getElementById("Insert_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Delete_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
top.document.getElementById("Update_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Villes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Villes_0;
function Retour_Villes()
{
 if (Filtre_Dep_Villes_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Villes_0.FctFermetureOnglet();
 }
}
function Gerer_Villes(IdFiltreOnglet)
{
/* On d�sactive les autres filtres */
if (Filtre_Dep_Villes_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Villes_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Villes");
}

function OuvrirOnglet_Villes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Villes");
}

function Insert_Villes_Liste_des_villes0()
{
 TAB_COMPO_PPTES[937].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[937].NewCle = getNewCle("ville");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[937].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[941];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[942];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Annuler_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[937];
 /* Pour une insertion on d�sectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[937].NewCle;
}

function Delete_Villes_Liste_des_villes0()
{
 if (TAB_GLOBAL_COMPO[937].getCleVal()==-1)
 {
         alert("Vous devez s�lectionner l'enregistrement � supprimer");
         return;
 }
 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[937];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[937].Action_en_cours = DELETE;
         User_Delete_Villes_Liste_des_villes0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Villes_0.OnClose(true);
 }
}

function Update_Villes_Liste_des_villes0()
{
 if (TAB_GLOBAL_COMPO[937].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement � mettre � jour");
         return -1;
 }
 TAB_COMPO_PPTES[937].Action_en_cours = UPDATE;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[937].NewCle = TAB_GLOBAL_COMPO[937].getCleVal();
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[937].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[941];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[942];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Annuler_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=true;
return TAB_COMPO_PPTES[937].NewCle;
}

function Validate_Villes_Liste_des_villes0(retour)
{
 /* Retour � l'onget appellant si appelle par g�rer */
if (retour==null)
        retour=true;

 /* On recup�re le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[937];
 /* On recup�re la cl� du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[937].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Villes_Liste_des_villes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Villes_Liste_des_villes0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[937].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[941];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[942];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Annuler_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[937].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Villes_0.OnClose(false);
 }
 TAB_COMPO_PPTES[937].Action_en_cours = null;
 return NewCle;
}

function Annuler_Villes_Liste_des_villes0()
{
 TAB_COMPO_PPTES[937].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[937].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[941];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[942];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Annuler_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=false;
}





function parametrage_Chargement()
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
var Col_N0_N__De_Acc�s_Liste_des_niveaux_d_acc�s0=new clAttribut("ac_numero","acces",null);

var Col_N1_Nom_De_Acc�s_Liste_des_niveaux_d_acc�s0=new clAttribut("ac_libelle","acces",null);

var Col_N2_Niveau_De_Acc�s_Liste_des_niveaux_d_acc�s0=new clAttribut("ac_niveau","acces",null);

var Acc�s_Nom_1=new clAttribut("ac_libelle","acces",null);


	/* Ce composant repr�sente: acces.ac_libelle sous le nom "Nom" */
var Compo_Acc�s_Nom_1=new clCompoTextBox(Acc�s_Nom_1,null,"Nom",false,false);
var Acc�s_Niveau_2=new clAttribut("ac_niveau","acces",null);


	/* Ce composant repr�sente: acces.ac_niveau sous le nom "Niveau" */
var Compo_Acc�s_Niveau_2=new clCompoTextBox(Acc�s_Niveau_2,null,"Niveau",false,false);
var Acc�s_Liste_des_niveaux_d_acc�s0=new clEnsembleAttributs("acces",
	new Array(
	new clLiaison(null,Col_N0_N__De_Acc�s_Liste_des_niveaux_d_acc�s0)
	,new clLiaison(null,Col_N1_Nom_De_Acc�s_Liste_des_niveaux_d_acc�s0)
	,new clLiaison(null,Col_N2_Niveau_De_Acc�s_Liste_des_niveaux_d_acc�s0)
	),
	new Array(
	new clLiaison(null,Acc�s_Nom_1)
	,new clLiaison(null,Acc�s_Niveau_2)
	));

var Titre_Acc�s_Liste_des_niveaux_d_acc�s0=new Array("N�","Nom","Niveau");

	/* Ce composant repr�sente: des �l�ments de la table acces sous le nom "Liste des niveaux d'acc�s" */
var Compo_Acc�s_Liste_des_niveaux_d_acc�s0=new clCompoListe(Acc�s_Liste_des_niveaux_d_acc�s0,new Array(new clInterfaceFiltrageVide()),Titre_Acc�s_Liste_des_niveaux_d_acc�s0,"Liste des niveaux d'acc�s",true,false);

	/* Ce composant repr�sente: acces.undefined sous le nom "Liste des niveaux d'acc�s" */
 if(ALeDroit(0,"acces"))
 {
Compo_Acc�s_Liste_des_niveaux_d_acc�s0.GenererXUL(top.document.getElementById("Acc�s_Liste_des_niveaux_d_acc�s0"));

 }

	/* On l'ajoute au tableau global � l'indice 794*/
top.TAB_GLOBAL_COMPO[794]=Compo_Acc�s_Liste_des_niveaux_d_acc�s0;

	/* Ce composant repr�sente: des �l�ments de la table acces sous le nom "Nom" */
 if(ALeDroit(0,"acces"))
 {
Compo_Acc�s_Nom_1.GenererXUL(top.document.getElementById("Acc�s_Liste_des_niveaux_d_acc�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 798*/
top.TAB_GLOBAL_COMPO[798]=Compo_Acc�s_Nom_1;

	/* Ce composant repr�sente: des �l�ments de la table acces sous le nom "Niveau" */
 if(ALeDroit(0,"acces"))
 {
Compo_Acc�s_Niveau_2.GenererXUL(top.document.getElementById("Acc�s_Liste_des_niveaux_d_acc�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 799*/
top.TAB_GLOBAL_COMPO[799]=Compo_Acc�s_Niveau_2;
var Col_N0_Libell�_De_Adh�rence_Liste_des_adh�rences0=new clAttribut("ah_libelle","adherence",null);

var Col_N1_R�duction_De_Adh�rence_Liste_des_adh�rences0=new clAttribut("ah_reduction","adherence",null);

var Col_N2_N_Produit_De_Adh�rence_Liste_des_adh�rences0=new clAttribut("pd_numero","adherence",null);

var Adh�rence_Produit_1=new clAttribut("pd_libelle","produit",null);


	/* Ce composant repr�sente: produit.pd_libelle sous le nom "Produit" */
var Compo_Adh�rence_Produit_1=new clCompoListeDeroulanteSimple(Adh�rence_Produit_1,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Produits_0=new clInterfaceFiltrageRelationOnglet("Produits",Gerer_Produits,OuvrirOnglet_Adh�rence)),"Produit");
var Joint_Esclave_Adh�rence_Produit_1=new clJointureMulti("adherence",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,false)
	));
var Adh�rence_Libell�_2=new clAttribut("ah_libelle","adherence",null);


	/* Ce composant repr�sente: adherence.ah_libelle sous le nom "Libell�" */
var Compo_Adh�rence_Libell�_2=new clCompoTextBox(Adh�rence_Libell�_2,null,"Libell�",false,false);
var Adh�rence_R�duction_3=new clAttribut("ah_reduction","adherence",null);


	/* Ce composant repr�sente: adherence.ah_reduction sous le nom "R�duction" */
var Compo_Adh�rence_R�duction_3=new clCompoTextBox(Adh�rence_R�duction_3,null,"R�duction",false,false);
var Adh�rence_En_cascade_4=new clAttribut("ah_cascade","adherence",null);


	/* Ce composant repr�sente: adherence.ah_cascade sous le nom "En cascade" */
var Compo_Adh�rence_En_cascade_4=new clCompoCheckBox(Adh�rence_En_cascade_4,null,"En cascade");
var Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5=new clAttribut("tl_libelle","typelien",null);


	/* Ce composant repr�sente: typelien.tl_libelle sous le nom "Nature du lien � utiliser pour la cascade" */
var Compo_Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5=new clCompoListeDeroulanteSimple(Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Types_de_lien_0=new clInterfaceFiltrageRelationOnglet("Types de lien",Gerer_Types_de_lien,OuvrirOnglet_Adh�rence)),"Nature du lien � utiliser pour la cascade");
var Joint_Esclave_Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5=new clJointureMulti("adherence",
	new Array(
	new stJointure("typelien","tl_numero","tl_numero",null,false)
	));
var Col_N0_Du_De_Adh�rence_P�riodes_de_validit�_7=new clAttribut("po_debut","periode",null);

var Col_N1_au_De_Adh�rence_P�riodes_de_validit�_7=new clAttribut("po_fin","periode",null);

var Adh�rence_P�riodes_de_validit�_7=new clEnsembleAttributs("periode",
	new Array(
	new clLiaison(null,Col_N0_Du_De_Adh�rence_P�riodes_de_validit�_7)
	,new clLiaison(null,Col_N1_au_De_Adh�rence_P�riodes_de_validit�_7)
	),
	null);

var Titre_Adh�rence_P�riodes_de_validit�_7=new Array("Du","au");

	/* Ce composant repr�sente: des �l�ments de la table periode sous le nom "P�riodes de validit�" */
var Compo_Adh�rence_P�riodes_de_validit�_7=new clCompoListe(Adh�rence_P�riodes_de_validit�_7,null,Titre_Adh�rence_P�riodes_de_validit�_7,"P�riodes de validit�",true,true);
var Joint_Esclave_Adh�rence_P�riodes_de_validit�_7=new clJointureMulti("adherence",
	new Array(
	new stJointure("periodeadherence","ah_numero","ah_numero",null,false)
	,new stJointure("periode","po_numero","po_numero",null,false)
	));
var Adh�rence_Liste_des_adh�rences0=new clEnsembleAttributs("adherence",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Adh�rence_Liste_des_adh�rences0)
	,new clLiaison(null,Col_N1_R�duction_De_Adh�rence_Liste_des_adh�rences0)
	,new clLiaison(null,Col_N2_N_Produit_De_Adh�rence_Liste_des_adh�rences0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Adh�rence_Produit_1,Adh�rence_Produit_1)
	,new clLiaison(null,Adh�rence_Libell�_2)
	,new clLiaison(null,Adh�rence_R�duction_3)
	,new clLiaison(null,Adh�rence_En_cascade_4)
	,new clLiaison(Joint_Esclave_Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5,Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5)
	,new clLiaison(Joint_Esclave_Adh�rence_P�riodes_de_validit�_7,Adh�rence_P�riodes_de_validit�_7)
	));

var Titre_Adh�rence_Liste_des_adh�rences0=new Array("Libell�","R�duction","N�Produit");

	/* Ce composant repr�sente: des �l�ments de la table adherence sous le nom "Liste des adh�rences" */
var Compo_Adh�rence_Liste_des_adh�rences0=new clCompoListe(Adh�rence_Liste_des_adh�rences0,new Array(new clInterfaceFiltrageVide()),Titre_Adh�rence_Liste_des_adh�rences0,"Liste des adh�rences",true,false);
var Col_N0_Du_De_Adh�rence_Indpt_P�riodes_disponibles_6=new clAttribut("po_debut","periode",null);

var Col_N1_au_De_Adh�rence_Indpt_P�riodes_disponibles_6=new clAttribut("po_fin","periode",null);

var Adh�rence_Indpt_P�riodes_disponibles_6=new clEnsembleAttributs("periode",
	new Array(
	new clLiaison(null,Col_N0_Du_De_Adh�rence_Indpt_P�riodes_disponibles_6)
	,new clLiaison(null,Col_N1_au_De_Adh�rence_Indpt_P�riodes_disponibles_6)
	),
	null);

var Titre_Adh�rence_Indpt_P�riodes_disponibles_6=new Array("Du","au");

	/* Ce composant repr�sente: des �l�ments de la table periode sous le nom "P�riodes disponibles" */
var Compo_Adh�rence_Indpt_P�riodes_disponibles_6=new clCompoListe(Adh�rence_Indpt_P�riodes_disponibles_6,new Array(new clInterfaceFiltrageVide(),Filtre_Dep_P�riodes_0=new clInterfaceFiltrageRelationOnglet("P�riodes",Gerer_P�riodes,OuvrirOnglet_Adh�rence)),Titre_Adh�rence_Indpt_P�riodes_disponibles_6,"P�riodes disponibles",true,true);

	/* Ce composant repr�sente: adherence.undefined sous le nom "Liste des adh�rences" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adh�rence_Liste_des_adh�rences0.GenererXUL(top.document.getElementById("Adh�rence_Liste_des_adh�rences0"));

 }

	/* On l'ajoute au tableau global � l'indice 1006*/
top.TAB_GLOBAL_COMPO[1006]=Compo_Adh�rence_Liste_des_adh�rences0;

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Produit" */
 if(ALeDroit(0,"produit"))
 {
Compo_Adh�rence_Produit_1.GenererXUL(top.document.getElementById("Adh�rence_Liste_des_adh�rences0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1010*/
top.TAB_GLOBAL_COMPO[1010]=Compo_Adh�rence_Produit_1;

	/* Ce composant repr�sente: des �l�ments de la table adherence sous le nom "Libell�" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adh�rence_Libell�_2.GenererXUL(top.document.getElementById("Adh�rence_Liste_des_adh�rences0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1011*/
top.TAB_GLOBAL_COMPO[1011]=Compo_Adh�rence_Libell�_2;

	/* Ce composant repr�sente: des �l�ments de la table adherence sous le nom "R�duction" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adh�rence_R�duction_3.GenererXUL(top.document.getElementById("Adh�rence_Liste_des_adh�rences0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1012*/
top.TAB_GLOBAL_COMPO[1012]=Compo_Adh�rence_R�duction_3;

	/* Ce composant repr�sente: des �l�ments de la table adherence sous le nom "En cascade" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adh�rence_En_cascade_4.GenererXUL(top.document.getElementById("Adh�rence_Liste_des_adh�rences0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1013*/
top.TAB_GLOBAL_COMPO[1013]=Compo_Adh�rence_En_cascade_4;

	/* Ce composant repr�sente: des �l�ments de la table typelien sous le nom "Nature du lien � utiliser pour la cascade" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5.GenererXUL(top.document.getElementById("Adh�rence_Liste_des_adh�rences0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1014*/
top.TAB_GLOBAL_COMPO[1014]=Compo_Adh�rence_Nature_du_lien_�_utiliser_pour_la_cascade_5;

	/* Ce composant repr�sente: periode.undefined sous le nom "P�riodes disponibles" */
 if(ALeDroit(0,"periode"))
 {
Compo_Adh�rence_Indpt_P�riodes_disponibles_6.GenererXUL(top.document.getElementById("ListeDessus_Adh�rence_P�riodes_de_validit�_7"));

 }

	/* On l'ajoute au tableau global � l'indice 1015*/
top.TAB_GLOBAL_COMPO[1015]=Compo_Adh�rence_Indpt_P�riodes_disponibles_6;

	/* Ce composant repr�sente: periode.undefined sous le nom "P�riodes de validit�" */
 if(ALeDroit(0,"periode"))
 {
Compo_Adh�rence_P�riodes_de_validit�_7.GenererXUL(top.document.getElementById("Adh�rence_P�riodes_de_validit�_7"));

 }

	/* On l'ajoute au tableau global � l'indice 1018*/
top.TAB_GLOBAL_COMPO[1018]=Compo_Adh�rence_P�riodes_de_validit�_7;
var Col_N0_Ini__De_Agents_Liste_des_agents0=new clAttribut("ag_initiales","agent",null);

var Col_N1_Nom_De_Agents_Liste_des_agents0=new clAttribut("ag_nom","agent",null);

var Col_N2_Pr�nom_De_Agents_Liste_des_agents0=new clAttribut("ag_prenom","agent",null);

var Col_N3_�quipe_De_Agents_Liste_des_agents0=new clAttribut("eq_nom","equipe",null);

var Joint_Col_N3_�quipe_De_Agents_Liste_des_agents0=new clJointureMulti("agent",
	new Array(
	new stJointure("equipe","eq_numero","eq_numero",null,true)
	));
var Col_N4_R�le_De_Agents_Liste_des_agents0=new clAttribut("ag_role","agent",null);

var Agents_Nom_1=new clAttribut("ag_nom","agent",null);


	/* Ce composant repr�sente: agent.ag_nom sous le nom "Nom" */
var Compo_Agents_Nom_1=new clCompoTextBox(Agents_Nom_1,null,"Nom",false,false);
var Agents_Pr�nom_2=new clAttribut("ag_prenom","agent",null);


	/* Ce composant repr�sente: agent.ag_prenom sous le nom "Pr�nom" */
var Compo_Agents_Pr�nom_2=new clCompoTextBox(Agents_Pr�nom_2,null,"Pr�nom",false,false);
var Agents_Initiales_3=new clAttribut("ag_initiales","agent",null);


	/* Ce composant repr�sente: agent.ag_initiales sous le nom "Initiales" */
var Compo_Agents_Initiales_3=new clCompoTextBox(Agents_Initiales_3,null,"Initiales",false,false);
var Agents_En_activit�_4=new clAttribut("ag_actif","agent",null);


	/* Ce composant repr�sente: agent.ag_actif sous le nom "En activit�" */
var Compo_Agents_En_activit�_4=new clCompoCheckBox(Agents_En_activit�_4,null,"En activit�");
var Agents_R�le_5=new clAttribut("ag_role","agent",null);


	/* Ce composant repr�sente: agent.ag_role sous le nom "R�le" */
var Compo_Agents_R�le_5=new clCompoTextBox(Agents_R�le_5,null,"R�le",false,false);
var Agents_�quipe_6=new clAttribut("eq_nom","equipe",null);


	/* Ce composant repr�sente: equipe.eq_nom sous le nom "�quipe" */
var Compo_Agents_�quipe_6=new clCompoListeDeroulanteSimple(Agents_�quipe_6,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_�quipes_0=new clInterfaceFiltrageRelationOnglet("�quipes",Gerer_�quipes,OuvrirOnglet_Agents)),"�quipe");
var Joint_Esclave_Agents_�quipe_6=new clJointureMulti("agent",
	new Array(
	new stJointure("equipe","eq_numero","eq_numero",null,false)
	));
var Agents_T�l�phone_professionnel_7=new clAttribut("ag_telephone","agent",null);


	/* Ce composant repr�sente: agent.ag_telephone sous le nom "T�l�phone professionnel" */
var Compo_Agents_T�l�phone_professionnel_7=new clCompoTextBox(Agents_T�l�phone_professionnel_7,null,"T�l�phone professionnel",false,false);
var Agents_T�l�phone_portable_8=new clAttribut("ag_mobile","agent",null);


	/* Ce composant repr�sente: agent.ag_mobile sous le nom "T�l�phone portable" */
var Compo_Agents_T�l�phone_portable_8=new clCompoTextBox(Agents_T�l�phone_portable_8,null,"T�l�phone portable",false,false);
var Agents_Adresse_e_mail_9=new clAttribut("ag_email","agent",null);


	/* Ce composant repr�sente: agent.ag_email sous le nom "Adresse e-mail" */
var Compo_Agents_Adresse_e_mail_9=new clCompoTextBox(Agents_Adresse_e_mail_9,null,"Adresse e-mail",false,false);
var Agents_Commentaire_10=new clAttribut("ag_commentaire","agent",null);


	/* Ce composant repr�sente: agent.ag_commentaire sous le nom "Commentaire" */
var Compo_Agents_Commentaire_10=new clCompoTextBox(Agents_Commentaire_10,null,"Commentaire",false,false);
var Agents_Liste_des_agents0=new clEnsembleAttributs("agent",
	new Array(
	new clLiaison(null,Col_N0_Ini__De_Agents_Liste_des_agents0)
	,new clLiaison(null,Col_N1_Nom_De_Agents_Liste_des_agents0)
	,new clLiaison(null,Col_N2_Pr�nom_De_Agents_Liste_des_agents0)
	,new clLiaison(Joint_Col_N3_�quipe_De_Agents_Liste_des_agents0,Col_N3_�quipe_De_Agents_Liste_des_agents0)
	,new clLiaison(null,Col_N4_R�le_De_Agents_Liste_des_agents0)
	),
	new Array(
	new clLiaison(null,Agents_Nom_1)
	,new clLiaison(null,Agents_Pr�nom_2)
	,new clLiaison(null,Agents_Initiales_3)
	,new clLiaison(null,Agents_En_activit�_4)
	,new clLiaison(null,Agents_R�le_5)
	,new clLiaison(Joint_Esclave_Agents_�quipe_6,Agents_�quipe_6)
	,new clLiaison(null,Agents_T�l�phone_professionnel_7)
	,new clLiaison(null,Agents_T�l�phone_portable_8)
	,new clLiaison(null,Agents_Adresse_e_mail_9)
	,new clLiaison(null,Agents_Commentaire_10)
	));

var Titre_Agents_Liste_des_agents0=new Array("Ini.","Nom","Pr�nom","�quipe","R�le");

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Liste des agents" */
var Compo_Agents_Liste_des_agents0=new clCompoListe(Agents_Liste_des_agents0,new Array(new clInterfaceFiltrageVide()),Titre_Agents_Liste_des_agents0,"Liste des agents",true,false);

	/* Ce composant repr�sente: agent.undefined sous le nom "Liste des agents" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Liste_des_agents0.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0"));

 }

	/* On l'ajoute au tableau global � l'indice 918*/
top.TAB_GLOBAL_COMPO[918]=Compo_Agents_Liste_des_agents0;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Nom" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Nom_1.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 924*/
top.TAB_GLOBAL_COMPO[924]=Compo_Agents_Nom_1;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Pr�nom" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Pr�nom_2.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 925*/
top.TAB_GLOBAL_COMPO[925]=Compo_Agents_Pr�nom_2;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Initiales" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Initiales_3.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 926*/
top.TAB_GLOBAL_COMPO[926]=Compo_Agents_Initiales_3;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "En activit�" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_En_activit�_4.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 927*/
top.TAB_GLOBAL_COMPO[927]=Compo_Agents_En_activit�_4;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "R�le" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_R�le_5.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 928*/
top.TAB_GLOBAL_COMPO[928]=Compo_Agents_R�le_5;

	/* Ce composant repr�sente: des �l�ments de la table equipe sous le nom "�quipe" */
 if(ALeDroit(0,"equipe"))
 {
Compo_Agents_�quipe_6.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 929*/
top.TAB_GLOBAL_COMPO[929]=Compo_Agents_�quipe_6;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "T�l�phone professionnel" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_T�l�phone_professionnel_7.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 930*/
top.TAB_GLOBAL_COMPO[930]=Compo_Agents_T�l�phone_professionnel_7;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "T�l�phone portable" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_T�l�phone_portable_8.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 931*/
top.TAB_GLOBAL_COMPO[931]=Compo_Agents_T�l�phone_portable_8;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Adresse e-mail" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Adresse_e_mail_9.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 932*/
top.TAB_GLOBAL_COMPO[932]=Compo_Agents_Adresse_e_mail_9;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Commentaire" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Commentaire_10.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 933*/
top.TAB_GLOBAL_COMPO[933]=Compo_Agents_Commentaire_10;
var Col_N0_N__De_Cantons_Liste_des_cantons0=new clAttribut("ct_numero","canton",null);

var Col_N1_Nom_De_Cantons_Liste_des_cantons0=new clAttribut("ct_nom","canton",null);

var Cantons_Nom_1=new clAttribut("ct_nom","canton",null);


	/* Ce composant repr�sente: canton.ct_nom sous le nom "Nom" */
var Compo_Cantons_Nom_1=new clCompoTextBox(Cantons_Nom_1,null,"Nom",false,false);
var Col_N0_Nom_De_Cantons_Villes_2=new clAttribut("vi_nom","ville",null);

var Cantons_Villes_2=new clEnsembleAttributs("ville",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Cantons_Villes_2)
	),
	null);

var Titre_Cantons_Villes_2=new Array("Nom");

	/* Ce composant repr�sente: des �l�ments de la table ville sous le nom "Villes" */
var Compo_Cantons_Villes_2=new clCompoListe(Cantons_Villes_2,null,Titre_Cantons_Villes_2,"Villes",true,false);
var Joint_Esclave_Cantons_Villes_2=new clJointureMulti("canton",
	new Array(
	new stJointure("ville","ct_numero","ct_numero",null,false)
	));
var Cantons_Liste_des_cantons0=new clEnsembleAttributs("canton",
	new Array(
	new clLiaison(null,Col_N0_N__De_Cantons_Liste_des_cantons0)
	,new clLiaison(null,Col_N1_Nom_De_Cantons_Liste_des_cantons0)
	),
	new Array(
	new clLiaison(null,Cantons_Nom_1)
	,new clLiaison(Joint_Esclave_Cantons_Villes_2,Cantons_Villes_2)
	));

var Titre_Cantons_Liste_des_cantons0=new Array("N�","Nom");

	/* Ce composant repr�sente: des �l�ments de la table canton sous le nom "Liste des cantons" */
var Compo_Cantons_Liste_des_cantons0=new clCompoListe(Cantons_Liste_des_cantons0,new Array(new clInterfaceFiltrageVide()),Titre_Cantons_Liste_des_cantons0,"Liste des cantons",true,false);

	/* Ce composant repr�sente: canton.undefined sous le nom "Liste des cantons" */
 if(ALeDroit(0,"canton"))
 {
Compo_Cantons_Liste_des_cantons0.GenererXUL(top.document.getElementById("Cantons_Liste_des_cantons0"));

 }

	/* On l'ajoute au tableau global � l'indice 963*/
top.TAB_GLOBAL_COMPO[963]=Compo_Cantons_Liste_des_cantons0;

	/* Ce composant repr�sente: des �l�ments de la table canton sous le nom "Nom" */
 if(ALeDroit(0,"canton"))
 {
Compo_Cantons_Nom_1.GenererXUL(top.document.getElementById("Cantons_Liste_des_cantons0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 966*/
top.TAB_GLOBAL_COMPO[966]=Compo_Cantons_Nom_1;

	/* Ce composant repr�sente: ville.undefined sous le nom "Villes" */
 if(ALeDroit(0,"ville"))
 {
Compo_Cantons_Villes_2.GenererXUL(top.document.getElementById("Cantons_Villes_2"));

 }

	/* On l'ajoute au tableau global � l'indice 967*/
top.TAB_GLOBAL_COMPO[967]=Compo_Cantons_Villes_2;
var Col_N0_N__De_Codes_postaux_Liste_des_codes_postaux0=new clAttribut("cp_numero","codepostal",null);

var Col_N1_Code_De_Codes_postaux_Liste_des_codes_postaux0=new clAttribut("cp_codepostal","codepostal",null);

var Col_N2_Bureau_De_Codes_postaux_Liste_des_codes_postaux0=new clAttribut("cp_bureau","codepostal",null);

var Codes_postaux_Code_postal_1=new clAttribut("cp_codepostal","codepostal",null);


	/* Ce composant repr�sente: codepostal.cp_codepostal sous le nom "Code postal" */
var Compo_Codes_postaux_Code_postal_1=new clCompoTextBox(Codes_postaux_Code_postal_1,null,"Code postal",false,false);
var Codes_postaux_Bureau_distributeur_2=new clAttribut("cp_bureau","codepostal",null);


	/* Ce composant repr�sente: codepostal.cp_bureau sous le nom "Bureau distributeur" */
var Compo_Codes_postaux_Bureau_distributeur_2=new clCompoTextBox(Codes_postaux_Bureau_distributeur_2,null,"Bureau distributeur",false,false);
var Col_N0_N__De_Codes_postaux_Villes_li�es_au_code_postal_4=new clAttribut("vi_numero","ville",null);

var Col_N1_Nom_De_Codes_postaux_Villes_li�es_au_code_postal_4=new clAttribut("vi_nom","ville",null);

var Codes_postaux_Villes_li�es_au_code_postal_4=new clEnsembleAttributs("ville",
	new Array(
	new clLiaison(null,Col_N0_N__De_Codes_postaux_Villes_li�es_au_code_postal_4)
	,new clLiaison(null,Col_N1_Nom_De_Codes_postaux_Villes_li�es_au_code_postal_4)
	),
	null);

var Titre_Codes_postaux_Villes_li�es_au_code_postal_4=new Array("N�","Nom");

	/* Ce composant repr�sente: des �l�ments de la table ville sous le nom "Villes li�es au code postal" */
var Compo_Codes_postaux_Villes_li�es_au_code_postal_4=new clCompoListe(Codes_postaux_Villes_li�es_au_code_postal_4,null,Titre_Codes_postaux_Villes_li�es_au_code_postal_4,"Villes li�es au code postal",true,true);
var Joint_Esclave_Codes_postaux_Villes_li�es_au_code_postal_4=new clJointureMulti("codepostal",
	new Array(
	new stJointure("villecp","cp_numero","cp_numero",null,false)
	,new stJointure("ville","vi_numero","vi_numero",null,false)
	));
var Codes_postaux_Liste_des_codes_postaux0=new clEnsembleAttributs("codepostal",
	new Array(
	new clLiaison(null,Col_N0_N__De_Codes_postaux_Liste_des_codes_postaux0)
	,new clLiaison(null,Col_N1_Code_De_Codes_postaux_Liste_des_codes_postaux0)
	,new clLiaison(null,Col_N2_Bureau_De_Codes_postaux_Liste_des_codes_postaux0)
	),
	new Array(
	new clLiaison(null,Codes_postaux_Code_postal_1)
	,new clLiaison(null,Codes_postaux_Bureau_distributeur_2)
	,new clLiaison(Joint_Esclave_Codes_postaux_Villes_li�es_au_code_postal_4,Codes_postaux_Villes_li�es_au_code_postal_4)
	));

var Titre_Codes_postaux_Liste_des_codes_postaux0=new Array("N�","Code","Bureau");

	/* Ce composant repr�sente: des �l�ments de la table codepostal sous le nom "Liste des codes postaux" */
var Compo_Codes_postaux_Liste_des_codes_postaux0=new clCompoListe(Codes_postaux_Liste_des_codes_postaux0,new Array(new clInterfaceFiltrageVide()),Titre_Codes_postaux_Liste_des_codes_postaux0,"Liste des codes postaux",true,false);
var Col_N0_N__De_Codes_postaux_Indpt_Villes_disponibles_3=new clAttribut("vi_numero","ville",null);

var Col_N1_Nom_De_Codes_postaux_Indpt_Villes_disponibles_3=new clAttribut("vi_nom","ville",null);

var Codes_postaux_Indpt_Villes_disponibles_3=new clEnsembleAttributs("ville",
	new Array(
	new clLiaison(null,Col_N0_N__De_Codes_postaux_Indpt_Villes_disponibles_3)
	,new clLiaison(null,Col_N1_Nom_De_Codes_postaux_Indpt_Villes_disponibles_3)
	),
	null);

var Titre_Codes_postaux_Indpt_Villes_disponibles_3=new Array("N�","Nom");

	/* Ce composant repr�sente: des �l�ments de la table ville sous le nom "Villes disponibles" */
var Compo_Codes_postaux_Indpt_Villes_disponibles_3=new clCompoListe(Codes_postaux_Indpt_Villes_disponibles_3,new Array(new clInterfaceFiltrageVide(),Filtre_Dep_Villes_0=new clInterfaceFiltrageRelationOnglet("Villes",Gerer_Villes,OuvrirOnglet_Codes_postaux)),Titre_Codes_postaux_Indpt_Villes_disponibles_3,"Villes disponibles",true,true);

	/* Ce composant repr�sente: codepostal.undefined sous le nom "Liste des codes postaux" */
 if(ALeDroit(0,"codepostal"))
 {
Compo_Codes_postaux_Liste_des_codes_postaux0.GenererXUL(top.document.getElementById("Codes_postaux_Liste_des_codes_postaux0"));

 }

	/* On l'ajoute au tableau global � l'indice 943*/
top.TAB_GLOBAL_COMPO[943]=Compo_Codes_postaux_Liste_des_codes_postaux0;

	/* Ce composant repr�sente: des �l�ments de la table codepostal sous le nom "Code postal" */
 if(ALeDroit(0,"codepostal"))
 {
Compo_Codes_postaux_Code_postal_1.GenererXUL(top.document.getElementById("Codes_postaux_Liste_des_codes_postaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 947*/
top.TAB_GLOBAL_COMPO[947]=Compo_Codes_postaux_Code_postal_1;

	/* Ce composant repr�sente: des �l�ments de la table codepostal sous le nom "Bureau distributeur" */
 if(ALeDroit(0,"codepostal"))
 {
Compo_Codes_postaux_Bureau_distributeur_2.GenererXUL(top.document.getElementById("Codes_postaux_Liste_des_codes_postaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 948*/
top.TAB_GLOBAL_COMPO[948]=Compo_Codes_postaux_Bureau_distributeur_2;

	/* Ce composant repr�sente: ville.undefined sous le nom "Villes disponibles" */
 if(ALeDroit(0,"ville"))
 {
Compo_Codes_postaux_Indpt_Villes_disponibles_3.GenererXUL(top.document.getElementById("ListeDessus_Codes_postaux_Villes_li�es_au_code_postal_4"));

 }

	/* On l'ajoute au tableau global � l'indice 949*/
top.TAB_GLOBAL_COMPO[949]=Compo_Codes_postaux_Indpt_Villes_disponibles_3;

	/* Ce composant repr�sente: ville.undefined sous le nom "Villes li�es au code postal" */
 if(ALeDroit(0,"ville"))
 {
Compo_Codes_postaux_Villes_li�es_au_code_postal_4.GenererXUL(top.document.getElementById("Codes_postaux_Villes_li�es_au_code_postal_4"));

 }

	/* On l'ajoute au tableau global � l'indice 952*/
top.TAB_GLOBAL_COMPO[952]=Compo_Codes_postaux_Villes_li�es_au_code_postal_4;
var Col_N0_Libell�_De_Profils_de_droits_Liste_des_profils_de_droits0=new clAttribut("dp_libelle","droitprofil",null);

var Profils_de_droits_Libell�_1=new clAttribut("dp_libelle","droitprofil",null);


	/* Ce composant repr�sente: droitprofil.dp_libelle sous le nom "Libell�" */
var Compo_Profils_de_droits_Libell�_1=new clCompoTextBox(Profils_de_droits_Libell�_1,null,"Libell�",false,false);
var Col_N0_Droits_De_Profils_de_droits_Droits_2=new clAttribut("dr_droits","droit",null);

var Col_N1_Sur_De_Profils_de_droits_Droits_2=new clAttribut("gt_libelle","groupetable",null);

var Joint_Col_N1_Sur_De_Profils_de_droits_Droits_2=new clJointureMulti("droit",
	new Array(
	new stJointure("groupetable","gt_numero","gt_numero",null,true)
	));
var Profils_de_droits_Module_3=new clAttribut("gt_libelle","groupetable",null);


	/* Ce composant repr�sente: groupetable.gt_libelle sous le nom "Module" */
var Compo_Profils_de_droits_Module_3=new clCompoListeDeroulanteSimple(Profils_de_droits_Module_3,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Groupe_de_tables_0=new clInterfaceFiltrageRelationOnglet("Groupe de tables",Gerer_Groupe_de_tables,OuvrirOnglet_Profils_de_droits)),"Module");
var Joint_Esclave_Profils_de_droits_Module_3=new clJointureMulti("droit",
	new Array(
	new stJointure("groupetable","gt_numero","gt_numero",null,false)
	));
var Profils_de_droits_Lecture_4=new clAttribut("dr_select","droit",null);


	/* Ce composant repr�sente: droit.dr_select sous le nom "Lecture" */
var Compo_Profils_de_droits_Lecture_4=new clCompoCheckBox(Profils_de_droits_Lecture_4,null,"Lecture");
var Profils_de_droits_Ajout_5=new clAttribut("dr_insert","droit",null);


	/* Ce composant repr�sente: droit.dr_insert sous le nom "Ajout" */
var Compo_Profils_de_droits_Ajout_5=new clCompoCheckBox(Profils_de_droits_Ajout_5,null,"Ajout");
var Profils_de_droits_Modification_6=new clAttribut("dr_update","droit",null);


	/* Ce composant repr�sente: droit.dr_update sous le nom "Modification" */
var Compo_Profils_de_droits_Modification_6=new clCompoCheckBox(Profils_de_droits_Modification_6,null,"Modification");
var Profils_de_droits_Suppression_7=new clAttribut("dr_delete","droit",null);


	/* Ce composant repr�sente: droit.dr_delete sous le nom "Suppression" */
var Compo_Profils_de_droits_Suppression_7=new clCompoCheckBox(Profils_de_droits_Suppression_7,null,"Suppression");
var Profils_de_droits_Droits_2=new clEnsembleAttributs("droit",
	new Array(
	new clLiaison(null,Col_N0_Droits_De_Profils_de_droits_Droits_2)
	,new clLiaison(Joint_Col_N1_Sur_De_Profils_de_droits_Droits_2,Col_N1_Sur_De_Profils_de_droits_Droits_2)
	),
	new Array(
	new clLiaison(Joint_Esclave_Profils_de_droits_Module_3,Profils_de_droits_Module_3)
	,new clLiaison(null,Profils_de_droits_Lecture_4)
	,new clLiaison(null,Profils_de_droits_Ajout_5)
	,new clLiaison(null,Profils_de_droits_Modification_6)
	,new clLiaison(null,Profils_de_droits_Suppression_7)
	));

var Titre_Profils_de_droits_Droits_2=new Array("Droits","Sur");

	/* Ce composant repr�sente: des �l�ments de la table droit sous le nom "Droits" */
var Compo_Profils_de_droits_Droits_2=new clCompoListe(Profils_de_droits_Droits_2,null,Titre_Profils_de_droits_Droits_2,"Droits",true,false);
var Joint_Esclave_Profils_de_droits_Droits_2=new clJointureMulti("droitprofil",
	new Array(
	new stJointure("droit","dp_numero","dp_numero",null,false)
	));
var Profils_de_droits_Liste_des_profils_de_droits0=new clEnsembleAttributs("droitprofil",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Profils_de_droits_Liste_des_profils_de_droits0)
	),
	new Array(
	new clLiaison(null,Profils_de_droits_Libell�_1)
	,new clLiaison(Joint_Esclave_Profils_de_droits_Droits_2,Profils_de_droits_Droits_2)
	));

var Titre_Profils_de_droits_Liste_des_profils_de_droits0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table droitprofil sous le nom "Liste des profils de droits" */
var Compo_Profils_de_droits_Liste_des_profils_de_droits0=new clCompoListe(Profils_de_droits_Liste_des_profils_de_droits0,new Array(new clInterfaceFiltrageVide()),Titre_Profils_de_droits_Liste_des_profils_de_droits0,"Liste des profils de droits",true,false);

	/* Ce composant repr�sente: droitprofil.undefined sous le nom "Liste des profils de droits" */
 if(ALeDroit(0,"droitprofil"))
 {
Compo_Profils_de_droits_Liste_des_profils_de_droits0.GenererXUL(top.document.getElementById("Profils_de_droits_Liste_des_profils_de_droits0"));

 }

	/* On l'ajoute au tableau global � l'indice 902*/
top.TAB_GLOBAL_COMPO[902]=Compo_Profils_de_droits_Liste_des_profils_de_droits0;

	/* Ce composant repr�sente: des �l�ments de la table droitprofil sous le nom "Libell�" */
 if(ALeDroit(0,"droitprofil"))
 {
Compo_Profils_de_droits_Libell�_1.GenererXUL(top.document.getElementById("Profils_de_droits_Liste_des_profils_de_droits0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 904*/
top.TAB_GLOBAL_COMPO[904]=Compo_Profils_de_droits_Libell�_1;

	/* Ce composant repr�sente: droit.undefined sous le nom "Droits" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Droits_2.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2"));

 }

	/* On l'ajoute au tableau global � l'indice 905*/
top.TAB_GLOBAL_COMPO[905]=Compo_Profils_de_droits_Droits_2;

	/* Ce composant repr�sente: des �l�ments de la table groupetable sous le nom "Module" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Profils_de_droits_Module_3.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 908*/
top.TAB_GLOBAL_COMPO[908]=Compo_Profils_de_droits_Module_3;

	/* Ce composant repr�sente: des �l�ments de la table droit sous le nom "Lecture" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Lecture_4.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 909*/
top.TAB_GLOBAL_COMPO[909]=Compo_Profils_de_droits_Lecture_4;

	/* Ce composant repr�sente: des �l�ments de la table droit sous le nom "Ajout" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Ajout_5.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 910*/
top.TAB_GLOBAL_COMPO[910]=Compo_Profils_de_droits_Ajout_5;

	/* Ce composant repr�sente: des �l�ments de la table droit sous le nom "Modification" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Modification_6.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 911*/
top.TAB_GLOBAL_COMPO[911]=Compo_Profils_de_droits_Modification_6;

	/* Ce composant repr�sente: des �l�ments de la table droit sous le nom "Suppression" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Suppression_7.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 912*/
top.TAB_GLOBAL_COMPO[912]=Compo_Profils_de_droits_Suppression_7;
var Col_N0_Agent_De_Employ�s_Liste_des_employ�s0=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N0_Agent_De_Employ�s_Liste_des_employ�s0=new clJointureMulti("employe",
	new Array(
	new stJointure("agent","em_agent","ag_numero",null,true)
	));
var Col_N1_Emploi_De_Employ�s_Liste_des_employ�s0=new clAttribut("em_emploi","employe",null);

var Col_N2_Service_De_Employ�s_Liste_des_employ�s0=new clAttribut("se_nom","service",null);

var Joint_Col_N2_Service_De_Employ�s_Liste_des_employ�s0=new clJointureMulti("employe",
	new Array(
	new stJointure("service","em_service","se_numero",null,true)
	));
var Employ�s_Agent_1=new clAttribut("ag_libelle","agent",null);


	/* Ce composant repr�sente: agent.ag_libelle sous le nom "Agent" */
var Compo_Employ�s_Agent_1=new clCompoListeDeroulanteSimple(Employ�s_Agent_1,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Agents_1=new clInterfaceFiltrageRelationOnglet("Agents",Gerer_Agents,OuvrirOnglet_Employ�s)),"Agent");
var Joint_Esclave_Employ�s_Agent_1=new clJointureMulti("employe",
	new Array(
	new stJointure("agent","em_agent","ag_numero",null,false)
	));
var Employ�s_Login_2=new clAttribut("em_login","employe",null);


	/* Ce composant repr�sente: employe.em_login sous le nom "Login" */
var Compo_Employ�s_Login_2=new clCompoTextBox(Employ�s_Login_2,null,"Login",false,false);
var Employ�s_Mot_de_passe_3=new clAttribut("em_password","employe",null);


	/* Ce composant repr�sente: employe.em_password sous le nom "Mot de passe" */
var Compo_Employ�s_Mot_de_passe_3=new clCompoTextBox(Employ�s_Mot_de_passe_3,null,"Mot de passe",false,false);
var Employ�s_Administrateur__Peut_cr�er_d_autres_utilisateurs__4=new clAttribut("em_super","employe",null);


	/* Ce composant repr�sente: employe.em_super sous le nom "Administrateur (Peut cr�er d'autres utilisateurs)" */
var Compo_Employ�s_Administrateur__Peut_cr�er_d_autres_utilisateurs__4=new clCompoCheckBox(Employ�s_Administrateur__Peut_cr�er_d_autres_utilisateurs__4,null,"Administrateur (Peut cr�er d'autres utilisateurs)");
var Employ�s_Cet_employ�_peut_effectuer_des_remises_de_ch�ques_5=new clAttribut("em_reglement","employe",null);


	/* Ce composant repr�sente: employe.em_reglement sous le nom "Cet employ� peut effectuer des remises de ch�ques" */
var Compo_Employ�s_Cet_employ�_peut_effectuer_des_remises_de_ch�ques_5=new clCompoCheckBox(Employ�s_Cet_employ�_peut_effectuer_des_remises_de_ch�ques_5,null,"Cet employ� peut effectuer des remises de ch�ques");
var Employ�s_Emploi_6=new clAttribut("em_emploi","employe",null);


	/* Ce composant repr�sente: employe.em_emploi sous le nom "Emploi" */
var Compo_Employ�s_Emploi_6=new clCompoTextBox(Employ�s_Emploi_6,null,"Emploi",false,false);
var Employ�s_Acc�s_comptabilit�_7=new clAttribut("ac_nom","acces",null);


	/* Ce composant repr�sente: acces.ac_nom sous le nom "Acc�s comptabilit�" */
var Compo_Employ�s_Acc�s_comptabilit�_7=new clCompoListeDeroulanteSimple(Employ�s_Acc�s_comptabilit�_7,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Acc�s_0=new clInterfaceFiltrageRelationOnglet("Acc�s",Gerer_Acc�s,OuvrirOnglet_Employ�s)),"Acc�s comptabilit�");
var Joint_Esclave_Employ�s_Acc�s_comptabilit�_7=new clJointureMulti("employe",
	new Array(
	new stJointure("acces","em_acces","ac_numero",null,false)
	));
var Employ�s_Profil_de_droits_8=new clAttribut("dp_libelle","droitprofil",null);


	/* Ce composant repr�sente: droitprofil.dp_libelle sous le nom "Profil de droits" */
var Compo_Employ�s_Profil_de_droits_8=new clCompoListeDeroulanteSimple(Employ�s_Profil_de_droits_8,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Profils_de_droits_0=new clInterfaceFiltrageRelationOnglet("Profils de droits",Gerer_Profils_de_droits,OuvrirOnglet_Employ�s)),"Profil de droits");
var Joint_Esclave_Employ�s_Profil_de_droits_8=new clJointureMulti("employe",
	new Array(
	new stJointure("droitprofil","dp_numero","dp_numero",null,false)
	));
var Employ�s_Liste_des_employ�s0=new clEnsembleAttributs("employe",
	new Array(
	new clLiaison(Joint_Col_N0_Agent_De_Employ�s_Liste_des_employ�s0,Col_N0_Agent_De_Employ�s_Liste_des_employ�s0)
	,new clLiaison(null,Col_N1_Emploi_De_Employ�s_Liste_des_employ�s0)
	,new clLiaison(Joint_Col_N2_Service_De_Employ�s_Liste_des_employ�s0,Col_N2_Service_De_Employ�s_Liste_des_employ�s0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Employ�s_Agent_1,Employ�s_Agent_1)
	,new clLiaison(null,Employ�s_Login_2)
	,new clLiaison(null,Employ�s_Mot_de_passe_3)
	,new clLiaison(null,Employ�s_Administrateur__Peut_cr�er_d_autres_utilisateurs__4)
	,new clLiaison(null,Employ�s_Cet_employ�_peut_effectuer_des_remises_de_ch�ques_5)
	,new clLiaison(null,Employ�s_Emploi_6)
	,new clLiaison(Joint_Esclave_Employ�s_Acc�s_comptabilit�_7,Employ�s_Acc�s_comptabilit�_7)
	,new clLiaison(Joint_Esclave_Employ�s_Profil_de_droits_8,Employ�s_Profil_de_droits_8)
	));

var Titre_Employ�s_Liste_des_employ�s0=new Array("Agent","Emploi","Service");

	/* Ce composant repr�sente: des �l�ments de la table employe sous le nom "Liste des employ�s" */
var Compo_Employ�s_Liste_des_employ�s0=new clCompoListe(Employ�s_Liste_des_employ�s0,new Array(new clInterfaceFiltrageVide()),Titre_Employ�s_Liste_des_employ�s0,"Liste des employ�s",true,false);

	/* Ce composant repr�sente: employe.undefined sous le nom "Liste des employ�s" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employ�s_Liste_des_employ�s0.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0"));

 }

	/* On l'ajoute au tableau global � l'indice 890*/
top.TAB_GLOBAL_COMPO[890]=Compo_Employ�s_Liste_des_employ�s0;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Agent" */
 if(ALeDroit(0,"agent"))
 {
Compo_Employ�s_Agent_1.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 894*/
top.TAB_GLOBAL_COMPO[894]=Compo_Employ�s_Agent_1;

	/* Ce composant repr�sente: des �l�ments de la table employe sous le nom "Login" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employ�s_Login_2.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 895*/
top.TAB_GLOBAL_COMPO[895]=Compo_Employ�s_Login_2;

	/* Ce composant repr�sente: des �l�ments de la table employe sous le nom "Mot de passe" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employ�s_Mot_de_passe_3.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 896*/
top.TAB_GLOBAL_COMPO[896]=Compo_Employ�s_Mot_de_passe_3;

	/* Ce composant repr�sente: des �l�ments de la table employe sous le nom "Administrateur (Peut cr�er d'autres utilisateurs)" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employ�s_Administrateur__Peut_cr�er_d_autres_utilisateurs__4.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 897*/
top.TAB_GLOBAL_COMPO[897]=Compo_Employ�s_Administrateur__Peut_cr�er_d_autres_utilisateurs__4;

	/* Ce composant repr�sente: des �l�ments de la table employe sous le nom "Cet employ� peut effectuer des remises de ch�ques" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employ�s_Cet_employ�_peut_effectuer_des_remises_de_ch�ques_5.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 898*/
top.TAB_GLOBAL_COMPO[898]=Compo_Employ�s_Cet_employ�_peut_effectuer_des_remises_de_ch�ques_5;

	/* Ce composant repr�sente: des �l�ments de la table employe sous le nom "Emploi" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employ�s_Emploi_6.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 899*/
top.TAB_GLOBAL_COMPO[899]=Compo_Employ�s_Emploi_6;

	/* Ce composant repr�sente: des �l�ments de la table acces sous le nom "Acc�s comptabilit�" */
 if(ALeDroit(0,"acces"))
 {
Compo_Employ�s_Acc�s_comptabilit�_7.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 900*/
top.TAB_GLOBAL_COMPO[900]=Compo_Employ�s_Acc�s_comptabilit�_7;

	/* Ce composant repr�sente: des �l�ments de la table droitprofil sous le nom "Profil de droits" */
 if(ALeDroit(0,"droitprofil"))
 {
Compo_Employ�s_Profil_de_droits_8.GenererXUL(top.document.getElementById("Employ�s_Liste_des_employ�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 901*/
top.TAB_GLOBAL_COMPO[901]=Compo_Employ�s_Profil_de_droits_8;
var Col_N0_Nom_De_�quipes_Liste_des_�quipes0=new clAttribut("eq_nom","equipe",null);

var �quipes_Nom_1=new clAttribut("eq_nom","equipe",null);


	/* Ce composant repr�sente: equipe.eq_nom sous le nom "Nom" */
var Compo_�quipes_Nom_1=new clCompoTextBox(�quipes_Nom_1,null,"Nom",false,false);
var �quipes_Liste_des_�quipes0=new clEnsembleAttributs("equipe",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_�quipes_Liste_des_�quipes0)
	),
	new Array(
	new clLiaison(null,�quipes_Nom_1)
	));

var Titre_�quipes_Liste_des_�quipes0=new Array("Nom");

	/* Ce composant repr�sente: des �l�ments de la table equipe sous le nom "Liste des �quipes" */
var Compo_�quipes_Liste_des_�quipes0=new clCompoListe(�quipes_Liste_des_�quipes0,new Array(new clInterfaceFiltrageVide()),Titre_�quipes_Liste_des_�quipes0,"Liste des �quipes",true,false);

	/* Ce composant repr�sente: equipe.undefined sous le nom "Liste des �quipes" */
 if(ALeDroit(0,"equipe"))
 {
Compo_�quipes_Liste_des_�quipes0.GenererXUL(top.document.getElementById("�quipes_Liste_des_�quipes0"));

 }

	/* On l'ajoute au tableau global � l'indice 934*/
top.TAB_GLOBAL_COMPO[934]=Compo_�quipes_Liste_des_�quipes0;

	/* Ce composant repr�sente: des �l�ments de la table equipe sous le nom "Nom" */
 if(ALeDroit(0,"equipe"))
 {
Compo_�quipes_Nom_1.GenererXUL(top.document.getElementById("�quipes_Liste_des_�quipes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 936*/
top.TAB_GLOBAL_COMPO[936]=Compo_�quipes_Nom_1;
var Col_N0_Libell�_De_Etats_de_personne_Liste_des_�tats_de_personne0=new clAttribut("ep_libelle","etatpersonne",null);

var Etats_de_personne_Libell�_1=new clAttribut("ep_libelle","etatpersonne",null);


	/* Ce composant repr�sente: etatpersonne.ep_libelle sous le nom "Libell�" */
var Compo_Etats_de_personne_Libell�_1=new clCompoTextBox(Etats_de_personne_Libell�_1,null,"Libell�",false,false);
var Etats_de_personne_Liste_des_�tats_de_personne0=new clEnsembleAttributs("etatpersonne",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Etats_de_personne_Liste_des_�tats_de_personne0)
	),
	new Array(
	new clLiaison(null,Etats_de_personne_Libell�_1)
	));

var Titre_Etats_de_personne_Liste_des_�tats_de_personne0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table etatpersonne sous le nom "Liste des �tats de personne" */
var Compo_Etats_de_personne_Liste_des_�tats_de_personne0=new clCompoListe(Etats_de_personne_Liste_des_�tats_de_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Etats_de_personne_Liste_des_�tats_de_personne0,"Liste des �tats de personne",true,false);

	/* Ce composant repr�sente: etatpersonne.undefined sous le nom "Liste des �tats de personne" */
 if(ALeDroit(0,"etatpersonne"))
 {
Compo_Etats_de_personne_Liste_des_�tats_de_personne0.GenererXUL(top.document.getElementById("Etats_de_personne_Liste_des_�tats_de_personne0"));

 }

	/* On l'ajoute au tableau global � l'indice 863*/
top.TAB_GLOBAL_COMPO[863]=Compo_Etats_de_personne_Liste_des_�tats_de_personne0;

	/* Ce composant repr�sente: des �l�ments de la table etatpersonne sous le nom "Libell�" */
 if(ALeDroit(0,"etatpersonne"))
 {
Compo_Etats_de_personne_Libell�_1.GenererXUL(top.document.getElementById("Etats_de_personne_Liste_des_�tats_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 865*/
top.TAB_GLOBAL_COMPO[865]=Compo_Etats_de_personne_Libell�_1;
var Col_N0_Libell�_De_Groupe_de_tables_Liste_des_groupes_de_tables0=new clAttribut("gt_libelle","groupetable",null);

var Col_N1_Tables_De_Groupe_de_tables_Liste_des_groupes_de_tables0=new clAttribut("gt_tables","groupetable",null);

var Groupe_de_tables_Libell�_1=new clAttribut("gt_libelle","groupetable",null);


	/* Ce composant repr�sente: groupetable.gt_libelle sous le nom "Libell�" */
var Compo_Groupe_de_tables_Libell�_1=new clCompoTextBox(Groupe_de_tables_Libell�_1,null,"Libell�",false,false);
var Groupe_de_tables_Tables_2=new clAttribut("gt_tables","groupetable",null);


	/* Ce composant repr�sente: groupetable.gt_tables sous le nom "Tables" */
var Compo_Groupe_de_tables_Tables_2=new clCompoTextBox(Groupe_de_tables_Tables_2,null,"Tables",false,true);
var Groupe_de_tables_Liste_des_groupes_de_tables0=new clEnsembleAttributs("groupetable",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Groupe_de_tables_Liste_des_groupes_de_tables0)
	,new clLiaison(null,Col_N1_Tables_De_Groupe_de_tables_Liste_des_groupes_de_tables0)
	),
	new Array(
	new clLiaison(null,Groupe_de_tables_Libell�_1)
	,new clLiaison(null,Groupe_de_tables_Tables_2)
	));

var Titre_Groupe_de_tables_Liste_des_groupes_de_tables0=new Array("Libell�","Tables");

	/* Ce composant repr�sente: des �l�ments de la table groupetable sous le nom "Liste des groupes de tables" */
var Compo_Groupe_de_tables_Liste_des_groupes_de_tables0=new clCompoListe(Groupe_de_tables_Liste_des_groupes_de_tables0,new Array(new clInterfaceFiltrageVide()),Titre_Groupe_de_tables_Liste_des_groupes_de_tables0,"Liste des groupes de tables",true,false);

	/* Ce composant repr�sente: groupetable.undefined sous le nom "Liste des groupes de tables" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Groupe_de_tables_Liste_des_groupes_de_tables0.GenererXUL(top.document.getElementById("Groupe_de_tables_Liste_des_groupes_de_tables0"));

 }

	/* On l'ajoute au tableau global � l'indice 913*/
top.TAB_GLOBAL_COMPO[913]=Compo_Groupe_de_tables_Liste_des_groupes_de_tables0;

	/* Ce composant repr�sente: des �l�ments de la table groupetable sous le nom "Libell�" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Groupe_de_tables_Libell�_1.GenererXUL(top.document.getElementById("Groupe_de_tables_Liste_des_groupes_de_tables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 916*/
top.TAB_GLOBAL_COMPO[916]=Compo_Groupe_de_tables_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table groupetable sous le nom "Tables" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Groupe_de_tables_Tables_2.GenererXUL(top.document.getElementById("Groupe_de_tables_Liste_des_groupes_de_tables0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 917*/
top.TAB_GLOBAL_COMPO[917]=Compo_Groupe_de_tables_Tables_2;
var Col_N0_N__De_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clAttribut("gc_numero","groupecanton",null);

var Col_N1_Libell�_De_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clAttribut("gc_nom","groupecanton",null);

var Groupes_de_cantons_Libell�_1=new clAttribut("gc_nom","groupecanton",null);


	/* Ce composant repr�sente: groupecanton.gc_nom sous le nom "Libell�" */
var Compo_Groupes_de_cantons_Libell�_1=new clCompoTextBox(Groupes_de_cantons_Libell�_1,null,"Libell�",false,false);
var Col_N0_Nom_De_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clAttribut("ct_nom","canton",null);

var Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clEnsembleAttributs("canton",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Groupes_de_cantons_Cantons_appartenant_au_groupe_3)
	),
	null);

var Titre_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new Array("Nom");

	/* Ce composant repr�sente: des �l�ments de la table canton sous le nom "Cantons appartenant au groupe" */
var Compo_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clCompoListe(Groupes_de_cantons_Cantons_appartenant_au_groupe_3,null,Titre_Groupes_de_cantons_Cantons_appartenant_au_groupe_3,"Cantons appartenant au groupe",true,true);
var Joint_Esclave_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clJointureMulti("groupecanton",
	new Array(
	new stJointure("appartienta","gc_numero","gc_numero",null,false)
	,new stJointure("canton","ct_numero","ct_numero",null,false)
	));
var Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clEnsembleAttributs("groupecanton",
	new Array(
	new clLiaison(null,Col_N0_N__De_Groupes_de_cantons_Liste_des_groupes_de_cantons0)
	,new clLiaison(null,Col_N1_Libell�_De_Groupes_de_cantons_Liste_des_groupes_de_cantons0)
	),
	new Array(
	new clLiaison(null,Groupes_de_cantons_Libell�_1)
	,new clLiaison(Joint_Esclave_Groupes_de_cantons_Cantons_appartenant_au_groupe_3,Groupes_de_cantons_Cantons_appartenant_au_groupe_3)
	));

var Titre_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new Array("N�","Libell�");

	/* Ce composant repr�sente: des �l�ments de la table groupecanton sous le nom "Liste des groupes de cantons" */
var Compo_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clCompoListe(Groupes_de_cantons_Liste_des_groupes_de_cantons0,new Array(new clInterfaceFiltrageVide()),Titre_Groupes_de_cantons_Liste_des_groupes_de_cantons0,"Liste des groupes de cantons",true,false);
var Col_N0_Nom_De_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clAttribut("ct_nom","canton",null);

var Col_N1_N__De_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clAttribut("ct_numero","canton",null);

var Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clEnsembleAttributs("canton",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Groupes_de_cantons_Indpt_Cantons_disponibles_2)
	,new clLiaison(null,Col_N1_N__De_Groupes_de_cantons_Indpt_Cantons_disponibles_2)
	),
	null);

var Titre_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new Array("Nom","N�");

	/* Ce composant repr�sente: des �l�ments de la table canton sous le nom "Cantons disponibles" */
var Compo_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clCompoListe(Groupes_de_cantons_Indpt_Cantons_disponibles_2,new Array(new clInterfaceFiltrageVide()),Titre_Groupes_de_cantons_Indpt_Cantons_disponibles_2,"Cantons disponibles",true,true);

	/* Ce composant repr�sente: groupecanton.undefined sous le nom "Liste des groupes de cantons" */
 if(ALeDroit(0,"groupecanton"))
 {
Compo_Groupes_de_cantons_Liste_des_groupes_de_cantons0.GenererXUL(top.document.getElementById("Groupes_de_cantons_Liste_des_groupes_de_cantons0"));

 }

	/* On l'ajoute au tableau global � l'indice 831*/
top.TAB_GLOBAL_COMPO[831]=Compo_Groupes_de_cantons_Liste_des_groupes_de_cantons0;

	/* Ce composant repr�sente: des �l�ments de la table groupecanton sous le nom "Libell�" */
 if(ALeDroit(0,"groupecanton"))
 {
Compo_Groupes_de_cantons_Libell�_1.GenererXUL(top.document.getElementById("Groupes_de_cantons_Liste_des_groupes_de_cantons0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 834*/
top.TAB_GLOBAL_COMPO[834]=Compo_Groupes_de_cantons_Libell�_1;

	/* Ce composant repr�sente: canton.undefined sous le nom "Cantons disponibles" */
 if(ALeDroit(0,"canton"))
 {
Compo_Groupes_de_cantons_Indpt_Cantons_disponibles_2.GenererXUL(top.document.getElementById("ListeDessus_Groupes_de_cantons_Cantons_appartenant_au_groupe_3"));

 }

	/* On l'ajoute au tableau global � l'indice 835*/
top.TAB_GLOBAL_COMPO[835]=Compo_Groupes_de_cantons_Indpt_Cantons_disponibles_2;

	/* Ce composant repr�sente: canton.undefined sous le nom "Cantons appartenant au groupe" */
 if(ALeDroit(0,"canton"))
 {
Compo_Groupes_de_cantons_Cantons_appartenant_au_groupe_3.GenererXUL(top.document.getElementById("Groupes_de_cantons_Cantons_appartenant_au_groupe_3"));

 }

	/* On l'ajoute au tableau global � l'indice 838*/
top.TAB_GLOBAL_COMPO[838]=Compo_Groupes_de_cantons_Cantons_appartenant_au_groupe_3;
var Col_N0_N__De_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0=new clAttribut("im_numero","impression",null);

var Col_N1_Libell�_De_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0=new clAttribut("im_libelle","impression",null);

var Mod�les_d_impressions_Libell�_1=new clAttribut("im_libelle","impression",null);


	/* Ce composant repr�sente: impression.im_libelle sous le nom "Libell�" */
var Compo_Mod�les_d_impressions_Libell�_1=new clCompoTextBox(Mod�les_d_impressions_Libell�_1,null,"Libell�",false,false);
var Mod�les_d_impressions_Nom_logique_2=new clAttribut("im_nom","impression",null);


	/* Ce composant repr�sente: impression.im_nom sous le nom "Nom logique" */
var Compo_Mod�les_d_impressions_Nom_logique_2=new clCompoTextBox(Mod�les_d_impressions_Nom_logique_2,null,"Nom logique",false,false);
var Mod�les_d_impressions_Mod�le_3=new clAttribut("im_modele","impression",null);


	/* Ce composant repr�sente: impression.im_modele sous le nom "Mod�le" */
var Compo_Mod�les_d_impressions_Mod�le_3=new clCompoTextBox(Mod�les_d_impressions_Mod�le_3,null,"Mod�le",false,true);
var Mod�les_d_impressions_Mod�le_utilis�_par_d�faut_4=new clAttribut("im_defaut","impression",null);


	/* Ce composant repr�sente: impression.im_defaut sous le nom "Mod�le utilis� par d�faut" */
var Compo_Mod�les_d_impressions_Mod�le_utilis�_par_d�faut_4=new clCompoCheckBox(Mod�les_d_impressions_Mod�le_utilis�_par_d�faut_4,null,"Mod�le utilis� par d�faut");
var Mod�les_d_impressions_Table_utilis�e_5=new clAttribut("im_keytable","impression",null);


	/* Ce composant repr�sente: impression.im_keytable sous le nom "Table utilis�e" */
var Compo_Mod�les_d_impressions_Table_utilis�e_5=new clCompoTextBox(Mod�les_d_impressions_Table_utilis�e_5,null,"Table utilis�e",false,false);
var Mod�les_d_impressions_Sa_cl�_6=new clAttribut("im_keycle","impression",null);


	/* Ce composant repr�sente: impression.im_keycle sous le nom "Sa cl�" */
var Compo_Mod�les_d_impressions_Sa_cl�_6=new clCompoTextBox(Mod�les_d_impressions_Sa_cl�_6,null,"Sa cl�",false,false);
var Mod�les_d_impressions_Son_champs_date_7=new clAttribut("im_keydate","impression",null);


	/* Ce composant repr�sente: impression.im_keydate sous le nom "Son champs date" */
var Compo_Mod�les_d_impressions_Son_champs_date_7=new clCompoTextBox(Mod�les_d_impressions_Son_champs_date_7,null,"Son champs date",false,false);
var Mod�les_d_impressions_Liste_des_mod�les_d_impressions0=new clEnsembleAttributs("impression",
	new Array(
	new clLiaison(null,Col_N0_N__De_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0)
	,new clLiaison(null,Col_N1_Libell�_De_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0)
	),
	new Array(
	new clLiaison(null,Mod�les_d_impressions_Libell�_1)
	,new clLiaison(null,Mod�les_d_impressions_Nom_logique_2)
	,new clLiaison(null,Mod�les_d_impressions_Mod�le_3)
	,new clLiaison(null,Mod�les_d_impressions_Mod�le_utilis�_par_d�faut_4)
	,new clLiaison(null,Mod�les_d_impressions_Table_utilis�e_5)
	,new clLiaison(null,Mod�les_d_impressions_Sa_cl�_6)
	,new clLiaison(null,Mod�les_d_impressions_Son_champs_date_7)
	));

var Titre_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0=new Array("N�","Libell�");

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Liste des mod�les d'impressions" */
var Compo_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0=new clCompoListe(Mod�les_d_impressions_Liste_des_mod�les_d_impressions0,new Array(new clInterfaceFiltrageVide()),Titre_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0,"Liste des mod�les d'impressions",true,false);

	/* Ce composant repr�sente: impression.undefined sous le nom "Liste des mod�les d'impressions" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0"));

 }

	/* On l'ajoute au tableau global � l'indice 1045*/
top.TAB_GLOBAL_COMPO[1045]=Compo_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0;

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Libell�" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Libell�_1.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1048*/
top.TAB_GLOBAL_COMPO[1048]=Compo_Mod�les_d_impressions_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Nom logique" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Nom_logique_2.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1049*/
top.TAB_GLOBAL_COMPO[1049]=Compo_Mod�les_d_impressions_Nom_logique_2;

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Mod�le" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Mod�le_3.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1050*/
top.TAB_GLOBAL_COMPO[1050]=Compo_Mod�les_d_impressions_Mod�le_3;

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Mod�le utilis� par d�faut" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Mod�le_utilis�_par_d�faut_4.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1051*/
top.TAB_GLOBAL_COMPO[1051]=Compo_Mod�les_d_impressions_Mod�le_utilis�_par_d�faut_4;

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Table utilis�e" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Table_utilis�e_5.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1052*/
top.TAB_GLOBAL_COMPO[1052]=Compo_Mod�les_d_impressions_Table_utilis�e_5;

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Sa cl�" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Sa_cl�_6.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1053*/
top.TAB_GLOBAL_COMPO[1053]=Compo_Mod�les_d_impressions_Sa_cl�_6;

	/* Ce composant repr�sente: des �l�ments de la table impression sous le nom "Son champs date" */
 if(ALeDroit(0,"impression"))
 {
Compo_Mod�les_d_impressions_Son_champs_date_7.GenererXUL(top.document.getElementById("Mod�les_d_impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1054*/
top.TAB_GLOBAL_COMPO[1054]=Compo_Mod�les_d_impressions_Son_champs_date_7;
var Col_N0_Libell�_De_Impressions_Liste_des_mod�les_d_impressions0=new clAttribut("im_libelle","table_impression",null);

var Col_N1_Soci�t�_De_Impressions_Liste_des_mod�les_d_impressions0=new clAttribut("so_libelle","societe",null);

var Joint_Col_N1_Soci�t�_De_Impressions_Liste_des_mod�les_d_impressions0=new clJointureMulti("table_impression",
	new Array(
	new stJointure("societe","im_societe","so_numero",null,true)
	));
var Impressions_Soci�t�_1=new clAttribut("so_libelle","societe",null);


	/* Ce composant repr�sente: societe.so_libelle sous le nom "Soci�t�" */
var Compo_Impressions_Soci�t�_1=new clCompoListeDeroulanteSimple(Impressions_Soci�t�_1,null,"Soci�t�");
var Joint_Esclave_Impressions_Soci�t�_1=new clJointureMulti("table_impression",
	new Array(
	new stJointure("societe","im_societe","so_numero",null,false)
	));
var Impressions_Libell�_2=new clAttribut("im_libelle","table_impression",null);


	/* Ce composant repr�sente: table_impression.im_libelle sous le nom "Libell�" */
var Compo_Impressions_Libell�_2=new clCompoTextBox(Impressions_Libell�_2,null,"Libell�",false,false);
var Impressions_Nom_logique_3=new clAttribut("im_nom","table_impression",null);


	/* Ce composant repr�sente: table_impression.im_nom sous le nom "Nom logique" */
var Compo_Impressions_Nom_logique_3=new clCompoTextBox(Impressions_Nom_logique_3,null,"Nom logique",false,false);
var Impressions_Mod�le_4=new clAttribut("im_modele","table_impression",null);


	/* Ce composant repr�sente: table_impression.im_modele sous le nom "Mod�le" */
var Compo_Impressions_Mod�le_4=new clCompoTextBox(Impressions_Mod�le_4,null,"Mod�le",false,true);
var Impressions_Mod�le_utilis�_par_d�faut_5=new clAttribut("im_defaut","table_impression",null);


	/* Ce composant repr�sente: table_impression.im_defaut sous le nom "Mod�le utilis� par d�faut" */
var Compo_Impressions_Mod�le_utilis�_par_d�faut_5=new clCompoCheckBox(Impressions_Mod�le_utilis�_par_d�faut_5,null,"Mod�le utilis� par d�faut");
var Impressions_Table_utilis�e_6=new clAttribut("im_keytable","table_impression",null);


	/* Ce composant repr�sente: table_impression.im_keytable sous le nom "Table utilis�e" */
var Compo_Impressions_Table_utilis�e_6=new clCompoTextBox(Impressions_Table_utilis�e_6,null,"Table utilis�e",false,false);
var Impressions_Sa_cl�_7=new clAttribut("im_keycle","table_impression",null);


	/* Ce composant repr�sente: table_impression.im_keycle sous le nom "Sa cl�" */
var Compo_Impressions_Sa_cl�_7=new clCompoTextBox(Impressions_Sa_cl�_7,null,"Sa cl�",false,false);
var Impressions_Son_champs_date_8=new clAttribut("im_keydate","table_impression",null);


	/* Ce composant repr�sente: table_impression.im_keydate sous le nom "Son champs date" */
var Compo_Impressions_Son_champs_date_8=new clCompoTextBox(Impressions_Son_champs_date_8,null,"Son champs date",false,false);
var Impressions_Liste_des_mod�les_d_impressions0=new clEnsembleAttributs("table_impression",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Impressions_Liste_des_mod�les_d_impressions0)
	,new clLiaison(Joint_Col_N1_Soci�t�_De_Impressions_Liste_des_mod�les_d_impressions0,Col_N1_Soci�t�_De_Impressions_Liste_des_mod�les_d_impressions0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Impressions_Soci�t�_1,Impressions_Soci�t�_1)
	,new clLiaison(null,Impressions_Libell�_2)
	,new clLiaison(null,Impressions_Nom_logique_3)
	,new clLiaison(null,Impressions_Mod�le_4)
	,new clLiaison(null,Impressions_Mod�le_utilis�_par_d�faut_5)
	,new clLiaison(null,Impressions_Table_utilis�e_6)
	,new clLiaison(null,Impressions_Sa_cl�_7)
	,new clLiaison(null,Impressions_Son_champs_date_8)
	));

var Titre_Impressions_Liste_des_mod�les_d_impressions0=new Array("Libell�","Soci�t�");

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Liste des mod�les d'impressions" */
var Compo_Impressions_Liste_des_mod�les_d_impressions0=new clCompoListe(Impressions_Liste_des_mod�les_d_impressions0,new Array(new clInterfaceFiltrageVide()),Titre_Impressions_Liste_des_mod�les_d_impressions0,"Liste des mod�les d'impressions",true,false);

	/* Ce composant repr�sente: table_impression.undefined sous le nom "Liste des mod�les d'impressions" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Liste_des_mod�les_d_impressions0.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0"));

 }

	/* On l'ajoute au tableau global � l'indice 1055*/
top.TAB_GLOBAL_COMPO[1055]=Compo_Impressions_Liste_des_mod�les_d_impressions0;

	/* Ce composant repr�sente: des �l�ments de la table societe sous le nom "Soci�t�" */
 if(ALeDroit(0,"societe"))
 {
Compo_Impressions_Soci�t�_1.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1058*/
top.TAB_GLOBAL_COMPO[1058]=Compo_Impressions_Soci�t�_1;

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Libell�" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Libell�_2.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1059*/
top.TAB_GLOBAL_COMPO[1059]=Compo_Impressions_Libell�_2;

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Nom logique" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Nom_logique_3.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1060*/
top.TAB_GLOBAL_COMPO[1060]=Compo_Impressions_Nom_logique_3;

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Mod�le" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Mod�le_4.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1061*/
top.TAB_GLOBAL_COMPO[1061]=Compo_Impressions_Mod�le_4;

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Mod�le utilis� par d�faut" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Mod�le_utilis�_par_d�faut_5.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1062*/
top.TAB_GLOBAL_COMPO[1062]=Compo_Impressions_Mod�le_utilis�_par_d�faut_5;

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Table utilis�e" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Table_utilis�e_6.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1063*/
top.TAB_GLOBAL_COMPO[1063]=Compo_Impressions_Table_utilis�e_6;

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Sa cl�" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Sa_cl�_7.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1064*/
top.TAB_GLOBAL_COMPO[1064]=Compo_Impressions_Sa_cl�_7;

	/* Ce composant repr�sente: des �l�ments de la table table_impression sous le nom "Son champs date" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Son_champs_date_8.GenererXUL(top.document.getElementById("Impressions_Liste_des_mod�les_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1065*/
top.TAB_GLOBAL_COMPO[1065]=Compo_Impressions_Son_champs_date_8;
var Col_N0_Libell�_De_Mod�les_Liste_des_mod�les0=new clAttribut("mo_libelle","modele",null);

var Mod�les_Libell�_1=new clAttribut("mo_libelle","modele",null);


	/* Ce composant repr�sente: modele.mo_libelle sous le nom "Libell�" */
var Compo_Mod�les_Libell�_1=new clCompoTextBox(Mod�les_Libell�_1,null,"Libell�",false,false);
var Col_N0_Produit_De_Mod�les_Lignes_du_mod�le_2=new clAttribut("pd_libelle","produit",null);

var Joint_Col_N0_Produit_De_Mod�les_Lignes_du_mod�le_2=new clJointureMulti("lignemodele",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,true)
	));
var Col_N1_Montant_HT_De_Mod�les_Lignes_du_mod�le_2=new clAttribut("lm_montantht","lignemodele",null);

var Col_N2_Montant_TTC_De_Mod�les_Lignes_du_mod�le_2=new clAttribut("lm_montantttc","lignemodele",null);

var Col_N3_Qt�__De_Mod�les_Lignes_du_mod�le_2=new clAttribut("lm_quantite","lignemodele",null);

var Mod�les_Produit_3=new clAttribut("pd_libelle","produit",null);


	/* Ce composant repr�sente: produit.pd_libelle sous le nom "Produit" */
var Compo_Mod�les_Produit_3=new clCompoListeDeroulanteSimple(Mod�les_Produit_3,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Produits_1=new clInterfaceFiltrageRelationOnglet("Produits",Gerer_Produits,OuvrirOnglet_Mod�les)),"Produit");
var Joint_Esclave_Mod�les_Produit_3=new clJointureMulti("lignemodele",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,false)
	));
var Mod�les_Montant_HT_4=new clAttribut("lm_montantht","lignemodele",null);


	/* Ce composant repr�sente: lignemodele.lm_montantht sous le nom "Montant HT" */
var Compo_Mod�les_Montant_HT_4=new clCompoTextBox(Mod�les_Montant_HT_4,null,"Montant HT",false,false);
var Mod�les_Montant_TTC_5=new clAttribut("lm_montantttc","lignemodele",null);


	/* Ce composant repr�sente: lignemodele.lm_montantttc sous le nom "Montant TTC" */
var Compo_Mod�les_Montant_TTC_5=new clCompoTextBox(Mod�les_Montant_TTC_5,null,"Montant TTC",false,false);
var Mod�les_Quantit�_6=new clAttribut("lm_quantite","lignemodele",null);


	/* Ce composant repr�sente: lignemodele.lm_quantite sous le nom "Quantit�" */
var Compo_Mod�les_Quantit�_6=new clCompoTextBox(Mod�les_Quantit�_6,null,"Quantit�",false,false);
var Mod�les_Lignes_du_mod�le_2=new clEnsembleAttributs("lignemodele",
	new Array(
	new clLiaison(Joint_Col_N0_Produit_De_Mod�les_Lignes_du_mod�le_2,Col_N0_Produit_De_Mod�les_Lignes_du_mod�le_2)
	,new clLiaison(null,Col_N1_Montant_HT_De_Mod�les_Lignes_du_mod�le_2)
	,new clLiaison(null,Col_N2_Montant_TTC_De_Mod�les_Lignes_du_mod�le_2)
	,new clLiaison(null,Col_N3_Qt�__De_Mod�les_Lignes_du_mod�le_2)
	),
	new Array(
	new clLiaison(Joint_Esclave_Mod�les_Produit_3,Mod�les_Produit_3)
	,new clLiaison(null,Mod�les_Montant_HT_4)
	,new clLiaison(null,Mod�les_Montant_TTC_5)
	,new clLiaison(null,Mod�les_Quantit�_6)
	));

var Titre_Mod�les_Lignes_du_mod�le_2=new Array("Produit","Montant HT","Montant TTC","Qt�.");

	/* Ce composant repr�sente: des �l�ments de la table lignemodele sous le nom "Lignes du mod�le" */
var Compo_Mod�les_Lignes_du_mod�le_2=new clCompoListe(Mod�les_Lignes_du_mod�le_2,null,Titre_Mod�les_Lignes_du_mod�le_2,"Lignes du mod�le",true,false);
var Joint_Esclave_Mod�les_Lignes_du_mod�le_2=new clJointureMulti("modele",
	new Array(
	new stJointure("lignemodele","mo_numero","mo_numero",null,false)
	));
var Mod�les_Liste_des_mod�les0=new clEnsembleAttributs("modele",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Mod�les_Liste_des_mod�les0)
	),
	new Array(
	new clLiaison(null,Mod�les_Libell�_1)
	,new clLiaison(Joint_Esclave_Mod�les_Lignes_du_mod�le_2,Mod�les_Lignes_du_mod�le_2)
	));

var Titre_Mod�les_Liste_des_mod�les0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table modele sous le nom "Liste des mod�les" */
var Compo_Mod�les_Liste_des_mod�les0=new clCompoListe(Mod�les_Liste_des_mod�les0,new Array(new clInterfaceFiltrageVide()),Titre_Mod�les_Liste_des_mod�les0,"Liste des mod�les",true,false);

	/* Ce composant repr�sente: modele.undefined sous le nom "Liste des mod�les" */
 if(ALeDroit(0,"modele"))
 {
Compo_Mod�les_Liste_des_mod�les0.GenererXUL(top.document.getElementById("Mod�les_Liste_des_mod�les0"));

 }

	/* On l'ajoute au tableau global � l'indice 1033*/
top.TAB_GLOBAL_COMPO[1033]=Compo_Mod�les_Liste_des_mod�les0;

	/* Ce composant repr�sente: des �l�ments de la table modele sous le nom "Libell�" */
 if(ALeDroit(0,"modele"))
 {
Compo_Mod�les_Libell�_1.GenererXUL(top.document.getElementById("Mod�les_Liste_des_mod�les0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1035*/
top.TAB_GLOBAL_COMPO[1035]=Compo_Mod�les_Libell�_1;

	/* Ce composant repr�sente: lignemodele.undefined sous le nom "Lignes du mod�le" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Mod�les_Lignes_du_mod�le_2.GenererXUL(top.document.getElementById("Mod�les_Lignes_du_mod�le_2"));

 }

	/* On l'ajoute au tableau global � l'indice 1036*/
top.TAB_GLOBAL_COMPO[1036]=Compo_Mod�les_Lignes_du_mod�le_2;

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Produit" */
 if(ALeDroit(0,"produit"))
 {
Compo_Mod�les_Produit_3.GenererXUL(top.document.getElementById("Mod�les_Lignes_du_mod�le_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1041*/
top.TAB_GLOBAL_COMPO[1041]=Compo_Mod�les_Produit_3;

	/* Ce composant repr�sente: des �l�ments de la table lignemodele sous le nom "Montant HT" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Mod�les_Montant_HT_4.GenererXUL(top.document.getElementById("Mod�les_Lignes_du_mod�le_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1042*/
top.TAB_GLOBAL_COMPO[1042]=Compo_Mod�les_Montant_HT_4;

	/* Ce composant repr�sente: des �l�ments de la table lignemodele sous le nom "Montant TTC" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Mod�les_Montant_TTC_5.GenererXUL(top.document.getElementById("Mod�les_Lignes_du_mod�le_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1043*/
top.TAB_GLOBAL_COMPO[1043]=Compo_Mod�les_Montant_TTC_5;

	/* Ce composant repr�sente: des �l�ments de la table lignemodele sous le nom "Quantit�" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Mod�les_Quantit�_6.GenererXUL(top.document.getElementById("Mod�les_Lignes_du_mod�le_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1044*/
top.TAB_GLOBAL_COMPO[1044]=Compo_Mod�les_Quantit�_6;
var Col_N0_N__De_Mode_de_r�glements_Liste_des_modes_de_r�glement0=new clAttribut("mr_numero","modereglement",null);

var Col_N1_Libell�_De_Mode_de_r�glements_Liste_des_modes_de_r�glement0=new clAttribut("mr_libelle","modereglement",null);

var Col_N2_N_Compte_De_Mode_de_r�glements_Liste_des_modes_de_r�glement0=new clAttribut("cg_numcompte","comptegen",null);

var Joint_Col_N2_N_Compte_De_Mode_de_r�glements_Liste_des_modes_de_r�glement0=new clJointureMulti("modereglement",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Mode_de_r�glements_Libell�_1=new clAttribut("mr_libelle","modereglement",null);


	/* Ce composant repr�sente: modereglement.mr_libelle sous le nom "Libell�" */
var Compo_Mode_de_r�glements_Libell�_1=new clCompoTextBox(Mode_de_r�glements_Libell�_1,null,"Libell�",false,false);
var Mode_de_r�glements_N_Compte_bancaire_2=new clAttribut("mr_compte","modereglement",null);


	/* Ce composant repr�sente: modereglement.mr_compte sous le nom "N�Compte bancaire" */
var Compo_Mode_de_r�glements_N_Compte_bancaire_2=new clCompoTextBox(Mode_de_r�glements_N_Compte_bancaire_2,null,"N�Compte bancaire",false,false);
var Mode_de_r�glements_Compte_g�n�ral_3=new clAttribut("cg_numcompte","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_numcompte sous le nom "Compte g�n�ral" */
var Compo_Mode_de_r�glements_Compte_g�n�ral_3=new clCompoListeDeroulanteSimple(Mode_de_r�glements_Compte_g�n�ral_3,null,"Compte g�n�ral");
var Joint_Esclave_Mode_de_r�glements_Compte_g�n�ral_3=new clJointureMulti("modereglement",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Mode_de_r�glements_Ceci_est_un_mode_de_r�glement_par_ch�que_4=new clAttribut("mr_cheque","modereglement",null);


	/* Ce composant repr�sente: modereglement.mr_cheque sous le nom "Ceci est un mode de r�glement par ch�que" */
var Compo_Mode_de_r�glements_Ceci_est_un_mode_de_r�glement_par_ch�que_4=new clCompoCheckBox(Mode_de_r�glements_Ceci_est_un_mode_de_r�glement_par_ch�que_4,null,"Ceci est un mode de r�glement par ch�que");
var Mode_de_r�glements_Actif_5=new clAttribut("mr_actif","modereglement",null);


	/* Ce composant repr�sente: modereglement.mr_actif sous le nom "Actif" */
var Compo_Mode_de_r�glements_Actif_5=new clCompoCheckBox(Mode_de_r�glements_Actif_5,null,"Actif");
var Mode_de_r�glements_Description_6=new clAttribut("mr_description","modereglement",null);


	/* Ce composant repr�sente: modereglement.mr_description sous le nom "Description" */
var Compo_Mode_de_r�glements_Description_6=new clCompoTextBox(Mode_de_r�glements_Description_6,null,"Description",false,true);
var Mode_de_r�glements_Liste_des_modes_de_r�glement0=new clEnsembleAttributs("modereglement",
	new Array(
	new clLiaison(null,Col_N0_N__De_Mode_de_r�glements_Liste_des_modes_de_r�glement0)
	,new clLiaison(null,Col_N1_Libell�_De_Mode_de_r�glements_Liste_des_modes_de_r�glement0)
	,new clLiaison(Joint_Col_N2_N_Compte_De_Mode_de_r�glements_Liste_des_modes_de_r�glement0,Col_N2_N_Compte_De_Mode_de_r�glements_Liste_des_modes_de_r�glement0)
	),
	new Array(
	new clLiaison(null,Mode_de_r�glements_Libell�_1)
	,new clLiaison(null,Mode_de_r�glements_N_Compte_bancaire_2)
	,new clLiaison(Joint_Esclave_Mode_de_r�glements_Compte_g�n�ral_3,Mode_de_r�glements_Compte_g�n�ral_3)
	,new clLiaison(null,Mode_de_r�glements_Ceci_est_un_mode_de_r�glement_par_ch�que_4)
	,new clLiaison(null,Mode_de_r�glements_Actif_5)
	,new clLiaison(null,Mode_de_r�glements_Description_6)
	));

var Titre_Mode_de_r�glements_Liste_des_modes_de_r�glement0=new Array("N�","Libell�","N�Compte");

	/* Ce composant repr�sente: des �l�ments de la table modereglement sous le nom "Liste des modes de r�glement" */
var Compo_Mode_de_r�glements_Liste_des_modes_de_r�glement0=new clCompoListe(Mode_de_r�glements_Liste_des_modes_de_r�glement0,new Array(new clInterfaceFiltrageVide()),Titre_Mode_de_r�glements_Liste_des_modes_de_r�glement0,"Liste des modes de r�glement",true,false);

	/* Ce composant repr�sente: modereglement.undefined sous le nom "Liste des modes de r�glement" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_r�glements_Liste_des_modes_de_r�glement0.GenererXUL(top.document.getElementById("Mode_de_r�glements_Liste_des_modes_de_r�glement0"));

 }

	/* On l'ajoute au tableau global � l'indice 800*/
top.TAB_GLOBAL_COMPO[800]=Compo_Mode_de_r�glements_Liste_des_modes_de_r�glement0;

	/* Ce composant repr�sente: des �l�ments de la table modereglement sous le nom "Libell�" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_r�glements_Libell�_1.GenererXUL(top.document.getElementById("Mode_de_r�glements_Liste_des_modes_de_r�glement0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 804*/
top.TAB_GLOBAL_COMPO[804]=Compo_Mode_de_r�glements_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table modereglement sous le nom "N�Compte bancaire" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_r�glements_N_Compte_bancaire_2.GenererXUL(top.document.getElementById("Mode_de_r�glements_Liste_des_modes_de_r�glement0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 805*/
top.TAB_GLOBAL_COMPO[805]=Compo_Mode_de_r�glements_N_Compte_bancaire_2;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Compte g�n�ral" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Mode_de_r�glements_Compte_g�n�ral_3.GenererXUL(top.document.getElementById("Mode_de_r�glements_Liste_des_modes_de_r�glement0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 806*/
top.TAB_GLOBAL_COMPO[806]=Compo_Mode_de_r�glements_Compte_g�n�ral_3;

	/* Ce composant repr�sente: des �l�ments de la table modereglement sous le nom "Ceci est un mode de r�glement par ch�que" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_r�glements_Ceci_est_un_mode_de_r�glement_par_ch�que_4.GenererXUL(top.document.getElementById("Mode_de_r�glements_Liste_des_modes_de_r�glement0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 807*/
top.TAB_GLOBAL_COMPO[807]=Compo_Mode_de_r�glements_Ceci_est_un_mode_de_r�glement_par_ch�que_4;

	/* Ce composant repr�sente: des �l�ments de la table modereglement sous le nom "Actif" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_r�glements_Actif_5.GenererXUL(top.document.getElementById("Mode_de_r�glements_Liste_des_modes_de_r�glement0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 808*/
top.TAB_GLOBAL_COMPO[808]=Compo_Mode_de_r�glements_Actif_5;

	/* Ce composant repr�sente: des �l�ments de la table modereglement sous le nom "Description" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_r�glements_Description_6.GenererXUL(top.document.getElementById("Mode_de_r�glements_Liste_des_modes_de_r�glement0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 809*/
top.TAB_GLOBAL_COMPO[809]=Compo_Mode_de_r�glements_Description_6;
var Col_N0_Libell�_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0=new clAttribut("mp_libelle","moderepartition",null);

var Col_N1_N_Compte_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0=new clAttribut("cg_numcompte","comptegen",null);

var Joint_Col_N1_N_Compte_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Col_N2_Soci�t�_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0=new clAttribut("so_libelle","societe",null);

var Joint_Col_N2_Soci�t�_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("societe","mp_societe","so_numero",null,true)
	));
var Modes_de_r�partition_Libell�_1=new clAttribut("mp_libelle","moderepartition",null);


	/* Ce composant repr�sente: moderepartition.mp_libelle sous le nom "Libell�" */
var Compo_Modes_de_r�partition_Libell�_1=new clCompoTextBox(Modes_de_r�partition_Libell�_1,null,"Libell�",false,false);
var Modes_de_r�partition_Compte_g�n�ral_2=new clAttribut("cg_numcompte","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_numcompte sous le nom "Compte g�n�ral" */
var Compo_Modes_de_r�partition_Compte_g�n�ral_2=new clCompoListeDeroulanteSimple(Modes_de_r�partition_Compte_g�n�ral_2,null,"Compte g�n�ral");
var Joint_Esclave_Modes_de_r�partition_Compte_g�n�ral_2=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Modes_de_r�partition_Actif_3=new clAttribut("mp_actif","moderepartition",null);


	/* Ce composant repr�sente: moderepartition.mp_actif sous le nom "Actif" */
var Compo_Modes_de_r�partition_Actif_3=new clCompoCheckBox(Modes_de_r�partition_Actif_3,null,"Actif");
var Modes_de_r�partition_Soci�t�_vis�e_4=new clAttribut("so_libelle","societe",null);


	/* Ce composant repr�sente: societe.so_libelle sous le nom "Soci�t� vis�e" */
var Compo_Modes_de_r�partition_Soci�t�_vis�e_4=new clCompoListeDeroulanteSimple(Modes_de_r�partition_Soci�t�_vis�e_4,null,"Soci�t� vis�e");
var Joint_Esclave_Modes_de_r�partition_Soci�t�_vis�e_4=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("societe","mp_societe","so_numero",null,false)
	));
var Modes_de_r�partition_Description_5=new clAttribut("mp_description","moderepartition",null);


	/* Ce composant repr�sente: moderepartition.mp_description sous le nom "Description" */
var Compo_Modes_de_r�partition_Description_5=new clCompoTextBox(Modes_de_r�partition_Description_5,null,"Description",false,true);
var Modes_de_r�partition_Liste_des_modes_de_r�partition0=new clEnsembleAttributs("moderepartition",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0)
	,new clLiaison(Joint_Col_N1_N_Compte_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0,Col_N1_N_Compte_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0)
	,new clLiaison(Joint_Col_N2_Soci�t�_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0,Col_N2_Soci�t�_De_Modes_de_r�partition_Liste_des_modes_de_r�partition0)
	),
	new Array(
	new clLiaison(null,Modes_de_r�partition_Libell�_1)
	,new clLiaison(Joint_Esclave_Modes_de_r�partition_Compte_g�n�ral_2,Modes_de_r�partition_Compte_g�n�ral_2)
	,new clLiaison(null,Modes_de_r�partition_Actif_3)
	,new clLiaison(Joint_Esclave_Modes_de_r�partition_Soci�t�_vis�e_4,Modes_de_r�partition_Soci�t�_vis�e_4)
	,new clLiaison(null,Modes_de_r�partition_Description_5)
	));

var Titre_Modes_de_r�partition_Liste_des_modes_de_r�partition0=new Array("Libell�","N�Compte","Soci�t�");

	/* Ce composant repr�sente: des �l�ments de la table moderepartition sous le nom "Liste des modes de r�partition" */
var Compo_Modes_de_r�partition_Liste_des_modes_de_r�partition0=new clCompoListe(Modes_de_r�partition_Liste_des_modes_de_r�partition0,new Array(new clInterfaceFiltrageVide()),Titre_Modes_de_r�partition_Liste_des_modes_de_r�partition0,"Liste des modes de r�partition",true,false);

	/* Ce composant repr�sente: moderepartition.undefined sous le nom "Liste des modes de r�partition" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_r�partition_Liste_des_modes_de_r�partition0.GenererXUL(top.document.getElementById("Modes_de_r�partition_Liste_des_modes_de_r�partition0"));

 }

	/* On l'ajoute au tableau global � l'indice 810*/
top.TAB_GLOBAL_COMPO[810]=Compo_Modes_de_r�partition_Liste_des_modes_de_r�partition0;

	/* Ce composant repr�sente: des �l�ments de la table moderepartition sous le nom "Libell�" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_r�partition_Libell�_1.GenererXUL(top.document.getElementById("Modes_de_r�partition_Liste_des_modes_de_r�partition0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 814*/
top.TAB_GLOBAL_COMPO[814]=Compo_Modes_de_r�partition_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Compte g�n�ral" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Modes_de_r�partition_Compte_g�n�ral_2.GenererXUL(top.document.getElementById("Modes_de_r�partition_Liste_des_modes_de_r�partition0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 815*/
top.TAB_GLOBAL_COMPO[815]=Compo_Modes_de_r�partition_Compte_g�n�ral_2;

	/* Ce composant repr�sente: des �l�ments de la table moderepartition sous le nom "Actif" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_r�partition_Actif_3.GenererXUL(top.document.getElementById("Modes_de_r�partition_Liste_des_modes_de_r�partition0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 816*/
top.TAB_GLOBAL_COMPO[816]=Compo_Modes_de_r�partition_Actif_3;

	/* Ce composant repr�sente: des �l�ments de la table societe sous le nom "Soci�t� vis�e" */
 if(ALeDroit(0,"societe"))
 {
Compo_Modes_de_r�partition_Soci�t�_vis�e_4.GenererXUL(top.document.getElementById("Modes_de_r�partition_Liste_des_modes_de_r�partition0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 817*/
top.TAB_GLOBAL_COMPO[817]=Compo_Modes_de_r�partition_Soci�t�_vis�e_4;

	/* Ce composant repr�sente: des �l�ments de la table moderepartition sous le nom "Description" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_r�partition_Description_5.GenererXUL(top.document.getElementById("Modes_de_r�partition_Liste_des_modes_de_r�partition0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 818*/
top.TAB_GLOBAL_COMPO[818]=Compo_Modes_de_r�partition_Description_5;
var Col_N0_N__De_Natures_de_personne_Liste_des_�tats_de_personne0=new clAttribut("np_numero","naturepersonne",null);

var Col_N1_Nom_______De_Natures_de_personne_Liste_des_�tats_de_personne0=new clAttribut("np_nom","naturepersonne",null);

var Col_N2_Titre___De_Natures_de_personne_Liste_des_�tats_de_personne0=new clAttribut("np_abrev","naturepersonne",null);

var Col_N3_Genre_De_Natures_de_personne_Liste_des_�tats_de_personne0=new clAttribut("np_genre","naturepersonne",null);

var Natures_de_personne_Nom_1=new clAttribut("np_nom","naturepersonne",null);


	/* Ce composant repr�sente: naturepersonne.np_nom sous le nom "Nom" */
var Compo_Natures_de_personne_Nom_1=new clCompoTextBox(Natures_de_personne_Nom_1,null,"Nom",false,false);
var Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2=new clAttribut("np_abrev","naturepersonne",null);


	/* Ce composant repr�sente: naturepersonne.np_abrev sous le nom "Titre ou Abreviation de la forme juridique (sans point)" */
var Compo_Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2=new clCompoTextBox(Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2,null,"Titre ou Abreviation de la forme juridique (sans point)",false,false);
var Natures_de_personne_Entit�_morale_3=new clAttribut("np_morale","naturepersonne",null);


	/* Ce composant repr�sente: naturepersonne.np_morale sous le nom "Entit� morale" */
var Compo_Natures_de_personne_Entit�_morale_3=new clCompoCheckBox(Natures_de_personne_Entit�_morale_3,null,"Entit� morale");
var Natures_de_personne_Utilise_le_titre_abrev__4=new clAttribut("np_avectitre","naturepersonne",null);


	/* Ce composant repr�sente: naturepersonne.np_avectitre sous le nom "Utilise le titre/abrev." */
var Compo_Natures_de_personne_Utilise_le_titre_abrev__4=new clCompoCheckBox(Natures_de_personne_Utilise_le_titre_abrev__4,null,"Utilise le titre/abrev.");
var Natures_de_personne_La_forme_juridique_doit_�tre_incluse_dans_la_d�signation_sociale_5=new clAttribut("np_inclu","naturepersonne",null);


	/* Ce composant repr�sente: naturepersonne.np_inclu sous le nom "La forme juridique doit �tre incluse dans la d�signation sociale" */
var Compo_Natures_de_personne_La_forme_juridique_doit_�tre_incluse_dans_la_d�signation_sociale_5=new clCompoCheckBox(Natures_de_personne_La_forme_juridique_doit_�tre_incluse_dans_la_d�signation_sociale_5,null,"La forme juridique doit �tre incluse dans la d�signation sociale");
var Natures_de_personne_Genre_6=new clAttribut("np_genre","naturepersonne",null);


	/* Ce composant repr�sente: naturepersonne.np_genre sous le nom "Genre" */
var Compo_Natures_de_personne_Genre_6=new clCompoTextBox(Natures_de_personne_Genre_6,null,"Genre",false,false);
var Natures_de_personne_Liste_des_�tats_de_personne0=new clEnsembleAttributs("naturepersonne",
	new Array(
	new clLiaison(null,Col_N0_N__De_Natures_de_personne_Liste_des_�tats_de_personne0)
	,new clLiaison(null,Col_N1_Nom_______De_Natures_de_personne_Liste_des_�tats_de_personne0)
	,new clLiaison(null,Col_N2_Titre___De_Natures_de_personne_Liste_des_�tats_de_personne0)
	,new clLiaison(null,Col_N3_Genre_De_Natures_de_personne_Liste_des_�tats_de_personne0)
	),
	new Array(
	new clLiaison(null,Natures_de_personne_Nom_1)
	,new clLiaison(null,Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2)
	,new clLiaison(null,Natures_de_personne_Entit�_morale_3)
	,new clLiaison(null,Natures_de_personne_Utilise_le_titre_abrev__4)
	,new clLiaison(null,Natures_de_personne_La_forme_juridique_doit_�tre_incluse_dans_la_d�signation_sociale_5)
	,new clLiaison(null,Natures_de_personne_Genre_6)
	));

var Titre_Natures_de_personne_Liste_des_�tats_de_personne0=new Array("N�","Nom      ","Titre  ","Genre");

	/* Ce composant repr�sente: des �l�ments de la table naturepersonne sous le nom "Liste des �tats de personne" */
var Compo_Natures_de_personne_Liste_des_�tats_de_personne0=new clCompoListe(Natures_de_personne_Liste_des_�tats_de_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Natures_de_personne_Liste_des_�tats_de_personne0,"Liste des �tats de personne",true,false);

	/* Ce composant repr�sente: naturepersonne.undefined sous le nom "Liste des �tats de personne" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Liste_des_�tats_de_personne0.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_�tats_de_personne0"));

 }

	/* On l'ajoute au tableau global � l'indice 852*/
top.TAB_GLOBAL_COMPO[852]=Compo_Natures_de_personne_Liste_des_�tats_de_personne0;

	/* Ce composant repr�sente: des �l�ments de la table naturepersonne sous le nom "Nom" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Nom_1.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_�tats_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 857*/
top.TAB_GLOBAL_COMPO[857]=Compo_Natures_de_personne_Nom_1;

	/* Ce composant repr�sente: des �l�ments de la table naturepersonne sous le nom "Titre ou Abreviation de la forme juridique (sans point)" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_�tats_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 858*/
top.TAB_GLOBAL_COMPO[858]=Compo_Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2;

	/* Ce composant repr�sente: des �l�ments de la table naturepersonne sous le nom "Entit� morale" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Entit�_morale_3.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_�tats_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 859*/
top.TAB_GLOBAL_COMPO[859]=Compo_Natures_de_personne_Entit�_morale_3;

	/* Ce composant repr�sente: des �l�ments de la table naturepersonne sous le nom "Utilise le titre/abrev." */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Utilise_le_titre_abrev__4.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_�tats_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 860*/
top.TAB_GLOBAL_COMPO[860]=Compo_Natures_de_personne_Utilise_le_titre_abrev__4;

	/* Ce composant repr�sente: des �l�ments de la table naturepersonne sous le nom "La forme juridique doit �tre incluse dans la d�signation sociale" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_La_forme_juridique_doit_�tre_incluse_dans_la_d�signation_sociale_5.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_�tats_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 861*/
top.TAB_GLOBAL_COMPO[861]=Compo_Natures_de_personne_La_forme_juridique_doit_�tre_incluse_dans_la_d�signation_sociale_5;

	/* Ce composant repr�sente: des �l�ments de la table naturepersonne sous le nom "Genre" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Genre_6.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_�tats_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 862*/
top.TAB_GLOBAL_COMPO[862]=Compo_Natures_de_personne_Genre_6;
var Col_N0_N__De_P�riodes_Liste_des_p�riodes0=new clAttribut("po_numero","periode",null);

var Col_N1_Du_De_P�riodes_Liste_des_p�riodes0=new clAttribut("po_debut","periode",null);

var Col_N2_Au_De_P�riodes_Liste_des_p�riodes0=new clAttribut("po_fin","periode",null);

var P�riodes_Du_1=new clAttribut("po_debut","periode",null);


	/* Ce composant repr�sente: periode.po_debut sous le nom "Du" */
var Compo_P�riodes_Du_1=new clCompoTextBox(P�riodes_Du_1,null,"Du",false,false);
var P�riodes_Au_2=new clAttribut("po_fin","periode",null);


	/* Ce composant repr�sente: periode.po_fin sous le nom "Au" */
var Compo_P�riodes_Au_2=new clCompoTextBox(P�riodes_Au_2,null,"Au",false,false);
var P�riodes_Liste_des_p�riodes0=new clEnsembleAttributs("periode",
	new Array(
	new clLiaison(null,Col_N0_N__De_P�riodes_Liste_des_p�riodes0)
	,new clLiaison(null,Col_N1_Du_De_P�riodes_Liste_des_p�riodes0)
	,new clLiaison(null,Col_N2_Au_De_P�riodes_Liste_des_p�riodes0)
	),
	new Array(
	new clLiaison(null,P�riodes_Du_1)
	,new clLiaison(null,P�riodes_Au_2)
	));

var Titre_P�riodes_Liste_des_p�riodes0=new Array("N�","Du","Au");

	/* Ce composant repr�sente: des �l�ments de la table periode sous le nom "Liste des p�riodes" */
var Compo_P�riodes_Liste_des_p�riodes0=new clCompoListe(P�riodes_Liste_des_p�riodes0,new Array(new clInterfaceFiltrageVide()),Titre_P�riodes_Liste_des_p�riodes0,"Liste des p�riodes",true,false);

	/* Ce composant repr�sente: periode.undefined sous le nom "Liste des p�riodes" */
 if(ALeDroit(0,"periode"))
 {
Compo_P�riodes_Liste_des_p�riodes0.GenererXUL(top.document.getElementById("P�riodes_Liste_des_p�riodes0"));

 }

	/* On l'ajoute au tableau global � l'indice 1021*/
top.TAB_GLOBAL_COMPO[1021]=Compo_P�riodes_Liste_des_p�riodes0;

	/* Ce composant repr�sente: des �l�ments de la table periode sous le nom "Du" */
 if(ALeDroit(0,"periode"))
 {
Compo_P�riodes_Du_1.GenererXUL(top.document.getElementById("P�riodes_Liste_des_p�riodes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1025*/
top.TAB_GLOBAL_COMPO[1025]=Compo_P�riodes_Du_1;

	/* Ce composant repr�sente: des �l�ments de la table periode sous le nom "Au" */
 if(ALeDroit(0,"periode"))
 {
Compo_P�riodes_Au_2.GenererXUL(top.document.getElementById("P�riodes_Liste_des_p�riodes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1026*/
top.TAB_GLOBAL_COMPO[1026]=Compo_P�riodes_Au_2;
var Col_N0_Nom_De_Pr�fixes_Liste_des_pr�fixes0=new clAttribut("pf_nom","prefixe",null);

var Pr�fixes_Nom_1=new clAttribut("pf_nom","prefixe",null);


	/* Ce composant repr�sente: prefixe.pf_nom sous le nom "Nom" */
var Compo_Pr�fixes_Nom_1=new clCompoTextBox(Pr�fixes_Nom_1,null,"Nom",false,false);
var Pr�fixes_Liste_des_pr�fixes0=new clEnsembleAttributs("prefixe",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Pr�fixes_Liste_des_pr�fixes0)
	),
	new Array(
	new clLiaison(null,Pr�fixes_Nom_1)
	));

var Titre_Pr�fixes_Liste_des_pr�fixes0=new Array("Nom");

	/* Ce composant repr�sente: des �l�ments de la table prefixe sous le nom "Liste des pr�fixes" */
var Compo_Pr�fixes_Liste_des_pr�fixes0=new clCompoListe(Pr�fixes_Liste_des_pr�fixes0,new Array(new clInterfaceFiltrageVide()),Titre_Pr�fixes_Liste_des_pr�fixes0,"Liste des pr�fixes",true,false);

	/* Ce composant repr�sente: prefixe.undefined sous le nom "Liste des pr�fixes" */
 if(ALeDroit(0,"prefixe"))
 {
Compo_Pr�fixes_Liste_des_pr�fixes0.GenererXUL(top.document.getElementById("Pr�fixes_Liste_des_pr�fixes0"));

 }

	/* On l'ajoute au tableau global � l'indice 1030*/
top.TAB_GLOBAL_COMPO[1030]=Compo_Pr�fixes_Liste_des_pr�fixes0;

	/* Ce composant repr�sente: des �l�ments de la table prefixe sous le nom "Nom" */
 if(ALeDroit(0,"prefixe"))
 {
Compo_Pr�fixes_Nom_1.GenererXUL(top.document.getElementById("Pr�fixes_Liste_des_pr�fixes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1032*/
top.TAB_GLOBAL_COMPO[1032]=Compo_Pr�fixes_Nom_1;
var Col_N0_Etat_De_Produits_Liste_des_produits0=new clAttribut("pd_etat","produit",null);

var Col_N1_Libell�_De_Produits_Liste_des_produits0=new clAttribut("pd_libelle","produit",null);

var Produits_Libell�__en_interne__1=new clAttribut("pd_libelle","produit",null);


	/* Ce composant repr�sente: produit.pd_libelle sous le nom "Libell� (en interne)" */
var Compo_Produits_Libell�__en_interne__1=new clCompoTextBox(Produits_Libell�__en_interne__1,null,"Libell� (en interne)",false,false);
var Produits_Titre__pour_les_impressions__2=new clAttribut("pd_titre","produit",null);


	/* Ce composant repr�sente: produit.pd_titre sous le nom "Titre (pour les impressions)" */
var Compo_Produits_Titre__pour_les_impressions__2=new clCompoTextBox(Produits_Titre__pour_les_impressions__2,null,"Titre (pour les impressions)",false,false);
var Produits_Journal_comptable_3=new clAttribut("jo_libelle","journal",null);


	/* Ce composant repr�sente: journal.jo_libelle sous le nom "Journal comptable" */
var Compo_Produits_Journal_comptable_3=new clCompoListeDeroulanteSimple(Produits_Journal_comptable_3,null,"Journal comptable");
var Joint_Esclave_Produits_Journal_comptable_3=new clJointureMulti("produit",
	new Array(
	new stJointure("journal","jo_numero","jo_numero",null,false)
	));
var Produits_Actif_4=new clAttribut("pd_actif","produit",null);


	/* Ce composant repr�sente: produit.pd_actif sous le nom "Actif" */
var Compo_Produits_Actif_4=new clCompoCheckBox(Produits_Actif_4,null,"Actif");
var Produits_Produit_non_quantifiable__Quantit�_1__5=new clAttribut("pd_sansquantite","produit",null);


	/* Ce composant repr�sente: produit.pd_sansquantite sous le nom "Produit non quantifiable (Quantit�=1)" */
var Compo_Produits_Produit_non_quantifiable__Quantit�_1__5=new clCompoCheckBox(Produits_Produit_non_quantifiable__Quantit�_1__5,null,"Produit non quantifiable (Quantit�=1)");
var Produits_Soumis_�_de_potentielles_r�ductions_6=new clAttribut("pd_reduction","produit",null);


	/* Ce composant repr�sente: produit.pd_reduction sous le nom "Soumis � de potentielles r�ductions" */
var Compo_Produits_Soumis_�_de_potentielles_r�ductions_6=new clCompoCheckBox(Produits_Soumis_�_de_potentielles_r�ductions_6,null,"Soumis � de potentielles r�ductions");
var Col_N0_Tarif_HT_De_Produits_Prix_7=new clAttribut("px_tarifht","prix",null);

var Col_N1_Tarif_TTC_De_Produits_Prix_7=new clAttribut("px_tarifttc","prix",null);

var Col_N2_T_V_A__De_Produits_Prix_7=new clAttribut("tv_pourcentage","tva",null);

var Joint_Col_N2_T_V_A__De_Produits_Prix_7=new clJointureMulti("prix",
	new Array(
	new stJointure("tva","tv_numero","tv_numero",null,true)
	));
var Col_N3_Date_application_De_Produits_Prix_7=new clAttribut("px_datedebut","prix",null);

var Produits_Tarif_H_T__8=new clAttribut("px_tarifht","prix",null);


	/* Ce composant repr�sente: prix.px_tarifht sous le nom "Tarif H.T." */
var Compo_Produits_Tarif_H_T__8=new clCompoTextBox(Produits_Tarif_H_T__8,null,"Tarif H.T.",false,false);
var Produits_Tarif_T_T_C__9=new clAttribut("px_tarifttc","prix",null);


	/* Ce composant repr�sente: prix.px_tarifttc sous le nom "Tarif T.T.C." */
var Compo_Produits_Tarif_T_T_C__9=new clCompoTextBox(Produits_Tarif_T_T_C__9,null,"Tarif T.T.C.",false,false);
var Produits_T_V_A__10=new clAttribut("tv_pourcentage","tva",null);


	/* Ce composant repr�sente: tva.tv_pourcentage sous le nom "T.V.A." */
var Compo_Produits_T_V_A__10=new clCompoListeDeroulanteSimple(Produits_T_V_A__10,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_ProduitPrixTva=new clInterfaceFiltragePermanantCustom("tv_actif=true"),Filtre_Dep_TVA_0=new clInterfaceFiltrageRelationOnglet("TVA",Gerer_TVA,OuvrirOnglet_Produits)),"T.V.A.");
var Joint_Esclave_Produits_T_V_A__10=new clJointureMulti("prix",
	new Array(
	new stJointure("tva","tv_numero","tv_numero",null,false)
	));
var Produits_Prix_7=new clEnsembleAttributs("prix",
	new Array(
	new clLiaison(null,Col_N0_Tarif_HT_De_Produits_Prix_7)
	,new clLiaison(null,Col_N1_Tarif_TTC_De_Produits_Prix_7)
	,new clLiaison(Joint_Col_N2_T_V_A__De_Produits_Prix_7,Col_N2_T_V_A__De_Produits_Prix_7)
	,new clLiaison(null,Col_N3_Date_application_De_Produits_Prix_7)
	),
	new Array(
	new clLiaison(null,Produits_Tarif_H_T__8)
	,new clLiaison(null,Produits_Tarif_T_T_C__9)
	,new clLiaison(Joint_Esclave_Produits_T_V_A__10,Produits_T_V_A__10)
	));

var Titre_Produits_Prix_7=new Array("Tarif HT","Tarif TTC","T.V.A.","Date application");

	/* Ce composant repr�sente: des �l�ments de la table prix sous le nom "Prix" */
var Compo_Produits_Prix_7=new clCompoListe(Produits_Prix_7,null,Titre_Produits_Prix_7,"Prix",true,false);
var Joint_Esclave_Produits_Prix_7=new clJointureMulti("produit",
	new Array(
	new stJointure("prix","pd_numero","pd_numero",null,false)
	));
var Col_N0_N__Compte_De_Produits_Comptes_g�n�raux_11=new clAttribut("cg_numcompte","comptegen",null);

var Joint_Col_N0_N__Compte_De_Produits_Comptes_g�n�raux_11=new clJointureMulti("compteproduit",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Col_N1_Libell�_De_Produits_Comptes_g�n�raux_11=new clAttribut("cg_libelle","comptegen",null);

var Joint_Col_N1_Libell�_De_Produits_Comptes_g�n�raux_11=new clJointureMulti("compteproduit",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Produits_Compte_12=new clAttribut("cg_nom","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_nom sous le nom "Compte" */
var Compo_Produits_Compte_12=new clCompoListeDeroulanteSimple(Produits_Compte_12,null,"Compte");
var Joint_Esclave_Produits_Compte_12=new clJointureMulti("compteproduit",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Produits_Actif_13=new clAttribut("ci_actif","compteproduit",null);


	/* Ce composant repr�sente: compteproduit.ci_actif sous le nom "Actif" */
var Compo_Produits_Actif_13=new clCompoCheckBox(Produits_Actif_13,null,"Actif");
var Produits_Comptes_g�n�raux_11=new clEnsembleAttributs("compteproduit",
	new Array(
	new clLiaison(Joint_Col_N0_N__Compte_De_Produits_Comptes_g�n�raux_11,Col_N0_N__Compte_De_Produits_Comptes_g�n�raux_11)
	,new clLiaison(Joint_Col_N1_Libell�_De_Produits_Comptes_g�n�raux_11,Col_N1_Libell�_De_Produits_Comptes_g�n�raux_11)
	),
	new Array(
	new clLiaison(Joint_Esclave_Produits_Compte_12,Produits_Compte_12)
	,new clLiaison(null,Produits_Actif_13)
	));

var Titre_Produits_Comptes_g�n�raux_11=new Array("N� Compte","Libell�");

	/* Ce composant repr�sente: des �l�ments de la table compteproduit sous le nom "Comptes g�n�raux" */
var Compo_Produits_Comptes_g�n�raux_11=new clCompoListe(Produits_Comptes_g�n�raux_11,null,Titre_Produits_Comptes_g�n�raux_11,"Comptes g�n�raux",true,false);
var Joint_Esclave_Produits_Comptes_g�n�raux_11=new clJointureMulti("produit",
	new Array(
	new stJointure("compteproduit","pd_numero","pd_numero",null,false)
	));
var Produits_Liste_des_produits0=new clEnsembleAttributs("produit",
	new Array(
	new clLiaison(null,Col_N0_Etat_De_Produits_Liste_des_produits0)
	,new clLiaison(null,Col_N1_Libell�_De_Produits_Liste_des_produits0)
	),
	new Array(
	new clLiaison(null,Produits_Libell�__en_interne__1)
	,new clLiaison(null,Produits_Titre__pour_les_impressions__2)
	,new clLiaison(Joint_Esclave_Produits_Journal_comptable_3,Produits_Journal_comptable_3)
	,new clLiaison(null,Produits_Actif_4)
	,new clLiaison(null,Produits_Produit_non_quantifiable__Quantit�_1__5)
	,new clLiaison(null,Produits_Soumis_�_de_potentielles_r�ductions_6)
	,new clLiaison(Joint_Esclave_Produits_Prix_7,Produits_Prix_7)
	,new clLiaison(Joint_Esclave_Produits_Comptes_g�n�raux_11,Produits_Comptes_g�n�raux_11)
	));

var Titre_Produits_Liste_des_produits0=new Array("Etat","Libell�");

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Liste des produits" */
var Compo_Produits_Liste_des_produits0=new clCompoListe(Produits_Liste_des_produits0,new Array(new clInterfaceFiltrageVide()),Titre_Produits_Liste_des_produits0,"Liste des produits",true,false);

	/* Ce composant repr�sente: produit.undefined sous le nom "Liste des produits" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Liste_des_produits0.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0"));

 }

	/* On l'ajoute au tableau global � l'indice 984*/
top.TAB_GLOBAL_COMPO[984]=Compo_Produits_Liste_des_produits0;

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Libell� (en interne)" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Libell�__en_interne__1.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 987*/
top.TAB_GLOBAL_COMPO[987]=Compo_Produits_Libell�__en_interne__1;

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Titre (pour les impressions)" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Titre__pour_les_impressions__2.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 988*/
top.TAB_GLOBAL_COMPO[988]=Compo_Produits_Titre__pour_les_impressions__2;

	/* Ce composant repr�sente: des �l�ments de la table journal sous le nom "Journal comptable" */
 if(ALeDroit(0,"journal"))
 {
Compo_Produits_Journal_comptable_3.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 989*/
top.TAB_GLOBAL_COMPO[989]=Compo_Produits_Journal_comptable_3;

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Actif" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Actif_4.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 990*/
top.TAB_GLOBAL_COMPO[990]=Compo_Produits_Actif_4;

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Produit non quantifiable (Quantit�=1)" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Produit_non_quantifiable__Quantit�_1__5.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 991*/
top.TAB_GLOBAL_COMPO[991]=Compo_Produits_Produit_non_quantifiable__Quantit�_1__5;

	/* Ce composant repr�sente: des �l�ments de la table produit sous le nom "Soumis � de potentielles r�ductions" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Soumis_�_de_potentielles_r�ductions_6.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 992*/
top.TAB_GLOBAL_COMPO[992]=Compo_Produits_Soumis_�_de_potentielles_r�ductions_6;

	/* Ce composant repr�sente: prix.undefined sous le nom "Prix" */
 if(ALeDroit(0,"prix"))
 {
Compo_Produits_Prix_7.GenererXUL(top.document.getElementById("Produits_Prix_7"));

 }

	/* On l'ajoute au tableau global � l'indice 993*/
top.TAB_GLOBAL_COMPO[993]=Compo_Produits_Prix_7;

	/* Ce composant repr�sente: des �l�ments de la table prix sous le nom "Tarif H.T." */
 if(ALeDroit(0,"prix"))
 {
Compo_Produits_Tarif_H_T__8.GenererXUL(top.document.getElementById("Produits_Prix_7_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 998*/
top.TAB_GLOBAL_COMPO[998]=Compo_Produits_Tarif_H_T__8;

	/* Ce composant repr�sente: des �l�ments de la table prix sous le nom "Tarif T.T.C." */
 if(ALeDroit(0,"prix"))
 {
Compo_Produits_Tarif_T_T_C__9.GenererXUL(top.document.getElementById("Produits_Prix_7_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 999*/
top.TAB_GLOBAL_COMPO[999]=Compo_Produits_Tarif_T_T_C__9;

	/* Ce composant repr�sente: des �l�ments de la table tva sous le nom "T.V.A." */
 if(ALeDroit(0,"tva"))
 {
Compo_Produits_T_V_A__10.GenererXUL(top.document.getElementById("Produits_Prix_7_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1000*/
top.TAB_GLOBAL_COMPO[1000]=Compo_Produits_T_V_A__10;

	/* Ce composant repr�sente: compteproduit.undefined sous le nom "Comptes g�n�raux" */
 if(ALeDroit(0,"compteproduit"))
 {
Compo_Produits_Comptes_g�n�raux_11.GenererXUL(top.document.getElementById("Produits_Comptes_g�n�raux_11"));

 }

	/* On l'ajoute au tableau global � l'indice 1001*/
top.TAB_GLOBAL_COMPO[1001]=Compo_Produits_Comptes_g�n�raux_11;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Compte" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Produits_Compte_12.GenererXUL(top.document.getElementById("Produits_Comptes_g�n�raux_11_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1004*/
top.TAB_GLOBAL_COMPO[1004]=Compo_Produits_Compte_12;

	/* Ce composant repr�sente: des �l�ments de la table compteproduit sous le nom "Actif" */
 if(ALeDroit(0,"compteproduit"))
 {
Compo_Produits_Actif_13.GenererXUL(top.document.getElementById("Produits_Comptes_g�n�raux_11_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1005*/
top.TAB_GLOBAL_COMPO[1005]=Compo_Produits_Actif_13;
var Col_N0_Code_De_Responsabilit�s_Responsabilit�s0=new clAttribut("re_code","responsabilite",null);

var Col_N1_Nom_De_Responsabilit�s_Responsabilit�s0=new clAttribut("re_nom","responsabilite",null);

var Col_N2_Famille_De_Responsabilit�s_Responsabilit�s0=new clAttribut("re_famille","responsabilite",null);

var Responsabilit�s_Code_1=new clAttribut("re_code","responsabilite",null);


	/* Ce composant repr�sente: responsabilite.re_code sous le nom "Code" */
var Compo_Responsabilit�s_Code_1=new clCompoTextBox(Responsabilit�s_Code_1,null,"Code",false,false);
var Responsabilit�s_Nom_2=new clAttribut("re_nom","responsabilite",null);


	/* Ce composant repr�sente: responsabilite.re_nom sous le nom "Nom" */
var Compo_Responsabilit�s_Nom_2=new clCompoTextBox(Responsabilit�s_Nom_2,null,"Nom",false,false);
var Responsabilit�s_Famille_3=new clAttribut("re_famille","responsabilite",null);


	/* Ce composant repr�sente: responsabilite.re_famille sous le nom "Famille" */
var Compo_Responsabilit�s_Famille_3=new clCompoTextBox(Responsabilit�s_Famille_3,null,"Famille",false,false);
var Responsabilit�s_Responsabilit�s0=new clEnsembleAttributs("responsabilite",
	new Array(
	new clLiaison(null,Col_N0_Code_De_Responsabilit�s_Responsabilit�s0)
	,new clLiaison(null,Col_N1_Nom_De_Responsabilit�s_Responsabilit�s0)
	,new clLiaison(null,Col_N2_Famille_De_Responsabilit�s_Responsabilit�s0)
	),
	new Array(
	new clLiaison(null,Responsabilit�s_Code_1)
	,new clLiaison(null,Responsabilit�s_Nom_2)
	,new clLiaison(null,Responsabilit�s_Famille_3)
	));

var Titre_Responsabilit�s_Responsabilit�s0=new Array("Code","Nom","Famille");

	/* Ce composant repr�sente: des �l�ments de la table responsabilite sous le nom "Responsabilit�s" */
var Compo_Responsabilit�s_Responsabilit�s0=new clCompoListe(Responsabilit�s_Responsabilit�s0,new Array(new clInterfaceFiltrageVide()),Titre_Responsabilit�s_Responsabilit�s0,"Responsabilit�s",true,false);

	/* Ce composant repr�sente: responsabilite.undefined sous le nom "Responsabilit�s" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilit�s_Responsabilit�s0.GenererXUL(top.document.getElementById("Responsabilit�s_Responsabilit�s0"));

 }

	/* On l'ajoute au tableau global � l'indice 969*/
top.TAB_GLOBAL_COMPO[969]=Compo_Responsabilit�s_Responsabilit�s0;

	/* Ce composant repr�sente: des �l�ments de la table responsabilite sous le nom "Code" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilit�s_Code_1.GenererXUL(top.document.getElementById("Responsabilit�s_Responsabilit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 973*/
top.TAB_GLOBAL_COMPO[973]=Compo_Responsabilit�s_Code_1;

	/* Ce composant repr�sente: des �l�ments de la table responsabilite sous le nom "Nom" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilit�s_Nom_2.GenererXUL(top.document.getElementById("Responsabilit�s_Responsabilit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 974*/
top.TAB_GLOBAL_COMPO[974]=Compo_Responsabilit�s_Nom_2;

	/* Ce composant repr�sente: des �l�ments de la table responsabilite sous le nom "Famille" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilit�s_Famille_3.GenererXUL(top.document.getElementById("Responsabilit�s_Responsabilit�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 975*/
top.TAB_GLOBAL_COMPO[975]=Compo_Responsabilit�s_Famille_3;
var Col_N0_Nom_De_Services_Liste_des_services0=new clAttribut("se_nom","service",null);

var Col_N1_Responsable_De_Services_Liste_des_services0=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N1_Responsable_De_Services_Liste_des_services0=new clJointureMulti("service",
	new Array(
	new stJointure("agent","se_agent","ag_numero",null,true)
	));
var Col_N2_Soci�t�_De_Services_Liste_des_services0=new clAttribut("so_libelle","societe",null);

var Joint_Col_N2_Soci�t�_De_Services_Liste_des_services0=new clJointureMulti("service",
	new Array(
	new stJointure("societe","se_societe","so_numero",null,true)
	));
var Services_Nom_1=new clAttribut("se_nom","service",null);


	/* Ce composant repr�sente: service.se_nom sous le nom "Nom" */
var Compo_Services_Nom_1=new clCompoTextBox(Services_Nom_1,null,"Nom",false,false);
var Services_Agent_responsable_2=new clAttribut("ag_libelle","agent",null);


	/* Ce composant repr�sente: agent.ag_libelle sous le nom "Agent responsable" */
var Compo_Services_Agent_responsable_2=new clCompoListeDeroulanteSimple(Services_Agent_responsable_2,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Agents_0=new clInterfaceFiltrageRelationOnglet("Agents",Gerer_Agents,OuvrirOnglet_Services)),"Agent responsable");
var Joint_Esclave_Services_Agent_responsable_2=new clJointureMulti("service",
	new Array(
	new stJointure("agent","se_agent","ag_numero",null,false)
	));
var Col_N0_Agent_De_Services_Employ�s_3=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N0_Agent_De_Services_Employ�s_3=new clJointureMulti("employe",
	new Array(
	new stJointure("agent","em_agent","ag_numero",null,true)
	));
var Col_N1_Emploi_De_Services_Employ�s_3=new clAttribut("em_emploi","employe",null);

var Col_N2_Acc�s_De_Services_Employ�s_3=new clAttribut("ac_nom","acces",null);

var Joint_Col_N2_Acc�s_De_Services_Employ�s_3=new clJointureMulti("employe",
	new Array(
	new stJointure("acces","em_acces","ac_numero",null,true)
	));
var Services_Employ�s_3=new clEnsembleAttributs("employe",
	new Array(
	new clLiaison(Joint_Col_N0_Agent_De_Services_Employ�s_3,Col_N0_Agent_De_Services_Employ�s_3)
	,new clLiaison(null,Col_N1_Emploi_De_Services_Employ�s_3)
	,new clLiaison(Joint_Col_N2_Acc�s_De_Services_Employ�s_3,Col_N2_Acc�s_De_Services_Employ�s_3)
	),
	null);

var Titre_Services_Employ�s_3=new Array("Agent","Emploi","Acc�s");

	/* Ce composant repr�sente: des �l�ments de la table employe sous le nom "Employ�s" */
var Compo_Services_Employ�s_3=new clCompoListe(Services_Employ�s_3,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Employ�s_0=new clInterfaceFiltrageRelationOnglet("Employ�s",Gerer_Employ�s,OuvrirOnglet_Services,true)),Titre_Services_Employ�s_3,"Employ�s",true,false);
var Joint_Esclave_Services_Employ�s_3=new clJointureMulti("service",
	new Array(
	new stJointure("employe","se_numero","em_service",null,false)
	));
var Services_Liste_des_services0=new clEnsembleAttributs("service",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Services_Liste_des_services0)
	,new clLiaison(Joint_Col_N1_Responsable_De_Services_Liste_des_services0,Col_N1_Responsable_De_Services_Liste_des_services0)
	,new clLiaison(Joint_Col_N2_Soci�t�_De_Services_Liste_des_services0,Col_N2_Soci�t�_De_Services_Liste_des_services0)
	),
	new Array(
	new clLiaison(null,Services_Nom_1)
	,new clLiaison(Joint_Esclave_Services_Agent_responsable_2,Services_Agent_responsable_2)
	,new clLiaison(Joint_Esclave_Services_Employ�s_3,Services_Employ�s_3)
	));

var Titre_Services_Liste_des_services0=new Array("Nom","Responsable","Soci�t�");

	/* Ce composant repr�sente: des �l�ments de la table service sous le nom "Liste des services" */
var Compo_Services_Liste_des_services0=new clCompoListe(Services_Liste_des_services0,new Array(new clInterfaceFiltrageVide()),Titre_Services_Liste_des_services0,"Liste des services",true,false);

	/* Ce composant repr�sente: service.undefined sous le nom "Liste des services" */
 if(ALeDroit(0,"service"))
 {
Compo_Services_Liste_des_services0.GenererXUL(top.document.getElementById("Services_Liste_des_services0"));

 }

	/* On l'ajoute au tableau global � l'indice 880*/
top.TAB_GLOBAL_COMPO[880]=Compo_Services_Liste_des_services0;

	/* Ce composant repr�sente: des �l�ments de la table service sous le nom "Nom" */
 if(ALeDroit(0,"service"))
 {
Compo_Services_Nom_1.GenererXUL(top.document.getElementById("Services_Liste_des_services0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 884*/
top.TAB_GLOBAL_COMPO[884]=Compo_Services_Nom_1;

	/* Ce composant repr�sente: des �l�ments de la table agent sous le nom "Agent responsable" */
 if(ALeDroit(0,"agent"))
 {
Compo_Services_Agent_responsable_2.GenererXUL(top.document.getElementById("Services_Liste_des_services0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 885*/
top.TAB_GLOBAL_COMPO[885]=Compo_Services_Agent_responsable_2;

	/* Ce composant repr�sente: employe.undefined sous le nom "Employ�s" */
 if(ALeDroit(0,"employe"))
 {
Compo_Services_Employ�s_3.GenererXUL(top.document.getElementById("Services_Employ�s_3"));

 }

	/* On l'ajoute au tableau global � l'indice 886*/
top.TAB_GLOBAL_COMPO[886]=Compo_Services_Employ�s_3;
var Col_N0_Abbr__De_Soci�t�s_Liste_des_soci�t�s0=new clAttribut("so_abbrev","societe",null);

var Col_N1_Nom_De_Soci�t�s_Liste_des_soci�t�s0=new clAttribut("so_libelle","societe",null);

var Soci�t�s_Type_1=new clAttribut("ts_libelle","typesociete",null);


	/* Ce composant repr�sente: typesociete.ts_libelle sous le nom "Type" */
var Compo_Soci�t�s_Type_1=new clCompoListeDeroulanteSimple(Soci�t�s_Type_1,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Types_de_soci�t�s_0=new clInterfaceFiltrageRelationOnglet("Types de soci�t�s",Gerer_Types_de_soci�t�s,OuvrirOnglet_Soci�t�s)),"Type");
var Joint_Esclave_Soci�t�s_Type_1=new clJointureMulti("societe",
	new Array(
	new stJointure("typesociete","ts_numero","ts_numero",null,false)
	));
var Soci�t�s_Nom_2=new clAttribut("so_libelle","societe",null);


	/* Ce composant repr�sente: societe.so_libelle sous le nom "Nom" */
var Compo_Soci�t�s_Nom_2=new clCompoTextBox(Soci�t�s_Nom_2,null,"Nom",false,false);
var Soci�t�s_Abbrev_3=new clAttribut("so_abbrev","societe",null);


	/* Ce composant repr�sente: societe.so_abbrev sous le nom "Abbrev" */
var Compo_Soci�t�s_Abbrev_3=new clCompoTextBox(Soci�t�s_Abbrev_3,null,"Abbrev",false,false);
var Soci�t�s_Personne_4=new clAttribut("pe_libelle","personne",null);


	/* Ce composant repr�sente: personne.pe_libelle sous le nom "Personne" */
var Compo_Soci�t�s_Personne_4=new clCompoListeDeroulanteSimple(Soci�t�s_Personne_4,null,"Personne");
var Joint_Esclave_Soci�t�s_Personne_4=new clJointureMulti("societe",
	new Array(
	new stJointure("personne","pe_numero","pe_numero",null,false)
	));
var Soci�t�s_D�tails_5=new clAttribut("so_detail","societe",null);


	/* Ce composant repr�sente: societe.so_detail sous le nom "D�tails" */
var Compo_Soci�t�s_D�tails_5=new clCompoTextBox(Soci�t�s_D�tails_5,null,"D�tails",false,true);
var Col_N0_Nom_De_Soci�t�s_Services_6=new clAttribut("se_nom","service",null);

var Col_N1_Responsable_De_Soci�t�s_Services_6=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N1_Responsable_De_Soci�t�s_Services_6=new clJointureMulti("service",
	new Array(
	new stJointure("agent","se_agent","ag_numero",null,true)
	));
var Soci�t�s_Services_6=new clEnsembleAttributs("service",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Soci�t�s_Services_6)
	,new clLiaison(Joint_Col_N1_Responsable_De_Soci�t�s_Services_6,Col_N1_Responsable_De_Soci�t�s_Services_6)
	),
	null);

var Titre_Soci�t�s_Services_6=new Array("Nom","Responsable");

	/* Ce composant repr�sente: des �l�ments de la table service sous le nom "Services" */
var Compo_Soci�t�s_Services_6=new clCompoListe(Soci�t�s_Services_6,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Services_0=new clInterfaceFiltrageRelationOnglet("Services",Gerer_Services,OuvrirOnglet_Soci�t�s,true)),Titre_Soci�t�s_Services_6,"Services",true,false);
var Joint_Esclave_Soci�t�s_Services_6=new clJointureMulti("societe",
	new Array(
	new stJointure("service","so_numero","se_societe",null,false)
	));
var Soci�t�s_Liste_des_soci�t�s0=new clEnsembleAttributs("societe",
	new Array(
	new clLiaison(null,Col_N0_Abbr__De_Soci�t�s_Liste_des_soci�t�s0)
	,new clLiaison(null,Col_N1_Nom_De_Soci�t�s_Liste_des_soci�t�s0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Soci�t�s_Type_1,Soci�t�s_Type_1)
	,new clLiaison(null,Soci�t�s_Nom_2)
	,new clLiaison(null,Soci�t�s_Abbrev_3)
	,new clLiaison(Joint_Esclave_Soci�t�s_Personne_4,Soci�t�s_Personne_4)
	,new clLiaison(null,Soci�t�s_D�tails_5)
	,new clLiaison(Joint_Esclave_Soci�t�s_Services_6,Soci�t�s_Services_6)
	));

var Titre_Soci�t�s_Liste_des_soci�t�s0=new Array("Abbr.","Nom");

	/* Ce composant repr�sente: des �l�ments de la table societe sous le nom "Liste des soci�t�s" */
var Compo_Soci�t�s_Liste_des_soci�t�s0=new clCompoListe(Soci�t�s_Liste_des_soci�t�s0,new Array(new clInterfaceFiltrageVide()),Titre_Soci�t�s_Liste_des_soci�t�s0,"Liste des soci�t�s",true,false);

	/* Ce composant repr�sente: societe.undefined sous le nom "Liste des soci�t�s" */
 if(ALeDroit(0,"societe"))
 {
Compo_Soci�t�s_Liste_des_soci�t�s0.GenererXUL(top.document.getElementById("Soci�t�s_Liste_des_soci�t�s0"));

 }

	/* On l'ajoute au tableau global � l'indice 869*/
top.TAB_GLOBAL_COMPO[869]=Compo_Soci�t�s_Liste_des_soci�t�s0;

	/* Ce composant repr�sente: des �l�ments de la table typesociete sous le nom "Type" */
 if(ALeDroit(0,"typesociete"))
 {
Compo_Soci�t�s_Type_1.GenererXUL(top.document.getElementById("Soci�t�s_Liste_des_soci�t�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 872*/
top.TAB_GLOBAL_COMPO[872]=Compo_Soci�t�s_Type_1;

	/* Ce composant repr�sente: des �l�ments de la table societe sous le nom "Nom" */
 if(ALeDroit(0,"societe"))
 {
Compo_Soci�t�s_Nom_2.GenererXUL(top.document.getElementById("Soci�t�s_Liste_des_soci�t�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 873*/
top.TAB_GLOBAL_COMPO[873]=Compo_Soci�t�s_Nom_2;

	/* Ce composant repr�sente: des �l�ments de la table societe sous le nom "Abbrev" */
 if(ALeDroit(0,"societe"))
 {
Compo_Soci�t�s_Abbrev_3.GenererXUL(top.document.getElementById("Soci�t�s_Liste_des_soci�t�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 874*/
top.TAB_GLOBAL_COMPO[874]=Compo_Soci�t�s_Abbrev_3;

	/* Ce composant repr�sente: des �l�ments de la table personne sous le nom "Personne" */
 if(ALeDroit(0,"personne"))
 {
Compo_Soci�t�s_Personne_4.GenererXUL(top.document.getElementById("Soci�t�s_Liste_des_soci�t�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 875*/
top.TAB_GLOBAL_COMPO[875]=Compo_Soci�t�s_Personne_4;

	/* Ce composant repr�sente: des �l�ments de la table societe sous le nom "D�tails" */
 if(ALeDroit(0,"societe"))
 {
Compo_Soci�t�s_D�tails_5.GenererXUL(top.document.getElementById("Soci�t�s_Liste_des_soci�t�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 876*/
top.TAB_GLOBAL_COMPO[876]=Compo_Soci�t�s_D�tails_5;

	/* Ce composant repr�sente: service.undefined sous le nom "Services" */
 if(ALeDroit(0,"service"))
 {
Compo_Soci�t�s_Services_6.GenererXUL(top.document.getElementById("Soci�t�s_Services_6"));

 }

	/* On l'ajoute au tableau global � l'indice 877*/
top.TAB_GLOBAL_COMPO[877]=Compo_Soci�t�s_Services_6;
var Col_N0_Taux_____De_TVA_Liste_des_T_V_A_0=new clAttribut("tv_taux","tva",null);

var Col_N1_Code_De_TVA_Liste_des_T_V_A_0=new clAttribut("tv_code","tva",null);

var Col_N2_Etat_De_TVA_Liste_des_T_V_A_0=new clAttribut("tv_etat","tva",null);

var TVA_Taux_1=new clAttribut("tv_taux","tva",null);


	/* Ce composant repr�sente: tva.tv_taux sous le nom "Taux" */
var Compo_TVA_Taux_1=new clCompoTextBox(TVA_Taux_1,null,"Taux",false,false);
var TVA_Code_2=new clAttribut("tv_code","tva",null);


	/* Ce composant repr�sente: tva.tv_code sous le nom "Code" */
var Compo_TVA_Code_2=new clCompoTextBox(TVA_Code_2,null,"Code",false,false);
var TVA_Compte_g�n�ral_3=new clAttribut("cg_nom","comptegen",null);


	/* Ce composant repr�sente: comptegen.cg_nom sous le nom "Compte g�n�ral" */
var Compo_TVA_Compte_g�n�ral_3=new clCompoListeDeroulanteSimple(TVA_Compte_g�n�ral_3,null,"Compte g�n�ral");
var Joint_Esclave_TVA_Compte_g�n�ral_3=new clJointureMulti("tva",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var TVA_Actif_4=new clAttribut("tv_actif","tva",null);


	/* Ce composant repr�sente: tva.tv_actif sous le nom "Actif" */
var Compo_TVA_Actif_4=new clCompoCheckBox(TVA_Actif_4,null,"Actif");
var TVA_Liste_des_T_V_A_0=new clEnsembleAttributs("tva",
	new Array(
	new clLiaison(null,Col_N0_Taux_____De_TVA_Liste_des_T_V_A_0)
	,new clLiaison(null,Col_N1_Code_De_TVA_Liste_des_T_V_A_0)
	,new clLiaison(null,Col_N2_Etat_De_TVA_Liste_des_T_V_A_0)
	),
	new Array(
	new clLiaison(null,TVA_Taux_1)
	,new clLiaison(null,TVA_Code_2)
	,new clLiaison(Joint_Esclave_TVA_Compte_g�n�ral_3,TVA_Compte_g�n�ral_3)
	,new clLiaison(null,TVA_Actif_4)
	));

var Titre_TVA_Liste_des_T_V_A_0=new Array("Taux (%)","Code","Etat");

	/* Ce composant repr�sente: des �l�ments de la table tva sous le nom "Liste des T.V.A." */
var Compo_TVA_Liste_des_T_V_A_0=new clCompoListe(TVA_Liste_des_T_V_A_0,new Array(new clInterfaceFiltrageVide()),Titre_TVA_Liste_des_T_V_A_0,"Liste des T.V.A.",true,false);

	/* Ce composant repr�sente: tva.undefined sous le nom "Liste des T.V.A." */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Liste_des_T_V_A_0.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0"));

 }

	/* On l'ajoute au tableau global � l'indice 976*/
top.TAB_GLOBAL_COMPO[976]=Compo_TVA_Liste_des_T_V_A_0;

	/* Ce composant repr�sente: des �l�ments de la table tva sous le nom "Taux" */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Taux_1.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 980*/
top.TAB_GLOBAL_COMPO[980]=Compo_TVA_Taux_1;

	/* Ce composant repr�sente: des �l�ments de la table tva sous le nom "Code" */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Code_2.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 981*/
top.TAB_GLOBAL_COMPO[981]=Compo_TVA_Code_2;

	/* Ce composant repr�sente: des �l�ments de la table comptegen sous le nom "Compte g�n�ral" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_TVA_Compte_g�n�ral_3.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 982*/
top.TAB_GLOBAL_COMPO[982]=Compo_TVA_Compte_g�n�ral_3;

	/* Ce composant repr�sente: des �l�ments de la table tva sous le nom "Actif" */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Actif_4.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 983*/
top.TAB_GLOBAL_COMPO[983]=Compo_TVA_Actif_4;
var Col_N0_Nom_De_Types_d_adresses_Liste_des_types_d_adresses0=new clAttribut("ak_nom","typeadresse",null);

var Types_d_adresses_Nom_1=new clAttribut("ak_nom","typeadresse",null);


	/* Ce composant repr�sente: typeadresse.ak_nom sous le nom "Nom" */
var Compo_Types_d_adresses_Nom_1=new clCompoTextBox(Types_d_adresses_Nom_1,null,"Nom",false,false);
var Types_d_adresses_Liste_des_types_d_adresses0=new clEnsembleAttributs("typeadresse",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Types_d_adresses_Liste_des_types_d_adresses0)
	),
	new Array(
	new clLiaison(null,Types_d_adresses_Nom_1)
	));

var Titre_Types_d_adresses_Liste_des_types_d_adresses0=new Array("Nom");

	/* Ce composant repr�sente: des �l�ments de la table typeadresse sous le nom "Liste des types d'adresses" */
var Compo_Types_d_adresses_Liste_des_types_d_adresses0=new clCompoListe(Types_d_adresses_Liste_des_types_d_adresses0,new Array(new clInterfaceFiltrageVide()),Titre_Types_d_adresses_Liste_des_types_d_adresses0,"Liste des types d'adresses",true,false);

	/* Ce composant repr�sente: typeadresse.undefined sous le nom "Liste des types d'adresses" */
 if(ALeDroit(0,"typeadresse"))
 {
Compo_Types_d_adresses_Liste_des_types_d_adresses0.GenererXUL(top.document.getElementById("Types_d_adresses_Liste_des_types_d_adresses0"));

 }

	/* On l'ajoute au tableau global � l'indice 846*/
top.TAB_GLOBAL_COMPO[846]=Compo_Types_d_adresses_Liste_des_types_d_adresses0;

	/* Ce composant repr�sente: des �l�ments de la table typeadresse sous le nom "Nom" */
 if(ALeDroit(0,"typeadresse"))
 {
Compo_Types_d_adresses_Nom_1.GenererXUL(top.document.getElementById("Types_d_adresses_Liste_des_types_d_adresses0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 848*/
top.TAB_GLOBAL_COMPO[848]=Compo_Types_d_adresses_Nom_1;
var Col_N0_N__De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clAttribut("ta_numero","typeattribut",null);

var Col_N1_Libell�_De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clAttribut("ta_nom","typeattribut",null);

var Types_d_attribut_Libell�_1=new clAttribut("ta_nom","typeattribut",null);


	/* Ce composant repr�sente: typeattribut.ta_nom sous le nom "Libell�" */
var Compo_Types_d_attribut_Libell�_1=new clCompoTextBox(Types_d_attribut_Libell�_1,null,"Libell�",false,false);
var Col_N0_Libell�_De_Types_d_attribut_Cat�gories_2=new clAttribut("cr_libelle","categorie",null);

var Types_d_attribut_Libell�_3=new clAttribut("cr_libelle","categorie",null);


	/* Ce composant repr�sente: categorie.cr_libelle sous le nom "Libell�" */
var Compo_Types_d_attribut_Libell�_3=new clCompoTextBox(Types_d_attribut_Libell�_3,null,"Libell�",false,false);
var Types_d_attribut_Description_4=new clAttribut("cr_description","categorie",null);


	/* Ce composant repr�sente: categorie.cr_description sous le nom "Description" */
var Compo_Types_d_attribut_Description_4=new clCompoTextBox(Types_d_attribut_Description_4,null,"Description",false,false);
var Types_d_attribut_Cat�gories_2=new clEnsembleAttributs("categorie",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Types_d_attribut_Cat�gories_2)
	),
	new Array(
	new clLiaison(null,Types_d_attribut_Libell�_3)
	,new clLiaison(null,Types_d_attribut_Description_4)
	));

var Titre_Types_d_attribut_Cat�gories_2=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table categorie sous le nom "Cat�gories" */
var Compo_Types_d_attribut_Cat�gories_2=new clCompoListe(Types_d_attribut_Cat�gories_2,null,Titre_Types_d_attribut_Cat�gories_2,"Cat�gories",true,false);
var Joint_Esclave_Types_d_attribut_Cat�gories_2=new clJointureMulti("typeattribut",
	new Array(
	new stJointure("categorie","ta_numero","ta_numero",null,false)
	));
var Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clEnsembleAttributs("typeattribut",
	new Array(
	new clLiaison(null,Col_N0_N__De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0)
	,new clLiaison(null,Col_N1_Libell�_De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0)
	),
	new Array(
	new clLiaison(null,Types_d_attribut_Libell�_1)
	,new clLiaison(Joint_Esclave_Types_d_attribut_Cat�gories_2,Types_d_attribut_Cat�gories_2)
	));

var Titre_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new Array("N�","Libell�");

	/* Ce composant repr�sente: des �l�ments de la table typeattribut sous le nom "Liste des types d'attribut de personne" */
var Compo_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clCompoListe(Types_d_attribut_Liste_des_types_d_attribut_de_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Types_d_attribut_Liste_des_types_d_attribut_de_personne0,"Liste des types d'attribut de personne",true,false);

	/* Ce composant repr�sente: typeattribut.undefined sous le nom "Liste des types d'attribut de personne" */
 if(ALeDroit(0,"typeattribut"))
 {
Compo_Types_d_attribut_Liste_des_types_d_attribut_de_personne0.GenererXUL(top.document.getElementById("Types_d_attribut_Liste_des_types_d_attribut_de_personne0"));

 }

	/* On l'ajoute au tableau global � l'indice 823*/
top.TAB_GLOBAL_COMPO[823]=Compo_Types_d_attribut_Liste_des_types_d_attribut_de_personne0;

	/* Ce composant repr�sente: des �l�ments de la table typeattribut sous le nom "Libell�" */
 if(ALeDroit(0,"typeattribut"))
 {
Compo_Types_d_attribut_Libell�_1.GenererXUL(top.document.getElementById("Types_d_attribut_Liste_des_types_d_attribut_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 826*/
top.TAB_GLOBAL_COMPO[826]=Compo_Types_d_attribut_Libell�_1;

	/* Ce composant repr�sente: categorie.undefined sous le nom "Cat�gories" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Types_d_attribut_Cat�gories_2.GenererXUL(top.document.getElementById("Types_d_attribut_Cat�gories_2"));

 }

	/* On l'ajoute au tableau global � l'indice 827*/
top.TAB_GLOBAL_COMPO[827]=Compo_Types_d_attribut_Cat�gories_2;

	/* Ce composant repr�sente: des �l�ments de la table categorie sous le nom "Libell�" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Types_d_attribut_Libell�_3.GenererXUL(top.document.getElementById("Types_d_attribut_Cat�gories_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 829*/
top.TAB_GLOBAL_COMPO[829]=Compo_Types_d_attribut_Libell�_3;

	/* Ce composant repr�sente: des �l�ments de la table categorie sous le nom "Description" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Types_d_attribut_Description_4.GenererXUL(top.document.getElementById("Types_d_attribut_Cat�gories_2_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 830*/
top.TAB_GLOBAL_COMPO[830]=Compo_Types_d_attribut_Description_4;
var Col_N0_Nom_De_Types_de_contacts_Liste_des_types_de_contacts0=new clAttribut("ck_nom","contacttype",null);

var Col_N1_Code_De_Types_de_contacts_Liste_des_types_de_contacts0=new clAttribut("ck_code","contacttype",null);

var Types_de_contacts_Nom_1=new clAttribut("ck_nom","contacttype",null);


	/* Ce composant repr�sente: contacttype.ck_nom sous le nom "Nom" */
var Compo_Types_de_contacts_Nom_1=new clCompoTextBox(Types_de_contacts_Nom_1,null,"Nom",false,false);
var Types_de_contacts_Code_2=new clAttribut("ck_code","contacttype",null);


	/* Ce composant repr�sente: contacttype.ck_code sous le nom "Code" */
var Compo_Types_de_contacts_Code_2=new clCompoTextBox(Types_de_contacts_Code_2,null,"Code",false,false);
var Types_de_contacts_Peut_�tre_un_num�ro_3=new clAttribut("ck_number","contacttype",null);


	/* Ce composant repr�sente: contacttype.ck_number sous le nom "Peut �tre un num�ro" */
var Compo_Types_de_contacts_Peut_�tre_un_num�ro_3=new clCompoCheckBox(Types_de_contacts_Peut_�tre_un_num�ro_3,null,"Peut �tre un num�ro");
var Types_de_contacts_Peut_�tre_un_e_mail_4=new clAttribut("ck_email","contacttype",null);


	/* Ce composant repr�sente: contacttype.ck_email sous le nom "Peut �tre un e-mail" */
var Compo_Types_de_contacts_Peut_�tre_un_e_mail_4=new clCompoCheckBox(Types_de_contacts_Peut_�tre_un_e_mail_4,null,"Peut �tre un e-mail");
var Types_de_contacts_Peut_�tre_une_adresse_web__URL__5=new clAttribut("ck_url","contacttype",null);


	/* Ce composant repr�sente: contacttype.ck_url sous le nom "Peut �tre une adresse web (URL)" */
var Compo_Types_de_contacts_Peut_�tre_une_adresse_web__URL__5=new clCompoCheckBox(Types_de_contacts_Peut_�tre_une_adresse_web__URL__5,null,"Peut �tre une adresse web (URL)");
var Types_de_contacts_Liste_des_types_de_contacts0=new clEnsembleAttributs("contacttype",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Types_de_contacts_Liste_des_types_de_contacts0)
	,new clLiaison(null,Col_N1_Code_De_Types_de_contacts_Liste_des_types_de_contacts0)
	),
	new Array(
	new clLiaison(null,Types_de_contacts_Nom_1)
	,new clLiaison(null,Types_de_contacts_Code_2)
	,new clLiaison(null,Types_de_contacts_Peut_�tre_un_num�ro_3)
	,new clLiaison(null,Types_de_contacts_Peut_�tre_un_e_mail_4)
	,new clLiaison(null,Types_de_contacts_Peut_�tre_une_adresse_web__URL__5)
	));

var Titre_Types_de_contacts_Liste_des_types_de_contacts0=new Array("Nom","Code");

	/* Ce composant repr�sente: des �l�ments de la table contacttype sous le nom "Liste des types de contacts" */
var Compo_Types_de_contacts_Liste_des_types_de_contacts0=new clCompoListe(Types_de_contacts_Liste_des_types_de_contacts0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_contacts_Liste_des_types_de_contacts0,"Liste des types de contacts",true,false);

	/* Ce composant repr�sente: contacttype.undefined sous le nom "Liste des types de contacts" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Liste_des_types_de_contacts0.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0"));

 }

	/* On l'ajoute au tableau global � l'indice 955*/
top.TAB_GLOBAL_COMPO[955]=Compo_Types_de_contacts_Liste_des_types_de_contacts0;

	/* Ce composant repr�sente: des �l�ments de la table contacttype sous le nom "Nom" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Nom_1.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 958*/
top.TAB_GLOBAL_COMPO[958]=Compo_Types_de_contacts_Nom_1;

	/* Ce composant repr�sente: des �l�ments de la table contacttype sous le nom "Code" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Code_2.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 959*/
top.TAB_GLOBAL_COMPO[959]=Compo_Types_de_contacts_Code_2;

	/* Ce composant repr�sente: des �l�ments de la table contacttype sous le nom "Peut �tre un num�ro" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Peut_�tre_un_num�ro_3.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 960*/
top.TAB_GLOBAL_COMPO[960]=Compo_Types_de_contacts_Peut_�tre_un_num�ro_3;

	/* Ce composant repr�sente: des �l�ments de la table contacttype sous le nom "Peut �tre un e-mail" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Peut_�tre_un_e_mail_4.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 961*/
top.TAB_GLOBAL_COMPO[961]=Compo_Types_de_contacts_Peut_�tre_un_e_mail_4;

	/* Ce composant repr�sente: des �l�ments de la table contacttype sous le nom "Peut �tre une adresse web (URL)" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Peut_�tre_une_adresse_web__URL__5.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 962*/
top.TAB_GLOBAL_COMPO[962]=Compo_Types_de_contacts_Peut_�tre_une_adresse_web__URL__5;
var Col_N0_Libell�_De_Types_de_journaux_Liste_des_types_de_journaux0=new clAttribut("tj_libelle","typejournal",null);

var Types_de_journaux_Libell�_1=new clAttribut("tj_libelle","typejournal",null);


	/* Ce composant repr�sente: typejournal.tj_libelle sous le nom "Libell�" */
var Compo_Types_de_journaux_Libell�_1=new clCompoTextBox(Types_de_journaux_Libell�_1,null,"Libell�",false,false);
var Types_de_journaux_Liste_des_types_de_journaux0=new clEnsembleAttributs("typejournal",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Types_de_journaux_Liste_des_types_de_journaux0)
	),
	new Array(
	new clLiaison(null,Types_de_journaux_Libell�_1)
	));

var Titre_Types_de_journaux_Liste_des_types_de_journaux0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table typejournal sous le nom "Liste des types de journaux" */
var Compo_Types_de_journaux_Liste_des_types_de_journaux0=new clCompoListe(Types_de_journaux_Liste_des_types_de_journaux0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_journaux_Liste_des_types_de_journaux0,"Liste des types de journaux",true,false);

	/* Ce composant repr�sente: typejournal.undefined sous le nom "Liste des types de journaux" */
 if(ALeDroit(0,"typejournal"))
 {
Compo_Types_de_journaux_Liste_des_types_de_journaux0.GenererXUL(top.document.getElementById("Types_de_journaux_Liste_des_types_de_journaux0"));

 }

	/* On l'ajoute au tableau global � l'indice 1027*/
top.TAB_GLOBAL_COMPO[1027]=Compo_Types_de_journaux_Liste_des_types_de_journaux0;

	/* Ce composant repr�sente: des �l�ments de la table typejournal sous le nom "Libell�" */
 if(ALeDroit(0,"typejournal"))
 {
Compo_Types_de_journaux_Libell�_1.GenererXUL(top.document.getElementById("Types_de_journaux_Liste_des_types_de_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 1029*/
top.TAB_GLOBAL_COMPO[1029]=Compo_Types_de_journaux_Libell�_1;
var Col_N0_Libell�_De_Types_de_lien_Liste_des_types_de_lien_entre_personne0=new clAttribut("tl_libelle","typelien",null);

var Types_de_lien_Libell�_1=new clAttribut("tl_libelle","typelien",null);


	/* Ce composant repr�sente: typelien.tl_libelle sous le nom "Libell�" */
var Compo_Types_de_lien_Libell�_1=new clCompoTextBox(Types_de_lien_Libell�_1,null,"Libell�",false,false);
var Types_de_lien_Action_de_P1_�_P2_2=new clAttribut("tl_action12","typelien",null);


	/* Ce composant repr�sente: typelien.tl_action12 sous le nom "Action de P1 � P2" */
var Compo_Types_de_lien_Action_de_P1_�_P2_2=new clCompoTextBox(Types_de_lien_Action_de_P1_�_P2_2,null,"Action de P1 � P2",false,false);
var Types_de_lien_Action_de_P2_�_P1_3=new clAttribut("tl_action21","typelien",null);


	/* Ce composant repr�sente: typelien.tl_action21 sous le nom "Action de P2 � P1" */
var Compo_Types_de_lien_Action_de_P2_�_P1_3=new clCompoTextBox(Types_de_lien_Action_de_P2_�_P1_3,null,"Action de P2 � P1",false,false);
var Types_de_lien_Description_4=new clAttribut("tl_description","typelien",null);


	/* Ce composant repr�sente: typelien.tl_description sous le nom "Description" */
var Compo_Types_de_lien_Description_4=new clCompoTextBox(Types_de_lien_Description_4,null,"Description",false,true);
var Types_de_lien_Liste_des_types_de_lien_entre_personne0=new clEnsembleAttributs("typelien",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Types_de_lien_Liste_des_types_de_lien_entre_personne0)
	),
	new Array(
	new clLiaison(null,Types_de_lien_Libell�_1)
	,new clLiaison(null,Types_de_lien_Action_de_P1_�_P2_2)
	,new clLiaison(null,Types_de_lien_Action_de_P2_�_P1_3)
	,new clLiaison(null,Types_de_lien_Description_4)
	));

var Titre_Types_de_lien_Liste_des_types_de_lien_entre_personne0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table typelien sous le nom "Liste des types de lien entre personne" */
var Compo_Types_de_lien_Liste_des_types_de_lien_entre_personne0=new clCompoListe(Types_de_lien_Liste_des_types_de_lien_entre_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_lien_Liste_des_types_de_lien_entre_personne0,"Liste des types de lien entre personne",true,false);

	/* Ce composant repr�sente: typelien.undefined sous le nom "Liste des types de lien entre personne" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Liste_des_types_de_lien_entre_personne0.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0"));

 }

	/* On l'ajoute au tableau global � l'indice 840*/
top.TAB_GLOBAL_COMPO[840]=Compo_Types_de_lien_Liste_des_types_de_lien_entre_personne0;

	/* Ce composant repr�sente: des �l�ments de la table typelien sous le nom "Libell�" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Libell�_1.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 842*/
top.TAB_GLOBAL_COMPO[842]=Compo_Types_de_lien_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table typelien sous le nom "Action de P1 � P2" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Action_de_P1_�_P2_2.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 843*/
top.TAB_GLOBAL_COMPO[843]=Compo_Types_de_lien_Action_de_P1_�_P2_2;

	/* Ce composant repr�sente: des �l�ments de la table typelien sous le nom "Action de P2 � P1" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Action_de_P2_�_P1_3.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 844*/
top.TAB_GLOBAL_COMPO[844]=Compo_Types_de_lien_Action_de_P2_�_P1_3;

	/* Ce composant repr�sente: des �l�ments de la table typelien sous le nom "Description" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Description_4.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 845*/
top.TAB_GLOBAL_COMPO[845]=Compo_Types_de_lien_Description_4;
var Col_N0_Libell�_De_Types_de_personne_Liste_des_types_de_personne0=new clAttribut("tp_type","typepersonne",null);

var Types_de_personne_Libell�_1=new clAttribut("tp_type","typepersonne",null);


	/* Ce composant repr�sente: typepersonne.tp_type sous le nom "Libell�" */
var Compo_Types_de_personne_Libell�_1=new clCompoTextBox(Types_de_personne_Libell�_1,null,"Libell�",false,false);
var Types_de_personne_Liste_des_types_de_personne0=new clEnsembleAttributs("typepersonne",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Types_de_personne_Liste_des_types_de_personne0)
	),
	new Array(
	new clLiaison(null,Types_de_personne_Libell�_1)
	));

var Titre_Types_de_personne_Liste_des_types_de_personne0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table typepersonne sous le nom "Liste des types de personne" */
var Compo_Types_de_personne_Liste_des_types_de_personne0=new clCompoListe(Types_de_personne_Liste_des_types_de_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_personne_Liste_des_types_de_personne0,"Liste des types de personne",true,false);

	/* Ce composant repr�sente: typepersonne.undefined sous le nom "Liste des types de personne" */
 if(ALeDroit(0,"typepersonne"))
 {
Compo_Types_de_personne_Liste_des_types_de_personne0.GenererXUL(top.document.getElementById("Types_de_personne_Liste_des_types_de_personne0"));

 }

	/* On l'ajoute au tableau global � l'indice 849*/
top.TAB_GLOBAL_COMPO[849]=Compo_Types_de_personne_Liste_des_types_de_personne0;

	/* Ce composant repr�sente: des �l�ments de la table typepersonne sous le nom "Libell�" */
 if(ALeDroit(0,"typepersonne"))
 {
Compo_Types_de_personne_Libell�_1.GenererXUL(top.document.getElementById("Types_de_personne_Liste_des_types_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 851*/
top.TAB_GLOBAL_COMPO[851]=Compo_Types_de_personne_Libell�_1;
var Col_N0_Nom_De_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0=new clAttribut("ts_libelle","typesociete",null);

var Types_de_soci�t�s_Nom_1=new clAttribut("ts_libelle","typesociete",null);


	/* Ce composant repr�sente: typesociete.ts_libelle sous le nom "Nom" */
var Compo_Types_de_soci�t�s_Nom_1=new clCompoTextBox(Types_de_soci�t�s_Nom_1,null,"Nom",false,false);
var Types_de_soci�t�s_Liste_des_types_de_soci�t�s0=new clEnsembleAttributs("typesociete",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0)
	),
	new Array(
	new clLiaison(null,Types_de_soci�t�s_Nom_1)
	));

var Titre_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0=new Array("Nom");

	/* Ce composant repr�sente: des �l�ments de la table typesociete sous le nom "Liste des types de soci�t�s" */
var Compo_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0=new clCompoListe(Types_de_soci�t�s_Liste_des_types_de_soci�t�s0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0,"Liste des types de soci�t�s",true,false);

	/* Ce composant repr�sente: typesociete.undefined sous le nom "Liste des types de soci�t�s" */
 if(ALeDroit(0,"typesociete"))
 {
Compo_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0.GenererXUL(top.document.getElementById("Types_de_soci�t�s_Liste_des_types_de_soci�t�s0"));

 }

	/* On l'ajoute au tableau global � l'indice 866*/
top.TAB_GLOBAL_COMPO[866]=Compo_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0;

	/* Ce composant repr�sente: des �l�ments de la table typesociete sous le nom "Nom" */
 if(ALeDroit(0,"typesociete"))
 {
Compo_Types_de_soci�t�s_Nom_1.GenererXUL(top.document.getElementById("Types_de_soci�t�s_Liste_des_types_de_soci�t�s0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 868*/
top.TAB_GLOBAL_COMPO[868]=Compo_Types_de_soci�t�s_Nom_1;
var Col_N0_Libell�_De_Types_de_t�ches_Liste_des_types_de_t�ches0=new clAttribut("th_libelle","typetache",null);

var Types_de_t�ches_Libell�_1=new clAttribut("th_libelle","typetache",null);


	/* Ce composant repr�sente: typetache.th_libelle sous le nom "Libell�" */
var Compo_Types_de_t�ches_Libell�_1=new clCompoTextBox(Types_de_t�ches_Libell�_1,null,"Libell�",false,false);
var Types_de_t�ches_Description_2=new clAttribut("th_description","typetache",null);


	/* Ce composant repr�sente: typetache.th_description sous le nom "Description" */
var Compo_Types_de_t�ches_Description_2=new clCompoTextBox(Types_de_t�ches_Description_2,null,"Description",false,true);
var Types_de_t�ches_Liste_des_types_de_t�ches0=new clEnsembleAttributs("typetache",
	new Array(
	new clLiaison(null,Col_N0_Libell�_De_Types_de_t�ches_Liste_des_types_de_t�ches0)
	),
	new Array(
	new clLiaison(null,Types_de_t�ches_Libell�_1)
	,new clLiaison(null,Types_de_t�ches_Description_2)
	));

var Titre_Types_de_t�ches_Liste_des_types_de_t�ches0=new Array("Libell�");

	/* Ce composant repr�sente: des �l�ments de la table typetache sous le nom "Liste des types de t�ches" */
var Compo_Types_de_t�ches_Liste_des_types_de_t�ches0=new clCompoListe(Types_de_t�ches_Liste_des_types_de_t�ches0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_t�ches_Liste_des_types_de_t�ches0,"Liste des types de t�ches",true,false);

	/* Ce composant repr�sente: typetache.undefined sous le nom "Liste des types de t�ches" */
 if(ALeDroit(0,"typetache"))
 {
Compo_Types_de_t�ches_Liste_des_types_de_t�ches0.GenererXUL(top.document.getElementById("Types_de_t�ches_Liste_des_types_de_t�ches0"));

 }

	/* On l'ajoute au tableau global � l'indice 819*/
top.TAB_GLOBAL_COMPO[819]=Compo_Types_de_t�ches_Liste_des_types_de_t�ches0;

	/* Ce composant repr�sente: des �l�ments de la table typetache sous le nom "Libell�" */
 if(ALeDroit(0,"typetache"))
 {
Compo_Types_de_t�ches_Libell�_1.GenererXUL(top.document.getElementById("Types_de_t�ches_Liste_des_types_de_t�ches0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 821*/
top.TAB_GLOBAL_COMPO[821]=Compo_Types_de_t�ches_Libell�_1;

	/* Ce composant repr�sente: des �l�ments de la table typetache sous le nom "Description" */
 if(ALeDroit(0,"typetache"))
 {
Compo_Types_de_t�ches_Description_2.GenererXUL(top.document.getElementById("Types_de_t�ches_Liste_des_types_de_t�ches0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 822*/
top.TAB_GLOBAL_COMPO[822]=Compo_Types_de_t�ches_Description_2;
var Col_N0_N__De_Villes_Liste_des_villes0=new clAttribut("vi_numero","ville",null);

var Col_N1_Nom_De_Villes_Liste_des_villes0=new clAttribut("vi_nom","ville",null);

var Col_N2_Canton_De_Villes_Liste_des_villes0=new clAttribut("ct_nom","canton",null);

var Joint_Col_N2_Canton_De_Villes_Liste_des_villes0=new clJointureMulti("ville",
	new Array(
	new stJointure("canton","ct_numero","ct_numero",null,true)
	));
var Villes_Nom_1=new clAttribut("vi_nom","ville",null);


	/* Ce composant repr�sente: ville.vi_nom sous le nom "Nom" */
var Compo_Villes_Nom_1=new clCompoTextBox(Villes_Nom_1,null,"Nom",false,false);
var Villes_Canton_2=new clAttribut("ct_nom","canton",null);


	/* Ce composant repr�sente: canton.ct_nom sous le nom "Canton" */
var Compo_Villes_Canton_2=new clCompoListeDeroulanteSimple(Villes_Canton_2,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Cantons_0=new clInterfaceFiltrageRelationOnglet("Cantons",Gerer_Cantons,OuvrirOnglet_Villes)),"Canton");
var Joint_Esclave_Villes_Canton_2=new clJointureMulti("ville",
	new Array(
	new stJointure("canton","ct_numero","ct_numero",null,false)
	));
var Villes_Liste_des_villes0=new clEnsembleAttributs("ville",
	new Array(
	new clLiaison(null,Col_N0_N__De_Villes_Liste_des_villes0)
	,new clLiaison(null,Col_N1_Nom_De_Villes_Liste_des_villes0)
	,new clLiaison(Joint_Col_N2_Canton_De_Villes_Liste_des_villes0,Col_N2_Canton_De_Villes_Liste_des_villes0)
	),
	new Array(
	new clLiaison(null,Villes_Nom_1)
	,new clLiaison(Joint_Esclave_Villes_Canton_2,Villes_Canton_2)
	));

var Titre_Villes_Liste_des_villes0=new Array("N�","Nom","Canton");

	/* Ce composant repr�sente: des �l�ments de la table ville sous le nom "Liste des villes" */
var Compo_Villes_Liste_des_villes0=new clCompoListe(Villes_Liste_des_villes0,new Array(new clInterfaceFiltrageVide()),Titre_Villes_Liste_des_villes0,"Liste des villes",true,false);

	/* Ce composant repr�sente: ville.undefined sous le nom "Liste des villes" */
 if(ALeDroit(0,"ville"))
 {
Compo_Villes_Liste_des_villes0.GenererXUL(top.document.getElementById("Villes_Liste_des_villes0"));

 }

	/* On l'ajoute au tableau global � l'indice 937*/
top.TAB_GLOBAL_COMPO[937]=Compo_Villes_Liste_des_villes0;

	/* Ce composant repr�sente: des �l�ments de la table ville sous le nom "Nom" */
 if(ALeDroit(0,"ville"))
 {
Compo_Villes_Nom_1.GenererXUL(top.document.getElementById("Villes_Liste_des_villes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 941*/
top.TAB_GLOBAL_COMPO[941]=Compo_Villes_Nom_1;

	/* Ce composant repr�sente: des �l�ments de la table canton sous le nom "Canton" */
 if(ALeDroit(0,"canton"))
 {
Compo_Villes_Canton_2.GenererXUL(top.document.getElementById("Villes_Liste_des_villes0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 942*/
top.TAB_GLOBAL_COMPO[942]=Compo_Villes_Canton_2;
Filtre_Dep_Acc�s_0.setComposant(TAB_GLOBAL_COMPO[794],null);
   /* ARBRE DU DESSUS */
   var box=top.document.getElementById("ListeDessus_Adh�rence_P�riodes_de_validit�_7");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessus_Adh�rence_P�riodes_de_validit�_7");
   tree.setAttribute("ondblclick","DoubleClic_ArbreDessus(document.getElementById('Tree_ListeDessus_Adh�rence_P�riodes_de_validit�_7'), document.getElementById('Tree_ListeDessous_Adh�rence_P�riodes_de_validit�_7'))");

   /* ARBRE DU DESSOUS */
   var box=top.document.getElementById("Adh�rence_P�riodes_de_validit�_7");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessous_Adh�rence_P�riodes_de_validit�_7");
   tree.setAttribute("onkeypress","Suppr_ListeDessous(event)");

Filtre_Dep_Agents_0.setComposant(TAB_GLOBAL_COMPO[918],null);
Filtre_Dep_Agents_1.setComposant(TAB_GLOBAL_COMPO[918],null);
Filtre_Dep_Cantons_0.setComposant(TAB_GLOBAL_COMPO[963],null);
   /* ARBRE DU DESSUS */
   var box=top.document.getElementById("ListeDessus_Codes_postaux_Villes_li�es_au_code_postal_4");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessus_Codes_postaux_Villes_li�es_au_code_postal_4");
   tree.setAttribute("ondblclick","DoubleClic_ArbreDessus(document.getElementById('Tree_ListeDessus_Codes_postaux_Villes_li�es_au_code_postal_4'), document.getElementById('Tree_ListeDessous_Codes_postaux_Villes_li�es_au_code_postal_4'))");

   /* ARBRE DU DESSOUS */
   var box=top.document.getElementById("Codes_postaux_Villes_li�es_au_code_postal_4");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessous_Codes_postaux_Villes_li�es_au_code_postal_4");
   tree.setAttribute("onkeypress","Suppr_ListeDessous(event)");

Filtre_Dep_Profils_de_droits_0.setComposant(TAB_GLOBAL_COMPO[902],null);
Filtre_DepFor_Employ�s_0.setComposant(TAB_GLOBAL_COMPO[890],null);
Filtre_Dep_�quipes_0.setComposant(TAB_GLOBAL_COMPO[934],null);
Filtre_Dep_Groupe_de_tables_0.setComposant(TAB_GLOBAL_COMPO[913],null);
   /* ARBRE DU DESSUS */
   var box=top.document.getElementById("ListeDessus_Groupes_de_cantons_Cantons_appartenant_au_groupe_3");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessus_Groupes_de_cantons_Cantons_appartenant_au_groupe_3");
   tree.setAttribute("ondblclick","DoubleClic_ArbreDessus(document.getElementById('Tree_ListeDessus_Groupes_de_cantons_Cantons_appartenant_au_groupe_3'), document.getElementById('Tree_ListeDessous_Groupes_de_cantons_Cantons_appartenant_au_groupe_3'))");

   /* ARBRE DU DESSOUS */
   var box=top.document.getElementById("Groupes_de_cantons_Cantons_appartenant_au_groupe_3");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessous_Groupes_de_cantons_Cantons_appartenant_au_groupe_3");
   tree.setAttribute("onkeypress","Suppr_ListeDessous(event)");

Filtre_Dep_P�riodes_0.setComposant(TAB_GLOBAL_COMPO[1021],null);
Filtre_Dep_Produits_0.setComposant(TAB_GLOBAL_COMPO[984],null);
Filtre_Dep_Produits_1.setComposant(TAB_GLOBAL_COMPO[984],null);
Filtre_DepFor_Services_0.setComposant(TAB_GLOBAL_COMPO[880],null);
Filtre_Dep_TVA_0.setComposant(TAB_GLOBAL_COMPO[976],null);
Filtre_Dep_Types_de_lien_0.setComposant(TAB_GLOBAL_COMPO[840],null);
Filtre_Dep_Types_de_soci�t�s_0.setComposant(TAB_GLOBAL_COMPO[866],null);
Filtre_Dep_Villes_0.setComposant(TAB_GLOBAL_COMPO[937],null);
 if(ALeDroit(5,"acces"))
 {
/* On refresh les composants non d�pendents de l'onget Acc�s*/
var Composant_0 = TAB_GLOBAL_COMPO[794];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Acc�s").hidden=true;
if (top.document.getElementById("Onglet_Acc�s").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"acces"))
 {
nb_button++;
top.document.getElementById("Insert_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Acc�s_Liste_des_niveaux_d_acc�s0").hidden=true;

 }
 if(ALeDroit(4,"acces"))
 {
nb_button++;
top.document.getElementById("Delete_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Acc�s_Liste_des_niveaux_d_acc�s0").hidden=true;

 }
 if(ALeDroit(1,"acces"))
 {
nb_button++;
top.document.getElementById("Update_Acc�s_Liste_des_niveaux_d_acc�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Acc�s_Liste_des_niveaux_d_acc�s0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Acc�s_Liste_des_niveaux_d_acc�s0").hidden=true;
        top.document.getElementById("Annuler_Acc�s_Liste_des_niveaux_d_acc�s0").hidden=true;
}
 if(ALeDroit(5,"adherence"))
 {
/* On refresh les composants non d�pendents de l'onget Adh�rence*/
var Composant_0 = TAB_GLOBAL_COMPO[1006];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}
var Composant_6 = TAB_GLOBAL_COMPO[1015];
if (Composant_6!=null){
Composant_6.ActiverComposant(true);
Composant_6.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Adh�rence").hidden=true;
if (top.document.getElementById("Onglet_Adh�rence").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"adherence"))
 {
nb_button++;
top.document.getElementById("Insert_Adh�rence_Liste_des_adh�rences0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Adh�rence_Liste_des_adh�rences0").hidden=true;

 }
 if(ALeDroit(4,"adherence"))
 {
nb_button++;
top.document.getElementById("Delete_Adh�rence_Liste_des_adh�rences0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Adh�rence_Liste_des_adh�rences0").hidden=true;

 }
 if(ALeDroit(1,"adherence"))
 {
nb_button++;
top.document.getElementById("Update_Adh�rence_Liste_des_adh�rences0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Adh�rence_Liste_des_adh�rences0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Adh�rence_Liste_des_adh�rences0").hidden=true;
        top.document.getElementById("Annuler_Adh�rence_Liste_des_adh�rences0").hidden=true;
}
 if(ALeDroit(5,"agent"))
 {
/* On refresh les composants non d�pendents de l'onget Agents*/
var Composant_0 = TAB_GLOBAL_COMPO[918];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Agents").hidden=true;
if (top.document.getElementById("Onglet_Agents").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"agent"))
 {
nb_button++;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Agents_Liste_des_agents0").hidden=true;

 }
 if(ALeDroit(4,"agent"))
 {
nb_button++;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Agents_Liste_des_agents0").hidden=true;

 }
 if(ALeDroit(1,"agent"))
 {
nb_button++;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Agents_Liste_des_agents0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Agents_Liste_des_agents0").hidden=true;
        top.document.getElementById("Annuler_Agents_Liste_des_agents0").hidden=true;
}
 if(ALeDroit(5,"canton"))
 {
/* On refresh les composants non d�pendents de l'onget Cantons*/
var Composant_0 = TAB_GLOBAL_COMPO[963];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Cantons").hidden=true;
if (top.document.getElementById("Onglet_Cantons").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"canton"))
 {
nb_button++;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").hidden=true;

 }
 if(ALeDroit(4,"canton"))
 {
nb_button++;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").hidden=true;

 }
 if(ALeDroit(1,"canton"))
 {
nb_button++;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Cantons_Liste_des_cantons0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Cantons_Liste_des_cantons0").hidden=true;
        top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").hidden=true;
}
 if(ALeDroit(5,"codepostal"))
 {
/* On refresh les composants non d�pendents de l'onget Codes postaux*/
var Composant_0 = TAB_GLOBAL_COMPO[943];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}
var Composant_3 = TAB_GLOBAL_COMPO[949];
if (Composant_3!=null){
Composant_3.ActiverComposant(true);
Composant_3.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Codes_postaux").hidden=true;
if (top.document.getElementById("Onglet_Codes_postaux").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"codepostal"))
 {
nb_button++;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").hidden=true;

 }
 if(ALeDroit(4,"codepostal"))
 {
nb_button++;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").hidden=true;

 }
 if(ALeDroit(1,"codepostal"))
 {
nb_button++;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").hidden=true;
        top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").hidden=true;
}
 if(ALeDroit(5,"droitprofil"))
 {
/* On refresh les composants non d�pendents de l'onget Profils de droits*/
var Composant_0 = TAB_GLOBAL_COMPO[902];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Profils_de_droits").hidden=true;
if (top.document.getElementById("Onglet_Profils_de_droits").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"droitprofil"))
 {
nb_button++;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").hidden=true;

 }
 if(ALeDroit(4,"droitprofil"))
 {
nb_button++;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").hidden=true;

 }
 if(ALeDroit(1,"droitprofil"))
 {
nb_button++;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").hidden=true;
        top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"droit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Profils_de_droits_Droits_2").hidden=true;

 }
 if(ALeDroit(4,"droit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Profils_de_droits_Droits_2").hidden=true;

 }
 if(ALeDroit(1,"droit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Profils_de_droits_Droits_2").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Profils_de_droits_Droits_2").hidden=true;
        top.document.getElementById("Annuler_Profils_de_droits_Droits_2").hidden=true;
}
 if(ALeDroit(5,"employe"))
 {
/* On refresh les composants non d�pendents de l'onget Employ�s*/
var Composant_0 = TAB_GLOBAL_COMPO[890];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Employ�s").hidden=true;
if (top.document.getElementById("Onglet_Employ�s").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"employe"))
 {
nb_button++;
top.document.getElementById("Insert_Employ�s_Liste_des_employ�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Employ�s_Liste_des_employ�s0").hidden=true;

 }
 if(ALeDroit(4,"employe"))
 {
nb_button++;
top.document.getElementById("Delete_Employ�s_Liste_des_employ�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Employ�s_Liste_des_employ�s0").hidden=true;

 }
 if(ALeDroit(1,"employe"))
 {
nb_button++;
top.document.getElementById("Update_Employ�s_Liste_des_employ�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Employ�s_Liste_des_employ�s0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Employ�s_Liste_des_employ�s0").hidden=true;
        top.document.getElementById("Annuler_Employ�s_Liste_des_employ�s0").hidden=true;
}
 if(ALeDroit(5,"equipe"))
 {
/* On refresh les composants non d�pendents de l'onget �quipes*/
var Composant_0 = TAB_GLOBAL_COMPO[934];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_�quipes").hidden=true;
if (top.document.getElementById("Onglet_�quipes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"equipe"))
 {
nb_button++;
top.document.getElementById("Insert_�quipes_Liste_des_�quipes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_�quipes_Liste_des_�quipes0").hidden=true;

 }
 if(ALeDroit(4,"equipe"))
 {
nb_button++;
top.document.getElementById("Delete_�quipes_Liste_des_�quipes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_�quipes_Liste_des_�quipes0").hidden=true;

 }
 if(ALeDroit(1,"equipe"))
 {
nb_button++;
top.document.getElementById("Update_�quipes_Liste_des_�quipes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_�quipes_Liste_des_�quipes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_�quipes_Liste_des_�quipes0").hidden=true;
        top.document.getElementById("Annuler_�quipes_Liste_des_�quipes0").hidden=true;
}
 if(ALeDroit(5,"etatpersonne"))
 {
/* On refresh les composants non d�pendents de l'onget Etats de personne*/
var Composant_0 = TAB_GLOBAL_COMPO[863];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Etats_de_personne").hidden=true;
if (top.document.getElementById("Onglet_Etats_de_personne").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"etatpersonne"))
 {
nb_button++;
top.document.getElementById("Insert_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Etats_de_personne_Liste_des_�tats_de_personne0").hidden=true;

 }
 if(ALeDroit(4,"etatpersonne"))
 {
nb_button++;
top.document.getElementById("Delete_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Etats_de_personne_Liste_des_�tats_de_personne0").hidden=true;

 }
 if(ALeDroit(1,"etatpersonne"))
 {
nb_button++;
top.document.getElementById("Update_Etats_de_personne_Liste_des_�tats_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Etats_de_personne_Liste_des_�tats_de_personne0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Etats_de_personne_Liste_des_�tats_de_personne0").hidden=true;
        top.document.getElementById("Annuler_Etats_de_personne_Liste_des_�tats_de_personne0").hidden=true;
}
 if(ALeDroit(5,"groupetable"))
 {
/* On refresh les composants non d�pendents de l'onget Groupe de tables*/
var Composant_0 = TAB_GLOBAL_COMPO[913];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Groupe_de_tables").hidden=true;
if (top.document.getElementById("Onglet_Groupe_de_tables").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"groupetable"))
 {
nb_button++;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").hidden=true;

 }
 if(ALeDroit(4,"groupetable"))
 {
nb_button++;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").hidden=true;

 }
 if(ALeDroit(1,"groupetable"))
 {
nb_button++;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").hidden=true;
        top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").hidden=true;
}
 if(ALeDroit(5,"groupecanton"))
 {
/* On refresh les composants non d�pendents de l'onget Groupes de cantons*/
var Composant_0 = TAB_GLOBAL_COMPO[831];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}
var Composant_2 = TAB_GLOBAL_COMPO[835];
if (Composant_2!=null){
Composant_2.ActiverComposant(true);
Composant_2.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Groupes_de_cantons").hidden=true;
if (top.document.getElementById("Onglet_Groupes_de_cantons").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"groupecanton"))
 {
nb_button++;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").hidden=true;

 }
 if(ALeDroit(4,"groupecanton"))
 {
nb_button++;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").hidden=true;

 }
 if(ALeDroit(1,"groupecanton"))
 {
nb_button++;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").hidden=true;
        top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").hidden=true;
}
 if(ALeDroit(5,"impression"))
 {
/* On refresh les composants non d�pendents de l'onget Mod�les d'impressions*/
var Composant_0 = TAB_GLOBAL_COMPO[1045];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Mod�les_d_impressions").hidden=true;
if (top.document.getElementById("Onglet_Mod�les_d_impressions").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"impression"))
 {
nb_button++;
top.document.getElementById("Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").hidden=true;

 }
 if(ALeDroit(4,"impression"))
 {
nb_button++;
top.document.getElementById("Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").hidden=true;

 }
 if(ALeDroit(1,"impression"))
 {
nb_button++;
top.document.getElementById("Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").hidden=true;
        top.document.getElementById("Annuler_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0").hidden=true;
}
 if(ALeDroit(5,"table_impression"))
 {
/* On refresh les composants non d�pendents de l'onget Impressions*/
var Composant_0 = TAB_GLOBAL_COMPO[1055];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Impressions").hidden=true;
if (top.document.getElementById("Onglet_Impressions").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"table_impression"))
 {
nb_button++;
top.document.getElementById("Insert_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Impressions_Liste_des_mod�les_d_impressions0").hidden=true;

 }
 if(ALeDroit(4,"table_impression"))
 {
nb_button++;
top.document.getElementById("Delete_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Impressions_Liste_des_mod�les_d_impressions0").hidden=true;

 }
 if(ALeDroit(1,"table_impression"))
 {
nb_button++;
top.document.getElementById("Update_Impressions_Liste_des_mod�les_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Impressions_Liste_des_mod�les_d_impressions0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Impressions_Liste_des_mod�les_d_impressions0").hidden=true;
        top.document.getElementById("Annuler_Impressions_Liste_des_mod�les_d_impressions0").hidden=true;
}
 if(ALeDroit(5,"modele"))
 {
/* On refresh les composants non d�pendents de l'onget Mod�les*/
var Composant_0 = TAB_GLOBAL_COMPO[1033];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Mod�les").hidden=true;
if (top.document.getElementById("Onglet_Mod�les").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"modele"))
 {
nb_button++;
top.document.getElementById("Insert_Mod�les_Liste_des_mod�les0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Mod�les_Liste_des_mod�les0").hidden=true;

 }
 if(ALeDroit(4,"modele"))
 {
nb_button++;
top.document.getElementById("Delete_Mod�les_Liste_des_mod�les0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Mod�les_Liste_des_mod�les0").hidden=true;

 }
 if(ALeDroit(1,"modele"))
 {
nb_button++;
top.document.getElementById("Update_Mod�les_Liste_des_mod�les0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Mod�les_Liste_des_mod�les0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Mod�les_Liste_des_mod�les0").hidden=true;
        top.document.getElementById("Annuler_Mod�les_Liste_des_mod�les0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"lignemodele"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Mod�les_Lignes_du_mod�le_2").hidden=true;

 }
 if(ALeDroit(4,"lignemodele"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Mod�les_Lignes_du_mod�le_2").hidden=true;

 }
 if(ALeDroit(1,"lignemodele"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Mod�les_Lignes_du_mod�le_2").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Mod�les_Lignes_du_mod�le_2").hidden=true;
        top.document.getElementById("Annuler_Mod�les_Lignes_du_mod�le_2").hidden=true;
}
 if(ALeDroit(5,"modereglement"))
 {
/* On refresh les composants non d�pendents de l'onget Mode de r�glements*/
var Composant_0 = TAB_GLOBAL_COMPO[800];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Mode_de_r�glements").hidden=true;
if (top.document.getElementById("Onglet_Mode_de_r�glements").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"modereglement"))
 {
nb_button++;
top.document.getElementById("Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0").hidden=true;

 }
 if(ALeDroit(4,"modereglement"))
 {
nb_button++;
top.document.getElementById("Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0").hidden=true;

 }
 if(ALeDroit(1,"modereglement"))
 {
nb_button++;
top.document.getElementById("Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Mode_de_r�glements_Liste_des_modes_de_r�glement0").hidden=true;
        top.document.getElementById("Annuler_Mode_de_r�glements_Liste_des_modes_de_r�glement0").hidden=true;
}
 if(ALeDroit(5,"moderepartition"))
 {
/* On refresh les composants non d�pendents de l'onget Modes de r�partition*/
var Composant_0 = TAB_GLOBAL_COMPO[810];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Modes_de_r�partition").hidden=true;
if (top.document.getElementById("Onglet_Modes_de_r�partition").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"moderepartition"))
 {
nb_button++;
top.document.getElementById("Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0").hidden=true;

 }
 if(ALeDroit(4,"moderepartition"))
 {
nb_button++;
top.document.getElementById("Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0").hidden=true;

 }
 if(ALeDroit(1,"moderepartition"))
 {
nb_button++;
top.document.getElementById("Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Modes_de_r�partition_Liste_des_modes_de_r�partition0").hidden=true;
        top.document.getElementById("Annuler_Modes_de_r�partition_Liste_des_modes_de_r�partition0").hidden=true;
}
 if(ALeDroit(5,"naturepersonne"))
 {
/* On refresh les composants non d�pendents de l'onget Natures de personne*/
var Composant_0 = TAB_GLOBAL_COMPO[852];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Natures_de_personne").hidden=true;
if (top.document.getElementById("Onglet_Natures_de_personne").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"naturepersonne"))
 {
nb_button++;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Natures_de_personne_Liste_des_�tats_de_personne0").hidden=true;

 }
 if(ALeDroit(4,"naturepersonne"))
 {
nb_button++;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Natures_de_personne_Liste_des_�tats_de_personne0").hidden=true;

 }
 if(ALeDroit(1,"naturepersonne"))
 {
nb_button++;
top.document.getElementById("Update_Natures_de_personne_Liste_des_�tats_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Natures_de_personne_Liste_des_�tats_de_personne0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Natures_de_personne_Liste_des_�tats_de_personne0").hidden=true;
        top.document.getElementById("Annuler_Natures_de_personne_Liste_des_�tats_de_personne0").hidden=true;
}
 if(ALeDroit(5,"periode"))
 {
/* On refresh les composants non d�pendents de l'onget P�riodes*/
var Composant_0 = TAB_GLOBAL_COMPO[1021];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_P�riodes").hidden=true;
if (top.document.getElementById("Onglet_P�riodes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"periode"))
 {
nb_button++;
top.document.getElementById("Insert_P�riodes_Liste_des_p�riodes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_P�riodes_Liste_des_p�riodes0").hidden=true;

 }
 if(ALeDroit(4,"periode"))
 {
nb_button++;
top.document.getElementById("Delete_P�riodes_Liste_des_p�riodes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_P�riodes_Liste_des_p�riodes0").hidden=true;

 }
 if(ALeDroit(1,"periode"))
 {
nb_button++;
top.document.getElementById("Update_P�riodes_Liste_des_p�riodes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_P�riodes_Liste_des_p�riodes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_P�riodes_Liste_des_p�riodes0").hidden=true;
        top.document.getElementById("Annuler_P�riodes_Liste_des_p�riodes0").hidden=true;
}
 if(ALeDroit(5,"prefixe"))
 {
/* On refresh les composants non d�pendents de l'onget Pr�fixes*/
var Composant_0 = TAB_GLOBAL_COMPO[1030];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Pr�fixes").hidden=true;
if (top.document.getElementById("Onglet_Pr�fixes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"prefixe"))
 {
nb_button++;
top.document.getElementById("Insert_Pr�fixes_Liste_des_pr�fixes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Pr�fixes_Liste_des_pr�fixes0").hidden=true;

 }
 if(ALeDroit(4,"prefixe"))
 {
nb_button++;
top.document.getElementById("Delete_Pr�fixes_Liste_des_pr�fixes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Pr�fixes_Liste_des_pr�fixes0").hidden=true;

 }
 if(ALeDroit(1,"prefixe"))
 {
nb_button++;
top.document.getElementById("Update_Pr�fixes_Liste_des_pr�fixes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Pr�fixes_Liste_des_pr�fixes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Pr�fixes_Liste_des_pr�fixes0").hidden=true;
        top.document.getElementById("Annuler_Pr�fixes_Liste_des_pr�fixes0").hidden=true;
}
 if(ALeDroit(5,"produit"))
 {
/* On refresh les composants non d�pendents de l'onget Produits*/
var Composant_0 = TAB_GLOBAL_COMPO[984];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Produits").hidden=true;
if (top.document.getElementById("Onglet_Produits").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"produit"))
 {
nb_button++;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Produits_Liste_des_produits0").hidden=true;

 }
 if(ALeDroit(4,"produit"))
 {
nb_button++;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Produits_Liste_des_produits0").hidden=true;

 }
 if(ALeDroit(1,"produit"))
 {
nb_button++;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Produits_Liste_des_produits0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Produits_Liste_des_produits0").hidden=true;
        top.document.getElementById("Annuler_Produits_Liste_des_produits0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"prix"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Produits_Prix_7").hidden=true;

 }
 if(ALeDroit(4,"prix"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Produits_Prix_7").hidden=true;

 }
 if(ALeDroit(1,"prix"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Produits_Prix_7").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Produits_Prix_7").hidden=true;
        top.document.getElementById("Annuler_Produits_Prix_7").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"compteproduit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Produits_Comptes_g�n�raux_11").hidden=true;

 }
 if(ALeDroit(4,"compteproduit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Produits_Comptes_g�n�raux_11").hidden=true;

 }
 if(ALeDroit(1,"compteproduit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Produits_Comptes_g�n�raux_11").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Produits_Comptes_g�n�raux_11").hidden=true;
        top.document.getElementById("Annuler_Produits_Comptes_g�n�raux_11").hidden=true;
}
 if(ALeDroit(5,"responsabilite"))
 {
/* On refresh les composants non d�pendents de l'onget Responsabilit�s*/
var Composant_0 = TAB_GLOBAL_COMPO[969];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Responsabilit�s").hidden=true;
if (top.document.getElementById("Onglet_Responsabilit�s").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"responsabilite"))
 {
nb_button++;
top.document.getElementById("Insert_Responsabilit�s_Responsabilit�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Responsabilit�s_Responsabilit�s0").hidden=true;

 }
 if(ALeDroit(4,"responsabilite"))
 {
nb_button++;
top.document.getElementById("Delete_Responsabilit�s_Responsabilit�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Responsabilit�s_Responsabilit�s0").hidden=true;

 }
 if(ALeDroit(1,"responsabilite"))
 {
nb_button++;
top.document.getElementById("Update_Responsabilit�s_Responsabilit�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Responsabilit�s_Responsabilit�s0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Responsabilit�s_Responsabilit�s0").hidden=true;
        top.document.getElementById("Annuler_Responsabilit�s_Responsabilit�s0").hidden=true;
}
 if(ALeDroit(5,"service"))
 {
/* On refresh les composants non d�pendents de l'onget Services*/
var Composant_0 = TAB_GLOBAL_COMPO[880];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Services").hidden=true;
if (top.document.getElementById("Onglet_Services").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"service"))
 {
nb_button++;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Services_Liste_des_services0").hidden=true;

 }
 if(ALeDroit(4,"service"))
 {
nb_button++;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Services_Liste_des_services0").hidden=true;

 }
 if(ALeDroit(1,"service"))
 {
nb_button++;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Services_Liste_des_services0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Services_Liste_des_services0").hidden=true;
        top.document.getElementById("Annuler_Services_Liste_des_services0").hidden=true;
}
 if(ALeDroit(5,"societe"))
 {
/* On refresh les composants non d�pendents de l'onget Soci�t�s*/
var Composant_0 = TAB_GLOBAL_COMPO[869];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Soci�t�s").hidden=true;
if (top.document.getElementById("Onglet_Soci�t�s").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"societe"))
 {
nb_button++;
top.document.getElementById("Insert_Soci�t�s_Liste_des_soci�t�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Soci�t�s_Liste_des_soci�t�s0").hidden=true;

 }
 if(ALeDroit(4,"societe"))
 {
nb_button++;
top.document.getElementById("Delete_Soci�t�s_Liste_des_soci�t�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Soci�t�s_Liste_des_soci�t�s0").hidden=true;

 }
 if(ALeDroit(1,"societe"))
 {
nb_button++;
top.document.getElementById("Update_Soci�t�s_Liste_des_soci�t�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Soci�t�s_Liste_des_soci�t�s0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Soci�t�s_Liste_des_soci�t�s0").hidden=true;
        top.document.getElementById("Annuler_Soci�t�s_Liste_des_soci�t�s0").hidden=true;
}
 if(ALeDroit(5,"tva"))
 {
/* On refresh les composants non d�pendents de l'onget TVA*/
var Composant_0 = TAB_GLOBAL_COMPO[976];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_TVA").hidden=true;
if (top.document.getElementById("Onglet_TVA").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"tva"))
 {
nb_button++;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").hidden=true;

 }
 if(ALeDroit(4,"tva"))
 {
nb_button++;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").hidden=true;

 }
 if(ALeDroit(1,"tva"))
 {
nb_button++;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").hidden=true;
        top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").hidden=true;
}
 if(ALeDroit(5,"typeadresse"))
 {
/* On refresh les composants non d�pendents de l'onget Types d'adresses*/
var Composant_0 = TAB_GLOBAL_COMPO[846];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_d_adresses").hidden=true;
if (top.document.getElementById("Onglet_Types_d_adresses").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typeadresse"))
 {
nb_button++;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").hidden=true;

 }
 if(ALeDroit(4,"typeadresse"))
 {
nb_button++;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").hidden=true;

 }
 if(ALeDroit(1,"typeadresse"))
 {
nb_button++;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").hidden=true;
        top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").hidden=true;
}
 if(ALeDroit(5,"typeattribut"))
 {
/* On refresh les composants non d�pendents de l'onget Types d'attribut*/
var Composant_0 = TAB_GLOBAL_COMPO[823];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_d_attribut").hidden=true;
if (top.document.getElementById("Onglet_Types_d_attribut").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typeattribut"))
 {
nb_button++;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").hidden=true;

 }
 if(ALeDroit(4,"typeattribut"))
 {
nb_button++;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").hidden=true;

 }
 if(ALeDroit(1,"typeattribut"))
 {
nb_button++;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").hidden=true;
        top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"categorie"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Types_d_attribut_Cat�gories_2").hidden=true;

 }
 if(ALeDroit(4,"categorie"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Types_d_attribut_Cat�gories_2").hidden=true;

 }
 if(ALeDroit(1,"categorie"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Types_d_attribut_Cat�gories_2").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_d_attribut_Cat�gories_2").hidden=true;
        top.document.getElementById("Annuler_Types_d_attribut_Cat�gories_2").hidden=true;
}
 if(ALeDroit(5,"contacttype"))
 {
/* On refresh les composants non d�pendents de l'onget Types de contacts*/
var Composant_0 = TAB_GLOBAL_COMPO[955];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_contacts").hidden=true;
if (top.document.getElementById("Onglet_Types_de_contacts").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"contacttype"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").hidden=true;

 }
 if(ALeDroit(4,"contacttype"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").hidden=true;

 }
 if(ALeDroit(1,"contacttype"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").hidden=true;
        top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").hidden=true;
}
 if(ALeDroit(5,"typejournal"))
 {
/* On refresh les composants non d�pendents de l'onget Types de journaux*/
var Composant_0 = TAB_GLOBAL_COMPO[1027];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_journaux").hidden=true;
if (top.document.getElementById("Onglet_Types_de_journaux").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typejournal"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").hidden=true;

 }
 if(ALeDroit(4,"typejournal"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").hidden=true;

 }
 if(ALeDroit(1,"typejournal"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").hidden=true;
        top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").hidden=true;
}
 if(ALeDroit(5,"typelien"))
 {
/* On refresh les composants non d�pendents de l'onget Types de lien*/
var Composant_0 = TAB_GLOBAL_COMPO[840];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_lien").hidden=true;
if (top.document.getElementById("Onglet_Types_de_lien").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typelien"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").hidden=true;

 }
 if(ALeDroit(4,"typelien"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").hidden=true;

 }
 if(ALeDroit(1,"typelien"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").hidden=true;
        top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").hidden=true;
}
 if(ALeDroit(5,"typepersonne"))
 {
/* On refresh les composants non d�pendents de l'onget Types de personne*/
var Composant_0 = TAB_GLOBAL_COMPO[849];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_personne").hidden=true;
if (top.document.getElementById("Onglet_Types_de_personne").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typepersonne"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").hidden=true;

 }
 if(ALeDroit(4,"typepersonne"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").hidden=true;

 }
 if(ALeDroit(1,"typepersonne"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").hidden=true;
        top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").hidden=true;
}
 if(ALeDroit(5,"typesociete"))
 {
/* On refresh les composants non d�pendents de l'onget Types de soci�t�s*/
var Composant_0 = TAB_GLOBAL_COMPO[866];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_soci�t�s").hidden=true;
if (top.document.getElementById("Onglet_Types_de_soci�t�s").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typesociete"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").hidden=true;

 }
 if(ALeDroit(4,"typesociete"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").hidden=true;

 }
 if(ALeDroit(1,"typesociete"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").hidden=true;
        top.document.getElementById("Annuler_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0").hidden=true;
}
 if(ALeDroit(5,"typetache"))
 {
/* On refresh les composants non d�pendents de l'onget Types de t�ches*/
var Composant_0 = TAB_GLOBAL_COMPO[819];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_t�ches").hidden=true;
if (top.document.getElementById("Onglet_Types_de_t�ches").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typetache"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_t�ches_Liste_des_types_de_t�ches0").hidden=true;

 }
 if(ALeDroit(4,"typetache"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_t�ches_Liste_des_types_de_t�ches0").hidden=true;

 }
 if(ALeDroit(1,"typetache"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_t�ches_Liste_des_types_de_t�ches0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_t�ches_Liste_des_types_de_t�ches0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_t�ches_Liste_des_types_de_t�ches0").hidden=true;
        top.document.getElementById("Annuler_Types_de_t�ches_Liste_des_types_de_t�ches0").hidden=true;
}
 if(ALeDroit(5,"ville"))
 {
/* On refresh les composants non d�pendents de l'onget Villes*/
var Composant_0 = TAB_GLOBAL_COMPO[937];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Villes").hidden=true;
if (top.document.getElementById("Onglet_Villes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"ville"))
 {
nb_button++;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Villes_Liste_des_villes0").hidden=true;

 }
 if(ALeDroit(4,"ville"))
 {
nb_button++;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Villes_Liste_des_villes0").hidden=true;

 }
 if(ALeDroit(1,"ville"))
 {
nb_button++;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Villes_Liste_des_villes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Villes_Liste_des_villes0").hidden=true;
        top.document.getElementById("Annuler_Villes_Liste_des_villes0").hidden=true;
}
Filtre_ProduitPrixTva.setComposant(Compo_Produits_T_V_A__10);
}
