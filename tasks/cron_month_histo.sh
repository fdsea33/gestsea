#!/bin/bash
d=`date +-%Y%m%d-%H%M`
f=historique${d}.csv
dir=/home/groupes/toutlemonde/Informatique/Extractions/FDSEA/Historique
cd /tmp
psql gestsea -f /usr/local/bin/scripts/histo.sql
mv historique.csv $dir/Versions/$f
