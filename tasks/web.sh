#!/bin/bash
d=/usr/local/bin/scripts
dir=/home/groupes/comptabilite
cd $d
rm -f joomla.sql*
psql gestsea -f web.sql
mv website_passwords.csv ${dir}/
tar cjvf joomla.sql.tar.bz2 joomla.sql
sudo -u brice scp joomla.sql.tar.bz2 brice@91.121.24.96:Transit
rm -f joomla.sql*
