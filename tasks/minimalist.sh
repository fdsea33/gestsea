#!/bin/bash
d=/usr/local/bin/scripts
dir=/var/spool/minimalist
cd $dir
psql gestsea -f $d/minimalist.sql
