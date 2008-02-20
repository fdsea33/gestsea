/*************************************************
  REQUETES UTILSATEUR : Onglet : Exercice
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Exercice_Liste_des_exercices_comptables0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 6

Id dans le tab: 691;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 692;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 693;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 694;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 695;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 696;
complexe
Nbr Jointure: 1;
    Joint n° 0 = piece,ex_numero,ex_numero

******************
*/

 var Table="exercice";
 var CleMaitre = TAB_COMPO_PPTES[688].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ex_datedebut=GetValAt(691);
 if (!ValiderChampsObligatoire(Table,"ex_datedebut",TAB_GLOBAL_COMPO[691],ex_datedebut,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_datedebut",TAB_GLOBAL_COMPO[691],ex_datedebut))
         return -1;
 var ex_datefin=GetValAt(692);
 if (!ValiderChampsObligatoire(Table,"ex_datefin",TAB_GLOBAL_COMPO[692],ex_datefin,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_datefin",TAB_GLOBAL_COMPO[692],ex_datefin))
         return -1;
 var ex_cloture=GetValAt(693);
 if (!ValiderChampsObligatoire(Table,"ex_cloture",TAB_GLOBAL_COMPO[693],ex_cloture,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_cloture",TAB_GLOBAL_COMPO[693],ex_cloture))
         return -1;
 var ex_compteattente=GetValAt(694);
 if (!ValiderChampsObligatoire(Table,"ex_compteattente",TAB_GLOBAL_COMPO[694],ex_compteattente,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_compteattente",TAB_GLOBAL_COMPO[694],ex_compteattente))
         return -1;
 var ex_actif=GetValAt(695);
 if (!ValiderChampsObligatoire(Table,"ex_actif",TAB_GLOBAL_COMPO[695],ex_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_actif",TAB_GLOBAL_COMPO[695],ex_actif))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",ex_datedebut,ex_datefin,ex_cloture,ex_compteattente,ex_actif"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ex_datedebut=="" ? "null" : "'"+ValiderChaine(ex_datedebut)+"'" )+","+(ex_datefin=="" ? "null" : "'"+ValiderChaine(ex_datefin)+"'" )+","+(ex_cloture=="true" ? "true" : "false")+","+(ex_compteattente=="" ? "null" : "'"+ValiderChaine(ex_compteattente)+"'" )+","+(ex_actif=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Exercice
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Exercice_Liste_des_exercices_comptables0(Compo_Maitre)
{
 var Table="exercice";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Exercice
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Exercice_Liste_des_exercices_comptables0(Compo_Maitre)
{
 var Table="exercice";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ex_datedebut=GetValAt(691);
 if (!ValiderChampsObligatoire(Table,"ex_datedebut",TAB_GLOBAL_COMPO[691],ex_datedebut,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_datedebut",TAB_GLOBAL_COMPO[691],ex_datedebut))
         return -1;
 var ex_datefin=GetValAt(692);
 if (!ValiderChampsObligatoire(Table,"ex_datefin",TAB_GLOBAL_COMPO[692],ex_datefin,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_datefin",TAB_GLOBAL_COMPO[692],ex_datefin))
         return -1;
 var ex_cloture=GetValAt(693);
 if (!ValiderChampsObligatoire(Table,"ex_cloture",TAB_GLOBAL_COMPO[693],ex_cloture,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_cloture",TAB_GLOBAL_COMPO[693],ex_cloture))
         return -1;
 var ex_compteattente=GetValAt(694);
 if (!ValiderChampsObligatoire(Table,"ex_compteattente",TAB_GLOBAL_COMPO[694],ex_compteattente,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_compteattente",TAB_GLOBAL_COMPO[694],ex_compteattente))
         return -1;
 var ex_actif=GetValAt(695);
 if (!ValiderChampsObligatoire(Table,"ex_actif",TAB_GLOBAL_COMPO[695],ex_actif,false))
         return -1;
 if (!ValiderChampsType(Table,"ex_actif",TAB_GLOBAL_COMPO[695],ex_actif))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ex_datedebut="+(ex_datedebut=="" ? "null" : "'"+ValiderChaine(ex_datedebut)+"'" )+",ex_datefin="+(ex_datefin=="" ? "null" : "'"+ValiderChaine(ex_datefin)+"'" )+",ex_cloture="+(ex_cloture=="true" ? "true" : "false")+",ex_compteattente="+(ex_compteattente=="" ? "null" : "'"+ValiderChaine(ex_compteattente)+"'" )+",ex_actif="+(ex_actif=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Journaux
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Journaux_Liste_des_journaux0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 8

Id dans le tab: 708;
simple
Nbr Jointure: 1;
    Joint n° 0 = typejournal,tj_numero,tj_numero

Id dans le tab: 709;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 710;
simple
Nbr Jointure: PAS DE JOINTURE;

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
Nbr Jointure: 1;
    Joint n° 0 = comptegen,cg_numero,cg_numero

Id dans le tab: 715;
complexe
Nbr Jointure: 1;
    Joint n° 0 = piece,jo_numero,jo_numero

******************
*/

 var Table="journal";
 var CleMaitre = TAB_COMPO_PPTES[703].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tj_numero=GetValAt(708);
 if (tj_numero=="-1")
    tj_numero="null";
 if (!ValiderChampsObligatoire(Table,"tj_numero",TAB_GLOBAL_COMPO[708],tj_numero,true))
         return -1;
 var jo_abbrev=GetValAt(709);
 if (!ValiderChampsObligatoire(Table,"jo_abbrev",TAB_GLOBAL_COMPO[709],jo_abbrev,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_abbrev",TAB_GLOBAL_COMPO[709],jo_abbrev))
         return -1;
 var jo_libelle=GetValAt(710);
 if (!ValiderChampsObligatoire(Table,"jo_libelle",TAB_GLOBAL_COMPO[710],jo_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_libelle",TAB_GLOBAL_COMPO[710],jo_libelle))
         return -1;
 var jo_provisoire=GetValAt(711);
 if (!ValiderChampsObligatoire(Table,"jo_provisoire",TAB_GLOBAL_COMPO[711],jo_provisoire,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_provisoire",TAB_GLOBAL_COMPO[711],jo_provisoire))
         return -1;
 var jo_visible=GetValAt(712);
 if (!ValiderChampsObligatoire(Table,"jo_visible",TAB_GLOBAL_COMPO[712],jo_visible,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_visible",TAB_GLOBAL_COMPO[712],jo_visible))
         return -1;
 var jo_contrepartie=GetValAt(713);
 if (!ValiderChampsObligatoire(Table,"jo_contrepartie",TAB_GLOBAL_COMPO[713],jo_contrepartie,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_contrepartie",TAB_GLOBAL_COMPO[713],jo_contrepartie))
         return -1;
 var cg_numero=GetValAt(714);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[714],cg_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",tj_numero,jo_abbrev,jo_libelle,jo_provisoire,jo_visible,jo_contrepartie,cg_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+tj_numero+","+(jo_abbrev=="" ? "null" : "'"+ValiderChaine(jo_abbrev)+"'" )+","+(jo_libelle=="" ? "null" : "'"+ValiderChaine(jo_libelle)+"'" )+","+(jo_provisoire=="true" ? "true" : "false")+","+(jo_visible=="true" ? "true" : "false")+","+(jo_contrepartie=="true" ? "true" : "false")+","+cg_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Journaux
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Journaux_Liste_des_journaux0(Compo_Maitre)
{
 var Table="journal";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Journaux
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Journaux_Liste_des_journaux0(Compo_Maitre)
{
 var Table="journal";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var tj_numero=GetValAt(708);
 if (tj_numero=="-1")
    tj_numero="null";
 if (!ValiderChampsObligatoire(Table,"tj_numero",TAB_GLOBAL_COMPO[708],tj_numero,true))
         return -1;
 var jo_abbrev=GetValAt(709);
 if (!ValiderChampsObligatoire(Table,"jo_abbrev",TAB_GLOBAL_COMPO[709],jo_abbrev,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_abbrev",TAB_GLOBAL_COMPO[709],jo_abbrev))
         return -1;
 var jo_libelle=GetValAt(710);
 if (!ValiderChampsObligatoire(Table,"jo_libelle",TAB_GLOBAL_COMPO[710],jo_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_libelle",TAB_GLOBAL_COMPO[710],jo_libelle))
         return -1;
 var jo_provisoire=GetValAt(711);
 if (!ValiderChampsObligatoire(Table,"jo_provisoire",TAB_GLOBAL_COMPO[711],jo_provisoire,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_provisoire",TAB_GLOBAL_COMPO[711],jo_provisoire))
         return -1;
 var jo_visible=GetValAt(712);
 if (!ValiderChampsObligatoire(Table,"jo_visible",TAB_GLOBAL_COMPO[712],jo_visible,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_visible",TAB_GLOBAL_COMPO[712],jo_visible))
         return -1;
 var jo_contrepartie=GetValAt(713);
 if (!ValiderChampsObligatoire(Table,"jo_contrepartie",TAB_GLOBAL_COMPO[713],jo_contrepartie,false))
         return -1;
 if (!ValiderChampsType(Table,"jo_contrepartie",TAB_GLOBAL_COMPO[713],jo_contrepartie))
         return -1;
 var cg_numero=GetValAt(714);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[714],cg_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="tj_numero="+tj_numero+",jo_abbrev="+(jo_abbrev=="" ? "null" : "'"+ValiderChaine(jo_abbrev)+"'" )+",jo_libelle="+(jo_libelle=="" ? "null" : "'"+ValiderChaine(jo_libelle)+"'" )+",jo_provisoire="+(jo_provisoire=="true" ? "true" : "false")+",jo_visible="+(jo_visible=="true" ? "true" : "false")+",jo_contrepartie="+(jo_contrepartie=="true" ? "true" : "false")+",cg_numero="+cg_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Pièces
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Pièces_Liste_des_pièces_comptables0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 728;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 729;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 730;
complexe
Nbr Jointure: 1;
    Joint n° 0 = ecriture,pi_numero,pi_numero

******************
*/

 var Table="piece";
 var CleMaitre = TAB_COMPO_PPTES[722].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pi_libelle=GetValAt(728);
 if (!ValiderChampsObligatoire(Table,"pi_libelle",TAB_GLOBAL_COMPO[728],pi_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"pi_libelle",TAB_GLOBAL_COMPO[728],pi_libelle))
         return -1;
 var pi_date=GetValAt(729);
 if (!ValiderChampsObligatoire(Table,"pi_date",TAB_GLOBAL_COMPO[729],pi_date,false))
         return -1;
 if (!ValiderChampsType(Table,"pi_date",TAB_GLOBAL_COMPO[729],pi_date))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(715);
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
 Req+="("+NomCleMaitre+",pi_libelle,pi_date"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(pi_libelle=="" ? "null" : "'"+ValiderChaine(pi_libelle)+"'" )+","+(pi_date=="" ? "null" : "'"+ValiderChaine(pi_date)+"'" )+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
  REQUETES UTILSATEUR : Onglet : Pièces
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Pièces_Liste_des_pièces_comptables0(Compo_Maitre)
{
 var Table="piece";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(715);
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
  REQUETES UTILSATEUR : Onglet : Pièces
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Pièces_Liste_des_pièces_comptables0(Compo_Maitre)
{
 var Table="piece";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var pi_libelle=GetValAt(728);
 if (!ValiderChampsObligatoire(Table,"pi_libelle",TAB_GLOBAL_COMPO[728],pi_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"pi_libelle",TAB_GLOBAL_COMPO[728],pi_libelle))
         return -1;
 var pi_date=GetValAt(729);
 if (!ValiderChampsObligatoire(Table,"pi_date",TAB_GLOBAL_COMPO[729],pi_date,false))
         return -1;
 if (!ValiderChampsType(Table,"pi_date",TAB_GLOBAL_COMPO[729],pi_date))
         return -1;
 var Req="update "+Table+" set ";
 Req+="pi_libelle="+(pi_libelle=="" ? "null" : "'"+ValiderChaine(pi_libelle)+"'" )+",pi_date="+(pi_date=="" ? "null" : "'"+ValiderChaine(pi_date)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Pièces
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Pièces_Écritures_3(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 7

Id dans le tab: 737;
simple
Nbr Jointure: 1;
    Joint n° 0 = comptegen,cg_numero,cg_numero

Id dans le tab: 738;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 739;
simple
Nbr Jointure: 1;
    Joint n° 0 = compteaux,ca_numero,ca_numero

Id dans le tab: 740;
simple
Nbr Jointure: 1;
    Joint n° 0 = prefixe,pf_numero,pf_numero

Id dans le tab: 741;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 742;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 743;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="ecriture";
 var CleMaitre = TAB_COMPO_PPTES[730].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var cg_numero=GetValAt(737);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[737],cg_numero,true))
         return -1;
 var ec_aux=GetValAt(738);
 if (!ValiderChampsObligatoire(Table,"ec_aux",TAB_GLOBAL_COMPO[738],ec_aux,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_aux",TAB_GLOBAL_COMPO[738],ec_aux))
         return -1;
 var ca_numero=GetValAt(739);
 if (ca_numero=="-1")
    ca_numero="null";
 if (!ValiderChampsObligatoire(Table,"ca_numero",TAB_GLOBAL_COMPO[739],ca_numero,true))
         return -1;
 var pf_numero=GetValAt(740);
 if (pf_numero=="-1")
    pf_numero="null";
 if (!ValiderChampsObligatoire(Table,"pf_numero",TAB_GLOBAL_COMPO[740],pf_numero,true))
         return -1;
 var ec_libelle=GetValAt(741);
 if (!ValiderChampsObligatoire(Table,"ec_libelle",TAB_GLOBAL_COMPO[741],ec_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_libelle",TAB_GLOBAL_COMPO[741],ec_libelle))
         return -1;
 var ec_debit=GetValAt(742);
 if (!ValiderChampsObligatoire(Table,"ec_debit",TAB_GLOBAL_COMPO[742],ec_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_debit",TAB_GLOBAL_COMPO[742],ec_debit))
         return -1;
 var ec_credit=GetValAt(743);
 if (!ValiderChampsObligatoire(Table,"ec_credit",TAB_GLOBAL_COMPO[743],ec_credit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_credit",TAB_GLOBAL_COMPO[743],ec_credit))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",pi_numero,cg_numero,ec_aux,ca_numero,pf_numero,ec_libelle,ec_debit,ec_credit"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[722].NewCle+","+cg_numero+","+(ec_aux=="true" ? "true" : "false")+","+ca_numero+","+pf_numero+","+(ec_libelle=="" ? "null" : "'"+ValiderChaine(ec_libelle)+"'" )+","+(ec_debit=="" ? "null" : "'"+ValiderChaine(ec_debit)+"'" )+","+(ec_credit=="" ? "null" : "'"+ValiderChaine(ec_credit)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Pièces
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Pièces_Écritures_3(Compo_Maitre)
{
 var Table="ecriture";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Pièces
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Pièces_Écritures_3(Compo_Maitre)
{
 var Table="ecriture";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cg_numero=GetValAt(737);
 if (cg_numero=="-1")
    cg_numero="null";
 if (!ValiderChampsObligatoire(Table,"cg_numero",TAB_GLOBAL_COMPO[737],cg_numero,true))
         return -1;
 var ec_aux=GetValAt(738);
 if (!ValiderChampsObligatoire(Table,"ec_aux",TAB_GLOBAL_COMPO[738],ec_aux,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_aux",TAB_GLOBAL_COMPO[738],ec_aux))
         return -1;
 var ca_numero=GetValAt(739);
 if (ca_numero=="-1")
    ca_numero="null";
 if (!ValiderChampsObligatoire(Table,"ca_numero",TAB_GLOBAL_COMPO[739],ca_numero,true))
         return -1;
 var pf_numero=GetValAt(740);
 if (pf_numero=="-1")
    pf_numero="null";
 if (!ValiderChampsObligatoire(Table,"pf_numero",TAB_GLOBAL_COMPO[740],pf_numero,true))
         return -1;
 var ec_libelle=GetValAt(741);
 if (!ValiderChampsObligatoire(Table,"ec_libelle",TAB_GLOBAL_COMPO[741],ec_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_libelle",TAB_GLOBAL_COMPO[741],ec_libelle))
         return -1;
 var ec_debit=GetValAt(742);
 if (!ValiderChampsObligatoire(Table,"ec_debit",TAB_GLOBAL_COMPO[742],ec_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_debit",TAB_GLOBAL_COMPO[742],ec_debit))
         return -1;
 var ec_credit=GetValAt(743);
 if (!ValiderChampsObligatoire(Table,"ec_credit",TAB_GLOBAL_COMPO[743],ec_credit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_credit",TAB_GLOBAL_COMPO[743],ec_credit))
         return -1;
 var Req="update "+Table+" set ";
 Req+="cg_numero="+cg_numero+",ec_aux="+(ec_aux=="true" ? "true" : "false")+",ca_numero="+ca_numero+",pf_numero="+pf_numero+",ec_libelle="+(ec_libelle=="" ? "null" : "'"+ValiderChaine(ec_libelle)+"'" )+",ec_debit="+(ec_debit=="" ? "null" : "'"+ValiderChaine(ec_debit)+"'" )+",ec_credit="+(ec_credit=="" ? "null" : "'"+ValiderChaine(ec_credit)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Ecritures
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Ecritures_Liste_des_écritures_comptables0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 6

Id dans le tab: 749;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 750;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 751;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 752;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 753;
simple
Nbr Jointure: 1;
    Joint n° 0 = pointage,pt_numero,pt_numero

Id dans le tab: 754;
simple
Nbr Jointure: 1;
    Joint n° 0 = lettrage,lt_numero,lt_numero

******************
*/

 var Table="ecriture";
 var CleMaitre = TAB_COMPO_PPTES[744].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ec_libelle=GetValAt(749);
 if (!ValiderChampsObligatoire(Table,"ec_libelle",TAB_GLOBAL_COMPO[749],ec_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_libelle",TAB_GLOBAL_COMPO[749],ec_libelle))
         return -1;
 var ec_compte=GetValAt(750);
 if (!ValiderChampsObligatoire(Table,"ec_compte",TAB_GLOBAL_COMPO[750],ec_compte,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_compte",TAB_GLOBAL_COMPO[750],ec_compte))
         return -1;
 var ec_debit=GetValAt(751);
 if (!ValiderChampsObligatoire(Table,"ec_debit",TAB_GLOBAL_COMPO[751],ec_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_debit",TAB_GLOBAL_COMPO[751],ec_debit))
         return -1;
 var ec_credit=GetValAt(752);
 if (!ValiderChampsObligatoire(Table,"ec_credit",TAB_GLOBAL_COMPO[752],ec_credit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_credit",TAB_GLOBAL_COMPO[752],ec_credit))
         return -1;
 var pt_numero=GetValAt(753);
 if (pt_numero=="-1")
    pt_numero="null";
 if (!ValiderChampsObligatoire(Table,"pt_numero",TAB_GLOBAL_COMPO[753],pt_numero,true))
         return -1;
 var lt_numero=GetValAt(754);
 if (lt_numero=="-1")
    lt_numero="null";
 if (!ValiderChampsObligatoire(Table,"lt_numero",TAB_GLOBAL_COMPO[754],lt_numero,true))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(788);
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
 Req+="("+NomCleMaitre+",ec_libelle,ec_compte,ec_debit,ec_credit,pt_numero,lt_numero"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ec_libelle=="" ? "null" : "'"+ValiderChaine(ec_libelle)+"'" )+","+(ec_compte=="" ? "null" : "'"+ValiderChaine(ec_compte)+"'" )+","+(ec_debit=="" ? "null" : "'"+ValiderChaine(ec_debit)+"'" )+","+(ec_credit=="" ? "null" : "'"+ValiderChaine(ec_credit)+"'" )+","+pt_numero+","+lt_numero+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
  REQUETES UTILSATEUR : Onglet : Ecritures
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Ecritures_Liste_des_écritures_comptables0(Compo_Maitre)
{
 var Table="ecriture";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(788);
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
  REQUETES UTILSATEUR : Onglet : Ecritures
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Ecritures_Liste_des_écritures_comptables0(Compo_Maitre)
{
 var Table="ecriture";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ec_libelle=GetValAt(749);
 if (!ValiderChampsObligatoire(Table,"ec_libelle",TAB_GLOBAL_COMPO[749],ec_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_libelle",TAB_GLOBAL_COMPO[749],ec_libelle))
         return -1;
 var ec_compte=GetValAt(750);
 if (!ValiderChampsObligatoire(Table,"ec_compte",TAB_GLOBAL_COMPO[750],ec_compte,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_compte",TAB_GLOBAL_COMPO[750],ec_compte))
         return -1;
 var ec_debit=GetValAt(751);
 if (!ValiderChampsObligatoire(Table,"ec_debit",TAB_GLOBAL_COMPO[751],ec_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_debit",TAB_GLOBAL_COMPO[751],ec_debit))
         return -1;
 var ec_credit=GetValAt(752);
 if (!ValiderChampsObligatoire(Table,"ec_credit",TAB_GLOBAL_COMPO[752],ec_credit,false))
         return -1;
 if (!ValiderChampsType(Table,"ec_credit",TAB_GLOBAL_COMPO[752],ec_credit))
         return -1;
 var pt_numero=GetValAt(753);
 if (pt_numero=="-1")
    pt_numero="null";
 if (!ValiderChampsObligatoire(Table,"pt_numero",TAB_GLOBAL_COMPO[753],pt_numero,true))
         return -1;
 var lt_numero=GetValAt(754);
 if (lt_numero=="-1")
    lt_numero="null";
 if (!ValiderChampsObligatoire(Table,"lt_numero",TAB_GLOBAL_COMPO[754],lt_numero,true))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ec_libelle="+(ec_libelle=="" ? "null" : "'"+ValiderChaine(ec_libelle)+"'" )+",ec_compte="+(ec_compte=="" ? "null" : "'"+ValiderChaine(ec_compte)+"'" )+",ec_debit="+(ec_debit=="" ? "null" : "'"+ValiderChaine(ec_debit)+"'" )+",ec_credit="+(ec_credit=="" ? "null" : "'"+ValiderChaine(ec_credit)+"'" )+",pt_numero="+pt_numero+",lt_numero="+lt_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Comptes généraux
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Comptes_généraux_Liste_des_comptes_généraux0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 11

Id dans le tab: 760;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 761;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 762;
simple
Nbr Jointure: 1;
    Joint n° 0 = acces,ac_numero,ac_numero

Id dans le tab: 763;
simple
Nbr Jointure: PAS DE JOINTURE;

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
    Joint n° 0 = compteaux,cg_numero,cg_numero

Id dans le tab: 773;
complexe
Nbr Jointure: 1;
    Joint n° 0 = ecriture,cg_numero,cg_numero

******************
*/

 var Table="comptegen";
 var CleMaitre = TAB_COMPO_PPTES[755].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cg_numcompte=GetValAt(760);
 if (!ValiderChampsObligatoire(Table,"cg_numcompte",TAB_GLOBAL_COMPO[760],cg_numcompte,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_numcompte",TAB_GLOBAL_COMPO[760],cg_numcompte))
         return -1;
 var cg_libelle=GetValAt(761);
 if (!ValiderChampsObligatoire(Table,"cg_libelle",TAB_GLOBAL_COMPO[761],cg_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_libelle",TAB_GLOBAL_COMPO[761],cg_libelle))
         return -1;
 var ac_numero=GetValAt(762);
 if (ac_numero=="-1")
    ac_numero="null";
 if (!ValiderChampsObligatoire(Table,"ac_numero",TAB_GLOBAL_COMPO[762],ac_numero,true))
         return -1;
 var cg_accepteaux=GetValAt(763);
 if (!ValiderChampsObligatoire(Table,"cg_accepteaux",TAB_GLOBAL_COMPO[763],cg_accepteaux,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_accepteaux",TAB_GLOBAL_COMPO[763],cg_accepteaux))
         return -1;
 var cg_utilisable=GetValAt(764);
 if (!ValiderChampsObligatoire(Table,"cg_utilisable",TAB_GLOBAL_COMPO[764],cg_utilisable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_utilisable",TAB_GLOBAL_COMPO[764],cg_utilisable))
         return -1;
 var cg_lettrable=GetValAt(765);
 if (!ValiderChampsObligatoire(Table,"cg_lettrable",TAB_GLOBAL_COMPO[765],cg_lettrable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_lettrable",TAB_GLOBAL_COMPO[765],cg_lettrable))
         return -1;
 var cg_pointable=GetValAt(766);
 if (!ValiderChampsObligatoire(Table,"cg_pointable",TAB_GLOBAL_COMPO[766],cg_pointable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_pointable",TAB_GLOBAL_COMPO[766],cg_pointable))
         return -1;
 var cg_groupable=GetValAt(767);
 if (!ValiderChampsObligatoire(Table,"cg_groupable",TAB_GLOBAL_COMPO[767],cg_groupable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_groupable",TAB_GLOBAL_COMPO[767],cg_groupable))
         return -1;
 var cg_debit=GetValAt(768);
 if (!ValiderChampsObligatoire(Table,"cg_debit",TAB_GLOBAL_COMPO[768],cg_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_debit",TAB_GLOBAL_COMPO[768],cg_debit))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",cg_numcompte,cg_libelle,ac_numero,cg_accepteaux,cg_utilisable,cg_lettrable,cg_pointable,cg_groupable,cg_debit"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(cg_numcompte=="" ? "null" : "'"+ValiderChaine(cg_numcompte)+"'" )+","+(cg_libelle=="" ? "null" : "'"+ValiderChaine(cg_libelle)+"'" )+","+ac_numero+","+(cg_accepteaux=="true" ? "true" : "false")+","+(cg_utilisable=="true" ? "true" : "false")+","+(cg_lettrable=="true" ? "true" : "false")+","+(cg_pointable=="true" ? "true" : "false")+","+(cg_groupable=="true" ? "true" : "false")+","+(cg_debit=="true" ? "true" : "false")+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
        alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Comptes généraux
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Comptes_généraux_Liste_des_comptes_généraux0(Compo_Maitre)
{
 var Table="comptegen";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Comptes généraux
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Comptes_généraux_Liste_des_comptes_généraux0(Compo_Maitre)
{
 var Table="comptegen";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var cg_numcompte=GetValAt(760);
 if (!ValiderChampsObligatoire(Table,"cg_numcompte",TAB_GLOBAL_COMPO[760],cg_numcompte,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_numcompte",TAB_GLOBAL_COMPO[760],cg_numcompte))
         return -1;
 var cg_libelle=GetValAt(761);
 if (!ValiderChampsObligatoire(Table,"cg_libelle",TAB_GLOBAL_COMPO[761],cg_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_libelle",TAB_GLOBAL_COMPO[761],cg_libelle))
         return -1;
 var ac_numero=GetValAt(762);
 if (ac_numero=="-1")
    ac_numero="null";
 if (!ValiderChampsObligatoire(Table,"ac_numero",TAB_GLOBAL_COMPO[762],ac_numero,true))
         return -1;
 var cg_accepteaux=GetValAt(763);
 if (!ValiderChampsObligatoire(Table,"cg_accepteaux",TAB_GLOBAL_COMPO[763],cg_accepteaux,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_accepteaux",TAB_GLOBAL_COMPO[763],cg_accepteaux))
         return -1;
 var cg_utilisable=GetValAt(764);
 if (!ValiderChampsObligatoire(Table,"cg_utilisable",TAB_GLOBAL_COMPO[764],cg_utilisable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_utilisable",TAB_GLOBAL_COMPO[764],cg_utilisable))
         return -1;
 var cg_lettrable=GetValAt(765);
 if (!ValiderChampsObligatoire(Table,"cg_lettrable",TAB_GLOBAL_COMPO[765],cg_lettrable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_lettrable",TAB_GLOBAL_COMPO[765],cg_lettrable))
         return -1;
 var cg_pointable=GetValAt(766);
 if (!ValiderChampsObligatoire(Table,"cg_pointable",TAB_GLOBAL_COMPO[766],cg_pointable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_pointable",TAB_GLOBAL_COMPO[766],cg_pointable))
         return -1;
 var cg_groupable=GetValAt(767);
 if (!ValiderChampsObligatoire(Table,"cg_groupable",TAB_GLOBAL_COMPO[767],cg_groupable,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_groupable",TAB_GLOBAL_COMPO[767],cg_groupable))
         return -1;
 var cg_debit=GetValAt(768);
 if (!ValiderChampsObligatoire(Table,"cg_debit",TAB_GLOBAL_COMPO[768],cg_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"cg_debit",TAB_GLOBAL_COMPO[768],cg_debit))
         return -1;
 var Req="update "+Table+" set ";
 Req+="cg_numcompte="+(cg_numcompte=="" ? "null" : "'"+ValiderChaine(cg_numcompte)+"'" )+",cg_libelle="+(cg_libelle=="" ? "null" : "'"+ValiderChaine(cg_libelle)+"'" )+",ac_numero="+ac_numero+",cg_accepteaux="+(cg_accepteaux=="true" ? "true" : "false")+",cg_utilisable="+(cg_utilisable=="true" ? "true" : "false")+",cg_lettrable="+(cg_lettrable=="true" ? "true" : "false")+",cg_pointable="+(cg_pointable=="true" ? "true" : "false")+",cg_groupable="+(cg_groupable=="true" ? "true" : "false")+",cg_debit="+(cg_debit=="true" ? "true" : "false")+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
        alert("Echec lors de la mise à jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Comptes auxiliaires
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 5

Id dans le tab: 784;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 785;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 786;
simple
Nbr Jointure: 1;
    Joint n° 0 = acces,ac_numero,ac_numero

Id dans le tab: 787;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 788;
complexe
Nbr Jointure: 1;
    Joint n° 0 = ecriture,ca_numero,ca_numero

******************
*/

 var Table="compteaux";
 var CleMaitre = TAB_COMPO_PPTES[779].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ca_numcompte=GetValAt(784);
 if (!ValiderChampsObligatoire(Table,"ca_numcompte",TAB_GLOBAL_COMPO[784],ca_numcompte,false))
         return -1;
 if (!ValiderChampsType(Table,"ca_numcompte",TAB_GLOBAL_COMPO[784],ca_numcompte))
         return -1;
 var ca_libelle=GetValAt(785);
 if (!ValiderChampsObligatoire(Table,"ca_libelle",TAB_GLOBAL_COMPO[785],ca_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ca_libelle",TAB_GLOBAL_COMPO[785],ca_libelle))
         return -1;
 var ac_numero=GetValAt(786);
 if (ac_numero=="-1")
    ac_numero="null";
 if (!ValiderChampsObligatoire(Table,"ac_numero",TAB_GLOBAL_COMPO[786],ac_numero,true))
         return -1;
 var ca_debit=GetValAt(787);
 if (!ValiderChampsObligatoire(Table,"ca_debit",TAB_GLOBAL_COMPO[787],ca_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"ca_debit",TAB_GLOBAL_COMPO[787],ca_debit))
         return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
var Asso11=false;
var TabAsso11=new Array();
var CompoLie = GetSQLCompoAt(769);
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
 Req+="("+NomCleMaitre+",ca_numcompte,ca_libelle,ac_numero,ca_debit"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(ca_numcompte=="" ? "null" : "'"+ValiderChaine(ca_numcompte)+"'" )+","+(ca_libelle=="" ? "null" : "'"+ValiderChaine(ca_libelle)+"'" )+","+ac_numero+","+(ca_debit=="true" ? "true" : "false")+""+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

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
  REQUETES UTILSATEUR : Onglet : Comptes auxiliaires
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(Compo_Maitre)
{
 var Table="compteaux";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

var CompoLie = GetSQLCompoAt(769);
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
  REQUETES UTILSATEUR : Onglet : Comptes auxiliaires
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Comptes_auxiliaires_Liste_des_comptes_auxiliaires0(Compo_Maitre)
{
 var Table="compteaux";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var ca_numcompte=GetValAt(784);
 if (!ValiderChampsObligatoire(Table,"ca_numcompte",TAB_GLOBAL_COMPO[784],ca_numcompte,false))
         return -1;
 if (!ValiderChampsType(Table,"ca_numcompte",TAB_GLOBAL_COMPO[784],ca_numcompte))
         return -1;
 var ca_libelle=GetValAt(785);
 if (!ValiderChampsObligatoire(Table,"ca_libelle",TAB_GLOBAL_COMPO[785],ca_libelle,false))
         return -1;
 if (!ValiderChampsType(Table,"ca_libelle",TAB_GLOBAL_COMPO[785],ca_libelle))
         return -1;
 var ac_numero=GetValAt(786);
 if (ac_numero=="-1")
    ac_numero="null";
 if (!ValiderChampsObligatoire(Table,"ac_numero",TAB_GLOBAL_COMPO[786],ac_numero,true))
         return -1;
 var ca_debit=GetValAt(787);
 if (!ValiderChampsObligatoire(Table,"ca_debit",TAB_GLOBAL_COMPO[787],ca_debit,false))
         return -1;
 if (!ValiderChampsType(Table,"ca_debit",TAB_GLOBAL_COMPO[787],ca_debit))
         return -1;
 var Req="update "+Table+" set ";
 Req+="ca_numcompte="+(ca_numcompte=="" ? "null" : "'"+ValiderChaine(ca_numcompte)+"'" )+",ca_libelle="+(ca_libelle=="" ? "null" : "'"+ValiderChaine(ca_libelle)+"'" )+",ac_numero="+ac_numero+",ca_debit="+(ca_debit=="true" ? "true" : "false")+"";
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
