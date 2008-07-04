/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function stat_alert(x){
    //    alert(x);
}

function CodeInStat(){

    stat_alert("Début de la construction");
    var AllIt = new clTabInterfaceSimple();

    /****************************
     * AJOUTS SPECIAUX
     ****************************/

    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");
    AllIt.IncludeJs("chrome://gestsea/content/gestsea/principal_plus.js");


    /****************************
     * stat
     ****************************/
    
    var It_stat,Maitre_stat;

    It_stat = new clInterfaceSimple("stat");

    Maitre_stat = It_stat.AjouterMaitre("Liste des stat","table_stat");

    Maitre_stat.AjouterColonne("ID","id");
    Maitre_stat.AjouterColonne("Lot","lot");
    Maitre_stat.AjouterColonne("N°   ","pe_numero");
    Maitre_stat.AjouterColonne("Nom         ","nom");

    It_stat.AjouterBouton("Imprimer le (dernier) lot","EvoPrint","'lot',"+ComposantDansCode(Maitre_stat));
    It_stat.AjouterBouton("Imprimer les remarques du lot","EvoPrint","'remarques',"+ComposantDansCode(Maitre_stat));
    It_stat.AjouterBouton("Imprimer le courrier","EvoPrint","'lettre',"+ComposantDansCode(Maitre_stat));
    It_stat.AjouterBouton("Adhérent N ?","TestCotisation",ComposantDansCode(Maitre_stat));
    It_stat.AjouterBouton("Adhérent N-1 ?","TestCotisation",ComposantDansCode(Maitre_stat)+",-1");

    It_stat.AjouterComposantSimple("Source","source");          // source                            - a
    It_stat.AjouterComposantSimple("N°Fiche","numero");          // numero
    It_stat.AjouterComposantSimple("Titre","titre");           // titre
    It_stat.AjouterComposantSimple("Nom/Prénom","nom");             // nom/prenom
    It_stat.AjouterComposantSimple("Complément","complement");      // complement
    It_stat.AjouterComposantSimple("Ad1","ad1");             // ad1
    It_stat.AjouterComposantSimple("Ad2","ad2");             // ad2
    It_stat.AjouterComposantSimple("Ad3","ad3");             // ad3
    It_stat.AjouterComposantSimple("CP","cp");              // cp
    It_stat.AjouterComposantSimple("Ville","ville");           // ville
    It_stat.AjouterComposantSimple("né le","naissance");       // né le
    It_stat.AjouterComposantSimple("tel","telephone");       // tel
    It_stat.AjouterComposantSimple("fax","fax");             // fax                               - m
    It_stat.AjouterComposantSimple("mob","portable");        // portable
    It_stat.AjouterComposantSimple("Qualification","qualification");   // qualif
    It_stat.AjouterComposantSimple("Fortait (montant)","base_ht");         // forfait (qualif cout)
    It_stat.AjouterComposantSimple("Productions","productions");     // productions
//    It_stat.AjouterComposantSimple("","fuel_m3");         // fuel m3
//    It_stat.AjouterComposantSimple("","eco_fuel");        // eco fuel
//    It_stat.AjouterComposantSimple("","eco_fuel_tipp");   // eco fuel tipp
    It_stat.AjouterComposantSimple("Nb d'hectares","hectares_nb");     // nb hectare
    It_stat.AjouterComposantSimple("Nb salariés","salaries_nb");     // salaries nb
    It_stat.AjouterComposantSimple("SACEA montant","sacea_ttc");       // abt conseil cout
/*
    It_stat.AjouterComposantSimple("","h1_ha");           // aocreg ha
    It_stat.AjouterComposantSimple("","h1_ht");           // aocreg ht
    It_stat.AjouterComposantSimple("","h2_ha");           // aoccom ha                         - z
    It_stat.AjouterComposantSimple("","h2_ht");           // aoccom ht                         - aa
    It_stat.AjouterComposantSimple("","h3_ha");           // tclarbo ha
    It_stat.AjouterComposantSimple("","h3_ht");           // tclarbo ht
    It_stat.AjouterComposantSimple("","h4_ha");           // cereales ha
    It_stat.AjouterComposantSimple("","h4_ht");           // cereales ht
    It_stat.AjouterComposantSimple("","h5_ha");           // herbage ha
    It_stat.AjouterComposantSimple("","h5_ht");           // herbage ht
    It_stat.AjouterComposantSimple("","h6_ha");           // maraich ha
    It_stat.AjouterComposantSimple("","h6_ht");           // maraich ht
*/
    It_stat.AjouterComposantSimple("Nb CM","cm_nb");           // cm nb                             - am
    It_stat.AjouterComposantSimple("CM Montant","cm_ht");           // cm ht
    It_stat.AjouterComposantSimple("CM Noms","cm_noms");         // cm noms
    It_stat.AjouterComposantSimple("Option 1","opt1");            // option1 :   X   !           !   X   !   X
    It_stat.AjouterComposantSimple("Option 2","opt2");            // option2 :   X   OU    X     !       !   X
    It_stat.AjouterComposantSimple("Option 3","opt3");            // option3 :   X   !           !   X   !
    It_stat.AjouterComposantSimple("Option 4","opt4");            // option4 :   X   OU    X     !       !          
    It_stat.AjouterComposantSimple("Option retenue","opt_num");         // option retenu
    It_stat.AjouterComposantSimple("Cout retenu","opt_ttc");         // cout retenu
    It_stat.AjouterComposantSimple("Statut","statut");          // statut
    It_stat.AjouterComposantSimple("Remarque","remarque",null,null,null,null,null,true);        // remarque

    // Ajouts d'interfaces
    AllIt.AjouterInterface(It_stat);

    stat_alert("Génération terminée");
    AllIt.GenererInterface("stat",null,"GestSEA Stat",true);
}


