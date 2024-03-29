/*************************************************
  REQUETES UTILSATEUR : Onglet : Acc�s
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Acc�s_Liste_des_niveaux_d_acc�s0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 113;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 114;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="acces";
 var CleMaitre = TAB_COMPO_PPTES[109].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ac_libelle=GetValAt(113);
 if (!ValiderChampsObligatoire(Table,"ac_libelle",TAB_GLOBAL_COMPO[113],ac_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ac_libelle",TAB_GLOBAL_COMPO[113],ac_libelle))
         return -1;
 var ac_niveau=GetValAt(114);
 if (!ValiderChampsObligatoire(Table,"ac_niveau",TAB_GLOBAL_COMPO[114],ac_niveau,false))
         return -1;
 if (!ValiderChampsType(Table,"ac_niveau",TAB_GLOBAL_COMPO[114],ac_niveau))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ac_libelle,ac_niveau"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ac_libelle=="" ? "null" : "'"+ValiderChaine(ac_libelle)+"'" )+","+(ac_niveau=="" ? "null" : "'"+ValiderChaine(ac_niveau)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Acc�s
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Acc�s_Liste_des_niveaux_d_acc�s0(Compo_Maitre)
{
 var Table="acces";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Acc�s
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Acc�s_Liste_des_niveaux_d_acc�s0(Compo_Maitre)
{
 var Table="acces";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ac_libelle=GetValAt(113);
 if (!ValiderChampsObligatoire(Table,"ac_libelle",TAB_GLOBAL_COMPO[113],ac_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ac_libelle",TAB_GLOBAL_COMPO[113],ac_libelle))
         return -1;
 var ac_niveau=GetValAt(114);
 if (!ValiderChampsObligatoire(Table,"ac_niveau",TAB_GLOBAL_COMPO[114],ac_niveau,false))
         return -1;
 if (!ValiderChampsType(Table,"ac_niveau",TAB_GLOBAL_COMPO[114],ac_niveau))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ac_libelle="+(ac_libelle=="" ? "null" : "'"+ValiderChaine(ac_libelle)+"'" )+",ac_niveau="+(ac_niveau=="" ? "null" : "'"+ValiderChaine(ac_niveau)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Adh�rence
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Adh�rence_Liste_des_adh�rences0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 6

Id dans le tab: 347;
simple
Nbr Jointure: 1;
    Joint n� 0 = produit,pd_numero,pd_numero

Id dans le tab: 348;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 349;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 350;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 351;
simple
Nbr Jointure: 1;
    Joint n� 0 = typelien,tl_numero,tl_numero

Id dans le tab: 355;
complexe
Nbr Jointure: 2;
    Joint n� 0 = periodeadherence,ah_numero,ah_numero
    Joint n� 1 = periode,po_numero,po_numero

******************
*/

 var Table="adherence";
 var CleMaitre = TAB_COMPO_PPTES[343].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pd_numero=GetValAt(347);
 if (pd_numero=="-1")
    pd_numero="null";
 if (!ValiderChampsObligatoire(Table,"pd_numero",TAB_GLOBAL_COMPO[347],pd_numero,true))
         return -1;
 var ah_libelle=GetValAt(348);
 if (!ValiderChampsObligatoire(Table,"ah_libelle",TAB_GLOBAL_COMPO[348],ah_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ah_libelle",TAB_GLOBAL_COMPO[348],ah_libelle))
         return -1;
 var ah_reduction=GetValAt(349);
 if (!ValiderChampsObligatoire(Table,"ah_reduction",TAB_GLOBAL_COMPO[349],ah_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"ah_reduction",TAB_GLOBAL_COMPO[349],ah_reduction))
         return -1;
 var ah_cascade=GetValAt(350);
 if (!ValiderChampsObligatoire(Table,"ah_cascade",TAB_GLOBAL_COMPO[350],ah_cascade,false))
         return -1;
 if (!ValiderChampsType(Table,"ah_cascade",TAB_GLOBAL_COMPO[350],ah_cascade))
         return -1;
 var tl_numero=GetValAt(351);
 if (tl_numero=="-1")
    tl_numero="null";
 if (!ValiderChampsObligatoire(Table,"tl_numero",TAB_GLOBAL_COMPO[351],tl_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pd_numero,ah_libelle,ah_reduction,ah_cascade,tl_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+pd_numero+","+(ah_libelle=="" ? "null" : "'"+ValiderChaine(ah_libelle)+"'" )+","+(ah_reduction=="" ? "null" : "'"+ValiderChaine(ah_reduction)+"'" )+","+(ah_cascade=="true" ? "true" : "false")+","+tl_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");

/* table periode*/
LstDouble_Exec_Req(GetSQLCompoAt(355),CleMaitre);
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Adh�rence
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Adh�rence_Liste_des_adh�rences0(Compo_Maitre)
{
 var Table="adherence";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Adh�rence
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Adh�rence_Liste_des_adh�rences0(Compo_Maitre)
{
 var Table="adherence";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pd_numero=GetValAt(347);
 if (pd_numero=="-1")
    pd_numero="null";
 if (!ValiderChampsObligatoire(Table,"pd_numero",TAB_GLOBAL_COMPO[347],pd_numero,true))
         return -1;
 var ah_libelle=GetValAt(348);
 if (!ValiderChampsObligatoire(Table,"ah_libelle",TAB_GLOBAL_COMPO[348],ah_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ah_libelle",TAB_GLOBAL_COMPO[348],ah_libelle))
         return -1;
 var ah_reduction=GetValAt(349);
 if (!ValiderChampsObligatoire(Table,"ah_reduction",TAB_GLOBAL_COMPO[349],ah_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"ah_reduction",TAB_GLOBAL_COMPO[349],ah_reduction))
         return -1;
 var ah_cascade=GetValAt(350);
 if (!ValiderChampsObligatoire(Table,"ah_cascade",TAB_GLOBAL_COMPO[350],ah_cascade,false))
         return -1;
 if (!ValiderChampsType(Table,"ah_cascade",TAB_GLOBAL_COMPO[350],ah_cascade))
         return -1;
 var tl_numero=GetValAt(351);
 if (tl_numero=="-1")
    tl_numero="null";
 if (!ValiderChampsObligatoire(Table,"tl_numero",TAB_GLOBAL_COMPO[351],tl_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pd_numero="+pd_numero+",ah_libelle="+(ah_libelle=="" ? "null" : "'"+ValiderChaine(ah_libelle)+"'" )+",ah_reduction="+(ah_reduction=="" ? "null" : "'"+ValiderChaine(ah_reduction)+"'" )+",ah_cascade="+(ah_cascade=="true" ? "true" : "false")+",tl_numero="+tl_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");

/* table periode*/
LstDouble_Exec_Req(GetSQLCompoAt(355),CleMaitre);
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Agents
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Agents_Liste_des_agents0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 10

Id dans le tab: 262;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 263;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 264;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 265;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 266;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 267;
simple
Nbr Jointure: 1;
    Joint n� 0 = equipe,eq_numero,eq_numero

Id dans le tab: 268;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 269;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 270;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 271;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="agent";
 var CleMaitre = TAB_COMPO_PPTES[256].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ag_nom=GetValAt(262);
 if (!ValiderChampsObligatoire(Table,"ag_nom",TAB_GLOBAL_COMPO[262],ag_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_nom",TAB_GLOBAL_COMPO[262],ag_nom))
         return -1;
 var ag_prenom=GetValAt(263);
 if (!ValiderChampsObligatoire(Table,"ag_prenom",TAB_GLOBAL_COMPO[263],ag_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_prenom",TAB_GLOBAL_COMPO[263],ag_prenom))
         return -1;
 var ag_initiales=GetValAt(264);
 if (!ValiderChampsObligatoire(Table,"ag_initiales",TAB_GLOBAL_COMPO[264],ag_initiales,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_initiales",TAB_GLOBAL_COMPO[264],ag_initiales))
         return -1;
 var ag_actif=GetValAt(265);
 if (!ValiderChampsObligatoire(Table,"ag_actif",TAB_GLOBAL_COMPO[265],ag_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_actif",TAB_GLOBAL_COMPO[265],ag_actif))
         return -1;
 var ag_role=GetValAt(266);
 if (!ValiderChampsObligatoire(Table,"ag_role",TAB_GLOBAL_COMPO[266],ag_role,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_role",TAB_GLOBAL_COMPO[266],ag_role))
         return -1;
 var eq_numero=GetValAt(267);
 if (eq_numero=="-1")
    eq_numero="null";
 if (!ValiderChampsObligatoire(Table,"eq_numero",TAB_GLOBAL_COMPO[267],eq_numero,true))
         return -1;
 var ag_telephone=GetValAt(268);
 if (!ValiderChampsObligatoire(Table,"ag_telephone",TAB_GLOBAL_COMPO[268],ag_telephone,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_telephone",TAB_GLOBAL_COMPO[268],ag_telephone))
         return -1;
 var ag_mobile=GetValAt(269);
 if (!ValiderChampsObligatoire(Table,"ag_mobile",TAB_GLOBAL_COMPO[269],ag_mobile,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_mobile",TAB_GLOBAL_COMPO[269],ag_mobile))
         return -1;
 var ag_email=GetValAt(270);
 if (!ValiderChampsObligatoire(Table,"ag_email",TAB_GLOBAL_COMPO[270],ag_email,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_email",TAB_GLOBAL_COMPO[270],ag_email))
         return -1;
 var ag_commentaire=GetValAt(271);
 if (!ValiderChampsObligatoire(Table,"ag_commentaire",TAB_GLOBAL_COMPO[271],ag_commentaire,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_commentaire",TAB_GLOBAL_COMPO[271],ag_commentaire))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ag_nom,ag_prenom,ag_initiales,ag_actif,ag_role,eq_numero,ag_telephone,ag_mobile,ag_email,ag_commentaire"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ag_nom=="" ? "null" : "'"+ValiderChaine(ag_nom)+"'" )+","+(ag_prenom=="" ? "null" : "'"+ValiderChaine(ag_prenom)+"'" )+","+(ag_initiales=="" ? "null" : "'"+ValiderChaine(ag_initiales)+"'" )+","+(ag_actif=="true" ? "true" : "false")+","+(ag_role=="" ? "null" : "'"+ValiderChaine(ag_role)+"'" )+","+eq_numero+","+(ag_telephone=="" ? "null" : "'"+ValiderChaine(ag_telephone)+"'" )+","+(ag_mobile=="" ? "null" : "'"+ValiderChaine(ag_mobile)+"'" )+","+(ag_email=="" ? "null" : "'"+ValiderChaine(ag_email)+"'" )+","+(ag_commentaire=="" ? "null" : "'"+ValiderChaine(ag_commentaire)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Agents
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Agents_Liste_des_agents0(Compo_Maitre)
{
 var Table="agent";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Agents
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Agents_Liste_des_agents0(Compo_Maitre)
{
 var Table="agent";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ag_nom=GetValAt(262);
 if (!ValiderChampsObligatoire(Table,"ag_nom",TAB_GLOBAL_COMPO[262],ag_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_nom",TAB_GLOBAL_COMPO[262],ag_nom))
         return -1;
 var ag_prenom=GetValAt(263);
 if (!ValiderChampsObligatoire(Table,"ag_prenom",TAB_GLOBAL_COMPO[263],ag_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_prenom",TAB_GLOBAL_COMPO[263],ag_prenom))
         return -1;
 var ag_initiales=GetValAt(264);
 if (!ValiderChampsObligatoire(Table,"ag_initiales",TAB_GLOBAL_COMPO[264],ag_initiales,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_initiales",TAB_GLOBAL_COMPO[264],ag_initiales))
         return -1;
 var ag_actif=GetValAt(265);
 if (!ValiderChampsObligatoire(Table,"ag_actif",TAB_GLOBAL_COMPO[265],ag_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_actif",TAB_GLOBAL_COMPO[265],ag_actif))
         return -1;
 var ag_role=GetValAt(266);
 if (!ValiderChampsObligatoire(Table,"ag_role",TAB_GLOBAL_COMPO[266],ag_role,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_role",TAB_GLOBAL_COMPO[266],ag_role))
         return -1;
 var eq_numero=GetValAt(267);
 if (eq_numero=="-1")
    eq_numero="null";
 if (!ValiderChampsObligatoire(Table,"eq_numero",TAB_GLOBAL_COMPO[267],eq_numero,true))
         return -1;
 var ag_telephone=GetValAt(268);
 if (!ValiderChampsObligatoire(Table,"ag_telephone",TAB_GLOBAL_COMPO[268],ag_telephone,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_telephone",TAB_GLOBAL_COMPO[268],ag_telephone))
         return -1;
 var ag_mobile=GetValAt(269);
 if (!ValiderChampsObligatoire(Table,"ag_mobile",TAB_GLOBAL_COMPO[269],ag_mobile,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_mobile",TAB_GLOBAL_COMPO[269],ag_mobile))
         return -1;
 var ag_email=GetValAt(270);
 if (!ValiderChampsObligatoire(Table,"ag_email",TAB_GLOBAL_COMPO[270],ag_email,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_email",TAB_GLOBAL_COMPO[270],ag_email))
         return -1;
 var ag_commentaire=GetValAt(271);
 if (!ValiderChampsObligatoire(Table,"ag_commentaire",TAB_GLOBAL_COMPO[271],ag_commentaire,false))
         return -1;
 if (!ValiderChampsType(Table,"ag_commentaire",TAB_GLOBAL_COMPO[271],ag_commentaire))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ag_nom="+(ag_nom=="" ? "null" : "'"+ValiderChaine(ag_nom)+"'" )+",ag_prenom="+(ag_prenom=="" ? "null" : "'"+ValiderChaine(ag_prenom)+"'" )+",ag_initiales="+(ag_initiales=="" ? "null" : "'"+ValiderChaine(ag_initiales)+"'" )+",ag_actif="+(ag_actif=="true" ? "true" : "false")+",ag_role="+(ag_role=="" ? "null" : "'"+ValiderChaine(ag_role)+"'" )+",eq_numero="+eq_numero+",ag_telephone="+(ag_telephone=="" ? "null" : "'"+ValiderChaine(ag_telephone)+"'" )+",ag_mobile="+(ag_mobile=="" ? "null" : "'"+ValiderChaine(ag_mobile)+"'" )+",ag_email="+(ag_email=="" ? "null" : "'"+ValiderChaine(ag_email)+"'" )+",ag_commentaire="+(ag_commentaire=="" ? "null" : "'"+ValiderChaine(ag_commentaire)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Cantons
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Cantons_Liste_des_cantons0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 302;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 303;
complexe
Nbr Jointure: 1;
    Joint n� 0 = ville,ct_numero,ct_numero

******************
*/

 var Table="canton";
 var CleMaitre = TAB_COMPO_PPTES[299].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ct_nom=GetValAt(302);
 if (!ValiderChampsObligatoire(Table,"ct_nom",TAB_GLOBAL_COMPO[302],ct_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ct_nom",TAB_GLOBAL_COMPO[302],ct_nom))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ct_nom"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ct_nom=="" ? "null" : "'"+ValiderChaine(ct_nom)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Cantons
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Cantons_Liste_des_cantons0(Compo_Maitre)
{
 var Table="canton";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Cantons
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Cantons_Liste_des_cantons0(Compo_Maitre)
{
 var Table="canton";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ct_nom=GetValAt(302);
 if (!ValiderChampsObligatoire(Table,"ct_nom",TAB_GLOBAL_COMPO[302],ct_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ct_nom",TAB_GLOBAL_COMPO[302],ct_nom))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ct_nom="+(ct_nom=="" ? "null" : "'"+ValiderChaine(ct_nom)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Codes postaux
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Codes_postaux_Liste_des_codes_postaux0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 284;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 288;
complexe
Nbr Jointure: 2;
    Joint n� 0 = villecp,cp_numero,cp_numero
    Joint n� 1 = ville,vi_numero,vi_numero

******************
*/

 var Table="codepostal";
 var CleMaitre = TAB_COMPO_PPTES[281].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cp_codepostal=GetValAt(284);
 if (!ValiderChampsObligatoire(Table,"cp_codepostal",TAB_GLOBAL_COMPO[284],cp_codepostal,false))
         return -1;
 if (!ValiderChampsType(Table,"cp_codepostal",TAB_GLOBAL_COMPO[284],cp_codepostal))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",cp_codepostal"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(cp_codepostal=="" ? "null" : "'"+ValiderChaine(cp_codepostal)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");

/* table ville*/
LstDouble_Exec_Req(GetSQLCompoAt(288),CleMaitre);
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Codes postaux
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Codes_postaux_Liste_des_codes_postaux0(Compo_Maitre)
{
 var Table="codepostal";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Codes postaux
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Codes_postaux_Liste_des_codes_postaux0(Compo_Maitre)
{
 var Table="codepostal";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cp_codepostal=GetValAt(284);
 if (!ValiderChampsObligatoire(Table,"cp_codepostal",TAB_GLOBAL_COMPO[284],cp_codepostal,false))
         return -1;
 if (!ValiderChampsType(Table,"cp_codepostal",TAB_GLOBAL_COMPO[284],cp_codepostal))
         return -1;
 var Req="update "+Table+" set ";
 Req+="cp_codepostal="+(cp_codepostal=="" ? "null" : "'"+ValiderChaine(cp_codepostal)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");

/* table ville*/
LstDouble_Exec_Req(GetSQLCompoAt(288),CleMaitre);
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Constantes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Constantes_Liste_des_constantes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 253;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 254;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 255;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="constante";
 var CleMaitre = TAB_COMPO_PPTES[249].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cs_description=GetValAt(253);
 if (!ValiderChampsObligatoire(Table,"cs_description",TAB_GLOBAL_COMPO[253],cs_description,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_description",TAB_GLOBAL_COMPO[253],cs_description))
         return -1;
 var cs_valeur=GetValAt(254);
 if (!ValiderChampsObligatoire(Table,"cs_valeur",TAB_GLOBAL_COMPO[254],cs_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_valeur",TAB_GLOBAL_COMPO[254],cs_valeur))
         return -1;
 var cs_nom=GetValAt(255);
 if (!ValiderChampsObligatoire(Table,"cs_nom",TAB_GLOBAL_COMPO[255],cs_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_nom",TAB_GLOBAL_COMPO[255],cs_nom))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",cs_description,cs_valeur,cs_nom"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(cs_description=="" ? "null" : "'"+ValiderChaine(cs_description)+"'" )+","+(cs_valeur=="" ? "null" : "'"+ValiderChaine(cs_valeur)+"'" )+","+(cs_nom=="" ? "null" : "'"+ValiderChaine(cs_nom)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Constantes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Constantes_Liste_des_constantes0(Compo_Maitre)
{
 var Table="constante";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Constantes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Constantes_Liste_des_constantes0(Compo_Maitre)
{
 var Table="constante";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cs_description=GetValAt(253);
 if (!ValiderChampsObligatoire(Table,"cs_description",TAB_GLOBAL_COMPO[253],cs_description,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_description",TAB_GLOBAL_COMPO[253],cs_description))
         return -1;
 var cs_valeur=GetValAt(254);
 if (!ValiderChampsObligatoire(Table,"cs_valeur",TAB_GLOBAL_COMPO[254],cs_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_valeur",TAB_GLOBAL_COMPO[254],cs_valeur))
         return -1;
 var cs_nom=GetValAt(255);
 if (!ValiderChampsObligatoire(Table,"cs_nom",TAB_GLOBAL_COMPO[255],cs_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_nom",TAB_GLOBAL_COMPO[255],cs_nom))
         return -1;
 var Req="update "+Table+" set ";
 Req+="cs_description="+(cs_description=="" ? "null" : "'"+ValiderChaine(cs_description)+"'" )+",cs_valeur="+(cs_valeur=="" ? "null" : "'"+ValiderChaine(cs_valeur)+"'" )+",cs_nom="+(cs_nom=="" ? "null" : "'"+ValiderChaine(cs_nom)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Profils de droits
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Profils_de_droits_Liste_des_profils_de_droits0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 235;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 236;
complexe
Nbr Jointure: 1;
    Joint n� 0 = droit,dp_numero,dp_numero

******************
*/

 var Table="droitprofil";
 var CleMaitre = TAB_COMPO_PPTES[233].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var dp_libelle=GetValAt(235);
 if (!ValiderChampsObligatoire(Table,"dp_libelle",TAB_GLOBAL_COMPO[235],dp_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"dp_libelle",TAB_GLOBAL_COMPO[235],dp_libelle))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",dp_libelle"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(dp_libelle=="" ? "null" : "'"+ValiderChaine(dp_libelle)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Profils de droits
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Profils_de_droits_Liste_des_profils_de_droits0(Compo_Maitre)
{
 var Table="droitprofil";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Profils de droits
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Profils_de_droits_Liste_des_profils_de_droits0(Compo_Maitre)
{
 var Table="droitprofil";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var dp_libelle=GetValAt(235);
 if (!ValiderChampsObligatoire(Table,"dp_libelle",TAB_GLOBAL_COMPO[235],dp_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"dp_libelle",TAB_GLOBAL_COMPO[235],dp_libelle))
         return -1;
 var Req="update "+Table+" set ";
 Req+="dp_libelle="+(dp_libelle=="" ? "null" : "'"+ValiderChaine(dp_libelle)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Profils de droits
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Profils_de_droits_Droits_2(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 239;
simple
Nbr Jointure: 1;
    Joint n� 0 = groupetable,gt_numero,gt_numero

Id dans le tab: 240;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 241;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 242;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 243;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="droit";
 var CleMaitre = TAB_COMPO_PPTES[236].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var gt_numero=GetValAt(239);
 if (gt_numero=="-1")
    gt_numero="null";
 if (!ValiderChampsObligatoire(Table,"gt_numero",TAB_GLOBAL_COMPO[239],gt_numero,true))
         return -1;
 var dr_select=GetValAt(240);
 if (!ValiderChampsObligatoire(Table,"dr_select",TAB_GLOBAL_COMPO[240],dr_select,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_select",TAB_GLOBAL_COMPO[240],dr_select))
         return -1;
 var dr_insert=GetValAt(241);
 if (!ValiderChampsObligatoire(Table,"dr_insert",TAB_GLOBAL_COMPO[241],dr_insert,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_insert",TAB_GLOBAL_COMPO[241],dr_insert))
         return -1;
 var dr_update=GetValAt(242);
 if (!ValiderChampsObligatoire(Table,"dr_update",TAB_GLOBAL_COMPO[242],dr_update,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_update",TAB_GLOBAL_COMPO[242],dr_update))
         return -1;
 var dr_delete=GetValAt(243);
 if (!ValiderChampsObligatoire(Table,"dr_delete",TAB_GLOBAL_COMPO[243],dr_delete,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_delete",TAB_GLOBAL_COMPO[243],dr_delete))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",dp_numero,gt_numero,dr_select,dr_insert,dr_update,dr_delete"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[233].NewCle+","+gt_numero+","+(dr_select=="true" ? "true" : "false")+","+(dr_insert=="true" ? "true" : "false")+","+(dr_update=="true" ? "true" : "false")+","+(dr_delete=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Profils de droits
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Profils_de_droits_Droits_2(Compo_Maitre)
{
 var Table="droit";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Profils de droits
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Profils_de_droits_Droits_2(Compo_Maitre)
{
 var Table="droit";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var gt_numero=GetValAt(239);
 if (gt_numero=="-1")
    gt_numero="null";
 if (!ValiderChampsObligatoire(Table,"gt_numero",TAB_GLOBAL_COMPO[239],gt_numero,true))
         return -1;
 var dr_select=GetValAt(240);
 if (!ValiderChampsObligatoire(Table,"dr_select",TAB_GLOBAL_COMPO[240],dr_select,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_select",TAB_GLOBAL_COMPO[240],dr_select))
         return -1;
 var dr_insert=GetValAt(241);
 if (!ValiderChampsObligatoire(Table,"dr_insert",TAB_GLOBAL_COMPO[241],dr_insert,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_insert",TAB_GLOBAL_COMPO[241],dr_insert))
         return -1;
 var dr_update=GetValAt(242);
 if (!ValiderChampsObligatoire(Table,"dr_update",TAB_GLOBAL_COMPO[242],dr_update,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_update",TAB_GLOBAL_COMPO[242],dr_update))
         return -1;
 var dr_delete=GetValAt(243);
 if (!ValiderChampsObligatoire(Table,"dr_delete",TAB_GLOBAL_COMPO[243],dr_delete,false))
         return -1;
 if (!ValiderChampsType(Table,"dr_delete",TAB_GLOBAL_COMPO[243],dr_delete))
         return -1;
 var Req="update "+Table+" set ";
 Req+="gt_numero="+gt_numero+",dr_select="+(dr_select=="true" ? "true" : "false")+",dr_insert="+(dr_insert=="true" ? "true" : "false")+",dr_update="+(dr_update=="true" ? "true" : "false")+",dr_delete="+(dr_delete=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Employ�s
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Employ�s_Liste_des_employ�s0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 13

Id dans le tab: 220;
simple
Nbr Jointure: 1;
    Joint n� 0 = agent,em_agent,ag_numero

Id dans le tab: 221;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 222;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 223;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 224;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 225;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 226;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 227;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 228;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 229;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 230;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 231;
simple
Nbr Jointure: 1;
    Joint n� 0 = acces,em_acces,ac_numero

Id dans le tab: 232;
simple
Nbr Jointure: 1;
    Joint n� 0 = droitprofil,dp_numero,dp_numero

******************
*/

 var Table="employe";
 var CleMaitre = TAB_COMPO_PPTES[216].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var em_agent=GetValAt(220);
 if (em_agent=="-1")
    em_agent="null";
 if (!ValiderChampsObligatoire(Table,"em_agent",TAB_GLOBAL_COMPO[220],em_agent,true))
         return -1;
 var em_login=GetValAt(221);
 if (!ValiderChampsObligatoire(Table,"em_login",TAB_GLOBAL_COMPO[221],em_login,false))
         return -1;
 if (!ValiderChampsType(Table,"em_login",TAB_GLOBAL_COMPO[221],em_login))
         return -1;
 var em_password=GetValAt(222);
 if (!ValiderChampsObligatoire(Table,"em_password",TAB_GLOBAL_COMPO[222],em_password,false))
         return -1;
 if (!ValiderChampsType(Table,"em_password",TAB_GLOBAL_COMPO[222],em_password))
         return -1;
 var em_super=GetValAt(223);
 if (!ValiderChampsObligatoire(Table,"em_super",TAB_GLOBAL_COMPO[223],em_super,false))
         return -1;
 if (!ValiderChampsType(Table,"em_super",TAB_GLOBAL_COMPO[223],em_super))
         return -1;
 var em_reglement=GetValAt(224);
 if (!ValiderChampsObligatoire(Table,"em_reglement",TAB_GLOBAL_COMPO[224],em_reglement,false))
         return -1;
 if (!ValiderChampsType(Table,"em_reglement",TAB_GLOBAL_COMPO[224],em_reglement))
         return -1;
 var em_self_invoicing=GetValAt(225);
 if (!ValiderChampsObligatoire(Table,"em_self_invoicing",TAB_GLOBAL_COMPO[225],em_self_invoicing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_self_invoicing",TAB_GLOBAL_COMPO[225],em_self_invoicing))
         return -1;
 var em_service_invoicing=GetValAt(226);
 if (!ValiderChampsObligatoire(Table,"em_service_invoicing",TAB_GLOBAL_COMPO[226],em_service_invoicing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_service_invoicing",TAB_GLOBAL_COMPO[226],em_service_invoicing))
         return -1;
 var em_societe_invoicing=GetValAt(227);
 if (!ValiderChampsObligatoire(Table,"em_societe_invoicing",TAB_GLOBAL_COMPO[227],em_societe_invoicing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_societe_invoicing",TAB_GLOBAL_COMPO[227],em_societe_invoicing))
         return -1;
 var em_cancel_invoice=GetValAt(228);
 if (!ValiderChampsObligatoire(Table,"em_cancel_invoice",TAB_GLOBAL_COMPO[228],em_cancel_invoice,false))
         return -1;
 if (!ValiderChampsType(Table,"em_cancel_invoice",TAB_GLOBAL_COMPO[228],em_cancel_invoice))
         return -1;
 var em_personne_editing=GetValAt(229);
 if (!ValiderChampsObligatoire(Table,"em_personne_editing",TAB_GLOBAL_COMPO[229],em_personne_editing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_personne_editing",TAB_GLOBAL_COMPO[229],em_personne_editing))
         return -1;
 var em_emploi=GetValAt(230);
 if (!ValiderChampsObligatoire(Table,"em_emploi",TAB_GLOBAL_COMPO[230],em_emploi,false))
         return -1;
 if (!ValiderChampsType(Table,"em_emploi",TAB_GLOBAL_COMPO[230],em_emploi))
         return -1;
 var em_acces=GetValAt(231);
 if (em_acces=="-1")
    em_acces="null";
 if (!ValiderChampsObligatoire(Table,"em_acces",TAB_GLOBAL_COMPO[231],em_acces,true))
         return -1;
 var dp_numero=GetValAt(232);
 if (dp_numero=="-1")
    dp_numero="null";
 if (!ValiderChampsObligatoire(Table,"dp_numero",TAB_GLOBAL_COMPO[232],dp_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(212);
var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();
var CleLiasonForte = CompoLieMaitre.getCleVal();
if (CleLiasonForte!=-1)
{
        Asso11=GenererAssociation11(CompoLie,CleMaitre,CleLiasonForte,TabAsso11);
}
else
{
        alert("Vous devez d'abord valider "+CompoLieMaitre.getLabel()+" puis mettre � jour.");
        return -1;
}
 Req+="("+NomCleMaitre+",em_agent,em_login,em_password,em_super,em_reglement,em_self_invoicing,em_service_invoicing,em_societe_invoicing,em_cancel_invoice,em_personne_editing,em_emploi,em_acces,dp_numero"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+em_agent+","+(em_login=="" ? "null" : "'"+ValiderChaine(em_login)+"'" )+","+(em_password=="" ? "null" : "'"+ValiderChaine(em_password)+"'" )+","+(em_super=="true" ? "true" : "false")+","+(em_reglement=="true" ? "true" : "false")+","+(em_self_invoicing=="true" ? "true" : "false")+","+(em_service_invoicing=="true" ? "true" : "false")+","+(em_societe_invoicing=="true" ? "true" : "false")+","+(em_cancel_invoice=="true" ? "true" : "false")+","+(em_personne_editing=="true" ? "true" : "false")+","+(em_emploi=="" ? "null" : "'"+ValiderChaine(em_emploi)+"'" )+","+em_acces+","+dp_numero+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
if (CleLiasonForte!=-1 && !Asso11)
{
        AjouterAssociation(CompoLie,CleMaitre,CleLiasonForte);
}
else
{
        if (CleLiasonForte==-1)
        {
                alert("Attention votre enregistrement ne peux �tre reli� � "+CompoLieMaitre.getLabel()+". Vous devez d'abord ajouter un enregistrement � "+CompoLieMaitre.getLabel()+" puis le mettre � jour");
                return -1;
        }
}
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Employ�s
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Employ�s_Liste_des_employ�s0(Compo_Maitre)
{
 var Table="employe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(212);
var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();
var CleLiasonForte = CompoLieMaitre.getCleVal();
if (CleLiasonForte!=-1)
{
        SuprimerAssociation(CompoLie,CleMaitre,CleLiasonForte);
}
else
{
        alert("Erreur "+CompoLieMaitre.getLabel()+" correspondant(e) Introuvable");
        return CleMaitre;
}
 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Employ�s
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Employ�s_Liste_des_employ�s0(Compo_Maitre)
{
 var Table="employe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var em_agent=GetValAt(220);
 if (em_agent=="-1")
    em_agent="null";
 if (!ValiderChampsObligatoire(Table,"em_agent",TAB_GLOBAL_COMPO[220],em_agent,true))
         return -1;
 var em_login=GetValAt(221);
 if (!ValiderChampsObligatoire(Table,"em_login",TAB_GLOBAL_COMPO[221],em_login,false))
         return -1;
 if (!ValiderChampsType(Table,"em_login",TAB_GLOBAL_COMPO[221],em_login))
         return -1;
 var em_password=GetValAt(222);
 if (!ValiderChampsObligatoire(Table,"em_password",TAB_GLOBAL_COMPO[222],em_password,false))
         return -1;
 if (!ValiderChampsType(Table,"em_password",TAB_GLOBAL_COMPO[222],em_password))
         return -1;
 var em_super=GetValAt(223);
 if (!ValiderChampsObligatoire(Table,"em_super",TAB_GLOBAL_COMPO[223],em_super,false))
         return -1;
 if (!ValiderChampsType(Table,"em_super",TAB_GLOBAL_COMPO[223],em_super))
         return -1;
 var em_reglement=GetValAt(224);
 if (!ValiderChampsObligatoire(Table,"em_reglement",TAB_GLOBAL_COMPO[224],em_reglement,false))
         return -1;
 if (!ValiderChampsType(Table,"em_reglement",TAB_GLOBAL_COMPO[224],em_reglement))
         return -1;
 var em_self_invoicing=GetValAt(225);
 if (!ValiderChampsObligatoire(Table,"em_self_invoicing",TAB_GLOBAL_COMPO[225],em_self_invoicing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_self_invoicing",TAB_GLOBAL_COMPO[225],em_self_invoicing))
         return -1;
 var em_service_invoicing=GetValAt(226);
 if (!ValiderChampsObligatoire(Table,"em_service_invoicing",TAB_GLOBAL_COMPO[226],em_service_invoicing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_service_invoicing",TAB_GLOBAL_COMPO[226],em_service_invoicing))
         return -1;
 var em_societe_invoicing=GetValAt(227);
 if (!ValiderChampsObligatoire(Table,"em_societe_invoicing",TAB_GLOBAL_COMPO[227],em_societe_invoicing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_societe_invoicing",TAB_GLOBAL_COMPO[227],em_societe_invoicing))
         return -1;
 var em_cancel_invoice=GetValAt(228);
 if (!ValiderChampsObligatoire(Table,"em_cancel_invoice",TAB_GLOBAL_COMPO[228],em_cancel_invoice,false))
         return -1;
 if (!ValiderChampsType(Table,"em_cancel_invoice",TAB_GLOBAL_COMPO[228],em_cancel_invoice))
         return -1;
 var em_personne_editing=GetValAt(229);
 if (!ValiderChampsObligatoire(Table,"em_personne_editing",TAB_GLOBAL_COMPO[229],em_personne_editing,false))
         return -1;
 if (!ValiderChampsType(Table,"em_personne_editing",TAB_GLOBAL_COMPO[229],em_personne_editing))
         return -1;
 var em_emploi=GetValAt(230);
 if (!ValiderChampsObligatoire(Table,"em_emploi",TAB_GLOBAL_COMPO[230],em_emploi,false))
         return -1;
 if (!ValiderChampsType(Table,"em_emploi",TAB_GLOBAL_COMPO[230],em_emploi))
         return -1;
 var em_acces=GetValAt(231);
 if (em_acces=="-1")
    em_acces="null";
 if (!ValiderChampsObligatoire(Table,"em_acces",TAB_GLOBAL_COMPO[231],em_acces,true))
         return -1;
 var dp_numero=GetValAt(232);
 if (dp_numero=="-1")
    dp_numero="null";
 if (!ValiderChampsObligatoire(Table,"dp_numero",TAB_GLOBAL_COMPO[232],dp_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="em_agent="+em_agent+",em_login="+(em_login=="" ? "null" : "'"+ValiderChaine(em_login)+"'" )+",em_password="+(em_password=="" ? "null" : "'"+ValiderChaine(em_password)+"'" )+",em_super="+(em_super=="true" ? "true" : "false")+",em_reglement="+(em_reglement=="true" ? "true" : "false")+",em_self_invoicing="+(em_self_invoicing=="true" ? "true" : "false")+",em_service_invoicing="+(em_service_invoicing=="true" ? "true" : "false")+",em_societe_invoicing="+(em_societe_invoicing=="true" ? "true" : "false")+",em_cancel_invoice="+(em_cancel_invoice=="true" ? "true" : "false")+",em_personne_editing="+(em_personne_editing=="true" ? "true" : "false")+",em_emploi="+(em_emploi=="" ? "null" : "'"+ValiderChaine(em_emploi)+"'" )+",em_acces="+em_acces+",dp_numero="+dp_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : �quipes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_�quipes_Liste_des_�quipes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 1

Id dans le tab: 274;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="equipe";
 var CleMaitre = TAB_COMPO_PPTES[272].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var eq_nom=GetValAt(274);
 if (!ValiderChampsObligatoire(Table,"eq_nom",TAB_GLOBAL_COMPO[274],eq_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"eq_nom",TAB_GLOBAL_COMPO[274],eq_nom))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",eq_nom"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(eq_nom=="" ? "null" : "'"+ValiderChaine(eq_nom)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : �quipes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_�quipes_Liste_des_�quipes0(Compo_Maitre)
{
 var Table="equipe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : �quipes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_�quipes_Liste_des_�quipes0(Compo_Maitre)
{
 var Table="equipe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var eq_nom=GetValAt(274);
 if (!ValiderChampsObligatoire(Table,"eq_nom",TAB_GLOBAL_COMPO[274],eq_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"eq_nom",TAB_GLOBAL_COMPO[274],eq_nom))
         return -1;
 var Req="update "+Table+" set ";
 Req+="eq_nom="+(eq_nom=="" ? "null" : "'"+ValiderChaine(eq_nom)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupe de tables
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Groupe_de_tables_Liste_des_groupes_de_tables0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 247;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 248;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="groupetable";
 var CleMaitre = TAB_COMPO_PPTES[244].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var gt_libelle=GetValAt(247);
 if (!ValiderChampsObligatoire(Table,"gt_libelle",TAB_GLOBAL_COMPO[247],gt_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"gt_libelle",TAB_GLOBAL_COMPO[247],gt_libelle))
         return -1;
 var gt_tables=GetValAt(248);
 if (!ValiderChampsObligatoire(Table,"gt_tables",TAB_GLOBAL_COMPO[248],gt_tables,false))
         return -1;
 if (!ValiderChampsType(Table,"gt_tables",TAB_GLOBAL_COMPO[248],gt_tables))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",gt_libelle,gt_tables"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(gt_libelle=="" ? "null" : "'"+ValiderChaine(gt_libelle)+"'" )+","+(gt_tables=="" ? "null" : "'"+ValiderChaine(gt_tables)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupe de tables
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Groupe_de_tables_Liste_des_groupes_de_tables0(Compo_Maitre)
{
 var Table="groupetable";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupe de tables
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Groupe_de_tables_Liste_des_groupes_de_tables0(Compo_Maitre)
{
 var Table="groupetable";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var gt_libelle=GetValAt(247);
 if (!ValiderChampsObligatoire(Table,"gt_libelle",TAB_GLOBAL_COMPO[247],gt_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"gt_libelle",TAB_GLOBAL_COMPO[247],gt_libelle))
         return -1;
 var gt_tables=GetValAt(248);
 if (!ValiderChampsObligatoire(Table,"gt_tables",TAB_GLOBAL_COMPO[248],gt_tables,false))
         return -1;
 if (!ValiderChampsType(Table,"gt_tables",TAB_GLOBAL_COMPO[248],gt_tables))
         return -1;
 var Req="update "+Table+" set ";
 Req+="gt_libelle="+(gt_libelle=="" ? "null" : "'"+ValiderChaine(gt_libelle)+"'" )+",gt_tables="+(gt_tables=="" ? "null" : "'"+ValiderChaine(gt_tables)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupes de cantons
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Groupes_de_cantons_Liste_des_groupes_de_cantons0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 150;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 154;
complexe
Nbr Jointure: 2;
    Joint n� 0 = appartienta,gc_numero,gc_numero
    Joint n� 1 = canton,ct_numero,ct_numero

******************
*/

 var Table="groupecanton";
 var CleMaitre = TAB_COMPO_PPTES[147].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var gc_nom=GetValAt(150);
 if (!ValiderChampsObligatoire(Table,"gc_nom",TAB_GLOBAL_COMPO[150],gc_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"gc_nom",TAB_GLOBAL_COMPO[150],gc_nom))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",gc_nom"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(gc_nom=="" ? "null" : "'"+ValiderChaine(gc_nom)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");

/* table canton*/
LstDouble_Exec_Req(GetSQLCompoAt(154),CleMaitre);
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupes de cantons
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Groupes_de_cantons_Liste_des_groupes_de_cantons0(Compo_Maitre)
{
 var Table="groupecanton";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupes de cantons
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Groupes_de_cantons_Liste_des_groupes_de_cantons0(Compo_Maitre)
{
 var Table="groupecanton";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var gc_nom=GetValAt(150);
 if (!ValiderChampsObligatoire(Table,"gc_nom",TAB_GLOBAL_COMPO[150],gc_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"gc_nom",TAB_GLOBAL_COMPO[150],gc_nom))
         return -1;
 var Req="update "+Table+" set ";
 Req+="gc_nom="+(gc_nom=="" ? "null" : "'"+ValiderChaine(gc_nom)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");

/* table canton*/
LstDouble_Exec_Req(GetSQLCompoAt(154),CleMaitre);
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les d'impressions
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 7

Id dans le tab: 386;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 387;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 388;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 389;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 390;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 391;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 392;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="impression";
 var CleMaitre = TAB_COMPO_PPTES[382].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var im_libelle=GetValAt(386);
 if (!ValiderChampsObligatoire(Table,"im_libelle",TAB_GLOBAL_COMPO[386],im_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_libelle",TAB_GLOBAL_COMPO[386],im_libelle))
         return -1;
 var im_nom=GetValAt(387);
 if (!ValiderChampsObligatoire(Table,"im_nom",TAB_GLOBAL_COMPO[387],im_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"im_nom",TAB_GLOBAL_COMPO[387],im_nom))
         return -1;
 var im_modele=GetValAt(388);
 if (!ValiderChampsObligatoire(Table,"im_modele",TAB_GLOBAL_COMPO[388],im_modele,false))
         return -1;
 if (!ValiderChampsType(Table,"im_modele",TAB_GLOBAL_COMPO[388],im_modele))
         return -1;
 var im_defaut=GetValAt(389);
 if (!ValiderChampsObligatoire(Table,"im_defaut",TAB_GLOBAL_COMPO[389],im_defaut,false))
         return -1;
 if (!ValiderChampsType(Table,"im_defaut",TAB_GLOBAL_COMPO[389],im_defaut))
         return -1;
 var im_keytable=GetValAt(390);
 if (!ValiderChampsObligatoire(Table,"im_keytable",TAB_GLOBAL_COMPO[390],im_keytable,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keytable",TAB_GLOBAL_COMPO[390],im_keytable))
         return -1;
 var im_keycle=GetValAt(391);
 if (!ValiderChampsObligatoire(Table,"im_keycle",TAB_GLOBAL_COMPO[391],im_keycle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keycle",TAB_GLOBAL_COMPO[391],im_keycle))
         return -1;
 var im_keydate=GetValAt(392);
 if (!ValiderChampsObligatoire(Table,"im_keydate",TAB_GLOBAL_COMPO[392],im_keydate,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keydate",TAB_GLOBAL_COMPO[392],im_keydate))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",im_libelle,im_nom,im_modele,im_defaut,im_keytable,im_keycle,im_keydate"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(im_libelle=="" ? "null" : "'"+ValiderChaine(im_libelle)+"'" )+","+(im_nom=="" ? "null" : "'"+ValiderChaine(im_nom)+"'" )+","+(im_modele=="" ? "null" : "'"+ValiderChaine(im_modele)+"'" )+","+(im_defaut=="true" ? "true" : "false")+","+(im_keytable=="" ? "null" : "'"+ValiderChaine(im_keytable)+"'" )+","+(im_keycle=="" ? "null" : "'"+ValiderChaine(im_keycle)+"'" )+","+(im_keydate=="" ? "null" : "'"+ValiderChaine(im_keydate)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les d'impressions
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0(Compo_Maitre)
{
 var Table="impression";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les d'impressions
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Mod�les_d_impressions_Liste_des_mod�les_d_impressions0(Compo_Maitre)
{
 var Table="impression";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var im_libelle=GetValAt(386);
 if (!ValiderChampsObligatoire(Table,"im_libelle",TAB_GLOBAL_COMPO[386],im_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_libelle",TAB_GLOBAL_COMPO[386],im_libelle))
         return -1;
 var im_nom=GetValAt(387);
 if (!ValiderChampsObligatoire(Table,"im_nom",TAB_GLOBAL_COMPO[387],im_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"im_nom",TAB_GLOBAL_COMPO[387],im_nom))
         return -1;
 var im_modele=GetValAt(388);
 if (!ValiderChampsObligatoire(Table,"im_modele",TAB_GLOBAL_COMPO[388],im_modele,false))
         return -1;
 if (!ValiderChampsType(Table,"im_modele",TAB_GLOBAL_COMPO[388],im_modele))
         return -1;
 var im_defaut=GetValAt(389);
 if (!ValiderChampsObligatoire(Table,"im_defaut",TAB_GLOBAL_COMPO[389],im_defaut,false))
         return -1;
 if (!ValiderChampsType(Table,"im_defaut",TAB_GLOBAL_COMPO[389],im_defaut))
         return -1;
 var im_keytable=GetValAt(390);
 if (!ValiderChampsObligatoire(Table,"im_keytable",TAB_GLOBAL_COMPO[390],im_keytable,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keytable",TAB_GLOBAL_COMPO[390],im_keytable))
         return -1;
 var im_keycle=GetValAt(391);
 if (!ValiderChampsObligatoire(Table,"im_keycle",TAB_GLOBAL_COMPO[391],im_keycle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keycle",TAB_GLOBAL_COMPO[391],im_keycle))
         return -1;
 var im_keydate=GetValAt(392);
 if (!ValiderChampsObligatoire(Table,"im_keydate",TAB_GLOBAL_COMPO[392],im_keydate,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keydate",TAB_GLOBAL_COMPO[392],im_keydate))
         return -1;
 var Req="update "+Table+" set ";
 Req+="im_libelle="+(im_libelle=="" ? "null" : "'"+ValiderChaine(im_libelle)+"'" )+",im_nom="+(im_nom=="" ? "null" : "'"+ValiderChaine(im_nom)+"'" )+",im_modele="+(im_modele=="" ? "null" : "'"+ValiderChaine(im_modele)+"'" )+",im_defaut="+(im_defaut=="true" ? "true" : "false")+",im_keytable="+(im_keytable=="" ? "null" : "'"+ValiderChaine(im_keytable)+"'" )+",im_keycle="+(im_keycle=="" ? "null" : "'"+ValiderChaine(im_keycle)+"'" )+",im_keydate="+(im_keydate=="" ? "null" : "'"+ValiderChaine(im_keydate)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Impressions
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Impressions_Liste_des_mod�les_d_impressions0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 8

Id dans le tab: 397;
simple
Nbr Jointure: 1;
    Joint n� 0 = societe,im_societe,so_numero

Id dans le tab: 398;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 399;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 400;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 401;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 402;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 403;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 404;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="table_impression";
 var CleMaitre = TAB_COMPO_PPTES[393].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var im_societe=GetValAt(397);
 if (im_societe=="-1")
    im_societe="null";
 if (!ValiderChampsObligatoire(Table,"im_societe",TAB_GLOBAL_COMPO[397],im_societe,true))
         return -1;
 var im_libelle=GetValAt(398);
 if (!ValiderChampsObligatoire(Table,"im_libelle",TAB_GLOBAL_COMPO[398],im_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_libelle",TAB_GLOBAL_COMPO[398],im_libelle))
         return -1;
 var im_nom=GetValAt(399);
 if (!ValiderChampsObligatoire(Table,"im_nom",TAB_GLOBAL_COMPO[399],im_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"im_nom",TAB_GLOBAL_COMPO[399],im_nom))
         return -1;
 var im_modele=GetValAt(400);
 if (!ValiderChampsObligatoire(Table,"im_modele",TAB_GLOBAL_COMPO[400],im_modele,false))
         return -1;
 if (!ValiderChampsType(Table,"im_modele",TAB_GLOBAL_COMPO[400],im_modele))
         return -1;
 var im_defaut=GetValAt(401);
 if (!ValiderChampsObligatoire(Table,"im_defaut",TAB_GLOBAL_COMPO[401],im_defaut,false))
         return -1;
 if (!ValiderChampsType(Table,"im_defaut",TAB_GLOBAL_COMPO[401],im_defaut))
         return -1;
 var im_keytable=GetValAt(402);
 if (!ValiderChampsObligatoire(Table,"im_keytable",TAB_GLOBAL_COMPO[402],im_keytable,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keytable",TAB_GLOBAL_COMPO[402],im_keytable))
         return -1;
 var im_keycle=GetValAt(403);
 if (!ValiderChampsObligatoire(Table,"im_keycle",TAB_GLOBAL_COMPO[403],im_keycle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keycle",TAB_GLOBAL_COMPO[403],im_keycle))
         return -1;
 var im_keydate=GetValAt(404);
 if (!ValiderChampsObligatoire(Table,"im_keydate",TAB_GLOBAL_COMPO[404],im_keydate,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keydate",TAB_GLOBAL_COMPO[404],im_keydate))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",im_societe,im_libelle,im_nom,im_modele,im_defaut,im_keytable,im_keycle,im_keydate"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+im_societe+","+(im_libelle=="" ? "null" : "'"+ValiderChaine(im_libelle)+"'" )+","+(im_nom=="" ? "null" : "'"+ValiderChaine(im_nom)+"'" )+","+(im_modele=="" ? "null" : "'"+ValiderChaine(im_modele)+"'" )+","+(im_defaut=="true" ? "true" : "false")+","+(im_keytable=="" ? "null" : "'"+ValiderChaine(im_keytable)+"'" )+","+(im_keycle=="" ? "null" : "'"+ValiderChaine(im_keycle)+"'" )+","+(im_keydate=="" ? "null" : "'"+ValiderChaine(im_keydate)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Impressions
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Impressions_Liste_des_mod�les_d_impressions0(Compo_Maitre)
{
 var Table="table_impression";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Impressions
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Impressions_Liste_des_mod�les_d_impressions0(Compo_Maitre)
{
 var Table="table_impression";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var im_societe=GetValAt(397);
 if (im_societe=="-1")
    im_societe="null";
 if (!ValiderChampsObligatoire(Table,"im_societe",TAB_GLOBAL_COMPO[397],im_societe,true))
         return -1;
 var im_libelle=GetValAt(398);
 if (!ValiderChampsObligatoire(Table,"im_libelle",TAB_GLOBAL_COMPO[398],im_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_libelle",TAB_GLOBAL_COMPO[398],im_libelle))
         return -1;
 var im_nom=GetValAt(399);
 if (!ValiderChampsObligatoire(Table,"im_nom",TAB_GLOBAL_COMPO[399],im_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"im_nom",TAB_GLOBAL_COMPO[399],im_nom))
         return -1;
 var im_modele=GetValAt(400);
 if (!ValiderChampsObligatoire(Table,"im_modele",TAB_GLOBAL_COMPO[400],im_modele,false))
         return -1;
 if (!ValiderChampsType(Table,"im_modele",TAB_GLOBAL_COMPO[400],im_modele))
         return -1;
 var im_defaut=GetValAt(401);
 if (!ValiderChampsObligatoire(Table,"im_defaut",TAB_GLOBAL_COMPO[401],im_defaut,false))
         return -1;
 if (!ValiderChampsType(Table,"im_defaut",TAB_GLOBAL_COMPO[401],im_defaut))
         return -1;
 var im_keytable=GetValAt(402);
 if (!ValiderChampsObligatoire(Table,"im_keytable",TAB_GLOBAL_COMPO[402],im_keytable,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keytable",TAB_GLOBAL_COMPO[402],im_keytable))
         return -1;
 var im_keycle=GetValAt(403);
 if (!ValiderChampsObligatoire(Table,"im_keycle",TAB_GLOBAL_COMPO[403],im_keycle,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keycle",TAB_GLOBAL_COMPO[403],im_keycle))
         return -1;
 var im_keydate=GetValAt(404);
 if (!ValiderChampsObligatoire(Table,"im_keydate",TAB_GLOBAL_COMPO[404],im_keydate,false))
         return -1;
 if (!ValiderChampsType(Table,"im_keydate",TAB_GLOBAL_COMPO[404],im_keydate))
         return -1;
 var Req="update "+Table+" set ";
 Req+="im_societe="+im_societe+",im_libelle="+(im_libelle=="" ? "null" : "'"+ValiderChaine(im_libelle)+"'" )+",im_nom="+(im_nom=="" ? "null" : "'"+ValiderChaine(im_nom)+"'" )+",im_modele="+(im_modele=="" ? "null" : "'"+ValiderChaine(im_modele)+"'" )+",im_defaut="+(im_defaut=="true" ? "true" : "false")+",im_keytable="+(im_keytable=="" ? "null" : "'"+ValiderChaine(im_keytable)+"'" )+",im_keycle="+(im_keycle=="" ? "null" : "'"+ValiderChaine(im_keycle)+"'" )+",im_keydate="+(im_keydate=="" ? "null" : "'"+ValiderChaine(im_keydate)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Mod�les_Liste_des_mod�les0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 372;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 373;
complexe
Nbr Jointure: 1;
    Joint n� 0 = lignemodele,mo_numero,mo_numero

******************
*/

 var Table="modele";
 var CleMaitre = TAB_COMPO_PPTES[370].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var mo_libelle=GetValAt(372);
 if (!ValiderChampsObligatoire(Table,"mo_libelle",TAB_GLOBAL_COMPO[372],mo_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"mo_libelle",TAB_GLOBAL_COMPO[372],mo_libelle))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",mo_libelle"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(mo_libelle=="" ? "null" : "'"+ValiderChaine(mo_libelle)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Mod�les_Liste_des_mod�les0(Compo_Maitre)
{
 var Table="modele";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Mod�les_Liste_des_mod�les0(Compo_Maitre)
{
 var Table="modele";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var mo_libelle=GetValAt(372);
 if (!ValiderChampsObligatoire(Table,"mo_libelle",TAB_GLOBAL_COMPO[372],mo_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"mo_libelle",TAB_GLOBAL_COMPO[372],mo_libelle))
         return -1;
 var Req="update "+Table+" set ";
 Req+="mo_libelle="+(mo_libelle=="" ? "null" : "'"+ValiderChaine(mo_libelle)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Mod�les_Lignes_du_mod�le_2(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 378;
simple
Nbr Jointure: 1;
    Joint n� 0 = produit,pd_numero,pd_numero

Id dans le tab: 379;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 380;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 381;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="lignemodele";
 var CleMaitre = TAB_COMPO_PPTES[373].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var pd_numero=GetValAt(378);
 if (pd_numero=="-1")
    pd_numero="null";
 if (!ValiderChampsObligatoire(Table,"pd_numero",TAB_GLOBAL_COMPO[378],pd_numero,true))
         return -1;
 var lm_montantht=GetValAt(379);
 if (!ValiderChampsObligatoire(Table,"lm_montantht",TAB_GLOBAL_COMPO[379],lm_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"lm_montantht",TAB_GLOBAL_COMPO[379],lm_montantht))
         return -1;
 var lm_montantttc=GetValAt(380);
 if (!ValiderChampsObligatoire(Table,"lm_montantttc",TAB_GLOBAL_COMPO[380],lm_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"lm_montantttc",TAB_GLOBAL_COMPO[380],lm_montantttc))
         return -1;
 var lm_quantite=GetValAt(381);
 if (!ValiderChampsObligatoire(Table,"lm_quantite",TAB_GLOBAL_COMPO[381],lm_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"lm_quantite",TAB_GLOBAL_COMPO[381],lm_quantite))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",mo_numero,pd_numero,lm_montantht,lm_montantttc,lm_quantite"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[370].NewCle+","+pd_numero+","+(lm_montantht=="" ? "null" : "'"+ValiderChaine(lm_montantht)+"'" )+","+(lm_montantttc=="" ? "null" : "'"+ValiderChaine(lm_montantttc)+"'" )+","+(lm_quantite=="" ? "null" : "'"+ValiderChaine(lm_quantite)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Mod�les_Lignes_du_mod�le_2(Compo_Maitre)
{
 var Table="lignemodele";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mod�les
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Mod�les_Lignes_du_mod�le_2(Compo_Maitre)
{
 var Table="lignemodele";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pd_numero=GetValAt(378);
 if (pd_numero=="-1")
    pd_numero="null";
 if (!ValiderChampsObligatoire(Table,"pd_numero",TAB_GLOBAL_COMPO[378],pd_numero,true))
         return -1;
 var lm_montantht=GetValAt(379);
 if (!ValiderChampsObligatoire(Table,"lm_montantht",TAB_GLOBAL_COMPO[379],lm_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"lm_montantht",TAB_GLOBAL_COMPO[379],lm_montantht))
         return -1;
 var lm_montantttc=GetValAt(380);
 if (!ValiderChampsObligatoire(Table,"lm_montantttc",TAB_GLOBAL_COMPO[380],lm_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"lm_montantttc",TAB_GLOBAL_COMPO[380],lm_montantttc))
         return -1;
 var lm_quantite=GetValAt(381);
 if (!ValiderChampsObligatoire(Table,"lm_quantite",TAB_GLOBAL_COMPO[381],lm_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"lm_quantite",TAB_GLOBAL_COMPO[381],lm_quantite))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pd_numero="+pd_numero+",lm_montantht="+(lm_montantht=="" ? "null" : "'"+ValiderChaine(lm_montantht)+"'" )+",lm_montantttc="+(lm_montantttc=="" ? "null" : "'"+ValiderChaine(lm_montantttc)+"'" )+",lm_quantite="+(lm_quantite=="" ? "null" : "'"+ValiderChaine(lm_quantite)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mode de r�glements
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Mode_de_r�glements_Liste_des_modes_de_r�glement0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 6

Id dans le tab: 119;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 120;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 121;
simple
Nbr Jointure: 1;
    Joint n� 0 = comptegen,cg_numero,cg_numero

Id dans le tab: 122;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 123;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 124;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="modereglement";
 var CleMaitre = TAB_COMPO_PPTES[115].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var mr_libelle=GetValAt(119);
 if (!ValiderChampsObligatoire(Table,"mr_libelle",TAB_GLOBAL_COMPO[119],mr_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_libelle",TAB_GLOBAL_COMPO[119],mr_libelle))
         return -1;
 var mr_compte=GetValAt(120);
 if (!ValiderChampsObligatoire(Table,"mr_compte",TAB_GLOBAL_COMPO[120],mr_compte,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_compte",TAB_GLOBAL_COMPO[120],mr_compte))
         return -1;
 var cg_numero=GetValAt(121);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[121],cg_numero,true))
         return -1;
 var mr_cheque=GetValAt(122);
 if (!ValiderChampsObligatoire(Table,"mr_cheque",TAB_GLOBAL_COMPO[122],mr_cheque,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_cheque",TAB_GLOBAL_COMPO[122],mr_cheque))
         return -1;
 var mr_actif=GetValAt(123);
 if (!ValiderChampsObligatoire(Table,"mr_actif",TAB_GLOBAL_COMPO[123],mr_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_actif",TAB_GLOBAL_COMPO[123],mr_actif))
         return -1;
 var mr_description=GetValAt(124);
 if (!ValiderChampsObligatoire(Table,"mr_description",TAB_GLOBAL_COMPO[124],mr_description,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_description",TAB_GLOBAL_COMPO[124],mr_description))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",mr_libelle,mr_compte,cg_numero,mr_cheque,mr_actif,mr_description"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(mr_libelle=="" ? "null" : "'"+ValiderChaine(mr_libelle)+"'" )+","+(mr_compte=="" ? "null" : "'"+ValiderChaine(mr_compte)+"'" )+","+cg_numero+","+(mr_cheque=="true" ? "true" : "false")+","+(mr_actif=="true" ? "true" : "false")+","+(mr_description=="" ? "null" : "'"+ValiderChaine(mr_description)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mode de r�glements
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Mode_de_r�glements_Liste_des_modes_de_r�glement0(Compo_Maitre)
{
 var Table="modereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Mode de r�glements
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Mode_de_r�glements_Liste_des_modes_de_r�glement0(Compo_Maitre)
{
 var Table="modereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var mr_libelle=GetValAt(119);
 if (!ValiderChampsObligatoire(Table,"mr_libelle",TAB_GLOBAL_COMPO[119],mr_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_libelle",TAB_GLOBAL_COMPO[119],mr_libelle))
         return -1;
 var mr_compte=GetValAt(120);
 if (!ValiderChampsObligatoire(Table,"mr_compte",TAB_GLOBAL_COMPO[120],mr_compte,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_compte",TAB_GLOBAL_COMPO[120],mr_compte))
         return -1;
 var cg_numero=GetValAt(121);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[121],cg_numero,true))
         return -1;
 var mr_cheque=GetValAt(122);
 if (!ValiderChampsObligatoire(Table,"mr_cheque",TAB_GLOBAL_COMPO[122],mr_cheque,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_cheque",TAB_GLOBAL_COMPO[122],mr_cheque))
         return -1;
 var mr_actif=GetValAt(123);
 if (!ValiderChampsObligatoire(Table,"mr_actif",TAB_GLOBAL_COMPO[123],mr_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_actif",TAB_GLOBAL_COMPO[123],mr_actif))
         return -1;
 var mr_description=GetValAt(124);
 if (!ValiderChampsObligatoire(Table,"mr_description",TAB_GLOBAL_COMPO[124],mr_description,false))
         return -1;
 if (!ValiderChampsType(Table,"mr_description",TAB_GLOBAL_COMPO[124],mr_description))
         return -1;
 var Req="update "+Table+" set ";
 Req+="mr_libelle="+(mr_libelle=="" ? "null" : "'"+ValiderChaine(mr_libelle)+"'" )+",mr_compte="+(mr_compte=="" ? "null" : "'"+ValiderChaine(mr_compte)+"'" )+",cg_numero="+cg_numero+",mr_cheque="+(mr_cheque=="true" ? "true" : "false")+",mr_actif="+(mr_actif=="true" ? "true" : "false")+",mr_description="+(mr_description=="" ? "null" : "'"+ValiderChaine(mr_description)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Modes de r�partition
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Modes_de_r�partition_Liste_des_modes_de_r�partition0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 129;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 130;
simple
Nbr Jointure: 1;
    Joint n� 0 = comptegen,cg_numero,cg_numero

Id dans le tab: 131;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 132;
simple
Nbr Jointure: 1;
    Joint n� 0 = societe,mp_societe,so_numero

Id dans le tab: 133;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="moderepartition";
 var CleMaitre = TAB_COMPO_PPTES[125].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var mp_libelle=GetValAt(129);
 if (!ValiderChampsObligatoire(Table,"mp_libelle",TAB_GLOBAL_COMPO[129],mp_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"mp_libelle",TAB_GLOBAL_COMPO[129],mp_libelle))
         return -1;
 var cg_numero=GetValAt(130);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[130],cg_numero,true))
         return -1;
 var mp_actif=GetValAt(131);
 if (!ValiderChampsObligatoire(Table,"mp_actif",TAB_GLOBAL_COMPO[131],mp_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"mp_actif",TAB_GLOBAL_COMPO[131],mp_actif))
         return -1;
 var mp_societe=GetValAt(132);
 if (mp_societe=="-1")
    mp_societe="null";
 if (!ValiderChampsObligatoire(Table,"mp_societe",TAB_GLOBAL_COMPO[132],mp_societe,true))
         return -1;
 var mp_description=GetValAt(133);
 if (!ValiderChampsObligatoire(Table,"mp_description",TAB_GLOBAL_COMPO[133],mp_description,false))
         return -1;
 if (!ValiderChampsType(Table,"mp_description",TAB_GLOBAL_COMPO[133],mp_description))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",mp_libelle,cg_numero,mp_actif,mp_societe,mp_description"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(mp_libelle=="" ? "null" : "'"+ValiderChaine(mp_libelle)+"'" )+","+cg_numero+","+(mp_actif=="true" ? "true" : "false")+","+mp_societe+","+(mp_description=="" ? "null" : "'"+ValiderChaine(mp_description)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Modes de r�partition
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Modes_de_r�partition_Liste_des_modes_de_r�partition0(Compo_Maitre)
{
 var Table="moderepartition";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Modes de r�partition
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Modes_de_r�partition_Liste_des_modes_de_r�partition0(Compo_Maitre)
{
 var Table="moderepartition";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var mp_libelle=GetValAt(129);
 if (!ValiderChampsObligatoire(Table,"mp_libelle",TAB_GLOBAL_COMPO[129],mp_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"mp_libelle",TAB_GLOBAL_COMPO[129],mp_libelle))
         return -1;
 var cg_numero=GetValAt(130);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[130],cg_numero,true))
         return -1;
 var mp_actif=GetValAt(131);
 if (!ValiderChampsObligatoire(Table,"mp_actif",TAB_GLOBAL_COMPO[131],mp_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"mp_actif",TAB_GLOBAL_COMPO[131],mp_actif))
         return -1;
 var mp_societe=GetValAt(132);
 if (mp_societe=="-1")
    mp_societe="null";
 if (!ValiderChampsObligatoire(Table,"mp_societe",TAB_GLOBAL_COMPO[132],mp_societe,true))
         return -1;
 var mp_description=GetValAt(133);
 if (!ValiderChampsObligatoire(Table,"mp_description",TAB_GLOBAL_COMPO[133],mp_description,false))
         return -1;
 if (!ValiderChampsType(Table,"mp_description",TAB_GLOBAL_COMPO[133],mp_description))
         return -1;
 var Req="update "+Table+" set ";
 Req+="mp_libelle="+(mp_libelle=="" ? "null" : "'"+ValiderChaine(mp_libelle)+"'" )+",cg_numero="+cg_numero+",mp_actif="+(mp_actif=="true" ? "true" : "false")+",mp_societe="+mp_societe+",mp_description="+(mp_description=="" ? "null" : "'"+ValiderChaine(mp_description)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Natures de personne
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Natures_de_personne_Liste_des_�tats_de_personne0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 6

Id dans le tab: 175;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 176;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 177;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 178;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 179;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 180;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="naturepersonne";
 var CleMaitre = TAB_COMPO_PPTES[170].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var np_nom=GetValAt(175);
 if (!ValiderChampsObligatoire(Table,"np_nom",TAB_GLOBAL_COMPO[175],np_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"np_nom",TAB_GLOBAL_COMPO[175],np_nom))
         return -1;
 var np_abrev=GetValAt(176);
 if (!ValiderChampsObligatoire(Table,"np_abrev",TAB_GLOBAL_COMPO[176],np_abrev,false))
         return -1;
 if (!ValiderChampsType(Table,"np_abrev",TAB_GLOBAL_COMPO[176],np_abrev))
         return -1;
 var np_morale=GetValAt(177);
 if (!ValiderChampsObligatoire(Table,"np_morale",TAB_GLOBAL_COMPO[177],np_morale,false))
         return -1;
 if (!ValiderChampsType(Table,"np_morale",TAB_GLOBAL_COMPO[177],np_morale))
         return -1;
 var np_avectitre=GetValAt(178);
 if (!ValiderChampsObligatoire(Table,"np_avectitre",TAB_GLOBAL_COMPO[178],np_avectitre,false))
         return -1;
 if (!ValiderChampsType(Table,"np_avectitre",TAB_GLOBAL_COMPO[178],np_avectitre))
         return -1;
 var np_inclu=GetValAt(179);
 if (!ValiderChampsObligatoire(Table,"np_inclu",TAB_GLOBAL_COMPO[179],np_inclu,false))
         return -1;
 if (!ValiderChampsType(Table,"np_inclu",TAB_GLOBAL_COMPO[179],np_inclu))
         return -1;
 var np_genre=GetValAt(180);
 if (!ValiderChampsObligatoire(Table,"np_genre",TAB_GLOBAL_COMPO[180],np_genre,false))
         return -1;
 if (!ValiderChampsType(Table,"np_genre",TAB_GLOBAL_COMPO[180],np_genre))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",np_nom,np_abrev,np_morale,np_avectitre,np_inclu,np_genre"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(np_nom=="" ? "null" : "'"+ValiderChaine(np_nom)+"'" )+","+(np_abrev=="" ? "null" : "'"+ValiderChaine(np_abrev)+"'" )+","+(np_morale=="true" ? "true" : "false")+","+(np_avectitre=="true" ? "true" : "false")+","+(np_inclu=="true" ? "true" : "false")+","+(np_genre=="" ? "null" : "'"+ValiderChaine(np_genre)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Natures de personne
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Natures_de_personne_Liste_des_�tats_de_personne0(Compo_Maitre)
{
 var Table="naturepersonne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Natures de personne
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Natures_de_personne_Liste_des_�tats_de_personne0(Compo_Maitre)
{
 var Table="naturepersonne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var np_nom=GetValAt(175);
 if (!ValiderChampsObligatoire(Table,"np_nom",TAB_GLOBAL_COMPO[175],np_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"np_nom",TAB_GLOBAL_COMPO[175],np_nom))
         return -1;
 var np_abrev=GetValAt(176);
 if (!ValiderChampsObligatoire(Table,"np_abrev",TAB_GLOBAL_COMPO[176],np_abrev,false))
         return -1;
 if (!ValiderChampsType(Table,"np_abrev",TAB_GLOBAL_COMPO[176],np_abrev))
         return -1;
 var np_morale=GetValAt(177);
 if (!ValiderChampsObligatoire(Table,"np_morale",TAB_GLOBAL_COMPO[177],np_morale,false))
         return -1;
 if (!ValiderChampsType(Table,"np_morale",TAB_GLOBAL_COMPO[177],np_morale))
         return -1;
 var np_avectitre=GetValAt(178);
 if (!ValiderChampsObligatoire(Table,"np_avectitre",TAB_GLOBAL_COMPO[178],np_avectitre,false))
         return -1;
 if (!ValiderChampsType(Table,"np_avectitre",TAB_GLOBAL_COMPO[178],np_avectitre))
         return -1;
 var np_inclu=GetValAt(179);
 if (!ValiderChampsObligatoire(Table,"np_inclu",TAB_GLOBAL_COMPO[179],np_inclu,false))
         return -1;
 if (!ValiderChampsType(Table,"np_inclu",TAB_GLOBAL_COMPO[179],np_inclu))
         return -1;
 var np_genre=GetValAt(180);
 if (!ValiderChampsObligatoire(Table,"np_genre",TAB_GLOBAL_COMPO[180],np_genre,false))
         return -1;
 if (!ValiderChampsType(Table,"np_genre",TAB_GLOBAL_COMPO[180],np_genre))
         return -1;
 var Req="update "+Table+" set ";
 Req+="np_nom="+(np_nom=="" ? "null" : "'"+ValiderChaine(np_nom)+"'" )+",np_abrev="+(np_abrev=="" ? "null" : "'"+ValiderChaine(np_abrev)+"'" )+",np_morale="+(np_morale=="true" ? "true" : "false")+",np_avectitre="+(np_avectitre=="true" ? "true" : "false")+",np_inclu="+(np_inclu=="true" ? "true" : "false")+",np_genre="+(np_genre=="" ? "null" : "'"+ValiderChaine(np_genre)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : P�riodes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_P�riodes_Liste_des_p�riodes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 362;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 363;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="periode";
 var CleMaitre = TAB_COMPO_PPTES[358].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var po_debut=GetValAt(362);
 if (!ValiderChampsObligatoire(Table,"po_debut",TAB_GLOBAL_COMPO[362],po_debut,false))
         return -1;
 if (!ValiderChampsType(Table,"po_debut",TAB_GLOBAL_COMPO[362],po_debut))
         return -1;
 var po_fin=GetValAt(363);
 if (!ValiderChampsObligatoire(Table,"po_fin",TAB_GLOBAL_COMPO[363],po_fin,false))
         return -1;
 if (!ValiderChampsType(Table,"po_fin",TAB_GLOBAL_COMPO[363],po_fin))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",po_debut,po_fin"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(po_debut=="" ? "null" : "'"+ValiderChaine(po_debut)+"'" )+","+(po_fin=="" ? "null" : "'"+ValiderChaine(po_fin)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : P�riodes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_P�riodes_Liste_des_p�riodes0(Compo_Maitre)
{
 var Table="periode";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : P�riodes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_P�riodes_Liste_des_p�riodes0(Compo_Maitre)
{
 var Table="periode";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var po_debut=GetValAt(362);
 if (!ValiderChampsObligatoire(Table,"po_debut",TAB_GLOBAL_COMPO[362],po_debut,false))
         return -1;
 if (!ValiderChampsType(Table,"po_debut",TAB_GLOBAL_COMPO[362],po_debut))
         return -1;
 var po_fin=GetValAt(363);
 if (!ValiderChampsObligatoire(Table,"po_fin",TAB_GLOBAL_COMPO[363],po_fin,false))
         return -1;
 if (!ValiderChampsType(Table,"po_fin",TAB_GLOBAL_COMPO[363],po_fin))
         return -1;
 var Req="update "+Table+" set ";
 Req+="po_debut="+(po_debut=="" ? "null" : "'"+ValiderChaine(po_debut)+"'" )+",po_fin="+(po_fin=="" ? "null" : "'"+ValiderChaine(po_fin)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Pr�fixes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Pr�fixes_Liste_des_pr�fixes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 1

Id dans le tab: 369;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="prefixe";
 var CleMaitre = TAB_COMPO_PPTES[367].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pf_nom=GetValAt(369);
 if (!ValiderChampsObligatoire(Table,"pf_nom",TAB_GLOBAL_COMPO[369],pf_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pf_nom",TAB_GLOBAL_COMPO[369],pf_nom))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pf_nom"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(pf_nom=="" ? "null" : "'"+ValiderChaine(pf_nom)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Pr�fixes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Pr�fixes_Liste_des_pr�fixes0(Compo_Maitre)
{
 var Table="prefixe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Pr�fixes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Pr�fixes_Liste_des_pr�fixes0(Compo_Maitre)
{
 var Table="prefixe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pf_nom=GetValAt(369);
 if (!ValiderChampsObligatoire(Table,"pf_nom",TAB_GLOBAL_COMPO[369],pf_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pf_nom",TAB_GLOBAL_COMPO[369],pf_nom))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pf_nom="+(pf_nom=="" ? "null" : "'"+ValiderChaine(pf_nom)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Produits_Liste_des_produits0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 8

Id dans le tab: 324;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 325;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 326;
simple
Nbr Jointure: 1;
    Joint n� 0 = journal,jo_numero,jo_numero

Id dans le tab: 327;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 328;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 329;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 330;
complexe
Nbr Jointure: 1;
    Joint n� 0 = prix,pd_numero,pd_numero

Id dans le tab: 338;
complexe
Nbr Jointure: 1;
    Joint n� 0 = compteproduit,pd_numero,pd_numero

******************
*/

 var Table="produit";
 var CleMaitre = TAB_COMPO_PPTES[320].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pd_libelle=GetValAt(324);
 if (!ValiderChampsObligatoire(Table,"pd_libelle",TAB_GLOBAL_COMPO[324],pd_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_libelle",TAB_GLOBAL_COMPO[324],pd_libelle))
         return -1;
 var pd_titre=GetValAt(325);
 if (!ValiderChampsObligatoire(Table,"pd_titre",TAB_GLOBAL_COMPO[325],pd_titre,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_titre",TAB_GLOBAL_COMPO[325],pd_titre))
         return -1;
 var jo_numero=GetValAt(326);
 if (jo_numero=="-1")
    jo_numero="null";
 if (!ValiderChampsObligatoire(Table,"jo_numero",TAB_GLOBAL_COMPO[326],jo_numero,true))
         return -1;
 var pd_actif=GetValAt(327);
 if (!ValiderChampsObligatoire(Table,"pd_actif",TAB_GLOBAL_COMPO[327],pd_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_actif",TAB_GLOBAL_COMPO[327],pd_actif))
         return -1;
 var pd_sansquantite=GetValAt(328);
 if (!ValiderChampsObligatoire(Table,"pd_sansquantite",TAB_GLOBAL_COMPO[328],pd_sansquantite,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_sansquantite",TAB_GLOBAL_COMPO[328],pd_sansquantite))
         return -1;
 var pd_reduction=GetValAt(329);
 if (!ValiderChampsObligatoire(Table,"pd_reduction",TAB_GLOBAL_COMPO[329],pd_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_reduction",TAB_GLOBAL_COMPO[329],pd_reduction))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pd_libelle,pd_titre,jo_numero,pd_actif,pd_sansquantite,pd_reduction"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(pd_libelle=="" ? "null" : "'"+ValiderChaine(pd_libelle)+"'" )+","+(pd_titre=="" ? "null" : "'"+ValiderChaine(pd_titre)+"'" )+","+jo_numero+","+(pd_actif=="true" ? "true" : "false")+","+(pd_sansquantite=="true" ? "true" : "false")+","+(pd_reduction=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Produits_Liste_des_produits0(Compo_Maitre)
{
 var Table="produit";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Produits_Liste_des_produits0(Compo_Maitre)
{
 var Table="produit";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pd_libelle=GetValAt(324);
 if (!ValiderChampsObligatoire(Table,"pd_libelle",TAB_GLOBAL_COMPO[324],pd_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_libelle",TAB_GLOBAL_COMPO[324],pd_libelle))
         return -1;
 var pd_titre=GetValAt(325);
 if (!ValiderChampsObligatoire(Table,"pd_titre",TAB_GLOBAL_COMPO[325],pd_titre,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_titre",TAB_GLOBAL_COMPO[325],pd_titre))
         return -1;
 var jo_numero=GetValAt(326);
 if (jo_numero=="-1")
    jo_numero="null";
 if (!ValiderChampsObligatoire(Table,"jo_numero",TAB_GLOBAL_COMPO[326],jo_numero,true))
         return -1;
 var pd_actif=GetValAt(327);
 if (!ValiderChampsObligatoire(Table,"pd_actif",TAB_GLOBAL_COMPO[327],pd_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_actif",TAB_GLOBAL_COMPO[327],pd_actif))
         return -1;
 var pd_sansquantite=GetValAt(328);
 if (!ValiderChampsObligatoire(Table,"pd_sansquantite",TAB_GLOBAL_COMPO[328],pd_sansquantite,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_sansquantite",TAB_GLOBAL_COMPO[328],pd_sansquantite))
         return -1;
 var pd_reduction=GetValAt(329);
 if (!ValiderChampsObligatoire(Table,"pd_reduction",TAB_GLOBAL_COMPO[329],pd_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"pd_reduction",TAB_GLOBAL_COMPO[329],pd_reduction))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pd_libelle="+(pd_libelle=="" ? "null" : "'"+ValiderChaine(pd_libelle)+"'" )+",pd_titre="+(pd_titre=="" ? "null" : "'"+ValiderChaine(pd_titre)+"'" )+",jo_numero="+jo_numero+",pd_actif="+(pd_actif=="true" ? "true" : "false")+",pd_sansquantite="+(pd_sansquantite=="true" ? "true" : "false")+",pd_reduction="+(pd_reduction=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Produits_Prix_7(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 335;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 336;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 337;
simple
Nbr Jointure: 1;
    Joint n� 0 = tva,tv_numero,tv_numero

******************
*/

 var Table="prix";
 var CleMaitre = TAB_COMPO_PPTES[330].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var px_tarifht=GetValAt(335);
 if (!ValiderChampsObligatoire(Table,"px_tarifht",TAB_GLOBAL_COMPO[335],px_tarifht,false))
         return -1;
 if (!ValiderChampsType(Table,"px_tarifht",TAB_GLOBAL_COMPO[335],px_tarifht))
         return -1;
 var px_tarifttc=GetValAt(336);
 if (!ValiderChampsObligatoire(Table,"px_tarifttc",TAB_GLOBAL_COMPO[336],px_tarifttc,false))
         return -1;
 if (!ValiderChampsType(Table,"px_tarifttc",TAB_GLOBAL_COMPO[336],px_tarifttc))
         return -1;
 var tv_numero=GetValAt(337);
 if (tv_numero=="-1")
    tv_numero="null";
 if (!ValiderChampsObligatoire(Table,"tv_numero",TAB_GLOBAL_COMPO[337],tv_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pd_numero,px_tarifht,px_tarifttc,tv_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[320].NewCle+","+(px_tarifht=="" ? "null" : "'"+ValiderChaine(px_tarifht)+"'" )+","+(px_tarifttc=="" ? "null" : "'"+ValiderChaine(px_tarifttc)+"'" )+","+tv_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Produits_Prix_7(Compo_Maitre)
{
 var Table="prix";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Produits_Prix_7(Compo_Maitre)
{
 var Table="prix";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var px_tarifht=GetValAt(335);
 if (!ValiderChampsObligatoire(Table,"px_tarifht",TAB_GLOBAL_COMPO[335],px_tarifht,false))
         return -1;
 if (!ValiderChampsType(Table,"px_tarifht",TAB_GLOBAL_COMPO[335],px_tarifht))
         return -1;
 var px_tarifttc=GetValAt(336);
 if (!ValiderChampsObligatoire(Table,"px_tarifttc",TAB_GLOBAL_COMPO[336],px_tarifttc,false))
         return -1;
 if (!ValiderChampsType(Table,"px_tarifttc",TAB_GLOBAL_COMPO[336],px_tarifttc))
         return -1;
 var tv_numero=GetValAt(337);
 if (tv_numero=="-1")
    tv_numero="null";
 if (!ValiderChampsObligatoire(Table,"tv_numero",TAB_GLOBAL_COMPO[337],tv_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="px_tarifht="+(px_tarifht=="" ? "null" : "'"+ValiderChaine(px_tarifht)+"'" )+",px_tarifttc="+(px_tarifttc=="" ? "null" : "'"+ValiderChaine(px_tarifttc)+"'" )+",tv_numero="+tv_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Produits_Comptes_g�n�raux_11(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 341;
simple
Nbr Jointure: 1;
    Joint n� 0 = comptegen,cg_numero,cg_numero

Id dans le tab: 342;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="compteproduit";
 var CleMaitre = TAB_COMPO_PPTES[338].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var cg_numero=GetValAt(341);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[341],cg_numero,true))
         return -1;
 var ci_actif=GetValAt(342);
 if (!ValiderChampsObligatoire(Table,"ci_actif",TAB_GLOBAL_COMPO[342],ci_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"ci_actif",TAB_GLOBAL_COMPO[342],ci_actif))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pd_numero,cg_numero,ci_actif"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[320].NewCle+","+cg_numero+","+(ci_actif=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Produits_Comptes_g�n�raux_11(Compo_Maitre)
{
 var Table="compteproduit";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Produits
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Produits_Comptes_g�n�raux_11(Compo_Maitre)
{
 var Table="compteproduit";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cg_numero=GetValAt(341);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[341],cg_numero,true))
         return -1;
 var ci_actif=GetValAt(342);
 if (!ValiderChampsObligatoire(Table,"ci_actif",TAB_GLOBAL_COMPO[342],ci_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"ci_actif",TAB_GLOBAL_COMPO[342],ci_actif))
         return -1;
 var Req="update "+Table+" set ";
 Req+="cg_numero="+cg_numero+",ci_actif="+(ci_actif=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Responsabilit�s
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Responsabilit�s_Responsabilit�s0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 309;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 310;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 311;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="responsabilite";
 var CleMaitre = TAB_COMPO_PPTES[305].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var re_code=GetValAt(309);
 if (!ValiderChampsObligatoire(Table,"re_code",TAB_GLOBAL_COMPO[309],re_code,false))
         return -1;
 if (!ValiderChampsType(Table,"re_code",TAB_GLOBAL_COMPO[309],re_code))
         return -1;
 var re_nom=GetValAt(310);
 if (!ValiderChampsObligatoire(Table,"re_nom",TAB_GLOBAL_COMPO[310],re_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"re_nom",TAB_GLOBAL_COMPO[310],re_nom))
         return -1;
 var re_famille=GetValAt(311);
 if (!ValiderChampsObligatoire(Table,"re_famille",TAB_GLOBAL_COMPO[311],re_famille,false))
         return -1;
 if (!ValiderChampsType(Table,"re_famille",TAB_GLOBAL_COMPO[311],re_famille))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",re_code,re_nom,re_famille"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(re_code=="" ? "null" : "'"+ValiderChaine(re_code)+"'" )+","+(re_nom=="" ? "null" : "'"+ValiderChaine(re_nom)+"'" )+","+(re_famille=="" ? "null" : "'"+ValiderChaine(re_famille)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Responsabilit�s
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Responsabilit�s_Responsabilit�s0(Compo_Maitre)
{
 var Table="responsabilite";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Responsabilit�s
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Responsabilit�s_Responsabilit�s0(Compo_Maitre)
{
 var Table="responsabilite";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var re_code=GetValAt(309);
 if (!ValiderChampsObligatoire(Table,"re_code",TAB_GLOBAL_COMPO[309],re_code,false))
         return -1;
 if (!ValiderChampsType(Table,"re_code",TAB_GLOBAL_COMPO[309],re_code))
         return -1;
 var re_nom=GetValAt(310);
 if (!ValiderChampsObligatoire(Table,"re_nom",TAB_GLOBAL_COMPO[310],re_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"re_nom",TAB_GLOBAL_COMPO[310],re_nom))
         return -1;
 var re_famille=GetValAt(311);
 if (!ValiderChampsObligatoire(Table,"re_famille",TAB_GLOBAL_COMPO[311],re_famille,false))
         return -1;
 if (!ValiderChampsType(Table,"re_famille",TAB_GLOBAL_COMPO[311],re_famille))
         return -1;
 var Req="update "+Table+" set ";
 Req+="re_code="+(re_code=="" ? "null" : "'"+ValiderChaine(re_code)+"'" )+",re_nom="+(re_nom=="" ? "null" : "'"+ValiderChaine(re_nom)+"'" )+",re_famille="+(re_famille=="" ? "null" : "'"+ValiderChaine(re_famille)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : S�quences
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_S�quences_Liste_des_s�quences0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 200;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 201;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 202;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 203;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="sequence";
 var CleMaitre = TAB_COMPO_PPTES[196].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var sq_nom=GetValAt(200);
 if (!ValiderChampsObligatoire(Table,"sq_nom",TAB_GLOBAL_COMPO[200],sq_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_nom",TAB_GLOBAL_COMPO[200],sq_nom))
         return -1;
 var sq_nombre=GetValAt(201);
 if (!ValiderChampsObligatoire(Table,"sq_nombre",TAB_GLOBAL_COMPO[201],sq_nombre,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_nombre",TAB_GLOBAL_COMPO[201],sq_nombre))
         return -1;
 var sq_last=GetValAt(202);
 if (!ValiderChampsObligatoire(Table,"sq_last",TAB_GLOBAL_COMPO[202],sq_last,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_last",TAB_GLOBAL_COMPO[202],sq_last))
         return -1;
 var sq_clear_cache=GetValAt(203);
 if (!ValiderChampsObligatoire(Table,"sq_clear_cache",TAB_GLOBAL_COMPO[203],sq_clear_cache,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_clear_cache",TAB_GLOBAL_COMPO[203],sq_clear_cache))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",sq_nom,sq_nombre,sq_last,sq_clear_cache"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(sq_nom=="" ? "null" : "'"+ValiderChaine(sq_nom)+"'" )+","+(sq_nombre=="" ? "null" : "'"+ValiderChaine(sq_nombre)+"'" )+","+(sq_last=="" ? "null" : "'"+ValiderChaine(sq_last)+"'" )+","+(sq_clear_cache=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : S�quences
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_S�quences_Liste_des_s�quences0(Compo_Maitre)
{
 var Table="sequence";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : S�quences
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_S�quences_Liste_des_s�quences0(Compo_Maitre)
{
 var Table="sequence";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var sq_nom=GetValAt(200);
 if (!ValiderChampsObligatoire(Table,"sq_nom",TAB_GLOBAL_COMPO[200],sq_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_nom",TAB_GLOBAL_COMPO[200],sq_nom))
         return -1;
 var sq_nombre=GetValAt(201);
 if (!ValiderChampsObligatoire(Table,"sq_nombre",TAB_GLOBAL_COMPO[201],sq_nombre,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_nombre",TAB_GLOBAL_COMPO[201],sq_nombre))
         return -1;
 var sq_last=GetValAt(202);
 if (!ValiderChampsObligatoire(Table,"sq_last",TAB_GLOBAL_COMPO[202],sq_last,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_last",TAB_GLOBAL_COMPO[202],sq_last))
         return -1;
 var sq_clear_cache=GetValAt(203);
 if (!ValiderChampsObligatoire(Table,"sq_clear_cache",TAB_GLOBAL_COMPO[203],sq_clear_cache,false))
         return -1;
 if (!ValiderChampsType(Table,"sq_clear_cache",TAB_GLOBAL_COMPO[203],sq_clear_cache))
         return -1;
 var Req="update "+Table+" set ";
 Req+="sq_nom="+(sq_nom=="" ? "null" : "'"+ValiderChaine(sq_nom)+"'" )+",sq_nombre="+(sq_nombre=="" ? "null" : "'"+ValiderChaine(sq_nombre)+"'" )+",sq_last="+(sq_last=="" ? "null" : "'"+ValiderChaine(sq_last)+"'" )+",sq_clear_cache="+(sq_clear_cache=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Services
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Services_Liste_des_services0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 209;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 210;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 211;
simple
Nbr Jointure: 1;
    Joint n� 0 = agent,se_agent,ag_numero

Id dans le tab: 212;
complexe
Nbr Jointure: 1;
    Joint n� 0 = employe,se_numero,em_service

******************
*/

 var Table="service";
 var CleMaitre = TAB_COMPO_PPTES[204].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var se_nom=GetValAt(209);
 if (!ValiderChampsObligatoire(Table,"se_nom",TAB_GLOBAL_COMPO[209],se_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"se_nom",TAB_GLOBAL_COMPO[209],se_nom))
         return -1;
 var se_code=GetValAt(210);
 if (!ValiderChampsObligatoire(Table,"se_code",TAB_GLOBAL_COMPO[210],se_code,false))
         return -1;
 if (!ValiderChampsType(Table,"se_code",TAB_GLOBAL_COMPO[210],se_code))
         return -1;
 var se_agent=GetValAt(211);
 if (se_agent=="-1")
    se_agent="null";
 if (!ValiderChampsObligatoire(Table,"se_agent",TAB_GLOBAL_COMPO[211],se_agent,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(193);
var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();
var CleLiasonForte = CompoLieMaitre.getCleVal();
if (CleLiasonForte!=-1)
{
        Asso11=GenererAssociation11(CompoLie,CleMaitre,CleLiasonForte,TabAsso11);
}
else
{
        alert("Vous devez d'abord valider "+CompoLieMaitre.getLabel()+" puis mettre � jour.");
        return -1;
}
 Req+="("+NomCleMaitre+",se_nom,se_code,se_agent"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(se_nom=="" ? "null" : "'"+ValiderChaine(se_nom)+"'" )+","+(se_code=="" ? "null" : "'"+ValiderChaine(se_code)+"'" )+","+se_agent+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
if (CleLiasonForte!=-1 && !Asso11)
{
        AjouterAssociation(CompoLie,CleMaitre,CleLiasonForte);
}
else
{
        if (CleLiasonForte==-1)
        {
                alert("Attention votre enregistrement ne peux �tre reli� � "+CompoLieMaitre.getLabel()+". Vous devez d'abord ajouter un enregistrement � "+CompoLieMaitre.getLabel()+" puis le mettre � jour");
                return -1;
        }
}
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Services
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Services_Liste_des_services0(Compo_Maitre)
{
 var Table="service";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(193);
var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();
var CleLiasonForte = CompoLieMaitre.getCleVal();
if (CleLiasonForte!=-1)
{
        SuprimerAssociation(CompoLie,CleMaitre,CleLiasonForte);
}
else
{
        alert("Erreur "+CompoLieMaitre.getLabel()+" correspondant(e) Introuvable");
        return CleMaitre;
}
 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Services
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Services_Liste_des_services0(Compo_Maitre)
{
 var Table="service";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var se_nom=GetValAt(209);
 if (!ValiderChampsObligatoire(Table,"se_nom",TAB_GLOBAL_COMPO[209],se_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"se_nom",TAB_GLOBAL_COMPO[209],se_nom))
         return -1;
 var se_code=GetValAt(210);
 if (!ValiderChampsObligatoire(Table,"se_code",TAB_GLOBAL_COMPO[210],se_code,false))
         return -1;
 if (!ValiderChampsType(Table,"se_code",TAB_GLOBAL_COMPO[210],se_code))
         return -1;
 var se_agent=GetValAt(211);
 if (se_agent=="-1")
    se_agent="null";
 if (!ValiderChampsObligatoire(Table,"se_agent",TAB_GLOBAL_COMPO[211],se_agent,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="se_nom="+(se_nom=="" ? "null" : "'"+ValiderChaine(se_nom)+"'" )+",se_code="+(se_code=="" ? "null" : "'"+ValiderChaine(se_code)+"'" )+",se_agent="+se_agent+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Soci�t�s
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Soci�t�s_Liste_des_soci�t�s0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 7

Id dans le tab: 187;
simple
Nbr Jointure: 1;
    Joint n� 0 = typesociete,ts_numero,ts_numero

Id dans le tab: 188;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 189;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 190;
simple
Nbr Jointure: 1;
    Joint n� 0 = personne,pe_numero,pe_numero

Id dans le tab: 191;
simple
Nbr Jointure: 1;
    Joint n� 0 = sequence,sq_numero,sq_numero

Id dans le tab: 192;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 193;
complexe
Nbr Jointure: 1;
    Joint n� 0 = service,so_numero,se_societe

******************
*/

 var Table="societe";
 var CleMaitre = TAB_COMPO_PPTES[184].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ts_numero=GetValAt(187);
 if (ts_numero=="-1")
    ts_numero="null";
 if (!ValiderChampsObligatoire(Table,"ts_numero",TAB_GLOBAL_COMPO[187],ts_numero,true))
         return -1;
 var so_libelle=GetValAt(188);
 if (!ValiderChampsObligatoire(Table,"so_libelle",TAB_GLOBAL_COMPO[188],so_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"so_libelle",TAB_GLOBAL_COMPO[188],so_libelle))
         return -1;
 var so_abbrev=GetValAt(189);
 if (!ValiderChampsObligatoire(Table,"so_abbrev",TAB_GLOBAL_COMPO[189],so_abbrev,false))
         return -1;
 if (!ValiderChampsType(Table,"so_abbrev",TAB_GLOBAL_COMPO[189],so_abbrev))
         return -1;
 var pe_numero=GetValAt(190);
 if (pe_numero=="-1")
    pe_numero="null";
 if (!ValiderChampsObligatoire(Table,"pe_numero",TAB_GLOBAL_COMPO[190],pe_numero,true))
         return -1;
 var sq_numero=GetValAt(191);
 if (sq_numero=="-1")
    sq_numero="null";
 if (!ValiderChampsObligatoire(Table,"sq_numero",TAB_GLOBAL_COMPO[191],sq_numero,true))
         return -1;
 var so_detail=GetValAt(192);
 if (!ValiderChampsObligatoire(Table,"so_detail",TAB_GLOBAL_COMPO[192],so_detail,false))
         return -1;
 if (!ValiderChampsType(Table,"so_detail",TAB_GLOBAL_COMPO[192],so_detail))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ts_numero,so_libelle,so_abbrev,pe_numero,sq_numero,so_detail"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+ts_numero+","+(so_libelle=="" ? "null" : "'"+ValiderChaine(so_libelle)+"'" )+","+(so_abbrev=="" ? "null" : "'"+ValiderChaine(so_abbrev)+"'" )+","+pe_numero+","+sq_numero+","+(so_detail=="" ? "null" : "'"+ValiderChaine(so_detail)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Soci�t�s
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Soci�t�s_Liste_des_soci�t�s0(Compo_Maitre)
{
 var Table="societe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Soci�t�s
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Soci�t�s_Liste_des_soci�t�s0(Compo_Maitre)
{
 var Table="societe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ts_numero=GetValAt(187);
 if (ts_numero=="-1")
    ts_numero="null";
 if (!ValiderChampsObligatoire(Table,"ts_numero",TAB_GLOBAL_COMPO[187],ts_numero,true))
         return -1;
 var so_libelle=GetValAt(188);
 if (!ValiderChampsObligatoire(Table,"so_libelle",TAB_GLOBAL_COMPO[188],so_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"so_libelle",TAB_GLOBAL_COMPO[188],so_libelle))
         return -1;
 var so_abbrev=GetValAt(189);
 if (!ValiderChampsObligatoire(Table,"so_abbrev",TAB_GLOBAL_COMPO[189],so_abbrev,false))
         return -1;
 if (!ValiderChampsType(Table,"so_abbrev",TAB_GLOBAL_COMPO[189],so_abbrev))
         return -1;
 var pe_numero=GetValAt(190);
 if (pe_numero=="-1")
    pe_numero="null";
 if (!ValiderChampsObligatoire(Table,"pe_numero",TAB_GLOBAL_COMPO[190],pe_numero,true))
         return -1;
 var sq_numero=GetValAt(191);
 if (sq_numero=="-1")
    sq_numero="null";
 if (!ValiderChampsObligatoire(Table,"sq_numero",TAB_GLOBAL_COMPO[191],sq_numero,true))
         return -1;
 var so_detail=GetValAt(192);
 if (!ValiderChampsObligatoire(Table,"so_detail",TAB_GLOBAL_COMPO[192],so_detail,false))
         return -1;
 if (!ValiderChampsType(Table,"so_detail",TAB_GLOBAL_COMPO[192],so_detail))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ts_numero="+ts_numero+",so_libelle="+(so_libelle=="" ? "null" : "'"+ValiderChaine(so_libelle)+"'" )+",so_abbrev="+(so_abbrev=="" ? "null" : "'"+ValiderChaine(so_abbrev)+"'" )+",pe_numero="+pe_numero+",sq_numero="+sq_numero+",so_detail="+(so_detail=="" ? "null" : "'"+ValiderChaine(so_detail)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : TVA
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_TVA_Liste_des_T_V_A_0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 316;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 317;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 318;
simple
Nbr Jointure: 1;
    Joint n� 0 = comptegen,cg_numero,cg_numero

Id dans le tab: 319;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="tva";
 var CleMaitre = TAB_COMPO_PPTES[312].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tv_taux=GetValAt(316);
 if (!ValiderChampsObligatoire(Table,"tv_taux",TAB_GLOBAL_COMPO[316],tv_taux,false))
         return -1;
 if (!ValiderChampsType(Table,"tv_taux",TAB_GLOBAL_COMPO[316],tv_taux))
         return -1;
 var tv_code=GetValAt(317);
 if (!ValiderChampsObligatoire(Table,"tv_code",TAB_GLOBAL_COMPO[317],tv_code,false))
         return -1;
 if (!ValiderChampsType(Table,"tv_code",TAB_GLOBAL_COMPO[317],tv_code))
         return -1;
 var cg_numero=GetValAt(318);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[318],cg_numero,true))
         return -1;
 var tv_actif=GetValAt(319);
 if (!ValiderChampsObligatoire(Table,"tv_actif",TAB_GLOBAL_COMPO[319],tv_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"tv_actif",TAB_GLOBAL_COMPO[319],tv_actif))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",tv_taux,tv_code,cg_numero,tv_actif"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(tv_taux=="" ? "null" : "'"+ValiderChaine(tv_taux)+"'" )+","+(tv_code=="" ? "null" : "'"+ValiderChaine(tv_code)+"'" )+","+cg_numero+","+(tv_actif=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : TVA
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_TVA_Liste_des_T_V_A_0(Compo_Maitre)
{
 var Table="tva";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : TVA
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_TVA_Liste_des_T_V_A_0(Compo_Maitre)
{
 var Table="tva";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tv_taux=GetValAt(316);
 if (!ValiderChampsObligatoire(Table,"tv_taux",TAB_GLOBAL_COMPO[316],tv_taux,false))
         return -1;
 if (!ValiderChampsType(Table,"tv_taux",TAB_GLOBAL_COMPO[316],tv_taux))
         return -1;
 var tv_code=GetValAt(317);
 if (!ValiderChampsObligatoire(Table,"tv_code",TAB_GLOBAL_COMPO[317],tv_code,false))
         return -1;
 if (!ValiderChampsType(Table,"tv_code",TAB_GLOBAL_COMPO[317],tv_code))
         return -1;
 var cg_numero=GetValAt(318);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[318],cg_numero,true))
         return -1;
 var tv_actif=GetValAt(319);
 if (!ValiderChampsObligatoire(Table,"tv_actif",TAB_GLOBAL_COMPO[319],tv_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"tv_actif",TAB_GLOBAL_COMPO[319],tv_actif))
         return -1;
 var Req="update "+Table+" set ";
 Req+="tv_taux="+(tv_taux=="" ? "null" : "'"+ValiderChaine(tv_taux)+"'" )+",tv_code="+(tv_code=="" ? "null" : "'"+ValiderChaine(tv_code)+"'" )+",cg_numero="+cg_numero+",tv_actif="+(tv_actif=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'adresses
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_d_adresses_Liste_des_types_d_adresses0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 1

Id dans le tab: 166;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="typeadresse";
 var CleMaitre = TAB_COMPO_PPTES[164].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ak_nom=GetValAt(166);
 if (!ValiderChampsObligatoire(Table,"ak_nom",TAB_GLOBAL_COMPO[166],ak_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ak_nom",TAB_GLOBAL_COMPO[166],ak_nom))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ak_nom"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ak_nom=="" ? "null" : "'"+ValiderChaine(ak_nom)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'adresses
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_d_adresses_Liste_des_types_d_adresses0(Compo_Maitre)
{
 var Table="typeadresse";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'adresses
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_d_adresses_Liste_des_types_d_adresses0(Compo_Maitre)
{
 var Table="typeadresse";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ak_nom=GetValAt(166);
 if (!ValiderChampsObligatoire(Table,"ak_nom",TAB_GLOBAL_COMPO[166],ak_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ak_nom",TAB_GLOBAL_COMPO[166],ak_nom))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ak_nom="+(ak_nom=="" ? "null" : "'"+ValiderChaine(ak_nom)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'attribut
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 141;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 142;
complexe
Nbr Jointure: 1;
    Joint n� 0 = categorie,ta_numero,ta_numero

******************
*/

 var Table="typeattribut";
 var CleMaitre = TAB_COMPO_PPTES[138].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ta_nom=GetValAt(141);
 if (!ValiderChampsObligatoire(Table,"ta_nom",TAB_GLOBAL_COMPO[141],ta_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ta_nom",TAB_GLOBAL_COMPO[141],ta_nom))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ta_nom"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ta_nom=="" ? "null" : "'"+ValiderChaine(ta_nom)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'attribut
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(Compo_Maitre)
{
 var Table="typeattribut";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'attribut
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_d_attribut_Liste_des_types_d_attribut_de_personne0(Compo_Maitre)
{
 var Table="typeattribut";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ta_nom=GetValAt(141);
 if (!ValiderChampsObligatoire(Table,"ta_nom",TAB_GLOBAL_COMPO[141],ta_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ta_nom",TAB_GLOBAL_COMPO[141],ta_nom))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ta_nom="+(ta_nom=="" ? "null" : "'"+ValiderChaine(ta_nom)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'attribut
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_d_attribut_Cat�gories_2(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 145;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 146;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="categorie";
 var CleMaitre = TAB_COMPO_PPTES[142].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var cr_libelle=GetValAt(145);
 if (!ValiderChampsObligatoire(Table,"cr_libelle",TAB_GLOBAL_COMPO[145],cr_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"cr_libelle",TAB_GLOBAL_COMPO[145],cr_libelle))
         return -1;
 var cr_description=GetValAt(146);
 if (!ValiderChampsObligatoire(Table,"cr_description",TAB_GLOBAL_COMPO[146],cr_description,false))
         return -1;
 if (!ValiderChampsType(Table,"cr_description",TAB_GLOBAL_COMPO[146],cr_description))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ta_numero,cr_libelle,cr_description"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[138].NewCle+","+(cr_libelle=="" ? "null" : "'"+ValiderChaine(cr_libelle)+"'" )+","+(cr_description=="" ? "null" : "'"+ValiderChaine(cr_description)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'attribut
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_d_attribut_Cat�gories_2(Compo_Maitre)
{
 var Table="categorie";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types d'attribut
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_d_attribut_Cat�gories_2(Compo_Maitre)
{
 var Table="categorie";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cr_libelle=GetValAt(145);
 if (!ValiderChampsObligatoire(Table,"cr_libelle",TAB_GLOBAL_COMPO[145],cr_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"cr_libelle",TAB_GLOBAL_COMPO[145],cr_libelle))
         return -1;
 var cr_description=GetValAt(146);
 if (!ValiderChampsObligatoire(Table,"cr_description",TAB_GLOBAL_COMPO[146],cr_description,false))
         return -1;
 if (!ValiderChampsType(Table,"cr_description",TAB_GLOBAL_COMPO[146],cr_description))
         return -1;
 var Req="update "+Table+" set ";
 Req+="cr_libelle="+(cr_libelle=="" ? "null" : "'"+ValiderChaine(cr_libelle)+"'" )+",cr_description="+(cr_description=="" ? "null" : "'"+ValiderChaine(cr_description)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de contacts
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_de_contacts_Liste_des_types_de_contacts0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 294;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 295;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 296;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 297;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 298;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="contacttype";
 var CleMaitre = TAB_COMPO_PPTES[291].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ck_nom=GetValAt(294);
 if (!ValiderChampsObligatoire(Table,"ck_nom",TAB_GLOBAL_COMPO[294],ck_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_nom",TAB_GLOBAL_COMPO[294],ck_nom))
         return -1;
 var ck_code=GetValAt(295);
 if (!ValiderChampsObligatoire(Table,"ck_code",TAB_GLOBAL_COMPO[295],ck_code,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_code",TAB_GLOBAL_COMPO[295],ck_code))
         return -1;
 var ck_number=GetValAt(296);
 if (!ValiderChampsObligatoire(Table,"ck_number",TAB_GLOBAL_COMPO[296],ck_number,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_number",TAB_GLOBAL_COMPO[296],ck_number))
         return -1;
 var ck_email=GetValAt(297);
 if (!ValiderChampsObligatoire(Table,"ck_email",TAB_GLOBAL_COMPO[297],ck_email,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_email",TAB_GLOBAL_COMPO[297],ck_email))
         return -1;
 var ck_url=GetValAt(298);
 if (!ValiderChampsObligatoire(Table,"ck_url",TAB_GLOBAL_COMPO[298],ck_url,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_url",TAB_GLOBAL_COMPO[298],ck_url))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ck_nom,ck_code,ck_number,ck_email,ck_url"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ck_nom=="" ? "null" : "'"+ValiderChaine(ck_nom)+"'" )+","+(ck_code=="" ? "null" : "'"+ValiderChaine(ck_code)+"'" )+","+(ck_number=="true" ? "true" : "false")+","+(ck_email=="true" ? "true" : "false")+","+(ck_url=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de contacts
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_de_contacts_Liste_des_types_de_contacts0(Compo_Maitre)
{
 var Table="contacttype";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de contacts
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_de_contacts_Liste_des_types_de_contacts0(Compo_Maitre)
{
 var Table="contacttype";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ck_nom=GetValAt(294);
 if (!ValiderChampsObligatoire(Table,"ck_nom",TAB_GLOBAL_COMPO[294],ck_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_nom",TAB_GLOBAL_COMPO[294],ck_nom))
         return -1;
 var ck_code=GetValAt(295);
 if (!ValiderChampsObligatoire(Table,"ck_code",TAB_GLOBAL_COMPO[295],ck_code,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_code",TAB_GLOBAL_COMPO[295],ck_code))
         return -1;
 var ck_number=GetValAt(296);
 if (!ValiderChampsObligatoire(Table,"ck_number",TAB_GLOBAL_COMPO[296],ck_number,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_number",TAB_GLOBAL_COMPO[296],ck_number))
         return -1;
 var ck_email=GetValAt(297);
 if (!ValiderChampsObligatoire(Table,"ck_email",TAB_GLOBAL_COMPO[297],ck_email,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_email",TAB_GLOBAL_COMPO[297],ck_email))
         return -1;
 var ck_url=GetValAt(298);
 if (!ValiderChampsObligatoire(Table,"ck_url",TAB_GLOBAL_COMPO[298],ck_url,false))
         return -1;
 if (!ValiderChampsType(Table,"ck_url",TAB_GLOBAL_COMPO[298],ck_url))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ck_nom="+(ck_nom=="" ? "null" : "'"+ValiderChaine(ck_nom)+"'" )+",ck_code="+(ck_code=="" ? "null" : "'"+ValiderChaine(ck_code)+"'" )+",ck_number="+(ck_number=="true" ? "true" : "false")+",ck_email="+(ck_email=="true" ? "true" : "false")+",ck_url="+(ck_url=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de journaux
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_de_journaux_Liste_des_types_de_journaux0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 1

Id dans le tab: 366;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="typejournal";
 var CleMaitre = TAB_COMPO_PPTES[364].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tj_libelle=GetValAt(366);
 if (!ValiderChampsObligatoire(Table,"tj_libelle",TAB_GLOBAL_COMPO[366],tj_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"tj_libelle",TAB_GLOBAL_COMPO[366],tj_libelle))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",tj_libelle"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(tj_libelle=="" ? "null" : "'"+ValiderChaine(tj_libelle)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de journaux
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_de_journaux_Liste_des_types_de_journaux0(Compo_Maitre)
{
 var Table="typejournal";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de journaux
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_de_journaux_Liste_des_types_de_journaux0(Compo_Maitre)
{
 var Table="typejournal";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tj_libelle=GetValAt(366);
 if (!ValiderChampsObligatoire(Table,"tj_libelle",TAB_GLOBAL_COMPO[366],tj_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"tj_libelle",TAB_GLOBAL_COMPO[366],tj_libelle))
         return -1;
 var Req="update "+Table+" set ";
 Req+="tj_libelle="+(tj_libelle=="" ? "null" : "'"+ValiderChaine(tj_libelle)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de lien
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_de_lien_Liste_des_types_de_lien_entre_personne0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 159;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 160;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 161;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 162;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 163;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="typelien";
 var CleMaitre = TAB_COMPO_PPTES[156].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tl_code=GetValAt(159);
 if (!ValiderChampsObligatoire(Table,"tl_code",TAB_GLOBAL_COMPO[159],tl_code,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_code",TAB_GLOBAL_COMPO[159],tl_code))
         return -1;
 var tl_libelle=GetValAt(160);
 if (!ValiderChampsObligatoire(Table,"tl_libelle",TAB_GLOBAL_COMPO[160],tl_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_libelle",TAB_GLOBAL_COMPO[160],tl_libelle))
         return -1;
 var tl_action12=GetValAt(161);
 if (!ValiderChampsObligatoire(Table,"tl_action12",TAB_GLOBAL_COMPO[161],tl_action12,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_action12",TAB_GLOBAL_COMPO[161],tl_action12))
         return -1;
 var tl_action21=GetValAt(162);
 if (!ValiderChampsObligatoire(Table,"tl_action21",TAB_GLOBAL_COMPO[162],tl_action21,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_action21",TAB_GLOBAL_COMPO[162],tl_action21))
         return -1;
 var tl_description=GetValAt(163);
 if (!ValiderChampsObligatoire(Table,"tl_description",TAB_GLOBAL_COMPO[163],tl_description,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_description",TAB_GLOBAL_COMPO[163],tl_description))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",tl_code,tl_libelle,tl_action12,tl_action21,tl_description"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(tl_code=="" ? "null" : "'"+ValiderChaine(tl_code)+"'" )+","+(tl_libelle=="" ? "null" : "'"+ValiderChaine(tl_libelle)+"'" )+","+(tl_action12=="" ? "null" : "'"+ValiderChaine(tl_action12)+"'" )+","+(tl_action21=="" ? "null" : "'"+ValiderChaine(tl_action21)+"'" )+","+(tl_description=="" ? "null" : "'"+ValiderChaine(tl_description)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de lien
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_de_lien_Liste_des_types_de_lien_entre_personne0(Compo_Maitre)
{
 var Table="typelien";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de lien
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_de_lien_Liste_des_types_de_lien_entre_personne0(Compo_Maitre)
{
 var Table="typelien";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tl_code=GetValAt(159);
 if (!ValiderChampsObligatoire(Table,"tl_code",TAB_GLOBAL_COMPO[159],tl_code,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_code",TAB_GLOBAL_COMPO[159],tl_code))
         return -1;
 var tl_libelle=GetValAt(160);
 if (!ValiderChampsObligatoire(Table,"tl_libelle",TAB_GLOBAL_COMPO[160],tl_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_libelle",TAB_GLOBAL_COMPO[160],tl_libelle))
         return -1;
 var tl_action12=GetValAt(161);
 if (!ValiderChampsObligatoire(Table,"tl_action12",TAB_GLOBAL_COMPO[161],tl_action12,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_action12",TAB_GLOBAL_COMPO[161],tl_action12))
         return -1;
 var tl_action21=GetValAt(162);
 if (!ValiderChampsObligatoire(Table,"tl_action21",TAB_GLOBAL_COMPO[162],tl_action21,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_action21",TAB_GLOBAL_COMPO[162],tl_action21))
         return -1;
 var tl_description=GetValAt(163);
 if (!ValiderChampsObligatoire(Table,"tl_description",TAB_GLOBAL_COMPO[163],tl_description,false))
         return -1;
 if (!ValiderChampsType(Table,"tl_description",TAB_GLOBAL_COMPO[163],tl_description))
         return -1;
 var Req="update "+Table+" set ";
 Req+="tl_code="+(tl_code=="" ? "null" : "'"+ValiderChaine(tl_code)+"'" )+",tl_libelle="+(tl_libelle=="" ? "null" : "'"+ValiderChaine(tl_libelle)+"'" )+",tl_action12="+(tl_action12=="" ? "null" : "'"+ValiderChaine(tl_action12)+"'" )+",tl_action21="+(tl_action21=="" ? "null" : "'"+ValiderChaine(tl_action21)+"'" )+",tl_description="+(tl_description=="" ? "null" : "'"+ValiderChaine(tl_description)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de personne
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_de_personne_Liste_des_types_de_personne0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 1

Id dans le tab: 169;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="typepersonne";
 var CleMaitre = TAB_COMPO_PPTES[167].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tp_type=GetValAt(169);
 if (!ValiderChampsObligatoire(Table,"tp_type",TAB_GLOBAL_COMPO[169],tp_type,false))
         return -1;
 if (!ValiderChampsType(Table,"tp_type",TAB_GLOBAL_COMPO[169],tp_type))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",tp_type"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(tp_type=="" ? "null" : "'"+ValiderChaine(tp_type)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de personne
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_de_personne_Liste_des_types_de_personne0(Compo_Maitre)
{
 var Table="typepersonne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de personne
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_de_personne_Liste_des_types_de_personne0(Compo_Maitre)
{
 var Table="typepersonne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tp_type=GetValAt(169);
 if (!ValiderChampsObligatoire(Table,"tp_type",TAB_GLOBAL_COMPO[169],tp_type,false))
         return -1;
 if (!ValiderChampsType(Table,"tp_type",TAB_GLOBAL_COMPO[169],tp_type))
         return -1;
 var Req="update "+Table+" set ";
 Req+="tp_type="+(tp_type=="" ? "null" : "'"+ValiderChaine(tp_type)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de soci�t�s
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 1

Id dans le tab: 183;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="typesociete";
 var CleMaitre = TAB_COMPO_PPTES[181].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ts_libelle=GetValAt(183);
 if (!ValiderChampsObligatoire(Table,"ts_libelle",TAB_GLOBAL_COMPO[183],ts_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ts_libelle",TAB_GLOBAL_COMPO[183],ts_libelle))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ts_libelle"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ts_libelle=="" ? "null" : "'"+ValiderChaine(ts_libelle)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de soci�t�s
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0(Compo_Maitre)
{
 var Table="typesociete";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de soci�t�s
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_de_soci�t�s_Liste_des_types_de_soci�t�s0(Compo_Maitre)
{
 var Table="typesociete";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ts_libelle=GetValAt(183);
 if (!ValiderChampsObligatoire(Table,"ts_libelle",TAB_GLOBAL_COMPO[183],ts_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ts_libelle",TAB_GLOBAL_COMPO[183],ts_libelle))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ts_libelle="+(ts_libelle=="" ? "null" : "'"+ValiderChaine(ts_libelle)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de t�ches
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Types_de_t�ches_Liste_des_types_de_t�ches0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 136;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 137;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="typetache";
 var CleMaitre = TAB_COMPO_PPTES[134].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var th_libelle=GetValAt(136);
 if (!ValiderChampsObligatoire(Table,"th_libelle",TAB_GLOBAL_COMPO[136],th_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"th_libelle",TAB_GLOBAL_COMPO[136],th_libelle))
         return -1;
 var th_description=GetValAt(137);
 if (!ValiderChampsObligatoire(Table,"th_description",TAB_GLOBAL_COMPO[137],th_description,false))
         return -1;
 if (!ValiderChampsType(Table,"th_description",TAB_GLOBAL_COMPO[137],th_description))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",th_libelle,th_description"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(th_libelle=="" ? "null" : "'"+ValiderChaine(th_libelle)+"'" )+","+(th_description=="" ? "null" : "'"+ValiderChaine(th_description)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de t�ches
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Types_de_t�ches_Liste_des_types_de_t�ches0(Compo_Maitre)
{
 var Table="typetache";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Types de t�ches
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Types_de_t�ches_Liste_des_types_de_t�ches0(Compo_Maitre)
{
 var Table="typetache";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var th_libelle=GetValAt(136);
 if (!ValiderChampsObligatoire(Table,"th_libelle",TAB_GLOBAL_COMPO[136],th_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"th_libelle",TAB_GLOBAL_COMPO[136],th_libelle))
         return -1;
 var th_description=GetValAt(137);
 if (!ValiderChampsObligatoire(Table,"th_description",TAB_GLOBAL_COMPO[137],th_description,false))
         return -1;
 if (!ValiderChampsType(Table,"th_description",TAB_GLOBAL_COMPO[137],th_description))
         return -1;
 var Req="update "+Table+" set ";
 Req+="th_libelle="+(th_libelle=="" ? "null" : "'"+ValiderChaine(th_libelle)+"'" )+",th_description="+(th_description=="" ? "null" : "'"+ValiderChaine(th_description)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Villes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Villes_Liste_des_villes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 279;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 280;
simple
Nbr Jointure: 1;
    Joint n� 0 = canton,ct_numero,ct_numero

******************
*/

 var Table="ville";
 var CleMaitre = TAB_COMPO_PPTES[275].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var vi_nom=GetValAt(279);
 if (!ValiderChampsObligatoire(Table,"vi_nom",TAB_GLOBAL_COMPO[279],vi_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"vi_nom",TAB_GLOBAL_COMPO[279],vi_nom))
         return -1;
 var ct_numero=GetValAt(280);
 if (ct_numero=="-1")
    ct_numero="null";
 if (!ValiderChampsObligatoire(Table,"ct_numero",TAB_GLOBAL_COMPO[280],ct_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",vi_nom,ct_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(vi_nom=="" ? "null" : "'"+ValiderChaine(vi_nom)+"'" )+","+ct_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Villes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Villes_Liste_des_villes0(Compo_Maitre)
{
 var Table="ville";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Villes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Villes_Liste_des_villes0(Compo_Maitre)
{
 var Table="ville";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var vi_nom=GetValAt(279);
 if (!ValiderChampsObligatoire(Table,"vi_nom",TAB_GLOBAL_COMPO[279],vi_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"vi_nom",TAB_GLOBAL_COMPO[279],vi_nom))
         return -1;
 var ct_numero=GetValAt(280);
 if (ct_numero=="-1")
    ct_numero="null";
 if (!ValiderChampsObligatoire(Table,"ct_numero",TAB_GLOBAL_COMPO[280],ct_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="vi_nom="+(vi_nom=="" ? "null" : "'"+ValiderChaine(vi_nom)+"'" )+",ct_numero="+ct_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise � jour");
return CleMaitre;

}

function LstDouble_Exec_Req(CompoSqlListeDessous,CleMaitre_val)
{
    /* cas ou on a 1 seule table de liaison */
    var TabJointure=CompoSqlListeDessous.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;
    if(TabJointure.length!=2)
        {
            alert("Erreur de programmation:\nLes listes doubles doivent contenir une et une seule table de liaison");
            throw "Les listes doubles doivent contenir une et une seule table de liaison";
        }

    var CleRel=TabJointure[1].CleDebut;
    var TableRel=TabJointure[0].TableFin;
    var CleMaitre_nom=TabJointure[0].CleFin;
    var ReqRel="select "+CleRel+" from "+TableRel+" where "+CleMaitre_nom+"="+CleMaitre_val;
    var result=pgsql_query(ReqRel);
    var enumerator=result.enumerate();
    var TabCle=CompoSqlListeDessous.getAllCleVal();

    if (result.rowCount==0)
        {
            /* cas ou la liste �tait vide */
            var i;
            for(i=0;i<TabCle.length;i++)
                {
                    var ReqInsert="insert into "+TableRel+" ("+CleMaitre_nom+","+CleRel+") values("+CleMaitre_val+","+TabCle[i]+")";
                    if (pgsql_update(ReqInsert)==0)
                        {
                            alert("Echec lors de l'insertion");
                            return;
                        }
                }
        }
    else
        {

            /* ON PARCOURS LE TABLEAU EXISTANT */
            enumerator.beforeFirst();
            var encore= true;
            while(encore)
                {
                    encore = enumerator.next();
                    /* on cherche ce qu'on supprime */
                    var i=0;
                    var trouve=false;
                    while(i<TabCle.length && !trouve)
                        {
                            if (TabCle[i]==enumerator.getVariant(0))
                                {
                                    trouve=true;
                                }
                            i++;
                        }
                    /* si il n'est pas dans le nouveau tableau on l'efface */
                    if (!trouve)
                        {
                            var ReqDel="delete from "+TableRel+" where "+CleMaitre_nom+"="+CleMaitre_val+" and "+CleRel+"="+enumerator.getVariant(0);
                            if (pgsql_update(ReqDel)==0)
                                {
                                    alert("Echec lors de l'insertion");
                                    return;
                                }
                        }
                }


            /* ON PARCOURS LE DEUXIEME TABLEAU */
            var i;
            for(i=0;i<TabCle.length;i++)
                {
                    /* on cherche ce qu'on insert */
                    enumerator.beforeFirst();
                    var encore= true;
                    var trouve=false;
                    while(encore && !trouve)
                        {
                            encore = enumerator.next();
                            if(TabCle[i]==enumerator.getVariant(0))
                                trouve=true;
                        }
                    /* si on ne l'a pas trouver on l'insert */
                    if (!trouve)
                        {
                            var ReqIns="insert into "+TableRel+" ("+CleMaitre_nom+","+CleRel+") values("+CleMaitre_val+","+TabCle[i]+")";
                            if (pgsql_update(ReqIns)==0)
                                {
                                    alert("Echec lors de l'insertion");
                                    return;
                                }
                        }
                }
        }
}
        function GenererAssociation11(ComposantFinal,CleCompoFinal,CleMaitre,TabOut)
{
        /* on regarde dans quel cas on se trouve (cl� �trang�re: 1 liaison ou asso: 2 liaisons) */
        var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;
    if(TabJointure.length>2)
        {
            alert("Erreur de programmation:\nTrop de liaisons (>2)");
            throw "Erreur de programmation:\nTrop de liaisons (>2)";
        }
        /* cas de jointure simple */
        if (TabJointure.length==1)
        {
                /* l'enregistrement doit exister */
                var CleEtrangere;
                var TableFinale=ComposantFinal.getTable();
                /* on regarde le sens de la jointure */
                if (TabJointure[0].TableFin==TableFinale)
                        CleEtrangere=TabJointure[0].CleFin;
                else
                        CleEtrangere=TabJointure[0].CleDebut;

                if (mcd_obligatoire(TableFinale,CleEtrangere))
                {
                        TabOut.push(CleEtrangere);
                        TabOut.push(CleMaitre);
                        return true
                }
        }
        return false;
}
function AjouterAssociation(ComposantFinal,CleCompoFinal,CleMaitre)
{
        /* on regarde dans quel cas on se trouve (cl� �trang�re: 1 liaison ou asso: 2 liaisons) */
        var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;
    if(TabJointure.length>2)
        {
            alert("Erreur de programmation:\nTrop de liaisons (>2)");
            throw "Erreur de programmation:\nTrop de liaisons (>2)";
        }
        /* cas de jointure simple */
        if (TabJointure.length==1)
        {
                /* l'enregistrement doit exister */
                var CleEtrangere;
                var TableFinale=ComposantFinal.getTable();
                /* on regarde le sens de la jointure */
                if (TabJointure[0].TableFin==TableFinale)
                        CleEtrangere=TabJointure[0].CleFin;
                else
                        CleEtrangere=TabJointure[0].CleDebut;
                var req="update "+TableFinale+" set "+CleEtrangere+" = "+CleMaitre+" where "+ComposantFinal.getCle()+" = "+CleCompoFinal;
                if (pgsql_update(req)==0)
                {
                        alert("Echec lors de la mise � jour");
                        return false;
                }
        }
        else
        {
                /* cas de jointure double */
                var TableFinale=ComposantFinal.getTable();
                var CleAsso_TableFinal;
                var CleAsso_TableMaitre;
                var TableAsso=TabJointure[0].TableFin;
                /* on regarde le sens de la jointure */
                if (TabJointure[1].TableFin==TableFinale)
                {
                        CleAsso_TableMaitre=TabJointure[0].CleFin;
                        CleAsso_TableFinal=TabJointure[1].CleDebut;
                }
                else
                {
                        CleAsso_TableFinal=TabJointure[0].CleFin;
                        CleAsso_TableMaitre=TabJointure[1].CleDebut;
                }
                var req="insert into "+TableAsso+" ("+CleAsso_TableMaitre+","+CleAsso_TableFinal+") values ("+CleMaitre+","+CleCompoFinal+")";
                if (pgsql_update(req)==0)
                {
                        alert("Echec lors de l'insertion");
                        return false;
                }
        }
        return true;
}
function SuprimerAssociation(ComposantFinal,CleCompoFinal,CleMaitre)
{
        /* on regarde dans quel cas on se trouve (cl� �trang�re: 1 liaison ou asso: 2 liaisons) */
        var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;

        /* on ne g�re que les doubles jointure */
        if (TabJointure.length!=2)
                return false;

        var TableFinale=ComposantFinal.getTable();
        var CleAsso_TableFinal;
        var CleAsso_TableMaitre;
        var TableAsso=TabJointure[0].TableFin;
        /* on regarde le sens de la jointure */
        if (TabJointure[1].TableFin==TableFinale)
        {
                CleAsso_TableMaitre=TabJointure[0].CleFin;
                CleAsso_TableFinal=TabJointure[1].CleDebut;
        }
        else
        {
                CleAsso_TableFinal=TabJointure[0].CleFin;
                CleAsso_TableMaitre=TabJointure[1].CleDebut;
        }
        var req="delete from "+TableAsso+" where ( ("+CleAsso_TableMaitre+" = "+CleMaitre+") AND ("+CleAsso_TableFinal+" = "+CleCompoFinal+") )";
        if (pgsql_update(req)==0)
        {
                alert("Echec lors de l'insertion");
                return false;
        }
}
