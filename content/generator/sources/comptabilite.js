/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function zalert(x){
    //    alert(x);
}


function CodeInComptabilite()
{
    zalert("D�but");
    var AllIt = new clTabInterfaceSimple();
	
    AllIt.IncludeJs("comptabilite_plus.js");
    AllIt.IncludeJs("chrome://gestsea/content/gestsea/export.js");
    //    AllIt.IncludeJs("chrome://gestsea/content/gestsea/latex.js");
    AllIt.IncludeJs("chrome://gestsea/content/generator/libIO.js");
	
    /****************************
     * EXERCICE
     ****************************/

    var It_Exercice,Maitre_Exercice;

    It_Exercice = new clInterfaceSimple("Exercice");

    Maitre_Exercice = It_Exercice.AjouterMaitre("Liste des exercices comptables","exercice");
    Maitre_Exercice.AjouterColonne("Du","ex_datedebut");
    Maitre_Exercice.AjouterColonne("Au","ex_datefin");

    It_Exercice.AjouterComposantSimple("Du","ex_datedebut");
    It_Exercice.AjouterComposantSimple("Au","ex_datefin");
    It_Exercice.AjouterComposantSimple("Cl�tur�","ex_cloture",null,null,CHECKBOX);
    It_Exercice.AjouterComposantSimple("Compte d'attente","ex_compteattente");
    It_Exercice.AjouterComposantSimple("Exercice en cours","ex_actif",null,null,CHECKBOX);
    
    ExercicePiece = It_Exercice.AjouterComposantComplexe("Pi�ces de l'exercice", new Array("ex_numero","ex_numero","piece"));
    ExercicePiece.AjouterColonne("N�","pi_numpiece");
    ExercicePiece.AjouterColonne("Date","pi_date");
    ExercicePiece.AjouterColonne("Journal","jo_libelle",new Array("jo_numero","jo_numero","journal"));
    ExercicePiece.AjouterColonne("Equilibr�","pi_equilibre");
    ExercicePiece.AjouterColonne("D�bit","pi_debit");
    ExercicePiece.AjouterColonne("Cr�dit","pi_credit");
    
    zalert("Exercice... OK");

    /****************************
     * JOURNAL
     ****************************/

    var It_Journal,Maitre_Journal;

    It_Journal = new clInterfaceSimple("Journaux");

    Maitre_Journal = It_Journal.AjouterMaitre("Liste des journaux","journal");
    //    Maitre_Journal.AjouterColonne("Exer.","ex_libelle",new Array("ex_numero","ex_numero","exercice"));
    Maitre_Journal.AjouterColonne("Abbr.","jo_abbrev");
    Maitre_Journal.AjouterColonne("Libell�","jo_libelle");
    Maitre_Journal.AjouterColonne("D�but","jo_moislettre");
    Maitre_Journal.AjouterColonne("Contrepartie","jo_cp");

    It_Journal.AjouterBouton("Cloturer le journal...","CloturerJournal",ComposantDansCode(Maitre_Journal));
    //    It_Journal.AjouterBouton("Rafraichir les donn�es","CloturerJournal",ComposantDansCode(Maitre_Journal));

    //    It_Journal.AjouterComposantSimple("Exercice","ex_libelle",new Array("ex_numero","ex_numero","exercice"),null,LISTE_DEROULANTE);
    It_Journal.AjouterComposantSimple("Type de journal","tj_libelle",new Array("tj_numero","tj_numero","typejournal"),null,LISTE_DEROULANTE);
    It_Journal.AjouterComposantSimple("Abbr�viation","jo_abbrev");
    It_Journal.AjouterComposantSimple("Libell�","jo_libelle");
    //    It_Journal.AjouterComposantSimple("Premier mois utilisable","jo_mois",null,null,LABEL);
    It_Journal.AjouterComposantSimple("Provisoire","jo_provisoire",null,null,CHECKBOX);
    It_Journal.AjouterComposantSimple("Visible","jo_visible",null,null,CHECKBOX);
    It_Journal.AjouterComposantSimple("Contrepartie","jo_contrepartie",null,null,CHECKBOX);
    It_Journal.AjouterComposantSimple("Compte de la contrepartie","cg_nom",new Array("cg_numero","cg_numero","comptegen"),null,LISTE_DEROULANTE);

    JournalPiece = It_Journal.AjouterComposantComplexe("Pi�ces comptables",new Array("jo_numero","jo_numero","piece"));
    //    JournalPiece.AjouterColonne("SQL","pi_numero");
    JournalPiece.AjouterColonne("N� Pi�ce","pi_numpiece");
    JournalPiece.AjouterColonne("Date","pi_date");
    JournalPiece.AjouterColonne("Libell�","pi_libelle");
    JournalPiece.AjouterColonne("Equilibr�","pi_equilibre");
    JournalPiece.AjouterColonne("D�bit","pi_debit");
    JournalPiece.AjouterColonne("Cr�dit","pi_credit");

    zalert("Journal... OK");

    /****************************
     * PIECE
     ****************************/
    
    var It_Piece,Maitre_Piece;
    
    It_Piece = new clInterfaceSimple("Pi�ces");

    Maitre_Piece = It_Piece.AjouterMaitre("Liste des pi�ces comptables","piece");
    //    Maitre_Piece.AjouterColonne("SQL","pi_numero");
    Maitre_Piece.AjouterColonne("N�Pi�ce","pi_numpiece");
    Maitre_Piece.AjouterColonne("Libell�","pi_libelle");
    Maitre_Piece.AjouterColonne("Equilibr�","pi_equilibre");
    Maitre_Piece.AjouterColonne("D�bit","pi_debit");
    Maitre_Piece.AjouterColonne("Cr�dit","pi_credit");

    //    It_Piece.AjouterComposantSimple("Journal","jo_libelle",new Array("jo_numero","jo_numero","journal"),null,LISTE_DEROULANTE);
    It_Piece.AjouterComposantSimple("Libell�","pi_libelle");
    It_Piece.AjouterComposantSimple("Date","pi_date");

    PieceEcriture = It_Piece.AjouterComposantComplexe("�critures", new Array("pi_numero","pi_numero","ecriture"));
    PieceEcriture.AjouterColonne("N�","ec_numecriture");
    PieceEcriture.AjouterColonne("Pref.","pf_nom",new Array("pf_numero","pf_numero","prefixe"));
    PieceEcriture.AjouterColonne("Libell�","ec_libelle");
    PieceEcriture.AjouterColonne("Compte","ec_compte");
    PieceEcriture.AjouterColonne("Pointage","pt_releve",new Array("pt_numero","pt_numero","pointage"));
    PieceEcriture.AjouterColonne("Lettrage","lt_lettre",new Array("lt_numero","lt_numero","lettrage"));

    PieceEcriture.AddMode(INSERTION);
    PieceEcriture.AddMode(SUPPRESSION);
    PieceEcriture.AddMode(MODIFICATION);

    It_Piece.AjouterComposantSimple("Compte g�n�ral","cg_nom",new Array("cg_numero","cg_numero","comptegen"),PieceEcriture,LISTE_DEROULANTE);
    It_Piece.AjouterComposantSimple("Ecriture sur compte auxiliaire", "ec_aux",null,PieceEcriture,CHECKBOX);
    It_Piece.AjouterComposantSimple("Compte auxiliaire", "ca_libelle", new Array("ca_numero","ca_numero","compteaux"),PieceEcriture,LISTE_DEROULANTE);
    It_Piece.AjouterComposantSimple("Pr�fixe","pf_nom",new Array("pf_numero","pf_numero","prefixe"),PieceEcriture,LISTE_DEROULANTE);
    It_Piece.AjouterComposantSimple("Libell�","ec_libelle",null,PieceEcriture);
    PieceEcritureDebit=It_Piece.AjouterComposantSimple("D�bit","ec_debit",null,PieceEcriture);
    PieceEcriture.OnModeInsert=ComposantDansCode(PieceEcritureDebit)+'.my_CompoXUL.value="0.00";\n';
    PieceEcritureCredit=It_Piece.AjouterComposantSimple("Cr�dit","ec_credit",null,PieceEcriture);
    PieceEcriture.OnModeInsert+=ComposantDansCode(PieceEcritureCredit)+'.my_CompoXUL.value="0.00";\n';
    

    zalert("Piece... OK");

    /****************************
     * ECRITURE
     ****************************/

    var It_Ecriture, Maitre_Ecriture;

    It_Ecriture = new clInterfaceSimple("Ecritures");

    Maitre_Ecriture = It_Ecriture.AjouterMaitre("Liste des �critures comptables","ecriture");
    Maitre_Ecriture.AjouterColonne("Libell�","ec_libelle");
    Maitre_Ecriture.AjouterColonne("D�bit","ec_debit");
    Maitre_Ecriture.AjouterColonne("Cr�dit","ec_credit");
    Maitre_Ecriture.AjouterColonne("Compte","ec_compte");

    It_Ecriture.AjouterComposantSimple("Libell�","ec_libelle",null,null,LABEL);
    It_Ecriture.AjouterComposantSimple("Compte","ec_compte",null,null,LABEL);
    It_Ecriture.AjouterComposantSimple("D�bit","ec_debit",null,null,LABEL);
    It_Ecriture.AjouterComposantSimple("Cr�dit","ec_credit",null,null,LABEL);
    It_Ecriture.AjouterComposantSimple("Pointage","pt_releve",new Array("pt_numero","pt_numero","pointage"),null,LISTE_DEROULANTE);
    It_Ecriture.AjouterComposantSimple("Lettrage","lt_lettre",new Array("lt_numero","lt_numero","lettrage"),null,LISTE_DEROULANTE);

    zalert("Ecriture... OK");


    /****************************
     * LETTRAGE
     ****************************/
    /*
    var It_Lettrage, Maitre_Lettrage;

    It_Lettrage = new clInterfaceSimple("Lettrage");

    Maitre_Lettrage = It_Lettrage.AjouterMaitre("Liste des lettrages","lettrage");
    Maitre_Lettrage.AjouterColonne("Lettres","lt_lettre");
    Maitre_Lettrage.AjouterColonne("Compte","ec_compte",new Array("lt_numero","lt_numero","ecriture"));

    It_Lettrage.AjouterComposantSimple("Lettres","lt_lettre");

    LettrageEcritureREF = It_Lettrage.AjouterComposantComplexeIndependant("Ecritures lettrables","ecriture");
    LettrageEcritureREF.AjouterColonne("Date","pi_date",new Array("pi_numero","pi_numero","piece"));
    LettrageEcritureREF.AjouterColonne("Compte","ec_compte");
    LettrageEcritureREF.AjouterColonne("Pref.","pf_nom",new Array("pf_numero","pf_numero","prefixe"));
    LettrageEcritureREF.AjouterColonne("Libell�","ec_libelle");
    LettrageEcritureREF.AjouterColonne("D�bit","ec_debit");
    LettrageEcritureREF.AjouterColonne("Cr�dit","ec_credit");
    // Filtre sur les �critures non lettr�es
    LettrageEcritureREF.getTheme().AddFiltre('Filtre_LettrageEcritureREF=new clInterfaceFiltrageEnsXCustom(new Array("Ecritures lettrables","ecriture.ec_lettrable"))');
    LettrageEcritureREF.CodeUserOnInit='Filtre_LettrageEcritureREF.setComposant(Compo_'+LettrageEcritureREF.getNom_()+');\n';

    LettrageEcritureEcriture = It_Lettrage.AjouterComposantListeDouble("Ecriture",new Array("lt_numero","lt_numero","ecriture"),null,LettrageEcritureREF);
    LettrageEcritureEcriture.AjouterColonne("Compte","ec_compte");
    LettrageEcritureEcriture.AjouterColonne("Date","pi_date",new Array("pi_numero","pi_numero","piece"));
    LettrageEcritureEcriture.AjouterColonne("Libell�","ec_libelle");
    LettrageEcritureEcriture.AjouterColonne("D�bit","ec_debit");
    LettrageEcritureEcriture.AjouterColonne("Cr�dit","ec_credit");

    // pas bon vvv
    LettrageEcriture = It_Lettrage.AjouterComposantComplexe("Lettrage des �critures",new Array("lt_numero","lt_numero","ecriture"));
    LettrageEcriture.AjouterColonne("Date","pi_date",new Array("pi_numero","pi_numero","piece"));
    LettrageEcriture.AjouterColonne("Compte","ec_compte");
    LettrageEcriture.AjouterColonne("Pref.","pf_nom",new Array("pf_numero","pf_numero","prefixe"));
    LettrageEcriture.AjouterColonne("Libell�","ec_libelle");
    LettrageEcriture.AjouterColonne("D�bit","ec_debit");
    LettrageEcriture.AjouterColonne("Cr�dit","ec_credit");

    LettrageEcriture.AddMode(INSERTION);
    LettrageEcriture.AddMode(SUPPRESSION);
    LettrageEcriture.AddMode(MODIFICATION);

    //                            A T T E N T I O N  ! ! ! ! !
    

    LettrageEcritureEcriture = It_Lettrage.AjouterComposantComplexe("Ecriture",null,LettrageEcriture,LISTE_DEROULANTE_MULTI);
    LettrageEcritureEcriture.AjouterColonne("Compte","ec_compte");
    LettrageEcritureEcriture.AjouterColonne("Date","pi_date",new Array("pi_numero","pi_numero","piece"));
    LettrageEcritureEcriture.AjouterColonne("Libell�","ec_libelle");
    LettrageEcritureEcriture.AjouterColonne("D�bit","ec_debit");
    LettrageEcritureEcriture.AjouterColonne("Cr�dit","ec_credit");
    // Filtre sur les �critures non lettr�es
    LettrageEcritureEcriture.getTheme().AddFiltre('Filtre_LettrageEcritureEcriture=new clInterfaceFiltrageEnsXCustom(new Array("Ecritures lettrables","ecriture.ec_lettrable"))');
    LettrageEcritureEcriture.CodeUserOnInit='Filtre_LettrageEcritureEcriture.setComposant(Compo_'+LettrageEcritureEcriture.getNom_()+');\n';
    
    zalert("Lettrage... OK");


    //****************************
    // POINTAGE
    //****************************

    var It_Pointage, Maitre_Pointage;

    It_Pointage = new clInterfaceSimple("Pointage");

    Maitre_Pointage = It_Pointage.AjouterMaitre("Liste des pointages","pointage");
    Maitre_Pointage.AjouterColonne("Date","pt_date");
    Maitre_Pointage.AjouterColonne("N� relev� de banque","pt_releve");
    Maitre_Pointage.AjouterColonne("D�bit","pt_debit");
    Maitre_Pointage.AjouterColonne("Cr�dit","pt_credit");

    It_Pointage.AjouterComposantSimple("N� relev� de banque","pt_releve");
    It_Pointage.AjouterComposantSimple("Date","pt_date");

    PointageEcriture = It_Pointage.AjouterComposantComplexe("Pointage des �critures", new Array("pt_numero","pt_numero","ecriture"));
    PointageEcriture.AjouterColonne("Date","pi_date",new Array("pi_numero","pi_numero","piece"));
    PointageEcriture.AjouterColonne("Compte","ec_compte");
    PointageEcriture.AjouterColonne("Pref.","pf_nom",new Array("pf_numero","pf_numero","prefixe"));
    PointageEcriture.AjouterColonne("Libell�","ec_libelle");
    PointageEcriture.AjouterColonne("D�bit","ec_debit");
    PointageEcriture.AjouterColonne("Cr�dit","ec_credit");

    PointageEcriture.AddMode(INSERTION);
    PointageEcriture.AddMode(SUPPRESSION);
    PointageEcriture.AddMode(MODIFICATION);

    //                            A T T E N T I O N  ! ! ! ! !
    PointageEcritureEcriture = It_Pointage.AjouterComposantComplexe("Ecriture",null,PointageEcriture,LISTE_DEROULANTE_MULTI);
    PointageEcritureEcriture.AjouterColonne("Compte","ec_compte");
    PointageEcritureEcriture.AjouterColonne("Date","pi_date",new Array("pi_numero","pi_numero","piece"));
    PointageEcritureEcriture.AjouterColonne("Libell�","ec_libelle");
    PointageEcritureEcriture.AjouterColonne("D�bit","ec_debit");
    PointageEcritureEcriture.AjouterColonne("Cr�dit","ec_credit");
    // Filtre sur les �critures non lettr�es
    PointageEcritureEcriture.getTheme().AddFiltre('Filtre_PointageEcritureEcriture=new clInterfaceFiltrageEnsXCustom(new Array("Ecritures lettrables","ecriture.ec_lettrable"))');
    PointageEcritureEcriture.CodeUserOnInit='Filtre_PointageEcritureEcriture.setComposant(Compo_'+PointageEcritureEcriture.getNom_()+');\n';    

    zalert("Pointage... OK");
    */
    /****************************
     * COMPTES GENERAUX
     ****************************/
    var It_Comptegen, Maitre_CompteGen;

    It_Comptegen = new clInterfaceSimple("Comptes g�n�raux");

    Maitre_Comptegen = It_Comptegen.AjouterMaitre("Liste des comptes g�n�raux","comptegen");
    Maitre_Comptegen.AjouterColonne("N� de compte","cg_numcompte");
    Maitre_Comptegen.AjouterColonne("Libell�","cg_libelle");
    Maitre_Comptegen.AjouterColonne("D�bit","cg_vdebit");
    Maitre_Comptegen.AjouterColonne("Cr�dit","cg_vcredit");

    It_Comptegen.AjouterComposantSimple("Num�ro de compte","cg_numcompte");
    It_Comptegen.AjouterComposantSimple("Libell�","cg_libelle");
    It_Comptegen.AjouterComposantSimple("Niveau d'acc�s","ac_nom",new Array("ac_numero","ac_numero","acces"),null,LISTE_DEROULANTE);
    It_Comptegen.AjouterComposantSimple("Le compte peut avoir des compte auxiliaires","cg_accepteaux",null,null,CHECKBOX);
    It_Comptegen.AjouterComposantSimple("Le compte est utilisable","cg_utilisable",null,null,CHECKBOX);
    It_Comptegen.AjouterComposantSimple("Le compte est lettrable","cg_lettrable",null,null,CHECKBOX);
    It_Comptegen.AjouterComposantSimple("Le compte est pointable","cg_pointable",null,null,CHECKBOX);
    It_Comptegen.AjouterComposantSimple("Le compte est groupable","cg_groupable",null,null,CHECKBOX);
    It_Comptegen.AjouterComposantSimple("Le compte est un d�bit","cg_debit",null,null,CHECKBOX);

    ComptegenCompteaux = It_Comptegen.AjouterComposantComplexe("Comptes auxiliaires", new Array("cg_numero","cg_numero","compteaux"));
    ComptegenCompteaux.AjouterColonne("N� de compte","ca_numcompte");
    ComptegenCompteaux.AjouterColonne("Libell�","ca_libelle");
    ComptegenCompteaux.AjouterColonne("Acc�s","ac_nom",new Array("ac_numero","ac_numero","acces"));

    ComptegenEcriture = It_Comptegen.AjouterComposantComplexe("Ecriture", new Array("cg_numero","cg_numero","ecriture"));
    ComptegenEcriture.AjouterColonne("Libell�","ec_libelle");
    ComptegenEcriture.AjouterColonne("D�bit","ec_debit");
    ComptegenEcriture.AjouterColonne("Cr�dit","ec_credit");
    ComptegenEcriture.AjouterColonne("Lettrage","lt_lettre",new Array("lt_numero","lt_numero","lettrage"));
    ComptegenEcriture.AjouterColonne("Pointage","pt_releve",new Array("pt_numero","pt_numero","pointage"));

    zalert("Comptes g�n�raux... OK");
    
    /****************************
     * COMPTES AUXILIAIRES
     ****************************/
    var It_Compteaux, Maitre_Compteaux;

    It_Compteaux = new clInterfaceSimple("Comptes auxiliaires");

    Maitre_Compteaux = It_Compteaux.AjouterMaitre("Liste des comptes auxiliaires","compteaux");
    Maitre_Compteaux.AjouterColonne("N� de compte","ca_numcompte");
    Maitre_Compteaux.AjouterColonne("Libell�","ca_libelle");
    Maitre_Compteaux.AjouterColonne("D�bit","ca_vdebit");
    Maitre_Compteaux.AjouterColonne("Cr�dit","ca_vcredit");
    /*
    CompteauxComptegen = It_Compteaux.AjouterComposantComplexe("Compte g�n�ral",new Array("cg_numero","cg_numero","comptegen"),null,LISTE_DEROULANTE_MULTI);
    CompteauxComptegen.AjouterColonne("Num�ro de compte","cg_numcompte");
    CompteauxComptegen.AjouterColonne("Libell�","cg_libelle");
    */
    It_Compteaux.AjouterComposantSimple("Num�ro de compte","ca_numcompte");
    It_Compteaux.AjouterComposantSimple("Libell�","ca_libelle");
    It_Compteaux.AjouterComposantSimple("Niveau d'acc�s","ac_nom",new Array("ac_numero","ac_numero","acces"),null,LISTE_DEROULANTE);
    It_Compteaux.AjouterComposantSimple("Le compte est un d�bit","ca_debit",null,null,CHECKBOX);

    CompteauxEcriture = It_Compteaux.AjouterComposantComplexe("Ecriture", new Array("ca_numero","ca_numero","ecriture"));
    CompteauxEcriture.AjouterColonne("Libell�","ec_libelle");
    CompteauxEcriture.AjouterColonne("D�bit","ec_debit");
    CompteauxEcriture.AjouterColonne("Cr�dit","ec_credit");
    CompteauxEcriture.AjouterColonne("Lettrage","lt_lettre",new Array("lt_numero","lt_numero","lettrage"));
    CompteauxEcriture.AjouterColonne("Pointage","pt_releve",new Array("pt_numero","pt_numero","pointage"));

    zalert("Comptes auxiliaires... OK");

    


    /*==============================================================================================*
     *==============================================================================================*
     *==*                                                                                        *==*
     *==*                         F  I  N  A  L  I  S  A  T  I  O  N                             *==*
     *==*                                                                                        *==*
     *==============================================================================================*
     *==============================================================================================*/

    /****************************
     * LIENS
     ****************************/
    It_Piece.LierFortementA(ExercicePiece, It_Exercice);
    It_Piece.LierFortementA(JournalPiece,It_Journal);
    It_Ecriture.LierFortementA(PieceEcriture,It_Piece);
    It_Ecriture.LierFortementA(ComptegenEcriture,It_Comptegen);
    It_Ecriture.LierFortementA(CompteauxEcriture,It_Compteaux);
    It_Compteaux.LierFortementA(ComptegenCompteaux,It_Comptegen);
    //    It_Lettrage.LierFortementA(ComptegenEcriture,It_Comptegen);
    //It_Pointage.LierFortementA(ComptegenEcriture,It_Comptegen);

    /****************************
     * AJOUT DES ONGLETS
     ****************************/
    AllIt.AjouterInterface(It_Exercice);
    AllIt.AjouterInterface(It_Journal);
    AllIt.AjouterInterface(It_Piece);
    AllIt.AjouterInterface(It_Ecriture);    
    AllIt.AjouterInterface(It_Comptegen);
    AllIt.AjouterInterface(It_Compteaux);
    //AllIt.AjouterInterface(It_Lettrage);
    //AllIt.AjouterInterface(It_Pointage);


    /****************************
     * FIN
     ****************************/

    AllIt.GenererInterface("comptabilite",null,"GestSEA Comptabilit�");
}
