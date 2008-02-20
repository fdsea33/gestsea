const ACTIVER_CACHE = false;
const ACTIVER_LOG = false;

function ChercherCompoRec(CompoBase,NodeName,Tab,LongMax)
{
    //    alert(NodeName+"-"+CompoBase.nodeName);
    if (CompoBase.nodeName==NodeName)
	{
	    Tab.push(CompoBase);
	    if (Tab.length>=LongMax)
		return true;
	}

    var i;
    for(i=0;i<CompoBase.childNodes.length;i++)
	{
	    if (ChercherCompoRec(CompoBase.childNodes[i],NodeName,Tab,LongMax))
		return true;
	}
    return false;
}

function ChercherCompo(CompoBase,NodeName,LongMax)
{
    var Tab=new Array();
    if (LongMax==null)
	LongMax=1;
    ChercherCompoRec(CompoBase,NodeName,Tab,LongMax);
    return Tab;
}


function DePrefixerChamp(Champ)
{
    var StrRes="";
    var i;
    var ap_point=false;
    var max=Champ.length;
    for(i=0;i<max;i++)
	{
	    if(ap_point)
		StrRes+=Champ[i];

	    if(Champ[i]==".")
		ap_point=true;
	}
    if (!ap_point)
	StrRes=Champ;

    return StrRes;
}

/* double les ' */
function ValiderChaine(Str)
{
    var i;
    var StrRes="";

    for(i=0;i<Str.length;i++)
	{
	    switch(Str[i])
		{
		case "'" : StrRes+="''";
		    break;
		case "\\" : StrRes+="\\\\";
		    break;
		default : StrRes+=Str[i];
		    break;

		}
	}
    return StrRes;
}

/* is not a integer */
function isNaI(str)
{
    if(isNaN(str))
	return true;
    else
	{
	    var i;
	    for(i=0;i<str.length;i++)
		if(str[i]==".")
		    return true;
	}
    return false;
}


function isDateValid(chaineDate) {

    // Je regarde tout d'abord si la chaîne n'est pas vide, sinon pas la peine d'aller plus loin
    if (chaineDate == "") return false;

    // J'utilise split pour créer un tableau dans lequel je récupère les jour mois année
    // J'attends bien sûr une date formatée en JJ/MM/AAAA
    var ladate = (chaineDate).split("/");

    // Si je n'ai pas récupéré trois éléments ou bien s'il ne s'agit pas d'entiers, pas la peine non plus d'aller plus loin
    if ((ladate.length != 3) || isNaN(parseInt(ladate[0])) || isNaN(parseInt(ladate[1])) || isNaN(parseInt(ladate[2]))) return false;

    // Sinon, c'est maintenant que je crée la date correspondante. Attention, les mois sont étalonnés de 0 à 11
    var unedate = new Date(eval(ladate[2]),eval(ladate[1])-1,eval(ladate[0]));

    // Bug de l'an 2000 oblige, lorsque je récupère l'année, je n'ai pas toujours 4 chiffres selon les navigateurs, je rectifie donc ici le tir.
    var annee = unedate.getYear();
    if ((Math.abs(annee)+"").length < 4) annee = annee + 1900;

    // Il ne reste plus qu'à vérifier si le jour, le mois et l'année obtenus sont les mêmes que ceux saisis par l'utilisateur.
    return ((unedate.getDate() == eval(ladate[0])) && (unedate.getMonth() == eval(ladate[1])-1) && (annee == eval(ladate[2])));
}

/* vérifie que le type est bon et affiche un message d'erreur sinon */
function ValiderChampsType(table,champs,Composant,valeurChamp)
{
    var res=true;

    if (valeurChamp==null || valeurChamp=='')
	return res;

    var label = Composant.getLabel();

    var valeur=ValiderChaine(valeurChamp);
    var Type=mcd_getType(table,champs);

    switch(Type)
	{
	case TYPE_UNKNOWN :
	    alert("Erreur:\nType du champ "+label+" inconnu");
	    break;
	case TYPE_UNDEFINED :
	    alert("Erreur:\nType du champ "+label+" inconnu\nTable "+table+" ou Champ "+champs+" inconnu(e)");
	    break;
	case TYPE_STRING :
	    res=true;
	    break;
	case TYPE_INT :
	    if (isNaI(valeur))
		{
		    alert("Le champ "+label+" doit etre un nombre entier");
		    res=false;
		}
	    break;
	case TYPE_FLOAT :
	    if (isNaN(valeur))
		{
		    alert("Le champ "+label+" doit etre un nombre\nExemple: 100.05");
		    res=false;
		}
	    break;
	case TYPE_DECIMAL :
	    if (isNaI(valeur))
		{
		    alert("Le champ "+label+" doit etre un nombre entier");
		    res=false;
		}
	    break;

	case TYPE_DATETIME :
	case TYPE_DATE :
	    if (!isDateValid(valeur))
		{
		    alert("Le champ "+label+" doit etre une date\nExemple: 13/07/2005");
		    res=false;
		}
	    break;
	case TYPE_TIME :
	    alert("Fonction non implémenté");
	    break;
	case TYPE_BOOL :
	    
	    if (valeur!="true" && valeur!="false" && valeur!="undefined")
		{
		    alert("Le champ "+label+" doit etre un booléen.");
		    res=false;
		}
	    
	    break;
	case TYPE_GEOMETRY :
	    alert("Fonction non implémenté");
	    break;
	default:
	    alert("Erreur lors de la vérification de type:\nPas de type pour le champ "+label);
	    break;
	}
    if (!res)
	Composant.Focus();
    return res;
}

function ValiderChampsObligatoire(table,champs,Composant,valeurChamp,entier)
{
    var label = Composant.getLabel();
    var valComp;

    if (entier)
	valComp="null";
    else
	valComp="";

    if (mcd_obligatoire(table,champs) && (valeurChamp==valComp))
	{
	    alert("Le champ "+label+" doit être renseigné");
	    Composant.Focus();
	    return false;
	}
    else
	return true;

}

function CalculerNombreDeLigne(query)
{
    var req = "select count(*) from ("+query+") as TableCount";
    var requete_result=pgsql_query(req);
    /* on prends que la 1ère ligne */
    var enumererator = requete_result.enumerate();
    var CodeValue=-1;
    enumererator.beforeFirst();

    if (requete_result.rowCount>0)
	{
	    enumererator.next();
	    CodeValue=enumererator.getVariant(0);
	}
    else
	{
	    alert("Erreur: impossible de compter le nombre de ligne de la requête:\n"+query);
	    CodeValue=-1;
	}

    return CodeValue;
}

const DT_SELECT = 0;
const DT_UPDATE = 1;
const DT_INSERT = 2;
const DT_DELETE = 4;
const DT_ONGLET = 5;
const NOM_VUE_DROIT = 'vue_droit';

var TABLEAU_DES_DROITS=null;

function stCaseDroit(table,dt_select,dt_insert,dt_update,dt_delete)
{
    this.table=table;
    this.dt_select=dt_select;
    this.dt_insert=dt_insert;
    this.dt_update=dt_update;
    this.dt_delete=dt_delete;
    this.dt_onglet=(dt_insert && dt_update && dt_delete) || dt_select;
}

function RemplirAvecDroit(TabDroitOut,NomUser,StrDt)
{
    /* on cherche la ligne correspondant à l'utilisateur */
    var RegDroitPourUser = new RegExp(NomUser+"=[arwdRxt]*[^/]", "");
    var LigneDroitPourUser = RegDroitPourUser.exec(StrDt);

    /* si on n'a pas de droit pour l'utilisateur on prends les droits public*/

    if (LigneDroitPourUser==null)
	{
	    RegDroitPourUser = new RegExp("(^|,)=[arwdRxt]*[^/]", "");
	    LigneDroitPourUser = RegDroitPourUser.exec(StrDt);

	    /* si pas de droit publique alors on n'a aucun droit*/
	    if (LigneDroitPourUser==null)
		{
		    TabDroitOut[0]=false;
		    TabDroitOut[1]=false;
		    TabDroitOut[2]=false;
		    TabDroitOut[3]=false;
		    return;
		}
	}

    var RegDtSelect = new RegExp("=(\\w)*r", "");
    res = RegDtSelect.exec(LigneDroitPourUser[0]);
    if (res)
	TabDroitOut[0]=true;
    else
	TabDroitOut[0]=false;

    var RegDtInsert = new RegExp("=(\\w)*a", "");
    res = RegDtInsert.exec(LigneDroitPourUser[0]);
    if (res)
	TabDroitOut[1]=true;
    else
	TabDroitOut[1]=false;

    var RegDtUpdate = new RegExp("=(\\w)*w", "");
    res = RegDtUpdate.exec(LigneDroitPourUser[0]);
    if (res)
	TabDroitOut[2]=true;
    else
	TabDroitOut[2]=false;

    var RegDtDelete = new RegExp("=(\\w)*d", "");
    res = RegDtDelete.exec(LigneDroitPourUser[0]);
    if (res)
	TabDroitOut[3]=true;
    else
	TabDroitOut[3]=false;
}

function Init_ALeDroit()
{
    TABLEAU_DES_DROITS=new Array();
    var NomUser;
    var req,res,enumer;
    var SuperUser=false;
    var encore;
    var table,TabDroit;//dt_select,dt_insert,dt_update,dt_delete;

    req='select usesuper,usename from pg_user where usename=CURRENT_USER';
    res=pgsql_query(req);
    if (res.rowCount!=0)
	{
	    enumer=res.enumerate();
	    enumer.first();
	    SuperUser=enumer.getVariant(0);
	    NomUser=enumer.getVariant(1);
	}
    else
	{
	    alert("Erreur utilisateur actuel non présent dans la BD (table pg_user)");
	    return;
	}

    req="select relname,relacl from pg_class where relname in ((select tablename from pg_tables where schemaname='public') UNION ( select viewname from pg_views where schemaname = 'public'));";

    res=pgsql_query(req);
    enumer=res.enumerate();

    enumer.beforeFirst();

    encore = true;
    while (encore) {
	encore = enumer.next();
	TabDroit=new Array(4);
	table = enumer.getVariant(0);
	if (SuperUser)
	    {
		TabDroit[0]=true;
		TabDroit[1]=true;
		TabDroit[2]=true;
		TabDroit[3]=true;
	    }
	else
	    {
		RemplirAvecDroit(TabDroit,NomUser,enumer.getVariant(1));
	    }
	TABLEAU_DES_DROITS.push(new stCaseDroit(table,TabDroit[0],TabDroit[1],TabDroit[2],TabDroit[3]));
    }
}

function ALeDroit(droit,table)
{
    if (TABLEAU_DES_DROITS==null)
	{
	    return true;
	    alert("Erreur de programmation\nLes droits doivents être initialisés (fonction Init_ALeDroit)");
	    return false;
	}

    var i;
    var res=false;

    for(i=0;i<TABLEAU_DES_DROITS.length;i++)
	{
	    if (TABLEAU_DES_DROITS[i].table==table)
		{
		    switch(droit)
			{
			case DT_SELECT :
			    res=TABLEAU_DES_DROITS[i].dt_select;
			    break;
			case DT_INSERT :
			    res=TABLEAU_DES_DROITS[i].dt_insert;
			    break;
			case DT_UPDATE :
			    res=TABLEAU_DES_DROITS[i].dt_update;
			    break;
			case DT_DELETE :
			    res=TABLEAU_DES_DROITS[i].dt_delete;
			    break;
			case DT_ONGLET :
			    res=TABLEAU_DES_DROITS[i].dt_onglet;
			    break;
			default:
			    alert("Erreur de programmation sur la détermination des droit");
			    return false;
			}
		    return res;
		}
	}

    alert("Erreur lors de la détermination des droits de l'utilisateur courrant, table non trouvée\nDroit:"+droit+"\nTable:"+table);
    return false;
}

/* pour calculer les temps d'execution */
function Debut_TpsExec()
{
    var maintenant=new Date();
    return maintenant.getTime();
}

function Fin_TpsExec(TpsDebut)
{
    var maintenant=new Date();
    return maintenant.getTime()-TpsDebut;
}

/* test de cache pour optimisation */
var TabReqCache=new Array();
var NbrReq=0;
function stCase_TabReqCache(Req,Result)
{
    this.Req=Req;
    this.Result=Result;
}

function UseCache(Req)
{
    if (!ACTIVER_CACHE)
	return null;

    var i,max;
    max=TabReqCache.length;
    for (i=0;i<max;i++)
	{
	    if (TabReqCache[i].Req==Req)
		{
		    return TabReqCache[i].Result;
		}
	}
    return null;
}

function PushCache(Req,Result)
{
    if (!ACTIVER_CACHE)
	return;

    TabReqCache.push(new stCase_TabReqCache(Req,Result));
}

/* pour la barre d'etat */
function AddLog(str)
{
    if (!ACTIVER_LOG)
	return;

    var status_log=top.document.getElementById("status_log");
    if (status_log!=null)
	{
	    status_log.value+="\n"+str;
	}
}

/*
  function Valeur_Bidon(Type)
  {
  switch(Type)
  {
  case TYPE_STRING :
  return "A";
  break;
  case TYPE_INT :
  return "0";
  break;
  case TYPE_FLOAT :
  return "0";
  break;
  case TYPE_DECIMAL :
  return "0";
  break;
  case TYPE_DATE :
  return "01/01/1970";
  break;
  case TYPE_TIME :
  return "00:00:00";
  break;
  case TYPE_DATETIME :
  return "01/01/1970.00:00:00";
  break;
  case TYPE_BOOL :
  return "false";
  break;
  default :
  return "0";
  break;
  }
  }

  function Insertion_Bidon(Table)
  {
  var TabChamps=getChampsLogique(Table);
  if (TabChamps.length==0)
  alert("Pas de champs pour la table "+Table);
  var i;
  var Cle=getCle(Table);
  var Req="insert into "+Table;
  var ReqNom=" ( ";
  var ReqVal=" values ( ";
  for(i=0;i<TabChamps.length;i++)
  {
  if (i!=0)
  {
  ReqNom+=',';
  ReqVal+=',';
  }
  alert(TabChamps[i]);
  ReqNom+=TabChamps[i];
  ReqVal+=Valeur_Bidon(mcd_getType(Table,TabChamps[i]));
  }
  Req+=ReqNom+") "+ReqVal+")";
  alert("Requête bidon=\n",Req)
  }
*/
