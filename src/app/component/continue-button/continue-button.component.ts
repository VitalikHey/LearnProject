import { Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-continue-button',
  templateUrl: './continue-button.component.html',
  styleUrls: ['./continue-button.component.scss'],
  animations: [
    trigger('ValidNotValid', [
      state(
        'notValid',
        style({
          right: '-2000px',
        }),
      ),
      state(
        'valid',
        style({
          right: '0',
        }),
      ),
      transition('valid => notValid', [animate('400ms ease-in-out')]),
      transition('notValid => valid', [animate('400ms ease-in-out')]),
    ]),
  ],
})
export class ContinueButtonComponent {
  @Input() public title?: string;
  @Input() public valid?: boolean;
}
