import { Component } from '@angular/core';
import { steps } from './component/data-type/data-type';
import { EventFormComponent } from './component/event-form/event-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'event-task';
  protected isShowComponent: number = 0;
  protected readonly steps = steps;

  constructor(protected eventFormData: EventFormComponent) {}

  protected nextStep(valueStep: number): void {
    this.isShowComponent = valueStep;
  }
}
