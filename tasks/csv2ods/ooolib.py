"ooolib-python - Copyright (C) 2006 Joseph Colton"

# ooolib-python - Python module for creating Open Document Format documents.
# Copyright (C) 2006  Joseph Colton

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

# You can contact me by email at josephcolton@gmail.com

# Import Standard Modules
import zipfile
import time
import sys
import glob
import os
import re

def version():
	"Get the ooolib-python version"
	return "ooolib-python-0.0.8"

def clean_string(data):
	"Returns an XML friendly copy of the data string"
	data = str(data)
	data = data.replace('&', '&amp;')
	data = data.replace("'", '&apos;')
	data = data.replace('"', '&quot;')
	data = data.replace('<', '&lt;')
	data = data.replace('>', '&gt;')
	data = data.replace('\t', '<text:tab-stop/>')
	data = data.replace('\n', '<text:line-break/>')
	return data

class XML:
	"XML Class - Used to convert nested lists into XML"
	def __init__(self):
		"Initialize ooolib XML instance"
		pass

	def _xmldata(self, data):
		datatype = data.pop(0)
		datavalue = data.pop(0)
		outstring = '%s' % datavalue
		return outstring

	def _xmltag(self, data):
		outstring = ''
		# First two
		datatype = data.pop(0)
		dataname = data.pop(0)
		outstring = '<%s' % dataname
		# Element Section
		element = 1
		while(data):
			# elements
			newdata = data.pop(0)
			if (newdata[0] == 'element' and element):
				newstring = self._xmlelement(newdata)
				outstring = '%s %s' % (outstring, newstring)
				continue
			if (newdata[0] != 'element' and element):
				element = 0
				outstring = '%s>' % outstring
				if (newdata[0] == 'tag' or newdata[0] == 'tagline'):
					outstring = '%s\n' % outstring
			if (newdata[0] == 'tag'):
				newstring = self._xmltag(newdata)
				outstring = '%s%s' % (outstring, newstring)
				continue
			if (newdata[0] == 'tagline'):
				newstring = self._xmltagline(newdata)
				outstring = '%s%s' % (outstring, newstring)
				continue
			if (newdata[0] == 'data'):
				newstring = self._xmldata(newdata)
				outstring = '%s%s' % (outstring, newstring)
				continue
		if (element):
			element = 0
			outstring = '%s>\n' % outstring
		outstring = '%s</%s>\n' % (outstring, dataname)
		return outstring

	def _xmltagline(self, data):
		outstring = ''
		# First two
		datatype = data.pop(0)
		dataname = data.pop(0)
		outstring = '<%s' % dataname
		# Element Section
		while(data):
			# elements
			newdata = data.pop(0)
			if (newdata[0] != 'element'): break
			newstring = self._xmlelement(newdata)
			outstring = '%s %s' % (outstring, newstring)
		outstring = '%s/>\n' % outstring
		# Non-Element Section should not exist
		return outstring

	def _xmlelement(self, data):
		datatype = data.pop(0)
		dataname = data.pop(0)
		datavalue = data.pop(0)
		outstring = '%s="%s"' % (dataname, datavalue)	
		return outstring

	def convert(self, data):
		"""Convert nested lists into XML

		The convert method takes a nested lists and converts them
		into XML to be used in Open Document Format documents.
		There are three types of lists that are recognized at this
		time.  They are as follows:

		'tag' - Tag opens a set of data that is eventually closed
		with a similar tag.
		List: ['tag', 'xml']
		XML: <xml></xml>

		'tagline' - Taglines are similar to tags, except they open
		and close themselves.
		List: ['tagline', 'xml']
		XML: <xml/>

		'element' - Elements are pieces of information stored in an
		opening tag or tagline.
		List: ['element', 'color', 'blue']
		XML: color="blue"

		'data' - Data is plain text directly inserted into the XML
		document.
		List: ['data', 'hello']
		XML: hello

		Bring them all together for something like this.

		Lists:
		['tag', 'xml', ['element', 'a', 'b'], ['tagline', 'xml2'], 
		['data', 'asdf']]

		XML:
		<xml a="b"><xml2/>asdf</xml>
		"""
		outlines = []
		outlines.append('<?xml version="1.0" encoding="UTF-8"?>')
		if (type(data) == type([]) and len(data) > 0):
			if data[0] == 'tag': outlines.append(self._xmltag(data))
		return outlines

class Meta:
	"Meta Data Class"

	def __init__(self, doctype):
		self.doctype = doctype
		self.meta_generator = version()       # The generator should always default to the version number
		self.meta_title = ''
		self.meta_subject = ''
		self.meta_description = ''
		self.meta_keywords = []
		self.meta_creator = 'ooolib-python'
		self.meta_editor = ''
		self.meta_user1_name = 'Info 1'
		self.meta_user2_name = 'Info 2'
		self.meta_user3_name = 'Info 3'
		self.meta_user4_name = 'Info 4'
		self.meta_user1_value = ''
		self.meta_user2_value = ''
		self.meta_user3_value = ''
		self.meta_user4_value = ''
		self.meta_creation_date = self.meta_time()

	def set_meta(self, metaname, value):
		"""Set meta data in your document.

		Currently implemented metaname options are as follows:
		'creator' - The document author
		"""
		if metaname == 'creator': self.meta_creator = value
		if metaname == 'editor': self.meta_editor = value
		if metaname == 'title': self.meta_title = value
		if metaname == 'subject': self.meta_subject = value
		if metaname == 'description': self.meta_description = value
		if metaname == 'user1name': self.meta_user1_name = value
		if metaname == 'user2name': self.meta_user2_name = value
		if metaname == 'user3name': self.meta_user3_name = value
		if metaname == 'user4name': self.meta_user4_name = value
		if metaname == 'user1value': self.meta_user1_value = value
		if metaname == 'user2value': self.meta_user2_value = value
		if metaname == 'user3value': self.meta_user3_value = value
		if metaname == 'user4value': self.meta_user4_value = value
		if metaname == 'keyword':
			if value not in self.meta_keywords:
				self.meta_keywords.append(value)

	def meta_time(self):
		"Return time string in meta data format"
		t = time.localtime()
		stamp = "%04d-%02d-%02dT%02d:%02d:%02d" % (t[0], t[1], t[2], t[3], t[4], t[5])
		return stamp

	def get_meta(self):
		"Generate meta.xml file data"
		self.meta_date = self.meta_time()
		self.data = ['tag', 'office:document-meta',
		  ['element', 'xmlns:office', 'urn:oasis:names:tc:opendocument:xmlns:office:1.0'],
		  ['element', 'xmlns:xlink', 'http://www.w3.org/1999/xlink'],
		  ['element', 'xmlns:dc', 'http://purl.org/dc/elements/1.1/'],
		  ['element', 'xmlns:meta', 'urn:oasis:names:tc:opendocument:xmlns:meta:1.0'],
		  ['element', 'xmlns:ooo', 'http://openoffice.org/2004/office'],
		  ['element', 'office:version', '1.0'],
		  ['tag', 'office:meta',
		    ['tag', 'meta:generator',             # Was: 'OpenOffice.org/2.0$Linux OpenOffice.org_project/680m5$Build-9011'
		      ['data', self.meta_generator]],     # Generator is set the the ooolib-python version.
		    ['tag', 'dc:title',
		      ['data', self.meta_title]],         # This data is the document title
		    ['tag', 'dc:description',
		      ['data', self.meta_description]],   # This data is the document description
		    ['tag', 'dc:subject',
		      ['data', self.meta_subject]],       # This data is the document subject
		    ['tag', 'meta:initial-creator',
		      ['data', self.meta_creator]],       # This data is the document creator
		    ['tag', 'meta:creation-date',
		      ['data', self.meta_creation_date]], # This is the original creation date of the document
		    ['tag', 'dc:creator',
		      ['data', self.meta_editor]],        # This data is the document editor
		    ['tag', 'dc:date',
		      ['data', self.meta_date]],          # This is the last modified date of the document
		    ['tag', 'dc:language',
		      ['data', 'en-US']],                 # We will probably always use en-US for language
		    ['tag', 'meta:editing-cycles',
		      ['data', '1']],                     # Edit cycles will probably always be 1 for generated documents
		    ['tag', 'meta:editing-duration',
		      ['data', 'PT0S']],                  # Editing duration is modified - creation date
		    ['tag', 'meta:user-defined',
		      ['element', 'meta:name', self.meta_user1_name],
		      ['data', self.meta_user1_value]],
		    ['tag', 'meta:user-defined',
		      ['element', 'meta:name', self.meta_user2_name],
		      ['data', self.meta_user2_value]],
		    ['tag', 'meta:user-defined',
		      ['element', 'meta:name', self.meta_user3_name],
		      ['data', self.meta_user3_value]],
		    ['tag', 'meta:user-defined',
		      ['element', 'meta:name', self.meta_user4_name],
		      ['data', self.meta_user4_value]]]]
#		    ['tagline', 'meta:document-statistic',
#		      ['element', 'meta:table-count', len(self.sheets)], # len(self.sheets) ?
#		      ['element', 'meta:cell-count', '15']]]] # Not sure how to keep track

		# Generate content.xml XML data
		xml = XML()
		self.lines = xml.convert(self.data)
		self.filedata = '\n'.join(self.lines)
		# Return generated data
		return self.filedata



class CalcStyles:
	"Calc Style Management - Used to keep track of created styles."

	def __init__(self):
		self.style_config = {}
		# Style Counters
		self.style_table = 1
		self.style_column = 1
		self.style_row = 1
		self.style_cell = 1
		# Style Properties (Defaults) - To be used later
		self.property_column_width_default = '0.8925in' # Default Column Width
		self.property_row_height_default = '0.189in'    # Default Row Height
		# Set Defaults
		self.property_column_width = '0.8925in' # Default Column Width
		self.property_row_height = '0.189in'    # Default Row Height
		self.property_cell_bold = False         # Bold off be default
		self.property_cell_italic = False       # Italic off be default
		self.property_cell_underline = False    # Underline off be default
		self.property_cell_fg_color = 'default' # Text Color Default
		self.property_cell_bg_color = 'default' # Cell Background Default


	def get_next_style(self, style):
		"Returns the next style code for the given style"
		style_code = ""
		if style == 'table':
			style_code = 'ta%d' % self.style_table
			self.style_table+=1
		if style == 'column':
			style_code = 'co%d' % self.style_column
			self.style_column+=1
		if style == 'row':
			style_code = 'ro%d' % self.style_row
			self.style_row+=1
		if style == 'cell':
			style_code = 'ce%d' % self.style_cell
			self.style_cell+=1
		return style_code

	def set_property(self, style, name, value):
		"Sets a property which will later be turned into a code"
		if style == 'table':
			pass
		if style == 'column':
			if name == 'style:column-width': self.property_column_width = value
		if style == 'row':
			if name == 'style:row-height': self.property_row_height = value
		if style == 'cell':
			if name == 'bold' and type(value) == type(True): self.property_cell_bold = value
			if name == 'italic' and type(value) == type(True): self.property_cell_italic = value
			if name == 'underline' and type(value) == type(True): self.property_cell_underline = value
			if name == 'color':
				self.property_cell_fg_color = 'default'
				redata = re.search("^(#[\da-fA-F]{6})$", value)
				if redata: self.property_cell_fg_color = value.lower()
			if name == 'background':
				self.property_cell_bg_color = 'default'
				redata = re.search("^(#[\da-fA-F]{6})$", value)
				if redata: self.property_cell_bg_color = value.lower()

	def get_style_code(self, style):
		style_code = ""
		if style == 'table':
			style_code = "ta1"
		if style == 'column':
			style_data = tuple([style,
				('style:column-width', self.property_column_width)])
			if style_data in self.style_config:
				# Style Exists, return code
				style_code = self.style_config[style_data]
			else:
				# Style does not exist, create code and return it
				style_code = self.get_next_style(style)
				self.style_config[style_data] = style_code
		if style == 'row':
			style_data = tuple([style,
				('style:row-height', self.property_row_height)])
			if style_data in self.style_config:
				# Style Exists, return code
				style_code = self.style_config[style_data]
			else:
				# Style does not exist, create code and return it
				style_code = self.get_next_style(style)
				self.style_config[style_data] = style_code
		if style == 'cell':
			style_data = [style]
			# Add additional styles
			if self.property_cell_bold: style_data.append(('bold', True))
			if self.property_cell_italic: style_data.append(('italic', True))
			if self.property_cell_underline: style_data.append(('underline', True))
			if self.property_cell_fg_color != 'default': style_data.append(('color', self.property_cell_fg_color))
			if self.property_cell_bg_color != 'default': style_data.append(('background', self.property_cell_bg_color))
			style_data = tuple(style_data)
			if style_data in self.style_config:
				# Style Exists, return code
				style_code = self.style_config[style_data]
			else:
				# Style does not exist, create code and return it
				style_code = self.get_next_style(style)
				self.style_config[style_data] = style_code
		return style_code

	def get_automatic_styles(self):
		"Return 'office:automatic-styles' lists"
		automatic_styles = ['tag', 'office:automatic-styles']

		for style_data in self.style_config:
			style_code = self.style_config[style_data]
			style_data = list(style_data)
			style = style_data.pop(0)

			if style == 'column':
				style_list = ['tag', 'style:style',
				  ['element', 'style:name', style_code],            # Column 'co1' properties
				  ['element', 'style:family', 'table-column']]
				tagline = ['tagline', 'style:table-column-properties',
				  ['element', 'fo:break-before', 'auto']]      # unsure what break before means

				for set in style_data:
					name, value = set
					if name == 'style:column-width':
						tagline.append(['element', 'style:column-width', value])
				style_list.append(tagline)
				automatic_styles.append(style_list)

			if style == 'row':
				style_list = ['tag', 'style:style',
				  ['element', 'style:name', style_code],            # Column 'ro1' properties
				  ['element', 'style:family', 'table-row']]
				tagline = ['tagline', 'style:table-row-properties']

				for set in style_data:
					name, value = set
					if name == 'style:row-height':
						tagline.append(['element', 'style:row-height', value])
				tagline.append(['element', 'fo:break-before', 'auto'])
#				tagline.append(['element', 'style:use-optimal-row-height', 'true']) # Overrides settings
				style_list.append(tagline)
				automatic_styles.append(style_list)

			if style == 'cell':
				style_list = ['tag', 'style:style',
		  		  ['element', 'style:name', style_code],             # ce1 style
				  ['element', 'style:family', 'table-cell'],         # cell
				  ['element', 'style:parent-style-name', 'Default']] # parent is Default

				# Cell Properties
				tagline = ['tagline', 'style:table-cell-properties']
				for set in style_data:
					name, value = set
					if name == 'background':
						tagline.append(['element', 'fo:background-color', value])
				style_list.append(tagline)

				# Text Properties
				tagline = ['tagline', 'style:text-properties']
				for set in style_data:
					name, value = set
					if name == 'bold':
						tagline.append(['element', 'fo:font-weight', 'bold'])
					if name == 'italic':
						tagline.append(['element', 'fo:font-style', 'italic'])
					if name == 'underline':
						tagline.append(['element', 'style:text-underline-style', 'solid'])
						tagline.append(['element', 'style:text-underline-width', 'auto'])
						tagline.append(['element', 'style:text-underline-color', 'font-color'])
					if name == 'color':
						tagline.append(['element', 'fo:color', value])
				style_list.append(tagline)

				automatic_styles.append(style_list)
				

		# Attach ta1 style
		automatic_styles.append(['tag', 'style:style',
		  ['element', 'style:name', 'ta1'],
		  ['element', 'style:family', 'table'],
		  ['element', 'style:master-page-name', 'Default'],
		  ['tagline', 'style:table-properties',
		    ['element', 'table:display', 'true'],
		    ['element', 'style:writing-mode', 'lr-tb']]])


		return automatic_styles



class CalcSheet:
	"Calc Sheet Class - Used to keep track of the data for an individual sheet."

	def __init__(self, sheetname):
		"Initialize a sheet"
		self.sheet_name = sheetname
		self.sheet_values = {}
		self.sheet_config = {}
		self.max_col = 0
		self.max_row = 0

	def clean_formula(self, data):
		"Returns a formula for use in ODF"
		# Example Translations
		# '=SUM(A1:A2)'
		# datavalue = 'oooc:=SUM([.A1:.A2])'
		data = str(data)
		redata = re.search('^=([A-Z]+)\(([A-Z0-9:]+)\)$', data)
		if redata:
			funct = redata.group(1)
			parts = redata.group(2).split(':')
			nparts = []
			while parts:
				part = parts.pop(0)
				part = '.%s' % part
				nparts.append(part)
			parts = ':'.join(nparts)
			data = 'oooc:=%s([%s])' % (funct, parts)
		return data

	def get_name(self):
		"Returns the sheet name"
		return self.sheet_name

	def get_sheet_values(self):
		"Returns the sheet cell values"
		return self.sheet_values

	def get_sheet_config(self):
		"Returns the sheet cell properties"
		return self.sheet_config

	def set_sheet_config(self, location, style_code):
		"Sets Style Code for a given location"
		self.sheet_config[location] = style_code

	def set_sheet_value(self, cell, datatype, datavalue):
		"""Sets the value for a specific cell

		cell must be in the format (col, row) where row and col are int.
		Example: B5 would be written as (2, 5)
		datatype must be one of 'string', 'float', 'formula'
		datavalue should be a string
		"""
		# Catch invalid data
		if type(cell) != type(()) or len(cell) != 2:
			print "Invalid Cell"
			return
		(col, row) = cell
		if type(col) != type(1):
			print "Invalid Cell"
			return
		if type(row) != type(1):
			print "Invalid Cell"
			return
		# Fix String Data
		if datatype == 'string':
			datavalue = clean_string(datavalue)
		# Fix Formula Data
		if datatype == 'formula':
			datavalue = self.clean_formula(datavalue)
		# Adjust maximum sizes
		if col > self.max_col: self.max_col = col
		if row > self.max_row: self.max_row = row
		datatype = str(datatype)
		if (datatype != 'string' and datatype != 'float' and datatype != 'formula'):
			# Set all unknown cell types to string
			datatype = 'string'
		datavalue = str(datavalue)
		self.sheet_values[cell] = (datatype, datavalue)

	def get_lists(self):
		"Returns nested lists for XML processing"
		if (self.max_col == 0 and self.max_row == 0):
			sheet_lists = ['tag', 'table:table',
			  ['element', 'table:name', self.sheet_name], # Set the Sheet Name
			  ['element', 'table:style-name', 'ta1'],
			  ['element', 'table:print', 'false'],
			  ['tagline', 'table:table-column',
			    ['element', 'table:style-name', 'co1'],
			    ['element', 'table:default-cell-style-name', 'Default']],
			    ['tag', 'table:table-row',
			      ['element', 'table:style-name', 'ro1'],
			      ['tagline', 'table:table-cell']]]
		else:
			# Base Information
			sheet_lists = ['tag', 'table:table',
			  ['element', 'table:name', self.sheet_name], # Set the sheet name
			  ['element', 'table:style-name', 'ta1'],
			  ['element', 'table:print', 'false']]

#			  ['tagline', 'table:table-column',
#			    ['element', 'table:style-name', 'co1'],
#			    ['element', 'table:number-columns-repeated', self.max_col], # max_col? '2'
#			    ['element', 'table:default-cell-style-name', 'Default']],

			# Need to add column information			
			for col in range(1, self.max_col+1):
				location = ('col', col)
				style_code = 'co1'
				if location in self.sheet_config:
					style_code = self.sheet_config[location]
				sheet_lists.append(['tagline', 'table:table-column',
				  ['element', 'table:style-name', style_code],
				  ['element', 'table:default-cell-style-name', 'Default']])


			# Need to create each row
			for row in range(1, self.max_row + 1):
				location = ('row', row)
				style_code = 'ro1'
				if location in self.sheet_config:
					style_code = self.sheet_config[location]				
				rowlist = ['tag', 'table:table-row',
				  ['element', 'table:style-name', style_code]]
				for col in range(1, self.max_col + 1):
					cell = (col, row)
					style_code = 'ce1'                           # Default all cells to ce1
					if cell in self.sheet_config:
						style_code = self.sheet_config[cell] # Lookup cell if available
					if cell in self.sheet_values:
						(datatype, datavalue) = self.sheet_values[cell]
						collist = ['tag', 'table:table-cell']
						if style_code != 'ce1':
							collist.append(['element', 'table:style-name', style_code])
						if datatype == 'float':
							collist.append(['element', 'office:value-type', datatype])
							collist.append(['element', 'office:value', datavalue])
							collist.append(['tag', 'text:p',
							  ['data', datavalue]])
						if datatype == 'string':
							collist.append(['element', 'office:value-type', datatype])
							collist.append(['tag', 'text:p',
							  ['data', datavalue]])
						if datatype == 'formula':
							# '=SUM(A1:A2)'
							# datavalue = 'oooc:=SUM([.A1:.A2])'
							collist.append(['element', 'table:formula', datavalue])
							collist.append(['element', 'office:value-type', 'float'])
							collist.append(['element', 'office:value', '0'])
							collist.append(['tag', 'text:p',
							  ['data', '0']])
					else:
						collist = ['tagline', 'table:table-cell']
					rowlist.append(collist)
				sheet_lists.append(rowlist)
		return sheet_lists

class Calc:
	"Calc Class - Used to create OpenDocument Format Calc Spreadsheets."
	def __init__(self, sheetname=None):
		"Initialize ooolib Calc instance"
		# Default to no debugging
		self.debug = False
		if not sheetname: sheetname = "Sheet1"
		self.sheets = [CalcSheet(sheetname)]  # The main sheet will be initially called 'Sheet1'
		self.sheet_index = 0                  # We initially start on the first sheet
		self.styles = CalcStyles()
		self.meta = Meta('ods')
		self.styles.get_style_code('column')  # Force generation of default column
		self.styles.get_style_code('row')     # Force generation of default row
		self.styles.get_style_code('table')   # Force generation of default table
		self.styles.get_style_code('cell')    # Force generation of default cell

	def debug_level(self, level):
		"""Set debug level:
		True if you want debugging messages
		False if you do not.
		"""
		self.debug = level

	def set_meta(self, metaname, value):
		"Set meta data in your document."
		self.meta.set_meta(metaname, value)

	def set_column_property(self, column, name, value):
		"Set Column Properties"
		if name == 'width':
			# column number column needs column-width set to value
			self.styles.set_property('column', 'style:column-width', value)
			style_code = self.styles.get_style_code('column')
			self.sheets[self.sheet_index].set_sheet_config(('col', column), style_code)

	def set_row_property(self, row, name, value):
		"Set row Properties"
		if name == 'height':
			# row number row needs row-height set to value
			self.styles.set_property('row', 'style:row-height', value)
			style_code = self.styles.get_style_code('row')
			self.sheets[self.sheet_index].set_sheet_config(('row', row), style_code)

	def set_cell_property(self, name, value):
		"""Turn and off cell properties

		Actual application of properties is handled by setting a value."""
		self.styles.set_property('cell', name, value)

	def get_sheet_index(self):
		"Return the current sheet index number"
		return self.sheet_index

	def set_sheet_index(self, index):
		"Set the sheet index"
		if type(index) == type(1):
			if index >= 0 and index < len(self.sheets):
				self.sheet_index = index
		return self.sheet_index

	def new_sheet(self, sheetname):
		"Create a new sheet"
		self.sheet_index = len(self.sheets)
		self.sheets.append(CalcSheet(sheetname))
		return self.sheet_index

	def set_cell_value(self, col, row, datatype, value):
		"Set the value for a given cell"
		self.sheets[self.sheet_index].set_sheet_value((col, row), datatype, value)
		style_code = self.styles.get_style_code('cell')
		self.sheets[self.sheet_index].set_sheet_config((col, row), style_code)

	def save(self, filename):
		"""Save .ods spreadsheet.

		The save function saves the current cells and settings into a document.
		"""
		if self.debug: print "Writing %s" % filename
		self.savefile = zipfile.ZipFile(filename, "w")
		if self.debug: print "  meta.xml"
		self._zip_insert(self.savefile, "meta.xml", self.meta.get_meta())
		if self.debug: print "  mimetype"
		self._zip_insert(self.savefile, "mimetype", "application/vnd.oasis.opendocument.spreadsheet")
		if self.debug: print "  Configurations2/accelerator/current.xml"
		self._zip_insert(self.savefile, "Configurations2/accelerator/current.xml", "")
		if self.debug: print "  META-INF/manifest.xml"
		self._zip_insert(self.savefile, "META-INF/manifest.xml", self._ods_manifest())
		if self.debug: print "  content.xml"
		self._zip_insert(self.savefile, "content.xml", self._ods_content())
		if self.debug: print "  settings.xml"
		self._zip_insert(self.savefile, "settings.xml", self._ods_settings())
		if self.debug: print "  styles.xml"
		self._zip_insert(self.savefile, "styles.xml", self._ods_styles())

	def _zip_insert(self, file, filename, data):
		now = time.localtime(time.time())[:6]
		info = zipfile.ZipInfo(filename)
		info.date_time = now
		info.compress_type = zipfile.ZIP_DEFLATED
		file.writestr(info, data)

	def _ods_content(self):
		"Generate ods content.xml data"

		# This will list all of the sheets in the document
		self.sheetdata = ['tag', 'office:spreadsheet']
		for sheet in self.sheets:
			if self.debug:	
				sheet_name = sheet.get_name()
				print "    Creating Sheet '%s'" % sheet_name
			sheet_list = sheet.get_lists()
			self.sheetdata.append(sheet_list)
		# Automatic Styles
		self.automatic_styles = self.styles.get_automatic_styles()

		self.data = ['tag', 'office:document-content',
		  ['element', 'xmlns:office', 'urn:oasis:names:tc:opendocument:xmlns:office:1.0'],
		  ['element', 'xmlns:style', 'urn:oasis:names:tc:opendocument:xmlns:style:1.0'],
		  ['element', 'xmlns:text', 'urn:oasis:names:tc:opendocument:xmlns:text:1.0'],
		  ['element', 'xmlns:table', 'urn:oasis:names:tc:opendocument:xmlns:table:1.0'],
		  ['element', 'xmlns:draw', 'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0'],
		  ['element', 'xmlns:fo', 'urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0'],
		  ['element', 'xmlns:xlink', 'http://www.w3.org/1999/xlink'],
		  ['element', 'xmlns:dc', 'http://purl.org/dc/elements/1.1/'],
		  ['element', 'xmlns:meta', 'urn:oasis:names:tc:opendocument:xmlns:meta:1.0'],
		  ['element', 'xmlns:number', 'urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0'],
		  ['element', 'xmlns:svg', 'urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0'],
		  ['element', 'xmlns:chart', 'urn:oasis:names:tc:opendocument:xmlns:chart:1.0'],
		  ['element', 'xmlns:dr3d', 'urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0'],
		  ['element', 'xmlns:math', 'http://www.w3.org/1998/Math/MathML'],
		  ['element', 'xmlns:form', 'urn:oasis:names:tc:opendocument:xmlns:form:1.0'],
		  ['element', 'xmlns:script', 'urn:oasis:names:tc:opendocument:xmlns:script:1.0'],
		  ['element', 'xmlns:ooo', 'http://openoffice.org/2004/office'],
		  ['element', 'xmlns:ooow', 'http://openoffice.org/2004/writer'],
		  ['element', 'xmlns:oooc', 'http://openoffice.org/2004/calc'],
		  ['element', 'xmlns:dom', 'http://www.w3.org/2001/xml-events'],
		  ['element', 'xmlns:xforms', 'http://www.w3.org/2002/xforms'],
		  ['element', 'xmlns:xsd', 'http://www.w3.org/2001/XMLSchema'],
		  ['element', 'xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance'],
		  ['element', 'office:version', '1.0'],
		  ['tagline', 'office:scripts'],
		  ['tag', 'office:font-face-decls',
		    ['tagline', 'style:font-face',
		      ['element', 'style:name', 'DejaVu Sans'],
		      ['element', 'svg:font-family', '&apos;DejaVu Sans&apos;'],
		      ['element', 'style:font-pitch', 'variable']],
		    ['tagline', 'style:font-face',
		      ['element', 'style:name', 'Nimbus Sans L'],
		      ['element', 'svg:font-family', '&apos;Nimbus Sans L&apos;'],
		      ['element', 'style:font-family-generic', 'swiss'],
		      ['element', 'style:font-pitch', 'variable']]],

		# Automatic Styles
		self.automatic_styles,

		  ['tag', 'office:body',
		    self.sheetdata]]                                      # Sheets are generated from the CalcSheet class

		# Generate content.xml XML data
		xml = XML()
		self.lines = xml.convert(self.data)
		self.filedata = '\n'.join(self.lines)
		# Return generated data
		return self.filedata

	def _ods_manifest(self):
		"Generate ods manifest.xml data"
		self.data = ['tag', 'manifest:manifest',
		  ['element', 'xmlns:manifest', 'urn:oasis:names:tc:opendocument:xmlns:manifest:1.0'],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'application/vnd.oasis.opendocument.spreadsheet'],
		    ['element', 'manifest:full-path', '/']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'application/vnd.sun.xml.ui.configuration'],
		    ['element', 'manifest:full-path', 'Configurations2/']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', ''],
		    ['element', 'manifest:full-path', 'Configurations2/accelerator/']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', ''],
		    ['element', 'manifest:full-path', 'Configurations2/accelerator/current.xml']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'content.xml']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'styles.xml']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'meta.xml']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'settings.xml']]]

		# Generate content.xml XML data
		xml = XML()
		self.lines = xml.convert(self.data)
		self.filedata = '\n'.join(self.lines)
		# Return generated data
		return self.filedata


	def _ods_settings(self):
		"Generate ods settings.xml data"
		self.data = ['tag', 'office:document-settings',
		  ['element', 'xmlns:office', 'urn:oasis:names:tc:opendocument:xmlns:office:1.0'],
		  ['element', 'xmlns:xlink', 'http://www.w3.org/1999/xlink'],
		  ['element', 'xmlns:config', 'urn:oasis:names:tc:opendocument:xmlns:config:1.0'],
		  ['element', 'xmlns:ooo', 'http://openoffice.org/2004/office'],
		  ['element', 'office:version', '1.0'],
		  ['tag', 'office:settings',
		    ['tag', 'config:config-item-set',
		      ['element', 'config:name', 'ooo:view-settings'],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'VisibleAreaTop'],
		        ['element', 'config:type', 'int'],
		        ['data', '0']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'VisibleAreaLeft'],
		        ['element', 'config:type', 'int'],
		        ['data', '0']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'VisibleAreaWidth'],
		        ['element', 'config:type', 'int'],
		        ['data', '6774']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'VisibleAreaHeight'],
		        ['element', 'config:type', 'int'],
		        ['data', '2389']],
		      ['tag', 'config:config-item-map-indexed',
		        ['element', 'config:name', 'Views'],
		        ['tag', 'config:config-item-map-entry',
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ViewId'],
		            ['element', 'config:type', 'string'],
		            ['data', 'View1']],
		          ['tag', 'config:config-item-map-named',
		            ['element', 'config:name', 'Tables'],
		            ['tag', 'config:config-item-map-entry',
		              ['element', 'config:name', 'Sheet1'],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'CursorPositionX'], # Cursor Position A
		                ['element', 'config:type', 'int'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'CursorPositionY'], # Cursor Position 1
		                ['element', 'config:type', 'int'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'HorizontalSplitMode'],
		                ['element', 'config:type', 'short'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'VerticalSplitMode'],
		                ['element', 'config:type', 'short'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'HorizontalSplitPosition'],
		                ['element', 'config:type', 'int'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'VerticalSplitPosition'],
		                ['element', 'config:type', 'int'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'ActiveSplitRange'],
		                ['element', 'config:type', 'short'],
		                ['data', '2']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'PositionLeft'],
		                ['element', 'config:type', 'int'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'PositionRight'],
		                ['element', 'config:type', 'int'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'PositionTop'],
		                ['element', 'config:type', 'int'],
		                ['data', '0']],
		              ['tag', 'config:config-item',
		                ['element', 'config:name', 'PositionBottom'],
		                ['element', 'config:type', 'int'],
		                ['data', '0']]]],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ActiveTable'],
		            ['element', 'config:type', 'string'],
		            ['data', 'Sheet1']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'HorizontalScrollbarWidth'],
		            ['element', 'config:type', 'int'],
		            ['data', '270']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ZoomType'],
		            ['element', 'config:type', 'short'],
		            ['data', '0']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ZoomValue'],
		            ['element', 'config:type', 'int'],
		            ['data', '100']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'PageViewZoomValue'],
		            ['element', 'config:type', 'int'],
		            ['data', '60']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ShowPageBreakPreview'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'false']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ShowZeroValues'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ShowNotes'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ShowGrid'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'GridColor'],
		            ['element', 'config:type', 'long'],
		            ['data', '12632256']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'ShowPageBreaks'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'HasColumnRowHeaders'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'HasSheetTabs'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'IsOutlineSymbolsSet'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'IsSnapToRaster'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'false']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'RasterIsVisible'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'false']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'RasterResolutionX'],
		            ['element', 'config:type', 'int'],
		            ['data', '1270']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'RasterResolutionY'],
		            ['element', 'config:type', 'int'],
		            ['data', '1270']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'RasterSubdivisionX'],
		            ['element', 'config:type', 'int'],
		            ['data', '1']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'RasterSubdivisionY'],
		            ['element', 'config:type', 'int'],
		            ['data', '1']],
		          ['tag', 'config:config-item',
		            ['element', 'config:name', 'IsRasterAxisSynchronized'],
		            ['element', 'config:type', 'boolean'],
		            ['data', 'true']]]]],
		    ['tag', 'config:config-item-set',
		      ['element', 'config:name', 'ooo:configuration-settings'],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'ShowZeroValues'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'ShowNotes'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'ShowGrid'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'GridColor'],
		        ['element', 'config:type', 'long'],
		        ['data', '12632256']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'ShowPageBreaks'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'LinkUpdateMode'],
		        ['element', 'config:type', 'short'],
		        ['data', '3']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'HasColumnRowHeaders'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'HasSheetTabs'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'IsOutlineSymbolsSet'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'IsSnapToRaster'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'false']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'RasterIsVisible'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'false']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'RasterResolutionX'],
		        ['element', 'config:type', 'int'],
		        ['data', '1270']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'RasterResolutionY'],
		        ['element', 'config:type', 'int'],
		        ['data', '1270']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'RasterSubdivisionX'],
		        ['element', 'config:type', 'int'],
		        ['data', '1']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'RasterSubdivisionY'],
		        ['element', 'config:type', 'int'],
		        ['data', '1']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'IsRasterAxisSynchronized'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'AutoCalculate'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'PrinterName'],
		        ['element', 'config:type', 'string'],
		        ['data', 'Generic Printer']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'PrinterSetup'],
		        ['element', 'config:type', 'base64Binary'],
		        ['data', 'YgH+/0dlbmVyaWMgUHJpbnRlcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU0dFTlBSVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAAMAqAAAAAAA//8FAFZUAAAkbQAASm9iRGF0YSAxCnByaW50ZXI9R2VuZXJpYyBQcmludGVyCm9yaWVudGF0aW9uPVBvcnRyYWl0CmNvcGllcz0xCnNjYWxlPTEwMAptYXJnaW5kYWp1c3RtZW50PTAsMCwwLDAKY29sb3JkZXB0aD0yNApwc2xldmVsPTAKY29sb3JkZXZpY2U9MApQUERDb250ZXhEYXRhClBhZ2VTaXplOkxldHRlcgAA']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'ApplyUserData'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'CharacterCompressionType'],
		        ['element', 'config:type', 'short'],
		        ['data', '0']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'IsKernAsianPunctuation'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'false']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'SaveVersionOnClose'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'false']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'UpdateFromTemplate'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'false']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'AllowPrintJobCancel'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'true']],
		      ['tag', 'config:config-item',
		        ['element', 'config:name', 'LoadReadonly'],
		        ['element', 'config:type', 'boolean'],
		        ['data', 'false']]]]]

		# Generate content.xml XML data
		xml = XML()
		self.lines = xml.convert(self.data)
		self.filedata = '\n'.join(self.lines)
		# Return generated data
		return self.filedata


	def _ods_styles(self):
		"Generate ods styles.xml data"
		self.data = ['tag', 'office:document-styles',
		  ['element', 'xmlns:office', 'urn:oasis:names:tc:opendocument:xmlns:office:1.0'],
		  ['element', 'xmlns:style', 'urn:oasis:names:tc:opendocument:xmlns:style:1.0'],
		  ['element', 'xmlns:text', 'urn:oasis:names:tc:opendocument:xmlns:text:1.0'],
		  ['element', 'xmlns:table', 'urn:oasis:names:tc:opendocument:xmlns:table:1.0'],
		  ['element', 'xmlns:draw', 'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0'],
		  ['element', 'xmlns:fo', 'urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0'],
		  ['element', 'xmlns:xlink', 'http://www.w3.org/1999/xlink'],
		  ['element', 'xmlns:dc', 'http://purl.org/dc/elements/1.1/'],
		  ['element', 'xmlns:meta', 'urn:oasis:names:tc:opendocument:xmlns:meta:1.0'],
		  ['element', 'xmlns:number', 'urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0'],
		  ['element', 'xmlns:svg', 'urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0'],
		  ['element', 'xmlns:chart', 'urn:oasis:names:tc:opendocument:xmlns:chart:1.0'],
		  ['element', 'xmlns:dr3d', 'urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0'],
		  ['element', 'xmlns:math', 'http://www.w3.org/1998/Math/MathML'],
		  ['element', 'xmlns:form', 'urn:oasis:names:tc:opendocument:xmlns:form:1.0'],
		  ['element', 'xmlns:script', 'urn:oasis:names:tc:opendocument:xmlns:script:1.0'],
		  ['element', 'xmlns:ooo', 'http://openoffice.org/2004/office'],
		  ['element', 'xmlns:ooow', 'http://openoffice.org/2004/writer'],
		  ['element', 'xmlns:oooc', 'http://openoffice.org/2004/calc'],
		  ['element', 'xmlns:dom', 'http://www.w3.org/2001/xml-events'],
		  ['element', 'office:version', '1.0'],
		  ['tag', 'office:font-face-decls',
		    ['tagline', 'style:font-face',
		      ['element', 'style:name', 'DejaVu Sans'],
		      ['element', 'svg:font-family', '&apos;DejaVu Sans&apos;'],
		      ['element', 'style:font-pitch', 'variable']],
		    ['tagline', 'style:font-face',
		      ['element', 'style:name', 'Nimbus Sans L'],
		      ['element', 'svg:font-family', '&apos;Nimbus Sans L&apos;'],
		      ['element', 'style:font-family-generic', 'swiss'],
		      ['element', 'style:font-pitch', 'variable']]],
		  ['tag', 'office:styles',
		    ['tag', 'style:default-style',
		      ['element', 'style:family', 'table-cell'],
		      ['tagline', 'style:table-cell-properties',
		        ['element', 'style:decimal-places', '2']],
		      ['tagline', 'style:paragraph-properties',
		        ['element', 'style:tab-stop-distance', '0.5in']],
		      ['tagline', 'style:text-properties',
		        ['element', 'style:font-name', 'Nimbus Sans L'],
		        ['element', 'fo:language', 'en'],
		        ['element', 'fo:country', 'US'],
		        ['element', 'style:font-name-asian', 'DejaVu Sans'],
		        ['element', 'style:language-asian', 'none'],
		        ['element', 'style:country-asian', 'none'],
		        ['element', 'style:font-name-complex', 'DejaVu Sans'],
		        ['element', 'style:language-complex', 'none'],
		        ['element', 'style:country-complex', 'none']]],
		    ['tag', 'number:number-style',
		      ['element', 'style:name', 'N0'],
		      ['tagline', 'number:number',
		        ['element', 'number:min-integer-digits', '1']]],
		    ['tag', 'number:currency-style',
		      ['element', 'style:name', 'N104P0'],
		      ['element', 'style:volatile', 'true'],
		      ['tag', 'number:currency-symbol',
		        ['element', 'number:language', 'en'],
		        ['element', 'number:country', 'US'],
		        ['data', '$']],
		      ['tagline', 'number:number',
		        ['element', 'number:decimal-places', '2'],
		        ['element', 'number:min-integer-digits', '1'],
		        ['element', 'number:grouping', 'true']]],
		    ['tag', 'number:currency-style',
		      ['element', 'style:name', 'N104'],
		      ['tagline', 'style:text-properties',
		        ['element', 'fo:color', '#ff0000']],
		      ['tag', 'number:text',
		        ['data', '-']],
		      ['tag', 'number:currency-symbol',
		        ['element', 'number:language', 'en'],
		        ['element', 'number:country', 'US'],
		        ['data', '$']],
		      ['tagline', 'number:number', 
		        ['element', 'number:decimal-places', '2'],
		        ['element', 'number:min-integer-digits', '1'],
		        ['element', 'number:grouping', 'true']],
		      ['tagline', 'style:map',
		        ['element', 'style:condition', 'value()&gt;=0'],
		        ['element', 'style:apply-style-name', 'N104P0']]],
		    ['tagline', 'style:style',
		      ['element', 'style:name', 'Default'],
		      ['element', 'style:family', 'table-cell']],
		    ['tag', 'style:style',
		      ['element', 'style:name', 'Result'],
		      ['element', 'style:family', 'table-cell'],
		      ['element', 'style:parent-style-name', 'Default'],
		      ['tagline', 'style:text-properties',
		        ['element', 'fo:font-style', 'italic'],
		        ['element', 'style:text-underline-style', 'solid'],
		        ['element', 'style:text-underline-width', 'auto'],
		        ['element', 'style:text-underline-color', 'font-color'],
		        ['element', 'fo:font-weight', 'bold']]],
		    ['tagline', 'style:style',
		      ['element', 'style:name', 'Result2'],
		      ['element', 'style:family', 'table-cell'],
		      ['element', 'style:parent-style-name', 'Result'],
		      ['element', 'style:data-style-name', 'N104']],
		    ['tag', 'style:style',
		      ['element', 'style:name', 'Heading'],
		      ['element', 'style:family', 'table-cell'],
		      ['element', 'style:parent-style-name', 'Default'],
		      ['tagline', 'style:table-cell-properties',
		        ['element', 'style:text-align-source', 'fix'],
		        ['element', 'style:repeat-content', 'false']],
		      ['tagline', 'style:paragraph-properties',
		        ['element', 'fo:text-align', 'center']],
		      ['tagline', 'style:text-properties',
		        ['element', 'fo:font-size', '16pt'],
		        ['element', 'fo:font-style', 'italic'],
		        ['element', 'fo:font-weight', 'bold']]],
		    ['tag', 'style:style',
		      ['element', 'style:name', 'Heading1'],
		      ['element', 'style:family', 'table-cell'],
		      ['element', 'style:parent-style-name', 'Heading'],
		      ['tagline', 'style:table-cell-properties',
		        ['element', 'style:rotation-angle', '90']]]],
		  ['tag', 'office:automatic-styles',
		    ['tag', 'style:page-layout',
		      ['element', 'style:name', 'pm1'],
		      ['tagline', 'style:page-layout-properties',
		        ['element', 'style:writing-mode', 'lr-tb']],
		      ['tag', 'style:header-style',
		        ['tagline', 'style:header-footer-properties',
		          ['element', 'fo:min-height', '0.2957in'],
		          ['element', 'fo:margin-left', '0in'],
		          ['element', 'fo:margin-right', '0in'],
		          ['element', 'fo:margin-bottom', '0.0984in']]],
		      ['tag', 'style:footer-style',
		        ['tagline', 'style:header-footer-properties',
		          ['element', 'fo:min-height', '0.2957in'],
		          ['element', 'fo:margin-left', '0in'],
		          ['element', 'fo:margin-right', '0in'],
		          ['element', 'fo:margin-top', '0.0984in']]]],
		    ['tag', 'style:page-layout',
		      ['element', 'style:name', 'pm2'],
		      ['tagline', 'style:page-layout-properties',
		        ['element', 'style:writing-mode', 'lr-tb']],
		      ['tag', 'style:header-style',
		        ['tag', 'style:header-footer-properties',
		          ['element', 'fo:min-height', '0.2957in'],
		          ['element', 'fo:margin-left', '0in'],
		          ['element', 'fo:margin-right', '0in'],
		          ['element', 'fo:margin-bottom', '0.0984in'],
		          ['element', 'fo:border', '0.0346in solid #000000'],
		          ['element', 'fo:padding', '0.0071in'],
		          ['element', 'fo:background-color', '#c0c0c0'],
		          ['tagline', 'style:background-image']]],
		      ['tag', 'style:footer-style',
		        ['tag', 'style:header-footer-properties',
		          ['element', 'fo:min-height', '0.2957in'],
		          ['element', 'fo:margin-left', '0in'],
		          ['element', 'fo:margin-right', '0in'],
		          ['element', 'fo:margin-top', '0.0984in'],
		          ['element', 'fo:border', '0.0346in solid #000000'],
		          ['element', 'fo:padding', '0.0071in'],
		          ['element', 'fo:background-color', '#c0c0c0'],
		          ['tagline', 'style:background-image']]]]],
		  ['tag', 'office:master-styles',
		    ['tag', 'style:master-page',
		      ['element', 'style:name', 'Default'],
		      ['element', 'style:page-layout-name', 'pm1'],
		      ['tag', 'style:header',
		        ['tag', 'text:p',
		          ['data', '<text:sheet-name>???</text:sheet-name>']]],
		      ['tagline', 'style:header-left',
		        ['element', 'style:display', 'false']],
		      ['tag', 'style:footer',
		        ['tag', 'text:p',
		          ['data', 'Page <text:page-number>1</text:page-number>']]],
		      ['tagline', 'style:footer-left',
		        ['element', 'style:display', 'false']]],
		    ['tag', 'style:master-page',
		      ['element', 'style:name', 'Report'],
		      ['element', 'style:page-layout-name', 'pm2'],
		      ['tag', 'style:header',
		        ['tag', 'style:region-left',
		          ['tag', 'text:p',
		            ['data', '<text:sheet-name>???</text:sheet-name> (<text:title>???</text:title>)']]],
		        ['tag', 'style:region-right',
		          ['tag', 'text:p',
		            ['data', '<text:date style:data-style-name="N2" text:date-value="2006-09-29">09/29/2006</text:date>, <text:time>13:02:56</text:time>']]]],
		      ['tagline', 'style:header-left',
		        ['element', 'style:display', 'false']],
		      ['tag', 'style:footer',
		        ['tag', 'text:p',
		          ['data', 'Page <text:page-number>1</text:page-number> / <text:page-count>99</text:page-count>']]],
		      ['tagline', 'style:footer-left',
		        ['element', 'style:display', 'false']]]]]


		# Generate content.xml XML data
		xml = XML()
		self.lines = xml.convert(self.data)
		self.filedata = '\n'.join(self.lines)
		# Return generated data
		return self.filedata

class Writer:
	"Writer Class - Used to create OpenDocument Format Writer Documents."
	def __init__(self):
		"Initialize ooolib Writer instance"
		# Default to no debugging
		self.debug = False
		self.meta = Meta('odt')

	def set_meta(self, metaname, value):
		"Set meta data in your document."
		self.meta.set_meta(metaname, value)

	def save(self, filename):
		"""Save .odt document

		The save function saves the current .odt document.
		"""
		if self.debug: print "Writing %s" % filename
		self.savefile = zipfile.ZipFile(filename, "w")
		if self.debug: print "  meta.xml"
		self._zip_insert(self.savefile, "meta.xml", self.meta.get_meta())
		if self.debug: print "  mimetype"
		self._zip_insert(self.savefile, "mimetype", "application/vnd.oasis.opendocument.text")
		if self.debug: print "  META-INF/manifest.xml"
		self._zip_insert(self.savefile, "META-INF/manifest.xml", self._odt_manifest())
		if self.debug: print "  content.xml"
		self._zip_insert(self.savefile, "content.xml", self._odt_content())
		if self.debug: print "  settings.xml"
		# self._zip_insert(self.savefile, "settings.xml", self._odt_settings())
		if self.debug: print "  styles.xml"
		# self._zip_insert(self.savefile, "styles.xml", self._odt_styles())

	def _zip_insert(self, file, filename, data):
		now = time.localtime(time.time())[:6]
		info = zipfile.ZipInfo(filename)
		info.date_time = now
		info.compress_type = zipfile.ZIP_DEFLATED
		file.writestr(info, data)

	def _odt_manifest(self):
		"Generate odt manifest.xml data"

		self.data = ['tag', 'manifest:manifest',
		  ['element', 'xmlns:manifest', 'urn:oasis:names:tc:opendocument:xmlns:manifest:1.0'],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'application/vnd.oasis.opendocument.text'],
		    ['element', 'manifest:full-path', '/']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'content.xml']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'styles.xml']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'meta.xml']],
		  ['tagline', 'manifest:file-entry',
		    ['element', 'manifest:media-type', 'text/xml'],
		    ['element', 'manifest:full-path', 'settings.xml']]]

		# Generate content.xml XML data
		xml = XML()
		self.lines = xml.convert(self.data)
		self.lines.insert(1, '<!DOCTYPE manifest:manifest PUBLIC "-//OpenOffice.org//DTD Manifest 1.0//EN" "Manifest.dtd">')
		self.filedata = '\n'.join(self.lines)
		# Return generated data
		return self.filedata

	def _odt_content(self):
		"Generate odt content.xml data"

		self.data = ['tag', 'office:document-content',
		  ['element', 'xmlns:office', 'urn:oasis:names:tc:opendocument:xmlns:office:1.0'],
		  ['element', 'xmlns:style', 'urn:oasis:names:tc:opendocument:xmlns:style:1.0'],
		  ['element', 'xmlns:text', 'urn:oasis:names:tc:opendocument:xmlns:text:1.0'],
		  ['element', 'xmlns:table', 'urn:oasis:names:tc:opendocument:xmlns:table:1.0'],
                  ['element', 'xmlns:draw', 'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0'],
		  ['element', 'xmlns:fo', 'urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0'],
		  ['element', 'xmlns:xlink', 'http://www.w3.org/1999/xlink'],
		  ['element', 'xmlns:dc', 'http://purl.org/dc/elements/1.1/'],
		  ['element', 'xmlns:meta', 'urn:oasis:names:tc:opendocument:xmlns:meta:1.0'],
		  ['element', 'xmlns:number', 'urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0'],
		  ['element', 'xmlns:svg', 'urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0'],
		  ['element', 'xmlns:chart', 'urn:oasis:names:tc:opendocument:xmlns:chart:1.0'],
		  ['element', 'xmlns:dr3d', 'urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0'],
		  ['element', 'xmlns:math', 'http://www.w3.org/1998/Math/MathML'],
		  ['element', 'xmlns:form', 'urn:oasis:names:tc:opendocument:xmlns:form:1.0'],
		  ['element', 'xmlns:script', 'urn:oasis:names:tc:opendocument:xmlns:script:1.0'],
		  ['element', 'xmlns:ooo', 'http://openoffice.org/2004/office'],
		  ['element', 'xmlns:ooow', 'http://openoffice.org/2004/writer'],
		  ['element', 'xmlns:oooc', 'http://openoffice.org/2004/calc'],
		  ['element', 'xmlns:dom', 'http://www.w3.org/2001/xml-events'],
		  ['element', 'xmlns:xforms', 'http://www.w3.org/2002/xforms'],
		  ['element', 'xmlns:xsd', 'http://www.w3.org/2001/XMLSchema'],
		  ['element', 'xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance'],
		  ['element', 'office:version', '1.0'],
		  ['tagline', 'office:scripts'],
		  ['tag', 'office:font-face-decls',
		    ['tagline', 'style:font-face',
		      ['element', 'style:name', 'DejaVu Sans'],
		      ['element', 'svg:font-family', '&apos;DejaVu Sans&apos;'],
		      ['element', 'style:font-pitch', 'variable']],
                    ['tagline', 'style:font-face',
		      ['element', 'style:name', 'Nimbus Roman No9 L'],
		      ['element', 'svg:font-family', '&apos;Nimbus Roman No9 L&apos;'],
		      ['element', 'style:font-family-generic', 'roman'],
		      ['element', 'style:font-pitch', 'variable']],
		    ['tagline', 'style:font-face',
		      ['element', 'style:name', 'Nimbus Sans L'],
		      ['element', 'svg:font-family', '&apos;Nimbus Sans L&apos;'],
		      ['element', 'style:font-family-generic', 'swiss'],
		      ['element', 'style:font-pitch', 'variable']]],
		  ['tagline', 'office:automatic-styles'],
		  ['tag', 'office:body',
		    ['tag', 'office:text',
		      ['tagline', 'office:forms',
		        ['element', 'form:automatic-focus', 'false'],
                        ['element', 'form:apply-design-mode', 'false']],
		      ['tag', 'text:sequence-decls',
		        ['tagline', 'text:sequence-decl',
		          ['element', 'text:display-outline-level', '0'],
		          ['element', 'text:name', 'Illustration']],
		        ['tagline', 'text:sequence-decl',
		          ['element', 'text:display-outline-level', '0'],
                          ['element', 'text:name', 'Table']],
		        ['tagline', 'text:sequence-decl',
		          ['element', 'text:display-outline-level', '0'],
		          ['element', 'text:name', 'Text']],
		        ['tagline', 'text:sequence-decl',
		          ['element', 'text:display-outline-level', '0'],
		          ['element', 'text:name', 'Drawing']]],
		      ['tagline', 'text:p',
		        ['element', 'text:style-name', 'Standard']]]]]

		# Generate content.xml XML data
		xml = XML()
		self.lines = xml.convert(self.data)
		self.filedata = '\n'.join(self.lines)
		# Return generated data
		return self.filedata


