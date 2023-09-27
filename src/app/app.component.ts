import { Component, OnInit } from '@angular/core';
import { CipherService } from './services/cipher.service';
import { GenerateOptions } from './interfaces/cipher';
import { makeRandomKeys } from './utils/cipher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  numberSubstitution: Record<string, string[]> = {};
  substitutions: Record<string, string[]> = {};
  secretKey = '';

  mode: 'encrypt' | 'decrypt' = 'encrypt';

  encryptResult = '';
  decryptResult = '';

  constructor(private cipherService: CipherService) {}

  ngOnInit(): void {
    const lsKey = 'client-number-keys';
    const defaultKey = localStorage.getItem(lsKey) || null;
    if (defaultKey) {
      this.numberSubstitution = JSON.parse(defaultKey);
    } else {
      const keys = makeRandomKeys();
      this.numberSubstitution = keys;
      localStorage.setItem('client-number-keys', JSON.stringify(keys));
    }
  }

  isGenerated() {
    return Object.keys(this.substitutions).length;
  }

  onGenerate(data: { value: string } & GenerateOptions) {
    const { value, ...options } = data;
    this.secretKey = value;
    this.encryptResult = '';
    this.decryptResult = '';
    this.substitutions = this.cipherService.generateSubstitutions(
      value,
      this.numberSubstitution,
      options
    );
  }

  changeMode(newMode: typeof this.mode) {
    this.mode = newMode;
  }

  onEncrypt(value: string) {
    this.encryptResult = this.cipherService.encrypt(value);
  }

  onDecrypt(value: string) {
    this.decryptResult = this.cipherService.decrypt(value, this.secretKey);
  }

  getError(mode: typeof this.mode) {
    return mode === 'encrypt'
      ? this.cipherService.errorEncrypt
      : this.cipherService.errorDecrypt;
  }
}
