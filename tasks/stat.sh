#!/bin/bash
dir=$1
d=/usr/local/bin/scripts
tmp=/tmp/stats-gestsea
echo "Pour procéder à l'extraction des données de la base, veuillez saisir"
echo "votre mot de passe. Pour annuler appuyez sur les touches Ctrl + C"
rm -fr $tmp
mkdir $tmp
chmod 777 $tmp
cd $tmp
psql gestsea $2 -f $d/stat_functions.sql
psql gestsea $2 -f $d/stat_extractions.sql
echo "Mise au format OpenOffice..."
$d/csv2ods/csv2ods.py fdsea_adhesions.ods fdsea_adhesions
$d/csv2ods/csv2ods.py sacea.ods sacea_A_HT sacea_A_QTE sacea_M_HT sacea_M_QTE
$d/csv2ods/csv2ods.py fdsea.ods fdsea_A_HT fdsea_A_QTE fdsea_M_HT fdsea_M_QTE
$d/csv2ods/csv2ods.py aava.ods aava_A_HT aava_A_QTE aava_M_HT aava_M_QTE
echo "Mise au format OpenOffice terminée"
chmod 777 *.*
mv -f *.* $dir/
chmod 777 $dir/*
rm -fr $tmp
echo "Merci de votre visite"
