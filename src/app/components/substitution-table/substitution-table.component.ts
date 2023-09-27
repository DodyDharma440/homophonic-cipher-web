import { KeyValue } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'substitution-table',
  templateUrl: './substitution-table.component.html',
})
export class SubstitutionTableComponent implements OnChanges {
  @Input() secretKey = '';
  @Input() substitutions: Record<string, string[]> = {};

  tableHead: string[] = this.secretKey.split('');
  isShowTable = true;

  ngOnChanges(changes: SimpleChanges): void {
    const secretKeyChanges = changes['secretKey'];
    const subsChanges = changes['substitutions'];

    if (secretKeyChanges) {
      const value = secretKeyChanges.currentValue || '';
      this.tableHead = value.split('');
    }

    if (secretKeyChanges || subsChanges) {
      this.isShowTable = true;
    }
  }

  onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 1;
  }

  onToggleTable() {
    this.isShowTable = !this.isShowTable;
  }
}
