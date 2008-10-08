

all: clean

%.pdf: %.tex
	pdflatex $^
	pdflatex $^

reg:
	psql gestsea -f evo_reglements.sql
	mv /tmp/evoplus_reglements.csv ./SUIVI_REGLEMENTS_FDSEA33.csv

clean:
	rm -f *.aux *.toc *.lot *.log *~ \#*

k: clean
	rm -f *.pdf