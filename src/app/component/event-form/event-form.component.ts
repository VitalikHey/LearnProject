import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  protected countPeople: number = 10;

  protected readonly eventForm: FormGroup = new FormGroup({
    countPeoples: new FormControl(10),
    dateEvent: new FormControl(null),
    additionalService: new FormControl(null),
    desiredMenu: new FormControl(''),
  });

  // Не забыть типизировать формы!
  protected handleValueClick(): void {
    console.log(this.eventForm.value);
  }
}
