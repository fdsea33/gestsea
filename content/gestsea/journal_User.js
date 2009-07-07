/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Liste_des_personnes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 12

Id dans le tab: 762;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 763;
simple
Nbr Jointure: 1;
    Joint n° 0 = naturepersonne,np_numero,np_numero

Id dans le tab: 764;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 765;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 766;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 767;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 768;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 769;
complexe
Nbr Jointure: 1;
    Joint n° 0 = vue_cotisation,pe_numero,pe_numero

Id dans le tab: 776;
complexe
Nbr Jointure: 1;
    Joint n° 0 = adresse,pe_numero,pe_numero

Id dans le tab: 788;
complexe
Nbr Jointure: 1;
    Joint n° 0 = contact,pe_numero,pe_numero

Id dans le tab: 793;
complexe
Nbr Jointure: 1;
    Joint n° 0 = attribut,pe_numero,pe_numero

Id dans le tab: 799;
complexe
Nbr Jointure: 1;
    Joint n° 0 = routage,pe_numero,pe_numero

******************
*/

 var Table="personne";
 var CleMaitre = TAB_COMPO_PPTES[759].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pe_id=GetValAt(762);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[762],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[762],pe_id))
         return -1;
 var np_numero=GetValAt(763);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[763],np_numero,true))
         return -1;
 var pe_nom=GetValAt(764);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[764],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[764],pe_nom))
         return -1;
 var pe_prenom=GetValAt(765);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[765],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[765],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(766);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[766],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[766],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(767);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[767],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[767],pe_naissance))
         return -1;
 var pe_actif=GetValAt(768);
 if (!ValiderChampsObligatoire(Table,"pe_actif",TAB_GLOBAL_COMPO[768],pe_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_actif",TAB_GLOBAL_COMPO[768],pe_actif))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_id,np_numero,pe_nom,pe_prenom,pe_numtvaic,pe_naissance,pe_actif"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(pe_id=="" ? "null" : "'"+ValiderChaine(pe_id)+"'" )+","+np_numero+","+(pe_nom=="" ? "null" : "'"+ValiderChaine(pe_nom)+"'" )+","+(pe_prenom=="" ? "null" : "'"+ValiderChaine(pe_prenom)+"'" )+","+(pe_numtvaic=="" ? "null" : "'"+ValiderChaine(pe_numtvaic)+"'" )+","+(pe_naissance=="" ? "null" : "'"+ValiderChaine(pe_naissance)+"'" )+","+(pe_actif=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Liste_des_personnes0(Compo_Maitre)
{
 var Table="personne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Personnes_Liste_des_personnes0(Compo_Maitre)
{
 var Table="personne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pe_id=GetValAt(762);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[762],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[762],pe_id))
         return -1;
 var np_numero=GetValAt(763);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[763],np_numero,true))
         return -1;
 var pe_nom=GetValAt(764);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[764],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[764],pe_nom))
         return -1;
 var pe_prenom=GetValAt(765);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[765],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[765],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(766);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[766],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[766],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(767);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[767],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[767],pe_naissance))
         return -1;
 var pe_actif=GetValAt(768);
 if (!ValiderChampsObligatoire(Table,"pe_actif",TAB_GLOBAL_COMPO[768],pe_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_actif",TAB_GLOBAL_COMPO[768],pe_actif))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pe_id="+(pe_id=="" ? "null" : "'"+ValiderChaine(pe_id)+"'" )+",np_numero="+np_numero+",pe_nom="+(pe_nom=="" ? "null" : "'"+ValiderChaine(pe_nom)+"'" )+",pe_prenom="+(pe_prenom=="" ? "null" : "'"+ValiderChaine(pe_prenom)+"'" )+",pe_numtvaic="+(pe_numtvaic=="" ? "null" : "'"+ValiderChaine(pe_numtvaic)+"'" )+",pe_naissance="+(pe_naissance=="" ? "null" : "'"+ValiderChaine(pe_naissance)+"'" )+",pe_actif="+(pe_actif=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Adresses_9(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 7

Id dans le tab: 781;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 782;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 783;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 784;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 785;
simple
Nbr Jointure: 1;
    Joint n° 0 = codepostal,cp_numero,cp_numero

Id dans le tab: 786;
simple
Nbr Jointure: 1;
    Joint n° 0 = ville,vi_numero,vi_numero

Id dans le tab: 787;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="adresse";
 var CleMaitre = TAB_COMPO_PPTES[776].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ad_ligne2=GetValAt(781);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[781],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[781],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(782);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[782],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[782],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(783);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[783],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[783],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(784);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[784],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[784],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(785);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[785],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(786);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[786],vi_numero,true))
         return -1;
 var ad_default=GetValAt(787);
 if (!ValiderChampsObligatoire(Table,"ad_default",TAB_GLOBAL_COMPO[787],ad_default,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_default",TAB_GLOBAL_COMPO[787],ad_default))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ad_ligne2,ad_ligne3,ad_ligne4,ad_ligne5,cp_numero,vi_numero,ad_default"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[759].NewCle+","+(ad_ligne2=="" ? "null" : "'"+ValiderChaine(ad_ligne2)+"'" )+","+(ad_ligne3=="" ? "null" : "'"+ValiderChaine(ad_ligne3)+"'" )+","+(ad_ligne4=="" ? "null" : "'"+ValiderChaine(ad_ligne4)+"'" )+","+(ad_ligne5=="" ? "null" : "'"+ValiderChaine(ad_ligne5)+"'" )+","+cp_numero+","+vi_numero+","+(ad_default=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Adresses_9(Compo_Maitre)
{
 var Table="adresse";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Personnes_Adresses_9(Compo_Maitre)
{
 var Table="adresse";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ad_ligne2=GetValAt(781);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[781],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[781],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(782);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[782],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[782],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(783);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[783],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[783],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(784);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[784],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[784],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(785);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[785],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(786);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[786],vi_numero,true))
         return -1;
 var ad_default=GetValAt(787);
 if (!ValiderChampsObligatoire(Table,"ad_default",TAB_GLOBAL_COMPO[787],ad_default,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_default",TAB_GLOBAL_COMPO[787],ad_default))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ad_ligne2="+(ad_ligne2=="" ? "null" : "'"+ValiderChaine(ad_ligne2)+"'" )+",ad_ligne3="+(ad_ligne3=="" ? "null" : "'"+ValiderChaine(ad_ligne3)+"'" )+",ad_ligne4="+(ad_ligne4=="" ? "null" : "'"+ValiderChaine(ad_ligne4)+"'" )+",ad_ligne5="+(ad_ligne5=="" ? "null" : "'"+ValiderChaine(ad_ligne5)+"'" )+",cp_numero="+cp_numero+",vi_numero="+vi_numero+",ad_default="+(ad_default=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Contact_17(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 791;
simple
Nbr Jointure: 1;
    Joint n° 0 = contacttype,ck_numero,ck_numero

Id dans le tab: 792;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="contact";
 var CleMaitre = TAB_COMPO_PPTES[788].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ck_numero=GetValAt(791);
 if (ck_numero=="-1")
    ck_numero="null";
 if (!ValiderChampsObligatoire(Table,"ck_numero",TAB_GLOBAL_COMPO[791],ck_numero,true))
         return -1;
 var cn_coordonnee=GetValAt(792);
 if (!ValiderChampsObligatoire(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[792],cn_coordonnee,false))
         return -1;
 if (!ValiderChampsType(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[792],cn_coordonnee))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ck_numero,cn_coordonnee"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[759].NewCle+","+ck_numero+","+(cn_coordonnee=="" ? "null" : "'"+ValiderChaine(cn_coordonnee)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Contact_17(Compo_Maitre)
{
 var Table="contact";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Personnes_Contact_17(Compo_Maitre)
{
 var Table="contact";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ck_numero=GetValAt(791);
 if (ck_numero=="-1")
    ck_numero="null";
 if (!ValiderChampsObligatoire(Table,"ck_numero",TAB_GLOBAL_COMPO[791],ck_numero,true))
         return -1;
 var cn_coordonnee=GetValAt(792);
 if (!ValiderChampsObligatoire(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[792],cn_coordonnee,false))
         return -1;
 if (!ValiderChampsType(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[792],cn_coordonnee))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ck_numero="+ck_numero+",cn_coordonnee="+(cn_coordonnee=="" ? "null" : "'"+ValiderChaine(cn_coordonnee)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Attributs_20(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 796;
simple
Nbr Jointure: 1;
    Joint n° 0 = typeattribut,ta_numero,ta_numero

Id dans le tab: 797;
simple
Nbr Jointure: 1;
    Joint n° 0 = categorie,cr_numero,cr_numero

Id dans le tab: 798;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="attribut";
 var CleMaitre = TAB_COMPO_PPTES[793].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ta_numero=GetValAt(796);
 if (ta_numero=="-1")
    ta_numero="null";
 if (!ValiderChampsObligatoire(Table,"ta_numero",TAB_GLOBAL_COMPO[796],ta_numero,true))
         return -1;
 var cr_numero=GetValAt(797);
 if (cr_numero=="-1")
    cr_numero="null";
 if (!ValiderChampsObligatoire(Table,"cr_numero",TAB_GLOBAL_COMPO[797],cr_numero,true))
         return -1;
 var at_valeur=GetValAt(798);
 if (!ValiderChampsObligatoire(Table,"at_valeur",TAB_GLOBAL_COMPO[798],at_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"at_valeur",TAB_GLOBAL_COMPO[798],at_valeur))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ta_numero,cr_numero,at_valeur"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[759].NewCle+","+ta_numero+","+cr_numero+","+(at_valeur=="" ? "null" : "'"+ValiderChaine(at_valeur)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Attributs_20(Compo_Maitre)
{
 var Table="attribut";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Personnes_Attributs_20(Compo_Maitre)
{
 var Table="attribut";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ta_numero=GetValAt(796);
 if (ta_numero=="-1")
    ta_numero="null";
 if (!ValiderChampsObligatoire(Table,"ta_numero",TAB_GLOBAL_COMPO[796],ta_numero,true))
         return -1;
 var cr_numero=GetValAt(797);
 if (cr_numero=="-1")
    cr_numero="null";
 if (!ValiderChampsObligatoire(Table,"cr_numero",TAB_GLOBAL_COMPO[797],cr_numero,true))
         return -1;
 var at_valeur=GetValAt(798);
 if (!ValiderChampsObligatoire(Table,"at_valeur",TAB_GLOBAL_COMPO[798],at_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"at_valeur",TAB_GLOBAL_COMPO[798],at_valeur))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ta_numero="+ta_numero+",cr_numero="+cr_numero+",at_valeur="+(at_valeur=="" ? "null" : "'"+ValiderChaine(at_valeur)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Routages_24(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 805;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 806;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 807;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 808;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="routage";
 var CleMaitre = TAB_COMPO_PPTES[799].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ro_debutservice=GetValAt(805);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[805],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[805],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(806);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[806],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[806],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(807);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[807],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[807],ro_quantite))
         return -1;
 var ro_suspendu=GetValAt(808);
 if (!ValiderChampsObligatoire(Table,"ro_suspendu",TAB_GLOBAL_COMPO[808],ro_suspendu,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_suspendu",TAB_GLOBAL_COMPO[808],ro_suspendu))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ro_debutservice,ro_finservice,ro_quantite,ro_suspendu"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[759].NewCle+","+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+","+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+","+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+","+(ro_suspendu=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Routages_24(Compo_Maitre)
{
 var Table="routage";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Personnes_Routages_24(Compo_Maitre)
{
 var Table="routage";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ro_debutservice=GetValAt(805);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[805],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[805],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(806);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[806],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[806],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(807);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[807],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[807],ro_quantite))
         return -1;
 var ro_suspendu=GetValAt(808);
 if (!ValiderChampsObligatoire(Table,"ro_suspendu",TAB_GLOBAL_COMPO[808],ro_suspendu,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_suspendu",TAB_GLOBAL_COMPO[808],ro_suspendu))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ro_debutservice="+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+",ro_finservice="+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+",ro_quantite="+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+",ro_suspendu="+(ro_suspendu=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
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
            /* cas ou la liste était vide */
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
        /* on regarde dans quel cas on se trouve (clé étrangère: 1 liaison ou asso: 2 liaisons) */
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
        /* on regarde dans quel cas on se trouve (clé étrangère: 1 liaison ou asso: 2 liaisons) */
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
                        alert("Echec lors de la mise à jour");
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
        /* on regarde dans quel cas on se trouve (clé étrangère: 1 liaison ou asso: 2 liaisons) */
        var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;

        /* on ne gère que les doubles jointure */
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
