import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CryptMode } from 'src/app/interfaces/cipher';

@Component({
  selector: 'crypter',
  templateUrl: './crypter.component.html',
})
export class CrypterComponent {
  @Input() cryptType: CryptMode = 'encrypt';
  @Input() isShow = false;
  @Input() result = '';
  @Output() onCrypt = new EventEmitter<{ value: string }>();

  inputValue = '';

  onChange(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.inputValue = value;
  }

  onSubmit() {
    this.onCrypt.emit({ value: this.inputValue });
  }
}
