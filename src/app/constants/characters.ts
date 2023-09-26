export const characters = {
  alphabeths: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lowerCaseAlphabeths: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  symbols: '`!@#$%^&*()_+-=[]{}|<>.,/?:;\'"~'.split(''),
  numbers: '0123456789'.split(''),
};

const { alphabeths, symbols, numbers, lowerCaseAlphabeths } = characters;

export const allChars = [
  ...numbers,
  ...alphabeths,
  ...lowerCaseAlphabeths,
  ...symbols,
];

export const numberSubstitution: Record<string, string[]> = {
  '0': ['*', '#', 'X', 'c', 'V'],
  '1': ['"', 'H', 'P', 'h', 'I'],
  '2': ['9', '+', '&', '7', "'"],
  '3': ['~', '6', '0', 'k', 'q'],
  '4': ['J', '=', '%', '>', 'L'],
  '5': ['t', '{', ':', '[', ','],
  '6': ['o', 'S', 'i', 'A', '}'],
  '7': ['x', '5', 'E', ')', 'w'],
  '8': [']', 'T', '.', ';', 'R'],
  '9': ['O', '-', 'K', 'z', '@'],
};
