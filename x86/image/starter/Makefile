ASM = nasm
LD = ld

TARGET = hello
SOURCE = hello.asm
OBJECT = hello.o

all: $(TARGET)

$(TARGET): $(OBJECT)
	$(LD) $(OBJECT) -o $(TARGET)

$(OBJECT): $(SOURCE)
	$(ASM) -f elf64 $(SOURCE) -o $(OBJECT)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET) $(OBJECT)

.PHONY: all run clean
