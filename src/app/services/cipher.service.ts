import { Injectable } from '@angular/core';
import {
  allChars as defaultAllChars,
  characters,
} from '../constants/characters';
import { GenerateOptions } from '../interfaces/cipher';

@Injectable({
  providedIn: 'root',
})
export class CipherService {
  private substitutions: Record<string, string[]> = {};
  private allCharsCount = 0;

  generateSubstitutions(secretKey: string, options: GenerateOptions) {
    let allChars = defaultAllChars;
    this.allCharsCount = allChars.length;

    if (options.alphabetsOnly) {
      allChars = characters.alphabeths;
      this.allCharsCount = characters.alphabeths.length;
    }

    const swapPositions = (array: string[], charIndex: number) => {
      const swapped: string[] = [];

      let swapIndex = Number(charIndex);
      for (let i = 0; i < allChars.length; i++) {
        swapped[swapIndex] = array[i];

        if (swapIndex >= allChars.length - 1) {
          swapIndex = 0;
        } else {
          swapIndex += 1;
        }
      }

      return swapped;
    };

    const keys: Record<string, string[]> = {};
    const longestLength = `${allChars.length * secretKey.length}`.length;

    for (let i = 0; i < secretKey.length; i++) {
      allChars.forEach((_, index) => {
        keys[i] = keys[i] || [];
        const result = allChars.length * i + (index + 1);
        const resultLabel = `${result}`.padStart(longestLength, '0');

        keys[i].push(resultLabel);
      });
    }

    const swappedKeys: Record<string, string[]> = {};
    secretKey.split('').forEach((char, index) => {
      swappedKeys[index] = swapPositions(keys[index], allChars.indexOf(char));
    });

    const keysByChar: Record<string, string[]> = {};

    allChars.forEach((char, index) => {
      for (let i = 0; i < secretKey.length; i++) {
        keysByChar[char] = keysByChar[char] || [];
        keysByChar[char].push(swappedKeys[i][index]);
      }
    });

    this.substitutions = keysByChar;
    return keysByChar;
  }

  encrypt(text: string) {
    const textArr = text.split('');
    let result = '';

    textArr.forEach((char) => {
      const encryptChars = this.substitutions[char];
      const encryptElement =
        encryptChars?.[Math.floor(Math.random() * encryptChars?.length || 0)];

      result += encryptElement;
    });

    return result;
  }

  decrypt(encrypted: string, secretKey: string) {
    const longestLength = `${this.allCharsCount * secretKey.length}`.length;

    const splitString = (inputString: string, chunkSize: number) => {
      const chunks: string[] = [];
      for (let i = 0; i < inputString.length; i += chunkSize) {
        chunks.push(inputString.slice(i, i + chunkSize));
      }
      return chunks;
    };

    const textArr = splitString(encrypted, longestLength);

    let result: string[] = [];

    textArr.forEach((char) => {
      let isFound = false;
      Object.entries(this.substitutions).forEach(([key, value]) => {
        if (value.includes(char) && !isFound) {
          result.push(key);
          isFound = true;
        }
      });
    });

    return result.join('');
  }
}
