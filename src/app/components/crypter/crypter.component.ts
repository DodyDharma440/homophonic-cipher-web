import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CryptMode } from 'src/app/interfaces/cipher';

@Component({
  selector: 'crypter',
  templateUrl: './crypter.component.html',
})
export class CrypterComponent implements OnChanges {
  @Input() cryptType: CryptMode = 'encrypt';
  @Input() isShow = false;
  @Input() result = '';
  @Input() error: string | null = null;
  @Input() substitutions: Record<string, string[]> = {};
  @Output() onCrypt = new EventEmitter<{ value: string }>();

  inputValue = '';

  ngOnChanges(changes: SimpleChanges): void {
    const subsChanges = changes['substitutions'];
    if (subsChanges) {
      this.inputValue = '';
    }
  }

  onChange(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.inputValue = value;
  }

  onSubmit() {
    this.onCrypt.emit({ value: this.inputValue });
  }
}
