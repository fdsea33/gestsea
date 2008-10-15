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
var TAB_COMPO_PPTES = new Array(858);
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
 TAB_COMPO_PPTES[768].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[768].NewCle = getNewCle("personne");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[768].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[771];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[772];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[773];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[774];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[775];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[776];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[777];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[778];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=false;
 var Esclave_8=TAB_GLOBAL_COMPO[785];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_17").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=false;
top.document.getElementById("Update_Personnes_Contact_17").disabled=false;
 var Esclave_9=TAB_GLOBAL_COMPO[797];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=false;
 var Esclave_10=TAB_GLOBAL_COMPO[802];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_24").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=false;
top.document.getElementById("Update_Personnes_Routages_24").disabled=false;
 var Esclave_11=TAB_GLOBAL_COMPO[808];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[768];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[768].NewCle;
}

function Delete_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[768].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[768];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[768].Action_en_cours = DELETE;
         User_Delete_Personnes_Liste_des_personnes0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[768].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[768].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[768].NewCle = TAB_GLOBAL_COMPO[768].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[768].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[771];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[772];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[773];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[774];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[775];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[776];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[777];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[778];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=false;
 var Esclave_8=TAB_GLOBAL_COMPO[785];
 Esclave_8.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_17").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=false;
top.document.getElementById("Update_Personnes_Contact_17").disabled=false;
 var Esclave_9=TAB_GLOBAL_COMPO[797];
 Esclave_9.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=false;
 var Esclave_10=TAB_GLOBAL_COMPO[802];
 Esclave_10.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_24").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=false;
top.document.getElementById("Update_Personnes_Routages_24").disabled=false;
 var Esclave_11=TAB_GLOBAL_COMPO[808];
 Esclave_11.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
return TAB_COMPO_PPTES[768].NewCle;
}

function Validate_Personnes_Liste_des_personnes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[768];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[768].Action_en_cours){
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
 TAB_GLOBAL_COMPO[768].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[771];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[772];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[773];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[774];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[775];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[776];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[777];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[778];
 Esclave_7.ActiverComposant(false);
Annuler_Personnes_Adresses_9();
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=true;
 var Esclave_8=TAB_GLOBAL_COMPO[785];
 Esclave_8.ActiverComposant(false);
Annuler_Personnes_Contact_17();
top.document.getElementById("Validate_Personnes_Contact_17").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=true;
top.document.getElementById("Update_Personnes_Contact_17").disabled=true;
 var Esclave_9=TAB_GLOBAL_COMPO[797];
 Esclave_9.ActiverComposant(false);
Annuler_Personnes_Attributs_20();
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=true;
 var Esclave_10=TAB_GLOBAL_COMPO[802];
 Esclave_10.ActiverComposant(false);
Annuler_Personnes_Routages_24();
top.document.getElementById("Validate_Personnes_Routages_24").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=true;
top.document.getElementById("Update_Personnes_Routages_24").disabled=true;
 var Esclave_11=TAB_GLOBAL_COMPO[808];
 Esclave_11.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[768].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[768].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Liste_des_personnes0()
{
 TAB_COMPO_PPTES[768].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[768].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[771];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[772];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[773];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[774];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[775];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[776];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[777];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[778];
 Esclave_7.ActiverComposant(false);
Annuler_Personnes_Adresses_9();
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=true;
 var Esclave_8=TAB_GLOBAL_COMPO[785];
 Esclave_8.ActiverComposant(false);
Annuler_Personnes_Contact_17();
top.document.getElementById("Validate_Personnes_Contact_17").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=true;
top.document.getElementById("Update_Personnes_Contact_17").disabled=true;
 var Esclave_9=TAB_GLOBAL_COMPO[797];
 Esclave_9.ActiverComposant(false);
Annuler_Personnes_Attributs_20();
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=true;
 var Esclave_10=TAB_GLOBAL_COMPO[802];
 Esclave_10.ActiverComposant(false);
Annuler_Personnes_Routages_24();
top.document.getElementById("Validate_Personnes_Routages_24").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=true;
top.document.getElementById("Update_Personnes_Routages_24").disabled=true;
 var Esclave_11=TAB_GLOBAL_COMPO[808];
 Esclave_11.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
}

function Insert_Personnes_Adresses_9()
{
 if (TAB_COMPO_PPTES[768].Action_en_cours == INSERT)
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
                        Insert_Personnes_Adresses_9();
                }
                 return;
         }
 TAB_COMPO_PPTES[785].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[785].NewCle = getNewCle("adresse");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[785].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[790];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[791];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[792];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[793];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[794];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[795];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[796];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[785];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[785].NewCle;
}

function Delete_Personnes_Adresses_9()
{
 if (TAB_GLOBAL_COMPO[785].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[785];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[785].Action_en_cours = DELETE;
         User_Delete_Personnes_Adresses_9(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Adresses_9()
{
 if (TAB_GLOBAL_COMPO[785].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[785].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[785].NewCle = TAB_GLOBAL_COMPO[785].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[785].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[790];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[791];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[792];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[793];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[794];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[795];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[796];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=true;
return TAB_COMPO_PPTES[785].NewCle;
}

function Validate_Personnes_Adresses_9(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[785];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[785].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Adresses_9(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Adresses_9(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[785].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[790];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[791];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[792];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[793];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[794];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[795];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[796];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[785].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[785].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Adresses_9()
{
 TAB_COMPO_PPTES[785].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[785].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[790];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[791];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[792];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[793];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[794];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[795];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[796];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_9").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_9").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_9").disabled=false;
}

function Insert_Personnes_Contact_17()
{
 if (TAB_COMPO_PPTES[768].Action_en_cours == INSERT)
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
                        Insert_Personnes_Contact_17();
                }
                 return;
         }
 TAB_COMPO_PPTES[797].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[797].NewCle = getNewCle("contact");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[797].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[800];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[801];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_17").disabled=false;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=false;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=true;
top.document.getElementById("Update_Personnes_Contact_17").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[797];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[797].NewCle;
}

function Delete_Personnes_Contact_17()
{
 if (TAB_GLOBAL_COMPO[797].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[797];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[797].Action_en_cours = DELETE;
         User_Delete_Personnes_Contact_17(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Contact_17()
{
 if (TAB_GLOBAL_COMPO[797].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[797].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[797].NewCle = TAB_GLOBAL_COMPO[797].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[797].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[800];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[801];
 Esclave_1.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Contact_17").disabled=false;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=false;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=true;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=true;
top.document.getElementById("Update_Personnes_Contact_17").disabled=true;
return TAB_COMPO_PPTES[797].NewCle;
}

function Validate_Personnes_Contact_17(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[797];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[797].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Contact_17(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Contact_17(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[797].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[800];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[801];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Contact_17").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=false;
top.document.getElementById("Update_Personnes_Contact_17").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[797].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[797].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Contact_17()
{
 TAB_COMPO_PPTES[797].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[797].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[800];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[801];
 Esclave_1.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Contact_17").disabled=true;
top.document.getElementById("Annuler_Personnes_Contact_17").disabled=true;
top.document.getElementById("Insert_Personnes_Contact_17").disabled=false;
top.document.getElementById("Delete_Personnes_Contact_17").disabled=false;
top.document.getElementById("Update_Personnes_Contact_17").disabled=false;
}

function Insert_Personnes_Attributs_20()
{
 if (TAB_COMPO_PPTES[768].Action_en_cours == INSERT)
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
                        Insert_Personnes_Attributs_20();
                }
                 return;
         }
 TAB_COMPO_PPTES[802].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[802].NewCle = getNewCle("attribut");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[802].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[805];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[806];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[807];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[802];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[802].NewCle;
}

function Delete_Personnes_Attributs_20()
{
 if (TAB_GLOBAL_COMPO[802].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[802];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[802].Action_en_cours = DELETE;
         User_Delete_Personnes_Attributs_20(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Attributs_20()
{
 if (TAB_GLOBAL_COMPO[802].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[802].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[802].NewCle = TAB_GLOBAL_COMPO[802].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[802].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[805];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[806];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[807];
 Esclave_2.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=true;
return TAB_COMPO_PPTES[802].NewCle;
}

function Validate_Personnes_Attributs_20(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[802];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[802].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Attributs_20(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Attributs_20(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[802].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[805];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[806];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[807];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[802].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[802].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Attributs_20()
{
 TAB_COMPO_PPTES[802].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[802].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[805];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[806];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[807];
 Esclave_2.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Annuler_Personnes_Attributs_20").disabled=true;
top.document.getElementById("Insert_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Delete_Personnes_Attributs_20").disabled=false;
top.document.getElementById("Update_Personnes_Attributs_20").disabled=false;
}

function Insert_Personnes_Routages_24()
{
 if (TAB_COMPO_PPTES[768].Action_en_cours == INSERT)
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
                        Insert_Personnes_Routages_24();
                }
                 return;
         }
 TAB_COMPO_PPTES[808].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[808].NewCle = getNewCle("routage");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[808].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_24").disabled=false;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=false;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=true;
top.document.getElementById("Update_Personnes_Routages_24").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[808];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[808].NewCle;
}

function Delete_Personnes_Routages_24()
{
 if (TAB_GLOBAL_COMPO[808].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[808];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[808].Action_en_cours = DELETE;
         User_Delete_Personnes_Routages_24(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Routages_24()
{
 if (TAB_GLOBAL_COMPO[808].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[808].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[808].NewCle = TAB_GLOBAL_COMPO[808].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[808].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Routages_24").disabled=false;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=false;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=true;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=true;
top.document.getElementById("Update_Personnes_Routages_24").disabled=true;
return TAB_COMPO_PPTES[808].NewCle;
}

function Validate_Personnes_Routages_24(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[808];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[808].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Routages_24(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Routages_24(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[808].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Routages_24").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=false;
top.document.getElementById("Update_Personnes_Routages_24").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[808].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[808].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Routages_24()
{
 TAB_COMPO_PPTES[808].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[808].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[814];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[815];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[816];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[817];
 Esclave_3.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Routages_24").disabled=true;
top.document.getElementById("Annuler_Personnes_Routages_24").disabled=true;
top.document.getElementById("Insert_Personnes_Routages_24").disabled=false;
top.document.getElementById("Delete_Personnes_Routages_24").disabled=false;
top.document.getElementById("Update_Personnes_Routages_24").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Routage
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Routage()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Routage");
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Relances
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Relances()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Relances");
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Relances des adhérents
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Relances_des_adhérents()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Relances_des_adhérents");
}





function journal_Chargement()
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
var Col_N0_Déf__De_Personnes_Adresses_9=new clAttribut("ad_def","adresse",null);

var Col_N1_CP_De_Personnes_Adresses_9=new clAttribut("cp_codepostal","codepostal",null);

var Joint_Col_N1_CP_De_Personnes_Adresses_9=new clJointureMulti("adresse",
	new Array(
	new stJointure("codepostal","cp_numero","cp_numero",null,true)
	));
var Col_N2_Ville_De_Personnes_Adresses_9=new clAttribut("vi_nom","ville",null);

var Joint_Col_N2_Ville_De_Personnes_Adresses_9=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,true)
	));
var Col_N3_Canton_De_Personnes_Adresses_9=new clAttribut("ct_nom","canton",null);

var Joint_Col_N3_Canton_De_Personnes_Adresses_9=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,true)
	,new stJointure("canton","ct_numero","ct_numero",null,true)
	));
var Personnes_Apt_ou_Dest__10=new clAttribut("ad_ligne2","adresse",null);


	/* Ce composant représente: adresse.ad_ligne2 sous le nom "Apt ou Dest." */
var Compo_Personnes_Apt_ou_Dest__10=new clCompoTextBox(Personnes_Apt_ou_Dest__10,null,"Apt ou Dest.",false,false);
var Personnes_Bat__étage____11=new clAttribut("ad_ligne3","adresse",null);


	/* Ce composant représente: adresse.ad_ligne3 sous le nom "Bat, étage..." */
var Compo_Personnes_Bat__étage____11=new clCompoTextBox(Personnes_Bat__étage____11,null,"Bat, étage...",false,false);
var Personnes_N__et_Voie_12=new clAttribut("ad_ligne4","adresse",null);


	/* Ce composant représente: adresse.ad_ligne4 sous le nom "N° et Voie" */
var Compo_Personnes_N__et_Voie_12=new clCompoTextBox(Personnes_N__et_Voie_12,null,"N° et Voie",false,false);
var Personnes_BP_ou_Lieu_dit_13=new clAttribut("ad_ligne5","adresse",null);


	/* Ce composant représente: adresse.ad_ligne5 sous le nom "BP ou Lieu-dit" */
var Compo_Personnes_BP_ou_Lieu_dit_13=new clCompoTextBox(Personnes_BP_ou_Lieu_dit_13,null,"BP ou Lieu-dit",false,false);
var Personnes_Code_postal_14=new clAttribut("cp_codepostal","codepostal",null);


	/* Ce composant représente: codepostal.cp_codepostal sous le nom "Code postal" */
var Compo_Personnes_Code_postal_14=new clCompoListeDeroulanteSimple(Personnes_Code_postal_14,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_CP_Personne=new clInterfaceFiltrageContenuHautBas()),"Code postal");
var Joint_Esclave_Personnes_Code_postal_14=new clJointureMulti("adresse",
	new Array(
	new stJointure("codepostal","cp_numero","cp_numero",null,false)
	));
var Personnes_Ville_15=new clAttribut("vi_nom","ville",null);


	/* Ce composant représente: ville.vi_nom sous le nom "Ville" */
var Compo_Personnes_Ville_15=new clCompoListeDeroulanteSimple(Personnes_Ville_15,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Ville_Personne=new clInterfaceFiltrageContenuHautBas(Filtre_CP_Personne)),"Ville");
var Joint_Esclave_Personnes_Ville_15=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,false)
	));
var Personnes_Adresse_par_défaut_16=new clAttribut("ad_default","adresse",null);


	/* Ce composant représente: adresse.ad_default sous le nom "Adresse par défaut" */
var Compo_Personnes_Adresse_par_défaut_16=new clCompoCheckBox(Personnes_Adresse_par_défaut_16,null,"Adresse par défaut");
var Personnes_Adresses_9=new clEnsembleAttributs("adresse",
	new Array(
	new clLiaison(null,Col_N0_Déf__De_Personnes_Adresses_9)
	,new clLiaison(Joint_Col_N1_CP_De_Personnes_Adresses_9,Col_N1_CP_De_Personnes_Adresses_9)
	,new clLiaison(Joint_Col_N2_Ville_De_Personnes_Adresses_9,Col_N2_Ville_De_Personnes_Adresses_9)
	,new clLiaison(Joint_Col_N3_Canton_De_Personnes_Adresses_9,Col_N3_Canton_De_Personnes_Adresses_9)
	),
	new Array(
	new clLiaison(null,Personnes_Apt_ou_Dest__10)
	,new clLiaison(null,Personnes_Bat__étage____11)
	,new clLiaison(null,Personnes_N__et_Voie_12)
	,new clLiaison(null,Personnes_BP_ou_Lieu_dit_13)
	,new clLiaison(Joint_Esclave_Personnes_Code_postal_14,Personnes_Code_postal_14)
	,new clLiaison(Joint_Esclave_Personnes_Ville_15,Personnes_Ville_15)
	,new clLiaison(null,Personnes_Adresse_par_défaut_16)
	));

var Titre_Personnes_Adresses_9=new Array("Déf.","CP","Ville","Canton");

	/* Ce composant représente: des éléments de la table adresse sous le nom "Adresses" */
var Compo_Personnes_Adresses_9=new clCompoListe(Personnes_Adresses_9,null,Titre_Personnes_Adresses_9,"Adresses",true,false);
var Joint_Esclave_Personnes_Adresses_9=new clJointureMulti("personne",
	new Array(
	new stJointure("adresse","pe_numero","pe_numero",null,false)
	));
var Col_N0_Type_De_Personnes_Contact_17=new clAttribut("ck_nom","contacttype",null);

var Joint_Col_N0_Type_De_Personnes_Contact_17=new clJointureMulti("contact",
	new Array(
	new stJointure("contacttype","ck_numero","ck_numero",null,true)
	));
var Col_N1_Coordonnée_De_Personnes_Contact_17=new clAttribut("cn_coordonnee","contact",null);

var Personnes_Type_18=new clAttribut("ck_nom","contacttype",null);


	/* Ce composant représente: contacttype.ck_nom sous le nom "Type" */
var Compo_Personnes_Type_18=new clCompoListeDeroulanteSimple(Personnes_Type_18,null,"Type");
var Joint_Esclave_Personnes_Type_18=new clJointureMulti("contact",
	new Array(
	new stJointure("contacttype","ck_numero","ck_numero",null,false)
	));
var Personnes_Coordonnée_19=new clAttribut("cn_coordonnee","contact",null);


	/* Ce composant représente: contact.cn_coordonnee sous le nom "Coordonnée" */
var Compo_Personnes_Coordonnée_19=new clCompoTextBox(Personnes_Coordonnée_19,null,"Coordonnée",false,false);
var Personnes_Contact_17=new clEnsembleAttributs("contact",
	new Array(
	new clLiaison(Joint_Col_N0_Type_De_Personnes_Contact_17,Col_N0_Type_De_Personnes_Contact_17)
	,new clLiaison(null,Col_N1_Coordonnée_De_Personnes_Contact_17)
	),
	new Array(
	new clLiaison(Joint_Esclave_Personnes_Type_18,Personnes_Type_18)
	,new clLiaison(null,Personnes_Coordonnée_19)
	));

var Titre_Personnes_Contact_17=new Array("Type","Coordonnée");

	/* Ce composant représente: des éléments de la table contact sous le nom "Contact" */
var Compo_Personnes_Contact_17=new clCompoListe(Personnes_Contact_17,null,Titre_Personnes_Contact_17,"Contact",true,false);
var Joint_Esclave_Personnes_Contact_17=new clJointureMulti("personne",
	new Array(
	new stJointure("contact","pe_numero","pe_numero",null,false)
	));
var Col_N0_Attribut_De_Personnes_Attributs_20=new clAttribut("ta_nom","typeattribut",null);

var Joint_Col_N0_Attribut_De_Personnes_Attributs_20=new clJointureMulti("attribut",
	new Array(
	new stJointure("typeattribut","ta_numero","ta_numero",null,true)
	));
var Col_N1_Valeur_De_Personnes_Attributs_20=new clAttribut("cr_libelle","categorie",null);

var Joint_Col_N1_Valeur_De_Personnes_Attributs_20=new clJointureMulti("attribut",
	new Array(
	new stJointure("categorie","cr_numero","cr_numero",null,true)
	));
var Personnes_Attribut_21=new clAttribut("ta_nom","typeattribut",null);


	/* Ce composant représente: typeattribut.ta_nom sous le nom "Attribut" */
var Compo_Personnes_Attribut_21=new clCompoListeDeroulanteSimple(Personnes_Attribut_21,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Typeattribut_Personne=new clInterfaceFiltrageContenuHautBas()),"Attribut");
var Joint_Esclave_Personnes_Attribut_21=new clJointureMulti("attribut",
	new Array(
	new stJointure("typeattribut","ta_numero","ta_numero",null,false)
	));
var Personnes_Valeur_22=new clAttribut("cr_libelle","categorie",null);


	/* Ce composant représente: categorie.cr_libelle sous le nom "Valeur" */
var Compo_Personnes_Valeur_22=new clCompoListeDeroulanteSimple(Personnes_Valeur_22,null,"Valeur");
var Joint_Esclave_Personnes_Valeur_22=new clJointureMulti("attribut",
	new Array(
	new stJointure("categorie","cr_numero","cr_numero",null,false)
	));
var Personnes_Détail_23=new clAttribut("at_valeur","attribut",null);


	/* Ce composant représente: attribut.at_valeur sous le nom "Détail" */
var Compo_Personnes_Détail_23=new clCompoTextBox(Personnes_Détail_23,null,"Détail",false,true);
var Personnes_Attributs_20=new clEnsembleAttributs("attribut",
	new Array(
	new clLiaison(Joint_Col_N0_Attribut_De_Personnes_Attributs_20,Col_N0_Attribut_De_Personnes_Attributs_20)
	,new clLiaison(Joint_Col_N1_Valeur_De_Personnes_Attributs_20,Col_N1_Valeur_De_Personnes_Attributs_20)
	),
	new Array(
	new clLiaison(Joint_Esclave_Personnes_Attribut_21,Personnes_Attribut_21)
	,new clLiaison(Joint_Esclave_Personnes_Valeur_22,Personnes_Valeur_22)
	,new clLiaison(null,Personnes_Détail_23)
	));

var Titre_Personnes_Attributs_20=new Array("Attribut","Valeur");

	/* Ce composant représente: des éléments de la table attribut sous le nom "Attributs" */
var Compo_Personnes_Attributs_20=new clCompoListe(Personnes_Attributs_20,null,Titre_Personnes_Attributs_20,"Attributs",true,false);
var Joint_Esclave_Personnes_Attributs_20=new clJointureMulti("personne",
	new Array(
	new stJointure("attribut","pe_numero","pe_numero",null,false)
	));
var Col_N0_Début_De_Personnes_Routages_24=new clAttribut("ro_debutservice","routage",null);

var Col_N1_Fin_De_Personnes_Routages_24=new clAttribut("ro_finservice","routage",null);

var Col_N2_Qté__De_Personnes_Routages_24=new clAttribut("ro_quantite","routage",null);

var Col_N3_Adresse_De_Personnes_Routages_24=new clAttribut("ad_libelle","adresse",null);

var Joint_Col_N3_Adresse_De_Personnes_Routages_24=new clJointureMulti("routage",
	new Array(
	new stJointure("adresse","ad_numero","ad_numero",null,true)
	));
var Col_N4_Facture_De_Personnes_Routages_24=new clAttribut("fa_numfact","facture",null);

var Joint_Col_N4_Facture_De_Personnes_Routages_24=new clJointureMulti("routage",
	new Array(
	new stJointure("facture","fa_numero","fa_numero",null,true)
	));
var Personnes_Début_25=new clAttribut("ro_debutservice","routage",null);


	/* Ce composant représente: routage.ro_debutservice sous le nom "Début" */
var Compo_Personnes_Début_25=new clCompoTextBox(Personnes_Début_25,null,"Début",false,false);
var Personnes_Fin_26=new clAttribut("ro_finservice","routage",null);


	/* Ce composant représente: routage.ro_finservice sous le nom "Fin" */
var Compo_Personnes_Fin_26=new clCompoTextBox(Personnes_Fin_26,null,"Fin",false,false);
var Personnes_Quantité_27=new clAttribut("ro_quantite","routage",null);


	/* Ce composant représente: routage.ro_quantite sous le nom "Quantité" */
var Compo_Personnes_Quantité_27=new clCompoTextBox(Personnes_Quantité_27,null,"Quantité",false,false);
var Personnes_Suspendre_les_relances_28=new clAttribut("ro_suspendu","routage",null);


	/* Ce composant représente: routage.ro_suspendu sous le nom "Suspendre les relances" */
var Compo_Personnes_Suspendre_les_relances_28=new clCompoCheckBox(Personnes_Suspendre_les_relances_28,null,"Suspendre les relances");
var Personnes_Routages_24=new clEnsembleAttributs("routage",
	new Array(
	new clLiaison(null,Col_N0_Début_De_Personnes_Routages_24)
	,new clLiaison(null,Col_N1_Fin_De_Personnes_Routages_24)
	,new clLiaison(null,Col_N2_Qté__De_Personnes_Routages_24)
	,new clLiaison(Joint_Col_N3_Adresse_De_Personnes_Routages_24,Col_N3_Adresse_De_Personnes_Routages_24)
	,new clLiaison(Joint_Col_N4_Facture_De_Personnes_Routages_24,Col_N4_Facture_De_Personnes_Routages_24)
	),
	new Array(
	new clLiaison(null,Personnes_Début_25)
	,new clLiaison(null,Personnes_Fin_26)
	,new clLiaison(null,Personnes_Quantité_27)
	,new clLiaison(null,Personnes_Suspendre_les_relances_28)
	));

var Titre_Personnes_Routages_24=new Array("Début","Fin","Qté.","Adresse","Facture");

	/* Ce composant représente: des éléments de la table routage sous le nom "Routages" */
var Compo_Personnes_Routages_24=new clCompoListe(Personnes_Routages_24,null,Titre_Personnes_Routages_24,"Routages",true,false);
var Joint_Esclave_Personnes_Routages_24=new clJointureMulti("personne",
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
	,new clLiaison(Joint_Esclave_Personnes_Adresses_9,Personnes_Adresses_9)
	,new clLiaison(Joint_Esclave_Personnes_Contact_17,Personnes_Contact_17)
	,new clLiaison(Joint_Esclave_Personnes_Attributs_20,Personnes_Attributs_20)
	,new clLiaison(Joint_Esclave_Personnes_Routages_24,Personnes_Routages_24)
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

	/* On l'ajoute au tableau global à l'indice 768*/
top.TAB_GLOBAL_COMPO[768]=Compo_Personnes_Liste_des_personnes0;

	/* Ce composant représente: des éléments de la table personne sous le nom "Numéro" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Numéro_1.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 771*/
top.TAB_GLOBAL_COMPO[771]=Compo_Personnes_Numéro_1;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Titre ou F.J." */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Personnes_Titre_ou_F_J__2.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 772*/
top.TAB_GLOBAL_COMPO[772]=Compo_Personnes_Titre_ou_F_J__2;

	/* Ce composant représente: des éléments de la table personne sous le nom "Nom ou D.S." */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Nom_ou_D_S__3.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 773*/
top.TAB_GLOBAL_COMPO[773]=Compo_Personnes_Nom_ou_D_S__3;

	/* Ce composant représente: des éléments de la table personne sous le nom "Prénom" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Prénom_4.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 774*/
top.TAB_GLOBAL_COMPO[774]=Compo_Personnes_Prénom_4;

	/* Ce composant représente: des éléments de la table personne sous le nom "N°TVA intrac." */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_N_TVA_intrac__5.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 775*/
top.TAB_GLOBAL_COMPO[775]=Compo_Personnes_N_TVA_intrac__5;

	/* Ce composant représente: des éléments de la table personne sous le nom "Né(e) le" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Né_e__le_6.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 776*/
top.TAB_GLOBAL_COMPO[776]=Compo_Personnes_Né_e__le_6;

	/* Ce composant représente: des éléments de la table personne sous le nom "La personne est active (et peut être contactée)" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 777*/
top.TAB_GLOBAL_COMPO[777]=Compo_Personnes_La_personne_est_active__et_peut_être_contactée__7;

	/* Ce composant représente: vue_cotisation.undefined sous le nom "Cotisations" */
 if(ALeDroit(0,"vue_cotisation"))
 {
Compo_Personnes_Cotisations_8.GenererXUL(top.document.getElementById("Personnes_Cotisations_8"));

 }

	/* On l'ajoute au tableau global à l'indice 778*/
top.TAB_GLOBAL_COMPO[778]=Compo_Personnes_Cotisations_8;

	/* Ce composant représente: adresse.undefined sous le nom "Adresses" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Adresses_9.GenererXUL(top.document.getElementById("Personnes_Adresses_9"));

 }

	/* On l'ajoute au tableau global à l'indice 785*/
top.TAB_GLOBAL_COMPO[785]=Compo_Personnes_Adresses_9;

	/* Ce composant représente: des éléments de la table adresse sous le nom "Apt ou Dest." */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Apt_ou_Dest__10.GenererXUL(top.document.getElementById("Personnes_Adresses_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 790*/
top.TAB_GLOBAL_COMPO[790]=Compo_Personnes_Apt_ou_Dest__10;

	/* Ce composant représente: des éléments de la table adresse sous le nom "Bat, étage..." */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Bat__étage____11.GenererXUL(top.document.getElementById("Personnes_Adresses_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 791*/
top.TAB_GLOBAL_COMPO[791]=Compo_Personnes_Bat__étage____11;

	/* Ce composant représente: des éléments de la table adresse sous le nom "N° et Voie" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_N__et_Voie_12.GenererXUL(top.document.getElementById("Personnes_Adresses_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 792*/
top.TAB_GLOBAL_COMPO[792]=Compo_Personnes_N__et_Voie_12;

	/* Ce composant représente: des éléments de la table adresse sous le nom "BP ou Lieu-dit" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_BP_ou_Lieu_dit_13.GenererXUL(top.document.getElementById("Personnes_Adresses_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 793*/
top.TAB_GLOBAL_COMPO[793]=Compo_Personnes_BP_ou_Lieu_dit_13;

	/* Ce composant représente: des éléments de la table codepostal sous le nom "Code postal" */
var Joint_Filtre_CP_Personne=new clJointureMulti("codepostal",
	new Array(
		new stJointure("villecp","cp_numero","cp_numero",null,false),
		new stJointure("ville","vi_numero","vi_numero",null,false)));
Filtre_CP_Personne.setComposant(Compo_Personnes_Ville_15,Joint_Filtre_CP_Personne);
 if(ALeDroit(0,"codepostal"))
 {
Compo_Personnes_Code_postal_14.GenererXUL(top.document.getElementById("Personnes_Adresses_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 794*/
top.TAB_GLOBAL_COMPO[794]=Compo_Personnes_Code_postal_14;

	/* Ce composant représente: des éléments de la table ville sous le nom "Ville" */
var Joint_Filtre_Ville_Personne=new clJointureMulti("ville",
	new Array(
		new stJointure("villecp","vi_numero","vi_numero",null,false),
		new stJointure("codepostal","cp_numero","cp_numero",null,false)));
Filtre_Ville_Personne.setComposant(Compo_Personnes_Code_postal_14,Joint_Filtre_Ville_Personne);
 if(ALeDroit(0,"ville"))
 {
Compo_Personnes_Ville_15.GenererXUL(top.document.getElementById("Personnes_Adresses_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 795*/
top.TAB_GLOBAL_COMPO[795]=Compo_Personnes_Ville_15;

	/* Ce composant représente: des éléments de la table adresse sous le nom "Adresse par défaut" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Adresse_par_défaut_16.GenererXUL(top.document.getElementById("Personnes_Adresses_9_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 796*/
top.TAB_GLOBAL_COMPO[796]=Compo_Personnes_Adresse_par_défaut_16;

	/* Ce composant représente: contact.undefined sous le nom "Contact" */
 if(ALeDroit(0,"contact"))
 {
Compo_Personnes_Contact_17.GenererXUL(top.document.getElementById("Personnes_Contact_17"));

 }

	/* On l'ajoute au tableau global à l'indice 797*/
top.TAB_GLOBAL_COMPO[797]=Compo_Personnes_Contact_17;

	/* Ce composant représente: des éléments de la table contacttype sous le nom "Type" */
 if(ALeDroit(0,"contacttype"))
 {
Compo_Personnes_Type_18.GenererXUL(top.document.getElementById("Personnes_Contact_17_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 800*/
top.TAB_GLOBAL_COMPO[800]=Compo_Personnes_Type_18;

	/* Ce composant représente: des éléments de la table contact sous le nom "Coordonnée" */
 if(ALeDroit(0,"contact"))
 {
Compo_Personnes_Coordonnée_19.GenererXUL(top.document.getElementById("Personnes_Contact_17_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 801*/
top.TAB_GLOBAL_COMPO[801]=Compo_Personnes_Coordonnée_19;

	/* Ce composant représente: attribut.undefined sous le nom "Attributs" */
 if(ALeDroit(0,"attribut"))
 {
Compo_Personnes_Attributs_20.GenererXUL(top.document.getElementById("Personnes_Attributs_20"));

 }

	/* On l'ajoute au tableau global à l'indice 802*/
top.TAB_GLOBAL_COMPO[802]=Compo_Personnes_Attributs_20;

	/* Ce composant représente: des éléments de la table typeattribut sous le nom "Attribut" */
var Joint_Filtre_Typeattribut_Personne=new clJointureMulti("typeattribut",
	new Array(
		new stJointure("categorie","ta_numero","ta_numero",null,false),
		new stJointure("categorie","cr_numero","cr_numero",null,false)));
Filtre_Typeattribut_Personne.setComposant(Compo_Personnes_Valeur_22,Joint_Filtre_Typeattribut_Personne);
 if(ALeDroit(0,"typeattribut"))
 {
Compo_Personnes_Attribut_21.GenererXUL(top.document.getElementById("Personnes_Attributs_20_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 805*/
top.TAB_GLOBAL_COMPO[805]=Compo_Personnes_Attribut_21;

	/* Ce composant représente: des éléments de la table categorie sous le nom "Valeur" */
 if(ALeDroit(0,"categorie"))
 {
Compo_Personnes_Valeur_22.GenererXUL(top.document.getElementById("Personnes_Attributs_20_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 806*/
top.TAB_GLOBAL_COMPO[806]=Compo_Personnes_Valeur_22;

	/* Ce composant représente: des éléments de la table attribut sous le nom "Détail" */
 if(ALeDroit(0,"attribut"))
 {
Compo_Personnes_Détail_23.GenererXUL(top.document.getElementById("Personnes_Attributs_20_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 807*/
top.TAB_GLOBAL_COMPO[807]=Compo_Personnes_Détail_23;

	/* Ce composant représente: routage.undefined sous le nom "Routages" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Routages_24.GenererXUL(top.document.getElementById("Personnes_Routages_24"));

 }

	/* On l'ajoute au tableau global à l'indice 808*/
top.TAB_GLOBAL_COMPO[808]=Compo_Personnes_Routages_24;

	/* Ce composant représente: des éléments de la table routage sous le nom "Début" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Début_25.GenererXUL(top.document.getElementById("Personnes_Routages_24_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 814*/
top.TAB_GLOBAL_COMPO[814]=Compo_Personnes_Début_25;

	/* Ce composant représente: des éléments de la table routage sous le nom "Fin" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Fin_26.GenererXUL(top.document.getElementById("Personnes_Routages_24_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 815*/
top.TAB_GLOBAL_COMPO[815]=Compo_Personnes_Fin_26;

	/* Ce composant représente: des éléments de la table routage sous le nom "Quantité" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Quantité_27.GenererXUL(top.document.getElementById("Personnes_Routages_24_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 816*/
top.TAB_GLOBAL_COMPO[816]=Compo_Personnes_Quantité_27;

	/* Ce composant représente: des éléments de la table routage sous le nom "Suspendre les relances" */
 if(ALeDroit(0,"routage"))
 {
Compo_Personnes_Suspendre_les_relances_28.GenererXUL(top.document.getElementById("Personnes_Routages_24_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 817*/
top.TAB_GLOBAL_COMPO[817]=Compo_Personnes_Suspendre_les_relances_28;
var Col_N0_N_Journal_De_Routage_Liste_des_routages0=new clAttribut("rc_numero","vue_current_routage",null);

var Col_N1_N_Client_De_Routage_Liste_des_routages0=new clAttribut("rc_ncli","vue_current_routage",null);

var Col_N2_Titre_De_Routage_Liste_des_routages0=new clAttribut("rc_titr","vue_current_routage",null);

var Col_N3_Nom_De_Routage_Liste_des_routages0=new clAttribut("rc_nomp","vue_current_routage",null);

var Col_N4_Comp__De_Routage_Liste_des_routages0=new clAttribut("rc_cide","vue_current_routage",null);

var Col_N5_Ligne_1_De_Routage_Liste_des_routages0=new clAttribut("rc_ad1","vue_current_routage",null);

var Col_N6_Ligne_2_De_Routage_Liste_des_routages0=new clAttribut("rc_ad2","vue_current_routage",null);

var Col_N7_Ligne_3_De_Routage_Liste_des_routages0=new clAttribut("rc_ad3","vue_current_routage",null);

var Col_N8_C_P__De_Routage_Liste_des_routages0=new clAttribut("rc_cpos","vue_current_routage",null);

var Col_N9_Ville_De_Routage_Liste_des_routages0=new clAttribut("rc_burd","vue_current_routage",null);

var Col_N10_Nb__Ex__De_Routage_Liste_des_routages0=new clAttribut("rc_nbex","vue_current_routage",null);

var Routage_Liste_des_routages0=new clEnsembleAttributs("vue_current_routage",
	new Array(
	new clLiaison(null,Col_N0_N_Journal_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N1_N_Client_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N2_Titre_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N3_Nom_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N4_Comp__De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N5_Ligne_1_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N6_Ligne_2_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N7_Ligne_3_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N8_C_P__De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N9_Ville_De_Routage_Liste_des_routages0)
	,new clLiaison(null,Col_N10_Nb__Ex__De_Routage_Liste_des_routages0)
	),
	null);

var Titre_Routage_Liste_des_routages0=new Array("N°Journal","N°Client","Titre","Nom","Comp.","Ligne 1","Ligne 2","Ligne 3","C.P.","Ville","Nb. Ex.");

	/* Ce composant représente: des éléments de la table vue_current_routage sous le nom "Liste des routages" */
var Compo_Routage_Liste_des_routages0=new clCompoListe(Routage_Liste_des_routages0,new Array(new clInterfaceFiltrageVide()),Titre_Routage_Liste_des_routages0,"Liste des routages",true,false);

	/* Ce composant représente: vue_current_routage.undefined sous le nom "Liste des routages" */
 if(ALeDroit(0,"vue_current_routage"))
 {
Compo_Routage_Liste_des_routages0.GenererXUL(top.document.getElementById("Routage_Liste_des_routages0"));

 }

	/* On l'ajoute au tableau global à l'indice 818*/
top.TAB_GLOBAL_COMPO[818]=Compo_Routage_Liste_des_routages0;
var Col_N0_Niveau_De_Relances_Liste_des_relances0=new clAttribut("rl_niveau","vue_current_relance",null);

var Col_N1_Dernier_N__De_Relances_Liste_des_relances0=new clAttribut("rl_derniernumero","vue_current_relance",null);

var Col_N2_N_Client_De_Relances_Liste_des_relances0=new clAttribut("pe_numero","vue_current_relance",null);

var Col_N3_Titre_De_Relances_Liste_des_relances0=new clAttribut("pe_titre","vue_current_relance",null);

var Col_N4_Nom_De_Relances_Liste_des_relances0=new clAttribut("pe_nom","vue_current_relance",null);

var Col_N5_Prénom_De_Relances_Liste_des_relances0=new clAttribut("pe_prenom","vue_current_relance",null);

var Col_N6_Ligne_2_De_Relances_Liste_des_relances0=new clAttribut("ad_ligne2","vue_current_relance",null);

var Col_N7_Ligne_3_De_Relances_Liste_des_relances0=new clAttribut("ad_ligne3","vue_current_relance",null);

var Col_N8_Ligne_4_De_Relances_Liste_des_relances0=new clAttribut("ad_ligne4","vue_current_relance",null);

var Col_N9_Ligne_5_De_Relances_Liste_des_relances0=new clAttribut("ad_ligne5","vue_current_relance",null);

var Col_N10_C_P__De_Relances_Liste_des_relances0=new clAttribut("cp_codepostal","vue_current_relance",null);

var Col_N11_Ville_De_Relances_Liste_des_relances0=new clAttribut("vi_nom","vue_current_relance",null);

var Col_N12_Téléphone_De_Relances_Liste_des_relances0=new clAttribut("rl_telephone","vue_current_relance",null);

var Col_N13_Portable_De_Relances_Liste_des_relances0=new clAttribut("rl_portable","vue_current_relance",null);

var Relances_Liste_des_relances0=new clEnsembleAttributs("vue_current_relance",
	new Array(
	new clLiaison(null,Col_N0_Niveau_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N1_Dernier_N__De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N2_N_Client_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N3_Titre_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N4_Nom_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N5_Prénom_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N6_Ligne_2_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N7_Ligne_3_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N8_Ligne_4_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N9_Ligne_5_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N10_C_P__De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N11_Ville_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N12_Téléphone_De_Relances_Liste_des_relances0)
	,new clLiaison(null,Col_N13_Portable_De_Relances_Liste_des_relances0)
	),
	null);

var Titre_Relances_Liste_des_relances0=new Array("Niveau","Dernier N°","N°Client","Titre","Nom","Prénom","Ligne 2","Ligne 3","Ligne 4","Ligne 5","C.P.","Ville","Téléphone","Portable");

	/* Ce composant représente: des éléments de la table vue_current_relance sous le nom "Liste des relances" */
var Compo_Relances_Liste_des_relances0=new clCompoListe(Relances_Liste_des_relances0,new Array(new clInterfaceFiltrageVide()),Titre_Relances_Liste_des_relances0,"Liste des relances",true,false);

	/* Ce composant représente: vue_current_relance.undefined sous le nom "Liste des relances" */
 if(ALeDroit(0,"vue_current_relance"))
 {
Compo_Relances_Liste_des_relances0.GenererXUL(top.document.getElementById("Relances_Liste_des_relances0"));

 }

	/* On l'ajoute au tableau global à l'indice 830*/
top.TAB_GLOBAL_COMPO[830]=Compo_Relances_Liste_des_relances0;
var Col_N0_N_Client_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("pe_numero","vue_current_relance_adherent",null);

var Col_N1_Titre_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("pe_titre","vue_current_relance_adherent",null);

var Col_N2_Nom_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("pe_nom","vue_current_relance_adherent",null);

var Col_N3_Prénom_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("pe_prenom","vue_current_relance_adherent",null);

var Col_N4_Ligne_2_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("ad_ligne2","vue_current_relance_adherent",null);

var Col_N5_Ligne_3_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("ad_ligne3","vue_current_relance_adherent",null);

var Col_N6_Ligne_4_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("ad_ligne4","vue_current_relance_adherent",null);

var Col_N7_Ligne_5_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("ad_ligne5","vue_current_relance_adherent",null);

var Col_N8_C_P__De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("cp_codepostal","vue_current_relance_adherent",null);

var Col_N9_Ville_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("vi_nom","vue_current_relance_adherent",null);

var Col_N10_Téléphone_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("rl_telephone","vue_current_relance_adherent",null);

var Col_N11_Portable_De_Relances_des_adhérents_Liste_des_relances_adhérents0=new clAttribut("rl_portable","vue_current_relance_adherent",null);

var Relances_des_adhérents_Liste_des_relances_adhérents0=new clEnsembleAttributs("vue_current_relance_adherent",
	new Array(
	new clLiaison(null,Col_N0_N_Client_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N1_Titre_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N2_Nom_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N3_Prénom_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N4_Ligne_2_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N5_Ligne_3_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N6_Ligne_4_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N7_Ligne_5_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N8_C_P__De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N9_Ville_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N10_Téléphone_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	,new clLiaison(null,Col_N11_Portable_De_Relances_des_adhérents_Liste_des_relances_adhérents0)
	),
	null);

var Titre_Relances_des_adhérents_Liste_des_relances_adhérents0=new Array("N°Client","Titre","Nom","Prénom","Ligne 2","Ligne 3","Ligne 4","Ligne 5","C.P.","Ville","Téléphone","Portable");

	/* Ce composant représente: des éléments de la table vue_current_relance_adherent sous le nom "Liste des relances adhérents" */
var Compo_Relances_des_adhérents_Liste_des_relances_adhérents0=new clCompoListe(Relances_des_adhérents_Liste_des_relances_adhérents0,new Array(new clInterfaceFiltrageVide()),Titre_Relances_des_adhérents_Liste_des_relances_adhérents0,"Liste des relances adhérents",true,false);

	/* Ce composant représente: vue_current_relance_adherent.undefined sous le nom "Liste des relances adhérents" */
 if(ALeDroit(0,"vue_current_relance_adherent"))
 {
Compo_Relances_des_adhérents_Liste_des_relances_adhérents0.GenererXUL(top.document.getElementById("Relances_des_adhérents_Liste_des_relances_adhérents0"));

 }

	/* On l'ajoute au tableau global à l'indice 845*/
top.TAB_GLOBAL_COMPO[845]=Compo_Relances_des_adhérents_Liste_des_relances_adhérents0;
 if(ALeDroit(5,"personne"))
 {
/* On refresh les composants non dépendents de l'onget Personnes*/
var Composant_0 = TAB_GLOBAL_COMPO[768];
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
 if(ALeDroit(2,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Adresses_9").hidden=true;

 }
 if(ALeDroit(4,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Adresses_9").hidden=true;

 }
 if(ALeDroit(1,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Adresses_9").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Adresses_9").hidden=true;
        top.document.getElementById("Annuler_Personnes_Adresses_9").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"contact"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Contact_17").hidden=true;

 }
 if(ALeDroit(4,"contact"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Contact_17").hidden=true;

 }
 if(ALeDroit(1,"contact"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Contact_17").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Contact_17").hidden=true;
        top.document.getElementById("Annuler_Personnes_Contact_17").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"attribut"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Attributs_20").hidden=true;

 }
 if(ALeDroit(4,"attribut"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Attributs_20").hidden=true;

 }
 if(ALeDroit(1,"attribut"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Attributs_20").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Attributs_20").hidden=true;
        top.document.getElementById("Annuler_Personnes_Attributs_20").hidden=true;
}
var nb_button=0
 if(ALeDroit(2,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Insert_Personnes_Routages_24").hidden=true;

 }
 if(ALeDroit(4,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Routages_24").hidden=true;

 }
 if(ALeDroit(1,"routage"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Routages_24").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Routages_24").hidden=true;
        top.document.getElementById("Annuler_Personnes_Routages_24").hidden=true;
}
 if(ALeDroit(5,"vue_current_routage"))
 {
/* On refresh les composants non dépendents de l'onget Routage*/
var Composant_0 = TAB_GLOBAL_COMPO[818];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Routage").hidden=true;
if (top.document.getElementById("Onglet_Routage").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
 if(ALeDroit(5,"vue_current_relance"))
 {
/* On refresh les composants non dépendents de l'onget Relances*/
var Composant_0 = TAB_GLOBAL_COMPO[830];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Relances").hidden=true;
if (top.document.getElementById("Onglet_Relances").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
 if(ALeDroit(5,"vue_current_relance_adherent"))
 {
/* On refresh les composants non dépendents de l'onget Relances des adhérents*/
var Composant_0 = TAB_GLOBAL_COMPO[845];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Relances_des_adhérents").hidden=true;
if (top.document.getElementById("Onglet_Relances_des_adhérents").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
ConstruireOngletEstLie("tabbox_Personnes_Liste_des_personnes0",768);
Compo_Personnes_Liste_des_personnes0.OnChangeUser=RefreshOngletEstLie;
Compo_Personnes_Liste_des_personnes0.OnChangeUserParams=Compo_Personnes_Liste_des_personnes0;
}
