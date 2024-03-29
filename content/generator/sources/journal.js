/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */

function journal_alert(x){
  // alert(x);
}

function CodeInJournal(centre){
    journal_alert("D�but de la construction");
    var AllIt = new clTabInterfaceSimple();
//    journal_alert("D�but de la construction 2");
    /****************************
     * AJOUTS SPECIAUX
     ****************************/

    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");
    AllIt.IncludeJs("chrome://gestsea/content/gestsea/principal_plus.js");

    /****************************
     * AJOUTS DE BASE (Personne, Devis, Facture, Avoir,...)
     ****************************/


    /****************************
     * PERSONNE
     ****************************/
    
    var It_Personne,Maitre_Personne;
/*    var PersonneContact, PersonneObservation, PersonneCotisation, PersonneResponsabilite, PersonneProduction, PersonneAbonConseil, PersonneAdresse, PersonneVente, PersonneDossier;*/


    It_Personne = new clInterfaceSimple("Personnes");

    Maitre_Personne = It_Personne.AjouterMaitre("Liste des personnes","personne");

    Maitre_Personne.AjouterColonne("Nom             ","pe_fullname");
    Maitre_Personne.AjouterColonne("N�","pe_id");
    
    //    It_Personne.AjouterComposantSimple("N� Adh�rent", "pe_numpersonne",null,null,LABEL);
    It_Personne.AjouterComposantSimple("Num�ro","pe_id",null,null,LABEL);
    It_Personne.AjouterComposantSimple("Titre ou F.J.","np_libelle", ["np_numero", "np_numero", "naturepersonne"], null, LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Nom ou D.S.","pe_nom");
    It_Personne.AjouterComposantSimple("Pr�nom","pe_prenom");
    It_Personne.AjouterComposantSimple("N�TVA intrac.","pe_numtvaic");
    It_Personne.AjouterComposantSimple("N�(e) le","pe_naissance");
    It_Personne.AjouterComposantSimple("La personne est active (et peut �tre contact�e)","pe_actif",null,null,CHECKBOX);

    
    //***********************
    //  EST LIE
    /* pour les relations recursives */
    AllIt.AjouterCodeUserLoad('ConstruireOngletEstLie("tabbox_'+Maitre_Personne.getNom_()+'",'+Maitre_Personne.getIdDansTabGlobalCompo()+');\n');
    AllIt.AjouterCodeUserLoad('Compo_'+Maitre_Personne.getNom_()+'.OnChangeUser=RefreshOngletEstLie;\n');
    AllIt.AjouterCodeUserLoad('Compo_'+Maitre_Personne.getNom_()+'.OnChangeUserParams=Compo_'+Maitre_Personne.getNom_()+';\n');


    //***********************
    // COTISATIONS
    PersonneCotisation = It_Personne.AjouterComposantComplexe("Cotisations", ["pe_numero", "pe_numero", "vue_cotisation"]);
    PersonneCotisation.AjouterColonne("Ann�e","cs_annee");
    PersonneCotisation.AjouterColonne("Type","cs_type");
    PersonneCotisation.AjouterColonne("FDSEA","cs_fdsea");
    PersonneCotisation.AjouterColonne("SACEA","cs_sacea");
    PersonneCotisation.AjouterColonne("AAVA","cs_aava");
    PersonneCotisation.AjouterColonne("Total","cs_total");


    //***********************
    // ADRESSE
    PersonneAdresse = It_Personne.AjouterComposantComplexe("Adresses", ["pe_numero","pe_numero","adresse"]);

    PersonneAdresse.AjouterColonne("D�f.","ad_def");
//    PersonneAdresse.AjouterColonne("Apt ou Destinataire","ad_ligne2");
//    PersonneAdresse.AjouterColonne("Bat, Res, ZI...","ad_ligne3");
//    PersonneAdresse.AjouterColonne("N� et Voie","ad_ligne4");
//    PersonneAdresse.AjouterColonne("Mention sp�ciale.","ad_ligne5");
    PersonneAdresse.AjouterColonne("CP","cp_codepostal",new Array("cp_numero","cp_numero","codepostal"));
    PersonneAdresse.AjouterColonne("Ville","vi_nom",new Array("vi_numero","vi_numero","ville"));
    PersonneAdresse.AjouterColonne("Canton","ct_nom",new Array("vi_numero","vi_numero","ville","ct_numero","ct_numero","canton"));

    PersonneAdresse.AddMode(INSERTION);
    PersonneAdresse.AddMode(SUPPRESSION);
    PersonneAdresse.AddMode(MODIFICATION);

//    It_Personne.AjouterComposantSimple("Type","ak_nom",new Array("ak_numero","ak_numero","typeadresse"),PersonneAdresse,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Apt ou Dest.","ad_ligne2",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("Bat, �tage...","ad_ligne3",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("N� et Voie","ad_ligne4",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("BP ou Lieu-dit","ad_ligne5",null,PersonneAdresse);
//    PersonneAdresseActive = It_Personne.AjouterComposantSimple("Adresse en cours","ad_active",null,PersonneAdresse,CHECKBOX);
//    It_Personne.AjouterComposantSimple("Date de fin","ad_datestop",null,PersonneAdresse);

//    PersonneAdresseType       = It_Personne.AjouterComposantSimple("Type","ad_type",null,PersonneAdresse,LISTE_DEROULANTE_STATIC,null,new Array("DEFAUT","COURRIER","PERSONNELLE","PROFESSIONNELLE"));
    PersonneAdresseCodepostal = It_Personne.AjouterComposantSimple("Code postal", "cp_codepostal", new Array("cp_numero","cp_numero","codepostal"),PersonneAdresse,LISTE_DEROULANTE); 
    PersonneAdresseVille      = It_Personne.AjouterComposantSimple("Ville", "vi_nom", new Array("vi_numero","vi_numero","ville"),PersonneAdresse,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Adresse par d�faut","ad_default",null,PersonneAdresse,CHECKBOX);
    
    // event user 
/*
    PersonneAdresse.OnModeInsert=ComposantDansCode(PersonneAdresseType)+'.my_CompoXUL.value="DEFAUT";\n';
    PersonneAdresse.OnModeInsert+=ComposantDansCode(PersonneAdresseActive)+'.my_CompoXUL.value=true;\n';
    PersonneAdresse.OnModeInsert+=ComposantDansCode(PersonneAdresseActive)+'.my_CompoXUL.checked=true;\n';
  */  
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
    // CONTACTS
    
    PersonneEstjoignable = It_Personne.AjouterComposantComplexe("Contact",new Array("pe_numero","pe_numero","contact"));
/*    PersonneEstjoignable.AjouterColonne("Status","ej_etat");*/
    PersonneEstjoignable.AjouterColonne("Type","ck_nom",new Array("ck_numero","ck_numero","contacttype"));
    PersonneEstjoignable.AjouterColonne("Coordonn�e","cn_coordonnee");
    
    
    PersonneEstjoignable.AddMode(INSERTION);
    PersonneEstjoignable.AddMode(SUPPRESSION);
    PersonneEstjoignable.AddMode(MODIFICATION);

    It_Personne.AjouterComposantSimple("Type","ck_nom",new Array("ck_numero","ck_numero","contacttype"), PersonneEstjoignable, LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Coordonn�e","cn_coordonnee",null,PersonneEstjoignable);
/*    
    PersonneEstjoignable.OnModeInsert= ComposantDansCode(PersonneEstjoignableActif)+'.my_CompoXUL.value=true;\n';
    PersonneEstjoignable.OnModeInsert+=ComposantDansCode(PersonneEstjoignableActif)+'.my_CompoXUL.checked=true;\n';
*/


    //***********************
    // ATTRIBUTS
    PersonneAttribut = It_Personne.AjouterComposantComplexe("Attributs", new Array("pe_numero","pe_numero","attribut"));
    PersonneAttribut.AjouterColonne("Attribut","ta_nom",new Array("ta_numero","ta_numero","typeattribut"));
    PersonneAttribut.AjouterColonne("Valeur","cr_libelle",new Array("cr_numero","cr_numero","categorie"));
    //    PersonneAttribut.AjouterColonne("D�tail","at_valeur");
    
    PersonneAttribut.AddMode(INSERTION);
    PersonneAttribut.AddMode(SUPPRESSION);
    PersonneAttribut.AddMode(MODIFICATION);

    PersonneAttributTypeattribut = It_Personne.AjouterComposantSimple("Attribut","ta_nom",new Array("ta_numero","ta_numero","typeattribut"), PersonneAttribut,LISTE_DEROULANTE);
    PersonneAttributCategorie    = It_Personne.AjouterComposantSimple("Valeur","cr_libelle",new Array("cr_numero","cr_numero","categorie"), PersonneAttribut, LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("D�tail","at_valeur",null,PersonneAttribut,null,null,null,true);    



    // Filtre perso (on filtre les Cat�gories par rapport aux types d'attributs)
    
    PersonneAttributTypeattribut.getTheme().AddFiltre('Filtre_Typeattribut_Personne=new clInterfaceFiltrageContenuHautBas()');

    var CodeInit_TA='';
    CodeInit_TA+='var Joint_Filtre_Typeattribut_Personne=new clJointureMulti("typeattribut",\n';
    CodeInit_TA+='	new Array(\n';
    CodeInit_TA+='		new stJointure("categorie","ta_numero","ta_numero",null,false),\n';
    CodeInit_TA+='		new stJointure("categorie","cr_numero","cr_numero",null,false)));\n';
    CodeInit_TA+='Filtre_Typeattribut_Personne.setComposant(Compo_'+PersonneAttributCategorie.getNom_()+',Joint_Filtre_Typeattribut_Personne);\n';
    PersonneAttributTypeattribut.CodeUserOnInit=CodeInit_TA;
    

    //***********************
    // ROUTAGE
    PersonneRoutage = It_Personne.AjouterComposantComplexe("Routages", new Array("pe_numero","pe_numero","routage"));
    PersonneRoutage.AjouterColonne("D�but","ro_debutservice");
    PersonneRoutage.AjouterColonne("Fin","ro_finservice");
    PersonneRoutage.AjouterColonne("Qt�.","ro_quantite");
    PersonneRoutage.AjouterColonne("Adresse","ad_libelle",new Array("ad_numero","ad_numero","adresse"));
    PersonneRoutage.AjouterColonne("Facture","fa_numfact",new Array("fa_numero","fa_numero","facture"));

    PersonneRoutage.AddMode(SUPPRESSION);
    PersonneRoutage.AddMode(MODIFICATION);

    It_Personne.AjouterComposantSimple("D�but","ro_debutservice",null,PersonneRoutage);
    It_Personne.AjouterComposantSimple("Fin","ro_finservice",null,PersonneRoutage);
    It_Personne.AjouterComposantSimple("Quantit�","ro_quantite",null,PersonneRoutage);
//    It_Personne.AjouterComposantSimple("Adresse","ad_libelle",new Array("ad_numero","ad_numero","adresse"),PersonneRoutage,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Suspendre les relances","ro_suspendu",null,PersonneRoutage,CHECKBOX);

    // Bouton de recherche
    Maitre_Personne.CodeUserOnInit='Compo_'+Maitre_Personne.getNom_()+'.AddCompoAddOn(new clAddon_Fctmenupopup("Rechercher",new Array("Par num�ro","Par nom","Par code postal","Par ville","Par contact","Par N.Devis","Par N.Facture"),new Array(Recherche_Num,Recherche_Nom,Recherche_CP,Recherche_Ville,Recherche_Contact,Recherche_Devis,Recherche_Facture),new Array(Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+')));\n';

    journal_alert("Personnes...OK!");



    /****************************
     * ROUTAGE
     ****************************/

    var It_Routage, Maitre_Routage;

    It_Routage = new clInterfaceSimple("Routage");


    Maitre_Routage = It_Routage.AjouterMaitre("Liste des routages","vue_current_routage");
    Maitre_Routage.AjouterColonne("N�Journal","rc_numero");
    Maitre_Routage.AjouterColonne("N�Client","rc_ncli");
    Maitre_Routage.AjouterColonne("Titre","rc_titr");
    Maitre_Routage.AjouterColonne("Nom","rc_nomp");
    Maitre_Routage.AjouterColonne("Comp.","rc_cide");
    Maitre_Routage.AjouterColonne("Ligne 1","rc_ad1");
    Maitre_Routage.AjouterColonne("Ligne 2","rc_ad2");
    Maitre_Routage.AjouterColonne("Ligne 3","rc_ad3");
    Maitre_Routage.AjouterColonne("C.P.","rc_cpos");
    Maitre_Routage.AjouterColonne("Ville","rc_burd");
    Maitre_Routage.AjouterColonne("Nb. Ex.","rc_nbex");

    It_Routage.AjouterBouton("Changer le num�ro du journal...","ChangerNumeroJournal",ComposantDansCode(Maitre_Routage));


    journal_alert("Routage...OK!");

    /****************************
     * RELANCE JOURNAL
     ****************************/

    var It_RelanceJournal, Maitre_RelanceJournal;

    It_RelanceJournal = new clInterfaceSimple("Relances");

    Maitre_RelanceJournal = It_RelanceJournal.AjouterMaitre("Liste des relances","vue_current_relance");
    Maitre_RelanceJournal.AjouterColonne("Niveau","rl_niveau");
    Maitre_RelanceJournal.AjouterColonne("Dernier N�","rl_derniernumero");
    Maitre_RelanceJournal.AjouterColonne("N�Client","pe_numero");
    Maitre_RelanceJournal.AjouterColonne("Titre","pe_titre");
    Maitre_RelanceJournal.AjouterColonne("Nom","pe_nom");
    Maitre_RelanceJournal.AjouterColonne("Pr�nom","pe_prenom");
    Maitre_RelanceJournal.AjouterColonne("Ligne 2","ad_ligne2");
    Maitre_RelanceJournal.AjouterColonne("Ligne 3","ad_ligne3");
    Maitre_RelanceJournal.AjouterColonne("Ligne 4","ad_ligne4");
    Maitre_RelanceJournal.AjouterColonne("Ligne 5","ad_ligne5");
    Maitre_RelanceJournal.AjouterColonne("C.P.","cp_codepostal");
    Maitre_RelanceJournal.AjouterColonne("Ville","vi_nom");
    Maitre_RelanceJournal.AjouterColonne("T�l�phone","rl_telephone");
    Maitre_RelanceJournal.AjouterColonne("Portable","rl_portable");

    It_RelanceJournal.AjouterBouton("Nombre de num�ros pass�s","ChangerNombrePasses","");
    It_RelanceJournal.AjouterBouton("Nombre de num�ros futurs","ChangerNombreFuturs","");

    journal_alert("RelanceJournal...OK!");


    /****************************
     * RELANCE JOURNAL
     ****************************/

    var It_RelanceAdherentJournal, Maitre_RelanceAdherentJournal;

    It_RelanceAdherentJournal = new clInterfaceSimple("Relances des adh�rents");

    Maitre_RelanceAdherentJournal = It_RelanceAdherentJournal.AjouterMaitre("Liste des relances adh�rents", "vue_current_relance_adherent");
    Maitre_RelanceAdherentJournal.AjouterColonne("N�Client","pe_numero");
    Maitre_RelanceAdherentJournal.AjouterColonne("Titre","pe_titre");
    Maitre_RelanceAdherentJournal.AjouterColonne("Nom","pe_nom");
    Maitre_RelanceAdherentJournal.AjouterColonne("Pr�nom","pe_prenom");
    Maitre_RelanceAdherentJournal.AjouterColonne("Ligne 2","ad_ligne2");
    Maitre_RelanceAdherentJournal.AjouterColonne("Ligne 3","ad_ligne3");
    Maitre_RelanceAdherentJournal.AjouterColonne("Ligne 4","ad_ligne4");
    Maitre_RelanceAdherentJournal.AjouterColonne("Ligne 5","ad_ligne5");
    Maitre_RelanceAdherentJournal.AjouterColonne("C.P.","cp_codepostal");
    Maitre_RelanceAdherentJournal.AjouterColonne("Ville","vi_nom");
    Maitre_RelanceAdherentJournal.AjouterColonne("T�l�phone","rl_telephone");
    Maitre_RelanceAdherentJournal.AjouterColonne("Portable","rl_portable");

    journal_alert("RelanceAdherentJournal...OK!");


    /****************************************/
    /*      EVALUATION DE CONSTRUCTION      */
    /****************************************/
    /*                                      */
    /*eval(centre);*/
    /*                                      */
    /****************************************/

    // Ajouts d'interfaces
    AllIt.AjouterInterface(It_Personne);
    AllIt.AjouterInterface(It_Routage);
    AllIt.AjouterInterface(It_RelanceJournal);
    AllIt.AjouterInterface(It_RelanceAdherentJournal);

    journal_alert("G�n�ration termin�e");
    AllIt.GenererInterface("journal",null,"GestSEA Journal",true);
}

//alert("GG Charg�");
