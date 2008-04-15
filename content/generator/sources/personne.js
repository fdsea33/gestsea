/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function personne_alert(x){
    //    alert(x);
}

function CodeInPersonne(){

    personne_alert("Début de la construction");
    var AllIt = new clTabInterfaceSimple();

    /****************************
     * AJOUTS SPECIAUX
     ****************************/

    AllIt.IncludeJs("chrome://gestsea/content/gestsea/principal_plus.js");
    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
    //    AllIt.IncludeJs("chrome://gestsea/content/gestsea/latex.js");
    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");

    /****************************
     * PERSONNE
     ****************************/
    
    var It_Personne,Maitre_Personne;

    It_Personne = new clInterfaceSimple("Personnes");

    Maitre_Personne = It_Personne.AjouterMaitre("Liste des personnes","table_personne");

    Maitre_Personne.AjouterColonne("N°Pers.","pe_numero");
    Maitre_Personne.AjouterColonne("Titre","pe_titre");
    Maitre_Personne.AjouterColonne("Nom","pe_nom");
    Maitre_Personne.AjouterColonne("Prénom","pe_prenom");


    It_Personne.AjouterComposantSimple("Numéro","pe_id",null,null,LABEL);
    It_Personne.AjouterComposantSimple("Titre ou F.J.","np_libelle",new Array("np_numero","np_numero","naturepersonne"),null,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Nom ou D.S.","pe_nom");
    It_Personne.AjouterComposantSimple("Prénom","pe_prenom");
    It_Personne.AjouterComposantSimple("N°TVA intrac.","pe_numtvaic");
    It_Personne.AjouterComposantSimple("Né(e) le","pe_naissance");
//    It_Personne.AjouterComposantSimple("Type","tp_type",new Array("tp_numero","tp_numero","typepersonne"),null,LISTE_DEROULANTE);

    //***********************
    //  EST LIE
    /* pour les relations recursives */
    AllIt.AjouterCodeUserLoad('ConstruireOngletEstLie("tabbox_'+Maitre_Personne.getNom_()+'",'+Maitre_Personne.getIdDansTabGlobalCompo()+');\n');
    AllIt.AjouterCodeUserLoad('Compo_'+Maitre_Personne.getNom_()+'.OnChangeUser=RefreshOngletEstLie;\n');
    AllIt.AjouterCodeUserLoad('Compo_'+Maitre_Personne.getNom_()+'.OnChangeUserParams=Compo_'+Maitre_Personne.getNom_()+';\n');

    
    //***********************
    // ADHESION
    var PersonneAdhesion = It_Personne.AjouterComposantComplexe("Adhésions",new Array("pe_numero","pe_numero","adhesion"));
    //    PersonneAdhesion.AjouterColonne("N°","ah_numero");
    PersonneAdhesion.AjouterColonne("Libellé","ah_libelle",new Array("ah_numero","ah_numero","adherence"));
    PersonneAdhesion.AjouterColonne("Du","po_debut", new Array("po_numero","po_numero","periode"));
    PersonneAdhesion.AjouterColonne("Au","po_fin", new Array("po_numero","po_numero","periode"));
  //  PersonneAdhesion.AjouterColonne("Active","as_active");

    //***********************
    // OBSERVATION
    PersonneObservation = It_Personne.AjouterComposantComplexe("Observations",new Array("pe_numero","pe_numero","observation"));
    PersonneObservation.AjouterColonne("Importance","ob_niveau");
    PersonneObservation.AjouterColonne("Description","ob_observation");

    //***********************
    // Bouton de recherche
    Maitre_Personne.CodeUserOnInit='Compo_'+Maitre_Personne.getNom_()+'.AddCompoAddOn(new clAddon_Fctmenupopup("Rechercher",new Array("Par numéro","Par nom","Par code postal","Par ville","Par contact"),new Array(Recherche_Num,Recherche_Nom,Recherche_CP,Recherche_Ville,Recherche_Contact),new Array(Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+')));\n';





    // Ajouts d'interfaces
    AllIt.AjouterInterface(It_Personne);

    personne_alert("Génération terminée");
    AllIt.GenererInterface("personne",null,"GestSEA Personne",true);
}


