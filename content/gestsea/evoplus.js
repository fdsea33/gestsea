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
var TAB_COMPO_PPTES = new Array(39);
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
         FONCTIONS POUR L'ONGLET Evoplus
   ***********************************************/ 

 /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */

function OuvrirOnglet_Evoplus()
{
 var tabs = top.document.getElementById("Tous_les_onglets");
 tabs.selectedItem = top.document.getElementById("Onglet_Evoplus");
}

function Insert_Evoplus_Liste_des_evoplus0()
{
 TAB_COMPO_PPTES[3].Action_en_cours = INSERT;
/* On calcule la nouvelle cl� */
 TAB_COMPO_PPTES[3].NewCle = getNewCle("table_evoplus");
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[3].ActiverComposant(false,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[8];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[9];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[10];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[11];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[12];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[13];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[14];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[15];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[16];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[17];
 Esclave_9.ActiverComposant(true);
 var Esclave_10=TAB_GLOBAL_COMPO[18];
 Esclave_10.ActiverComposant(true);
 var Esclave_11=TAB_GLOBAL_COMPO[19];
 Esclave_11.ActiverComposant(true);
 var Esclave_12=TAB_GLOBAL_COMPO[20];
 Esclave_12.ActiverComposant(true);
 var Esclave_13=TAB_GLOBAL_COMPO[21];
 Esclave_13.ActiverComposant(true);
 var Esclave_14=TAB_GLOBAL_COMPO[22];
 Esclave_14.ActiverComposant(true);
 var Esclave_15=TAB_GLOBAL_COMPO[23];
 Esclave_15.ActiverComposant(true);
 var Esclave_16=TAB_GLOBAL_COMPO[24];
 Esclave_16.ActiverComposant(true);
 var Esclave_17=TAB_GLOBAL_COMPO[25];
 Esclave_17.ActiverComposant(true);
 var Esclave_18=TAB_GLOBAL_COMPO[26];
 Esclave_18.ActiverComposant(true);
 var Esclave_19=TAB_GLOBAL_COMPO[27];
 Esclave_19.ActiverComposant(true);
 var Esclave_20=TAB_GLOBAL_COMPO[28];
 Esclave_20.ActiverComposant(true);
 var Esclave_21=TAB_GLOBAL_COMPO[29];
 Esclave_21.ActiverComposant(true);
 var Esclave_22=TAB_GLOBAL_COMPO[30];
 Esclave_22.ActiverComposant(true);
 var Esclave_23=TAB_GLOBAL_COMPO[31];
 Esclave_23.ActiverComposant(true);
 var Esclave_24=TAB_GLOBAL_COMPO[32];
 Esclave_24.ActiverComposant(true);
 var Esclave_25=TAB_GLOBAL_COMPO[33];
 Esclave_25.ActiverComposant(true);
 var Esclave_26=TAB_GLOBAL_COMPO[34];
 Esclave_26.ActiverComposant(true);
 var Esclave_27=TAB_GLOBAL_COMPO[35];
 Esclave_27.ActiverComposant(true);
 var Esclave_28=TAB_GLOBAL_COMPO[36];
 Esclave_28.ActiverComposant(true);
 var Esclave_29=TAB_GLOBAL_COMPO[37];
 Esclave_29.ActiverComposant(true);
 var Esclave_30=TAB_GLOBAL_COMPO[38];
 Esclave_30.ActiverComposant(true);
top.document.getElementById("Validate_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Annuler_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Insert_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Delete_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Update_Evoplus_Liste_des_evoplus0").disabled=true;
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

function Delete_Evoplus_Liste_des_evoplus0()
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
         User_Delete_Evoplus_Liste_des_evoplus0(Maitre);
        Maitre.RefreshTotal();
 }
}

function Update_Evoplus_Liste_des_evoplus0()
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
 var Esclave_0=TAB_GLOBAL_COMPO[8];
 Esclave_0.ActiverComposant(true);
 var Esclave_1=TAB_GLOBAL_COMPO[9];
 Esclave_1.ActiverComposant(true);
 var Esclave_2=TAB_GLOBAL_COMPO[10];
 Esclave_2.ActiverComposant(true);
 var Esclave_3=TAB_GLOBAL_COMPO[11];
 Esclave_3.ActiverComposant(true);
 var Esclave_4=TAB_GLOBAL_COMPO[12];
 Esclave_4.ActiverComposant(true);
 var Esclave_5=TAB_GLOBAL_COMPO[13];
 Esclave_5.ActiverComposant(true);
 var Esclave_6=TAB_GLOBAL_COMPO[14];
 Esclave_6.ActiverComposant(true);
 var Esclave_7=TAB_GLOBAL_COMPO[15];
 Esclave_7.ActiverComposant(true);
 var Esclave_8=TAB_GLOBAL_COMPO[16];
 Esclave_8.ActiverComposant(true);
 var Esclave_9=TAB_GLOBAL_COMPO[17];
 Esclave_9.ActiverComposant(true);
 var Esclave_10=TAB_GLOBAL_COMPO[18];
 Esclave_10.ActiverComposant(true);
 var Esclave_11=TAB_GLOBAL_COMPO[19];
 Esclave_11.ActiverComposant(true);
 var Esclave_12=TAB_GLOBAL_COMPO[20];
 Esclave_12.ActiverComposant(true);
 var Esclave_13=TAB_GLOBAL_COMPO[21];
 Esclave_13.ActiverComposant(true);
 var Esclave_14=TAB_GLOBAL_COMPO[22];
 Esclave_14.ActiverComposant(true);
 var Esclave_15=TAB_GLOBAL_COMPO[23];
 Esclave_15.ActiverComposant(true);
 var Esclave_16=TAB_GLOBAL_COMPO[24];
 Esclave_16.ActiverComposant(true);
 var Esclave_17=TAB_GLOBAL_COMPO[25];
 Esclave_17.ActiverComposant(true);
 var Esclave_18=TAB_GLOBAL_COMPO[26];
 Esclave_18.ActiverComposant(true);
 var Esclave_19=TAB_GLOBAL_COMPO[27];
 Esclave_19.ActiverComposant(true);
 var Esclave_20=TAB_GLOBAL_COMPO[28];
 Esclave_20.ActiverComposant(true);
 var Esclave_21=TAB_GLOBAL_COMPO[29];
 Esclave_21.ActiverComposant(true);
 var Esclave_22=TAB_GLOBAL_COMPO[30];
 Esclave_22.ActiverComposant(true);
 var Esclave_23=TAB_GLOBAL_COMPO[31];
 Esclave_23.ActiverComposant(true);
 var Esclave_24=TAB_GLOBAL_COMPO[32];
 Esclave_24.ActiverComposant(true);
 var Esclave_25=TAB_GLOBAL_COMPO[33];
 Esclave_25.ActiverComposant(true);
 var Esclave_26=TAB_GLOBAL_COMPO[34];
 Esclave_26.ActiverComposant(true);
 var Esclave_27=TAB_GLOBAL_COMPO[35];
 Esclave_27.ActiverComposant(true);
 var Esclave_28=TAB_GLOBAL_COMPO[36];
 Esclave_28.ActiverComposant(true);
 var Esclave_29=TAB_GLOBAL_COMPO[37];
 Esclave_29.ActiverComposant(true);
 var Esclave_30=TAB_GLOBAL_COMPO[38];
 Esclave_30.ActiverComposant(true);
top.document.getElementById("Validate_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Annuler_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Insert_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Delete_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Update_Evoplus_Liste_des_evoplus0").disabled=true;
return TAB_COMPO_PPTES[3].NewCle;
}

function Validate_Evoplus_Liste_des_evoplus0(retour)
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
        if ((NewCle = User_Insert_Evoplus_Liste_des_evoplus0(Maitre))==-1)
                return -1;
        break;
        case UPDATE :
        if ((User_Update_Evoplus_Liste_des_evoplus0(Maitre))==-1)
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
 var Esclave_0=TAB_GLOBAL_COMPO[8];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[9];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[10];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[11];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[12];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[13];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[14];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[15];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[16];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[17];
 Esclave_9.ActiverComposant(false);
 var Esclave_10=TAB_GLOBAL_COMPO[18];
 Esclave_10.ActiverComposant(false);
 var Esclave_11=TAB_GLOBAL_COMPO[19];
 Esclave_11.ActiverComposant(false);
 var Esclave_12=TAB_GLOBAL_COMPO[20];
 Esclave_12.ActiverComposant(false);
 var Esclave_13=TAB_GLOBAL_COMPO[21];
 Esclave_13.ActiverComposant(false);
 var Esclave_14=TAB_GLOBAL_COMPO[22];
 Esclave_14.ActiverComposant(false);
 var Esclave_15=TAB_GLOBAL_COMPO[23];
 Esclave_15.ActiverComposant(false);
 var Esclave_16=TAB_GLOBAL_COMPO[24];
 Esclave_16.ActiverComposant(false);
 var Esclave_17=TAB_GLOBAL_COMPO[25];
 Esclave_17.ActiverComposant(false);
 var Esclave_18=TAB_GLOBAL_COMPO[26];
 Esclave_18.ActiverComposant(false);
 var Esclave_19=TAB_GLOBAL_COMPO[27];
 Esclave_19.ActiverComposant(false);
 var Esclave_20=TAB_GLOBAL_COMPO[28];
 Esclave_20.ActiverComposant(false);
 var Esclave_21=TAB_GLOBAL_COMPO[29];
 Esclave_21.ActiverComposant(false);
 var Esclave_22=TAB_GLOBAL_COMPO[30];
 Esclave_22.ActiverComposant(false);
 var Esclave_23=TAB_GLOBAL_COMPO[31];
 Esclave_23.ActiverComposant(false);
 var Esclave_24=TAB_GLOBAL_COMPO[32];
 Esclave_24.ActiverComposant(false);
 var Esclave_25=TAB_GLOBAL_COMPO[33];
 Esclave_25.ActiverComposant(false);
 var Esclave_26=TAB_GLOBAL_COMPO[34];
 Esclave_26.ActiverComposant(false);
 var Esclave_27=TAB_GLOBAL_COMPO[35];
 Esclave_27.ActiverComposant(false);
 var Esclave_28=TAB_GLOBAL_COMPO[36];
 Esclave_28.ActiverComposant(false);
 var Esclave_29=TAB_GLOBAL_COMPO[37];
 Esclave_29.ActiverComposant(false);
 var Esclave_30=TAB_GLOBAL_COMPO[38];
 Esclave_30.ActiverComposant(false);
top.document.getElementById("Validate_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Annuler_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Insert_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Delete_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Update_Evoplus_Liste_des_evoplus0").disabled=false;
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

function Annuler_Evoplus_Liste_des_evoplus0()
{
 TAB_COMPO_PPTES[3].Action_en_cours = null;
/* On d�sactive le composant maitre */
 TAB_GLOBAL_COMPO[3].ActiverComposant(true,true);
/* On active les composants esclaves et on vide les champs */
 var Esclave_0=TAB_GLOBAL_COMPO[8];
 Esclave_0.ActiverComposant(false);
 var Esclave_1=TAB_GLOBAL_COMPO[9];
 Esclave_1.ActiverComposant(false);
 var Esclave_2=TAB_GLOBAL_COMPO[10];
 Esclave_2.ActiverComposant(false);
 var Esclave_3=TAB_GLOBAL_COMPO[11];
 Esclave_3.ActiverComposant(false);
 var Esclave_4=TAB_GLOBAL_COMPO[12];
 Esclave_4.ActiverComposant(false);
 var Esclave_5=TAB_GLOBAL_COMPO[13];
 Esclave_5.ActiverComposant(false);
 var Esclave_6=TAB_GLOBAL_COMPO[14];
 Esclave_6.ActiverComposant(false);
 var Esclave_7=TAB_GLOBAL_COMPO[15];
 Esclave_7.ActiverComposant(false);
 var Esclave_8=TAB_GLOBAL_COMPO[16];
 Esclave_8.ActiverComposant(false);
 var Esclave_9=TAB_GLOBAL_COMPO[17];
 Esclave_9.ActiverComposant(false);
 var Esclave_10=TAB_GLOBAL_COMPO[18];
 Esclave_10.ActiverComposant(false);
 var Esclave_11=TAB_GLOBAL_COMPO[19];
 Esclave_11.ActiverComposant(false);
 var Esclave_12=TAB_GLOBAL_COMPO[20];
 Esclave_12.ActiverComposant(false);
 var Esclave_13=TAB_GLOBAL_COMPO[21];
 Esclave_13.ActiverComposant(false);
 var Esclave_14=TAB_GLOBAL_COMPO[22];
 Esclave_14.ActiverComposant(false);
 var Esclave_15=TAB_GLOBAL_COMPO[23];
 Esclave_15.ActiverComposant(false);
 var Esclave_16=TAB_GLOBAL_COMPO[24];
 Esclave_16.ActiverComposant(false);
 var Esclave_17=TAB_GLOBAL_COMPO[25];
 Esclave_17.ActiverComposant(false);
 var Esclave_18=TAB_GLOBAL_COMPO[26];
 Esclave_18.ActiverComposant(false);
 var Esclave_19=TAB_GLOBAL_COMPO[27];
 Esclave_19.ActiverComposant(false);
 var Esclave_20=TAB_GLOBAL_COMPO[28];
 Esclave_20.ActiverComposant(false);
 var Esclave_21=TAB_GLOBAL_COMPO[29];
 Esclave_21.ActiverComposant(false);
 var Esclave_22=TAB_GLOBAL_COMPO[30];
 Esclave_22.ActiverComposant(false);
 var Esclave_23=TAB_GLOBAL_COMPO[31];
 Esclave_23.ActiverComposant(false);
 var Esclave_24=TAB_GLOBAL_COMPO[32];
 Esclave_24.ActiverComposant(false);
 var Esclave_25=TAB_GLOBAL_COMPO[33];
 Esclave_25.ActiverComposant(false);
 var Esclave_26=TAB_GLOBAL_COMPO[34];
 Esclave_26.ActiverComposant(false);
 var Esclave_27=TAB_GLOBAL_COMPO[35];
 Esclave_27.ActiverComposant(false);
 var Esclave_28=TAB_GLOBAL_COMPO[36];
 Esclave_28.ActiverComposant(false);
 var Esclave_29=TAB_GLOBAL_COMPO[37];
 Esclave_29.ActiverComposant(false);
 var Esclave_30=TAB_GLOBAL_COMPO[38];
 Esclave_30.ActiverComposant(false);
top.document.getElementById("Validate_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Annuler_Evoplus_Liste_des_evoplus0").disabled=true;
top.document.getElementById("Insert_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Delete_Evoplus_Liste_des_evoplus0").disabled=false;
top.document.getElementById("Update_Evoplus_Liste_des_evoplus0").disabled=false;
}





function evoplus_Chargement()
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
var Col_N0_Lot_De_Evoplus_Liste_des_evoplus0=new clAttribut("lot","table_evoplus",null);

var Col_N1_ID_De_Evoplus_Liste_des_evoplus0=new clAttribut("id","table_evoplus",null);

var Col_N2_N__De_Evoplus_Liste_des_evoplus0=new clAttribut("pe_numero","table_evoplus",null);

var Col_N3_Nom_De_Evoplus_Liste_des_evoplus0=new clAttribut("nom","table_evoplus",null);

var Evoplus_Source_1=new clAttribut("source","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.source sous le nom "Source" */
var Compo_Evoplus_Source_1=new clCompoTextBox(Evoplus_Source_1,null,"Source",false,false);
var Evoplus_N_Fiche_2=new clAttribut("numero","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.numero sous le nom "N�Fiche" */
var Compo_Evoplus_N_Fiche_2=new clCompoTextBox(Evoplus_N_Fiche_2,null,"N�Fiche",false,false);
var Evoplus_Titre_3=new clAttribut("titre","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.titre sous le nom "Titre" */
var Compo_Evoplus_Titre_3=new clCompoTextBox(Evoplus_Titre_3,null,"Titre",false,false);
var Evoplus_Nom_Pr�nom_4=new clAttribut("nom","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.nom sous le nom "Nom/Pr�nom" */
var Compo_Evoplus_Nom_Pr�nom_4=new clCompoTextBox(Evoplus_Nom_Pr�nom_4,null,"Nom/Pr�nom",false,false);
var Evoplus_Compl�ment_5=new clAttribut("complement","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.complement sous le nom "Compl�ment" */
var Compo_Evoplus_Compl�ment_5=new clCompoTextBox(Evoplus_Compl�ment_5,null,"Compl�ment",false,false);
var Evoplus_Ad1_6=new clAttribut("ad1","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.ad1 sous le nom "Ad1" */
var Compo_Evoplus_Ad1_6=new clCompoTextBox(Evoplus_Ad1_6,null,"Ad1",false,false);
var Evoplus_Ad2_7=new clAttribut("ad2","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.ad2 sous le nom "Ad2" */
var Compo_Evoplus_Ad2_7=new clCompoTextBox(Evoplus_Ad2_7,null,"Ad2",false,false);
var Evoplus_Ad3_8=new clAttribut("ad3","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.ad3 sous le nom "Ad3" */
var Compo_Evoplus_Ad3_8=new clCompoTextBox(Evoplus_Ad3_8,null,"Ad3",false,false);
var Evoplus_CP_9=new clAttribut("cp","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.cp sous le nom "CP" */
var Compo_Evoplus_CP_9=new clCompoTextBox(Evoplus_CP_9,null,"CP",false,false);
var Evoplus_Ville_10=new clAttribut("ville","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.ville sous le nom "Ville" */
var Compo_Evoplus_Ville_10=new clCompoTextBox(Evoplus_Ville_10,null,"Ville",false,false);
var Evoplus_n�_le_11=new clAttribut("naissance","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.naissance sous le nom "n� le" */
var Compo_Evoplus_n�_le_11=new clCompoTextBox(Evoplus_n�_le_11,null,"n� le",false,false);
var Evoplus_tel_12=new clAttribut("telephone","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.telephone sous le nom "tel" */
var Compo_Evoplus_tel_12=new clCompoTextBox(Evoplus_tel_12,null,"tel",false,false);
var Evoplus_fax_13=new clAttribut("fax","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.fax sous le nom "fax" */
var Compo_Evoplus_fax_13=new clCompoTextBox(Evoplus_fax_13,null,"fax",false,false);
var Evoplus_mob_14=new clAttribut("portable","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.portable sous le nom "mob" */
var Compo_Evoplus_mob_14=new clCompoTextBox(Evoplus_mob_14,null,"mob",false,false);
var Evoplus_Qualification_15=new clAttribut("qualification","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.qualification sous le nom "Qualification" */
var Compo_Evoplus_Qualification_15=new clCompoTextBox(Evoplus_Qualification_15,null,"Qualification",false,false);
var Evoplus_Fortait__montant__16=new clAttribut("base_ht","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.base_ht sous le nom "Fortait (montant)" */
var Compo_Evoplus_Fortait__montant__16=new clCompoTextBox(Evoplus_Fortait__montant__16,null,"Fortait (montant)",false,false);
var Evoplus_Productions_17=new clAttribut("productions","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.productions sous le nom "Productions" */
var Compo_Evoplus_Productions_17=new clCompoTextBox(Evoplus_Productions_17,null,"Productions",false,false);
var Evoplus_Nb_d_hectares_18=new clAttribut("hectares_nb","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.hectares_nb sous le nom "Nb d'hectares" */
var Compo_Evoplus_Nb_d_hectares_18=new clCompoTextBox(Evoplus_Nb_d_hectares_18,null,"Nb d'hectares",false,false);
var Evoplus_Nb_salari�s_19=new clAttribut("salaries_nb","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.salaries_nb sous le nom "Nb salari�s" */
var Compo_Evoplus_Nb_salari�s_19=new clCompoTextBox(Evoplus_Nb_salari�s_19,null,"Nb salari�s",false,false);
var Evoplus_SACEA_montant_20=new clAttribut("sacea_ttc","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.sacea_ttc sous le nom "SACEA montant" */
var Compo_Evoplus_SACEA_montant_20=new clCompoTextBox(Evoplus_SACEA_montant_20,null,"SACEA montant",false,false);
var Evoplus_Nb_CM_21=new clAttribut("cm_nb","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.cm_nb sous le nom "Nb CM" */
var Compo_Evoplus_Nb_CM_21=new clCompoTextBox(Evoplus_Nb_CM_21,null,"Nb CM",false,false);
var Evoplus_CM_Montant_22=new clAttribut("cm_ht","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.cm_ht sous le nom "CM Montant" */
var Compo_Evoplus_CM_Montant_22=new clCompoTextBox(Evoplus_CM_Montant_22,null,"CM Montant",false,false);
var Evoplus_CM_Noms_23=new clAttribut("cm_noms","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.cm_noms sous le nom "CM Noms" */
var Compo_Evoplus_CM_Noms_23=new clCompoTextBox(Evoplus_CM_Noms_23,null,"CM Noms",false,false);
var Evoplus_Option_1_24=new clAttribut("opt1","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.opt1 sous le nom "Option 1" */
var Compo_Evoplus_Option_1_24=new clCompoTextBox(Evoplus_Option_1_24,null,"Option 1",false,false);
var Evoplus_Option_2_25=new clAttribut("opt2","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.opt2 sous le nom "Option 2" */
var Compo_Evoplus_Option_2_25=new clCompoTextBox(Evoplus_Option_2_25,null,"Option 2",false,false);
var Evoplus_Option_3_26=new clAttribut("opt3","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.opt3 sous le nom "Option 3" */
var Compo_Evoplus_Option_3_26=new clCompoTextBox(Evoplus_Option_3_26,null,"Option 3",false,false);
var Evoplus_Option_4_27=new clAttribut("opt4","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.opt4 sous le nom "Option 4" */
var Compo_Evoplus_Option_4_27=new clCompoTextBox(Evoplus_Option_4_27,null,"Option 4",false,false);
var Evoplus_Option_retenue_28=new clAttribut("opt_num","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.opt_num sous le nom "Option retenue" */
var Compo_Evoplus_Option_retenue_28=new clCompoTextBox(Evoplus_Option_retenue_28,null,"Option retenue",false,false);
var Evoplus_Cout_retenu_29=new clAttribut("opt_ttc","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.opt_ttc sous le nom "Cout retenu" */
var Compo_Evoplus_Cout_retenu_29=new clCompoTextBox(Evoplus_Cout_retenu_29,null,"Cout retenu",false,false);
var Evoplus_Statut_30=new clAttribut("statut","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.statut sous le nom "Statut" */
var Compo_Evoplus_Statut_30=new clCompoTextBox(Evoplus_Statut_30,null,"Statut",false,false);
var Evoplus_Remarque_31=new clAttribut("remarque","table_evoplus",null);


	/* Ce composant repr�sente: table_evoplus.remarque sous le nom "Remarque" */
var Compo_Evoplus_Remarque_31=new clCompoTextBox(Evoplus_Remarque_31,null,"Remarque",false,true);
var Evoplus_Liste_des_evoplus0=new clEnsembleAttributs("table_evoplus",
	new Array(
	new clLiaison(null,Col_N0_Lot_De_Evoplus_Liste_des_evoplus0)
	,new clLiaison(null,Col_N1_ID_De_Evoplus_Liste_des_evoplus0)
	,new clLiaison(null,Col_N2_N__De_Evoplus_Liste_des_evoplus0)
	,new clLiaison(null,Col_N3_Nom_De_Evoplus_Liste_des_evoplus0)
	),
	new Array(
	new clLiaison(null,Evoplus_Source_1)
	,new clLiaison(null,Evoplus_N_Fiche_2)
	,new clLiaison(null,Evoplus_Titre_3)
	,new clLiaison(null,Evoplus_Nom_Pr�nom_4)
	,new clLiaison(null,Evoplus_Compl�ment_5)
	,new clLiaison(null,Evoplus_Ad1_6)
	,new clLiaison(null,Evoplus_Ad2_7)
	,new clLiaison(null,Evoplus_Ad3_8)
	,new clLiaison(null,Evoplus_CP_9)
	,new clLiaison(null,Evoplus_Ville_10)
	,new clLiaison(null,Evoplus_n�_le_11)
	,new clLiaison(null,Evoplus_tel_12)
	,new clLiaison(null,Evoplus_fax_13)
	,new clLiaison(null,Evoplus_mob_14)
	,new clLiaison(null,Evoplus_Qualification_15)
	,new clLiaison(null,Evoplus_Fortait__montant__16)
	,new clLiaison(null,Evoplus_Productions_17)
	,new clLiaison(null,Evoplus_Nb_d_hectares_18)
	,new clLiaison(null,Evoplus_Nb_salari�s_19)
	,new clLiaison(null,Evoplus_SACEA_montant_20)
	,new clLiaison(null,Evoplus_Nb_CM_21)
	,new clLiaison(null,Evoplus_CM_Montant_22)
	,new clLiaison(null,Evoplus_CM_Noms_23)
	,new clLiaison(null,Evoplus_Option_1_24)
	,new clLiaison(null,Evoplus_Option_2_25)
	,new clLiaison(null,Evoplus_Option_3_26)
	,new clLiaison(null,Evoplus_Option_4_27)
	,new clLiaison(null,Evoplus_Option_retenue_28)
	,new clLiaison(null,Evoplus_Cout_retenu_29)
	,new clLiaison(null,Evoplus_Statut_30)
	,new clLiaison(null,Evoplus_Remarque_31)
	));

var Titre_Evoplus_Liste_des_evoplus0=new Array("Lot","ID","N�","Nom");

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Liste des evoplus" */
var Compo_Evoplus_Liste_des_evoplus0=new clCompoListe(Evoplus_Liste_des_evoplus0,new Array(new clInterfaceFiltrageVide()),Titre_Evoplus_Liste_des_evoplus0,"Liste des evoplus",true,false);

	/* Ce composant repr�sente: table_evoplus.undefined sous le nom "Liste des evoplus" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Liste_des_evoplus0.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0"));

 }

	/* On l'ajoute au tableau global � l'indice 3*/
top.TAB_GLOBAL_COMPO[3]=Compo_Evoplus_Liste_des_evoplus0;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Source" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Source_1.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 8*/
top.TAB_GLOBAL_COMPO[8]=Compo_Evoplus_Source_1;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "N�Fiche" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_N_Fiche_2.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 9*/
top.TAB_GLOBAL_COMPO[9]=Compo_Evoplus_N_Fiche_2;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Titre" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Titre_3.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 10*/
top.TAB_GLOBAL_COMPO[10]=Compo_Evoplus_Titre_3;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Nom/Pr�nom" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Nom_Pr�nom_4.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 11*/
top.TAB_GLOBAL_COMPO[11]=Compo_Evoplus_Nom_Pr�nom_4;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Compl�ment" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Compl�ment_5.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 12*/
top.TAB_GLOBAL_COMPO[12]=Compo_Evoplus_Compl�ment_5;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Ad1" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Ad1_6.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 13*/
top.TAB_GLOBAL_COMPO[13]=Compo_Evoplus_Ad1_6;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Ad2" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Ad2_7.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 14*/
top.TAB_GLOBAL_COMPO[14]=Compo_Evoplus_Ad2_7;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Ad3" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Ad3_8.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 15*/
top.TAB_GLOBAL_COMPO[15]=Compo_Evoplus_Ad3_8;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "CP" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_CP_9.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 16*/
top.TAB_GLOBAL_COMPO[16]=Compo_Evoplus_CP_9;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Ville" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Ville_10.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 17*/
top.TAB_GLOBAL_COMPO[17]=Compo_Evoplus_Ville_10;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "n� le" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_n�_le_11.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 18*/
top.TAB_GLOBAL_COMPO[18]=Compo_Evoplus_n�_le_11;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "tel" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_tel_12.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 19*/
top.TAB_GLOBAL_COMPO[19]=Compo_Evoplus_tel_12;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "fax" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_fax_13.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 20*/
top.TAB_GLOBAL_COMPO[20]=Compo_Evoplus_fax_13;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "mob" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_mob_14.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 21*/
top.TAB_GLOBAL_COMPO[21]=Compo_Evoplus_mob_14;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Qualification" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Qualification_15.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 22*/
top.TAB_GLOBAL_COMPO[22]=Compo_Evoplus_Qualification_15;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Fortait (montant)" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Fortait__montant__16.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 23*/
top.TAB_GLOBAL_COMPO[23]=Compo_Evoplus_Fortait__montant__16;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Productions" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Productions_17.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 24*/
top.TAB_GLOBAL_COMPO[24]=Compo_Evoplus_Productions_17;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Nb d'hectares" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Nb_d_hectares_18.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 25*/
top.TAB_GLOBAL_COMPO[25]=Compo_Evoplus_Nb_d_hectares_18;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Nb salari�s" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Nb_salari�s_19.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 26*/
top.TAB_GLOBAL_COMPO[26]=Compo_Evoplus_Nb_salari�s_19;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "SACEA montant" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_SACEA_montant_20.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 27*/
top.TAB_GLOBAL_COMPO[27]=Compo_Evoplus_SACEA_montant_20;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Nb CM" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Nb_CM_21.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 28*/
top.TAB_GLOBAL_COMPO[28]=Compo_Evoplus_Nb_CM_21;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "CM Montant" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_CM_Montant_22.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 29*/
top.TAB_GLOBAL_COMPO[29]=Compo_Evoplus_CM_Montant_22;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "CM Noms" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_CM_Noms_23.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 30*/
top.TAB_GLOBAL_COMPO[30]=Compo_Evoplus_CM_Noms_23;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Option 1" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Option_1_24.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 31*/
top.TAB_GLOBAL_COMPO[31]=Compo_Evoplus_Option_1_24;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Option 2" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Option_2_25.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 32*/
top.TAB_GLOBAL_COMPO[32]=Compo_Evoplus_Option_2_25;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Option 3" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Option_3_26.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 33*/
top.TAB_GLOBAL_COMPO[33]=Compo_Evoplus_Option_3_26;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Option 4" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Option_4_27.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 34*/
top.TAB_GLOBAL_COMPO[34]=Compo_Evoplus_Option_4_27;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Option retenue" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Option_retenue_28.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 35*/
top.TAB_GLOBAL_COMPO[35]=Compo_Evoplus_Option_retenue_28;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Cout retenu" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Cout_retenu_29.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 36*/
top.TAB_GLOBAL_COMPO[36]=Compo_Evoplus_Cout_retenu_29;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Statut" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Statut_30.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 37*/
top.TAB_GLOBAL_COMPO[37]=Compo_Evoplus_Statut_30;

	/* Ce composant repr�sente: des �l�ments de la table table_evoplus sous le nom "Remarque" */
 if(ALeDroit(0,"table_evoplus"))
 {
Compo_Evoplus_Remarque_31.GenererXUL(top.document.getElementById("Evoplus_Liste_des_evoplus0_Slaves"));

 }

	/* On l'ajoute au tableau global � l'indice 38*/
top.TAB_GLOBAL_COMPO[38]=Compo_Evoplus_Remarque_31;
 if(ALeDroit(5,"table_evoplus"))
 {
/* On refresh les composants non d�pendents de l'onget Evoplus*/
var Composant_0 = TAB_GLOBAL_COMPO[3];
if (Composant_0!=null){
Composant_0.ActiverComposant(true);
Composant_0.Refresh();
}

 }
 else
 {
top.document.getElementById("Onglet_Evoplus").hidden=true;
if (top.document.getElementById("Onglet_Evoplus").selected)
        top.document.getElementById("Tous_les_onglets").advanceSelectedTab(1);

 }
var nb_button=0
 if(ALeDroit(2,"table_evoplus"))
 {
nb_button++;
top.document.getElementById("Insert_Evoplus_Liste_des_evoplus0").disabled=false;

 }
 else
 {
top.document.getElementById("Insert_Evoplus_Liste_des_evoplus0").hidden=true;

 }
 if(ALeDroit(4,"table_evoplus"))
 {
nb_button++;
top.document.getElementById("Delete_Evoplus_Liste_des_evoplus0").disabled=false;

 }
 else
 {
top.document.getElementById("Delete_Evoplus_Liste_des_evoplus0").hidden=true;

 }
 if(ALeDroit(1,"table_evoplus"))
 {
nb_button++;
top.document.getElementById("Update_Evoplus_Liste_des_evoplus0").disabled=false;

 }
 else
 {
top.document.getElementById("Update_Evoplus_Liste_des_evoplus0").hidden=true;

 }
if (nb_button==0)
{
        top.document.getElementById("Validate_Evoplus_Liste_des_evoplus0").hidden=true;
        top.document.getElementById("Annuler_Evoplus_Liste_des_evoplus0").hidden=true;
}
}