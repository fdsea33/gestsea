/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Liste_des_personnes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 18

Id dans le tab: 393;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 394;
simple
Nbr Jointure: 1;
    Joint n° 0 = naturepersonne,np_numero,np_numero

Id dans le tab: 395;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 396;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 397;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 398;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 399;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 400;
complexe
Nbr Jointure: 1;
    Joint n° 0 = vue_cotisation,pe_numero,pe_numero

Id dans le tab: 407;
complexe
Nbr Jointure: 1;
    Joint n° 0 = observation,pe_numero,pe_numero

Id dans le tab: 412;
complexe
Nbr Jointure: 1;
    Joint n° 0 = adresse,pe_numero,pe_numero

Id dans le tab: 424;
complexe
Nbr Jointure: 1;
    Joint n° 0 = contact,pe_numero,pe_numero

Id dans le tab: 429;
complexe
Nbr Jointure: 1;
    Joint n° 0 = appel,pe_numero,pe_numero

Id dans le tab: 440;
complexe
Nbr Jointure: 1;
    Joint n° 0 = estresponsable,pe_numero,pe_numero

Id dans le tab: 452;
complexe
Nbr Jointure: 1;
    Joint n° 0 = attribut,pe_numero,pe_numero

Id dans le tab: 458;
complexe
Nbr Jointure: 1;
    Joint n° 0 = devis,pe_numero,pe_numero

Id dans le tab: 464;
complexe
Nbr Jointure: 1;
    Joint n° 0 = facture,pe_numero,pe_numero

Id dans le tab: 472;
complexe
Nbr Jointure: 1;
    Joint n° 0 = reglement,pe_numero,pe_numero

Id dans le tab: 478;
complexe
Nbr Jointure: 1;
    Joint n° 0 = routage,pe_numero,pe_numero

******************
*/

 var Table="personne";
 var CleMaitre = TAB_COMPO_PPTES[390].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pe_id=GetValAt(393);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[393],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[393],pe_id))
         return -1;
 var np_numero=GetValAt(394);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[394],np_numero,true))
         return -1;
 var pe_nom=GetValAt(395);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[395],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[395],pe_nom))
         return -1;
 var pe_prenom=GetValAt(396);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[396],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[396],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(397);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[397],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[397],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(398);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[398],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[398],pe_naissance))
         return -1;
 var pe_actif=GetValAt(399);
 if (!ValiderChampsObligatoire(Table,"pe_actif",TAB_GLOBAL_COMPO[399],pe_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_actif",TAB_GLOBAL_COMPO[399],pe_actif))
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
 var pe_id=GetValAt(393);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[393],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[393],pe_id))
         return -1;
 var np_numero=GetValAt(394);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[394],np_numero,true))
         return -1;
 var pe_nom=GetValAt(395);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[395],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[395],pe_nom))
         return -1;
 var pe_prenom=GetValAt(396);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[396],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[396],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(397);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[397],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[397],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(398);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[398],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[398],pe_naissance))
         return -1;
 var pe_actif=GetValAt(399);
 if (!ValiderChampsObligatoire(Table,"pe_actif",TAB_GLOBAL_COMPO[399],pe_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_actif",TAB_GLOBAL_COMPO[399],pe_actif))
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

Id dans le tab: 410;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 411;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="observation";
 var CleMaitre = TAB_COMPO_PPTES[407].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ob_niveau=GetValAt(410);
 if (!ValiderChampsObligatoire(Table,"ob_niveau",TAB_GLOBAL_COMPO[410],ob_niveau,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_niveau",TAB_GLOBAL_COMPO[410],ob_niveau))
         return -1;
 var ob_observation=GetValAt(411);
 if (!ValiderChampsObligatoire(Table,"ob_observation",TAB_GLOBAL_COMPO[411],ob_observation,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_observation",TAB_GLOBAL_COMPO[411],ob_observation))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ob_niveau,ob_observation"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[390].NewCle+","+(ob_niveau=="" ? "null" : "'"+ValiderChaine(ob_niveau)+"'" )+","+(ob_observation=="" ? "null" : "'"+ValiderChaine(ob_observation)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var ob_niveau=GetValAt(410);
 if (!ValiderChampsObligatoire(Table,"ob_niveau",TAB_GLOBAL_COMPO[410],ob_niveau,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_niveau",TAB_GLOBAL_COMPO[410],ob_niveau))
         return -1;
 var ob_observation=GetValAt(411);
 if (!ValiderChampsObligatoire(Table,"ob_observation",TAB_GLOBAL_COMPO[411],ob_observation,false))
         return -1;
 if (!ValiderChampsType(Table,"ob_observation",TAB_GLOBAL_COMPO[411],ob_observation))
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

Id dans le tab: 417;
simple
Nbr Jointure: 1;
    Joint n° 0 = typeadresse,ak_numero,ak_numero

Id dans le tab: 418;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 419;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 420;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 421;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 422;
simple
Nbr Jointure: 1;
    Joint n° 0 = codepostal,cp_numero,cp_numero

Id dans le tab: 423;
simple
Nbr Jointure: 1;
    Joint n° 0 = ville,vi_numero,vi_numero

******************
*/

 var Table="adresse";
 var CleMaitre = TAB_COMPO_PPTES[412].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ak_numero=GetValAt(417);
 if (ak_numero=="-1")
    ak_numero="null";
 if (!ValiderChampsObligatoire(Table,"ak_numero",TAB_GLOBAL_COMPO[417],ak_numero,true))
         return -1;
 var ad_ligne2=GetValAt(418);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[418],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[418],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(419);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[419],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[419],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(420);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[420],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[420],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(421);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[421],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[421],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(422);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[422],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(423);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[423],vi_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ak_numero,ad_ligne2,ad_ligne3,ad_ligne4,ad_ligne5,cp_numero,vi_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[390].NewCle+","+ak_numero+","+(ad_ligne2=="" ? "null" : "'"+ValiderChaine(ad_ligne2)+"'" )+","+(ad_ligne3=="" ? "null" : "'"+ValiderChaine(ad_ligne3)+"'" )+","+(ad_ligne4=="" ? "null" : "'"+ValiderChaine(ad_ligne4)+"'" )+","+(ad_ligne5=="" ? "null" : "'"+ValiderChaine(ad_ligne5)+"'" )+","+cp_numero+","+vi_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var ak_numero=GetValAt(417);
 if (ak_numero=="-1")
    ak_numero="null";
 if (!ValiderChampsObligatoire(Table,"ak_numero",TAB_GLOBAL_COMPO[417],ak_numero,true))
         return -1;
 var ad_ligne2=GetValAt(418);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[418],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[418],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(419);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[419],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[419],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(420);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[420],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[420],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(421);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[421],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[421],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(422);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[422],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(423);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[423],vi_numero,true))
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

Id dans le tab: 427;
simple
Nbr Jointure: 1;
    Joint n° 0 = contacttype,ck_numero,ck_numero

Id dans le tab: 428;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="contact";
 var CleMaitre = TAB_COMPO_PPTES[424].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ck_numero=GetValAt(427);
 if (ck_numero=="-1")
    ck_numero="null";
 if (!ValiderChampsObligatoire(Table,"ck_numero",TAB_GLOBAL_COMPO[427],ck_numero,true))
         return -1;
 var cn_coordonnee=GetValAt(428);
 if (!ValiderChampsObligatoire(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[428],cn_coordonnee,false))
         return -1;
 if (!ValiderChampsType(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[428],cn_coordonnee))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ck_numero,cn_coordonnee"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[390].NewCle+","+ck_numero+","+(cn_coordonnee=="" ? "null" : "'"+ValiderChaine(cn_coordonnee)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var ck_numero=GetValAt(427);
 if (ck_numero=="-1")
    ck_numero="null";
 if (!ValiderChampsObligatoire(Table,"ck_numero",TAB_GLOBAL_COMPO[427],ck_numero,true))
         return -1;
 var cn_coordonnee=GetValAt(428);
 if (!ValiderChampsObligatoire(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[428],cn_coordonnee,false))
         return -1;
 if (!ValiderChampsType(Table,"cn_coordonnee",TAB_GLOBAL_COMPO[428],cn_coordonnee))
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

Id dans le tab: 435;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 436;
simple
Nbr Jointure: 1;
    Joint n° 0 = typetache,th_numero,th_numero

Id dans le tab: 437;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 438;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 439;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="appel";
 var CleMaitre = TAB_COMPO_PPTES[429].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ap_date=GetValAt(435);
 if (!ValiderChampsObligatoire(Table,"ap_date",TAB_GLOBAL_COMPO[435],ap_date,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_date",TAB_GLOBAL_COMPO[435],ap_date))
         return -1;
 var th_numero=GetValAt(436);
 if (th_numero=="-1")
    th_numero="null";
 if (!ValiderChampsObligatoire(Table,"th_numero",TAB_GLOBAL_COMPO[436],th_numero,true))
         return -1;
 var ap_libelle=GetValAt(437);
 if (!ValiderChampsObligatoire(Table,"ap_libelle",TAB_GLOBAL_COMPO[437],ap_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_libelle",TAB_GLOBAL_COMPO[437],ap_libelle))
         return -1;
 var ap_duree=GetValAt(438);
 if (!ValiderChampsObligatoire(Table,"ap_duree",TAB_GLOBAL_COMPO[438],ap_duree,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_duree",TAB_GLOBAL_COMPO[438],ap_duree))
         return -1;
 var ap_description=GetValAt(439);
 if (!ValiderChampsObligatoire(Table,"ap_description",TAB_GLOBAL_COMPO[439],ap_description,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_description",TAB_GLOBAL_COMPO[439],ap_description))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ap_date,th_numero,ap_libelle,ap_duree,ap_description"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[390].NewCle+","+(ap_date=="" ? "null" : "'"+ValiderChaine(ap_date)+"'" )+","+th_numero+","+(ap_libelle=="" ? "null" : "'"+ValiderChaine(ap_libelle)+"'" )+","+(ap_duree=="" ? "null" : "'"+ValiderChaine(ap_duree)+"'" )+","+(ap_description=="" ? "null" : "'"+ValiderChaine(ap_description)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var ap_date=GetValAt(435);
 if (!ValiderChampsObligatoire(Table,"ap_date",TAB_GLOBAL_COMPO[435],ap_date,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_date",TAB_GLOBAL_COMPO[435],ap_date))
         return -1;
 var th_numero=GetValAt(436);
 if (th_numero=="-1")
    th_numero="null";
 if (!ValiderChampsObligatoire(Table,"th_numero",TAB_GLOBAL_COMPO[436],th_numero,true))
         return -1;
 var ap_libelle=GetValAt(437);
 if (!ValiderChampsObligatoire(Table,"ap_libelle",TAB_GLOBAL_COMPO[437],ap_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_libelle",TAB_GLOBAL_COMPO[437],ap_libelle))
         return -1;
 var ap_duree=GetValAt(438);
 if (!ValiderChampsObligatoire(Table,"ap_duree",TAB_GLOBAL_COMPO[438],ap_duree,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_duree",TAB_GLOBAL_COMPO[438],ap_duree))
         return -1;
 var ap_description=GetValAt(439);
 if (!ValiderChampsObligatoire(Table,"ap_description",TAB_GLOBAL_COMPO[439],ap_description,false))
         return -1;
 if (!ValiderChampsType(Table,"ap_description",TAB_GLOBAL_COMPO[439],ap_description))
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

Id dans le tab: 447;
simple
Nbr Jointure: 1;
    Joint n° 0 = responsabilite,re_numero,re_numero

Id dans le tab: 448;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 449;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 450;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 451;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="estresponsable";
 var CleMaitre = TAB_COMPO_PPTES[440].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var re_numero=GetValAt(447);
 if (re_numero=="-1")
    re_numero="null";
 if (!ValiderChampsObligatoire(Table,"re_numero",TAB_GLOBAL_COMPO[447],re_numero,true))
         return -1;
 var peac_titre=GetValAt(448);
 if (!ValiderChampsObligatoire(Table,"peac_titre",TAB_GLOBAL_COMPO[448],peac_titre,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_titre",TAB_GLOBAL_COMPO[448],peac_titre))
         return -1;
 var peac_periodedebut=GetValAt(449);
 if (!ValiderChampsObligatoire(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[449],peac_periodedebut,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[449],peac_periodedebut))
         return -1;
 var peac_periodefin=GetValAt(450);
 if (!ValiderChampsObligatoire(Table,"peac_periodefin",TAB_GLOBAL_COMPO[450],peac_periodefin,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodefin",TAB_GLOBAL_COMPO[450],peac_periodefin))
         return -1;
 var peac_fini=GetValAt(451);
 if (!ValiderChampsObligatoire(Table,"peac_fini",TAB_GLOBAL_COMPO[451],peac_fini,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_fini",TAB_GLOBAL_COMPO[451],peac_fini))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,re_numero,peac_titre,peac_periodedebut,peac_periodefin,peac_fini"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[390].NewCle+","+re_numero+","+(peac_titre=="" ? "null" : "'"+ValiderChaine(peac_titre)+"'" )+","+(peac_periodedebut=="" ? "null" : "'"+ValiderChaine(peac_periodedebut)+"'" )+","+(peac_periodefin=="" ? "null" : "'"+ValiderChaine(peac_periodefin)+"'" )+","+(peac_fini=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var re_numero=GetValAt(447);
 if (re_numero=="-1")
    re_numero="null";
 if (!ValiderChampsObligatoire(Table,"re_numero",TAB_GLOBAL_COMPO[447],re_numero,true))
         return -1;
 var peac_titre=GetValAt(448);
 if (!ValiderChampsObligatoire(Table,"peac_titre",TAB_GLOBAL_COMPO[448],peac_titre,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_titre",TAB_GLOBAL_COMPO[448],peac_titre))
         return -1;
 var peac_periodedebut=GetValAt(449);
 if (!ValiderChampsObligatoire(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[449],peac_periodedebut,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodedebut",TAB_GLOBAL_COMPO[449],peac_periodedebut))
         return -1;
 var peac_periodefin=GetValAt(450);
 if (!ValiderChampsObligatoire(Table,"peac_periodefin",TAB_GLOBAL_COMPO[450],peac_periodefin,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_periodefin",TAB_GLOBAL_COMPO[450],peac_periodefin))
         return -1;
 var peac_fini=GetValAt(451);
 if (!ValiderChampsObligatoire(Table,"peac_fini",TAB_GLOBAL_COMPO[451],peac_fini,false))
         return -1;
 if (!ValiderChampsType(Table,"peac_fini",TAB_GLOBAL_COMPO[451],peac_fini))
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

Id dans le tab: 455;
simple
Nbr Jointure: 1;
    Joint n° 0 = typeattribut,ta_numero,ta_numero

Id dans le tab: 456;
simple
Nbr Jointure: 1;
    Joint n° 0 = categorie,cr_numero,cr_numero

Id dans le tab: 457;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="attribut";
 var CleMaitre = TAB_COMPO_PPTES[452].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ta_numero=GetValAt(455);
 if (ta_numero=="-1")
    ta_numero="null";
 if (!ValiderChampsObligatoire(Table,"ta_numero",TAB_GLOBAL_COMPO[455],ta_numero,true))
         return -1;
 var cr_numero=GetValAt(456);
 if (cr_numero=="-1")
    cr_numero="null";
 if (!ValiderChampsObligatoire(Table,"cr_numero",TAB_GLOBAL_COMPO[456],cr_numero,true))
         return -1;
 var at_valeur=GetValAt(457);
 if (!ValiderChampsObligatoire(Table,"at_valeur",TAB_GLOBAL_COMPO[457],at_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"at_valeur",TAB_GLOBAL_COMPO[457],at_valeur))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ta_numero,cr_numero,at_valeur"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[390].NewCle+","+ta_numero+","+cr_numero+","+(at_valeur=="" ? "null" : "'"+ValiderChaine(at_valeur)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var ta_numero=GetValAt(455);
 if (ta_numero=="-1")
    ta_numero="null";
 if (!ValiderChampsObligatoire(Table,"ta_numero",TAB_GLOBAL_COMPO[455],ta_numero,true))
         return -1;
 var cr_numero=GetValAt(456);
 if (cr_numero=="-1")
    cr_numero="null";
 if (!ValiderChampsObligatoire(Table,"cr_numero",TAB_GLOBAL_COMPO[456],cr_numero,true))
         return -1;
 var at_valeur=GetValAt(457);
 if (!ValiderChampsObligatoire(Table,"at_valeur",TAB_GLOBAL_COMPO[457],at_valeur,false))
         return -1;
 if (!ValiderChampsType(Table,"at_valeur",TAB_GLOBAL_COMPO[457],at_valeur))
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

Id dans le tab: 484;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 485;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 486;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 487;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="routage";
 var CleMaitre = TAB_COMPO_PPTES[478].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ro_debutservice=GetValAt(484);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[484],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[484],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(485);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[485],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[485],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(486);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[486],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[486],ro_quantite))
         return -1;
 var ro_suspendu=GetValAt(487);
 if (!ValiderChampsObligatoire(Table,"ro_suspendu",TAB_GLOBAL_COMPO[487],ro_suspendu,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_suspendu",TAB_GLOBAL_COMPO[487],ro_suspendu))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ro_debutservice,ro_finservice,ro_quantite,ro_suspendu"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[390].NewCle+","+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+","+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+","+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+","+(ro_suspendu=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var ro_debutservice=GetValAt(484);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[484],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[484],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(485);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[485],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[485],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(486);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[486],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[486],ro_quantite))
         return -1;
 var ro_suspendu=GetValAt(487);
 if (!ValiderChampsObligatoire(Table,"ro_suspendu",TAB_GLOBAL_COMPO[487],ro_suspendu,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_suspendu",TAB_GLOBAL_COMPO[487],ro_suspendu))
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

Id dans le tab: 493;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 494;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 495;
simple
Nbr Jointure: 1;
    Joint n° 0 = employe,em_numero,em_numero

Id dans le tab: 496;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 497;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 498;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 499;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 500;
complexe
Nbr Jointure: 1;
    Joint n° 0 = ligne,de_numero,de_numero

******************
*/

 var Table="devis";
 var CleMaitre = TAB_COMPO_PPTES[488].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var de_date=GetValAt(493);
 if (!ValiderChampsObligatoire(Table,"de_date",TAB_GLOBAL_COMPO[493],de_date,false))
         return -1;
 if (!ValiderChampsType(Table,"de_date",TAB_GLOBAL_COMPO[493],de_date))
         return -1;
 var de_libelle=GetValAt(494);
 if (!ValiderChampsObligatoire(Table,"de_libelle",TAB_GLOBAL_COMPO[494],de_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"de_libelle",TAB_GLOBAL_COMPO[494],de_libelle))
         return -1;
 var em_numero=GetValAt(495);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[495],em_numero,true))
         return -1;
 var de_acompte=GetValAt(496);
 if (!ValiderChampsObligatoire(Table,"de_acompte",TAB_GLOBAL_COMPO[496],de_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"de_acompte",TAB_GLOBAL_COMPO[496],de_acompte))
         return -1;
 var de_lettre=GetValAt(497);
 if (!ValiderChampsObligatoire(Table,"de_lettre",TAB_GLOBAL_COMPO[497],de_lettre,false))
         return -1;
 if (!ValiderChampsType(Table,"de_lettre",TAB_GLOBAL_COMPO[497],de_lettre))
         return -1;
 var de_civilites=GetValAt(498);
 if (!ValiderChampsObligatoire(Table,"de_civilites",TAB_GLOBAL_COMPO[498],de_civilites,false))
         return -1;
 if (!ValiderChampsType(Table,"de_civilites",TAB_GLOBAL_COMPO[498],de_civilites))
         return -1;
 var de_introduction=GetValAt(499);
 if (!ValiderChampsObligatoire(Table,"de_introduction",TAB_GLOBAL_COMPO[499],de_introduction,false))
         return -1;
 if (!ValiderChampsType(Table,"de_introduction",TAB_GLOBAL_COMPO[499],de_introduction))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(458);
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

var CompoLie = GetSQLCompoAt(458);
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
 var de_date=GetValAt(493);
 if (!ValiderChampsObligatoire(Table,"de_date",TAB_GLOBAL_COMPO[493],de_date,false))
         return -1;
 if (!ValiderChampsType(Table,"de_date",TAB_GLOBAL_COMPO[493],de_date))
         return -1;
 var de_libelle=GetValAt(494);
 if (!ValiderChampsObligatoire(Table,"de_libelle",TAB_GLOBAL_COMPO[494],de_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"de_libelle",TAB_GLOBAL_COMPO[494],de_libelle))
         return -1;
 var em_numero=GetValAt(495);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[495],em_numero,true))
         return -1;
 var de_acompte=GetValAt(496);
 if (!ValiderChampsObligatoire(Table,"de_acompte",TAB_GLOBAL_COMPO[496],de_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"de_acompte",TAB_GLOBAL_COMPO[496],de_acompte))
         return -1;
 var de_lettre=GetValAt(497);
 if (!ValiderChampsObligatoire(Table,"de_lettre",TAB_GLOBAL_COMPO[497],de_lettre,false))
         return -1;
 if (!ValiderChampsType(Table,"de_lettre",TAB_GLOBAL_COMPO[497],de_lettre))
         return -1;
 var de_civilites=GetValAt(498);
 if (!ValiderChampsObligatoire(Table,"de_civilites",TAB_GLOBAL_COMPO[498],de_civilites,false))
         return -1;
 if (!ValiderChampsType(Table,"de_civilites",TAB_GLOBAL_COMPO[498],de_civilites))
         return -1;
 var de_introduction=GetValAt(499);
 if (!ValiderChampsObligatoire(Table,"de_introduction",TAB_GLOBAL_COMPO[499],de_introduction,false))
         return -1;
 if (!ValiderChampsType(Table,"de_introduction",TAB_GLOBAL_COMPO[499],de_introduction))
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

Id dans le tab: 505;
simple
Nbr Jointure: 1;
    Joint n° 0 = prix,px_numero,px_numero

Id dans le tab: 506;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 507;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="ligne";
 var CleMaitre = TAB_COMPO_PPTES[500].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var px_numero=GetValAt(505);
 if (px_numero=="-1")
    px_numero="null";
 if (!ValiderChampsObligatoire(Table,"px_numero",TAB_GLOBAL_COMPO[505],px_numero,true))
         return -1;
 var l_quantite=GetValAt(506);
 if (!ValiderChampsObligatoire(Table,"l_quantite",TAB_GLOBAL_COMPO[506],l_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"l_quantite",TAB_GLOBAL_COMPO[506],l_quantite))
         return -1;
 var l_notes=GetValAt(507);
 if (!ValiderChampsObligatoire(Table,"l_notes",TAB_GLOBAL_COMPO[507],l_notes,false))
         return -1;
 if (!ValiderChampsType(Table,"l_notes",TAB_GLOBAL_COMPO[507],l_notes))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",de_numero,px_numero,l_quantite,l_notes"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[488].NewCle+","+px_numero+","+(l_quantite=="" ? "null" : "'"+ValiderChaine(l_quantite)+"'" )+","+(l_notes=="" ? "null" : "'"+ValiderChaine(l_notes)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var px_numero=GetValAt(505);
 if (px_numero=="-1")
    px_numero="null";
 if (!ValiderChampsObligatoire(Table,"px_numero",TAB_GLOBAL_COMPO[505],px_numero,true))
         return -1;
 var l_quantite=GetValAt(506);
 if (!ValiderChampsObligatoire(Table,"l_quantite",TAB_GLOBAL_COMPO[506],l_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"l_quantite",TAB_GLOBAL_COMPO[506],l_quantite))
         return -1;
 var l_notes=GetValAt(507);
 if (!ValiderChampsObligatoire(Table,"l_notes",TAB_GLOBAL_COMPO[507],l_notes,false))
         return -1;
 if (!ValiderChampsType(Table,"l_notes",TAB_GLOBAL_COMPO[507],l_notes))
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

Id dans le tab: 514;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 515;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 516;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 517;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 518;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 519;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 520;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 521;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 522;
complexe
Nbr Jointure: 1;
    Joint n° 0 = lignefacture,fa_numero,fa_numero

Id dans le tab: 527;
complexe
Nbr Jointure: 1;
    Joint n° 0 = avoir,fa_numero,fa_numero

Id dans le tab: 530;
complexe
Nbr Jointure: 1;
    Joint n° 0 = facturereglement,fa_numero,fa_numero

Id dans le tab: 540;
complexe
Nbr Jointure: 1;
    Joint n° 0 = routage,fa_numero,fa_numero

******************
*/

 var Table="facture";
 var CleMaitre = TAB_COMPO_PPTES[508].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var fa_numfact=GetValAt(514);
 if (!ValiderChampsObligatoire(Table,"fa_numfact",TAB_GLOBAL_COMPO[514],fa_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_numfact",TAB_GLOBAL_COMPO[514],fa_numfact))
         return -1;
 var fa_date=GetValAt(515);
 if (!ValiderChampsObligatoire(Table,"fa_date",TAB_GLOBAL_COMPO[515],fa_date,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_date",TAB_GLOBAL_COMPO[515],fa_date))
         return -1;
 var fa_libelle=GetValAt(516);
 if (!ValiderChampsObligatoire(Table,"fa_libelle",TAB_GLOBAL_COMPO[516],fa_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_libelle",TAB_GLOBAL_COMPO[516],fa_libelle))
         return -1;
 var fa_reduction=GetValAt(517);
 if (!ValiderChampsObligatoire(Table,"fa_reduction",TAB_GLOBAL_COMPO[517],fa_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_reduction",TAB_GLOBAL_COMPO[517],fa_reduction))
         return -1;
 var fa_montantht=GetValAt(518);
 if (!ValiderChampsObligatoire(Table,"fa_montantht",TAB_GLOBAL_COMPO[518],fa_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantht",TAB_GLOBAL_COMPO[518],fa_montantht))
         return -1;
 var fa_montantttc=GetValAt(519);
 if (!ValiderChampsObligatoire(Table,"fa_montantttc",TAB_GLOBAL_COMPO[519],fa_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantttc",TAB_GLOBAL_COMPO[519],fa_montantttc))
         return -1;
 var de_numero=GetValAt(520);
 if (!ValiderChampsObligatoire(Table,"de_numero",TAB_GLOBAL_COMPO[520],de_numero,false))
         return -1;
 if (!ValiderChampsType(Table,"de_numero",TAB_GLOBAL_COMPO[520],de_numero))
         return -1;
 var fa_annotation=GetValAt(521);
 if (!ValiderChampsObligatoire(Table,"fa_annotation",TAB_GLOBAL_COMPO[521],fa_annotation,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_annotation",TAB_GLOBAL_COMPO[521],fa_annotation))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(464);
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

var CompoLie = GetSQLCompoAt(464);
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
 var fa_numfact=GetValAt(514);
 if (!ValiderChampsObligatoire(Table,"fa_numfact",TAB_GLOBAL_COMPO[514],fa_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_numfact",TAB_GLOBAL_COMPO[514],fa_numfact))
         return -1;
 var fa_date=GetValAt(515);
 if (!ValiderChampsObligatoire(Table,"fa_date",TAB_GLOBAL_COMPO[515],fa_date,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_date",TAB_GLOBAL_COMPO[515],fa_date))
         return -1;
 var fa_libelle=GetValAt(516);
 if (!ValiderChampsObligatoire(Table,"fa_libelle",TAB_GLOBAL_COMPO[516],fa_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_libelle",TAB_GLOBAL_COMPO[516],fa_libelle))
         return -1;
 var fa_reduction=GetValAt(517);
 if (!ValiderChampsObligatoire(Table,"fa_reduction",TAB_GLOBAL_COMPO[517],fa_reduction,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_reduction",TAB_GLOBAL_COMPO[517],fa_reduction))
         return -1;
 var fa_montantht=GetValAt(518);
 if (!ValiderChampsObligatoire(Table,"fa_montantht",TAB_GLOBAL_COMPO[518],fa_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantht",TAB_GLOBAL_COMPO[518],fa_montantht))
         return -1;
 var fa_montantttc=GetValAt(519);
 if (!ValiderChampsObligatoire(Table,"fa_montantttc",TAB_GLOBAL_COMPO[519],fa_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_montantttc",TAB_GLOBAL_COMPO[519],fa_montantttc))
         return -1;
 var de_numero=GetValAt(520);
 if (!ValiderChampsObligatoire(Table,"de_numero",TAB_GLOBAL_COMPO[520],de_numero,false))
         return -1;
 if (!ValiderChampsType(Table,"de_numero",TAB_GLOBAL_COMPO[520],de_numero))
         return -1;
 var fa_annotation=GetValAt(521);
 if (!ValiderChampsObligatoire(Table,"fa_annotation",TAB_GLOBAL_COMPO[521],fa_annotation,false))
         return -1;
 if (!ValiderChampsType(Table,"fa_annotation",TAB_GLOBAL_COMPO[521],fa_annotation))
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

Id dans le tab: 536;
simple
Nbr Jointure: 1;
    Joint n° 0 = reglement,rg_numero,rg_numero

Id dans le tab: 537;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 538;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 539;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="facturereglement";
 var CleMaitre = TAB_COMPO_PPTES[530].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var rg_numero=GetValAt(536);
 if (rg_numero=="-1")
    rg_numero="null";
 if (!ValiderChampsObligatoire(Table,"rg_numero",TAB_GLOBAL_COMPO[536],rg_numero,true))
         return -1;
 var fr_acompte=GetValAt(537);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[537],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[537],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(538);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[538],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[538],fr_partiel))
         return -1;
 var fr_montant=GetValAt(539);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[539],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[539],fr_montant))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",fa_numero,rg_numero,fr_acompte,fr_partiel,fr_montant"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[508].NewCle+","+rg_numero+","+(fr_acompte=="true" ? "true" : "false")+","+(fr_partiel=="true" ? "true" : "false")+","+(fr_montant=="" ? "null" : "'"+ValiderChaine(fr_montant)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var rg_numero=GetValAt(536);
 if (rg_numero=="-1")
    rg_numero="null";
 if (!ValiderChampsObligatoire(Table,"rg_numero",TAB_GLOBAL_COMPO[536],rg_numero,true))
         return -1;
 var fr_acompte=GetValAt(537);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[537],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[537],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(538);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[538],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[538],fr_partiel))
         return -1;
 var fr_montant=GetValAt(539);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[539],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[539],fr_montant))
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

Id dans le tab: 545;
simple
Nbr Jointure: 1;
    Joint n° 0 = vue_adresse,ad_numero,ad_numero

Id dans le tab: 546;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 547;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 548;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="routage";
 var CleMaitre = TAB_COMPO_PPTES[540].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ad_numero=GetValAt(545);
 if (ad_numero=="-1")
    ad_numero="null";
 if (!ValiderChampsObligatoire(Table,"ad_numero",TAB_GLOBAL_COMPO[545],ad_numero,true))
         return -1;
 var ro_debutservice=GetValAt(546);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[546],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[546],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(547);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[547],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[547],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(548);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[548],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[548],ro_quantite))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",fa_numero,ad_numero,ro_debutservice,ro_finservice,ro_quantite"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[508].NewCle+","+ad_numero+","+(ro_debutservice=="" ? "null" : "'"+ValiderChaine(ro_debutservice)+"'" )+","+(ro_finservice=="" ? "null" : "'"+ValiderChaine(ro_finservice)+"'" )+","+(ro_quantite=="" ? "null" : "'"+ValiderChaine(ro_quantite)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var ad_numero=GetValAt(545);
 if (ad_numero=="-1")
    ad_numero="null";
 if (!ValiderChampsObligatoire(Table,"ad_numero",TAB_GLOBAL_COMPO[545],ad_numero,true))
         return -1;
 var ro_debutservice=GetValAt(546);
 if (!ValiderChampsObligatoire(Table,"ro_debutservice",TAB_GLOBAL_COMPO[546],ro_debutservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_debutservice",TAB_GLOBAL_COMPO[546],ro_debutservice))
         return -1;
 var ro_finservice=GetValAt(547);
 if (!ValiderChampsObligatoire(Table,"ro_finservice",TAB_GLOBAL_COMPO[547],ro_finservice,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_finservice",TAB_GLOBAL_COMPO[547],ro_finservice))
         return -1;
 var ro_quantite=GetValAt(548);
 if (!ValiderChampsObligatoire(Table,"ro_quantite",TAB_GLOBAL_COMPO[548],ro_quantite,false))
         return -1;
 if (!ValiderChampsType(Table,"ro_quantite",TAB_GLOBAL_COMPO[548],ro_quantite))
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

Id dans le tab: 553;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 554;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 555;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 556;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 557;
complexe
Nbr Jointure: 1;
    Joint n° 0 = ligneavoir,av_numero,av_numero

******************
*/

 var Table="avoir";
 var CleMaitre = TAB_COMPO_PPTES[549].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var av_numfact=GetValAt(553);
 if (!ValiderChampsObligatoire(Table,"av_numfact",TAB_GLOBAL_COMPO[553],av_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"av_numfact",TAB_GLOBAL_COMPO[553],av_numfact))
         return -1;
 var av_date=GetValAt(554);
 if (!ValiderChampsObligatoire(Table,"av_date",TAB_GLOBAL_COMPO[554],av_date,false))
         return -1;
 if (!ValiderChampsType(Table,"av_date",TAB_GLOBAL_COMPO[554],av_date))
         return -1;
 var av_montantttc=GetValAt(555);
 if (!ValiderChampsObligatoire(Table,"av_montantttc",TAB_GLOBAL_COMPO[555],av_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantttc",TAB_GLOBAL_COMPO[555],av_montantttc))
         return -1;
 var av_montantht=GetValAt(556);
 if (!ValiderChampsObligatoire(Table,"av_montantht",TAB_GLOBAL_COMPO[556],av_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantht",TAB_GLOBAL_COMPO[556],av_montantht))
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
 var av_numfact=GetValAt(553);
 if (!ValiderChampsObligatoire(Table,"av_numfact",TAB_GLOBAL_COMPO[553],av_numfact,false))
         return -1;
 if (!ValiderChampsType(Table,"av_numfact",TAB_GLOBAL_COMPO[553],av_numfact))
         return -1;
 var av_date=GetValAt(554);
 if (!ValiderChampsObligatoire(Table,"av_date",TAB_GLOBAL_COMPO[554],av_date,false))
         return -1;
 if (!ValiderChampsType(Table,"av_date",TAB_GLOBAL_COMPO[554],av_date))
         return -1;
 var av_montantttc=GetValAt(555);
 if (!ValiderChampsObligatoire(Table,"av_montantttc",TAB_GLOBAL_COMPO[555],av_montantttc,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantttc",TAB_GLOBAL_COMPO[555],av_montantttc))
         return -1;
 var av_montantht=GetValAt(556);
 if (!ValiderChampsObligatoire(Table,"av_montantht",TAB_GLOBAL_COMPO[556],av_montantht,false))
         return -1;
 if (!ValiderChampsType(Table,"av_montantht",TAB_GLOBAL_COMPO[556],av_montantht))
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

Id dans le tab: 592;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 593;
simple
Nbr Jointure: 1;
    Joint n° 0 = personne,cs_societe,pe_numero

******************
*/

 var Table="cotisation";
 var CleMaitre = TAB_COMPO_PPTES[587].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cs_detail=GetValAt(592);
 if (!ValiderChampsObligatoire(Table,"cs_detail",TAB_GLOBAL_COMPO[592],cs_detail,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_detail",TAB_GLOBAL_COMPO[592],cs_detail))
         return -1;
 var cs_societe=GetValAt(593);
 if (cs_societe=="-1")
    cs_societe="null";
 if (!ValiderChampsObligatoire(Table,"cs_societe",TAB_GLOBAL_COMPO[593],cs_societe,true))
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
 var cs_detail=GetValAt(592);
 if (!ValiderChampsObligatoire(Table,"cs_detail",TAB_GLOBAL_COMPO[592],cs_detail,false))
         return -1;
 if (!ValiderChampsType(Table,"cs_detail",TAB_GLOBAL_COMPO[592],cs_detail))
         return -1;
 var cs_societe=GetValAt(593);
 if (cs_societe=="-1")
    cs_societe="null";
 if (!ValiderChampsObligatoire(Table,"cs_societe",TAB_GLOBAL_COMPO[593],cs_societe,true))
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

Id dans le tab: 566;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 567;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 568;
simple
Nbr Jointure: 1;
    Joint n° 0 = modereglement,mr_numero,mr_numero

Id dans le tab: 569;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 570;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 571;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 572;
simple
Nbr Jointure: 1;
    Joint n° 0 = vue_employe_reglement,em_numero,em_numero

Id dans le tab: 573;
complexe
Nbr Jointure: 1;
    Joint n° 0 = facturereglement,rg_numero,rg_numero

Id dans le tab: 582;
complexe
Nbr Jointure: 1;
    Joint n° 0 = repartition,rg_numero,rg_numero

******************
*/

 var Table="reglement";
 var CleMaitre = TAB_COMPO_PPTES[562].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var rg_date=GetValAt(566);
 if (!ValiderChampsObligatoire(Table,"rg_date",TAB_GLOBAL_COMPO[566],rg_date,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_date",TAB_GLOBAL_COMPO[566],rg_date))
         return -1;
 var rg_montant=GetValAt(567);
 if (!ValiderChampsObligatoire(Table,"rg_montant",TAB_GLOBAL_COMPO[567],rg_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_montant",TAB_GLOBAL_COMPO[567],rg_montant))
         return -1;
 var mr_numero=GetValAt(568);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[568],mr_numero,true))
         return -1;
 var rg_libellebanque=GetValAt(569);
 if (!ValiderChampsObligatoire(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[569],rg_libellebanque,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[569],rg_libellebanque))
         return -1;
 var rg_numerocompte=GetValAt(570);
 if (!ValiderChampsObligatoire(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[570],rg_numerocompte,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[570],rg_numerocompte))
         return -1;
 var rg_reference=GetValAt(571);
 if (!ValiderChampsObligatoire(Table,"rg_reference",TAB_GLOBAL_COMPO[571],rg_reference,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_reference",TAB_GLOBAL_COMPO[571],rg_reference))
         return -1;
 var em_numero=GetValAt(572);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[572],em_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(472);
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

var CompoLie = GetSQLCompoAt(472);
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
 var rg_date=GetValAt(566);
 if (!ValiderChampsObligatoire(Table,"rg_date",TAB_GLOBAL_COMPO[566],rg_date,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_date",TAB_GLOBAL_COMPO[566],rg_date))
         return -1;
 var rg_montant=GetValAt(567);
 if (!ValiderChampsObligatoire(Table,"rg_montant",TAB_GLOBAL_COMPO[567],rg_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_montant",TAB_GLOBAL_COMPO[567],rg_montant))
         return -1;
 var mr_numero=GetValAt(568);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[568],mr_numero,true))
         return -1;
 var rg_libellebanque=GetValAt(569);
 if (!ValiderChampsObligatoire(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[569],rg_libellebanque,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[569],rg_libellebanque))
         return -1;
 var rg_numerocompte=GetValAt(570);
 if (!ValiderChampsObligatoire(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[570],rg_numerocompte,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[570],rg_numerocompte))
         return -1;
 var rg_reference=GetValAt(571);
 if (!ValiderChampsObligatoire(Table,"rg_reference",TAB_GLOBAL_COMPO[571],rg_reference,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_reference",TAB_GLOBAL_COMPO[571],rg_reference))
         return -1;
 var em_numero=GetValAt(572);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[572],em_numero,true))
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

Id dans le tab: 578;
simple
Nbr Jointure: 1;
    Joint n° 0 = facture,fa_numero,fa_numero

Id dans le tab: 579;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 580;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 581;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="facturereglement";
 var CleMaitre = TAB_COMPO_PPTES[573].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var fa_numero=GetValAt(578);
 if (fa_numero=="-1")
    fa_numero="null";
 if (!ValiderChampsObligatoire(Table,"fa_numero",TAB_GLOBAL_COMPO[578],fa_numero,true))
         return -1;
 var fr_acompte=GetValAt(579);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[579],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[579],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(580);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[580],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[580],fr_partiel))
         return -1;
 var fr_montant=GetValAt(581);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[581],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[581],fr_montant))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",rg_numero,fa_numero,fr_acompte,fr_partiel,fr_montant"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[562].NewCle+","+fa_numero+","+(fr_acompte=="true" ? "true" : "false")+","+(fr_partiel=="true" ? "true" : "false")+","+(fr_montant=="" ? "null" : "'"+ValiderChaine(fr_montant)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var fa_numero=GetValAt(578);
 if (fa_numero=="-1")
    fa_numero="null";
 if (!ValiderChampsObligatoire(Table,"fa_numero",TAB_GLOBAL_COMPO[578],fa_numero,true))
         return -1;
 var fr_acompte=GetValAt(579);
 if (!ValiderChampsObligatoire(Table,"fr_acompte",TAB_GLOBAL_COMPO[579],fr_acompte,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_acompte",TAB_GLOBAL_COMPO[579],fr_acompte))
         return -1;
 var fr_partiel=GetValAt(580);
 if (!ValiderChampsObligatoire(Table,"fr_partiel",TAB_GLOBAL_COMPO[580],fr_partiel,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_partiel",TAB_GLOBAL_COMPO[580],fr_partiel))
         return -1;
 var fr_montant=GetValAt(581);
 if (!ValiderChampsObligatoire(Table,"fr_montant",TAB_GLOBAL_COMPO[581],fr_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"fr_montant",TAB_GLOBAL_COMPO[581],fr_montant))
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

Id dans le tab: 585;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 586;
simple
Nbr Jointure: 1;
    Joint n° 0 = moderepartition,mp_numero,mp_numero

******************
*/

 var Table="repartition";
 var CleMaitre = TAB_COMPO_PPTES[582].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var rp_montant=GetValAt(585);
 if (!ValiderChampsObligatoire(Table,"rp_montant",TAB_GLOBAL_COMPO[585],rp_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rp_montant",TAB_GLOBAL_COMPO[585],rp_montant))
         return -1;
 var mp_numero=GetValAt(586);
 if (mp_numero=="-1")
    mp_numero="null";
 if (!ValiderChampsObligatoire(Table,"mp_numero",TAB_GLOBAL_COMPO[586],mp_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",rg_numero,rp_montant,mp_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[562].NewCle+","+(rp_montant=="" ? "null" : "'"+ValiderChaine(rp_montant)+"'" )+","+mp_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var rp_montant=GetValAt(585);
 if (!ValiderChampsObligatoire(Table,"rp_montant",TAB_GLOBAL_COMPO[585],rp_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rp_montant",TAB_GLOBAL_COMPO[585],rp_montant))
         return -1;
 var mp_numero=GetValAt(586);
 if (mp_numero=="-1")
    mp_numero="null";
 if (!ValiderChampsObligatoire(Table,"mp_numero",TAB_GLOBAL_COMPO[586],mp_numero,true))
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

Id dans le tab: 600;
simple
Nbr Jointure: 1;
    Joint n° 0 = vue_employe_reglement,em_numero,em_numero

Id dans le tab: 601;
simple
Nbr Jointure: 1;
    Joint n° 0 = modereglement,mr_numero,mr_numero

Id dans le tab: 602;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 603;
complexe
Nbr Jointure: 1;
    Joint n° 0 = reglement,lr_numero,lr_numero

******************
*/

 var Table="listereglement";
 var CleMaitre = TAB_COMPO_PPTES[594].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var em_numero=GetValAt(600);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[600],em_numero,true))
         return -1;
 var mr_numero=GetValAt(601);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[601],mr_numero,true))
         return -1;
 var lr_commentaire=GetValAt(602);
 if (!ValiderChampsObligatoire(Table,"lr_commentaire",TAB_GLOBAL_COMPO[602],lr_commentaire,false))
         return -1;
 if (!ValiderChampsType(Table,"lr_commentaire",TAB_GLOBAL_COMPO[602],lr_commentaire))
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
 var em_numero=GetValAt(600);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[600],em_numero,true))
         return -1;
 var mr_numero=GetValAt(601);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[601],mr_numero,true))
         return -1;
 var lr_commentaire=GetValAt(602);
 if (!ValiderChampsObligatoire(Table,"lr_commentaire",TAB_GLOBAL_COMPO[602],lr_commentaire,false))
         return -1;
 if (!ValiderChampsType(Table,"lr_commentaire",TAB_GLOBAL_COMPO[602],lr_commentaire))
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
