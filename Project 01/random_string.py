import random
string1 = []
for i in range(500):
	string1.append(chr(random.randint(97, 122)))
print(''.join(string1))