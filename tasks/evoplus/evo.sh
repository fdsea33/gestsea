#!/bin/sh
day=`date +%Y%m%d-%H%M`
reps=/usr/local/bin/scripts/evoplus
repd=/home/groupes/toutlemonde/Phoning_EVO+
cd ${repd}/Livraisons
echo "*** Enregistrement des fichiers EVO+ ***"
if [ `ls -1 | wc -l` -eq 1 ]; then
  cp *.xls ../Archives/
  mv -f *.xls evo.xls
  rm -f /tmp/evo*.csv
  xls2csv -q3 -b[SHEET-CUT] evo.xls > evo.csv
  ${reps}/evo.py
  psql gestsea $1 -f ${reps}/evo.sql
  if [ -e /tmp/evo_clean.csv ]; then
    cp /tmp/evoplus_reglements.csv ${repd}/Impressions/evoreglements-${day}.csv
    cp /tmp/evolot.pdf ${repd}/Impressions/evolot-${day}.pdf
    rm -f *
    if [ -s ${repd}/Impressions/evolot-${day}.pdf ]; then
      evince ${repd}/Impressions/evolot-${day}.pdf
    else
      echo "Pas de fichier PDF à visualiser"
    fi
  else
    echo "Aucun fichier traité"
  fi
elif [ `ls -1 | wc -l` -gt 1 ]; then
  echo "ATTENTION : Trop de fichiers à traiter"
  echo "CONSEIL : Il faut mettre un et un seul fichier Excel Evoplus dans le dossier toutlemonde/Phoning_EVO+/Livraisons"
else
  echo "ATTENTION : Pas de fichiers à traiter"
  echo "CONSEIL : Il faut mettre un et un seul fichier Excel Evoplus dans le dossier toutlemonde/Phoning_EVO+/Livraisons"
fi

echo ""
echo "*** Appuyer sur n'importe quelle touche pour quitter ***"
read -n1 any_key
