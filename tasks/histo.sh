#!/bin/bash
d=`date +-%Y%m%d-%H%M`
f=historique${d}.csv
dir=$1
echo "Pour procéder à l'extraction des données de la base, veuillez saisir"
echo "votre mot de passe. Pour annuler appuyez sur les touches Ctrl + C"
psql gestsea $2 -f /usr/local/bin/scripts/histo.sql
mv historique.csv $dir/Versions/$f
rm $dir/Dernier_historique.*
cp $dir/Versions/$f $dir/Dernier_historique.csv
echo "Merci de votre visite"
sleep 2
