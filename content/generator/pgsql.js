const aliasName = "gestsea";
const complete  = Components.interfaces.mozISqlRequest.STATUS_COMPLETE;
const aLogin    = "";//valerian";
const aPassword = "";//valerian";
var aNumExpl    = "0";

/* a mettre comme attribut dans le fichier xul pour que tt le monde partage la meme */
var connection;
var connection_state = false;
var select_counter = 0;
var update_counter = 0;

var result;

var sqlService = null;

function getSqlService() {
  if (! sqlService)
    sqlService = Components.classes["@mozilla.org/sql/service;1"]
                 .getService(Components.interfaces.mozISqlService);
  return sqlService;
}

/* - - - - - - - - - - - - - - */

function pgsql_getConnectionState() {
  return top.connection_state;
}
function pgsql_setConnectionState(etat) {
  top.connection_state = etat;
}
function pgsql_getConnection() {
  return top.connection;
}
function pgsql_setConnection(connection) {
  top.connection = connection;
}
/* - - - - - - - - - - - - - - */


function erreur(ex,query,connection){
  if (confirm(connection.errorMessage+"\nVoulez vous voir le détail de l'erreur ?")){
    prompt("Erreur lors de l'exécution de la requête :\n"+query+"\nMessage d'erreur :\n\n" + connection.errorMessage+"\n"+ex,query);
  }
}



/**
 * Initialisation de la connexion a la base de données
 * -> Utilise l'alias aliasName
 *
 * @param methode     false = connexion rapide
 *                    true = invite de login
 */
function pgsql_init(methode) {

  /* si aucune connexion a la bdd est trouvé */
  if (pgsql_getConnectionState()) {
    //alert ("Vous etes deja connecté a la base");
    return;
  }
  
  sqlService = getSqlService();

  var alias = sqlService.getAlias(aliasName);
  
  // pas d'alias aliasName
  if (!alias) {
    if ( confirm("L'alias " + aliasName + " n'existe pas. \nVoulez qu'il soit créé automatiquement ? \n\n(Vous pouvez le configurer plus tard à partir du menu Ficher/Configurer les Alias)") ) 
      // creation de l'alias
      alias = pgsql_createalias(sqlService);
    else
      // on quitte
      return;
  }

  // connexion avec ou sans invite de login
  if (methode)
    pgsql_setConnection(pgsql_connect(alias));
  else
    pgsql_setConnection(pgsql_quickconnect(alias,aLogin, aPassword));

  if ( pgsql_getConnection() ) {
    pgsql_setConnectionState(true);
  }
}

/**
 * Lance une connexion en se basant sur l'alias aliasName
 *
 * @param   alias       Base de données à laquelle on va se connecter
 * @param   login       Login a utiliser pour la connexion
 * @param   password    Mot de passe pour l'utilisateur
 * @return              True si la connexion est effectuée
 */
function pgsql_quickconnect(alias, login, password) {
  
  var aName = {};
  var aType = {};
  var aHostname = {};
  var aPort = {};
  var aDatabase = {};
  var aPriority = {};
   
  sqlService = getSqlService();

  // recupération des infos de alias : host, port, database
  sqlService.fetchAlias (alias, aName, aType, aHostname, aPort, aDatabase, aPriority);

  if (Components.classes["@mozilla.org/sql/connection;1?type=pgsql"]==null)
      alert("COMPOSANTS SQL DE CONNECTION ABSENT");

  // connexion a la bdd
  try {
    var connection = Components.classes["@mozilla.org/sql/connection;1?type=pgsql"]
                     .createInstance(Components.interfaces.mozISqlConnection);
  
    connection.init(aHostname.value, aPort.value, aDatabase.value, login, password);
  }
  catch (ex) {
    alert ("Erreur de connexion à la base de données.\n(Cliquez sur ok pour voir le message d'erreur.)");
    alert ("DEBUG : check les login et mdp dans pgsql.js en const\n USER : " + login + " | Pass : " + password);
    alert("sqlService.errorMessage :" + sqlService.errorMessage);
    return 0;
  }

  return connection;
}

/**
 * Lance une connexion en se basant sur l'alias aliasName
 * -> PB : si l'user fait ECHAP une connexion vide est retournée, alors il
 *         il faut vierfier la version du serveur pour etre sur de la connexion.
 * 
 * @param    alias     Base de données à laquelle on va se connecter
 * @return             La connexion 
 */
function pgsql_connect(alias) {
  var connection;
  
  sqlService = getSqlService();
  try {
    connection = sqlService.getNewConnection(alias);
    //alert("PgSQL version : " + connection.serverVersion);
  }
  catch (ex) {
    alert ("Erreur de connexion à la base de données.\nCliquez sur OK pour voir le message d'erreur.");
    alert("sqlService.errorMessage :" + sqlService.errorMessage);
    return 0;
  }

  // a t'on une connexion ?
  if ( !connection.serverVersion ) {
    return 0;
  }
  
  return connection;
}

/**
 * Deconnexion de la BDD
 * 
 */
function pgsql_deco() {
  if ( pgsql_getConnectionState() && !confirm("Etes vous sur de vouloir vous deconnecter de la Base de Données ?") )
    return;
  
  pgsql_setConnectionState(false);

}

/**
 * Création automatique de l'alias Agrisig qui va pointer vers une BDD locale
 *
 * @return            L'alias créé
 */
function pgsql_createalias() {
  var aName = aliasName;
  var aType = "pgsql";
  var aHostname = "localhost";
  var aPort = 5432;
  var aDatabase = aliasName;
  var aPriority = 0;
  
  sqlService = getSqlService();
  
  // ajout de l'alias
  alias = sqlService.addAlias(aName, aType, aHostname, aPort, aDatabase, aPriority);
  
  if (!alias)
    alert ("La création automatique de l'alias a échouée.");

  return alias;
}


/*------------------------------------------------------------------------------------------------------*/


function Debut_TpsExec() {
  var maintenant=new Date();
  return maintenant.getTime();
}

function Fin_TpsExec(TpsDebut){
  var maintenant=new Date();
  return maintenant.getTime()-TpsDebut;
}


/**
 * Execute une requete. On vérifie auparavant la présence d'une connexion
 * à une base de données. ( QUE POUR LES SELECT )
 *
 */
function pgsql_query( query ) {

  // si on n'est pas connecté on lance l'invite de login
  if (!pgsql_getConnectionState())
    pgsql_init(0);

  var connection = pgsql_getConnection();

  // gestion de la requete
  var Tps=Debut_TpsExec();
  /* pour la barre d'etat */
  // BEGIN à commenter ?
  var CompoQuery=top.document.getElementById("status_query");
  if (CompoQuery!=null) CompoQuery.label = query.substr(0,6);
  CompoQuery=top.document.getElementById("status_query_long");
  if (CompoQuery!=null) CompoQuery.value = query;
  var CompoInfo=top.document.getElementById("status_Info");
  if (CompoInfo!=null)  CompoInfo.label="Chargement...";
  // END à commenter ?
  // AddLog("SQL: "+query);
  var result=UseCache(query);
  if (result==null) {
  try {
    var result = connection.executeQuery(query);
  }
  catch (ex) {
      // ERREUR ERROR erreur error
      //alert(connection.errorMessage);
      erreur(ex,query,connection);
      //      prompt("> Erreur lors de l'exécution de la requête:\n"+query+"\n> Message d'erreur:\n" + connection.errorMessage+"\n"+ex,query);
  }
  NbrReq++;
  select_counter++;
  PushCache(query,result);
  //AddLog("PAS DE CACHE");
  //AddLog("NbrReq="+NbrReq);
}
  /* pour la barre d'etat */
  //AddLog("Temps d'execution:"+Fin_TpsExec(Tps)+" ms");
  // BEGIN
  var CompoCounter=top.document.getElementById("status_counter");
  if (CompoCounter!=null) {
    CompoCounter.label=select_counter;
  }
  var CompoInfo=top.document.getElementById("status_Info");
  if (CompoInfo!=null) {
    CompoInfo.label="Chargement terminé";
  }
  var CompoTpsExec=top.document.getElementById("status_TpsExec");
  if (CompoTpsExec!=null) {
    CompoTpsExec.label=Fin_TpsExec(Tps)+"ms";
  }
  // END
  return result;
}

/**
 * Execute une requete. On vérifie auparavant la présence d'une connexion
 * à une base de données. ( POUR LE RESTE => les non SELECT )
 *
 */
function pgsql_update( query ) {
  //alert("Req:\n"+query);
  // si on n'est pas connecté on lance l'invite de login
  if (!pgsql_getConnectionState())
    pgsql_init(0);

  //alert("query av=\n"+query);

/* on simule l'insertion dans les vue */
/*
  if (query.length>16 && query.substring(0,16)=='insert into vue_')
      query='insert into '+query.substring(16);

  if (query.length>11 && query.substring(0,11)=='update vue_')
      query='update '+query.substring(11);

  if (query.length>16 && query.substring(0,16)=='delete from vue_')
      query='delete from '+query.substring(16);
*/
  //alert("query ap=\n"+query);

  var connection = pgsql_getConnection();

  // gestion de la requete
  try {
    var result = connection.executeUpdate(query);
  }
  catch (ex) {
      erreur(ex,query,connection);
      //    prompt(">Erreur lors de l'exécution de la requête:\n"+query+"\n>Message d'erreur:\n" + connection.errorMessage+"\n"+ex,query);
    // alert(ex);
  }

  return result;
}

/**
 * Execute une requete en async. On vérifie auparavant la présence d'une connexion
 * à une base de données.
 *
 * @param   query     la requete a executer
 * @param   context   un contexte a passer a l'observer
 * @param   observer  l'observer pour la rqt
 *
 * @return            un request
 */
function pgsql_asyncQuery( query, context, observer ) {

  // si on n'est pas connecté on lance l'invite de login
  if (!pgsql_getConnectionState())
    pgsql_init(0);

  var connection = pgsql_getConnection();

  // gestion de la requete
  var request = connection.asyncExecuteQuery(query, context, observer);

  return request;
}

/**
 * Parcourt de la chaine a la recherche de " et de ' pour les remplacer par \" et \'
 *  (Fonction a utiliser avant de mettre a jour la bdd)
 */
function replaceQuote(chaine) {
  chaine = chaine.replace(/\'/g,"\\\'");
  chaine = chaine.replace(/\"/g,"\\\"");

  return chaine;
}

/*------------------------------------------------------------------------------------------------------*/

/**
 * Lance la fenetre de configuration des alias pour les modifier manuellement.
 *
 */
function pgsql_configaliases() {
// Lance la fenetre de config des alias de la bdd

  window.open('chrome://sql/content/aliasManager.xul','SQL','chrome,centerscreen');
}


/**
 * Cette fonction retourne un enumerator sur un uplet
 *
 * @param   result      le result d'une requete
 * @param   indicecol   l'indice de la colonne sur lequel on fait la recherche
 * @param   atrouver    la valeur a chercher sur la col "indicecol"
 *
 * @return    null si non trouvé, un enumerator sur le uplet cherché
 */
function getItemFromEnumerator(result, indicecol, atrouver) {
  var enumerator = result.enumerate();
  var chaine = "";
  var j=0;
  var encore, trouve;

  // on recherche sa position dans l'enumerator
  enumerator.beforeFirst();

  trouve = false;
  encore = true;
  while (!trouve && encore) {
    encore = enumerator.next();
    //alert(enumerator.getVariant(0));
    trouve = ( enumerator.getVariant(indicecol) == atrouver );
  }

  if (!trouve)
    return null;

  return enumerator;
}

function getCle(TableP) {
  var Table=TableP.toLowerCase();
  var cle=Table+".";
  /*
  if (Table.length>4 && Table.substring(0,4)=='vue_' )
    Table=Table.substring(4);
  */
  var res=mcd_getCle(Table);
  if (res==null) {
    /* pour les vue: Norme de cle */
    return Table+".cle";
  }
  if (res=='') {
    alert("Attention clé primaire multiples dans : "+Table+"\n\npgsql.js");
    return Table+".cle";
  }
  return (cle+res);
}

function getNewCle(Table) {
  var result;
  var enumerator;
  var sequence = mcd_getSequence(Table);
  if (sequence=='*') {
    result=pgsql_query("select pg_get_serial_sequence('table_"+Table+"', '"+mcd_getCle(Table)+"');");
    enumerator=result.enumerate();
    enumerator.first();
    sequence = enumerator.getVariant(0);
  }
  if (sequence=='#') {
    alert("Erreur de génération d'une clé !\nTable : "+Table+"\npas de clés primaires donc pas de séquences");
    return -1;
  }
  if (sequence==null) {
    alert("Erreur de génération d'une clé !\nTable : "+Table+"\nSéquence inexistante");
    return -1;
  }
  result=pgsql_query("select nextval('"+sequence+"');");
  if(result.rowCount==0)       {
    alert("Erreur de génération d'une clé !\nTable : "+Table+"\nSéquence introuvable dans la base : seq_"+Table);
    return -1;
  }
  enumerator=result.enumerate();
  enumerator.first();
  return enumerator.getVariant(0);
}

/*
  const long TYPE_STRING        = 1;
  const long TYPE_INT           = 2;
  const long TYPE_FLOAT         = 3;
  const long TYPE_DECIMAL       = 4;
  const long TYPE_DATE          = 5;
  const long TYPE_TIME          = 6;
  const long TYPE_DATETIME      = 7;
  const long TYPE_BOOL          = 8;
*/

/* retourne le type d'un attribut */
/* --> NE MARCHE PAS */
function getTypeAttribut(Attribut,Table)
{
    var Req="select "+Attribut+" from "+Table;
    var res=pgsql_query(Req);
    alert("Type:"+res.getColumnTypeAsString(0));
    alert("Col:"+res.getColumnName(0));
    return res.getColumnType(0);
}

function pgsql_begin_trans()
{
    pgsql_update("BEGIN;");
}


function pgsql_end_trans()
{
    pgsql_update("COMMIT;");
}

function pgsql_savepoint(savepoint)
{
  var req="savepoint "+savepoint; 
  pgsql_update(req);
}

function pgsql_rollback(savepoint)
{
  var req="rollback to savepoint "+savepoint; 
  pgsql_update(req);
}



// alert('PG chargé');
