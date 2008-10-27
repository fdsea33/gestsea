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

  var superuser = requete("SELECT case when se_societe=2 then 1 else 0 end from employe join service on (em_service=se_numero) where em_login=current_user;");

  if (superuser == 1) {
    mail_load_list('adhfdsea',   "select 'mailto:adherents@fdsea33.fr?subject=[FDSEA33] '||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM cotisation WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)+(CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)<=2 THEN -1 ELSE 0 END))) AS x;");
    mail_load_list('adhfdseari', "select E'mailto:adherents@fdsea33.fr?subject=[FDSEA33] Rapid''Infos N°&bcc=service.employeurs@fdsea33.fr&bcc=service.fiscal-rural@fdsea33.fr&bcc=contact@ja33.fr&bcc=redaction@avenir-aquitain.com&bcc=fdseacdja24@wanadoo.fr&bcc=frsea.aq@wanadoo.fr&bcc=jeanroulland.frsea.aq@wanadoo.fr'||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero IN (219,220)) AND pe_numero IN (SELECT pe_numero FROM cotisation WHERE cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)+(CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)<=2 THEN -1 ELSE 0 END))) AS x;");
    mail_load_list('abonconseil',"select 'mailto:abonnes_conseil@fdsea33.fr?subject=[SACEA] '||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT pe_numero FROM cotisation WHERE BML_Extract(cs_detail,'sacea')='true' AND cs_annee=EXTRACT(YEAR FROM CURRENT_DATE)+(CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE)<=2 THEN -1 ELSE 0 END))) AS x;");
    mail_load_list('abonmajcc',"select 'mailto:abonnes_majcc@fdsea33.fr?subject=[SACEA] '||concatenate('&bcc='||mail) from (SELECT distinct cn_coordonnee AS mail FROM contact WHERE cn_actif AND ck_numero=104 AND pe_numero NOT IN (SELECT pe_numero FROM attribut WHERE cr_numero=219) AND pe_numero IN (SELECT distinct f.pe_numero from table_lignefacture join table_facture f using (fa_numero) WHERE pd_numero in (500000002,500000003) and extract(year from fa_date)=extract(year from current_date+'7 months'::interval))) AS x;");
  } else {
    alert("Vous ne pouvez pas effectuer cette opération.");
    window.close();
  }
}

