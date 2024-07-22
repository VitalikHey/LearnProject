import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-application-button',
  templateUrl: './application-button.component.html',
  styleUrls: ['./application-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationButtonComponent {}
