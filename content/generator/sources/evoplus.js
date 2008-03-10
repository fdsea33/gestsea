/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function evoplus_alert(x){
    //    alert(x);
}

function CodeInEvoplus(){

    evoplus_alert("Début de la construction");
    var AllIt = new clTabInterfaceSimple();

    /****************************
     * AJOUTS SPECIAUX
     ****************************/

    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");

    /****************************
     * EVOPLUS
     ****************************/
    
    var It_Evoplus,Maitre_Evoplus;

    It_Evoplus = new clInterfaceSimple("Evoplus");

    Maitre_Evoplus = It_Evoplus.AjouterMaitre("Liste des evoplus","table_evoplus");

    Maitre_Evoplus.AjouterColonne("Lot","lot");
    Maitre_Evoplus.AjouterColonne("ID","id");
    Maitre_Evoplus.AjouterColonne("N°","pe_numero");
    Maitre_Evoplus.AjouterColonne("Nom","nom");

    It_Evoplus.AjouterComposantSimple("Source","source");          // source                            - a
    It_Evoplus.AjouterComposantSimple("N°Fiche","numero");          // numero
    It_Evoplus.AjouterComposantSimple("Titre","titre");           // titre
    It_Evoplus.AjouterComposantSimple("Nom/Prénom","nom");             // nom/prenom
    It_Evoplus.AjouterComposantSimple("Complément","complement");      // complement
    It_Evoplus.AjouterComposantSimple("Ad1","ad1");             // ad1
    It_Evoplus.AjouterComposantSimple("Ad2","ad2");             // ad2
    It_Evoplus.AjouterComposantSimple("Ad3","ad3");             // ad3
    It_Evoplus.AjouterComposantSimple("CP","cp");              // cp
    It_Evoplus.AjouterComposantSimple("Ville","ville");           // ville
    It_Evoplus.AjouterComposantSimple("né le","naissance");       // né le
    It_Evoplus.AjouterComposantSimple("tel","telephone");       // tel
    It_Evoplus.AjouterComposantSimple("fax","fax");             // fax                               - m
    It_Evoplus.AjouterComposantSimple("mob","portable");        // portable
    It_Evoplus.AjouterComposantSimple("Qualification","qualification");   // qualif
    It_Evoplus.AjouterComposantSimple("Fortait (montant)","base_ht");         // forfait (qualif cout)
    It_Evoplus.AjouterComposantSimple("Productions","productions");     // productions
//    It_Evoplus.AjouterComposantSimple("","fuel_m3");         // fuel m3
//    It_Evoplus.AjouterComposantSimple("","eco_fuel");        // eco fuel
//    It_Evoplus.AjouterComposantSimple("","eco_fuel_tipp");   // eco fuel tipp
    It_Evoplus.AjouterComposantSimple("Nb d'hectares","hectares_nb");     // nb hectare
    It_Evoplus.AjouterComposantSimple("Nb salariés","salaries_nb");     // salaries nb
    It_Evoplus.AjouterComposantSimple("SACEA montant","sacea_ttc");       // abt conseil cout
/*
    It_Evoplus.AjouterComposantSimple("","h1_ha");           // aocreg ha
    It_Evoplus.AjouterComposantSimple("","h1_ht");           // aocreg ht
    It_Evoplus.AjouterComposantSimple("","h2_ha");           // aoccom ha                         - z
    It_Evoplus.AjouterComposantSimple("","h2_ht");           // aoccom ht                         - aa
    It_Evoplus.AjouterComposantSimple("","h3_ha");           // tclarbo ha
    It_Evoplus.AjouterComposantSimple("","h3_ht");           // tclarbo ht
    It_Evoplus.AjouterComposantSimple("","h4_ha");           // cereales ha
    It_Evoplus.AjouterComposantSimple("","h4_ht");           // cereales ht
    It_Evoplus.AjouterComposantSimple("","h5_ha");           // herbage ha
    It_Evoplus.AjouterComposantSimple("","h5_ht");           // herbage ht
    It_Evoplus.AjouterComposantSimple("","h6_ha");           // maraich ha
    It_Evoplus.AjouterComposantSimple("","h6_ht");           // maraich ht
*/
    It_Evoplus.AjouterComposantSimple("Nb CM","cm_nb");           // cm nb                             - am
    It_Evoplus.AjouterComposantSimple("CM Montant","cm_ht");           // cm ht
    It_Evoplus.AjouterComposantSimple("CM Noms","cm_noms");         // cm noms
    It_Evoplus.AjouterComposantSimple("Option 1","opt1");            // option1 :   X   !           !   X   !   X
    It_Evoplus.AjouterComposantSimple("Option 2","opt2");            // option2 :   X   OU    X     !       !   X
    It_Evoplus.AjouterComposantSimple("Option 3","opt3");            // option3 :   X   !           !   X   !
    It_Evoplus.AjouterComposantSimple("Option 4","opt4");            // option4 :   X   OU    X     !       !          
    It_Evoplus.AjouterComposantSimple("Option retenue","opt_num");         // option retenu
    It_Evoplus.AjouterComposantSimple("Cout retenu","opt_ttc");         // cout retenu
    It_Evoplus.AjouterComposantSimple("Statut","statut");          // statut
    It_Evoplus.AjouterComposantSimple("Remarque","remarque",null,null,null,null,null,true);        // remarque

    // Ajouts d'interfaces
    AllIt.AjouterInterface(It_Evoplus);

    evoplus_alert("Génération terminée");
    AllIt.GenererInterface("evoplus",null,"EVO+",true);
}


