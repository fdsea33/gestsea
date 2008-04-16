/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2; coding: latin-1 -*- */
function param_alert(x){
    //    alert(x);
}


function CodeInParametrage(){

    param_alert("D�but");
    var AllIt = new clTabInterfaceSimple();
	
    AllIt.IncludeJs("export.js");
    AllIt.IncludeJs("parametrage_plus.js");

    //****************************
    // ACCES
    //****************************

    var It_Acces,Maitre_Acces;

    It_Acces = new clInterfaceSimple("Acc�s");

    Maitre_Acces = It_Acces.AjouterMaitre("Liste des niveaux d'acc�s","acces");
    Maitre_Acces.AjouterColonne("N�","ac_numero");
    Maitre_Acces.AjouterColonne("Nom","ac_libelle");
    Maitre_Acces.AjouterColonne("Niveau","ac_niveau");

    It_Acces.AjouterComposantSimple("Nom", "ac_libelle");
    It_Acces.AjouterComposantSimple("Niveau", "ac_niveau");

    param_alert("Acces...OK!");

    //****************************
    // MODEREGLEMENT
    //****************************

    var It_Modereglement,Maitre_Modereglement;

    It_Modereglement = new clInterfaceSimple("Mode de r�glements");

    Maitre_Modereglement = It_Modereglement.AjouterMaitre("Liste des modes de r�glement","modereglement");
    Maitre_Modereglement.AjouterColonne("N�","mr_numero");
    Maitre_Modereglement.AjouterColonne("Libell�","mr_libelle");
    Maitre_Modereglement.AjouterColonne("N�Compte","cg_numcompte",new Array("cg_numero","cg_numero","comptegen"));

    It_Modereglement.AjouterComposantSimple("Libell�","mr_libelle");
    It_Modereglement.AjouterComposantSimple("N�Compte bancaire","mr_compte");
    It_Modereglement.AjouterComposantSimple("Compte g�n�ral","cg_numcompte",new Array("cg_numero","cg_numero","comptegen"),null,LISTE_DEROULANTE);
    It_Modereglement.AjouterComposantSimple("Ceci est un mode de r�glement par ch�que","mr_cheque",null,null,CHECKBOX);
    It_Modereglement.AjouterComposantSimple("Actif","mr_actif",null,null,CHECKBOX);
    It_Modereglement.AjouterComposantSimple("Description","mr_description",null,null,null,null,null,true);

    param_alert("Modereglement...OK!");

    //****************************
    // MODEREPARTITION
    //****************************

    var It_Moderepartition,Maitre_Moderepartition;

    It_Moderepartition = new clInterfaceSimple("Modes de r�partition");

    Maitre_Moderepartition = It_Moderepartition.AjouterMaitre("Liste des modes de r�partition","moderepartition");
    Maitre_Moderepartition.AjouterColonne("Libell�","mp_libelle");
    Maitre_Moderepartition.AjouterColonne("N�Compte","cg_numcompte",new Array("cg_numero","cg_numero","comptegen"));
    Maitre_Moderepartition.AjouterColonne("Soci�t�","so_libelle",new Array("mp_societe","so_numero","societe"));

    It_Moderepartition.AjouterComposantSimple("Libell�","mp_libelle");
    It_Moderepartition.AjouterComposantSimple("Compte g�n�ral","cg_numcompte",new Array("cg_numero","cg_numero","comptegen"),null,LISTE_DEROULANTE);
    It_Moderepartition.AjouterComposantSimple("Actif","mp_actif",null,null,CHECKBOX);
    It_Moderepartition.AjouterComposantSimple("Soci�t� vis�e","so_libelle",new Array("mp_societe","so_numero","societe"),null,LISTE_DEROULANTE);
    It_Moderepartition.AjouterComposantSimple("Description","mp_description",null,null,null,null,null,true);

    param_alert("Moderepartition...OK!");

    //****************************
    // TYPETACHE
    //****************************

    var It_Typetache,Maitre_Typetache;

    It_Typetache = new clInterfaceSimple("Types de t�ches");

    Maitre_Typetache = It_Typetache.AjouterMaitre("Liste des types de t�ches","typetache");
    Maitre_Typetache.AjouterColonne("Libell�","th_libelle");

    It_Typetache.AjouterComposantSimple("Libell�", "th_libelle");
    It_Typetache.AjouterComposantSimple("Description", "th_description",null,null,null,null,null,true);
    

    param_alert("Typetache...OK!");

    //****************************
    // TYPEATTRIBUT
    //****************************

    var It_Typeattribut,Maitre_Typeattribut;

    It_Typeattribut = new clInterfaceSimple("Types d'attribut");

    Maitre_Typeattribut = It_Typeattribut.AjouterMaitre("Liste des types d'attribut de personne","typeattribut");
    Maitre_Typeattribut.AjouterColonne("N�","ta_numero");
    Maitre_Typeattribut.AjouterColonne("Libell�","ta_nom");

    It_Typeattribut.AjouterComposantSimple("Libell�", "ta_nom");
    TypeattributCategorie = It_Typeattribut.AjouterComposantComplexe("Cat�gories",new Array("ta_numero","ta_numero","categorie"));
    TypeattributCategorie.AjouterColonne("Libell�","cr_libelle");

    TypeattributCategorie.AddMode(INSERTION);
    TypeattributCategorie.AddMode(SUPPRESSION);
    TypeattributCategorie.AddMode(MODIFICATION);

    It_Typeattribut.AjouterComposantSimple("Libell�","cr_libelle",null,TypeattributCategorie);
    It_Typeattribut.AjouterComposantSimple("Description","cr_description",null,TypeattributCategorie);
    

    param_alert("Typeattribut...OK!");

    //****************************
    // GROUPE CANTON
    //****************************

    var It_Groupecanton,Maitre_Groupecanton;

    It_Groupecanton = new clInterfaceSimple("Groupes de cantons");

    Maitre_Groupecanton = It_Groupecanton.AjouterMaitre("Liste des groupes de cantons","groupecanton");
    Maitre_Groupecanton.AjouterColonne("N�","gc_numero");
    Maitre_Groupecanton.AjouterColonne("Libell�","gc_nom");

    It_Groupecanton.AjouterComposantSimple("Libell�", "gc_nom");

    GroupecantonCantonREF = It_Groupecanton.AjouterComposantComplexeIndependant("Cantons disponibles","canton");
    GroupecantonCantonREF.AjouterColonne("Nom","ct_nom");
    GroupecantonCantonREF.AjouterColonne("N�","ct_numero");

    GroupecantonCanton = It_Groupecanton.AjouterComposantListeDouble("Cantons appartenant au groupe", new Array("gc_numero","gc_numero","appartienta","ct_numero","ct_numero","canton"),null, GroupecantonCantonREF);
    GroupecantonCanton.AjouterColonne("Nom","ct_nom");

    param_alert("Groupecanton...OK!");

    //****************************
    // TYPELIEN
    //****************************

    var It_Typelien,Maitre_Typelien;

    It_Typelien = new clInterfaceSimple("Types de lien");

    Maitre_Typelien = It_Typelien.AjouterMaitre("Liste des types de lien entre personne","typelien");
    Maitre_Typelien.AjouterColonne("Libell�","tl_libelle");

    It_Typelien.AjouterComposantSimple("Libell�", "tl_libelle");
    It_Typelien.AjouterComposantSimple("Action de P1 � P2", "tl_action12");
    It_Typelien.AjouterComposantSimple("Action de P2 � P1", "tl_action21");
    It_Typelien.AjouterComposantSimple("Description", "tl_description",null,null,null,null,null,true);


    //****************************
    // TYPEADRESSE
    //****************************

    var It_Typeadresse,Maitre_Typeadresse;

    It_Typeadresse = new clInterfaceSimple("Types d'adresses");

    Maitre_Typeadresse = It_Typeadresse.AjouterMaitre("Liste des types d'adresses","typeadresse");
    Maitre_Typeadresse.AjouterColonne("Nom","ak_nom");

    It_Typeadresse.AjouterComposantSimple("Nom", "ak_nom");


    //****************************
    // TYPEPERSONNE
    //****************************

    var It_Typepersonne,Maitre_Typepersonne;

    It_Typepersonne = new clInterfaceSimple("Types de personne");

    Maitre_Typepersonne = It_Typepersonne.AjouterMaitre("Liste des types de personne","typepersonne");
    Maitre_Typepersonne.AjouterColonne("Libell�","tp_type");

    It_Typepersonne.AjouterComposantSimple("Libell�", "tp_type");

    param_alert("Typepersonne...OK!");
  

    //****************************
    // NATUREPERSONNE
    //****************************

    var It_Naturepersonne,Maitre_Naturepersonne;

    It_Naturepersonne = new clInterfaceSimple("Natures de personne");

    Maitre_Naturepersonne = It_Naturepersonne.AjouterMaitre("Liste des �tats de personne","naturepersonne");
    Maitre_Naturepersonne.AjouterColonne("N�","np_numero");
    Maitre_Naturepersonne.AjouterColonne("Nom      ","np_nom");
    Maitre_Naturepersonne.AjouterColonne("Titre  ","np_abrev");
    Maitre_Naturepersonne.AjouterColonne("Genre","np_genre");

    It_Naturepersonne.AjouterComposantSimple("Nom", "np_nom");
    It_Naturepersonne.AjouterComposantSimple("Titre ou Abreviation de la forme juridique (sans point)", "np_abrev");
    It_Naturepersonne.AjouterComposantSimple("Entit� morale", "np_morale",null,null,CHECKBOX);
    It_Naturepersonne.AjouterComposantSimple("Utilise le titre/abrev.", "np_avectitre",null,null,CHECKBOX);
    It_Naturepersonne.AjouterComposantSimple("La forme juridique doit �tre incluse dans la d�signation sociale", "np_inclu",null,null,CHECKBOX);
//    It_Naturepersonne.AjouterComposantSimple("Les entit�s peuvent changer de nature", "np_temporaire",null,null,CHECKBOX);
    It_Naturepersonne.AjouterComposantSimple("Genre","np_genre");

    param_alert("Naturepersonne...OK!");
  
  

    //****************************
    // ETATPERSONNE
    //****************************
/*
    var It_Etatpersonne,Maitre_Etatpersonne;

    It_Etatpersonne = new clInterfaceSimple("Etats de personne");

    Maitre_Etatpersonne = It_Etatpersonne.AjouterMaitre("Liste des �tats de personne","etatpersonne");
    Maitre_Etatpersonne.AjouterColonne("Libell�","ep_libelle");

    It_Etatpersonne.AjouterComposantSimple("Libell�", "ep_libelle");

    param_alert("Etatpersonne...OK!");
  */
    //****************************
    // TYPESOCIETE
    //****************************

    var It_Typesociete,Maitre_Typesociete;

    It_Typesociete = new clInterfaceSimple("Types de soci�t�s");

    Maitre_Typesociete = It_Typesociete.AjouterMaitre("Liste des types de soci�t�s","typesociete");
    Maitre_Typesociete.AjouterColonne("Nom","ts_libelle");

    It_Typesociete.AjouterComposantSimple("Nom", "ts_libelle");

    param_alert("Typesociete...OK!");


    //****************************
    // SOCIETE
    //****************************

    var It_Societe,Maitre_Societe;

    It_Societe = new clInterfaceSimple("Soci�t�s");

    Maitre_Societe = It_Societe.AjouterMaitre("Liste des soci�t�s","societe");
    Maitre_Societe.AjouterColonne("Abr.","so_abbrev");
    Maitre_Societe.AjouterColonne("Nom","so_libelle");

    var SocieteTypesociete = It_Societe.AjouterComposantSimple("Type", "ts_libelle",new Array("ts_numero","ts_numero","typesociete"),null,LISTE_DEROULANTE);
    It_Societe.AjouterComposantSimple("Nom", "so_libelle");
    It_Societe.AjouterComposantSimple("Abr�viation", "so_abbrev");
    It_Societe.AjouterComposantSimple("Personne", "pe_libelle", new Array("pe_numero","pe_numero","personne"),null, LISTE_DEROULANTE);
    var SocieteSequence = It_Societe.AjouterComposantSimple("S�quence", "sq_nom",new Array("sq_numero","sq_numero","sequence"),null,LISTE_DEROULANTE);
    It_Societe.AjouterComposantSimple("D�tails", "so_detail",null,null,null,null,null,true);

    SocieteService = It_Societe.AjouterComposantComplexe("Services", new Array("so_numero","se_societe","service"));
    SocieteService.AjouterColonne("Nom","se_nom");
    SocieteService.AjouterColonne("Responsable","ag_libelle",new Array("se_agent","ag_numero","agent"));

    param_alert("Societe...OK!");


    //****************************
    // SEQUENCE
    //****************************

    var It_Sequence,Maitre_Sequence;

    It_Sequence = new clInterfaceSimple("S�quences");

    Maitre_Sequence = It_Sequence.AjouterMaitre("Liste des s�quences","sequence");
    Maitre_Sequence.AjouterColonne("Nom","sq_nom")
    Maitre_Sequence.AjouterColonne("C.S.","sq_nombre");
    Maitre_Sequence.AjouterColonne("L.V.","sq_last");

    It_Sequence.AjouterComposantSimple("Nom", "sq_nom");
    It_Sequence.AjouterComposantSimple("C.S.", "sq_nombre");
    It_Sequence.AjouterComposantSimple("L.V.", "sq_last");
    It_Sequence.AjouterComposantSimple("Vider le cache", "sq_clear_cache",null,null,CHECKBOX);

    param_alert("Sequence...OK!");


    //****************************
    // SERVICE
    //****************************

    var It_Service,Maitre_Service;

    It_Service = new clInterfaceSimple("Services");

    Maitre_Service = It_Service.AjouterMaitre("Liste des services","service"); 
    // Maitre_Service.AjouterColonne("Soci�t�","so_libelle",new Array("se_societe","so_numero","societe"));
    Maitre_Service.AjouterColonne("Nom","se_nom");
    Maitre_Service.AjouterColonne("Responsable","ag_libelle",new Array("se_agent","ag_numero","agent"));
    Maitre_Service.AjouterColonne("Soci�t�", "so_libelle",new Array("se_societe","so_numero","societe"));
    
    // ServiceSociete = It_Service.AjouterComposantSimple("Soci�t�", "ts_libelle",new Array("ts_numero","ts_numero","typesociete"),null,LISTE_DEROULANTE);
    //It_Service.AjouterComposantSimple("Soci�t�", "so_libelle",new Array("se_societe","so_numero","societe"),null,LABEL);
    It_Service.AjouterComposantSimple("Nom", "se_nom");
    ServiceAgent = It_Service.AjouterComposantSimple("Agent responsable", "ag_libelle", new Array("se_agent","ag_numero","agent"),null,LISTE_DEROULANTE);

    ServiceEmploye = It_Service.AjouterComposantComplexe("Employ�s", new Array("se_numero","em_service","employe"));
    ServiceEmploye.AjouterColonne("Agent","ag_libelle",new Array("em_agent","ag_numero","agent"));
    ServiceEmploye.AjouterColonne("Emploi","em_emploi");
    ServiceEmploye.AjouterColonne("Acc�s","ac_nom",new Array("em_acces","ac_numero","acces"));
    /*
    ServiceEmploye.AddMode(INSERTION);
    ServiceEmploye.AddMode(SUPPRESSION);
    ServiceEmploye.AddMode(MODIFICATION);

    ServiceEmployeAgent = It_Service.AjouterComposantSimple("Agent", "ag_libelle", new Array("em_agent","ag_numero","agent"),ServiceEmploye,LISTE_DEROULANTE);
    It_Service.AjouterComposantSimple("Login", "em_login",null,ServiceEmploye);
    It_Service.AjouterComposantSimple("Mot de passe", "em_password",null,ServiceEmploye);
    It_Service.AjouterComposantSimple("Peut cr�er de nouveaux employ�s", "em_super",null,ServiceEmploye,CHECKBOX);
    ServiceEmployeAcces = It_Service.AjouterComposantSimple("Acc�s comptabilit�", "ac_nom", new Array("em_acces","ac_numero","acces"),ServiceEmploye,LISTE_DEROULANTE);
    It_Service.AjouterComposantSimple("Emploi", "em_emploi",null,ServiceEmploye,null,null,null,true);
    */

    param_alert("Service...OK!");

    
    //****************************
    // EMPLOYE
    //****************************
    
    var It_Employe,Maitre_Employe;

    It_Employe = new clInterfaceSimple("Employ�s");

    Maitre_Employe = It_Employe.AjouterMaitre("Liste des employ�s","employe"); 
    Maitre_Employe.AjouterColonne("Agent","ag_libelle", new Array("em_agent","ag_numero","agent"));
    //Maitre_Employe.AjouterColonne("Login","em_login");
    //Maitre_Employe.AjouterColonne("Niveau","ac_nom",new Array("em_acces","ac_numero","acces"));
    Maitre_Employe.AjouterColonne("Emploi","em_emploi");
    Maitre_Employe.AjouterColonne("Service", "se_nom", new Array("em_service","se_numero","service"));

    It_Employe.AjouterBouton("Mettre � jour les droits","DroitsUpdate","");
    
    //It_Employe.AjouterComposantSimple("Soci�t�", "so_libelle", new Array("em_service","se_numero","service","se_societe","so_numero","societe"),null,LABEL);
    //    It_Employe.AjouterComposantSimple("Service", "se_nom", new Array("em_service","se_numero","service"),null,LABEL);
    EmployeAgent = It_Employe.AjouterComposantSimple("Agent", "ag_libelle", new Array("em_agent","ag_numero","agent"),null,LISTE_DEROULANTE);
    It_Employe.AjouterComposantSimple("Login", "em_login");
    It_Employe.AjouterComposantSimple("Mot de passe", "em_password");
    It_Employe.AjouterComposantSimple("Administrateur (Peut cr�er d'autres utilisateurs)", "em_super",null,null,CHECKBOX);
    It_Employe.AjouterComposantSimple("Cet employ� peut effectuer des remises de ch�ques","em_reglement",null,null,CHECKBOX);
    It_Employe.AjouterComposantSimple("Emploi", "em_emploi");
    EmployeAcces = It_Employe.AjouterComposantSimple("Acc�s comptabilit�", "ac_nom", new Array("em_acces","ac_numero","acces"),null,LISTE_DEROULANTE);
    EmployeDroitprofil = It_Employe.AjouterComposantSimple("Profil de droits", "dp_libelle", new Array("dp_numero","dp_numero","droitprofil"),null,LISTE_DEROULANTE);
    /*
    EmployeDroit = It_Employe.AjouterComposantComplexe("Droits", new Array("em_numero","em_numero","droit"));
    EmployeDroit.AjouterColonne("Droits","dr_droits");
    EmployeDroit.AjouterColonne("Sur","gt_libelle",new Array("gt_numero","gt_numero","groupetable"));
    
    EmployeDroit.AddMode(INSERTION);
    EmployeDroit.AddMode(SUPPRESSION);
    EmployeDroit.AddMode(MODIFICATION);

    EmployeDroitGroupetable = It_Employe.AjouterComposantSimple("Module","gt_libelle",new Array("gt_numero","gt_numero","groupetable"),EmployeDroit,LISTE_DEROULANTE);
    EmployeDroitSelect = It_Employe.AjouterComposantSimple("Lecture","dr_select",null,EmployeDroit,CHECKBOX);
    EmployeDroit.OnModeInsert=ComposantDansCode(EmployeDroitSelect)+'.my_CompoXUL.value=true;\n';
    EmployeDroit.OnModeInsert+=ComposantDansCode(EmployeDroitSelect)+'.my_CompoXUL.checked=true;\n';
 
    It_Employe.AjouterComposantSimple("Ajout","dr_insert",null,EmployeDroit,CHECKBOX);
    It_Employe.AjouterComposantSimple("Modification","dr_update",null,EmployeDroit,CHECKBOX);
    It_Employe.AjouterComposantSimple("Suppression","dr_delete",null,EmployeDroit,CHECKBOX);
    
    */
    param_alert("Employe...OK!");

    
    //****************************
    // DROITPROFIL
    //****************************
   
    var It_Droitprofil, Maitre_Droitprofil;

    It_Droitprofil = new clInterfaceSimple("Profils de droits");

    Maitre_Droitprofil = It_Droitprofil.AjouterMaitre("Liste des profils de droits","droitprofil"); 
    Maitre_Droitprofil.AjouterColonne("Libell�","dp_libelle");

    It_Droitprofil.AjouterBouton("Mettre � jour les droits","DroitsUpdate","");
    
    It_Droitprofil.AjouterComposantSimple("Libell�", "dp_libelle");
    DroitprofilDroit = It_Droitprofil.AjouterComposantComplexe("Droits", new Array("dp_numero","dp_numero","droit"));
    DroitprofilDroit.AjouterColonne("Droits","dr_droits");
    DroitprofilDroit.AjouterColonne("Sur","gt_libelle",new Array("gt_numero","gt_numero","groupetable"));
    
    DroitprofilDroit.AddMode(INSERTION);
    DroitprofilDroit.AddMode(SUPPRESSION);
    DroitprofilDroit.AddMode(MODIFICATION);

    DroitprofilDroitGroupetable = It_Droitprofil.AjouterComposantSimple("Module","gt_libelle",new Array("gt_numero","gt_numero","groupetable"),DroitprofilDroit,LISTE_DEROULANTE);
    DroitprofilDroitSelect = It_Droitprofil.AjouterComposantSimple("Lecture","dr_select",null,DroitprofilDroit,CHECKBOX);
    DroitprofilDroit.OnModeInsert=ComposantDansCode(DroitprofilDroitSelect)+'.my_CompoXUL.value=true;\n';
    DroitprofilDroit.OnModeInsert+=ComposantDansCode(DroitprofilDroitSelect)+'.my_CompoXUL.checked=true;\n';
 
    It_Droitprofil.AjouterComposantSimple("Ajout","dr_insert",null,DroitprofilDroit,CHECKBOX);
    It_Droitprofil.AjouterComposantSimple("Modification","dr_update",null,DroitprofilDroit,CHECKBOX);
    It_Droitprofil.AjouterComposantSimple("Suppression","dr_delete",null,DroitprofilDroit,CHECKBOX);
    
    param_alert("Droitprofil...OK!");
    
    //****************************
    // GROUPE TABLE
    //****************************
    
    var It_Groupetable,Maitre_Groupetable;

    It_Groupetable = new clInterfaceSimple("Groupe de tables");

    Maitre_Groupetable = It_Groupetable.AjouterMaitre("Liste des groupes de tables","groupetable"); 
    Maitre_Groupetable.AjouterColonne("Libell�","gt_libelle");
    Maitre_Groupetable.AjouterColonne("Tables","gt_tables");

    It_Groupetable.AjouterBouton("Mettre � jour les droits","DroitsUpdate","");
    
    It_Groupetable.AjouterComposantSimple("Libell�", "gt_libelle");
    It_Groupetable.AjouterComposantSimple("Tables", "gt_tables",null,null,null,null,null,true);    

    param_alert("Groupetable...OK!");
    

    //****************************
    // AGENT
    //****************************

    var It_Agent,Maitre_Agent;

    It_Agent = new clInterfaceSimple("Agents");

    Maitre_Agent = It_Agent.AjouterMaitre("Liste des agents","agent");
    Maitre_Agent.AjouterColonne("Ini.","ag_initiales");
    Maitre_Agent.AjouterColonne("Nom", "ag_nom");
    Maitre_Agent.AjouterColonne("Pr�nom", "ag_prenom");
    Maitre_Agent.AjouterColonne("�quipe", "eq_nom",new Array("eq_numero","eq_numero","equipe"));
    Maitre_Agent.AjouterColonne("R�le", "ag_role");

    It_Agent.AjouterComposantSimple("Nom", "ag_nom");
    It_Agent.AjouterComposantSimple("Pr�nom", "ag_prenom");
    It_Agent.AjouterComposantSimple("Initiales", "ag_initiales");
    It_Agent.AjouterComposantSimple("En activit�", "ag_actif",null,null,CHECKBOX);    
    It_Agent.AjouterComposantSimple("R�le", "ag_role");
    var AgentEquipe = It_Agent.AjouterComposantSimple("�quipe", "eq_nom",new Array("eq_numero","eq_numero","equipe"),null,LISTE_DEROULANTE);
    It_Agent.AjouterComposantSimple("T�l�phone professionnel", "ag_telephone");
    It_Agent.AjouterComposantSimple("T�l�phone portable", "ag_mobile");
    It_Agent.AjouterComposantSimple("Adresse e-mail", "ag_email");
    It_Agent.AjouterComposantSimple("Commentaire", "ag_commentaire");

    param_alert("Agent...OK!");

    //****************************
    // EQUIPE
    //****************************
    var It_Equipe,Maitre_Equipe;

    It_Equipe = new clInterfaceSimple("�quipes");

    Maitre_Equipe = It_Equipe.AjouterMaitre("Liste des �quipes","equipe");
    Maitre_Equipe.AjouterColonne("Nom", "eq_nom");

    It_Equipe.AjouterComposantSimple("Nom", "eq_nom");

    param_alert("Equipe...OK!");


    //****************************
    // VILLE
    //****************************
    var It_Ville, Maitre_Ville;
    
    It_Ville = new clInterfaceSimple("Villes");
    
    Maitre_Ville = It_Ville.AjouterMaitre("Liste des villes","ville");
    Maitre_Ville.AjouterColonne("N�","vi_numero");
    Maitre_Ville.AjouterColonne("Nom","vi_nom");
    Maitre_Ville.AjouterColonne("Canton","ct_nom",new Array("ct_numero","ct_numero","canton"));

    It_Ville.AjouterComposantSimple("Nom", "vi_nom");
    VilleCanton = It_Ville.AjouterComposantSimple("Canton", "ct_nom",new Array("ct_numero","ct_numero","canton"),null,LISTE_DEROULANTE);
        
    param_alert("Ville...OK!");
    

    //****************************
    // CODE POSTAL
    //****************************
    var It_Codepostal, Maitre_Codepostal;

    It_Codepostal = new clInterfaceSimple("Codes postaux");

    Maitre_Codepostal = It_Codepostal.AjouterMaitre("Liste des codes postaux","codepostal");
    Maitre_Codepostal.AjouterColonne("N�","cp_numero");
    Maitre_Codepostal.AjouterColonne("Code","cp_codepostal");
    Maitre_Codepostal.AjouterColonne("Bureau","cp_bureau");
 
    It_Codepostal.AjouterComposantSimple("Code postal", "cp_codepostal");
    It_Codepostal.AjouterComposantSimple("Bureau distributeur", "cp_bureau");

    CodepostalVilleREF = It_Codepostal.AjouterComposantComplexeIndependant("Villes disponibles","ville");
    CodepostalVilleREF.AjouterColonne("N�","vi_numero");
    CodepostalVilleREF.AjouterColonne("Nom","vi_nom");

    CodepostalVille = It_Codepostal.AjouterComposantListeDouble("Villes li�es au code postal", new Array("cp_numero","cp_numero","villecp","vi_numero","vi_numero","ville"),null, CodepostalVilleREF);
    CodepostalVille.AjouterColonne("N�","vi_numero");
    CodepostalVille.AjouterColonne("Nom","vi_nom");
      /*
    CodepostalVillecp = It_Codepostal.AjouterComposantComplexe("Villes du code postal", new Array("cp_numero","cp_numero","villecp"));
    CodepostalVillecp.AjouterColonne("Ville","vi_nom",new Array("vi_numero","vi_numero","ville"));

    CodepostalVillecp.AddMode(INSERTION);
    CodepostalVillecp.AddMode(SUPPRESSION);
    CodepostalVillecp.AddMode(MODIFICATION);

    CodepostalVillecpVille = It_Codepostal.AjouterComposantComplexe("Ville", new Array("vi_numero","vi_numero","ville"),CodepostalVillecp,LISTE_DEROULANTE_MULTI);
    CodepostalVillecpVille.AjouterColonne("Nom","vi_nom");

    */
    param_alert("Code postal...OK!");


    //****************************
    // CONTACTTYPE
    //****************************

    var It_Contacttype, Maitre_Contacttype;

    It_Contacttype = new clInterfaceSimple("Types de contacts");

    Maitre_Contacttype = It_Contacttype.AjouterMaitre("Liste des types de contacts","contacttype");
    Maitre_Contacttype.AjouterColonne("Nom","ck_nom");
    Maitre_Contacttype.AjouterColonne("Code","ck_code");

    It_Contacttype.AjouterComposantSimple("Nom","ck_nom");
    It_Contacttype.AjouterComposantSimple("Code","ck_code");
    It_Contacttype.AjouterComposantSimple("Peut �tre un num�ro","ck_number",null,null,CHECKBOX);
    It_Contacttype.AjouterComposantSimple("Peut �tre un e-mail","ck_email",null,null,CHECKBOX);
    It_Contacttype.AjouterComposantSimple("Peut �tre une adresse web (URL)","ck_url",null,null,CHECKBOX);
    
    param_alert("Contacttype...OK!");

    //****************************
    // CANTON
    //****************************
    var It_Canton, Maitre_Canton;

    It_Canton = new clInterfaceSimple("Cantons");

    Maitre_Canton = It_Canton.AjouterMaitre("Liste des cantons","canton");
    Maitre_Canton.AjouterColonne("N�","ct_numero");
    Maitre_Canton.AjouterColonne("Nom","ct_nom");
   
    It_Canton.AjouterComposantSimple("Nom", "ct_nom");

    CantonVille = It_Canton.AjouterComposantComplexe("Villes",new Array("ct_numero","ct_numero","ville"));
    CantonVille.AjouterColonne("Nom","vi_nom");

    param_alert("Canton...OK!");

    //****************************
    // RESPONSABILITES
    //****************************
    var It_Responsabilite, Maitre_Responsabilite;

    It_Responsabilite = new clInterfaceSimple("Responsabilit�s");

    Maitre_Responsabilite = It_Responsabilite.AjouterMaitre("Responsabilit�s","responsabilite");
    Maitre_Responsabilite.AjouterColonne("Code","re_code");
    Maitre_Responsabilite.AjouterColonne("Nom","re_nom");
    Maitre_Responsabilite.AjouterColonne("Famille","re_famille");
    
    It_Responsabilite.AjouterComposantSimple("Code","re_code");
    It_Responsabilite.AjouterComposantSimple("Nom","re_nom");
    It_Responsabilite.AjouterComposantSimple("Famille","re_famille");
    
    param_alert("Responsabilit�s...OK!");

    //****************************
    // TVA
    //****************************
    
    var It_Tva, Maitre_Tva;

    It_Tva = new clInterfaceSimple("TVA");

    Maitre_Tva = It_Tva.AjouterMaitre("Liste des T.V.A.","tva");
    Maitre_Tva.AjouterColonne("Taux (%)","tv_taux");
    Maitre_Tva.AjouterColonne("Code","tv_code");
    Maitre_Tva.AjouterColonne("Etat","tv_etat");

    It_Tva.AjouterComposantSimple("Taux","tv_taux");
    It_Tva.AjouterComposantSimple("Code","tv_code");
    It_Tva.AjouterComposantSimple("Compte g�n�ral","cg_nom",new Array("cg_numero","cg_numero","comptegen"),null,LISTE_DEROULANTE);
    It_Tva.AjouterComposantSimple("Actif","tv_actif",null,null,CHECKBOX);

    param_alert("TVA...OK!");

    //****************************
    // PRODUIT
    //****************************
    
    var It_Produit, Maitre_Produit;

    It_Produit = new clInterfaceSimple("Produits");

    Maitre_Produit = It_Produit.AjouterMaitre("Liste des produits","produit");
    Maitre_Produit.AjouterColonne("Etat","pd_etat");
    Maitre_Produit.AjouterColonne("Libell�","pd_libelle");

    It_Produit.AjouterComposantSimple("Libell� (en interne)","pd_libelle");
    It_Produit.AjouterComposantSimple("Titre (pour les impressions)","pd_titre");
    It_Produit.AjouterComposantSimple("Journal comptable","jo_libelle",new Array("jo_numero","jo_numero","journal"),null,LISTE_DEROULANTE);
    ProduitActif = It_Produit.AjouterComposantSimple("Actif","pd_actif",null,null,CHECKBOX);
    Maitre_Produit.OnModeInsert=ComposantDansCode(ProduitActif)+'.my_CompoXUL.value=true;\n';
    Maitre_Produit.OnModeInsert+=ComposantDansCode(ProduitActif)+'.my_CompoXUL.checked=true;\n';
    It_Produit.AjouterComposantSimple("Produit non quantifiable (Quantit�=1)","pd_sansquantite",null,null,CHECKBOX);
    It_Produit.AjouterComposantSimple("Soumis � de potentielles r�ductions","pd_reduction",null,null,CHECKBOX);

    // Prix
    ProduitPrix = It_Produit.AjouterComposantComplexe("Prix", new Array("pd_numero","pd_numero","prix"));
    ProduitPrix.AjouterColonne("Tarif HT","px_tarifht");
    ProduitPrix.AjouterColonne("Tarif TTC","px_tarifttc");
    ProduitPrix.AjouterColonne("T.V.A.","tv_pourcentage",new Array("tv_numero","tv_numero","tva"));
    ProduitPrix.AjouterColonne("Date application","px_datedebut");

    ProduitPrix.AddMode(INSERTION);
    ProduitPrix.AddMode(SUPPRESSION);
    ProduitPrix.AddMode(MODIFICATION);

    It_Produit.AjouterComposantSimple("Tarif H.T.","px_tarifht",null,ProduitPrix);
    It_Produit.AjouterComposantSimple("Tarif T.T.C.","px_tarifttc",null,ProduitPrix);
    ProduitPrixTva = It_Produit.AjouterComposantSimple("T.V.A.","tv_pourcentage",new Array("tv_numero","tv_numero","tva"),ProduitPrix,LISTE_DEROULANTE);
    ProduitPrixTva.getTheme().AddFiltre('Filtre_ProduitPrixTva=new clInterfaceFiltragePermanantCustom("tv_actif=true")');
    AllIt.AjouterCodeUserLoad('Filtre_ProduitPrixTva.setComposant(Compo_'+ProduitPrixTva.getNom_()+');\n');
    ProduitPrix.OnModeInsert=ComposantDansCode(ProduitPrixTva)+'.my_CompoXUL.selectedIndex=1;\n';
      

//    It_Produit.AjouterComposantSimple("Date d'application","px_datedebut",null,ProduitPrix);
//    It_Produit.AjouterComposantSimple("Actif","px_actif",null,ProduitPrix,CHECKBOX);

    // Compte
    ProduitCompte = It_Produit.AjouterComposantComplexe("Comptes g�n�raux", new Array("pd_numero","pd_numero","compteproduit"));
    ProduitCompte.AjouterColonne("N� Compte","cg_numcompte",new Array("cg_numero","cg_numero","comptegen"));
    ProduitCompte.AjouterColonne("Libell�","cg_libelle",new Array("cg_numero","cg_numero","comptegen"));

    ProduitCompte.AddMode(INSERTION);
    ProduitCompte.AddMode(SUPPRESSION);
    ProduitCompte.AddMode(MODIFICATION);

    //    It_Produit.AjouterComposantSimple("Compte","cg_numcompte",new Array("cg_numero","cg_numero","comptegen"),ProduitCompte,LISTE_DEROULANTE);
    It_Produit.AjouterComposantSimple("Compte","cg_nom",new Array("cg_numero","cg_numero","comptegen"),ProduitCompte,LISTE_DEROULANTE);
    It_Produit.AjouterComposantSimple("Actif","ci_actif",null,ProduitCompte,CHECKBOX);

    param_alert("Produit...OK!");

    
    //****************************
    // ADHERENCE
    //****************************

    var It_Adherence, Maitre_Adherence;

    It_Adherence = new clInterfaceSimple("Adh�rence");

    Maitre_Adherence = It_Adherence.AjouterMaitre("Liste des adh�rences","adherence");
    Maitre_Adherence.AjouterColonne("Libell�","ah_libelle");
    Maitre_Adherence.AjouterColonne("R�duction","ah_reduction");
    Maitre_Adherence.AjouterColonne("N�Produit","pd_numero");
//    Maitre_Adherence.AjouterColonne("Quantit�","ah_quantite");

    It_Adherence.AjouterBouton("Mettre � jour les adh�sions","MiseAJourAdhesion","");
    
    AdherenceProduit = It_Adherence.AjouterComposantSimple("Produit","pd_libelle",new Array("pd_numero","pd_numero","produit"),null,LISTE_DEROULANTE);
    It_Adherence.AjouterComposantSimple("Libell�","ah_libelle");
    It_Adherence.AjouterComposantSimple("R�duction","ah_reduction");
//    It_Adherence.AjouterComposantSimple("Quantit�","ah_quantite");
    It_Adherence.AjouterComposantSimple("En cascade","ah_cascade",null,null,CHECKBOX);
    AdherenceTypelien = It_Adherence.AjouterComposantSimple("Nature du lien � utiliser pour la cascade","tl_libelle",new Array("tl_numero","tl_numero","typelien"),null,LISTE_DEROULANTE);

    // Periodes d'adh�rences
    AdherencePeriodeREF = It_Adherence.AjouterComposantComplexeIndependant("P�riodes disponibles","periode");
    AdherencePeriodeREF.AjouterColonne("Du","po_debut");
    AdherencePeriodeREF.AjouterColonne("au","po_fin");
    AdherencePeriode = It_Adherence.AjouterComposantListeDouble("P�riodes de validit�",new Array("ah_numero","ah_numero","periodeadherence","po_numero","po_numero","periode"),null,AdherencePeriodeREF);
    AdherencePeriode.AjouterColonne("Du","po_debut");
    AdherencePeriode.AjouterColonne("au","po_fin");    
    
    param_alert("Adherences...OK!");

    
    //****************************
    // PERIODE
    //****************************

    var It_Periode, Maitre_Periode;

    It_Periode = new clInterfaceSimple("P�riodes");

    Maitre_Periode = It_Periode.AjouterMaitre("Liste des p�riodes","periode");
    Maitre_Periode.AjouterColonne("N�","po_numero");
    Maitre_Periode.AjouterColonne("Du","po_debut");
    Maitre_Periode.AjouterColonne("Au","po_fin");

    It_Periode.AjouterComposantSimple("Du","po_debut");
    It_Periode.AjouterComposantSimple("Au","po_fin");
    
    param_alert("Periodes...OK!");


    //****************************
    // TYPEJOURNAL
    //****************************

    var It_Typejournal, Maitre_Typejournal;

    It_Typejournal = new clInterfaceSimple("Types de journaux");

    Maitre_Typejournal = It_Typejournal.AjouterMaitre("Liste des types de journaux","typejournal");
    Maitre_Typejournal.AjouterColonne("Libell�","tj_libelle");

    It_Typejournal.AjouterComposantSimple("Libell�","tj_libelle");
    
    param_alert("Typejournal...OK!");

    //****************************
    // PREFIXE
    //****************************

    var It_Prefixe, Maitre_Prefixe;

    It_Prefixe = new clInterfaceSimple("Pr�fixes");

    Maitre_Prefixe = It_Prefixe.AjouterMaitre("Liste des pr�fixes","prefixe");
    Maitre_Prefixe.AjouterColonne("Nom","pf_nom");

    It_Prefixe.AjouterComposantSimple("Nom","pf_nom");
    
    param_alert("Prefixes...OK!");

    //****************************
    // MODELE
    //****************************

    var It_Modele, Maitre_Modele;

    It_Modele = new clInterfaceSimple("Mod�les");

    Maitre_Modele = It_Modele.AjouterMaitre("Liste des mod�les","modele");
    Maitre_Modele.AjouterColonne("Libell�","mo_libelle");

    It_Modele.AjouterComposantSimple("Libell�","mo_libelle");

    ModeleLignemodele = It_Modele.AjouterComposantComplexe("Lignes du mod�le", new Array("mo_numero","mo_numero","lignemodele"));
    ModeleLignemodele.AjouterColonne("Produit","pd_libelle",new Array("pd_numero","pd_numero","produit"));
    ModeleLignemodele.AjouterColonne("Montant HT","lm_montantht");
    ModeleLignemodele.AjouterColonne("Montant TTC","lm_montantttc");
    ModeleLignemodele.AjouterColonne("Qt�.","lm_quantite");
    
    ModeleLignemodele.AddMode(INSERTION);
    ModeleLignemodele.AddMode(SUPPRESSION);
    ModeleLignemodele.AddMode(MODIFICATION);

    ModeleLignemodeleProduit = It_Modele.AjouterComposantSimple("Produit","pd_libelle",new Array("pd_numero","pd_numero","produit"),ModeleLignemodele,LISTE_DEROULANTE);
    It_Modele.AjouterComposantSimple("Montant HT","lm_montantht",null,ModeleLignemodele);
    It_Modele.AjouterComposantSimple("Montant TTC","lm_montantttc",null,ModeleLignemodele);
    It_Modele.AjouterComposantSimple("Quantit�","lm_quantite",null,ModeleLignemodele);

    param_alert("Modeles...OK!");


    //****************************
    // IMPRESSION
    //****************************
    
    var It_Impression, Maitre_Impression;

    It_Impression = new clInterfaceSimple("Mod�les d'impressions");

    Maitre_Impression = It_Impression.AjouterMaitre("Liste des mod�les d'impressions","impression");

    Maitre_Impression.AjouterColonne("N�","im_numero");
    Maitre_Impression.AjouterColonne("Libell�","im_libelle");

    It_Impression.AjouterComposantSimple("Libell�","im_libelle");
    It_Impression.AjouterComposantSimple("Nom logique","im_nom");
    It_Impression.AjouterComposantSimple("Mod�le","im_modele",null,null,null,null,null,true);
    It_Impression.AjouterComposantSimple("Mod�le utilis� par d�faut","im_defaut",null,null,CHECKBOX);
    It_Impression.AjouterComposantSimple("Table utilis�e","im_keytable");
    It_Impression.AjouterComposantSimple("Sa cl�","im_keycle");
    It_Impression.AjouterComposantSimple("Son champs date","im_keydate");
    
    param_alert("Impressions...OK!");
    
    //****************************
    // TABLEIMPRESSION
    //****************************

    var It_Tableimpression, Maitre_Tableimpression;

    It_Tableimpression = new clInterfaceSimple("Impressions");

    Maitre_Tableimpression = It_Tableimpression.AjouterMaitre("Liste des mod�les d'impressions","table_impression");

    Maitre_Tableimpression.AjouterColonne("Libell�","im_libelle");
    Maitre_Tableimpression.AjouterColonne("Soci�t�","so_libelle",new Array("im_societe","so_numero","societe"));

    It_Tableimpression.AjouterBouton("Mettre � jour les fonctions d'impression","ImpressionsUpdate","");

    It_Tableimpression.AjouterComposantSimple("Soci�t�","so_libelle",new Array("im_societe","so_numero","societe"),null,LISTE_DEROULANTE);
    It_Tableimpression.AjouterComposantSimple("Libell�","im_libelle");
    It_Tableimpression.AjouterComposantSimple("Nom logique","im_nom");
    It_Tableimpression.AjouterComposantSimple("Mod�le","im_modele",null,null,null,null,null,true);
    It_Tableimpression.AjouterComposantSimple("Mod�le utilis� par d�faut","im_defaut",null,null,CHECKBOX);
    It_Tableimpression.AjouterComposantSimple("Table utilis�e","im_keytable");
    It_Tableimpression.AjouterComposantSimple("Sa cl�","im_keycle");
    It_Tableimpression.AjouterComposantSimple("Son champs date","im_keydate");

    
    param_alert("Tableimpressions...OK!");


    //==============================================================================================*
    //==============================================================================================*
    //==*                                                                                       //==*
    //==*                         F  I  N  A  L  I  S  A  T  I  O  N                            //==*
    //==*                                                                                       //==*
    //==============================================================================================*
    //==============================================================================================*

    //****************************
    // LIENS
    //****************************
    
    //It_Acces.LierA(ServiceEmployeAcces, It_Service);
    It_Acces.LierA(EmployeAcces, It_Employe);
    It_Agent.LierA(ServiceAgent, It_Service);
    //It_Agent.LierA(ServiceEmployeAgent, It_Service);
    It_Agent.LierA(EmployeAgent, It_Employe);
    It_Canton.LierA(VilleCanton, It_Ville);
    It_Droitprofil.LierA(EmployeDroitprofil, It_Employe);
    It_Employe.LierFortementA(ServiceEmploye, It_Service);
    It_Equipe.LierA(AgentEquipe, It_Agent);
    It_Groupetable.LierA(DroitprofilDroitGroupetable,It_Droitprofil);
    It_Periode.LierA(AdherencePeriodeREF, It_Adherence);
    It_Produit.LierA(AdherenceProduit, It_Adherence);
    It_Produit.LierA(ModeleLignemodeleProduit, It_Modele);
    It_Sequence.LierA(SocieteSequence, It_Societe);
    It_Tva.LierA(ProduitPrixTva, It_Produit);
		It_Typelien.LierA(AdherenceTypelien, It_Adherence);
    It_Typesociete.LierA(SocieteTypesociete, It_Societe);
    It_Service.LierFortementA(SocieteService, It_Societe);
    It_Ville.LierA(CodepostalVilleREF, It_Codepostal);
    
    //****************************
    // AJOUT DES ONGLETS
    //****************************
    AllIt.AjouterInterface(It_Acces);
    AllIt.AjouterInterface(It_Adherence);
    AllIt.AjouterInterface(It_Agent);
    AllIt.AjouterInterface(It_Canton);
    AllIt.AjouterInterface(It_Codepostal);
    AllIt.AjouterInterface(It_Droitprofil);
    AllIt.AjouterInterface(It_Employe);
    AllIt.AjouterInterface(It_Equipe);
//    AllIt.AjouterInterface(It_Etatpersonne);
    AllIt.AjouterInterface(It_Groupetable);
    AllIt.AjouterInterface(It_Groupecanton);
    AllIt.AjouterInterface(It_Impression);
    AllIt.AjouterInterface(It_Tableimpression);
    AllIt.AjouterInterface(It_Modele);
    AllIt.AjouterInterface(It_Modereglement);
    AllIt.AjouterInterface(It_Moderepartition);
    AllIt.AjouterInterface(It_Naturepersonne);
    AllIt.AjouterInterface(It_Periode);    
    AllIt.AjouterInterface(It_Prefixe);   
    AllIt.AjouterInterface(It_Produit);   
    AllIt.AjouterInterface(It_Responsabilite);
    AllIt.AjouterInterface(It_Sequence);
    AllIt.AjouterInterface(It_Service);
    AllIt.AjouterInterface(It_Societe);
    AllIt.AjouterInterface(It_Tva);
    AllIt.AjouterInterface(It_Typeadresse);
    AllIt.AjouterInterface(It_Typeattribut);
    AllIt.AjouterInterface(It_Contacttype);
    AllIt.AjouterInterface(It_Typejournal);
    AllIt.AjouterInterface(It_Typelien);
    AllIt.AjouterInterface(It_Typepersonne);
    AllIt.AjouterInterface(It_Typesociete);
    AllIt.AjouterInterface(It_Typetache);
    AllIt.AjouterInterface(It_Ville);

    //****************************
    // FIN
    //****************************
    param_alert("Fin");
				 
    AllIt.GenererInterface("parametrage",null,"GestSEA Param�trage");

}

