function gsea_getType(table,champs){
  var type;
  switch(table.toLowerCase()){
    case 'gsea_categorie' :
      switch(champs.toLowerCase()){
        case 'ca_nom' : type=1;break;
        case 'ca_description' : type=1;break;
        default:
        type=TYPE_UNDEFINED;
      }
      break;
    case 'gsea_travail' :
      switch(champs.toLowerCase()){
        case 'tr_duree' : type=4;break;
        case 'tr_libelle' : type=1;break;
        case 'tr_categorie' : type=2;break;
        case 'tr_dossier' : type=2;break;
        default:
        type=TYPE_UNDEFINED;
      }
      break;
    case 'gsea_dossier' :
      switch(champs.toLowerCase()){
        case 'do_libelle' : type=1;break;
        case 'do_client' : type=2;break;
        case 'do_agent' : type=2;break;
        default:
        type=TYPE_UNDEFINED;
      }
      break;
    default:
      type=TYPE_UNDEFINED;
  };
  return type;
}

function gsea_obligatoire(table,champs){
  var obligatoire;
  switch(table.toLowerCase()){
    case 'gsea_categorie' :
      switch(champs.toLowerCase()){
        case 'ca_nom' : obligatoire=true;break;
        case 'ca_description' : obligatoire=false;break;
        default:
        obligatoire = false;
      }
      break;
    case 'gsea_travail' :
      switch(champs.toLowerCase()){
        case 'tr_duree' : obligatoire=true;break;
        case 'tr_libelle' : obligatoire=true;break;
        case 'tr_categorie' : obligatoire=true;break;
        case 'tr_dossier' : obligatoire=true;break;
        default:
        obligatoire = false;
      }
      break;
    case 'gsea_dossier' :
      switch(champs.toLowerCase()){
        case 'do_libelle' : obligatoire=true;break;
        case 'do_client' : obligatoire=true;break;
        case 'do_agent' : obligatoire=false;break;
        default:
        obligatoire = false;
      }
      break;
    default:
      obligatoire = false;
  };
  return obligatoire
}