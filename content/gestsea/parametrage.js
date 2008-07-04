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
var TAB_COMPO_PPTES = new Array(1262);
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
         FONCTIONS POUR L'ONGLET Accès
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Accès_0;
function Retour_Accès()
{
 if (Filtre_Dep_Accès_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Accès_0.FctFermetureOnglet();
 }
}
function Gerer_Accès(IdFiltreOnglet)
{
/* On désactive les autres filtres */
if (Filtre_Dep_Accès_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Accès_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Accès");
}

function OuvrirOnglet_Accès()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Accès");
}

function Insert_Accès_Liste_des_niveaux_d_accès0()
{
 TAB_COMPO_PPTES[978].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[978].NewCle = getNewCle("acces");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[978].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[982];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[983];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Annuler_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Insert_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Delete_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Update_Accès_Liste_des_niveaux_d_accès0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[978];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[978].NewCle;
}

function Delete_Accès_Liste_des_niveaux_d_accès0()
{
 if (TAB_GLOBAL_COMPO[978].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[978];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[978].Action_en_cours = DELETE;
         User_Delete_Accès_Liste_des_niveaux_d_accès0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Accès_0.OnClose(true);
 }
}

function Update_Accès_Liste_des_niveaux_d_accès0()
{
 if (TAB_GLOBAL_COMPO[978].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[978].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[978].NewCle = TAB_GLOBAL_COMPO[978].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[978].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[982];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[983];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Annuler_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Insert_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Delete_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Update_Accès_Liste_des_niveaux_d_accès0").disabled=true;
return TAB_COMPO_PPTES[978].NewCle;
}

function Validate_Accès_Liste_des_niveaux_d_accès0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[978];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[978].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Accès_Liste_des_niveaux_d_accès0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Accès_Liste_des_niveaux_d_accès0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[978].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[982];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[983];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Annuler_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Insert_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Delete_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Update_Accès_Liste_des_niveaux_d_accès0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[978].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Accès_0.OnClose(false);
 }
 TAB_COMPO_PPTES[978].Action_en_cours = null;
 return NewCle;
}

function Annuler_Accès_Liste_des_niveaux_d_accès0()
{
 TAB_COMPO_PPTES[978].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[978].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[982];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[983];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Annuler_Accès_Liste_des_niveaux_d_accès0").disabled=true;
top.document.getElementById("Insert_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Delete_Accès_Liste_des_niveaux_d_accès0").disabled=false;
top.document.getElementById("Update_Accès_Liste_des_niveaux_d_accès0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Adhérence
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Adhérence()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Adhérence");
}

function Insert_Adhérence_Liste_des_adhérences0()
{
 TAB_COMPO_PPTES[1202].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1202].NewCle = getNewCle("adherence");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1202].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1206];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1207];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1208];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1209];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1210];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1214];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Annuler_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Insert_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Delete_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Update_Adhérence_Liste_des_adhérences0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1202];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1202].NewCle;
}

function Delete_Adhérence_Liste_des_adhérences0()
{
 if (TAB_GLOBAL_COMPO[1202].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1202];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1202].Action_en_cours = DELETE;
         User_Delete_Adhérence_Liste_des_adhérences0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Adhérence_Liste_des_adhérences0()
{
 if (TAB_GLOBAL_COMPO[1202].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1202].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1202].NewCle = TAB_GLOBAL_COMPO[1202].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1202].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1206];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1207];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1208];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1209];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1210];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1214];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Annuler_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Insert_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Delete_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Update_Adhérence_Liste_des_adhérences0").disabled=true;
return TAB_COMPO_PPTES[1202].NewCle;
}

function Validate_Adhérence_Liste_des_adhérences0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1202];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1202].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Adhérence_Liste_des_adhérences0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Adhérence_Liste_des_adhérences0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1202].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1206];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1207];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1208];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1209];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1210];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1214];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Annuler_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Insert_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Delete_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Update_Adhérence_Liste_des_adhérences0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1202].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1202].Action_en_cours = null;
 return NewCle;
}

function Annuler_Adhérence_Liste_des_adhérences0()
{
 TAB_COMPO_PPTES[1202].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1202].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1206];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1207];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1208];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1209];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1210];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1214];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Annuler_Adhérence_Liste_des_adhérences0").disabled=true;
top.document.getElementById("Insert_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Delete_Adhérence_Liste_des_adhérences0").disabled=false;
top.document.getElementById("Update_Adhérence_Liste_des_adhérences0").disabled=false;
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1114].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1114].NewCle = getNewCle("agent");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1114].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1120];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1121];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1122];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1123];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1124];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1125];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1126];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1127];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[1128];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[1129];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Annuler_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1114];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1114].NewCle;
}

function Delete_Agents_Liste_des_agents0()
{
 if (TAB_GLOBAL_COMPO[1114].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1114];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1114].Action_en_cours = DELETE;
         User_Delete_Agents_Liste_des_agents0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Agents_0.OnClose(true);
        Filtre_Dep_Agents_1.OnClose(true);
 }
}

function Update_Agents_Liste_des_agents0()
{
 if (TAB_GLOBAL_COMPO[1114].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1114].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1114].NewCle = TAB_GLOBAL_COMPO[1114].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1114].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1120];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1121];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1122];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1123];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1124];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1125];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1126];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1127];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[1128];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[1129];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Annuler_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=true;
return TAB_COMPO_PPTES[1114].NewCle;
}

function Validate_Agents_Liste_des_agents0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1114];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1114].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1114].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1120];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1121];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1122];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1123];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1124];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1125];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1126];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1127];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[1128];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[1129];
 Esclave_9.ActiverComposant(false);
top.document.getElementById("Validate_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Annuler_Agents_Liste_des_agents0").disabled=true;
top.document.getElementById("Insert_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Delete_Agents_Liste_des_agents0").disabled=false;
top.document.getElementById("Update_Agents_Liste_des_agents0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1114].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Agents_0.OnClose(false);
 Filtre_Dep_Agents_1.OnClose(false);
 }
 TAB_COMPO_PPTES[1114].Action_en_cours = null;
 return NewCle;
}

function Annuler_Agents_Liste_des_agents0()
{
 TAB_COMPO_PPTES[1114].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1114].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1120];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1121];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1122];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1123];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1124];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1125];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1126];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1127];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[1128];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[1129];
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1159].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1159].NewCle = getNewCle("canton");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1159].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1162];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1163];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1159];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1159].NewCle;
}

function Delete_Cantons_Liste_des_cantons0()
{
 if (TAB_GLOBAL_COMPO[1159].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1159];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1159].Action_en_cours = DELETE;
         User_Delete_Cantons_Liste_des_cantons0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Cantons_0.OnClose(true);
 }
}

function Update_Cantons_Liste_des_cantons0()
{
 if (TAB_GLOBAL_COMPO[1159].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1159].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1159].NewCle = TAB_GLOBAL_COMPO[1159].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1159].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1162];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1163];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=true;
return TAB_COMPO_PPTES[1159].NewCle;
}

function Validate_Cantons_Liste_des_cantons0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1159];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1159].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1159].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1162];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1163];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Annuler_Cantons_Liste_des_cantons0").disabled=true;
top.document.getElementById("Insert_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Delete_Cantons_Liste_des_cantons0").disabled=false;
top.document.getElementById("Update_Cantons_Liste_des_cantons0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1159].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Cantons_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1159].Action_en_cours = null;
 return NewCle;
}

function Annuler_Cantons_Liste_des_cantons0()
{
 TAB_COMPO_PPTES[1159].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1159].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1162];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1163];
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
 TAB_COMPO_PPTES[1139].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1139].NewCle = getNewCle("codepostal");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1139].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1143];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1144];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1148];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1139];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1139].NewCle;
}

function Delete_Codes_postaux_Liste_des_codes_postaux0()
{
 if (TAB_GLOBAL_COMPO[1139].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1139];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1139].Action_en_cours = DELETE;
         User_Delete_Codes_postaux_Liste_des_codes_postaux0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Codes_postaux_Liste_des_codes_postaux0()
{
 if (TAB_GLOBAL_COMPO[1139].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1139].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1139].NewCle = TAB_GLOBAL_COMPO[1139].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1139].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1143];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1144];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1148];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
return TAB_COMPO_PPTES[1139].NewCle;
}

function Validate_Codes_postaux_Liste_des_codes_postaux0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1139];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1139].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1139].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1143];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1144];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1148];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Annuler_Codes_postaux_Liste_des_codes_postaux0").disabled=true;
top.document.getElementById("Insert_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Delete_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
top.document.getElementById("Update_Codes_postaux_Liste_des_codes_postaux0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1139].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1139].Action_en_cours = null;
 return NewCle;
}

function Annuler_Codes_postaux_Liste_des_codes_postaux0()
{
 TAB_COMPO_PPTES[1139].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1139].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1143];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1144];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1148];
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1098].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1098].NewCle = getNewCle("droitprofil");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1098].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1100];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1101];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1098];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1098].NewCle;
}

function Delete_Profils_de_droits_Liste_des_profils_de_droits0()
{
 if (TAB_GLOBAL_COMPO[1098].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1098];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1098].Action_en_cours = DELETE;
         User_Delete_Profils_de_droits_Liste_des_profils_de_droits0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Profils_de_droits_0.OnClose(true);
 }
}

function Update_Profils_de_droits_Liste_des_profils_de_droits0()
{
 if (TAB_GLOBAL_COMPO[1098].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1098].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1098].NewCle = TAB_GLOBAL_COMPO[1098].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1098].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1100];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1101];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
return TAB_COMPO_PPTES[1098].NewCle;
}

function Validate_Profils_de_droits_Liste_des_profils_de_droits0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1098];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1098].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1098].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1100];
 Esclave_0.ActiverComposant(false);
Annuler_Profils_de_droits_Droits_2();
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1101];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1098].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Profils_de_droits_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1098].Action_en_cours = null;
 return NewCle;
}

function Annuler_Profils_de_droits_Liste_des_profils_de_droits0()
{
 TAB_COMPO_PPTES[1098].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1098].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1100];
 Esclave_0.ActiverComposant(false);
Annuler_Profils_de_droits_Droits_2();
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1101];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Liste_des_profils_de_droits0").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Liste_des_profils_de_droits0").disabled=false;
}

function Insert_Profils_de_droits_Droits_2()
{
 if (TAB_COMPO_PPTES[1098].Action_en_cours == INSERT)
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
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Profils_de_droits_Droits_2();
                }
                 return;
         }
 TAB_COMPO_PPTES[1101].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1101].NewCle = getNewCle("droit");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1101].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1104];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1105];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1106];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1107];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1108];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1101];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[1105].my_CompoXUL.value=true;
TAB_GLOBAL_COMPO[1105].my_CompoXUL.checked=true;

return TAB_COMPO_PPTES[1101].NewCle;
}

function Delete_Profils_de_droits_Droits_2()
{
 if (TAB_GLOBAL_COMPO[1101].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1101];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1101].Action_en_cours = DELETE;
         User_Delete_Profils_de_droits_Droits_2(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Profils_de_droits_Droits_2()
{
 if (TAB_GLOBAL_COMPO[1101].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1101].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1101].NewCle = TAB_GLOBAL_COMPO[1101].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1101].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1104];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1105];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1106];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1107];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1108];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=true;
return TAB_COMPO_PPTES[1101].NewCle;
}

function Validate_Profils_de_droits_Droits_2(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1101];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1101].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1101].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1104];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1105];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1106];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1107];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1108];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1101].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1101].Action_en_cours = null;
 return NewCle;
}

function Annuler_Profils_de_droits_Droits_2()
{
 TAB_COMPO_PPTES[1101].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1101].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1104];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1105];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1106];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1107];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1108];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Annuler_Profils_de_droits_Droits_2").disabled=true;
top.document.getElementById("Insert_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Delete_Profils_de_droits_Droits_2").disabled=false;
top.document.getElementById("Update_Profils_de_droits_Droits_2").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Employés
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Employés_0;
function Retour_Employés()
{
 if (Filtre_DepFor_Employés_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Employés_0.FctFermetureOnglet();
 }
}
function Gerer_Employés(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas être en mode insertion */
if(TAB_COMPO_PPTES[1072].Action_en_cours == INSERT)
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
                        alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                        return;
                }
        }
        else
                 return;
}
/* On désactive les autres filtres */
if (Filtre_DepFor_Employés_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Employés_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Employés");
}

function OuvrirOnglet_Employés()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Employés");
}

function Insert_Employés_Liste_des_employés0()
{
 TAB_COMPO_PPTES[1082].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1082].NewCle = getNewCle("employe");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1082].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1086];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1087];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1088];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1089];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1090];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1091];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1092];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1093];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[1094];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[1095];
 Esclave_9.ActiverComposant(true);
 var Esclave_10=TAB_GLOBAL_COMPO[1096];
 Esclave_10.ActiverComposant(true);
 var Esclave_11=TAB_GLOBAL_COMPO[1097];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Annuler_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Insert_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Delete_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Update_Employés_Liste_des_employés0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1082];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1082].NewCle;
}

function Delete_Employés_Liste_des_employés0()
{
 if (TAB_GLOBAL_COMPO[1082].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1082];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1082].Action_en_cours = DELETE;
         User_Delete_Employés_Liste_des_employés0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Employés_0.Refresh();
 }
}

function Update_Employés_Liste_des_employés0()
{
 if (TAB_GLOBAL_COMPO[1082].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1082].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1082].NewCle = TAB_GLOBAL_COMPO[1082].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1082].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1086];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1087];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1088];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1089];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1090];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1091];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1092];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1093];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[1094];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[1095];
 Esclave_9.ActiverComposant(true);
 var Esclave_10=TAB_GLOBAL_COMPO[1096];
 Esclave_10.ActiverComposant(true);
 var Esclave_11=TAB_GLOBAL_COMPO[1097];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Annuler_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Insert_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Delete_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Update_Employés_Liste_des_employés0").disabled=true;
return TAB_COMPO_PPTES[1082].NewCle;
}

function Validate_Employés_Liste_des_employés0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1082];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1082].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Employés_Liste_des_employés0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Employés_Liste_des_employés0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1082].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1086];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1087];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1088];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1089];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1090];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1091];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1092];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1093];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[1094];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[1095];
 Esclave_9.ActiverComposant(false);
 var Esclave_10=TAB_GLOBAL_COMPO[1096];
 Esclave_10.ActiverComposant(false);
 var Esclave_11=TAB_GLOBAL_COMPO[1097];
 Esclave_11.ActiverComposant(false);
top.document.getElementById("Validate_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Annuler_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Insert_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Delete_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Update_Employés_Liste_des_employés0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1082].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Employés_0.Refresh();
 }
 TAB_COMPO_PPTES[1082].Action_en_cours = null;
 return NewCle;
}

function Annuler_Employés_Liste_des_employés0()
{
 TAB_COMPO_PPTES[1082].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1082].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1086];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1087];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1088];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1089];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1090];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1091];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1092];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1093];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[1094];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[1095];
 Esclave_9.ActiverComposant(false);
 var Esclave_10=TAB_GLOBAL_COMPO[1096];
 Esclave_10.ActiverComposant(false);
 var Esclave_11=TAB_GLOBAL_COMPO[1097];
 Esclave_11.ActiverComposant(false);
top.document.getElementById("Validate_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Annuler_Employés_Liste_des_employés0").disabled=true;
top.document.getElementById("Insert_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Delete_Employés_Liste_des_employés0").disabled=false;
top.document.getElementById("Update_Employés_Liste_des_employés0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Équipes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Équipes_0;
function Retour_Équipes()
{
 if (Filtre_Dep_Équipes_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Équipes_0.FctFermetureOnglet();
 }
}
function Gerer_Équipes(IdFiltreOnglet)
{
/* On désactive les autres filtres */
if (Filtre_Dep_Équipes_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Équipes_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Équipes");
}

function OuvrirOnglet_Équipes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Équipes");
}

function Insert_Équipes_Liste_des_équipes0()
{
 TAB_COMPO_PPTES[1130].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1130].NewCle = getNewCle("equipe");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1130].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1132];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Annuler_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Insert_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Delete_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Update_Équipes_Liste_des_équipes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1130];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1130].NewCle;
}

function Delete_Équipes_Liste_des_équipes0()
{
 if (TAB_GLOBAL_COMPO[1130].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1130];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1130].Action_en_cours = DELETE;
         User_Delete_Équipes_Liste_des_équipes0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Équipes_0.OnClose(true);
 }
}

function Update_Équipes_Liste_des_équipes0()
{
 if (TAB_GLOBAL_COMPO[1130].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1130].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1130].NewCle = TAB_GLOBAL_COMPO[1130].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1130].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1132];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Annuler_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Insert_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Delete_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Update_Équipes_Liste_des_équipes0").disabled=true;
return TAB_COMPO_PPTES[1130].NewCle;
}

function Validate_Équipes_Liste_des_équipes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1130];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1130].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Équipes_Liste_des_équipes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Équipes_Liste_des_équipes0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1130].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1132];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Annuler_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Insert_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Delete_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Update_Équipes_Liste_des_équipes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1130].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Équipes_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1130].Action_en_cours = null;
 return NewCle;
}

function Annuler_Équipes_Liste_des_équipes0()
{
 TAB_COMPO_PPTES[1130].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1130].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1132];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Annuler_Équipes_Liste_des_équipes0").disabled=true;
top.document.getElementById("Insert_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Delete_Équipes_Liste_des_équipes0").disabled=false;
top.document.getElementById("Update_Équipes_Liste_des_équipes0").disabled=false;
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1109].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1109].NewCle = getNewCle("groupetable");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1109].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1112];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1113];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1109];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1109].NewCle;
}

function Delete_Groupe_de_tables_Liste_des_groupes_de_tables0()
{
 if (TAB_GLOBAL_COMPO[1109].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1109];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1109].Action_en_cours = DELETE;
         User_Delete_Groupe_de_tables_Liste_des_groupes_de_tables0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Groupe_de_tables_0.OnClose(true);
 }
}

function Update_Groupe_de_tables_Liste_des_groupes_de_tables0()
{
 if (TAB_GLOBAL_COMPO[1109].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1109].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1109].NewCle = TAB_GLOBAL_COMPO[1109].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1109].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1112];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1113];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
return TAB_COMPO_PPTES[1109].NewCle;
}

function Validate_Groupe_de_tables_Liste_des_groupes_de_tables0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1109];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1109].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1109].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1112];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1113];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=true;
top.document.getElementById("Insert_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Delete_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
top.document.getElementById("Update_Groupe_de_tables_Liste_des_groupes_de_tables0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1109].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Groupe_de_tables_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1109].Action_en_cours = null;
 return NewCle;
}

function Annuler_Groupe_de_tables_Liste_des_groupes_de_tables0()
{
 TAB_COMPO_PPTES[1109].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1109].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1112];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1113];
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
 TAB_COMPO_PPTES[1015].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1015].NewCle = getNewCle("groupecanton");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1015].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1018];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1022];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1015];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1015].NewCle;
}

function Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0()
{
 if (TAB_GLOBAL_COMPO[1015].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1015];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1015].Action_en_cours = DELETE;
         User_Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0()
{
 if (TAB_GLOBAL_COMPO[1015].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1015].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1015].NewCle = TAB_GLOBAL_COMPO[1015].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1015].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1018];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1022];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
return TAB_COMPO_PPTES[1015].NewCle;
}

function Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1015];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1015].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1015].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1018];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1022];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1015].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1015].Action_en_cours = null;
 return NewCle;
}

function Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0()
{
 TAB_COMPO_PPTES[1015].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1015].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1018];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1022];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Annuler_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=true;
top.document.getElementById("Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
top.document.getElementById("Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Modèles d'impressions
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Modèles_d_impressions()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Modèles_d_impressions");
}

function Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0()
{
 TAB_COMPO_PPTES[1241].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1241].NewCle = getNewCle("impression");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1241].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1244];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1245];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1246];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1247];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1248];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1249];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1250];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1241];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1241].NewCle;
}

function Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1241].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1241];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1241].Action_en_cours = DELETE;
         User_Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1241].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1241].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1241].NewCle = TAB_GLOBAL_COMPO[1241].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1241].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1244];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1245];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1246];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1247];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1248];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1249];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1250];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
return TAB_COMPO_PPTES[1241].NewCle;
}

function Validate_Modèles_d_impressions_Liste_des_modèles_d_impressions0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1241];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1241].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1241].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1244];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1245];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1246];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1247];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1248];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1249];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1250];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1241].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1241].Action_en_cours = null;
 return NewCle;
}

function Annuler_Modèles_d_impressions_Liste_des_modèles_d_impressions0()
{
 TAB_COMPO_PPTES[1241].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1241].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1244];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1245];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1246];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1247];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1248];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1249];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1250];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;
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

function Insert_Impressions_Liste_des_modèles_d_impressions0()
{
 TAB_COMPO_PPTES[1251].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1251].NewCle = getNewCle("table_impression");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1251].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1254];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1255];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1256];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1257];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1258];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1259];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1260];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1261];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Insert_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Delete_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Update_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1251];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1251].NewCle;
}

function Delete_Impressions_Liste_des_modèles_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1251].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1251];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1251].Action_en_cours = DELETE;
         User_Delete_Impressions_Liste_des_modèles_d_impressions0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Impressions_Liste_des_modèles_d_impressions0()
{
 if (TAB_GLOBAL_COMPO[1251].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1251].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1251].NewCle = TAB_GLOBAL_COMPO[1251].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1251].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1254];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1255];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1256];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1257];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1258];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1259];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1260];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1261];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Annuler_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Insert_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Delete_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Update_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
return TAB_COMPO_PPTES[1251].NewCle;
}

function Validate_Impressions_Liste_des_modèles_d_impressions0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1251];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1251].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Impressions_Liste_des_modèles_d_impressions0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Impressions_Liste_des_modèles_d_impressions0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1251].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1254];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1255];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1256];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1257];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1258];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1259];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1260];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1261];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Insert_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Delete_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Update_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1251].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1251].Action_en_cours = null;
 return NewCle;
}

function Annuler_Impressions_Liste_des_modèles_d_impressions0()
{
 TAB_COMPO_PPTES[1251].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1251].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1254];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1255];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1256];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1257];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1258];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1259];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1260];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1261];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Annuler_Impressions_Liste_des_modèles_d_impressions0").disabled=true;
top.document.getElementById("Insert_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Delete_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
top.document.getElementById("Update_Impressions_Liste_des_modèles_d_impressions0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Modèles
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Modèles()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Modèles");
}

function Insert_Modèles_Liste_des_modèles0()
{
 TAB_COMPO_PPTES[1229].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1229].NewCle = getNewCle("modele");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1229].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1231];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1232];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Annuler_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Insert_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Delete_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Update_Modèles_Liste_des_modèles0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1229];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1229].NewCle;
}

function Delete_Modèles_Liste_des_modèles0()
{
 if (TAB_GLOBAL_COMPO[1229].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1229];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1229].Action_en_cours = DELETE;
         User_Delete_Modèles_Liste_des_modèles0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Modèles_Liste_des_modèles0()
{
 if (TAB_GLOBAL_COMPO[1229].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1229].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1229].NewCle = TAB_GLOBAL_COMPO[1229].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1229].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1231];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1232];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Annuler_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Insert_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Delete_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Update_Modèles_Liste_des_modèles0").disabled=true;
return TAB_COMPO_PPTES[1229].NewCle;
}

function Validate_Modèles_Liste_des_modèles0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1229];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1229].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Modèles_Liste_des_modèles0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Modèles_Liste_des_modèles0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1229].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1231];
 Esclave_0.ActiverComposant(false);
Annuler_Modèles_Lignes_du_modèle_2();
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1232];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Annuler_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Insert_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Delete_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Update_Modèles_Liste_des_modèles0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1229].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1229].Action_en_cours = null;
 return NewCle;
}

function Annuler_Modèles_Liste_des_modèles0()
{
 TAB_COMPO_PPTES[1229].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1229].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1231];
 Esclave_0.ActiverComposant(false);
Annuler_Modèles_Lignes_du_modèle_2();
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1232];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Annuler_Modèles_Liste_des_modèles0").disabled=true;
top.document.getElementById("Insert_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Delete_Modèles_Liste_des_modèles0").disabled=false;
top.document.getElementById("Update_Modèles_Liste_des_modèles0").disabled=false;
}

function Insert_Modèles_Lignes_du_modèle_2()
{
 if (TAB_COMPO_PPTES[1229].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Modèles_Liste_des_modèles0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Modèles_Liste_des_modèles0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Modèles_Lignes_du_modèle_2();
                }
                 return;
         }
 TAB_COMPO_PPTES[1232].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1232].NewCle = getNewCle("lignemodele");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1232].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1237];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1238];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1239];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1240];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1232];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1232].NewCle;
}

function Delete_Modèles_Lignes_du_modèle_2()
{
 if (TAB_GLOBAL_COMPO[1232].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1232];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1232].Action_en_cours = DELETE;
         User_Delete_Modèles_Lignes_du_modèle_2(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Modèles_Lignes_du_modèle_2()
{
 if (TAB_GLOBAL_COMPO[1232].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1232].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1232].NewCle = TAB_GLOBAL_COMPO[1232].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1232].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1237];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1238];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1239];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1240];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=true;
return TAB_COMPO_PPTES[1232].NewCle;
}

function Validate_Modèles_Lignes_du_modèle_2(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1232];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1232].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Modèles_Lignes_du_modèle_2(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Modèles_Lignes_du_modèle_2(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1232].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1237];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1238];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1239];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1240];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1232].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1232].Action_en_cours = null;
 return NewCle;
}

function Annuler_Modèles_Lignes_du_modèle_2()
{
 TAB_COMPO_PPTES[1232].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1232].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1237];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1238];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1239];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1240];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").disabled=true;
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").disabled=false;
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Mode de réglements
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Mode_de_réglements()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Mode_de_réglements");
}

function Insert_Mode_de_réglements_Liste_des_modes_de_réglement0()
{
 TAB_COMPO_PPTES[984].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[984].NewCle = getNewCle("modereglement");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[984].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[988];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[989];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[990];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[991];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[992];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[993];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Annuler_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Insert_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Delete_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Update_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[984];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[984].NewCle;
}

function Delete_Mode_de_réglements_Liste_des_modes_de_réglement0()
{
 if (TAB_GLOBAL_COMPO[984].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[984];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[984].Action_en_cours = DELETE;
         User_Delete_Mode_de_réglements_Liste_des_modes_de_réglement0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Mode_de_réglements_Liste_des_modes_de_réglement0()
{
 if (TAB_GLOBAL_COMPO[984].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[984].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[984].NewCle = TAB_GLOBAL_COMPO[984].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[984].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[988];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[989];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[990];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[991];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[992];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[993];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Annuler_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Insert_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Delete_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Update_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
return TAB_COMPO_PPTES[984].NewCle;
}

function Validate_Mode_de_réglements_Liste_des_modes_de_réglement0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[984];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[984].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Mode_de_réglements_Liste_des_modes_de_réglement0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Mode_de_réglements_Liste_des_modes_de_réglement0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[984].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[988];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[989];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[990];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[991];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[992];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[993];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Annuler_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Insert_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Delete_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Update_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[984].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[984].Action_en_cours = null;
 return NewCle;
}

function Annuler_Mode_de_réglements_Liste_des_modes_de_réglement0()
{
 TAB_COMPO_PPTES[984].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[984].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[988];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[989];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[990];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[991];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[992];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[993];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Annuler_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=true;
top.document.getElementById("Insert_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Delete_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
top.document.getElementById("Update_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Modes de répartition
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Modes_de_répartition()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Modes_de_répartition");
}

function Insert_Modes_de_répartition_Liste_des_modes_de_répartition0()
{
 TAB_COMPO_PPTES[994].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[994].NewCle = getNewCle("moderepartition");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[994].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1001];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1002];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Annuler_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Insert_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Delete_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Update_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[994];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[994].NewCle;
}

function Delete_Modes_de_répartition_Liste_des_modes_de_répartition0()
{
 if (TAB_GLOBAL_COMPO[994].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[994];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[994].Action_en_cours = DELETE;
         User_Delete_Modes_de_répartition_Liste_des_modes_de_répartition0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Modes_de_répartition_Liste_des_modes_de_répartition0()
{
 if (TAB_GLOBAL_COMPO[994].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[994].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[994].NewCle = TAB_GLOBAL_COMPO[994].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[994].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1001];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1002];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Annuler_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Insert_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Delete_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Update_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
return TAB_COMPO_PPTES[994].NewCle;
}

function Validate_Modes_de_répartition_Liste_des_modes_de_répartition0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[994];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[994].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Modes_de_répartition_Liste_des_modes_de_répartition0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Modes_de_répartition_Liste_des_modes_de_répartition0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[994].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1001];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1002];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Annuler_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Insert_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Delete_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Update_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[994].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[994].Action_en_cours = null;
 return NewCle;
}

function Annuler_Modes_de_répartition_Liste_des_modes_de_répartition0()
{
 TAB_COMPO_PPTES[994].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[994].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[998];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[999];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1000];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1001];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1002];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Annuler_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=true;
top.document.getElementById("Insert_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Delete_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
top.document.getElementById("Update_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;
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

function Insert_Natures_de_personne_Liste_des_états_de_personne0()
{
 TAB_COMPO_PPTES[1038].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1038].NewCle = getNewCle("naturepersonne");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1038].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1043];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1044];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1045];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1046];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1047];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1048];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Update_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1038];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1038].NewCle;
}

function Delete_Natures_de_personne_Liste_des_états_de_personne0()
{
 if (TAB_GLOBAL_COMPO[1038].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1038];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1038].Action_en_cours = DELETE;
         User_Delete_Natures_de_personne_Liste_des_états_de_personne0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Natures_de_personne_Liste_des_états_de_personne0()
{
 if (TAB_GLOBAL_COMPO[1038].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1038].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1038].NewCle = TAB_GLOBAL_COMPO[1038].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1038].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1043];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1044];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1045];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1046];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1047];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1048];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Update_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
return TAB_COMPO_PPTES[1038].NewCle;
}

function Validate_Natures_de_personne_Liste_des_états_de_personne0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1038];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1038].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Natures_de_personne_Liste_des_états_de_personne0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Natures_de_personne_Liste_des_états_de_personne0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1038].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1043];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1044];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1045];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1046];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1047];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1048];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Update_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1038].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1038].Action_en_cours = null;
 return NewCle;
}

function Annuler_Natures_de_personne_Liste_des_états_de_personne0()
{
 TAB_COMPO_PPTES[1038].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1038].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1043];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1044];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1045];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1046];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1047];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1048];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Annuler_Natures_de_personne_Liste_des_états_de_personne0").disabled=true;
top.document.getElementById("Insert_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
top.document.getElementById("Update_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Périodes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Périodes_0;
function Retour_Périodes()
{
 if (Filtre_Dep_Périodes_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Périodes_0.FctFermetureOnglet();
 }
}
function Gerer_Périodes(IdFiltreOnglet)
{
/* On désactive les autres filtres */
if (Filtre_Dep_Périodes_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Périodes_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Périodes");
}

function OuvrirOnglet_Périodes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Périodes");
}

function Insert_Périodes_Liste_des_périodes0()
{
 TAB_COMPO_PPTES[1217].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1217].NewCle = getNewCle("periode");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1217].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1221];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1222];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Annuler_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Insert_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Delete_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Update_Périodes_Liste_des_périodes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1217];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1217].NewCle;
}

function Delete_Périodes_Liste_des_périodes0()
{
 if (TAB_GLOBAL_COMPO[1217].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1217];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1217].Action_en_cours = DELETE;
         User_Delete_Périodes_Liste_des_périodes0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Périodes_0.OnClose(true);
 }
}

function Update_Périodes_Liste_des_périodes0()
{
 if (TAB_GLOBAL_COMPO[1217].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1217].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1217].NewCle = TAB_GLOBAL_COMPO[1217].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1217].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1221];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1222];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Annuler_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Insert_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Delete_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Update_Périodes_Liste_des_périodes0").disabled=true;
return TAB_COMPO_PPTES[1217].NewCle;
}

function Validate_Périodes_Liste_des_périodes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1217];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1217].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Périodes_Liste_des_périodes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Périodes_Liste_des_périodes0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1217].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1221];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1222];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Annuler_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Insert_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Delete_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Update_Périodes_Liste_des_périodes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1217].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Périodes_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1217].Action_en_cours = null;
 return NewCle;
}

function Annuler_Périodes_Liste_des_périodes0()
{
 TAB_COMPO_PPTES[1217].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1217].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1221];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1222];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Annuler_Périodes_Liste_des_périodes0").disabled=true;
top.document.getElementById("Insert_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Delete_Périodes_Liste_des_périodes0").disabled=false;
top.document.getElementById("Update_Périodes_Liste_des_périodes0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Préfixes
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Préfixes()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Préfixes");
}

function Insert_Préfixes_Liste_des_préfixes0()
{
 TAB_COMPO_PPTES[1226].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1226].NewCle = getNewCle("prefixe");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1226].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1228];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Annuler_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Insert_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Delete_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Update_Préfixes_Liste_des_préfixes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1226];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1226].NewCle;
}

function Delete_Préfixes_Liste_des_préfixes0()
{
 if (TAB_GLOBAL_COMPO[1226].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1226];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1226].Action_en_cours = DELETE;
         User_Delete_Préfixes_Liste_des_préfixes0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Préfixes_Liste_des_préfixes0()
{
 if (TAB_GLOBAL_COMPO[1226].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1226].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1226].NewCle = TAB_GLOBAL_COMPO[1226].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1226].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1228];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Annuler_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Insert_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Delete_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Update_Préfixes_Liste_des_préfixes0").disabled=true;
return TAB_COMPO_PPTES[1226].NewCle;
}

function Validate_Préfixes_Liste_des_préfixes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1226];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1226].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Préfixes_Liste_des_préfixes0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Préfixes_Liste_des_préfixes0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1226].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1228];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Annuler_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Insert_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Delete_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Update_Préfixes_Liste_des_préfixes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1226].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1226].Action_en_cours = null;
 return NewCle;
}

function Annuler_Préfixes_Liste_des_préfixes0()
{
 TAB_COMPO_PPTES[1226].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1226].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1228];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Annuler_Préfixes_Liste_des_préfixes0").disabled=true;
top.document.getElementById("Insert_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Delete_Préfixes_Liste_des_préfixes0").disabled=false;
top.document.getElementById("Update_Préfixes_Liste_des_préfixes0").disabled=false;
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1180].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1180].NewCle = getNewCle("produit");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1180].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1183];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1184];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1185];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1186];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1187];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1188];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
 var Esclave_6=TAB_GLOBAL_COMPO[1189];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1197];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1180];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[1186].my_CompoXUL.value=true;
TAB_GLOBAL_COMPO[1186].my_CompoXUL.checked=true;

return TAB_COMPO_PPTES[1180].NewCle;
}

function Delete_Produits_Liste_des_produits0()
{
 if (TAB_GLOBAL_COMPO[1180].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1180];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1180].Action_en_cours = DELETE;
         User_Delete_Produits_Liste_des_produits0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Produits_0.OnClose(true);
        Filtre_Dep_Produits_1.OnClose(true);
 }
}

function Update_Produits_Liste_des_produits0()
{
 if (TAB_GLOBAL_COMPO[1180].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1180].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1180].NewCle = TAB_GLOBAL_COMPO[1180].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1180].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1183];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1184];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1185];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1186];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1187];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1188];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
 var Esclave_6=TAB_GLOBAL_COMPO[1189];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1197];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=true;
return TAB_COMPO_PPTES[1180].NewCle;
}

function Validate_Produits_Liste_des_produits0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1180];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1180].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1180].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1183];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1184];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1185];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1186];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1187];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1188];
 Esclave_5.ActiverComposant(false);
Annuler_Produits_Prix_7();
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
 var Esclave_6=TAB_GLOBAL_COMPO[1189];
 Esclave_6.ActiverComposant(false);
Annuler_Produits_Comptes_généraux_11();
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1197];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1180].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Produits_0.OnClose(false);
 Filtre_Dep_Produits_1.OnClose(false);
 }
 TAB_COMPO_PPTES[1180].Action_en_cours = null;
 return NewCle;
}

function Annuler_Produits_Liste_des_produits0()
{
 TAB_COMPO_PPTES[1180].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1180].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1183];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1184];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1185];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1186];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1187];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1188];
 Esclave_5.ActiverComposant(false);
Annuler_Produits_Prix_7();
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
 var Esclave_6=TAB_GLOBAL_COMPO[1189];
 Esclave_6.ActiverComposant(false);
Annuler_Produits_Comptes_généraux_11();
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1197];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Annuler_Produits_Liste_des_produits0").disabled=true;
top.document.getElementById("Insert_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Delete_Produits_Liste_des_produits0").disabled=false;
top.document.getElementById("Update_Produits_Liste_des_produits0").disabled=false;
}

function Insert_Produits_Prix_7()
{
 if (TAB_COMPO_PPTES[1180].Action_en_cours == INSERT)
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
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Produits_Prix_7();
                }
                 return;
         }
 TAB_COMPO_PPTES[1189].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1189].NewCle = getNewCle("prix");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1189].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1194];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1195];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1196];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=false;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=false;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1189];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[1196].my_CompoXUL.selectedIndex=1;

return TAB_COMPO_PPTES[1189].NewCle;
}

function Delete_Produits_Prix_7()
{
 if (TAB_GLOBAL_COMPO[1189].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1189];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1189].Action_en_cours = DELETE;
         User_Delete_Produits_Prix_7(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Produits_Prix_7()
{
 if (TAB_GLOBAL_COMPO[1189].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1189].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1189].NewCle = TAB_GLOBAL_COMPO[1189].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1189].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1194];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1195];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1196];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Prix_7").disabled=false;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=false;
top.document.getElementById("Insert_Produits_Prix_7").disabled=true;
top.document.getElementById("Delete_Produits_Prix_7").disabled=true;
top.document.getElementById("Update_Produits_Prix_7").disabled=true;
return TAB_COMPO_PPTES[1189].NewCle;
}

function Validate_Produits_Prix_7(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1189];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1189].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1189].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1194];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1195];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1196];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1189].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1189].Action_en_cours = null;
 return NewCle;
}

function Annuler_Produits_Prix_7()
{
 TAB_COMPO_PPTES[1189].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1189].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1194];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1195];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1196];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Prix_7").disabled=true;
top.document.getElementById("Annuler_Produits_Prix_7").disabled=true;
top.document.getElementById("Insert_Produits_Prix_7").disabled=false;
top.document.getElementById("Delete_Produits_Prix_7").disabled=false;
top.document.getElementById("Update_Produits_Prix_7").disabled=false;
}

function Insert_Produits_Comptes_généraux_11()
{
 if (TAB_COMPO_PPTES[1180].Action_en_cours == INSERT)
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
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Produits_Comptes_généraux_11();
                }
                 return;
         }
 TAB_COMPO_PPTES[1197].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1197].NewCle = getNewCle("compteproduit");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1197].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1200];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1201];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1197];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1197].NewCle;
}

function Delete_Produits_Comptes_généraux_11()
{
 if (TAB_GLOBAL_COMPO[1197].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1197];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1197].Action_en_cours = DELETE;
         User_Delete_Produits_Comptes_généraux_11(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Produits_Comptes_généraux_11()
{
 if (TAB_GLOBAL_COMPO[1197].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1197].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1197].NewCle = TAB_GLOBAL_COMPO[1197].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1197].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1200];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1201];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=true;
return TAB_COMPO_PPTES[1197].NewCle;
}

function Validate_Produits_Comptes_généraux_11(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1197];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1197].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Produits_Comptes_généraux_11(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Produits_Comptes_généraux_11(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1197].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1200];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1201];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1197].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1197].Action_en_cours = null;
 return NewCle;
}

function Annuler_Produits_Comptes_généraux_11()
{
 TAB_COMPO_PPTES[1197].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1197].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1200];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1201];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Annuler_Produits_Comptes_généraux_11").disabled=true;
top.document.getElementById("Insert_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Delete_Produits_Comptes_généraux_11").disabled=false;
top.document.getElementById("Update_Produits_Comptes_généraux_11").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Responsabilités
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Responsabilités()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Responsabilités");
}

function Insert_Responsabilités_Responsabilités0()
{
 TAB_COMPO_PPTES[1165].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1165].NewCle = getNewCle("responsabilite");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1165].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1169];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1170];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1171];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Annuler_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Insert_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Delete_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Update_Responsabilités_Responsabilités0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1165];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1165].NewCle;
}

function Delete_Responsabilités_Responsabilités0()
{
 if (TAB_GLOBAL_COMPO[1165].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1165];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1165].Action_en_cours = DELETE;
         User_Delete_Responsabilités_Responsabilités0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Responsabilités_Responsabilités0()
{
 if (TAB_GLOBAL_COMPO[1165].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1165].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1165].NewCle = TAB_GLOBAL_COMPO[1165].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1165].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1169];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1170];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1171];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Annuler_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Insert_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Delete_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Update_Responsabilités_Responsabilités0").disabled=true;
return TAB_COMPO_PPTES[1165].NewCle;
}

function Validate_Responsabilités_Responsabilités0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1165];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1165].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Responsabilités_Responsabilités0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Responsabilités_Responsabilités0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1165].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1169];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1170];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1171];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Annuler_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Insert_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Delete_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Update_Responsabilités_Responsabilités0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1165].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1165].Action_en_cours = null;
 return NewCle;
}

function Annuler_Responsabilités_Responsabilités0()
{
 TAB_COMPO_PPTES[1165].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1165].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1169];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1170];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1171];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Annuler_Responsabilités_Responsabilités0").disabled=true;
top.document.getElementById("Insert_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Delete_Responsabilités_Responsabilités0").disabled=false;
top.document.getElementById("Update_Responsabilités_Responsabilités0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Séquences
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Séquences_0;
function Retour_Séquences()
{
 if (Filtre_Dep_Séquences_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Séquences_0.FctFermetureOnglet();
 }
}
function Gerer_Séquences(IdFiltreOnglet)
{
/* On désactive les autres filtres */
if (Filtre_Dep_Séquences_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Séquences_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Séquences");
}

function OuvrirOnglet_Séquences()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Séquences");
}

function Insert_Séquences_Liste_des_séquences0()
{
 TAB_COMPO_PPTES[1064].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1064].NewCle = getNewCle("sequence");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1064].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1068];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1069];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1070];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1071];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Annuler_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Insert_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Delete_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Update_Séquences_Liste_des_séquences0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1064];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1064].NewCle;
}

function Delete_Séquences_Liste_des_séquences0()
{
 if (TAB_GLOBAL_COMPO[1064].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1064];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1064].Action_en_cours = DELETE;
         User_Delete_Séquences_Liste_des_séquences0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Séquences_0.OnClose(true);
 }
}

function Update_Séquences_Liste_des_séquences0()
{
 if (TAB_GLOBAL_COMPO[1064].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1064].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1064].NewCle = TAB_GLOBAL_COMPO[1064].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1064].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1068];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1069];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1070];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1071];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Annuler_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Insert_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Delete_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Update_Séquences_Liste_des_séquences0").disabled=true;
return TAB_COMPO_PPTES[1064].NewCle;
}

function Validate_Séquences_Liste_des_séquences0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1064];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1064].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Séquences_Liste_des_séquences0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Séquences_Liste_des_séquences0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1064].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1068];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1069];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1070];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1071];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Annuler_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Insert_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Delete_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Update_Séquences_Liste_des_séquences0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1064].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Séquences_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1064].Action_en_cours = null;
 return NewCle;
}

function Annuler_Séquences_Liste_des_séquences0()
{
 TAB_COMPO_PPTES[1064].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1064].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1068];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1069];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1070];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1071];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Annuler_Séquences_Liste_des_séquences0").disabled=true;
top.document.getElementById("Insert_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Delete_Séquences_Liste_des_séquences0").disabled=false;
top.document.getElementById("Update_Séquences_Liste_des_séquences0").disabled=false;
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
/* Pour les filtrage fort on ne doit pas être en mode insertion */
if(TAB_COMPO_PPTES[1052].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Sociétés_Liste_des_sociétés0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Sociétés_Liste_des_sociétés0();
                if (CleValide==-1)
                {
                        alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                        return;
                }
        }
        else
                 return;
}
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1072].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1072].NewCle = getNewCle("service");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1072].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1076];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1077];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1078];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1072];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1072].NewCle;
}

function Delete_Services_Liste_des_services0()
{
 if (TAB_GLOBAL_COMPO[1072].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1072];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1072].Action_en_cours = DELETE;
         User_Delete_Services_Liste_des_services0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Services_0.Refresh();
 }
}

function Update_Services_Liste_des_services0()
{
 if (TAB_GLOBAL_COMPO[1072].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1072].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1072].NewCle = TAB_GLOBAL_COMPO[1072].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1072].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1076];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1077];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1078];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=true;
return TAB_COMPO_PPTES[1072].NewCle;
}

function Validate_Services_Liste_des_services0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1072];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1072].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1072].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1076];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1077];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1078];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1072].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Services_0.Refresh();
 }
 TAB_COMPO_PPTES[1072].Action_en_cours = null;
 return NewCle;
}

function Annuler_Services_Liste_des_services0()
{
 TAB_COMPO_PPTES[1072].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1072].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1076];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1077];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1078];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Annuler_Services_Liste_des_services0").disabled=true;
top.document.getElementById("Insert_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Delete_Services_Liste_des_services0").disabled=false;
top.document.getElementById("Update_Services_Liste_des_services0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Sociétés
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Sociétés()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Sociétés");
}

function Insert_Sociétés_Liste_des_sociétés0()
{
 TAB_COMPO_PPTES[1052].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1052].NewCle = getNewCle("societe");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1052].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1055];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1056];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1057];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1058];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1059];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1060];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1061];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Annuler_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Insert_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Delete_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Update_Sociétés_Liste_des_sociétés0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1052];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1052].NewCle;
}

function Delete_Sociétés_Liste_des_sociétés0()
{
 if (TAB_GLOBAL_COMPO[1052].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1052];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1052].Action_en_cours = DELETE;
         User_Delete_Sociétés_Liste_des_sociétés0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Sociétés_Liste_des_sociétés0()
{
 if (TAB_GLOBAL_COMPO[1052].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1052].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1052].NewCle = TAB_GLOBAL_COMPO[1052].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1052].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1055];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1056];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1057];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1058];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1059];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1060];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1061];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Annuler_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Insert_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Delete_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Update_Sociétés_Liste_des_sociétés0").disabled=true;
return TAB_COMPO_PPTES[1052].NewCle;
}

function Validate_Sociétés_Liste_des_sociétés0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1052];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1052].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Sociétés_Liste_des_sociétés0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Sociétés_Liste_des_sociétés0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1052].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1055];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1056];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1057];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1058];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1059];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1060];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1061];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Annuler_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Insert_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Delete_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Update_Sociétés_Liste_des_sociétés0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1052].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1052].Action_en_cours = null;
 return NewCle;
}

function Annuler_Sociétés_Liste_des_sociétés0()
{
 TAB_COMPO_PPTES[1052].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1052].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1055];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1056];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1057];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1058];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1059];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1060];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1061];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Annuler_Sociétés_Liste_des_sociétés0").disabled=true;
top.document.getElementById("Insert_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Delete_Sociétés_Liste_des_sociétés0").disabled=false;
top.document.getElementById("Update_Sociétés_Liste_des_sociétés0").disabled=false;
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1172].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1172].NewCle = getNewCle("tva");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1172].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1176];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1177];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1178];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1179];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1172];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1172].NewCle;
}

function Delete_TVA_Liste_des_T_V_A_0()
{
 if (TAB_GLOBAL_COMPO[1172].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1172];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1172].Action_en_cours = DELETE;
         User_Delete_TVA_Liste_des_T_V_A_0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_TVA_0.OnClose(true);
 }
}

function Update_TVA_Liste_des_T_V_A_0()
{
 if (TAB_GLOBAL_COMPO[1172].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1172].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1172].NewCle = TAB_GLOBAL_COMPO[1172].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1172].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1176];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1177];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1178];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1179];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=true;
return TAB_COMPO_PPTES[1172].NewCle;
}

function Validate_TVA_Liste_des_T_V_A_0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1172];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1172].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1172].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1176];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1177];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1178];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1179];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Annuler_TVA_Liste_des_T_V_A_0").disabled=true;
top.document.getElementById("Insert_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Delete_TVA_Liste_des_T_V_A_0").disabled=false;
top.document.getElementById("Update_TVA_Liste_des_T_V_A_0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1172].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_TVA_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1172].Action_en_cours = null;
 return NewCle;
}

function Annuler_TVA_Liste_des_T_V_A_0()
{
 TAB_COMPO_PPTES[1172].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1172].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1176];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1177];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1178];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1179];
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
 TAB_COMPO_PPTES[1032].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1032].NewCle = getNewCle("typeadresse");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1032].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1034];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1032];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1032].NewCle;
}

function Delete_Types_d_adresses_Liste_des_types_d_adresses0()
{
 if (TAB_GLOBAL_COMPO[1032].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1032];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1032].Action_en_cours = DELETE;
         User_Delete_Types_d_adresses_Liste_des_types_d_adresses0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_d_adresses_Liste_des_types_d_adresses0()
{
 if (TAB_GLOBAL_COMPO[1032].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1032].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1032].NewCle = TAB_GLOBAL_COMPO[1032].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1032].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1034];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
return TAB_COMPO_PPTES[1032].NewCle;
}

function Validate_Types_d_adresses_Liste_des_types_d_adresses0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1032];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1032].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1032].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1034];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Annuler_Types_d_adresses_Liste_des_types_d_adresses0").disabled=true;
top.document.getElementById("Insert_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Delete_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
top.document.getElementById("Update_Types_d_adresses_Liste_des_types_d_adresses0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1032].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1032].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_d_adresses_Liste_des_types_d_adresses0()
{
 TAB_COMPO_PPTES[1032].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1032].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1034];
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
 TAB_COMPO_PPTES[1007].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1007].NewCle = getNewCle("typeattribut");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1007].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1007];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1007].NewCle;
}

function Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0()
{
 if (TAB_GLOBAL_COMPO[1007].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1007];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1007].Action_en_cours = DELETE;
         User_Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0()
{
 if (TAB_GLOBAL_COMPO[1007].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1007].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1007].NewCle = TAB_GLOBAL_COMPO[1007].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1007].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=false;
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
return TAB_COMPO_PPTES[1007].NewCle;
}

function Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1007];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1007].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1007].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(false);
Annuler_Types_d_attribut_Catégories_2();
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1007].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1007].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0()
{
 TAB_COMPO_PPTES[1007].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1007].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1010];
 Esclave_0.ActiverComposant(false);
Annuler_Types_d_attribut_Catégories_2();
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=true;
 var Esclave_1=TAB_GLOBAL_COMPO[1011];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0").disabled=false;
}

function Insert_Types_d_attribut_Catégories_2()
{
 if (TAB_COMPO_PPTES[1007].Action_en_cours == INSERT)
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
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Types_d_attribut_Catégories_2();
                }
                 return;
         }
 TAB_COMPO_PPTES[1011].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1011].NewCle = getNewCle("categorie");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1011].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1013];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1014];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1011];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1011].NewCle;
}

function Delete_Types_d_attribut_Catégories_2()
{
 if (TAB_GLOBAL_COMPO[1011].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1011];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1011].Action_en_cours = DELETE;
         User_Delete_Types_d_attribut_Catégories_2(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_d_attribut_Catégories_2()
{
 if (TAB_GLOBAL_COMPO[1011].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1011].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1011].NewCle = TAB_GLOBAL_COMPO[1011].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1011].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1013];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1014];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=true;
return TAB_COMPO_PPTES[1011].NewCle;
}

function Validate_Types_d_attribut_Catégories_2(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1011];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1011].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_d_attribut_Catégories_2(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_d_attribut_Catégories_2(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1011].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1013];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1014];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1011].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1011].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_d_attribut_Catégories_2()
{
 TAB_COMPO_PPTES[1011].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1011].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1013];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1014];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").disabled=true;
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").disabled=false;
top.document.getElementById("Update_Types_d_attribut_Catégories_2").disabled=false;
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
 TAB_COMPO_PPTES[1151].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1151].NewCle = getNewCle("contacttype");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1151].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1154];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1155];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1156];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1157];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1158];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1151];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1151].NewCle;
}

function Delete_Types_de_contacts_Liste_des_types_de_contacts0()
{
 if (TAB_GLOBAL_COMPO[1151].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1151];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1151].Action_en_cours = DELETE;
         User_Delete_Types_de_contacts_Liste_des_types_de_contacts0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_contacts_Liste_des_types_de_contacts0()
{
 if (TAB_GLOBAL_COMPO[1151].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1151].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1151].NewCle = TAB_GLOBAL_COMPO[1151].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1151].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1154];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1155];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1156];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1157];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1158];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
return TAB_COMPO_PPTES[1151].NewCle;
}

function Validate_Types_de_contacts_Liste_des_types_de_contacts0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1151];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1151].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1151].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1154];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1155];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1156];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1157];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1158];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Annuler_Types_de_contacts_Liste_des_types_de_contacts0").disabled=true;
top.document.getElementById("Insert_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Delete_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
top.document.getElementById("Update_Types_de_contacts_Liste_des_types_de_contacts0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1151].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1151].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_contacts_Liste_des_types_de_contacts0()
{
 TAB_COMPO_PPTES[1151].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1151].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1154];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1155];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1156];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1157];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1158];
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
 TAB_COMPO_PPTES[1223].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1223].NewCle = getNewCle("typejournal");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1223].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1225];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1223];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1223].NewCle;
}

function Delete_Types_de_journaux_Liste_des_types_de_journaux0()
{
 if (TAB_GLOBAL_COMPO[1223].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1223];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1223].Action_en_cours = DELETE;
         User_Delete_Types_de_journaux_Liste_des_types_de_journaux0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_journaux_Liste_des_types_de_journaux0()
{
 if (TAB_GLOBAL_COMPO[1223].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1223].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1223].NewCle = TAB_GLOBAL_COMPO[1223].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1223].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1225];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
return TAB_COMPO_PPTES[1223].NewCle;
}

function Validate_Types_de_journaux_Liste_des_types_de_journaux0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1223];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1223].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1223].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1225];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Annuler_Types_de_journaux_Liste_des_types_de_journaux0").disabled=true;
top.document.getElementById("Insert_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Delete_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
top.document.getElementById("Update_Types_de_journaux_Liste_des_types_de_journaux0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1223].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1223].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_journaux_Liste_des_types_de_journaux0()
{
 TAB_COMPO_PPTES[1223].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1223].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1225];
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1024].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1024].NewCle = getNewCle("typelien");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1024].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1027];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1028];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1029];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1030];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1031];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1024];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1024].NewCle;
}

function Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0()
{
 if (TAB_GLOBAL_COMPO[1024].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1024];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1024].Action_en_cours = DELETE;
         User_Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Types_de_lien_0.OnClose(true);
 }
}

function Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0()
{
 if (TAB_GLOBAL_COMPO[1024].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1024].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1024].NewCle = TAB_GLOBAL_COMPO[1024].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1024].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1027];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1028];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1029];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1030];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1031];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
return TAB_COMPO_PPTES[1024].NewCle;
}

function Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1024];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1024].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1024].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1027];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1028];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1029];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1030];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1031];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=true;
top.document.getElementById("Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
top.document.getElementById("Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1024].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Types_de_lien_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1024].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_lien_Liste_des_types_de_lien_entre_personne0()
{
 TAB_COMPO_PPTES[1024].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1024].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1027];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1028];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1029];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1030];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1031];
 Esclave_4.ActiverComposant(false);
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
 TAB_COMPO_PPTES[1035].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1035].NewCle = getNewCle("typepersonne");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1035].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1037];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1035];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1035].NewCle;
}

function Delete_Types_de_personne_Liste_des_types_de_personne0()
{
 if (TAB_GLOBAL_COMPO[1035].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1035];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1035].Action_en_cours = DELETE;
         User_Delete_Types_de_personne_Liste_des_types_de_personne0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_personne_Liste_des_types_de_personne0()
{
 if (TAB_GLOBAL_COMPO[1035].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1035].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1035].NewCle = TAB_GLOBAL_COMPO[1035].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1035].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1037];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
return TAB_COMPO_PPTES[1035].NewCle;
}

function Validate_Types_de_personne_Liste_des_types_de_personne0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1035];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1035].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1035].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1037];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1035].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1035].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_personne_Liste_des_types_de_personne0()
{
 TAB_COMPO_PPTES[1035].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1035].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1037];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Annuler_Types_de_personne_Liste_des_types_de_personne0").disabled=true;
top.document.getElementById("Insert_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Delete_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
top.document.getElementById("Update_Types_de_personne_Liste_des_types_de_personne0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de sociétés
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Types_de_sociétés_0;
function Retour_Types_de_sociétés()
{
 if (Filtre_Dep_Types_de_sociétés_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Types_de_sociétés_0.FctFermetureOnglet();
 }
}
function Gerer_Types_de_sociétés(IdFiltreOnglet)
{
/* On désactive les autres filtres */
if (Filtre_Dep_Types_de_sociétés_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Types_de_sociétés_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_sociétés");
}

function OuvrirOnglet_Types_de_sociétés()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_sociétés");
}

function Insert_Types_de_sociétés_Liste_des_types_de_sociétés0()
{
 TAB_COMPO_PPTES[1049].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1049].NewCle = getNewCle("typesociete");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1049].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1051];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Annuler_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Insert_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Delete_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Update_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1049];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1049].NewCle;
}

function Delete_Types_de_sociétés_Liste_des_types_de_sociétés0()
{
 if (TAB_GLOBAL_COMPO[1049].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1049];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1049].Action_en_cours = DELETE;
         User_Delete_Types_de_sociétés_Liste_des_types_de_sociétés0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Types_de_sociétés_0.OnClose(true);
 }
}

function Update_Types_de_sociétés_Liste_des_types_de_sociétés0()
{
 if (TAB_GLOBAL_COMPO[1049].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1049].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1049].NewCle = TAB_GLOBAL_COMPO[1049].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1049].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1051];
 Esclave_0.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Annuler_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Insert_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Delete_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Update_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
return TAB_COMPO_PPTES[1049].NewCle;
}

function Validate_Types_de_sociétés_Liste_des_types_de_sociétés0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1049];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1049].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_sociétés_Liste_des_types_de_sociétés0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_sociétés_Liste_des_types_de_sociétés0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1049].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1051];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Annuler_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Insert_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Delete_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Update_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1049].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Types_de_sociétés_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1049].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_sociétés_Liste_des_types_de_sociétés0()
{
 TAB_COMPO_PPTES[1049].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1049].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1051];
 Esclave_0.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Annuler_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=true;
top.document.getElementById("Insert_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Delete_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
top.document.getElementById("Update_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Types de tâches
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Types_de_tâches()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Types_de_tâches");
}

function Insert_Types_de_tâches_Liste_des_types_de_tâches0()
{
 TAB_COMPO_PPTES[1003].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1003].NewCle = getNewCle("typetache");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1003].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1005];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1006];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Annuler_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Insert_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Delete_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Update_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1003];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1003].NewCle;
}

function Delete_Types_de_tâches_Liste_des_types_de_tâches0()
{
 if (TAB_GLOBAL_COMPO[1003].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1003];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1003].Action_en_cours = DELETE;
         User_Delete_Types_de_tâches_Liste_des_types_de_tâches0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Types_de_tâches_Liste_des_types_de_tâches0()
{
 if (TAB_GLOBAL_COMPO[1003].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1003].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1003].NewCle = TAB_GLOBAL_COMPO[1003].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1003].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1005];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1006];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Annuler_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Insert_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Delete_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Update_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
return TAB_COMPO_PPTES[1003].NewCle;
}

function Validate_Types_de_tâches_Liste_des_types_de_tâches0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1003];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1003].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Types_de_tâches_Liste_des_types_de_tâches0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Types_de_tâches_Liste_des_types_de_tâches0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1003].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1005];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1006];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Annuler_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Insert_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Delete_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Update_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1003].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1003].Action_en_cours = null;
 return NewCle;
}

function Annuler_Types_de_tâches_Liste_des_types_de_tâches0()
{
 TAB_COMPO_PPTES[1003].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1003].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1005];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1006];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Annuler_Types_de_tâches_Liste_des_types_de_tâches0").disabled=true;
top.document.getElementById("Insert_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Delete_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
top.document.getElementById("Update_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;
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
/* On désactive les autres filtres */
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
 TAB_COMPO_PPTES[1133].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1133].NewCle = getNewCle("ville");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1133].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1137];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1138];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Annuler_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1133];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1133].NewCle;
}

function Delete_Villes_Liste_des_villes0()
{
 if (TAB_GLOBAL_COMPO[1133].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1133];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1133].Action_en_cours = DELETE;
         User_Delete_Villes_Liste_des_villes0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Villes_0.OnClose(true);
 }
}

function Update_Villes_Liste_des_villes0()
{
 if (TAB_GLOBAL_COMPO[1133].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1133].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1133].NewCle = TAB_GLOBAL_COMPO[1133].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1133].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1137];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1138];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Annuler_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=true;
return TAB_COMPO_PPTES[1133].NewCle;
}

function Validate_Villes_Liste_des_villes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1133];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1133].Action_en_cours){
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
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1133].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1137];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1138];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Annuler_Villes_Liste_des_villes0").disabled=true;
top.document.getElementById("Insert_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Delete_Villes_Liste_des_villes0").disabled=false;
top.document.getElementById("Update_Villes_Liste_des_villes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1133].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Villes_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1133].Action_en_cours = null;
 return NewCle;
}

function Annuler_Villes_Liste_des_villes0()
{
 TAB_COMPO_PPTES[1133].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1133].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1137];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1138];
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
var Col_N0_N__De_Accès_Liste_des_niveaux_d_accès0=new clAttribut("ac_numero","acces",null);

var Col_N1_Nom_De_Accès_Liste_des_niveaux_d_accès0=new clAttribut("ac_libelle","acces",null);

var Col_N2_Niveau_De_Accès_Liste_des_niveaux_d_accès0=new clAttribut("ac_niveau","acces",null);

var Accès_Nom_1=new clAttribut("ac_libelle","acces",null);


	/* Ce composant représente: acces.ac_libelle sous le nom "Nom" */
var Compo_Accès_Nom_1=new clCompoTextBox(Accès_Nom_1,null,"Nom",false,false);
var Accès_Niveau_2=new clAttribut("ac_niveau","acces",null);


	/* Ce composant représente: acces.ac_niveau sous le nom "Niveau" */
var Compo_Accès_Niveau_2=new clCompoTextBox(Accès_Niveau_2,null,"Niveau",false,false);
var Accès_Liste_des_niveaux_d_accès0=new clEnsembleAttributs("acces",
	new Array(
	new clLiaison(null,Col_N0_N__De_Accès_Liste_des_niveaux_d_accès0)
	,new clLiaison(null,Col_N1_Nom_De_Accès_Liste_des_niveaux_d_accès0)
	,new clLiaison(null,Col_N2_Niveau_De_Accès_Liste_des_niveaux_d_accès0)
	),
	new Array(
	new clLiaison(null,Accès_Nom_1)
	,new clLiaison(null,Accès_Niveau_2)
	));

var Titre_Accès_Liste_des_niveaux_d_accès0=new Array("N°","Nom","Niveau");

	/* Ce composant représente: des éléments de la table acces sous le nom "Liste des niveaux d'accès" */
var Compo_Accès_Liste_des_niveaux_d_accès0=new clCompoListe(Accès_Liste_des_niveaux_d_accès0,new Array(new clInterfaceFiltrageVide()),Titre_Accès_Liste_des_niveaux_d_accès0,"Liste des niveaux d'accès",true,false);

	/* Ce composant représente: acces.undefined sous le nom "Liste des niveaux d'accès" */
 if(ALeDroit(0,"acces"))
 {
Compo_Accès_Liste_des_niveaux_d_accès0.GenererXUL(top.document.getElementById("Accès_Liste_des_niveaux_d_accès0"));

 }

	/* On l'ajoute au tableau global à l'indice 978*/
top.TAB_GLOBAL_COMPO[978]=Compo_Accès_Liste_des_niveaux_d_accès0;

	/* Ce composant représente: des éléments de la table acces sous le nom "Nom" */
 if(ALeDroit(0,"acces"))
 {
Compo_Accès_Nom_1.GenererXUL(top.document.getElementById("Accès_Liste_des_niveaux_d_accès0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 982*/
top.TAB_GLOBAL_COMPO[982]=Compo_Accès_Nom_1;

	/* Ce composant représente: des éléments de la table acces sous le nom "Niveau" */
 if(ALeDroit(0,"acces"))
 {
Compo_Accès_Niveau_2.GenererXUL(top.document.getElementById("Accès_Liste_des_niveaux_d_accès0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 983*/
top.TAB_GLOBAL_COMPO[983]=Compo_Accès_Niveau_2;
var Col_N0_Libellé_De_Adhérence_Liste_des_adhérences0=new clAttribut("ah_libelle","adherence",null);

var Col_N1_Réduction_De_Adhérence_Liste_des_adhérences0=new clAttribut("ah_reduction","adherence",null);

var Col_N2_N_Produit_De_Adhérence_Liste_des_adhérences0=new clAttribut("pd_numero","adherence",null);

var Adhérence_Produit_1=new clAttribut("pd_libelle","produit",null);


	/* Ce composant représente: produit.pd_libelle sous le nom "Produit" */
var Compo_Adhérence_Produit_1=new clCompoListeDeroulanteSimple(Adhérence_Produit_1,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Produits_0=new clInterfaceFiltrageRelationOnglet("Produits",Gerer_Produits,OuvrirOnglet_Adhérence)),"Produit");
var Joint_Esclave_Adhérence_Produit_1=new clJointureMulti("adherence",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,false)
	));
var Adhérence_Libellé_2=new clAttribut("ah_libelle","adherence",null);


	/* Ce composant représente: adherence.ah_libelle sous le nom "Libellé" */
var Compo_Adhérence_Libellé_2=new clCompoTextBox(Adhérence_Libellé_2,null,"Libellé",false,false);
var Adhérence_Réduction_3=new clAttribut("ah_reduction","adherence",null);


	/* Ce composant représente: adherence.ah_reduction sous le nom "Réduction" */
var Compo_Adhérence_Réduction_3=new clCompoTextBox(Adhérence_Réduction_3,null,"Réduction",false,false);
var Adhérence_En_cascade_4=new clAttribut("ah_cascade","adherence",null);


	/* Ce composant représente: adherence.ah_cascade sous le nom "En cascade" */
var Compo_Adhérence_En_cascade_4=new clCompoCheckBox(Adhérence_En_cascade_4,null,"En cascade");
var Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5=new clAttribut("tl_libelle","typelien",null);


	/* Ce composant représente: typelien.tl_libelle sous le nom "Nature du lien à utiliser pour la cascade" */
var Compo_Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5=new clCompoListeDeroulanteSimple(Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Types_de_lien_0=new clInterfaceFiltrageRelationOnglet("Types de lien",Gerer_Types_de_lien,OuvrirOnglet_Adhérence)),"Nature du lien à utiliser pour la cascade");
var Joint_Esclave_Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5=new clJointureMulti("adherence",
	new Array(
	new stJointure("typelien","tl_numero","tl_numero",null,false)
	));
var Col_N0_Du_De_Adhérence_Périodes_de_validité_7=new clAttribut("po_debut","periode",null);

var Col_N1_au_De_Adhérence_Périodes_de_validité_7=new clAttribut("po_fin","periode",null);

var Adhérence_Périodes_de_validité_7=new clEnsembleAttributs("periode",
	new Array(
	new clLiaison(null,Col_N0_Du_De_Adhérence_Périodes_de_validité_7)
	,new clLiaison(null,Col_N1_au_De_Adhérence_Périodes_de_validité_7)
	),
	null);

var Titre_Adhérence_Périodes_de_validité_7=new Array("Du","au");

	/* Ce composant représente: des éléments de la table periode sous le nom "Périodes de validité" */
var Compo_Adhérence_Périodes_de_validité_7=new clCompoListe(Adhérence_Périodes_de_validité_7,null,Titre_Adhérence_Périodes_de_validité_7,"Périodes de validité",true,true);
var Joint_Esclave_Adhérence_Périodes_de_validité_7=new clJointureMulti("adherence",
	new Array(
	new stJointure("periodeadherence","ah_numero","ah_numero",null,false)
	,new stJointure("periode","po_numero","po_numero",null,false)
	));
var Adhérence_Liste_des_adhérences0=new clEnsembleAttributs("adherence",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Adhérence_Liste_des_adhérences0)
	,new clLiaison(null,Col_N1_Réduction_De_Adhérence_Liste_des_adhérences0)
	,new clLiaison(null,Col_N2_N_Produit_De_Adhérence_Liste_des_adhérences0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Adhérence_Produit_1,Adhérence_Produit_1)
	,new clLiaison(null,Adhérence_Libellé_2)
	,new clLiaison(null,Adhérence_Réduction_3)
	,new clLiaison(null,Adhérence_En_cascade_4)
	,new clLiaison(Joint_Esclave_Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5,Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5)
	,new clLiaison(Joint_Esclave_Adhérence_Périodes_de_validité_7,Adhérence_Périodes_de_validité_7)
	));

var Titre_Adhérence_Liste_des_adhérences0=new Array("Libellé","Réduction","N°Produit");

	/* Ce composant représente: des éléments de la table adherence sous le nom "Liste des adhérences" */
var Compo_Adhérence_Liste_des_adhérences0=new clCompoListe(Adhérence_Liste_des_adhérences0,new Array(new clInterfaceFiltrageVide()),Titre_Adhérence_Liste_des_adhérences0,"Liste des adhérences",true,false);
var Col_N0_Du_De_Adhérence_Indpt_Périodes_disponibles_6=new clAttribut("po_debut","periode",null);

var Col_N1_au_De_Adhérence_Indpt_Périodes_disponibles_6=new clAttribut("po_fin","periode",null);

var Adhérence_Indpt_Périodes_disponibles_6=new clEnsembleAttributs("periode",
	new Array(
	new clLiaison(null,Col_N0_Du_De_Adhérence_Indpt_Périodes_disponibles_6)
	,new clLiaison(null,Col_N1_au_De_Adhérence_Indpt_Périodes_disponibles_6)
	),
	null);

var Titre_Adhérence_Indpt_Périodes_disponibles_6=new Array("Du","au");

	/* Ce composant représente: des éléments de la table periode sous le nom "Périodes disponibles" */
var Compo_Adhérence_Indpt_Périodes_disponibles_6=new clCompoListe(Adhérence_Indpt_Périodes_disponibles_6,new Array(new clInterfaceFiltrageVide(),Filtre_Dep_Périodes_0=new clInterfaceFiltrageRelationOnglet("Périodes",Gerer_Périodes,OuvrirOnglet_Adhérence)),Titre_Adhérence_Indpt_Périodes_disponibles_6,"Périodes disponibles",true,true);

	/* Ce composant représente: adherence.undefined sous le nom "Liste des adhérences" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adhérence_Liste_des_adhérences0.GenererXUL(top.document.getElementById("Adhérence_Liste_des_adhérences0"));

 }

	/* On l'ajoute au tableau global à l'indice 1202*/
top.TAB_GLOBAL_COMPO[1202]=Compo_Adhérence_Liste_des_adhérences0;

	/* Ce composant représente: des éléments de la table produit sous le nom "Produit" */
 if(ALeDroit(0,"produit"))
 {
Compo_Adhérence_Produit_1.GenererXUL(top.document.getElementById("Adhérence_Liste_des_adhérences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1206*/
top.TAB_GLOBAL_COMPO[1206]=Compo_Adhérence_Produit_1;

	/* Ce composant représente: des éléments de la table adherence sous le nom "Libellé" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adhérence_Libellé_2.GenererXUL(top.document.getElementById("Adhérence_Liste_des_adhérences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1207*/
top.TAB_GLOBAL_COMPO[1207]=Compo_Adhérence_Libellé_2;

	/* Ce composant représente: des éléments de la table adherence sous le nom "Réduction" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adhérence_Réduction_3.GenererXUL(top.document.getElementById("Adhérence_Liste_des_adhérences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1208*/
top.TAB_GLOBAL_COMPO[1208]=Compo_Adhérence_Réduction_3;

	/* Ce composant représente: des éléments de la table adherence sous le nom "En cascade" */
 if(ALeDroit(0,"adherence"))
 {
Compo_Adhérence_En_cascade_4.GenererXUL(top.document.getElementById("Adhérence_Liste_des_adhérences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1209*/
top.TAB_GLOBAL_COMPO[1209]=Compo_Adhérence_En_cascade_4;

	/* Ce composant représente: des éléments de la table typelien sous le nom "Nature du lien à utiliser pour la cascade" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5.GenererXUL(top.document.getElementById("Adhérence_Liste_des_adhérences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1210*/
top.TAB_GLOBAL_COMPO[1210]=Compo_Adhérence_Nature_du_lien_à_utiliser_pour_la_cascade_5;

	/* Ce composant représente: periode.undefined sous le nom "Périodes disponibles" */
 if(ALeDroit(0,"periode"))
 {
Compo_Adhérence_Indpt_Périodes_disponibles_6.GenererXUL(top.document.getElementById("ListeDessus_Adhérence_Périodes_de_validité_7"));

 }

	/* On l'ajoute au tableau global à l'indice 1211*/
top.TAB_GLOBAL_COMPO[1211]=Compo_Adhérence_Indpt_Périodes_disponibles_6;

	/* Ce composant représente: periode.undefined sous le nom "Périodes de validité" */
 if(ALeDroit(0,"periode"))
 {
Compo_Adhérence_Périodes_de_validité_7.GenererXUL(top.document.getElementById("Adhérence_Périodes_de_validité_7"));

 }

	/* On l'ajoute au tableau global à l'indice 1214*/
top.TAB_GLOBAL_COMPO[1214]=Compo_Adhérence_Périodes_de_validité_7;
var Col_N0_Ini__De_Agents_Liste_des_agents0=new clAttribut("ag_initiales","agent",null);

var Col_N1_Nom_De_Agents_Liste_des_agents0=new clAttribut("ag_nom","agent",null);

var Col_N2_Prénom_De_Agents_Liste_des_agents0=new clAttribut("ag_prenom","agent",null);

var Col_N3_Équipe_De_Agents_Liste_des_agents0=new clAttribut("eq_nom","equipe",null);

var Joint_Col_N3_Équipe_De_Agents_Liste_des_agents0=new clJointureMulti("agent",
	new Array(
	new stJointure("equipe","eq_numero","eq_numero",null,true)
	));
var Col_N4_Rôle_De_Agents_Liste_des_agents0=new clAttribut("ag_role","agent",null);

var Agents_Nom_1=new clAttribut("ag_nom","agent",null);


	/* Ce composant représente: agent.ag_nom sous le nom "Nom" */
var Compo_Agents_Nom_1=new clCompoTextBox(Agents_Nom_1,null,"Nom",false,false);
var Agents_Prénom_2=new clAttribut("ag_prenom","agent",null);


	/* Ce composant représente: agent.ag_prenom sous le nom "Prénom" */
var Compo_Agents_Prénom_2=new clCompoTextBox(Agents_Prénom_2,null,"Prénom",false,false);
var Agents_Initiales_3=new clAttribut("ag_initiales","agent",null);


	/* Ce composant représente: agent.ag_initiales sous le nom "Initiales" */
var Compo_Agents_Initiales_3=new clCompoTextBox(Agents_Initiales_3,null,"Initiales",false,false);
var Agents_En_activité_4=new clAttribut("ag_actif","agent",null);


	/* Ce composant représente: agent.ag_actif sous le nom "En activité" */
var Compo_Agents_En_activité_4=new clCompoCheckBox(Agents_En_activité_4,null,"En activité");
var Agents_Rôle_5=new clAttribut("ag_role","agent",null);


	/* Ce composant représente: agent.ag_role sous le nom "Rôle" */
var Compo_Agents_Rôle_5=new clCompoTextBox(Agents_Rôle_5,null,"Rôle",false,false);
var Agents_Équipe_6=new clAttribut("eq_nom","equipe",null);


	/* Ce composant représente: equipe.eq_nom sous le nom "Équipe" */
var Compo_Agents_Équipe_6=new clCompoListeDeroulanteSimple(Agents_Équipe_6,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Équipes_0=new clInterfaceFiltrageRelationOnglet("Équipes",Gerer_Équipes,OuvrirOnglet_Agents)),"Équipe");
var Joint_Esclave_Agents_Équipe_6=new clJointureMulti("agent",
	new Array(
	new stJointure("equipe","eq_numero","eq_numero",null,false)
	));
var Agents_Téléphone_professionnel_7=new clAttribut("ag_telephone","agent",null);


	/* Ce composant représente: agent.ag_telephone sous le nom "Téléphone professionnel" */
var Compo_Agents_Téléphone_professionnel_7=new clCompoTextBox(Agents_Téléphone_professionnel_7,null,"Téléphone professionnel",false,false);
var Agents_Téléphone_portable_8=new clAttribut("ag_mobile","agent",null);


	/* Ce composant représente: agent.ag_mobile sous le nom "Téléphone portable" */
var Compo_Agents_Téléphone_portable_8=new clCompoTextBox(Agents_Téléphone_portable_8,null,"Téléphone portable",false,false);
var Agents_Adresse_e_mail_9=new clAttribut("ag_email","agent",null);


	/* Ce composant représente: agent.ag_email sous le nom "Adresse e-mail" */
var Compo_Agents_Adresse_e_mail_9=new clCompoTextBox(Agents_Adresse_e_mail_9,null,"Adresse e-mail",false,false);
var Agents_Commentaire_10=new clAttribut("ag_commentaire","agent",null);


	/* Ce composant représente: agent.ag_commentaire sous le nom "Commentaire" */
var Compo_Agents_Commentaire_10=new clCompoTextBox(Agents_Commentaire_10,null,"Commentaire",false,false);
var Agents_Liste_des_agents0=new clEnsembleAttributs("agent",
	new Array(
	new clLiaison(null,Col_N0_Ini__De_Agents_Liste_des_agents0)
	,new clLiaison(null,Col_N1_Nom_De_Agents_Liste_des_agents0)
	,new clLiaison(null,Col_N2_Prénom_De_Agents_Liste_des_agents0)
	,new clLiaison(Joint_Col_N3_Équipe_De_Agents_Liste_des_agents0,Col_N3_Équipe_De_Agents_Liste_des_agents0)
	,new clLiaison(null,Col_N4_Rôle_De_Agents_Liste_des_agents0)
	),
	new Array(
	new clLiaison(null,Agents_Nom_1)
	,new clLiaison(null,Agents_Prénom_2)
	,new clLiaison(null,Agents_Initiales_3)
	,new clLiaison(null,Agents_En_activité_4)
	,new clLiaison(null,Agents_Rôle_5)
	,new clLiaison(Joint_Esclave_Agents_Équipe_6,Agents_Équipe_6)
	,new clLiaison(null,Agents_Téléphone_professionnel_7)
	,new clLiaison(null,Agents_Téléphone_portable_8)
	,new clLiaison(null,Agents_Adresse_e_mail_9)
	,new clLiaison(null,Agents_Commentaire_10)
	));

var Titre_Agents_Liste_des_agents0=new Array("Ini.","Nom","Prénom","Équipe","Rôle");

	/* Ce composant représente: des éléments de la table agent sous le nom "Liste des agents" */
var Compo_Agents_Liste_des_agents0=new clCompoListe(Agents_Liste_des_agents0,new Array(new clInterfaceFiltrageVide()),Titre_Agents_Liste_des_agents0,"Liste des agents",true,false);

	/* Ce composant représente: agent.undefined sous le nom "Liste des agents" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Liste_des_agents0.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0"));

 }

	/* On l'ajoute au tableau global à l'indice 1114*/
top.TAB_GLOBAL_COMPO[1114]=Compo_Agents_Liste_des_agents0;

	/* Ce composant représente: des éléments de la table agent sous le nom "Nom" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Nom_1.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1120*/
top.TAB_GLOBAL_COMPO[1120]=Compo_Agents_Nom_1;

	/* Ce composant représente: des éléments de la table agent sous le nom "Prénom" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Prénom_2.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1121*/
top.TAB_GLOBAL_COMPO[1121]=Compo_Agents_Prénom_2;

	/* Ce composant représente: des éléments de la table agent sous le nom "Initiales" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Initiales_3.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1122*/
top.TAB_GLOBAL_COMPO[1122]=Compo_Agents_Initiales_3;

	/* Ce composant représente: des éléments de la table agent sous le nom "En activité" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_En_activité_4.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1123*/
top.TAB_GLOBAL_COMPO[1123]=Compo_Agents_En_activité_4;

	/* Ce composant représente: des éléments de la table agent sous le nom "Rôle" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Rôle_5.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1124*/
top.TAB_GLOBAL_COMPO[1124]=Compo_Agents_Rôle_5;

	/* Ce composant représente: des éléments de la table equipe sous le nom "Équipe" */
 if(ALeDroit(0,"equipe"))
 {
Compo_Agents_Équipe_6.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1125*/
top.TAB_GLOBAL_COMPO[1125]=Compo_Agents_Équipe_6;

	/* Ce composant représente: des éléments de la table agent sous le nom "Téléphone professionnel" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Téléphone_professionnel_7.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1126*/
top.TAB_GLOBAL_COMPO[1126]=Compo_Agents_Téléphone_professionnel_7;

	/* Ce composant représente: des éléments de la table agent sous le nom "Téléphone portable" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Téléphone_portable_8.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1127*/
top.TAB_GLOBAL_COMPO[1127]=Compo_Agents_Téléphone_portable_8;

	/* Ce composant représente: des éléments de la table agent sous le nom "Adresse e-mail" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Adresse_e_mail_9.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1128*/
top.TAB_GLOBAL_COMPO[1128]=Compo_Agents_Adresse_e_mail_9;

	/* Ce composant représente: des éléments de la table agent sous le nom "Commentaire" */
 if(ALeDroit(0,"agent"))
 {
Compo_Agents_Commentaire_10.GenererXUL(top.document.getElementById("Agents_Liste_des_agents0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1129*/
top.TAB_GLOBAL_COMPO[1129]=Compo_Agents_Commentaire_10;
var Col_N0_N__De_Cantons_Liste_des_cantons0=new clAttribut("ct_numero","canton",null);

var Col_N1_Nom_De_Cantons_Liste_des_cantons0=new clAttribut("ct_nom","canton",null);

var Cantons_Nom_1=new clAttribut("ct_nom","canton",null);


	/* Ce composant représente: canton.ct_nom sous le nom "Nom" */
var Compo_Cantons_Nom_1=new clCompoTextBox(Cantons_Nom_1,null,"Nom",false,false);
var Col_N0_Nom_De_Cantons_Villes_2=new clAttribut("vi_nom","ville",null);

var Cantons_Villes_2=new clEnsembleAttributs("ville",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Cantons_Villes_2)
	),
	null);

var Titre_Cantons_Villes_2=new Array("Nom");

	/* Ce composant représente: des éléments de la table ville sous le nom "Villes" */
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

var Titre_Cantons_Liste_des_cantons0=new Array("N°","Nom");

	/* Ce composant représente: des éléments de la table canton sous le nom "Liste des cantons" */
var Compo_Cantons_Liste_des_cantons0=new clCompoListe(Cantons_Liste_des_cantons0,new Array(new clInterfaceFiltrageVide()),Titre_Cantons_Liste_des_cantons0,"Liste des cantons",true,false);

	/* Ce composant représente: canton.undefined sous le nom "Liste des cantons" */
 if(ALeDroit(0,"canton"))
 {
Compo_Cantons_Liste_des_cantons0.GenererXUL(top.document.getElementById("Cantons_Liste_des_cantons0"));

 }

	/* On l'ajoute au tableau global à l'indice 1159*/
top.TAB_GLOBAL_COMPO[1159]=Compo_Cantons_Liste_des_cantons0;

	/* Ce composant représente: des éléments de la table canton sous le nom "Nom" */
 if(ALeDroit(0,"canton"))
 {
Compo_Cantons_Nom_1.GenererXUL(top.document.getElementById("Cantons_Liste_des_cantons0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1162*/
top.TAB_GLOBAL_COMPO[1162]=Compo_Cantons_Nom_1;

	/* Ce composant représente: ville.undefined sous le nom "Villes" */
 if(ALeDroit(0,"ville"))
 {
Compo_Cantons_Villes_2.GenererXUL(top.document.getElementById("Cantons_Villes_2"));

 }

	/* On l'ajoute au tableau global à l'indice 1163*/
top.TAB_GLOBAL_COMPO[1163]=Compo_Cantons_Villes_2;
var Col_N0_N__De_Codes_postaux_Liste_des_codes_postaux0=new clAttribut("cp_numero","codepostal",null);

var Col_N1_Code_De_Codes_postaux_Liste_des_codes_postaux0=new clAttribut("cp_codepostal","codepostal",null);

var Col_N2_Bureau_De_Codes_postaux_Liste_des_codes_postaux0=new clAttribut("cp_bureau","codepostal",null);

var Codes_postaux_Code_postal_1=new clAttribut("cp_codepostal","codepostal",null);


	/* Ce composant représente: codepostal.cp_codepostal sous le nom "Code postal" */
var Compo_Codes_postaux_Code_postal_1=new clCompoTextBox(Codes_postaux_Code_postal_1,null,"Code postal",false,false);
var Codes_postaux_Bureau_distributeur_2=new clAttribut("cp_bureau","codepostal",null);


	/* Ce composant représente: codepostal.cp_bureau sous le nom "Bureau distributeur" */
var Compo_Codes_postaux_Bureau_distributeur_2=new clCompoTextBox(Codes_postaux_Bureau_distributeur_2,null,"Bureau distributeur",false,false);
var Col_N0_N__De_Codes_postaux_Villes_liées_au_code_postal_4=new clAttribut("vi_numero","ville",null);

var Col_N1_Nom_De_Codes_postaux_Villes_liées_au_code_postal_4=new clAttribut("vi_nom","ville",null);

var Codes_postaux_Villes_liées_au_code_postal_4=new clEnsembleAttributs("ville",
	new Array(
	new clLiaison(null,Col_N0_N__De_Codes_postaux_Villes_liées_au_code_postal_4)
	,new clLiaison(null,Col_N1_Nom_De_Codes_postaux_Villes_liées_au_code_postal_4)
	),
	null);

var Titre_Codes_postaux_Villes_liées_au_code_postal_4=new Array("N°","Nom");

	/* Ce composant représente: des éléments de la table ville sous le nom "Villes liées au code postal" */
var Compo_Codes_postaux_Villes_liées_au_code_postal_4=new clCompoListe(Codes_postaux_Villes_liées_au_code_postal_4,null,Titre_Codes_postaux_Villes_liées_au_code_postal_4,"Villes liées au code postal",true,true);
var Joint_Esclave_Codes_postaux_Villes_liées_au_code_postal_4=new clJointureMulti("codepostal",
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
	,new clLiaison(Joint_Esclave_Codes_postaux_Villes_liées_au_code_postal_4,Codes_postaux_Villes_liées_au_code_postal_4)
	));

var Titre_Codes_postaux_Liste_des_codes_postaux0=new Array("N°","Code","Bureau");

	/* Ce composant représente: des éléments de la table codepostal sous le nom "Liste des codes postaux" */
var Compo_Codes_postaux_Liste_des_codes_postaux0=new clCompoListe(Codes_postaux_Liste_des_codes_postaux0,new Array(new clInterfaceFiltrageVide()),Titre_Codes_postaux_Liste_des_codes_postaux0,"Liste des codes postaux",true,false);
var Col_N0_N__De_Codes_postaux_Indpt_Villes_disponibles_3=new clAttribut("vi_numero","ville",null);

var Col_N1_Nom_De_Codes_postaux_Indpt_Villes_disponibles_3=new clAttribut("vi_nom","ville",null);

var Codes_postaux_Indpt_Villes_disponibles_3=new clEnsembleAttributs("ville",
	new Array(
	new clLiaison(null,Col_N0_N__De_Codes_postaux_Indpt_Villes_disponibles_3)
	,new clLiaison(null,Col_N1_Nom_De_Codes_postaux_Indpt_Villes_disponibles_3)
	),
	null);

var Titre_Codes_postaux_Indpt_Villes_disponibles_3=new Array("N°","Nom");

	/* Ce composant représente: des éléments de la table ville sous le nom "Villes disponibles" */
var Compo_Codes_postaux_Indpt_Villes_disponibles_3=new clCompoListe(Codes_postaux_Indpt_Villes_disponibles_3,new Array(new clInterfaceFiltrageVide(),Filtre_Dep_Villes_0=new clInterfaceFiltrageRelationOnglet("Villes",Gerer_Villes,OuvrirOnglet_Codes_postaux)),Titre_Codes_postaux_Indpt_Villes_disponibles_3,"Villes disponibles",true,true);

	/* Ce composant représente: codepostal.undefined sous le nom "Liste des codes postaux" */
 if(ALeDroit(0,"codepostal"))
 {
Compo_Codes_postaux_Liste_des_codes_postaux0.GenererXUL(top.document.getElementById("Codes_postaux_Liste_des_codes_postaux0"));

 }

	/* On l'ajoute au tableau global à l'indice 1139*/
top.TAB_GLOBAL_COMPO[1139]=Compo_Codes_postaux_Liste_des_codes_postaux0;

	/* Ce composant représente: des éléments de la table codepostal sous le nom "Code postal" */
 if(ALeDroit(0,"codepostal"))
 {
Compo_Codes_postaux_Code_postal_1.GenererXUL(top.document.getElementById("Codes_postaux_Liste_des_codes_postaux0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1143*/
top.TAB_GLOBAL_COMPO[1143]=Compo_Codes_postaux_Code_postal_1;

	/* Ce composant représente: des éléments de la table codepostal sous le nom "Bureau distributeur" */
 if(ALeDroit(0,"codepostal"))
 {
Compo_Codes_postaux_Bureau_distributeur_2.GenererXUL(top.document.getElementById("Codes_postaux_Liste_des_codes_postaux0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1144*/
top.TAB_GLOBAL_COMPO[1144]=Compo_Codes_postaux_Bureau_distributeur_2;

	/* Ce composant représente: ville.undefined sous le nom "Villes disponibles" */
 if(ALeDroit(0,"ville"))
 {
Compo_Codes_postaux_Indpt_Villes_disponibles_3.GenererXUL(top.document.getElementById("ListeDessus_Codes_postaux_Villes_liées_au_code_postal_4"));

 }

	/* On l'ajoute au tableau global à l'indice 1145*/
top.TAB_GLOBAL_COMPO[1145]=Compo_Codes_postaux_Indpt_Villes_disponibles_3;

	/* Ce composant représente: ville.undefined sous le nom "Villes liées au code postal" */
 if(ALeDroit(0,"ville"))
 {
Compo_Codes_postaux_Villes_liées_au_code_postal_4.GenererXUL(top.document.getElementById("Codes_postaux_Villes_liées_au_code_postal_4"));

 }

	/* On l'ajoute au tableau global à l'indice 1148*/
top.TAB_GLOBAL_COMPO[1148]=Compo_Codes_postaux_Villes_liées_au_code_postal_4;
var Col_N0_Libellé_De_Profils_de_droits_Liste_des_profils_de_droits0=new clAttribut("dp_libelle","droitprofil",null);

var Profils_de_droits_Libellé_1=new clAttribut("dp_libelle","droitprofil",null);


	/* Ce composant représente: droitprofil.dp_libelle sous le nom "Libellé" */
var Compo_Profils_de_droits_Libellé_1=new clCompoTextBox(Profils_de_droits_Libellé_1,null,"Libellé",false,false);
var Col_N0_Droits_De_Profils_de_droits_Droits_2=new clAttribut("dr_droits","droit",null);

var Col_N1_Sur_De_Profils_de_droits_Droits_2=new clAttribut("gt_libelle","groupetable",null);

var Joint_Col_N1_Sur_De_Profils_de_droits_Droits_2=new clJointureMulti("droit",
	new Array(
	new stJointure("groupetable","gt_numero","gt_numero",null,true)
	));
var Profils_de_droits_Module_3=new clAttribut("gt_libelle","groupetable",null);


	/* Ce composant représente: groupetable.gt_libelle sous le nom "Module" */
var Compo_Profils_de_droits_Module_3=new clCompoListeDeroulanteSimple(Profils_de_droits_Module_3,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Groupe_de_tables_0=new clInterfaceFiltrageRelationOnglet("Groupe de tables",Gerer_Groupe_de_tables,OuvrirOnglet_Profils_de_droits)),"Module");
var Joint_Esclave_Profils_de_droits_Module_3=new clJointureMulti("droit",
	new Array(
	new stJointure("groupetable","gt_numero","gt_numero",null,false)
	));
var Profils_de_droits_Lecture_4=new clAttribut("dr_select","droit",null);


	/* Ce composant représente: droit.dr_select sous le nom "Lecture" */
var Compo_Profils_de_droits_Lecture_4=new clCompoCheckBox(Profils_de_droits_Lecture_4,null,"Lecture");
var Profils_de_droits_Ajout_5=new clAttribut("dr_insert","droit",null);


	/* Ce composant représente: droit.dr_insert sous le nom "Ajout" */
var Compo_Profils_de_droits_Ajout_5=new clCompoCheckBox(Profils_de_droits_Ajout_5,null,"Ajout");
var Profils_de_droits_Modification_6=new clAttribut("dr_update","droit",null);


	/* Ce composant représente: droit.dr_update sous le nom "Modification" */
var Compo_Profils_de_droits_Modification_6=new clCompoCheckBox(Profils_de_droits_Modification_6,null,"Modification");
var Profils_de_droits_Suppression_7=new clAttribut("dr_delete","droit",null);


	/* Ce composant représente: droit.dr_delete sous le nom "Suppression" */
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

	/* Ce composant représente: des éléments de la table droit sous le nom "Droits" */
var Compo_Profils_de_droits_Droits_2=new clCompoListe(Profils_de_droits_Droits_2,null,Titre_Profils_de_droits_Droits_2,"Droits",true,false);
var Joint_Esclave_Profils_de_droits_Droits_2=new clJointureMulti("droitprofil",
	new Array(
	new stJointure("droit","dp_numero","dp_numero",null,false)
	));
var Profils_de_droits_Liste_des_profils_de_droits0=new clEnsembleAttributs("droitprofil",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Profils_de_droits_Liste_des_profils_de_droits0)
	),
	new Array(
	new clLiaison(null,Profils_de_droits_Libellé_1)
	,new clLiaison(Joint_Esclave_Profils_de_droits_Droits_2,Profils_de_droits_Droits_2)
	));

var Titre_Profils_de_droits_Liste_des_profils_de_droits0=new Array("Libellé");

	/* Ce composant représente: des éléments de la table droitprofil sous le nom "Liste des profils de droits" */
var Compo_Profils_de_droits_Liste_des_profils_de_droits0=new clCompoListe(Profils_de_droits_Liste_des_profils_de_droits0,new Array(new clInterfaceFiltrageVide()),Titre_Profils_de_droits_Liste_des_profils_de_droits0,"Liste des profils de droits",true,false);

	/* Ce composant représente: droitprofil.undefined sous le nom "Liste des profils de droits" */
 if(ALeDroit(0,"droitprofil"))
 {
Compo_Profils_de_droits_Liste_des_profils_de_droits0.GenererXUL(top.document.getElementById("Profils_de_droits_Liste_des_profils_de_droits0"));

 }

	/* On l'ajoute au tableau global à l'indice 1098*/
top.TAB_GLOBAL_COMPO[1098]=Compo_Profils_de_droits_Liste_des_profils_de_droits0;

	/* Ce composant représente: des éléments de la table droitprofil sous le nom "Libellé" */
 if(ALeDroit(0,"droitprofil"))
 {
Compo_Profils_de_droits_Libellé_1.GenererXUL(top.document.getElementById("Profils_de_droits_Liste_des_profils_de_droits0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1100*/
top.TAB_GLOBAL_COMPO[1100]=Compo_Profils_de_droits_Libellé_1;

	/* Ce composant représente: droit.undefined sous le nom "Droits" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Droits_2.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2"));

 }

	/* On l'ajoute au tableau global à l'indice 1101*/
top.TAB_GLOBAL_COMPO[1101]=Compo_Profils_de_droits_Droits_2;

	/* Ce composant représente: des éléments de la table groupetable sous le nom "Module" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Profils_de_droits_Module_3.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1104*/
top.TAB_GLOBAL_COMPO[1104]=Compo_Profils_de_droits_Module_3;

	/* Ce composant représente: des éléments de la table droit sous le nom "Lecture" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Lecture_4.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1105*/
top.TAB_GLOBAL_COMPO[1105]=Compo_Profils_de_droits_Lecture_4;

	/* Ce composant représente: des éléments de la table droit sous le nom "Ajout" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Ajout_5.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1106*/
top.TAB_GLOBAL_COMPO[1106]=Compo_Profils_de_droits_Ajout_5;

	/* Ce composant représente: des éléments de la table droit sous le nom "Modification" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Modification_6.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1107*/
top.TAB_GLOBAL_COMPO[1107]=Compo_Profils_de_droits_Modification_6;

	/* Ce composant représente: des éléments de la table droit sous le nom "Suppression" */
 if(ALeDroit(0,"droit"))
 {
Compo_Profils_de_droits_Suppression_7.GenererXUL(top.document.getElementById("Profils_de_droits_Droits_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1108*/
top.TAB_GLOBAL_COMPO[1108]=Compo_Profils_de_droits_Suppression_7;
var Col_N0_Agent_De_Employés_Liste_des_employés0=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N0_Agent_De_Employés_Liste_des_employés0=new clJointureMulti("employe",
	new Array(
	new stJointure("agent","em_agent","ag_numero",null,true)
	));
var Col_N1_Emploi_De_Employés_Liste_des_employés0=new clAttribut("em_emploi","employe",null);

var Col_N2_Service_De_Employés_Liste_des_employés0=new clAttribut("se_nom","service",null);

var Joint_Col_N2_Service_De_Employés_Liste_des_employés0=new clJointureMulti("employe",
	new Array(
	new stJointure("service","em_service","se_numero",null,true)
	));
var Employés_Agent_1=new clAttribut("ag_libelle","agent",null);


	/* Ce composant représente: agent.ag_libelle sous le nom "Agent" */
var Compo_Employés_Agent_1=new clCompoListeDeroulanteSimple(Employés_Agent_1,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Agents_1=new clInterfaceFiltrageRelationOnglet("Agents",Gerer_Agents,OuvrirOnglet_Employés)),"Agent");
var Joint_Esclave_Employés_Agent_1=new clJointureMulti("employe",
	new Array(
	new stJointure("agent","em_agent","ag_numero",null,false)
	));
var Employés_Login_2=new clAttribut("em_login","employe",null);


	/* Ce composant représente: employe.em_login sous le nom "Login" */
var Compo_Employés_Login_2=new clCompoTextBox(Employés_Login_2,null,"Login",false,false);
var Employés_Mot_de_passe_3=new clAttribut("em_password","employe",null);


	/* Ce composant représente: employe.em_password sous le nom "Mot de passe" */
var Compo_Employés_Mot_de_passe_3=new clCompoTextBox(Employés_Mot_de_passe_3,null,"Mot de passe",false,false);
var Employés_Administrateur__Peut_créer_d_autres_utilisateurs__4=new clAttribut("em_super","employe",null);


	/* Ce composant représente: employe.em_super sous le nom "Administrateur (Peut créer d'autres utilisateurs)" */
var Compo_Employés_Administrateur__Peut_créer_d_autres_utilisateurs__4=new clCompoCheckBox(Employés_Administrateur__Peut_créer_d_autres_utilisateurs__4,null,"Administrateur (Peut créer d'autres utilisateurs)");
var Employés_Cet_employé_peut_effectuer_des_remises_de_chèques_5=new clAttribut("em_reglement","employe",null);


	/* Ce composant représente: employe.em_reglement sous le nom "Cet employé peut effectuer des remises de chèques" */
var Compo_Employés_Cet_employé_peut_effectuer_des_remises_de_chèques_5=new clCompoCheckBox(Employés_Cet_employé_peut_effectuer_des_remises_de_chèques_5,null,"Cet employé peut effectuer des remises de chèques");
var Employés_Cet_employé_peut_facturer_ses_propres_devis_6=new clAttribut("em_self_invoicing","employe",null);


	/* Ce composant représente: employe.em_self_invoicing sous le nom "Cet employé peut facturer ses propres devis" */
var Compo_Employés_Cet_employé_peut_facturer_ses_propres_devis_6=new clCompoCheckBox(Employés_Cet_employé_peut_facturer_ses_propres_devis_6,null,"Cet employé peut facturer ses propres devis");
var Employés_Cet_employé_peut_facturer_les_devis_de_son_service_7=new clAttribut("em_service_invoicing","employe",null);


	/* Ce composant représente: employe.em_service_invoicing sous le nom "Cet employé peut facturer les devis de son service" */
var Compo_Employés_Cet_employé_peut_facturer_les_devis_de_son_service_7=new clCompoCheckBox(Employés_Cet_employé_peut_facturer_les_devis_de_son_service_7,null,"Cet employé peut facturer les devis de son service");
var Employés_Cet_employé_peut_facturer_tous_les_devis_de_la_société_8=new clAttribut("em_societe_invoicing","employe",null);


	/* Ce composant représente: employe.em_societe_invoicing sous le nom "Cet employé peut facturer tous les devis de la société" */
var Compo_Employés_Cet_employé_peut_facturer_tous_les_devis_de_la_société_8=new clCompoCheckBox(Employés_Cet_employé_peut_facturer_tous_les_devis_de_la_société_8,null,"Cet employé peut facturer tous les devis de la société");
var Employés_Cet_employé_peut_modifier_les_informations_importantes_d_une_fiche__titre__nom__prénom_____9=new clAttribut("em_personne_editing","employe",null);


	/* Ce composant représente: employe.em_personne_editing sous le nom "Cet employé peut modifier les informations importantes d'une fiche (titre, nom, prénom...)" */
var Compo_Employés_Cet_employé_peut_modifier_les_informations_importantes_d_une_fiche__titre__nom__prénom_____9=new clCompoCheckBox(Employés_Cet_employé_peut_modifier_les_informations_importantes_d_une_fiche__titre__nom__prénom_____9,null,"Cet employé peut modifier les informations importantes d'une fiche (titre, nom, prénom...)");
var Employés_Emploi_10=new clAttribut("em_emploi","employe",null);


	/* Ce composant représente: employe.em_emploi sous le nom "Emploi" */
var Compo_Employés_Emploi_10=new clCompoTextBox(Employés_Emploi_10,null,"Emploi",false,false);
var Employés_Accès_comptabilité_11=new clAttribut("ac_nom","acces",null);


	/* Ce composant représente: acces.ac_nom sous le nom "Accès comptabilité" */
var Compo_Employés_Accès_comptabilité_11=new clCompoListeDeroulanteSimple(Employés_Accès_comptabilité_11,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Accès_0=new clInterfaceFiltrageRelationOnglet("Accès",Gerer_Accès,OuvrirOnglet_Employés)),"Accès comptabilité");
var Joint_Esclave_Employés_Accès_comptabilité_11=new clJointureMulti("employe",
	new Array(
	new stJointure("acces","em_acces","ac_numero",null,false)
	));
var Employés_Profil_de_droits_12=new clAttribut("dp_libelle","droitprofil",null);


	/* Ce composant représente: droitprofil.dp_libelle sous le nom "Profil de droits" */
var Compo_Employés_Profil_de_droits_12=new clCompoListeDeroulanteSimple(Employés_Profil_de_droits_12,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Profils_de_droits_0=new clInterfaceFiltrageRelationOnglet("Profils de droits",Gerer_Profils_de_droits,OuvrirOnglet_Employés)),"Profil de droits");
var Joint_Esclave_Employés_Profil_de_droits_12=new clJointureMulti("employe",
	new Array(
	new stJointure("droitprofil","dp_numero","dp_numero",null,false)
	));
var Employés_Liste_des_employés0=new clEnsembleAttributs("employe",
	new Array(
	new clLiaison(Joint_Col_N0_Agent_De_Employés_Liste_des_employés0,Col_N0_Agent_De_Employés_Liste_des_employés0)
	,new clLiaison(null,Col_N1_Emploi_De_Employés_Liste_des_employés0)
	,new clLiaison(Joint_Col_N2_Service_De_Employés_Liste_des_employés0,Col_N2_Service_De_Employés_Liste_des_employés0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Employés_Agent_1,Employés_Agent_1)
	,new clLiaison(null,Employés_Login_2)
	,new clLiaison(null,Employés_Mot_de_passe_3)
	,new clLiaison(null,Employés_Administrateur__Peut_créer_d_autres_utilisateurs__4)
	,new clLiaison(null,Employés_Cet_employé_peut_effectuer_des_remises_de_chèques_5)
	,new clLiaison(null,Employés_Cet_employé_peut_facturer_ses_propres_devis_6)
	,new clLiaison(null,Employés_Cet_employé_peut_facturer_les_devis_de_son_service_7)
	,new clLiaison(null,Employés_Cet_employé_peut_facturer_tous_les_devis_de_la_société_8)
	,new clLiaison(null,Employés_Cet_employé_peut_modifier_les_informations_importantes_d_une_fiche__titre__nom__prénom_____9)
	,new clLiaison(null,Employés_Emploi_10)
	,new clLiaison(Joint_Esclave_Employés_Accès_comptabilité_11,Employés_Accès_comptabilité_11)
	,new clLiaison(Joint_Esclave_Employés_Profil_de_droits_12,Employés_Profil_de_droits_12)
	));

var Titre_Employés_Liste_des_employés0=new Array("Agent","Emploi","Service");

	/* Ce composant représente: des éléments de la table employe sous le nom "Liste des employés" */
var Compo_Employés_Liste_des_employés0=new clCompoListe(Employés_Liste_des_employés0,new Array(new clInterfaceFiltrageVide()),Titre_Employés_Liste_des_employés0,"Liste des employés",true,false);

	/* Ce composant représente: employe.undefined sous le nom "Liste des employés" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Liste_des_employés0.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0"));

 }

	/* On l'ajoute au tableau global à l'indice 1082*/
top.TAB_GLOBAL_COMPO[1082]=Compo_Employés_Liste_des_employés0;

	/* Ce composant représente: des éléments de la table agent sous le nom "Agent" */
 if(ALeDroit(0,"agent"))
 {
Compo_Employés_Agent_1.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1086*/
top.TAB_GLOBAL_COMPO[1086]=Compo_Employés_Agent_1;

	/* Ce composant représente: des éléments de la table employe sous le nom "Login" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Login_2.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1087*/
top.TAB_GLOBAL_COMPO[1087]=Compo_Employés_Login_2;

	/* Ce composant représente: des éléments de la table employe sous le nom "Mot de passe" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Mot_de_passe_3.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1088*/
top.TAB_GLOBAL_COMPO[1088]=Compo_Employés_Mot_de_passe_3;

	/* Ce composant représente: des éléments de la table employe sous le nom "Administrateur (Peut créer d'autres utilisateurs)" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Administrateur__Peut_créer_d_autres_utilisateurs__4.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1089*/
top.TAB_GLOBAL_COMPO[1089]=Compo_Employés_Administrateur__Peut_créer_d_autres_utilisateurs__4;

	/* Ce composant représente: des éléments de la table employe sous le nom "Cet employé peut effectuer des remises de chèques" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Cet_employé_peut_effectuer_des_remises_de_chèques_5.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1090*/
top.TAB_GLOBAL_COMPO[1090]=Compo_Employés_Cet_employé_peut_effectuer_des_remises_de_chèques_5;

	/* Ce composant représente: des éléments de la table employe sous le nom "Cet employé peut facturer ses propres devis" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Cet_employé_peut_facturer_ses_propres_devis_6.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1091*/
top.TAB_GLOBAL_COMPO[1091]=Compo_Employés_Cet_employé_peut_facturer_ses_propres_devis_6;

	/* Ce composant représente: des éléments de la table employe sous le nom "Cet employé peut facturer les devis de son service" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Cet_employé_peut_facturer_les_devis_de_son_service_7.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1092*/
top.TAB_GLOBAL_COMPO[1092]=Compo_Employés_Cet_employé_peut_facturer_les_devis_de_son_service_7;

	/* Ce composant représente: des éléments de la table employe sous le nom "Cet employé peut facturer tous les devis de la société" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Cet_employé_peut_facturer_tous_les_devis_de_la_société_8.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1093*/
top.TAB_GLOBAL_COMPO[1093]=Compo_Employés_Cet_employé_peut_facturer_tous_les_devis_de_la_société_8;

	/* Ce composant représente: des éléments de la table employe sous le nom "Cet employé peut modifier les informations importantes d'une fiche (titre, nom, prénom...)" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Cet_employé_peut_modifier_les_informations_importantes_d_une_fiche__titre__nom__prénom_____9.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1094*/
top.TAB_GLOBAL_COMPO[1094]=Compo_Employés_Cet_employé_peut_modifier_les_informations_importantes_d_une_fiche__titre__nom__prénom_____9;

	/* Ce composant représente: des éléments de la table employe sous le nom "Emploi" */
 if(ALeDroit(0,"employe"))
 {
Compo_Employés_Emploi_10.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1095*/
top.TAB_GLOBAL_COMPO[1095]=Compo_Employés_Emploi_10;

	/* Ce composant représente: des éléments de la table acces sous le nom "Accès comptabilité" */
 if(ALeDroit(0,"acces"))
 {
Compo_Employés_Accès_comptabilité_11.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1096*/
top.TAB_GLOBAL_COMPO[1096]=Compo_Employés_Accès_comptabilité_11;

	/* Ce composant représente: des éléments de la table droitprofil sous le nom "Profil de droits" */
 if(ALeDroit(0,"droitprofil"))
 {
Compo_Employés_Profil_de_droits_12.GenererXUL(top.document.getElementById("Employés_Liste_des_employés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1097*/
top.TAB_GLOBAL_COMPO[1097]=Compo_Employés_Profil_de_droits_12;
var Col_N0_Nom_De_Équipes_Liste_des_équipes0=new clAttribut("eq_nom","equipe",null);

var Équipes_Nom_1=new clAttribut("eq_nom","equipe",null);


	/* Ce composant représente: equipe.eq_nom sous le nom "Nom" */
var Compo_Équipes_Nom_1=new clCompoTextBox(Équipes_Nom_1,null,"Nom",false,false);
var Équipes_Liste_des_équipes0=new clEnsembleAttributs("equipe",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Équipes_Liste_des_équipes0)
	),
	new Array(
	new clLiaison(null,Équipes_Nom_1)
	));

var Titre_Équipes_Liste_des_équipes0=new Array("Nom");

	/* Ce composant représente: des éléments de la table equipe sous le nom "Liste des équipes" */
var Compo_Équipes_Liste_des_équipes0=new clCompoListe(Équipes_Liste_des_équipes0,new Array(new clInterfaceFiltrageVide()),Titre_Équipes_Liste_des_équipes0,"Liste des équipes",true,false);

	/* Ce composant représente: equipe.undefined sous le nom "Liste des équipes" */
 if(ALeDroit(0,"equipe"))
 {
Compo_Équipes_Liste_des_équipes0.GenererXUL(top.document.getElementById("Équipes_Liste_des_équipes0"));

 }

	/* On l'ajoute au tableau global à l'indice 1130*/
top.TAB_GLOBAL_COMPO[1130]=Compo_Équipes_Liste_des_équipes0;

	/* Ce composant représente: des éléments de la table equipe sous le nom "Nom" */
 if(ALeDroit(0,"equipe"))
 {
Compo_Équipes_Nom_1.GenererXUL(top.document.getElementById("Équipes_Liste_des_équipes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1132*/
top.TAB_GLOBAL_COMPO[1132]=Compo_Équipes_Nom_1;
var Col_N0_Libellé_De_Groupe_de_tables_Liste_des_groupes_de_tables0=new clAttribut("gt_libelle","groupetable",null);

var Col_N1_Tables_De_Groupe_de_tables_Liste_des_groupes_de_tables0=new clAttribut("gt_tables","groupetable",null);

var Groupe_de_tables_Libellé_1=new clAttribut("gt_libelle","groupetable",null);


	/* Ce composant représente: groupetable.gt_libelle sous le nom "Libellé" */
var Compo_Groupe_de_tables_Libellé_1=new clCompoTextBox(Groupe_de_tables_Libellé_1,null,"Libellé",false,false);
var Groupe_de_tables_Tables_2=new clAttribut("gt_tables","groupetable",null);


	/* Ce composant représente: groupetable.gt_tables sous le nom "Tables" */
var Compo_Groupe_de_tables_Tables_2=new clCompoTextBox(Groupe_de_tables_Tables_2,null,"Tables",false,true);
var Groupe_de_tables_Liste_des_groupes_de_tables0=new clEnsembleAttributs("groupetable",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Groupe_de_tables_Liste_des_groupes_de_tables0)
	,new clLiaison(null,Col_N1_Tables_De_Groupe_de_tables_Liste_des_groupes_de_tables0)
	),
	new Array(
	new clLiaison(null,Groupe_de_tables_Libellé_1)
	,new clLiaison(null,Groupe_de_tables_Tables_2)
	));

var Titre_Groupe_de_tables_Liste_des_groupes_de_tables0=new Array("Libellé","Tables");

	/* Ce composant représente: des éléments de la table groupetable sous le nom "Liste des groupes de tables" */
var Compo_Groupe_de_tables_Liste_des_groupes_de_tables0=new clCompoListe(Groupe_de_tables_Liste_des_groupes_de_tables0,new Array(new clInterfaceFiltrageVide()),Titre_Groupe_de_tables_Liste_des_groupes_de_tables0,"Liste des groupes de tables",true,false);

	/* Ce composant représente: groupetable.undefined sous le nom "Liste des groupes de tables" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Groupe_de_tables_Liste_des_groupes_de_tables0.GenererXUL(top.document.getElementById("Groupe_de_tables_Liste_des_groupes_de_tables0"));

 }

	/* On l'ajoute au tableau global à l'indice 1109*/
top.TAB_GLOBAL_COMPO[1109]=Compo_Groupe_de_tables_Liste_des_groupes_de_tables0;

	/* Ce composant représente: des éléments de la table groupetable sous le nom "Libellé" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Groupe_de_tables_Libellé_1.GenererXUL(top.document.getElementById("Groupe_de_tables_Liste_des_groupes_de_tables0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1112*/
top.TAB_GLOBAL_COMPO[1112]=Compo_Groupe_de_tables_Libellé_1;

	/* Ce composant représente: des éléments de la table groupetable sous le nom "Tables" */
 if(ALeDroit(0,"groupetable"))
 {
Compo_Groupe_de_tables_Tables_2.GenererXUL(top.document.getElementById("Groupe_de_tables_Liste_des_groupes_de_tables0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1113*/
top.TAB_GLOBAL_COMPO[1113]=Compo_Groupe_de_tables_Tables_2;
var Col_N0_N__De_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clAttribut("gc_numero","groupecanton",null);

var Col_N1_Libellé_De_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clAttribut("gc_nom","groupecanton",null);

var Groupes_de_cantons_Libellé_1=new clAttribut("gc_nom","groupecanton",null);


	/* Ce composant représente: groupecanton.gc_nom sous le nom "Libellé" */
var Compo_Groupes_de_cantons_Libellé_1=new clCompoTextBox(Groupes_de_cantons_Libellé_1,null,"Libellé",false,false);
var Col_N0_Nom_De_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clAttribut("ct_nom","canton",null);

var Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clEnsembleAttributs("canton",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Groupes_de_cantons_Cantons_appartenant_au_groupe_3)
	),
	null);

var Titre_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new Array("Nom");

	/* Ce composant représente: des éléments de la table canton sous le nom "Cantons appartenant au groupe" */
var Compo_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clCompoListe(Groupes_de_cantons_Cantons_appartenant_au_groupe_3,null,Titre_Groupes_de_cantons_Cantons_appartenant_au_groupe_3,"Cantons appartenant au groupe",true,true);
var Joint_Esclave_Groupes_de_cantons_Cantons_appartenant_au_groupe_3=new clJointureMulti("groupecanton",
	new Array(
	new stJointure("appartienta","gc_numero","gc_numero",null,false)
	,new stJointure("canton","ct_numero","ct_numero",null,false)
	));
var Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clEnsembleAttributs("groupecanton",
	new Array(
	new clLiaison(null,Col_N0_N__De_Groupes_de_cantons_Liste_des_groupes_de_cantons0)
	,new clLiaison(null,Col_N1_Libellé_De_Groupes_de_cantons_Liste_des_groupes_de_cantons0)
	),
	new Array(
	new clLiaison(null,Groupes_de_cantons_Libellé_1)
	,new clLiaison(Joint_Esclave_Groupes_de_cantons_Cantons_appartenant_au_groupe_3,Groupes_de_cantons_Cantons_appartenant_au_groupe_3)
	));

var Titre_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new Array("N°","Libellé");

	/* Ce composant représente: des éléments de la table groupecanton sous le nom "Liste des groupes de cantons" */
var Compo_Groupes_de_cantons_Liste_des_groupes_de_cantons0=new clCompoListe(Groupes_de_cantons_Liste_des_groupes_de_cantons0,new Array(new clInterfaceFiltrageVide()),Titre_Groupes_de_cantons_Liste_des_groupes_de_cantons0,"Liste des groupes de cantons",true,false);
var Col_N0_Nom_De_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clAttribut("ct_nom","canton",null);

var Col_N1_N__De_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clAttribut("ct_numero","canton",null);

var Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clEnsembleAttributs("canton",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Groupes_de_cantons_Indpt_Cantons_disponibles_2)
	,new clLiaison(null,Col_N1_N__De_Groupes_de_cantons_Indpt_Cantons_disponibles_2)
	),
	null);

var Titre_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new Array("Nom","N°");

	/* Ce composant représente: des éléments de la table canton sous le nom "Cantons disponibles" */
var Compo_Groupes_de_cantons_Indpt_Cantons_disponibles_2=new clCompoListe(Groupes_de_cantons_Indpt_Cantons_disponibles_2,new Array(new clInterfaceFiltrageVide()),Titre_Groupes_de_cantons_Indpt_Cantons_disponibles_2,"Cantons disponibles",true,true);

	/* Ce composant représente: groupecanton.undefined sous le nom "Liste des groupes de cantons" */
 if(ALeDroit(0,"groupecanton"))
 {
Compo_Groupes_de_cantons_Liste_des_groupes_de_cantons0.GenererXUL(top.document.getElementById("Groupes_de_cantons_Liste_des_groupes_de_cantons0"));

 }

	/* On l'ajoute au tableau global à l'indice 1015*/
top.TAB_GLOBAL_COMPO[1015]=Compo_Groupes_de_cantons_Liste_des_groupes_de_cantons0;

	/* Ce composant représente: des éléments de la table groupecanton sous le nom "Libellé" */
 if(ALeDroit(0,"groupecanton"))
 {
Compo_Groupes_de_cantons_Libellé_1.GenererXUL(top.document.getElementById("Groupes_de_cantons_Liste_des_groupes_de_cantons0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1018*/
top.TAB_GLOBAL_COMPO[1018]=Compo_Groupes_de_cantons_Libellé_1;

	/* Ce composant représente: canton.undefined sous le nom "Cantons disponibles" */
 if(ALeDroit(0,"canton"))
 {
Compo_Groupes_de_cantons_Indpt_Cantons_disponibles_2.GenererXUL(top.document.getElementById("ListeDessus_Groupes_de_cantons_Cantons_appartenant_au_groupe_3"));

 }

	/* On l'ajoute au tableau global à l'indice 1019*/
top.TAB_GLOBAL_COMPO[1019]=Compo_Groupes_de_cantons_Indpt_Cantons_disponibles_2;

	/* Ce composant représente: canton.undefined sous le nom "Cantons appartenant au groupe" */
 if(ALeDroit(0,"canton"))
 {
Compo_Groupes_de_cantons_Cantons_appartenant_au_groupe_3.GenererXUL(top.document.getElementById("Groupes_de_cantons_Cantons_appartenant_au_groupe_3"));

 }

	/* On l'ajoute au tableau global à l'indice 1022*/
top.TAB_GLOBAL_COMPO[1022]=Compo_Groupes_de_cantons_Cantons_appartenant_au_groupe_3;
var Col_N0_N__De_Modèles_d_impressions_Liste_des_modèles_d_impressions0=new clAttribut("im_numero","impression",null);

var Col_N1_Libellé_De_Modèles_d_impressions_Liste_des_modèles_d_impressions0=new clAttribut("im_libelle","impression",null);

var Modèles_d_impressions_Libellé_1=new clAttribut("im_libelle","impression",null);


	/* Ce composant représente: impression.im_libelle sous le nom "Libellé" */
var Compo_Modèles_d_impressions_Libellé_1=new clCompoTextBox(Modèles_d_impressions_Libellé_1,null,"Libellé",false,false);
var Modèles_d_impressions_Nom_logique_2=new clAttribut("im_nom","impression",null);


	/* Ce composant représente: impression.im_nom sous le nom "Nom logique" */
var Compo_Modèles_d_impressions_Nom_logique_2=new clCompoTextBox(Modèles_d_impressions_Nom_logique_2,null,"Nom logique",false,false);
var Modèles_d_impressions_Modèle_3=new clAttribut("im_modele","impression",null);


	/* Ce composant représente: impression.im_modele sous le nom "Modèle" */
var Compo_Modèles_d_impressions_Modèle_3=new clCompoTextBox(Modèles_d_impressions_Modèle_3,null,"Modèle",false,true);
var Modèles_d_impressions_Modèle_utilisé_par_défaut_4=new clAttribut("im_defaut","impression",null);


	/* Ce composant représente: impression.im_defaut sous le nom "Modèle utilisé par défaut" */
var Compo_Modèles_d_impressions_Modèle_utilisé_par_défaut_4=new clCompoCheckBox(Modèles_d_impressions_Modèle_utilisé_par_défaut_4,null,"Modèle utilisé par défaut");
var Modèles_d_impressions_Table_utilisée_5=new clAttribut("im_keytable","impression",null);


	/* Ce composant représente: impression.im_keytable sous le nom "Table utilisée" */
var Compo_Modèles_d_impressions_Table_utilisée_5=new clCompoTextBox(Modèles_d_impressions_Table_utilisée_5,null,"Table utilisée",false,false);
var Modèles_d_impressions_Sa_clé_6=new clAttribut("im_keycle","impression",null);


	/* Ce composant représente: impression.im_keycle sous le nom "Sa clé" */
var Compo_Modèles_d_impressions_Sa_clé_6=new clCompoTextBox(Modèles_d_impressions_Sa_clé_6,null,"Sa clé",false,false);
var Modèles_d_impressions_Son_champs_date_7=new clAttribut("im_keydate","impression",null);


	/* Ce composant représente: impression.im_keydate sous le nom "Son champs date" */
var Compo_Modèles_d_impressions_Son_champs_date_7=new clCompoTextBox(Modèles_d_impressions_Son_champs_date_7,null,"Son champs date",false,false);
var Modèles_d_impressions_Liste_des_modèles_d_impressions0=new clEnsembleAttributs("impression",
	new Array(
	new clLiaison(null,Col_N0_N__De_Modèles_d_impressions_Liste_des_modèles_d_impressions0)
	,new clLiaison(null,Col_N1_Libellé_De_Modèles_d_impressions_Liste_des_modèles_d_impressions0)
	),
	new Array(
	new clLiaison(null,Modèles_d_impressions_Libellé_1)
	,new clLiaison(null,Modèles_d_impressions_Nom_logique_2)
	,new clLiaison(null,Modèles_d_impressions_Modèle_3)
	,new clLiaison(null,Modèles_d_impressions_Modèle_utilisé_par_défaut_4)
	,new clLiaison(null,Modèles_d_impressions_Table_utilisée_5)
	,new clLiaison(null,Modèles_d_impressions_Sa_clé_6)
	,new clLiaison(null,Modèles_d_impressions_Son_champs_date_7)
	));

var Titre_Modèles_d_impressions_Liste_des_modèles_d_impressions0=new Array("N°","Libellé");

	/* Ce composant représente: des éléments de la table impression sous le nom "Liste des modèles d'impressions" */
var Compo_Modèles_d_impressions_Liste_des_modèles_d_impressions0=new clCompoListe(Modèles_d_impressions_Liste_des_modèles_d_impressions0,new Array(new clInterfaceFiltrageVide()),Titre_Modèles_d_impressions_Liste_des_modèles_d_impressions0,"Liste des modèles d'impressions",true,false);

	/* Ce composant représente: impression.undefined sous le nom "Liste des modèles d'impressions" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Liste_des_modèles_d_impressions0.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0"));

 }

	/* On l'ajoute au tableau global à l'indice 1241*/
top.TAB_GLOBAL_COMPO[1241]=Compo_Modèles_d_impressions_Liste_des_modèles_d_impressions0;

	/* Ce composant représente: des éléments de la table impression sous le nom "Libellé" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Libellé_1.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1244*/
top.TAB_GLOBAL_COMPO[1244]=Compo_Modèles_d_impressions_Libellé_1;

	/* Ce composant représente: des éléments de la table impression sous le nom "Nom logique" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Nom_logique_2.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1245*/
top.TAB_GLOBAL_COMPO[1245]=Compo_Modèles_d_impressions_Nom_logique_2;

	/* Ce composant représente: des éléments de la table impression sous le nom "Modèle" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Modèle_3.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1246*/
top.TAB_GLOBAL_COMPO[1246]=Compo_Modèles_d_impressions_Modèle_3;

	/* Ce composant représente: des éléments de la table impression sous le nom "Modèle utilisé par défaut" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Modèle_utilisé_par_défaut_4.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1247*/
top.TAB_GLOBAL_COMPO[1247]=Compo_Modèles_d_impressions_Modèle_utilisé_par_défaut_4;

	/* Ce composant représente: des éléments de la table impression sous le nom "Table utilisée" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Table_utilisée_5.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1248*/
top.TAB_GLOBAL_COMPO[1248]=Compo_Modèles_d_impressions_Table_utilisée_5;

	/* Ce composant représente: des éléments de la table impression sous le nom "Sa clé" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Sa_clé_6.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1249*/
top.TAB_GLOBAL_COMPO[1249]=Compo_Modèles_d_impressions_Sa_clé_6;

	/* Ce composant représente: des éléments de la table impression sous le nom "Son champs date" */
 if(ALeDroit(0,"impression"))
 {
Compo_Modèles_d_impressions_Son_champs_date_7.GenererXUL(top.document.getElementById("Modèles_d_impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1250*/
top.TAB_GLOBAL_COMPO[1250]=Compo_Modèles_d_impressions_Son_champs_date_7;
var Col_N0_Libellé_De_Impressions_Liste_des_modèles_d_impressions0=new clAttribut("im_libelle","table_impression",null);

var Col_N1_Société_De_Impressions_Liste_des_modèles_d_impressions0=new clAttribut("so_libelle","societe",null);

var Joint_Col_N1_Société_De_Impressions_Liste_des_modèles_d_impressions0=new clJointureMulti("table_impression",
	new Array(
	new stJointure("societe","im_societe","so_numero",null,true)
	));
var Impressions_Société_1=new clAttribut("so_libelle","societe",null);


	/* Ce composant représente: societe.so_libelle sous le nom "Société" */
var Compo_Impressions_Société_1=new clCompoListeDeroulanteSimple(Impressions_Société_1,null,"Société");
var Joint_Esclave_Impressions_Société_1=new clJointureMulti("table_impression",
	new Array(
	new stJointure("societe","im_societe","so_numero",null,false)
	));
var Impressions_Libellé_2=new clAttribut("im_libelle","table_impression",null);


	/* Ce composant représente: table_impression.im_libelle sous le nom "Libellé" */
var Compo_Impressions_Libellé_2=new clCompoTextBox(Impressions_Libellé_2,null,"Libellé",false,false);
var Impressions_Nom_logique_3=new clAttribut("im_nom","table_impression",null);


	/* Ce composant représente: table_impression.im_nom sous le nom "Nom logique" */
var Compo_Impressions_Nom_logique_3=new clCompoTextBox(Impressions_Nom_logique_3,null,"Nom logique",false,false);
var Impressions_Modèle_4=new clAttribut("im_modele","table_impression",null);


	/* Ce composant représente: table_impression.im_modele sous le nom "Modèle" */
var Compo_Impressions_Modèle_4=new clCompoTextBox(Impressions_Modèle_4,null,"Modèle",false,true);
var Impressions_Modèle_utilisé_par_défaut_5=new clAttribut("im_defaut","table_impression",null);


	/* Ce composant représente: table_impression.im_defaut sous le nom "Modèle utilisé par défaut" */
var Compo_Impressions_Modèle_utilisé_par_défaut_5=new clCompoCheckBox(Impressions_Modèle_utilisé_par_défaut_5,null,"Modèle utilisé par défaut");
var Impressions_Table_utilisée_6=new clAttribut("im_keytable","table_impression",null);


	/* Ce composant représente: table_impression.im_keytable sous le nom "Table utilisée" */
var Compo_Impressions_Table_utilisée_6=new clCompoTextBox(Impressions_Table_utilisée_6,null,"Table utilisée",false,false);
var Impressions_Sa_clé_7=new clAttribut("im_keycle","table_impression",null);


	/* Ce composant représente: table_impression.im_keycle sous le nom "Sa clé" */
var Compo_Impressions_Sa_clé_7=new clCompoTextBox(Impressions_Sa_clé_7,null,"Sa clé",false,false);
var Impressions_Son_champs_date_8=new clAttribut("im_keydate","table_impression",null);


	/* Ce composant représente: table_impression.im_keydate sous le nom "Son champs date" */
var Compo_Impressions_Son_champs_date_8=new clCompoTextBox(Impressions_Son_champs_date_8,null,"Son champs date",false,false);
var Impressions_Liste_des_modèles_d_impressions0=new clEnsembleAttributs("table_impression",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Impressions_Liste_des_modèles_d_impressions0)
	,new clLiaison(Joint_Col_N1_Société_De_Impressions_Liste_des_modèles_d_impressions0,Col_N1_Société_De_Impressions_Liste_des_modèles_d_impressions0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Impressions_Société_1,Impressions_Société_1)
	,new clLiaison(null,Impressions_Libellé_2)
	,new clLiaison(null,Impressions_Nom_logique_3)
	,new clLiaison(null,Impressions_Modèle_4)
	,new clLiaison(null,Impressions_Modèle_utilisé_par_défaut_5)
	,new clLiaison(null,Impressions_Table_utilisée_6)
	,new clLiaison(null,Impressions_Sa_clé_7)
	,new clLiaison(null,Impressions_Son_champs_date_8)
	));

var Titre_Impressions_Liste_des_modèles_d_impressions0=new Array("Libellé","Société");

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Liste des modèles d'impressions" */
var Compo_Impressions_Liste_des_modèles_d_impressions0=new clCompoListe(Impressions_Liste_des_modèles_d_impressions0,new Array(new clInterfaceFiltrageVide()),Titre_Impressions_Liste_des_modèles_d_impressions0,"Liste des modèles d'impressions",true,false);

	/* Ce composant représente: table_impression.undefined sous le nom "Liste des modèles d'impressions" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Liste_des_modèles_d_impressions0.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0"));

 }

	/* On l'ajoute au tableau global à l'indice 1251*/
top.TAB_GLOBAL_COMPO[1251]=Compo_Impressions_Liste_des_modèles_d_impressions0;

	/* Ce composant représente: des éléments de la table societe sous le nom "Société" */
 if(ALeDroit(0,"societe"))
 {
Compo_Impressions_Société_1.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1254*/
top.TAB_GLOBAL_COMPO[1254]=Compo_Impressions_Société_1;

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Libellé" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Libellé_2.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1255*/
top.TAB_GLOBAL_COMPO[1255]=Compo_Impressions_Libellé_2;

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Nom logique" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Nom_logique_3.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1256*/
top.TAB_GLOBAL_COMPO[1256]=Compo_Impressions_Nom_logique_3;

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Modèle" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Modèle_4.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1257*/
top.TAB_GLOBAL_COMPO[1257]=Compo_Impressions_Modèle_4;

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Modèle utilisé par défaut" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Modèle_utilisé_par_défaut_5.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1258*/
top.TAB_GLOBAL_COMPO[1258]=Compo_Impressions_Modèle_utilisé_par_défaut_5;

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Table utilisée" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Table_utilisée_6.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1259*/
top.TAB_GLOBAL_COMPO[1259]=Compo_Impressions_Table_utilisée_6;

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Sa clé" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Sa_clé_7.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1260*/
top.TAB_GLOBAL_COMPO[1260]=Compo_Impressions_Sa_clé_7;

	/* Ce composant représente: des éléments de la table table_impression sous le nom "Son champs date" */
 if(ALeDroit(0,"table_impression"))
 {
Compo_Impressions_Son_champs_date_8.GenererXUL(top.document.getElementById("Impressions_Liste_des_modèles_d_impressions0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1261*/
top.TAB_GLOBAL_COMPO[1261]=Compo_Impressions_Son_champs_date_8;
var Col_N0_Libellé_De_Modèles_Liste_des_modèles0=new clAttribut("mo_libelle","modele",null);

var Modèles_Libellé_1=new clAttribut("mo_libelle","modele",null);


	/* Ce composant représente: modele.mo_libelle sous le nom "Libellé" */
var Compo_Modèles_Libellé_1=new clCompoTextBox(Modèles_Libellé_1,null,"Libellé",false,false);
var Col_N0_Produit_De_Modèles_Lignes_du_modèle_2=new clAttribut("pd_libelle","produit",null);

var Joint_Col_N0_Produit_De_Modèles_Lignes_du_modèle_2=new clJointureMulti("lignemodele",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,true)
	));
var Col_N1_Montant_HT_De_Modèles_Lignes_du_modèle_2=new clAttribut("lm_montantht","lignemodele",null);

var Col_N2_Montant_TTC_De_Modèles_Lignes_du_modèle_2=new clAttribut("lm_montantttc","lignemodele",null);

var Col_N3_Qté__De_Modèles_Lignes_du_modèle_2=new clAttribut("lm_quantite","lignemodele",null);

var Modèles_Produit_3=new clAttribut("pd_libelle","produit",null);


	/* Ce composant représente: produit.pd_libelle sous le nom "Produit" */
var Compo_Modèles_Produit_3=new clCompoListeDeroulanteSimple(Modèles_Produit_3,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Produits_1=new clInterfaceFiltrageRelationOnglet("Produits",Gerer_Produits,OuvrirOnglet_Modèles)),"Produit");
var Joint_Esclave_Modèles_Produit_3=new clJointureMulti("lignemodele",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,false)
	));
var Modèles_Montant_HT_4=new clAttribut("lm_montantht","lignemodele",null);


	/* Ce composant représente: lignemodele.lm_montantht sous le nom "Montant HT" */
var Compo_Modèles_Montant_HT_4=new clCompoTextBox(Modèles_Montant_HT_4,null,"Montant HT",false,false);
var Modèles_Montant_TTC_5=new clAttribut("lm_montantttc","lignemodele",null);


	/* Ce composant représente: lignemodele.lm_montantttc sous le nom "Montant TTC" */
var Compo_Modèles_Montant_TTC_5=new clCompoTextBox(Modèles_Montant_TTC_5,null,"Montant TTC",false,false);
var Modèles_Quantité_6=new clAttribut("lm_quantite","lignemodele",null);


	/* Ce composant représente: lignemodele.lm_quantite sous le nom "Quantité" */
var Compo_Modèles_Quantité_6=new clCompoTextBox(Modèles_Quantité_6,null,"Quantité",false,false);
var Modèles_Lignes_du_modèle_2=new clEnsembleAttributs("lignemodele",
	new Array(
	new clLiaison(Joint_Col_N0_Produit_De_Modèles_Lignes_du_modèle_2,Col_N0_Produit_De_Modèles_Lignes_du_modèle_2)
	,new clLiaison(null,Col_N1_Montant_HT_De_Modèles_Lignes_du_modèle_2)
	,new clLiaison(null,Col_N2_Montant_TTC_De_Modèles_Lignes_du_modèle_2)
	,new clLiaison(null,Col_N3_Qté__De_Modèles_Lignes_du_modèle_2)
	),
	new Array(
	new clLiaison(Joint_Esclave_Modèles_Produit_3,Modèles_Produit_3)
	,new clLiaison(null,Modèles_Montant_HT_4)
	,new clLiaison(null,Modèles_Montant_TTC_5)
	,new clLiaison(null,Modèles_Quantité_6)
	));

var Titre_Modèles_Lignes_du_modèle_2=new Array("Produit","Montant HT","Montant TTC","Qté.");

	/* Ce composant représente: des éléments de la table lignemodele sous le nom "Lignes du modèle" */
var Compo_Modèles_Lignes_du_modèle_2=new clCompoListe(Modèles_Lignes_du_modèle_2,null,Titre_Modèles_Lignes_du_modèle_2,"Lignes du modèle",true,false);
var Joint_Esclave_Modèles_Lignes_du_modèle_2=new clJointureMulti("modele",
	new Array(
	new stJointure("lignemodele","mo_numero","mo_numero",null,false)
	));
var Modèles_Liste_des_modèles0=new clEnsembleAttributs("modele",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Modèles_Liste_des_modèles0)
	),
	new Array(
	new clLiaison(null,Modèles_Libellé_1)
	,new clLiaison(Joint_Esclave_Modèles_Lignes_du_modèle_2,Modèles_Lignes_du_modèle_2)
	));

var Titre_Modèles_Liste_des_modèles0=new Array("Libellé");

	/* Ce composant représente: des éléments de la table modele sous le nom "Liste des modèles" */
var Compo_Modèles_Liste_des_modèles0=new clCompoListe(Modèles_Liste_des_modèles0,new Array(new clInterfaceFiltrageVide()),Titre_Modèles_Liste_des_modèles0,"Liste des modèles",true,false);

	/* Ce composant représente: modele.undefined sous le nom "Liste des modèles" */
 if(ALeDroit(0,"modele"))
 {
Compo_Modèles_Liste_des_modèles0.GenererXUL(top.document.getElementById("Modèles_Liste_des_modèles0"));

 }

	/* On l'ajoute au tableau global à l'indice 1229*/
top.TAB_GLOBAL_COMPO[1229]=Compo_Modèles_Liste_des_modèles0;

	/* Ce composant représente: des éléments de la table modele sous le nom "Libellé" */
 if(ALeDroit(0,"modele"))
 {
Compo_Modèles_Libellé_1.GenererXUL(top.document.getElementById("Modèles_Liste_des_modèles0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1231*/
top.TAB_GLOBAL_COMPO[1231]=Compo_Modèles_Libellé_1;

	/* Ce composant représente: lignemodele.undefined sous le nom "Lignes du modèle" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Modèles_Lignes_du_modèle_2.GenererXUL(top.document.getElementById("Modèles_Lignes_du_modèle_2"));

 }

	/* On l'ajoute au tableau global à l'indice 1232*/
top.TAB_GLOBAL_COMPO[1232]=Compo_Modèles_Lignes_du_modèle_2;

	/* Ce composant représente: des éléments de la table produit sous le nom "Produit" */
 if(ALeDroit(0,"produit"))
 {
Compo_Modèles_Produit_3.GenererXUL(top.document.getElementById("Modèles_Lignes_du_modèle_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1237*/
top.TAB_GLOBAL_COMPO[1237]=Compo_Modèles_Produit_3;

	/* Ce composant représente: des éléments de la table lignemodele sous le nom "Montant HT" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Modèles_Montant_HT_4.GenererXUL(top.document.getElementById("Modèles_Lignes_du_modèle_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1238*/
top.TAB_GLOBAL_COMPO[1238]=Compo_Modèles_Montant_HT_4;

	/* Ce composant représente: des éléments de la table lignemodele sous le nom "Montant TTC" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Modèles_Montant_TTC_5.GenererXUL(top.document.getElementById("Modèles_Lignes_du_modèle_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1239*/
top.TAB_GLOBAL_COMPO[1239]=Compo_Modèles_Montant_TTC_5;

	/* Ce composant représente: des éléments de la table lignemodele sous le nom "Quantité" */
 if(ALeDroit(0,"lignemodele"))
 {
Compo_Modèles_Quantité_6.GenererXUL(top.document.getElementById("Modèles_Lignes_du_modèle_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1240*/
top.TAB_GLOBAL_COMPO[1240]=Compo_Modèles_Quantité_6;
var Col_N0_N__De_Mode_de_réglements_Liste_des_modes_de_réglement0=new clAttribut("mr_numero","modereglement",null);

var Col_N1_Libellé_De_Mode_de_réglements_Liste_des_modes_de_réglement0=new clAttribut("mr_libelle","modereglement",null);

var Col_N2_N_Compte_De_Mode_de_réglements_Liste_des_modes_de_réglement0=new clAttribut("cg_numcompte","comptegen",null);

var Joint_Col_N2_N_Compte_De_Mode_de_réglements_Liste_des_modes_de_réglement0=new clJointureMulti("modereglement",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Mode_de_réglements_Libellé_1=new clAttribut("mr_libelle","modereglement",null);


	/* Ce composant représente: modereglement.mr_libelle sous le nom "Libellé" */
var Compo_Mode_de_réglements_Libellé_1=new clCompoTextBox(Mode_de_réglements_Libellé_1,null,"Libellé",false,false);
var Mode_de_réglements_N_Compte_bancaire_2=new clAttribut("mr_compte","modereglement",null);


	/* Ce composant représente: modereglement.mr_compte sous le nom "N°Compte bancaire" */
var Compo_Mode_de_réglements_N_Compte_bancaire_2=new clCompoTextBox(Mode_de_réglements_N_Compte_bancaire_2,null,"N°Compte bancaire",false,false);
var Mode_de_réglements_Compte_général_3=new clAttribut("cg_numcompte","comptegen",null);


	/* Ce composant représente: comptegen.cg_numcompte sous le nom "Compte général" */
var Compo_Mode_de_réglements_Compte_général_3=new clCompoListeDeroulanteSimple(Mode_de_réglements_Compte_général_3,null,"Compte général");
var Joint_Esclave_Mode_de_réglements_Compte_général_3=new clJointureMulti("modereglement",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Mode_de_réglements_Ceci_est_un_mode_de_réglement_par_chèque_4=new clAttribut("mr_cheque","modereglement",null);


	/* Ce composant représente: modereglement.mr_cheque sous le nom "Ceci est un mode de réglement par chèque" */
var Compo_Mode_de_réglements_Ceci_est_un_mode_de_réglement_par_chèque_4=new clCompoCheckBox(Mode_de_réglements_Ceci_est_un_mode_de_réglement_par_chèque_4,null,"Ceci est un mode de réglement par chèque");
var Mode_de_réglements_Actif_5=new clAttribut("mr_actif","modereglement",null);


	/* Ce composant représente: modereglement.mr_actif sous le nom "Actif" */
var Compo_Mode_de_réglements_Actif_5=new clCompoCheckBox(Mode_de_réglements_Actif_5,null,"Actif");
var Mode_de_réglements_Description_6=new clAttribut("mr_description","modereglement",null);


	/* Ce composant représente: modereglement.mr_description sous le nom "Description" */
var Compo_Mode_de_réglements_Description_6=new clCompoTextBox(Mode_de_réglements_Description_6,null,"Description",false,true);
var Mode_de_réglements_Liste_des_modes_de_réglement0=new clEnsembleAttributs("modereglement",
	new Array(
	new clLiaison(null,Col_N0_N__De_Mode_de_réglements_Liste_des_modes_de_réglement0)
	,new clLiaison(null,Col_N1_Libellé_De_Mode_de_réglements_Liste_des_modes_de_réglement0)
	,new clLiaison(Joint_Col_N2_N_Compte_De_Mode_de_réglements_Liste_des_modes_de_réglement0,Col_N2_N_Compte_De_Mode_de_réglements_Liste_des_modes_de_réglement0)
	),
	new Array(
	new clLiaison(null,Mode_de_réglements_Libellé_1)
	,new clLiaison(null,Mode_de_réglements_N_Compte_bancaire_2)
	,new clLiaison(Joint_Esclave_Mode_de_réglements_Compte_général_3,Mode_de_réglements_Compte_général_3)
	,new clLiaison(null,Mode_de_réglements_Ceci_est_un_mode_de_réglement_par_chèque_4)
	,new clLiaison(null,Mode_de_réglements_Actif_5)
	,new clLiaison(null,Mode_de_réglements_Description_6)
	));

var Titre_Mode_de_réglements_Liste_des_modes_de_réglement0=new Array("N°","Libellé","N°Compte");

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Liste des modes de réglement" */
var Compo_Mode_de_réglements_Liste_des_modes_de_réglement0=new clCompoListe(Mode_de_réglements_Liste_des_modes_de_réglement0,new Array(new clInterfaceFiltrageVide()),Titre_Mode_de_réglements_Liste_des_modes_de_réglement0,"Liste des modes de réglement",true,false);

	/* Ce composant représente: modereglement.undefined sous le nom "Liste des modes de réglement" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_réglements_Liste_des_modes_de_réglement0.GenererXUL(top.document.getElementById("Mode_de_réglements_Liste_des_modes_de_réglement0"));

 }

	/* On l'ajoute au tableau global à l'indice 984*/
top.TAB_GLOBAL_COMPO[984]=Compo_Mode_de_réglements_Liste_des_modes_de_réglement0;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Libellé" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_réglements_Libellé_1.GenererXUL(top.document.getElementById("Mode_de_réglements_Liste_des_modes_de_réglement0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 988*/
top.TAB_GLOBAL_COMPO[988]=Compo_Mode_de_réglements_Libellé_1;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "N°Compte bancaire" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_réglements_N_Compte_bancaire_2.GenererXUL(top.document.getElementById("Mode_de_réglements_Liste_des_modes_de_réglement0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 989*/
top.TAB_GLOBAL_COMPO[989]=Compo_Mode_de_réglements_N_Compte_bancaire_2;

	/* Ce composant représente: des éléments de la table comptegen sous le nom "Compte général" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Mode_de_réglements_Compte_général_3.GenererXUL(top.document.getElementById("Mode_de_réglements_Liste_des_modes_de_réglement0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 990*/
top.TAB_GLOBAL_COMPO[990]=Compo_Mode_de_réglements_Compte_général_3;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Ceci est un mode de réglement par chèque" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_réglements_Ceci_est_un_mode_de_réglement_par_chèque_4.GenererXUL(top.document.getElementById("Mode_de_réglements_Liste_des_modes_de_réglement0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 991*/
top.TAB_GLOBAL_COMPO[991]=Compo_Mode_de_réglements_Ceci_est_un_mode_de_réglement_par_chèque_4;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Actif" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_réglements_Actif_5.GenererXUL(top.document.getElementById("Mode_de_réglements_Liste_des_modes_de_réglement0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 992*/
top.TAB_GLOBAL_COMPO[992]=Compo_Mode_de_réglements_Actif_5;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Description" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Mode_de_réglements_Description_6.GenererXUL(top.document.getElementById("Mode_de_réglements_Liste_des_modes_de_réglement0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 993*/
top.TAB_GLOBAL_COMPO[993]=Compo_Mode_de_réglements_Description_6;
var Col_N0_Libellé_De_Modes_de_répartition_Liste_des_modes_de_répartition0=new clAttribut("mp_libelle","moderepartition",null);

var Col_N1_N_Compte_De_Modes_de_répartition_Liste_des_modes_de_répartition0=new clAttribut("cg_numcompte","comptegen",null);

var Joint_Col_N1_N_Compte_De_Modes_de_répartition_Liste_des_modes_de_répartition0=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Col_N2_Société_De_Modes_de_répartition_Liste_des_modes_de_répartition0=new clAttribut("so_libelle","societe",null);

var Joint_Col_N2_Société_De_Modes_de_répartition_Liste_des_modes_de_répartition0=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("societe","mp_societe","so_numero",null,true)
	));
var Modes_de_répartition_Libellé_1=new clAttribut("mp_libelle","moderepartition",null);


	/* Ce composant représente: moderepartition.mp_libelle sous le nom "Libellé" */
var Compo_Modes_de_répartition_Libellé_1=new clCompoTextBox(Modes_de_répartition_Libellé_1,null,"Libellé",false,false);
var Modes_de_répartition_Compte_général_2=new clAttribut("cg_numcompte","comptegen",null);


	/* Ce composant représente: comptegen.cg_numcompte sous le nom "Compte général" */
var Compo_Modes_de_répartition_Compte_général_2=new clCompoListeDeroulanteSimple(Modes_de_répartition_Compte_général_2,null,"Compte général");
var Joint_Esclave_Modes_de_répartition_Compte_général_2=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Modes_de_répartition_Actif_3=new clAttribut("mp_actif","moderepartition",null);


	/* Ce composant représente: moderepartition.mp_actif sous le nom "Actif" */
var Compo_Modes_de_répartition_Actif_3=new clCompoCheckBox(Modes_de_répartition_Actif_3,null,"Actif");
var Modes_de_répartition_Société_visée_4=new clAttribut("so_libelle","societe",null);


	/* Ce composant représente: societe.so_libelle sous le nom "Société visée" */
var Compo_Modes_de_répartition_Société_visée_4=new clCompoListeDeroulanteSimple(Modes_de_répartition_Société_visée_4,null,"Société visée");
var Joint_Esclave_Modes_de_répartition_Société_visée_4=new clJointureMulti("moderepartition",
	new Array(
	new stJointure("societe","mp_societe","so_numero",null,false)
	));
var Modes_de_répartition_Description_5=new clAttribut("mp_description","moderepartition",null);


	/* Ce composant représente: moderepartition.mp_description sous le nom "Description" */
var Compo_Modes_de_répartition_Description_5=new clCompoTextBox(Modes_de_répartition_Description_5,null,"Description",false,true);
var Modes_de_répartition_Liste_des_modes_de_répartition0=new clEnsembleAttributs("moderepartition",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Modes_de_répartition_Liste_des_modes_de_répartition0)
	,new clLiaison(Joint_Col_N1_N_Compte_De_Modes_de_répartition_Liste_des_modes_de_répartition0,Col_N1_N_Compte_De_Modes_de_répartition_Liste_des_modes_de_répartition0)
	,new clLiaison(Joint_Col_N2_Société_De_Modes_de_répartition_Liste_des_modes_de_répartition0,Col_N2_Société_De_Modes_de_répartition_Liste_des_modes_de_répartition0)
	),
	new Array(
	new clLiaison(null,Modes_de_répartition_Libellé_1)
	,new clLiaison(Joint_Esclave_Modes_de_répartition_Compte_général_2,Modes_de_répartition_Compte_général_2)
	,new clLiaison(null,Modes_de_répartition_Actif_3)
	,new clLiaison(Joint_Esclave_Modes_de_répartition_Société_visée_4,Modes_de_répartition_Société_visée_4)
	,new clLiaison(null,Modes_de_répartition_Description_5)
	));

var Titre_Modes_de_répartition_Liste_des_modes_de_répartition0=new Array("Libellé","N°Compte","Société");

	/* Ce composant représente: des éléments de la table moderepartition sous le nom "Liste des modes de répartition" */
var Compo_Modes_de_répartition_Liste_des_modes_de_répartition0=new clCompoListe(Modes_de_répartition_Liste_des_modes_de_répartition0,new Array(new clInterfaceFiltrageVide()),Titre_Modes_de_répartition_Liste_des_modes_de_répartition0,"Liste des modes de répartition",true,false);

	/* Ce composant représente: moderepartition.undefined sous le nom "Liste des modes de répartition" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_répartition_Liste_des_modes_de_répartition0.GenererXUL(top.document.getElementById("Modes_de_répartition_Liste_des_modes_de_répartition0"));

 }

	/* On l'ajoute au tableau global à l'indice 994*/
top.TAB_GLOBAL_COMPO[994]=Compo_Modes_de_répartition_Liste_des_modes_de_répartition0;

	/* Ce composant représente: des éléments de la table moderepartition sous le nom "Libellé" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_répartition_Libellé_1.GenererXUL(top.document.getElementById("Modes_de_répartition_Liste_des_modes_de_répartition0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 998*/
top.TAB_GLOBAL_COMPO[998]=Compo_Modes_de_répartition_Libellé_1;

	/* Ce composant représente: des éléments de la table comptegen sous le nom "Compte général" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Modes_de_répartition_Compte_général_2.GenererXUL(top.document.getElementById("Modes_de_répartition_Liste_des_modes_de_répartition0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 999*/
top.TAB_GLOBAL_COMPO[999]=Compo_Modes_de_répartition_Compte_général_2;

	/* Ce composant représente: des éléments de la table moderepartition sous le nom "Actif" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_répartition_Actif_3.GenererXUL(top.document.getElementById("Modes_de_répartition_Liste_des_modes_de_répartition0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1000*/
top.TAB_GLOBAL_COMPO[1000]=Compo_Modes_de_répartition_Actif_3;

	/* Ce composant représente: des éléments de la table societe sous le nom "Société visée" */
 if(ALeDroit(0,"societe"))
 {
Compo_Modes_de_répartition_Société_visée_4.GenererXUL(top.document.getElementById("Modes_de_répartition_Liste_des_modes_de_répartition0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1001*/
top.TAB_GLOBAL_COMPO[1001]=Compo_Modes_de_répartition_Société_visée_4;

	/* Ce composant représente: des éléments de la table moderepartition sous le nom "Description" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Modes_de_répartition_Description_5.GenererXUL(top.document.getElementById("Modes_de_répartition_Liste_des_modes_de_répartition0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1002*/
top.TAB_GLOBAL_COMPO[1002]=Compo_Modes_de_répartition_Description_5;
var Col_N0_N__De_Natures_de_personne_Liste_des_états_de_personne0=new clAttribut("np_numero","naturepersonne",null);

var Col_N1_Nom_______De_Natures_de_personne_Liste_des_états_de_personne0=new clAttribut("np_nom","naturepersonne",null);

var Col_N2_Titre___De_Natures_de_personne_Liste_des_états_de_personne0=new clAttribut("np_abrev","naturepersonne",null);

var Col_N3_Genre_De_Natures_de_personne_Liste_des_états_de_personne0=new clAttribut("np_genre","naturepersonne",null);

var Natures_de_personne_Nom_1=new clAttribut("np_nom","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_nom sous le nom "Nom" */
var Compo_Natures_de_personne_Nom_1=new clCompoTextBox(Natures_de_personne_Nom_1,null,"Nom",false,false);
var Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2=new clAttribut("np_abrev","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_abrev sous le nom "Titre ou Abreviation de la forme juridique (sans point)" */
var Compo_Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2=new clCompoTextBox(Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2,null,"Titre ou Abreviation de la forme juridique (sans point)",false,false);
var Natures_de_personne_Entité_morale_3=new clAttribut("np_morale","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_morale sous le nom "Entité morale" */
var Compo_Natures_de_personne_Entité_morale_3=new clCompoCheckBox(Natures_de_personne_Entité_morale_3,null,"Entité morale");
var Natures_de_personne_Utilise_le_titre_abrev__4=new clAttribut("np_avectitre","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_avectitre sous le nom "Utilise le titre/abrev." */
var Compo_Natures_de_personne_Utilise_le_titre_abrev__4=new clCompoCheckBox(Natures_de_personne_Utilise_le_titre_abrev__4,null,"Utilise le titre/abrev.");
var Natures_de_personne_La_forme_juridique_doit_être_incluse_dans_la_désignation_sociale_5=new clAttribut("np_inclu","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_inclu sous le nom "La forme juridique doit être incluse dans la désignation sociale" */
var Compo_Natures_de_personne_La_forme_juridique_doit_être_incluse_dans_la_désignation_sociale_5=new clCompoCheckBox(Natures_de_personne_La_forme_juridique_doit_être_incluse_dans_la_désignation_sociale_5,null,"La forme juridique doit être incluse dans la désignation sociale");
var Natures_de_personne_Genre_6=new clAttribut("np_genre","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_genre sous le nom "Genre" */
var Compo_Natures_de_personne_Genre_6=new clCompoTextBox(Natures_de_personne_Genre_6,null,"Genre",false,false);
var Natures_de_personne_Liste_des_états_de_personne0=new clEnsembleAttributs("naturepersonne",
	new Array(
	new clLiaison(null,Col_N0_N__De_Natures_de_personne_Liste_des_états_de_personne0)
	,new clLiaison(null,Col_N1_Nom_______De_Natures_de_personne_Liste_des_états_de_personne0)
	,new clLiaison(null,Col_N2_Titre___De_Natures_de_personne_Liste_des_états_de_personne0)
	,new clLiaison(null,Col_N3_Genre_De_Natures_de_personne_Liste_des_états_de_personne0)
	),
	new Array(
	new clLiaison(null,Natures_de_personne_Nom_1)
	,new clLiaison(null,Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2)
	,new clLiaison(null,Natures_de_personne_Entité_morale_3)
	,new clLiaison(null,Natures_de_personne_Utilise_le_titre_abrev__4)
	,new clLiaison(null,Natures_de_personne_La_forme_juridique_doit_être_incluse_dans_la_désignation_sociale_5)
	,new clLiaison(null,Natures_de_personne_Genre_6)
	));

var Titre_Natures_de_personne_Liste_des_états_de_personne0=new Array("N°","Nom      ","Titre  ","Genre");

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Liste des états de personne" */
var Compo_Natures_de_personne_Liste_des_états_de_personne0=new clCompoListe(Natures_de_personne_Liste_des_états_de_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Natures_de_personne_Liste_des_états_de_personne0,"Liste des états de personne",true,false);

	/* Ce composant représente: naturepersonne.undefined sous le nom "Liste des états de personne" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Liste_des_états_de_personne0.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_états_de_personne0"));

 }

	/* On l'ajoute au tableau global à l'indice 1038*/
top.TAB_GLOBAL_COMPO[1038]=Compo_Natures_de_personne_Liste_des_états_de_personne0;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Nom" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Nom_1.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_états_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1043*/
top.TAB_GLOBAL_COMPO[1043]=Compo_Natures_de_personne_Nom_1;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Titre ou Abreviation de la forme juridique (sans point)" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_états_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1044*/
top.TAB_GLOBAL_COMPO[1044]=Compo_Natures_de_personne_Titre_ou_Abreviation_de_la_forme_juridique__sans_point__2;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Entité morale" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Entité_morale_3.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_états_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1045*/
top.TAB_GLOBAL_COMPO[1045]=Compo_Natures_de_personne_Entité_morale_3;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Utilise le titre/abrev." */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Utilise_le_titre_abrev__4.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_états_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1046*/
top.TAB_GLOBAL_COMPO[1046]=Compo_Natures_de_personne_Utilise_le_titre_abrev__4;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "La forme juridique doit être incluse dans la désignation sociale" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_La_forme_juridique_doit_être_incluse_dans_la_désignation_sociale_5.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_états_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1047*/
top.TAB_GLOBAL_COMPO[1047]=Compo_Natures_de_personne_La_forme_juridique_doit_être_incluse_dans_la_désignation_sociale_5;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Genre" */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Natures_de_personne_Genre_6.GenererXUL(top.document.getElementById("Natures_de_personne_Liste_des_états_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1048*/
top.TAB_GLOBAL_COMPO[1048]=Compo_Natures_de_personne_Genre_6;
var Col_N0_N__De_Périodes_Liste_des_périodes0=new clAttribut("po_numero","periode",null);

var Col_N1_Du_De_Périodes_Liste_des_périodes0=new clAttribut("po_debut","periode",null);

var Col_N2_Au_De_Périodes_Liste_des_périodes0=new clAttribut("po_fin","periode",null);

var Périodes_Du_1=new clAttribut("po_debut","periode",null);


	/* Ce composant représente: periode.po_debut sous le nom "Du" */
var Compo_Périodes_Du_1=new clCompoTextBox(Périodes_Du_1,null,"Du",false,false);
var Périodes_Au_2=new clAttribut("po_fin","periode",null);


	/* Ce composant représente: periode.po_fin sous le nom "Au" */
var Compo_Périodes_Au_2=new clCompoTextBox(Périodes_Au_2,null,"Au",false,false);
var Périodes_Liste_des_périodes0=new clEnsembleAttributs("periode",
	new Array(
	new clLiaison(null,Col_N0_N__De_Périodes_Liste_des_périodes0)
	,new clLiaison(null,Col_N1_Du_De_Périodes_Liste_des_périodes0)
	,new clLiaison(null,Col_N2_Au_De_Périodes_Liste_des_périodes0)
	),
	new Array(
	new clLiaison(null,Périodes_Du_1)
	,new clLiaison(null,Périodes_Au_2)
	));

var Titre_Périodes_Liste_des_périodes0=new Array("N°","Du","Au");

	/* Ce composant représente: des éléments de la table periode sous le nom "Liste des périodes" */
var Compo_Périodes_Liste_des_périodes0=new clCompoListe(Périodes_Liste_des_périodes0,new Array(new clInterfaceFiltrageVide()),Titre_Périodes_Liste_des_périodes0,"Liste des périodes",true,false);

	/* Ce composant représente: periode.undefined sous le nom "Liste des périodes" */
 if(ALeDroit(0,"periode"))
 {
Compo_Périodes_Liste_des_périodes0.GenererXUL(top.document.getElementById("Périodes_Liste_des_périodes0"));

 }

	/* On l'ajoute au tableau global à l'indice 1217*/
top.TAB_GLOBAL_COMPO[1217]=Compo_Périodes_Liste_des_périodes0;

	/* Ce composant représente: des éléments de la table periode sous le nom "Du" */
 if(ALeDroit(0,"periode"))
 {
Compo_Périodes_Du_1.GenererXUL(top.document.getElementById("Périodes_Liste_des_périodes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1221*/
top.TAB_GLOBAL_COMPO[1221]=Compo_Périodes_Du_1;

	/* Ce composant représente: des éléments de la table periode sous le nom "Au" */
 if(ALeDroit(0,"periode"))
 {
Compo_Périodes_Au_2.GenererXUL(top.document.getElementById("Périodes_Liste_des_périodes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1222*/
top.TAB_GLOBAL_COMPO[1222]=Compo_Périodes_Au_2;
var Col_N0_Nom_De_Préfixes_Liste_des_préfixes0=new clAttribut("pf_nom","prefixe",null);

var Préfixes_Nom_1=new clAttribut("pf_nom","prefixe",null);


	/* Ce composant représente: prefixe.pf_nom sous le nom "Nom" */
var Compo_Préfixes_Nom_1=new clCompoTextBox(Préfixes_Nom_1,null,"Nom",false,false);
var Préfixes_Liste_des_préfixes0=new clEnsembleAttributs("prefixe",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Préfixes_Liste_des_préfixes0)
	),
	new Array(
	new clLiaison(null,Préfixes_Nom_1)
	));

var Titre_Préfixes_Liste_des_préfixes0=new Array("Nom");

	/* Ce composant représente: des éléments de la table prefixe sous le nom "Liste des préfixes" */
var Compo_Préfixes_Liste_des_préfixes0=new clCompoListe(Préfixes_Liste_des_préfixes0,new Array(new clInterfaceFiltrageVide()),Titre_Préfixes_Liste_des_préfixes0,"Liste des préfixes",true,false);

	/* Ce composant représente: prefixe.undefined sous le nom "Liste des préfixes" */
 if(ALeDroit(0,"prefixe"))
 {
Compo_Préfixes_Liste_des_préfixes0.GenererXUL(top.document.getElementById("Préfixes_Liste_des_préfixes0"));

 }

	/* On l'ajoute au tableau global à l'indice 1226*/
top.TAB_GLOBAL_COMPO[1226]=Compo_Préfixes_Liste_des_préfixes0;

	/* Ce composant représente: des éléments de la table prefixe sous le nom "Nom" */
 if(ALeDroit(0,"prefixe"))
 {
Compo_Préfixes_Nom_1.GenererXUL(top.document.getElementById("Préfixes_Liste_des_préfixes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1228*/
top.TAB_GLOBAL_COMPO[1228]=Compo_Préfixes_Nom_1;
var Col_N0_Etat_De_Produits_Liste_des_produits0=new clAttribut("pd_etat","produit",null);

var Col_N1_Libellé_De_Produits_Liste_des_produits0=new clAttribut("pd_libelle","produit",null);

var Produits_Libellé__en_interne__1=new clAttribut("pd_libelle","produit",null);


	/* Ce composant représente: produit.pd_libelle sous le nom "Libellé (en interne)" */
var Compo_Produits_Libellé__en_interne__1=new clCompoTextBox(Produits_Libellé__en_interne__1,null,"Libellé (en interne)",false,false);
var Produits_Titre__pour_les_impressions__2=new clAttribut("pd_titre","produit",null);


	/* Ce composant représente: produit.pd_titre sous le nom "Titre (pour les impressions)" */
var Compo_Produits_Titre__pour_les_impressions__2=new clCompoTextBox(Produits_Titre__pour_les_impressions__2,null,"Titre (pour les impressions)",false,false);
var Produits_Journal_comptable_3=new clAttribut("jo_libelle","journal",null);


	/* Ce composant représente: journal.jo_libelle sous le nom "Journal comptable" */
var Compo_Produits_Journal_comptable_3=new clCompoListeDeroulanteSimple(Produits_Journal_comptable_3,null,"Journal comptable");
var Joint_Esclave_Produits_Journal_comptable_3=new clJointureMulti("produit",
	new Array(
	new stJointure("journal","jo_numero","jo_numero",null,false)
	));
var Produits_Actif_4=new clAttribut("pd_actif","produit",null);


	/* Ce composant représente: produit.pd_actif sous le nom "Actif" */
var Compo_Produits_Actif_4=new clCompoCheckBox(Produits_Actif_4,null,"Actif");
var Produits_Produit_non_quantifiable__Quantité_1__5=new clAttribut("pd_sansquantite","produit",null);


	/* Ce composant représente: produit.pd_sansquantite sous le nom "Produit non quantifiable (Quantité=1)" */
var Compo_Produits_Produit_non_quantifiable__Quantité_1__5=new clCompoCheckBox(Produits_Produit_non_quantifiable__Quantité_1__5,null,"Produit non quantifiable (Quantité=1)");
var Produits_Soumis_à_de_potentielles_réductions_6=new clAttribut("pd_reduction","produit",null);


	/* Ce composant représente: produit.pd_reduction sous le nom "Soumis à de potentielles réductions" */
var Compo_Produits_Soumis_à_de_potentielles_réductions_6=new clCompoCheckBox(Produits_Soumis_à_de_potentielles_réductions_6,null,"Soumis à de potentielles réductions");
var Col_N0_Tarif_HT_De_Produits_Prix_7=new clAttribut("px_tarifht","prix",null);

var Col_N1_Tarif_TTC_De_Produits_Prix_7=new clAttribut("px_tarifttc","prix",null);

var Col_N2_T_V_A__De_Produits_Prix_7=new clAttribut("tv_pourcentage","tva",null);

var Joint_Col_N2_T_V_A__De_Produits_Prix_7=new clJointureMulti("prix",
	new Array(
	new stJointure("tva","tv_numero","tv_numero",null,true)
	));
var Col_N3_Date_application_De_Produits_Prix_7=new clAttribut("px_datedebut","prix",null);

var Produits_Tarif_H_T__8=new clAttribut("px_tarifht","prix",null);


	/* Ce composant représente: prix.px_tarifht sous le nom "Tarif H.T." */
var Compo_Produits_Tarif_H_T__8=new clCompoTextBox(Produits_Tarif_H_T__8,null,"Tarif H.T.",false,false);
var Produits_Tarif_T_T_C__9=new clAttribut("px_tarifttc","prix",null);


	/* Ce composant représente: prix.px_tarifttc sous le nom "Tarif T.T.C." */
var Compo_Produits_Tarif_T_T_C__9=new clCompoTextBox(Produits_Tarif_T_T_C__9,null,"Tarif T.T.C.",false,false);
var Produits_T_V_A__10=new clAttribut("tv_pourcentage","tva",null);


	/* Ce composant représente: tva.tv_pourcentage sous le nom "T.V.A." */
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

	/* Ce composant représente: des éléments de la table prix sous le nom "Prix" */
var Compo_Produits_Prix_7=new clCompoListe(Produits_Prix_7,null,Titre_Produits_Prix_7,"Prix",true,false);
var Joint_Esclave_Produits_Prix_7=new clJointureMulti("produit",
	new Array(
	new stJointure("prix","pd_numero","pd_numero",null,false)
	));
var Col_N0_N__Compte_De_Produits_Comptes_généraux_11=new clAttribut("cg_numcompte","comptegen",null);

var Joint_Col_N0_N__Compte_De_Produits_Comptes_généraux_11=new clJointureMulti("compteproduit",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Col_N1_Libellé_De_Produits_Comptes_généraux_11=new clAttribut("cg_libelle","comptegen",null);

var Joint_Col_N1_Libellé_De_Produits_Comptes_généraux_11=new clJointureMulti("compteproduit",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,true)
	));
var Produits_Compte_12=new clAttribut("cg_nom","comptegen",null);


	/* Ce composant représente: comptegen.cg_nom sous le nom "Compte" */
var Compo_Produits_Compte_12=new clCompoListeDeroulanteSimple(Produits_Compte_12,null,"Compte");
var Joint_Esclave_Produits_Compte_12=new clJointureMulti("compteproduit",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var Produits_Actif_13=new clAttribut("ci_actif","compteproduit",null);


	/* Ce composant représente: compteproduit.ci_actif sous le nom "Actif" */
var Compo_Produits_Actif_13=new clCompoCheckBox(Produits_Actif_13,null,"Actif");
var Produits_Comptes_généraux_11=new clEnsembleAttributs("compteproduit",
	new Array(
	new clLiaison(Joint_Col_N0_N__Compte_De_Produits_Comptes_généraux_11,Col_N0_N__Compte_De_Produits_Comptes_généraux_11)
	,new clLiaison(Joint_Col_N1_Libellé_De_Produits_Comptes_généraux_11,Col_N1_Libellé_De_Produits_Comptes_généraux_11)
	),
	new Array(
	new clLiaison(Joint_Esclave_Produits_Compte_12,Produits_Compte_12)
	,new clLiaison(null,Produits_Actif_13)
	));

var Titre_Produits_Comptes_généraux_11=new Array("N° Compte","Libellé");

	/* Ce composant représente: des éléments de la table compteproduit sous le nom "Comptes généraux" */
var Compo_Produits_Comptes_généraux_11=new clCompoListe(Produits_Comptes_généraux_11,null,Titre_Produits_Comptes_généraux_11,"Comptes généraux",true,false);
var Joint_Esclave_Produits_Comptes_généraux_11=new clJointureMulti("produit",
	new Array(
	new stJointure("compteproduit","pd_numero","pd_numero",null,false)
	));
var Produits_Liste_des_produits0=new clEnsembleAttributs("produit",
	new Array(
	new clLiaison(null,Col_N0_Etat_De_Produits_Liste_des_produits0)
	,new clLiaison(null,Col_N1_Libellé_De_Produits_Liste_des_produits0)
	),
	new Array(
	new clLiaison(null,Produits_Libellé__en_interne__1)
	,new clLiaison(null,Produits_Titre__pour_les_impressions__2)
	,new clLiaison(Joint_Esclave_Produits_Journal_comptable_3,Produits_Journal_comptable_3)
	,new clLiaison(null,Produits_Actif_4)
	,new clLiaison(null,Produits_Produit_non_quantifiable__Quantité_1__5)
	,new clLiaison(null,Produits_Soumis_à_de_potentielles_réductions_6)
	,new clLiaison(Joint_Esclave_Produits_Prix_7,Produits_Prix_7)
	,new clLiaison(Joint_Esclave_Produits_Comptes_généraux_11,Produits_Comptes_généraux_11)
	));

var Titre_Produits_Liste_des_produits0=new Array("Etat","Libellé");

	/* Ce composant représente: des éléments de la table produit sous le nom "Liste des produits" */
var Compo_Produits_Liste_des_produits0=new clCompoListe(Produits_Liste_des_produits0,new Array(new clInterfaceFiltrageVide()),Titre_Produits_Liste_des_produits0,"Liste des produits",true,false);

	/* Ce composant représente: produit.undefined sous le nom "Liste des produits" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Liste_des_produits0.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0"));

 }

	/* On l'ajoute au tableau global à l'indice 1180*/
top.TAB_GLOBAL_COMPO[1180]=Compo_Produits_Liste_des_produits0;

	/* Ce composant représente: des éléments de la table produit sous le nom "Libellé (en interne)" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Libellé__en_interne__1.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1183*/
top.TAB_GLOBAL_COMPO[1183]=Compo_Produits_Libellé__en_interne__1;

	/* Ce composant représente: des éléments de la table produit sous le nom "Titre (pour les impressions)" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Titre__pour_les_impressions__2.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1184*/
top.TAB_GLOBAL_COMPO[1184]=Compo_Produits_Titre__pour_les_impressions__2;

	/* Ce composant représente: des éléments de la table journal sous le nom "Journal comptable" */
 if(ALeDroit(0,"journal"))
 {
Compo_Produits_Journal_comptable_3.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1185*/
top.TAB_GLOBAL_COMPO[1185]=Compo_Produits_Journal_comptable_3;

	/* Ce composant représente: des éléments de la table produit sous le nom "Actif" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Actif_4.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1186*/
top.TAB_GLOBAL_COMPO[1186]=Compo_Produits_Actif_4;

	/* Ce composant représente: des éléments de la table produit sous le nom "Produit non quantifiable (Quantité=1)" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Produit_non_quantifiable__Quantité_1__5.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1187*/
top.TAB_GLOBAL_COMPO[1187]=Compo_Produits_Produit_non_quantifiable__Quantité_1__5;

	/* Ce composant représente: des éléments de la table produit sous le nom "Soumis à de potentielles réductions" */
 if(ALeDroit(0,"produit"))
 {
Compo_Produits_Soumis_à_de_potentielles_réductions_6.GenererXUL(top.document.getElementById("Produits_Liste_des_produits0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1188*/
top.TAB_GLOBAL_COMPO[1188]=Compo_Produits_Soumis_à_de_potentielles_réductions_6;

	/* Ce composant représente: prix.undefined sous le nom "Prix" */
 if(ALeDroit(0,"prix"))
 {
Compo_Produits_Prix_7.GenererXUL(top.document.getElementById("Produits_Prix_7"));

 }

	/* On l'ajoute au tableau global à l'indice 1189*/
top.TAB_GLOBAL_COMPO[1189]=Compo_Produits_Prix_7;

	/* Ce composant représente: des éléments de la table prix sous le nom "Tarif H.T." */
 if(ALeDroit(0,"prix"))
 {
Compo_Produits_Tarif_H_T__8.GenererXUL(top.document.getElementById("Produits_Prix_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1194*/
top.TAB_GLOBAL_COMPO[1194]=Compo_Produits_Tarif_H_T__8;

	/* Ce composant représente: des éléments de la table prix sous le nom "Tarif T.T.C." */
 if(ALeDroit(0,"prix"))
 {
Compo_Produits_Tarif_T_T_C__9.GenererXUL(top.document.getElementById("Produits_Prix_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1195*/
top.TAB_GLOBAL_COMPO[1195]=Compo_Produits_Tarif_T_T_C__9;

	/* Ce composant représente: des éléments de la table tva sous le nom "T.V.A." */
 if(ALeDroit(0,"tva"))
 {
Compo_Produits_T_V_A__10.GenererXUL(top.document.getElementById("Produits_Prix_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1196*/
top.TAB_GLOBAL_COMPO[1196]=Compo_Produits_T_V_A__10;

	/* Ce composant représente: compteproduit.undefined sous le nom "Comptes généraux" */
 if(ALeDroit(0,"compteproduit"))
 {
Compo_Produits_Comptes_généraux_11.GenererXUL(top.document.getElementById("Produits_Comptes_généraux_11"));

 }

	/* On l'ajoute au tableau global à l'indice 1197*/
top.TAB_GLOBAL_COMPO[1197]=Compo_Produits_Comptes_généraux_11;

	/* Ce composant représente: des éléments de la table comptegen sous le nom "Compte" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_Produits_Compte_12.GenererXUL(top.document.getElementById("Produits_Comptes_généraux_11_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1200*/
top.TAB_GLOBAL_COMPO[1200]=Compo_Produits_Compte_12;

	/* Ce composant représente: des éléments de la table compteproduit sous le nom "Actif" */
 if(ALeDroit(0,"compteproduit"))
 {
Compo_Produits_Actif_13.GenererXUL(top.document.getElementById("Produits_Comptes_généraux_11_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1201*/
top.TAB_GLOBAL_COMPO[1201]=Compo_Produits_Actif_13;
var Col_N0_Code_De_Responsabilités_Responsabilités0=new clAttribut("re_code","responsabilite",null);

var Col_N1_Nom_De_Responsabilités_Responsabilités0=new clAttribut("re_nom","responsabilite",null);

var Col_N2_Famille_De_Responsabilités_Responsabilités0=new clAttribut("re_famille","responsabilite",null);

var Responsabilités_Code_1=new clAttribut("re_code","responsabilite",null);


	/* Ce composant représente: responsabilite.re_code sous le nom "Code" */
var Compo_Responsabilités_Code_1=new clCompoTextBox(Responsabilités_Code_1,null,"Code",false,false);
var Responsabilités_Nom_2=new clAttribut("re_nom","responsabilite",null);


	/* Ce composant représente: responsabilite.re_nom sous le nom "Nom" */
var Compo_Responsabilités_Nom_2=new clCompoTextBox(Responsabilités_Nom_2,null,"Nom",false,false);
var Responsabilités_Famille_3=new clAttribut("re_famille","responsabilite",null);


	/* Ce composant représente: responsabilite.re_famille sous le nom "Famille" */
var Compo_Responsabilités_Famille_3=new clCompoTextBox(Responsabilités_Famille_3,null,"Famille",false,false);
var Responsabilités_Responsabilités0=new clEnsembleAttributs("responsabilite",
	new Array(
	new clLiaison(null,Col_N0_Code_De_Responsabilités_Responsabilités0)
	,new clLiaison(null,Col_N1_Nom_De_Responsabilités_Responsabilités0)
	,new clLiaison(null,Col_N2_Famille_De_Responsabilités_Responsabilités0)
	),
	new Array(
	new clLiaison(null,Responsabilités_Code_1)
	,new clLiaison(null,Responsabilités_Nom_2)
	,new clLiaison(null,Responsabilités_Famille_3)
	));

var Titre_Responsabilités_Responsabilités0=new Array("Code","Nom","Famille");

	/* Ce composant représente: des éléments de la table responsabilite sous le nom "Responsabilités" */
var Compo_Responsabilités_Responsabilités0=new clCompoListe(Responsabilités_Responsabilités0,new Array(new clInterfaceFiltrageVide()),Titre_Responsabilités_Responsabilités0,"Responsabilités",true,false);

	/* Ce composant représente: responsabilite.undefined sous le nom "Responsabilités" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilités_Responsabilités0.GenererXUL(top.document.getElementById("Responsabilités_Responsabilités0"));

 }

	/* On l'ajoute au tableau global à l'indice 1165*/
top.TAB_GLOBAL_COMPO[1165]=Compo_Responsabilités_Responsabilités0;

	/* Ce composant représente: des éléments de la table responsabilite sous le nom "Code" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilités_Code_1.GenererXUL(top.document.getElementById("Responsabilités_Responsabilités0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1169*/
top.TAB_GLOBAL_COMPO[1169]=Compo_Responsabilités_Code_1;

	/* Ce composant représente: des éléments de la table responsabilite sous le nom "Nom" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilités_Nom_2.GenererXUL(top.document.getElementById("Responsabilités_Responsabilités0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1170*/
top.TAB_GLOBAL_COMPO[1170]=Compo_Responsabilités_Nom_2;

	/* Ce composant représente: des éléments de la table responsabilite sous le nom "Famille" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Responsabilités_Famille_3.GenererXUL(top.document.getElementById("Responsabilités_Responsabilités0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1171*/
top.TAB_GLOBAL_COMPO[1171]=Compo_Responsabilités_Famille_3;
var Col_N0_Nom_De_Séquences_Liste_des_séquences0=new clAttribut("sq_nom","sequence",null);

var Col_N1_C_S__De_Séquences_Liste_des_séquences0=new clAttribut("sq_nombre","sequence",null);

var Col_N2_L_V__De_Séquences_Liste_des_séquences0=new clAttribut("sq_last","sequence",null);

var Séquences_Nom_1=new clAttribut("sq_nom","sequence",null);


	/* Ce composant représente: sequence.sq_nom sous le nom "Nom" */
var Compo_Séquences_Nom_1=new clCompoTextBox(Séquences_Nom_1,null,"Nom",false,false);
var Séquences_C_S__2=new clAttribut("sq_nombre","sequence",null);


	/* Ce composant représente: sequence.sq_nombre sous le nom "C.S." */
var Compo_Séquences_C_S__2=new clCompoTextBox(Séquences_C_S__2,null,"C.S.",false,false);
var Séquences_L_V__3=new clAttribut("sq_last","sequence",null);


	/* Ce composant représente: sequence.sq_last sous le nom "L.V." */
var Compo_Séquences_L_V__3=new clCompoTextBox(Séquences_L_V__3,null,"L.V.",false,false);
var Séquences_Vider_le_cache_4=new clAttribut("sq_clear_cache","sequence",null);


	/* Ce composant représente: sequence.sq_clear_cache sous le nom "Vider le cache" */
var Compo_Séquences_Vider_le_cache_4=new clCompoCheckBox(Séquences_Vider_le_cache_4,null,"Vider le cache");
var Séquences_Liste_des_séquences0=new clEnsembleAttributs("sequence",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Séquences_Liste_des_séquences0)
	,new clLiaison(null,Col_N1_C_S__De_Séquences_Liste_des_séquences0)
	,new clLiaison(null,Col_N2_L_V__De_Séquences_Liste_des_séquences0)
	),
	new Array(
	new clLiaison(null,Séquences_Nom_1)
	,new clLiaison(null,Séquences_C_S__2)
	,new clLiaison(null,Séquences_L_V__3)
	,new clLiaison(null,Séquences_Vider_le_cache_4)
	));

var Titre_Séquences_Liste_des_séquences0=new Array("Nom","C.S.","L.V.");

	/* Ce composant représente: des éléments de la table sequence sous le nom "Liste des séquences" */
var Compo_Séquences_Liste_des_séquences0=new clCompoListe(Séquences_Liste_des_séquences0,new Array(new clInterfaceFiltrageVide()),Titre_Séquences_Liste_des_séquences0,"Liste des séquences",true,false);

	/* Ce composant représente: sequence.undefined sous le nom "Liste des séquences" */
 if(ALeDroit(0,"sequence"))
 {
Compo_Séquences_Liste_des_séquences0.GenererXUL(top.document.getElementById("Séquences_Liste_des_séquences0"));

 }

	/* On l'ajoute au tableau global à l'indice 1064*/
top.TAB_GLOBAL_COMPO[1064]=Compo_Séquences_Liste_des_séquences0;

	/* Ce composant représente: des éléments de la table sequence sous le nom "Nom" */
 if(ALeDroit(0,"sequence"))
 {
Compo_Séquences_Nom_1.GenererXUL(top.document.getElementById("Séquences_Liste_des_séquences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1068*/
top.TAB_GLOBAL_COMPO[1068]=Compo_Séquences_Nom_1;

	/* Ce composant représente: des éléments de la table sequence sous le nom "C.S." */
 if(ALeDroit(0,"sequence"))
 {
Compo_Séquences_C_S__2.GenererXUL(top.document.getElementById("Séquences_Liste_des_séquences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1069*/
top.TAB_GLOBAL_COMPO[1069]=Compo_Séquences_C_S__2;

	/* Ce composant représente: des éléments de la table sequence sous le nom "L.V." */
 if(ALeDroit(0,"sequence"))
 {
Compo_Séquences_L_V__3.GenererXUL(top.document.getElementById("Séquences_Liste_des_séquences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1070*/
top.TAB_GLOBAL_COMPO[1070]=Compo_Séquences_L_V__3;

	/* Ce composant représente: des éléments de la table sequence sous le nom "Vider le cache" */
 if(ALeDroit(0,"sequence"))
 {
Compo_Séquences_Vider_le_cache_4.GenererXUL(top.document.getElementById("Séquences_Liste_des_séquences0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1071*/
top.TAB_GLOBAL_COMPO[1071]=Compo_Séquences_Vider_le_cache_4;
var Col_N0_Nom_De_Services_Liste_des_services0=new clAttribut("se_nom","service",null);

var Col_N1_Responsable_De_Services_Liste_des_services0=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N1_Responsable_De_Services_Liste_des_services0=new clJointureMulti("service",
	new Array(
	new stJointure("agent","se_agent","ag_numero",null,true)
	));
var Col_N2_Société_De_Services_Liste_des_services0=new clAttribut("so_libelle","societe",null);

var Joint_Col_N2_Société_De_Services_Liste_des_services0=new clJointureMulti("service",
	new Array(
	new stJointure("societe","se_societe","so_numero",null,true)
	));
var Services_Nom_1=new clAttribut("se_nom","service",null);


	/* Ce composant représente: service.se_nom sous le nom "Nom" */
var Compo_Services_Nom_1=new clCompoTextBox(Services_Nom_1,null,"Nom",false,false);
var Services_Agent_responsable_2=new clAttribut("ag_libelle","agent",null);


	/* Ce composant représente: agent.ag_libelle sous le nom "Agent responsable" */
var Compo_Services_Agent_responsable_2=new clCompoListeDeroulanteSimple(Services_Agent_responsable_2,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Agents_0=new clInterfaceFiltrageRelationOnglet("Agents",Gerer_Agents,OuvrirOnglet_Services)),"Agent responsable");
var Joint_Esclave_Services_Agent_responsable_2=new clJointureMulti("service",
	new Array(
	new stJointure("agent","se_agent","ag_numero",null,false)
	));
var Col_N0_Agent_De_Services_Employés_3=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N0_Agent_De_Services_Employés_3=new clJointureMulti("employe",
	new Array(
	new stJointure("agent","em_agent","ag_numero",null,true)
	));
var Col_N1_Emploi_De_Services_Employés_3=new clAttribut("em_emploi","employe",null);

var Col_N2_Accès_De_Services_Employés_3=new clAttribut("ac_nom","acces",null);

var Joint_Col_N2_Accès_De_Services_Employés_3=new clJointureMulti("employe",
	new Array(
	new stJointure("acces","em_acces","ac_numero",null,true)
	));
var Services_Employés_3=new clEnsembleAttributs("employe",
	new Array(
	new clLiaison(Joint_Col_N0_Agent_De_Services_Employés_3,Col_N0_Agent_De_Services_Employés_3)
	,new clLiaison(null,Col_N1_Emploi_De_Services_Employés_3)
	,new clLiaison(Joint_Col_N2_Accès_De_Services_Employés_3,Col_N2_Accès_De_Services_Employés_3)
	),
	null);

var Titre_Services_Employés_3=new Array("Agent","Emploi","Accès");

	/* Ce composant représente: des éléments de la table employe sous le nom "Employés" */
var Compo_Services_Employés_3=new clCompoListe(Services_Employés_3,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Employés_0=new clInterfaceFiltrageRelationOnglet("Employés",Gerer_Employés,OuvrirOnglet_Services,true)),Titre_Services_Employés_3,"Employés",true,false);
var Joint_Esclave_Services_Employés_3=new clJointureMulti("service",
	new Array(
	new stJointure("employe","se_numero","em_service",null,false)
	));
var Services_Liste_des_services0=new clEnsembleAttributs("service",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Services_Liste_des_services0)
	,new clLiaison(Joint_Col_N1_Responsable_De_Services_Liste_des_services0,Col_N1_Responsable_De_Services_Liste_des_services0)
	,new clLiaison(Joint_Col_N2_Société_De_Services_Liste_des_services0,Col_N2_Société_De_Services_Liste_des_services0)
	),
	new Array(
	new clLiaison(null,Services_Nom_1)
	,new clLiaison(Joint_Esclave_Services_Agent_responsable_2,Services_Agent_responsable_2)
	,new clLiaison(Joint_Esclave_Services_Employés_3,Services_Employés_3)
	));

var Titre_Services_Liste_des_services0=new Array("Nom","Responsable","Société");

	/* Ce composant représente: des éléments de la table service sous le nom "Liste des services" */
var Compo_Services_Liste_des_services0=new clCompoListe(Services_Liste_des_services0,new Array(new clInterfaceFiltrageVide()),Titre_Services_Liste_des_services0,"Liste des services",true,false);

	/* Ce composant représente: service.undefined sous le nom "Liste des services" */
 if(ALeDroit(0,"service"))
 {
Compo_Services_Liste_des_services0.GenererXUL(top.document.getElementById("Services_Liste_des_services0"));

 }

	/* On l'ajoute au tableau global à l'indice 1072*/
top.TAB_GLOBAL_COMPO[1072]=Compo_Services_Liste_des_services0;

	/* Ce composant représente: des éléments de la table service sous le nom "Nom" */
 if(ALeDroit(0,"service"))
 {
Compo_Services_Nom_1.GenererXUL(top.document.getElementById("Services_Liste_des_services0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1076*/
top.TAB_GLOBAL_COMPO[1076]=Compo_Services_Nom_1;

	/* Ce composant représente: des éléments de la table agent sous le nom "Agent responsable" */
 if(ALeDroit(0,"agent"))
 {
Compo_Services_Agent_responsable_2.GenererXUL(top.document.getElementById("Services_Liste_des_services0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1077*/
top.TAB_GLOBAL_COMPO[1077]=Compo_Services_Agent_responsable_2;

	/* Ce composant représente: employe.undefined sous le nom "Employés" */
 if(ALeDroit(0,"employe"))
 {
Compo_Services_Employés_3.GenererXUL(top.document.getElementById("Services_Employés_3"));

 }

	/* On l'ajoute au tableau global à l'indice 1078*/
top.TAB_GLOBAL_COMPO[1078]=Compo_Services_Employés_3;
var Col_N0_Abr__De_Sociétés_Liste_des_sociétés0=new clAttribut("so_abbrev","societe",null);

var Col_N1_Nom_De_Sociétés_Liste_des_sociétés0=new clAttribut("so_libelle","societe",null);

var Sociétés_Type_1=new clAttribut("ts_libelle","typesociete",null);


	/* Ce composant représente: typesociete.ts_libelle sous le nom "Type" */
var Compo_Sociétés_Type_1=new clCompoListeDeroulanteSimple(Sociétés_Type_1,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Types_de_sociétés_0=new clInterfaceFiltrageRelationOnglet("Types de sociétés",Gerer_Types_de_sociétés,OuvrirOnglet_Sociétés)),"Type");
var Joint_Esclave_Sociétés_Type_1=new clJointureMulti("societe",
	new Array(
	new stJointure("typesociete","ts_numero","ts_numero",null,false)
	));
var Sociétés_Nom_2=new clAttribut("so_libelle","societe",null);


	/* Ce composant représente: societe.so_libelle sous le nom "Nom" */
var Compo_Sociétés_Nom_2=new clCompoTextBox(Sociétés_Nom_2,null,"Nom",false,false);
var Sociétés_Abréviation_3=new clAttribut("so_abbrev","societe",null);


	/* Ce composant représente: societe.so_abbrev sous le nom "Abréviation" */
var Compo_Sociétés_Abréviation_3=new clCompoTextBox(Sociétés_Abréviation_3,null,"Abréviation",false,false);
var Sociétés_Personne_4=new clAttribut("pe_libelle","personne",null);


	/* Ce composant représente: personne.pe_libelle sous le nom "Personne" */
var Compo_Sociétés_Personne_4=new clCompoListeDeroulanteSimple(Sociétés_Personne_4,null,"Personne");
var Joint_Esclave_Sociétés_Personne_4=new clJointureMulti("societe",
	new Array(
	new stJointure("personne","pe_numero","pe_numero",null,false)
	));
var Sociétés_Séquence_5=new clAttribut("sq_nom","sequence",null);


	/* Ce composant représente: sequence.sq_nom sous le nom "Séquence" */
var Compo_Sociétés_Séquence_5=new clCompoListeDeroulanteSimple(Sociétés_Séquence_5,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Séquences_0=new clInterfaceFiltrageRelationOnglet("Séquences",Gerer_Séquences,OuvrirOnglet_Sociétés)),"Séquence");
var Joint_Esclave_Sociétés_Séquence_5=new clJointureMulti("societe",
	new Array(
	new stJointure("sequence","sq_numero","sq_numero",null,false)
	));
var Sociétés_Détails_6=new clAttribut("so_detail","societe",null);


	/* Ce composant représente: societe.so_detail sous le nom "Détails" */
var Compo_Sociétés_Détails_6=new clCompoTextBox(Sociétés_Détails_6,null,"Détails",false,true);
var Col_N0_Nom_De_Sociétés_Services_7=new clAttribut("se_nom","service",null);

var Col_N1_Responsable_De_Sociétés_Services_7=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N1_Responsable_De_Sociétés_Services_7=new clJointureMulti("service",
	new Array(
	new stJointure("agent","se_agent","ag_numero",null,true)
	));
var Sociétés_Services_7=new clEnsembleAttributs("service",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Sociétés_Services_7)
	,new clLiaison(Joint_Col_N1_Responsable_De_Sociétés_Services_7,Col_N1_Responsable_De_Sociétés_Services_7)
	),
	null);

var Titre_Sociétés_Services_7=new Array("Nom","Responsable");

	/* Ce composant représente: des éléments de la table service sous le nom "Services" */
var Compo_Sociétés_Services_7=new clCompoListe(Sociétés_Services_7,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Services_0=new clInterfaceFiltrageRelationOnglet("Services",Gerer_Services,OuvrirOnglet_Sociétés,true)),Titre_Sociétés_Services_7,"Services",true,false);
var Joint_Esclave_Sociétés_Services_7=new clJointureMulti("societe",
	new Array(
	new stJointure("service","so_numero","se_societe",null,false)
	));
var Sociétés_Liste_des_sociétés0=new clEnsembleAttributs("societe",
	new Array(
	new clLiaison(null,Col_N0_Abr__De_Sociétés_Liste_des_sociétés0)
	,new clLiaison(null,Col_N1_Nom_De_Sociétés_Liste_des_sociétés0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Sociétés_Type_1,Sociétés_Type_1)
	,new clLiaison(null,Sociétés_Nom_2)
	,new clLiaison(null,Sociétés_Abréviation_3)
	,new clLiaison(Joint_Esclave_Sociétés_Personne_4,Sociétés_Personne_4)
	,new clLiaison(Joint_Esclave_Sociétés_Séquence_5,Sociétés_Séquence_5)
	,new clLiaison(null,Sociétés_Détails_6)
	,new clLiaison(Joint_Esclave_Sociétés_Services_7,Sociétés_Services_7)
	));

var Titre_Sociétés_Liste_des_sociétés0=new Array("Abr.","Nom");

	/* Ce composant représente: des éléments de la table societe sous le nom "Liste des sociétés" */
var Compo_Sociétés_Liste_des_sociétés0=new clCompoListe(Sociétés_Liste_des_sociétés0,new Array(new clInterfaceFiltrageVide()),Titre_Sociétés_Liste_des_sociétés0,"Liste des sociétés",true,false);

	/* Ce composant représente: societe.undefined sous le nom "Liste des sociétés" */
 if(ALeDroit(0,"societe"))
 {
Compo_Sociétés_Liste_des_sociétés0.GenererXUL(top.document.getElementById("Sociétés_Liste_des_sociétés0"));

 }

	/* On l'ajoute au tableau global à l'indice 1052*/
top.TAB_GLOBAL_COMPO[1052]=Compo_Sociétés_Liste_des_sociétés0;

	/* Ce composant représente: des éléments de la table typesociete sous le nom "Type" */
 if(ALeDroit(0,"typesociete"))
 {
Compo_Sociétés_Type_1.GenererXUL(top.document.getElementById("Sociétés_Liste_des_sociétés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1055*/
top.TAB_GLOBAL_COMPO[1055]=Compo_Sociétés_Type_1;

	/* Ce composant représente: des éléments de la table societe sous le nom "Nom" */
 if(ALeDroit(0,"societe"))
 {
Compo_Sociétés_Nom_2.GenererXUL(top.document.getElementById("Sociétés_Liste_des_sociétés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1056*/
top.TAB_GLOBAL_COMPO[1056]=Compo_Sociétés_Nom_2;

	/* Ce composant représente: des éléments de la table societe sous le nom "Abréviation" */
 if(ALeDroit(0,"societe"))
 {
Compo_Sociétés_Abréviation_3.GenererXUL(top.document.getElementById("Sociétés_Liste_des_sociétés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1057*/
top.TAB_GLOBAL_COMPO[1057]=Compo_Sociétés_Abréviation_3;

	/* Ce composant représente: des éléments de la table personne sous le nom "Personne" */
 if(ALeDroit(0,"personne"))
 {
Compo_Sociétés_Personne_4.GenererXUL(top.document.getElementById("Sociétés_Liste_des_sociétés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1058*/
top.TAB_GLOBAL_COMPO[1058]=Compo_Sociétés_Personne_4;

	/* Ce composant représente: des éléments de la table sequence sous le nom "Séquence" */
 if(ALeDroit(0,"sequence"))
 {
Compo_Sociétés_Séquence_5.GenererXUL(top.document.getElementById("Sociétés_Liste_des_sociétés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1059*/
top.TAB_GLOBAL_COMPO[1059]=Compo_Sociétés_Séquence_5;

	/* Ce composant représente: des éléments de la table societe sous le nom "Détails" */
 if(ALeDroit(0,"societe"))
 {
Compo_Sociétés_Détails_6.GenererXUL(top.document.getElementById("Sociétés_Liste_des_sociétés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1060*/
top.TAB_GLOBAL_COMPO[1060]=Compo_Sociétés_Détails_6;

	/* Ce composant représente: service.undefined sous le nom "Services" */
 if(ALeDroit(0,"service"))
 {
Compo_Sociétés_Services_7.GenererXUL(top.document.getElementById("Sociétés_Services_7"));

 }

	/* On l'ajoute au tableau global à l'indice 1061*/
top.TAB_GLOBAL_COMPO[1061]=Compo_Sociétés_Services_7;
var Col_N0_Taux_____De_TVA_Liste_des_T_V_A_0=new clAttribut("tv_taux","tva",null);

var Col_N1_Code_De_TVA_Liste_des_T_V_A_0=new clAttribut("tv_code","tva",null);

var Col_N2_Etat_De_TVA_Liste_des_T_V_A_0=new clAttribut("tv_etat","tva",null);

var TVA_Taux_1=new clAttribut("tv_taux","tva",null);


	/* Ce composant représente: tva.tv_taux sous le nom "Taux" */
var Compo_TVA_Taux_1=new clCompoTextBox(TVA_Taux_1,null,"Taux",false,false);
var TVA_Code_2=new clAttribut("tv_code","tva",null);


	/* Ce composant représente: tva.tv_code sous le nom "Code" */
var Compo_TVA_Code_2=new clCompoTextBox(TVA_Code_2,null,"Code",false,false);
var TVA_Compte_général_3=new clAttribut("cg_nom","comptegen",null);


	/* Ce composant représente: comptegen.cg_nom sous le nom "Compte général" */
var Compo_TVA_Compte_général_3=new clCompoListeDeroulanteSimple(TVA_Compte_général_3,null,"Compte général");
var Joint_Esclave_TVA_Compte_général_3=new clJointureMulti("tva",
	new Array(
	new stJointure("comptegen","cg_numero","cg_numero",null,false)
	));
var TVA_Actif_4=new clAttribut("tv_actif","tva",null);


	/* Ce composant représente: tva.tv_actif sous le nom "Actif" */
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
	,new clLiaison(Joint_Esclave_TVA_Compte_général_3,TVA_Compte_général_3)
	,new clLiaison(null,TVA_Actif_4)
	));

var Titre_TVA_Liste_des_T_V_A_0=new Array("Taux (%)","Code","Etat");

	/* Ce composant représente: des éléments de la table tva sous le nom "Liste des T.V.A." */
var Compo_TVA_Liste_des_T_V_A_0=new clCompoListe(TVA_Liste_des_T_V_A_0,new Array(new clInterfaceFiltrageVide()),Titre_TVA_Liste_des_T_V_A_0,"Liste des T.V.A.",true,false);

	/* Ce composant représente: tva.undefined sous le nom "Liste des T.V.A." */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Liste_des_T_V_A_0.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0"));

 }

	/* On l'ajoute au tableau global à l'indice 1172*/
top.TAB_GLOBAL_COMPO[1172]=Compo_TVA_Liste_des_T_V_A_0;

	/* Ce composant représente: des éléments de la table tva sous le nom "Taux" */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Taux_1.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1176*/
top.TAB_GLOBAL_COMPO[1176]=Compo_TVA_Taux_1;

	/* Ce composant représente: des éléments de la table tva sous le nom "Code" */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Code_2.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1177*/
top.TAB_GLOBAL_COMPO[1177]=Compo_TVA_Code_2;

	/* Ce composant représente: des éléments de la table comptegen sous le nom "Compte général" */
 if(ALeDroit(0,"comptegen"))
 {
Compo_TVA_Compte_général_3.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1178*/
top.TAB_GLOBAL_COMPO[1178]=Compo_TVA_Compte_général_3;

	/* Ce composant représente: des éléments de la table tva sous le nom "Actif" */
 if(ALeDroit(0,"tva"))
 {
Compo_TVA_Actif_4.GenererXUL(top.document.getElementById("TVA_Liste_des_T_V_A_0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1179*/
top.TAB_GLOBAL_COMPO[1179]=Compo_TVA_Actif_4;
var Col_N0_Nom_De_Types_d_adresses_Liste_des_types_d_adresses0=new clAttribut("ak_nom","typeadresse",null);

var Types_d_adresses_Nom_1=new clAttribut("ak_nom","typeadresse",null);


	/* Ce composant représente: typeadresse.ak_nom sous le nom "Nom" */
var Compo_Types_d_adresses_Nom_1=new clCompoTextBox(Types_d_adresses_Nom_1,null,"Nom",false,false);
var Types_d_adresses_Liste_des_types_d_adresses0=new clEnsembleAttributs("typeadresse",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Types_d_adresses_Liste_des_types_d_adresses0)
	),
	new Array(
	new clLiaison(null,Types_d_adresses_Nom_1)
	));

var Titre_Types_d_adresses_Liste_des_types_d_adresses0=new Array("Nom");

	/* Ce composant représente: des éléments de la table typeadresse sous le nom "Liste des types d'adresses" */
var Compo_Types_d_adresses_Liste_des_types_d_adresses0=new clCompoListe(Types_d_adresses_Liste_des_types_d_adresses0,new Array(new clInterfaceFiltrageVide()),Titre_Types_d_adresses_Liste_des_types_d_adresses0,"Liste des types d'adresses",true,false);

	/* Ce composant représente: typeadresse.undefined sous le nom "Liste des types d'adresses" */
 if(ALeDroit(0,"typeadresse"))
 {
Compo_Types_d_adresses_Liste_des_types_d_adresses0.GenererXUL(top.document.getElementById("Types_d_adresses_Liste_des_types_d_adresses0"));

 }

	/* On l'ajoute au tableau global à l'indice 1032*/
top.TAB_GLOBAL_COMPO[1032]=Compo_Types_d_adresses_Liste_des_types_d_adresses0;

	/* Ce composant représente: des éléments de la table typeadresse sous le nom "Nom" */
 if(ALeDroit(0,"typeadresse"))
 {
Compo_Types_d_adresses_Nom_1.GenererXUL(top.document.getElementById("Types_d_adresses_Liste_des_types_d_adresses0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1034*/
top.TAB_GLOBAL_COMPO[1034]=Compo_Types_d_adresses_Nom_1;
var Col_N0_N__De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clAttribut("ta_numero","typeattribut",null);

var Col_N1_Libellé_De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clAttribut("ta_nom","typeattribut",null);

var Types_d_attribut_Libellé_1=new clAttribut("ta_nom","typeattribut",null);


	/* Ce composant représente: typeattribut.ta_nom sous le nom "Libellé" */
var Compo_Types_d_attribut_Libellé_1=new clCompoTextBox(Types_d_attribut_Libellé_1,null,"Libellé",false,false);
var Col_N0_Libellé_De_Types_d_attribut_Catégories_2=new clAttribut("cr_libelle","categorie",null);

var Types_d_attribut_Libellé_3=new clAttribut("cr_libelle","categorie",null);


	/* Ce composant représente: categorie.cr_libelle sous le nom "Libellé" */
var Compo_Types_d_attribut_Libellé_3=new clCompoTextBox(Types_d_attribut_Libellé_3,null,"Libellé",false,false);
var Types_d_attribut_Description_4=new clAttribut("cr_description","categorie",null);


	/* Ce composant représente: categorie.cr_description sous le nom "Description" */
var Compo_Types_d_attribut_Description_4=new clCompoTextBox(Types_d_attribut_Description_4,null,"Description",false,false);
var Types_d_attribut_Catégories_2=new clEnsembleAttributs("categorie",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Types_d_attribut_Catégories_2)
	),
	new Array(
	new clLiaison(null,Types_d_attribut_Libellé_3)
	,new clLiaison(null,Types_d_attribut_Description_4)
	));

var Titre_Types_d_attribut_Catégories_2=new Array("Libellé");

	/* Ce composant représente: des éléments de la table categorie sous le nom "Catégories" */
var Compo_Types_d_attribut_Catégories_2=new clCompoListe(Types_d_attribut_Catégories_2,null,Titre_Types_d_attribut_Catégories_2,"Catégories",true,false);
var Joint_Esclave_Types_d_attribut_Catégories_2=new clJointureMulti("typeattribut",
	new Array(
	new stJointure("categorie","ta_numero","ta_numero",null,false)
	));
var Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clEnsembleAttributs("typeattribut",
	new Array(
	new clLiaison(null,Col_N0_N__De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0)
	,new clLiaison(null,Col_N1_Libellé_De_Types_d_attribut_Liste_des_types_d_attribut_de_personne0)
	),
	new Array(
	new clLiaison(null,Types_d_attribut_Libellé_1)
	,new clLiaison(Joint_Esclave_Types_d_attribut_Catégories_2,Types_d_attribut_Catégories_2)
	));

var Titre_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new Array("N°","Libellé");

	/* Ce composant représente: des éléments de la table typeattribut sous le nom "Liste des types d'attribut de personne" */
var Compo_Types_d_attribut_Liste_des_types_d_attribut_de_personne0=new clCompoListe(Types_d_attribut_Liste_des_types_d_attribut_de_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Types_d_attribut_Liste_des_types_d_attribut_de_personne0,"Liste des types d'attribut de personne",true,false);

	/* Ce composant représente: typeattribut.undefined sous le nom "Liste des types d'attribut de personne" */
 if(ALeDroit(0,"typeattribut"))
 {
Compo_Types_d_attribut_Liste_des_types_d_attribut_de_personne0.GenererXUL(top.document.getElementById("Types_d_attribut_Liste_des_types_d_attribut_de_personne0"));

 }

	/* On l'ajoute au tableau global à l'indice 1007*/
top.TAB_GLOBAL_COMPO[1007]=Compo_Types_d_attribut_Liste_des_types_d_attribut_de_personne0;

	/* Ce composant représente: des éléments de la table typeattribut sous le nom "Libellé" */
 if(ALeDroit(0,"typeattribut"))
 {
Compo_Types_d_attribut_Libellé_1.GenererXUL(top.document.getElementById("Types_d_attribut_Liste_des_types_d_attribut_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1010*/
top.TAB_GLOBAL_COMPO[1010]=Compo_Types_d_attribut_Libellé_1;

	/* Ce composant représente: categorie.undefined sous le nom "Catégories" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Types_d_attribut_Catégories_2.GenererXUL(top.document.getElementById("Types_d_attribut_Catégories_2"));

 }

	/* On l'ajoute au tableau global à l'indice 1011*/
top.TAB_GLOBAL_COMPO[1011]=Compo_Types_d_attribut_Catégories_2;

	/* Ce composant représente: des éléments de la table categorie sous le nom "Libellé" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Types_d_attribut_Libellé_3.GenererXUL(top.document.getElementById("Types_d_attribut_Catégories_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1013*/
top.TAB_GLOBAL_COMPO[1013]=Compo_Types_d_attribut_Libellé_3;

	/* Ce composant représente: des éléments de la table categorie sous le nom "Description" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Types_d_attribut_Description_4.GenererXUL(top.document.getElementById("Types_d_attribut_Catégories_2_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1014*/
top.TAB_GLOBAL_COMPO[1014]=Compo_Types_d_attribut_Description_4;
var Col_N0_Nom_De_Types_de_contacts_Liste_des_types_de_contacts0=new clAttribut("ck_nom","contacttype",null);

var Col_N1_Code_De_Types_de_contacts_Liste_des_types_de_contacts0=new clAttribut("ck_code","contacttype",null);

var Types_de_contacts_Nom_1=new clAttribut("ck_nom","contacttype",null);


	/* Ce composant représente: contacttype.ck_nom sous le nom "Nom" */
var Compo_Types_de_contacts_Nom_1=new clCompoTextBox(Types_de_contacts_Nom_1,null,"Nom",false,false);
var Types_de_contacts_Code_2=new clAttribut("ck_code","contacttype",null);


	/* Ce composant représente: contacttype.ck_code sous le nom "Code" */
var Compo_Types_de_contacts_Code_2=new clCompoTextBox(Types_de_contacts_Code_2,null,"Code",false,false);
var Types_de_contacts_Peut_être_un_numéro_3=new clAttribut("ck_number","contacttype",null);


	/* Ce composant représente: contacttype.ck_number sous le nom "Peut être un numéro" */
var Compo_Types_de_contacts_Peut_être_un_numéro_3=new clCompoCheckBox(Types_de_contacts_Peut_être_un_numéro_3,null,"Peut être un numéro");
var Types_de_contacts_Peut_être_un_e_mail_4=new clAttribut("ck_email","contacttype",null);


	/* Ce composant représente: contacttype.ck_email sous le nom "Peut être un e-mail" */
var Compo_Types_de_contacts_Peut_être_un_e_mail_4=new clCompoCheckBox(Types_de_contacts_Peut_être_un_e_mail_4,null,"Peut être un e-mail");
var Types_de_contacts_Peut_être_une_adresse_web__URL__5=new clAttribut("ck_url","contacttype",null);


	/* Ce composant représente: contacttype.ck_url sous le nom "Peut être une adresse web (URL)" */
var Compo_Types_de_contacts_Peut_être_une_adresse_web__URL__5=new clCompoCheckBox(Types_de_contacts_Peut_être_une_adresse_web__URL__5,null,"Peut être une adresse web (URL)");
var Types_de_contacts_Liste_des_types_de_contacts0=new clEnsembleAttributs("contacttype",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Types_de_contacts_Liste_des_types_de_contacts0)
	,new clLiaison(null,Col_N1_Code_De_Types_de_contacts_Liste_des_types_de_contacts0)
	),
	new Array(
	new clLiaison(null,Types_de_contacts_Nom_1)
	,new clLiaison(null,Types_de_contacts_Code_2)
	,new clLiaison(null,Types_de_contacts_Peut_être_un_numéro_3)
	,new clLiaison(null,Types_de_contacts_Peut_être_un_e_mail_4)
	,new clLiaison(null,Types_de_contacts_Peut_être_une_adresse_web__URL__5)
	));

var Titre_Types_de_contacts_Liste_des_types_de_contacts0=new Array("Nom","Code");

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Liste des types de contacts" */
var Compo_Types_de_contacts_Liste_des_types_de_contacts0=new clCompoListe(Types_de_contacts_Liste_des_types_de_contacts0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_contacts_Liste_des_types_de_contacts0,"Liste des types de contacts",true,false);

	/* Ce composant représente: contacttype.undefined sous le nom "Liste des types de contacts" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Liste_des_types_de_contacts0.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0"));

 }

	/* On l'ajoute au tableau global à l'indice 1151*/
top.TAB_GLOBAL_COMPO[1151]=Compo_Types_de_contacts_Liste_des_types_de_contacts0;

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Nom" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Nom_1.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1154*/
top.TAB_GLOBAL_COMPO[1154]=Compo_Types_de_contacts_Nom_1;

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Code" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Code_2.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1155*/
top.TAB_GLOBAL_COMPO[1155]=Compo_Types_de_contacts_Code_2;

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Peut être un numéro" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Peut_être_un_numéro_3.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1156*/
top.TAB_GLOBAL_COMPO[1156]=Compo_Types_de_contacts_Peut_être_un_numéro_3;

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Peut être un e-mail" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Peut_être_un_e_mail_4.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1157*/
top.TAB_GLOBAL_COMPO[1157]=Compo_Types_de_contacts_Peut_être_un_e_mail_4;

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Peut être une adresse web (URL)" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Types_de_contacts_Peut_être_une_adresse_web__URL__5.GenererXUL(top.document.getElementById("Types_de_contacts_Liste_des_types_de_contacts0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1158*/
top.TAB_GLOBAL_COMPO[1158]=Compo_Types_de_contacts_Peut_être_une_adresse_web__URL__5;
var Col_N0_Libellé_De_Types_de_journaux_Liste_des_types_de_journaux0=new clAttribut("tj_libelle","typejournal",null);

var Types_de_journaux_Libellé_1=new clAttribut("tj_libelle","typejournal",null);


	/* Ce composant représente: typejournal.tj_libelle sous le nom "Libellé" */
var Compo_Types_de_journaux_Libellé_1=new clCompoTextBox(Types_de_journaux_Libellé_1,null,"Libellé",false,false);
var Types_de_journaux_Liste_des_types_de_journaux0=new clEnsembleAttributs("typejournal",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Types_de_journaux_Liste_des_types_de_journaux0)
	),
	new Array(
	new clLiaison(null,Types_de_journaux_Libellé_1)
	));

var Titre_Types_de_journaux_Liste_des_types_de_journaux0=new Array("Libellé");

	/* Ce composant représente: des éléments de la table typejournal sous le nom "Liste des types de journaux" */
var Compo_Types_de_journaux_Liste_des_types_de_journaux0=new clCompoListe(Types_de_journaux_Liste_des_types_de_journaux0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_journaux_Liste_des_types_de_journaux0,"Liste des types de journaux",true,false);

	/* Ce composant représente: typejournal.undefined sous le nom "Liste des types de journaux" */
 if(ALeDroit(0,"typejournal"))
 {
Compo_Types_de_journaux_Liste_des_types_de_journaux0.GenererXUL(top.document.getElementById("Types_de_journaux_Liste_des_types_de_journaux0"));

 }

	/* On l'ajoute au tableau global à l'indice 1223*/
top.TAB_GLOBAL_COMPO[1223]=Compo_Types_de_journaux_Liste_des_types_de_journaux0;

	/* Ce composant représente: des éléments de la table typejournal sous le nom "Libellé" */
 if(ALeDroit(0,"typejournal"))
 {
Compo_Types_de_journaux_Libellé_1.GenererXUL(top.document.getElementById("Types_de_journaux_Liste_des_types_de_journaux0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1225*/
top.TAB_GLOBAL_COMPO[1225]=Compo_Types_de_journaux_Libellé_1;
var Col_N0_Code_De_Types_de_lien_Liste_des_types_de_lien_entre_personne0=new clAttribut("tl_code","typelien",null);

var Col_N1_Libellé_De_Types_de_lien_Liste_des_types_de_lien_entre_personne0=new clAttribut("tl_libelle","typelien",null);

var Types_de_lien_Code_1=new clAttribut("tl_code","typelien",null);


	/* Ce composant représente: typelien.tl_code sous le nom "Code" */
var Compo_Types_de_lien_Code_1=new clCompoTextBox(Types_de_lien_Code_1,null,"Code",false,false);
var Types_de_lien_Libellé_2=new clAttribut("tl_libelle","typelien",null);


	/* Ce composant représente: typelien.tl_libelle sous le nom "Libellé" */
var Compo_Types_de_lien_Libellé_2=new clCompoTextBox(Types_de_lien_Libellé_2,null,"Libellé",false,false);
var Types_de_lien_Action_de_P1_à_P2_3=new clAttribut("tl_action12","typelien",null);


	/* Ce composant représente: typelien.tl_action12 sous le nom "Action de P1 à P2" */
var Compo_Types_de_lien_Action_de_P1_à_P2_3=new clCompoTextBox(Types_de_lien_Action_de_P1_à_P2_3,null,"Action de P1 à P2",false,false);
var Types_de_lien_Action_de_P2_à_P1_4=new clAttribut("tl_action21","typelien",null);


	/* Ce composant représente: typelien.tl_action21 sous le nom "Action de P2 à P1" */
var Compo_Types_de_lien_Action_de_P2_à_P1_4=new clCompoTextBox(Types_de_lien_Action_de_P2_à_P1_4,null,"Action de P2 à P1",false,false);
var Types_de_lien_Description_5=new clAttribut("tl_description","typelien",null);


	/* Ce composant représente: typelien.tl_description sous le nom "Description" */
var Compo_Types_de_lien_Description_5=new clCompoTextBox(Types_de_lien_Description_5,null,"Description",false,true);
var Types_de_lien_Liste_des_types_de_lien_entre_personne0=new clEnsembleAttributs("typelien",
	new Array(
	new clLiaison(null,Col_N0_Code_De_Types_de_lien_Liste_des_types_de_lien_entre_personne0)
	,new clLiaison(null,Col_N1_Libellé_De_Types_de_lien_Liste_des_types_de_lien_entre_personne0)
	),
	new Array(
	new clLiaison(null,Types_de_lien_Code_1)
	,new clLiaison(null,Types_de_lien_Libellé_2)
	,new clLiaison(null,Types_de_lien_Action_de_P1_à_P2_3)
	,new clLiaison(null,Types_de_lien_Action_de_P2_à_P1_4)
	,new clLiaison(null,Types_de_lien_Description_5)
	));

var Titre_Types_de_lien_Liste_des_types_de_lien_entre_personne0=new Array("Code","Libellé");

	/* Ce composant représente: des éléments de la table typelien sous le nom "Liste des types de lien entre personne" */
var Compo_Types_de_lien_Liste_des_types_de_lien_entre_personne0=new clCompoListe(Types_de_lien_Liste_des_types_de_lien_entre_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_lien_Liste_des_types_de_lien_entre_personne0,"Liste des types de lien entre personne",true,false);

	/* Ce composant représente: typelien.undefined sous le nom "Liste des types de lien entre personne" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Liste_des_types_de_lien_entre_personne0.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0"));

 }

	/* On l'ajoute au tableau global à l'indice 1024*/
top.TAB_GLOBAL_COMPO[1024]=Compo_Types_de_lien_Liste_des_types_de_lien_entre_personne0;

	/* Ce composant représente: des éléments de la table typelien sous le nom "Code" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Code_1.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1027*/
top.TAB_GLOBAL_COMPO[1027]=Compo_Types_de_lien_Code_1;

	/* Ce composant représente: des éléments de la table typelien sous le nom "Libellé" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Libellé_2.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1028*/
top.TAB_GLOBAL_COMPO[1028]=Compo_Types_de_lien_Libellé_2;

	/* Ce composant représente: des éléments de la table typelien sous le nom "Action de P1 à P2" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Action_de_P1_à_P2_3.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1029*/
top.TAB_GLOBAL_COMPO[1029]=Compo_Types_de_lien_Action_de_P1_à_P2_3;

	/* Ce composant représente: des éléments de la table typelien sous le nom "Action de P2 à P1" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Action_de_P2_à_P1_4.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1030*/
top.TAB_GLOBAL_COMPO[1030]=Compo_Types_de_lien_Action_de_P2_à_P1_4;

	/* Ce composant représente: des éléments de la table typelien sous le nom "Description" */
 if(ALeDroit(0,"typelien"))
 {
Compo_Types_de_lien_Description_5.GenererXUL(top.document.getElementById("Types_de_lien_Liste_des_types_de_lien_entre_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1031*/
top.TAB_GLOBAL_COMPO[1031]=Compo_Types_de_lien_Description_5;
var Col_N0_Libellé_De_Types_de_personne_Liste_des_types_de_personne0=new clAttribut("tp_type","typepersonne",null);

var Types_de_personne_Libellé_1=new clAttribut("tp_type","typepersonne",null);


	/* Ce composant représente: typepersonne.tp_type sous le nom "Libellé" */
var Compo_Types_de_personne_Libellé_1=new clCompoTextBox(Types_de_personne_Libellé_1,null,"Libellé",false,false);
var Types_de_personne_Liste_des_types_de_personne0=new clEnsembleAttributs("typepersonne",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Types_de_personne_Liste_des_types_de_personne0)
	),
	new Array(
	new clLiaison(null,Types_de_personne_Libellé_1)
	));

var Titre_Types_de_personne_Liste_des_types_de_personne0=new Array("Libellé");

	/* Ce composant représente: des éléments de la table typepersonne sous le nom "Liste des types de personne" */
var Compo_Types_de_personne_Liste_des_types_de_personne0=new clCompoListe(Types_de_personne_Liste_des_types_de_personne0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_personne_Liste_des_types_de_personne0,"Liste des types de personne",true,false);

	/* Ce composant représente: typepersonne.undefined sous le nom "Liste des types de personne" */
 if(ALeDroit(0,"typepersonne"))
 {
Compo_Types_de_personne_Liste_des_types_de_personne0.GenererXUL(top.document.getElementById("Types_de_personne_Liste_des_types_de_personne0"));

 }

	/* On l'ajoute au tableau global à l'indice 1035*/
top.TAB_GLOBAL_COMPO[1035]=Compo_Types_de_personne_Liste_des_types_de_personne0;

	/* Ce composant représente: des éléments de la table typepersonne sous le nom "Libellé" */
 if(ALeDroit(0,"typepersonne"))
 {
Compo_Types_de_personne_Libellé_1.GenererXUL(top.document.getElementById("Types_de_personne_Liste_des_types_de_personne0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1037*/
top.TAB_GLOBAL_COMPO[1037]=Compo_Types_de_personne_Libellé_1;
var Col_N0_Nom_De_Types_de_sociétés_Liste_des_types_de_sociétés0=new clAttribut("ts_libelle","typesociete",null);

var Types_de_sociétés_Nom_1=new clAttribut("ts_libelle","typesociete",null);


	/* Ce composant représente: typesociete.ts_libelle sous le nom "Nom" */
var Compo_Types_de_sociétés_Nom_1=new clCompoTextBox(Types_de_sociétés_Nom_1,null,"Nom",false,false);
var Types_de_sociétés_Liste_des_types_de_sociétés0=new clEnsembleAttributs("typesociete",
	new Array(
	new clLiaison(null,Col_N0_Nom_De_Types_de_sociétés_Liste_des_types_de_sociétés0)
	),
	new Array(
	new clLiaison(null,Types_de_sociétés_Nom_1)
	));

var Titre_Types_de_sociétés_Liste_des_types_de_sociétés0=new Array("Nom");

	/* Ce composant représente: des éléments de la table typesociete sous le nom "Liste des types de sociétés" */
var Compo_Types_de_sociétés_Liste_des_types_de_sociétés0=new clCompoListe(Types_de_sociétés_Liste_des_types_de_sociétés0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_sociétés_Liste_des_types_de_sociétés0,"Liste des types de sociétés",true,false);

	/* Ce composant représente: typesociete.undefined sous le nom "Liste des types de sociétés" */
 if(ALeDroit(0,"typesociete"))
 {
Compo_Types_de_sociétés_Liste_des_types_de_sociétés0.GenererXUL(top.document.getElementById("Types_de_sociétés_Liste_des_types_de_sociétés0"));

 }

	/* On l'ajoute au tableau global à l'indice 1049*/
top.TAB_GLOBAL_COMPO[1049]=Compo_Types_de_sociétés_Liste_des_types_de_sociétés0;

	/* Ce composant représente: des éléments de la table typesociete sous le nom "Nom" */
 if(ALeDroit(0,"typesociete"))
 {
Compo_Types_de_sociétés_Nom_1.GenererXUL(top.document.getElementById("Types_de_sociétés_Liste_des_types_de_sociétés0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1051*/
top.TAB_GLOBAL_COMPO[1051]=Compo_Types_de_sociétés_Nom_1;
var Col_N0_Libellé_De_Types_de_tâches_Liste_des_types_de_tâches0=new clAttribut("th_libelle","typetache",null);

var Types_de_tâches_Libellé_1=new clAttribut("th_libelle","typetache",null);


	/* Ce composant représente: typetache.th_libelle sous le nom "Libellé" */
var Compo_Types_de_tâches_Libellé_1=new clCompoTextBox(Types_de_tâches_Libellé_1,null,"Libellé",false,false);
var Types_de_tâches_Description_2=new clAttribut("th_description","typetache",null);


	/* Ce composant représente: typetache.th_description sous le nom "Description" */
var Compo_Types_de_tâches_Description_2=new clCompoTextBox(Types_de_tâches_Description_2,null,"Description",false,true);
var Types_de_tâches_Liste_des_types_de_tâches0=new clEnsembleAttributs("typetache",
	new Array(
	new clLiaison(null,Col_N0_Libellé_De_Types_de_tâches_Liste_des_types_de_tâches0)
	),
	new Array(
	new clLiaison(null,Types_de_tâches_Libellé_1)
	,new clLiaison(null,Types_de_tâches_Description_2)
	));

var Titre_Types_de_tâches_Liste_des_types_de_tâches0=new Array("Libellé");

	/* Ce composant représente: des éléments de la table typetache sous le nom "Liste des types de tâches" */
var Compo_Types_de_tâches_Liste_des_types_de_tâches0=new clCompoListe(Types_de_tâches_Liste_des_types_de_tâches0,new Array(new clInterfaceFiltrageVide()),Titre_Types_de_tâches_Liste_des_types_de_tâches0,"Liste des types de tâches",true,false);

	/* Ce composant représente: typetache.undefined sous le nom "Liste des types de tâches" */
 if(ALeDroit(0,"typetache"))
 {
Compo_Types_de_tâches_Liste_des_types_de_tâches0.GenererXUL(top.document.getElementById("Types_de_tâches_Liste_des_types_de_tâches0"));

 }

	/* On l'ajoute au tableau global à l'indice 1003*/
top.TAB_GLOBAL_COMPO[1003]=Compo_Types_de_tâches_Liste_des_types_de_tâches0;

	/* Ce composant représente: des éléments de la table typetache sous le nom "Libellé" */
 if(ALeDroit(0,"typetache"))
 {
Compo_Types_de_tâches_Libellé_1.GenererXUL(top.document.getElementById("Types_de_tâches_Liste_des_types_de_tâches0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1005*/
top.TAB_GLOBAL_COMPO[1005]=Compo_Types_de_tâches_Libellé_1;

	/* Ce composant représente: des éléments de la table typetache sous le nom "Description" */
 if(ALeDroit(0,"typetache"))
 {
Compo_Types_de_tâches_Description_2.GenererXUL(top.document.getElementById("Types_de_tâches_Liste_des_types_de_tâches0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1006*/
top.TAB_GLOBAL_COMPO[1006]=Compo_Types_de_tâches_Description_2;
var Col_N0_N__De_Villes_Liste_des_villes0=new clAttribut("vi_numero","ville",null);

var Col_N1_Nom_De_Villes_Liste_des_villes0=new clAttribut("vi_nom","ville",null);

var Col_N2_Canton_De_Villes_Liste_des_villes0=new clAttribut("ct_nom","canton",null);

var Joint_Col_N2_Canton_De_Villes_Liste_des_villes0=new clJointureMulti("ville",
	new Array(
	new stJointure("canton","ct_numero","ct_numero",null,true)
	));
var Villes_Nom_1=new clAttribut("vi_nom","ville",null);


	/* Ce composant représente: ville.vi_nom sous le nom "Nom" */
var Compo_Villes_Nom_1=new clCompoTextBox(Villes_Nom_1,null,"Nom",false,false);
var Villes_Canton_2=new clAttribut("ct_nom","canton",null);


	/* Ce composant représente: canton.ct_nom sous le nom "Canton" */
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

var Titre_Villes_Liste_des_villes0=new Array("N°","Nom","Canton");

	/* Ce composant représente: des éléments de la table ville sous le nom "Liste des villes" */
var Compo_Villes_Liste_des_villes0=new clCompoListe(Villes_Liste_des_villes0,new Array(new clInterfaceFiltrageVide()),Titre_Villes_Liste_des_villes0,"Liste des villes",true,false);

	/* Ce composant représente: ville.undefined sous le nom "Liste des villes" */
 if(ALeDroit(0,"ville"))
 {
Compo_Villes_Liste_des_villes0.GenererXUL(top.document.getElementById("Villes_Liste_des_villes0"));

 }

	/* On l'ajoute au tableau global à l'indice 1133*/
top.TAB_GLOBAL_COMPO[1133]=Compo_Villes_Liste_des_villes0;

	/* Ce composant représente: des éléments de la table ville sous le nom "Nom" */
 if(ALeDroit(0,"ville"))
 {
Compo_Villes_Nom_1.GenererXUL(top.document.getElementById("Villes_Liste_des_villes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1137*/
top.TAB_GLOBAL_COMPO[1137]=Compo_Villes_Nom_1;

	/* Ce composant représente: des éléments de la table canton sous le nom "Canton" */
 if(ALeDroit(0,"canton"))
 {
Compo_Villes_Canton_2.GenererXUL(top.document.getElementById("Villes_Liste_des_villes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1138*/
top.TAB_GLOBAL_COMPO[1138]=Compo_Villes_Canton_2;
Filtre_Dep_Accès_0.setComposant(TAB_GLOBAL_COMPO[978],null);
   /* ARBRE DU DESSUS */
   var box=top.document.getElementById("ListeDessus_Adhérence_Périodes_de_validité_7");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessus_Adhérence_Périodes_de_validité_7");
   tree.setAttribute("ondblclick","DoubleClic_ArbreDessus(document.getElementById('Tree_ListeDessus_Adhérence_Périodes_de_validité_7'), document.getElementById('Tree_ListeDessous_Adhérence_Périodes_de_validité_7'))");

   /* ARBRE DU DESSOUS */
   var box=top.document.getElementById("Adhérence_Périodes_de_validité_7");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessous_Adhérence_Périodes_de_validité_7");
   tree.setAttribute("onkeypress","Suppr_ListeDessous(event)");

Filtre_Dep_Agents_0.setComposant(TAB_GLOBAL_COMPO[1114],null);
Filtre_Dep_Agents_1.setComposant(TAB_GLOBAL_COMPO[1114],null);
Filtre_Dep_Cantons_0.setComposant(TAB_GLOBAL_COMPO[1159],null);
   /* ARBRE DU DESSUS */
   var box=top.document.getElementById("ListeDessus_Codes_postaux_Villes_liées_au_code_postal_4");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessus_Codes_postaux_Villes_liées_au_code_postal_4");
   tree.setAttribute("ondblclick","DoubleClic_ArbreDessus(document.getElementById('Tree_ListeDessus_Codes_postaux_Villes_liées_au_code_postal_4'), document.getElementById('Tree_ListeDessous_Codes_postaux_Villes_liées_au_code_postal_4'))");

   /* ARBRE DU DESSOUS */
   var box=top.document.getElementById("Codes_postaux_Villes_liées_au_code_postal_4");
   var Tab=ChercherCompo(box,"tree");
   var tree=Tab[0];
   tree.setAttribute("id","Tree_ListeDessous_Codes_postaux_Villes_liées_au_code_postal_4");
   tree.setAttribute("onkeypress","Suppr_ListeDessous(event)");

Filtre_Dep_Profils_de_droits_0.setComposant(TAB_GLOBAL_COMPO[1098],null);
Filtre_DepFor_Employés_0.setComposant(TAB_GLOBAL_COMPO[1082],null);
Filtre_Dep_Équipes_0.setComposant(TAB_GLOBAL_COMPO[1130],null);
Filtre_Dep_Groupe_de_tables_0.setComposant(TAB_GLOBAL_COMPO[1109],null);
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

Filtre_Dep_Périodes_0.setComposant(TAB_GLOBAL_COMPO[1217],null);
Filtre_Dep_Produits_0.setComposant(TAB_GLOBAL_COMPO[1180],null);
Filtre_Dep_Produits_1.setComposant(TAB_GLOBAL_COMPO[1180],null);
Filtre_Dep_Séquences_0.setComposant(TAB_GLOBAL_COMPO[1064],null);
Filtre_DepFor_Services_0.setComposant(TAB_GLOBAL_COMPO[1072],null);
Filtre_Dep_TVA_0.setComposant(TAB_GLOBAL_COMPO[1172],null);
Filtre_Dep_Types_de_lien_0.setComposant(TAB_GLOBAL_COMPO[1024],null);
Filtre_Dep_Types_de_sociétés_0.setComposant(TAB_GLOBAL_COMPO[1049],null);
Filtre_Dep_Villes_0.setComposant(TAB_GLOBAL_COMPO[1133],null);
 if(ALeDroit(5,"acces"))
 {
/* On refresh les composants non dépendents de l'onget Accès*/
var Composant_0 = TAB_GLOBAL_COMPO[978];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Accès").hidden=true;
if (top.document.getElementById("Onglet_Accès").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"acces"))
 {
nb_button++;
top.document.getElementById("Insert_Accès_Liste_des_niveaux_d_accès0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Accès_Liste_des_niveaux_d_accès0").hidden=true;

 }
 if(ALeDroit(4,"acces"))
 {
nb_button++;
top.document.getElementById("Delete_Accès_Liste_des_niveaux_d_accès0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Accès_Liste_des_niveaux_d_accès0").hidden=true;

 }
 if(ALeDroit(1,"acces"))
 {
nb_button++;
top.document.getElementById("Update_Accès_Liste_des_niveaux_d_accès0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Accès_Liste_des_niveaux_d_accès0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Accès_Liste_des_niveaux_d_accès0").hidden=true;
        top.document.getElementById("Annuler_Accès_Liste_des_niveaux_d_accès0").hidden=true;
}
 if(ALeDroit(5,"adherence"))
 {
/* On refresh les composants non dépendents de l'onget Adhérence*/
var Composant_0 = TAB_GLOBAL_COMPO[1202];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}
var Composant_6 = TAB_GLOBAL_COMPO[1211];
if (Composant_6!=null){
Composant_6.ActiverComposant(true);
Composant_6.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Adhérence").hidden=true;
if (top.document.getElementById("Onglet_Adhérence").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"adherence"))
 {
nb_button++;
top.document.getElementById("Insert_Adhérence_Liste_des_adhérences0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Adhérence_Liste_des_adhérences0").hidden=true;

 }
 if(ALeDroit(4,"adherence"))
 {
nb_button++;
top.document.getElementById("Delete_Adhérence_Liste_des_adhérences0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Adhérence_Liste_des_adhérences0").hidden=true;

 }
 if(ALeDroit(1,"adherence"))
 {
nb_button++;
top.document.getElementById("Update_Adhérence_Liste_des_adhérences0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Adhérence_Liste_des_adhérences0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Adhérence_Liste_des_adhérences0").hidden=true;
        top.document.getElementById("Annuler_Adhérence_Liste_des_adhérences0").hidden=true;
}
 if(ALeDroit(5,"agent"))
 {
/* On refresh les composants non dépendents de l'onget Agents*/
var Composant_0 = TAB_GLOBAL_COMPO[1114];
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
/* On refresh les composants non dépendents de l'onget Cantons*/
var Composant_0 = TAB_GLOBAL_COMPO[1159];
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
/* On refresh les composants non dépendents de l'onget Codes postaux*/
var Composant_0 = TAB_GLOBAL_COMPO[1139];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}
var Composant_3 = TAB_GLOBAL_COMPO[1145];
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
/* On refresh les composants non dépendents de l'onget Profils de droits*/
var Composant_0 = TAB_GLOBAL_COMPO[1098];
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
/* On refresh les composants non dépendents de l'onget Employés*/
var Composant_0 = TAB_GLOBAL_COMPO[1082];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Employés").hidden=true;
if (top.document.getElementById("Onglet_Employés").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"employe"))
 {
nb_button++;
top.document.getElementById("Insert_Employés_Liste_des_employés0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Employés_Liste_des_employés0").hidden=true;

 }
 if(ALeDroit(4,"employe"))
 {
nb_button++;
top.document.getElementById("Delete_Employés_Liste_des_employés0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Employés_Liste_des_employés0").hidden=true;

 }
 if(ALeDroit(1,"employe"))
 {
nb_button++;
top.document.getElementById("Update_Employés_Liste_des_employés0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Employés_Liste_des_employés0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Employés_Liste_des_employés0").hidden=true;
        top.document.getElementById("Annuler_Employés_Liste_des_employés0").hidden=true;
}
 if(ALeDroit(5,"equipe"))
 {
/* On refresh les composants non dépendents de l'onget Équipes*/
var Composant_0 = TAB_GLOBAL_COMPO[1130];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Équipes").hidden=true;
if (top.document.getElementById("Onglet_Équipes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"equipe"))
 {
nb_button++;
top.document.getElementById("Insert_Équipes_Liste_des_équipes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Équipes_Liste_des_équipes0").hidden=true;

 }
 if(ALeDroit(4,"equipe"))
 {
nb_button++;
top.document.getElementById("Delete_Équipes_Liste_des_équipes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Équipes_Liste_des_équipes0").hidden=true;

 }
 if(ALeDroit(1,"equipe"))
 {
nb_button++;
top.document.getElementById("Update_Équipes_Liste_des_équipes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Équipes_Liste_des_équipes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Équipes_Liste_des_équipes0").hidden=true;
        top.document.getElementById("Annuler_Équipes_Liste_des_équipes0").hidden=true;
}
 if(ALeDroit(5,"groupetable"))
 {
/* On refresh les composants non dépendents de l'onget Groupe de tables*/
var Composant_0 = TAB_GLOBAL_COMPO[1109];
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
/* On refresh les composants non dépendents de l'onget Groupes de cantons*/
var Composant_0 = TAB_GLOBAL_COMPO[1015];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}
var Composant_2 = TAB_GLOBAL_COMPO[1019];
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
/* On refresh les composants non dépendents de l'onget Modèles d'impressions*/
var Composant_0 = TAB_GLOBAL_COMPO[1241];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Modèles_d_impressions").hidden=true;
if (top.document.getElementById("Onglet_Modèles_d_impressions").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"impression"))
 {
nb_button++;
top.document.getElementById("Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Modèles_d_impressions_Liste_des_modèles_d_impressions0").hidden=true;

 }
 if(ALeDroit(4,"impression"))
 {
nb_button++;
top.document.getElementById("Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Modèles_d_impressions_Liste_des_modèles_d_impressions0").hidden=true;

 }
 if(ALeDroit(1,"impression"))
 {
nb_button++;
top.document.getElementById("Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Modèles_d_impressions_Liste_des_modèles_d_impressions0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Modèles_d_impressions_Liste_des_modèles_d_impressions0").hidden=true;
        top.document.getElementById("Annuler_Modèles_d_impressions_Liste_des_modèles_d_impressions0").hidden=true;
}
 if(ALeDroit(5,"table_impression"))
 {
/* On refresh les composants non dépendents de l'onget Impressions*/
var Composant_0 = TAB_GLOBAL_COMPO[1251];
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
top.document.getElementById("Insert_Impressions_Liste_des_modèles_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Impressions_Liste_des_modèles_d_impressions0").hidden=true;

 }
 if(ALeDroit(4,"table_impression"))
 {
nb_button++;
top.document.getElementById("Delete_Impressions_Liste_des_modèles_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Impressions_Liste_des_modèles_d_impressions0").hidden=true;

 }
 if(ALeDroit(1,"table_impression"))
 {
nb_button++;
top.document.getElementById("Update_Impressions_Liste_des_modèles_d_impressions0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Impressions_Liste_des_modèles_d_impressions0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Impressions_Liste_des_modèles_d_impressions0").hidden=true;
        top.document.getElementById("Annuler_Impressions_Liste_des_modèles_d_impressions0").hidden=true;
}
 if(ALeDroit(5,"modele"))
 {
/* On refresh les composants non dépendents de l'onget Modèles*/
var Composant_0 = TAB_GLOBAL_COMPO[1229];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Modèles").hidden=true;
if (top.document.getElementById("Onglet_Modèles").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"modele"))
 {
nb_button++;
top.document.getElementById("Insert_Modèles_Liste_des_modèles0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Modèles_Liste_des_modèles0").hidden=true;

 }
 if(ALeDroit(4,"modele"))
 {
nb_button++;
top.document.getElementById("Delete_Modèles_Liste_des_modèles0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Modèles_Liste_des_modèles0").hidden=true;

 }
 if(ALeDroit(1,"modele"))
 {
nb_button++;
top.document.getElementById("Update_Modèles_Liste_des_modèles0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Modèles_Liste_des_modèles0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Modèles_Liste_des_modèles0").hidden=true;
        top.document.getElementById("Annuler_Modèles_Liste_des_modèles0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"lignemodele"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Modèles_Lignes_du_modèle_2").hidden=true;

 }
 if(ALeDroit(4,"lignemodele"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Modèles_Lignes_du_modèle_2").hidden=true;

 }
 if(ALeDroit(1,"lignemodele"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Modèles_Lignes_du_modèle_2").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Modèles_Lignes_du_modèle_2").hidden=true;
        top.document.getElementById("Annuler_Modèles_Lignes_du_modèle_2").hidden=true;
}
 if(ALeDroit(5,"modereglement"))
 {
/* On refresh les composants non dépendents de l'onget Mode de réglements*/
var Composant_0 = TAB_GLOBAL_COMPO[984];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Mode_de_réglements").hidden=true;
if (top.document.getElementById("Onglet_Mode_de_réglements").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"modereglement"))
 {
nb_button++;
top.document.getElementById("Insert_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Mode_de_réglements_Liste_des_modes_de_réglement0").hidden=true;

 }
 if(ALeDroit(4,"modereglement"))
 {
nb_button++;
top.document.getElementById("Delete_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Mode_de_réglements_Liste_des_modes_de_réglement0").hidden=true;

 }
 if(ALeDroit(1,"modereglement"))
 {
nb_button++;
top.document.getElementById("Update_Mode_de_réglements_Liste_des_modes_de_réglement0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Mode_de_réglements_Liste_des_modes_de_réglement0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Mode_de_réglements_Liste_des_modes_de_réglement0").hidden=true;
        top.document.getElementById("Annuler_Mode_de_réglements_Liste_des_modes_de_réglement0").hidden=true;
}
 if(ALeDroit(5,"moderepartition"))
 {
/* On refresh les composants non dépendents de l'onget Modes de répartition*/
var Composant_0 = TAB_GLOBAL_COMPO[994];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Modes_de_répartition").hidden=true;
if (top.document.getElementById("Onglet_Modes_de_répartition").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"moderepartition"))
 {
nb_button++;
top.document.getElementById("Insert_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Modes_de_répartition_Liste_des_modes_de_répartition0").hidden=true;

 }
 if(ALeDroit(4,"moderepartition"))
 {
nb_button++;
top.document.getElementById("Delete_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Modes_de_répartition_Liste_des_modes_de_répartition0").hidden=true;

 }
 if(ALeDroit(1,"moderepartition"))
 {
nb_button++;
top.document.getElementById("Update_Modes_de_répartition_Liste_des_modes_de_répartition0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Modes_de_répartition_Liste_des_modes_de_répartition0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Modes_de_répartition_Liste_des_modes_de_répartition0").hidden=true;
        top.document.getElementById("Annuler_Modes_de_répartition_Liste_des_modes_de_répartition0").hidden=true;
}
 if(ALeDroit(5,"naturepersonne"))
 {
/* On refresh les composants non dépendents de l'onget Natures de personne*/
var Composant_0 = TAB_GLOBAL_COMPO[1038];
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
top.document.getElementById("Insert_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Natures_de_personne_Liste_des_états_de_personne0").hidden=true;

 }
 if(ALeDroit(4,"naturepersonne"))
 {
nb_button++;
top.document.getElementById("Delete_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Natures_de_personne_Liste_des_états_de_personne0").hidden=true;

 }
 if(ALeDroit(1,"naturepersonne"))
 {
nb_button++;
top.document.getElementById("Update_Natures_de_personne_Liste_des_états_de_personne0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Natures_de_personne_Liste_des_états_de_personne0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Natures_de_personne_Liste_des_états_de_personne0").hidden=true;
        top.document.getElementById("Annuler_Natures_de_personne_Liste_des_états_de_personne0").hidden=true;
}
 if(ALeDroit(5,"periode"))
 {
/* On refresh les composants non dépendents de l'onget Périodes*/
var Composant_0 = TAB_GLOBAL_COMPO[1217];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Périodes").hidden=true;
if (top.document.getElementById("Onglet_Périodes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"periode"))
 {
nb_button++;
top.document.getElementById("Insert_Périodes_Liste_des_périodes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Périodes_Liste_des_périodes0").hidden=true;

 }
 if(ALeDroit(4,"periode"))
 {
nb_button++;
top.document.getElementById("Delete_Périodes_Liste_des_périodes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Périodes_Liste_des_périodes0").hidden=true;

 }
 if(ALeDroit(1,"periode"))
 {
nb_button++;
top.document.getElementById("Update_Périodes_Liste_des_périodes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Périodes_Liste_des_périodes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Périodes_Liste_des_périodes0").hidden=true;
        top.document.getElementById("Annuler_Périodes_Liste_des_périodes0").hidden=true;
}
 if(ALeDroit(5,"prefixe"))
 {
/* On refresh les composants non dépendents de l'onget Préfixes*/
var Composant_0 = TAB_GLOBAL_COMPO[1226];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Préfixes").hidden=true;
if (top.document.getElementById("Onglet_Préfixes").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"prefixe"))
 {
nb_button++;
top.document.getElementById("Insert_Préfixes_Liste_des_préfixes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Préfixes_Liste_des_préfixes0").hidden=true;

 }
 if(ALeDroit(4,"prefixe"))
 {
nb_button++;
top.document.getElementById("Delete_Préfixes_Liste_des_préfixes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Préfixes_Liste_des_préfixes0").hidden=true;

 }
 if(ALeDroit(1,"prefixe"))
 {
nb_button++;
top.document.getElementById("Update_Préfixes_Liste_des_préfixes0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Préfixes_Liste_des_préfixes0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Préfixes_Liste_des_préfixes0").hidden=true;
        top.document.getElementById("Annuler_Préfixes_Liste_des_préfixes0").hidden=true;
}
 if(ALeDroit(5,"produit"))
 {
/* On refresh les composants non dépendents de l'onget Produits*/
var Composant_0 = TAB_GLOBAL_COMPO[1180];
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
top.document.getElementById("Insert_Produits_Comptes_généraux_11").hidden=true;

 }
 if(ALeDroit(4,"compteproduit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Produits_Comptes_généraux_11").hidden=true;

 }
 if(ALeDroit(1,"compteproduit"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Produits_Comptes_généraux_11").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Produits_Comptes_généraux_11").hidden=true;
        top.document.getElementById("Annuler_Produits_Comptes_généraux_11").hidden=true;
}
 if(ALeDroit(5,"responsabilite"))
 {
/* On refresh les composants non dépendents de l'onget Responsabilités*/
var Composant_0 = TAB_GLOBAL_COMPO[1165];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Responsabilités").hidden=true;
if (top.document.getElementById("Onglet_Responsabilités").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"responsabilite"))
 {
nb_button++;
top.document.getElementById("Insert_Responsabilités_Responsabilités0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Responsabilités_Responsabilités0").hidden=true;

 }
 if(ALeDroit(4,"responsabilite"))
 {
nb_button++;
top.document.getElementById("Delete_Responsabilités_Responsabilités0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Responsabilités_Responsabilités0").hidden=true;

 }
 if(ALeDroit(1,"responsabilite"))
 {
nb_button++;
top.document.getElementById("Update_Responsabilités_Responsabilités0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Responsabilités_Responsabilités0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Responsabilités_Responsabilités0").hidden=true;
        top.document.getElementById("Annuler_Responsabilités_Responsabilités0").hidden=true;
}
 if(ALeDroit(5,"sequence"))
 {
/* On refresh les composants non dépendents de l'onget Séquences*/
var Composant_0 = TAB_GLOBAL_COMPO[1064];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Séquences").hidden=true;
if (top.document.getElementById("Onglet_Séquences").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"sequence"))
 {
nb_button++;
top.document.getElementById("Insert_Séquences_Liste_des_séquences0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Séquences_Liste_des_séquences0").hidden=true;

 }
 if(ALeDroit(4,"sequence"))
 {
nb_button++;
top.document.getElementById("Delete_Séquences_Liste_des_séquences0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Séquences_Liste_des_séquences0").hidden=true;

 }
 if(ALeDroit(1,"sequence"))
 {
nb_button++;
top.document.getElementById("Update_Séquences_Liste_des_séquences0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Séquences_Liste_des_séquences0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Séquences_Liste_des_séquences0").hidden=true;
        top.document.getElementById("Annuler_Séquences_Liste_des_séquences0").hidden=true;
}
 if(ALeDroit(5,"service"))
 {
/* On refresh les composants non dépendents de l'onget Services*/
var Composant_0 = TAB_GLOBAL_COMPO[1072];
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
/* On refresh les composants non dépendents de l'onget Sociétés*/
var Composant_0 = TAB_GLOBAL_COMPO[1052];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Sociétés").hidden=true;
if (top.document.getElementById("Onglet_Sociétés").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"societe"))
 {
nb_button++;
top.document.getElementById("Insert_Sociétés_Liste_des_sociétés0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Sociétés_Liste_des_sociétés0").hidden=true;

 }
 if(ALeDroit(4,"societe"))
 {
nb_button++;
top.document.getElementById("Delete_Sociétés_Liste_des_sociétés0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Sociétés_Liste_des_sociétés0").hidden=true;

 }
 if(ALeDroit(1,"societe"))
 {
nb_button++;
top.document.getElementById("Update_Sociétés_Liste_des_sociétés0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Sociétés_Liste_des_sociétés0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Sociétés_Liste_des_sociétés0").hidden=true;
        top.document.getElementById("Annuler_Sociétés_Liste_des_sociétés0").hidden=true;
}
 if(ALeDroit(5,"tva"))
 {
/* On refresh les composants non dépendents de l'onget TVA*/
var Composant_0 = TAB_GLOBAL_COMPO[1172];
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
/* On refresh les composants non dépendents de l'onget Types d'adresses*/
var Composant_0 = TAB_GLOBAL_COMPO[1032];
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
/* On refresh les composants non dépendents de l'onget Types d'attribut*/
var Composant_0 = TAB_GLOBAL_COMPO[1007];
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
top.document.getElementById("Insert_Types_d_attribut_Catégories_2").hidden=true;

 }
 if(ALeDroit(4,"categorie"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Types_d_attribut_Catégories_2").hidden=true;

 }
 if(ALeDroit(1,"categorie"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Types_d_attribut_Catégories_2").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_d_attribut_Catégories_2").hidden=true;
        top.document.getElementById("Annuler_Types_d_attribut_Catégories_2").hidden=true;
}
 if(ALeDroit(5,"contacttype"))
 {
/* On refresh les composants non dépendents de l'onget Types de contacts*/
var Composant_0 = TAB_GLOBAL_COMPO[1151];
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
/* On refresh les composants non dépendents de l'onget Types de journaux*/
var Composant_0 = TAB_GLOBAL_COMPO[1223];
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
/* On refresh les composants non dépendents de l'onget Types de lien*/
var Composant_0 = TAB_GLOBAL_COMPO[1024];
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
/* On refresh les composants non dépendents de l'onget Types de personne*/
var Composant_0 = TAB_GLOBAL_COMPO[1035];
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
/* On refresh les composants non dépendents de l'onget Types de sociétés*/
var Composant_0 = TAB_GLOBAL_COMPO[1049];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_sociétés").hidden=true;
if (top.document.getElementById("Onglet_Types_de_sociétés").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typesociete"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_sociétés_Liste_des_types_de_sociétés0").hidden=true;

 }
 if(ALeDroit(4,"typesociete"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_sociétés_Liste_des_types_de_sociétés0").hidden=true;

 }
 if(ALeDroit(1,"typesociete"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_sociétés_Liste_des_types_de_sociétés0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_sociétés_Liste_des_types_de_sociétés0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_sociétés_Liste_des_types_de_sociétés0").hidden=true;
        top.document.getElementById("Annuler_Types_de_sociétés_Liste_des_types_de_sociétés0").hidden=true;
}
 if(ALeDroit(5,"typetache"))
 {
/* On refresh les composants non dépendents de l'onget Types de tâches*/
var Composant_0 = TAB_GLOBAL_COMPO[1003];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Types_de_tâches").hidden=true;
if (top.document.getElementById("Onglet_Types_de_tâches").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"typetache"))
 {
nb_button++;
top.document.getElementById("Insert_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Types_de_tâches_Liste_des_types_de_tâches0").hidden=true;

 }
 if(ALeDroit(4,"typetache"))
 {
nb_button++;
top.document.getElementById("Delete_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Types_de_tâches_Liste_des_types_de_tâches0").hidden=true;

 }
 if(ALeDroit(1,"typetache"))
 {
nb_button++;
top.document.getElementById("Update_Types_de_tâches_Liste_des_types_de_tâches0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Types_de_tâches_Liste_des_types_de_tâches0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Types_de_tâches_Liste_des_types_de_tâches0").hidden=true;
        top.document.getElementById("Annuler_Types_de_tâches_Liste_des_types_de_tâches0").hidden=true;
}
 if(ALeDroit(5,"ville"))
 {
/* On refresh les composants non dépendents de l'onget Villes*/
var Composant_0 = TAB_GLOBAL_COMPO[1133];
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
