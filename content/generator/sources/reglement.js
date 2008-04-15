/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */

function reglement_alert(x){
    	//    alert(x);
}

function CodeInReglement(centre){
    reglement_alert("Début de la construction");
    var AllIt = new clTabInterfaceSimple();
//    reglement_alert("Début de la construction 2");
    /****************************
     * AJOUTS SPECIAUX
     ****************************/

    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
    //    AllIt.IncludeJs("chrome://gestsea/content/gestsea/latex.js");
    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");
    //    AllIt.IncludeJs("chrome://gestsea/content/gestsea/xul.js");
    AllIt.IncludeJs("chrome://gestsea/content/gestsea/principal_plus.js");



   /****************************
     * PERSONNE
     ****************************/
    
    var It_Personne,Maitre_Personne;

    It_Personne = new clInterfaceSimple("Personnes");

    Maitre_Personne = It_Personne.AjouterMaitre("Liste des personnes","personne");

    Maitre_Personne.AjouterColonne("N°Pers.","pe_numero");
    Maitre_Personne.AjouterColonne("Titre","pe_titre");
    Maitre_Personne.AjouterColonne("Nom            ","pe_nom");
    Maitre_Personne.AjouterColonne("Prénom","pe_prenom");


    It_Personne.AjouterComposantSimple("Numéro","pe_id",null,null,LABEL);
    It_Personne.AjouterComposantSimple("Titre ou F.J.","np_libelle",new Array("np_numero","np_numero","naturepersonne"),null,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Nom ou D.S.","pe_nom");
    It_Personne.AjouterComposantSimple("Prénom","pe_prenom");
    It_Personne.AjouterComposantSimple("N°TVA intrac.","pe_numtvaic");
    It_Personne.AjouterComposantSimple("Né(e) le","pe_naissance");
//    It_Personne.AjouterComposantSimple("Type","tp_type",new Array("tp_numero","tp_numero","typepersonne"),null,LISTE_DEROULANTE);


    //***********************
    // ADRESSE
    PersonneAdresse = It_Personne.AjouterComposantComplexe("Adresses", new Array("pe_numero","pe_numero","adresse"));

    PersonneAdresse.AjouterColonne("Type","ad_type");
    PersonneAdresse.AjouterColonne("CP","cp_codepostal",new Array("cp_numero","cp_numero","codepostal"));
    PersonneAdresse.AjouterColonne("Ville","vi_nom",new Array("vi_numero","vi_numero","ville"));
    PersonneAdresse.AjouterColonne("Canton","ct_nom",new Array("vi_numero","vi_numero","ville","ct_numero","ct_numero","canton"));

    PersonneAdresse.AddMode(INSERTION);
    PersonneAdresse.AddMode(SUPPRESSION);
    PersonneAdresse.AddMode(MODIFICATION);

    It_Personne.AjouterComposantSimple("Type","ak_nom",new Array("ak_numero","ak_numero","typeadresse"),PersonneAdresse,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Apt ou Dest.","ad_ligne2",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("Bat, étage...","ad_ligne3",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("N° et Voie","ad_ligne4",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("BP ou Lieu-dit","ad_ligne5",null,PersonneAdresse);
    PersonneAdresseCodepostal = It_Personne.AjouterComposantSimple("Code postal", "cp_codepostal", new Array("cp_numero","cp_numero","codepostal"),PersonneAdresse,LISTE_DEROULANTE); 
    PersonneAdresseVille      = It_Personne.AjouterComposantSimple("Ville", "vi_nom", new Array("vi_numero","vi_numero","ville"),PersonneAdresse,LISTE_DEROULANTE);
    
    // event user 
    // Filtre perso (on filtre les Communes par rapport aux CP)
    PersonneAdresseCodepostal.getTheme().AddFiltre('Filtre_CP_Personne=new clInterfaceFiltrageContenuHautBas()');
    // Filtre perso (on filtre les CP par rapport aux Communes)
    PersonneAdresseVille.getTheme().AddFiltre('Filtre_Ville_Personne=new clInterfaceFiltrageContenuHautBas(Filtre_CP_Personne)');
    
    var CodeInit_CP='';
    CodeInit_CP+='var Joint_Filtre_CP_Personne=new clJointureMulti("codepostal",\n';
    CodeInit_CP+='	new Array(\n';
    CodeInit_CP+='		new stJointure("villecp","cp_numero","cp_numero",null,false),\n';
    CodeInit_CP+='		new stJointure("ville","vi_numero","vi_numero",null,false)));\n';
    CodeInit_CP+='Filtre_CP_Personne.setComposant(Compo_'+PersonneAdresseVille.getNom_()+',Joint_Filtre_CP_Personne);\n';
    PersonneAdresseCodepostal.CodeUserOnInit=CodeInit_CP;
    
    var CodeInit_Ville='';
    CodeInit_Ville+='var Joint_Filtre_Ville_Personne=new clJointureMulti("ville",\n';
    CodeInit_Ville+='	new Array(\n';
    CodeInit_Ville+='		new stJointure("villecp","vi_numero","vi_numero",null,false),\n';
    CodeInit_Ville+='		new stJointure("codepostal","cp_numero","cp_numero",null,false)));\n';
    CodeInit_Ville+='Filtre_Ville_Personne.setComposant(Compo_'+PersonneAdresseCodepostal.getNom_()+',Joint_Filtre_Ville_Personne);\n';
    PersonneAdresseVille.CodeUserOnInit=CodeInit_Ville;
    
    



    //***********************
    // Bouton de recherche
    Maitre_Personne.CodeUserOnInit='Compo_'+Maitre_Personne.getNom_()+'.AddCompoAddOn(new clAddon_Fctmenupopup("Rechercher",new Array("Par numéro","Par nom","Par code postal","Par ville","Par contact"),new Array(Recherche_Num,Recherche_Nom,Recherche_CP,Recherche_Ville,Recherche_Contact),new Array(Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+')));\n';



    /****************************
     * REGLEMENT
     ****************************/
    
    var It_Reglement, Maitre_Reglement;

    It_Reglement = new clInterfaceSimple("Réglement");

    Maitre_Reglement = It_Reglement.AjouterMaitre("Liste des réglements","reglement");
    Maitre_Reglement.AjouterColonne("N°Reg ","rg_numero");
    Maitre_Reglement.AjouterColonne("N°Pers ","pe_numero");
//    Maitre_Reglement.AjouterColonne("Etat","rg_etat");
    Maitre_Reglement.AjouterColonne("Date   ","rg_date");
    Maitre_Reglement.AjouterColonne("Montant","rg_montant");
//    Maitre_Reglement.AjouterColonne("Mode","mr_libelle",new Array("mr_numero","mr_numero","modereglement"));

    //    It_Reglement.AjouterBouton("Passer le devis en facture","DevisVersFacture",ComposantDansCode(Maitre_Devis));
    //It_Reglement.AjouterBouton("Valider le réglement","ValideReglement",ComposantDansCode(Maitre_Reglement));

   //    It_Reglement.AjouterComposantSimple("N° Facture (Si le règlement correspond)","fa_numfact",new Array("fa_numero","fa_numero","facture"),null,LISTE_DEROULANTE);
    ReglementModereglement = It_Reglement.AjouterComposantSimple("Personne","pe_libelle",new Array("pe_numero","pe_numero","personne"),null,LISTE_DEROULANTE);
    It_Reglement.AjouterComposantSimple("Date","rg_date");
    It_Reglement.AjouterComposantSimple("Montant","rg_montant");
    ReglementModereglement = It_Reglement.AjouterComposantSimple("Mode","mr_libelle",new Array("mr_numero","mr_numero","modereglement"),null,LISTE_DEROULANTE);
    It_Reglement.AjouterComposantSimple("Banque","rg_libellebanque");
    It_Reglement.AjouterComposantSimple("N° compte","rg_numerocompte");
    It_Reglement.AjouterComposantSimple("Référence","rg_reference");
    It_Reglement.AjouterComposantSimple("Responsable","em_libelle",new Array("em_numero","em_numero","vue_employe_reglement"),null,LISTE_DEROULANTE);

    //    ReglementModereglement.getTheme().AddFiltre('Filtre_ReglementModereglement=new clInterfaceFiltragePermanantCustom("mr_actif=true")');
    //    AllIt.AjouterCodeUserLoad('Filtre_ReglementModereglement.setComposant(Compo_'+ReglementModereglement.getNom_()+');\n');

    
    /****************************************/
    /*      EVALUATION DE CONSTRUCTION      */
    /****************************************/
    /*                                      */
    eval(centre);
    /*                                      */
    /****************************************/

    // Ajouts d'interfaces
    AllIt.AjouterInterface(It_Personne);
    AllIt.AjouterInterface(It_Reglement);

    reglement_alert("Génération terminée");
    AllIt.GenererInterface("reglement",null,"GestSEA Reglement",true);
}

//alert("GG Chargé");
