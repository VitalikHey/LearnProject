import {Component} from '@angular/core';
import { EventForm, steps } from './component/data-type/data-type';
import { EventFormComponent } from './component/event-form/event-form.component';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'event-task';
  protected isShowComponent: number = 0;
  protected readonly steps = steps;
  protected arrayEvent: Array<number | string | null> = []

  protected eventFormGroup: FormGroup<EventForm> = new FormGroup<EventForm>({
    eventForm: new FormControl(null, Validators.required),
  });

  constructor(protected eventFormData: EventFormComponent) {}

  protected nextStep(): void {
    if (this.eventFormGroup.valid) {
      this.isShowComponent = steps.Contact;
      if(this.eventFormGroup.value) {
        console.log(this.eventFormGroup.value[1])
      }
    } else {
      alert('Форма заполнена неверно!');
      console.log(this.eventFormGroup.value);
    }
  }
}
