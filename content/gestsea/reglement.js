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
var TAB_COMPO_PPTES = new Array(661);
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
 TAB_COMPO_PPTES[625].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[625].NewCle = getNewCle("personne");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[625].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[630];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[631];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[632];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[633];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[634];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[635];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=false;
 var Esclave_6=TAB_GLOBAL_COMPO[636];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[625];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[625].NewCle;
}

function Delete_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[625].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[625];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[625].Action_en_cours = DELETE;
         User_Delete_Personnes_Liste_des_personnes0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Liste_des_personnes0()
{
 if (TAB_GLOBAL_COMPO[625].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[625].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[625].NewCle = TAB_GLOBAL_COMPO[625].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[625].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[630];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[631];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[632];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[633];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[634];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[635];
 Esclave_5.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=false;
 var Esclave_6=TAB_GLOBAL_COMPO[636];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=true;
return TAB_COMPO_PPTES[625].NewCle;
}

function Validate_Personnes_Liste_des_personnes0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[625];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[625].Action_en_cours){
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
 TAB_GLOBAL_COMPO[625].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[630];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[631];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[632];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[633];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[634];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[635];
 Esclave_5.ActiverComposant(false);
Annuler_Personnes_Adresses_7();
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=true;
 var Esclave_6=TAB_GLOBAL_COMPO[636];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[625].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[625].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Liste_des_personnes0()
{
 TAB_COMPO_PPTES[625].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[625].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[630];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[631];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[632];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[633];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[634];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[635];
 Esclave_5.ActiverComposant(false);
Annuler_Personnes_Adresses_7();
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=true;
 var Esclave_6=TAB_GLOBAL_COMPO[636];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Annuler_Personnes_Liste_des_personnes0").disabled=true;
top.document.getElementById("Insert_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Delete_Personnes_Liste_des_personnes0").disabled=false;
top.document.getElementById("Update_Personnes_Liste_des_personnes0").disabled=false;
}

function Insert_Personnes_Adresses_7()
{
 if (TAB_COMPO_PPTES[625].Action_en_cours == INSERT)
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
                        Insert_Personnes_Adresses_7();
                }
                 return;
         }
 TAB_COMPO_PPTES[636].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[636].NewCle = getNewCle("adresse");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[636].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[641];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[642];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[643];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[644];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[645];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[646];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[647];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[636];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[636].NewCle;
}

function Delete_Personnes_Adresses_7()
{
 if (TAB_GLOBAL_COMPO[636].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[636];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[636].Action_en_cours = DELETE;
         User_Delete_Personnes_Adresses_7(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Personnes_Adresses_7()
{
 if (TAB_GLOBAL_COMPO[636].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[636].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[636].NewCle = TAB_GLOBAL_COMPO[636].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[636].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[641];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[642];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[643];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[644];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[645];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[646];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[647];
 Esclave_6.ActiverComposant(true);
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=true;
return TAB_COMPO_PPTES[636].NewCle;
}

function Validate_Personnes_Adresses_7(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[636];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[636].Action_en_cours){
        case INSERT :
        if ((NewCle = User_Insert_Personnes_Adresses_7(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Personnes_Adresses_7(Maitre))==-1)
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
 TAB_GLOBAL_COMPO[636].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[641];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[642];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[643];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[644];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[645];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[646];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[647];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[636].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[636].Action_en_cours = null;
 return NewCle;
}

function Annuler_Personnes_Adresses_7()
{
 TAB_COMPO_PPTES[636].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[636].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[641];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[642];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[643];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[644];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[645];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[646];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[647];
 Esclave_6.ActiverComposant(false);
top.document.getElementById("Validate_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Annuler_Personnes_Adresses_7").disabled=true;
top.document.getElementById("Insert_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Delete_Personnes_Adresses_7").disabled=false;
top.document.getElementById("Update_Personnes_Adresses_7").disabled=false;
}






/* *********************************************** 
         FONCTIONS POUR L'ONGLET Réglement
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Réglement()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Réglement");
}

function Insert_Réglement_Liste_des_réglements0()
{
 TAB_COMPO_PPTES[648].Action_en_cours = INSERT;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[648].NewCle = getNewCle("reglement");
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[648].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[653];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[654];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[655];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[656];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[657];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[658];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[659];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[660];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=true;
 var Maitre=TAB_GLOBAL_COMPO[648];
 /* Pour une insertion on désectionne */
 var tree=Maitre.getComposantXul();
 if (tree.view!=null)
 {
         tree.currentIndex=-1;
         tree.view.selection.clearSelection();
 }
return TAB_COMPO_PPTES[648].NewCle;
}

function Delete_Réglement_Liste_des_réglements0()
{
 if (TAB_GLOBAL_COMPO[648].getCleVal()==-1)
 {
         alert("Vous devez sélectionner l'enregistrement à supprimer");
         return;
 }
 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[648];
 if (confirm("Voulez vous vraiment supprimer l'enregistrement en cours ?"))
 {
        TAB_COMPO_PPTES[648].Action_en_cours = DELETE;
         User_Delete_Réglement_Liste_des_réglements0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Réglement_Liste_des_réglements0()
{
 if (TAB_GLOBAL_COMPO[648].getCleVal()==-1)
 {
         alert("Vous devez selectionner l'enregistrement à mettre à jour");
         return -1;
 }
 TAB_COMPO_PPTES[648].Action_en_cours = UPDATE;
/* On calcule la nouvelle clé */
 TAB_COMPO_PPTES[648].NewCle = TAB_GLOBAL_COMPO[648].getCleVal();
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[648].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[653];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[654];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[655];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[656];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[657];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[658];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[659];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[660];
 Esclave_7.ActiverComposant(true);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=true;
return TAB_COMPO_PPTES[648].NewCle;
}

function Validate_Réglement_Liste_des_réglements0(retour)
{
 /* Retour à l'onget appellant si appelle par gérer */
if (retour==null)
        retour=true;

 /* On recupère le composant maitre  */
 var Maitre=TAB_GLOBAL_COMPO[648];
 /* On recupère la clé du nouvel enregistrement */
 var NewCle=null;
 switch(TAB_COMPO_PPTES[648].Action_en_cours){
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
 TAB_GLOBAL_COMPO[648].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[653];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[654];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[655];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[656];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[657];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[658];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[659];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[660];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=false;
 if (NewCle==null)
         NewCle=TAB_COMPO_PPTES[648].NewCle;
 Maitre.ForceNextSelection(NewCle)
 Maitre.RefreshTotal();
 if(retour)
 {
 }
 TAB_COMPO_PPTES[648].Action_en_cours = null;
 return NewCle;
}

function Annuler_Réglement_Liste_des_réglements0()
{
 TAB_COMPO_PPTES[648].Action_en_cours = null;
/* On désactive le composant maitre */
 TAB_GLOBAL_COMPO[648].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[653];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[654];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[655];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[656];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[657];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[658];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[659];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[660];
 Esclave_7.ActiverComposant(false);
top.document.getElementById("Validate_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Annuler_Réglement_Liste_des_réglements0").disabled=true;
top.document.getElementById("Insert_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Delete_Réglement_Liste_des_réglements0").disabled=false;
top.document.getElementById("Update_Réglement_Liste_des_réglements0").disabled=false;
}





function reglement_Chargement()
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
var Col_N0_N_Pers__De_Personnes_Liste_des_personnes0=new clAttribut("pe_numero","personne",null);

var Col_N1_Titre_De_Personnes_Liste_des_personnes0=new clAttribut("pe_titre","personne",null);

var Col_N2_Nom_____________De_Personnes_Liste_des_personnes0=new clAttribut("pe_nom","personne",null);

var Col_N3_Prénom_De_Personnes_Liste_des_personnes0=new clAttribut("pe_prenom","personne",null);

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
var Col_N0_Type_De_Personnes_Adresses_7=new clAttribut("ad_type","adresse",null);

var Col_N1_CP_De_Personnes_Adresses_7=new clAttribut("cp_codepostal","codepostal",null);

var Joint_Col_N1_CP_De_Personnes_Adresses_7=new clJointureMulti("adresse",
	new Array(
	new stJointure("codepostal","cp_numero","cp_numero",null,true)
	));
var Col_N2_Ville_De_Personnes_Adresses_7=new clAttribut("vi_nom","ville",null);

var Joint_Col_N2_Ville_De_Personnes_Adresses_7=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,true)
	));
var Col_N3_Canton_De_Personnes_Adresses_7=new clAttribut("ct_nom","canton",null);

var Joint_Col_N3_Canton_De_Personnes_Adresses_7=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,true)
	,new stJointure("canton","ct_numero","ct_numero",null,true)
	));
var Personnes_Type_8=new clAttribut("ak_nom","typeadresse",null);


	/* Ce composant représente: typeadresse.ak_nom sous le nom "Type" */
var Compo_Personnes_Type_8=new clCompoListeDeroulanteSimple(Personnes_Type_8,null,"Type");
var Joint_Esclave_Personnes_Type_8=new clJointureMulti("adresse",
	new Array(
	new stJointure("typeadresse","ak_numero","ak_numero",null,false)
	));
var Personnes_Apt_ou_Dest__9=new clAttribut("ad_ligne2","adresse",null);


	/* Ce composant représente: adresse.ad_ligne2 sous le nom "Apt ou Dest." */
var Compo_Personnes_Apt_ou_Dest__9=new clCompoTextBox(Personnes_Apt_ou_Dest__9,null,"Apt ou Dest.",false,false);
var Personnes_Bat__étage____10=new clAttribut("ad_ligne3","adresse",null);


	/* Ce composant représente: adresse.ad_ligne3 sous le nom "Bat, étage..." */
var Compo_Personnes_Bat__étage____10=new clCompoTextBox(Personnes_Bat__étage____10,null,"Bat, étage...",false,false);
var Personnes_N__et_Voie_11=new clAttribut("ad_ligne4","adresse",null);


	/* Ce composant représente: adresse.ad_ligne4 sous le nom "N° et Voie" */
var Compo_Personnes_N__et_Voie_11=new clCompoTextBox(Personnes_N__et_Voie_11,null,"N° et Voie",false,false);
var Personnes_BP_ou_Lieu_dit_12=new clAttribut("ad_ligne5","adresse",null);


	/* Ce composant représente: adresse.ad_ligne5 sous le nom "BP ou Lieu-dit" */
var Compo_Personnes_BP_ou_Lieu_dit_12=new clCompoTextBox(Personnes_BP_ou_Lieu_dit_12,null,"BP ou Lieu-dit",false,false);
var Personnes_Code_postal_13=new clAttribut("cp_codepostal","codepostal",null);


	/* Ce composant représente: codepostal.cp_codepostal sous le nom "Code postal" */
var Compo_Personnes_Code_postal_13=new clCompoListeDeroulanteSimple(Personnes_Code_postal_13,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_CP_Personne=new clInterfaceFiltrageContenuHautBas()),"Code postal");
var Joint_Esclave_Personnes_Code_postal_13=new clJointureMulti("adresse",
	new Array(
	new stJointure("codepostal","cp_numero","cp_numero",null,false)
	));
var Personnes_Ville_14=new clAttribut("vi_nom","ville",null);


	/* Ce composant représente: ville.vi_nom sous le nom "Ville" */
var Compo_Personnes_Ville_14=new clCompoListeDeroulanteSimple(Personnes_Ville_14,new Array(clCompoListeDeroulanteSimple.prototype.FiltreParDefaut(),Filtre_Ville_Personne=new clInterfaceFiltrageContenuHautBas(Filtre_CP_Personne)),"Ville");
var Joint_Esclave_Personnes_Ville_14=new clJointureMulti("adresse",
	new Array(
	new stJointure("ville","vi_numero","vi_numero",null,false)
	));
var Personnes_Adresses_7=new clEnsembleAttributs("adresse",
	new Array(
	new clLiaison(null,Col_N0_Type_De_Personnes_Adresses_7)
	,new clLiaison(Joint_Col_N1_CP_De_Personnes_Adresses_7,Col_N1_CP_De_Personnes_Adresses_7)
	,new clLiaison(Joint_Col_N2_Ville_De_Personnes_Adresses_7,Col_N2_Ville_De_Personnes_Adresses_7)
	,new clLiaison(Joint_Col_N3_Canton_De_Personnes_Adresses_7,Col_N3_Canton_De_Personnes_Adresses_7)
	),
	new Array(
	new clLiaison(Joint_Esclave_Personnes_Type_8,Personnes_Type_8)
	,new clLiaison(null,Personnes_Apt_ou_Dest__9)
	,new clLiaison(null,Personnes_Bat__étage____10)
	,new clLiaison(null,Personnes_N__et_Voie_11)
	,new clLiaison(null,Personnes_BP_ou_Lieu_dit_12)
	,new clLiaison(Joint_Esclave_Personnes_Code_postal_13,Personnes_Code_postal_13)
	,new clLiaison(Joint_Esclave_Personnes_Ville_14,Personnes_Ville_14)
	));

var Titre_Personnes_Adresses_7=new Array("Type","CP","Ville","Canton");

	/* Ce composant représente: des éléments de la table adresse sous le nom "Adresses" */
var Compo_Personnes_Adresses_7=new clCompoListe(Personnes_Adresses_7,null,Titre_Personnes_Adresses_7,"Adresses",true,false);
var Joint_Esclave_Personnes_Adresses_7=new clJointureMulti("personne",
	new Array(
	new stJointure("adresse","pe_numero","pe_numero",null,false)
	));
var Personnes_Liste_des_personnes0=new clEnsembleAttributs("personne",
	new Array(
	new clLiaison(null,Col_N0_N_Pers__De_Personnes_Liste_des_personnes0)
	,new clLiaison(null,Col_N1_Titre_De_Personnes_Liste_des_personnes0)
	,new clLiaison(null,Col_N2_Nom_____________De_Personnes_Liste_des_personnes0)
	,new clLiaison(null,Col_N3_Prénom_De_Personnes_Liste_des_personnes0)
	),
	new Array(
	new clLiaison(null,Personnes_Numéro_1)
	,new clLiaison(Joint_Esclave_Personnes_Titre_ou_F_J__2,Personnes_Titre_ou_F_J__2)
	,new clLiaison(null,Personnes_Nom_ou_D_S__3)
	,new clLiaison(null,Personnes_Prénom_4)
	,new clLiaison(null,Personnes_N_TVA_intrac__5)
	,new clLiaison(null,Personnes_Né_e__le_6)
	,new clLiaison(Joint_Esclave_Personnes_Adresses_7,Personnes_Adresses_7)
	));

var Titre_Personnes_Liste_des_personnes0=new Array("N°Pers.","Titre","Nom            ","Prénom");

	/* Ce composant représente: des éléments de la table personne sous le nom "Liste des personnes" */
var Compo_Personnes_Liste_des_personnes0=new clCompoListe(Personnes_Liste_des_personnes0,new Array(new clInterfaceFiltrageVide()),Titre_Personnes_Liste_des_personnes0,"Liste des personnes",true,false);

	/* Ce composant représente: personne.undefined sous le nom "Liste des personnes" */
Compo_Personnes_Liste_des_personnes0.AddCompoAddOn(new clAddon_Fctmenupopup("Rechercher",new Array("Par numéro","Par nom","Par code postal","Par ville","Par contact"),new Array(Recherche_Num,Recherche_Nom,Recherche_CP,Recherche_Ville,Recherche_Contact),new Array(Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0,Compo_Personnes_Liste_des_personnes0)));
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Liste_des_personnes0.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0"));

 }

	/* On l'ajoute au tableau global à l'indice 625*/
top.TAB_GLOBAL_COMPO[625]=Compo_Personnes_Liste_des_personnes0;

	/* Ce composant représente: des éléments de la table personne sous le nom "Numéro" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Numéro_1.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 630*/
top.TAB_GLOBAL_COMPO[630]=Compo_Personnes_Numéro_1;

	/* Ce composant représente: des éléments de la table naturepersonne sous le nom "Titre ou F.J." */
 if(ALeDroit(0,"naturepersonne"))
 {
Compo_Personnes_Titre_ou_F_J__2.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 631*/
top.TAB_GLOBAL_COMPO[631]=Compo_Personnes_Titre_ou_F_J__2;

	/* Ce composant représente: des éléments de la table personne sous le nom "Nom ou D.S." */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Nom_ou_D_S__3.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 632*/
top.TAB_GLOBAL_COMPO[632]=Compo_Personnes_Nom_ou_D_S__3;

	/* Ce composant représente: des éléments de la table personne sous le nom "Prénom" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Prénom_4.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 633*/
top.TAB_GLOBAL_COMPO[633]=Compo_Personnes_Prénom_4;

	/* Ce composant représente: des éléments de la table personne sous le nom "N°TVA intrac." */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_N_TVA_intrac__5.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 634*/
top.TAB_GLOBAL_COMPO[634]=Compo_Personnes_N_TVA_intrac__5;

	/* Ce composant représente: des éléments de la table personne sous le nom "Né(e) le" */
 if(ALeDroit(0,"personne"))
 {
Compo_Personnes_Né_e__le_6.GenererXUL(top.document.getElementById("Personnes_Liste_des_personnes0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 635*/
top.TAB_GLOBAL_COMPO[635]=Compo_Personnes_Né_e__le_6;

	/* Ce composant représente: adresse.undefined sous le nom "Adresses" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Adresses_7.GenererXUL(top.document.getElementById("Personnes_Adresses_7"));

 }

	/* On l'ajoute au tableau global à l'indice 636*/
top.TAB_GLOBAL_COMPO[636]=Compo_Personnes_Adresses_7;

	/* Ce composant représente: des éléments de la table typeadresse sous le nom "Type" */
 if(ALeDroit(0,"typeadresse"))
 {
Compo_Personnes_Type_8.GenererXUL(top.document.getElementById("Personnes_Adresses_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 641*/
top.TAB_GLOBAL_COMPO[641]=Compo_Personnes_Type_8;

	/* Ce composant représente: des éléments de la table adresse sous le nom "Apt ou Dest." */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Apt_ou_Dest__9.GenererXUL(top.document.getElementById("Personnes_Adresses_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 642*/
top.TAB_GLOBAL_COMPO[642]=Compo_Personnes_Apt_ou_Dest__9;

	/* Ce composant représente: des éléments de la table adresse sous le nom "Bat, étage..." */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_Bat__étage____10.GenererXUL(top.document.getElementById("Personnes_Adresses_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 643*/
top.TAB_GLOBAL_COMPO[643]=Compo_Personnes_Bat__étage____10;

	/* Ce composant représente: des éléments de la table adresse sous le nom "N° et Voie" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_N__et_Voie_11.GenererXUL(top.document.getElementById("Personnes_Adresses_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 644*/
top.TAB_GLOBAL_COMPO[644]=Compo_Personnes_N__et_Voie_11;

	/* Ce composant représente: des éléments de la table adresse sous le nom "BP ou Lieu-dit" */
 if(ALeDroit(0,"adresse"))
 {
Compo_Personnes_BP_ou_Lieu_dit_12.GenererXUL(top.document.getElementById("Personnes_Adresses_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 645*/
top.TAB_GLOBAL_COMPO[645]=Compo_Personnes_BP_ou_Lieu_dit_12;

	/* Ce composant représente: des éléments de la table codepostal sous le nom "Code postal" */
var Joint_Filtre_CP_Personne=new clJointureMulti("codepostal",
	new Array(
		new stJointure("villecp","cp_numero","cp_numero",null,false),
		new stJointure("ville","vi_numero","vi_numero",null,false)));
Filtre_CP_Personne.setComposant(Compo_Personnes_Ville_14,Joint_Filtre_CP_Personne);
 if(ALeDroit(0,"codepostal"))
 {
Compo_Personnes_Code_postal_13.GenererXUL(top.document.getElementById("Personnes_Adresses_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 646*/
top.TAB_GLOBAL_COMPO[646]=Compo_Personnes_Code_postal_13;

	/* Ce composant représente: des éléments de la table ville sous le nom "Ville" */
var Joint_Filtre_Ville_Personne=new clJointureMulti("ville",
	new Array(
		new stJointure("villecp","vi_numero","vi_numero",null,false),
		new stJointure("codepostal","cp_numero","cp_numero",null,false)));
Filtre_Ville_Personne.setComposant(Compo_Personnes_Code_postal_13,Joint_Filtre_Ville_Personne);
 if(ALeDroit(0,"ville"))
 {
Compo_Personnes_Ville_14.GenererXUL(top.document.getElementById("Personnes_Adresses_7_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 647*/
top.TAB_GLOBAL_COMPO[647]=Compo_Personnes_Ville_14;
var Col_N0_N_Reg__De_Réglement_Liste_des_réglements0=new clAttribut("rg_numero","reglement",null);

var Col_N1_N_Pers__De_Réglement_Liste_des_réglements0=new clAttribut("pe_numero","reglement",null);

var Col_N2_Date____De_Réglement_Liste_des_réglements0=new clAttribut("rg_date","reglement",null);

var Col_N3_Montant_De_Réglement_Liste_des_réglements0=new clAttribut("rg_montant","reglement",null);

var Réglement_Personne_1=new clAttribut("pe_libelle","personne",null);


	/* Ce composant représente: personne.pe_libelle sous le nom "Personne" */
var Compo_Réglement_Personne_1=new clCompoListeDeroulanteSimple(Réglement_Personne_1,null,"Personne");
var Joint_Esclave_Réglement_Personne_1=new clJointureMulti("reglement",
	new Array(
	new stJointure("personne","pe_numero","pe_numero",null,false)
	));
var Réglement_Date_2=new clAttribut("rg_date","reglement",null);


	/* Ce composant représente: reglement.rg_date sous le nom "Date" */
var Compo_Réglement_Date_2=new clCompoTextBox(Réglement_Date_2,null,"Date",false,false);
var Réglement_Montant_3=new clAttribut("rg_montant","reglement",null);


	/* Ce composant représente: reglement.rg_montant sous le nom "Montant" */
var Compo_Réglement_Montant_3=new clCompoTextBox(Réglement_Montant_3,null,"Montant",false,false);
var Réglement_Mode_4=new clAttribut("mr_libelle","modereglement",null);


	/* Ce composant représente: modereglement.mr_libelle sous le nom "Mode" */
var Compo_Réglement_Mode_4=new clCompoListeDeroulanteSimple(Réglement_Mode_4,null,"Mode");
var Joint_Esclave_Réglement_Mode_4=new clJointureMulti("reglement",
	new Array(
	new stJointure("modereglement","mr_numero","mr_numero",null,false)
	));
var Réglement_Banque_5=new clAttribut("rg_libellebanque","reglement",null);


	/* Ce composant représente: reglement.rg_libellebanque sous le nom "Banque" */
var Compo_Réglement_Banque_5=new clCompoTextBox(Réglement_Banque_5,null,"Banque",false,false);
var Réglement_N__compte_6=new clAttribut("rg_numerocompte","reglement",null);


	/* Ce composant représente: reglement.rg_numerocompte sous le nom "N° compte" */
var Compo_Réglement_N__compte_6=new clCompoTextBox(Réglement_N__compte_6,null,"N° compte",false,false);
var Réglement_Référence_7=new clAttribut("rg_reference","reglement",null);


	/* Ce composant représente: reglement.rg_reference sous le nom "Référence" */
var Compo_Réglement_Référence_7=new clCompoTextBox(Réglement_Référence_7,null,"Référence",false,false);
var Réglement_Responsable_8=new clAttribut("em_libelle","vue_employe_reglement",null);


	/* Ce composant représente: vue_employe_reglement.em_libelle sous le nom "Responsable" */
var Compo_Réglement_Responsable_8=new clCompoListeDeroulanteSimple(Réglement_Responsable_8,null,"Responsable");
var Joint_Esclave_Réglement_Responsable_8=new clJointureMulti("reglement",
	new Array(
	new stJointure("vue_employe_reglement","em_numero","em_numero",null,false)
	));
var Réglement_Liste_des_réglements0=new clEnsembleAttributs("reglement",
	new Array(
	new clLiaison(null,Col_N0_N_Reg__De_Réglement_Liste_des_réglements0)
	,new clLiaison(null,Col_N1_N_Pers__De_Réglement_Liste_des_réglements0)
	,new clLiaison(null,Col_N2_Date____De_Réglement_Liste_des_réglements0)
	,new clLiaison(null,Col_N3_Montant_De_Réglement_Liste_des_réglements0)
	),
	new Array(
	new clLiaison(Joint_Esclave_Réglement_Personne_1,Réglement_Personne_1)
	,new clLiaison(null,Réglement_Date_2)
	,new clLiaison(null,Réglement_Montant_3)
	,new clLiaison(Joint_Esclave_Réglement_Mode_4,Réglement_Mode_4)
	,new clLiaison(null,Réglement_Banque_5)
	,new clLiaison(null,Réglement_N__compte_6)
	,new clLiaison(null,Réglement_Référence_7)
	,new clLiaison(Joint_Esclave_Réglement_Responsable_8,Réglement_Responsable_8)
	));

var Titre_Réglement_Liste_des_réglements0=new Array("N°Reg ","N°Pers ","Date   ","Montant");

	/* Ce composant représente: des éléments de la table reglement sous le nom "Liste des réglements" */
var Compo_Réglement_Liste_des_réglements0=new clCompoListe(Réglement_Liste_des_réglements0,new Array(new clInterfaceFiltrageVide()),Titre_Réglement_Liste_des_réglements0,"Liste des réglements",true,false);

	/* Ce composant représente: reglement.undefined sous le nom "Liste des réglements" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Liste_des_réglements0.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0"));

 }

	/* On l'ajoute au tableau global à l'indice 648*/
top.TAB_GLOBAL_COMPO[648]=Compo_Réglement_Liste_des_réglements0;

	/* Ce composant représente: des éléments de la table personne sous le nom "Personne" */
 if(ALeDroit(0,"personne"))
 {
Compo_Réglement_Personne_1.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 653*/
top.TAB_GLOBAL_COMPO[653]=Compo_Réglement_Personne_1;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Date" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Date_2.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 654*/
top.TAB_GLOBAL_COMPO[654]=Compo_Réglement_Date_2;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Montant" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Montant_3.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 655*/
top.TAB_GLOBAL_COMPO[655]=Compo_Réglement_Montant_3;

	/* Ce composant représente: des éléments de la table modereglement sous le nom "Mode" */
 if(ALeDroit(0,"modereglement"))
 {
Compo_Réglement_Mode_4.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 656*/
top.TAB_GLOBAL_COMPO[656]=Compo_Réglement_Mode_4;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Banque" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Banque_5.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 657*/
top.TAB_GLOBAL_COMPO[657]=Compo_Réglement_Banque_5;

	/* Ce composant représente: des éléments de la table reglement sous le nom "N° compte" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_N__compte_6.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 658*/
top.TAB_GLOBAL_COMPO[658]=Compo_Réglement_N__compte_6;

	/* Ce composant représente: des éléments de la table reglement sous le nom "Référence" */
 if(ALeDroit(0,"reglement"))
 {
Compo_Réglement_Référence_7.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 659*/
top.TAB_GLOBAL_COMPO[659]=Compo_Réglement_Référence_7;

	/* Ce composant représente: des éléments de la table vue_employe_reglement sous le nom "Responsable" */
 if(ALeDroit(0,"vue_employe_reglement"))
 {
Compo_Réglement_Responsable_8.GenererXUL(top.document.getElementById("Réglement_Liste_des_réglements0_Slaves"));

 }

	/* On l'ajoute au tableau global à l'indice 660*/
top.TAB_GLOBAL_COMPO[660]=Compo_Réglement_Responsable_8;
 if(ALeDroit(5,"personne"))
 {
/* On refresh les composants non dépendents de l'onget Personnes*/
var Composant_0 = TAB_GLOBAL_COMPO[625];
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
top.document.getElementById("Insert_Personnes_Adresses_7").hidden=true;

 }
 if(ALeDroit(4,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Delete_Personnes_Adresses_7").hidden=true;

 }
 if(ALeDroit(1,"adresse"))
 {
nb_button++;

 }
 else
 {
top.document.getElementById("Update_Personnes_Adresses_7").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Personnes_Adresses_7").hidden=true;
        top.document.getElementById("Annuler_Personnes_Adresses_7").hidden=true;
}
 if(ALeDroit(5,"reglement"))
 {
/* On refresh les composants non dépendents de l'onget Réglement*/
var Composant_0 = TAB_GLOBAL_COMPO[648];
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
}
