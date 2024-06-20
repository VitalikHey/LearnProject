import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonValueService } from '../service/button-value.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  protected selectedValue: string = '';

  protected isShowTextDownForm: boolean = false;
  protected countPeople: number = 0;
  protected priceEvent: number = 0;
  protected priceOnePerson: number = 0;
  protected servicePrice: number = 0;

  protected readonly eventForm: FormGroup = new FormGroup({
    countPeoples: new FormControl(0, Validators.required),
    dateEvent: new FormControl(null, Validators.required),
    additionalService: new FormControl(null),
    desiredMenu: new FormControl(''),
  });

  // Не забыть типизировать формы!

  // Не забыть доделать валидацию, и останется последнее сделать роутинг
  constructor(public valueService: ButtonValueService) {
    this.selectedValue = this.valueService.getSelectedValue();
  }

  protected isNotValidForm(): void {
    if (!this.eventForm.valid || !this.valueService.isValidValue()) {
      this.isShowTextDownForm = true;
      alert('Проверьте, выбран ли формат мероприятия!')
    } else if(this.valueService.isValidValue()) {
      console.log(this.eventForm.value)
    }
  }

  protected calculatePriceEvent(): number {
    if (this.valueService.getSelectedValue() === 'Фуршет') {
      this.priceOnePerson = 5000;
    } else if (
      this.valueService.getSelectedValue() === 'Гастрономический ужин'
    ) {
      this.priceOnePerson = 2000;
    } else if (this.valueService.getSelectedValue() === 'Банкет') {
      this.priceOnePerson = 3500;
    }
    if (this.eventForm.get('additionalService')?.value === 'Оформление') {
      this.servicePrice = 10000;
    } else if (
      this.eventForm.get('additionalService')?.value === 'Подбор площадки'
    ) {
      this.servicePrice = 5000;
    } else if (
      this.eventForm.get('additionalService')?.value === 'Составление тайминга'
    ) {
      this.servicePrice = 8000;
    } else if (
      this.eventForm.get('additionalService')?.value ===
      'Полное сопровождение от ведущего до декора'
    ) {
      this.servicePrice = 20000;
    } else {
      this.servicePrice = 0;
    }
    return (this.priceEvent =
      this.eventForm.get('countPeoples')?.value * this.priceOnePerson +
      this.servicePrice);
  }
}
