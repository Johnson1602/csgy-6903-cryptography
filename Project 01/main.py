import random
import time
import argparse

FREQUENCIES = {" ": 19, "a": 7, "b": 1, "c": 2, "d": 4, "e": 10, "f": 2, "g": 2, "h": 5, "i": 6, "j": 1, "k": 1, "l": 3, "m": 2, "n": 6, "o": 6, "p": 2, "q": 1, "r": 5, "s": 5, "t": 7, "u": 2, "v": 1, "w": 2, "x": 1, "y": 2, "z": 1}

def run():

    """
    Sample usage: python3 main.py --dict dictionary_1.txt --task 1
    """

    parser = argparse.ArgumentParser(description="Cryptanalysis of homophonic substitution ciphers.")
    parser.add_argument("--dict",
                        help="The name of the dictionary file with the path.",
                        default="dictionary_1.txt")
    parser.add_argument("--task", help="Choose which task to run",
                        choices=["1", "2"],
                        default="1")

    # parse cmdline input
    cmdline = parser.parse_args()

    # get the input dictionary
    dictionary = cmdline.dict

    # ask for cipher text input
    cipher_text = [int(c) for c in input('Please input the cipher text: ').strip().split(',')]
    print()

    # run which task
    if cmdline.task == '1':
        print('cracking...\n')
        task1(cipher_text, dictionary)
    elif cmdline.task == '2':
        print('cracking...\n')
        task2(cipher_text, dictionary)

# generate random plain text string
def generate(dictionary):
    plain_text = ''
    while len(plain_text) < 500:
        index = random.randint(0, len(dictionary) - 1)
        plain_text = plain_text + dictionary[index] + ' '
    plain_text = plain_text[:500]
    return plain_text

def task1(cipher_text, dictionary):
    f = open(dictionary)
    for plain_text in f:
        if len(plain_text) < 30:
            continue
        if crack(plain_text, cipher_text):
            print('crack succeeded, plain text is: ', plain_text)
            break
    else:
        print('crack failed')
    f.close()

def task2(cipher_text, plain_dict):
    # generate a dictionary list from dictionary file
    dictionary = []
    # store key-plain_text pair
    keys = {}
    f = open(plain_dict)
    for line in f:
        line = line.strip()
        if line is None or line == '' or line == 'Test 2':
            continue
        dictionary.append(line)
    f.close()

    # start attack
    for i in range(10000000):
        plain_text = generate(dictionary)
        # print(plain)
        key = crack(plain_text, cipher_text)
        if key:
            if plain_text not in keys:
                keys[plain_text] = key

    # compute mse (Mean Squared Error), return the best key
    key = scorer(keys)

    # print plain text
    if key:
        for plain_text in keys:
            if keys[plain_text] == key:
                print('crack succeeded, plain text is: ', plain_text)
                break
    else:
        print('crack failed')

def scorer(keys):
    best_key = None
    best_score = 10000
    for key in keys.values():
        square = 0
        for char in key:
            square += (len(key[char]) - FREQUENCIES[char]) ** 2
        mse = square / len(key)
        if mse < best_score:
            best_key = key
            best_score = mse
    return best_key

def crack(plain_text, cipher_text):
    key = {}
    for plain_char, cipher_char in zip(plain_text, cipher_text):
        if plain_char in key:
            if cipher_char not in key[plain_char]:
                key[plain_char].append(cipher_char)
            if (len(key[plain_char]) > FREQUENCIES[plain_char]):
                # print('key length: ', len(key), '\n\nkey: ', key, '\n\nillegal char: ', plain_char, key[plain_char])
                # print('='*50)
                return {}
        else:
            key[plain_char] = [cipher_char]
    # print(key)
    return key

if __name__ == "__main__":

    start = time.time()
    run()
    end = time.time()
    print('Found plain text in %.5f seconds' % ((end - start)))
