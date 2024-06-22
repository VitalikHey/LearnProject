import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.scss'],
})
export class InfoEventComponent {
  @Input() public priceEventChild: number;
  @Input() public priceOnePersonChild: number;
  constructor() {
    this.priceEventChild = 0;
    this.priceOnePersonChild = 0;
  }
}
