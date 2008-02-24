#XSLT	 = xsltproc --timing
XSLT	 = xsltproc

XML      = .xml

XSL-SQL	  = analysis-sql.xsl
XSL-HTML  = analysis-html.xsl
XSL-JS    = analysis-js.xsl
XSL-RAILS = analysis-rails.xsl

STYLESH   = stylesheets
MIGRATE   = migrations
MODELS    = models
DOC       = documents

SQL-INIT = _10G_tables
SQL-CONS = _20G_constraints
SQL-VIEW = _30G_views

all: gestseax install

%.html: ${MODELS}/%.xml
	$(XSLT) -o ${DOC}/$@ ${STYLESH}/$(XSL-HTML) $^

%: ${MODELS}/%.xml
	$(XSLT) -o ${MIGRATE}/$@${SQL-INIT}.sql --stringparam operation create ${STYLESH}/$(XSL-SQL) $<
	$(XSLT) -o ${MIGRATE}/$@${SQL-CONS}.sql --stringparam operation constraints ${STYLESH}/$(XSL-SQL) $<
	$(XSLT) -o ${MIGRATE}/$@${SQL-VIEW}.sql --stringparam operation vues ${STYLESH}/$(XSL-SQL) $<
	$(XSLT) -o $@-mcd.js ${STYLESH}/$(XSL-JS) $<
	mv $@-mcd.js ../../content/generator/

%_extra.sql: ${MODELS}/%.xml
	$(XSLT) -o ${MIGRATE}/$@ --stringparam operation extra ${STYLESH}/$(XSL-SQL) $<

%_rails.sh: ${MODELS}/%.xml
	$(XSLT) -o ${MIGRATE}/$@ --stringparam operation models ${STYLESH}/$(XSL-RAILS) $<
	chmod 755 $@

clean:
	rm -fr *~ \#*\# ${STYLESH}/*~ ${MIGRATE}/*~ ${MODELS}/*~

k: clean
	rm -fr *.html *.log *.aux *toc *.lot *.lof *.mtc*
	rm -fr *${SQL-INIT}.sql *${SQL-CONS}.sql *${SQL-VIEW}.sql

