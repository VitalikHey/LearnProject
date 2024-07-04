import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.scss'],
})
export class InfoEventComponent {
  @Input() public priceEvent: number = 0;
  @Input() public priceOnePerson?: number;
  @Input() public formatEvent?: string | null;
  @Input() public countPerson?: number | null;
  @Input() public dateEvent?: Date | null;
}
