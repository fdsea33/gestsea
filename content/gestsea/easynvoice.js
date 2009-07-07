/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */

var PRODS = [500000002, 500000003, 0];

/* Retourne le numéro de la personne en cours */
function current_personne(){
  return menulist_value("wg-personne-menulist");
}


function wg_totalize() {
  p = elem("wg-produit-radiogroup");
  if (p.selectedIndex<0) { p.selectedIndex=0; }
/*  t = p.selectedItem.getAttribute('tarif')*1*(elem("wg-produit-quantity")+0*50)*/
  t = p.selectedItem.getAttribute('tarif')*1*(elem("wg-produit-quantity").value);
  elem('wg-produit-montant').value = t+' ¤';
  return true;
}

function wg_invoice(delay) {
  if (requete("SELECT count(*) FROM lignefacture join facture fa using (fa_numero) left join facture AS avoir on (avoir.fa_avoir_facture=fa.fa_numero) WHERE avoir.fa_numero is null AND fa.pe_numero="+current_personne()+" AND fa.fa_date>=(CURRENT_DATE-'"+delay+"'::interval)::date AND pd_Numero IN ("+PRODS.join(',')+")")>0) {
    if (!confirm('Une facture avec ce produit a déjà été enregistrée récemment (moins de '+delay+'). Êtes-vous sûr(e) de vouloir continuer ?')) { return false; }
  }
  var query = "SELECT fc_simple_facture("+current_personne();// pe_numero
  query += ","+ elem('wg-produit-radiogroup').selectedItem.value; // px_numero
  query += ","+ elem('wg-produit-quantity').value; // l_quantite
  query += ",'"+elem('wg-reglement-date').value+"'"; // rg_date
  query += ",'"+elem('wg-reglement-banque').value+"'"; // rg_banque
  query += ",'"+elem('wg-reglement-compte').value+"'"; // rg_compte
  query += ",'"+elem('wg-reglement-cheque').value+"'"; // rg_cheque
  query += ",";
  if (elem("wg-reglement-use").checked) {
    query += "106"; // rg_mode
  } else { 
    query += "NULL"; // rg_mode
  }
  query += ")";
  var fact = requete(query);
  alert("Numéro à inscrire sur le bordereau : F"+fact);
  return true;
}


function wg_personne_search(){
  var queryend = "FROM vue_personne join naturepersonne using (np_numero) WHERE pe_description ILIKE REPLACE('%"+elem('wg-personne-menulist').value+"%',' ','%') AND pe_numero NOT IN (SELECT el_personne1 from estlie where tl_numero=1006)";
  var query;
  if (requete("SELECT count(*) "+queryend) === 0) {
    query = "SELECT 'Pas de résultats pour la recherche' AS pe_description, 0 AS pe_numero;";
  } else {
    query = "SELECT pe_description, pe_numero "+queryend+" ORDER BY pe_nom";
  }
  menulist_fill('wg-personne-menulist',query);
}

/* Charge tous les éléments relatifs à la personne en cours */
function wg_personne_load(){
  var num_personne = current_personne();
  var reduc = requete("SELECT fc_personne_reduction("+num_personne+",CURRENT_DATE);");
  var adh = elem('wg-personne-adh');
  if (reduc>0) {
    adh.value = 'EST UN(E) ADHÉRENT(E)';
    adh.style.color = '#080';
    elem("wg-produit-radiogroup").selectedIndex = 0;
  } else {
    adh.value = 'N\'A PAS ENCORE COTISÉ !!!';
    adh.style.color = '#f00';
    elem("wg-produit-radiogroup").selectedIndex = 1;
  }

  elem('wg-reglement-date').value = requete("SELECT current_date-'4 day'::interval;");
  var reg = find_first("SELECT rg_libellebanque, rg_numerocompte, rg_reference FROM reglement WHERE pe_numero="+num_personne+" ORDER BY rg_date DESC");
  elem('wg-reglement-banque').value = ''; // rg_banque
  elem('wg-reglement-compte').value = ''; // rg_compte
  if (reg !== null) {
    if (reg !== undefined) {elem('wg-reglement-banque').value = reg[0]; }// rg_banque
    if (reg !== undefined) {elem('wg-reglement-compte').value = reg[1]; }// rg_compte
//  if (reg !== undefined) {elem('wg-reglement-cheque').value = reg[2]; }// rg_cheque
  }
  wg_totalize();
  return num_personne;
}

function wg_onload() {
  pgsql_init(true);

  if (!pgsql_getConnectionState()){
    window.close();
    return false;
  }

  if (0 === requete("SELECT CASE WHEN em_reglement THEN 1 ELSE 0 END FROM employe WHERE em_login=CURRENT_USER")) {
    alert("Vous n'avez pas le droit de faire de remises de chèques donc vous ne pourrez pas utiliser l'application");
    window.close();
    return false;
  }

  grid_fill("wg-produit-radiogroup","SELECT px_libelle, px_tarifttc::float, px_numero FROM vue_prix JOIN produit using (pd_numero) WHERE px_Actif AND PD_Numero IN ("+PRODS.join(',')+") ORDER BY px_tarifttc;");
  wg_totalize();

}

