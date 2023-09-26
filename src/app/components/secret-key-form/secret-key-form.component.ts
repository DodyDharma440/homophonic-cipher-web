import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'secret-key-form',
  templateUrl: './secret-key-form.component.html',
})
export class SecretKeyFormComponent {
  @Output() onGenerate = new EventEmitter<string>();

  secretKey = '';

  onChange(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.secretKey = value;
  }

  handleSubmit() {
    this.onGenerate.emit(this.secretKey);
  }
}
