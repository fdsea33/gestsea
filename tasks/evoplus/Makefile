

all: clean

%.pdf: %.tex
	pdflatex $^
	pdflatex $^

clean:
	rm -f *.aux *.toc *.lot *.log *~ \#*

k: clean
	rm -f *.pdf