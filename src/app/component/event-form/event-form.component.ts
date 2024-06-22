import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventFormType, Events, Service } from '../data-type/data-type';
import { GetApiDataService } from '../service/get-api-data.service';
import { BoolShowPageService } from '../service/bool-show-page.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
@Input()
export class EventFormComponent implements OnInit {
  protected events$: Observable<Events[]> =
    inject(GetApiDataService).getApiEvent();
  protected service$: Observable<Service[]> =
    inject(GetApiDataService).getApiService();

  protected isShowTextDownForm: boolean = false;
  public priceEvent: number = 0;
  protected event: Events | undefined;
  protected arrayEvent: Array<Events> = [];
  protected valueService: Array<Service> = [];

  protected readonly eventForm: FormGroup<EventFormType> =
    new FormGroup<EventFormType>({
      countPeoples: new FormControl(0, Validators.required),
      dateEvent: new FormControl(null, Validators.required),
      additionalService: new FormControl(null),
      desiredMenu: new FormControl(null),
      event: new FormControl(null, Validators.required),
    });

  constructor(public isShowContact: BoolShowPageService) {}

  public ngOnInit(): void {
    this.events$.subscribe((value: Events[]): void => {
      this.arrayEvent = value;
    });
    this.service$.subscribe((value: Service[]): void => {
      this.valueService = value;
    });
    this.eventForm.valueChanges.subscribe((): void => {
      this.event = this.arrayEvent.find(
        (item: Events): boolean =>
          item.name === this.eventForm.controls.event.value,
      );
      if (
        this.event &&
        this.eventForm.controls.countPeoples.value &&
        this.eventForm.controls.additionalService.value
      ) {
        this.priceEvent =
          this.event.priceOnePerson *
            this.eventForm.controls.countPeoples.value +
          Number(this.eventForm.controls.additionalService.value);
      }
    });
  }

  protected isValidForm(): void {
    if (!this.eventForm.valid) {
      this.isShowTextDownForm = true;
      alert('Проверьте, выбран ли формат мероприятия!');
    } else {
      this.isShowContact.setIsShowComponent(1)
    }
  }
}
