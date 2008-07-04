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
var TAB_COMPO_PPTES = new Array(1486);
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
 TAB_COMPO_PPTES[1262].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1262].NewCle = getNewCle("personne");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1262].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1265];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1266];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1267];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1268];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1269];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1270];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1271];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1272];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Observations_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=true;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=false;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=false;
top.document.getElementById("Update_Personnes_Observations_9").disabled=false;
 var Esclave_8=TAB_GLOBAL_COMPO[1279];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=false;
 var Esclave_9=TAB_GLOBAL_COMPO[1284];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=false;
top.document.getElementById("Update_Personnes_Contact_20").disabled=false;
 var Esclave_10=TAB_GLOBAL_COMPO[1296];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=false;
 var Esclave_11=TAB_GLOBAL_COMPO[1301];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=false;
 var Esclave_12=TAB_GLOBAL_COMPO[1312];
 Esclave_12.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=false;
 var Esclave_13=TAB_GLOBAL_COMPO[1324];
 Esclave_13.ActiverComposant(true);
 var Esclave_14=TAB_GLOBAL_COMPO[1330];
 Esclave_14.ActiverComposant(true);
 var Esclave_15=TAB_GLOBAL_COMPO[1336];
 Esclave_15.ActiverComposant(true);
 var Esclave_16=TAB_GLOBAL_COMPO[1344];
 Esclave_16.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_42").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=false;
top.document.getElementById("Update_Personnes_Routages_42").disabled=false;
 var Esclave_17=TAB_GLOBAL_COMPO[1350];
 Esclave_17.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1262];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1262].NewCle;
}

function Delete_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[1262].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1262];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1262].Action_en_cours = DELETE;
         User_Delete_Personnes_Liste_des_personnes0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[1262].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1262].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1262].NewCle = TAB_GLOBAL_COMPO[1262].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1262].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1265];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1266];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1267];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1268];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1269];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1270];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1271];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1272];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Observations_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=true;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=false;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=false;
top.document.getElementById("Update_Personnes_Observations_9").disabled=false;
 var Esclave_8=TAB_GLOBAL_COMPO[1279];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=false;
 var Esclave_9=TAB_GLOBAL_COMPO[1284];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=false;
top.document.getElementById("Update_Personnes_Contact_20").disabled=false;
 var Esclave_10=TAB_GLOBAL_COMPO[1296];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=false;
 var Esclave_11=TAB_GLOBAL_COMPO[1301];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=false;
 var Esclave_12=TAB_GLOBAL_COMPO[1312];
 Esclave_12.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=false;
 var Esclave_13=TAB_GLOBAL_COMPO[1324];
 Esclave_13.ActiverComposant(true);
 var Esclave_14=TAB_GLOBAL_COMPO[1330];
 Esclave_14.ActiverComposant(true);
 var Esclave_15=TAB_GLOBAL_COMPO[1336];
 Esclave_15.ActiverComposant(true);
 var Esclave_16=TAB_GLOBAL_COMPO[1344];
 Esclave_16.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_42").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=false;
top.document.getElementById("Update_Personnes_Routages_42").disabled=false;
 var Esclave_17=TAB_GLOBAL_COMPO[1350];
 Esclave_17.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
return TAB_COMPO_PPTES[1262].NewCle;
}

function Validate_Personnes_Liste_des_personnes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1262];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1262].Action_en_cours){
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
 TAB_GLOBAL_COMPO[1262].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1265];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1266];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1267];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1268];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1269];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1270];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1271];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1272];
 Esclave_7.ActiverComposant(false);
Annuler_Personnes_Observations_9();
top.document.getElementById("Validate_Personnes_Observations_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=true;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=true;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=true;
top.document.getElementById("Update_Personnes_Observations_9").disabled=true;
 var Esclave_8=TAB_GLOBAL_COMPO[1279];
 Esclave_8.ActiverComposant(false);
Annuler_Personnes_Adresses_12();
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=true;
 var Esclave_9=TAB_GLOBAL_COMPO[1284];
 Esclave_9.ActiverComposant(false);
Annuler_Personnes_Contact_20();
top.document.getElementById("Validate_Personnes_Contact_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=true;
top.document.getElementById("Update_Personnes_Contact_20").disabled=true;
 var Esclave_10=TAB_GLOBAL_COMPO[1296];
 Esclave_10.ActiverComposant(false);
Annuler_Personnes_Tâches_23();
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=true;
 var Esclave_11=TAB_GLOBAL_COMPO[1301];
 Esclave_11.ActiverComposant(false);
Annuler_Personnes_Responsabilités_29();
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=true;
 var Esclave_12=TAB_GLOBAL_COMPO[1312];
 Esclave_12.ActiverComposant(false);
Annuler_Personnes_Attributs_35();
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=true;
 var Esclave_13=TAB_GLOBAL_COMPO[1324];
 Esclave_13.ActiverComposant(false);
 var Esclave_14=TAB_GLOBAL_COMPO[1330];
 Esclave_14.ActiverComposant(false);
 var Esclave_15=TAB_GLOBAL_COMPO[1336];
 Esclave_15.ActiverComposant(false);
 var Esclave_16=TAB_GLOBAL_COMPO[1344];
 Esclave_16.ActiverComposant(false);
Annuler_Personnes_Routages_42();
top.document.getElementById("Validate_Personnes_Routages_42").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=true;
top.document.getElementById("Update_Personnes_Routages_42").disabled=true;
 var Esclave_17=TAB_GLOBAL_COMPO[1350];
 Esclave_17.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1262].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1262].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Liste_des_personnes0()
{
 TAB_COMPO_PPTES[1262].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1262].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1265];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1266];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1267];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1268];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1269];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1270];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1271];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1272];
 Esclave_7.ActiverComposant(false);
Annuler_Personnes_Observations_9();
top.document.getElementById("Validate_Personnes_Observations_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=true;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=true;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=true;
top.document.getElementById("Update_Personnes_Observations_9").disabled=true;
 var Esclave_8=TAB_GLOBAL_COMPO[1279];
 Esclave_8.ActiverComposant(false);
Annuler_Personnes_Adresses_12();
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=true;
 var Esclave_9=TAB_GLOBAL_COMPO[1284];
 Esclave_9.ActiverComposant(false);
Annuler_Personnes_Contact_20();
top.document.getElementById("Validate_Personnes_Contact_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=true;
top.document.getElementById("Update_Personnes_Contact_20").disabled=true;
 var Esclave_10=TAB_GLOBAL_COMPO[1296];
 Esclave_10.ActiverComposant(false);
Annuler_Personnes_Tâches_23();
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=true;
 var Esclave_11=TAB_GLOBAL_COMPO[1301];
 Esclave_11.ActiverComposant(false);
Annuler_Personnes_Responsabilités_29();
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=true;
 var Esclave_12=TAB_GLOBAL_COMPO[1312];
 Esclave_12.ActiverComposant(false);
Annuler_Personnes_Attributs_35();
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=true;
 var Esclave_13=TAB_GLOBAL_COMPO[1324];
 Esclave_13.ActiverComposant(false);
 var Esclave_14=TAB_GLOBAL_COMPO[1330];
 Esclave_14.ActiverComposant(false);
 var Esclave_15=TAB_GLOBAL_COMPO[1336];
 Esclave_15.ActiverComposant(false);
 var Esclave_16=TAB_GLOBAL_COMPO[1344];
 Esclave_16.ActiverComposant(false);
Annuler_Personnes_Routages_42();
top.document.getElementById("Validate_Personnes_Routages_42").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=true;
top.document.getElementById("Update_Personnes_Routages_42").disabled=true;
 var Esclave_17=TAB_GLOBAL_COMPO[1350];
 Esclave_17.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
}

function Insert_Personnes_Observations_9()
{
 if (TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Personnes_Liste_des_personnes0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Personnes_Observations_9();
                }
                 return;
         }
 TAB_COMPO_PPTES[1279].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1279].NewCle = getNewCle("observation");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1279].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1282];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1283];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Observations_9").disabled=false;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=false;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=true;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=true;
top.document.getElementById("Update_Personnes_Observations_9").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1279];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1279].NewCle;
}

function Delete_Personnes_Observations_9()
{
 if (TAB_GLOBAL_COMPO[1279].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1279];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1279].Action_en_cours = DELETE;
         User_Delete_Personnes_Observations_9(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Observations_9()
{
 if (TAB_GLOBAL_COMPO[1279].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1279].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1279].NewCle = TAB_GLOBAL_COMPO[1279].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1279].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1282];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1283];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Observations_9").disabled=false;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=false;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=true;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=true;
top.document.getElementById("Update_Personnes_Observations_9").disabled=true;
return TAB_COMPO_PPTES[1279].NewCle;
}

function Validate_Personnes_Observations_9(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1279];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1279].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Observations_9(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Observations_9(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1279].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1282];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1283];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Observations_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=true;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=false;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=false;
top.document.getElementById("Update_Personnes_Observations_9").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1279].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1279].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Observations_9()
{
 TAB_COMPO_PPTES[1279].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1279].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1282];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1283];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Observations_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Observations_9").disabled=true;
top.document.getElementById("Insert_Personnes_Observations_9").disabled=false;
top.document.getElementById("Delete_Personnes_Observations_9").disabled=false;
top.document.getElementById("Update_Personnes_Observations_9").disabled=false;
}

function Insert_Personnes_Adresses_12()
{
 if (TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Personnes_Liste_des_personnes0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Personnes_Adresses_12();
                }
                 return;
         }
 TAB_COMPO_PPTES[1284].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1284].NewCle = getNewCle("adresse");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1284].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1289];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1290];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1291];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1292];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1293];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1294];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1295];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1284];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1284].NewCle;
}

function Delete_Personnes_Adresses_12()
{
 if (TAB_GLOBAL_COMPO[1284].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1284];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1284].Action_en_cours = DELETE;
         User_Delete_Personnes_Adresses_12(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Adresses_12()
{
 if (TAB_GLOBAL_COMPO[1284].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1284].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1284].NewCle = TAB_GLOBAL_COMPO[1284].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1284].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1289];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1290];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1291];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1292];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1293];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1294];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1295];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=true;
return TAB_COMPO_PPTES[1284].NewCle;
}

function Validate_Personnes_Adresses_12(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1284];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1284].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Adresses_12(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Adresses_12(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1284].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1289];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1290];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1291];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1292];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1293];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1294];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1295];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1284].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1284].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Adresses_12()
{
 TAB_COMPO_PPTES[1284].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1284].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1289];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1290];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1291];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1292];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1293];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1294];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1295];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_12").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_12").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_12").disabled=false;
}

function Insert_Personnes_Contact_20()
{
 if (TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Personnes_Liste_des_personnes0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Personnes_Contact_20();
                }
                 return;
         }
 TAB_COMPO_PPTES[1296].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1296].NewCle = getNewCle("contact");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1296].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1299];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1300];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_20").disabled=false;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=false;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=true;
top.document.getElementById("Update_Personnes_Contact_20").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1296];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1296].NewCle;
}

function Delete_Personnes_Contact_20()
{
 if (TAB_GLOBAL_COMPO[1296].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1296];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1296].Action_en_cours = DELETE;
         User_Delete_Personnes_Contact_20(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Contact_20()
{
 if (TAB_GLOBAL_COMPO[1296].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1296].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1296].NewCle = TAB_GLOBAL_COMPO[1296].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1296].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1299];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1300];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_20").disabled=false;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=false;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=true;
top.document.getElementById("Update_Personnes_Contact_20").disabled=true;
return TAB_COMPO_PPTES[1296].NewCle;
}

function Validate_Personnes_Contact_20(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1296];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1296].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Contact_20(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Contact_20(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1296].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1299];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1300];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Contact_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=false;
top.document.getElementById("Update_Personnes_Contact_20").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1296].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1296].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Contact_20()
{
 TAB_COMPO_PPTES[1296].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1296].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1299];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1300];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Contact_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_20").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_20").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_20").disabled=false;
top.document.getElementById("Update_Personnes_Contact_20").disabled=false;
}

function Insert_Personnes_Tâches_23()
{
 if (TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Personnes_Liste_des_personnes0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Personnes_Tâches_23();
                }
                 return;
         }
 TAB_COMPO_PPTES[1301].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1301].NewCle = getNewCle("appel");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1301].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1307];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1308];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1309];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1310];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1311];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1301];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
var ladate=new Date();
var today=ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
TAB_GLOBAL_COMPO[1307].my_CompoXUL.value=today;

return TAB_COMPO_PPTES[1301].NewCle;
}

function Delete_Personnes_Tâches_23()
{
 if (TAB_GLOBAL_COMPO[1301].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1301];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1301].Action_en_cours = DELETE;
         User_Delete_Personnes_Tâches_23(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Tâches_23()
{
 if (TAB_GLOBAL_COMPO[1301].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1301].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1301].NewCle = TAB_GLOBAL_COMPO[1301].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1301].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1307];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1308];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1309];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1310];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1311];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=true;
return TAB_COMPO_PPTES[1301].NewCle;
}

function Validate_Personnes_Tâches_23(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1301];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1301].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Tâches_23(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Tâches_23(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1301].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1307];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1308];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1309];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1310];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1311];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1301].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1301].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Tâches_23()
{
 TAB_COMPO_PPTES[1301].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1301].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1307];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1308];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1309];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1310];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1311];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Annuler_Personnes_Tâches_23").disabled=true;
top.document.getElementById("Insert_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Delete_Personnes_Tâches_23").disabled=false;
top.document.getElementById("Update_Personnes_Tâches_23").disabled=false;
}

function Insert_Personnes_Responsabilités_29()
{
 if (TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Personnes_Liste_des_personnes0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Personnes_Responsabilités_29();
                }
                 return;
         }
 TAB_COMPO_PPTES[1312].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1312].NewCle = getNewCle("estresponsable");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1312].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1319];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1320];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1321];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1322];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1323];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1312];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1312].NewCle;
}

function Delete_Personnes_Responsabilités_29()
{
 if (TAB_GLOBAL_COMPO[1312].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1312];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1312].Action_en_cours = DELETE;
         User_Delete_Personnes_Responsabilités_29(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Responsabilités_29()
{
 if (TAB_GLOBAL_COMPO[1312].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1312].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1312].NewCle = TAB_GLOBAL_COMPO[1312].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1312].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1319];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1320];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1321];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1322];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1323];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=true;
return TAB_COMPO_PPTES[1312].NewCle;
}

function Validate_Personnes_Responsabilités_29(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1312];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1312].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Responsabilités_29(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Responsabilités_29(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1312].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1319];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1320];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1321];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1322];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1323];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1312].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1312].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Responsabilités_29()
{
 TAB_COMPO_PPTES[1312].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1312].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1319];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1320];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1321];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1322];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1323];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Annuler_Personnes_Responsabilités_29").disabled=true;
top.document.getElementById("Insert_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Delete_Personnes_Responsabilités_29").disabled=false;
top.document.getElementById("Update_Personnes_Responsabilités_29").disabled=false;
}

function Insert_Personnes_Attributs_35()
{
 if (TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Personnes_Liste_des_personnes0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Personnes_Attributs_35();
                }
                 return;
         }
 TAB_COMPO_PPTES[1324].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1324].NewCle = getNewCle("attribut");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1324].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1327];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1328];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1329];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1324];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1324].NewCle;
}

function Delete_Personnes_Attributs_35()
{
 if (TAB_GLOBAL_COMPO[1324].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1324];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1324].Action_en_cours = DELETE;
         User_Delete_Personnes_Attributs_35(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Attributs_35()
{
 if (TAB_GLOBAL_COMPO[1324].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1324].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1324].NewCle = TAB_GLOBAL_COMPO[1324].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1324].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1327];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1328];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1329];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=true;
return TAB_COMPO_PPTES[1324].NewCle;
}

function Validate_Personnes_Attributs_35(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1324];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1324].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Attributs_35(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Attributs_35(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1324].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1327];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1328];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1329];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1324].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1324].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Attributs_35()
{
 TAB_COMPO_PPTES[1324].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1324].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1327];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1328];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1329];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_35").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_35").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_35").disabled=false;
}

function Insert_Personnes_Routages_42()
{
 if (TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Personnes_Liste_des_personnes0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Personnes_Routages_42();
                }
                 return;
         }
 TAB_COMPO_PPTES[1350].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1350].NewCle = getNewCle("routage");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1350].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1356];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1357];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1358];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1359];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_42").disabled=false;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=false;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=true;
top.document.getElementById("Update_Personnes_Routages_42").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1350];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1350].NewCle;
}

function Delete_Personnes_Routages_42()
{
 if (TAB_GLOBAL_COMPO[1350].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1350];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1350].Action_en_cours = DELETE;
         User_Delete_Personnes_Routages_42(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Routages_42()
{
 if (TAB_GLOBAL_COMPO[1350].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1350].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1350].NewCle = TAB_GLOBAL_COMPO[1350].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1350].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1356];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1357];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1358];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1359];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_42").disabled=false;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=false;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=true;
top.document.getElementById("Update_Personnes_Routages_42").disabled=true;
return TAB_COMPO_PPTES[1350].NewCle;
}

function Validate_Personnes_Routages_42(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1350];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1350].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Routages_42(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Routages_42(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1350].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1356];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1357];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1358];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1359];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Routages_42").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=false;
top.document.getElementById("Update_Personnes_Routages_42").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1350].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1350].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Routages_42()
{
 TAB_COMPO_PPTES[1350].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1350].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1356];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1357];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1358];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1359];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Routages_42").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_42").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_42").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_42").disabled=false;
top.document.getElementById("Update_Personnes_Routages_42").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Devis
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Devis_0;
function Retour_Devis()
{
 if (Filtre_DepFor_Devis_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Devis_0.FctFermetureOnglet();
 }
}
function Gerer_Devis(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas être en mode insertion */
if(TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Personnes_Liste_des_personnes0();
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
if (Filtre_DepFor_Devis_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Devis_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Devis");
}

function OuvrirOnglet_Devis()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Devis");
}

function Insert_Devis_Liste_des_devis0()
{
 TAB_COMPO_PPTES[1360].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1360].NewCle = getNewCle("devis");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1360].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1365];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1366];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1367];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1368];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1369];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1370];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1371];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1372];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Annuler_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Insert_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Delete_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Update_Devis_Liste_des_devis0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1360];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
var ladate=new Date();
var today=ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
TAB_GLOBAL_COMPO[1365].my_CompoXUL.value=today;
TAB_GLOBAL_COMPO[1370].my_CompoXUL.value="Chère Madame, Cher Monsieur";
TAB_GLOBAL_COMPO[1371].my_CompoXUL.value="Suite à notre conversation, je vous communique les éléments du devis concernant mon intervention sur le dossier de ";

return TAB_COMPO_PPTES[1360].NewCle;
}

function Delete_Devis_Liste_des_devis0()
{
 if (TAB_GLOBAL_COMPO[1360].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1360];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1360].Action_en_cours = DELETE;
         User_Delete_Devis_Liste_des_devis0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Devis_0.Refresh();
 }
}

function Update_Devis_Liste_des_devis0()
{
 if (TAB_GLOBAL_COMPO[1360].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1360].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1360].NewCle = TAB_GLOBAL_COMPO[1360].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1360].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1365];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1366];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1367];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1368];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1369];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1370];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1371];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1372];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Annuler_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Insert_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Delete_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Update_Devis_Liste_des_devis0").disabled=true;
return TAB_COMPO_PPTES[1360].NewCle;
}

function Validate_Devis_Liste_des_devis0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1360];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1360].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Devis_Liste_des_devis0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Devis_Liste_des_devis0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1360].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1365];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1366];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1367];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1368];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1369];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1370];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1371];
 Esclave_6.ActiverComposant(false);
Annuler_Devis_Lignes_du_devis_8();
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1372];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Annuler_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Insert_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Delete_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Update_Devis_Liste_des_devis0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1360].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Devis_0.Refresh();
 }
 TAB_COMPO_PPTES[1360].Action_en_cours = null;
 return NewCle;
}

function Annuler_Devis_Liste_des_devis0()
{
 TAB_COMPO_PPTES[1360].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1360].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1365];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1366];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1367];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1368];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1369];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1370];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1371];
 Esclave_6.ActiverComposant(false);
Annuler_Devis_Lignes_du_devis_8();
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1372];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Annuler_Devis_Liste_des_devis0").disabled=true;
top.document.getElementById("Insert_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Delete_Devis_Liste_des_devis0").disabled=false;
top.document.getElementById("Update_Devis_Liste_des_devis0").disabled=false;
}

function Insert_Devis_Lignes_du_devis_8()
{
 if (TAB_COMPO_PPTES[1360].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Devis_Liste_des_devis0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Devis_Liste_des_devis0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Devis_Lignes_du_devis_8();
                }
                 return;
         }
 TAB_COMPO_PPTES[1372].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1372].NewCle = getNewCle("ligne");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1372].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1377];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1378];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1379];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1372];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
TAB_GLOBAL_COMPO[1378].my_CompoXUL.value=1;

return TAB_COMPO_PPTES[1372].NewCle;
}

function Delete_Devis_Lignes_du_devis_8()
{
 if (TAB_GLOBAL_COMPO[1372].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1372];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1372].Action_en_cours = DELETE;
         User_Delete_Devis_Lignes_du_devis_8(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Devis_Lignes_du_devis_8()
{
 if (TAB_GLOBAL_COMPO[1372].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1372].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1372].NewCle = TAB_GLOBAL_COMPO[1372].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1372].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1377];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1378];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1379];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=true;
return TAB_COMPO_PPTES[1372].NewCle;
}

function Validate_Devis_Lignes_du_devis_8(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1372];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1372].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Devis_Lignes_du_devis_8(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Devis_Lignes_du_devis_8(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1372].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1377];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1378];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1379];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1372].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1372].Action_en_cours = null;
 return NewCle;
}

function Annuler_Devis_Lignes_du_devis_8()
{
 TAB_COMPO_PPTES[1372].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1372].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1377];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1378];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1379];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").disabled=true;
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").disabled=false;
top.document.getElementById("Update_Devis_Lignes_du_devis_8").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Facture
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_DepFor_Facture_0;
function Retour_Facture()
{
 if (Filtre_DepFor_Facture_0.my_Filtre.getEtat())
 {
         Filtre_DepFor_Facture_0.FctFermetureOnglet();
 }
}
function Gerer_Facture(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas être en mode insertion */
if(TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Personnes_Liste_des_personnes0();
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
if (Filtre_DepFor_Facture_0.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Facture_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Facture");
}

function OuvrirOnglet_Facture()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Facture");
}

function Insert_Facture_Liste_des_factures0()
{
 TAB_COMPO_PPTES[1380].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1380].NewCle = getNewCle("facture");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1380].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1386];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1387];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1388];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1389];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1390];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1391];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1392];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1393];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[1394];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[1399];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Règlements_11").disabled=true;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=true;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=false;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=false;
top.document.getElementById("Update_Facture_Règlements_11").disabled=false;
 var Esclave_10=TAB_GLOBAL_COMPO[1402];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Routages_16").disabled=true;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=true;
top.document.getElementById("Insert_Facture_Routages_16").disabled=false;
top.document.getElementById("Delete_Facture_Routages_16").disabled=false;
top.document.getElementById("Update_Facture_Routages_16").disabled=false;
 var Esclave_11=TAB_GLOBAL_COMPO[1412];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Annuler_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Insert_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Delete_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Update_Facture_Liste_des_factures0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1380];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1380].NewCle;
}

function Delete_Facture_Liste_des_factures0()
{
 if (TAB_GLOBAL_COMPO[1380].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1380];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1380].Action_en_cours = DELETE;
         User_Delete_Facture_Liste_des_factures0(Maitre);
        Maitre.RefreshTotal();
        Filtre_DepFor_Facture_0.Refresh();
 }
}

function Update_Facture_Liste_des_factures0()
{
 if (TAB_GLOBAL_COMPO[1380].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1380].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1380].NewCle = TAB_GLOBAL_COMPO[1380].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1380].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1386];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1387];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1388];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1389];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1390];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1391];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1392];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[1393];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[1394];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[1399];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Règlements_11").disabled=true;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=true;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=false;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=false;
top.document.getElementById("Update_Facture_Règlements_11").disabled=false;
 var Esclave_10=TAB_GLOBAL_COMPO[1402];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Routages_16").disabled=true;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=true;
top.document.getElementById("Insert_Facture_Routages_16").disabled=false;
top.document.getElementById("Delete_Facture_Routages_16").disabled=false;
top.document.getElementById("Update_Facture_Routages_16").disabled=false;
 var Esclave_11=TAB_GLOBAL_COMPO[1412];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Annuler_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Insert_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Delete_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Update_Facture_Liste_des_factures0").disabled=true;
return TAB_COMPO_PPTES[1380].NewCle;
}

function Validate_Facture_Liste_des_factures0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1380];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1380].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Facture_Liste_des_factures0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Facture_Liste_des_factures0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1380].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1386];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1387];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1388];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1389];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1390];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1391];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1392];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1393];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[1394];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[1399];
 Esclave_9.ActiverComposant(false);
Annuler_Facture_Règlements_11();
top.document.getElementById("Validate_Facture_Règlements_11").disabled=true;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=true;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=true;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=true;
top.document.getElementById("Update_Facture_Règlements_11").disabled=true;
 var Esclave_10=TAB_GLOBAL_COMPO[1402];
 Esclave_10.ActiverComposant(false);
Annuler_Facture_Routages_16();
top.document.getElementById("Validate_Facture_Routages_16").disabled=true;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=true;
top.document.getElementById("Insert_Facture_Routages_16").disabled=true;
top.document.getElementById("Delete_Facture_Routages_16").disabled=true;
top.document.getElementById("Update_Facture_Routages_16").disabled=true;
 var Esclave_11=TAB_GLOBAL_COMPO[1412];
 Esclave_11.ActiverComposant(false);
top.document.getElementById("Validate_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Annuler_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Insert_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Delete_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Update_Facture_Liste_des_factures0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1380].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_DepFor_Facture_0.Refresh();
 }
 TAB_COMPO_PPTES[1380].Action_en_cours = null;
 return NewCle;
}

function Annuler_Facture_Liste_des_factures0()
{
 TAB_COMPO_PPTES[1380].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1380].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1386];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1387];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1388];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1389];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1390];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1391];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1392];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[1393];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[1394];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[1399];
 Esclave_9.ActiverComposant(false);
Annuler_Facture_Règlements_11();
top.document.getElementById("Validate_Facture_Règlements_11").disabled=true;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=true;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=true;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=true;
top.document.getElementById("Update_Facture_Règlements_11").disabled=true;
 var Esclave_10=TAB_GLOBAL_COMPO[1402];
 Esclave_10.ActiverComposant(false);
Annuler_Facture_Routages_16();
top.document.getElementById("Validate_Facture_Routages_16").disabled=true;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=true;
top.document.getElementById("Insert_Facture_Routages_16").disabled=true;
top.document.getElementById("Delete_Facture_Routages_16").disabled=true;
top.document.getElementById("Update_Facture_Routages_16").disabled=true;
 var Esclave_11=TAB_GLOBAL_COMPO[1412];
 Esclave_11.ActiverComposant(false);
top.document.getElementById("Validate_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Annuler_Facture_Liste_des_factures0").disabled=true;
top.document.getElementById("Insert_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Delete_Facture_Liste_des_factures0").disabled=false;
top.document.getElementById("Update_Facture_Liste_des_factures0").disabled=false;
}

function Insert_Facture_Règlements_11()
{
 if (TAB_COMPO_PPTES[1380].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Facture_Liste_des_factures0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Facture_Liste_des_factures0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Facture_Règlements_11();
                }
                 return;
         }
 TAB_COMPO_PPTES[1402].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1402].NewCle = getNewCle("facturereglement");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1402].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1408];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1409];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1410];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1411];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Règlements_11").disabled=false;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=false;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=true;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=true;
top.document.getElementById("Update_Facture_Règlements_11").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1402];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1402].NewCle;
}

function Delete_Facture_Règlements_11()
{
 if (TAB_GLOBAL_COMPO[1402].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1402];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1402].Action_en_cours = DELETE;
         User_Delete_Facture_Règlements_11(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Facture_Règlements_11()
{
 if (TAB_GLOBAL_COMPO[1402].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1402].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1402].NewCle = TAB_GLOBAL_COMPO[1402].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1402].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1408];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1409];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1410];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1411];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Règlements_11").disabled=false;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=false;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=true;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=true;
top.document.getElementById("Update_Facture_Règlements_11").disabled=true;
return TAB_COMPO_PPTES[1402].NewCle;
}

function Validate_Facture_Règlements_11(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1402];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1402].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Facture_Règlements_11(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Facture_Règlements_11(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1402].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1408];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1409];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1410];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1411];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Facture_Règlements_11").disabled=true;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=true;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=false;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=false;
top.document.getElementById("Update_Facture_Règlements_11").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1402].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1402].Action_en_cours = null;
 return NewCle;
}

function Annuler_Facture_Règlements_11()
{
 TAB_COMPO_PPTES[1402].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1402].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1408];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1409];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1410];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1411];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Facture_Règlements_11").disabled=true;
top.document.getElementById("Annuler_Facture_Règlements_11").disabled=true;
top.document.getElementById("Insert_Facture_Règlements_11").disabled=false;
top.document.getElementById("Delete_Facture_Règlements_11").disabled=false;
top.document.getElementById("Update_Facture_Règlements_11").disabled=false;
}

function Insert_Facture_Routages_16()
{
 if (TAB_COMPO_PPTES[1380].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Facture_Liste_des_factures0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Facture_Liste_des_factures0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Facture_Routages_16();
                }
                 return;
         }
 TAB_COMPO_PPTES[1412].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1412].NewCle = getNewCle("routage");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1412].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1417];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1418];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1419];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1420];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Routages_16").disabled=false;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=false;
top.document.getElementById("Insert_Facture_Routages_16").disabled=true;
top.document.getElementById("Delete_Facture_Routages_16").disabled=true;
top.document.getElementById("Update_Facture_Routages_16").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1412];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1412].NewCle;
}

function Delete_Facture_Routages_16()
{
 if (TAB_GLOBAL_COMPO[1412].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1412];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1412].Action_en_cours = DELETE;
         User_Delete_Facture_Routages_16(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Facture_Routages_16()
{
 if (TAB_GLOBAL_COMPO[1412].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1412].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1412].NewCle = TAB_GLOBAL_COMPO[1412].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1412].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1417];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1418];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1419];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1420];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Facture_Routages_16").disabled=false;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=false;
top.document.getElementById("Insert_Facture_Routages_16").disabled=true;
top.document.getElementById("Delete_Facture_Routages_16").disabled=true;
top.document.getElementById("Update_Facture_Routages_16").disabled=true;
return TAB_COMPO_PPTES[1412].NewCle;
}

function Validate_Facture_Routages_16(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1412];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1412].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Facture_Routages_16(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Facture_Routages_16(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1412].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1417];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1418];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1419];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1420];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Facture_Routages_16").disabled=true;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=true;
top.document.getElementById("Insert_Facture_Routages_16").disabled=false;
top.document.getElementById("Delete_Facture_Routages_16").disabled=false;
top.document.getElementById("Update_Facture_Routages_16").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1412].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1412].Action_en_cours = null;
 return NewCle;
}

function Annuler_Facture_Routages_16()
{
 TAB_COMPO_PPTES[1412].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1412].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1417];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1418];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1419];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1420];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Facture_Routages_16").disabled=true;
top.document.getElementById("Annuler_Facture_Routages_16").disabled=true;
top.document.getElementById("Insert_Facture_Routages_16").disabled=false;
top.document.getElementById("Delete_Facture_Routages_16").disabled=false;
top.document.getElementById("Update_Facture_Routages_16").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Avoir
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Avoir_0;
function Retour_Avoir()
{
 if (Filtre_Dep_Avoir_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Avoir_0.FctFermetureOnglet();
 }
}
function Gerer_Avoir(IdFiltreOnglet)
{
/* On désactive les autres filtres */
if (Filtre_Dep_Avoir_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Avoir_0.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Avoir");
}

function OuvrirOnglet_Avoir()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Avoir");
}

function Insert_Avoir_Liste_des_avoirs0()
{
 TAB_COMPO_PPTES[1421].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1421].NewCle = getNewCle("avoir");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1421].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1425];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1426];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1427];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1428];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1429];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Annuler_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Insert_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Delete_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Update_Avoir_Liste_des_avoirs0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1421];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1421].NewCle;
}

function Delete_Avoir_Liste_des_avoirs0()
{
 if (TAB_GLOBAL_COMPO[1421].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1421];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1421].Action_en_cours = DELETE;
         User_Delete_Avoir_Liste_des_avoirs0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Avoir_0.OnClose(true);
 }
}

function Update_Avoir_Liste_des_avoirs0()
{
 if (TAB_GLOBAL_COMPO[1421].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1421].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1421].NewCle = TAB_GLOBAL_COMPO[1421].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1421].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1425];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1426];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1427];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1428];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1429];
 Esclave_4.ActiverComposant(true);
top.document.getElementById("Validate_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Annuler_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Insert_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Delete_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Update_Avoir_Liste_des_avoirs0").disabled=true;
return TAB_COMPO_PPTES[1421].NewCle;
}

function Validate_Avoir_Liste_des_avoirs0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1421];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1421].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Avoir_Liste_des_avoirs0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Avoir_Liste_des_avoirs0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1421].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1425];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1426];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1427];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1428];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1429];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Annuler_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Insert_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Delete_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Update_Avoir_Liste_des_avoirs0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1421].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Avoir_0.OnClose(false);
 }
 TAB_COMPO_PPTES[1421].Action_en_cours = null;
 return NewCle;
}

function Annuler_Avoir_Liste_des_avoirs0()
{
 TAB_COMPO_PPTES[1421].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1421].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1425];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1426];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1427];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1428];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1429];
 Esclave_4.ActiverComposant(false);
top.document.getElementById("Validate_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Annuler_Avoir_Liste_des_avoirs0").disabled=true;
top.document.getElementById("Insert_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Delete_Avoir_Liste_des_avoirs0").disabled=false;
top.document.getElementById("Update_Avoir_Liste_des_avoirs0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Réglement
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

 var Filtre_Dep_Réglement_0;
 var Filtre_DepFor_Réglement_1;
function Retour_Réglement()
{
 if (Filtre_Dep_Réglement_0.my_Filtre.getEtat())
 {
         Filtre_Dep_Réglement_0.FctFermetureOnglet();
 }
 if (Filtre_DepFor_Réglement_1.my_Filtre.getEtat())
 {
         Filtre_DepFor_Réglement_1.FctFermetureOnglet();
 }
}
function Gerer_Réglement(IdFiltreOnglet)
{
/* Pour les filtrage fort on ne doit pas être en mode insertion */
if(TAB_COMPO_PPTES[1262].Action_en_cours == INSERT)
{
        if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
        {
                var CleValide=Validate_Personnes_Liste_des_personnes0(false);
                if (CleValide==-1)
                {
                        return;
                }
                CleValide=Update_Personnes_Liste_des_personnes0();
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
if (Filtre_Dep_Réglement_0.getId()!=IdFiltreOnglet)
{
        Filtre_Dep_Réglement_0.OnClose(true,false);
}
if (Filtre_DepFor_Réglement_1.getId()!=IdFiltreOnglet)
{
        Filtre_DepFor_Réglement_1.OnClose(true,false);
}
/* On change d'onglet */
 var tabs = top.document.getElementById("Tous_les_onglets");
 top.document.getElementById("Tous_les_onglets").setAttribute("hidden","false");
 tabs.selectedItem = top.document.getElementById("Onglet_Réglement");
}

function OuvrirOnglet_Réglement()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Réglement");
}

function Insert_Réglement_Liste_des_réglements0()
{
 TAB_COMPO_PPTES[1434].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1434].NewCle = getNewCle("reglement");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1434].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1438];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1439];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1440];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1441];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1442];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1443];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1444];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1445];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=false;
 var Esclave_8=TAB_GLOBAL_COMPO[1454];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1434];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1434].NewCle;
}

function Delete_Réglement_Liste_des_réglements0()
{
 if (TAB_GLOBAL_COMPO[1434].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1434];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1434].Action_en_cours = DELETE;
         User_Delete_Réglement_Liste_des_réglements0(Maitre);
        Maitre.RefreshTotal();
        Filtre_Dep_Réglement_0.OnClose(true);
        Filtre_DepFor_Réglement_1.Refresh();
 }
}

function Update_Réglement_Liste_des_réglements0()
{
 if (TAB_GLOBAL_COMPO[1434].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1434].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1434].NewCle = TAB_GLOBAL_COMPO[1434].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1434].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1438];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1439];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1440];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1441];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1442];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1443];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[1444];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=false;
 var Esclave_7=TAB_GLOBAL_COMPO[1445];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=false;
 var Esclave_8=TAB_GLOBAL_COMPO[1454];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=true;
return TAB_COMPO_PPTES[1434].NewCle;
}

function Validate_Réglement_Liste_des_réglements0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1434];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1434].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Réglement_Liste_des_réglements0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Réglement_Liste_des_réglements0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1434].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1438];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1439];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1440];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1441];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1442];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1443];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1444];
 Esclave_6.ActiverComposant(false);
Annuler_Réglement_Factures_concernées_8();
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1445];
 Esclave_7.ActiverComposant(false);
Annuler_Réglement_Dont_reversements____13();
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=true;
 var Esclave_8=TAB_GLOBAL_COMPO[1454];
 Esclave_8.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1434].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 Filtre_Dep_Réglement_0.OnClose(false);
 Filtre_DepFor_Réglement_1.Refresh();
 }
 TAB_COMPO_PPTES[1434].Action_en_cours = null;
 return NewCle;
}

function Annuler_Réglement_Liste_des_réglements0()
{
 TAB_COMPO_PPTES[1434].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1434].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1438];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1439];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1440];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1441];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1442];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1443];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[1444];
 Esclave_6.ActiverComposant(false);
Annuler_Réglement_Factures_concernées_8();
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=true;
 var Esclave_7=TAB_GLOBAL_COMPO[1445];
 Esclave_7.ActiverComposant(false);
Annuler_Réglement_Dont_reversements____13();
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=true;
 var Esclave_8=TAB_GLOBAL_COMPO[1454];
 Esclave_8.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=false;
}

function Insert_Réglement_Factures_concernées_8()
{
 if (TAB_COMPO_PPTES[1434].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Réglement_Liste_des_réglements0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Réglement_Liste_des_réglements0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Réglement_Factures_concernées_8();
                }
                 return;
         }
 TAB_COMPO_PPTES[1445].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1445].NewCle = getNewCle("facturereglement");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1445].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1450];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1451];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1452];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1453];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1445];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1445].NewCle;
}

function Delete_Réglement_Factures_concernées_8()
{
 if (TAB_GLOBAL_COMPO[1445].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1445];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1445].Action_en_cours = DELETE;
         User_Delete_Réglement_Factures_concernées_8(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Réglement_Factures_concernées_8()
{
 if (TAB_GLOBAL_COMPO[1445].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1445].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1445].NewCle = TAB_GLOBAL_COMPO[1445].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1445].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1450];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1451];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1452];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1453];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=true;
return TAB_COMPO_PPTES[1445].NewCle;
}

function Validate_Réglement_Factures_concernées_8(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1445];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1445].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Réglement_Factures_concernées_8(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Réglement_Factures_concernées_8(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1445].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1450];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1451];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1452];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1453];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1445].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1445].Action_en_cours = null;
 return NewCle;
}

function Annuler_Réglement_Factures_concernées_8()
{
 TAB_COMPO_PPTES[1445].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1445].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1450];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1451];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1452];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1453];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Annuler_Réglement_Factures_concernées_8").disabled=true;
top.document.getElementById("Insert_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Delete_Réglement_Factures_concernées_8").disabled=false;
top.document.getElementById("Update_Réglement_Factures_concernées_8").disabled=false;
}

function Insert_Réglement_Dont_reversements____13()
{
 if (TAB_COMPO_PPTES[1434].Action_en_cours == INSERT)
         {
                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\n Voulez vous poursuivre ?"))
                {
                        var CleValide=Validate_Réglement_Liste_des_réglements0(false);
                        if (CleValide==-1)
                        {
                                return -1;
                        }
                        CleValide=Update_Réglement_Liste_des_réglements0();
                        if (CleValide==-1)
                        {
                                alert("Erreur l'enregistrement n'a pas étais correctement inséré");
                                return -1;
                        }
                        Insert_Réglement_Dont_reversements____13();
                }
                 return;
         }
 TAB_COMPO_PPTES[1454].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1454].NewCle = getNewCle("repartition");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1454].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1457];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1458];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1454];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1454].NewCle;
}

function Delete_Réglement_Dont_reversements____13()
{
 if (TAB_GLOBAL_COMPO[1454].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1454];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1454].Action_en_cours = DELETE;
         User_Delete_Réglement_Dont_reversements____13(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Réglement_Dont_reversements____13()
{
 if (TAB_GLOBAL_COMPO[1454].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1454].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1454].NewCle = TAB_GLOBAL_COMPO[1454].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1454].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1457];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1458];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=true;
return TAB_COMPO_PPTES[1454].NewCle;
}

function Validate_Réglement_Dont_reversements____13(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1454];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1454].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Réglement_Dont_reversements____13(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Réglement_Dont_reversements____13(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1454].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1457];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1458];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1454].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1454].Action_en_cours = null;
 return NewCle;
}

function Annuler_Réglement_Dont_reversements____13()
{
 TAB_COMPO_PPTES[1454].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1454].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1457];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1458];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Annuler_Réglement_Dont_reversements____13").disabled=true;
top.document.getElementById("Insert_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Delete_Réglement_Dont_reversements____13").disabled=false;
top.document.getElementById("Update_Réglement_Dont_reversements____13").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Bordereaux de réglements
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Bordereaux_de_réglements()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Bordereaux_de_réglements");
}

function Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0()
{
 TAB_COMPO_PPTES[1471].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1471].NewCle = getNewCle("listereglement");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1471].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1477];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1478];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1479];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1480];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Annuler_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1471];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1471].NewCle;
}

function Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0()
{
 if (TAB_GLOBAL_COMPO[1471].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1471];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1471].Action_en_cours = DELETE;
         User_Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0()
{
 if (TAB_GLOBAL_COMPO[1471].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1471].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1471].NewCle = TAB_GLOBAL_COMPO[1471].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1471].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1477];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1478];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1479];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1480];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Annuler_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
return TAB_COMPO_PPTES[1471].NewCle;
}

function Validate_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1471];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1471].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1471].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1477];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1478];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1479];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1480];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Annuler_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1471].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1471].Action_en_cours = null;
 return NewCle;
}

function Annuler_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0()
{
 TAB_COMPO_PPTES[1471].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1471].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1477];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1478];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1479];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1480];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Annuler_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=true;
top.document.getElementById("Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
top.document.getElementById("Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Cotisations
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Cotisations()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Cotisations");
}

function Insert_Cotisations_Liste_des_cotisations0()
{
 TAB_COMPO_PPTES[1459].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1459].NewCle = getNewCle("cotisation");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1459].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1465];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1466];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1467];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1468];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1469];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1470];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Annuler_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Insert_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Delete_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Update_Cotisations_Liste_des_cotisations0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[1459];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[1459].NewCle;
}

function Delete_Cotisations_Liste_des_cotisations0()
{
 if (TAB_GLOBAL_COMPO[1459].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1459];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[1459].Action_en_cours = DELETE;
         User_Delete_Cotisations_Liste_des_cotisations0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Cotisations_Liste_des_cotisations0()
{
 if (TAB_GLOBAL_COMPO[1459].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[1459].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[1459].NewCle = TAB_GLOBAL_COMPO[1459].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1459].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1465];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[1466];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[1467];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[1468];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[1469];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[1470];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Annuler_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Insert_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Delete_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Update_Cotisations_Liste_des_cotisations0").disabled=true;
return TAB_COMPO_PPTES[1459].NewCle;
}

function Validate_Cotisations_Liste_des_cotisations0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[1459];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[1459].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Cotisations_Liste_des_cotisations0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Cotisations_Liste_des_cotisations0(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[1459].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1465];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1466];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1467];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1468];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1469];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1470];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Annuler_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Insert_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Delete_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Update_Cotisations_Liste_des_cotisations0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[1459].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[1459].Action_en_cours = null;
 return NewCle;
}

function Annuler_Cotisations_Liste_des_cotisations0()
{
 TAB_COMPO_PPTES[1459].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[1459].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[1465];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[1466];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[1467];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[1468];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[1469];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[1470];
 Esclave_5.ActiverComposant(false);
top.document.getElementById("Validate_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Annuler_Cotisations_Liste_des_cotisations0").disabled=true;
top.document.getElementById("Insert_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Delete_Cotisations_Liste_des_cotisations0").disabled=false;
top.document.getElementById("Update_Cotisations_Liste_des_cotisations0").disabled=false;
}





function principal_Chargement()
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
var Col_N0_Nom______________De_Personnes_Liste_des_personnes0=new clAttribut("pe_fullname","personne",null);

var Col_N1_N__De_Personnes_Liste_des_personnes0=new clAttribut("pe_id","personne",null);

var Personnes_Numéro_1=new clAttribut("pe_id","personne",null);


	/* Ce composant représente: personne.pe_id sous le nom "Numéro" */
var Compo_Personnes_Numéro_1=new clCompolabel(Personnes_Numéro_1,null,"Numéro",undefined,undefined);
var Personnes_Titre_ou_F_J__2=new clAttribut("np_libelle","naturepersonne",null);


	/* Ce composant représente: naturepersonne.np_libelle sous le nom "Titre ou F.J." */
var Compo_Personnes_Titre_ou_F_J__2=new clCompoListeDeroulanteSimple(Personnes_Titre_ou_F_J__2,null,"Titre ou F.J.");
var Joint_Esclave_Personnes_Titre_ou_F_J__2=new clJointureMulti("personne",
	new Array(
	new stJointure("naturepersonne","np_numero","np_numero",null,false)
	));
var Personnes_Nom_ou_D_S__3=new clAttribut("pe_nom","personne",null);


	/* Ce composant représente: personne.pe_nom sous le nom "Nom ou D.S." */
var Compo_Personnes_Nom_ou_D_S__3=new clCompoTextBox(Personnes_Nom_ou_D_S__3,null,"Nom ou D.S.",false,false);
var Personnes_Prénom_4=new clAttribut("pe_prenom","personne",null);


	/* Ce composant représente: personne.pe_prenom sous le nom "Prénom" */
var Compo_Personnes_Prénom_4=new clCompoTextBox(Personnes_Prénom_4,null,"Prénom",false,false);
var Personnes_N_TVA_intrac__5=new clAttribut("pe_numtvaic","personne",null);


	/* Ce composant représente: personne.pe_numtvaic sous le nom "N°TVA intrac." */
var Compo_Personnes_N_TVA_intrac__5=new clCompoTextBox(Personnes_N_TVA_intrac__5,null,"N°TVA intrac.",false,false);
var Personnes_Né_e__le_6=new clAttribut("pe_naissance","personne",null);


	/* Ce composant représente: personne.pe_naissance sous le nom "Né(e) le" */
var Compo_Personnes_Né_e__le_6=new clCompoTextBox(Personnes_Né_e__le_6,null,"Né(e) le",false,false);
var Personnes_La_personne_est_active__et_peut_être_contactée__7=new clAttribut("pe_actif","personne",null);


	/* Ce composant représente: personne.pe_actif sous le nom "La personne est active (et peut être contactée)" */
var Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7=new clCompoCheckBox(Personnes_La_personne_est_active__et_peut_être_contactée__7,null,"La personne est active (et peut être contactée)");
var Col_N0_Année_De_Personnes_Cotisations_8=new clAttribut("cs_annee","vue_cotisation",null);

var Col_N1_Type_De_Personnes_Cotisations_8=new clAttribut("cs_type","vue_cotisation",null);

var Col_N2_FDSEA_De_Personnes_Cotisations_8=new clAttribut("cs_fdsea","vue_cotisation",null);

var Col_N3_SACEA_De_Personnes_Cotisations_8=new clAttribut("cs_sacea","vue_cotisation",null);

var Col_N4_AAVA_De_Personnes_Cotisations_8=new clAttribut("cs_aava","vue_cotisation",null);

var Col_N5_Total_De_Personnes_Cotisations_8=new clAttribut("cs_total","vue_cotisation",null);

var Personnes_Cotisations_8=new clEnsembleAttributs("vue_cotisation",
	new Array(
	new clLiaison(null,Col_N0_Année_De_Personnes_Cotisations_8)
	,new clLiaison(null,Col_N1_Type_De_Personnes_Cotisations_8)
	,new clLiaison(null,Col_N2_FDSEA_De_Personnes_Cotisations_8)
	,new clLiaison(null,Col_N3_SACEA_De_Personnes_Cotisations_8)
	,new clLiaison(null,Col_N4_AAVA_De_Personnes_Cotisations_8)
	,new clLiaison(null,Col_N5_Total_De_Personnes_Cotisations_8)
	),
	null);

var Titre_Personnes_Cotisations_8=new Array("Année","Type","FDSEA","SACEA","AAVA","Total");

	/* Ce composant représente: des éléments de la table vue_cotisation sous le nom "Cotisations" */
var Compo_Personnes_Cotisations_8=new clCompoListe(Personnes_Cotisations_8,null,Titre_Personnes_Cotisations_8,"Cotisations",true,false);
var Joint_Esclave_Personnes_Cotisations_8=new clJointureMulti("personne",
	new Array(
	new stJointure("vue_cotisation","pe_numero","pe_numero",null,false)
	));
var Col_N0_Importance_De_Personnes_Observations_9=new clAttribut("ob_niveau","observation",null);

var Col_N1_Description_De_Personnes_Observations_9=new clAttribut("ob_observation","observation",null);

var Personnes_Importance_10=new clAttribut("ob_niveau","observation",null);


	/* Ce composant représente: observation.ob_niveau sous le nom "Importance" */
var Compo_Personnes_Importance_10=new clCompoTextBox(Personnes_Importance_10,null,"Importance",false,false);
var Personnes_Description_11=new clAttribut("ob_observation","observation",null);


	/* Ce composant représente: observation.ob_observation sous le nom "Description" */
var Compo_Personnes_Description_11=new clCompoTextBox(Personnes_Description_11,null,"Description",false,true);
var Personnes_Observations_9=new clEnsembleAttributs("observation",
	new Array(
	new clLiaison(null,Col_N0_Importance_De_Personnes_Observations_9)
	,new clLiaison(null,Col_N1_Description_De_Personnes_Observations_9)
	),
	new Array(
	new clLiaison(null,Personnes_Importance_10)
	,new clLiaison(null,Personnes_Description_11)
	));

var Titre_Personnes_Observations_9=new Array("Importance","Description");

	/* Ce composant représente: des éléments de la table observation sous le nom "Observations" */
var Compo_Personnes_Observations_9=new clCompoListe(Personnes_Observations_9,null,Titre_Personnes_Observations_9,"Observations",true,false);
var Joint_Esclave_Personnes_Observations_9=new clJointureMulti("personne",
	new Array(
	new stJointure("observation","pe_numero","pe_numero",null,false)
	));
var Col_N0_Type_De_Personnes_Adresses_12=new clAttribut("ad_type","adresse",null);

var Col_N1_CP_De_Personnes_Adresses_12=new clAttribut("cp_codepostal","codepostal",null);

var Joint_Col_N1_CP_De_Personnes_Adresses_12=new clJointureMulti("adresse",
	new Array(
	new stJointure("codepostal","cp_numero","cp_numero",null,true)
	));
var Col_N2_Ville_De_Personnes_Adresses_12=new clAttribut("vi_nom","ville",null);

var Joint_Col_N2_Ville_De_Personnes_Adresses_12=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,true)
	));
var Col_N3_Canton_De_Personnes_Adresses_12=new clAttribut("ct_nom","canton",null);

var Joint_Col_N3_Canton_De_Personnes_Adresses_12=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,true)
	,new stJointure("canton","ct_numero","ct_numero",null,true)
	));
var Personnes_Type_13=new clAttribut("ak_nom","typeadresse",null);


	/* Ce composant représente: typeadresse.ak_nom sous le nom "Type" */
var Compo_Personnes_Type_13=new clCompoListeDeroulanteSimple(Personnes_Type_13,null,"Type");
var Joint_Esclave_Personnes_Type_13=new clJointureMulti("adresse",
	new Array(
	new stJointure("typeadresse","ak_numero","ak_numero",null,false)
	));
var Personnes_Apt_ou_Dest__14=new clAttribut("ad_ligne2","adresse",null);


	/* Ce composant représente: adresse.ad_ligne2 sous le nom "Apt ou Dest." */
var Compo_Personnes_Apt_ou_Dest__14=new clCompoTextBox(Personnes_Apt_ou_Dest__14,null,"Apt ou Dest.",false,false);
var Personnes_Bat__étage____15=new clAttribut("ad_ligne3","adresse",null);


	/* Ce composant représente: adresse.ad_ligne3 sous le nom "Bat, étage..." */
var Compo_Personnes_Bat__étage____15=new clCompoTextBox(Personnes_Bat__étage____15,null,"Bat, étage...",false,false);
var Personnes_N__et_Voie_16=new clAttribut("ad_ligne4","adresse",null);


	/* Ce composant représente: adresse.ad_ligne4 sous le nom "N° et Voie" */
var Compo_Personnes_N__et_Voie_16=new clCompoTextBox(Personnes_N__et_Voie_16,null,"N° et Voie",false,false);
var Personnes_BP_ou_Lieu_dit_17=new clAttribut("ad_ligne5","adresse",null);


	/* Ce composant représente: adresse.ad_ligne5 sous le nom "BP ou Lieu-dit" */
var Compo_Personnes_BP_ou_Lieu_dit_17=new clCompoTextBox(Personnes_BP_ou_Lieu_dit_17,null,"BP ou Lieu-dit",false,false);
var Personnes_Code_postal_18=new clAttribut("cp_codepostal","codepostal",null);


	/* Ce composant représente: codepostal.cp_codepostal sous le nom "Code postal" */
var Compo_Personnes_Code_postal_18=new clCompoListeDeroulanteSimple(Personnes_Code_postal_18,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_CP_Personne=new clInterfaceFiltrageContenuHautBas()),"Code postal");
var Joint_Esclave_Personnes_Code_postal_18=new clJointureMulti("adresse",
	new Array(
	new stJointure("codepostal","cp_numero","cp_numero",null,false)
	));
var Personnes_Ville_19=new clAttribut("vi_nom","ville",null);


	/* Ce composant représente: ville.vi_nom sous le nom "Ville" */
var Compo_Personnes_Ville_19=new clCompoListeDeroulanteSimple(Personnes_Ville_19,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Ville_Personne=new clInterfaceFiltrageContenuHautBas(Filtre_CP_Personne)),"Ville");
var Joint_Esclave_Personnes_Ville_19=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,false)
	));
var Personnes_Adresses_12=new clEnsembleAttributs("adresse",
	new Array(
	new clLiaison(null,Col_N0_Type_De_Personnes_Adresses_12)
	,new clLiaison(Joint_Col_N1_CP_De_Personnes_Adresses_12,Col_N1_CP_De_Personnes_Adresses_12)
	,new clLiaison(Joint_Col_N2_Ville_De_Personnes_Adresses_12,Col_N2_Ville_De_Personnes_Adresses_12)
	,new clLiaison(Joint_Col_N3_Canton_De_Personnes_Adresses_12,Col_N3_Canton_De_Personnes_Adresses_12)
	),
	new Array(
	new clLiaison(Joint_Esclave_Personnes_Type_13,Personnes_Type_13)
	,new clLiaison(null,Personnes_Apt_ou_Dest__14)
	,new clLiaison(null,Personnes_Bat__étage____15)
	,new clLiaison(null,Personnes_N__et_Voie_16)
	,new clLiaison(null,Personnes_BP_ou_Lieu_dit_17)
	,new clLiaison(Joint_Esclave_Personnes_Code_postal_18,Personnes_Code_postal_18)
	,new clLiaison(Joint_Esclave_Personnes_Ville_19,Personnes_Ville_19)
	));

var Titre_Personnes_Adresses_12=new Array("Type","CP","Ville","Canton");

	/* Ce composant représente: des éléments de la table adresse sous le nom "Adresses" */
var Compo_Personnes_Adresses_12=new clCompoListe(Personnes_Adresses_12,null,Titre_Personnes_Adresses_12,"Adresses",true,false);
var Joint_Esclave_Personnes_Adresses_12=new clJointureMulti("personne",
	new Array(
	new stJointure("adresse","pe_numero","pe_numero",null,false)
	));
var Col_N0_Type_De_Personnes_Contact_20=new clAttribut("ck_nom","contacttype",null);

var Joint_Col_N0_Type_De_Personnes_Contact_20=new clJointureMulti("contact",
	new Array(
	new stJointure("contacttype","ck_numero","ck_numero",null,true)
	));
var Col_N1_Coordonnée_De_Personnes_Contact_20=new clAttribut("cn_coordonnee","contact",null);

var Personnes_Type_21=new clAttribut("ck_nom","contacttype",null);


	/* Ce composant représente: contacttype.ck_nom sous le nom "Type" */
var Compo_Personnes_Type_21=new clCompoListeDeroulanteSimple(Personnes_Type_21,null,"Type");
var Joint_Esclave_Personnes_Type_21=new clJointureMulti("contact",
	new Array(
	new stJointure("contacttype","ck_numero","ck_numero",null,false)
	));
var Personnes_Coordonnée_22=new clAttribut("cn_coordonnee","contact",null);


	/* Ce composant représente: contact.cn_coordonnee sous le nom "Coordonnée" */
var Compo_Personnes_Coordonnée_22=new clCompoTextBox(Personnes_Coordonnée_22,null,"Coordonnée",false,false);
var Personnes_Contact_20=new clEnsembleAttributs("contact",
	new Array(
	new clLiaison(Joint_Col_N0_Type_De_Personnes_Contact_20,Col_N0_Type_De_Personnes_Contact_20)
	,new clLiaison(null,Col_N1_Coordonnée_De_Personnes_Contact_20)
	),
	new Array(
	new clLiaison(Joint_Esclave_Personnes_Type_21,Personnes_Type_21)
	,new clLiaison(null,Personnes_Coordonnée_22)
	));

var Titre_Personnes_Contact_20=new Array("Type","Coordonnée");

	/* Ce composant représente: des éléments de la table contact sous le nom "Contact" */
var Compo_Personnes_Contact_20=new clCompoListe(Personnes_Contact_20,null,Titre_Personnes_Contact_20,"Contact",true,false);
var Joint_Esclave_Personnes_Contact_20=new clJointureMulti("personne",
	new Array(
	new stJointure("contact","pe_numero","pe_numero",null,false)
	));
var Col_N0_Date_De_Personnes_Tâches_23=new clAttribut("ap_rdate","appel",null);

var Col_N1_Type_De_Personnes_Tâches_23=new clAttribut("th_libelle","typetache",null);

var Joint_Col_N1_Type_De_Personnes_Tâches_23=new clJointureMulti("appel",
	new Array(
	new stJointure("typetache","th_numero","th_numero",null,true)
	));
var Col_N2_Motif_De_Personnes_Tâches_23=new clAttribut("ap_libelle","appel",null);

var Col_N3_Durée__min__De_Personnes_Tâches_23=new clAttribut("ap_duree","appel",null);

var Col_N4_Login_De_Personnes_Tâches_23=new clAttribut("updated_by","appel",null);

var Personnes_Date_24=new clAttribut("ap_date","appel",null);


	/* Ce composant représente: appel.ap_date sous le nom "Date" */
var Compo_Personnes_Date_24=new clCompoTextBox(Personnes_Date_24,null,"Date",false,false);
var Personnes_Type_25=new clAttribut("th_libelle","typetache",null);


	/* Ce composant représente: typetache.th_libelle sous le nom "Type" */
var Compo_Personnes_Type_25=new clCompoListeDeroulanteSimple(Personnes_Type_25,null,"Type");
var Joint_Esclave_Personnes_Type_25=new clJointureMulti("appel",
	new Array(
	new stJointure("typetache","th_numero","th_numero",null,false)
	));
var Personnes_Motif_26=new clAttribut("ap_libelle","appel",null);


	/* Ce composant représente: appel.ap_libelle sous le nom "Motif" */
var Compo_Personnes_Motif_26=new clCompoTextBox(Personnes_Motif_26,null,"Motif",false,true);
var Personnes_Durée__min__27=new clAttribut("ap_duree","appel",null);


	/* Ce composant représente: appel.ap_duree sous le nom "Durée (min)" */
var Compo_Personnes_Durée__min__27=new clCompoTextBox(Personnes_Durée__min__27,null,"Durée (min)",false,false);
var Personnes_Détails_complémentaires_28=new clAttribut("ap_description","appel",null);


	/* Ce composant représente: appel.ap_description sous le nom "Détails complémentaires" */
var Compo_Personnes_Détails_complémentaires_28=new clCompoTextBox(Personnes_Détails_complémentaires_28,null,"Détails complémentaires",false,true);
var Personnes_Tâches_23=new clEnsembleAttributs("appel",
	new Array(
	new clLiaison(null,Col_N0_Date_De_Personnes_Tâches_23)
	,new clLiaison(Joint_Col_N1_Type_De_Personnes_Tâches_23,Col_N1_Type_De_Personnes_Tâches_23)
	,new clLiaison(null,Col_N2_Motif_De_Personnes_Tâches_23)
	,new clLiaison(null,Col_N3_Durée__min__De_Personnes_Tâches_23)
	,new clLiaison(null,Col_N4_Login_De_Personnes_Tâches_23)
	),
	new Array(
	new clLiaison(null,Personnes_Date_24)
	,new clLiaison(Joint_Esclave_Personnes_Type_25,Personnes_Type_25)
	,new clLiaison(null,Personnes_Motif_26)
	,new clLiaison(null,Personnes_Durée__min__27)
	,new clLiaison(null,Personnes_Détails_complémentaires_28)
	));

var Titre_Personnes_Tâches_23=new Array("Date","Type","Motif","Durée (min)","Login");

	/* Ce composant représente: des éléments de la table appel sous le nom "Tâches" */
var Compo_Personnes_Tâches_23=new clCompoListe(Personnes_Tâches_23,null,Titre_Personnes_Tâches_23,"Tâches",true,false);
var Joint_Esclave_Personnes_Tâches_23=new clJointureMulti("personne",
	new Array(
	new stJointure("appel","pe_numero","pe_numero",null,false)
	));
var Col_N0_Status_De_Personnes_Responsabilités_29=new clAttribut("peac_fini","estresponsable",null);

var Col_N1_Nom_De_Personnes_Responsabilités_29=new clAttribut("re_nom","responsabilite",null);

var Joint_Col_N1_Nom_De_Personnes_Responsabilités_29=new clJointureMulti("estresponsable",
	new Array(
	new stJointure("responsabilite","re_numero","re_numero",null,true)
	));
var Col_N2_Famille_De_Personnes_Responsabilités_29=new clAttribut("re_famille","responsabilite",null);

var Joint_Col_N2_Famille_De_Personnes_Responsabilités_29=new clJointureMulti("estresponsable",
	new Array(
	new stJointure("responsabilite","re_numero","re_numero",null,true)
	));
var Col_N3_Code_De_Personnes_Responsabilités_29=new clAttribut("re_code","responsabilite",null);

var Joint_Col_N3_Code_De_Personnes_Responsabilités_29=new clJointureMulti("estresponsable",
	new Array(
	new stJointure("responsabilite","re_numero","re_numero",null,true)
	));
var Col_N4_Du_De_Personnes_Responsabilités_29=new clAttribut("peac_periodedebut","estresponsable",null);

var Col_N5_Au_De_Personnes_Responsabilités_29=new clAttribut("peac_periodefin","estresponsable",null);

var Personnes_Responsabilité_30=new clAttribut("re_nom","responsabilite",null);


	/* Ce composant représente: responsabilite.re_nom sous le nom "Responsabilité" */
var Compo_Personnes_Responsabilité_30=new clCompoListeDeroulanteSimple(Personnes_Responsabilité_30,null,"Responsabilité");
var Joint_Esclave_Personnes_Responsabilité_30=new clJointureMulti("estresponsable",
	new Array(
	new stJointure("responsabilite","re_numero","re_numero",null,false)
	));
var Personnes_Titre_31=new clAttribut("peac_titre","estresponsable",null);


	/* Ce composant représente: estresponsable.peac_titre sous le nom "Titre" */
var Compo_Personnes_Titre_31=new clCompoTextBox(Personnes_Titre_31,null,"Titre",false,false);
var Personnes_Du_32=new clAttribut("peac_periodedebut","estresponsable",null);


	/* Ce composant représente: estresponsable.peac_periodedebut sous le nom "Du" */
var Compo_Personnes_Du_32=new clCompoTextBox(Personnes_Du_32,null,"Du",false,false);
var Personnes_Au_33=new clAttribut("peac_periodefin","estresponsable",null);


	/* Ce composant représente: estresponsable.peac_periodefin sous le nom "Au" */
var Compo_Personnes_Au_33=new clCompoTextBox(Personnes_Au_33,null,"Au",false,false);
var Personnes_Fin_de_mandat_34=new clAttribut("peac_fini","estresponsable",null);


	/* Ce composant représente: estresponsable.peac_fini sous le nom "Fin de mandat" */
var Compo_Personnes_Fin_de_mandat_34=new clCompoCheckBox(Personnes_Fin_de_mandat_34,null,"Fin de mandat");
var Personnes_Responsabilités_29=new clEnsembleAttributs("estresponsable",
	new Array(
	new clLiaison(null,Col_N0_Status_De_Personnes_Responsabilités_29)
	,new clLiaison(Joint_Col_N1_Nom_De_Personnes_Responsabilités_29,Col_N1_Nom_De_Personnes_Responsabilités_29)
	,new clLiaison(Joint_Col_N2_Famille_De_Personnes_Responsabilités_29,Col_N2_Famille_De_Personnes_Responsabilités_29)
	,new clLiaison(Joint_Col_N3_Code_De_Personnes_Responsabilités_29,Col_N3_Code_De_Personnes_Responsabilités_29)
	,new clLiaison(null,Col_N4_Du_De_Personnes_Responsabilités_29)
	,new clLiaison(null,Col_N5_Au_De_Personnes_Responsabilités_29)
	),
	new Array(
	new clLiaison(Joint_Esclave_Personnes_Responsabilité_30,Personnes_Responsabilité_30)
	,new clLiaison(null,Personnes_Titre_31)
	,new clLiaison(null,Personnes_Du_32)
	,new clLiaison(null,Personnes_Au_33)
	,new clLiaison(null,Personnes_Fin_de_mandat_34)
	));

var Titre_Personnes_Responsabilités_29=new Array("Status","Nom","Famille","Code","Du","Au");

	/* Ce composant représente: des éléments de la table estresponsable sous le nom "Responsabilités" */
var Compo_Personnes_Responsabilités_29=new clCompoListe(Personnes_Responsabilités_29,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_PersonneResponsabilite=new clInterfaceFiltrageEnsXCustom(new Array("Période en cours","(estresponsable.peac_periodefin is null) or (estresponsable.peac_periodefin>= date('01/01/' || date_part('year',current_date)))"))),Titre_Personnes_Responsabilités_29,"Responsabilités",true,false);
var Joint_Esclave_Personnes_Responsabilités_29=new clJointureMulti("personne",
	new Array(
	new stJointure("estresponsable","pe_numero","pe_numero",null,false)
	));
var Col_N0_Attribut_De_Personnes_Attributs_35=new clAttribut("ta_nom","typeattribut",null);

var Joint_Col_N0_Attribut_De_Personnes_Attributs_35=new clJointureMulti("attribut",
	new Array(
	new stJointure("typeattribut","ta_numero","ta_numero",null,true)
	));
var Col_N1_Valeur_De_Personnes_Attributs_35=new clAttribut("cr_libelle","categorie",null);

var Joint_Col_N1_Valeur_De_Personnes_Attributs_35=new clJointureMulti("attribut",
	new Array(
	new stJointure("categorie","cr_numero","cr_numero",null,true)
	));
var Personnes_Attribut_36=new clAttribut("ta_nom","typeattribut",null);


	/* Ce composant représente: typeattribut.ta_nom sous le nom "Attribut" */
var Compo_Personnes_Attribut_36=new clCompoListeDeroulanteSimple(Personnes_Attribut_36,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Typeattribut_Personne=new clInterfaceFiltrageContenuHautBas()),"Attribut");
var Joint_Esclave_Personnes_Attribut_36=new clJointureMulti("attribut",
	new Array(
	new stJointure("typeattribut","ta_numero","ta_numero",null,false)
	));
var Personnes_Valeur_37=new clAttribut("cr_libelle","categorie",null);


	/* Ce composant représente: categorie.cr_libelle sous le nom "Valeur" */
var Compo_Personnes_Valeur_37=new clCompoListeDeroulanteSimple(Personnes_Valeur_37,null,"Valeur");
var Joint_Esclave_Personnes_Valeur_37=new clJointureMulti("attribut",
	new Array(
	new stJointure("categorie","cr_numero","cr_numero",null,false)
	));
var Personnes_Détail_38=new clAttribut("at_valeur","attribut",null);


	/* Ce composant représente: attribut.at_valeur sous le nom "Détail" */
var Compo_Personnes_Détail_38=new clCompoTextBox(Personnes_Détail_38,null,"Détail",false,true);
var Personnes_Attributs_35=new clEnsembleAttributs("attribut",
	new Array(
	new clLiaison(Joint_Col_N0_Attribut_De_Personnes_Attributs_35,Col_N0_Attribut_De_Personnes_Attributs_35)
	,new clLiaison(Joint_Col_N1_Valeur_De_Personnes_Attributs_35,Col_N1_Valeur_De_Personnes_Attributs_35)
	),
	new Array(
	new clLiaison(Joint_Esclave_Personnes_Attribut_36,Personnes_Attribut_36)
	,new clLiaison(Joint_Esclave_Personnes_Valeur_37,Personnes_Valeur_37)
	,new clLiaison(null,Personnes_Détail_38)
	));

var Titre_Personnes_Attributs_35=new Array("Attribut","Valeur");

	/* Ce composant représente: des éléments de la table attribut sous le nom "Attributs" */
var Compo_Personnes_Attributs_35=new clCompoListe(Personnes_Attributs_35,null,Titre_Personnes_Attributs_35,"Attributs",true,false);
var Joint_Esclave_Personnes_Attributs_35=new clJointureMulti("personne",
	new Array(
	new stJointure("attribut","pe_numero","pe_numero",null,false)
	));
var Col_N0_N__De_Personnes_Devis_39=new clAttribut("de_numero","devis",null);

var Col_N1_Date_De_Personnes_Devis_39=new clAttribut("de_date","devis",null);

var Col_N2_Libellé_De_Personnes_Devis_39=new clAttribut("de_libelle","devis",null);

var Col_N3_Montant_HT_De_Personnes_Devis_39=new clAttribut("de_montantht","devis",null);

var Col_N4_Montant_TTC_De_Personnes_Devis_39=new clAttribut("de_montantttc","devis",null);

var Personnes_Devis_39=new clEnsembleAttributs("devis",
	new Array(
	new clLiaison(null,Col_N0_N__De_Personnes_Devis_39)
	,new clLiaison(null,Col_N1_Date_De_Personnes_Devis_39)
	,new clLiaison(null,Col_N2_Libellé_De_Personnes_Devis_39)
	,new clLiaison(null,Col_N3_Montant_HT_De_Personnes_Devis_39)
	,new clLiaison(null,Col_N4_Montant_TTC_De_Personnes_Devis_39)
	),
	null);

var Titre_Personnes_Devis_39=new Array("N°","Date","Libellé","Montant HT","Montant TTC");

	/* Ce composant représente: des éléments de la table devis sous le nom "Devis" */
var Compo_Personnes_Devis_39=new clCompoListe(Personnes_Devis_39,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_PersonneDevis=new clInterfaceFiltragePermanantCustom("de_locked=false"),Filtre_DepFor_Devis_0=new clInterfaceFiltrageRelationOnglet("Devis",Gerer_Devis,OuvrirOnglet_Personnes,true)),Titre_Personnes_Devis_39,"Devis",true,false);
var Joint_Esclave_Personnes_Devis_39=new clJointureMulti("personne",
	new Array(
	new stJointure("devis","pe_numero","pe_numero",null,false)
	));
var Col_N0_N__De_Personnes_Factures_40=new clAttribut("fa_numfact","facture",null);

var Col_N1_Date_De_Personnes_Factures_40=new clAttribut("fa_date","facture",null);

var Col_N2_Libellé_De_Personnes_Factures_40=new clAttribut("fa_libelle","facture",null);

var Col_N3_Agent_De_Personnes_Factures_40=new clAttribut("ag_libelle","agent",null);

var Joint_Col_N3_Agent_De_Personnes_Factures_40=new clJointureMulti("facture",
	new Array(
	new stJointure("agent","ag_numero","ag_numero",null,true)
	));
var Col_N4_HT_De_Personnes_Factures_40=new clAttribut("fa_montantht","facture",null);

var Col_N5_TTC_De_Personnes_Factures_40=new clAttribut("fa_montantttc","facture",null);

var Col_N6_Etat_De_Personnes_Factures_40=new clAttribut("fa_etat","facture",null);

var Personnes_Factures_40=new clEnsembleAttributs("facture",
	new Array(
	new clLiaison(null,Col_N0_N__De_Personnes_Factures_40)
	,new clLiaison(null,Col_N1_Date_De_Personnes_Factures_40)
	,new clLiaison(null,Col_N2_Libellé_De_Personnes_Factures_40)
	,new clLiaison(Joint_Col_N3_Agent_De_Personnes_Factures_40,Col_N3_Agent_De_Personnes_Factures_40)
	,new clLiaison(null,Col_N4_HT_De_Personnes_Factures_40)
	,new clLiaison(null,Col_N5_TTC_De_Personnes_Factures_40)
	,new clLiaison(null,Col_N6_Etat_De_Personnes_Factures_40)
	),
	null);

var Titre_Personnes_Factures_40=new Array("N°","Date","Libellé","Agent","HT","TTC","Etat");

	/* Ce composant représente: des éléments de la table facture sous le nom "Factures" */
var Compo_Personnes_Factures_40=new clCompoListe(Personnes_Factures_40,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Facture_0=new clInterfaceFiltrageRelationOnglet("Facture",Gerer_Facture,OuvrirOnglet_Personnes,true)),Titre_Personnes_Factures_40,"Factures",true,false);
var Joint_Esclave_Personnes_Factures_40=new clJointureMulti("personne",
	new Array(
	new stJointure("facture","pe_numero","pe_numero",null,false)
	));
var Col_N0_N__De_Personnes_Réglements_41=new clAttribut("rg_numero","reglement",null);

var Col_N1_Date_De_Personnes_Réglements_41=new clAttribut("rg_date","reglement",null);

var Col_N2_Montant_De_Personnes_Réglements_41=new clAttribut("rg_montant","reglement",null);

var Col_N3_Mode_De_Personnes_Réglements_41=new clAttribut("mr_libelle","modereglement",null);

var Joint_Col_N3_Mode_De_Personnes_Réglements_41=new clJointureMulti("reglement",
	new Array(
	new stJointure("modereglement","mr_numero","mr_numero",null,true)
	));
var Col_N4_Etat_De_Personnes_Réglements_41=new clAttribut("rg_etat","reglement",null);

var Personnes_Réglements_41=new clEnsembleAttributs("reglement",
	new Array(
	new clLiaison(null,Col_N0_N__De_Personnes_Réglements_41)
	,new clLiaison(null,Col_N1_Date_De_Personnes_Réglements_41)
	,new clLiaison(null,Col_N2_Montant_De_Personnes_Réglements_41)
	,new clLiaison(Joint_Col_N3_Mode_De_Personnes_Réglements_41,Col_N3_Mode_De_Personnes_Réglements_41)
	,new clLiaison(null,Col_N4_Etat_De_Personnes_Réglements_41)
	),
	null);

var Titre_Personnes_Réglements_41=new Array("N°","Date","Montant","Mode","Etat");

	/* Ce composant représente: des éléments de la table reglement sous le nom "Réglements" */
var Compo_Personnes_Réglements_41=new clCompoListe(Personnes_Réglements_41,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_DepFor_Réglement_1=new clInterfaceFiltrageRelationOnglet("Réglement",Gerer_Réglement,OuvrirOnglet_Personnes,true)),Titre_Personnes_Réglements_41,"Réglements",true,false);
var Joint_Esclave_Personnes_Réglements_41=new clJointureMulti("personne",
	new Array(
	new stJointure("reglement","pe_numero","pe_numero",null,false)
	));
var Col_N0_Début_De_Personnes_Routages_42=new clAttribut("ro_debutservice","routage",null);

var Col_N1_Fin_De_Personnes_Routages_42=new clAttribut("ro_finservice","routage",null);

var Col_N2_Qté__De_Personnes_Routages_42=new clAttribut("ro_quantite","routage",null);

var Col_N3_Adresse_De_Personnes_Routages_42=new clAttribut("ad_libelle","adresse",null);

var Joint_Col_N3_Adresse_De_Personnes_Routages_42=new clJointureMulti("routage",
	new Array(
	new stJointure("adresse","ad_numero","ad_numero",null,true)
	));
var Col_N4_Facture_De_Personnes_Routages_42=new clAttribut("fa_numfact","facture",null);

var Joint_Col_N4_Facture_De_Personnes_Routages_42=new clJointureMulti("routage",
	new Array(
	new stJointure("facture","fa_numero","fa_numero",null,true)
	));
var Personnes_Début_43=new clAttribut("ro_debutservice","routage",null);


	/* Ce composant représente: routage.ro_debutservice sous le nom "Début" */
var Compo_Personnes_Début_43=new clCompoTextBox(Personnes_Début_43,null,"Début",false,false);
var Personnes_Fin_44=new clAttribut("ro_finservice","routage",null);


	/* Ce composant représente: routage.ro_finservice sous le nom "Fin" */
var Compo_Personnes_Fin_44=new clCompoTextBox(Personnes_Fin_44,null,"Fin",false,false);
var Personnes_Quantité_45=new clAttribut("ro_quantite","routage",null);


	/* Ce composant représente: routage.ro_quantite sous le nom "Quantité" */
var Compo_Personnes_Quantité_45=new clCompoTextBox(Personnes_Quantité_45,null,"Quantité",false,false);
var Personnes_Suspendre_les_relances_46=new clAttribut("ro_suspendu","routage",null);


	/* Ce composant représente: routage.ro_suspendu sous le nom "Suspendre les relances" */
var Compo_Personnes_Suspendre_les_relances_46=new clCompoCheckBox(Personnes_Suspendre_les_relances_46,null,"Suspendre les relances");
var Personnes_Routages_42=new clEnsembleAttributs("routage",
	new Array(
	new clLiaison(null,Col_N0_Début_De_Personnes_Routages_42)
	,new clLiaison(null,Col_N1_Fin_De_Personnes_Routages_42)
	,new clLiaison(null,Col_N2_Qté__De_Personnes_Routages_42)
	,new clLiaison(Joint_Col_N3_Adresse_De_Personnes_Routages_42,Col_N3_Adresse_De_Personnes_Routages_42)
	,new clLiaison(Joint_Col_N4_Facture_De_Personnes_Routages_42,Col_N4_Facture_De_Personnes_Routages_42)
	),
	new Array(
	new clLiaison(null,Personnes_Début_43)
	,new clLiaison(null,Personnes_Fin_44)
	,new clLiaison(null,Personnes_Quantité_45)
	,new clLiaison(null,Personnes_Suspendre_les_relances_46)
	));

var Titre_Personnes_Routages_42=new Array("Début","Fin","Qté.","Adresse","Facture");

	/* Ce composant représente: des éléments de la table routage sous le nom "Routages" */
var Compo_Personnes_Routages_42=new clCompoListe(Personnes_Routages_42,null,Titre_Personnes_Routages_42,"Routages",true,false);
var Joint_Esclave_Personnes_Routages_42=new clJointureMulti("personne",
	new Array(
	new stJointure("routage","pe_numero","pe_numero",null,false)
	));
var Personnes_Liste_des_personnes0=new clEnsembleAttributs("personne",
	new Array(
	new clLiaison(null,Col_N0_Nom______________De_Personnes_Liste_des_personnes0)
	,new clLiaison(null,Col_N1_N__De_Personnes_Liste_des_personnes0)
	),
	new Array(
	new clLiaison(null,Personnes_Numéro_1)
	,new clLiaison(Joint_Esclave_Personnes_Titre_ou_F_J__2,Personnes_Titre_ou_F_J__2)
	,new clLiaison(null,Personnes_Nom_ou_D_S__3)
	,new clLiaison(null,Personnes_Prénom_4)
	,new clLiaison(null,Personnes_N_TVA_intrac__5)
	,new clLiaison(null,Personnes_Né_e__le_6)
	,new clLiaison(null,Personnes_La_personne_est_active__et_peut_être_contactée__7)
	,new clLiaison(Joint_Esclave_Personnes_Cotisations_8,Personnes_Cotisations_8)
	,new clLiaison(Joint_Esclave_Personnes_Observations_9,Personnes_Observations_9)
	,new clLiaison(Joint_Esclave_Personnes_Adresses_12,Personnes_Adresses_12)
	,new clLiaison(Joint_Esclave_Personnes_Contact_20,Personnes_Contact_20)
	,new clLiaison(Joint_Esclave_Personnes_Tâches_23,Personnes_Tâches_23)
	,new clLiaison(Joint_Esclave_Personnes_Responsabilités_29,Personnes_Responsabilités_29)
	,new clLiaison(Joint_Esclave_Personnes_Attributs_35,Personnes_Attributs_35)
	,new clLiaison(Joint_Esclave_Personnes_Devis_39,Personnes_Devis_39)
	,new clLiaison(Joint_Esclave_Personnes_Factures_40,Personnes_Factures_40)
	,new clLiaison(Joint_Esclave_Personnes_Réglements_41,Personnes_Réglements_41)
	,new clLiaison(Joint_Esclave_Personnes_Routages_42,Personnes_Routages_42)
	));

var Titre_Personnes_Liste_des_personnes0=new Array("Nom             ","N°");

	/* Ce composant représente: des éléments de la table personne sous le nom "Liste des personnes" */
var Compo_Personnes_Liste_des_personnes0=new clCompoListe(Personnes_Liste_des_personnes0,new Array(new clInterfaceFiltrageVide()),Titre_Personnes_Liste_des_personnes0,"Liste des personnes",true,false);

	/* Ce composant représente: personne.undefined sous le nom "Liste des personnes" */
Compo_Personnes_Liste_des_personnes0.AddCompoAddOn(new clAddon_Fctmenupopup("Rechercher",new Array("Par numéro","Par nom","Par code postal","Par ville","Par contact","Par N.Devis","Par N.Facture"),new Array(Recherche_Num,Recherche_Nom,Recherche_CP,Recherche_Ville,Recherche_Contact,Recherche_Devis,Recherche_Facture),new Array(Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0)));
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Liste_des_personnes0.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0"));

 }

	/* On l'ajoute au tableau global à l'indice 1262*/
top.TAB_GLOBAL_COMPO[1262]=Compo_Personnes_Liste_des_personnes0;

	/* Ce composant représente: des éléments de la table personne sous le nom "Numéro" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Numéro_1.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1265*/
top.TAB_GLOBAL_COMPO[1265]=Compo_Personnes_Numéro_1;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Titre ou F.J." */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Personnes_Titre_ou_F_J__2.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1266*/
top.TAB_GLOBAL_COMPO[1266]=Compo_Personnes_Titre_ou_F_J__2;

	/* Ce composant représente: des éléments de la table personne sous le nom "Nom ou D.S." */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Nom_ou_D_S__3.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1267*/
top.TAB_GLOBAL_COMPO[1267]=Compo_Personnes_Nom_ou_D_S__3;

	/* Ce composant représente: des éléments de la table personne sous le nom "Prénom" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Prénom_4.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1268*/
top.TAB_GLOBAL_COMPO[1268]=Compo_Personnes_Prénom_4;

	/* Ce composant représente: des éléments de la table personne sous le nom "N°TVA intrac." */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_N_TVA_intrac__5.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1269*/
top.TAB_GLOBAL_COMPO[1269]=Compo_Personnes_N_TVA_intrac__5;

	/* Ce composant représente: des éléments de la table personne sous le nom "Né(e) le" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Né_e__le_6.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1270*/
top.TAB_GLOBAL_COMPO[1270]=Compo_Personnes_Né_e__le_6;

	/* Ce composant représente: des éléments de la table personne sous le nom "La personne est active (et peut être contactée)" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1271*/
top.TAB_GLOBAL_COMPO[1271]=Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7;

	/* Ce composant représente: vue_cotisation.undefined sous le nom "Cotisations" */
 if(ALeDroit(0,"vue_cotisation"))
 {
Compo_Personnes_Cotisations_8.GenererXUL(top.document.getElementById("Personnes_Cotisations_8"));

 }

	/* On l'ajoute au tableau global à l'indice 1272*/
top.TAB_GLOBAL_COMPO[1272]=Compo_Personnes_Cotisations_8;

	/* Ce composant représente: observation.undefined sous le nom "Observations" */
 if(ALeDroit(0,"observation"))
 {
Compo_Personnes_Observations_9.GenererXUL(top.document.getElementById("Personnes_Observations_9"));

 }

	/* On l'ajoute au tableau global à l'indice 1279*/
top.TAB_GLOBAL_COMPO[1279]=Compo_Personnes_Observations_9;

	/* Ce composant représente: des éléments de la table observation sous le nom "Importance" */
 if(ALeDroit(0,"observation"))
 {
Compo_Personnes_Importance_10.GenererXUL(top.document.getElementById("Personnes_Observations_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1282*/
top.TAB_GLOBAL_COMPO[1282]=Compo_Personnes_Importance_10;

	/* Ce composant représente: des éléments de la table observation sous le nom "Description" */
 if(ALeDroit(0,"observation"))
 {
Compo_Personnes_Description_11.GenererXUL(top.document.getElementById("Personnes_Observations_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1283*/
top.TAB_GLOBAL_COMPO[1283]=Compo_Personnes_Description_11;

	/* Ce composant représente: adresse.undefined sous le nom "Adresses" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Adresses_12.GenererXUL(top.document.getElementById("Personnes_Adresses_12"));

 }

	/* On l'ajoute au tableau global à l'indice 1284*/
top.TAB_GLOBAL_COMPO[1284]=Compo_Personnes_Adresses_12;

	/* Ce composant représente: des éléments de la table typeadresse sous le nom "Type" */
 if(ALeDroit(0,"typeadresse"))
 {
Compo_Personnes_Type_13.GenererXUL(top.document.getElementById("Personnes_Adresses_12_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1289*/
top.TAB_GLOBAL_COMPO[1289]=Compo_Personnes_Type_13;

	/* Ce composant représente: des éléments de la table adresse sous le nom "Apt ou Dest." */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Apt_ou_Dest__14.GenererXUL(top.document.getElementById("Personnes_Adresses_12_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1290*/
top.TAB_GLOBAL_COMPO[1290]=Compo_Personnes_Apt_ou_Dest__14;

	/* Ce composant représente: des éléments de la table adresse sous le nom "Bat, étage..." */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Bat__étage____15.GenererXUL(top.document.getElementById("Personnes_Adresses_12_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1291*/
top.TAB_GLOBAL_COMPO[1291]=Compo_Personnes_Bat__étage____15;

	/* Ce composant représente: des éléments de la table adresse sous le nom "N° et Voie" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_N__et_Voie_16.GenererXUL(top.document.getElementById("Personnes_Adresses_12_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1292*/
top.TAB_GLOBAL_COMPO[1292]=Compo_Personnes_N__et_Voie_16;

	/* Ce composant représente: des éléments de la table adresse sous le nom "BP ou Lieu-dit" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_BP_ou_Lieu_dit_17.GenererXUL(top.document.getElementById("Personnes_Adresses_12_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1293*/
top.TAB_GLOBAL_COMPO[1293]=Compo_Personnes_BP_ou_Lieu_dit_17;

	/* Ce composant représente: des éléments de la table codepostal sous le nom "Code postal" */
var Joint_Filtre_CP_Personne=new clJointureMulti("codepostal",
	new Array(
		new stJointure("villecp","cp_numero","cp_numero",null,false),
		new stJointure("ville","vi_numero","vi_numero",null,false)));
Filtre_CP_Personne.setComposant(Compo_Personnes_Ville_19,Joint_Filtre_CP_Personne);
 if(ALeDroit(0,"codepostal"))
 {
Compo_Personnes_Code_postal_18.GenererXUL(top.document.getElementById("Personnes_Adresses_12_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1294*/
top.TAB_GLOBAL_COMPO[1294]=Compo_Personnes_Code_postal_18;

	/* Ce composant représente: des éléments de la table ville sous le nom "Ville" */
var Joint_Filtre_Ville_Personne=new clJointureMulti("ville",
	new Array(
		new stJointure("villecp","vi_numero","vi_numero",null,false),
		new stJointure("codepostal","cp_numero","cp_numero",null,false)));
Filtre_Ville_Personne.setComposant(Compo_Personnes_Code_postal_18,Joint_Filtre_Ville_Personne);
 if(ALeDroit(0,"ville"))
 {
Compo_Personnes_Ville_19.GenererXUL(top.document.getElementById("Personnes_Adresses_12_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1295*/
top.TAB_GLOBAL_COMPO[1295]=Compo_Personnes_Ville_19;

	/* Ce composant représente: contact.undefined sous le nom "Contact" */
 if(ALeDroit(0,"contact"))
 {
Compo_Personnes_Contact_20.GenererXUL(top.document.getElementById("Personnes_Contact_20"));

 }

	/* On l'ajoute au tableau global à l'indice 1296*/
top.TAB_GLOBAL_COMPO[1296]=Compo_Personnes_Contact_20;

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Type" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Personnes_Type_21.GenererXUL(top.document.getElementById("Personnes_Contact_20_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1299*/
top.TAB_GLOBAL_COMPO[1299]=Compo_Personnes_Type_21;

	/* Ce composant représente: des éléments de la table contact sous le nom "Coordonnée" */
 if(ALeDroit(0,"contact"))
 {
Compo_Personnes_Coordonnée_22.GenererXUL(top.document.getElementById("Personnes_Contact_20_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1300*/
top.TAB_GLOBAL_COMPO[1300]=Compo_Personnes_Coordonnée_22;

	/* Ce composant représente: appel.undefined sous le nom "Tâches" */
 if(ALeDroit(0,"appel"))
 {
Compo_Personnes_Tâches_23.GenererXUL(top.document.getElementById("Personnes_Tâches_23"));

 }

	/* On l'ajoute au tableau global à l'indice 1301*/
top.TAB_GLOBAL_COMPO[1301]=Compo_Personnes_Tâches_23;

	/* Ce composant représente: des éléments de la table appel sous le nom "Date" */
 if(ALeDroit(0,"appel"))
 {
Compo_Personnes_Date_24.GenererXUL(top.document.getElementById("Personnes_Tâches_23_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1307*/
top.TAB_GLOBAL_COMPO[1307]=Compo_Personnes_Date_24;

	/* Ce composant représente: des éléments de la table typetache sous le nom "Type" */
 if(ALeDroit(0,"typetache"))
 {
Compo_Personnes_Type_25.GenererXUL(top.document.getElementById("Personnes_Tâches_23_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1308*/
top.TAB_GLOBAL_COMPO[1308]=Compo_Personnes_Type_25;

	/* Ce composant représente: des éléments de la table appel sous le nom "Motif" */
 if(ALeDroit(0,"appel"))
 {
Compo_Personnes_Motif_26.GenererXUL(top.document.getElementById("Personnes_Tâches_23_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1309*/
top.TAB_GLOBAL_COMPO[1309]=Compo_Personnes_Motif_26;

	/* Ce composant représente: des éléments de la table appel sous le nom "Durée (min)" */
 if(ALeDroit(0,"appel"))
 {
Compo_Personnes_Durée__min__27.GenererXUL(top.document.getElementById("Personnes_Tâches_23_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1310*/
top.TAB_GLOBAL_COMPO[1310]=Compo_Personnes_Durée__min__27;

	/* Ce composant représente: des éléments de la table appel sous le nom "Détails complémentaires" */
 if(ALeDroit(0,"appel"))
 {
Compo_Personnes_Détails_complémentaires_28.GenererXUL(top.document.getElementById("Personnes_Tâches_23_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1311*/
top.TAB_GLOBAL_COMPO[1311]=Compo_Personnes_Détails_complémentaires_28;

	/* Ce composant représente: estresponsable.undefined sous le nom "Responsabilités" */
 if(ALeDroit(0,"estresponsable"))
 {
Compo_Personnes_Responsabilités_29.GenererXUL(top.document.getElementById("Personnes_Responsabilités_29"));

 }

	/* On l'ajoute au tableau global à l'indice 1312*/
top.TAB_GLOBAL_COMPO[1312]=Compo_Personnes_Responsabilités_29;

	/* Ce composant représente: des éléments de la table responsabilite sous le nom "Responsabilité" */
 if(ALeDroit(0,"responsabilite"))
 {
Compo_Personnes_Responsabilité_30.GenererXUL(top.document.getElementById("Personnes_Responsabilités_29_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1319*/
top.TAB_GLOBAL_COMPO[1319]=Compo_Personnes_Responsabilité_30;

	/* Ce composant représente: des éléments de la table estresponsable sous le nom "Titre" */
 if(ALeDroit(0,"estresponsable"))
 {
Compo_Personnes_Titre_31.GenererXUL(top.document.getElementById("Personnes_Responsabilités_29_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1320*/
top.TAB_GLOBAL_COMPO[1320]=Compo_Personnes_Titre_31;

	/* Ce composant représente: des éléments de la table estresponsable sous le nom "Du" */
 if(ALeDroit(0,"estresponsable"))
 {
Compo_Personnes_Du_32.GenererXUL(top.document.getElementById("Personnes_Responsabilités_29_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1321*/
top.TAB_GLOBAL_COMPO[1321]=Compo_Personnes_Du_32;

	/* Ce composant représente: des éléments de la table estresponsable sous le nom "Au" */
 if(ALeDroit(0,"estresponsable"))
 {
Compo_Personnes_Au_33.GenererXUL(top.document.getElementById("Personnes_Responsabilités_29_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1322*/
top.TAB_GLOBAL_COMPO[1322]=Compo_Personnes_Au_33;

	/* Ce composant représente: des éléments de la table estresponsable sous le nom "Fin de mandat" */
 if(ALeDroit(0,"estresponsable"))
 {
Compo_Personnes_Fin_de_mandat_34.GenererXUL(top.document.getElementById("Personnes_Responsabilités_29_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1323*/
top.TAB_GLOBAL_COMPO[1323]=Compo_Personnes_Fin_de_mandat_34;

	/* Ce composant représente: attribut.undefined sous le nom "Attributs" */
 if(ALeDroit(0,"attribut"))
 {
Compo_Personnes_Attributs_35.GenererXUL(top.document.getElementById("Personnes_Attributs_35"));

 }

	/* On l'ajoute au tableau global à l'indice 1324*/
top.TAB_GLOBAL_COMPO[1324]=Compo_Personnes_Attributs_35;

	/* Ce composant représente: des éléments de la table typeattribut sous le nom "Attribut" */
var Joint_Filtre_Typeattribut_Personne=new clJointureMulti("typeattribut",
	new Array(
		new stJointure("categorie","ta_numero","ta_numero",null,false),
		new stJointure("categorie","cr_numero","cr_numero",null,false)));
Filtre_Typeattribut_Personne.setComposant(Compo_Personnes_Valeur_37,Joint_Filtre_Typeattribut_Personne);
 if(ALeDroit(0,"typeattribut"))
 {
Compo_Personnes_Attribut_36.GenererXUL(top.document.getElementById("Personnes_Attributs_35_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1327*/
top.TAB_GLOBAL_COMPO[1327]=Compo_Personnes_Attribut_36;

	/* Ce composant représente: des éléments de la table categorie sous le nom "Valeur" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Personnes_Valeur_37.GenererXUL(top.document.getElementById("Personnes_Attributs_35_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1328*/
top.TAB_GLOBAL_COMPO[1328]=Compo_Personnes_Valeur_37;

	/* Ce composant représente: des éléments de la table attribut sous le nom "Détail" */
 if(ALeDroit(0,"attribut"))
 {
Compo_Personnes_Détail_38.GenererXUL(top.document.getElementById("Personnes_Attributs_35_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1329*/
top.TAB_GLOBAL_COMPO[1329]=Compo_Personnes_Détail_38;

	/* Ce composant représente: devis.undefined sous le nom "Devis" */
 if(ALeDroit(0,"devis"))
 {
Compo_Personnes_Devis_39.GenererXUL(top.document.getElementById("Personnes_Devis_39"));

 }

	/* On l'ajoute au tableau global à l'indice 1330*/
top.TAB_GLOBAL_COMPO[1330]=Compo_Personnes_Devis_39;

	/* Ce composant représente: facture.undefined sous le nom "Factures" */
 if(ALeDroit(0,"facture"))
 {
Compo_Personnes_Factures_40.GenererXUL(top.document.getElementById("Personnes_Factures_40"));

 }

	/* On l'ajoute au tableau global à l'indice 1336*/
top.TAB_GLOBAL_COMPO[1336]=Compo_Personnes_Factures_40;

	/* Ce composant représente: reglement.undefined sous le nom "Réglements" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Personnes_Réglements_41.GenererXUL(top.document.getElementById("Personnes_Réglements_41"));

 }

	/* On l'ajoute au tableau global à l'indice 1344*/
top.TAB_GLOBAL_COMPO[1344]=Compo_Personnes_Réglements_41;

	/* Ce composant représente: routage.undefined sous le nom "Routages" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Routages_42.GenererXUL(top.document.getElementById("Personnes_Routages_42"));

 }

	/* On l'ajoute au tableau global à l'indice 1350*/
top.TAB_GLOBAL_COMPO[1350]=Compo_Personnes_Routages_42;

	/* Ce composant représente: des éléments de la table routage sous le nom "Début" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Début_43.GenererXUL(top.document.getElementById("Personnes_Routages_42_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1356*/
top.TAB_GLOBAL_COMPO[1356]=Compo_Personnes_Début_43;

	/* Ce composant représente: des éléments de la table routage sous le nom "Fin" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Fin_44.GenererXUL(top.document.getElementById("Personnes_Routages_42_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1357*/
top.TAB_GLOBAL_COMPO[1357]=Compo_Personnes_Fin_44;

	/* Ce composant représente: des éléments de la table routage sous le nom "Quantité" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Quantité_45.GenererXUL(top.document.getElementById("Personnes_Routages_42_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1358*/
top.TAB_GLOBAL_COMPO[1358]=Compo_Personnes_Quantité_45;

	/* Ce composant représente: des éléments de la table routage sous le nom "Suspendre les relances" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Suspendre_les_relances_46.GenererXUL(top.document.getElementById("Personnes_Routages_42_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1359*/
top.TAB_GLOBAL_COMPO[1359]=Compo_Personnes_Suspendre_les_relances_46;
var Col_N0_Devis_De_Devis_Liste_des_devis0=new clAttribut("de_numero","devis",null);

var Col_N1_Date_De_Devis_Liste_des_devis0=new clAttribut("de_date","devis",null);

var Col_N2___R__De_Devis_Liste_des_devis0=new clAttribut("de_reduction","devis",null);

var Col_N3_Montant_TTC_De_Devis_Liste_des_devis0=new clAttribut("de_montantttc","devis",null);

var Devis_Date_1=new clAttribut("de_date","devis",null);


	/* Ce composant représente: devis.de_date sous le nom "Date" */
var Compo_Devis_Date_1=new clCompoTextBox(Devis_Date_1,null,"Date",false,false);
var Devis_Libellé_2=new clAttribut("de_libelle","devis",null);


	/* Ce composant représente: devis.de_libelle sous le nom "Libellé" */
var Compo_Devis_Libellé_2=new clCompoTextBox(Devis_Libellé_2,null,"Libellé",false,false);
var Devis_Suivi_par_3=new clAttribut("em_libelle","employe",null);


	/* Ce composant représente: employe.em_libelle sous le nom "Suivi par" */
var Compo_Devis_Suivi_par_3=new clCompoListeDeroulanteSimple(Devis_Suivi_par_3,null,"Suivi par");
var Joint_Esclave_Devis_Suivi_par_3=new clJointureMulti("devis",
	new Array(
	new stJointure("employe","em_numero","em_numero",null,false)
	));
var Devis_Acompte_à_payer_4=new clAttribut("de_acompte","devis",null);


	/* Ce composant représente: devis.de_acompte sous le nom "Acompte à payer" */
var Compo_Devis_Acompte_à_payer_4=new clCompoCheckBox(Devis_Acompte_à_payer_4,null,"Acompte à payer");
var Devis_Devis_sous_forme_de_lettre_5=new clAttribut("de_lettre","devis",null);


	/* Ce composant représente: devis.de_lettre sous le nom "Devis sous forme de lettre" */
var Compo_Devis_Devis_sous_forme_de_lettre_5=new clCompoCheckBox(Devis_Devis_sous_forme_de_lettre_5,null,"Devis sous forme de lettre");
var Devis_Civilités_6=new clAttribut("de_civilites","devis",null);


	/* Ce composant représente: devis.de_civilites sous le nom "Civilités" */
var Compo_Devis_Civilités_6=new clCompoTextBox(Devis_Civilités_6,null,"Civilités",false,false);
var Devis_Introduction_de_la_lettre_7=new clAttribut("de_introduction","devis",null);


	/* Ce composant représente: devis.de_introduction sous le nom "Introduction de la lettre" */
var Compo_Devis_Introduction_de_la_lettre_7=new clCompoTextBox(Devis_Introduction_de_la_lettre_7,null,"Introduction de la lettre",false,true);
var Col_N0_Produit_De_Devis_Lignes_du_devis_8=new clAttribut("pd_libelle","produit",null);

var Joint_Col_N0_Produit_De_Devis_Lignes_du_devis_8=new clJointureMulti("ligne",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,true)
	));
var Col_N1_Qté__De_Devis_Lignes_du_devis_8=new clAttribut("l_quantite","ligne",null);

var Col_N2_Montant_HT_De_Devis_Lignes_du_devis_8=new clAttribut("l_montantht","ligne",null);

var Col_N3_Montant_TTC_De_Devis_Lignes_du_devis_8=new clAttribut("l_montantttc","ligne",null);

var Devis_Produit_9=new clAttribut("px_libelle","prix",null);


	/* Ce composant représente: prix.px_libelle sous le nom "Produit" */
var Compo_Devis_Produit_9=new clCompoListeDeroulanteSimple(Devis_Produit_9,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_DevisLignePrix=new clInterfaceFiltragePermanantCustom("px_vendable=true")),"Produit");
var Joint_Esclave_Devis_Produit_9=new clJointureMulti("ligne",
	new Array(
	new stJointure("prix","px_numero","px_numero",null,false)
	));
var Devis_Quantité_10=new clAttribut("l_quantite","ligne",null);


	/* Ce composant représente: ligne.l_quantite sous le nom "Quantité" */
var Compo_Devis_Quantité_10=new clCompoTextBox(Devis_Quantité_10,null,"Quantité",false,false);
var Devis_Notes_11=new clAttribut("l_notes","ligne",null);


	/* Ce composant représente: ligne.l_notes sous le nom "Notes" */
var Compo_Devis_Notes_11=new clCompoTextBox(Devis_Notes_11,null,"Notes",false,true);
var Devis_Lignes_du_devis_8=new clEnsembleAttributs("ligne",
	new Array(
	new clLiaison(Joint_Col_N0_Produit_De_Devis_Lignes_du_devis_8,Col_N0_Produit_De_Devis_Lignes_du_devis_8)
	,new clLiaison(null,Col_N1_Qté__De_Devis_Lignes_du_devis_8)
	,new clLiaison(null,Col_N2_Montant_HT_De_Devis_Lignes_du_devis_8)
	,new clLiaison(null,Col_N3_Montant_TTC_De_Devis_Lignes_du_devis_8)
	),
	new Array(
	new clLiaison(Joint_Esclave_Devis_Produit_9,Devis_Produit_9)
	,new clLiaison(null,Devis_Quantité_10)
	,new clLiaison(null,Devis_Notes_11)
	));

var Titre_Devis_Lignes_du_devis_8=new Array("Produit","Qté.","Montant HT","Montant TTC");

	/* Ce composant représente: des éléments de la table ligne sous le nom "Lignes du devis" */
var Compo_Devis_Lignes_du_devis_8=new clCompoListe(Devis_Lignes_du_devis_8,null,Titre_Devis_Lignes_du_devis_8,"Lignes du devis",true,false);
var Joint_Esclave_Devis_Lignes_du_devis_8=new clJointureMulti("devis",
	new Array(
	new stJointure("ligne","de_numero","de_numero",null,false)
	));
var Devis_Liste_des_devis0=new clEnsembleAttributs("devis",
	new Array(
	new clLiaison(null,Col_N0_Devis_De_Devis_Liste_des_devis0)
	,new clLiaison(null,Col_N1_Date_De_Devis_Liste_des_devis0)
	,new clLiaison(null,Col_N2___R__De_Devis_Liste_des_devis0)
	,new clLiaison(null,Col_N3_Montant_TTC_De_Devis_Liste_des_devis0)
	),
	new Array(
	new clLiaison(null,Devis_Date_1)
	,new clLiaison(null,Devis_Libellé_2)
	,new clLiaison(Joint_Esclave_Devis_Suivi_par_3,Devis_Suivi_par_3)
	,new clLiaison(null,Devis_Acompte_à_payer_4)
	,new clLiaison(null,Devis_Devis_sous_forme_de_lettre_5)
	,new clLiaison(null,Devis_Civilités_6)
	,new clLiaison(null,Devis_Introduction_de_la_lettre_7)
	,new clLiaison(Joint_Esclave_Devis_Lignes_du_devis_8,Devis_Lignes_du_devis_8)
	));

var Titre_Devis_Liste_des_devis0=new Array("Devis","Date","% R.","Montant TTC");

	/* Ce composant représente: des éléments de la table devis sous le nom "Liste des devis" */
var Compo_Devis_Liste_des_devis0=new clCompoListe(Devis_Liste_des_devis0,new Array(new clInterfaceFiltrageVide()),Titre_Devis_Liste_des_devis0,"Liste des devis",true,false);

	/* Ce composant représente: devis.undefined sous le nom "Liste des devis" */
 if(ALeDroit(0,"devis"))
 {
Compo_Devis_Liste_des_devis0.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0"));

 }

	/* On l'ajoute au tableau global à l'indice 1360*/
top.TAB_GLOBAL_COMPO[1360]=Compo_Devis_Liste_des_devis0;

	/* Ce composant représente: des éléments de la table devis sous le nom "Date" */
 if(ALeDroit(0,"devis"))
 {
Compo_Devis_Date_1.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1365*/
top.TAB_GLOBAL_COMPO[1365]=Compo_Devis_Date_1;

	/* Ce composant représente: des éléments de la table devis sous le nom "Libellé" */
 if(ALeDroit(0,"devis"))
 {
Compo_Devis_Libellé_2.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1366*/
top.TAB_GLOBAL_COMPO[1366]=Compo_Devis_Libellé_2;

	/* Ce composant représente: des éléments de la table employe sous le nom "Suivi par" */
 if(ALeDroit(0,"employe"))
 {
Compo_Devis_Suivi_par_3.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1367*/
top.TAB_GLOBAL_COMPO[1367]=Compo_Devis_Suivi_par_3;

	/* Ce composant représente: des éléments de la table devis sous le nom "Acompte à payer" */
 if(ALeDroit(0,"devis"))
 {
Compo_Devis_Acompte_à_payer_4.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1368*/
top.TAB_GLOBAL_COMPO[1368]=Compo_Devis_Acompte_à_payer_4;

	/* Ce composant représente: des éléments de la table devis sous le nom "Devis sous forme de lettre" */
 if(ALeDroit(0,"devis"))
 {
Compo_Devis_Devis_sous_forme_de_lettre_5.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1369*/
top.TAB_GLOBAL_COMPO[1369]=Compo_Devis_Devis_sous_forme_de_lettre_5;

	/* Ce composant représente: des éléments de la table devis sous le nom "Civilités" */
 if(ALeDroit(0,"devis"))
 {
Compo_Devis_Civilités_6.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1370*/
top.TAB_GLOBAL_COMPO[1370]=Compo_Devis_Civilités_6;

	/* Ce composant représente: des éléments de la table devis sous le nom "Introduction de la lettre" */
 if(ALeDroit(0,"devis"))
 {
Compo_Devis_Introduction_de_la_lettre_7.GenererXUL(top.document.getElementById("Devis_Liste_des_devis0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1371*/
top.TAB_GLOBAL_COMPO[1371]=Compo_Devis_Introduction_de_la_lettre_7;

	/* Ce composant représente: ligne.undefined sous le nom "Lignes du devis" */
 if(ALeDroit(0,"ligne"))
 {
Compo_Devis_Lignes_du_devis_8.GenererXUL(top.document.getElementById("Devis_Lignes_du_devis_8"));

 }

	/* On l'ajoute au tableau global à l'indice 1372*/
top.TAB_GLOBAL_COMPO[1372]=Compo_Devis_Lignes_du_devis_8;

	/* Ce composant représente: des éléments de la table prix sous le nom "Produit" */
 if(ALeDroit(0,"prix"))
 {
Compo_Devis_Produit_9.GenererXUL(top.document.getElementById("Devis_Lignes_du_devis_8_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1377*/
top.TAB_GLOBAL_COMPO[1377]=Compo_Devis_Produit_9;

	/* Ce composant représente: des éléments de la table ligne sous le nom "Quantité" */
 if(ALeDroit(0,"ligne"))
 {
Compo_Devis_Quantité_10.GenererXUL(top.document.getElementById("Devis_Lignes_du_devis_8_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1378*/
top.TAB_GLOBAL_COMPO[1378]=Compo_Devis_Quantité_10;

	/* Ce composant représente: des éléments de la table ligne sous le nom "Notes" */
 if(ALeDroit(0,"ligne"))
 {
Compo_Devis_Notes_11.GenererXUL(top.document.getElementById("Devis_Lignes_du_devis_8_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1379*/
top.TAB_GLOBAL_COMPO[1379]=Compo_Devis_Notes_11;
var Col_N0_N__Fact__De_Facture_Liste_des_factures0=new clAttribut("fa_numfact","facture",null);

var Col_N1_Date_De_Facture_Liste_des_factures0=new clAttribut("fa_date","facture",null);

var Col_N2_Agent_De_Facture_Liste_des_factures0=new clAttribut("ag_initiales","agent",null);

var Joint_Col_N2_Agent_De_Facture_Liste_des_factures0=new clJointureMulti("facture",
	new Array(
	new stJointure("agent","ag_numero","ag_numero",null,true)
	));
var Col_N3_TTC_De_Facture_Liste_des_factures0=new clAttribut("fa_montantttc","facture",null);

var Col_N4_Etat_De_Facture_Liste_des_factures0=new clAttribut("fa_etat","facture",null);

var Facture_N__Facture_1=new clAttribut("fa_numfact","facture",null);


	/* Ce composant représente: facture.fa_numfact sous le nom "N° Facture" */
var Compo_Facture_N__Facture_1=new clCompolabel(Facture_N__Facture_1,null,"N° Facture",undefined,undefined);
var Facture_Date_2=new clAttribut("fa_date","facture",null);


	/* Ce composant représente: facture.fa_date sous le nom "Date" */
var Compo_Facture_Date_2=new clCompolabel(Facture_Date_2,null,"Date",undefined,undefined);
var Facture_Libellé_3=new clAttribut("fa_libelle","facture",null);


	/* Ce composant représente: facture.fa_libelle sous le nom "Libellé" */
var Compo_Facture_Libellé_3=new clCompolabel(Facture_Libellé_3,null,"Libellé",undefined,undefined);
var Facture_Réduction_4=new clAttribut("fa_reduction","facture",null);


	/* Ce composant représente: facture.fa_reduction sous le nom "Réduction" */
var Compo_Facture_Réduction_4=new clCompolabel(Facture_Réduction_4,null,"Réduction",undefined,undefined);
var Facture_Montant_HT_5=new clAttribut("fa_montantht","facture",null);


	/* Ce composant représente: facture.fa_montantht sous le nom "Montant HT" */
var Compo_Facture_Montant_HT_5=new clCompolabel(Facture_Montant_HT_5,null,"Montant HT",undefined,undefined);
var Facture_Montant_TTC_6=new clAttribut("fa_montantttc","facture",null);


	/* Ce composant représente: facture.fa_montantttc sous le nom "Montant TTC" */
var Compo_Facture_Montant_TTC_6=new clCompolabel(Facture_Montant_TTC_6,null,"Montant TTC",undefined,undefined);
var Facture_N_Devis_d_origine_7=new clAttribut("de_numero","facture",null);


	/* Ce composant représente: facture.de_numero sous le nom "N°Devis d'origine" */
var Compo_Facture_N_Devis_d_origine_7=new clCompolabel(Facture_N_Devis_d_origine_7,null,"N°Devis d'origine",undefined,undefined);
var Facture_Annotation_8=new clAttribut("fa_annotation","facture",null);


	/* Ce composant représente: facture.fa_annotation sous le nom "Annotation" */
var Compo_Facture_Annotation_8=new clCompoTextBox(Facture_Annotation_8,null,"Annotation",false,false);
var Col_N0_Produit_De_Facture_Lignes_de_la_facture_9=new clAttribut("pd_libelle","produit",null);

var Joint_Col_N0_Produit_De_Facture_Lignes_de_la_facture_9=new clJointureMulti("lignefacture",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,true)
	));
var Col_N1_Qté__De_Facture_Lignes_de_la_facture_9=new clAttribut("lf_quantite","lignefacture",null);

var Col_N2_Montant_HT_De_Facture_Lignes_de_la_facture_9=new clAttribut("lf_montantht","lignefacture",null);

var Col_N3_Montant_TTC_De_Facture_Lignes_de_la_facture_9=new clAttribut("lf_montantttc","lignefacture",null);

var Facture_Lignes_de_la_facture_9=new clEnsembleAttributs("lignefacture",
	new Array(
	new clLiaison(Joint_Col_N0_Produit_De_Facture_Lignes_de_la_facture_9,Col_N0_Produit_De_Facture_Lignes_de_la_facture_9)
	,new clLiaison(null,Col_N1_Qté__De_Facture_Lignes_de_la_facture_9)
	,new clLiaison(null,Col_N2_Montant_HT_De_Facture_Lignes_de_la_facture_9)
	,new clLiaison(null,Col_N3_Montant_TTC_De_Facture_Lignes_de_la_facture_9)
	),
	null);

var Titre_Facture_Lignes_de_la_facture_9=new Array("Produit","Qté.","Montant HT","Montant TTC");

	/* Ce composant représente: des éléments de la table lignefacture sous le nom "Lignes de la facture" */
var Compo_Facture_Lignes_de_la_facture_9=new clCompoListe(Facture_Lignes_de_la_facture_9,null,Titre_Facture_Lignes_de_la_facture_9,"Lignes de la facture",true,false);
var Joint_Esclave_Facture_Lignes_de_la_facture_9=new clJointureMulti("facture",
	new Array(
	new stJointure("lignefacture","fa_numero","fa_numero",null,false)
	));
var Col_N0_Date_De_Facture_Avoirs_de_la_facture_10=new clAttribut("av_date","avoir",null);

var Col_N1_Montant_De_Facture_Avoirs_de_la_facture_10=new clAttribut("av_montantttc","avoir",null);

var Facture_Avoirs_de_la_facture_10=new clEnsembleAttributs("avoir",
	new Array(
	new clLiaison(null,Col_N0_Date_De_Facture_Avoirs_de_la_facture_10)
	,new clLiaison(null,Col_N1_Montant_De_Facture_Avoirs_de_la_facture_10)
	),
	null);

var Titre_Facture_Avoirs_de_la_facture_10=new Array("Date","Montant");

	/* Ce composant représente: des éléments de la table avoir sous le nom "Avoirs de la facture" */
var Compo_Facture_Avoirs_de_la_facture_10=new clCompoListe(Facture_Avoirs_de_la_facture_10,new Array(clCompoListe.prototype.FiltreParDefaut(),Filtre_Dep_Avoir_0=new clInterfaceFiltrageRelationOnglet("Avoir",Gerer_Avoir,OuvrirOnglet_Facture)),Titre_Facture_Avoirs_de_la_facture_10,"Avoirs de la facture",true,false);
var Joint_Esclave_Facture_Avoirs_de_la_facture_10=new clJointureMulti("facture",
	new Array(
	new stJointure("avoir","fa_numero","fa_numero",null,false)
	));
var Col_N0_N__De_Facture_Règlements_11=new clAttribut("rg_numero","facturereglement",null);

var Col_N1_Date_De_Facture_Règlements_11=new clAttribut("rg_date","reglement",null);

var Joint_Col_N1_Date_De_Facture_Règlements_11=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("reglement","rg_numero","rg_numero",null,true)
	));
var Col_N2_Montant_De_Facture_Règlements_11=new clAttribut("rg_montant","reglement",null);

var Joint_Col_N2_Montant_De_Facture_Règlements_11=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("reglement","rg_numero","rg_numero",null,true)
	));
var Col_N3_Mode_De_Facture_Règlements_11=new clAttribut("rg_mode","reglement",null);

var Joint_Col_N3_Mode_De_Facture_Règlements_11=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("reglement","rg_numero","rg_numero",null,true)
	));
var Col_N4_Etat_De_Facture_Règlements_11=new clAttribut("rg_etat","reglement",null);

var Joint_Col_N4_Etat_De_Facture_Règlements_11=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("reglement","rg_numero","rg_numero",null,true)
	));
var Facture_Règlement_12=new clAttribut("rg_libelle","reglement",null);


	/* Ce composant représente: reglement.rg_libelle sous le nom "Règlement" */
var Compo_Facture_Règlement_12=new clCompoListeDeroulanteSimple(Facture_Règlement_12,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Dep_Réglement_0=new clInterfaceFiltrageRelationOnglet("Réglement",Gerer_Réglement,OuvrirOnglet_Facture)),"Règlement");
var Joint_Esclave_Facture_Règlement_12=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("reglement","rg_numero","rg_numero",null,false)
	));
var Facture_Ce_règlement_est_un_acompte_13=new clAttribut("fr_acompte","facturereglement",null);


	/* Ce composant représente: facturereglement.fr_acompte sous le nom "Ce règlement est un acompte" */
var Compo_Facture_Ce_règlement_est_un_acompte_13=new clCompoCheckBox(Facture_Ce_règlement_est_un_acompte_13,null,"Ce règlement est un acompte");
var Facture_Une_part_du_montant_du_règlement_est_utilisé_14=new clAttribut("fr_partiel","facturereglement",null);


	/* Ce composant représente: facturereglement.fr_partiel sous le nom "Une part du montant du règlement est utilisé" */
var Compo_Facture_Une_part_du_montant_du_règlement_est_utilisé_14=new clCompoCheckBox(Facture_Une_part_du_montant_du_règlement_est_utilisé_14,null,"Une part du montant du règlement est utilisé");
var Facture_Montant_de_la_part_15=new clAttribut("fr_montant","facturereglement",null);


	/* Ce composant représente: facturereglement.fr_montant sous le nom "Montant de la part" */
var Compo_Facture_Montant_de_la_part_15=new clCompoTextBox(Facture_Montant_de_la_part_15,null,"Montant de la part",false,false);
var Facture_Règlements_11=new clEnsembleAttributs("facturereglement",
	new Array(
	new clLiaison(null,Col_N0_N__De_Facture_Règlements_11)
	,new clLiaison(Joint_Col_N1_Date_De_Facture_Règlements_11,Col_N1_Date_De_Facture_Règlements_11)
	,new clLiaison(Joint_Col_N2_Montant_De_Facture_Règlements_11,Col_N2_Montant_De_Facture_Règlements_11)
	,new clLiaison(Joint_Col_N3_Mode_De_Facture_Règlements_11,Col_N3_Mode_De_Facture_Règlements_11)
	,new clLiaison(Joint_Col_N4_Etat_De_Facture_Règlements_11,Col_N4_Etat_De_Facture_Règlements_11)
	),
	new Array(
	new clLiaison(Joint_Esclave_Facture_Règlement_12,Facture_Règlement_12)
	,new clLiaison(null,Facture_Ce_règlement_est_un_acompte_13)
	,new clLiaison(null,Facture_Une_part_du_montant_du_règlement_est_utilisé_14)
	,new clLiaison(null,Facture_Montant_de_la_part_15)
	));

var Titre_Facture_Règlements_11=new Array("N°","Date","Montant","Mode","Etat");

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "Règlements" */
var Compo_Facture_Règlements_11=new clCompoListe(Facture_Règlements_11,null,Titre_Facture_Règlements_11,"Règlements",true,false);
var Joint_Esclave_Facture_Règlements_11=new clJointureMulti("facture",
	new Array(
	new stJointure("facturereglement","fa_numero","fa_numero",null,false)
	));
var Col_N0_Début_De_Facture_Routages_16=new clAttribut("ro_debutservice","routage",null);

var Col_N1_Fin_De_Facture_Routages_16=new clAttribut("ro_finservice","routage",null);

var Col_N2_Qté__De_Facture_Routages_16=new clAttribut("ro_quantite","routage",null);

var Col_N3_Personne_De_Facture_Routages_16=new clAttribut("pe_libelle","personne",null);

var Joint_Col_N3_Personne_De_Facture_Routages_16=new clJointureMulti("routage",
	new Array(
	new stJointure("personne","pe_numero","pe_numero",null,true)
	));
var Facture_Adresse_17=new clAttribut("ad_libelle","vue_adresse",null);


	/* Ce composant représente: vue_adresse.ad_libelle sous le nom "Adresse" */
var Compo_Facture_Adresse_17=new clCompoListeDeroulanteSimple(Facture_Adresse_17,null,"Adresse");
var Joint_Esclave_Facture_Adresse_17=new clJointureMulti("routage",
	new Array(
	new stJointure("vue_adresse","ad_numero","ad_numero",null,false)
	));
var Facture_Début_18=new clAttribut("ro_debutservice","routage",null);


	/* Ce composant représente: routage.ro_debutservice sous le nom "Début" */
var Compo_Facture_Début_18=new clCompoTextBox(Facture_Début_18,null,"Début",false,false);
var Facture_Fin_19=new clAttribut("ro_finservice","routage",null);


	/* Ce composant représente: routage.ro_finservice sous le nom "Fin" */
var Compo_Facture_Fin_19=new clCompoTextBox(Facture_Fin_19,null,"Fin",false,false);
var Facture_Quantité_20=new clAttribut("ro_quantite","routage",null);


	/* Ce composant représente: routage.ro_quantite sous le nom "Quantité" */
var Compo_Facture_Quantité_20=new clCompoTextBox(Facture_Quantité_20,null,"Quantité",false,false);
var Facture_Routages_16=new clEnsembleAttributs("routage",
	new Array(
	new clLiaison(null,Col_N0_Début_De_Facture_Routages_16)
	,new clLiaison(null,Col_N1_Fin_De_Facture_Routages_16)
	,new clLiaison(null,Col_N2_Qté__De_Facture_Routages_16)
	,new clLiaison(Joint_Col_N3_Personne_De_Facture_Routages_16,Col_N3_Personne_De_Facture_Routages_16)
	),
	new Array(
	new clLiaison(Joint_Esclave_Facture_Adresse_17,Facture_Adresse_17)
	,new clLiaison(null,Facture_Début_18)
	,new clLiaison(null,Facture_Fin_19)
	,new clLiaison(null,Facture_Quantité_20)
	));

var Titre_Facture_Routages_16=new Array("Début","Fin","Qté.","Personne");

	/* Ce composant représente: des éléments de la table routage sous le nom "Routages" */
var Compo_Facture_Routages_16=new clCompoListe(Facture_Routages_16,null,Titre_Facture_Routages_16,"Routages",true,false);
var Joint_Esclave_Facture_Routages_16=new clJointureMulti("facture",
	new Array(
	new stJointure("routage","fa_numero","fa_numero",null,false)
	));
var Facture_Liste_des_factures0=new clEnsembleAttributs("facture",
	new Array(
	new clLiaison(null,Col_N0_N__Fact__De_Facture_Liste_des_factures0)
	,new clLiaison(null,Col_N1_Date_De_Facture_Liste_des_factures0)
	,new clLiaison(Joint_Col_N2_Agent_De_Facture_Liste_des_factures0,Col_N2_Agent_De_Facture_Liste_des_factures0)
	,new clLiaison(null,Col_N3_TTC_De_Facture_Liste_des_factures0)
	,new clLiaison(null,Col_N4_Etat_De_Facture_Liste_des_factures0)
	),
	new Array(
	new clLiaison(null,Facture_N__Facture_1)
	,new clLiaison(null,Facture_Date_2)
	,new clLiaison(null,Facture_Libellé_3)
	,new clLiaison(null,Facture_Réduction_4)
	,new clLiaison(null,Facture_Montant_HT_5)
	,new clLiaison(null,Facture_Montant_TTC_6)
	,new clLiaison(null,Facture_N_Devis_d_origine_7)
	,new clLiaison(null,Facture_Annotation_8)
	,new clLiaison(Joint_Esclave_Facture_Lignes_de_la_facture_9,Facture_Lignes_de_la_facture_9)
	,new clLiaison(Joint_Esclave_Facture_Avoirs_de_la_facture_10,Facture_Avoirs_de_la_facture_10)
	,new clLiaison(Joint_Esclave_Facture_Règlements_11,Facture_Règlements_11)
	,new clLiaison(Joint_Esclave_Facture_Routages_16,Facture_Routages_16)
	));

var Titre_Facture_Liste_des_factures0=new Array("N° Fact.","Date","Agent","TTC","Etat");

	/* Ce composant représente: des éléments de la table facture sous le nom "Liste des factures" */
var Compo_Facture_Liste_des_factures0=new clCompoListe(Facture_Liste_des_factures0,new Array(new clInterfaceFiltrageVide()),Titre_Facture_Liste_des_factures0,"Liste des factures",true,false);

	/* Ce composant représente: facture.undefined sous le nom "Liste des factures" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_Liste_des_factures0.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0"));

 }

	/* On l'ajoute au tableau global à l'indice 1380*/
top.TAB_GLOBAL_COMPO[1380]=Compo_Facture_Liste_des_factures0;

	/* Ce composant représente: des éléments de la table facture sous le nom "N° Facture" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_N__Facture_1.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1386*/
top.TAB_GLOBAL_COMPO[1386]=Compo_Facture_N__Facture_1;

	/* Ce composant représente: des éléments de la table facture sous le nom "Date" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_Date_2.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1387*/
top.TAB_GLOBAL_COMPO[1387]=Compo_Facture_Date_2;

	/* Ce composant représente: des éléments de la table facture sous le nom "Libellé" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_Libellé_3.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1388*/
top.TAB_GLOBAL_COMPO[1388]=Compo_Facture_Libellé_3;

	/* Ce composant représente: des éléments de la table facture sous le nom "Réduction" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_Réduction_4.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1389*/
top.TAB_GLOBAL_COMPO[1389]=Compo_Facture_Réduction_4;

	/* Ce composant représente: des éléments de la table facture sous le nom "Montant HT" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_Montant_HT_5.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1390*/
top.TAB_GLOBAL_COMPO[1390]=Compo_Facture_Montant_HT_5;

	/* Ce composant représente: des éléments de la table facture sous le nom "Montant TTC" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_Montant_TTC_6.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1391*/
top.TAB_GLOBAL_COMPO[1391]=Compo_Facture_Montant_TTC_6;

	/* Ce composant représente: des éléments de la table facture sous le nom "N°Devis d'origine" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_N_Devis_d_origine_7.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1392*/
top.TAB_GLOBAL_COMPO[1392]=Compo_Facture_N_Devis_d_origine_7;

	/* Ce composant représente: des éléments de la table facture sous le nom "Annotation" */
 if(ALeDroit(0,"facture"))
 {
Compo_Facture_Annotation_8.GenererXUL(top.document.getElementById("Facture_Liste_des_factures0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1393*/
top.TAB_GLOBAL_COMPO[1393]=Compo_Facture_Annotation_8;

	/* Ce composant représente: lignefacture.undefined sous le nom "Lignes de la facture" */
 if(ALeDroit(0,"lignefacture"))
 {
Compo_Facture_Lignes_de_la_facture_9.GenererXUL(top.document.getElementById("Facture_Lignes_de_la_facture_9"));

 }

	/* On l'ajoute au tableau global à l'indice 1394*/
top.TAB_GLOBAL_COMPO[1394]=Compo_Facture_Lignes_de_la_facture_9;

	/* Ce composant représente: avoir.undefined sous le nom "Avoirs de la facture" */
 if(ALeDroit(0,"avoir"))
 {
Compo_Facture_Avoirs_de_la_facture_10.GenererXUL(top.document.getElementById("Facture_Avoirs_de_la_facture_10"));

 }

	/* On l'ajoute au tableau global à l'indice 1399*/
top.TAB_GLOBAL_COMPO[1399]=Compo_Facture_Avoirs_de_la_facture_10;

	/* Ce composant représente: facturereglement.undefined sous le nom "Règlements" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Facture_Règlements_11.GenererXUL(top.document.getElementById("Facture_Règlements_11"));

 }

	/* On l'ajoute au tableau global à l'indice 1402*/
top.TAB_GLOBAL_COMPO[1402]=Compo_Facture_Règlements_11;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Règlement" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Facture_Règlement_12.GenererXUL(top.document.getElementById("Facture_Règlements_11_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1408*/
top.TAB_GLOBAL_COMPO[1408]=Compo_Facture_Règlement_12;

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "Ce règlement est un acompte" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Facture_Ce_règlement_est_un_acompte_13.GenererXUL(top.document.getElementById("Facture_Règlements_11_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1409*/
top.TAB_GLOBAL_COMPO[1409]=Compo_Facture_Ce_règlement_est_un_acompte_13;

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "Une part du montant du règlement est utilisé" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Facture_Une_part_du_montant_du_règlement_est_utilisé_14.GenererXUL(top.document.getElementById("Facture_Règlements_11_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1410*/
top.TAB_GLOBAL_COMPO[1410]=Compo_Facture_Une_part_du_montant_du_règlement_est_utilisé_14;

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "Montant de la part" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Facture_Montant_de_la_part_15.GenererXUL(top.document.getElementById("Facture_Règlements_11_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1411*/
top.TAB_GLOBAL_COMPO[1411]=Compo_Facture_Montant_de_la_part_15;

	/* Ce composant représente: routage.undefined sous le nom "Routages" */
 if(ALeDroit(0,"routage"))
 {
Compo_Facture_Routages_16.GenererXUL(top.document.getElementById("Facture_Routages_16"));

 }

	/* On l'ajoute au tableau global à l'indice 1412*/
top.TAB_GLOBAL_COMPO[1412]=Compo_Facture_Routages_16;

	/* Ce composant représente: des éléments de la table vue_adresse sous le nom "Adresse" */
 if(ALeDroit(0,"vue_adresse"))
 {
Compo_Facture_Adresse_17.GenererXUL(top.document.getElementById("Facture_Routages_16_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1417*/
top.TAB_GLOBAL_COMPO[1417]=Compo_Facture_Adresse_17;

	/* Ce composant représente: des éléments de la table routage sous le nom "Début" */
 if(ALeDroit(0,"routage"))
 {
Compo_Facture_Début_18.GenererXUL(top.document.getElementById("Facture_Routages_16_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1418*/
top.TAB_GLOBAL_COMPO[1418]=Compo_Facture_Début_18;

	/* Ce composant représente: des éléments de la table routage sous le nom "Fin" */
 if(ALeDroit(0,"routage"))
 {
Compo_Facture_Fin_19.GenererXUL(top.document.getElementById("Facture_Routages_16_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1419*/
top.TAB_GLOBAL_COMPO[1419]=Compo_Facture_Fin_19;

	/* Ce composant représente: des éléments de la table routage sous le nom "Quantité" */
 if(ALeDroit(0,"routage"))
 {
Compo_Facture_Quantité_20.GenererXUL(top.document.getElementById("Facture_Routages_16_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1420*/
top.TAB_GLOBAL_COMPO[1420]=Compo_Facture_Quantité_20;
var Col_N0_N__Facture_De_Avoir_Liste_des_avoirs0=new clAttribut("av_numfact","avoir",null);

var Col_N1_Date_De_Avoir_Liste_des_avoirs0=new clAttribut("av_date","avoir",null);

var Col_N2_Montant_TTC_De_Avoir_Liste_des_avoirs0=new clAttribut("av_montantttc","avoir",null);

var Avoir_N__Facture_1=new clAttribut("av_numfact","avoir",null);


	/* Ce composant représente: avoir.av_numfact sous le nom "N° Facture" */
var Compo_Avoir_N__Facture_1=new clCompolabel(Avoir_N__Facture_1,null,"N° Facture",undefined,undefined);
var Avoir_Date_2=new clAttribut("av_date","avoir",null);


	/* Ce composant représente: avoir.av_date sous le nom "Date" */
var Compo_Avoir_Date_2=new clCompoTextBox(Avoir_Date_2,null,"Date",false,false);
var Avoir_Montant_TTC_3=new clAttribut("av_montantttc","avoir",null);


	/* Ce composant représente: avoir.av_montantttc sous le nom "Montant TTC" */
var Compo_Avoir_Montant_TTC_3=new clCompolabel(Avoir_Montant_TTC_3,null,"Montant TTC",undefined,undefined);
var Avoir_Montant_HT_4=new clAttribut("av_montantht","avoir",null);


	/* Ce composant représente: avoir.av_montantht sous le nom "Montant HT" */
var Compo_Avoir_Montant_HT_4=new clCompolabel(Avoir_Montant_HT_4,null,"Montant HT",undefined,undefined);
var Col_N0_Produit_De_Avoir_Lignes_de_l_avoir_5=new clAttribut("pd_libelle","produit",null);

var Joint_Col_N0_Produit_De_Avoir_Lignes_de_l_avoir_5=new clJointureMulti("ligneavoir",
	new Array(
	new stJointure("produit","pd_numero","pd_numero",null,true)
	));
var Col_N1_Qté__De_Avoir_Lignes_de_l_avoir_5=new clAttribut("la_quantite","ligneavoir",null);

var Col_N2_Montant_HT_De_Avoir_Lignes_de_l_avoir_5=new clAttribut("la_montantht","ligneavoir",null);

var Col_N3_Montant_TTC_De_Avoir_Lignes_de_l_avoir_5=new clAttribut("la_montantttc","ligneavoir",null);

var Avoir_Lignes_de_l_avoir_5=new clEnsembleAttributs("ligneavoir",
	new Array(
	new clLiaison(Joint_Col_N0_Produit_De_Avoir_Lignes_de_l_avoir_5,Col_N0_Produit_De_Avoir_Lignes_de_l_avoir_5)
	,new clLiaison(null,Col_N1_Qté__De_Avoir_Lignes_de_l_avoir_5)
	,new clLiaison(null,Col_N2_Montant_HT_De_Avoir_Lignes_de_l_avoir_5)
	,new clLiaison(null,Col_N3_Montant_TTC_De_Avoir_Lignes_de_l_avoir_5)
	),
	null);

var Titre_Avoir_Lignes_de_l_avoir_5=new Array("Produit","Qté.","Montant HT","Montant TTC");

	/* Ce composant représente: des éléments de la table ligneavoir sous le nom "Lignes de l'avoir" */
var Compo_Avoir_Lignes_de_l_avoir_5=new clCompoListe(Avoir_Lignes_de_l_avoir_5,null,Titre_Avoir_Lignes_de_l_avoir_5,"Lignes de l'avoir",true,false);
var Joint_Esclave_Avoir_Lignes_de_l_avoir_5=new clJointureMulti("avoir",
	new Array(
	new stJointure("ligneavoir","av_numero","av_numero",null,false)
	));
var Avoir_Liste_des_avoirs0=new clEnsembleAttributs("avoir",
	new Array(
	new clLiaison(null,Col_N0_N__Facture_De_Avoir_Liste_des_avoirs0)
	,new clLiaison(null,Col_N1_Date_De_Avoir_Liste_des_avoirs0)
	,new clLiaison(null,Col_N2_Montant_TTC_De_Avoir_Liste_des_avoirs0)
	),
	new Array(
	new clLiaison(null,Avoir_N__Facture_1)
	,new clLiaison(null,Avoir_Date_2)
	,new clLiaison(null,Avoir_Montant_TTC_3)
	,new clLiaison(null,Avoir_Montant_HT_4)
	,new clLiaison(Joint_Esclave_Avoir_Lignes_de_l_avoir_5,Avoir_Lignes_de_l_avoir_5)
	));

var Titre_Avoir_Liste_des_avoirs0=new Array("N° Facture","Date","Montant TTC");

	/* Ce composant représente: des éléments de la table avoir sous le nom "Liste des avoirs" */
var Compo_Avoir_Liste_des_avoirs0=new clCompoListe(Avoir_Liste_des_avoirs0,new Array(new clInterfaceFiltrageVide()),Titre_Avoir_Liste_des_avoirs0,"Liste des avoirs",true,false);

	/* Ce composant représente: avoir.undefined sous le nom "Liste des avoirs" */
 if(ALeDroit(0,"avoir"))
 {
Compo_Avoir_Liste_des_avoirs0.GenererXUL(top.document.getElementById("Avoir_Liste_des_avoirs0"));

 }

	/* On l'ajoute au tableau global à l'indice 1421*/
top.TAB_GLOBAL_COMPO[1421]=Compo_Avoir_Liste_des_avoirs0;

	/* Ce composant représente: des éléments de la table avoir sous le nom "N° Facture" */
 if(ALeDroit(0,"avoir"))
 {
Compo_Avoir_N__Facture_1.GenererXUL(top.document.getElementById("Avoir_Liste_des_avoirs0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1425*/
top.TAB_GLOBAL_COMPO[1425]=Compo_Avoir_N__Facture_1;

	/* Ce composant représente: des éléments de la table avoir sous le nom "Date" */
 if(ALeDroit(0,"avoir"))
 {
Compo_Avoir_Date_2.GenererXUL(top.document.getElementById("Avoir_Liste_des_avoirs0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1426*/
top.TAB_GLOBAL_COMPO[1426]=Compo_Avoir_Date_2;

	/* Ce composant représente: des éléments de la table avoir sous le nom "Montant TTC" */
 if(ALeDroit(0,"avoir"))
 {
Compo_Avoir_Montant_TTC_3.GenererXUL(top.document.getElementById("Avoir_Liste_des_avoirs0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1427*/
top.TAB_GLOBAL_COMPO[1427]=Compo_Avoir_Montant_TTC_3;

	/* Ce composant représente: des éléments de la table avoir sous le nom "Montant HT" */
 if(ALeDroit(0,"avoir"))
 {
Compo_Avoir_Montant_HT_4.GenererXUL(top.document.getElementById("Avoir_Liste_des_avoirs0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1428*/
top.TAB_GLOBAL_COMPO[1428]=Compo_Avoir_Montant_HT_4;

	/* Ce composant représente: ligneavoir.undefined sous le nom "Lignes de l'avoir" */
 if(ALeDroit(0,"ligneavoir"))
 {
Compo_Avoir_Lignes_de_l_avoir_5.GenererXUL(top.document.getElementById("Avoir_Lignes_de_l_avoir_5"));

 }

	/* On l'ajoute au tableau global à l'indice 1429*/
top.TAB_GLOBAL_COMPO[1429]=Compo_Avoir_Lignes_de_l_avoir_5;
var Col_N0_N_______De_Réglement_Liste_des_réglements0=new clAttribut("rg_numero","reglement",null);

var Col_N1_Date____De_Réglement_Liste_des_réglements0=new clAttribut("rg_date","reglement",null);

var Col_N2_Montant_De_Réglement_Liste_des_réglements0=new clAttribut("rg_montant","reglement",null);

var Réglement_Date_1=new clAttribut("rg_date","reglement",null);


	/* Ce composant représente: reglement.rg_date sous le nom "Date" */
var Compo_Réglement_Date_1=new clCompoTextBox(Réglement_Date_1,null,"Date",false,false);
var Réglement_Montant_2=new clAttribut("rg_montant","reglement",null);


	/* Ce composant représente: reglement.rg_montant sous le nom "Montant" */
var Compo_Réglement_Montant_2=new clCompoTextBox(Réglement_Montant_2,null,"Montant",false,false);
var Réglement_Mode_3=new clAttribut("mr_libelle","modereglement",null);


	/* Ce composant représente: modereglement.mr_libelle sous le nom "Mode" */
var Compo_Réglement_Mode_3=new clCompoListeDeroulanteSimple(Réglement_Mode_3,null,"Mode");
var Joint_Esclave_Réglement_Mode_3=new clJointureMulti("reglement",
	new Array(
	new stJointure("modereglement","mr_numero","mr_numero",null,false)
	));
var Réglement_Banque_4=new clAttribut("rg_libellebanque","reglement",null);


	/* Ce composant représente: reglement.rg_libellebanque sous le nom "Banque" */
var Compo_Réglement_Banque_4=new clCompoTextBox(Réglement_Banque_4,null,"Banque",false,false);
var Réglement_N__compte_5=new clAttribut("rg_numerocompte","reglement",null);


	/* Ce composant représente: reglement.rg_numerocompte sous le nom "N° compte" */
var Compo_Réglement_N__compte_5=new clCompoTextBox(Réglement_N__compte_5,null,"N° compte",false,false);
var Réglement_Référence_6=new clAttribut("rg_reference","reglement",null);


	/* Ce composant représente: reglement.rg_reference sous le nom "Référence" */
var Compo_Réglement_Référence_6=new clCompoTextBox(Réglement_Référence_6,null,"Référence",false,false);
var Réglement_Responsable_7=new clAttribut("em_libelle","vue_employe_reglement",null);


	/* Ce composant représente: vue_employe_reglement.em_libelle sous le nom "Responsable" */
var Compo_Réglement_Responsable_7=new clCompoListeDeroulanteSimple(Réglement_Responsable_7,null,"Responsable");
var Joint_Esclave_Réglement_Responsable_7=new clJointureMulti("reglement",
	new Array(
	new stJointure("vue_employe_reglement","em_numero","em_numero",null,false)
	));
var Col_N0_N__Fact__De_Réglement_Factures_concernées_8=new clAttribut("fa_numfact","facture",null);

var Joint_Col_N0_N__Fact__De_Réglement_Factures_concernées_8=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("facture","fa_numero","fa_numero",null,true)
	));
var Col_N1_Date_De_Réglement_Factures_concernées_8=new clAttribut("fa_date","facture",null);

var Joint_Col_N1_Date_De_Réglement_Factures_concernées_8=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("facture","fa_numero","fa_numero",null,true)
	));
var Col_N2_F_Mnt__De_Réglement_Factures_concernées_8=new clAttribut("fa_montantttc","facture",null);

var Joint_Col_N2_F_Mnt__De_Réglement_Factures_concernées_8=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("facture","fa_numero","fa_numero",null,true)
	));
var Col_N3_Mnt__De_Réglement_Factures_concernées_8=new clAttribut("fr_montant","facturereglement",null);

var Réglement_Facture_9=new clAttribut("fa_numfact","facture",null);


	/* Ce composant représente: facture.fa_numfact sous le nom "Facture" */
var Compo_Réglement_Facture_9=new clCompoListeDeroulanteSimple(Réglement_Facture_9,null,"Facture");
var Joint_Esclave_Réglement_Facture_9=new clJointureMulti("facturereglement",
	new Array(
	new stJointure("facture","fa_numero","fa_numero",null,false)
	));
var Réglement_Acompte_10=new clAttribut("fr_acompte","facturereglement",null);


	/* Ce composant représente: facturereglement.fr_acompte sous le nom "Acompte" */
var Compo_Réglement_Acompte_10=new clCompoCheckBox(Réglement_Acompte_10,null,"Acompte");
var Réglement_La_facture_reçoit_seulement_une_part_du_réglement_11=new clAttribut("fr_partiel","facturereglement",null);


	/* Ce composant représente: facturereglement.fr_partiel sous le nom "La facture reçoit seulement une part du réglement" */
var Compo_Réglement_La_facture_reçoit_seulement_une_part_du_réglement_11=new clCompoCheckBox(Réglement_La_facture_reçoit_seulement_une_part_du_réglement_11,null,"La facture reçoit seulement une part du réglement");
var Réglement_Montant_de_la_part_12=new clAttribut("fr_montant","facturereglement",null);


	/* Ce composant représente: facturereglement.fr_montant sous le nom "Montant de la part" */
var Compo_Réglement_Montant_de_la_part_12=new clCompoTextBox(Réglement_Montant_de_la_part_12,null,"Montant de la part",false,false);
var Réglement_Factures_concernées_8=new clEnsembleAttributs("facturereglement",
	new Array(
	new clLiaison(Joint_Col_N0_N__Fact__De_Réglement_Factures_concernées_8,Col_N0_N__Fact__De_Réglement_Factures_concernées_8)
	,new clLiaison(Joint_Col_N1_Date_De_Réglement_Factures_concernées_8,Col_N1_Date_De_Réglement_Factures_concernées_8)
	,new clLiaison(Joint_Col_N2_F_Mnt__De_Réglement_Factures_concernées_8,Col_N2_F_Mnt__De_Réglement_Factures_concernées_8)
	,new clLiaison(null,Col_N3_Mnt__De_Réglement_Factures_concernées_8)
	),
	new Array(
	new clLiaison(Joint_Esclave_Réglement_Facture_9,Réglement_Facture_9)
	,new clLiaison(null,Réglement_Acompte_10)
	,new clLiaison(null,Réglement_La_facture_reçoit_seulement_une_part_du_réglement_11)
	,new clLiaison(null,Réglement_Montant_de_la_part_12)
	));

var Titre_Réglement_Factures_concernées_8=new Array("N° Fact.","Date","F.Mnt.","Mnt.");

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "Factures concernées" */
var Compo_Réglement_Factures_concernées_8=new clCompoListe(Réglement_Factures_concernées_8,null,Titre_Réglement_Factures_concernées_8,"Factures concernées",true,false);
var Joint_Esclave_Réglement_Factures_concernées_8=new clJointureMulti("reglement",
	new Array(
	new stJointure("facturereglement","rg_numero","rg_numero",null,false)
	));
var Col_N0_Montant_De_Réglement_Dont_reversements____13=new clAttribut("rp_montant","repartition",null);

var Col_N1_Vers_De_Réglement_Dont_reversements____13=new clAttribut("mp_libelle","moderepartition",null);

var Joint_Col_N1_Vers_De_Réglement_Dont_reversements____13=new clJointureMulti("repartition",
	new Array(
	new stJointure("moderepartition","mp_numero","mp_numero",null,true)
	));
var Réglement_Montant_14=new clAttribut("rp_montant","repartition",null);


	/* Ce composant représente: repartition.rp_montant sous le nom "Montant" */
var Compo_Réglement_Montant_14=new clCompoTextBox(Réglement_Montant_14,null,"Montant",false,false);
var Réglement_Vers_15=new clAttribut("mp_libelle","moderepartition",null);


	/* Ce composant représente: moderepartition.mp_libelle sous le nom "Vers" */
var Compo_Réglement_Vers_15=new clCompoListeDeroulanteSimple(Réglement_Vers_15,null,"Vers");
var Joint_Esclave_Réglement_Vers_15=new clJointureMulti("repartition",
	new Array(
	new stJointure("moderepartition","mp_numero","mp_numero",null,false)
	));
var Réglement_Dont_reversements____13=new clEnsembleAttributs("repartition",
	new Array(
	new clLiaison(null,Col_N0_Montant_De_Réglement_Dont_reversements____13)
	,new clLiaison(Joint_Col_N1_Vers_De_Réglement_Dont_reversements____13,Col_N1_Vers_De_Réglement_Dont_reversements____13)
	),
	new Array(
	new clLiaison(null,Réglement_Montant_14)
	,new clLiaison(Joint_Esclave_Réglement_Vers_15,Réglement_Vers_15)
	));

var Titre_Réglement_Dont_reversements____13=new Array("Montant","Vers");

	/* Ce composant représente: des éléments de la table repartition sous le nom "Dont reversements..." */
var Compo_Réglement_Dont_reversements____13=new clCompoListe(Réglement_Dont_reversements____13,null,Titre_Réglement_Dont_reversements____13,"Dont reversements...",true,false);
var Joint_Esclave_Réglement_Dont_reversements____13=new clJointureMulti("reglement",
	new Array(
	new stJointure("repartition","rg_numero","rg_numero",null,false)
	));
var Réglement_Liste_des_réglements0=new clEnsembleAttributs("reglement",
	new Array(
	new clLiaison(null,Col_N0_N_______De_Réglement_Liste_des_réglements0)
	,new clLiaison(null,Col_N1_Date____De_Réglement_Liste_des_réglements0)
	,new clLiaison(null,Col_N2_Montant_De_Réglement_Liste_des_réglements0)
	),
	new Array(
	new clLiaison(null,Réglement_Date_1)
	,new clLiaison(null,Réglement_Montant_2)
	,new clLiaison(Joint_Esclave_Réglement_Mode_3,Réglement_Mode_3)
	,new clLiaison(null,Réglement_Banque_4)
	,new clLiaison(null,Réglement_N__compte_5)
	,new clLiaison(null,Réglement_Référence_6)
	,new clLiaison(Joint_Esclave_Réglement_Responsable_7,Réglement_Responsable_7)
	,new clLiaison(Joint_Esclave_Réglement_Factures_concernées_8,Réglement_Factures_concernées_8)
	,new clLiaison(Joint_Esclave_Réglement_Dont_reversements____13,Réglement_Dont_reversements____13)
	));

var Titre_Réglement_Liste_des_réglements0=new Array("N°     ","Date   ","Montant");

	/* Ce composant représente: des éléments de la table reglement sous le nom "Liste des réglements" */
var Compo_Réglement_Liste_des_réglements0=new clCompoListe(Réglement_Liste_des_réglements0,new Array(new clInterfaceFiltrageVide()),Titre_Réglement_Liste_des_réglements0,"Liste des réglements",true,false);

	/* Ce composant représente: reglement.undefined sous le nom "Liste des réglements" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Liste_des_réglements0.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0"));

 }

	/* On l'ajoute au tableau global à l'indice 1434*/
top.TAB_GLOBAL_COMPO[1434]=Compo_Réglement_Liste_des_réglements0;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Date" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Date_1.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1438*/
top.TAB_GLOBAL_COMPO[1438]=Compo_Réglement_Date_1;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Montant" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Montant_2.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1439*/
top.TAB_GLOBAL_COMPO[1439]=Compo_Réglement_Montant_2;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Mode" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Réglement_Mode_3.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1440*/
top.TAB_GLOBAL_COMPO[1440]=Compo_Réglement_Mode_3;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Banque" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Banque_4.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1441*/
top.TAB_GLOBAL_COMPO[1441]=Compo_Réglement_Banque_4;

	/* Ce composant représente: des éléments de la table reglement sous le nom "N° compte" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_N__compte_5.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1442*/
top.TAB_GLOBAL_COMPO[1442]=Compo_Réglement_N__compte_5;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Référence" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Référence_6.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1443*/
top.TAB_GLOBAL_COMPO[1443]=Compo_Réglement_Référence_6;

	/* Ce composant représente: des éléments de la table vue_employe_reglement sous le nom "Responsable" */
 if(ALeDroit(0,"vue_employe_reglement"))
 {
Compo_Réglement_Responsable_7.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1444*/
top.TAB_GLOBAL_COMPO[1444]=Compo_Réglement_Responsable_7;

	/* Ce composant représente: facturereglement.undefined sous le nom "Factures concernées" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Réglement_Factures_concernées_8.GenererXUL(top.document.getElementById("Réglement_Factures_concernées_8"));

 }

	/* On l'ajoute au tableau global à l'indice 1445*/
top.TAB_GLOBAL_COMPO[1445]=Compo_Réglement_Factures_concernées_8;

	/* Ce composant représente: des éléments de la table facture sous le nom "Facture" */
 if(ALeDroit(0,"facture"))
 {
Compo_Réglement_Facture_9.GenererXUL(top.document.getElementById("Réglement_Factures_concernées_8_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1450*/
top.TAB_GLOBAL_COMPO[1450]=Compo_Réglement_Facture_9;

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "Acompte" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Réglement_Acompte_10.GenererXUL(top.document.getElementById("Réglement_Factures_concernées_8_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1451*/
top.TAB_GLOBAL_COMPO[1451]=Compo_Réglement_Acompte_10;

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "La facture reçoit seulement une part du réglement" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Réglement_La_facture_reçoit_seulement_une_part_du_réglement_11.GenererXUL(top.document.getElementById("Réglement_Factures_concernées_8_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1452*/
top.TAB_GLOBAL_COMPO[1452]=Compo_Réglement_La_facture_reçoit_seulement_une_part_du_réglement_11;

	/* Ce composant représente: des éléments de la table facturereglement sous le nom "Montant de la part" */
 if(ALeDroit(0,"facturereglement"))
 {
Compo_Réglement_Montant_de_la_part_12.GenererXUL(top.document.getElementById("Réglement_Factures_concernées_8_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1453*/
top.TAB_GLOBAL_COMPO[1453]=Compo_Réglement_Montant_de_la_part_12;

	/* Ce composant représente: repartition.undefined sous le nom "Dont reversements..." */
 if(ALeDroit(0,"repartition"))
 {
Compo_Réglement_Dont_reversements____13.GenererXUL(top.document.getElementById("Réglement_Dont_reversements____13"));

 }

	/* On l'ajoute au tableau global à l'indice 1454*/
top.TAB_GLOBAL_COMPO[1454]=Compo_Réglement_Dont_reversements____13;

	/* Ce composant représente: des éléments de la table repartition sous le nom "Montant" */
 if(ALeDroit(0,"repartition"))
 {
Compo_Réglement_Montant_14.GenererXUL(top.document.getElementById("Réglement_Dont_reversements____13_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1457*/
top.TAB_GLOBAL_COMPO[1457]=Compo_Réglement_Montant_14;

	/* Ce composant représente: des éléments de la table moderepartition sous le nom "Vers" */
 if(ALeDroit(0,"moderepartition"))
 {
Compo_Réglement_Vers_15.GenererXUL(top.document.getElementById("Réglement_Dont_reversements____13_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1458*/
top.TAB_GLOBAL_COMPO[1458]=Compo_Réglement_Vers_15;
var Col_N0_N____De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clAttribut("lr_numero","listereglement",null);

var Col_N1_Date_De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clAttribut("lr_date","listereglement",null);

var Col_N2_Employé_e__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clAttribut("em_login","employe",null);

var Joint_Col_N2_Employé_e__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clJointureMulti("listereglement",
	new Array(
	new stJointure("employe","em_numero","em_numero",null,true)
	));
var Col_N3_Nb__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clAttribut("br_count","vue_print_listereglement_entete",null);

var Joint_Col_N3_Nb__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clJointureMulti("listereglement",
	new Array(
	new stJointure("vue_print_listereglement_entete","lr_numero","lr_numero",null,true)
	));
var Col_N4_Montant_De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clAttribut("br_total","vue_print_listereglement_entete",null);

var Joint_Col_N4_Montant_De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clJointureMulti("listereglement",
	new Array(
	new stJointure("vue_print_listereglement_entete","lr_numero","lr_numero",null,true)
	));
var Bordereaux_de_réglements_Employé_e__1=new clAttribut("em_libelle","vue_employe_reglement",null);


	/* Ce composant représente: vue_employe_reglement.em_libelle sous le nom "Employé(e)" */
var Compo_Bordereaux_de_réglements_Employé_e__1=new clCompoListeDeroulanteSimple(Bordereaux_de_réglements_Employé_e__1,null,"Employé(e)");
var Joint_Esclave_Bordereaux_de_réglements_Employé_e__1=new clJointureMulti("listereglement",
	new Array(
	new stJointure("vue_employe_reglement","em_numero","em_numero",null,false)
	));
var Bordereaux_de_réglements_Mode_reg__2=new clAttribut("mr_libelle","modereglement",null);


	/* Ce composant représente: modereglement.mr_libelle sous le nom "Mode reg." */
var Compo_Bordereaux_de_réglements_Mode_reg__2=new clCompoListeDeroulanteSimple(Bordereaux_de_réglements_Mode_reg__2,null,"Mode reg.");
var Joint_Esclave_Bordereaux_de_réglements_Mode_reg__2=new clJointureMulti("listereglement",
	new Array(
	new stJointure("modereglement","mr_numero","mr_numero",null,false)
	));
var Bordereaux_de_réglements_Commentaire_3=new clAttribut("lr_commentaire","listereglement",null);


	/* Ce composant représente: listereglement.lr_commentaire sous le nom "Commentaire" */
var Compo_Bordereaux_de_réglements_Commentaire_3=new clCompoTextBox(Bordereaux_de_réglements_Commentaire_3,null,"Commentaire",false,true);
var Col_N0_N_Reglement_De_Bordereaux_de_réglements_Liste_des_règlements_4=new clAttribut("rg_numero","reglement",null);

var Col_N1_Date_De_Bordereaux_de_réglements_Liste_des_règlements_4=new clAttribut("rg_date","reglement",null);

var Col_N2_Emetteur_De_Bordereaux_de_réglements_Liste_des_règlements_4=new clAttribut("pe_numero","reglement",null);

var Col_N3_Ref__Chèque_De_Bordereaux_de_réglements_Liste_des_règlements_4=new clAttribut("rg_reference","reglement",null);

var Col_N4_Montant_De_Bordereaux_de_réglements_Liste_des_règlements_4=new clAttribut("rg_montant","reglement",null);

var Bordereaux_de_réglements_Liste_des_règlements_4=new clEnsembleAttributs("reglement",
	new Array(
	new clLiaison(null,Col_N0_N_Reglement_De_Bordereaux_de_réglements_Liste_des_règlements_4)
	,new clLiaison(null,Col_N1_Date_De_Bordereaux_de_réglements_Liste_des_règlements_4)
	,new clLiaison(null,Col_N2_Emetteur_De_Bordereaux_de_réglements_Liste_des_règlements_4)
	,new clLiaison(null,Col_N3_Ref__Chèque_De_Bordereaux_de_réglements_Liste_des_règlements_4)
	,new clLiaison(null,Col_N4_Montant_De_Bordereaux_de_réglements_Liste_des_règlements_4)
	),
	null);

var Titre_Bordereaux_de_réglements_Liste_des_règlements_4=new Array("N°Reglement","Date","Emetteur","Ref. Chèque","Montant");

	/* Ce composant représente: des éléments de la table reglement sous le nom "Liste des règlements" */
var Compo_Bordereaux_de_réglements_Liste_des_règlements_4=new clCompoListe(Bordereaux_de_réglements_Liste_des_règlements_4,null,Titre_Bordereaux_de_réglements_Liste_des_règlements_4,"Liste des règlements",true,false);
var Joint_Esclave_Bordereaux_de_réglements_Liste_des_règlements_4=new clJointureMulti("listereglement",
	new Array(
	new stJointure("reglement","lr_numero","lr_numero",null,false)
	));
var Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clEnsembleAttributs("listereglement",
	new Array(
	new clLiaison(null,Col_N0_N____De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0)
	,new clLiaison(null,Col_N1_Date_De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0)
	,new clLiaison(Joint_Col_N2_Employé_e__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0,Col_N2_Employé_e__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0)
	,new clLiaison(Joint_Col_N3_Nb__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0,Col_N3_Nb__De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0)
	,new clLiaison(Joint_Col_N4_Montant_De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0,Col_N4_Montant_De_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Bordereaux_de_réglements_Employé_e__1,Bordereaux_de_réglements_Employé_e__1)
	,new clLiaison(Joint_Esclave_Bordereaux_de_réglements_Mode_reg__2,Bordereaux_de_réglements_Mode_reg__2)
	,new clLiaison(null,Bordereaux_de_réglements_Commentaire_3)
	,new clLiaison(Joint_Esclave_Bordereaux_de_réglements_Liste_des_règlements_4,Bordereaux_de_réglements_Liste_des_règlements_4)
	));

var Titre_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new Array("N°  ","Date","Employé(e)","Nb.","Montant");

	/* Ce composant représente: des éléments de la table listereglement sous le nom "Liste des bordereaux de remise en banque" */
var Compo_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0=new clCompoListe(Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0,new Array(new clInterfaceFiltrageVide()),Titre_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0,"Liste des bordereaux de remise en banque",true,false);

	/* Ce composant représente: listereglement.undefined sous le nom "Liste des bordereaux de remise en banque" */
 if(ALeDroit(0,"listereglement"))
 {
Compo_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0.GenererXUL(top.document.getElementById("Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0"));

 }

	/* On l'ajoute au tableau global à l'indice 1471*/
top.TAB_GLOBAL_COMPO[1471]=Compo_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0;

	/* Ce composant représente: des éléments de la table vue_employe_reglement sous le nom "Employé(e)" */
 if(ALeDroit(0,"vue_employe_reglement"))
 {
Compo_Bordereaux_de_réglements_Employé_e__1.GenererXUL(top.document.getElementById("Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1477*/
top.TAB_GLOBAL_COMPO[1477]=Compo_Bordereaux_de_réglements_Employé_e__1;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Mode reg." */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Bordereaux_de_réglements_Mode_reg__2.GenererXUL(top.document.getElementById("Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1478*/
top.TAB_GLOBAL_COMPO[1478]=Compo_Bordereaux_de_réglements_Mode_reg__2;

	/* Ce composant représente: des éléments de la table listereglement sous le nom "Commentaire" */
 if(ALeDroit(0,"listereglement"))
 {
Compo_Bordereaux_de_réglements_Commentaire_3.GenererXUL(top.document.getElementById("Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1479*/
top.TAB_GLOBAL_COMPO[1479]=Compo_Bordereaux_de_réglements_Commentaire_3;

	/* Ce composant représente: reglement.undefined sous le nom "Liste des règlements" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Bordereaux_de_réglements_Liste_des_règlements_4.GenererXUL(top.document.getElementById("Bordereaux_de_réglements_Liste_des_règlements_4"));

 }

	/* On l'ajoute au tableau global à l'indice 1480*/
top.TAB_GLOBAL_COMPO[1480]=Compo_Bordereaux_de_réglements_Liste_des_règlements_4;
var Col_N0_A__De_Cotisations_Liste_des_cotisations0=new clAttribut("cs_annee","cotisation",null);

var Col_N1_N__De_Cotisations_Liste_des_cotisations0=new clAttribut("cs_numero","cotisation",null);

var Col_N2_N_P__De_Cotisations_Liste_des_cotisations0=new clAttribut("pe_numero","cotisation",null);

var Col_N3_N_S__De_Cotisations_Liste_des_cotisations0=new clAttribut("cs_societe","cotisation",null);

var Col_N4_Done_De_Cotisations_Liste_des_cotisations0=new clAttribut("cs_done","cotisation",null);

var Cotisations_Personne_1=new clAttribut("pe_description","vue_personne",null);


	/* Ce composant représente: vue_personne.pe_description sous le nom "Personne" */
var Compo_Cotisations_Personne_1=new clCompoListeDeroulanteSimple(Cotisations_Personne_1,null,"Personne");
var Joint_Esclave_Cotisations_Personne_1=new clJointureMulti("cotisation",
	new Array(
	new stJointure("vue_personne","pe_numero","pe_numero",null,false)
	));
var Cotisations_Société_2=new clAttribut("pe_description","vue_personne",null);


	/* Ce composant représente: vue_personne.pe_description sous le nom "Société" */
var Compo_Cotisations_Société_2=new clCompoListeDeroulanteSimple(Cotisations_Société_2,null,"Société");
var Joint_Esclave_Cotisations_Société_2=new clJointureMulti("cotisation",
	new Array(
	new stJointure("vue_personne","cs_societe","pe_numero",null,false)
	));
var Cotisations_Nature_3=new clAttribut("cs_nature","cotisation",null);


	/* Ce composant représente: cotisation.cs_nature sous le nom "Nature" */
var Compo_Cotisations_Nature_3=new clCompoTextBox(Cotisations_Nature_3,null,"Nature",false,false);
var Cotisations_Année_4=new clAttribut("cs_annee","cotisation",null);


	/* Ce composant représente: cotisation.cs_annee sous le nom "Année" */
var Compo_Cotisations_Année_4=new clCompoTextBox(Cotisations_Année_4,null,"Année",false,false);
var Cotisations_Groupe_d_impression_5=new clAttribut("ig_numero","cotisation",null);


	/* Ce composant représente: cotisation.ig_numero sous le nom "Groupe d'impression" */
var Compo_Cotisations_Groupe_d_impression_5=new clCompoTextBox(Cotisations_Groupe_d_impression_5,null,"Groupe d'impression",false,false);
var Cotisations_Détail_6=new clAttribut("cs_detail","cotisation",null);


	/* Ce composant représente: cotisation.cs_detail sous le nom "Détail" */
var Compo_Cotisations_Détail_6=new clCompoTextBox(Cotisations_Détail_6,null,"Détail",false,true);
var Cotisations_Liste_des_cotisations0=new clEnsembleAttributs("cotisation",
	new Array(
	new clLiaison(null,Col_N0_A__De_Cotisations_Liste_des_cotisations0)
	,new clLiaison(null,Col_N1_N__De_Cotisations_Liste_des_cotisations0)
	,new clLiaison(null,Col_N2_N_P__De_Cotisations_Liste_des_cotisations0)
	,new clLiaison(null,Col_N3_N_S__De_Cotisations_Liste_des_cotisations0)
	,new clLiaison(null,Col_N4_Done_De_Cotisations_Liste_des_cotisations0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Cotisations_Personne_1,Cotisations_Personne_1)
	,new clLiaison(Joint_Esclave_Cotisations_Société_2,Cotisations_Société_2)
	,new clLiaison(null,Cotisations_Nature_3)
	,new clLiaison(null,Cotisations_Année_4)
	,new clLiaison(null,Cotisations_Groupe_d_impression_5)
	,new clLiaison(null,Cotisations_Détail_6)
	));

var Titre_Cotisations_Liste_des_cotisations0=new Array("A.","N°","N°P.","N°S.","Done");

	/* Ce composant représente: des éléments de la table cotisation sous le nom "Liste des cotisations" */
var Compo_Cotisations_Liste_des_cotisations0=new clCompoListe(Cotisations_Liste_des_cotisations0,new Array(new clInterfaceFiltrageVide()),Titre_Cotisations_Liste_des_cotisations0,"Liste des cotisations",true,false);

	/* Ce composant représente: cotisation.undefined sous le nom "Liste des cotisations" */
 if(ALeDroit(0,"cotisation"))
 {
Compo_Cotisations_Liste_des_cotisations0.GenererXUL(top.document.getElementById("Cotisations_Liste_des_cotisations0"));

 }

	/* On l'ajoute au tableau global à l'indice 1459*/
top.TAB_GLOBAL_COMPO[1459]=Compo_Cotisations_Liste_des_cotisations0;

	/* Ce composant représente: des éléments de la table vue_personne sous le nom "Personne" */
 if(ALeDroit(0,"vue_personne"))
 {
Compo_Cotisations_Personne_1.GenererXUL(top.document.getElementById("Cotisations_Liste_des_cotisations0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1465*/
top.TAB_GLOBAL_COMPO[1465]=Compo_Cotisations_Personne_1;

	/* Ce composant représente: des éléments de la table vue_personne sous le nom "Société" */
 if(ALeDroit(0,"vue_personne"))
 {
Compo_Cotisations_Société_2.GenererXUL(top.document.getElementById("Cotisations_Liste_des_cotisations0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1466*/
top.TAB_GLOBAL_COMPO[1466]=Compo_Cotisations_Société_2;

	/* Ce composant représente: des éléments de la table cotisation sous le nom "Nature" */
 if(ALeDroit(0,"cotisation"))
 {
Compo_Cotisations_Nature_3.GenererXUL(top.document.getElementById("Cotisations_Liste_des_cotisations0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1467*/
top.TAB_GLOBAL_COMPO[1467]=Compo_Cotisations_Nature_3;

	/* Ce composant représente: des éléments de la table cotisation sous le nom "Année" */
 if(ALeDroit(0,"cotisation"))
 {
Compo_Cotisations_Année_4.GenererXUL(top.document.getElementById("Cotisations_Liste_des_cotisations0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1468*/
top.TAB_GLOBAL_COMPO[1468]=Compo_Cotisations_Année_4;

	/* Ce composant représente: des éléments de la table cotisation sous le nom "Groupe d'impression" */
 if(ALeDroit(0,"cotisation"))
 {
Compo_Cotisations_Groupe_d_impression_5.GenererXUL(top.document.getElementById("Cotisations_Liste_des_cotisations0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1469*/
top.TAB_GLOBAL_COMPO[1469]=Compo_Cotisations_Groupe_d_impression_5;

	/* Ce composant représente: des éléments de la table cotisation sous le nom "Détail" */
 if(ALeDroit(0,"cotisation"))
 {
Compo_Cotisations_Détail_6.GenererXUL(top.document.getElementById("Cotisations_Liste_des_cotisations0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 1470*/
top.TAB_GLOBAL_COMPO[1470]=Compo_Cotisations_Détail_6;
Filtre_DepFor_Devis_0.setComposant(TAB_GLOBAL_COMPO[1360],null);
Filtre_DepFor_Facture_0.setComposant(TAB_GLOBAL_COMPO[1380],null);
Filtre_Dep_Avoir_0.setComposant(TAB_GLOBAL_COMPO[1421],null);
Filtre_Dep_Réglement_0.setComposant(TAB_GLOBAL_COMPO[1434],null);
Filtre_DepFor_Réglement_1.setComposant(TAB_GLOBAL_COMPO[1434],null);
 if(ALeDroit(5,"personne"))
 {
/* On refresh les composants non dépendents de l'onget Personnes*/
var Composant_0 = TAB_GLOBAL_COMPO[1262];
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
 if(ALeDroit(2,"personne"))
 {
nb_button++;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").hidden=true;

 }
 if(ALeDroit(4,"personne"))
 {
nb_button++;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").hidden=true;

 }
 if(ALeDroit(1,"personne"))
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
var nb_button=0
 if(ALeDroit(2,"observation"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Observations_9").hidden=true;

 }
 if(ALeDroit(4,"observation"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Observations_9").hidden=true;

 }
 if(ALeDroit(1,"observation"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Observations_9").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Observations_9").hidden=true;
        top.document.getElementById("Annuler_Personnes_Observations_9").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Adresses_12").hidden=true;

 }
 if(ALeDroit(4,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Adresses_12").hidden=true;

 }
 if(ALeDroit(1,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Adresses_12").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Adresses_12").hidden=true;
        top.document.getElementById("Annuler_Personnes_Adresses_12").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"contact"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Contact_20").hidden=true;

 }
 if(ALeDroit(4,"contact"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Contact_20").hidden=true;

 }
 if(ALeDroit(1,"contact"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Contact_20").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Contact_20").hidden=true;
        top.document.getElementById("Annuler_Personnes_Contact_20").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"appel"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Tâches_23").hidden=true;

 }
 if(ALeDroit(4,"appel"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Tâches_23").hidden=true;

 }
 if(ALeDroit(1,"appel"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Tâches_23").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Tâches_23").hidden=true;
        top.document.getElementById("Annuler_Personnes_Tâches_23").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"estresponsable"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Responsabilités_29").hidden=true;

 }
 if(ALeDroit(4,"estresponsable"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Responsabilités_29").hidden=true;

 }
 if(ALeDroit(1,"estresponsable"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Responsabilités_29").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Responsabilités_29").hidden=true;
        top.document.getElementById("Annuler_Personnes_Responsabilités_29").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"attribut"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Attributs_35").hidden=true;

 }
 if(ALeDroit(4,"attribut"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Attributs_35").hidden=true;

 }
 if(ALeDroit(1,"attribut"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Attributs_35").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Attributs_35").hidden=true;
        top.document.getElementById("Annuler_Personnes_Attributs_35").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Routages_42").hidden=true;

 }
 if(ALeDroit(4,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Routages_42").hidden=true;

 }
 if(ALeDroit(1,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Routages_42").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Routages_42").hidden=true;
        top.document.getElementById("Annuler_Personnes_Routages_42").hidden=true;
}
 if(ALeDroit(5,"devis"))
 {
/* On refresh les composants non dépendents de l'onget Devis*/
var Composant_0 = TAB_GLOBAL_COMPO[1360];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Devis").hidden=true;
if (top.document.getElementById("Onglet_Devis").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"devis"))
 {
nb_button++;
top.document.getElementById("Insert_Devis_Liste_des_devis0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Devis_Liste_des_devis0").hidden=true;

 }
 if(ALeDroit(4,"devis"))
 {
nb_button++;
top.document.getElementById("Delete_Devis_Liste_des_devis0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Devis_Liste_des_devis0").hidden=true;

 }
 if(ALeDroit(1,"devis"))
 {
nb_button++;
top.document.getElementById("Update_Devis_Liste_des_devis0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Devis_Liste_des_devis0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Devis_Liste_des_devis0").hidden=true;
        top.document.getElementById("Annuler_Devis_Liste_des_devis0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"ligne"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Devis_Lignes_du_devis_8").hidden=true;

 }
 if(ALeDroit(4,"ligne"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Devis_Lignes_du_devis_8").hidden=true;

 }
 if(ALeDroit(1,"ligne"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Devis_Lignes_du_devis_8").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Devis_Lignes_du_devis_8").hidden=true;
        top.document.getElementById("Annuler_Devis_Lignes_du_devis_8").hidden=true;
}
 if(ALeDroit(5,"facture"))
 {
/* On refresh les composants non dépendents de l'onget Facture*/
var Composant_0 = TAB_GLOBAL_COMPO[1380];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Facture").hidden=true;
if (top.document.getElementById("Onglet_Facture").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"facture"))
 {
nb_button++;
top.document.getElementById("Insert_Facture_Liste_des_factures0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Facture_Liste_des_factures0").hidden=true;

 }
 if(ALeDroit(4,"facture"))
 {
nb_button++;
top.document.getElementById("Delete_Facture_Liste_des_factures0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Facture_Liste_des_factures0").hidden=true;

 }
 if(ALeDroit(1,"facture"))
 {
nb_button++;
top.document.getElementById("Update_Facture_Liste_des_factures0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Facture_Liste_des_factures0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Facture_Liste_des_factures0").hidden=true;
        top.document.getElementById("Annuler_Facture_Liste_des_factures0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"facturereglement"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Facture_Règlements_11").hidden=true;

 }
 if(ALeDroit(4,"facturereglement"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Facture_Règlements_11").hidden=true;

 }
 if(ALeDroit(1,"facturereglement"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Facture_Règlements_11").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Facture_Règlements_11").hidden=true;
        top.document.getElementById("Annuler_Facture_Règlements_11").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Facture_Routages_16").hidden=true;

 }
 if(ALeDroit(4,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Facture_Routages_16").hidden=true;

 }
 if(ALeDroit(1,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Facture_Routages_16").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Facture_Routages_16").hidden=true;
        top.document.getElementById("Annuler_Facture_Routages_16").hidden=true;
}
 if(ALeDroit(5,"avoir"))
 {
/* On refresh les composants non dépendents de l'onget Avoir*/
var Composant_0 = TAB_GLOBAL_COMPO[1421];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Avoir").hidden=true;
if (top.document.getElementById("Onglet_Avoir").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"avoir"))
 {
nb_button++;
top.document.getElementById("Insert_Avoir_Liste_des_avoirs0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Avoir_Liste_des_avoirs0").hidden=true;

 }
 if(ALeDroit(4,"avoir"))
 {
nb_button++;
top.document.getElementById("Delete_Avoir_Liste_des_avoirs0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Avoir_Liste_des_avoirs0").hidden=true;

 }
 if(ALeDroit(1,"avoir"))
 {
nb_button++;
top.document.getElementById("Update_Avoir_Liste_des_avoirs0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Avoir_Liste_des_avoirs0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Avoir_Liste_des_avoirs0").hidden=true;
        top.document.getElementById("Annuler_Avoir_Liste_des_avoirs0").hidden=true;
}
 if(ALeDroit(5,"reglement"))
 {
/* On refresh les composants non dépendents de l'onget Réglement*/
var Composant_0 = TAB_GLOBAL_COMPO[1434];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Réglement").hidden=true;
if (top.document.getElementById("Onglet_Réglement").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"reglement"))
 {
nb_button++;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").hidden=true;

 }
 if(ALeDroit(4,"reglement"))
 {
nb_button++;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").hidden=true;

 }
 if(ALeDroit(1,"reglement"))
 {
nb_button++;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Réglement_Liste_des_réglements0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Réglement_Liste_des_réglements0").hidden=true;
        top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"facturereglement"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Réglement_Factures_concernées_8").hidden=true;

 }
 if(ALeDroit(4,"facturereglement"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Réglement_Factures_concernées_8").hidden=true;

 }
 if(ALeDroit(1,"facturereglement"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Réglement_Factures_concernées_8").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Réglement_Factures_concernées_8").hidden=true;
        top.document.getElementById("Annuler_Réglement_Factures_concernées_8").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"repartition"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Réglement_Dont_reversements____13").hidden=true;

 }
 if(ALeDroit(4,"repartition"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Réglement_Dont_reversements____13").hidden=true;

 }
 if(ALeDroit(1,"repartition"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Réglement_Dont_reversements____13").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Réglement_Dont_reversements____13").hidden=true;
        top.document.getElementById("Annuler_Réglement_Dont_reversements____13").hidden=true;
}
 if(ALeDroit(5,"listereglement"))
 {
/* On refresh les composants non dépendents de l'onget Bordereaux de réglements*/
var Composant_0 = TAB_GLOBAL_COMPO[1471];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Bordereaux_de_réglements").hidden=true;
if (top.document.getElementById("Onglet_Bordereaux_de_réglements").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"listereglement"))
 {
nb_button++;
top.document.getElementById("Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").hidden=true;

 }
 if(ALeDroit(4,"listereglement"))
 {
nb_button++;
top.document.getElementById("Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").hidden=true;

 }
 if(ALeDroit(1,"listereglement"))
 {
nb_button++;
top.document.getElementById("Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").hidden=true;
        top.document.getElementById("Annuler_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0").hidden=true;
}
 if(ALeDroit(5,"cotisation"))
 {
/* On refresh les composants non dépendents de l'onget Cotisations*/
var Composant_0 = TAB_GLOBAL_COMPO[1459];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Cotisations").hidden=true;
if (top.document.getElementById("Onglet_Cotisations").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"cotisation"))
 {
nb_button++;
top.document.getElementById("Insert_Cotisations_Liste_des_cotisations0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Cotisations_Liste_des_cotisations0").hidden=true;

 }
 if(ALeDroit(4,"cotisation"))
 {
nb_button++;
top.document.getElementById("Delete_Cotisations_Liste_des_cotisations0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Cotisations_Liste_des_cotisations0").hidden=true;

 }
 if(ALeDroit(1,"cotisation"))
 {
nb_button++;
top.document.getElementById("Update_Cotisations_Liste_des_cotisations0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Cotisations_Liste_des_cotisations0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Cotisations_Liste_des_cotisations0").hidden=true;
        top.document.getElementById("Annuler_Cotisations_Liste_des_cotisations0").hidden=true;
}
ConstruireOngletEstLie("tabbox_Personnes_Liste_des_personnes0",1262);
Compo_Personnes_Liste_des_personnes0.OnChangeUser=RefreshOngletEstLie;
Compo_Personnes_Liste_des_personnes0.OnChangeUserParams=Compo_Personnes_Liste_des_personnes0;
Filtre_PersonneResponsabilite.setComposant(Compo_Personnes_Responsabilités_29);
Filtre_PersonneDevis.setComposant(Compo_Personnes_Devis_39);
Filtre_DevisLignePrix.setComposant(Compo_Devis_Produit_9);
}
