const permissions=0777;
const nsIFilePicker = Components.interfaces.nsIFilePicker;
const CheminAbs = "/nopath";

function OpenFileByOS(NomFichier) {
  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  } catch (e) {
    alert("Permission non accordée.");
  }
  var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath( NomFichier );
  file.launch();
}


function SaveFile(NomFichier,Donnees) {
  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  } catch (e) {
    alert("Permission pour la sauvegarde non accordée.");
  }
    
  var rep= Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
  rep.initWithPath( CheminAbs );
    
  /* dialogue pour sauver le fichier */
  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
  fp.displayDirectory=rep;
  fp.init(window, "Enregistrer", nsIFilePicker.modeSave);
  fp.appendFilters(nsIFilePicker.filterAll);
  fp.defaultString = NomFichier;
    
  var rv = fp.show();
  var file;
  if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
    file = fp.file;
    // work with returned nsILocalFile...
  } else return null;
    
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

//function SaveFileDirectly(NomFichier,Donnees) {
function SaveFileDirectly(NomFichier,Donnees) {
  SaveFile(NomFichier,Donnees);
}


function LoadFile(NomFichier) {
  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  } catch (e) {
    alert("Permission pour le chargement non accordée.");
  }
  var file = Components.classes["@mozilla.org/file/local;1"]
      .createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath( NomFichier );
  if ( file.exists() == false ) {
    alert("Ce fichier n'existe pas");
  }
  var is = Components.classes["@mozilla.org/network/file-input-stream;1"]
      .createInstance( Components.interfaces.nsIFileInputStream );
  is.init( file,0x01, 00004, null);
  var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
      .createInstance( Components.interfaces.nsIScriptableInputStream );
  sis.init( is );
  var output = sis.read( sis.available() );
  return output;
}

