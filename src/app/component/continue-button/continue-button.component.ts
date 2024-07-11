import { Component, Input } from '@angular/core';
import { animationContinueButton } from '../../app.animation';

@Component({
  selector: 'app-continue-button',
  templateUrl: './continue-button.component.html',
  styleUrls: ['./continue-button.component.scss'],
  animations: [animationContinueButton],
})
export class ContinueButtonComponent {
  @Input() public title?: string;
  @Input() public valid?: boolean;
}
