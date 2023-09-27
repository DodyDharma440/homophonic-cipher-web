import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { GenerateOptions } from 'src/app/interfaces/cipher';

@Component({
  selector: 'secret-key-form',
  templateUrl: './secret-key-form.component.html',
})
export class SecretKeyFormComponent {
  @Input() numberSubstitution: Record<string, string[]> = {};
  @Output() onGenerate = new EventEmitter<
    { value: string } & GenerateOptions
  >();

  secretKey = '';
  @ViewChild('alphabetsOnly')
  alphabetsOnly: ElementRef<HTMLInputElement> | null = null;
  @ViewChild('encryptedNumber')
  encNumber: ElementRef<HTMLInputElement> | null = null;

  onChange(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.secretKey = value;
  }

  handleSubmit() {
    const alphabetsOnly = this.alphabetsOnly?.nativeElement.checked || false;
    const encryptNumber = this.encNumber?.nativeElement.checked || false;

    this.onGenerate.emit({
      value: this.secretKey,
      alphabetsOnly,
      encryptNumber,
    });
  }
}
