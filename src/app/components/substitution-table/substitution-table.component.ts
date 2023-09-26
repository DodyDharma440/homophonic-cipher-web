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
    const value = changes['secretKey'].currentValue || '';
    this.isShowTable = true;
    this.tableHead = value.split('');
  }

  onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 1;
  }

  onToggleTable() {
    this.isShowTable = !this.isShowTable;
  }
}
