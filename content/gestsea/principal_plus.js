/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
var FactureEnCours = 14;
var fa_numero;

/*
 * @param table table maitre du document à imprimer
 */

function requete(query){
  var result=pgsql_query(query);
  if (result.rowCount>0){
    var enumr=result.enumerate();
    enumr.first();
    return enumr.getVariant(0);
  }
  return null;
}


function ChoisitModele(table){
  return requete("SELECT FC_ChercheFonction('"+table+"');");
}

function LancerPrint(){
  window.openDialog('principal_print.xul','showmore','modal,centerscreen,chrome');
}

function Test(compo){
  alert(compo.getCleVal());
}

function ValideReglement(compo)
{
  if (confirm("Etes-vous sûr(e) de vouloir valider le réglement ?")) {
    num_reglement=compo.getCleVal();
    pgsql_query("SELECT FC_ReglementVersCompta("+num_reglement+");");
  }
}

function ChangerNumeroJournal()
{
  var num=requete("SELECT cs_valeur FROM constante WHERE cs_type=1;");
  num=prompt("Veuillez indiquer le numéro du journal .\nN'oubliez pas de rafraichir la liste ensuite.",num);
  if (num!=null && num!=undefined) {
    query="UPDATE constante SET cs_valeur="+num+" WHERE cs_type=1;";
    pgsql_update(query);
  }
}

function ChangerNombrePasses()
{
  var num=requete("SELECT cs_valeur FROM constante WHERE cs_type=2;");
  num=prompt("Veuillez indiquer le nombre de numéros passés après la fin de service pour lequel une relance est souhaitable.",num);
  if (num!=null && num!=undefined) {
  query="UPDATE constante SET cs_valeur="+num+" WHERE cs_type=2;";
  pgsql_update(query);
  }
}

function ChangerNombreFuturs()
{
  var num=requete("SELECT cs_valeur FROM constante WHERE cs_type=3;");
  num=prompt("Veuillez indiquer le nombre de numéros à paraitre avant la fin de service pour lequel une relance est souhaitable.",num);
  if (num!=null && num!=undefined) {
  query="UPDATE constante SET cs_valeur="+num+" WHERE cs_type=3;";
  pgsql_update(query);
  }
}

function GetTruc() {
	return 5;
}

function GroupeRoutage(compo)
{
  FactureEnCours=compo.getCleVal();
	window.openDialog('principal_routage.xul', "showmore", "centerscreen,close=no,modal,chrome,scrollbars,resizable=no");
}

function SupprimeRoutage(compo)
{
  FactureEnCours=compo.getCleVal();
  if (confirm("Etes-vous sûr(e) de vouloir supprimer tous les routages associés à cette facture ?")) {
	  pgsql_update("DELETE FROM routage WHERE fa_numero="+FactureEnCours+";");
  }
}

function DevisVersFacture(compo){
  //  alert("Fonction pas encore en place : devis n°"+compo.getCleVal()+".");
  //  var NumDevis=compo.getCleVal();
  if (confirm("Voulez-vous réellement passer ce devis en facture ?")) {
    var num_facture = requete("SELECT FC_DevisVersFacture("+compo.getCleVal()+");");
    if (num_facture==null)
      alert("Le devis n'a pas pu être passé en facture.");
    else {
      alert("Facture créée avec succès :\nN°"+requete("SELECT FA_NumFact FROM Facture WHERE FA_Numero="+num_facture));
    } 
  }
}

function FactureVersAvoir(compo){
  if (confirm("Voulez-vous réellement passer cette facture en avoir?")) {
  query="SELECT FC_FactureVersAvoir("+compo.getCleVal()+");";
  var NumFact=requete(query);
  if (NumFact==null)
    alert("La facture n'a pas pu être passé en avoir.");
  else
    alert("Avoir créé avec succès :\nN° "+NumFact);
  }
}

function FactureEnPerte(compo){
  var num_facture =compo.getCleVal();
  var enperte = requete('SELECT CASE WHEN fa_perte THEN 1 ELSE 0 END FROM facture WHERE fa_numero='+num_facture);
  var question = '?';
  if (enperte==1) question = 'Voulez-vous vraiment faire revenir cette facture en profit ?';
  else question = 'Voulez-vous vraiment faire passer cette facture en perte ?';
  if (confirm(question)) {
    pgsql_update("UPDATE facture SET fa_perte=NOT fa_perte WHERE fa_numero="+num_facture);
  }
}

function ViderPersonneUpdate(){
  pgsql_update("DELETE FROM Personneupdate;");
  alert("La liste a été vidée.");
}

function MiseAJourAdhesion(){
  pgsql_query("SELECT FC_MAJ_Adhesion();");
  alert("Les adhésions ont été mises à jour.");
}


function LastBordereauPrint(){
  var modele= ChoisitModele('reglement');
  var adresse=requete("SELECT "+modele+"(0)");
  window.setTimeout("window.open('"+adresse+"')",500);
}

function BordereauPrint(){
  var debut, fin;
  debut=requete("SELECT cs_valeur FROM constante WHERE cs_type=100;");
  fin=requete("SELECT cs_valeur FROM constante WHERE cs_type=101;");
  debut=prompt("Veuillez indiquer la date de début du bordereau ("+debut+")",fin);
  if (debut!=null && debut!=undefined) {
  var query="UPDATE constante SET cs_valeur='"+debut+"' WHERE cs_type=100;";
  pgsql_update(query);
  fin=prompt("Veuillez indiquer la date de fin du bordereau ("+fin+")",debut);
  if (fin!=null && fin!=undefined) {
    query="UPDATE constante SET cs_valeur='"+fin+"' WHERE cs_type=101;";
    pgsql_update(query);
    var modele= ChoisitModele('reglement');
    var adresse=requete("SELECT "+modele+"(0)");
    window.setTimeout("window.open('"+adresse+"')",500);
  }
  }
}


function Imprimer(compo,mot){
  if (compo.getCleVal()>=0){
    Imprimer2(compo.getCleVal(),mot);
  } else alert("Il faut sélectionner une ligne de la liste avant de lancer l'impression.");
}

function Imprimer2(cle,mot){
  var adresse;
  var modele;
  modele = ChoisitModele(mot);
  if (modele!=null) {
    adresse = requete("SELECT "+modele+"("+cle+");")
    if (adresse!=null) {
      window.setTimeout("window.open('"+adresse+"')",100);
    } else alert("Une erreur est survenue lors de la création du document.\nLe modèle est peut-être invalide.");
  } else alert("Aucun modèle n'a été trouvé pour ce type d'impression : \nPas de modèle '"+mot+"' par défaut!");
}



function PrintLot(lot,itype){
  var date_debut;
  var date_fin;
  var query;
  
  date_debut = prompt("A partir de quelle date?",date_debut);
  date_fin = prompt("Jusqu'à quelle date?",date_fin);
  
  query = "SELECT fc_imprimelot("+lot+",'"+itype+"','"+date_debut+"','"+date_fin+"');";
  window.open(requete(query));
}

function MajReductionDevis(compo) {
  var cle = compo.getCleVal();
  var query = "UPDATE devis SET updated_by=current_user WHERE de_numero="+cle+";";
  pgsql_update(query);
  query = "UPDATE ligne SET updated_by=current_user WHERE de_numero="+cle+";";
  pgsql_update(query);
 
}

function PrintDuplicata(compo){
  var cle = compo.getCleVal();
  if (cle>0) {
    var query = "SELECT count(*) FROM lignefacture left join avoir using (fa_numero) WHERE pd_numero=500000153 AND fa_numero="+cle+" AND av_numero IS NULL;";
    var query2 = "SELECT CASE WHEN CURRENT_DATE>='01/01/2008' THEN 1 ELSE 0 END AS strict;";
    var query3 = "SELECT CASE WHEN CURRENT_USER='brice' THEN 1 ELSE 0 END AS admin;";
    if (requete(query)>=1 || requete(query2)==0 || requete(query3)==1) {
      Imprimer(compo,'carte-duplicata')
    } else { alert("Cette facture n'autorise pas la création de duplicata"); }
  } else { alert("Il faut sélectionner une facture");}
}


function EvoPrint(mode,compo) {
//  FC_evoplus_print
  var cle = compo.getCleVal();
  var lot = requete('SELECT lot FROM table_evoplus WHERE id='+cle);
  if (mode=='lot') {
    lot = prompt('Saisissez le n° de lot à imprimer\nAstuce : Ne rien mettre pour imprimer le dernier lot');
    if (lot=='' || lot==undefined) lot = null;
    adresse = requete("SELECT fc_evoplus_print("+lot+")");
    if (adresse!=null) {
      window.setTimeout("window.open('"+adresse+"')",100);
    } else alert("Une erreur est survenue lors de la création du document.\nLe modèle est peut-être invalide.");
  } else if (mode=='remarques') {
    Imprimer2(lot,'evoplusrem');
  } else if (mode=='lettre') {
    Imprimer(compo,'evoplus');
  } else {
    alert("Mode inconnu : "+mode);
  }
}

function TestCotisation(compo,diff) {
  var cle = compo.getCleVal();
  var num = requete('SELECT pe_numero FROM table_evoplus WHERE id='+cle);  
  var annee = requete('SELECT EXTRACT(YEAR FROM CURRENT_DATE)');  
  if (diff!=null && !isNaN(diff)) annee += diff;
  var count = requete("SELECT count(*) from table_cotisation WHERE cs_annee="+annee+" AND (pe_numero="+num+" OR bml_extract(cs_detail,'cotisation.societe')="+num+")");
  if (count>0)
    alert("La personne "+num+" est adhérente pour l'année "+annee);
  else
    alert("La personne "+num+" N'est PAS adhérente pour l'année "+annee);
}


function AjouterJA(compo) {
  var cle = compo.getCleVal();
  var num = requete("SELECT CASE WHEN COALESCE(pe_naissance,'01/01/1800')<('01/01/'||(EXTRACT(YEAR FROM CURRENT_DATE)::integer-35)::text)::date THEN 'KO' ELSE 'OK' END FROM personne WHERE pe_numero="+cle);
  if (num=='KO') {
    alert("La date de naissance ne permet pas de dire que cette personne est un JA potentiel.")
  } else {
    if (confirm("Etes-vous sûr(e) de vouloir enregistrer une cotisation JA pour cette personne")) {
      var soc=prompt("Inidiquez le numéro de sa societe si connue","");
      if (soc=="")
        soc = "NULL";
      else
        if (soc*1<1000000) soc=soc*1+1000000;
      num = requete('SELECT fc_ajouterja('+cle+','+soc+');');
      alert("Cotisation enregistrée");
    }
  }
}

var current_personne = 25;


function EnvoyerPassword(compo) {
  current_personne = compo.getCleVal();
  var superuser = requete("SELECT case when usesuper then 1 else 0 end from pg_user where usename=current_user;");
  if (superuser==1) {
    window.openDialog('principal_mail.xul', "showmore", "centerscreen,close=no,modal,chrome,scrollbars,resizable=no");
  } else {
    alert("Vous ne pouvez pas effectuer cette opération.");
  }
}


/*
function Imprimer(compo,table){
  if (compo.getCleVal()>=0){
  //  alert("Impression du document "+table+" n "+compo.getCleVal()+".");
  modele = ChoisitModele(table);
  if (modele>0) latex_ImprimerUnDocument(modele,compo.getCleVal());
  else alert("Aucun modèle n'a été trouvé pour ce type d'impression : \nPas de modèle '"+table+"' par défaut!");
  } else alert("Il faut sélectionner une ligne de la liste avant de lancer l'impression.");
}
*/
//***********************************************************************
// Bouton Rechercher
//***********************************************************************

function Open_Rechercher(Req,CompoPerso)
{
  var res=pgsql_query(Req);
  if (res.rowCount!=0) {
  window.openDialog("principal_search.xul", "showmore", "centerscreen, modal, chrome,scrollbars,resizable",CompoPerso,res);
  } else alert("Personne non trouvée");
}

function Recherche_Num(CompoPerso)
{
  var Cle=prompt("Entrez un numéro de personne","");
  if (Cle==null) return;
  var Req='select pe_numero from personne where pe_id = '+Cle;
  var res=pgsql_query(Req);
  if (res.rowCount!=0){
  var enumerator=res.enumerate();
  enumerator.beforeFirst();
  enumerator.next();
  //CompoPerso.ConserverLaSelection=false;
  CompoPerso.ForceNextSelection(enumerator.getVariant(0));
  CompoPerso.SelectItem(enumerator.getVariant(0));
  //CompoPerso.ConserverLaSelection=true;
  } else alert("Personne non trouvée");
}

function Recherche_Devis(CompoPerso) {
  var Cle=prompt("Entrez un numéro de devis","");
  if (Cle==null) return;
  if (Cle*1<500000000) Cle=Cle*1+500000000;
  var Req='select pe_numero from devis where de_numero = '+Cle;
  var res=pgsql_query(Req);
  if (res.rowCount!=0){
    var enumerator=res.enumerate();
    enumerator.beforeFirst();
    enumerator.next();
    CompoPerso.ForceNextSelection(enumerator.getVariant(0));
    CompoPerso.SelectItem(enumerator.getVariant(0));
  } else alert("Personne non trouvée. Devis "+Cle+" inexistant.");
}

function Recherche_Facture(CompoPerso) {
  var Cle=prompt("Entrez un numéro de facture","");
  if (Cle==null) return;
  if (Cle*1<1000000) Cle=Cle*1+2005000000;
  var Req='select pe_numero from facture where fa_numfact = '+Cle;
  var res=pgsql_query(Req);
  if (res.rowCount!=0){
    var enumerator=res.enumerate();
    enumerator.beforeFirst();
    enumerator.next();
    CompoPerso.ForceNextSelection(enumerator.getVariant(0));
    CompoPerso.SelectItem(enumerator.getVariant(0));
  } else alert("Personne non trouvée. Facture "+Cle+" inexistante.");
}


function Recherche_Nom(CompoPerso)
{
  var NomPerso=prompt("Entrez le nom de la personne","");
  if (NomPerso==null)
  return;
  var Req="select distinct pe_numero,pe_titre,pe_fullname, pe_cp, pe_ville, pe_telephone, pe_fax from vue_personne where pe_libelle ilike ('%'||REPLACE(TRIM('"+NomPerso+"'),' ','%')||'%') or pe_adresse ilike ('%'||REPLACE(TRIM('"+NomPerso+"'),' ','%')||'%') order by pe_fullname";
  Open_Rechercher(Req,CompoPerso);
}

function Recherche_CP(CompoPerso)
{
  var CpPerso=prompt("Entrez un code postal","");
  if (CpPerso==null)
  return;
  var Req="select distinct pe_numero,pe_titre,pe_fullname, pe_cp, pe_ville, pe_telephone, pe_fax from vue_personne where pe_cp="+CpPerso+" order by pe_fullname";
  Open_Rechercher(Req,CompoPerso);
}

function Recherche_Ville(CompoPerso)
{
  var NomVille=prompt("Entrez le nom de la ville","");
  if (NomVille==null)
  return;
  var Req="select distinct pe_numero,pe_titre,pe_fullname, pe_cp, pe_ville, pe_telephone, pe_fax from vue_personne where pe_ville ilike('%'||REPLACE(TRIM('"+NomVille+"'),' ','%')||'%') order by pe_fullname";
  Open_Rechercher(Req,CompoPerso);
}

function Recherche_Contact(CompoPerso)
{
  var NumCont=prompt("Entrez un numéro de téléphone, fax, portable ou un e-mail","");
  if (NumCont==null)
  return;
  var Req="select distinct vue_personne.pe_numero,pe_titre,pe_fullname, cp_codepostal AS pe_cp, vi_nom AS pe_ville, pe_telephone, pe_fax from vue_personne join adresse using (pe_numero) join codepostal using (cp_numero) join ville using (vi_numero) join contact using (pe_numero) where cn_coordonnee ilike('%"+NumCont+"%') and ad_active IS NOT FALSE order by pe_fullname";
  Open_Rechercher(Req,CompoPerso);
}

//***********************************************************************
// Onglet Est Lié
//***********************************************************************

var current_compo;

function load_personne(event)
{
  var row = {}, column = {}, part = {};
  var tree = document.getElementById("arbre_lierA");

  var boxobject = tree.boxObject;
  boxobject.QueryInterface(Components.interfaces.nsITreeBoxObject);
//  alert(boxobject.view);
  boxobject.getCellAt(event.clientX, event.clientY, row, column, part);
//  document.getElementById("row").value = row.value;
//  document.getElementById("column").value = column.value.index;
/*
  alert(column);
  alert(column.value);
  alert(column.value.index);
  alert(column.value.id);
*/
  if (column.value.index==0 || column.value.index==2) {
    cle = boxobject.view.getCellValue(row.value, column.value);
//    alert(cle);
    current_compo.ForceNextSelection(cle);
	  current_compo.SelectItem(cle);
  }
}


function RefreshOngletEstLie(CompoPerso)
{
  if (!ALeDroit(DT_SELECT,'estlie'))
  return;
  
  var Cle=CompoPerso.getCleVal();
  current_compo = CompoPerso;

  var query="SELECT el_personne1, el_libelle1 AS pe_libelle1, tl_numero, tl_action12, el_personne2, el_libelle2 AS pe_libelle2, el_numero, el_debut::date  FROM estlie WHERE el_personne1="+Cle+" OR el_personne2="+Cle+";";
/*  
  var query="(select personne.pe_numero,pe_titre,personne.pe_nom,personne.pe_prenom from estlie join personne on (estlie.el_personne1=personne.pe_numero) where estlie.el_personne2="+Cle+")";
  query +=  " UNION ";
  query +=  "(select personne.pe_numero,pe_titre,personne.pe_nom,personne.pe_prenom from estlie join personne on (estlie.el_personne2=personne.pe_numero) where estlie.el_personne1="+Cle+")";
  */
  var result=pgsql_query(query);

  var tree=top.document.getElementById("arbre_lierA");

  var sources=tree.database.GetDataSources();
  var oldds;

  while (sources.hasMoreElements()) {
  oldds = sources.getNext();
  tree.database.RemoveDataSource(oldds);
  }
  
  var ds=result.QueryInterface(Components.interfaces.nsIRDFDataSource);
  tree.database.AddDataSource(ds);
  
  tree.builder.rebuild();
}

var current_personne = 18;
var current_target = 18;
var current_lien = 0;
var current_mode = 'select';
//var current_compo;

function Insert_LierA()
{
  if (!ALeDroit(DT_INSERT,'estlie')){
  alert("Vous n'avez pas le droit d'ajouter une liaison");
  return;
  }
  current_mode = 'insert';
  var tree=top.document.getElementById("arbre_lierA");
  var Id=tree.getAttribute("IdTab");
  CompoPerso=GetSQLCompoAt(Id);
  current_compo = CompoPerso;
  var Cle1=CompoPerso.getCleVal();
  if (Cle1==-1){
  alert("Vous devez être sur la personne à lier \n(si vous êtes en train d'inserer la personne passez en mode mise à jour pour ajouter une liaison)");
  return;
  }
  current_personne = Cle1;
  window.openDialog('principal_link.xul', "showmore", "centerscreen,close=no,modal,chrome,scrollbars,resizable=no")
/*
  var CleFede=prompt("Entrez le n°adhérent de la personne à lier");
  CleFede=CleFede*1+1000000;
  var query,res;
  if (CleFede!=null)
  {
    query='select pe_numero from personne where pe_numero='+CleFede;
    res=pgsql_query(query);
    if (res.rowCount!=0)
    {
      var enumerator=res.enumerate();
      enumerator.first();
      var Cle2=enumerator.getVariant(0);

      // on vérifie que le lien n'existe pas déjà
      query='(select * from estlie where el_personne2='+Cle1+' and el_personne1='+Cle2+')';
      query+=' UNION ';
      query+='(select * from estlie where el_personne2='+Cle2+' and el_personne1='+Cle1+')';
      res=pgsql_query(query);
      if (res.rowCount==0)
      {
        query='insert into estlie (el_personne2,el_personne1) values('+Cle1+','+Cle2+')';
        pgsql_update(query);
        RefreshOngletEstLie(CompoPerso);
      }
      else
      alert('Ce lien existe déjà');
    }
    else
    alert('Ce numéro n\'existe pas');
  }
*/
}

function Update_LierA()
{
  if (!ALeDroit(DT_UPDATE,'estlie')){
  alert("Vous n'avez pas le droit de modifier un lien");
  return;
  }
  current_mode = 'update';
  var tree=top.document.getElementById("arbre_lierA");
  var Id=tree.getAttribute("IdTab");
  CompoPerso=GetSQLCompoAt(Id);
  current_compo = CompoPerso;
  var Cle1=CompoPerso.getCleVal();
  if (tree.view!=null && tree.currentIndex!=-1)
  {
    current_personne = tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(0));
    current_target   = tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(2));
    current_lien     = tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(3));
    window.openDialog('principal_link.xul', "showmore", "centerscreen,close=no,modal,chrome,scrollbars,resizable=no")
//    query='delete from estlie where el_numero='+Cle2;
//    RefreshOngletEstLie(CompoPerso);
//    }
  }
  else
  alert("Selectionnez la personne à délier");

}

function Delete_LierA()
{
  if (!ALeDroit(DT_DELETE,'estlie'))
  {
    alert("Vous n'avez pas le droit de supprimer une liaison");
    return;
  }
  var tree=top.document.getElementById("arbre_lierA");
  var Id=tree.getAttribute("IdTab");
  CompoPerso=GetSQLCompoAt(Id);
  var Cle1=CompoPerso.getCleVal();
  var Cle2;
  if (tree.view!=null && tree.currentIndex!=-1)
  {
    if (confirm("Voulez-vous vraiment supprimer cette liaison ?")){
    Cle2=tree.view.getCellValue(tree.currentIndex, tree.treeBoxObject.columns.getColumnAt(3));
    query='delete from estlie where el_numero='+Cle2;
    pgsql_update(query);
/*
    query='delete from estlie where el_personne2='+Cle1+' and el_personne1='+Cle2;
    pgsql_update(query);
    query='delete from estlie where el_personne2='+Cle2+' and el_personne1='+Cle1;
    pgsql_update(query);
*/
    RefreshOngletEstLie(CompoPerso);
    }
  }
  else
  alert("Selectionnez la personne à délier");
}

function ConstruireOngletEstLie(Nom_tabbox,IdTab)
{
  var mydoc=top.document;
  var tabbox=mydoc.getElementById(Nom_tabbox);
  var tab,tabpanel,groupbox,caption,tree,treecols,treecol,splitter,template,treechildren,treeitem,treerow,treecell,button,hbox;
  
  tab=mydoc.createElement("tab");
  tab.setAttribute("label","Liens");
  tab.setAttribute("style","font-weight:bold; color: #F42; font-size:12px;");
  tabbox.firstChild.appendChild(tab);
  tabbox.firstChild.setAttribute("style","display:inline;");
  
  tabpanel=mydoc.createElement("tabpanel");
  tabpanel.setAttribute("flex","1");
  tabpanel.setAttribute("orient","vertical");
  tabbox.childNodes[1].appendChild(tabpanel);
  
  groupbox = mydoc.createElement("groupbox");
  groupbox.setAttribute("flex","1");
  tabpanel.appendChild(groupbox);
       
  caption = mydoc.createElement("caption");
  caption.setAttribute("label","Liens entre fiches");
  groupbox.appendChild(caption);

  tree = mydoc.createElement("tree");
  tree.setAttribute("flex","1");
  tree.setAttribute("onclick","load_personne(event);");
  tree.setAttribute("IdTab",IdTab);
  tree.setAttribute("id","arbre_lierA");
  tree.setAttribute("style","min-height:100px;min-width:300px");
  tree.setAttribute("enableColumnDrag","true");
  tree.setAttribute("datasources","rdf:null");
  tree.setAttribute("ref","SQL:ResultRoot");
  tree.setAttribute("flags","dont-build-content");
  groupbox.appendChild(tree);
  //  tabpanel.appendChild(tree);
  
   // on génère les colonnes
  treecols = mydoc.createElement("treecols");
  tree.appendChild(treecols);
  
  // les colonnes
  treecol = mydoc.createElement("treecol");
  treecol.setAttribute("flex","4");
  treecol.setAttribute("label","Fiche A");
  treecol.setAttribute("sortDirection","ascending");
  treecol.setAttribute("sortActive","true");
  treecol.setAttribute("index","estlie-fichea");
  treecols.appendChild(treecol);
  
  splitter = mydoc.createElement("splitter");
  splitter.setAttribute("class","tree-splitter");
  treecols.appendChild(splitter);
  
  treecol = mydoc.createElement("treecol");
  treecol.setAttribute("flex","3");
  treecol.setAttribute("label","Lien");
  treecols.appendChild(treecol);
  
  splitter = mydoc.createElement("splitter");
  splitter.setAttribute("class","tree-splitter");
  treecols.appendChild(splitter);
  
  treecol = mydoc.createElement("treecol");
  treecol.setAttribute("flex","4");
  treecol.setAttribute("label","Fiche B");
  treecol.setAttribute("index","estlie-ficheb");
  treecols.appendChild(treecol);
  
  splitter = mydoc.createElement("splitter");
  splitter.setAttribute("class","tree-splitter");
  treecols.appendChild(splitter);
  
  treecol = mydoc.createElement("treecol");
  treecol.setAttribute("flex","2");
  treecol.setAttribute("label","Début");
  treecols.appendChild(treecol);

  template = mydoc.createElement("template");
  tree.appendChild(template);
  
  treechildren = mydoc.createElement("treechildren");
  template.appendChild(treechildren);
  
  treeitem = mydoc.createElement("treeitem");
  treeitem.setAttribute("uri","rdf:*");
  treechildren.appendChild(treeitem);
  
  /* on génère les lignes */
  
  treerow = mydoc.createElement("treerow");
  treeitem.appendChild(treerow);
  
  treecell = mydoc.createElement("treecell");
  treecell.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#pe_libelle1");
  treecell.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#el_personne1");
  treecell.setAttribute("properties", "hyperlink");
  treerow.appendChild(treecell);
  
  treecell = mydoc.createElement("treecell");
  treecell.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#tl_action12");
  treecell.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#tl_numero");
  treerow.appendChild(treecell);
  
  treecell = mydoc.createElement("treecell");
  treecell.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#pe_libelle2");
  treecell.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#el_personne2");
  treecell.setAttribute("properties", "hyperlink");
  treerow.appendChild(treecell);
  
  treecell = mydoc.createElement("treecell");
  treecell.setAttribute("label","rdf:http://www.mozilla.org/SQL-rdf#el_debut");
  treecell.setAttribute("value","rdf:http://www.mozilla.org/SQL-rdf#el_numero");
  treerow.appendChild(treecell);

  hbox = mydoc.createElement("hbox");
  //  hbox.setAttribute("flex","1");
  hbox.setAttribute("pack","end");
  hbox.setAttribute("class","fondstyle");
  hbox.setAttribute("align","end");
  tabpanel.appendChild(hbox);
  
  button = mydoc.createElement("button");
  button.setAttribute("class","new-button16");
  button.setAttribute("label","Ajouter");
  button.setAttribute("oncommand","Insert_LierA()");
  hbox.appendChild(button);
  
  button = mydoc.createElement("button");
  button.setAttribute("class","edit-button16");
  button.setAttribute("label","Modifier la nature du lien");
  button.setAttribute("oncommand","Update_LierA()");
  hbox.appendChild(button);
  
  button = mydoc.createElement("button");
  button.setAttribute("class","delete-button16");
  button.setAttribute("label","Supprimer");
  button.setAttribute("oncommand","Delete_LierA()");
  hbox.appendChild(button);
}


//***********************************************************************
// Fin
//***********************************************************************
//alert('OK');

