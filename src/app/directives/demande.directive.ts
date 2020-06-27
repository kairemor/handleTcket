import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SortEvent } from 'src/app/interfaces/sort-event';
import { from } from 'rxjs';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };


@Directive({
  selector: '[appDemande]',
  // tslint:disable-next-line: use-host-property-decorator
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class DemandeDirective {

  constructor() { }

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
