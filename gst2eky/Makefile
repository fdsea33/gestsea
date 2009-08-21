


all: FDS.zip SAC.zip AAV.zip

backup:
	ruby gst2eky.rb
#	xmllint --xmlout --nowarning --output backup.xml 1.xml
	mv 1.xml backup.xml
	rm -f backup.zip
	zip backup.zip backup.xml

%.xml: gst2eky.rb
	ruby gst2eky.rb $*.xml debug

%.zip: gst2eky.rb
	ruby gst2eky.rb $*.xml
	xmllint --xmlout --nowarning --output backup.xml $*.xml
	zip $*.zip backup.xml
