#include <stdio.h>
#include <time.h>
#include <math.h>
#include "blog.h"


static int compteur=0;
static time_t tref;
char *adresse = "/tmp/log.txt";
void local_blog(const char * s);


//-------------------------------------------------------------
// Permet de loguer une action dans un fichier

void blog(const char * s)
{
#ifdef BLOG
  local_blog(s);
#endif
}

//-------------------------------------------------------------
// Fonction qui logue réellement
void local_blog(const char * s)
{
  FILE * flog;
  int diff;
  time_t t;

  if (compteur==0)
    {
      flog = fopen(adresse,"w");
      tref = time(NULL);
    }
  else
    flog = fopen(adresse,"a"); // On efface le fichier à chaque lancement

  t = time(NULL);
  diff = floor(difftime(t,tref));
  fprintf(flog,"[%6i][%6i]> %s\n",diff,compteur,s);
  compteur++;
  fclose(flog);
}
