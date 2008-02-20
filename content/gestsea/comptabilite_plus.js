

function CloturerJournal(num_journal){
    
    var mois=prompt("Veuillez inscrire le numero du mois a cloturer (de 01 a 12)",01);
    
    if (!isNaN(mois)){
	if (01<=mois && mois<=12)
	    pgsql_query("SELECT ClotureMensuelJournal("+num_journal.getCleVal()+","+mois+")");
	else alert("Le chiffre doit etre compris entre 1 et 12.");
    } else alert("Vous n'avez pas taper un chiffre correct.");


}
