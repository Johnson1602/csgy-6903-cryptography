import random

FREQUENCIES = {" ": 19, "a": 7, "b": 1, "c": 2, "d": 4, "e": 10, "f": 2, "g": 2, "h": 5, "i": 6, "j": 1, "k": 1, "l": 3, "m": 2, "n": 6, "o": 6, "p": 2, "q": 1, "r": 5, "s": 5, "t": 7, "u": 2, "v": 1, "w": 2, "x": 1, "y": 2, "z": 1}

def run():
    f = open('dictionary_1.txt')

    cipher_text = [int(c) for c in input('Please input the cipher text: ').strip().split(',')]

    for plain_text in f:
        if len(plain_text) < 30:
            continue
        if crack(plain_text, cipher_text):
            print('crack succeeded, plain text is: ', plain_text)
            break
    else:
        print('crack failed')

    f.close()

# generate random plain text string
def generate(dictionary):
    plain_text = ''
    while len(plain_text) < 500:
        index = random.randint(0, len(dictionary) - 1)
        plain_text = plain_text + dictionary[index] + ' '
    plain_text = plain_text[:500]
    return plain_text

def crack(plain_text, cipher_text):
    key = {}
    for plain_char, cipher_char in zip(plain_text, cipher_text):
        if plain_char in key:
            if cipher_char not in key[plain_char]:
                key[plain_char].append(cipher_char)
            if (len(key[plain_char]) > FREQUENCIES[plain_char]):
                # print('key length: ', len(key), '\n\nkey: ', key, '\n\nillegal char: ', plain_char, key[plain_char])
                # print('='*50)
                return False
        else:
            key[plain_char] = [cipher_char]

    return True

if __name__ == "__main__":
    # run()
    dictionary = []
    f = open('dictionary_2.txt')
    for line in f:
        line = line.strip()
        if line is None or line == '' or line == 'Test 2':
            continue
        dictionary.append(line)
    f.close()
    plain = generate(dictionary)
    print(plain)
