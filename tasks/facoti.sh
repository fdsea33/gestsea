#!/bin/sh
d=/usr/local/bin/scripts
dir=/home/groupes/toutlemonde/Carte_Moisson/Facturation
psql gestsea -f facoti.sql
cp /tmp/FCM_*.pdf ${dir}
cp /tmp/LCM_*.pdf ${dir}
chmod 664 ${dir}/*.pdf
rm /tmp/FCM_*.pdf /tmp/LCM_*.pdf
