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
