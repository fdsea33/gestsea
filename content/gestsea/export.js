function CleanValue(val)
{
    if (val!=null && val!=undefined && val!='undefined')
  return val;
    else
  return ' ';
}


/* Permet de créer un fichier un fichier TSV à partir d'un objet requete */
function SaveToTSV(requete){
    var sep = ";";//"\t";
    var query = requete.GenererReq();
    var fichier ="";
    var i,col;
    var label;
    //alert(query);
    var result = pgsql_query(query);
    if (result.rowCount>0){
  var tab=requete.TabSelect;
  var max=tab.length;
  if (max>0){
      /* Enregistrement des titres des colonnes */
      for(i=0;i<max;i++){
    if (i>0) fichier+=sep;
    col = tab[i];
    label=mcd_getLabel(ExtractTable(col),DePrefixerChamp(col));
    if (label==""){
        var reg=new RegExp("(_)", "g");
        label=DePrefixerChamp(col).substring(3).replace(reg," ");
    }
    fichier+=label;
      }
      //      alert(fichier);
      /* Enregistrement des lignes */
      var enumr=result.enumerate();
      enumr.beforeFirst();
      var encore=true;
      var value;
      while(encore){
    encore = enumr.next();
    value="";
    //    if (enumr.getVariant(0)!=null && enumr.getVariant(0)!=undefined) 
    value=CleanValue(enumr.getVariant(0));
    fichier+="\n"+value;
    for(i=1;i<max;i++) fichier+=sep+CleanValue(enumr.getVariant(i));
      }
      //alert("Fichier réalisé");
      SaveFile(requete.FromRoot+".csv",fichier);
  } else alert("Il n'y a pas de colonnes à exporter.");
    } else alert("Il n'y a rien à extraire.");
}


function export_SaveToFile(NomFichier,Donnees) {
    try {  
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    } catch (e) {
  alert("Permission pour la sauvegarde non accordée.");
    }
    
    
    
    var rep= Components.classes["@mozilla.org/file/local;1"]
     .createInstance(Components.interfaces.nsILocalFile);
    //rep.initWithPath( CheminAbs );
    if (navigator.platform=='Win32')
  rep.initWithPath( "C:/" );
    else
  rep.initWithPath( "/home/" );
    
    /* dialogue pour sauver le fichier */
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    fp.displayDirectory=rep;
    fp.init(window, "Enregister", nsIFilePicker.modeSave);
    fp.appendFilters(nsIFilePicker.filterAll);
    fp.defaultString = NomFichier;
    
    var rv = fp.show();
    if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace)
   {
      var file = fp.file;
      // work with returned nsILocalFile...
   }
    else
  return;
    
    var path=file.path;
    
    //  var file = Components.classes["@mozilla.org/file/local;1"]
    //    .createInstance(Components.interfaces.nsILocalFile);
    //  file.initWithPath( CheminAbs+NomFichier );
    if ( file.exists() == false ) {
  //    alert( "Creation du fichier... " );
  file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, permissions );
    }
    var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
  .createInstance( Components.interfaces.nsIFileOutputStream );
    /* Open flags 
       #define PR_RDONLY       0x01
       #define PR_WRONLY       0x02
       #define PR_RDWR         0x04
       #define PR_CREATE_FILE  0x08
       #define PR_APPEND      0x10
       #define PR_TRUNCATE     0x20
       #define PR_SYNC         0x40
       #define PR_EXCL         0x80
    */
    /*
    ** File modes ....
    **
    ** CAVEAT: 'mode' is currently only applicable on UNIX platforms.
    ** The 'mode' argument may be ignored by PR_Open on other platforms.
    **
    **   00400   Read by owner.
    **   00200   Write by owner.
    **   00100   Execute (search if a directory) by owner.
    **   00040   Read by group.
    **   00020   Write by group.
    **   00010   Execute by group.
    **   00004   Read by others.
    **   00002   Write by others
    **   00001   Execute by others.
    **
    */
    outputStream.init( file, 0x04 | 0x08 | 0x20, permissions, 0 );
    var result = outputStream.write( Donnees, Donnees.length );
    outputStream.close();
}


//alert("'export.js' chargé");
