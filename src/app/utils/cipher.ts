import { characters, allChars } from '../constants/characters';

export const makeRandomKeys = () => {
  const keys: Record<string, string[]> = {};
  const count = 9;

  characters.numbers.forEach((char) => {
    const replacements: string[] = [];

    const makeReplacementChar = () => {
      const allCharExcludeSpace = allChars.filter((c) => c !== ' ');

      const randomIndex = Math.floor(
        Math.random() * allCharExcludeSpace.length
      );

      const replacementChar = allCharExcludeSpace[randomIndex];
      const isExist = Object.values(keys).some((val) =>
        val.includes(replacementChar)
      );
      const isExistOnScope = replacements.includes(replacementChar);

      if (isExistOnScope || isExist) {
        makeReplacementChar();
        return;
      }

      replacements.push(replacementChar);
    };

    for (let i = 0; i < count; i++) {
      makeReplacementChar();
    }

    keys[char] = replacements;
  });

  return keys;
};

export const splitString = (inputString: string, chunkSize: number) => {
  const chunks: string[] = [];
  for (let i = 0; i < inputString.length; i += chunkSize) {
    chunks.push(inputString.slice(i, i + chunkSize));
  }
  return chunks;
};
