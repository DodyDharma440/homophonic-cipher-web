import { Injectable } from '@angular/core';
import {
  allChars as defaultAllChars,
  characters,
} from '../constants/characters';
import { GenerateOptions } from '../interfaces/cipher';
import { splitString } from '../utils/cipher';

@Injectable({
  providedIn: 'root',
})
export class CipherService {
  private substitutions: Record<string, string[]> = {};
  private allCharsCount = 0;

  errorEncrypt: string | null = null;
  errorDecrypt: string | null = null;

  generateSubstitutions(
    secretKey: string,
    numberSubstitution?: Record<string, string[]>,
    options?: GenerateOptions
  ) {
    let allChars = defaultAllChars;
    this.allCharsCount = allChars.length;

    if (options?.alphabetsOnly) {
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
        let resultLabel = `${result}`.padStart(longestLength, '0');

        if (options?.encryptNumber && numberSubstitution) {
          resultLabel = this.encryptNumber(
            resultLabel,
            numberSubstitution,
            index * allChars.length,
            secretKey
          );
        }

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
        let item = swappedKeys[i][index];

        keysByChar[char].push(item);
      }
    });

    this.substitutions = keysByChar;
    return keysByChar;
  }

  private encryptNumber(
    value: string,
    subs: Record<string, string[]>,
    startFrom: number,
    secretKey: string
  ) {
    const textArr = value.split('');
    let result = '';

    let num =
      Math.round(Number(textArr[textArr.length - 1]) * startFrom) +
      secretKey.length;

    const numArr = `${num}`.split('');
    let index = Number(numArr[numArr.length - 1]);

    textArr.forEach((char) => {
      if (index < 0) {
        index += 9;
      } else if (index >= 9) {
        index -= 9;
      }

      const encryptChars = subs[char];
      const element = encryptChars[index];

      result += element;
    });

    return result;
  }

  encrypt(text: string) {
    this.errorEncrypt = null;

    const textArr = text.split('');
    let result = '';

    textArr.forEach((char) => {
      const encryptChars = this.substitutions[char];
      const encryptElement =
        encryptChars?.[Math.floor(Math.random() * encryptChars.length)];

      if (typeof encryptElement !== 'undefined') {
        result += encryptElement;
        return;
      }

      this.errorEncrypt =
        'Terjadi kesalahan saat enkripsi karena karakter tidak terdaftar dalam tabel substitusi';
    });

    return result;
  }

  decrypt(encrypted: string, secretKey: string) {
    this.errorDecrypt = null;
    const longestLength = `${this.allCharsCount * secretKey.length}`.length;
    const textArr = splitString(encrypted, longestLength);

    let result = '';

    textArr.forEach((char) => {
      let isFound = false;
      Object.entries(this.substitutions).forEach(([key, value]) => {
        if (value.includes(char) && !isFound) {
          isFound = true;
          if (typeof key !== 'undefined') {
            result += key;
            return;
          }

          this.errorDecrypt =
            'Terjadi kesalahan saat dekripsi karena karakter tidak terdaftar dalam tabel substitusi';
        }
      });
    });

    return result;
  }
}
