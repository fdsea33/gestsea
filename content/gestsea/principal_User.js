/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Liste_des_personnes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 18

Id dans le tab: 6;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 7;
simple
Nbr Jointure: 1;
    Joint n° 0 = naturepersonne,np_numero,np_numero

Id dans le tab: 8;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 9;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 10;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 11;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 12;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 13;
complexe
Nbr Jointure: 1;
    Joint n° 0 = vue_cotisation,pe_numero,pe_numero

Id dans le tab: 20;
complexe
Nbr Jointure: 1;
    Joint n° 0 = observation,pe_numero,pe_numero

Id dans le tab: 25;
complexe
Nbr Jointure: 1;
    Joint n° 0 = adresse,pe_numero,pe_numero

Id dans le tab: 37;
complexe
Nbr Jointure: 1;
    Joint n° 0 = contact,pe_numero,pe_numero

Id dans le tab: 42;
complexe
Nbr Jointure: 1;
    Joint n° 0 = appel,pe_numero,pe_numero

Id dans le tab: 53;
complexe
Nbr Jointure: 1;
    Joint n° 0 = estresponsable,pe_numero,pe_numero

Id dans le tab: 65;
complexe
Nbr Jointure: 1;
    Joint n° 0 = attribut,pe_numero,pe_numero

Id dans le tab: 71;
complexe
Nbr Jointure: 1;
    Joint n° 0 = devis,pe_numero,pe_numero

Id dans le tab: 77;
complexe
Nbr Jointure: 1;
    Joint n° 0 = facture,pe_numero,pe_numero

Id dans le tab: 85;
complexe
Nbr Jointure: 1;
    Joint n° 0 = reglement,pe_numero,pe_numero

Id dans le tab: 91;
complexe
Nbr Jointure: 1;
    Joint n° 0 = routage,pe_numero,pe_numero

******************
*/

 var Table="personne";
 var CleMaitre = TAB_COMPO_PPTES[3].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pe_id=GetValAt(6);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[6],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[6],pe_id))
         return -1;
 var np_numero=GetValAt(7);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[7],np_numero,true))
         return -1;
 var pe_nom=GetValAt(8);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[8],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[8],pe_nom))
         return -1;
 var pe_prenom=GetValAt(9);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[9],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[9],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(10);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[10],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[10],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(11);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[11],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[11],pe_naissance))
         return -1;
 var pe_actif=GetValAt(12);
 if (!ValiderChampsObligatoire(Table,"pe_actif",TAB_GLOBAL_COMPO[12],pe_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_actif",TAB_GLOBAL_COMPO[12],pe_actif))
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
 var pe_id=GetValAt(6);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[6],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[6],pe_id))
         return -1;
 var np_numero=GetValAt(7);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[7],np_numero,true))
         return -1;
 var pe_nom=GetValAt(8);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[8],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[8],pe_nom))
         return -1;
 var pe_prenom=GetValAt(9);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[9],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[9],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(10);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[10],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[10],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(11);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[11],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[11],pe_naissance))
         return -1;
 var pe_actif=GetValAt(12);
 if (!ValiderChampsObligatoire(Table,"pe_actif",TAB_GLOBAL_COMPO[12],pe_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_actif",TAB_GLOBAL_COMPO[12],pe_actif))
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
function User_Insert_Personnes_Observations_9(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 23;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 24;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="observation";
 var CleMaitre = TAB_COMPO_PPTES[20].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ob_niveau=GetValAt(23);
 if (!ValiderChampsObligatoire(Table,"ob_niveau",TAB_GLOBAL_COMPO[23],ob_niveau,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_niveau",TAB_GLOBAL_COMPO[23],ob_niveau))
         return -1;
 var ob_observation=GetValAt(24);
 if (!ValiderChampsObligatoire(Table,"ob_observation",TAB_GLOBAL_COMPO[24],ob_observation,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_observation",TAB_GLOBAL_COMPO[24],ob_observation))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ob_niveau,ob_observation"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[3].NewCle+","+(ob_niveau=="" ? "null" : "'"+ValiderChaine(ob_niveau)+"'" )+","+(ob_observation=="" ? "null" : "'"+ValiderChaine(ob_observation)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Observations_9(Compo_Maitre)
{
 var Table="observation";
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
function User_Update_Personnes_Observations_9(Compo_Maitre)
{
 var Table="observation";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ob_niveau=GetValAt(23);
 if (!ValiderChampsObligatoire(Table,"ob_niveau",TAB_GLOBAL_COMPO[23],ob_niveau,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_niveau",TAB_GLOBAL_COMPO[23],ob_niveau))
         return -1;
 var ob_observation=GetValAt(24);
 if (!ValiderChampsObligatoire(Table,"ob_observation",TAB_GLOBAL_COMPO[24],ob_observation,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_observation",TAB_GLOBAL_COMPO[24],ob_observation))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ob_niveau="+(ob_niveau=="" ? "null" : "'"+ValiderChaine(ob_niveau)+"'" )+",ob_observation="+(ob_observation=="" ? "null" : "'"+ValiderChaine(ob_observation)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Adresses_12(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 7

Id dans le tab: 30;
simple
Nbr Jointure: 1;
    Joint n° 0 = typeadresse,ak_numero,ak_numero

Id dans le tab: 31;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 32;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 33;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 34;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 35;
simple
Nbr Jointure: 1;
    Joint n° 0 = codepostal,cp_numero,cp_numero

Id dans le tab: 36;
simple
Nbr Jointure: 1;
    Joint n° 0 = ville,vi_numero,vi_numero

******************
*/

 var Table="adresse";
 var CleMaitre = TAB_COMPO_PPTES[25].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ak_numero=GetValAt(30);
 if (ak_numero=="-1")
    ak_numero="null";
 if (!ValiderChampsObligatoire(Table,"ak_numero",TAB_GLOBAL_COMPO[30],ak_numero,true))
         return -1;
 var ad_ligne2=GetValAt(31);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[31],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[31],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(32);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[32],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[32],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(33);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[33],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[33],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(34);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[34],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[34],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(35);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[35],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(36);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[36],vi_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ak_numero,ad_ligne2,ad_ligne3,ad_ligne4,ad_ligne5,cp_numero,vi_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[3].NewCle+","+ak_numero+","+(ad_ligne2=="" ? "null" : "'"+ValiderChaine(ad_ligne2)+"'" )+","+(ad_ligne3=="" ? "null" : "'"+ValiderChaine(ad_ligne3)+"'" )+","+(ad_ligne4=="" ? "null" : "'"+ValiderChaine(ad_ligne4)+"'" )+","+(ad_ligne5=="" ? "null" : "'"+ValiderChaine(ad_ligne5)+"'" )+","+cp_numero+","+vi_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Adresses_12(Compo_Maitre)
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
function User_Update_Personnes_Adresses_12(Compo_Maitre)
{
 var Table="adresse";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ak_numero=GetValAt(30);
 if (ak_numero=="-1")
    ak_numero="null";
 if (!ValiderChampsObligatoire(Table,"ak_numero",TAB_GLOBAL_COMPO[30],ak_numero,true))
         return -1;
 var ad_ligne2=GetValAt(31);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[31],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[31],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(32);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[32],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[32],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(33);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[33],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[33],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(34);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[34],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[34],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(35);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[35],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(36);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[36],vi_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ak_numero="+ak_numero+",ad_ligne2="+(ad_ligne2=="" ? "null" : "'"+ValiderChaine(ad_ligne2)+"'" )+",ad_ligne3="+(ad_ligne3=="" ? "null" : "'"+ValiderChaine(ad_ligne3)+"'" )+",ad_ligne4="+(ad_ligne4=="" ? "null" : "'"+ValiderChaine(ad_ligne4)+"'" )+",ad_ligne5="+(ad_ligne5=="" ? "null" : "'"+ValiderChaine(ad_ligne5)+"'" )+",cp_numero="+cp_numero+",vi_numero="+vi_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Contact_20(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 40;
simple
Nbr Jointure: 1;
    Joint n° 0 = contacttype,ck_numero,ck_numero

Id dans le tab: 41;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="contact";
 var CleMaitre = TAB_COMPO_PPTES[37].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ck_numero=GetValAt(40);
 if (ck_numero=="-1")
    ck_numero="null";
 if (!ValiderChampsObligatoire(Table,"ck_numero",TAB_GLOBAL_COMPO[40],ck_numero,true))
         return -1;
 var cn_coordonnee=GetValAt(41);
 if (!ValiderChampsObligatoire(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[41],cn_coordonnee,false))
         return -1;
 if (!ValiderChampsType(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[41],cn_coordonnee))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ck_numero,cn_coordonnee"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[3].NewCle+","+ck_numero+","+(cn_coordonnee=="" ? "null" : "'"+ValiderChaine(cn_coordonnee)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Contact_20(Compo_Maitre)
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
function User_Update_Personnes_Contact_20(Compo_Maitre)
{
 var Table="contact";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ck_numero=GetValAt(40);
 if (ck_numero=="-1")
    ck_numero="null";
 if (!ValiderChampsObligatoire(Table,"ck_numero",TAB_GLOBAL_COMPO[40],ck_numero,true))
         return -1;
 var cn_coordonnee=GetValAt(41);
 if (!ValiderChampsObligatoire(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[41],cn_coordonnee,false))
         return -1;
 if (!ValiderChampsType(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[41],cn_coordonnee))
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
function User_Insert_Personnes_Tâches_23(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 48;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 49;
simple
Nbr Jointure: 1;
    Joint n° 0 = typetache,th_numero,th_numero

Id dans le tab: 50;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 51;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 52;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="appel";
 var CleMaitre = TAB_COMPO_PPTES[42].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ap_date=GetValAt(48);
 if (!ValiderChampsObligatoire(Table,"ap_date",TAB_GLOBAL_COMPO[48],ap_date,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_date",TAB_GLOBAL_COMPO[48],ap_date))
         return -1;
 var th_numero=GetValAt(49);
 if (th_numero=="-1")
    th_numero="null";
 if (!ValiderChampsObligatoire(Table,"th_numero",TAB_GLOBAL_COMPO[49],th_numero,true))
         return -1;
 var ap_libelle=GetValAt(50);
 if (!ValiderChampsObligatoire(Table,"ap_libelle",TAB_GLOBAL_COMPO[50],ap_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_libelle",TAB_GLOBAL_COMPO[50],ap_libelle))
         return -1;
 var ap_duree=GetValAt(51);
 if (!ValiderChampsObligatoire(Table,"ap_duree",TAB_GLOBAL_COMPO[51],ap_duree,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_duree",TAB_GLOBAL_COMPO[51],ap_duree))
         return -1;
 var ap_description=GetValAt(52);
 if (!ValiderChampsObligatoire(Table,"ap_description",TAB_GLOBAL_COMPO[52],ap_description,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_description",TAB_GLOBAL_COMPO[52],ap_description))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ap_date,th_numero,ap_libelle,ap_duree,ap_description"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[3].NewCle+","+(ap_date=="" ? "null" : "'"+ValiderChaine(ap_date)+"'" )+","+th_numero+","+(ap_libelle=="" ? "null" : "'"+ValiderChaine(ap_libelle)+"'" )+","+(ap_duree=="" ? "null" : "'"+ValiderChaine(ap_duree)+"'" )+","+(ap_description=="" ? "null" : "'"+ValiderChaine(ap_description)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Tâches_23(Compo_Maitre)
{
 var Table="appel";
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
function User_Update_Personnes_Tâches_23(Compo_Maitre)
{
 var Table="appel";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ap_date=GetValAt(48);
 if (!ValiderChampsObligatoire(Table,"ap_date",TAB_GLOBAL_COMPO[48],ap_date,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_date",TAB_GLOBAL_COMPO[48],ap_date))
         return -1;
 var th_numero=GetValAt(49);
 if (th_numero=="-1")
    th_numero="null";
 if (!ValiderChampsObligatoire(Table,"th_numero",TAB_GLOBAL_COMPO[49],th_numero,true))
         return -1;
 var ap_libelle=GetValAt(50);
 if (!ValiderChampsObligatoire(Table,"ap_libelle",TAB_GLOBAL_COMPO[50],ap_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_libelle",TAB_GLOBAL_COMPO[50],ap_libelle))
         return -1;
 var ap_duree=GetValAt(51);
 if (!ValiderChampsObligatoire(Table,"ap_duree",TAB_GLOBAL_COMPO[51],ap_duree,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_duree",TAB_GLOBAL_COMPO[51],ap_duree))
         return -1;
 var ap_description=GetValAt(52);
 if (!ValiderChampsObligatoire(Table,"ap_description",TAB_GLOBAL_COMPO[52],ap_description,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_description",TAB_GLOBAL_COMPO[52],ap_description))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ap_date="+(ap_date=="" ? "null" : "'"+ValiderChaine(ap_date)+"'" )+",th_numero="+th_numero+",ap_libelle="+(ap_libelle=="" ? "null" : "'"+ValiderChaine(ap_libelle)+"'" )+",ap_duree="+(ap_duree=="" ? "null" : "'"+ValiderChaine(ap_duree)+"'" )+",ap_description="+(ap_description=="" ? "null" : "'"+ValiderChaine(ap_description)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Responsabilités_29(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 60;
simple
Nbr Jointure: 1;
    Joint n° 0 = responsabilite,re_numero,re_numero

Id dans le tab: 61;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 62;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 63;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 64;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="estresponsable";
 var CleMaitre = TAB_COMPO_PPTES[53].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var re_numero=GetValAt(60);
 if (re_numero=="-1")
    re_numero="null";
 if (!ValiderChampsObligatoire(Table,"re_numero",TAB_GLOBAL_COMPO[60],re_numero,true))
         return -1;
 var peac_titre=GetValAt(61);
 if (!ValiderChampsObligatoire(Table,"peac_titre",TAB_GLOBAL_COMPO[61],peac_titre,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_titre",TAB_GLOBAL_COMPO[61],peac_titre))
         return -1;
 var peac_periodedebut=GetValAt(62);
 if (!ValiderChampsObligatoire(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[62],peac_periodedebut,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[62],peac_periodedebut))
         return -1;
 var peac_periodefin=GetValAt(63);
 if (!ValiderChampsObligatoire(Table,"peac_periodefin",TAB_GLOBAL_COMPO[63],peac_periodefin,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodefin",TAB_GLOBAL_COMPO[63],peac_periodefin))
         return -1;
 var peac_fini=GetValAt(64);
 if (!ValiderChampsObligatoire(Table,"peac_fini",TAB_GLOBAL_COMPO[64],peac_fini,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_fini",TAB_GLOBAL_COMPO[64],peac_fini))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,re_numero,peac_titre,peac_periodedebut,peac_periodefin,peac_fini"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[3].NewCle+","+re_numero+","+(peac_titre=="" ? "null" : "'"+ValiderChaine(peac_titre)+"'" )+","+(peac_periodedebut=="" ? "null" : "'"+ValiderChaine(peac_periodedebut)+"'" )+","+(peac_periodefin=="" ? "null" : "'"+ValiderChaine(peac_periodefin)+"'" )+","+(peac_fini=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Responsabilités_29(Compo_Maitre)
{
 var Table="estresponsable";
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
function User_Update_Personnes_Responsabilités_29(Compo_Maitre)
{
 var Table="estresponsable";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var re_numero=GetValAt(60);
 if (re_numero=="-1")
    re_numero="null";
 if (!ValiderChampsObligatoire(Table,"re_numero",TAB_GLOBAL_COMPO[60],re_numero,true))
         return -1;
 var peac_titre=GetValAt(61);
 if (!ValiderChampsObligatoire(Table,"peac_titre",TAB_GLOBAL_COMPO[61],peac_titre,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_titre",TAB_GLOBAL_COMPO[61],peac_titre))
         return -1;
 var peac_periodedebut=GetValAt(62);
 if (!ValiderChampsObligatoire(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[62],peac_periodedebut,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[62],peac_periodedebut))
         return -1;
 var peac_periodefin=GetValAt(63);
 if (!ValiderChampsObligatoire(Table,"peac_periodefin",TAB_GLOBAL_COMPO[63],peac_periodefin,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodefin",TAB_GLOBAL_COMPO[63],peac_periodefin))
         return -1;
 var peac_fini=GetValAt(64);
 if (!ValiderChampsObligatoire(Table,"peac_fini",TAB_GLOBAL_COMPO[64],peac_fini,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_fini",TAB_GLOBAL_COMPO[64],peac_fini))
         return -1;
 var Req="update "+Table+" set ";
 Req+="re_numero="+re_numero+",peac_titre="+(peac_titre=="" ? "null" : "'"+ValiderChaine(peac_titre)+"'" )+",peac_periodedebut="+(peac_periodedebut=="" ? "null" : "'"+ValiderChaine(peac_periodedebut)+"'" )+",peac_periodefin="+(peac_periodefin=="" ? "null" : "'"+ValiderChaine(peac_periodefin)+"'" )+",peac_fini="+(peac_fini=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Attributs_35(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 68;
simple
Nbr Jointure: 1;
    Joint n° 0 = typeattribut,ta_numero,ta_numero

Id dans le tab: 69;
simple
Nbr Jointure: 1;
    Joint n° 0 = categorie,cr_numero,cr_numero

Id dans le tab: 70;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="attribut";
 var CleMaitre = TAB_COMPO_PPTES[65].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ta_numero=GetValAt(68);
 if (ta_numero=="-1")
    ta_numero="null";
 if (!ValiderChampsObligatoire(Table,"ta_numero",TAB_GLOBAL_COMPO[68],ta_numero,true))
         return -1;
 var cr_numero=GetValAt(69);
 if (cr_numero=="-1")
    cr_numero="null";
 if (!ValiderChampsObligatoire(Table,"cr_numero",TAB_GLOBAL_COMPO[69],cr_numero,true))
         return -1;
 var at_valeur=GetValAt(70);
 if (!ValiderChampsObligatoire(Table,"at_valeur",TAB_GLOBAL_COMPO[70],at_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"at_valeur",TAB_GLOBAL_COMPO[70],at_valeur))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ta_numero,cr_numero,at_valeur"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[3].NewCle+","+ta_numero+","+cr_numero+","+(at_valeur=="" ? "null" : "'"+ValiderChaine(at_valeur)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Attributs_35(Compo_Maitre)
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
function User_Update_Personnes_Attributs_35(Compo_Maitre)
{
 var Table="attribut";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ta_numero=GetValAt(68);
 if (ta_numero=="-1")
    ta_numero="null";
 if (!ValiderChampsObligatoire(Table,"ta_numero",TAB_GLOBAL_COMPO[68],ta_numero,true))
         return -1;
 var cr_numero=GetValAt(69);
 if (cr_numero=="-1")
    cr_numero="null";
 if (!ValiderChampsObligatoire(Table,"cr_numero",TAB_GLOBAL_COMPO[69],cr_numero,true))
         return -1;
 var at_valeur=GetValAt(70);
 if (!ValiderChampsObligatoire(Table,"at_valeur",TAB_GLOBAL_COMPO[70],at_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"at_valeur",TAB_GLOBAL_COMPO[70],at_valeur))
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
function User_Insert_Personnes_Routages_42(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 97;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 98;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 99;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 100;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="routage";
 var CleMaitre = TAB_COMPO_PPTES[91].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ro_debutservice=GetValAt(97);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[97],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[97],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(98);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[98],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[98],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(99);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[99],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[99],ro_quantite))
         return -1;
 var ro_suspendu=GetValAt(100);
 if (!ValiderChampsObligatoire(Table,"ro_suspendu",TAB_GLOBAL_COMPO[100],ro_suspendu,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_suspendu",TAB_GLOBAL_COMPO[100],ro_suspendu))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ro_debutservice,ro_finservice,ro_quantite,ro_suspendu"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[3].NewCle+","+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+","+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+","+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+","+(ro_suspendu=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Routages_42(Compo_Maitre)
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
function User_Update_Personnes_Routages_42(Compo_Maitre)
{
 var Table="routage";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ro_debutservice=GetValAt(97);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[97],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[97],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(98);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[98],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[98],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(99);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[99],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[99],ro_quantite))
         return -1;
 var ro_suspendu=GetValAt(100);
 if (!ValiderChampsObligatoire(Table,"ro_suspendu",TAB_GLOBAL_COMPO[100],ro_suspendu,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_suspendu",TAB_GLOBAL_COMPO[100],ro_suspendu))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ro_debutservice="+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+",ro_finservice="+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+",ro_quantite="+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+",ro_suspendu="+(ro_suspendu=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Devis
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Devis_Liste_des_devis0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 8

Id dans le tab: 106;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 107;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 108;
simple
Nbr Jointure: 1;
    Joint n° 0 = employe,em_numero,em_numero

Id dans le tab: 109;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 110;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 111;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 112;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 113;
complexe
Nbr Jointure: 1;
    Joint n° 0 = ligne,de_numero,de_numero

******************
*/

 var Table="devis";
 var CleMaitre = TAB_COMPO_PPTES[101].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var de_date=GetValAt(106);
 if (!ValiderChampsObligatoire(Table,"de_date",TAB_GLOBAL_COMPO[106],de_date,false))
         return -1;
 if (!ValiderChampsType(Table,"de_date",TAB_GLOBAL_COMPO[106],de_date))
         return -1;
 var de_libelle=GetValAt(107);
 if (!ValiderChampsObligatoire(Table,"de_libelle",TAB_GLOBAL_COMPO[107],de_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"de_libelle",TAB_GLOBAL_COMPO[107],de_libelle))
         return -1;
 var em_numero=GetValAt(108);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[108],em_numero,true))
         return -1;
 var de_acompte=GetValAt(109);
 if (!ValiderChampsObligatoire(Table,"de_acompte",TAB_GLOBAL_COMPO[109],de_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"de_acompte",TAB_GLOBAL_COMPO[109],de_acompte))
         return -1;
 var de_lettre=GetValAt(110);
 if (!ValiderChampsObligatoire(Table,"de_lettre",TAB_GLOBAL_COMPO[110],de_lettre,false))
         return -1;
 if (!ValiderChampsType(Table,"de_lettre",TAB_GLOBAL_COMPO[110],de_lettre))
         return -1;
 var de_civilites=GetValAt(111);
 if (!ValiderChampsObligatoire(Table,"de_civilites",TAB_GLOBAL_COMPO[111],de_civilites,false))
         return -1;
 if (!ValiderChampsType(Table,"de_civilites",TAB_GLOBAL_COMPO[111],de_civilites))
         return -1;
 var de_introduction=GetValAt(112);
 if (!ValiderChampsObligatoire(Table,"de_introduction",TAB_GLOBAL_COMPO[112],de_introduction,false))
         return -1;
 if (!ValiderChampsType(Table,"de_introduction",TAB_GLOBAL_COMPO[112],de_introduction))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(71);
var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();
var CleLiasonForte = CompoLieMaitre.getCleVal();
if (CleLiasonForte!=-1)
{
        Asso11=GenererAssociation11(CompoLie,CleMaitre,CleLiasonForte,TabAsso11);
}
else
{
        alert("Vous devez d'abord valider "+CompoLieMaitre.getLabel()+" puis mettre à jour.");
        return -1;
}
 Req+="("+NomCleMaitre+",de_date,de_libelle,em_numero,de_acompte,de_lettre,de_civilites,de_introduction"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(de_date=="" ? "null" : "'"+ValiderChaine(de_date)+"'" )+","+(de_libelle=="" ? "null" : "'"+ValiderChaine(de_libelle)+"'" )+","+em_numero+","+(de_acompte=="true" ? "true" : "false")+","+(de_lettre=="true" ? "true" : "false")+","+(de_civilites=="" ? "null" : "'"+ValiderChaine(de_civilites)+"'" )+","+(de_introduction=="" ? "null" : "'"+ValiderChaine(de_introduction)+"'" )+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
                alert("Attention votre enregistrement ne peux être relié à "+CompoLieMaitre.getLabel()+". Vous devez d'abord ajouter un enregistrement à "+CompoLieMaitre.getLabel()+" puis le mettre à jour");
                return -1;
        }
}
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Devis
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Devis_Liste_des_devis0(Compo_Maitre)
{
 var Table="devis";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(71);
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
  REQUETES UTILSATEUR : Onglet : Devis
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Devis_Liste_des_devis0(Compo_Maitre)
{
 var Table="devis";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var de_date=GetValAt(106);
 if (!ValiderChampsObligatoire(Table,"de_date",TAB_GLOBAL_COMPO[106],de_date,false))
         return -1;
 if (!ValiderChampsType(Table,"de_date",TAB_GLOBAL_COMPO[106],de_date))
         return -1;
 var de_libelle=GetValAt(107);
 if (!ValiderChampsObligatoire(Table,"de_libelle",TAB_GLOBAL_COMPO[107],de_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"de_libelle",TAB_GLOBAL_COMPO[107],de_libelle))
         return -1;
 var em_numero=GetValAt(108);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[108],em_numero,true))
         return -1;
 var de_acompte=GetValAt(109);
 if (!ValiderChampsObligatoire(Table,"de_acompte",TAB_GLOBAL_COMPO[109],de_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"de_acompte",TAB_GLOBAL_COMPO[109],de_acompte))
         return -1;
 var de_lettre=GetValAt(110);
 if (!ValiderChampsObligatoire(Table,"de_lettre",TAB_GLOBAL_COMPO[110],de_lettre,false))
         return -1;
 if (!ValiderChampsType(Table,"de_lettre",TAB_GLOBAL_COMPO[110],de_lettre))
         return -1;
 var de_civilites=GetValAt(111);
 if (!ValiderChampsObligatoire(Table,"de_civilites",TAB_GLOBAL_COMPO[111],de_civilites,false))
         return -1;
 if (!ValiderChampsType(Table,"de_civilites",TAB_GLOBAL_COMPO[111],de_civilites))
         return -1;
 var de_introduction=GetValAt(112);
 if (!ValiderChampsObligatoire(Table,"de_introduction",TAB_GLOBAL_COMPO[112],de_introduction,false))
         return -1;
 if (!ValiderChampsType(Table,"de_introduction",TAB_GLOBAL_COMPO[112],de_introduction))
         return -1;
 var Req="update "+Table+" set ";
 Req+="de_date="+(de_date=="" ? "null" : "'"+ValiderChaine(de_date)+"'" )+",de_libelle="+(de_libelle=="" ? "null" : "'"+ValiderChaine(de_libelle)+"'" )+",em_numero="+em_numero+",de_acompte="+(de_acompte=="true" ? "true" : "false")+",de_lettre="+(de_lettre=="true" ? "true" : "false")+",de_civilites="+(de_civilites=="" ? "null" : "'"+ValiderChaine(de_civilites)+"'" )+",de_introduction="+(de_introduction=="" ? "null" : "'"+ValiderChaine(de_introduction)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Devis
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Devis_Lignes_du_devis_8(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 118;
simple
Nbr Jointure: 1;
    Joint n° 0 = prix,px_numero,px_numero

Id dans le tab: 119;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 120;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="ligne";
 var CleMaitre = TAB_COMPO_PPTES[113].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var px_numero=GetValAt(118);
 if (px_numero=="-1")
    px_numero="null";
 if (!ValiderChampsObligatoire(Table,"px_numero",TAB_GLOBAL_COMPO[118],px_numero,true))
         return -1;
 var l_quantite=GetValAt(119);
 if (!ValiderChampsObligatoire(Table,"l_quantite",TAB_GLOBAL_COMPO[119],l_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"l_quantite",TAB_GLOBAL_COMPO[119],l_quantite))
         return -1;
 var l_notes=GetValAt(120);
 if (!ValiderChampsObligatoire(Table,"l_notes",TAB_GLOBAL_COMPO[120],l_notes,false))
         return -1;
 if (!ValiderChampsType(Table,"l_notes",TAB_GLOBAL_COMPO[120],l_notes))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",de_numero,px_numero,l_quantite,l_notes"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[101].NewCle+","+px_numero+","+(l_quantite=="" ? "null" : "'"+ValiderChaine(l_quantite)+"'" )+","+(l_notes=="" ? "null" : "'"+ValiderChaine(l_notes)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Devis
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Devis_Lignes_du_devis_8(Compo_Maitre)
{
 var Table="ligne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Devis
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Devis_Lignes_du_devis_8(Compo_Maitre)
{
 var Table="ligne";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var px_numero=GetValAt(118);
 if (px_numero=="-1")
    px_numero="null";
 if (!ValiderChampsObligatoire(Table,"px_numero",TAB_GLOBAL_COMPO[118],px_numero,true))
         return -1;
 var l_quantite=GetValAt(119);
 if (!ValiderChampsObligatoire(Table,"l_quantite",TAB_GLOBAL_COMPO[119],l_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"l_quantite",TAB_GLOBAL_COMPO[119],l_quantite))
         return -1;
 var l_notes=GetValAt(120);
 if (!ValiderChampsObligatoire(Table,"l_notes",TAB_GLOBAL_COMPO[120],l_notes,false))
         return -1;
 if (!ValiderChampsType(Table,"l_notes",TAB_GLOBAL_COMPO[120],l_notes))
         return -1;
 var Req="update "+Table+" set ";
 Req+="px_numero="+px_numero+",l_quantite="+(l_quantite=="" ? "null" : "'"+ValiderChaine(l_quantite)+"'" )+",l_notes="+(l_notes=="" ? "null" : "'"+ValiderChaine(l_notes)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Facture_Liste_des_factures0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 12

Id dans le tab: 127;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 128;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 129;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 130;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 131;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 132;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 133;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 134;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 135;
complexe
Nbr Jointure: 1;
    Joint n° 0 = lignefacture,fa_numero,fa_numero

Id dans le tab: 140;
complexe
Nbr Jointure: 1;
    Joint n° 0 = avoir,fa_numero,fa_numero

Id dans le tab: 143;
complexe
Nbr Jointure: 1;
    Joint n° 0 = facturereglement,fa_numero,fa_numero

Id dans le tab: 153;
complexe
Nbr Jointure: 1;
    Joint n° 0 = routage,fa_numero,fa_numero

******************
*/

 var Table="facture";
 var CleMaitre = TAB_COMPO_PPTES[121].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var fa_numfact=GetValAt(127);
 if (!ValiderChampsObligatoire(Table,"fa_numfact",TAB_GLOBAL_COMPO[127],fa_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_numfact",TAB_GLOBAL_COMPO[127],fa_numfact))
         return -1;
 var fa_date=GetValAt(128);
 if (!ValiderChampsObligatoire(Table,"fa_date",TAB_GLOBAL_COMPO[128],fa_date,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_date",TAB_GLOBAL_COMPO[128],fa_date))
         return -1;
 var fa_libelle=GetValAt(129);
 if (!ValiderChampsObligatoire(Table,"fa_libelle",TAB_GLOBAL_COMPO[129],fa_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_libelle",TAB_GLOBAL_COMPO[129],fa_libelle))
         return -1;
 var fa_reduction=GetValAt(130);
 if (!ValiderChampsObligatoire(Table,"fa_reduction",TAB_GLOBAL_COMPO[130],fa_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_reduction",TAB_GLOBAL_COMPO[130],fa_reduction))
         return -1;
 var fa_montantht=GetValAt(131);
 if (!ValiderChampsObligatoire(Table,"fa_montantht",TAB_GLOBAL_COMPO[131],fa_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantht",TAB_GLOBAL_COMPO[131],fa_montantht))
         return -1;
 var fa_montantttc=GetValAt(132);
 if (!ValiderChampsObligatoire(Table,"fa_montantttc",TAB_GLOBAL_COMPO[132],fa_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantttc",TAB_GLOBAL_COMPO[132],fa_montantttc))
         return -1;
 var de_numero=GetValAt(133);
 if (!ValiderChampsObligatoire(Table,"de_numero",TAB_GLOBAL_COMPO[133],de_numero,false))
         return -1;
 if (!ValiderChampsType(Table,"de_numero",TAB_GLOBAL_COMPO[133],de_numero))
         return -1;
 var fa_annotation=GetValAt(134);
 if (!ValiderChampsObligatoire(Table,"fa_annotation",TAB_GLOBAL_COMPO[134],fa_annotation,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_annotation",TAB_GLOBAL_COMPO[134],fa_annotation))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(77);
var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();
var CleLiasonForte = CompoLieMaitre.getCleVal();
if (CleLiasonForte!=-1)
{
        Asso11=GenererAssociation11(CompoLie,CleMaitre,CleLiasonForte,TabAsso11);
}
else
{
        alert("Vous devez d'abord valider "+CompoLieMaitre.getLabel()+" puis mettre à jour.");
        return -1;
}
 Req+="("+NomCleMaitre+",fa_numfact,fa_date,fa_libelle,fa_reduction,fa_montantht,fa_montantttc,de_numero,fa_annotation"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(fa_numfact=="" ? "null" : "'"+ValiderChaine(fa_numfact)+"'" )+","+(fa_date=="" ? "null" : "'"+ValiderChaine(fa_date)+"'" )+","+(fa_libelle=="" ? "null" : "'"+ValiderChaine(fa_libelle)+"'" )+","+(fa_reduction=="" ? "null" : "'"+ValiderChaine(fa_reduction)+"'" )+","+(fa_montantht=="" ? "null" : "'"+ValiderChaine(fa_montantht)+"'" )+","+(fa_montantttc=="" ? "null" : "'"+ValiderChaine(fa_montantttc)+"'" )+","+(de_numero=="" ? "null" : "'"+ValiderChaine(de_numero)+"'" )+","+(fa_annotation=="" ? "null" : "'"+ValiderChaine(fa_annotation)+"'" )+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
                alert("Attention votre enregistrement ne peux être relié à "+CompoLieMaitre.getLabel()+". Vous devez d'abord ajouter un enregistrement à "+CompoLieMaitre.getLabel()+" puis le mettre à jour");
                return -1;
        }
}
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Facture_Liste_des_factures0(Compo_Maitre)
{
 var Table="facture";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(77);
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
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Facture_Liste_des_factures0(Compo_Maitre)
{
 var Table="facture";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var fa_numfact=GetValAt(127);
 if (!ValiderChampsObligatoire(Table,"fa_numfact",TAB_GLOBAL_COMPO[127],fa_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_numfact",TAB_GLOBAL_COMPO[127],fa_numfact))
         return -1;
 var fa_date=GetValAt(128);
 if (!ValiderChampsObligatoire(Table,"fa_date",TAB_GLOBAL_COMPO[128],fa_date,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_date",TAB_GLOBAL_COMPO[128],fa_date))
         return -1;
 var fa_libelle=GetValAt(129);
 if (!ValiderChampsObligatoire(Table,"fa_libelle",TAB_GLOBAL_COMPO[129],fa_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_libelle",TAB_GLOBAL_COMPO[129],fa_libelle))
         return -1;
 var fa_reduction=GetValAt(130);
 if (!ValiderChampsObligatoire(Table,"fa_reduction",TAB_GLOBAL_COMPO[130],fa_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_reduction",TAB_GLOBAL_COMPO[130],fa_reduction))
         return -1;
 var fa_montantht=GetValAt(131);
 if (!ValiderChampsObligatoire(Table,"fa_montantht",TAB_GLOBAL_COMPO[131],fa_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantht",TAB_GLOBAL_COMPO[131],fa_montantht))
         return -1;
 var fa_montantttc=GetValAt(132);
 if (!ValiderChampsObligatoire(Table,"fa_montantttc",TAB_GLOBAL_COMPO[132],fa_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantttc",TAB_GLOBAL_COMPO[132],fa_montantttc))
         return -1;
 var de_numero=GetValAt(133);
 if (!ValiderChampsObligatoire(Table,"de_numero",TAB_GLOBAL_COMPO[133],de_numero,false))
         return -1;
 if (!ValiderChampsType(Table,"de_numero",TAB_GLOBAL_COMPO[133],de_numero))
         return -1;
 var fa_annotation=GetValAt(134);
 if (!ValiderChampsObligatoire(Table,"fa_annotation",TAB_GLOBAL_COMPO[134],fa_annotation,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_annotation",TAB_GLOBAL_COMPO[134],fa_annotation))
         return -1;
 var Req="update "+Table+" set ";
 Req+="fa_numfact="+(fa_numfact=="" ? "null" : "'"+ValiderChaine(fa_numfact)+"'" )+",fa_date="+(fa_date=="" ? "null" : "'"+ValiderChaine(fa_date)+"'" )+",fa_libelle="+(fa_libelle=="" ? "null" : "'"+ValiderChaine(fa_libelle)+"'" )+",fa_reduction="+(fa_reduction=="" ? "null" : "'"+ValiderChaine(fa_reduction)+"'" )+",fa_montantht="+(fa_montantht=="" ? "null" : "'"+ValiderChaine(fa_montantht)+"'" )+",fa_montantttc="+(fa_montantttc=="" ? "null" : "'"+ValiderChaine(fa_montantttc)+"'" )+",de_numero="+(de_numero=="" ? "null" : "'"+ValiderChaine(de_numero)+"'" )+",fa_annotation="+(fa_annotation=="" ? "null" : "'"+ValiderChaine(fa_annotation)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Facture_Règlements_11(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 149;
simple
Nbr Jointure: 1;
    Joint n° 0 = reglement,rg_numero,rg_numero

Id dans le tab: 150;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 151;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 152;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="facturereglement";
 var CleMaitre = TAB_COMPO_PPTES[143].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var rg_numero=GetValAt(149);
 if (rg_numero=="-1")
    rg_numero="null";
 if (!ValiderChampsObligatoire(Table,"rg_numero",TAB_GLOBAL_COMPO[149],rg_numero,true))
         return -1;
 var fr_acompte=GetValAt(150);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[150],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[150],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(151);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[151],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[151],fr_partiel))
         return -1;
 var fr_montant=GetValAt(152);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[152],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[152],fr_montant))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",fa_numero,rg_numero,fr_acompte,fr_partiel,fr_montant"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[121].NewCle+","+rg_numero+","+(fr_acompte=="true" ? "true" : "false")+","+(fr_partiel=="true" ? "true" : "false")+","+(fr_montant=="" ? "null" : "'"+ValiderChaine(fr_montant)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Facture_Règlements_11(Compo_Maitre)
{
 var Table="facturereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Facture_Règlements_11(Compo_Maitre)
{
 var Table="facturereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var rg_numero=GetValAt(149);
 if (rg_numero=="-1")
    rg_numero="null";
 if (!ValiderChampsObligatoire(Table,"rg_numero",TAB_GLOBAL_COMPO[149],rg_numero,true))
         return -1;
 var fr_acompte=GetValAt(150);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[150],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[150],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(151);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[151],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[151],fr_partiel))
         return -1;
 var fr_montant=GetValAt(152);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[152],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[152],fr_montant))
         return -1;
 var Req="update "+Table+" set ";
 Req+="rg_numero="+rg_numero+",fr_acompte="+(fr_acompte=="true" ? "true" : "false")+",fr_partiel="+(fr_partiel=="true" ? "true" : "false")+",fr_montant="+(fr_montant=="" ? "null" : "'"+ValiderChaine(fr_montant)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Facture_Routages_16(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 158;
simple
Nbr Jointure: 1;
    Joint n° 0 = vue_adresse,ad_numero,ad_numero

Id dans le tab: 159;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 160;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 161;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="routage";
 var CleMaitre = TAB_COMPO_PPTES[153].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ad_numero=GetValAt(158);
 if (ad_numero=="-1")
    ad_numero="null";
 if (!ValiderChampsObligatoire(Table,"ad_numero",TAB_GLOBAL_COMPO[158],ad_numero,true))
         return -1;
 var ro_debutservice=GetValAt(159);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[159],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[159],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(160);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[160],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[160],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(161);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[161],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[161],ro_quantite))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",fa_numero,ad_numero,ro_debutservice,ro_finservice,ro_quantite"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[121].NewCle+","+ad_numero+","+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+","+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+","+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Facture_Routages_16(Compo_Maitre)
{
 var Table="routage";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Facture
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Facture_Routages_16(Compo_Maitre)
{
 var Table="routage";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ad_numero=GetValAt(158);
 if (ad_numero=="-1")
    ad_numero="null";
 if (!ValiderChampsObligatoire(Table,"ad_numero",TAB_GLOBAL_COMPO[158],ad_numero,true))
         return -1;
 var ro_debutservice=GetValAt(159);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[159],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[159],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(160);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[160],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[160],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(161);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[161],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[161],ro_quantite))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ad_numero="+ad_numero+",ro_debutservice="+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+",ro_finservice="+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+",ro_quantite="+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Avoir
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Avoir_Liste_des_avoirs0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 166;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 167;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 168;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 169;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 170;
complexe
Nbr Jointure: 1;
    Joint n° 0 = ligneavoir,av_numero,av_numero

******************
*/

 var Table="avoir";
 var CleMaitre = TAB_COMPO_PPTES[162].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var av_numfact=GetValAt(166);
 if (!ValiderChampsObligatoire(Table,"av_numfact",TAB_GLOBAL_COMPO[166],av_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"av_numfact",TAB_GLOBAL_COMPO[166],av_numfact))
         return -1;
 var av_date=GetValAt(167);
 if (!ValiderChampsObligatoire(Table,"av_date",TAB_GLOBAL_COMPO[167],av_date,false))
         return -1;
 if (!ValiderChampsType(Table,"av_date",TAB_GLOBAL_COMPO[167],av_date))
         return -1;
 var av_montantttc=GetValAt(168);
 if (!ValiderChampsObligatoire(Table,"av_montantttc",TAB_GLOBAL_COMPO[168],av_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantttc",TAB_GLOBAL_COMPO[168],av_montantttc))
         return -1;
 var av_montantht=GetValAt(169);
 if (!ValiderChampsObligatoire(Table,"av_montantht",TAB_GLOBAL_COMPO[169],av_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantht",TAB_GLOBAL_COMPO[169],av_montantht))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",av_numfact,av_date,av_montantttc,av_montantht"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(av_numfact=="" ? "null" : "'"+ValiderChaine(av_numfact)+"'" )+","+(av_date=="" ? "null" : "'"+ValiderChaine(av_date)+"'" )+","+(av_montantttc=="" ? "null" : "'"+ValiderChaine(av_montantttc)+"'" )+","+(av_montantht=="" ? "null" : "'"+ValiderChaine(av_montantht)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Avoir
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Avoir_Liste_des_avoirs0(Compo_Maitre)
{
 var Table="avoir";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Avoir
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Avoir_Liste_des_avoirs0(Compo_Maitre)
{
 var Table="avoir";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var av_numfact=GetValAt(166);
 if (!ValiderChampsObligatoire(Table,"av_numfact",TAB_GLOBAL_COMPO[166],av_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"av_numfact",TAB_GLOBAL_COMPO[166],av_numfact))
         return -1;
 var av_date=GetValAt(167);
 if (!ValiderChampsObligatoire(Table,"av_date",TAB_GLOBAL_COMPO[167],av_date,false))
         return -1;
 if (!ValiderChampsType(Table,"av_date",TAB_GLOBAL_COMPO[167],av_date))
         return -1;
 var av_montantttc=GetValAt(168);
 if (!ValiderChampsObligatoire(Table,"av_montantttc",TAB_GLOBAL_COMPO[168],av_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantttc",TAB_GLOBAL_COMPO[168],av_montantttc))
         return -1;
 var av_montantht=GetValAt(169);
 if (!ValiderChampsObligatoire(Table,"av_montantht",TAB_GLOBAL_COMPO[169],av_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantht",TAB_GLOBAL_COMPO[169],av_montantht))
         return -1;
 var Req="update "+Table+" set ";
 Req+="av_numfact="+(av_numfact=="" ? "null" : "'"+ValiderChaine(av_numfact)+"'" )+",av_date="+(av_date=="" ? "null" : "'"+ValiderChaine(av_date)+"'" )+",av_montantttc="+(av_montantttc=="" ? "null" : "'"+ValiderChaine(av_montantttc)+"'" )+",av_montantht="+(av_montantht=="" ? "null" : "'"+ValiderChaine(av_montantht)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Cotisations
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Cotisations_Liste_des_cotisations0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 205;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 206;
simple
Nbr Jointure: 1;
    Joint n° 0 = personne,cs_societe,pe_numero

******************
*/

 var Table="cotisation";
 var CleMaitre = TAB_COMPO_PPTES[200].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cs_detail=GetValAt(205);
 if (!ValiderChampsObligatoire(Table,"cs_detail",TAB_GLOBAL_COMPO[205],cs_detail,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_detail",TAB_GLOBAL_COMPO[205],cs_detail))
         return -1;
 var cs_societe=GetValAt(206);
 if (cs_societe=="-1")
    cs_societe="null";
 if (!ValiderChampsObligatoire(Table,"cs_societe",TAB_GLOBAL_COMPO[206],cs_societe,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",cs_detail,cs_societe"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(cs_detail=="" ? "null" : "'"+ValiderChaine(cs_detail)+"'" )+","+cs_societe+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Cotisations
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Cotisations_Liste_des_cotisations0(Compo_Maitre)
{
 var Table="cotisation";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Cotisations
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Cotisations_Liste_des_cotisations0(Compo_Maitre)
{
 var Table="cotisation";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cs_detail=GetValAt(205);
 if (!ValiderChampsObligatoire(Table,"cs_detail",TAB_GLOBAL_COMPO[205],cs_detail,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_detail",TAB_GLOBAL_COMPO[205],cs_detail))
         return -1;
 var cs_societe=GetValAt(206);
 if (cs_societe=="-1")
    cs_societe="null";
 if (!ValiderChampsObligatoire(Table,"cs_societe",TAB_GLOBAL_COMPO[206],cs_societe,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="cs_detail="+(cs_detail=="" ? "null" : "'"+ValiderChaine(cs_detail)+"'" )+",cs_societe="+cs_societe+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Réglement_Liste_des_réglements0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 9

Id dans le tab: 179;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 180;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 181;
simple
Nbr Jointure: 1;
    Joint n° 0 = modereglement,mr_numero,mr_numero

Id dans le tab: 182;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 183;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 184;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 185;
simple
Nbr Jointure: 1;
    Joint n° 0 = vue_employe_reglement,em_numero,em_numero

Id dans le tab: 186;
complexe
Nbr Jointure: 1;
    Joint n° 0 = facturereglement,rg_numero,rg_numero

Id dans le tab: 195;
complexe
Nbr Jointure: 1;
    Joint n° 0 = repartition,rg_numero,rg_numero

******************
*/

 var Table="reglement";
 var CleMaitre = TAB_COMPO_PPTES[175].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var rg_date=GetValAt(179);
 if (!ValiderChampsObligatoire(Table,"rg_date",TAB_GLOBAL_COMPO[179],rg_date,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_date",TAB_GLOBAL_COMPO[179],rg_date))
         return -1;
 var rg_montant=GetValAt(180);
 if (!ValiderChampsObligatoire(Table,"rg_montant",TAB_GLOBAL_COMPO[180],rg_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_montant",TAB_GLOBAL_COMPO[180],rg_montant))
         return -1;
 var mr_numero=GetValAt(181);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[181],mr_numero,true))
         return -1;
 var rg_libellebanque=GetValAt(182);
 if (!ValiderChampsObligatoire(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[182],rg_libellebanque,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[182],rg_libellebanque))
         return -1;
 var rg_numerocompte=GetValAt(183);
 if (!ValiderChampsObligatoire(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[183],rg_numerocompte,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[183],rg_numerocompte))
         return -1;
 var rg_reference=GetValAt(184);
 if (!ValiderChampsObligatoire(Table,"rg_reference",TAB_GLOBAL_COMPO[184],rg_reference,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_reference",TAB_GLOBAL_COMPO[184],rg_reference))
         return -1;
 var em_numero=GetValAt(185);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[185],em_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(85);
var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();
var CleLiasonForte = CompoLieMaitre.getCleVal();
if (CleLiasonForte!=-1)
{
        Asso11=GenererAssociation11(CompoLie,CleMaitre,CleLiasonForte,TabAsso11);
}
else
{
        alert("Vous devez d'abord valider "+CompoLieMaitre.getLabel()+" puis mettre à jour.");
        return -1;
}
 Req+="("+NomCleMaitre+",rg_date,rg_montant,mr_numero,rg_libellebanque,rg_numerocompte,rg_reference,em_numero"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(rg_date=="" ? "null" : "'"+ValiderChaine(rg_date)+"'" )+","+(rg_montant=="" ? "null" : "'"+ValiderChaine(rg_montant)+"'" )+","+mr_numero+","+(rg_libellebanque=="" ? "null" : "'"+ValiderChaine(rg_libellebanque)+"'" )+","+(rg_numerocompte=="" ? "null" : "'"+ValiderChaine(rg_numerocompte)+"'" )+","+(rg_reference=="" ? "null" : "'"+ValiderChaine(rg_reference)+"'" )+","+em_numero+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
                alert("Attention votre enregistrement ne peux être relié à "+CompoLieMaitre.getLabel()+". Vous devez d'abord ajouter un enregistrement à "+CompoLieMaitre.getLabel()+" puis le mettre à jour");
                return -1;
        }
}
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Réglement_Liste_des_réglements0(Compo_Maitre)
{
 var Table="reglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(85);
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
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Réglement_Liste_des_réglements0(Compo_Maitre)
{
 var Table="reglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var rg_date=GetValAt(179);
 if (!ValiderChampsObligatoire(Table,"rg_date",TAB_GLOBAL_COMPO[179],rg_date,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_date",TAB_GLOBAL_COMPO[179],rg_date))
         return -1;
 var rg_montant=GetValAt(180);
 if (!ValiderChampsObligatoire(Table,"rg_montant",TAB_GLOBAL_COMPO[180],rg_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_montant",TAB_GLOBAL_COMPO[180],rg_montant))
         return -1;
 var mr_numero=GetValAt(181);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[181],mr_numero,true))
         return -1;
 var rg_libellebanque=GetValAt(182);
 if (!ValiderChampsObligatoire(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[182],rg_libellebanque,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[182],rg_libellebanque))
         return -1;
 var rg_numerocompte=GetValAt(183);
 if (!ValiderChampsObligatoire(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[183],rg_numerocompte,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[183],rg_numerocompte))
         return -1;
 var rg_reference=GetValAt(184);
 if (!ValiderChampsObligatoire(Table,"rg_reference",TAB_GLOBAL_COMPO[184],rg_reference,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_reference",TAB_GLOBAL_COMPO[184],rg_reference))
         return -1;
 var em_numero=GetValAt(185);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[185],em_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="rg_date="+(rg_date=="" ? "null" : "'"+ValiderChaine(rg_date)+"'" )+",rg_montant="+(rg_montant=="" ? "null" : "'"+ValiderChaine(rg_montant)+"'" )+",mr_numero="+mr_numero+",rg_libellebanque="+(rg_libellebanque=="" ? "null" : "'"+ValiderChaine(rg_libellebanque)+"'" )+",rg_numerocompte="+(rg_numerocompte=="" ? "null" : "'"+ValiderChaine(rg_numerocompte)+"'" )+",rg_reference="+(rg_reference=="" ? "null" : "'"+ValiderChaine(rg_reference)+"'" )+",em_numero="+em_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Réglement_Factures_concernées_8(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 191;
simple
Nbr Jointure: 1;
    Joint n° 0 = facture,fa_numero,fa_numero

Id dans le tab: 192;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 193;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 194;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="facturereglement";
 var CleMaitre = TAB_COMPO_PPTES[186].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var fa_numero=GetValAt(191);
 if (fa_numero=="-1")
    fa_numero="null";
 if (!ValiderChampsObligatoire(Table,"fa_numero",TAB_GLOBAL_COMPO[191],fa_numero,true))
         return -1;
 var fr_acompte=GetValAt(192);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[192],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[192],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(193);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[193],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[193],fr_partiel))
         return -1;
 var fr_montant=GetValAt(194);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[194],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[194],fr_montant))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",rg_numero,fa_numero,fr_acompte,fr_partiel,fr_montant"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[175].NewCle+","+fa_numero+","+(fr_acompte=="true" ? "true" : "false")+","+(fr_partiel=="true" ? "true" : "false")+","+(fr_montant=="" ? "null" : "'"+ValiderChaine(fr_montant)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Réglement_Factures_concernées_8(Compo_Maitre)
{
 var Table="facturereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Réglement_Factures_concernées_8(Compo_Maitre)
{
 var Table="facturereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var fa_numero=GetValAt(191);
 if (fa_numero=="-1")
    fa_numero="null";
 if (!ValiderChampsObligatoire(Table,"fa_numero",TAB_GLOBAL_COMPO[191],fa_numero,true))
         return -1;
 var fr_acompte=GetValAt(192);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[192],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[192],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(193);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[193],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[193],fr_partiel))
         return -1;
 var fr_montant=GetValAt(194);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[194],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[194],fr_montant))
         return -1;
 var Req="update "+Table+" set ";
 Req+="fa_numero="+fa_numero+",fr_acompte="+(fr_acompte=="true" ? "true" : "false")+",fr_partiel="+(fr_partiel=="true" ? "true" : "false")+",fr_montant="+(fr_montant=="" ? "null" : "'"+ValiderChaine(fr_montant)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Réglement_Dont_reversements____13(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 198;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 199;
simple
Nbr Jointure: 1;
    Joint n° 0 = moderepartition,mp_numero,mp_numero

******************
*/

 var Table="repartition";
 var CleMaitre = TAB_COMPO_PPTES[195].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var rp_montant=GetValAt(198);
 if (!ValiderChampsObligatoire(Table,"rp_montant",TAB_GLOBAL_COMPO[198],rp_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rp_montant",TAB_GLOBAL_COMPO[198],rp_montant))
         return -1;
 var mp_numero=GetValAt(199);
 if (mp_numero=="-1")
    mp_numero="null";
 if (!ValiderChampsObligatoire(Table,"mp_numero",TAB_GLOBAL_COMPO[199],mp_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",rg_numero,rp_montant,mp_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[175].NewCle+","+(rp_montant=="" ? "null" : "'"+ValiderChaine(rp_montant)+"'" )+","+mp_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Réglement_Dont_reversements____13(Compo_Maitre)
{
 var Table="repartition";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Réglement
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Réglement_Dont_reversements____13(Compo_Maitre)
{
 var Table="repartition";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var rp_montant=GetValAt(198);
 if (!ValiderChampsObligatoire(Table,"rp_montant",TAB_GLOBAL_COMPO[198],rp_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rp_montant",TAB_GLOBAL_COMPO[198],rp_montant))
         return -1;
 var mp_numero=GetValAt(199);
 if (mp_numero=="-1")
    mp_numero="null";
 if (!ValiderChampsObligatoire(Table,"mp_numero",TAB_GLOBAL_COMPO[199],mp_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="rp_montant="+(rp_montant=="" ? "null" : "'"+ValiderChaine(rp_montant)+"'" )+",mp_numero="+mp_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Bordereaux de réglements
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 4

Id dans le tab: 213;
simple
Nbr Jointure: 1;
    Joint n° 0 = vue_employe_reglement,em_numero,em_numero

Id dans le tab: 214;
simple
Nbr Jointure: 1;
    Joint n° 0 = modereglement,mr_numero,mr_numero

Id dans le tab: 215;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 216;
complexe
Nbr Jointure: 1;
    Joint n° 0 = reglement,lr_numero,lr_numero

******************
*/

 var Table="listereglement";
 var CleMaitre = TAB_COMPO_PPTES[207].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var em_numero=GetValAt(213);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[213],em_numero,true))
         return -1;
 var mr_numero=GetValAt(214);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[214],mr_numero,true))
         return -1;
 var lr_commentaire=GetValAt(215);
 if (!ValiderChampsObligatoire(Table,"lr_commentaire",TAB_GLOBAL_COMPO[215],lr_commentaire,false))
         return -1;
 if (!ValiderChampsType(Table,"lr_commentaire",TAB_GLOBAL_COMPO[215],lr_commentaire))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",em_numero,mr_numero,lr_commentaire"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+em_numero+","+mr_numero+","+(lr_commentaire=="" ? "null" : "'"+ValiderChaine(lr_commentaire)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Bordereaux de réglements
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0(Compo_Maitre)
{
 var Table="listereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Bordereaux de réglements
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Bordereaux_de_réglements_Liste_des_bordereaux_de_remise_en_banque0(Compo_Maitre)
{
 var Table="listereglement";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var em_numero=GetValAt(213);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[213],em_numero,true))
         return -1;
 var mr_numero=GetValAt(214);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[214],mr_numero,true))
         return -1;
 var lr_commentaire=GetValAt(215);
 if (!ValiderChampsObligatoire(Table,"lr_commentaire",TAB_GLOBAL_COMPO[215],lr_commentaire,false))
         return -1;
 if (!ValiderChampsType(Table,"lr_commentaire",TAB_GLOBAL_COMPO[215],lr_commentaire))
         return -1;
 var Req="update "+Table+" set ";
 Req+="em_numero="+em_numero+",mr_numero="+mr_numero+",lr_commentaire="+(lr_commentaire=="" ? "null" : "'"+ValiderChaine(lr_commentaire)+"'" )+"";
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
