import random
import argparse

def main():
    parser = argparse.ArgumentParser(description='Take plaintext and encrypt to cyphertext')
    parser.add_argument('filename', help='A text file must be input here for the encryption algorithm to read')
    cmdline = parser.parse_args()
    L_Frequency = {" ": 19, "a": 7, "b": 1, "c": 2, "d": 4, "e": 10, "f": 2, "g": 2, "h": 5, "i": 6, "j": 1, "k": 1,
               "l": 3, "m": 2, "n": 6, "o": 6, "p": 2, "q": 1, "r": 5, "s": 5, "t": 7, "u": 2, "v": 1, "w": 2,
               "x": 1, "y": 2, "z": 1}
    keyspace = {}
    ciphertext = ""
    with open(cmdline.filename) as f:
        key_value = list(range(106))
        random.shuffle(key_value)
        index = 0
        for letter in L_Frequency:
            length = L_Frequency.get(letter)
            key = key_value[index:index+length]
            index = index + length
            keyspace[letter] = list(key)

        count = 0
        for line in f:
            for char in line:
                size = len(keyspace[char])
                key = keyspace[char][count%size]
                count = count + 1
                ciphertext = ciphertext + str(key) + ','

        ciphertext = ciphertext[:-1]
        # print(keyspace)
        print(ciphertext)
        # print(key_value)

if __name__ == "__main__":
    main()