/* TYPE DES COMPOSANTS */
const TEXT_BOX = 0;
const CHECKBOX = 1;
const LISTE_DEROULANTE = 2;
const LISTE_DEROULANTE_STATIC = 3;
const COLOR = 6;
const LABEL = 7;

const LISTE = 4;
const LISTE_DEROULANTE_MULTI = 5;
const LISTE_DOUBLE = 6;
const DEBUG_ON = false;
//const LISTE_DOUBLE = 3;

/* MODE DE MISE A JOUR */

const LECTURE = 0;
const MODIFICATION = 1;
const INSERTION = 2;
const SUPPRESSION = 4;

const NomTabGlobalCompo = "TAB_GLOBAL_COMPO";
const NOM_CONTENEUR_ONGLETS = "Tous_les_onglets";

const MCD_PREFIX="gestsea-";

const NBONGLET = 10;

var IdDansTabGlobalCompo = 0;
/*
  Fonctions simplifées pour créer rapidement des interfaces.
  Cependant n'est pas aussi générique que si on utilise directement les classes du générateur
*/
function genererActivationDesactivation(Compo,activation)
{
    var ParentXul = Compo.getTheme().getParentXul();
    var StrJs='';
    StrJs+='/* On désactive le composant maitre */\n';
    StrJs+=' '+ComposantDansCode(Compo)+'.ActiverComposant('+!activation+',true);\n';

    StrJs+='/* On active les composants esclaves et on vide les champs */\n';
    var j;
    var slaves=Compo.getEsclaves();

    for(j=0;j<slaves.length;j++)
        {
            var slaveCompo=slaves[j].Compo;
            /* on active les sous maitres */
            if (slaveCompo.getTheme().HasInsertMajSup())
                {
                    var ParentXulSlave=slaveCompo.getTheme().getParentXul();
                    if (activation)
                        {
                            StrJs+='top.document.getElementById("Validate_'+ParentXulSlave+'").disabled=true;\n';
                            StrJs+='top.document.getElementById("Annuler_'+ParentXulSlave+'").disabled=true;\n';
                            StrJs+='top.document.getElementById("Insert_'+ParentXulSlave+'").disabled=false;\n';
                            StrJs+='top.document.getElementById("Delete_'+ParentXulSlave+'").disabled=false;\n';
                            StrJs+='top.document.getElementById("Update_'+ParentXulSlave+'").disabled=false;\n';
                        }
                    else
                        {
                            StrJs+='Annuler_'+ParentXulSlave+'();\n';
                            StrJs+='top.document.getElementById("Validate_'+ParentXulSlave+'").disabled=true;\n';
                            StrJs+='top.document.getElementById("Annuler_'+ParentXulSlave+'").disabled=true;\n';
                            StrJs+='top.document.getElementById("Insert_'+ParentXulSlave+'").disabled=true;\n';
                            StrJs+='top.document.getElementById("Delete_'+ParentXulSlave+'").disabled=true;\n';
                            StrJs+='top.document.getElementById("Update_'+ParentXulSlave+'").disabled=true;\n';
                        }
                }
            var NomSlave="Esclave_"+j;
            StrJs+=Composant2VarDansCode(slaveCompo,NomSlave);
            StrJs+=' '+NomSlave+'.ActiverComposant('+activation+');\n';
        }

    StrJs+='top.document.getElementById("Validate_'+ParentXul+'").disabled='+!activation+';\n';
    StrJs+='top.document.getElementById("Annuler_'+ParentXul+'").disabled='+!activation+';\n';
    StrJs+='top.document.getElementById("Insert_'+ParentXul+'").disabled='+activation+';\n';
    StrJs+='top.document.getElementById("Delete_'+ParentXul+'").disabled='+activation+';\n';
    StrJs+='top.document.getElementById("Update_'+ParentXul+'").disabled='+activation+';\n';

    return StrJs;
}

function ComposantDansCode(Compo)
{
    var StrJs='';
    StrJs+=NomTabGlobalCompo+'['+Compo.getIdDansTabGlobalCompo()+']';
    return StrJs;
}

function Composant2VarDansCode(Compo,NomVar)
{
    var StrJs='';
    StrJs+=' var '+NomVar+'='+NomTabGlobalCompo+'['+Compo.getIdDansTabGlobalCompo()+'];\n';
    return StrJs;
}

function Composant2VarValDansCode(Compo,NomVar)
{
    var StrJs='';
    StrJs+=' var '+NomVar+'=GetValAt('+Compo.getIdDansTabGlobalCompo()+');\n';
    return StrJs;
}


/* classes internes */

function CharARemplacer(charac)
{
    return (charac == ' ' ||
            charac == '-' ||
            charac == '*' ||
            charac == '/' ||
            charac == '\\' ||
            charac == '-' ||
            charac == '+' ||
            charac == '"' ||
            charac == "'" ||
            charac == '`' ||
            charac == '(' ||
            charac == '[' ||
            charac == ')' ||
            charac == ']' ||
            charac == '{' ||
            charac == '}' ||
            charac == '=' ||
            charac == '@' ||
            charac == '&' ||
            charac == '²' ||
            charac == '^' ||
            charac == '!' ||
            charac == ':' ||
            charac == ';' ||
            charac == ',' ||
            charac == '.' ||
            charac == '#' ||
            charac == '~' ||
            charac == '°' ||
            charac == 'ù' ||
            charac == '%' ||
            charac == 'µ' ||
            charac == '£' ||
            charac == 'ù' ||
            charac == '$' ||
            charac == '§' ||
            charac == '?'
            );
}

function MettreUnderScore(Str)
{
    var i,res;
    res="";
    for(i=0;i<Str.length;i++)
        {
            if (CharARemplacer(Str[i]))
                res+='_';
            else
                res+=Str[i];
        }
    return res;
}


/* *************** Objet nommé *************** */

function clInterfaceSimple_ObjNomme(Nom)
{
    if (Nom!=null)
        this.MonNom=MettreUnderScore(Nom);
}

clInterfaceSimple_ObjNomme.prototype.getNom=
    function()
{
    return this.MonNom;
}

clInterfaceSimple_ObjNomme.prototype.getNom_=
    function()
{
    return MettreUnderScore(this.MonNom);
}


function TabLiaison2Liaison(TabLiaison,Nom)
{
    var Liaison=null;
    var Jointure=null;
    var i;
    var TabJointure=new Array();
    for(i=0;i<TabLiaison.length;i+=3)
        {
            Jointure=new clInterfaceSimple_Jointure(TabLiaison[i],TabLiaison[i+1],TabLiaison[i+2]);
            TabJointure.push(Jointure);
        }
    Liaison=new clInterfaceSimple_Liaison(TabJointure,Nom);
    return Liaison;
}


/* *************** Jointure *************** */
function clInterfaceSimple_Jointure(CleDebut,CleFin,TableFin)
{
    this.CleDebut=CleDebut;
    this.CleFin=CleFin;
    this.TableFin=TableFin;
}


/* *************** Liaison *************** */

clInterfaceSimple_Liaison.prototype=new clInterfaceSimple_ObjNomme();

function clInterfaceSimple_Liaison(TabJointure,Nom)
{
    this.parent=clInterfaceSimple_ObjNomme;
    this.parent(Nom);
    this.TabJointure=TabJointure;
}


clInterfaceSimple_Liaison.prototype.GenererJS=
    function(Table,Large){
        var Code="";
        if (Large==null)
        Large=false;

        Code+='var '+this.MonNom+'=new clJointureMulti("'+Table+'",\n\tnew Array(\n\t';
        var i,joint;
        for(i=0;i<this.TabJointure.length;i++)
        {
            if(i!=0)
                Code+=",";
            joint=this.TabJointure[i];
            Code+='new stJointure("'+joint.TableFin+'","'+joint.CleDebut+'","'+joint.CleFin+'",null,';
            if (Large)
                Code+='true';
            else
                Code+='false';
            Code+=')\n\t';
        }
        Code+="));\n";
        return Code;
    }

/* *************** Composant *************** */
clInterfaceSimple_Composant.prototype=new clInterfaceSimple_ObjNomme();

function clInterfaceSimple_Composant(Label,Table,Nom)
{
    if (arguments.length==0)
        return;

    this.parent=clInterfaceSimple_ObjNomme;
    this.parent(Nom);
    this.Label=Label;
    this.Table=Table;
    this.my_IdDansTabGlobalCompo=IdDansTabGlobalCompo++;
    //this.EstMaitre=false;
    this.MonMaitre=null;
    this.IdDansTabEsclave=null;
}

/*
  Droit:
*/
const DT_SELECT = 0;
const DT_UPDATE = 1;
const DT_INSERT = 2;
const DT_DELETE = 4;
const DT_ONGLET = 5;

clInterfaceSimple_Composant.prototype.genererSiDroit=
    function(Droit,CodeAGenererTrue,CodeAGenererFalse)
{
    var Code='';
    Code+=' if(ALeDroit('+Droit+',"'+this.Table+'"))\n';
    Code+=' {\n';
    Code+= CodeAGenererTrue+'\n';
    Code+=' }\n';
    if (CodeAGenererFalse!=null)
    {
        Code+=' else\n';
        Code+=' {\n';
        Code+= CodeAGenererFalse+'\n';
        Code+=' }\n';
    }
    return Code;
}

clInterfaceSimple_Composant.prototype.getMaitre=
    function()
{
    return this.MonMaitre;
}

clInterfaceSimple_Composant.prototype.getLiaisonMaitre=
    function()
{
    if (this.MonMaitre!=null && this.IdDansTabEsclave!=null)
    return this.MonMaitre.getEsclaves()[this.IdDansTabEsclave].Liaison;
    else
    return null;
}


clInterfaceSimple_Composant.prototype.Attacher=
    function(Maitre,IdDansTabEsclave)
{
    this.IdDansTabEsclave=IdDansTabEsclave;
    return this.MonMaitre=Maitre;
}


clInterfaceSimple_Composant.prototype.getIdDansTabGlobalCompo=
    function()
{
    return this.my_IdDansTabGlobalCompo;
}

/* retourne le code généré */
clInterfaceSimple_Composant.prototype.GenererJS=
    function(){
        var Code="";
        Code+=this.GenererJSInit();
        Code+="\n";
        Code+=this.GenererJSCompo();
        return Code;
    }

clInterfaceSimple_Composant.prototype.GenererJSInit=
    function(){
        return "";
    }

clInterfaceSimple_Composant.prototype.GenererJSCompo=
    function(){
        return "";
    }

/* appellé à la fin */
clInterfaceSimple_Composant.prototype.GenererJSCompoXUL=
    function(){
        return "";
    }


/* *************** Composant Simple *************** */

clInterfaceSimple_CompoSimple.prototype=new clInterfaceSimple_Composant();

function clInterfaceSimple_CompoSimple(Label,Champ,Table,Nom)
{
    this.parent=clInterfaceSimple_Composant;
    this.parent(Label,Table,Nom);
    this.Champ=Champ;
}

clInterfaceSimple_CompoSimple.prototype.GenererJSInit=
    function(){
        var Code="";
        Code+='var '+this.MonNom+'=new clAttribut("'+this.Champ+'","'+this.Table+'",null);\n';
        return Code;
    }

/* *************** Esclave *************** */
function clInterfaceSimple_Esclave(Compo,Liaison)
{
    this.Compo=Compo;
    this.Liaison=Liaison;
}

/* *************** Composant Col *************** */
clInterfaceSimple_Col.prototype=new clInterfaceSimple_CompoSimple();

function clInterfaceSimple_Col(Label,Champ,Table,Liaison,Nom)
{
    this.parent=clInterfaceSimple_CompoSimple;
    this.parent(Label,Champ,Table,Nom);
    this.Liaison=Liaison;
}

 
/* *************** Composant Complexe *************** */
clInterfaceSimple_CompoComplexe.prototype=new clInterfaceSimple_Composant();

function clInterfaceSimple_CompoComplexe(Label,Table,Nom)
{
    this.parent=clInterfaceSimple_Composant;
    this.parent(Label,Table,Nom);
    this.Colonnes=new Array();
    this.Esclaves=new Array();
}

clInterfaceSimple_CompoComplexe.prototype.getEsclaves=
    function()
{
    return this.Esclaves;
}

clInterfaceSimple_CompoComplexe.prototype.AjouterColonne=
    function(Label,Champ,TabLiaison){

        var NomCol='Col_N'+this.Colonnes.length+'_'+Label+'_De_'+this.MonNom;
        var Table=null;
        var Liaison=null;

        if (TabLiaison!=null){
            Table=TabLiaison[TabLiaison.length-1];
            Liaison=TabLiaison2Liaison(TabLiaison,'Joint_'+NomCol);
        }

        /* table du maitre par defaut */
        if (Table==null)
        Table=this.Table;

        var col=new clInterfaceSimple_Col(Label,Champ,Table,Liaison,NomCol);
        this.Colonnes.push(col);
    }


clInterfaceSimple_CompoComplexe.prototype.AjouterEsclave=
    function(Compo,TabLiaison){
        // var Table=null;
        var Liaison=null;

        if (TabLiaison!=null)
        {
            //Table=TabLiaison[TabLiaison.length-1];
            Liaison=TabLiaison2Liaison(TabLiaison,'Joint_Esclave_'+Compo.getNom());
        }

        /* table du maitre par defaut */
        /*     if (Table==null)
               Table=this.Table;*/

        var esc=new clInterfaceSimple_Esclave(Compo,Liaison);
        Compo.Attacher(this,this.Esclaves.length);
        this.Esclaves.push(esc);

    }

//clInterfaceSimple_CompoComplexe.prototype.GenererJS=
//    function(){
//        var Code="";
//        Code+=this.GenererJSInit();
//        Code+="\n";
//        Code+=this.GenererJSCompo();
//
//        var i,slave;
//         /* Esclaves */
//        for(i=0;i<this.Esclaves.length;i++)
//        {
//             slave=this.Esclaves[i];
//             NomSlave='Slave_'+i+'_de_'+this.MonNom;
//             Code+=slave.Compo.GenererJSCompoXUL(NomSlave);
//        }        
//
//        return Code;
//    }

clInterfaceSimple_CompoComplexe.prototype.GenererJSInit=
    function(){

        var Nom=this.MonNom;

         /* on doit d'abord créér les colonnes */
         var col,slave,i;
         var NomCol,NomJoint,NomSlave,NomJointSlave;
         var TabNomCol,TabNomJoint,TabNomSlave,TabNomJointSlave;
         var Code="";

         TabNomCol=new Array();
         TabNomJoint=new Array();

         TabNomSlave=new Array();
         TabNomJointSlave=new Array();


         for(i=0;i<this.Colonnes.length;i++)
         {
             col=this.Colonnes[i];
             //NomCol='Col_'+i+'_de_'+Nom;
             Code+=col.GenererJS();
            NomCol=col.getNom();
             /* jointure éventuelle */
             if (col.Liaison!=null)
                 {
                     //NomJoint='Joint_De_Col_'+i+'_De_'+Nom;
                     Code+=col.Liaison.GenererJS(this.Table,true);
                    NomJoint=col.Liaison.getNom();
                 }
             else
                 NomJoint='null';

             TabNomCol.push(NomCol);
             TabNomJoint.push(NomJoint);
         }

         /* Esclaves */
        for(i=0;i<this.Esclaves.length;i++)
        {
             slave=this.Esclaves[i];
            //NomSlave='Slave_'+i+'_de_'+Nom;
            Code+=slave.Compo.GenererJS();
            NomSlave=slave.Compo.getNom();
            /* jointure éventuelle */
            if (slave.Liaison!=null)
            {
                //NomJointSlave='Joint_De_Slave_'+i+'_De_'+Nom;
                Code+=slave.Liaison.GenererJS(this.Table);
                NomJointSlave=slave.Liaison.getNom();
            }
            else
            NomJointSlave='null';
            
            TabNomSlave.push(NomSlave);
            TabNomJointSlave.push(NomJointSlave);
        }                

         /* On génère le code pour nous */

         Code+='var '+Nom+'=new clEnsembleAttributs("'+this.Table+'",\n\tnew Array(\n\t';

         for(i=0;i<this.Colonnes.length;i++)
         {
             if(i!=0)
                 Code+=",";
             Code+="new clLiaison("+TabNomJoint[i]+","+TabNomCol[i]+")\n\t";
         }
         Code+="),\n\t";

         /* esclave */
        if (TabNomSlave.length==0)
        {
            Code+="null";
        }
        else
        {
            Code+="new Array(\n\t";
            for(i=0;i<TabNomSlave.length;i++)
            {
                if(i!=0)
                    Code+=",";
                Code+="new clLiaison("+TabNomJointSlave[i]+","+TabNomSlave[i]+")\n\t";
            }
            Code+=")";
        }

         Code+=");\n"

         return Code;
    }

/* classes externes */


/* *************** ComposantVisuelSimple *************** */
clInterfaceSimple_CompoVisuelSimple.prototype=new clInterfaceSimple_CompoSimple();

function clInterfaceSimple_CompoVisuelSimple(Label,Champ,Table,Nom,Theme)
{
    if (arguments.length==0)
        return;

    this.parent=clInterfaceSimple_CompoSimple;
    this.parent(Label,Champ,Table,Nom);

    if (Theme==null)
        this.MonTheme=new clInterfaceSimple_ThemeXulVide(this.MonNom);
    else
        this.MonTheme=Theme;

    this.MonTheme.Attacher(this);

    this.Mode=LECTURE;

    this.CodeUserOnInit=null;
}

clInterfaceSimple_CompoVisuelSimple.prototype.ResetMode=
    function()
{
    this.Mode=0;
}

clInterfaceSimple_CompoVisuelSimple.prototype.AddMode=
    function(mode)
{
    this.Mode|=mode;
}

clInterfaceSimple_CompoVisuelSimple.prototype.getMode=
    function()
{
    return this.Mode;
}


clInterfaceSimple_CompoVisuelSimple.prototype.Can=
    function(Mode)
{
    return ((this.Mode & Mode) == Mode);
}

clInterfaceSimple_CompoVisuelSimple.prototype.GenererXUL=
    function(){
        return this.MonTheme.GenererXUL();
    }

clInterfaceSimple_CompoVisuelSimple.prototype.setParentXul=
    function(ParentXul){
        this.MonTheme.setParentXul(ParentXul);
    }

clInterfaceSimple_CompoVisuelSimple.prototype.getTheme=
    function(){
        return this.MonTheme;
    }

clInterfaceSimple_CompoVisuelSimple.prototype.setTheme=
    function(Theme){
        this.MonTheme=Theme;
    }

clInterfaceSimple_CompoVisuelSimple.prototype.GenererJSCompoXUL=
    function(){
        return InterfaceSimple_CompoVisuel_GenererJSCompoXUL(this);

        //         var Code="";
        //         var Nom=this.MonNom;
        //         var ParentXul='top.document.getElementById("'+this.MonTheme.getParentXul()+'")';
        //
        //         Code+='\n\t/* Ce composant représente: '+this.Table+'.'+this.Champ+' sous le nom "'+this.Label+'" */\n';
        //         if (DEBUG_ON)
        //         {
        //                 Code+='Compo_'+Nom+'.setDebugInfo('+IdDansTabGlobalCompo+');\n';
        //         }
        //         Code+='Compo_'+Nom+'.GenererXUL('+ParentXul+');\n';
        //
        //         Code+=this.genererSiDroit(DT_SELECT,'','Compo_'+Nom+'.Hide();\n');
        //
        //         Code+="\n\t/* On l'ajoute au tableau global à l'indice "+IdDansTabGlobalCompo+"*/\n";
        //         this.my_IdDansTabGlobalCompo=IdDansTabGlobalCompo;
        //         Code+='top.'+NomTabGlobalCompo+'.push(Compo_'+Nom+');\n';
        //         IdDansTabGlobalCompo++;
        //         return Code;
    }

/* *************** ComposantVisuelComplexe *************** */

clInterfaceSimple_CompoVisuelComplexe.prototype=new clInterfaceSimple_CompoComplexe();

function clInterfaceSimple_CompoVisuelComplexe(Label,Table,Nom,Theme)
{
    if (arguments.length==0)
        return;

    this.parent=clInterfaceSimple_CompoComplexe;
    this.parent(Label,Table,Nom);
    this.ParentXul=null;
    //this.Filtre=null;

    if (Theme==null)
        this.MonTheme=new clInterfaceSimple_ThemeXulVide(this.MonNom);
    else
        this.MonTheme=Theme;

    this.MonTheme.Attacher(this);

    this.ParentXul=this.MonTheme.getParentXul();
    //this.Filtre=this.MonTheme.getFiltre();

    this.FortementLieA=null;

    /* pour les evenement utilisateur */
    this.OnModeInsertUpdate=null

        this.OnModeInsert=null;
    this.BeforeInsert=null;
    this.AfterInsert=null;

    this.OnModeUpdate=null;
    this.BeforeUpdate=null;
    this.AfterUpdatet=null;

    this.OnModeDelete=null;
    this.BeforeDelete=null;
    this.AfterDelete=null;

    this.BeforeValidate=null;
    this.AfterValidate=null;

    this.AfterCancel=null;

    this.Mode=LECTURE;

    this.CodeUserOnInit=null;
}

clInterfaceSimple_CompoVisuelComplexe.prototype.ResetMode=
    function()
{
    this.Mode=0;
}

clInterfaceSimple_CompoVisuelComplexe.prototype.AddMode=
    function(mode)
{
    this.Mode|=mode;
}

clInterfaceSimple_CompoVisuelComplexe.prototype.getMode=
    function()
{
    return this.Mode;
}


clInterfaceSimple_CompoVisuelComplexe.prototype.Can=
    function(Mode)
{
    return ((this.Mode & Mode) == Mode);
}


clInterfaceSimple_CompoVisuelComplexe.prototype.GenererXUL=
    function(){
        return this.MonTheme.GenererXUL(this.Esclaves);
    }


clInterfaceSimple_CompoVisuelComplexe.prototype.getTheme=
    function(){
        return this.MonTheme;
    }

clInterfaceSimple_CompoVisuelComplexe.prototype.setTheme=
    function(Theme){
        this.MonTheme=Theme;
    }


clInterfaceSimple_CompoVisuelComplexe.prototype.setParentXul=
    function(ParentXul){
        this.MonTheme.setParentXul(ParentXul);
    }


clInterfaceSimple_CompoVisuelComplexe.prototype.GenererJSCompoXUL=
    function(){
        return InterfaceSimple_CompoVisuel_GenererJSCompoXUL(this);

        //         var Code="";
        //         var Nom=this.MonNom;
        //         var ParentXul='top.document.getElementById("'+this.MonTheme.getParentXul()+'")';
        //
        //         Code+='\n\t/* Ce composant représente: des éléments de la table '+this.Table+' sous le nom "'+this.Label+'" */\n';
        //         if (DEBUG_ON)
        //         {
        //                 Code+='Compo_'+Nom+'.setDebugInfo('+IdDansTabGlobalCompo+');\n';
        //         }
        //         Code+='Compo_'+Nom+'.GenererXUL('+ParentXul+');\n';
        //         Code+=this.genererSiDroit(DT_SELECT,'','Compo_'+Nom+'.Hide();\n');
        //         this.my_IdDansTabGlobalCompo=IdDansTabGlobalCompo;
        //         Code+="\n\t/* On l'ajoute au tableau global à l'indice "+IdDansTabGlobalCompo+"*/\n";
        //         Code+='top.'+NomTabGlobalCompo+'.push(Compo_'+Nom+');\n';
        //         IdDansTabGlobalCompo++;
        //        return Code;
    }

function InterfaceSimple_CompoVisuel_GenererJSCompoXUL(Composant)
{
    var Code="";
    var Nom=Composant.MonNom;
    var ParentXul='top.document.getElementById("'+Composant.MonTheme.getParentXul()+'")';

    if (Composant instanceof clInterfaceSimple_CompoVisuelComplexe)
        Code+='\n\t/* Ce composant représente: '+Composant.Table+'.'+Composant.Champ+' sous le nom "'+Composant.Label+'" */\n';
    else
        Code+='\n\t/* Ce composant représente: des éléments de la table '+Composant.Table+' sous le nom "'+Composant.Label+'" */\n';


    //Composant.my_IdDansTabGlobalCompo=IdDansTabGlobalCompo++;

    if (DEBUG_ON)
        {
            Code+='Compo_'+Nom+'.setDebugInfo('+Composant.my_IdDansTabGlobalCompo+');\n';
        }
    //Code+='Compo_'+Nom+'.GenererXUL('+ParentXul+');\n';

    if (Composant.CodeUserOnInit!=null)
        Code+=Composant.CodeUserOnInit;

    Code+=Composant.genererSiDroit(DT_SELECT,'Compo_'+Nom+'.GenererXUL('+ParentXul+');\n');

    //Code+=Composant.genererSiDroit(DT_SELECT,'','Compo_'+Nom+'.Hide();\n');

    Code+="\n\t/* On l'ajoute au tableau global à l'indice "+Composant.my_IdDansTabGlobalCompo+"*/\n";
    Code+='top.'+NomTabGlobalCompo+'['+Composant.my_IdDansTabGlobalCompo+']=Compo_'+Nom+';\n';
    return Code;
}




function CalculerFiltre(theme,NomClasse)
{
    /* on construit les filtres */
    var TabFiltre=theme.getFiltre();
    var Filtre;

    if (TabFiltre.length==1)
        {
            if (TabFiltre[0]=="null")
                Filtre="null";
            else
                Filtre='new Array('+TabFiltre[0]+')';
        }
    else
        {

            Filtre='new Array(';

            if (TabFiltre[0]=="null")
                {
                    /* on met le filtre par default */
                    Filtre+=NomClasse+'.prototype.FiltreParDefaut(),';
                }
            else
                Filtre+=TabFiltre[0]+',';

            var i;
            for(i=1;i<TabFiltre.length;i++)
                {
                    if (i!=1)
                        Filtre+=',';
                    Filtre+=TabFiltre[i];
                }
            Filtre+=")";
        }
    return Filtre;
}


/* *************** Label *************** */
clInterfaceSimple_Label.prototype=new clInterfaceSimple_CompoVisuelSimple();

function clInterfaceSimple_Label(Label,Champ,Table,Nom,Theme)
{
    this.parent=clInterfaceSimple_CompoVisuelSimple;
    this.parent(Label,Champ,Table,Nom,Theme);
}

clInterfaceSimple_Label.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompolabel');

        Code+='\n\t/* Ce composant représente: '+this.Table+'.'+this.Champ+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompolabel('+Nom+','+Filtre+',"'+this.Label+'",'+this.MotDePasse+','+this.MultiLine+');\n';
        return Code;
    }



/* *************** TextBox *************** */
clInterfaceSimple_TextBox.prototype=new clInterfaceSimple_CompoVisuelSimple();

function clInterfaceSimple_TextBox(Label,Champ,Table,Nom,Theme,MotDePasse,MultiLine)
{
    this.parent=clInterfaceSimple_CompoVisuelSimple;
    this.parent(Label,Champ,Table,Nom,Theme);

    if (MotDePasse==null)
        MotDePasse=false;
    if (MultiLine==null)
        MultiLine=false;

    this.MotDePasse=MotDePasse;
    this.MultiLine=MultiLine;
}

clInterfaceSimple_TextBox.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompoTextBox');

        Code+='\n\t/* Ce composant représente: '+this.Table+'.'+this.Champ+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompoTextBox('+Nom+','+Filtre+',"'+this.Label+'",'+this.MotDePasse+','+this.MultiLine+');\n';
        return Code;
    }


/* *************** ListeDeroulanteStatic *************** */
clInterfaceSimple_ListeDeroulanteStatic.prototype=new clInterfaceSimple_CompoVisuelSimple();

function clInterfaceSimple_ListeDeroulanteStatic(Label,Champ,Table,Nom,Theme,ListeDeValeur)
{
    this.parent=clInterfaceSimple_CompoVisuelSimple;
    this.parent(Label,Champ,Table,Nom,Theme);
    this.ListeDeValeur=ListeDeValeur;
}

clInterfaceSimple_ListeDeroulanteStatic.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompoListeDeroulanteStatic');

        var TabStr="new Array(";
        var i;
        for(i=0;i<this.ListeDeValeur.length;i++)
        {
            if(i!=0)
                TabStr+=",";

            TabStr+="'"+this.ListeDeValeur[i]+"'";
        }
        TabStr+=')';

        Code+='\n\t/* Ce composant représente: '+this.Table+'.'+this.Champ+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompoListeDeroulanteStatic('+Nom+','+Filtre+',"'+this.Label+'",'+TabStr+');\n';

        return Code;
    }



/* *************** ListeDeroulante *************** */
clInterfaceSimple_ListeDeroulante.prototype=new clInterfaceSimple_CompoVisuelSimple();

function clInterfaceSimple_ListeDeroulante(Label,Champ,Table,Nom,Theme)
{
    this.parent=clInterfaceSimple_CompoVisuelSimple;
    this.parent(Label,Champ,Table,Nom,Theme);
}

clInterfaceSimple_ListeDeroulante.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompoListeDeroulanteSimple');

        Code+='\n\t/* Ce composant représente: '+this.Table+'.'+this.Champ+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompoListeDeroulanteSimple('+Nom+','+Filtre+',"'+this.Label+'");\n';

        return Code;
    }


/* *************** CHECKBOX *************** */
clInterfaceSimple_CheckBox.prototype=new clInterfaceSimple_CompoVisuelSimple();

function clInterfaceSimple_CheckBox(Label,Champ,Table,Nom,Theme)
{
    this.parent=clInterfaceSimple_CompoVisuelSimple;
    this.parent(Label,Champ,Table,Nom,Theme);
}

clInterfaceSimple_CheckBox.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompoCheckBox');

        Code+='\n\t/* Ce composant représente: '+this.Table+'.'+this.Champ+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompoCheckBox('+Nom+','+Filtre+',"'+this.Label+'");\n';

        return Code;
    }

/* *************** COLOR *************** */
clInterfaceSimple_Color.prototype=new clInterfaceSimple_CompoVisuelSimple();

function clInterfaceSimple_Color(Label,Champ,Table,Nom,Theme)
{
    this.parent=clInterfaceSimple_CompoVisuelSimple;
    this.parent(Label,Champ,Table,Nom,Theme);
}

clInterfaceSimple_Color.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompoColor');

        Code+='\n\t/* Ce composant représente: '+this.Table+'.'+this.Champ+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompoColor('+Nom+','+Filtre+',"'+this.Label+'");\n';

        return Code;
    }


/* *************** Liste *************** */
clInterfaceSimple_Liste.prototype=new clInterfaceSimple_CompoVisuelComplexe();

function clInterfaceSimple_Liste(Label,Table,Nom,Theme)
{
    this.parent=clInterfaceSimple_CompoVisuelComplexe;
    this.parent(Label,Table,Nom,Theme);
    this.isDom=false;
}

clInterfaceSimple_Liste.prototype.setDom=
    function(isDom)
{
    this.isDom=isDom;
}

clInterfaceSimple_Liste.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;
        var i,col;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompoListe');

        Code+='var Titre_'+Nom+'=new Array(';
        /* on construit les labels des colonnes */
        for(i=0;i<this.Colonnes.length;i++)
        {
            if (i!=0)
                Code+=',';
            col=this.Colonnes[i];
            Code+='"'+col.Label+'"';
        }
        Code+=');\n';
        /* on construit le composant */
        Code+='\n\t/* Ce composant représente: des éléments de la table '+this.Table+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompoListe('+Nom+','+Filtre+',Titre_'+Nom+',"'+this.Label+'",true,'+this.isDom+');\n';
        return Code;
    }




/* *************** ListeDeroulanteMulti *************** */

clInterfaceSimple_ListeDeroulanteMulti.prototype=new clInterfaceSimple_CompoVisuelComplexe();

function clInterfaceSimple_ListeDeroulanteMulti(Label,Table,Nom,Theme)
{
    this.parent=clInterfaceSimple_CompoVisuelComplexe;
    this.parent(Label,Table,Nom,Theme);
}

clInterfaceSimple_ListeDeroulanteMulti.prototype.GenererJSCompo=
    function(){
        var Code='';
        var Nom=this.MonNom;
        var i,col;

        /* on construit les filtres */
        var Filtre=CalculerFiltre(this.MonTheme,'clCompoListeDeroulanteMulti');

        Code+='var Titre_'+Nom+'=new Array(';
        /* on construit les labels des colonnes */
        for(i=0;i<this.Colonnes.length;i++)
        {
            if (i!=0)
                Code+=',';
            col=this.Colonnes[i];
            Code+='"'+col.Label+'"';
        }
        Code+=');\n';
        /* on construit le composant */
        Code+='\n\t/* Ce composant représente: des éléments de la table '+this.Table+' sous le nom "'+this.Label+'" */\n';
        Code+='var Compo_'+Nom+'=new clCompoListeDeroulanteMulti('+Nom+','+Filtre+',Titre_'+Nom+',"'+this.Label+'");\n';
        return Code;
    }


/* *************** Theme Xul *************** */
function clInterfaceSimple_ThemeXul(ParentXul,Filtre)
{
    this.ParentXul=ParentXul;

    this.my_HasInsertMajSup=false;

    this.TabFiltre=new Array();

    if (Filtre==null)
        this.TabFiltre.push('null');
    else
        this.TabFiltre.push(Filtre);

    this.MonComposantVisuel=null;
}

clInterfaceSimple_ThemeXul.prototype.HasInsertMajSup=
    function()
{
    return this.my_HasInsertMajSup;
}

clInterfaceSimple_ThemeXul.prototype.Attacher=
    function(ComposantVisuel)
{
    this.MonComposantVisuel=ComposantVisuel;
}

clInterfaceSimple_ThemeXul.prototype.AddFiltre=
    function(Filtre)
{
    this.TabFiltre.push(Filtre);
}

clInterfaceSimple_ThemeXul.prototype.getFiltre=
    function()
{
    return this.TabFiltre;
}


clInterfaceSimple_ThemeXul.prototype.getParentXul=
    function()
{
    return this.ParentXul;
}

clInterfaceSimple_ThemeXul.prototype.setParentXul=
    function(ParentXul)
{
    this.ParentXul=ParentXul;
}

clInterfaceSimple_ThemeXul.prototype.GenererXUL=
    function(){
        return "";
    }


/* *************** Theme Xul Vide *************** */
clInterfaceSimple_ThemeXulVide.prototype=new clInterfaceSimple_ThemeXul();

function clInterfaceSimple_ThemeXulVide(Nom,Filtre)
{
    this.parent=clInterfaceSimple_ThemeXul;
    this.parent(Nom,Filtre);
}

clInterfaceSimple_ThemeXulVide.prototype.GenererXUL=
    function(){
        return "";
        //'<vbox id="'+this.MonNom+'"/>\n';
    }



function genererButtonInsertMajSupXul(Composant)
{
    var Code='';
    var ParentXul=MettreUnderScore(Composant.ParentXul);
    //if (Esclaves.length!=0)
    //{pack="center"
    //Code+='<hbox flex="1"/>\n';

    Code+='<arrowscrollbox  pack="end" align="stretch" class="fondstyle">\n';
//    Code+='<toolbar pack="end" align="stretch" class="fondstyle">\n';

    /*
    Code+='    <button class="icon_Ajouter" disabled="true" id="Insert_'+ParentXul+'" label="Ajouter" oncommand="Insert_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(INSERTION) ? "hidden='true'" : "")+'/>\n';
    Code+='    <button class="icon_Supprimer" disabled="true" id="Delete_'+ParentXul+'" label="Supprimer" oncommand="Delete_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(SUPPRESSION) ? "hidden='true'" : "")+'/>\n';
    Code+='    <button class="icon_Modifier" disabled="true" id="Update_'+ParentXul+'" label="Modifier" oncommand="Update_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(MODIFICATION) ? "hidden='true'" : "")+'/>\n';
    */
    Code+='    <button class="new-button16" disabled="true" id="Insert_'+ParentXul+'" label="Ajouter" oncommand="Insert_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(INSERTION) ? "hidden='true'" : "")+'/>\n';
    Code+='    <button class="edit-button16" disabled="true" id="Update_'+ParentXul+'" label="Modifier" oncommand="Update_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(MODIFICATION) ? "hidden='true'" : "")+'/>\n';
    Code+='    <button class="delete-button16" disabled="true" id="Delete_'+ParentXul+'" label="Supprimer" oncommand="Delete_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(SUPPRESSION) ? "hidden='true'" : "")+'/>\n';
    /*
    Code+='    <button class="icon_Ajouter" disabled="true" id="Insert_'+ParentXul+'" oncommand="Insert_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(INSERTION) ? "hidden='true'" : "")+'/>\n';
    Code+='    <button class="icon_Supprimer" disabled="true" id="Delete_'+ParentXul+'" oncommand="Delete_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(SUPPRESSION) ? "hidden='true'" : "")+'/>\n';
    Code+='    <button class="icon_Modifier" disabled="true" id="Update_'+ParentXul+'" oncommand="Update_'+ParentXul+'()" '+(!Composant.MonComposantVisuel.Can(MODIFICATION) ? "hidden='true'" : "")+'/>\n';
    */

    if (Composant.MonComposantVisuel.Can(INSERTION) || Composant.MonComposantVisuel.Can(MODIFICATION) || Composant.MonComposantVisuel.Can(SUPPRESSION))
        {
            Code+='    <button class="accept-button16" id="Validate_'+ParentXul+'" label="Valider" oncommand="Validate_'+ParentXul+'()"  disabled="true" />\n';
            Code+='    <button class="cancel-button16" id="Annuler_'+ParentXul+'" label="Annuler" oncommand="Annuler_'+ParentXul+'()"  disabled="true" />\n';
            Composant.my_HasInsertMajSup=true;
        }
//    Code+='</toolbar>\n';
    Code+='</arrowscrollbox>\n';
    //}
    return Code;
}

function stTabStrOnglets(Code,Compo)
{
    this.Code=Code;
    this.Compo=Compo;
}

function genererEsclaveXul(Composant,Esclaves)
{
    var i;
    var CodeSlaves='';
    var CodeSlave='';
    var Code4Flex='';
    var TabStrOnglets=new Array();
    /* on genere le code de ses esclaves */
    if (Esclaves.length!=0)
        {
            CodeSlaves+='<splitter collapse="before"> <grippy/> </splitter>\n';
            CodeSlaves+='<vbox flex="1" style="overflow:auto">\n';
            Code4Flex='';
            for(i=0;i<Esclaves.length;i++)
                {
                    CodeSlave=Esclaves[i].Compo.GenererXUL();
                    Code4Flex+=CodeSlave;
                    if (CodeSlave!="")
                        {
                            TabStrOnglets.push(new stTabStrOnglets(CodeSlave,Esclaves[i].Compo));
                            //CodeSlaves+=CodeSlave;
                        }
                    else
                        Esclaves[i].Compo.getTheme().setParentXul(Composant.ParentXul+'_Slaves');
                }
            /* si on n'as que des esclaves "simple" on flex */
            if (Code4Flex=='')
                CodeSlaves+='<vbox flex="1" id="'+Composant.ParentXul+'_Slaves"/>\n';
            else
                CodeSlaves+='<vbox id="'+Composant.ParentXul+'_Slaves"/>\n';

            if (TabStrOnglets.length!=0)
                {
                    if (TabStrOnglets.length==1)
                        {
                            /* pour un seul composant complexe en esclave on ne fait pas d'onglets */
                            CodeSlaves+=TabStrOnglets[0].Code;
                        }
                    else
                        {
                            /* pour plusieurs composants complexe en esclave on fait des onglets */
                            CodeSlaves+='<tabbox id="tabbox_'+Composant.ParentXul+'" flex="1">\n';
                            var max_onglets=NBONGLET;
//                            if (TabStrOnglets.length>=max_onglets) 
//                            CodeSlaves+='<hbox style="overflow:auto;">\n';
                            CodeSlaves+='<tabs ';
                            //if (TabStrOnglets.length>=max_onglets) 
//                            CodeSlaves+=' style="display: inline;"';
                            CodeSlaves+='>\n';
                            for(i=0;i<TabStrOnglets.length;i++) {
                                 CodeSlaves+='<tab label="'+TabStrOnglets[i].Compo.Label+'"/>\n';
                            }
                            CodeSlaves+='</tabs>\n';
//                            if (TabStrOnglets.length>=max_onglets) 
//                            CodeSlaves+='</hbox>\n';
//                            if (TabStrOnglets.length>=max_onglets) CodeSlaves+='<splitter/>"\n';
                            CodeSlaves+='<tabpanels flex="1">\n';
                            for(i=0;i<TabStrOnglets.length;i++)
                                {
                                    CodeSlaves+='<tabpanel flex="1">\n';
                                    CodeSlaves+=TabStrOnglets[i].Code;
                                    CodeSlaves+='</tabpanel>\n';
                                }
                            CodeSlaves+='</tabpanels>\n';
                            CodeSlaves+='</tabbox>\n';
                        }
                }
            CodeSlaves+=genererButtonInsertMajSupXul(Composant);
            CodeSlaves+='</vbox>\n';

        }
    return CodeSlaves;
}



/* *************** Theme Xul Liste 1 *************** */
clInterfaceSimple_ThemeXulListe1.prototype=new clInterfaceSimple_ThemeXul();

function clInterfaceSimple_ThemeXulListe1(Nom,Filtre)
{
    this.parent=clInterfaceSimple_ThemeXul;
    this.parent(Nom,Filtre);
    this.my_HasInsertMajSup=false;
}

clInterfaceSimple_ThemeXulListe1.prototype.GenererXUL=
    function(Esclaves){
        var Code='';
        Code+='<hbox flex="1">\n';
        Code+='<vbox id="'+this.ParentXul+'" flex="1"/>\n';
        Code+=genererEsclaveXul(this,Esclaves);
        Code+='</hbox>\n';
        return Code;
    }

/* *************** Theme Xul Liste Double *************** */
clInterfaceSimple_ThemeXulListeDouble.prototype=new clInterfaceSimple_ThemeXulListe1();

function clInterfaceSimple_ThemeXulListeDouble(Nom,Filtre,ListeHaut)
{
    this.parent=clInterfaceSimple_ThemeXulListe1;
    this.parent(Nom,Filtre);
    this.my_ListeHaut=ListeHaut;
}

clInterfaceSimple_ThemeXulListeDouble.prototype.GenererXUL=
    function(Esclaves)
{
    var Code='';
    var ParentXul=MettreUnderScore(this.ParentXul);

    Code+='<hbox flex="1">\n';
    //Code+='<groupbox flex="1" orient="horizontal">\n';

    Code+='<vbox id="ListeDessus_'+this.ParentXul+'" flex="1"/>\n';
    this.my_ListeHaut.getTheme().setParentXul("ListeDessus_"+this.ParentXul);
    Code+='<splitter><grippy/></splitter>\n';

    Code+='<vbox id="'+this.ParentXul+'" flex="1"/>\n';
    Code+=genererEsclaveXul(this,Esclaves);

    //Code+='</groupbox>\n';
    Code+='</hbox>\n';
    return Code;
}

/* *************** Interface *************** */

function clBoutonParam(Label,Fonction,Param)
{
    this.Label=Label;
    this.Fonction=Fonction;
    this.Param=Param;
}

function clInterfaceSimple(Nom)
{
    this.Maitre=null;
    this.Nom=Nom;
    this.TableauDeComposant=new Array();
    this.TableauListeDouble=new Array();
    this.CptId=0;
    this.Dependant=false;
    /* les onglets qui dépendent de nous */
    this.Mes_NomsFiltresDependants=new Array();
    // this.MaitreDeMonMaitre=null;
    this.CodeUser="";
    this.MesBoutons=new Array();
}

clInterfaceSimple.prototype.AjouterBouton=
    function(Label,Fonction,Param)
{
    this.MesBoutons.push(new clBoutonParam(Label,Fonction,Param));
}

clInterfaceSimple.prototype.AjouterMaitre=function(Label,Table)
{
    if (this.Maitre!=null)
    {
        alert("Warning de programmation:\nInterface:\n--->"+this.Nom+"\nRemplacement du Maitre\n");
        return this.Maitre;
    }
    var Nom=MettreUnderScore(this.Nom)+'_'+MettreUnderScore(Label)+this.CptId;
    var theme=new clInterfaceSimple_ThemeXulListe1(Nom,'new clInterfaceFiltrageVide()');
    this.Maitre=new clInterfaceSimple_Liste(Label,Table,Nom,theme);
    this.CptId++;
    this.Maitre.AddMode(INSERTION);
    this.Maitre.AddMode(SUPPRESSION);
    this.Maitre.AddMode(MODIFICATION);
    this.TableauDeComposant.push(this.Maitre);
    return this.Maitre;
}

/*
  Param => paramètre selon le type de composant
  ex: pour une LISTE_DEROULANTE_STATIC on passe un tableau de valeur
*/

clInterfaceSimple.prototype.AjouterComposantSimple=function(Label,Champ,TabLiaison,Composant,Type,theme,Param,Param2)
{
    var Table=null;
    var Nom=MettreUnderScore(this.Nom)+'_'+MettreUnderScore(Label)+'_'+this.CptId;
    this.CptId++;

    if (this.Maitre==null)
    {
        alert("Erreur de programmation:\nInterface:\n--->"+this.Nom+"\nAjouter un maitre\n");
        return null;
    }


    if (Type==null)
    Type=TEXT_BOX;

    /* par defaut */
    if (Composant==null)
    Composant=this.Maitre;

    if (TabLiaison!=null)
    {
         Table=TabLiaison[TabLiaison.length-1];
    }

    /* table par defaut */
    if (Table==null)
    Table=Composant.Table;

    if (theme!=null)
    theme.setParentXul(Nom);


    var compo=null;

    if (Type==LABEL)
    {
        compo=new clInterfaceSimple_Label(Label,Champ,Table,Nom,theme);
    }
    if (Type==TEXT_BOX)
    {
        compo=new clInterfaceSimple_TextBox(Label,Champ,Table,Nom,theme,Param,Param2);
    }
    if (Type==CHECKBOX)
    {
        compo=new clInterfaceSimple_CheckBox(Label,Champ,Table,Nom,theme);
    }

    if (Type==LISTE_DEROULANTE)
    {
        compo=new clInterfaceSimple_ListeDeroulante(Label,Champ,Table,Nom,theme);
    }

    if (Type==LISTE_DEROULANTE_STATIC)
    {
        compo=new clInterfaceSimple_ListeDeroulanteStatic(Label,Champ,Table,Nom,theme,Param);
    }

    if (Type==COLOR)
    {
        compo=new clInterfaceSimple_Color(Label,Champ,Table,Nom,theme);
    }

    Composant.AjouterEsclave(compo,TabLiaison);
    this.TableauDeComposant.push(compo);
    return compo;
}

clInterfaceSimple.prototype.AjouterComposantListeDouble=function(Label,TabLiaison,Composant,ListeHaut,theme)
{
    if (theme==null)
    theme=new clInterfaceSimple_ThemeXulListeDouble("",null,ListeHaut);

    var ParentXul=ListeHaut.getTheme().getParentXul();
    ListeHaut.setTheme(new clInterfaceSimple_ThemeXulVide(ParentXul,'new clInterfaceFiltrageVide()'));
    ListeHaut.setDom(true);
    var compo=this.AjouterComposantComplexe(Label,TabLiaison,Composant,LISTE_DOUBLE,theme);
    this.TableauListeDouble.push(compo);
    compo.AddMode(INSERTION);
    compo.AddMode(SUPPRESSION);
    compo.AddMode(MODIFICATION);
    return compo;
}


/* POUR LES LISTE_DEROULANTE_MULTI PARAM EST LE NOM DU CHAMPS */
clInterfaceSimple.prototype.AjouterComposantComplexe=function(Label,TabLiaison,Composant,Type,theme)
{
    var Table=null;
    var compo=null;
    var Nom=MettreUnderScore(this.Nom)+'_'+MettreUnderScore(Label)+'_'+this.CptId;

    if (this.Maitre==null)
    {
        alert("Erreur de programmation:\nInterface:\n--->"+this.Nom+"\nAjouter un maitre\n");
        return null;
    }


    /* par defaut */
    if (Composant==null)
    Composant=this.Maitre;

    if (TabLiaison!=null)
    {
        Table=TabLiaison[TabLiaison.length-1];
    }

    if(Type==null)
    Type=LISTE;

    /* table par defaut */
    if (Table==null)
    Table=Composant.Table;

    if (theme==null)
    theme=new clInterfaceSimple_ThemeXulListe1(Nom);
    else
    theme.setParentXul(Nom);

    if (Type==LISTE)
    {
        compo=new clInterfaceSimple_Liste(Label,Table,Nom,theme);
    }

    if (Type==LISTE_DOUBLE)
    {
        compo=new clInterfaceSimple_Liste(Label,Table,Nom,theme);
        compo.setDom(true);
    }

    if (Type==LISTE_DEROULANTE_MULTI)
    {
        compo=new clInterfaceSimple_ListeDeroulanteMulti(Label,Table,Nom,theme);
    }

    this.CptId++;
    Composant.AjouterEsclave(compo,TabLiaison);
    this.TableauDeComposant.push(compo);
    return compo;
}

clInterfaceSimple.prototype.AjouterComposantComplexeIndependant=function(Label,Table,theme)
{
    var Nom=MettreUnderScore(this.Nom)+'_Indpt_'+MettreUnderScore(Label)+'_'+this.CptId;

    if (theme==null)
    theme=new clInterfaceSimple_ThemeXulListe1(Nom,'new clInterfaceFiltrageVide()');
    else
    theme.setParentXul(Nom);

    var compo=new clInterfaceSimple_Liste(Label,Table,Nom,theme);

    this.CptId++;

    this.TableauDeComposant.push(compo);
    return compo;
}

/* Le composant doit être une liste de même nature que notre maitre */
clInterfaceSimple.prototype.LierA =
    function(Compo,InterfaceDpt)
{
    var Num=this.Mes_NomsFiltresDependants.length;
    var NomFiltre='Filtre_Dep_'+MettreUnderScore(this.Nom)+'_'+Num;
    Compo.getTheme().AddFiltre(NomFiltre+'=new clInterfaceFiltrageRelationOnglet("'+this.Nom+'",Gerer_'+MettreUnderScore(this.Nom)+',OuvrirOnglet_'+MettreUnderScore(InterfaceDpt.Nom)+')');
    this.Dependant=true;
    this.Mes_NomsFiltresDependants.push(NomFiltre);
}

/* idem que LierA mais lors d'un ajout on ajoute dans l'association avec son maitre */
clInterfaceSimple.prototype.LierFortementA =
    function(Compo,InterfaceDpt)
{
    var Num=this.Mes_NomsFiltresDependants.length;
    //InterfaceDpt.Maitre
    this.Maitre.FortementLieA=Compo;//InterfaceDpt.Maitre;
    var NomFiltre='Filtre_DepFor_'+MettreUnderScore(this.Nom)+'_'+Num;
    Compo.getTheme().AddFiltre(NomFiltre+'=new clInterfaceFiltrageRelationOnglet("'+this.Nom+'",Gerer_'+MettreUnderScore(this.Nom)+',OuvrirOnglet_'+MettreUnderScore(InterfaceDpt.Nom)+',true)');
    this.Dependant=true;
    this.Mes_NomsFiltresDependants.push(NomFiltre);
}

clInterfaceSimple.prototype.GenererInterfaceXulTab=function(NbTabs)
{
    var StrXul="";
    StrXul+=' <tab';
    if (NbTabs<=NBONGLET) StrXul+=' flex="100"';
    StrXul+=' maxwidth="250" minwidth="60" crop="end" class="tabbrowser-tab" id="Onglet_'+MettreUnderScore(this.Nom)+'" label="'+this.Nom+'"/>\n';
    return StrXul;
    /*
      var StrXul="";
      StrXul+=' <tab id="Onglet_'+MettreUnderScore(this.Nom)+'" >\n';
      StrXul+='  <label value="'+this.Nom+'"/>\n';
      StrXul+='  <deck>\n';
      StrXul+='    <toolbarbutton class="tabs-closebutton close-button" oncommand="FermerOnglet(\'Onglet_'+MettreUnderScore(this.Nom)+'\')"/>\n';
      StrXul+='  </deck>\n';
      StrXul+='</tab>\n';
      return StrXul;*/
}

clInterfaceSimple.prototype.GenererInterfaceXulPanel=function()
{
    var StrXul="";
    var i;
    var NomOnglet=MettreUnderScore(this.Nom);

    StrXul+='<tabpanel flex="1" id="OngletPanel_'+NomOnglet+'" >\n'

    StrXul+='<vbox flex="1">\n'
    StrXul+='<hbox flex="1">\n'
    /* On génère les xul */
    for(i=0;i<this.TableauDeComposant.length;i++)
    {
        /* que sur les maitre (les esclaves sont généré par les maitres */
        if (this.TableauDeComposant[i].getMaitre()==null)
        StrXul+=this.TableauDeComposant[i].GenererXUL();
    }
    //    StrXul+=this.Maitre.GenererXUL();
    StrXul+='</hbox>\n'
    
    // On générer les boutons
    if (this.MesBoutons.length>0 || this.Dependant){
        //StrXul+='<groupbox orient="horizontal">\n';
        StrXul+='<hbox class="fondstyle" pack="end">\n';
        //StrXul+='  <caption label="Fonctionnalités"/>\n';
        if (this.MesBoutons.length>0){
            StrXul+='  <arrowscrollbox orient="horizontal" flex="1" pack="start" align="center">\n';
            for(i=0;i<this.MesBoutons.length;i++)
//            StrXul+='    <button class="action-button16" label="'+this.MesBoutons[i].Label+'" oncommand="'+this.MesBoutons[i].Fonction+'('+this.MesBoutons[i].Param+');"/>\n';
            StrXul+='    <button label="'+this.MesBoutons[i].Label+'" oncommand="'+this.MesBoutons[i].Fonction+'('+this.MesBoutons[i].Param+');"/>\n';
            StrXul+='  </arrowscrollbox>\n';
        }
        if (this.Dependant)
        {
            StrXul+='  <hbox pack="end" align="center">\n';
            //??? StrXul+='<button label="Defiltrer"/>\n';
            StrXul+='    <separator class="groove"/>\n';
//            StrXul+='    <button class="back-button16" label="Retour à l\'onglet précédent" oncommand="Retour_'+NomOnglet+'()"/>\n';
            StrXul+='    <button class="back-button16" label="Précédent" oncommand="Retour_'+NomOnglet+'()"/>\n';
            StrXul+='  </hbox>\n';
        }
        StrXul+='</hbox>\n';
        //StrXul+='</groupbox>\n';
    }
    
    StrXul+='</vbox>\n'

    StrXul+='</tabpanel>\n';

    return StrXul;
}

clInterfaceSimple.prototype.GenererInterfaceGenererFctEntete=
    function()
{
    var StrJsDebut='';
    var StrJs='';
    var i;
    top.document.getElementById("res").value+="Génération de l'onglet "+this.Nom+"...\n";
    StrJs+="\n\n/* *********************************************** \n";
    StrJs+="         FONCTIONS POUR L'ONGLET "+this.Nom+"\n";
    StrJs+="   ***********************************************/ \n\n";

    StrJs+=" /* FILTRES DE RELATION ENTRE ONGLETS => VARIABLES GLOBALES POUR ETRE ACCESSIBLES DEPUIS INTERFACE_USER.JS */\n\n";
    for(i=0;i<this.Mes_NomsFiltresDependants.length;i++)
    {
        StrJs+=' var '+this.Mes_NomsFiltresDependants[i]+';\n';
    }
//	alert('1');

    var NomOnglet=MettreUnderScore(this.Nom);

    /* pour l'ouverture d'onglet */
    if (this.Dependant)
    {
        /* ------------ FUNCTION RETOUR ----------------*/
        /* on revient à l'onget qui nous a appellé */
        StrJs+='function Retour_'+NomOnglet+'()\n';
        StrJs+='{\n';
        for (j=0;j<this.Mes_NomsFiltresDependants.length;j++)
            {
                var MonNomDeFiltre=this.Mes_NomsFiltresDependants[j];
                StrJs+=' if ('+MonNomDeFiltre+'.my_Filtre.getEtat())\n';
                StrJs+=' {\n';
                StrJs+='         '+MonNomDeFiltre+'.FctFermetureOnglet();\n';
                StrJs+=' }\n';
            }
        StrJs+='}\n';


        StrJs+='function Gerer_'+NomOnglet+'(IdFiltreOnglet)\n';
        StrJs+='{\n';
        if (this.Maitre.FortementLieA!=null)
            {
                StrJs+='/* Pour les filtrage fort on ne doit pas être en mode insertion */\n';
                /* si notre compo maitre est en mode insert */
                var MyMasterGerer=this.Maitre.FortementLieA.MonMaitre;
                StrJs+='if(TAB_COMPO_PPTES['+MyMasterGerer.getIdDansTabGlobalCompo()+'].Action_en_cours == INSERT)\n';
                StrJs+='{\n';
                StrJs+='        if (confirm("Pour continuer, vous devez enregistrer votre saisie\\n Voulez vous poursuivre ?"))\n';
                StrJs+='        {\n';
                StrJs+='                var CleValide=Validate_'+MyMasterGerer.getTheme().getParentXul()+'(false);\n';
                StrJs+='                if (CleValide==-1)\n';
                StrJs+='                {\n';
                StrJs+='                        return;\n';
                StrJs+='                }\n';
                StrJs+='                CleValide=Update_'+MyMasterGerer.getTheme().getParentXul()+'();\n';
                StrJs+='                if (CleValide==-1)\n';
                StrJs+='                {\n';
                StrJs+='                        alert("Erreur l\'enregistrement n\'a pas étais correctement inséré");\n';
                StrJs+='                        return;\n';
                StrJs+='                }\n';
                StrJs+='        }\n';
                StrJs+='        else\n';
                StrJs+='                 return;\n';
                StrJs+='}\n';
            }
        StrJs+='/* On désactive les autres filtres */\n';
        var FiltreOnglet;
        for (i=0;i<this.Mes_NomsFiltresDependants.length;i++)
            {
                FiltreOnglet=this.Mes_NomsFiltresDependants[i];
                StrJs+='if ('+FiltreOnglet+'.getId()!=IdFiltreOnglet)\n';
                StrJs+='{\n';
                StrJs+='        '+FiltreOnglet+'.OnClose(true,false);\n';
                StrJs+='}\n';
            }
        StrJs+='/* On change d\'onglet */\n';
        StrJs+=' var tabs = top.document.getElementById("'+NOM_CONTENEUR_ONGLETS+'");\n';
        StrJs+=' top.document.getElementById("'+NOM_CONTENEUR_ONGLETS+'").setAttribute("hidden","false");\n';
        StrJs+=' tabs.selectedItem = top.document.getElementById("Onglet_'+NomOnglet+'");\n';
        StrJs+='}\n';
        StrJs+='\n';
    }

    //StrJs+='function DesactiverFiltreGerer_'+NomOnglet+'()\n';
    StrJs+='function OuvrirOnglet_'+NomOnglet+'()\n';
    StrJs+='{\n';
    StrJs+=' var tabs = top.document.getElementById("'+NOM_CONTENEUR_ONGLETS+'");\n';
    StrJs+=' tabs.selectedItem = top.document.getElementById("Onglet_'+NomOnglet+'");\n';
    StrJs+='}\n';
    StrJs+='\n';

//	alert('2');

    /* Pour le code des boutons ajout/suppr/maj */

    for(i=0;i<this.TableauDeComposant.length;i++)
    {
//	alert('a');

        /* que sur les maitre (les esclaves sont généré par les maitres) */
        /* this.TableauDeComposant[i].getMaitre()==null && */
        var Compo=this.TableauDeComposant[i];
        //&& this.TableauDeComposant[i].getEsclaves().length!=0)
        if (Compo.getTheme().HasInsertMajSup())
            {
                var ParentXul=MettreUnderScore(Compo.getTheme().getParentXul());
                var Compo_slaves=Compo.getEsclaves();

                /* -------- FONCTION UTILISATEUR INSERT ---------------- */
                StrJsDebut+="/*************************************************\n";
                StrJsDebut+="  REQUETES UTILSATEUR : Onglet : "+this.Nom+"\n";
                StrJsDebut+="  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION\n";
                StrJsDebut+="***************************************************/\n";
                StrJsDebut+='function User_Insert_'+ParentXul+'(Compo_Maitre)\n';
                StrJsDebut+='{\n';

                StrJsDebut+='\n';
                StrJsDebut+='/*\n';
                StrJsDebut+='***** INFOS ******\n';
                StrJsDebut+='\n';
                StrJsDebut+='Nbr d\'esclaves = '+Compo_slaves.length+'\n';
                var j;
                for(j=0;j<Compo_slaves.length;j++)
                    {
                        var Compo_slave=Compo_slaves[j];
                        /*
                          this.Compo=Compo;
                          this.Liaison=Liaison;
                        */
                        StrJsDebut+='\nId dans le tab: '+Compo_slave.Compo.getIdDansTabGlobalCompo()+';\n';
                        //StrJsDebut+='Type: '+typeof Compo_slave.Compo+';\n';
                        StrJsDebut+=((Compo_slave.Compo instanceof clInterfaceSimple_CompoVisuelSimple) ? "simple" : "complexe")+"\n";
                        StrJsDebut+='Nbr Jointure: '+(Compo_slave.Liaison==null ? "PAS DE JOINTURE" : Compo_slave.Liaison.TabJointure.length)+';\n';
                        var k;
                        if(Compo_slave.Liaison!=null)
                            {
                                for(k=0;k<Compo_slave.Liaison.TabJointure.length;k++)
                                    {
                                        var joint=Compo_slave.Liaison.TabJointure[k];
                                        StrJsDebut+='    Joint n° '+k+' = '+joint.TableFin+','+joint.CleDebut+','+joint.CleFin+'\n';
                                    }
                            }
                    }
                StrJsDebut+='\n';
                StrJsDebut+='******************\n';
                StrJsDebut+='*/\n';
                StrJsDebut+='\n';

                StrJsDebut+=' var Table="'+Compo.Table+'";\n';
                StrJsDebut+=' var CleMaitre = TAB_COMPO_PPTES['+Compo.getIdDansTabGlobalCompo()+'].NewCle;\n';
                StrJsDebut+=' var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());\n';
                /* on get les esclaves */
                var j;
                var StrChampsNom='"+NomCleMaitre+"';
                var StrChampsVal='"+CleMaitre+"';
                var StrReqExec="";
                /* pour les sous maitres 1,N */
                if (Compo.getMaitre()!=null)
                    {
                        if (Compo.getLiaisonMaitre().TabJointure.length==1)
                            {
                                StrJsDebut+=' /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */\n';
                                StrChampsNom+=','+Compo.getLiaisonMaitre().TabJointure[0].CleFin;
                                StrChampsVal+=',"+TAB_COMPO_PPTES['+Compo.getMaitre().getIdDansTabGlobalCompo()+'].NewCle+"';
                            }
                    }
	//alert('**');

                for(j=0;j<Compo_slaves.length;j++)
                    {
// 	alert('++');
                        var Compo_slave=Compo_slaves[j];

                        /* si on a un composant simple */
                        /* Compo_slave.Compo.Champ!=null */
                        if (Compo_slave.Compo instanceof clInterfaceSimple_CompoVisuelSimple || Compo_slave.Compo instanceof clInterfaceSimple_ListeDeroulanteMulti)
                            {
                                var NomDansCode;
                                /* si on a une jointure */
                                if(Compo_slave.Liaison!=null)
                                    {
                                        NomDansCode=Compo_slave.Liaison.TabJointure[0].CleDebut;
                                        StrJsDebut+=Composant2VarValDansCode(Compo_slave.Compo,NomDansCode);
//	alert('+++');

                                        /* si on a plus d'une jointure */
                                        if(Compo_slave.Liaison.TabJointure.length>1)
                                            StrJsDebut+="/* ATTENTION COMPOSANT SIMPLE AVEC PLUS D'UNE JOINTURE ! */\n";
                                        StrJsDebut+=' if ('+NomDansCode+'=="-1")\n';
                                        StrJsDebut+='    '+NomDansCode+'="null";\n';
                                        StrJsDebut+=' if (!ValiderChampsObligatoire(Table,"'+NomDansCode+'",'+ComposantDansCode(Compo_slave.Compo)+','+NomDansCode+',true))\n';
                                        StrJsDebut+='         return -1;\n';
                                        StrChampsVal+=',"+'+NomDansCode+'+"';
                                    }
                                else
                                    {
	//alert('++++');
                                        NomDansCode=Compo_slave.Compo.Champ;
                                        StrJsDebut+=Composant2VarValDansCode(Compo_slave.Compo,NomDansCode);
                                        StrJsDebut+=' if (!ValiderChampsObligatoire(Table,"'+NomDansCode+'",'+ComposantDansCode(Compo_slave.Compo)+','+NomDansCode+',false))\n';
                                        StrJsDebut+='         return -1;\n';
                                        StrJsDebut+=' if (!ValiderChampsType(Table,"'+NomDansCode+'",'+ComposantDansCode(Compo_slave.Compo)+','+NomDansCode+'))\n';
                                        StrJsDebut+='         return -1;\n';
                                        /* on remplace les chaines vides par NULL */
                                        //StrJsDebut+='if('+NomDansCode+'=="")\n';
                                        //StrJsDebut+='    '+NomDansCode+'="null";\n';
                                        //                                        alert(Compo.Table);
                                        
                                        //                                        alert(mcd_getType(Compo.Table,NomDansCode));
                                        
//	alert('++++-'+Compo.Table+'#'+NomDansCode+'='+mcd_getType(Compo.Table, NomDansCode));
                                        if (mcd_getType(Compo.Table, NomDansCode)==TYPE_BOOL) {
//	alert('++++++-'+Compo.Table+'#'+NomDansCode);
                                            StrChampsVal+=',"+('+NomDansCode+'=="true" ? "true" : "false")+"';//"\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
	                                    } else {
	//alert('++++--');
                                        
	                                        if (NomDansCode=='couleur')
    	                                        StrChampsVal+=',"+('+NomDansCode+'==null ? "null" : "\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
        	                                else
            	                                StrChampsVal+=',"+('+NomDansCode+'=="" ? "null" : "\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
                	                        //StrChampsVal+=',\'"+ValiderChaine('+NomDansCode+')+"\'';

                                        }

                                    }

                                StrChampsNom+=","+NomDansCode;
//	alert('***');
                            }
                        else
                            /* on a un composant complexe */
                            {
	//alert('****');

                                if (Compo_slave.Compo.Can(INSERTION))
                                    {
                                        if(Compo_slave.Liaison!=null && Compo_slave.Liaison.TabJointure.length==2)
                                            {
                                                StrReqExec+='\n';
                                                StrReqExec+='/* table '+Compo_slave.Compo.Table+'*/\n';
                                                StrReqExec+='LstDouble_Exec_Req(GetSQLCompoAt('+Compo_slave.Compo.getIdDansTabGlobalCompo()+'),CleMaitre);\n';
                                            }
                                    }
                            }

                    }
                StrJsDebut+=' var Req="insert into "+Table+" ";\n';


                StrJsDebut+='var TabInsertionEnPlus=new Array();\n';
                if (Compo.BeforeInsert!=null)
                    {
                        StrJsDebut+=Compo.BeforeInsert+'TabInsertionEnPlus);\n';
                    }


                if (Compo.FortementLieA!=null)
                    {
                        StrJsDebut+='var Asso11=false;\n';
                        StrJsDebut+='var TabAsso11=new Array();\n';
                        StrJsDebut+='var CompoLie = GetSQLCompoAt('+Compo.FortementLieA.getIdDansTabGlobalCompo()+');\n';
                        StrJsDebut+='var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();\n';
                        StrJsDebut+='var CleLiasonForte = CompoLieMaitre.getCleVal();\n';
                        StrJsDebut+='if (CleLiasonForte!=-1)\n';
                        StrJsDebut+='{\n';
                        StrJsDebut+='        Asso11=GenererAssociation11(CompoLie,CleMaitre,CleLiasonForte,TabAsso11);\n';
                        StrJsDebut+='}\n';
                        StrJsDebut+='else\n';
                        StrJsDebut+='{\n';
                        StrJsDebut+='        alert("Vous devez d\'abord valider "+CompoLieMaitre.getLabel()+" puis mettre à jour.");\n';
                        StrJsDebut+='        return -1;\n';
                        StrJsDebut+='}\n';

                        StrJsDebut+=' Req+="('+StrChampsNom+'"+(Asso11?","+TabAsso11[0]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";\n';
                        StrJsDebut+=' Req+=" values ('+StrChampsVal+'"+(Asso11?","+TabAsso11[1]:"")+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";\n';
                    }
                else
                    {
                        StrJsDebut+=' Req+="('+StrChampsNom+'"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";\n';
                        StrJsDebut+=' Req+=" values ('+StrChampsVal+'"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";\n';
                    }
                StrJsDebut+="\n";
                //                StrJsDebut+="alert(Req);\n";

                StrJsDebut+=' if (pgsql_update(Req)==0)\n';
                StrJsDebut+='        alert("Echec lors de l\'insertion");\n';
                StrJsDebut+=(Compo.AfterInsert!=null ? Compo.AfterInsert+'\n':'');
                StrJsDebut+=StrReqExec;

                /* sur une liaison forte */
                if (Compo.FortementLieA!=null)
                    {
                        StrJsDebut+='if (CleLiasonForte!=-1 && !Asso11)\n';
                        StrJsDebut+='{\n';
                        StrJsDebut+='        AjouterAssociation(CompoLie,CleMaitre,CleLiasonForte);\n';
                        StrJsDebut+='}\n';
                        StrJsDebut+='else\n';
                        StrJsDebut+='{\n';
                        StrJsDebut+='        if (CleLiasonForte==-1)\n';
                        StrJsDebut+='        {\n';
                        StrJsDebut+='                alert("Attention votre enregistrement ne peux être relié à "+CompoLieMaitre.getLabel()+". Vous devez d\'abord ajouter un enregistrement à "+CompoLieMaitre.getLabel()+" puis le mettre à jour");\n';
                        StrJsDebut+='                return -1;\n';
                        StrJsDebut+='        }\n';
                        StrJsDebut+='}\n';
                    }


                StrJsDebut+='return CleMaitre;\n';
                StrJsDebut+='\n}\n';

//	alert('b');

                /* -------- FONCTION UTILISATEUR DELETE ---------------- */
                StrJsDebut+="/*************************************************\n";
                StrJsDebut+="  REQUETES UTILSATEUR : Onglet : "+this.Nom+"\n";
                StrJsDebut+="  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION \n";
                StrJsDebut+="***************************************************/\n";
                StrJsDebut+='function User_Delete_'+ParentXul+'(Compo_Maitre)\n';
                StrJsDebut+='{\n';
                StrJsDebut+=' var Table="'+Compo.Table+'";\n';
                StrJsDebut+=' var CleMaitre = Compo_Maitre.getCleVal();\n';
                StrJsDebut+=' var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());\n';
                StrJsDebut+=' var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;\n';
                StrJsDebut+="\n";
                //                StrJsDebut+="alert(Req);\n";
                StrJsDebut+=(Compo.BeforeDelete!=null ? Compo.BeforeDelete+'\n':'');

                /* sur une liaison forte */
                if (Compo.FortementLieA!=null)
                    {
                        StrJsDebut+='var CompoLie = GetSQLCompoAt('+Compo.FortementLieA.getIdDansTabGlobalCompo()+');\n';
                        StrJsDebut+='var CompoLieMaitre = CompoLie.my_Affichable.my_MaitresLiaison.getAttribut().GetComposant();\n';
                        StrJsDebut+='var CleLiasonForte = CompoLieMaitre.getCleVal();\n';
                        StrJsDebut+='if (CleLiasonForte!=-1)\n';
                        StrJsDebut+='{\n';
                        StrJsDebut+='        SuprimerAssociation(CompoLie,CleMaitre,CleLiasonForte);\n';
                        StrJsDebut+='}\n';
                        StrJsDebut+='else\n';
                        StrJsDebut+='{\n';
                        StrJsDebut+='        alert("Erreur "+CompoLieMaitre.getLabel()+" correspondant(e) Introuvable");\n';
                        StrJsDebut+='        return CleMaitre;\n';
                        StrJsDebut+='}\n';
                    }

                StrJsDebut+=' if (pgsql_update(Req)==0)\n';
//                StrJsDebut+='        alert("Echec lors de la suppression");\n';
                StrJsDebut+=(Compo.AfterDelete!=null ? Compo.AfterDelete+'\n':'');
                StrJsDebut+='return CleMaitre;\n';
                StrJsDebut+='\n}\n';


                /* -------- FONCTION UTILISATEUR UPDATE ---------------- */
                StrJsDebut+="/*************************************************\n";
                StrJsDebut+="  REQUETES UTILSATEUR : Onglet : "+this.Nom+"\n";
                StrJsDebut+="  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR \n";
                StrJsDebut+="***************************************************/\n";
                StrJsDebut+='function User_Update_'+ParentXul+'(Compo_Maitre)\n';
                StrJsDebut+='{\n';
                StrJsDebut+=' var Table="'+Compo.Table+'";\n';
                StrJsDebut+=' var CleMaitre = Compo_Maitre.getCleVal();\n';
                StrJsDebut+=' var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());\n';
                /* on get les esclaves */
                var j;
                var StrChampsNomVal='';
                var StrReqExec="";
                for(j=0;j<Compo_slaves.length;j++)
                    {
                        var Compo_slave=Compo_slaves[j];
                        /* si on a un composant simple */
                        if (Compo_slave.Compo instanceof clInterfaceSimple_CompoVisuelSimple || Compo_slave.Compo instanceof clInterfaceSimple_ListeDeroulanteMulti)
                            {
                                if(j!=0)
                                    StrChampsNomVal+=',';

                                var NomDansCode;
                                /* si on a une jointure */
                                if(Compo_slave.Liaison!=null)
                                    {
                                        NomDansCode=Compo_slave.Liaison.TabJointure[0].CleDebut;
                                        StrJsDebut+=Composant2VarValDansCode(Compo_slave.Compo,NomDansCode);

                                        /* si on a plus d'une joinutre */
                                        if(Compo_slave.Liaison.TabJointure.length>1)
                                            StrJsDebut+="/* ATTENTION COMPOSANT SIMPLE AVEC PLUS D'UNE JOINTURE ! */\n";
                                        StrJsDebut+=' if ('+NomDansCode+'=="-1")\n';
                                        StrJsDebut+='    '+NomDansCode+'="null";\n';
                                        StrJsDebut+=' if (!ValiderChampsObligatoire(Table,"'+NomDansCode+'",'+ComposantDansCode(Compo_slave.Compo)+','+NomDansCode+',true))\n';
                                        StrJsDebut+='         return -1;\n';
                                        StrChampsNomVal+=NomDansCode+'="+'+NomDansCode+'+"';
                                    }
                                else
                                    {
                                        NomDansCode=Compo_slave.Compo.Champ;
                                        StrJsDebut+=Composant2VarValDansCode(Compo_slave.Compo,NomDansCode);
                                        StrJsDebut+=' if (!ValiderChampsObligatoire(Table,"'+NomDansCode+'",'+ComposantDansCode(Compo_slave.Compo)+','+NomDansCode+',false))\n';
                                        StrJsDebut+='         return -1;\n';
                                        StrJsDebut+=' if (!ValiderChampsType(Table,"'+NomDansCode+'",'+ComposantDansCode(Compo_slave.Compo)+','+NomDansCode+'))\n';
                                        StrJsDebut+='         return -1;\n';
                                        //StrJsDebut+='if('+NomDansCode+'=="")\n';
                                        //StrJsDebut+='    '+NomDansCode+'="null";\n';

        
                                        if (mcd_getType(Compo.Table, NomDansCode)==TYPE_BOOL){
                                            //                                            StrJsDebut+="alert('>>> '+"+NomDansCode+");\n";
                                            
                                            StrChampsNomVal+=NomDansCode+'="+('+NomDansCode+'=="true" ? "true" : "false")+"';//"\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
                                        }
                                        else {
                                        
                                            if (NomDansCode=='couleur')
                                                StrChampsNomVal+=NomDansCode+'="+('+NomDansCode+'==null ? "null" : "\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
                                            else
                                                StrChampsNomVal+=NomDansCode+'="+('+NomDansCode+'=="" ? "null" : "\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
                                        //StrChampsVal+=',\'"+ValiderChaine('+NomDansCode+')+"\'';

                                        }


                                        /*
                                        if (NomDansCode=='couleur')
                                            StrChampsNomVal+=NomDansCode+'="+('+NomDansCode+'==null ? "null" : "\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
                                        else
                                            StrChampsNomVal+=NomDansCode+'="+('+NomDansCode+'=="" ? "null" : "\'"+ValiderChaine('+NomDansCode+')+"\'" )+"';
                                        //StrChampsNomVal+=NomDansCode+'=\'"+ValiderChaine('+NomDansCode+')+"\'';
                                        */
                                    }
                            }
                        else
                            /* on a un composant complexe */
                            {
                                if (Compo_slave.Compo.Can(MODIFICATION))
                                    {
                                        if(Compo_slave.Liaison!=null && Compo_slave.Liaison.TabJointure.length==2)
                                            {
                                                StrReqExec+='\n';
                                                StrReqExec+='/* table '+Compo_slave.Compo.Table+'*/\n';
                                                StrReqExec+='LstDouble_Exec_Req(GetSQLCompoAt('+Compo_slave.Compo.getIdDansTabGlobalCompo()+'),CleMaitre);\n';
                                            }
                                    }
                            }
                    }
                StrJsDebut+=' var Req="update "+Table+" set ";\n';
                StrJsDebut+=' Req+="'+StrChampsNomVal+'";\n';
                StrJsDebut+=' Req+=" where "+NomCleMaitre+"="+CleMaitre;\n';
                StrJsDebut+="\n";
                //                StrJsDebut+="alert(Req);\n";

                StrJsDebut+=(Compo.BeforeUpdate!=null ? Compo.BeforeUpdate+'"'+StrChampsNomVal+'");\n':'');
                StrJsDebut+=' if (pgsql_update(Req)==0)\n';
                StrJsDebut+='        alert("Echec lors de la mise à jour");\n';
                StrJsDebut+=(Compo.AfterUpdatet!=null ? Compo.AfterUpdatet+'\n':'');
                StrJsDebut+=StrReqExec;
                StrJsDebut+='return CleMaitre;\n';
                StrJsDebut+='\n}\n';


                /* -------- FONCTION INSERT ---------------- */
                var IdTab=Compo.getIdDansTabGlobalCompo();

                StrJs+='function Insert_'+ParentXul+'()\n';
                StrJs+='{\n';

                /* pour les sous maitres 1,N */
                var MyMaster=Compo.getMaitre();
                if (MyMaster!=null)
                    {
                        if (Compo.getLiaisonMaitre().TabJointure.length==1)
                            {
                                StrJs+=' if (TAB_COMPO_PPTES['+MyMaster.getIdDansTabGlobalCompo()+'].Action_en_cours == INSERT)\n';
                                StrJs+='         {\n';
                                StrJs+='                 if (confirm("Pour continuer, vous devez enregistrer votre saisie\\n Voulez vous poursuivre ?"))\n';
                                StrJs+='                {\n';
                                StrJs+='                        var CleValide=Validate_'+MyMaster.getTheme().getParentXul()+'(false);\n';
                                //StrJs+='                        '+Composant2VarDansCode(MyMaster,'MyMaster');
                                //StrJs+='                        if (!MyMaster.SelectItem(CleValide))\n';
                                //StrJs+='                        {\n';
                                //StrJs+='                                alert("Erreur Interne !\\n> Selectionnez le nouvel enregistrement et faite une mise à jour");\n';
                                //StrJs+='                        }\n';
                                StrJs+='                        if (CleValide==-1)\n';
                                StrJs+='                        {\n';
                                StrJs+='                                return -1;\n';
                                StrJs+='                        }\n';
                                StrJs+='                        CleValide=Update_'+MyMaster.getTheme().getParentXul()+'();\n';
                                StrJs+='                        if (CleValide==-1)\n';
                                StrJs+='                        {\n';
                                StrJs+='                                alert("Erreur l\'enregistrement n\'a pas étais correctement inséré");\n';
                                StrJs+='                                return -1;\n';
                                StrJs+='                        }\n';
                                StrJs+='                        Insert_'+Compo.getTheme().getParentXul()+'();\n';
                                StrJs+='                }\n';
                                StrJs+='                 return;\n';
                                StrJs+='         }\n';
                            }
                    }


                StrJs+=' TAB_COMPO_PPTES['+IdTab+'].Action_en_cours = INSERT;\n';
                StrJs+='/* On calcule la nouvelle clé */\n';
                StrJs+=' TAB_COMPO_PPTES['+IdTab+'].NewCle = getNewCle("'+Compo.Table+'");\n';
                StrJs+=genererActivationDesactivation(Compo,true);

                StrJs+=Composant2VarDansCode(Compo,"Maitre");
                StrJs+=" /* Pour une insertion on désectionne */\n";
                StrJs+=" var tree=Maitre.getComposantXul();\n";
                StrJs+=" if (tree.view!=null)\n";
                StrJs+=" {\n";
                StrJs+="         tree.currentIndex=-1;\n";
                StrJs+="         tree.view.selection.clearSelection();\n";
                StrJs+=" }\n";
                StrJs+=(Compo.OnModeInsertUpdate!=null ? Compo.OnModeInsertUpdate+'\n':'');
                StrJs+=(Compo.OnModeInsert!=null ? Compo.OnModeInsert+'\n':'');
                StrJs+='return TAB_COMPO_PPTES['+IdTab+'].NewCle;\n';
                StrJs+='}\n';
                StrJs+='\n';

                /* -------- FONCTION DELETE ---------------- */

                StrJs+='function Delete_'+ParentXul+'()\n';
                StrJs+='{\n';
                StrJs+=' if ('+NomTabGlobalCompo+'['+IdTab+'].getCleVal()==-1)\n';
                StrJs+=' {\n';
                StrJs+='         alert("Vous devez sélectionner l\'enregistrement à supprimer");\n';
                StrJs+='         return;\n';
                StrJs+=' }\n';
                StrJs+=' /* On recupère le composant maitre  */\n';
                StrJs+=Composant2VarDansCode(Compo,"Maitre");
                StrJs+=' if (confirm("Voulez vous vraiment supprimer l\'enregistrement en cours ?"))\n';
                StrJs+=' {\n';
                StrJs+='        TAB_COMPO_PPTES['+IdTab+'].Action_en_cours = DELETE;\n';
                StrJs+=(Compo.OnModeDelete!=null ? Compo.OnModeDelete+'\n':'');
                StrJs+='         User_Delete_'+ParentXul+'(Maitre);\n';
                //StrJs+=' alert("ok Delete");\n';
                StrJs+='        Maitre.RefreshTotal();\n';
                /* on revient à l'onget qui nous a appellé */
                /* on revient à l'onget qui nous a appellé */
                if (this.Maitre.getIdDansTabGlobalCompo()==IdTab)
                    {
                        for (j=0;j<this.Mes_NomsFiltresDependants.length;j++)
                            {
                                var MonNomDeFiltre=this.Mes_NomsFiltresDependants[j];

                                /* sur une liaision forte on ne revient pas */
                                if (MonNomDeFiltre.substring(0,14)!='Filtre_DepFor_')
                                    StrJs+='        '+MonNomDeFiltre+'.OnClose(true);\n';
                                else
                                    /* liaison forte: on refresh */
                                    StrJs+='        '+MonNomDeFiltre+'.Refresh();\n';
                            }
                    }
                StrJs+=' }\n';
                StrJs+='}\n';
                StrJs+='\n';

                /* -------- FONCTION UPDATE ---------------- */

                StrJs+='function Update_'+ParentXul+'()\n';
                StrJs+='{\n';
                StrJs+=' if ('+NomTabGlobalCompo+'['+IdTab+'].getCleVal()==-1)\n';
                StrJs+=' {\n';
                StrJs+='         alert("Vous devez selectionner l\'enregistrement à mettre à jour");\n';
                StrJs+='         return -1;\n';
                StrJs+=' }\n';
                StrJs+=' TAB_COMPO_PPTES['+IdTab+'].Action_en_cours = UPDATE;\n';
                StrJs+='/* On calcule la nouvelle clé */\n';
                StrJs+=' TAB_COMPO_PPTES['+IdTab+'].NewCle = '+NomTabGlobalCompo+'['+IdTab+'].getCleVal();\n';
                StrJs+=genererActivationDesactivation(Compo,true);
                StrJs+=(Compo.OnModeInsertUpdate!=null ? Compo.OnModeInsertUpdate+'\n':'');
                StrJs+=(Compo.OnModeUpdate!=null ? Compo.OnModeUpdate+'\n':'');
                StrJs+='return TAB_COMPO_PPTES['+IdTab+'].NewCle;\n';
                StrJs+='}\n';
                StrJs+='\n';

                /* -------- FONCTION VALIDATE -------------- */

                StrJs+='function Validate_'+ParentXul+'(retour)\n';
                StrJs+='{\n';
                StrJs+=' /* Retour à l\'onget appellant si appelle par gérer */\n';
                StrJs+='if (retour==null)\n';
                StrJs+='        retour=true;\n';
                StrJs+='\n';
                StrJs+=' /* On recupère le composant maitre  */\n';
                StrJs+=Composant2VarDansCode(Compo,"Maitre");
                StrJs+=(Compo.BeforeValidate!=null ? Compo.BeforeValidate+'\n':'');
                StrJs+=' /* On recupère la clé du nouvel enregistrement */\n';
                StrJs+=' var NewCle=null;\n';
                StrJs+=' switch(TAB_COMPO_PPTES['+IdTab+'].Action_en_cours){\n';
                StrJs+='        case INSERT :\n';
                StrJs+='        if ((NewCle = User_Insert_'+ParentXul+'(Maitre))==-1)\n';
                StrJs+='                return -1;\n';
                StrJs+='        break;\n';
                StrJs+='        case UPDATE :\n';
                                    StrJs+='        if ((User_Update_'+ParentXul+'(Maitre))==-1)\n';
                                    StrJs+='                return -1;\n';
                                    StrJs+='        break;\n';
                                    StrJs+=' }\n';
                                    StrJs+=' /* On construit la requete pour ajouter les nouvelles cles */\n';
                                    StrJs+=' if (NewCle!=null)\n';
                                    StrJs+=' {\n';
                                    StrJs+='         var ReqNewCle=new clReqSQL();\n';
                                    StrJs+='         var OldUnion=Maitre.my_ReqRefresh.getUnion();\n';
                                    StrJs+='        if (OldUnion==null)\n';
                                    StrJs+='        {\n';
                                    StrJs+='                ReqNewCle.Cloner(Maitre.my_ReqInterne);\n';
                                    StrJs+='        }\n';
                                    StrJs+='        else\n';
                                    StrJs+='        {\n';
                                    StrJs+='                ReqNewCle.Cloner(OldUnion);\n';
                                    StrJs+='        }\n';
                                    StrJs+='         ReqNewCle.AddWhere(Maitre.getCle()+" = "+NewCle,"OR");\n';
                                    StrJs+='        Maitre.Union(ReqNewCle);\n';
                                    StrJs+=' }\n';
                                    //StrJs+=' Maitre.AfterRefreshByMaitre();\n';

                                    StrJs+=genererActivationDesactivation(Compo,false);

                                    StrJs+=' if (NewCle==null)\n';
                                    StrJs+='         NewCle=TAB_COMPO_PPTES['+IdTab+'].NewCle;\n';
                                    StrJs+=' Maitre.ForceNextSelection(NewCle)\n';
                                    StrJs+=' Maitre.RefreshTotal();\n';

                                    StrJs+=' if(retour)\n';
                                    StrJs+=' {\n';
                                    /* on revient à l'onget qui nous a appellé */
                                    if (this.Maitre.getIdDansTabGlobalCompo()==IdTab)
                                        {
                                            for (j=0;j<this.Mes_NomsFiltresDependants.length;j++)
                                                {
                                                    var MonNomDeFiltre=this.Mes_NomsFiltresDependants[j];

                                                    /* sur une liaision forte on ne revient pas */
                                                    if (MonNomDeFiltre.substring(0,14)!='Filtre_DepFor_')
                                                        StrJs+=' '+MonNomDeFiltre+'.OnClose(false);\n';
                                                    else
                                                        /* liaison forte: on refresh */
                                                        StrJs+=' '+MonNomDeFiltre+'.Refresh();\n';
                                                }
                                        }
                                    StrJs+=' }\n';

                                    // ??? this.Mes_NomsFiltresDependants


                                    StrJs+=(Compo.AfterValidate!=null ? Compo.AfterValidate+'\n':'');
                                    StrJs+=' TAB_COMPO_PPTES['+IdTab+'].Action_en_cours = null;\n';
                                    StrJs+=' return NewCle;\n';
                                    StrJs+='}\n';
                                    StrJs+='\n';

                                    /* -------- FONCTION ANNULER --------------- */

                                    StrJs+='function Annuler_'+ParentXul+'()\n';
                                    StrJs+='{\n';
                                    StrJs+=' TAB_COMPO_PPTES['+IdTab+'].Action_en_cours = null;\n';
                                    StrJs+=genererActivationDesactivation(Compo,false);
                                    StrJs+=(Compo.AfterCancel!=null ? Compo.AfterCancel+'\n':'');
                                    StrJs+='}\n';
                                    StrJs+='\n';
            }
    }

    StrJs+="\n\n\n";

    this.CodeUser =  StrJsDebut;
    return StrJs;
}

clInterfaceSimple.prototype.getCodeUser=function()
{
    return this.CodeUser;
}

clInterfaceSimple.prototype.GenererInterfaceJsFin=function()
{
    var StrJs='';
    if (this.Dependant)
    {
        var i;
        for(i=0;i<this.Mes_NomsFiltresDependants.length;i++)
            StrJs+=this.Mes_NomsFiltresDependants[i]+'.setComposant('+NomTabGlobalCompo+'['+this.Maitre.getIdDansTabGlobalCompo()+'],null);\n';
    }


    /* Pour le code des boutons des liste doubles */
    var i;
    for(i=0;i<this.TableauListeDouble.length;i++)
    {
        var ParentXulDouble=MettreUnderScore(this.TableauListeDouble[i].getTheme().getParentXul());

        StrJs+='   /* ARBRE DU DESSUS */\n';
        StrJs+='   var box=top.document.getElementById("ListeDessus_'+ParentXulDouble+'");\n';
        StrJs+='   var Tab=ChercherCompo(box,"tree");\n';
        StrJs+='   var tree=Tab[0];\n';
        StrJs+='   tree.setAttribute("id","Tree_ListeDessus_'+ParentXulDouble+'");\n';
        StrJs+='   tree.setAttribute("ondblclick","DoubleClic_ArbreDessus(document.getElementById(\'Tree_ListeDessus_'+ParentXulDouble+'\'), document.getElementById(\'Tree_ListeDessous_'+ParentXulDouble+'\'))");\n';
        StrJs+='\n';
        StrJs+='   /* ARBRE DU DESSOUS */\n';
        StrJs+='   var box=top.document.getElementById("'+ParentXulDouble+'");\n';
        StrJs+='   var Tab=ChercherCompo(box,"tree");\n';
        StrJs+='   var tree=Tab[0];\n';
        StrJs+='   tree.setAttribute("id","Tree_ListeDessous_'+ParentXulDouble+'");\n';
        StrJs+='   tree.setAttribute("onkeypress","Suppr_ListeDessous(event)");\n';
        StrJs+='\n';
    }

    return StrJs;
}

clInterfaceSimple.prototype.GenererInterfaceJs=function()
{
    /* Fichier javascript */
    var StrJs="";
    var NomOnglet=MettreUnderScore(this.Nom);

    for(i=0;i<this.TableauDeComposant.length;i++)
    {
        /* que sur les maitre (les esclaves sont généré par les maitres */
        if (this.TableauDeComposant[i].getMaitre()==null)
            {
                StrJs+=this.TableauDeComposant[i].GenererJS();
            }
    }
    for(i=0;i<this.TableauDeComposant.length;i++)
    {
        StrJs+=this.TableauDeComposant[i].GenererJSCompoXUL();
    }

    //    StrJs+=this.Maitre.GenererJS(NomOnglet+'_Racine');
    //    StrJs+=this.Maitre.GenererJSCompoXUL(NomOnglet+'_Racine');
    //    StrJs+="\t/* ON MET LES GROUPES PAR RAPPORT A L'ONGLET */\n";
    //StrJs+=this.Maitre.ParentSetGroupe(Groupe);

    //    top.document.getElementById("res").value+="\n----JS - "+NomOnglet+" ----\n"+StrJs+"\n";

    return StrJs;
}

clInterfaceSimple.prototype.GenererInterfaceOnLoad=
    function()
{
    var StrJsTrue="",StrJsFalse="",StrJs="";
    var i;

    StrJsFalse+='top.document.getElementById("Onglet_'+MettreUnderScore(this.Nom)+'").hidden=true;\n';
    StrJsFalse+='if (top.document.getElementById("Onglet_'+MettreUnderScore(this.Nom)+'").selected)\n';
    StrJsFalse+='        top.document.getElementById("'+NOM_CONTENEUR_ONGLETS+'").advanceSelectedTab(1);\n';

    StrJsTrue+="/* On refresh les composants non dépendents de l'onget "+this.Nom+"*/\n";
    for(i=0;i<this.TableauDeComposant.length;i++)
    {
        if(this.TableauDeComposant[i].getMaitre()==null)
            {
                StrJsTrue+='var Composant_'+i+' = '+NomTabGlobalCompo+'['+this.TableauDeComposant[i].getIdDansTabGlobalCompo()+'];\n';
                StrJsTrue+='if (Composant_'+i+'!=null){\n';
                StrJsTrue+='Composant_'+i+'.ActiverComposant(true);\n';
                StrJsTrue+='Composant_'+i+'.Refresh();\n';
                StrJsTrue+='}\n';
            }
    }

    StrJs+=this.Maitre.genererSiDroit(DT_ONGLET,StrJsTrue,StrJsFalse);
    return StrJs;
}

clInterfaceSimple.prototype.GenererInterfaceChangementOnglet=
    function()
{
    var StrJs="";
    var i;
    StrJs+='case "Onglet_'+MettreUnderScore(this.Nom)+'" :\n';
    StrJs+=this.GenererInterfaceOnLoad();
    StrJs+='break;\n';

    return StrJs;
    //     /* Fichier javascript */
    //     return "";
    //     var StrJs="";
    //     if (this.MaitreDeMonMaitre==null)
    //         return "";
    //     StrJs+="if(PanelSelected.getAttribute('id')=='Onglet_"+NomOnglet+"')\n";
    //     StrJs+="\t{\n";
    //     StrJs+="\t\tvar Mon_Maitre=top."+NomTabGlobalCompo+"["+this.MaitreDeMonMaitre.getIdDansTabGlobalCompo()+"];\n";
    //     StrJs+="\t\tMon_Maitre.setGroupe("+Groupe+");\n";
    //     StrJs+="\t\tMon_Maitre.Refresh();\n";
    //     StrJs+="\t}\n";

    //     top.document.getElementById("res").value+="\n----JS - "+NomOnglet+" ----\n"+StrJs+"\n";

    //         return StrJs;
}


/* *************** Tab_Interface *************** */
function stMenu(Label,Fonction,Param)
{
    this.Label=Label;
    this.Fonction=Fonction;
    this.Param=Param;
}

function clTabInterfaceSimple()
{
    this.mes_interfaces=new Array();
    this.CodeUserLoad='';
    this.Includes='';
    this.MesMenus=new Array();
}

clTabInterfaceSimple.prototype.AjouterMenu=
    function(Label,Fonction,Param)
{
    this.MesMenus.push(new stMenu(Label,Fonction,Param));
}

clTabInterfaceSimple.prototype.IncludeJs=
    function(Fichier)
{
    this.Includes+='<script src="'+Fichier+'"/>\n';
}

clTabInterfaceSimple.prototype.AjouterCodeUserLoad=
    function(Code)
{
    this.CodeUserLoad+=Code;
}

clTabInterfaceSimple.prototype.AjouterInterface=
    function(It)
{
    this.mes_interfaces.push(It);
}

 /*
  * @param Nom du fichier
  * @param Si on construit nu overlay à la place d'une fenetre
  * @param Le titre de la fenetre
  * @param Sauvegarde automatique
  */

clTabInterfaceSimple.prototype.GenererInterface=
    function(MonNomFichier,overlay,TitreFenetre,AutoSave)
{
    if (overlay==null) overlay=false;

    var StrXul="";
    var StrJs="";
    var StrJsDebut="";
    var StrJsUser="";
    var i,NomFichier;

    /* ENTETE */

    StrXul+='<?xml version="1.0" encoding="ISO-8859-1"?>\n';
    //    StrXul+='<?xml version="1.0" encoding="UTF-8"?>\n';
    if (overlay)
    {
        StrXul+='<!--\n';
        StrXul+='FONCTION DE CHARGEMENT\n';
        StrXul+=MonNomFichier+'_Chargement() au chargement\n';
        StrXul+='SKIN A INCLURE\n';
        StrXul+='<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\n';
        StrXul+='<?xml-stylesheet href="chrome://browser/skin/" type="text/css"?>\n';
        StrXul+='<?xml-stylesheet href="chrome://gestsea/skin/icons.css" type="text/css"?>\n';
        StrXul+='-->\n';
    }
    else
    {
        StrXul+='<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\n';
        StrXul+='<?xml-stylesheet href="chrome://browser/skin/" type="text/css"?>\n';
        StrXul+='<?xml-stylesheet href="chrome://gestsea/skin/icons.css" type="text/css"?>\n';
    }

    StrXul+='<!-- CE FICHIER A ETE GENERE PAR GENERATOR_LIB -->\n\n';

    if (overlay)
    StrXul+='<overlay\n';
    else
    StrXul+='<window windowtype="gestsea:'+MonNomFichier+'" name="'+MonNomFichier+'" sizemode="maximized" \n';

    StrXul+='\tid="Page_'+MonNomFichier+'"\n';
    if (TitreFenetre==null) StrXul+='\ttitle="'+MonNomFichier+'"\n';
    else StrXul+='\ttitle="'+TitreFenetre+'"\n'
    StrXul+='\torient="vertical"\n';
    //    StrXul+='\tsizemode="maximized"\n';
    if (!overlay)
    StrXul+='\tonload="'+MonNomFichier+'_Chargement();"\n';
    StrXul+='\txmlns:html="http://www.w3.org/TR/REC-html40"\n';
    StrXul+='\txmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul">\n';

    /* SCRIPT NECESSAIRES */
    StrXul+='\n<!-- FICHIERS DE SCRIPTS NECESSAIRES -->\n\n';
    StrXul+='<script src="'+GEN_PATH+'pgsql.js"/>\n';
    StrXul+='<script src="'+GEN_PATH+'utils_xul.js"/>\n';
    StrXul+='<script src="'+GEN_PATH+'pointer.js"/>\n';
    StrXul+='<script src="'+GEN_PATH+'generator_sql.js"/>\n';
    StrXul+='<script src="'+GEN_PATH+'generator_xul.js"/>\n';
    StrXul+='<script src="chrome://global/content/nsDragAndDrop.js"/>\n';
    StrXul+='<script src="chrome://global/content/nsTransferable.js"/>\n';
    StrXul+='<script src="chrome://global/content/globalOverlay.js"/>\n';
    StrXul+='<script src="chrome://global/content/viewZoomOverlay.js"/>\n';
    StrXul+='<script src="chrome://browser/content/browser.js"/>\n';
    StrXul+=this.Includes;
    StrXul+='<script src="'+GEN_PATH+MCD_PREFIX+'mcd.js"/>\n';
    StrXul+='<!-- AJOUTER chrome://agrisig/content/Onglets/Agrisig SI NECESSAIRE -->\n';
    if (overlay)
    StrXul+='<script src="chrome://agrisig/content/Onglets/Agrisig/'+MonNomFichier+'.js"/>\n';
    else
    StrXul+='<script src="'+MonNomFichier+'.js"/>\n';
    if (overlay)
    StrXul+='<script src="chrome://agrisig/content/Onglets/Agrisig/'+MonNomFichier+'_User.js"/>\n';
    else
    StrXul+='<script src="'+MonNomFichier+'_User.js"/>\n';

    if (!overlay) StrXul+='<toolbox>\n';
    if (!overlay) StrXul+='  <menubar id="menu-application">\n';

    StrXul+='    <menu id="donnee-menu" label="Gestion des données">\n';
    StrXul+='      <menupopup id="donnee-popup">\n';
    /* entete des onglets */
    for(i=0;i<this.mes_interfaces.length;i++)
    {
        StrXul+='      <menuitem label="'+this.mes_interfaces[i].Nom+'" oncommand="AllerAOnglet('+i+')"/>\n';
    }
    StrXul+='      </menupopup>\n';
    StrXul+='    </menu>\n';

    StrXul+='    <menu id="affichage-menu" label="Affichage">\n';
    StrXul+='      <menupopup id="edit-popup">\n';
    StrXul+='        <menuitem label="Thèmes..." oncommand="BrowserOpenExtensions(\'themes\')" disabled="true"/>\n';
    StrXul+='        <menuseparator/>\n';
    StrXul+='        <menuitem label="Zoom +" oncommand="ZoomManager.prototype.getInstance().enlarge();" disabled="true"/>\n';
    StrXul+='        <menuitem label="Zoom -" oncommand="ZoomManager.prototype.getInstance().reduce();" disabled="true"/>\n';
    StrXul+='      </menupopup>\n';
    StrXul+='    </menu>\n';

    if (this.MesMenus.length>0) {
      StrXul+='    <menu label="Outils">\n';
      StrXul+='      <menupopup>\n';
      for(i=0;i<this.MesMenus.length;i++) {
        StrXul+='        <menuitem label="'+this.MesMenus[i].Label+'" oncommand="'+this.MesMenus[i].Fonction+'('+this.MesMenus[i].Param+')"/>\n';
      }
      StrXul+='      </menupopup>\n';
      StrXul+='    </menu>\n';
    }

    if (!overlay) StrXul+='  </menubar>\n';
    if (!overlay) StrXul+='</toolbox>\n';

    StrXul+='\n<!-- COMPOSANT OU SE DESSINERONT LES COMPOSANTS -->\n\n';
    if (!overlay) StrXul+='<vbox flex="1">\n';
    StrXul+='<tabbox id="Main_Tabbox" flex="1">\n';
    StrXul+='<hbox id="box_overflow" class="tabbrowser-strip chromeclass-toolbar"';
    if (!overlay && this.mes_interfaces.length>NBONGLET) StrXul+=' style="overflow: auto;" ';
    StrXul+='>\n';
    //StrXul+='<tabs id="'+NOM_CONTENEUR_ONGLETS+'" onselect="'+MonNomFichier+'_Changement_Panel(selectedItem)">\n';
    StrXul+='<tabs flex="1" class="tabbrowser-tabs" id="'+NOM_CONTENEUR_ONGLETS+'"';
//    if (!overlay && this.mes_interfaces.length>NBONGLET) StrXul+=' height="36" ';    
    StrXul+='>\n'; // height="36"

    /* entete des onglets */
    for(i=0;i<this.mes_interfaces.length;i++)
    {
        StrXul+=this.mes_interfaces[i].GenererInterfaceXulTab(this.mes_interfaces.length);
    }

    StrXul+='</tabs>\n';
    //    StrXul+='<hbox height="36"/>\n';
    StrXul+='</hbox>\n';

    //onselect="'+MonNomFichier+'_Changement_Panel(selectedPanel);"
    StrXul+='<tabpanels id="Tous_les_panels" flex="1">\n';
    for(i=0;i<this.mes_interfaces.length;i++)
    {
      StrXul+=this.mes_interfaces[i].GenererInterfaceXulPanel();
    }
    StrXul+='</tabpanels>\n';
    StrXul+='</tabbox>\n';
    if (!overlay) StrXul+='</vbox>\n';


    /* barre d'etat */
    //StrXul+='<textbox id="status_log" value="Init" style="min-height:50px" flex="1" multiline="true"/>\n';
    StrXul+='<statusbar id="statusbar">\n';
    StrXul+='  <statusbarpanel id="status_espace" label="" width="5"/>\n';
    StrXul+='  <statusbarpanel id="status_login" label=""/>\n';
    StrXul+='  <statusbarpanel id="status_Info" label=""/>\n';
    StrXul+='  <statusbarpanel id="status_TpsExec" flex="1" label=""/>\n';
    StrXul+='  <statusbarpanel id="status_counter" flex="1" label=""/>\n';
    StrXul+='</statusbar>\n';

    if (overlay)
    StrXul+='</overlay>\n';
    else
    StrXul+='</window>\n';

    /* fichier JS */
    StrJsDebut+='function AllerAOnglet(i)\n';
    StrJsDebut+='{\n';
    StrJsDebut+='        top.document.getElementById("Main_Tabbox").selectedIndex=i;\n';
    StrJsDebut+='        top.document.getElementById(Onglet).hidden=false;\n';
    StrJsDebut+='}\n';

    StrJsDebut+='function FermerOnglet(Onglet)\n';
    StrJsDebut+='{\n';
    StrJsDebut+='        top.document.getElementById("'+NOM_CONTENEUR_ONGLETS+'").advanceSelectedTab(-1);\n';
    StrJsDebut+='        top.document.getElementById(Onglet).hidden=true;\n';
    StrJsDebut+='}\n';

    StrJsDebut+='function Suppr_ListeDessous(event)\n';
    StrJsDebut+='{\n';
    StrJsDebut+='   if(event.type!="keypress" || event.keyCode!=event.DOM_VK_DELETE)\n';
    StrJsDebut+='        return;\n';
    StrJsDebut+='\n';
    StrJsDebut+='   tree=event.target;\n';
    StrJsDebut+='\n';
    StrJsDebut+='   if (tree.disabled || tree.view==null || tree.currentIndex==-1)\n';
    StrJsDebut+='        return;\n';
    StrJsDebut+='\n';
    StrJsDebut+='    var SelectedItem =  tree.view.getItemAtIndex(tree.currentIndex);\n';
    StrJsDebut+='    var treeChildren =  SelectedItem.parentNode;\n';
    StrJsDebut+='    treeChildren.removeChild(SelectedItem);\n';
    StrJsDebut+='}\n';
    StrJsDebut+='\n';
    StrJsDebut+='function DoubleClic_ArbreDessus(ListeDessus,ListeDessous)\n';
    StrJsDebut+='{\n';
    StrJsDebut+='    if(ListeDessous.disabled || ListeDessus.view==null || ListeDessus.currentIndex==-1)\n';
    StrJsDebut+='        return;\n';
    StrJsDebut+='\n';
    StrJsDebut+='    /* on regarde si cet item n\'existe pas déjà */\n';
    StrJsDebut+='    if(ListeDessous.view!=null)\n';
    StrJsDebut+='        {\n';
    StrJsDebut+='            var ValDessus=ListeDessus.view.getCellValue(ListeDessus.currentIndex,ListeDessus.treeBoxObject.columns.getColumnAt(0));\n';
    StrJsDebut+='            for(i=0;i<ListeDessous.view.rowCount;i++)\n';
    StrJsDebut+='                {\n';
    StrJsDebut+='                    if( ListeDessous.view.getCellValue(i,ListeDessous.treeBoxObject.columns.getColumnAt(0)) == ValDessus )\n';
    StrJsDebut+='                        {\n';
    StrJsDebut+='                            alert("Cet élément est déjà présent");\n';
    StrJsDebut+='                            return;\n';
    StrJsDebut+='                        }\n';
    StrJsDebut+='                }\n';
    StrJsDebut+='        }\n';
    StrJsDebut+='\n';
    StrJsDebut+='    var item =  ListeDessus.view.getItemAtIndex(ListeDessus.currentIndex).cloneNode(true);\n';
    StrJsDebut+='\n';
    StrJsDebut+='    /* si il n\'y a pas de tree children pour le content */    \n';
    StrJsDebut+='    var Tab=ChercherCompo(ListeDessous,"treechildren",2);\n';
    StrJsDebut+='    var treechildren;\n';
    StrJsDebut+='    if(Tab.length!=2)\n';
    StrJsDebut+='        {\n';
    StrJsDebut+='            /* on crée le treechildren */\n';
    StrJsDebut+='            var mydoc = top.document;\n';
    StrJsDebut+='            treechildren = mydoc.createElement("treechildren");\n';
    StrJsDebut+='            ListeDessous.appendChild(treechildren);\n';
    StrJsDebut+='        }\n';
    StrJsDebut+='    else\n';
    StrJsDebut+='        {\n';
    StrJsDebut+='            /* Le TarNode est le treechildren */\n';
    StrJsDebut+='            treechildren = Tab[1];\n';
    StrJsDebut+='        }\n';
    StrJsDebut+='    treechildren.appendChild(item);\n';
    StrJsDebut+='}\n';


    //     StrJsDebut+='var ArbreDessusObserver = {\n';
    //     StrJsDebut+='   onDragStart: function (evt,transferData,action){\n';
    //     StrJsDebut+='     var tree = evt.target.parentNode;\n';
    //     StrJsDebut+='     var item =  tree.view.getItemAtIndex(tree.currentIndex).cloneNode(true);\n';
    //     StrJsDebut+='     var Ref_item = AddVar(item);\n';
    //     StrJsDebut+='     transferData.data=new TransferData();\n';
    //     StrJsDebut+='     transferData.data.addDataForFlavour("text/unicode",Ref_item);\n';
    //     StrJsDebut+='   }\n';
    //     StrJsDebut+='};\n';
    //     StrJsDebut+='\n';
    //     StrJsDebut+='var ArbreDessousObserver = {\n';
    //     StrJsDebut+='   getSupportedFlavours : function () {\n';
    //     StrJsDebut+='     var flavours = new FlavourSet();\n';
    //     StrJsDebut+='     flavours.appendFlavour("text/unicode");\n';
    //     StrJsDebut+='     return flavours;\n';
    //     StrJsDebut+='   },\n';
    //     StrJsDebut+='   onDragOver: function (evt,flavour,session){},\n';
    //     StrJsDebut+='   onDrop: function (evt,dropdata,session){\n';
    //     StrJsDebut+='     if (dropdata.data!=""){\n';
    //     StrJsDebut+='     var item = GetVar(dropdata.data);\n';
    //     StrJsDebut+='     var TarNode = evt.target;\n';
    //     StrJsDebut+='     var treeChildren;\n';
    //     StrJsDebut+='     /* si il n\'y a pas de tree children */\n';    
    //     StrJsDebut+='     if(TarNode.nodeName=="tree")\n';
    //     StrJsDebut+='     {\n';
    //     StrJsDebut+='      /* si on est desactivé */\n';
    //     StrJsDebut+='      if (TarNode.disabled)\n';
    //     StrJsDebut+='         return;\n';
    //     StrJsDebut+='       var mydoc = top.document;\n';
    //     StrJsDebut+='       treeChildren = mydoc.createElement("treechildren");\n';
    //     StrJsDebut+='       /* le TarNode est l\'arbre */\n';
    //     StrJsDebut+='       TarNode.appendChild(treeChildren);\n';
    //     StrJsDebut+='     }\n';
    //     StrJsDebut+='     else\n';
    //     StrJsDebut+='     {\n';
    //     StrJsDebut+='       /* Le TarNode est le treechildren */\n';
    //     StrJsDebut+='       treeChildren = evt.target;\n';
    //     StrJsDebut+='     }\n';
    //     StrJsDebut+='      /* si on est desactivé */\n';
    //     StrJsDebut+='      if (treeChildren.parentNode.disabled)\n';
    //     StrJsDebut+='         return;\n';
    //     StrJsDebut+='     treeChildren.appendChild(item);\n';
    //     StrJsDebut+='   }\n';
    //     StrJsDebut+='  }\n';
    //     StrJsDebut+='}\n';
    //     StrJsDebut+='\n';
    //     StrJsDebut+='\n';
    //     StrJsDebut+='var TreeController = {\n';
    //     StrJsDebut+='  supportsCommand : function(cmd){ return (cmd == "cmd_delete"); },\n';
    //     StrJsDebut+='  isCommandEnabled : function(cmd){\n';
    //     StrJsDebut+='        var tree = document.commandDispatcher.focusedElement;\n';
    //     StrJsDebut+='        if (cmd == "cmd_delete") return (tree.view.currentIndex != -1);\n';
    //     StrJsDebut+='        return false;\n';
    //     StrJsDebut+='    },\n';
    //     StrJsDebut+='    doCommand : function(cmd){\n';
    //     StrJsDebut+='        var tree = document.commandDispatcher.focusedElement;\n';
    //     StrJsDebut+='        var SelectedItem =  tree.view.getItemAtIndex(tree.currentIndex);\n';
    //     StrJsDebut+='        var treeChildren =  SelectedItem.parentNode;\n';
    //     StrJsDebut+='        treeChildren.removeChild(SelectedItem);\n';
    //     StrJsDebut+='\n';
    //     StrJsDebut+='    },\n';
    //     StrJsDebut+='    onEvent : function(evt){ }\n';
    //     StrJsDebut+='  };\n';

    StrJs+='\nfunction '+MonNomFichier+'_Chargement()\n';

    StrJs+='{\n';
    StrJs+='pgsql_init(true);\n';
    StrJs+='if (!pgsql_getConnectionState())\n';
    StrJs+='{\n';
    StrJs+='        top.close();\n';
    StrJs+='        return;\n';
    StrJs+='}\n';
    StrJs+='Init_ALeDroit();\n';

    // Recuperation du login et affichage
    StrJs+="var query='SELECT current_user, current_date;';\n";
    StrJs+="var result=pgsql_query(query);\n";
//    StrXul+='\tid="Page_'+MonNomFichier+'"\n';

    StrJs+="if (result.rowCount>0){var enum=result.enumerate();enum.first(); var user_name = enum.getVariant(0); window.title = user_name+' - '+window.title; stlog = top.document.getElementById('status_login'); if (stlog!=null) {stlog.label='Nom d\\'utilisateur : '+user_name;} }\n";


    for(i=0;i<this.mes_interfaces.length;i++)
    {
        StrJs+=this.mes_interfaces[i].GenererInterfaceJs();
    }

    for(i=0;i<this.mes_interfaces.length;i++)
    {
        StrJs+=this.mes_interfaces[i].GenererInterfaceJsFin();
    }

    /* on charge les onglets */
    /* on active les insertion/maj des maitres */
    var MaitreInterface;
    for(i=0;i<this.mes_interfaces.length;i++)
    {
        StrJs+=this.mes_interfaces[i].GenererInterfaceOnLoad();
        MaitreInterface=this.mes_interfaces[i].Maitre;
        var FirstParentXul = MaitreInterface.getTheme().getParentXul();
        //        StrJs+='top.document.getElementById("Validate_'+FirstParentXul+'").disabled=true;\n';
        //        StrJs+='top.document.getElementById("Annuler_'+FirstParentXul+'").disabled=true;\n';
        //        StrJs+='top.document.getElementById("Insert_'+FirstParentXul+'").disabled=false;\n';
        //        StrJs+='top.document.getElementById("Delete_'+FirstParentXul+'").disabled=false;\n';
        //        StrJs+='top.document.getElementById("Update_'+FirstParentXul+'").disabled=false;\n';
        if (MaitreInterface.getTheme().HasInsertMajSup())
            {
                StrJs+='var nb_button=0\n';
                StrJs+=MaitreInterface.genererSiDroit(DT_INSERT,'nb_button++;\ntop.document.getElementById("Insert_'+FirstParentXul+'").disabled=false;\n','top.document.getElementById("Insert_'+FirstParentXul+'").hidden=true;\n');
                StrJs+=MaitreInterface.genererSiDroit(DT_DELETE,'nb_button++;\ntop.document.getElementById("Delete_'+FirstParentXul+'").disabled=false;\n','top.document.getElementById("Delete_'+FirstParentXul+'").hidden=true;\n');
                StrJs+=MaitreInterface.genererSiDroit(DT_UPDATE,'nb_button++;\ntop.document.getElementById("Update_'+FirstParentXul+'").disabled=false;\n','top.document.getElementById("Update_'+FirstParentXul+'").hidden=true;\n');
                StrJs+='if (nb_button==0)\n';
                StrJs+='{\n';
                StrJs+='        top.document.getElementById("Validate_'+FirstParentXul+'").hidden=true;\n';
                StrJs+='        top.document.getElementById("Annuler_'+FirstParentXul+'").hidden=true;\n';
                StrJs+='}\n';
            }

        /* pour les bouton esclaves */
        var slaves=MaitreInterface.getEsclaves();
        var j;
        for(j=0;j<slaves.length;j++)
            {
                var slaveCompo=slaves[j].Compo;
                var slaveParentXul = slaveCompo.getTheme().getParentXul();
                /* on active les sous maitres */
                if (slaveCompo.getTheme().HasInsertMajSup())
                    {
                        if (slaveCompo.getTheme().HasInsertMajSup())
                            {
                                StrJs+='var nb_button=0\n';
                                StrJs+=slaveCompo.genererSiDroit(DT_INSERT,'nb_button++;\n','top.document.getElementById("Insert_'+slaveParentXul+'").hidden=true;\n');
                                StrJs+=slaveCompo.genererSiDroit(DT_DELETE,'nb_button++;\n','top.document.getElementById("Delete_'+slaveParentXul+'").hidden=true;\n');
                                StrJs+=slaveCompo.genererSiDroit(DT_UPDATE,'nb_button++;\n','top.document.getElementById("Update_'+slaveParentXul+'").hidden=true;\n');
                                StrJs+='if (nb_button==0)\n';
                                StrJs+='{\n';
                                StrJs+='        top.document.getElementById("Validate_'+slaveParentXul+'").hidden=true;\n';
                                StrJs+='        top.document.getElementById("Annuler_'+slaveParentXul+'").hidden=true;\n';
                                StrJs+='}\n';
                            }
                    }
            }



        //StrJs+=this.Maitre.genererSiDroit(DT_SELECT,StrTrue,StrFalse);
    }

    /* on ajoute le code libre utilisateur */
    StrJs+=this.CodeUserLoad;

    StrJs+='}\n';
    //     /* première interface active */
    //     for(i=0;i<this.mes_interfaces.length;i++)
    //     {
    //         if (!this.mes_interfaces[i].Dependant)
    //         {
    //             NomFichier=MettreUnderScore(this.mes_interfaces[i].Nom);
    //             StrJs+='Compo_'+NomFichier+'_Racine.Refresh();\n'
    //             StrJs+='Compo_'+NomFichier+'_Racine.AfterRefreshByMaitre();\n'
    //             StrJs+='}\n';
    //         }
    //     }


    StrJsDebut+="/* TABLEAU GLOBALE QUI CONTIENT LES COMPOSANTS D'INTERFACE */\n\n"
    StrJsDebut+='var '+NomTabGlobalCompo+' = new Array();\n'
    StrJsDebut+='/* pour associer des attributs aux composants */\n';
    StrJsDebut+='function stProprieteCompo()\n';
    StrJsDebut+='{\n';
    StrJsDebut+='        this.Action_en_cours=null;\n';
    StrJsDebut+='        this.NewCle=null;\n';
    StrJsDebut+='}\n';
    StrJsDebut+='var TAB_COMPO_PPTES = new Array('+IdDansTabGlobalCompo+');\n';
    StrJsDebut+='/* on init le tableau */\n';
    StrJsDebut+='var id\n';
    StrJsDebut+='for(id=0;id<TAB_COMPO_PPTES.length;id++)\n';
    StrJsDebut+='{\n';
    StrJsDebut+='        TAB_COMPO_PPTES[id] = new stProprieteCompo();\n';
    StrJsDebut+='}\n';
    StrJsDebut+='const INSERT=1;\n';
    StrJsDebut+='const DELETE=2;\n';
    StrJsDebut+='const UPDATE=3;\n';
    StrJsDebut+='\n';
    StrJsDebut+='function GetValAt(i)\n';
    StrJsDebut+='{\n';
    StrJsDebut+='    /* ON CONVERTIE EN CHAINE DE CARACTERE  */\n';
    StrJsDebut+='    return ""+TAB_GLOBAL_COMPO[i].getValue();\n';
    StrJsDebut+='}\n';
    StrJsDebut+='\n';
    StrJsDebut+='function GetSQLCompoAt(i)\n';
    StrJsDebut+='{\n';
    StrJsDebut+='    return TAB_GLOBAL_COMPO[i];\n';
    StrJsDebut+='}\n';
    StrJsDebut+='\n';

    for(i=0;i<this.mes_interfaces.length;i++)
    {
        StrJsDebut+=this.mes_interfaces[i].GenererInterfaceGenererFctEntete();
        StrJsUser+=this.mes_interfaces[i].getCodeUser();
    }

    //         StrJsDebut+='\nfunction '+MonNomFichier+'_Changement_Panel(OngletSelected)\n';
    //         StrJsDebut+='{\n';
    //         StrJsDebut+='var Id_Onglet=OngletSelected.getAttribute("id");\n';
    //         /* on désactive les filtre */
    //         for(i=0;i<this.mes_interfaces.length;i++)
    //         {
    //                 StrJsDebut+='if (Id_Onglet!="Onglet_'+MettreUnderScore(this.mes_interfaces[i].Nom)+'")\n';
    //                 StrJsDebut+='        DesactiverFiltreGerer_'+MettreUnderScore(this.mes_interfaces[i].Nom)+'();\n';
    //         }
    // 
    // //      StrJsDebut+='var Id_Onglet=OngletSelected.getAttribute("id");\n';
    // //      StrJsDebut+='switch(Id_Onglet){\n';
    // //
    // //         for(i=0;i<this.mes_interfaces.length;i++)
    // //         {
    // //                 StrJsDebut+=this.mes_interfaces[i].GenererInterfaceChangementOnglet();
    // //         }
    // //                 /* fin du switch*/
    // //      StrJsDebut+='}\n';
    // 
    //      StrJsDebut+='}\n\n';

    StrJs=StrJsDebut+StrJs;

    StrJsUser+='\n';
    StrJsUser+='function LstDouble_Exec_Req(CompoSqlListeDessous,CleMaitre_val)\n';
    StrJsUser+='{\n';
    StrJsUser+='    /* cas ou on a 1 seule table de liaison */\n';
    StrJsUser+='    var TabJointure=CompoSqlListeDessous.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;\n';
    StrJsUser+='    if(TabJointure.length!=2)\n';
    StrJsUser+='        {\n';
    StrJsUser+='            alert("Erreur de programmation:\\nLes listes doubles doivent contenir une et une seule table de liaison");\n';
    StrJsUser+='            throw "Les listes doubles doivent contenir une et une seule table de liaison";\n';
    StrJsUser+='        }\n';
    StrJsUser+='\n';
    StrJsUser+='    var CleRel=TabJointure[1].CleDebut;\n';
    StrJsUser+='    var TableRel=TabJointure[0].TableFin;\n';
    StrJsUser+='    var CleMaitre_nom=TabJointure[0].CleFin;\n';
    StrJsUser+='    var ReqRel="select "+CleRel+" from "+TableRel+" where "+CleMaitre_nom+"="+CleMaitre_val;\n';
    StrJsUser+='    var result=pgsql_query(ReqRel);\n';
    StrJsUser+='    var enumerator=result.enumerate();\n';
    StrJsUser+='    var TabCle=CompoSqlListeDessous.getAllCleVal();\n';
    StrJsUser+='\n';
    StrJsUser+='    if (result.rowCount==0)\n';
    StrJsUser+='        {\n';
    StrJsUser+='            /* cas ou la liste était vide */\n';
    StrJsUser+='            var i;\n';
    StrJsUser+='            for(i=0;i<TabCle.length;i++)\n';
    StrJsUser+='                {\n';
    StrJsUser+='                    var ReqInsert="insert into "+TableRel+" ("+CleMaitre_nom+","+CleRel+") values("+CleMaitre_val+","+TabCle[i]+")";\n';
    StrJsUser+='                    if (pgsql_update(ReqInsert)==0)\n';
    StrJsUser+='                        {\n';
    StrJsUser+='                            alert("Echec lors de l\'insertion");\n';
    StrJsUser+='                            return;\n';
    StrJsUser+='                        }\n';
    StrJsUser+='                }\n';
    StrJsUser+='        }\n';
    StrJsUser+='    else\n';
    StrJsUser+='        {\n';
    StrJsUser+='\n';
    StrJsUser+='            /* ON PARCOURS LE TABLEAU EXISTANT */\n';
    StrJsUser+='            enumerator.beforeFirst();\n';
    StrJsUser+='            var encore= true;\n';
    StrJsUser+='            while(encore)\n';
    StrJsUser+='                {\n';
    StrJsUser+='                    encore = enumerator.next();\n';
    StrJsUser+='                    /* on cherche ce qu\'on supprime */\n';
    StrJsUser+='                    var i=0;\n';
    StrJsUser+='                    var trouve=false;\n';
    StrJsUser+='                    while(i<TabCle.length && !trouve)\n';
    StrJsUser+='                        {\n';
    StrJsUser+='                            if (TabCle[i]==enumerator.getVariant(0))\n';
    StrJsUser+='                                {\n';
    StrJsUser+='                                    trouve=true;\n';
    StrJsUser+='                                }\n';
    StrJsUser+='                            i++;\n';
    StrJsUser+='                        }\n';
    StrJsUser+='                    /* si il n\'est pas dans le nouveau tableau on l\'efface */\n';
    StrJsUser+='                    if (!trouve)\n';
    StrJsUser+='                        {\n';
    StrJsUser+='                            var ReqDel="delete from "+TableRel+" where "+CleMaitre_nom+"="+CleMaitre_val+" and "+CleRel+"="+enumerator.getVariant(0);\n';
    StrJsUser+='                            if (pgsql_update(ReqDel)==0)\n';
    StrJsUser+='                                {\n';
    StrJsUser+='                                    alert("Echec lors de l\'insertion");\n';
    StrJsUser+='                                    return;\n';
    StrJsUser+='                                }\n';
    StrJsUser+='                        }\n';
    StrJsUser+='                }\n';
    StrJsUser+='\n';
    StrJsUser+='\n';
    StrJsUser+='            /* ON PARCOURS LE DEUXIEME TABLEAU */\n';
    StrJsUser+='            var i;\n';
    StrJsUser+='            for(i=0;i<TabCle.length;i++)\n';
    StrJsUser+='                {\n';
    StrJsUser+='                    /* on cherche ce qu\'on insert */\n';
    StrJsUser+='                    enumerator.beforeFirst();\n';
    StrJsUser+='                    var encore= true;\n';
    StrJsUser+='                    var trouve=false;\n';
    StrJsUser+='                    while(encore && !trouve)\n';
    StrJsUser+='                        {\n';
    StrJsUser+='                            encore = enumerator.next();\n';
    StrJsUser+='                            if(TabCle[i]==enumerator.getVariant(0))\n';
    StrJsUser+='                                trouve=true;\n';
    StrJsUser+='                        }\n';
    StrJsUser+='                    /* si on ne l\'a pas trouver on l\'insert */\n';
    StrJsUser+='                    if (!trouve)\n';
    StrJsUser+='                        {\n';
    StrJsUser+='                            var ReqIns="insert into "+TableRel+" ("+CleMaitre_nom+","+CleRel+") values("+CleMaitre_val+","+TabCle[i]+")";\n';
    StrJsUser+='                            if (pgsql_update(ReqIns)==0)\n';
    StrJsUser+='                                {\n';
    StrJsUser+='                                    alert("Echec lors de l\'insertion");\n';
    StrJsUser+='                                    return;\n';
    StrJsUser+='                                }\n';
    StrJsUser+='                        }\n';
    StrJsUser+='                }\n';
    StrJsUser+='        }\n';
    StrJsUser+='}\n';

    StrJsUser+='        function GenererAssociation11(ComposantFinal,CleCompoFinal,CleMaitre,TabOut)\n';
    StrJsUser+='{\n';
    StrJsUser+='        /* on regarde dans quel cas on se trouve (clé étrangère: 1 liaison ou asso: 2 liaisons) */\n';
    StrJsUser+='        var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;\n';
    StrJsUser+='    if(TabJointure.length>2)\n';
    StrJsUser+='        {\n';
    StrJsUser+='            alert("Erreur de programmation:\\nTrop de liaisons (>2)");\n';
    StrJsUser+='            throw "Erreur de programmation:\\nTrop de liaisons (>2)";\n';
    StrJsUser+='        }\n';
    StrJsUser+='        /* cas de jointure simple */\n';
    StrJsUser+='        if (TabJointure.length==1)\n';
    StrJsUser+='        {\n';
    StrJsUser+='                /* l\'enregistrement doit exister */\n';
    StrJsUser+='                var CleEtrangere;\n';
    StrJsUser+='                var TableFinale=ComposantFinal.getTable();\n';
    StrJsUser+='                /* on regarde le sens de la jointure */\n';
    StrJsUser+='                if (TabJointure[0].TableFin==TableFinale)\n';
    StrJsUser+='                        CleEtrangere=TabJointure[0].CleFin;\n';
    StrJsUser+='                else\n';
    StrJsUser+='                        CleEtrangere=TabJointure[0].CleDebut;\n';
    StrJsUser+='\n';
    StrJsUser+='                if (mcd_obligatoire(TableFinale,CleEtrangere))\n';
    StrJsUser+='                {\n';
    StrJsUser+='                        TabOut.push(CleEtrangere);\n';
    StrJsUser+='                        TabOut.push(CleMaitre);\n';
    StrJsUser+='                        return true\n';
    StrJsUser+='                }\n';
    StrJsUser+='        }\n';
    StrJsUser+='        return false;\n';
    StrJsUser+='}\n';


    StrJsUser+='function AjouterAssociation(ComposantFinal,CleCompoFinal,CleMaitre)\n';
    StrJsUser+='{\n';
    StrJsUser+='        /* on regarde dans quel cas on se trouve (clé étrangère: 1 liaison ou asso: 2 liaisons) */\n';
    StrJsUser+='        var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;\n';
    StrJsUser+='    if(TabJointure.length>2)\n';
    StrJsUser+='        {\n';
    StrJsUser+='            alert("Erreur de programmation:\\nTrop de liaisons (>2)");\n';
    StrJsUser+='            throw "Erreur de programmation:\\nTrop de liaisons (>2)";\n';
    StrJsUser+='        }\n';
    StrJsUser+='        /* cas de jointure simple */\n';
    StrJsUser+='        if (TabJointure.length==1)\n';
    StrJsUser+='        {\n';
    StrJsUser+='                /* l\'enregistrement doit exister */\n';
    StrJsUser+='                var CleEtrangere;\n';
    StrJsUser+='                var TableFinale=ComposantFinal.getTable();\n';
    StrJsUser+='                /* on regarde le sens de la jointure */\n';
    StrJsUser+='                if (TabJointure[0].TableFin==TableFinale)\n';
    StrJsUser+='                        CleEtrangere=TabJointure[0].CleFin;\n';
    StrJsUser+='                else\n';
    StrJsUser+='                        CleEtrangere=TabJointure[0].CleDebut;\n';
    StrJsUser+='                var req="update "+TableFinale+" set "+CleEtrangere+" = "+CleMaitre+" where "+ComposantFinal.getCle()+" = "+CleCompoFinal;\n';
    StrJsUser+='                if (pgsql_update(req)==0)\n';
    StrJsUser+='                {\n';
    StrJsUser+='                        alert("Echec lors de la mise à jour");\n';
    StrJsUser+='                        return false;\n';
    StrJsUser+='                }\n';
    StrJsUser+='        }\n';
    StrJsUser+='        else\n';
    StrJsUser+='        {\n';
    StrJsUser+='                /* cas de jointure double */\n';
    StrJsUser+='                var TableFinale=ComposantFinal.getTable();\n';
    StrJsUser+='                var CleAsso_TableFinal;\n';
    StrJsUser+='                var CleAsso_TableMaitre;\n';
    StrJsUser+='                var TableAsso=TabJointure[0].TableFin;\n';
    StrJsUser+='                /* on regarde le sens de la jointure */\n';
    StrJsUser+='                if (TabJointure[1].TableFin==TableFinale)\n';
    StrJsUser+='                {\n';
    StrJsUser+='                        CleAsso_TableMaitre=TabJointure[0].CleFin;\n';
    StrJsUser+='                        CleAsso_TableFinal=TabJointure[1].CleDebut;\n';
    StrJsUser+='                }\n';
    StrJsUser+='                else\n';
    StrJsUser+='                {\n';
    StrJsUser+='                        CleAsso_TableFinal=TabJointure[0].CleFin;\n';
    StrJsUser+='                        CleAsso_TableMaitre=TabJointure[1].CleDebut;\n';
    StrJsUser+='                }\n';
    StrJsUser+='                var req="insert into "+TableAsso+" ("+CleAsso_TableMaitre+","+CleAsso_TableFinal+") values ("+CleMaitre+","+CleCompoFinal+")";\n';
    StrJsUser+='                if (pgsql_update(req)==0)\n';
    StrJsUser+='                {\n';
    StrJsUser+='                        alert("Echec lors de l\'insertion");\n';
    StrJsUser+='                        return false;\n';
    StrJsUser+='                }\n';
    StrJsUser+='        }\n';
    StrJsUser+='        return true;\n';
    StrJsUser+='}\n';

    StrJsUser+='function SuprimerAssociation(ComposantFinal,CleCompoFinal,CleMaitre)\n';
    StrJsUser+='{\n';
    StrJsUser+='        /* on regarde dans quel cas on se trouve (clé étrangère: 1 liaison ou asso: 2 liaisons) */\n';
    StrJsUser+='        var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;\n';
    StrJsUser+='\n';
    StrJsUser+='        /* on ne gère que les doubles jointure */\n';
    StrJsUser+='        if (TabJointure.length!=2)\n';
    StrJsUser+='                return false;\n';
    StrJsUser+='\n';
    StrJsUser+='        var TableFinale=ComposantFinal.getTable();\n';
    StrJsUser+='        var CleAsso_TableFinal;\n';
    StrJsUser+='        var CleAsso_TableMaitre;\n';
    StrJsUser+='        var TableAsso=TabJointure[0].TableFin;\n';
    StrJsUser+='        /* on regarde le sens de la jointure */\n';
    StrJsUser+='        if (TabJointure[1].TableFin==TableFinale)\n';
    StrJsUser+='        {\n';
    StrJsUser+='                CleAsso_TableMaitre=TabJointure[0].CleFin;\n';
    StrJsUser+='                CleAsso_TableFinal=TabJointure[1].CleDebut;\n';
    StrJsUser+='        }\n';
    StrJsUser+='        else\n';
    StrJsUser+='        {\n';
    StrJsUser+='                CleAsso_TableFinal=TabJointure[0].CleFin;\n';
    StrJsUser+='                CleAsso_TableMaitre=TabJointure[1].CleDebut;\n';
    StrJsUser+='        }\n';
    StrJsUser+='        var req="delete from "+TableAsso+" where ( ("+CleAsso_TableMaitre+" = "+CleMaitre+") AND ("+CleAsso_TableFinal+" = "+CleCompoFinal+") )";\n';
    StrJsUser+='        if (pgsql_update(req)==0)\n';
    StrJsUser+='        {\n';
    StrJsUser+='                alert("Echec lors de l\'insertion");\n';
    StrJsUser+='                return false;\n';
    StrJsUser+='        }\n';
    StrJsUser+='}\n';

    // top.document.getElementById("res").value+="/*********MAITRE XUL****************/"+StrXul;
    //top.document.getElementById("res").value+="/*********MAITRE JS ****************/"+StrJs;
    top.document.getElementById("res").value+="--------------------------------";
		
    var filePath = SaveFile(MonNomFichier+'.xul',StrXul);
    top.document.getElementById("res").value+="*";
    SaveFile(MonNomFichier+'.js',StrJs, filePath, true);
    top.document.getElementById("res").value+="*";
    SaveFile(MonNomFichier+'_User.js',StrJsUser, filePath, true);
    top.document.getElementById("res").value+="*\n";
		/*
    if (AutoSave){
      SaveFileDirectly(MonNomFichier+'.xul',StrXul);
      SaveFileDirectly(MonNomFichier+'.js',StrJs);
      SaveFileDirectly(MonNomFichier+'_User.js',StrJsUser);      
    }else{
      SaveFile(MonNomFichier+'.xul',StrXul);
      SaveFile(MonNomFichier+'.js',StrJs);
      SaveFile(MonNomFichier+'_User.js',StrJsUser);
    }
		*/
}

//alert("GIL chargé");
