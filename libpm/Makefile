GCC	= gcc
CFLAGS	= $(shell pg_config --cflags)
SFLAGS	= -Wall -g -shared
INCLUDE	= -I $(shell pg_config --includedir) -I $(shell pg_config --includedir-server)


all : libpm.so

%.o : %.c
	$(GCC) -o $@ $(CFLAGS) $(INCLUDE) -c $^

libpm.so : blog.o system.o
	$(GCC) -o $@ $(SFLAGS) $(LDFLAGS) $^

clean:
	rm -f *.o *~ *core *.out


