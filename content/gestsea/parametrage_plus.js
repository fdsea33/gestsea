function DroitsUpdate()
{
    var query="UPDATE droit SET updated_by='postgres' WHERE dr_numero=0;";
    pgsql_update(query);
    alert("Les droits ont �t� mis � jour pour tout le monde.");
}

function ImpressionsUpdate()
{
    var query="SELECT fc_creerimpressions('/tmp');";
    pgsql_query(query);
    alert("Les fonctions d'impressions ont �t� mises � jour pour tout le monde.");
}



function MiseAJourAdhesion(){
    pgsql_query("SELECT FC_MAJ_Adhesion();");
    alert("Les adh�sions ont �t� mises � jour.");
}

