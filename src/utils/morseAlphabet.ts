export const morseAlphabet: { [key: string]: string } = {
  'A': '.-',    'B': '-...',   'C': '-.-.',   'D': '-..',
  'E': '.',     'F': '..-.',   'G': '--.',    'H': '....',
  'I': '..',    'J': '.---',   'K': '-.-',    'L': '.-..',
  'M': '--',    'N': '-.',     'O': '---',    'P': '.--.',
  'Q': '--.-',  'R': '.-.',    'S': '...',    'T': '-',
  'U': '..-',   'V': '...-',   'W': '.--',    'X': '-..-',
  'Y': '-.--',  'Z': '--..',   '1': '.----',  '2': '..---',
  '3': '...--', '4': '....-',  '5': '.....',  '6': '-....',
  '7': '--...', '8': '---..',  '9': '----.',  '0': '-----'
};

const morseToAlphabet: { [key: string]: string } = Object.entries(morseAlphabet)
  .reduce((acc, [letter, morse]) => {
    acc[morse] = letter;
    return acc;
  }, {} as { [key: string]: string });

export const convertToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map(char => morseAlphabet[char] || char)
    .join(' ');
};

export const convertToText = (morse: string): string => {
  return morse
    .split(' ')
    .map(code => morseToAlphabet[code] || code)
    .join('');
};
