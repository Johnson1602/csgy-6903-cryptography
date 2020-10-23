FREQUENCIES = {" ": 19, "a": 7, "b": 1, "c": 2, "d": 4, "e": 10, "f": 2, "g": 2, "h": 5, "i": 6, "j": 1, "k": 1, "l": 3, "m": 2, "n": 6, "o": 6, "p": 2, "q": 1, "r": 5, "s": 5, "t": 7, "u": 2, "v": 1, "w": 2, "x": 1, "y": 2, "z": 1}



def run():
    f = open('Project 01/dictionary_1.txt')

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

def crack(plain_text, cipher_text):
    key = {}
    for plain_char, cipher_char in zip(plain_text, cipher_text):
        if plain_char in key:
            key[plain_char] = key[plain_char] + 1
            if (key[plain_char] > FREQUENCIES[plain_char]):
                print(key)
                print('not this one')
                return False
        else:
            key[plain_char] = 1
    
    return True

if __name__ == "__main__":
    run()
