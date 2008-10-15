const TOUT = 0;
const SELECT = 1;
const WHERE = 2;
const JOINTURE = 3;
const ORDERBY = 4;
const FROM = 5;

/* ******************************** CLASSE REQSQL*************** */
function clJointureReqSQL(Table,CleDebut,CleFin,JointureLarge) {
    if (arguments.length==0)
	return;
    this.Table=Table;
    this.CleDebut=CleDebut;
    this.CleFin=CleFin;
    if (JointureLarge!=null)
	this.JointureLarge=JointureLarge;
    else
	this.JointureLarge=false;
}

clJointureReqSQL.prototype.getACopy =
    function(){
	return new clJointureReqSQL(this.Table,this.CleDebut,this.CleFin,this.JointureLarge);
    }

clJointureReqSQL.prototype.Egal =
    function(JointureReqSQL){
	return (this.Table==JointureReqSQL.Table);
	/* &&
	   this.CleDebut==JointureReqSQL.CleDebut &&
	   this.CleFin==JointureReqSQL.CleFin);*/
    }


/* case dans le tableau de where */
function stCaseWhere(Cond,Op) {
    this.Cond=Cond;
    this.Op=Op;
}

stCaseWhere.prototype.Egal =
    function(CaseWhere){
	return (this.Cond==CaseWhere.Cond && this.Op==CaseWhere.Op);
    }

function clReqSQL() {
    this.TabSelect=new Array();
    //    this.TabFrom=new Array();
    this.FromRoot=null;
    this.TabJointureExt=new Array();
    this.TabWhere=new Array();
    this.TabOrderBy=new Array();
    this.Distinct=false;
    /* autre requête de type clReqSQL */
    this.Union=null;
}

/* fonctions outils (~privées) */
function Existe(Tableau,valeur)
{
    var res=false;
    var i=0;
    while(i<Tableau.length && !res)
	{
	    /* on regarde si la propriété egal existe */
	    if (Tableau[i].Egal==null)
		res=(Tableau[i]==valeur);
	    else
		res=(Tableau[i].Egal(valeur));
	    i++;
	}
    return res;
}

// function ExisteJointure(Tableau,valeur)
// {
//     var res=false;
//     var i=0;
//     while(i<Tableau.length && !res)
//   {
//       res=(Tableau[i].Egal(valeur));
//       i++;
//   }
//     return res;
// }


function IndiceTableDansJointure(Tableau,valeur)
{
    var i;
    for(i=0;i<Tableau.length;i++)
	{
	    if (Tableau[i].Table==valeur)
		return i;
	}
    return -1;
}


/* fusionne tab2 dans tab1 sans doublons */
function FusionnerTab(Tab1,Tab2) {
    /* on élémine les doublons */
    var i;
    /* on recopie le 2ème tab sans doublons */
    for(i=0;i<Tab2.length;i++)
	{
	    if (!Existe(Tab1,Tab2[i]))
		{
		    Tab1.push(Tab2[i]);
		}
	}
}

/* fusionne tab2 dans tab1 sans doublons */
function FusionnerTabJointure(Tab1,Tab2) {
    /* on élémine les doublons */
    var i;
    /* on recopie le 2ème tab sans doublons */
    for(i=0;i<Tab2.length;i++)
	{
	    /* ExisteJointure */
	    if (!Existe(Tab1,Tab2[i]))
		{
		    Tab1.push(Tab2[i]);
		}
	}
}

function InsererTab(Tab1,Tab2,IdDansTab1)
{
    var TabRes=new Array();
    var i,max;
    max=Tab1.length+Tab2.length;

    /* debut du tab1 */
    for(i=0;i<IdDansTab1;i++)
	TabRes.push(Tab1[i]);

    /* tab 2 */
    for(i=0;i<Tab2.length;i++)
	TabRes.push(Tab2[i]);

    /* fin du tab1 */
    for(i=IdDansTab1;i<Tab1.length;i++)
	TabRes.push(Tab1[i]);

    return TabRes;
}

function EliminerJointureEnDouble(TabJointureExt)
{
    var TabRes=new Array();

    FusionnerTabJointure(TabRes,TabJointureExt);

    return TabRes;

}

function CopierTab(Tableau)
{
    var TabRes=new Array();
    var i;
    for(i=0;i<Tableau.length;i++)
	TabRes.push(Tableau[i]);

    return TabRes;
}

/* élimine les jointures inutiles */
/* v1.0 :
   On vérifie juste que FromRoot est bien utilisée
   On enlève le distinct si seule une table est concerné
*/

function ExtractTable(Champs)
{
    var reg = new RegExp("\\.", "i");
    res = Champs.split(reg);
    if (res.length!=2)
	{
	    return null;
	}
    return res[0];
}

function TestTableDansCondition(Cond,Table)
{
    var reg = new RegExp("[\\w]+\\(|'[\\w\\b %]*'|=|,|\\bAS\\b|\\bAND\\b|\\bOR\\b|>|<|[0-9]+\\.[0-9]+|\\b[0-9]+\\b|\\bt\\b|\\bf\\b|\\btrue\\b|\\bfalse\\b|\\bnull\\b|\\bis\\b|\\(|\\)", "i");
    res = Cond.split(reg);
    var i;
    var presente=false;
    var TableExp;
    /* On récupère tout ce qui est succeptible d'être un champs*/
    i=0;
    while(i<res.length && !presente)
	{
	    TableExp=ExtractTable(res[i]);
	    if (TableExp!=null && TableExp==Table)
		presente=true;
	    i++;
	}
    return presente;
}

function OptimiserReqSQL(TheReqSQL)
{
    ReqSQLRes=new clReqSQL();
    var TableRootUtile=false;
    var i;

    /* on vérifie le select */
    i=0;
    while(i<TheReqSQL.TabSelect.length && !TableRootUtile)
	{
	    if (ExtractTable(TheReqSQL.TabSelect[i])==TheReqSQL.FromRoot)
		TableRootUtile=true;
	    i++;
	}

    /* on vérifie le where */
    i=0;
    while(i<TheReqSQL.TabWhere.length && !TableRootUtile)
	{
	    if (TestTableDansCondition(TheReqSQL.TabWhere[i].Cond,TheReqSQL.FromRoot))
		TableRootUtile=true;
	    i++;
	}

    /* on copie le select, le where etc...*/
    ReqSQLRes.TabSelect=CopierTab(TheReqSQL.TabSelect);
    ReqSQLRes.TabWhere=CopierTab(TheReqSQL.TabWhere);
    ReqSQLRes.TabOrderBy=CopierTab(TheReqSQL.TabOrderBy);
    ReqSQLRes.Union=TheReqSQL.Union;

    /* si la tableroot n'est pas utilsée on l'enlève de la jointure */
    if (!TableRootUtile)
	{
	    if (TheReqSQL.TabJointureExt.length==0)
		{
		    alert("Erreur lors de l'optimisation: requête fausse");
		    return TheReqSQL;
		}
	    ReqSQLRes.FromRoot=TheReqSQL.TabJointureExt[0].Table;
	    ReqSQLRes.AddWhere(TheReqSQL.TabJointureExt[0].CleDebut+'='+TheReqSQL.TabJointureExt[0].CleFin);

	    /* on recopie les autres jointures */
	    for(i=1;i<TheReqSQL.TabJointureExt.length;i++)
		{
		    //getACopy évite fx de bord
		    var Jointure=TheReqSQL.TabJointureExt[i].getACopy();
		    ReqSQLRes.TabJointureExt.push(Jointure);
		}
	}
    else
	{
	    ReqSQLRes.TabJointureExt=CopierTab(TheReqSQL.TabJointureExt);
	    ReqSQLRes.FromRoot=TheReqSQL.FromRoot;
	}

    /* on compte le nombre de jointure pour le distinct */
    //ReqSQLRes.Distinct=(ReqSQLRes.TabJointureExt.length>1);

    return ReqSQLRes;
}

function GenererSQL(TheReqSQLP)
{
    /* on optimise */
    var TheReqSQL=OptimiserReqSQL(TheReqSQLP);

    var Req="select ";
    var i;

    if (TheReqSQL.Distinct)
	Req=Req+"distinct ";

    for(i=0;i<TheReqSQL.TabSelect.length;i++)
	{
	    if(i!=0)
		Req=Req+", ";
	    Req=Req+TheReqSQL.TabSelect[i]+' as "'+TheReqSQL.TabSelect[i]+'"';
	}

    Req=Req+" from "+TheReqSQL.FromRoot+" ";
    for(i=0;i<TheReqSQL.TabJointureExt.length;i++)
	{
	    if (TheReqSQL.TabJointureExt[i].JointureLarge)
		Req=Req+"left outer ";

	    Req=Req+"join "+TheReqSQL.TabJointureExt[i].Table+" on ("+TheReqSQL.TabJointureExt[i].CleDebut+"="+TheReqSQL.TabJointureExt[i].CleFin+") ";
	}

    if (TheReqSQL.TabWhere.length!=0)
	{
	    Req=Req+"where ";
	}
    for(i=0;i<TheReqSQL.TabWhere.length;i++)
	{
	    if(i!=0)
		Req=Req+" "+TheReqSQL.TabWhere[i].Op+" ";
	    Req=Req+"("+TheReqSQL.TabWhere[i].Cond+") ";
	}

    if (TheReqSQL.TabOrderBy.length!=0)
	{
	    Req=Req+"order by ";
	}
    for(i=0;i<TheReqSQL.TabOrderBy.length;i++)
	{
	    if(i!=0)
		Req=Req+", ";
	    Req=Req+' "'+TheReqSQL.TabOrderBy[i]+'" ';
	}
    if (TheReqSQL.Union!=null)
	{
	    Req="("+Req+")"+" UNION (" +TheReqSQL.Union.GenererReq()+")";
	}
    //Req=Req+";";

    return Req;

}

clReqSQL.prototype={

    Cloner :
    function(ReqSQL,partie)
    {
	if (ReqSQL!=null)
	{
	    /* par defaut */
	    if (partie==null)
	    partie=TOUT;

	    switch(partie)
	    {
	    case SELECT:
		this.TabSelect=CopierTab(ReqSQL.TabSelect);
		break;
	    case WHERE:
		this.TabWhere=CopierTab(ReqSQL.TabWhere);
		break;
	    case JOINTURE:
		this.TabJointureExt=CopierTab(ReqSQL.TabJointureExt);
		break;
	    case ORDERBY:
		this.TabOrderBy=CopierTab(ReqSQL.TabOrderBy);
		break;
	    case FROM:
		this.FromRoot="";
		this.FromRoot=this.FromRoot.concat(ReqSQL.FromRoot);
		break;
	    case TOUT:
		this.TabSelect=CopierTab(ReqSQL.TabSelect);
		this.FromRoot="";
		this.FromRoot=this.FromRoot.concat(ReqSQL.FromRoot);
		this.TabJointureExt=CopierTab(ReqSQL.TabJointureExt);
		this.TabWhere=CopierTab(ReqSQL.TabWhere);
		this.TabOrderBy=CopierTab(ReqSQL.TabOrderBy);
		this.Distinct=ReqSQL.Distinct;
		break;
	    }
	}
    },

    AddSelect :
    function(SelectAttribut)
    {
	if (!Existe(this.TabSelect,SelectAttribut))
	this.TabSelect.push(SelectAttribut);
    },

    setUnion :
    function(ReqSQL)
    {
	this.Union=ReqSQL;
    },

    getUnion :
    function()
    {
	return this.Union;
    },

    setFromRoot :
    function(FromAttribut)
    {
	this.FromRoot=FromAttribut;
    },

    AddJointureExt :
    function(TableExt,CleDebut,CleFin,JointureLarge)
    {
	var Jointure=new clJointureReqSQL(TableExt,CleDebut,CleFin,JointureLarge);
	/* ExisteJointure */
	if (!Existe(this.TabJointureExt,Jointure))
	{
	    this.Distinct=true;
	    //      this.AddFrom(TableExt);
	    this.TabJointureExt.push(Jointure);
	}
    },


    AddWhere :
    function(WhereAttribut,Op)
    {
	if (!Existe(this.TabWhere,WhereAttribut))
	{
	    if (Op==null)
	    Op="AND";

	    this.TabWhere.push(new stCaseWhere(WhereAttribut,Op));
	}
    },

    AddOrderBy :
    function(OrderByAttribut)
    {
	if (!Existe(this.TabOrderBy,OrderByAttribut))
	{
	    this.TabOrderBy.push(OrderByAttribut);
	}
    },

    AddOrderByPremierChamps:
    function(OrderByAttribut)
    {
	this.AddOrderBy(this.TabSelect[0]);
    },

    Fusionner :
    function(ReqSQL)
    {
	if (ReqSQL!=null)
	{
	    /* on prends toujours l'autre UNION */
	    this.Union=ReqSQL.Union;

	    /* on élémine les doublons */
	    FusionnerTab(this.TabSelect,ReqSQL.TabSelect);

	    /* si ReqSQL.FromRoot se trouve dans nos jointure alors on insert ses jointure, sinon il faut que this.FromRoot se trouve dans les jointures de ReqSQL */
	    if (this.FromRoot!=null && ReqSQL.FromRoot!=null)
	    {
		var indice;
		indice=IndiceTableDansJointure(this.TabJointureExt,ReqSQL.FromRoot);

		if (indice==-1 && this.FromRoot==ReqSQL.FromRoot)
		    indice=this.TabJointureExt.length;
		else
		    /* pour se mettre sur la case d'insertion */
		    if (indice!=-1)
			indice++;
		if (indice!=-1)
		    {
			/* on insert les jointures de l'autre */
			this.TabJointureExt=InsererTab(this.TabJointureExt,ReqSQL.TabJointureExt,indice);
			this.TabJointureExt=EliminerJointureEnDouble(this.TabJointureExt);
		    }
		else
		    {
			/* on regarde si notre FromRoot se trouve dans les jointures de l'autre */
			indice=IndiceTableDansJointure(ReqSQL.TabJointureExt,this.FromRoot);
			if (indice!=-1)
			    {
				this.TabJointureExt=InsererTab(ReqSQL.TabJointureExt,this.TabJointureExt,indice+1);
				this.TabJointureExt=EliminerJointureEnDouble(this.TabJointureExt);
				this.FromRoot=ReqSQL.FromRoot;
			    }
			else
			    {
				throw "Erreur lors de la fusion de deux requetes\nNe peut pas fusionner les jointures externes car le modele actuel ne modelise pas les produits cartesiens purs sans jointures";
			    }

		    }
	    }
	    else
	    {
		/* on considère que FromRoot et jointure sont liée */
		if (this.FromRoot==null)
		{
		    this.FromRoot=ReqSQL.FromRoot;
		    this.TabJointureExt=ReqSQL.TabJointureExt;
		}
	    }

	    FusionnerTab(this.TabWhere,ReqSQL.TabWhere);
	    FusionnerTab(this.TabOrderBy,ReqSQL.TabOrderBy);
	    //      FusionnerTabJointure(this.TabJointureExt,ReqSQL.TabJointureExt);
	    this.Distinct=this.Distinct||ReqSQL.Distinct;
	}
    },

    SetDistinct :
    function (bool)
    {
	this.Distinct=bool;
    },

    GenererReq :
    function ()
    {
	return GenererSQL(this);
    }

};

/* ****************CLASSE REQSQLFILTRABLE*************** */

clReqSQLFiltrable.prototype = new clReqSQL();

function clReqSQLFiltrable() {
    this.parent = clReqSQL;
    this.parent();
    this.EnsFiltre_Jointure=new Array();
    this.active=false;
    /* à true si on filtre même sur l'union */
    this.FiltrageTotal=false;
}

clReqSQLFiltrable.prototype.setFiltrageTotal =
    function(FiltrageTotal){
	this.FiltrageTotal=FiltrageTotal;
    }

/*
  clReqSQLFiltrable.prototype.Cloner=
  function(ReqSQLFiltrable){
  this.myReq.Cloner(ReqSQLFiltrable);
  this.active=ReqSQLFiltrable.active;
  var i;
  this.EnsFiltre_Jointure=new Array();
  for (i=0;i<ReqSqlConteneurFiltrable.EnsFiltre_Jointure.length;i++)
  {
  this.EnsFiltre_Jointure.EnsFiltre_Jointure.push(ReqSqlConteneurFiltrable.EnsFiltre_Jointure[i]);
  }

  }
*/

clReqSQLFiltrable.prototype.GenererReq =
    function(){
	if (this.active)
	{
	    /* On construit la requete filtree  */
	    var ReqFiltree=new clReqSQL();
	    var ReqFiltreeUnion=new clReqSQL();
	    //      var PremierFiltre=true;
	    var i,FJ,Cond;
	    var UnionExiste=(this.getUnion()!=null);
	    ReqFiltree.Fusionner(this);
	    if (UnionExiste)
	    ReqFiltreeUnion.Cloner(this.getUnion());

	    for (i=0;i<this.EnsFiltre_Jointure.length;i++)
	    {
		ChaineWhereTmp="";
		FJ=this.EnsFiltre_Jointure[i];
		Cond=FJ.Filtre.getCondition();
		/* pour les filtres actifs */
		if (FJ.Filtre.getEtat() && Cond!="")
		    {

			ReqFiltree.AddWhere(Cond,FJ.Operateur);

			if (FJ.Filtre.getActiveSurUnion() && this.FiltrageTotal && UnionExiste)
			    {
				ReqFiltreeUnion.AddWhere(Cond,FJ.Operateur);
			    }

			//         if (!PremierFiltre)
			//           {
			//             ChaineWhereTmp=" "+FJ.Operateur+" ";
			//           }
			//
			//         ChaineWhereTmp+=Cond;

			if (FJ.Jointure!=null)
			    {
				ReqFiltree.Fusionner(FJ.Jointure.getReqSQL());
				if (FJ.Filtre.getActiveSurUnion() && this.FiltrageTotal && UnionExiste)
				    {
					ReqFiltreeUnion.Fusionner(FJ.Jointure.getReqSQL());
				    }

			    }


			//        PremierFiltre=false;
		    }
	    }
	    //       if (ChaineWhere!="")
	    //       {
	    //       ReqFiltree.AddWhere(ChaineWhere);
	    //       if (FJ.Filtre.getActiveSurUnion() && this.FiltrageTotal && this.getUnion()!=null)
	    //         this.getUnion().AddWhere(ChaineWhere);
	    //       }
	    if (UnionExiste)
	    ReqFiltree.setUnion(ReqFiltreeUnion);
	    return ReqFiltree.GenererReq();
	}
	else
	{
	    /* il faut appeller la classe mere */
	    return GenererSQL(this);
	}
    }

clReqSQLFiltrable.prototype.AjouterFiltre =
    function(Jointure,Filtre,Operateur)
{
    this.EnsFiltre_Jointure.push(new stFiltre_Jointure(Jointure,Filtre,Operateur));
}

/* faux=> descativer les filtres */
clReqSQLFiltrable.prototype.ActiverFiltres =
    function(Etat){
	if (Etat!=null)
	this.active=Etat;
	else
	this.active=true;
    }


/* ****************************** CLASSE REQSQLCONTENEUR **************/
function clReqSqlConteneur() {
    this.myReq=new clReqSQL();
}

clReqSqlConteneur.prototype={
    genererReqSQL :
    function()
    {
	return this.myReq.GenererReq();
    },
    
    Fusionner :
    function(ReqSqlConteneur)
    {
	if (ReqSqlConteneur!=null)
	{
	    this.myReq.Fusionner(ReqSqlConteneur.myReq);
	}
    },
    
    getReqSQL :
    function()
    {
	return this.myReq;
    },

    resetReqSQL :
    function()
    {
	this.myReq=new clReqSQL();
    },

    Cloner:
    function(ReqSqlConteneur)
    {
	this.myReq.Cloner(ReqSqlConteneur.myReq);
  
    }
};


/* ****************************** STRUCT FILTRE_JOINTURE **************/

function stFiltre_Jointure(Jointure,Filtre,Operateur) {
    if (arguments.length==0)
	return;
    this.Jointure=Jointure;
    this.Filtre=Filtre;
    if (Operateur!=null)
	this.Operateur=Operateur;
    else
	/* Par default */
	this.Operateur="AND";
}


/* *************** CLASSE FILTRE *************** */
function clFiltre(condition) {
    if (condition!=null)
	this.condition=condition;
    else
	this.condition="";

    this.active=false;
    /* si on applique sur l'union ou pas */
    this.ActiveSurUnion=true;
}

clFiltre.prototype.setActiveSurUnion =
    function(ActiveSurUnion)
{
    this.ActiveSurUnion=ActiveSurUnion;
}

clFiltre.prototype.getActiveSurUnion =
    function()
{
    return this.ActiveSurUnion;
}


clFiltre.prototype.Activer =
    function(Etat){
	if (Etat!=null)
	this.active=Etat;
	else
	/* par default */
	this.active=true;
    }

clFiltre.prototype.getEtat =
    function(){
        return this.active;
    }

clFiltre.prototype.setCondition =
    function(condition){
        return this.condition=condition;
    }

clFiltre.prototype.getCondition =
    function(){
        return this.condition;
    }


/* ****************************** STRUCT JOINTURE **************/

/* TabAttributs: string => les différents attributs de la relation */
function stJointure(TableFin,CleDebut,CleFin,EnsAttributs,JointureLarge) {
    this.TableFin = TableFin;
    this.CleDebut = CleDebut;
    this.CleFin = CleFin;
    this.JointureLarge=JointureLarge;
    if (EnsAttributs!=null)
	this.EnsAttributs = EnsAttributs;
    else
	this.EnsAttributs=new clEnsembleAttributs(TableFin,null);
}

/* on ne clone pas les attributs */
stJointure.prototype.Cloner=
    function(Autre) {
	this.TableFin = ""+Autre.TableFin;
	this.CleDebut = ""+Autre.CleDebut;
	this.CleFin = ""+Autre.CleFin;
	this.JointureLarge=Autre.JointureLarge;
	if (Autre.EnsAttributs!=null)
	this.EnsAttributs = Autre.EnsAttributs;
	else
	this.EnsAttributs=new clEnsembleAttributs(Autre.TableFin,null);
    }


/* ****************************** CLASSE JOINTUREMULTI **************/

clJointureMulti.prototype = new clReqSqlConteneur();

/* cle => peut etre valeur */
function clJointureMulti(TableDebut,TabJointure) {
    if (arguments.length==0)
	return;

    this.parent = clReqSqlConteneur;
    this.parent();

    this.TableDebut=TableDebut;

    /* pour avoir les attributs des relations */
    this.TabJointure=TabJointure;
    this.ReConstruire(TableDebut+"."+TabJointure[0].CleDebut);
}

clJointureMulti.prototype.Cloner =
    function(AutreJoint){
	this.TableDebut=""+AutreJoint.TableDebut;
	var i,joint;
	this.TabJointure=new Array();
	for(i=0;i<AutreJoint.TabJointure.length;i++)
	{
	    joint=new stJointure();
	    joint.Cloner(AutreJoint.TabJointure[i]);
	    this.TabJointure.push(joint);
	}
  
    }

/* on clone avec une jointure au sens large */
clJointureMulti.prototype.ClonerLarge =
    function(AutreJoint){
	this.TableDebut=""+AutreJoint.TableDebut;
	var i,joint;
	this.TabJointure=new Array();
	for(i=0;i<AutreJoint.TabJointure.length;i++)
	{
	    joint=new stJointure();
	    joint.Cloner(AutreJoint.TabJointure[i]);
	    joint.JointureLarge=true;
	    this.TabJointure.push(joint);
	}
  
    }


clJointureMulti.prototype.getFirstCle =
    function(){
	return this.TableDebut+"."+this.TabJointure[0].CleDebut;
    }

/* CleDebut = TabJointure[0].CleDebut; */
clJointureMulti.prototype.ReConstruire =
    function(CleDebut){

	/* on construit les différents jointures */
	var i,joint,jointAv;

	this.myReq=new clReqSQL();

	this.myReq.setFromRoot(this.TableDebut);

	joint=this.TabJointure[0];
	this.myReq.AddJointureExt(joint.TableFin,CleDebut,joint.TableFin+"."+joint.CleFin,joint.JointureLarge);

	for (i=1;i<this.TabJointure.length;i++)
	{
	    joint=this.TabJointure[i];
	    jointAv=this.TabJointure[i-1];
	    this.myReq.AddJointureExt(joint.TableFin,jointAv.TableFin+"."+joint.CleDebut,joint.TableFin+"."+joint.CleFin,joint.JointureLarge);
	    /* on ajoute les attributs de la relation */
	    this.Fusionner(this.TabJointure[i].EnsAttributs);
	}
    };

/* *************** CLASSE AFFICHABLE *************** */
clAffichable.prototype = new clReqSqlConteneur();

function clAffichable(NomTable,Esclaves) {
    this.parent = clReqSqlConteneur;
    this.parent();
    this.myCompo=null;

    if (Esclaves!=null)
	{
	    this.Esclaves=Esclaves;
	    /* on leur dis qu'on est leur maitre */
	    var i,Liaison;
	    for(i=0;i<Esclaves.length;i++)
		{
		    Liaison=new clLiaison(Esclaves[i].getJointure(),this);
		    Esclaves[i].getAttribut().AttacherMaitre(Liaison);
		}
	}
    else
	this.Esclaves=new Array();

    this.Table=NomTable;
    this.myReq.setFromRoot(NomTable);

    this.my_MaitresLiaison=null;
}

clAffichable.prototype.getTable =
    function(){
	return this.Table;
    }


clAffichable.prototype.AttacherMaitre =
    function(Liaison){
	this.my_MaitresLiaison=Liaison;
    }

clAffichable.prototype.Attacher =
    function(Composant){
	this.myCompo=Composant;
    }


clAffichable.prototype.GetComposant =
    function(){
	return this.myCompo;
    }
 
clAffichable.prototype.getEsclaves =
    function(){return this.Esclaves;}


/* ****************************** CLASSE LIAISON **************/
clLiaison.prototype = new clReqSqlConteneur();

function clLiaison(Jointure,Attribut) {
    if (arguments.length==0)
	return;
    this.parent = clReqSqlConteneur;
    this.parent();
    this.Fusionner(Jointure);
    this.Fusionner(Attribut);
    this.Jointure = Jointure;
    this.Attribut = Attribut;
}


clLiaison.prototype.RefreshReq =
    function(){
	this.myReq=new clReqSQL();
	this.Fusionner(this.Jointure);
	this.Fusionner(this.Attribut);
    }

clLiaison.prototype.getJointure =
    function(){return this.Jointure;}

clLiaison.prototype.getAttribut =
    function(){return this.Attribut;}


/* ************************* CLASSE ATTRIBUT (ABSTRAITE) *************** */

clAttribut.prototype = new clAffichable();

/* Esclaves: tableau de liaison */
function clAttribut(NomAttributBD,NomTable,Esclaves) {
    if (arguments.length==0)
	return;
    this.parent = clAffichable;
    this.parent(NomTable,Esclaves);

    this.NomAttributBD=NomTable+"."+NomAttributBD;
    
    this.myReq.AddSelect(this.NomAttributBD);
}


clAttribut.prototype.getNomAttributBD =
    function(){return this.NomAttributBD;}



/* ******************** CLASSE ENSATTRIBUTS *************************** */

clEnsembleAttributs.prototype = new clAffichable();

/* TabLiaisonEnsAtt: tableau de liaison */
function clEnsembleAttributs(NomTable,Liaison_Attributs,Esclaves) {
    var i;
    if (arguments.length==0)
	return;
    this.parent = clAffichable;
    this.parent(NomTable,Esclaves);

    if (Liaison_Attributs!=null)
	{
	    this.Liaison_Attributs=Liaison_Attributs;
	    for (i=0;i<Liaison_Attributs.length;i++)
		{
		    this.Fusionner(Liaison_Attributs[i]);
		}
	}
    else
	this.Liaison_Attributs=new Array();
    
}

clEnsembleAttributs.prototype.getLiaison_Attributs =
    function(){return this.Liaison_Attributs;}
