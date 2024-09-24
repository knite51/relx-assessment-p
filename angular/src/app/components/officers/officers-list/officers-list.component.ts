import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TitleCasePipe } from '@angular/common';
import { Officers } from '../../../interfaces/model';

@Component({
  selector: 'app-officers-list',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './officers-list.component.html',
  styleUrl: './officers-list.component.scss',
})
export class OfficersListComponent {
  @Input({ required: true }) officersList: Officers[] = [];
  @Output() paginate = new EventEmitter();
}
