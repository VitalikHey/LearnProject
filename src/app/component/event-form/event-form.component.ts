import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  protected isShowTextDownForm: boolean = false;
  protected countPeople: number = 10;
  protected priceEvent: number = 0;

  protected readonly eventForm: FormGroup = new FormGroup({
    countPeoples: new FormControl(10, Validators.required),
    dateEvent: new FormControl(null, Validators.required),
    additionalService: new FormControl(null),
    desiredMenu: new FormControl(''),
  });
  // Не забыть типизировать формы!

  protected isShowNotValidForm(): void {
    if (this.eventForm.get('dateEvent')?.value === null) {
      this.isShowTextDownForm = true;
    }
    this.isShowTextDownForm = false;
  }

  protected handleValueClick(): void {
    this.isShowNotValidForm();
    console.log(this.eventForm.value);
  }
}
