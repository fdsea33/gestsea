/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
/*----------------------------------------------------------------------------*/
function mail_load_list(id,query) {
  var l = elem(id);
  var r = requete(query);
  l.setAttribute("href",r);
  l.setAttribute("value",l.value+" !");
  return l;
}

function mail_onload() {
  // Connexion
  pgsql_init(true);
  if (!pgsql_getConnectionState()) {
	  window.close();
  }
  
  var annee = requete("SELECT EXTRACT(YEAR FROM CURRENT_DATE);")*1;

  var superuser = requete("SELECT case when se_societe=2 then 1 else 0 end from employe join service on (em_service=se_numero) where em_login=current_user;");
// les JA recoivent le rapid'infos
//  var adherents = "SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM vue_current_cotisation)";
  var adherents = "SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM vue_current_cotisation) AND cn_numero NOT IN (SELECT cn_numero FROM contact WHERE ck_numero=104 AND cn_original IS NOT NULL AND pe_numero IN (SELECT pe_numero FROM contact WHERE ck_numero=104 AND cn_original IS NULL) )";

  var reg = new RegExp("vue_current_cotisation", "ig");

  if (superuser == 1) {
    mail_load_list('adhfdsea',   "select 'mailto:adherents@fdsea33.fr?subject=[FDSEA33] '||concatenate('&bcc='||mail) from ("+adherents+") AS x;");
    mail_load_list('adhfdseal',  "select 'mailto:adherents@fdsea33.fr?subject=[FDSEA33] '||concatenate('&bcc='||mail) from ("+adherents.replace(reg, "vue_lack_cotisation")+") AS x;");
    mail_load_list('adhfdseap',  "select 'mailto:adherents@fdsea33.fr?subject=[FDSEA33] '||concatenate('&bcc='||mail) from ("+adherents.replace(reg, "vue_past_cotisation")+") AS x;");
    mail_load_list('adhfdseari', "select E'mailto:adherents@fdsea33.fr?subject=[FDSEA33] Rapid''Infos N�&bcc=service.employeurs@fdsea33.fr&bcc=service.fiscal-rural@fdsea33.fr&bcc=contact@ja33.fr&bcc=redaction@avenir-aquitain.com&bcc=fdseacdja24@wanadoo.fr&bcc=frsea.aq@wanadoo.fr&bcc=jeanroulland.frsea.aq@wanadoo.fr'||concatenate('&bcc='||mail) from ("+adherents+") AS x;");
    mail_load_list('abonconseil',"select 'mailto:sacea@fdsea33.fr?subject=[SACEA] '||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM vue_current_cotisation WHERE BML_Extract(cs_detail,'sacea')='true')) AS x;");
    mail_load_list('abonmajcc',"select 'mailto:sacea@fdsea33.fr?subject=[SACEA] '||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT distinct f.pe_numero from table_lignefacture join table_facture f using (fa_numero) WHERE pd_numero in (500000002,500000003) and extract(year from fa_date)=extract(year from current_date+'7 months'::interval))) AS x;");
  } else {
    alert("Vous ne pouvez pas effectuer cette op�ration.");
    window.close();
  }
}

/*
 select 'mailto:adherents@fdsea33.fr?subject=[FDSEA33] '||concatenate('&bcc='||mail) from (

SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM vue_current_cotisation) AND cn_numero NOT IN (SELECT cn_numero FROM contact WHERE ck_numero=104 AND cn_original IS NOT NULL AND pe_numero IN (SELECT pe_numero FROM contact WHERE ck_numero=104 AND cn_original IS NULL) )

) AS x;

SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM vue_current_cotisation)
*/
