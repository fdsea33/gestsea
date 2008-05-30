#!/usr/bin/python
import csv
reader = csv.reader(open("evo.csv", "rb"))
writer = csv.writer(open("/tmp/evo_clean.csv", "wb"))
prop = 'false'
for row in reader:
    if len(row)>=40:  #==51
        if len(row)>51:
           row  = row[0:50]
        while len(row)<51:
           row += ['']
#        print len(row)
        if row[0]=='[SHEET-CUT]':
#            writer = csv.writer(open("/tmp/evo_b.csv", "wb"))
            prop = 'true'
        row += [prop]
        if row[1]!='' and row[1]!='NUMERO':
            writer.writerow(row)

