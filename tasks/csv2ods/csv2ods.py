#!/usr/bin/python

# csv2ods.py - Python script to convert "csv" file to OpenOffice Calc 2.0 "ods"
# Copyright (C) 2007 Guido Vicino"

# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either
# version 2.1 of the License, or (at your option) any later version.

# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.

# You should have received a copy of the GNU Lesser General Public
# License along with this library; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301 USA

# You can contact me by email at guido.vicino@gmail.com

import string
import sys
import csv

import ooolib

def readCsv(csvFilename):
	dialect = csv.Sniffer().sniff(open(csvFilename, 'r').read())
	return csv.reader(open(csvFilename, 'r'), dialect=dialect)


if len(sys.argv) < 3:
	print 'Usage: %s file.ods file1.csv file2.csv ... fileN.csv' % sys.argv[0]
	sys.exit()
else:
	odc = ooolib.Calc(sys.argv[2])	
	
	for f, csvFile in enumerate(sys.argv[2:]):
		data = readCsv(csvFile)
		
		if(f != 0):		
			odc.new_sheet(csvFile)
		
		for rc, row in enumerate(data):
			for cc, column in enumerate(row):
				try: 
					float(column)
					type = 'float'
				except:
					type = 'string'
#				odc.set_column_property(cc + 1, 'width', '1.5in')
				odc.set_cell_value(cc + 1, rc + 1, type, column)
	
	odc.save(sys.argv[1])
