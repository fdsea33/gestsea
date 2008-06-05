#!/bin/sh
d=/usr/local/bin/scripts
dir=/home/groupes/toutlemonde/Carte_Moisson/Facturation
day=`date +%Y%m%d`
psql gestsea -f ${d}/facoti.sql
cp /tmp/FCM_*.pdf ${dir}
cp /tmp/LCM_*.pdf ${dir}
cp /tmp/alvea_maj.csv ${dir}/alvea_maj_${day}.csv
chmod 664 ${dir}/*
rm /tmp/FCM_*.pdf /tmp/LCM_*.pdf /tmp/alvea_maj*
