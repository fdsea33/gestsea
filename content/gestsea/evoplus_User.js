/*************************************************
  REQUETES UTILSATEUR : Onglet : Evoplus
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Evoplus_Liste_des_evoplus0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 31

Id dans le tab: 1584;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1585;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1586;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1587;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1588;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1589;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1590;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1591;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1592;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1593;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1594;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1595;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1596;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1597;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1598;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1599;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1600;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1601;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1602;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1603;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1604;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1605;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1606;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1607;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1608;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1609;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1610;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1611;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1612;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1613;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 1614;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="table_evoplus";
 var CleMaitre = TAB_COMPO_PPTES[1579].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var source=GetValAt(1584);
 if (!ValiderChampsObligatoire(Table,"source",TAB_GLOBAL_COMPO[1584],source,false))
         return -1;
 if (!ValiderChampsType(Table,"source",TAB_GLOBAL_COMPO[1584],source))
         return -1;
 var numero=GetValAt(1585);
 if (!ValiderChampsObligatoire(Table,"numero",TAB_GLOBAL_COMPO[1585],numero,false))
         return -1;
 if (!ValiderChampsType(Table,"numero",TAB_GLOBAL_COMPO[1585],numero))
         return -1;
 var titre=GetValAt(1586);
 if (!ValiderChampsObligatoire(Table,"titre",TAB_GLOBAL_COMPO[1586],titre,false))
         return -1;
 if (!ValiderChampsType(Table,"titre",TAB_GLOBAL_COMPO[1586],titre))
         return -1;
 var nom=GetValAt(1587);
 if (!ValiderChampsObligatoire(Table,"nom",TAB_GLOBAL_COMPO[1587],nom,false))
         return -1;
 if (!ValiderChampsType(Table,"nom",TAB_GLOBAL_COMPO[1587],nom))
         return -1;
 var complement=GetValAt(1588);
 if (!ValiderChampsObligatoire(Table,"complement",TAB_GLOBAL_COMPO[1588],complement,false))
         return -1;
 if (!ValiderChampsType(Table,"complement",TAB_GLOBAL_COMPO[1588],complement))
         return -1;
 var ad1=GetValAt(1589);
 if (!ValiderChampsObligatoire(Table,"ad1",TAB_GLOBAL_COMPO[1589],ad1,false))
         return -1;
 if (!ValiderChampsType(Table,"ad1",TAB_GLOBAL_COMPO[1589],ad1))
         return -1;
 var ad2=GetValAt(1590);
 if (!ValiderChampsObligatoire(Table,"ad2",TAB_GLOBAL_COMPO[1590],ad2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad2",TAB_GLOBAL_COMPO[1590],ad2))
         return -1;
 var ad3=GetValAt(1591);
 if (!ValiderChampsObligatoire(Table,"ad3",TAB_GLOBAL_COMPO[1591],ad3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad3",TAB_GLOBAL_COMPO[1591],ad3))
         return -1;
 var cp=GetValAt(1592);
 if (!ValiderChampsObligatoire(Table,"cp",TAB_GLOBAL_COMPO[1592],cp,false))
         return -1;
 if (!ValiderChampsType(Table,"cp",TAB_GLOBAL_COMPO[1592],cp))
         return -1;
 var ville=GetValAt(1593);
 if (!ValiderChampsObligatoire(Table,"ville",TAB_GLOBAL_COMPO[1593],ville,false))
         return -1;
 if (!ValiderChampsType(Table,"ville",TAB_GLOBAL_COMPO[1593],ville))
         return -1;
 var naissance=GetValAt(1594);
 if (!ValiderChampsObligatoire(Table,"naissance",TAB_GLOBAL_COMPO[1594],naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"naissance",TAB_GLOBAL_COMPO[1594],naissance))
         return -1;
 var telephone=GetValAt(1595);
 if (!ValiderChampsObligatoire(Table,"telephone",TAB_GLOBAL_COMPO[1595],telephone,false))
         return -1;
 if (!ValiderChampsType(Table,"telephone",TAB_GLOBAL_COMPO[1595],telephone))
         return -1;
 var fax=GetValAt(1596);
 if (!ValiderChampsObligatoire(Table,"fax",TAB_GLOBAL_COMPO[1596],fax,false))
         return -1;
 if (!ValiderChampsType(Table,"fax",TAB_GLOBAL_COMPO[1596],fax))
         return -1;
 var portable=GetValAt(1597);
 if (!ValiderChampsObligatoire(Table,"portable",TAB_GLOBAL_COMPO[1597],portable,false))
         return -1;
 if (!ValiderChampsType(Table,"portable",TAB_GLOBAL_COMPO[1597],portable))
         return -1;
 var qualification=GetValAt(1598);
 if (!ValiderChampsObligatoire(Table,"qualification",TAB_GLOBAL_COMPO[1598],qualification,false))
         return -1;
 if (!ValiderChampsType(Table,"qualification",TAB_GLOBAL_COMPO[1598],qualification))
         return -1;
 var base_ht=GetValAt(1599);
 if (!ValiderChampsObligatoire(Table,"base_ht",TAB_GLOBAL_COMPO[1599],base_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"base_ht",TAB_GLOBAL_COMPO[1599],base_ht))
         return -1;
 var productions=GetValAt(1600);
 if (!ValiderChampsObligatoire(Table,"productions",TAB_GLOBAL_COMPO[1600],productions,false))
         return -1;
 if (!ValiderChampsType(Table,"productions",TAB_GLOBAL_COMPO[1600],productions))
         return -1;
 var hectares_nb=GetValAt(1601);
 if (!ValiderChampsObligatoire(Table,"hectares_nb",TAB_GLOBAL_COMPO[1601],hectares_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"hectares_nb",TAB_GLOBAL_COMPO[1601],hectares_nb))
         return -1;
 var salaries_nb=GetValAt(1602);
 if (!ValiderChampsObligatoire(Table,"salaries_nb",TAB_GLOBAL_COMPO[1602],salaries_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"salaries_nb",TAB_GLOBAL_COMPO[1602],salaries_nb))
         return -1;
 var sacea_ttc=GetValAt(1603);
 if (!ValiderChampsObligatoire(Table,"sacea_ttc",TAB_GLOBAL_COMPO[1603],sacea_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"sacea_ttc",TAB_GLOBAL_COMPO[1603],sacea_ttc))
         return -1;
 var cm_nb=GetValAt(1604);
 if (!ValiderChampsObligatoire(Table,"cm_nb",TAB_GLOBAL_COMPO[1604],cm_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_nb",TAB_GLOBAL_COMPO[1604],cm_nb))
         return -1;
 var cm_ht=GetValAt(1605);
 if (!ValiderChampsObligatoire(Table,"cm_ht",TAB_GLOBAL_COMPO[1605],cm_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_ht",TAB_GLOBAL_COMPO[1605],cm_ht))
         return -1;
 var cm_noms=GetValAt(1606);
 if (!ValiderChampsObligatoire(Table,"cm_noms",TAB_GLOBAL_COMPO[1606],cm_noms,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_noms",TAB_GLOBAL_COMPO[1606],cm_noms))
         return -1;
 var opt1=GetValAt(1607);
 if (!ValiderChampsObligatoire(Table,"opt1",TAB_GLOBAL_COMPO[1607],opt1,false))
         return -1;
 if (!ValiderChampsType(Table,"opt1",TAB_GLOBAL_COMPO[1607],opt1))
         return -1;
 var opt2=GetValAt(1608);
 if (!ValiderChampsObligatoire(Table,"opt2",TAB_GLOBAL_COMPO[1608],opt2,false))
         return -1;
 if (!ValiderChampsType(Table,"opt2",TAB_GLOBAL_COMPO[1608],opt2))
         return -1;
 var opt3=GetValAt(1609);
 if (!ValiderChampsObligatoire(Table,"opt3",TAB_GLOBAL_COMPO[1609],opt3,false))
         return -1;
 if (!ValiderChampsType(Table,"opt3",TAB_GLOBAL_COMPO[1609],opt3))
         return -1;
 var opt4=GetValAt(1610);
 if (!ValiderChampsObligatoire(Table,"opt4",TAB_GLOBAL_COMPO[1610],opt4,false))
         return -1;
 if (!ValiderChampsType(Table,"opt4",TAB_GLOBAL_COMPO[1610],opt4))
         return -1;
 var opt_num=GetValAt(1611);
 if (!ValiderChampsObligatoire(Table,"opt_num",TAB_GLOBAL_COMPO[1611],opt_num,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_num",TAB_GLOBAL_COMPO[1611],opt_num))
         return -1;
 var opt_ttc=GetValAt(1612);
 if (!ValiderChampsObligatoire(Table,"opt_ttc",TAB_GLOBAL_COMPO[1612],opt_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_ttc",TAB_GLOBAL_COMPO[1612],opt_ttc))
         return -1;
 var statut=GetValAt(1613);
 if (!ValiderChampsObligatoire(Table,"statut",TAB_GLOBAL_COMPO[1613],statut,false))
         return -1;
 if (!ValiderChampsType(Table,"statut",TAB_GLOBAL_COMPO[1613],statut))
         return -1;
 var remarque=GetValAt(1614);
 if (!ValiderChampsObligatoire(Table,"remarque",TAB_GLOBAL_COMPO[1614],remarque,false))
         return -1;
 if (!ValiderChampsType(Table,"remarque",TAB_GLOBAL_COMPO[1614],remarque))
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
 var source=GetValAt(1584);
 if (!ValiderChampsObligatoire(Table,"source",TAB_GLOBAL_COMPO[1584],source,false))
         return -1;
 if (!ValiderChampsType(Table,"source",TAB_GLOBAL_COMPO[1584],source))
         return -1;
 var numero=GetValAt(1585);
 if (!ValiderChampsObligatoire(Table,"numero",TAB_GLOBAL_COMPO[1585],numero,false))
         return -1;
 if (!ValiderChampsType(Table,"numero",TAB_GLOBAL_COMPO[1585],numero))
         return -1;
 var titre=GetValAt(1586);
 if (!ValiderChampsObligatoire(Table,"titre",TAB_GLOBAL_COMPO[1586],titre,false))
         return -1;
 if (!ValiderChampsType(Table,"titre",TAB_GLOBAL_COMPO[1586],titre))
         return -1;
 var nom=GetValAt(1587);
 if (!ValiderChampsObligatoire(Table,"nom",TAB_GLOBAL_COMPO[1587],nom,false))
         return -1;
 if (!ValiderChampsType(Table,"nom",TAB_GLOBAL_COMPO[1587],nom))
         return -1;
 var complement=GetValAt(1588);
 if (!ValiderChampsObligatoire(Table,"complement",TAB_GLOBAL_COMPO[1588],complement,false))
         return -1;
 if (!ValiderChampsType(Table,"complement",TAB_GLOBAL_COMPO[1588],complement))
         return -1;
 var ad1=GetValAt(1589);
 if (!ValiderChampsObligatoire(Table,"ad1",TAB_GLOBAL_COMPO[1589],ad1,false))
         return -1;
 if (!ValiderChampsType(Table,"ad1",TAB_GLOBAL_COMPO[1589],ad1))
         return -1;
 var ad2=GetValAt(1590);
 if (!ValiderChampsObligatoire(Table,"ad2",TAB_GLOBAL_COMPO[1590],ad2,false))
         return -1;
 if (!ValiderChampsType(Table,"ad2",TAB_GLOBAL_COMPO[1590],ad2))
         return -1;
 var ad3=GetValAt(1591);
 if (!ValiderChampsObligatoire(Table,"ad3",TAB_GLOBAL_COMPO[1591],ad3,false))
         return -1;
 if (!ValiderChampsType(Table,"ad3",TAB_GLOBAL_COMPO[1591],ad3))
         return -1;
 var cp=GetValAt(1592);
 if (!ValiderChampsObligatoire(Table,"cp",TAB_GLOBAL_COMPO[1592],cp,false))
         return -1;
 if (!ValiderChampsType(Table,"cp",TAB_GLOBAL_COMPO[1592],cp))
         return -1;
 var ville=GetValAt(1593);
 if (!ValiderChampsObligatoire(Table,"ville",TAB_GLOBAL_COMPO[1593],ville,false))
         return -1;
 if (!ValiderChampsType(Table,"ville",TAB_GLOBAL_COMPO[1593],ville))
         return -1;
 var naissance=GetValAt(1594);
 if (!ValiderChampsObligatoire(Table,"naissance",TAB_GLOBAL_COMPO[1594],naissance,false))
         return -1;
 if (!ValiderChampsType(Table,"naissance",TAB_GLOBAL_COMPO[1594],naissance))
         return -1;
 var telephone=GetValAt(1595);
 if (!ValiderChampsObligatoire(Table,"telephone",TAB_GLOBAL_COMPO[1595],telephone,false))
         return -1;
 if (!ValiderChampsType(Table,"telephone",TAB_GLOBAL_COMPO[1595],telephone))
         return -1;
 var fax=GetValAt(1596);
 if (!ValiderChampsObligatoire(Table,"fax",TAB_GLOBAL_COMPO[1596],fax,false))
         return -1;
 if (!ValiderChampsType(Table,"fax",TAB_GLOBAL_COMPO[1596],fax))
         return -1;
 var portable=GetValAt(1597);
 if (!ValiderChampsObligatoire(Table,"portable",TAB_GLOBAL_COMPO[1597],portable,false))
         return -1;
 if (!ValiderChampsType(Table,"portable",TAB_GLOBAL_COMPO[1597],portable))
         return -1;
 var qualification=GetValAt(1598);
 if (!ValiderChampsObligatoire(Table,"qualification",TAB_GLOBAL_COMPO[1598],qualification,false))
         return -1;
 if (!ValiderChampsType(Table,"qualification",TAB_GLOBAL_COMPO[1598],qualification))
         return -1;
 var base_ht=GetValAt(1599);
 if (!ValiderChampsObligatoire(Table,"base_ht",TAB_GLOBAL_COMPO[1599],base_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"base_ht",TAB_GLOBAL_COMPO[1599],base_ht))
         return -1;
 var productions=GetValAt(1600);
 if (!ValiderChampsObligatoire(Table,"productions",TAB_GLOBAL_COMPO[1600],productions,false))
         return -1;
 if (!ValiderChampsType(Table,"productions",TAB_GLOBAL_COMPO[1600],productions))
         return -1;
 var hectares_nb=GetValAt(1601);
 if (!ValiderChampsObligatoire(Table,"hectares_nb",TAB_GLOBAL_COMPO[1601],hectares_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"hectares_nb",TAB_GLOBAL_COMPO[1601],hectares_nb))
         return -1;
 var salaries_nb=GetValAt(1602);
 if (!ValiderChampsObligatoire(Table,"salaries_nb",TAB_GLOBAL_COMPO[1602],salaries_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"salaries_nb",TAB_GLOBAL_COMPO[1602],salaries_nb))
         return -1;
 var sacea_ttc=GetValAt(1603);
 if (!ValiderChampsObligatoire(Table,"sacea_ttc",TAB_GLOBAL_COMPO[1603],sacea_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"sacea_ttc",TAB_GLOBAL_COMPO[1603],sacea_ttc))
         return -1;
 var cm_nb=GetValAt(1604);
 if (!ValiderChampsObligatoire(Table,"cm_nb",TAB_GLOBAL_COMPO[1604],cm_nb,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_nb",TAB_GLOBAL_COMPO[1604],cm_nb))
         return -1;
 var cm_ht=GetValAt(1605);
 if (!ValiderChampsObligatoire(Table,"cm_ht",TAB_GLOBAL_COMPO[1605],cm_ht,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_ht",TAB_GLOBAL_COMPO[1605],cm_ht))
         return -1;
 var cm_noms=GetValAt(1606);
 if (!ValiderChampsObligatoire(Table,"cm_noms",TAB_GLOBAL_COMPO[1606],cm_noms,false))
         return -1;
 if (!ValiderChampsType(Table,"cm_noms",TAB_GLOBAL_COMPO[1606],cm_noms))
         return -1;
 var opt1=GetValAt(1607);
 if (!ValiderChampsObligatoire(Table,"opt1",TAB_GLOBAL_COMPO[1607],opt1,false))
         return -1;
 if (!ValiderChampsType(Table,"opt1",TAB_GLOBAL_COMPO[1607],opt1))
         return -1;
 var opt2=GetValAt(1608);
 if (!ValiderChampsObligatoire(Table,"opt2",TAB_GLOBAL_COMPO[1608],opt2,false))
         return -1;
 if (!ValiderChampsType(Table,"opt2",TAB_GLOBAL_COMPO[1608],opt2))
         return -1;
 var opt3=GetValAt(1609);
 if (!ValiderChampsObligatoire(Table,"opt3",TAB_GLOBAL_COMPO[1609],opt3,false))
         return -1;
 if (!ValiderChampsType(Table,"opt3",TAB_GLOBAL_COMPO[1609],opt3))
         return -1;
 var opt4=GetValAt(1610);
 if (!ValiderChampsObligatoire(Table,"opt4",TAB_GLOBAL_COMPO[1610],opt4,false))
         return -1;
 if (!ValiderChampsType(Table,"opt4",TAB_GLOBAL_COMPO[1610],opt4))
         return -1;
 var opt_num=GetValAt(1611);
 if (!ValiderChampsObligatoire(Table,"opt_num",TAB_GLOBAL_COMPO[1611],opt_num,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_num",TAB_GLOBAL_COMPO[1611],opt_num))
         return -1;
 var opt_ttc=GetValAt(1612);
 if (!ValiderChampsObligatoire(Table,"opt_ttc",TAB_GLOBAL_COMPO[1612],opt_ttc,false))
         return -1;
 if (!ValiderChampsType(Table,"opt_ttc",TAB_GLOBAL_COMPO[1612],opt_ttc))
         return -1;
 var statut=GetValAt(1613);
 if (!ValiderChampsObligatoire(Table,"statut",TAB_GLOBAL_COMPO[1613],statut,false))
         return -1;
 if (!ValiderChampsType(Table,"statut",TAB_GLOBAL_COMPO[1613],statut))
         return -1;
 var remarque=GetValAt(1614);
 if (!ValiderChampsObligatoire(Table,"remarque",TAB_GLOBAL_COMPO[1614],remarque,false))
         return -1;
 if (!ValiderChampsType(Table,"remarque",TAB_GLOBAL_COMPO[1614],remarque))
         return -1;
 var Req="update "+Table+" set ";
 Req+="source="+(source=="" ? "null" : "'"+ValiderChaine(source)+"'" )+",numero="+(numero=="" ? "null" : "'"+ValiderChaine(numero)+"'" )+",titre="+(titre=="" ? "null" : "'"+ValiderChaine(titre)+"'" )+",nom="+(nom=="" ? "null" : "'"+ValiderChaine(nom)+"'" )+",complement="+(complement=="" ? "null" : "'"+ValiderChaine(complement)+"'" )+",ad1="+(ad1=="" ? "null" : "'"+ValiderChaine(ad1)+"'" )+",ad2="+(ad2=="" ? "null" : "'"+ValiderChaine(ad2)+"'" )+",ad3="+(ad3=="" ? "null" : "'"+ValiderChaine(ad3)+"'" )+",cp="+(cp=="" ? "null" : "'"+ValiderChaine(cp)+"'" )+",ville="+(ville=="" ? "null" : "'"+ValiderChaine(ville)+"'" )+",naissance="+(naissance=="" ? "null" : "'"+ValiderChaine(naissance)+"'" )+",telephone="+(telephone=="" ? "null" : "'"+ValiderChaine(telephone)+"'" )+",fax="+(fax=="" ? "null" : "'"+ValiderChaine(fax)+"'" )+",portable="+(portable=="" ? "null" : "'"+ValiderChaine(portable)+"'" )+",qualification="+(qualification=="" ? "null" : "'"+ValiderChaine(qualification)+"'" )+",base_ht="+(base_ht=="" ? "null" : "'"+ValiderChaine(base_ht)+"'" )+",productions="+(productions=="" ? "null" : "'"+ValiderChaine(productions)+"'" )+",hectares_nb="+(hectares_nb=="" ? "null" : "'"+ValiderChaine(hectares_nb)+"'" )+",salaries_nb="+(salaries_nb=="" ? "null" : "'"+ValiderChaine(salaries_nb)+"'" )+",sacea_ttc="+(sacea_ttc=="" ? "null" : "'"+ValiderChaine(sacea_ttc)+"'" )+",cm_nb="+(cm_nb=="" ? "null" : "'"+ValiderChaine(cm_nb)+"'" )+",cm_ht="+(cm_ht=="" ? "null" : "'"+ValiderChaine(cm_ht)+"'" )+",cm_noms="+(cm_noms=="" ? "null" : "'"+ValiderChaine(cm_noms)+"'" )+",opt1="+(opt1=="" ? "null" : "'"+ValiderChaine(opt1)+"'" )+",opt2="+(opt2=="" ? "null" : "'"+ValiderChaine(opt2)+"'" )+",opt3="+(opt3=="" ? "null" : "'"+ValiderChaine(opt3)+"'" )+",opt4="+(opt4=="" ? "null" : "'"+ValiderChaine(opt4)+"'" )+",opt_num="+(opt_num=="" ? "null" : "'"+ValiderChaine(opt_num)+"'" )+",opt_ttc="+(opt_ttc=="" ? "null" : "'"+ValiderChaine(opt_ttc)+"'" )+",statut="+(statut=="" ? "null" : "'"+ValiderChaine(statut)+"'" )+",remarque="+(remarque=="" ? "null" : "'"+ValiderChaine(remarque)+"'" )+"";
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
