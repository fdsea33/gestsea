/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Liste_des_personnes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 7

Id dans le tab: 653;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 654;
simple
Nbr Jointure: 1;
    Joint n° 0 = naturepersonne,np_numero,np_numero

Id dans le tab: 655;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 656;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 657;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 658;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 659;
complexe
Nbr Jointure: 1;
    Joint n° 0 = adresse,pe_numero,pe_numero

******************
*/

 var Table="personne";
 var CleMaitre = TAB_COMPO_PPTES[648].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pe_id=GetValAt(653);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[653],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[653],pe_id))
         return -1;
 var np_numero=GetValAt(654);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[654],np_numero,true))
         return -1;
 var pe_nom=GetValAt(655);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[655],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[655],pe_nom))
         return -1;
 var pe_prenom=GetValAt(656);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[656],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[656],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(657);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[657],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[657],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(658);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[658],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[658],pe_naissance))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_id,np_numero,pe_nom,pe_prenom,pe_numtvaic,pe_naissance"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(pe_id=="" ? "null" : "'"+ValiderChaine(pe_id)+"'" )+","+np_numero+","+(pe_nom=="" ? "null" : "'"+ValiderChaine(pe_nom)+"'" )+","+(pe_prenom=="" ? "null" : "'"+ValiderChaine(pe_prenom)+"'" )+","+(pe_numtvaic=="" ? "null" : "'"+ValiderChaine(pe_numtvaic)+"'" )+","+(pe_naissance=="" ? "null" : "'"+ValiderChaine(pe_naissance)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
 var pe_id=GetValAt(653);
 if (!ValiderChampsObligatoire(Table,"pe_id",TAB_GLOBAL_COMPO[653],pe_id,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_id",TAB_GLOBAL_COMPO[653],pe_id))
         return -1;
 var np_numero=GetValAt(654);
 if (np_numero=="-1")
    np_numero="null";
 if (!ValiderChampsObligatoire(Table,"np_numero",TAB_GLOBAL_COMPO[654],np_numero,true))
         return -1;
 var pe_nom=GetValAt(655);
 if (!ValiderChampsObligatoire(Table,"pe_nom",TAB_GLOBAL_COMPO[655],pe_nom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_nom",TAB_GLOBAL_COMPO[655],pe_nom))
         return -1;
 var pe_prenom=GetValAt(656);
 if (!ValiderChampsObligatoire(Table,"pe_prenom",TAB_GLOBAL_COMPO[656],pe_prenom,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_prenom",TAB_GLOBAL_COMPO[656],pe_prenom))
         return -1;
 var pe_numtvaic=GetValAt(657);
 if (!ValiderChampsObligatoire(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[657],pe_numtvaic,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_numtvaic",TAB_GLOBAL_COMPO[657],pe_numtvaic))
         return -1;
 var pe_naissance=GetValAt(658);
 if (!ValiderChampsObligatoire(Table,"pe_naissance",TAB_GLOBAL_COMPO[658],pe_naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"pe_naissance",TAB_GLOBAL_COMPO[658],pe_naissance))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pe_id="+(pe_id=="" ? "null" : "'"+ValiderChaine(pe_id)+"'" )+",np_numero="+np_numero+",pe_nom="+(pe_nom=="" ? "null" : "'"+ValiderChaine(pe_nom)+"'" )+",pe_prenom="+(pe_prenom=="" ? "null" : "'"+ValiderChaine(pe_prenom)+"'" )+",pe_numtvaic="+(pe_numtvaic=="" ? "null" : "'"+ValiderChaine(pe_numtvaic)+"'" )+",pe_naissance="+(pe_naissance=="" ? "null" : "'"+ValiderChaine(pe_naissance)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Personnes_Adresses_7(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 7

Id dans le tab: 663;
simple
Nbr Jointure: 1;
    Joint n° 0 = typeadresse,ak_numero,ak_numero

Id dans le tab: 664;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 665;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 666;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 667;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 668;
simple
Nbr Jointure: 1;
    Joint n° 0 = codepostal,cp_numero,cp_numero

Id dans le tab: 669;
simple
Nbr Jointure: 1;
    Joint n° 0 = ville,vi_numero,vi_numero

******************
*/

 var Table="adresse";
 var CleMaitre = TAB_COMPO_PPTES[659].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var ak_numero=GetValAt(663);
 if (ak_numero=="-1")
    ak_numero="null";
 if (!ValiderChampsObligatoire(Table,"ak_numero",TAB_GLOBAL_COMPO[663],ak_numero,true))
         return -1;
 var ad_ligne2=GetValAt(664);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[664],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[664],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(665);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[665],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[665],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(666);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[666],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[666],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(667);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[667],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[667],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(668);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[668],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(669);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[669],vi_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,ak_numero,ad_ligne2,ad_ligne3,ad_ligne4,ad_ligne5,cp_numero,vi_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[648].NewCle+","+ak_numero+","+(ad_ligne2=="" ? "null" : "'"+ValiderChaine(ad_ligne2)+"'" )+","+(ad_ligne3=="" ? "null" : "'"+ValiderChaine(ad_ligne3)+"'" )+","+(ad_ligne4=="" ? "null" : "'"+ValiderChaine(ad_ligne4)+"'" )+","+(ad_ligne5=="" ? "null" : "'"+ValiderChaine(ad_ligne5)+"'" )+","+cp_numero+","+vi_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Personnes
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Personnes_Adresses_7(Compo_Maitre)
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
function User_Update_Personnes_Adresses_7(Compo_Maitre)
{
 var Table="adresse";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ak_numero=GetValAt(663);
 if (ak_numero=="-1")
    ak_numero="null";
 if (!ValiderChampsObligatoire(Table,"ak_numero",TAB_GLOBAL_COMPO[663],ak_numero,true))
         return -1;
 var ad_ligne2=GetValAt(664);
 if (!ValiderChampsObligatoire(Table,"ad_ligne2",TAB_GLOBAL_COMPO[664],ad_ligne2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne2",TAB_GLOBAL_COMPO[664],ad_ligne2))
         return -1;
 var ad_ligne3=GetValAt(665);
 if (!ValiderChampsObligatoire(Table,"ad_ligne3",TAB_GLOBAL_COMPO[665],ad_ligne3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne3",TAB_GLOBAL_COMPO[665],ad_ligne3))
         return -1;
 var ad_ligne4=GetValAt(666);
 if (!ValiderChampsObligatoire(Table,"ad_ligne4",TAB_GLOBAL_COMPO[666],ad_ligne4,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne4",TAB_GLOBAL_COMPO[666],ad_ligne4))
         return -1;
 var ad_ligne5=GetValAt(667);
 if (!ValiderChampsObligatoire(Table,"ad_ligne5",TAB_GLOBAL_COMPO[667],ad_ligne5,false))
         return -1;
 if (!ValiderChampsType(Table,"ad_ligne5",TAB_GLOBAL_COMPO[667],ad_ligne5))
         return -1;
 var cp_numero=GetValAt(668);
 if (cp_numero=="-1")
    cp_numero="null";
 if (!ValiderChampsObligatoire(Table,"cp_numero",TAB_GLOBAL_COMPO[668],cp_numero,true))
         return -1;
 var vi_numero=GetValAt(669);
 if (vi_numero=="-1")
    vi_numero="null";
 if (!ValiderChampsObligatoire(Table,"vi_numero",TAB_GLOBAL_COMPO[669],vi_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ak_numero="+ak_numero+",ad_ligne2="+(ad_ligne2=="" ? "null" : "'"+ValiderChaine(ad_ligne2)+"'" )+",ad_ligne3="+(ad_ligne3=="" ? "null" : "'"+ValiderChaine(ad_ligne3)+"'" )+",ad_ligne4="+(ad_ligne4=="" ? "null" : "'"+ValiderChaine(ad_ligne4)+"'" )+",ad_ligne5="+(ad_ligne5=="" ? "null" : "'"+ValiderChaine(ad_ligne5)+"'" )+",cp_numero="+cp_numero+",vi_numero="+vi_numero+"";
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

Nbr d'esclaves = 8

Id dans le tab: 675;
simple
Nbr Jointure: 1;
    Joint n° 0 = personne,pe_numero,pe_numero

Id dans le tab: 676;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 677;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 678;
simple
Nbr Jointure: 1;
    Joint n° 0 = modereglement,mr_numero,mr_numero

Id dans le tab: 679;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 680;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 681;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 682;
simple
Nbr Jointure: 1;
    Joint n° 0 = vue_employe_reglement,em_numero,em_numero

******************
*/

 var Table="reglement";
 var CleMaitre = TAB_COMPO_PPTES[670].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pe_numero=GetValAt(675);
 if (pe_numero=="-1")
    pe_numero="null";
 if (!ValiderChampsObligatoire(Table,"pe_numero",TAB_GLOBAL_COMPO[675],pe_numero,true))
         return -1;
 var rg_date=GetValAt(676);
 if (!ValiderChampsObligatoire(Table,"rg_date",TAB_GLOBAL_COMPO[676],rg_date,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_date",TAB_GLOBAL_COMPO[676],rg_date))
         return -1;
 var rg_montant=GetValAt(677);
 if (!ValiderChampsObligatoire(Table,"rg_montant",TAB_GLOBAL_COMPO[677],rg_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_montant",TAB_GLOBAL_COMPO[677],rg_montant))
         return -1;
 var mr_numero=GetValAt(678);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[678],mr_numero,true))
         return -1;
 var rg_libellebanque=GetValAt(679);
 if (!ValiderChampsObligatoire(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[679],rg_libellebanque,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[679],rg_libellebanque))
         return -1;
 var rg_numerocompte=GetValAt(680);
 if (!ValiderChampsObligatoire(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[680],rg_numerocompte,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[680],rg_numerocompte))
         return -1;
 var rg_reference=GetValAt(681);
 if (!ValiderChampsObligatoire(Table,"rg_reference",TAB_GLOBAL_COMPO[681],rg_reference,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_reference",TAB_GLOBAL_COMPO[681],rg_reference))
         return -1;
 var em_numero=GetValAt(682);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[682],em_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pe_numero,rg_date,rg_montant,mr_numero,rg_libellebanque,rg_numerocompte,rg_reference,em_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+pe_numero+","+(rg_date=="" ? "null" : "'"+ValiderChaine(rg_date)+"'" )+","+(rg_montant=="" ? "null" : "'"+ValiderChaine(rg_montant)+"'" )+","+mr_numero+","+(rg_libellebanque=="" ? "null" : "'"+ValiderChaine(rg_libellebanque)+"'" )+","+(rg_numerocompte=="" ? "null" : "'"+ValiderChaine(rg_numerocompte)+"'" )+","+(rg_reference=="" ? "null" : "'"+ValiderChaine(rg_reference)+"'" )+","+em_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
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
 var pe_numero=GetValAt(675);
 if (pe_numero=="-1")
    pe_numero="null";
 if (!ValiderChampsObligatoire(Table,"pe_numero",TAB_GLOBAL_COMPO[675],pe_numero,true))
         return -1;
 var rg_date=GetValAt(676);
 if (!ValiderChampsObligatoire(Table,"rg_date",TAB_GLOBAL_COMPO[676],rg_date,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_date",TAB_GLOBAL_COMPO[676],rg_date))
         return -1;
 var rg_montant=GetValAt(677);
 if (!ValiderChampsObligatoire(Table,"rg_montant",TAB_GLOBAL_COMPO[677],rg_montant,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_montant",TAB_GLOBAL_COMPO[677],rg_montant))
         return -1;
 var mr_numero=GetValAt(678);
 if (mr_numero=="-1")
    mr_numero="null";
 if (!ValiderChampsObligatoire(Table,"mr_numero",TAB_GLOBAL_COMPO[678],mr_numero,true))
         return -1;
 var rg_libellebanque=GetValAt(679);
 if (!ValiderChampsObligatoire(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[679],rg_libellebanque,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_libellebanque",TAB_GLOBAL_COMPO[679],rg_libellebanque))
         return -1;
 var rg_numerocompte=GetValAt(680);
 if (!ValiderChampsObligatoire(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[680],rg_numerocompte,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_numerocompte",TAB_GLOBAL_COMPO[680],rg_numerocompte))
         return -1;
 var rg_reference=GetValAt(681);
 if (!ValiderChampsObligatoire(Table,"rg_reference",TAB_GLOBAL_COMPO[681],rg_reference,false))
         return -1;
 if (!ValiderChampsType(Table,"rg_reference",TAB_GLOBAL_COMPO[681],rg_reference))
         return -1;
 var em_numero=GetValAt(682);
 if (em_numero=="-1")
    em_numero="null";
 if (!ValiderChampsObligatoire(Table,"em_numero",TAB_GLOBAL_COMPO[682],em_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pe_numero="+pe_numero+",rg_date="+(rg_date=="" ? "null" : "'"+ValiderChaine(rg_date)+"'" )+",rg_montant="+(rg_montant=="" ? "null" : "'"+ValiderChaine(rg_montant)+"'" )+",mr_numero="+mr_numero+",rg_libellebanque="+(rg_libellebanque=="" ? "null" : "'"+ValiderChaine(rg_libellebanque)+"'" )+",rg_numerocompte="+(rg_numerocompte=="" ? "null" : "'"+ValiderChaine(rg_numerocompte)+"'" )+",rg_reference="+(rg_reference=="" ? "null" : "'"+ValiderChaine(rg_reference)+"'" )+",em_numero="+em_numero+"";
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
