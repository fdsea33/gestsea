#!/bin/bash
dir=/home/groupes/toutlemonde/Informatique/Extractions/FDSEA/Historique
last=Dernier_historique
d=/usr/local/bin/scripts
cd /tmp
rm -f $last.csv
psql gestsea -f /usr/local/bin/scripts/histo.sql
mv historique.csv $last.csv
#$d/csv2ods/csv2ods.py $last.ods historique
rm -f $dir/$last.*
mv $last.csv historique*.csv $dir/
