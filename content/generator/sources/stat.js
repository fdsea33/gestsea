/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function stat_alert(x){
    //    alert(x);
}

function CodeInStat(){

    stat_alert("D�but de la construction");
    var AllIt = new clTabInterfaceSimple();

    /****************************
     * AJOUTS SPECIAUX
     ****************************/

    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
//    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");
    AllIt.IncludeJs("chrome://gestsea/content/gestsea/principal_plus.js");


    /****************************
     * Factures non r�gl�es
     ****************************/
    
    var It_FactNR,Maitre_FactNR;

    It_FactNR = new clInterfaceSimple("Factures non r�gl�es");

    Maitre_FactNR = It_FactNR.AjouterMaitre("FNRs","vue_facture_a_regler");

    It_FactNR.AjouterBouton("Imprimer les relances","ImprimerRelances","");
    It_FactNR.AjouterBouton("Passer le solde de la facture en perte","FactureEnPerte",ComposantDansCode(Maitre_FactNR));
    It_FactNR.AjouterBouton("Relancer la facture dans 2 mois","FactureDelai",ComposantDansCode(Maitre_FactNR));

    Maitre_FactNR.AjouterColonne("N�Fact.","fa_numfact");
    Maitre_FactNR.AjouterColonne("N�Pers.","pe_numero");
    Maitre_FactNR.AjouterColonne("Nom         ","pe_libelle", new Array("pe_numero","pe_numero","personne"));
    Maitre_FactNR.AjouterColonne("Date","fa_date");
    Maitre_FactNR.AjouterColonne("Montant","fa_montantttc");
    Maitre_FactNR.AjouterColonne("Montant r�gl�","fa_regle");
    Maitre_FactNR.AjouterColonne("Reste � r�gler","fa_reste");
    Maitre_FactNR.AjouterColonne("Niveau","fa_niveau");
    Maitre_FactNR.AjouterColonne("Relance","fa_relance");
    Maitre_FactNR.AjouterColonne("nf","fa_numero");


    /****************************
     * Reglements non factur�s
     ****************************/
    
    var It_ReglNF,Maitre_ReglNF;

    It_ReglNF = new clInterfaceSimple("R�glements non factur�s");

    Maitre_ReglNF = It_ReglNF.AjouterMaitre("RNFs","vue_reglement_a_facturer");

    Maitre_ReglNF.AjouterColonne("N�Regl.","rg_numero");
    Maitre_ReglNF.AjouterColonne("N�Pers.","pe_numero");
    Maitre_ReglNF.AjouterColonne("Nom         ","pe_libelle", new Array("pe_numero","pe_numero","personne"));
    Maitre_ReglNF.AjouterColonne("Date","rg_date");
    Maitre_ReglNF.AjouterColonne("Montant","rg_montant");
    Maitre_ReglNF.AjouterColonne("Montant factur�","rg_facture");
    Maitre_ReglNF.AjouterColonne("Reste � facturer","rg_reste");

    /****************************
     * Devis non factur�s
     ****************************/
    
    var It_DevisNF,Maitre_DevisNF;

    It_DevisNF = new clInterfaceSimple("Devis non factur�s");

    Maitre_DevisNF = It_DevisNF.AjouterMaitre("DNFs","vue_devis_a_facturer");

    Maitre_DevisNF.AjouterColonne("N�Devis","de_numero");
    Maitre_DevisNF.AjouterColonne("N�Pers.","pe_numero");
    Maitre_DevisNF.AjouterColonne("Nom               ","pe_libelle", new Array("pe_numero","pe_numero","personne"));
    Maitre_DevisNF.AjouterColonne("Date","de_date");
    Maitre_DevisNF.AjouterColonne("Montant","de_montantttc");
    Maitre_DevisNF.AjouterColonne("Libell�           ","de_libelle");
    Maitre_DevisNF.AjouterColonne("Responsable       ","em_libelle", new Array("em_numero","em_numero","employe"));

    It_DevisNF.AjouterBouton("Supprimer le devis","SupprimeDevis",ComposantDansCode(Maitre_DevisNF));
    It_DevisNF.AjouterBouton("Passer le devis en facture","DevisVersFacture",ComposantDansCode(Maitre_DevisNF));


    // Ajouts d'interfaces
    AllIt.AjouterInterface(It_FactNR);
    AllIt.AjouterInterface(It_ReglNF);
    AllIt.AjouterInterface(It_DevisNF);

    stat_alert("G�n�ration termin�e");
    AllIt.GenererInterface("stat",null,"GestSEA Stat",true);
}


