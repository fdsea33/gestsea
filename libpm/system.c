#include <sys/types.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <unistd.h>
#include <fcntl.h>
#include <math.h>
#include "postgres.h"
#include "utils/palloc.h"
#include "fmgr.h"
#include "blog.h"


Datum execution(PG_FUNCTION_ARGS);
Datum writefile(PG_FUNCTION_ARGS);


//--------------------------------------------
// Fonction permettant d'executer des commandes systeme
PG_FUNCTION_INFO_V1(execution);
Datum execution(PG_FUNCTION_ARGS)
{
  text * in = PG_GETARG_TEXT_P(0);
  int4 len  = VARATT_SIZEP(in)-VARHDRSZ;
  int4 i    = 0;
  //  int * status=0;
  char * commande;

  commande=(char *)palloc((len+1)*sizeof(char));
  commande=memcpy(commande,VARDATA(in),len);
  commande[len]='\0';

  /* On va creer un processus fils pour executer la commande systeme */
  //  if (!fork()) {
  //  blog(commande);
  i=system(commande);
  //  sprintf(texte,"<%s>",commande);
  //  blog(texte);
  //      pfree(commande);
  //  blog("pfree() est OK");
  //  exit(EXIT_SUCCESS);
  /*
  } else {
    wait(status);
  }
  */
  /* On renvoie le code d'erreur */
  PG_RETURN_INT32(i);
}

//--------------------------------------------
// Fonction permettant d'ecrire un fichier
PG_FUNCTION_INFO_V1(writefile);
Datum writefile(PG_FUNCTION_ARGS)
{
  text * text_adresse = PG_GETARG_TEXT_P(0);
  int4 lena  = VARATT_SIZEP(text_adresse)-VARHDRSZ;
  char * adresse;
  text * text_data = PG_GETARG_TEXT_P(1);
  int4 lend  = VARATT_SIZEP(text_data)-VARHDRSZ;
  char * data;
  int fout;

  adresse=(char *)palloc((lena+1)*sizeof(char));
  adresse=memcpy(adresse,VARDATA(text_adresse),lena);
  adresse[lena]='\0';

  data=(char *)palloc((lend+1)*sizeof(char));
  data=memcpy(data,VARDATA(text_data),lend);
  data[lend]='\0';

  blog(adresse);
  blog(data);

  /* On enregistre les data a l'adresse specifiee */
  fout=open(adresse, O_CREAT|O_WRONLY);
  if (fout>-1) {
    write(fout,data,lend);
    close(fout);
  }

  /* On renvoie le code d'erreur */
  PG_RETURN_INT32(fout);
}


