/*************************************************
  REQUETES UTILSATEUR : Onglet : Evoplus
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Evoplus_Liste_des_evoplus0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 31

Id dans le tab: 711;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 712;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 713;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 714;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 715;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 716;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 717;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 718;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 719;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 720;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 721;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 722;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 723;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 724;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 725;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 726;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 727;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 728;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 729;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 730;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 731;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 732;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 733;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 734;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 735;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 736;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 737;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 738;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 739;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 740;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 741;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="table_evoplus";
 var CleMaitre = TAB_COMPO_PPTES[706].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var source=GetValAt(711);
 if (!ValiderChampsObligatoire(Table,"source",TAB_GLOBAL_COMPO[711],source,false))
         return -1;
 if (!ValiderChampsType(Table,"source",TAB_GLOBAL_COMPO[711],source))
         return -1;
 var numero=GetValAt(712);
 if (!ValiderChampsObligatoire(Table,"numero",TAB_GLOBAL_COMPO[712],numero,false))
         return -1;
 if (!ValiderChampsType(Table,"numero",TAB_GLOBAL_COMPO[712],numero))
         return -1;
 var titre=GetValAt(713);
 if (!ValiderChampsObligatoire(Table,"titre",TAB_GLOBAL_COMPO[713],titre,false))
         return -1;
 if (!ValiderChampsType(Table,"titre",TAB_GLOBAL_COMPO[713],titre))
         return -1;
 var nom=GetValAt(714);
 if (!ValiderChampsObligatoire(Table,"nom",TAB_GLOBAL_COMPO[714],nom,false))
         return -1;
 if (!ValiderChampsType(Table,"nom",TAB_GLOBAL_COMPO[714],nom))
         return -1;
 var complement=GetValAt(715);
 if (!ValiderChampsObligatoire(Table,"complement",TAB_GLOBAL_COMPO[715],complement,false))
         return -1;
 if (!ValiderChampsType(Table,"complement",TAB_GLOBAL_COMPO[715],complement))
         return -1;
 var ad1=GetValAt(716);
 if (!ValiderChampsObligatoire(Table,"ad1",TAB_GLOBAL_COMPO[716],ad1,false))
         return -1;
 if (!ValiderChampsType(Table,"ad1",TAB_GLOBAL_COMPO[716],ad1))
         return -1;
 var ad2=GetValAt(717);
 if (!ValiderChampsObligatoire(Table,"ad2",TAB_GLOBAL_COMPO[717],ad2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad2",TAB_GLOBAL_COMPO[717],ad2))
         return -1;
 var ad3=GetValAt(718);
 if (!ValiderChampsObligatoire(Table,"ad3",TAB_GLOBAL_COMPO[718],ad3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad3",TAB_GLOBAL_COMPO[718],ad3))
         return -1;
 var cp=GetValAt(719);
 if (!ValiderChampsObligatoire(Table,"cp",TAB_GLOBAL_COMPO[719],cp,false))
         return -1;
 if (!ValiderChampsType(Table,"cp",TAB_GLOBAL_COMPO[719],cp))
         return -1;
 var ville=GetValAt(720);
 if (!ValiderChampsObligatoire(Table,"ville",TAB_GLOBAL_COMPO[720],ville,false))
         return -1;
 if (!ValiderChampsType(Table,"ville",TAB_GLOBAL_COMPO[720],ville))
         return -1;
 var naissance=GetValAt(721);
 if (!ValiderChampsObligatoire(Table,"naissance",TAB_GLOBAL_COMPO[721],naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"naissance",TAB_GLOBAL_COMPO[721],naissance))
         return -1;
 var telephone=GetValAt(722);
 if (!ValiderChampsObligatoire(Table,"telephone",TAB_GLOBAL_COMPO[722],telephone,false))
         return -1;
 if (!ValiderChampsType(Table,"telephone",TAB_GLOBAL_COMPO[722],telephone))
         return -1;
 var fax=GetValAt(723);
 if (!ValiderChampsObligatoire(Table,"fax",TAB_GLOBAL_COMPO[723],fax,false))
         return -1;
 if (!ValiderChampsType(Table,"fax",TAB_GLOBAL_COMPO[723],fax))
         return -1;
 var portable=GetValAt(724);
 if (!ValiderChampsObligatoire(Table,"portable",TAB_GLOBAL_COMPO[724],portable,false))
         return -1;
 if (!ValiderChampsType(Table,"portable",TAB_GLOBAL_COMPO[724],portable))
         return -1;
 var qualification=GetValAt(725);
 if (!ValiderChampsObligatoire(Table,"qualification",TAB_GLOBAL_COMPO[725],qualification,false))
         return -1;
 if (!ValiderChampsType(Table,"qualification",TAB_GLOBAL_COMPO[725],qualification))
         return -1;
 var base_ht=GetValAt(726);
 if (!ValiderChampsObligatoire(Table,"base_ht",TAB_GLOBAL_COMPO[726],base_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"base_ht",TAB_GLOBAL_COMPO[726],base_ht))
         return -1;
 var productions=GetValAt(727);
 if (!ValiderChampsObligatoire(Table,"productions",TAB_GLOBAL_COMPO[727],productions,false))
         return -1;
 if (!ValiderChampsType(Table,"productions",TAB_GLOBAL_COMPO[727],productions))
         return -1;
 var hectares_nb=GetValAt(728);
 if (!ValiderChampsObligatoire(Table,"hectares_nb",TAB_GLOBAL_COMPO[728],hectares_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"hectares_nb",TAB_GLOBAL_COMPO[728],hectares_nb))
         return -1;
 var salaries_nb=GetValAt(729);
 if (!ValiderChampsObligatoire(Table,"salaries_nb",TAB_GLOBAL_COMPO[729],salaries_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"salaries_nb",TAB_GLOBAL_COMPO[729],salaries_nb))
         return -1;
 var sacea_ttc=GetValAt(730);
 if (!ValiderChampsObligatoire(Table,"sacea_ttc",TAB_GLOBAL_COMPO[730],sacea_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"sacea_ttc",TAB_GLOBAL_COMPO[730],sacea_ttc))
         return -1;
 var cm_nb=GetValAt(731);
 if (!ValiderChampsObligatoire(Table,"cm_nb",TAB_GLOBAL_COMPO[731],cm_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_nb",TAB_GLOBAL_COMPO[731],cm_nb))
         return -1;
 var cm_ht=GetValAt(732);
 if (!ValiderChampsObligatoire(Table,"cm_ht",TAB_GLOBAL_COMPO[732],cm_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_ht",TAB_GLOBAL_COMPO[732],cm_ht))
         return -1;
 var cm_noms=GetValAt(733);
 if (!ValiderChampsObligatoire(Table,"cm_noms",TAB_GLOBAL_COMPO[733],cm_noms,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_noms",TAB_GLOBAL_COMPO[733],cm_noms))
         return -1;
 var opt1=GetValAt(734);
 if (!ValiderChampsObligatoire(Table,"opt1",TAB_GLOBAL_COMPO[734],opt1,false))
         return -1;
 if (!ValiderChampsType(Table,"opt1",TAB_GLOBAL_COMPO[734],opt1))
         return -1;
 var opt2=GetValAt(735);
 if (!ValiderChampsObligatoire(Table,"opt2",TAB_GLOBAL_COMPO[735],opt2,false))
         return -1;
 if (!ValiderChampsType(Table,"opt2",TAB_GLOBAL_COMPO[735],opt2))
         return -1;
 var opt3=GetValAt(736);
 if (!ValiderChampsObligatoire(Table,"opt3",TAB_GLOBAL_COMPO[736],opt3,false))
         return -1;
 if (!ValiderChampsType(Table,"opt3",TAB_GLOBAL_COMPO[736],opt3))
         return -1;
 var opt4=GetValAt(737);
 if (!ValiderChampsObligatoire(Table,"opt4",TAB_GLOBAL_COMPO[737],opt4,false))
         return -1;
 if (!ValiderChampsType(Table,"opt4",TAB_GLOBAL_COMPO[737],opt4))
         return -1;
 var opt_num=GetValAt(738);
 if (!ValiderChampsObligatoire(Table,"opt_num",TAB_GLOBAL_COMPO[738],opt_num,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_num",TAB_GLOBAL_COMPO[738],opt_num))
         return -1;
 var opt_ttc=GetValAt(739);
 if (!ValiderChampsObligatoire(Table,"opt_ttc",TAB_GLOBAL_COMPO[739],opt_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_ttc",TAB_GLOBAL_COMPO[739],opt_ttc))
         return -1;
 var statut=GetValAt(740);
 if (!ValiderChampsObligatoire(Table,"statut",TAB_GLOBAL_COMPO[740],statut,false))
         return -1;
 if (!ValiderChampsType(Table,"statut",TAB_GLOBAL_COMPO[740],statut))
         return -1;
 var remarque=GetValAt(741);
 if (!ValiderChampsObligatoire(Table,"remarque",TAB_GLOBAL_COMPO[741],remarque,false))
         return -1;
 if (!ValiderChampsType(Table,"remarque",TAB_GLOBAL_COMPO[741],remarque))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",source,numero,titre,nom,complement,ad1,ad2,ad3,cp,ville,naissance,telephone,fax,portable,qualification,base_ht,productions,hectares_nb,salaries_nb,sacea_ttc,cm_nb,cm_ht,cm_noms,opt1,opt2,opt3,opt4,opt_num,opt_ttc,statut,remarque"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(source=="" ? "null" : "'"+ValiderChaine(source)+"'" )+","+(numero=="" ? "null" : "'"+ValiderChaine(numero)+"'" )+","+(titre=="" ? "null" : "'"+ValiderChaine(titre)+"'" )+","+(nom=="" ? "null" : "'"+ValiderChaine(nom)+"'" )+","+(complement=="" ? "null" : "'"+ValiderChaine(complement)+"'" )+","+(ad1=="" ? "null" : "'"+ValiderChaine(ad1)+"'" )+","+(ad2=="" ? "null" : "'"+ValiderChaine(ad2)+"'" )+","+(ad3=="" ? "null" : "'"+ValiderChaine(ad3)+"'" )+","+(cp=="" ? "null" : "'"+ValiderChaine(cp)+"'" )+","+(ville=="" ? "null" : "'"+ValiderChaine(ville)+"'" )+","+(naissance=="" ? "null" : "'"+ValiderChaine(naissance)+"'" )+","+(telephone=="" ? "null" : "'"+ValiderChaine(telephone)+"'" )+","+(fax=="" ? "null" : "'"+ValiderChaine(fax)+"'" )+","+(portable=="" ? "null" : "'"+ValiderChaine(portable)+"'" )+","+(qualification=="" ? "null" : "'"+ValiderChaine(qualification)+"'" )+","+(base_ht=="" ? "null" : "'"+ValiderChaine(base_ht)+"'" )+","+(productions=="" ? "null" : "'"+ValiderChaine(productions)+"'" )+","+(hectares_nb=="" ? "null" : "'"+ValiderChaine(hectares_nb)+"'" )+","+(salaries_nb=="" ? "null" : "'"+ValiderChaine(salaries_nb)+"'" )+","+(sacea_ttc=="" ? "null" : "'"+ValiderChaine(sacea_ttc)+"'" )+","+(cm_nb=="" ? "null" : "'"+ValiderChaine(cm_nb)+"'" )+","+(cm_ht=="" ? "null" : "'"+ValiderChaine(cm_ht)+"'" )+","+(cm_noms=="" ? "null" : "'"+ValiderChaine(cm_noms)+"'" )+","+(opt1=="" ? "null" : "'"+ValiderChaine(opt1)+"'" )+","+(opt2=="" ? "null" : "'"+ValiderChaine(opt2)+"'" )+","+(opt3=="" ? "null" : "'"+ValiderChaine(opt3)+"'" )+","+(opt4=="" ? "null" : "'"+ValiderChaine(opt4)+"'" )+","+(opt_num=="" ? "null" : "'"+ValiderChaine(opt_num)+"'" )+","+(opt_ttc=="" ? "null" : "'"+ValiderChaine(opt_ttc)+"'" )+","+(statut=="" ? "null" : "'"+ValiderChaine(statut)+"'" )+","+(remarque=="" ? "null" : "'"+ValiderChaine(remarque)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Evoplus
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Evoplus_Liste_des_evoplus0(Compo_Maitre)
{
 var Table="table_evoplus";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Evoplus
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Evoplus_Liste_des_evoplus0(Compo_Maitre)
{
 var Table="table_evoplus";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var source=GetValAt(711);
 if (!ValiderChampsObligatoire(Table,"source",TAB_GLOBAL_COMPO[711],source,false))
         return -1;
 if (!ValiderChampsType(Table,"source",TAB_GLOBAL_COMPO[711],source))
         return -1;
 var numero=GetValAt(712);
 if (!ValiderChampsObligatoire(Table,"numero",TAB_GLOBAL_COMPO[712],numero,false))
         return -1;
 if (!ValiderChampsType(Table,"numero",TAB_GLOBAL_COMPO[712],numero))
         return -1;
 var titre=GetValAt(713);
 if (!ValiderChampsObligatoire(Table,"titre",TAB_GLOBAL_COMPO[713],titre,false))
         return -1;
 if (!ValiderChampsType(Table,"titre",TAB_GLOBAL_COMPO[713],titre))
         return -1;
 var nom=GetValAt(714);
 if (!ValiderChampsObligatoire(Table,"nom",TAB_GLOBAL_COMPO[714],nom,false))
         return -1;
 if (!ValiderChampsType(Table,"nom",TAB_GLOBAL_COMPO[714],nom))
         return -1;
 var complement=GetValAt(715);
 if (!ValiderChampsObligatoire(Table,"complement",TAB_GLOBAL_COMPO[715],complement,false))
         return -1;
 if (!ValiderChampsType(Table,"complement",TAB_GLOBAL_COMPO[715],complement))
         return -1;
 var ad1=GetValAt(716);
 if (!ValiderChampsObligatoire(Table,"ad1",TAB_GLOBAL_COMPO[716],ad1,false))
         return -1;
 if (!ValiderChampsType(Table,"ad1",TAB_GLOBAL_COMPO[716],ad1))
         return -1;
 var ad2=GetValAt(717);
 if (!ValiderChampsObligatoire(Table,"ad2",TAB_GLOBAL_COMPO[717],ad2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad2",TAB_GLOBAL_COMPO[717],ad2))
         return -1;
 var ad3=GetValAt(718);
 if (!ValiderChampsObligatoire(Table,"ad3",TAB_GLOBAL_COMPO[718],ad3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad3",TAB_GLOBAL_COMPO[718],ad3))
         return -1;
 var cp=GetValAt(719);
 if (!ValiderChampsObligatoire(Table,"cp",TAB_GLOBAL_COMPO[719],cp,false))
         return -1;
 if (!ValiderChampsType(Table,"cp",TAB_GLOBAL_COMPO[719],cp))
         return -1;
 var ville=GetValAt(720);
 if (!ValiderChampsObligatoire(Table,"ville",TAB_GLOBAL_COMPO[720],ville,false))
         return -1;
 if (!ValiderChampsType(Table,"ville",TAB_GLOBAL_COMPO[720],ville))
         return -1;
 var naissance=GetValAt(721);
 if (!ValiderChampsObligatoire(Table,"naissance",TAB_GLOBAL_COMPO[721],naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"naissance",TAB_GLOBAL_COMPO[721],naissance))
         return -1;
 var telephone=GetValAt(722);
 if (!ValiderChampsObligatoire(Table,"telephone",TAB_GLOBAL_COMPO[722],telephone,false))
         return -1;
 if (!ValiderChampsType(Table,"telephone",TAB_GLOBAL_COMPO[722],telephone))
         return -1;
 var fax=GetValAt(723);
 if (!ValiderChampsObligatoire(Table,"fax",TAB_GLOBAL_COMPO[723],fax,false))
         return -1;
 if (!ValiderChampsType(Table,"fax",TAB_GLOBAL_COMPO[723],fax))
         return -1;
 var portable=GetValAt(724);
 if (!ValiderChampsObligatoire(Table,"portable",TAB_GLOBAL_COMPO[724],portable,false))
         return -1;
 if (!ValiderChampsType(Table,"portable",TAB_GLOBAL_COMPO[724],portable))
         return -1;
 var qualification=GetValAt(725);
 if (!ValiderChampsObligatoire(Table,"qualification",TAB_GLOBAL_COMPO[725],qualification,false))
         return -1;
 if (!ValiderChampsType(Table,"qualification",TAB_GLOBAL_COMPO[725],qualification))
         return -1;
 var base_ht=GetValAt(726);
 if (!ValiderChampsObligatoire(Table,"base_ht",TAB_GLOBAL_COMPO[726],base_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"base_ht",TAB_GLOBAL_COMPO[726],base_ht))
         return -1;
 var productions=GetValAt(727);
 if (!ValiderChampsObligatoire(Table,"productions",TAB_GLOBAL_COMPO[727],productions,false))
         return -1;
 if (!ValiderChampsType(Table,"productions",TAB_GLOBAL_COMPO[727],productions))
         return -1;
 var hectares_nb=GetValAt(728);
 if (!ValiderChampsObligatoire(Table,"hectares_nb",TAB_GLOBAL_COMPO[728],hectares_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"hectares_nb",TAB_GLOBAL_COMPO[728],hectares_nb))
         return -1;
 var salaries_nb=GetValAt(729);
 if (!ValiderChampsObligatoire(Table,"salaries_nb",TAB_GLOBAL_COMPO[729],salaries_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"salaries_nb",TAB_GLOBAL_COMPO[729],salaries_nb))
         return -1;
 var sacea_ttc=GetValAt(730);
 if (!ValiderChampsObligatoire(Table,"sacea_ttc",TAB_GLOBAL_COMPO[730],sacea_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"sacea_ttc",TAB_GLOBAL_COMPO[730],sacea_ttc))
         return -1;
 var cm_nb=GetValAt(731);
 if (!ValiderChampsObligatoire(Table,"cm_nb",TAB_GLOBAL_COMPO[731],cm_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_nb",TAB_GLOBAL_COMPO[731],cm_nb))
         return -1;
 var cm_ht=GetValAt(732);
 if (!ValiderChampsObligatoire(Table,"cm_ht",TAB_GLOBAL_COMPO[732],cm_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_ht",TAB_GLOBAL_COMPO[732],cm_ht))
         return -1;
 var cm_noms=GetValAt(733);
 if (!ValiderChampsObligatoire(Table,"cm_noms",TAB_GLOBAL_COMPO[733],cm_noms,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_noms",TAB_GLOBAL_COMPO[733],cm_noms))
         return -1;
 var opt1=GetValAt(734);
 if (!ValiderChampsObligatoire(Table,"opt1",TAB_GLOBAL_COMPO[734],opt1,false))
         return -1;
 if (!ValiderChampsType(Table,"opt1",TAB_GLOBAL_COMPO[734],opt1))
         return -1;
 var opt2=GetValAt(735);
 if (!ValiderChampsObligatoire(Table,"opt2",TAB_GLOBAL_COMPO[735],opt2,false))
         return -1;
 if (!ValiderChampsType(Table,"opt2",TAB_GLOBAL_COMPO[735],opt2))
         return -1;
 var opt3=GetValAt(736);
 if (!ValiderChampsObligatoire(Table,"opt3",TAB_GLOBAL_COMPO[736],opt3,false))
         return -1;
 if (!ValiderChampsType(Table,"opt3",TAB_GLOBAL_COMPO[736],opt3))
         return -1;
 var opt4=GetValAt(737);
 if (!ValiderChampsObligatoire(Table,"opt4",TAB_GLOBAL_COMPO[737],opt4,false))
         return -1;
 if (!ValiderChampsType(Table,"opt4",TAB_GLOBAL_COMPO[737],opt4))
         return -1;
 var opt_num=GetValAt(738);
 if (!ValiderChampsObligatoire(Table,"opt_num",TAB_GLOBAL_COMPO[738],opt_num,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_num",TAB_GLOBAL_COMPO[738],opt_num))
         return -1;
 var opt_ttc=GetValAt(739);
 if (!ValiderChampsObligatoire(Table,"opt_ttc",TAB_GLOBAL_COMPO[739],opt_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_ttc",TAB_GLOBAL_COMPO[739],opt_ttc))
         return -1;
 var statut=GetValAt(740);
 if (!ValiderChampsObligatoire(Table,"statut",TAB_GLOBAL_COMPO[740],statut,false))
         return -1;
 if (!ValiderChampsType(Table,"statut",TAB_GLOBAL_COMPO[740],statut))
         return -1;
 var remarque=GetValAt(741);
 if (!ValiderChampsObligatoire(Table,"remarque",TAB_GLOBAL_COMPO[741],remarque,false))
         return -1;
 if (!ValiderChampsType(Table,"remarque",TAB_GLOBAL_COMPO[741],remarque))
         return -1;
 var Req="update "+Table+" set ";
 Req+="source="+(source=="" ? "null" : "'"+ValiderChaine(source)+"'" )+",numero="+(numero=="" ? "null" : "'"+ValiderChaine(numero)+"'" )+",titre="+(titre=="" ? "null" : "'"+ValiderChaine(titre)+"'" )+",nom="+(nom=="" ? "null" : "'"+ValiderChaine(nom)+"'" )+",complement="+(complement=="" ? "null" : "'"+ValiderChaine(complement)+"'" )+",ad1="+(ad1=="" ? "null" : "'"+ValiderChaine(ad1)+"'" )+",ad2="+(ad2=="" ? "null" : "'"+ValiderChaine(ad2)+"'" )+",ad3="+(ad3=="" ? "null" : "'"+ValiderChaine(ad3)+"'" )+",cp="+(cp=="" ? "null" : "'"+ValiderChaine(cp)+"'" )+",ville="+(ville=="" ? "null" : "'"+ValiderChaine(ville)+"'" )+",naissance="+(naissance=="" ? "null" : "'"+ValiderChaine(naissance)+"'" )+",telephone="+(telephone=="" ? "null" : "'"+ValiderChaine(telephone)+"'" )+",fax="+(fax=="" ? "null" : "'"+ValiderChaine(fax)+"'" )+",portable="+(portable=="" ? "null" : "'"+ValiderChaine(portable)+"'" )+",qualification="+(qualification=="" ? "null" : "'"+ValiderChaine(qualification)+"'" )+",base_ht="+(base_ht=="" ? "null" : "'"+ValiderChaine(base_ht)+"'" )+",productions="+(productions=="" ? "null" : "'"+ValiderChaine(productions)+"'" )+",hectares_nb="+(hectares_nb=="" ? "null" : "'"+ValiderChaine(hectares_nb)+"'" )+",salaries_nb="+(salaries_nb=="" ? "null" : "'"+ValiderChaine(salaries_nb)+"'" )+",sacea_ttc="+(sacea_ttc=="" ? "null" : "'"+ValiderChaine(sacea_ttc)+"'" )+",cm_nb="+(cm_nb=="" ? "null" : "'"+ValiderChaine(cm_nb)+"'" )+",cm_ht="+(cm_ht=="" ? "null" : "'"+ValiderChaine(cm_ht)+"'" )+",cm_noms="+(cm_noms=="" ? "null" : "'"+ValiderChaine(cm_noms)+"'" )+",opt1="+(opt1=="" ? "null" : "'"+ValiderChaine(opt1)+"'" )+",opt2="+(opt2=="" ? "null" : "'"+ValiderChaine(opt2)+"'" )+",opt3="+(opt3=="" ? "null" : "'"+ValiderChaine(opt3)+"'" )+",opt4="+(opt4=="" ? "null" : "'"+ValiderChaine(opt4)+"'" )+",opt_num="+(opt_num=="" ? "null" : "'"+ValiderChaine(opt_num)+"'" )+",opt_ttc="+(opt_ttc=="" ? "null" : "'"+ValiderChaine(opt_ttc)+"'" )+",statut="+(statut=="" ? "null" : "'"+ValiderChaine(statut)+"'" )+",remarque="+(remarque=="" ? "null" : "'"+ValiderChaine(remarque)+"'" )+"";
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
