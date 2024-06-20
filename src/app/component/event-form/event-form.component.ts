import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonValueService } from '../service/button-value.service';
import {Observable} from "rxjs";
import {EventFormType, Service} from "../data-type/data-type";
import {GetApiDataService} from "../service/get-api-data.service";
import {BoolShowPageService} from "../service/bool-show-page.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  protected service$: Observable<Service[]> = inject(GetApiDataService).getApiService()
  protected selectedValue: string = '';
  protected isShowContactComponent: number = 0

  protected isShowTextDownForm: boolean = false;
  protected countPeople: number = 0;
  protected priceEvent: number = 0;
  protected priceOnePerson: number = 0;
  protected servicePrice: number = 0;

  protected readonly eventForm: FormGroup = new FormGroup<EventFormType>({
    countPeoples: new FormControl(0, Validators.required),
    dateEvent: new FormControl(null, Validators.required),
    additionalService: new FormControl(null),
    desiredMenu: new FormControl(null),
  });

  constructor(public valueService: ButtonValueService, public isShowContact: BoolShowPageService) {
    this.selectedValue = this.valueService.getSelectedValue();
    this.isShowContactComponent = this.isShowContact.getIsShowComponent()
  }

  public isNotValidForm(): void {
    if (!this.eventForm.valid || !this.valueService.isValidValue()) {
      this.isShowTextDownForm = true;
      alert('Проверьте, выбран ли формат мероприятия!');
    } else if (this.valueService.isValidValue()) {
      console.log(this.eventForm.value);
      this.isShowContact.setIsShowComponent(1)
      console.log(this.isShowContact.getIsShowComponent())
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
