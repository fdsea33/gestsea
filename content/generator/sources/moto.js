/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function zalert(x){
    //    alert(x);
}

function CodeInMoto(){

    zalert("Début de la construction");
    var AllIt = new clTabInterfaceSimple();
 
    /****************************
     * AJOUTS SPECIAUX
     ****************************/
    
    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
    //    AllIt.IncludeJs("chrome://gestsea/content/gestsea/latex.js");
    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");


    // Activite
    var It_Activite, Maitre_Activite;

    It_Activite = new clInterfaceSimple("Activités");

    Maitre_Activite = It_Activite.AjouterMaitre("Liste des activités","activite");
    Maitre_Activite.AjouterColonne("Employé","em_libelle",new Array("em_numero","em_numero","employe"));
    Maitre_Activite.AjouterColonne("Tâche","zt_libelle",new Array("zt_numero","zt_numero","tache"));
    Maitre_Activite.AjouterColonne("Sujet","zs_libelle",new Array("zs_numero","zs_numero","sujet"));
    Maitre_Activite.AjouterColonne("Pour","za_pour");
    Maitre_Activite.AjouterColonne("Date","za_date");
    Maitre_Activite.AjouterColonne("Durée","za_duree");

    It_Activite.AjouterComposantSimple("J'ai","zt_phrase",new Array("zt_numero","zt_numero","tache"),null, LISTE_DEROULANTE);
    It_Activite.AjouterComposantSimple("au sujet de","zs_libelle",new Array("zs_numero","zs_numero","sujet"),null, LISTE_DEROULANTE);
    It_Activite.AjouterComposantSimple("à","zl_libelle",new Array("zl_numero","zl_numero","lieu"),null, LISTE_DEROULANTE);
    It_Activite.AjouterComposantSimple("Pendant (en minutes)","za_duree");
    It_Activite.AjouterComposantSimple("Le","za_date");
    It_Activite.AjouterComposantSimple("de ('HH:MM')","za_heuredebut");
    It_Activite.AjouterComposantSimple("à ('HH:MM')","za_heurefin");

    It_Activite.AjouterComposantSimple("Pour quelle nature de personne ?","za_qui",null,null,LISTE_DEROULANTE_STATIC,null,new Array("0","1","2","3"));
    It_Activite.AjouterComposantSimple("0, 1, 2. Valeur (N°facture, devis...)","za_champ");
    It_Activite.AjouterComposantSimple("3. Groupe","zg_libelle",new Array("zg_numero","zg_numero","groupe"),null, LISTE_DEROULANTE);
     /*
    It_Activite.AjouterComposantSimple("0. N°Facture","fa_numero");
    It_Activite.AjouterComposantSimple("1. N°Devis","de_numero");
    It_Activite.AjouterComposantSimple("2. N°Personne","pe_numero");
    It_Activite.AjouterComposantSimple("3. Groupe","zg_libelle",new Array("zg_numero","zg_numero","groupe"),null, LISTE_DEROULANTE);
    */


    //****************************
    // TACHE
    //****************************

    var It_Tache,Maitre_Tache;

    It_Tache = new clInterfaceSimple("Tâches");

    Maitre_Tache = It_Tache.AjouterMaitre("Liste des tâches","tache");
    Maitre_Tache.AjouterColonne("Libellé","zt_libelle");

    It_Tache.AjouterComposantSimple("Libellé", "zt_libelle");
    It_Tache.AjouterComposantSimple("J'ai", "zt_phrase");
    It_Tache.AjouterComposantSimple("Notes", "zt_notes",null,null,null,null,null,true);
    

    zalert("Tache...OK!");


    //****************************
    // LIEU
    //****************************

    var It_Lieu,Maitre_Lieu;

    It_Lieu = new clInterfaceSimple("Lieu");

    Maitre_Lieu = It_Lieu.AjouterMaitre("Liste des lieus","lieu");
    Maitre_Lieu.AjouterColonne("Libellé","zl_libelle");

    It_Lieu.AjouterComposantSimple("Libellé", "zl_libelle");
    It_Lieu.AjouterComposantSimple("Notes", "zl_notes",null,null,null,null,null,true);
    

    zalert("Lieu...OK!");



    //****************************
    // TYPESUJET
    //****************************

    var It_Typesujet, Maitre_Typesujet;

    It_Typesujet = new clInterfaceSimple("Sujets");

    Maitre_Typesujet = It_Typesujet.AjouterMaitre("Liste des types de sujets","typesujet");
    Maitre_Typesujet.AjouterColonne("Libellé","zu_libelle");

    It_Typesujet.AjouterComposantSimple("Libellé", "zu_libelle");
    It_Typesujet.AjouterComposantSimple("Notes", "zu_notes",null,null,null,null,null,true);
    
    Sujets = It_Typesujet.AjouterComposantComplexe("Sujets",new Array("zu_numero","zu_numero","sujet"));
    Sujets.AjouterColonne("Libellé","zs_libelle");

    Sujets.AddMode(INSERTION);
    Sujets.AddMode(SUPPRESSION);
    Sujets.AddMode(MODIFICATION);

    It_Typesujet.AjouterComposantSimple("Libellé","zs_libelle",null,Sujets);
    It_Typesujet.AjouterComposantSimple("Notes","zs_notes",null,Sujets,null,null,null,true);
	

    zalert("Typesujet...OK!");


    //****************************
    // GROUPE
    //****************************

    var It_Groupe,Maitre_Groupe;

    It_Groupe = new clInterfaceSimple("Groupe");

    Maitre_Groupe = It_Groupe.AjouterMaitre("Liste des groupes","groupe");
    Maitre_Groupe.AjouterColonne("Libellé","zg_libelle");

    It_Groupe.AjouterComposantSimple("Libellé", "zg_libelle");
    It_Groupe.AjouterComposantSimple("Notes", "zg_notes",null,null,null,null,null,true);
    

    zalert("Groupe...OK!");




    // Liaisons
    //    It_Reglement.LierA(FactureFacturereglementReglement, It_Facture);
    //It_Reglement.LierFortementA(PersonneReglement,It_Personne);
    

    // Interfaces
    AllIt.AjouterInterface(It_Activite);
    AllIt.AjouterInterface(It_Tache);
    AllIt.AjouterInterface(It_Typesujet);
    AllIt.AjouterInterface(It_Groupe);
    AllIt.AjouterInterface(It_Lieu);

    zalert("Génération terminée");
    AllIt.GenererInterface("moto",null,"GestSEA MOTO - Mesure Optimale des Temps d'Occupation",true);
}
