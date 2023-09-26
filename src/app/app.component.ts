import { Component } from '@angular/core';
import { CipherService } from './services/cipher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  substitutions: Record<string, string[]> = {};
  secretKey = '';

  mode: 'encrypt' | 'decrypt' = 'encrypt';

  encryptResult = '';
  decryptResult = '';

  constructor(private cipherService: CipherService) {}

  isGenerated() {
    return Object.keys(this.substitutions).length;
  }

  onGenerate(value: string) {
    this.secretKey = value;
    this.substitutions = this.cipherService.generateSubstitutions(value);
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
}
