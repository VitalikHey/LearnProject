import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  EventForm,
  Events,
  Service,
  steps,
} from './component/data-type/data-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { GetApiDataEvent } from './component/service/get-api-data.event';
import { GetApiAdditionalService } from './component/service/get-api-additional.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  protected events$: Observable<Events[]> =
    inject(GetApiDataEvent).getApiEvent();
  protected service$: Observable<Service[]> = inject(
    GetApiAdditionalService,
  ).getApiService();

  public title: string = 'event-task';
  protected isShowComponent: number = 0;
  protected readonly steps = steps;
  protected priceEvent: number = 0;
  protected priceOnePerson: number = 0;
  protected arrayEvent: Array<Events> = [];
  protected valueService: Array<Service> = [];

  protected eventFormGroup: FormGroup<EventForm> = new FormGroup<EventForm>({
    eventForm: new FormControl(null, Validators.required),
  });

  protected eventsSubscription: Subscription = this.events$.subscribe(
    (value: Events[]): void => {
      this.arrayEvent = value;
    },
  );
  protected serviceSubscription: Subscription = this.service$.subscribe(
    (value: Service[]): void => {
      this.valueService = value;
    },
  );

  protected additionalService: number = 0;

  public ngOnInit(): void {
    if (this.eventFormGroup.controls.eventForm.value?.additionalService) {
      this.additionalService =
        this.eventFormGroup.controls.eventForm.value?.additionalService;
    }
    this.eventFormGroup.valueChanges.subscribe((): void => {
      switch (this.eventFormGroup.controls.eventForm.value?.event) {
        case this.arrayEvent[0].name:
          this.priceOnePerson = this.arrayEvent[0].priceOnePerson;
          break;
        case this.arrayEvent[1].name:
          this.priceOnePerson = this.arrayEvent[1].priceOnePerson;
          break;
        case this.arrayEvent[2].name:
          this.priceOnePerson = this.arrayEvent[1].priceOnePerson;
      }

      if (this.eventFormGroup.controls.eventForm.value?.countPeoples &&             this.eventFormGroup.controls.eventForm.value?.additionalService)
        this.priceEvent =
          this.priceOnePerson *
            this.eventFormGroup.controls.eventForm.value?.countPeoples +
            Number(this.eventFormGroup.controls.eventForm.value?.additionalService)
    });
  }

  public ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }

  protected nextStep(): void {
    if (this.eventFormGroup.valid) {
      this.isShowComponent = steps.Contact;
      if (this.eventFormGroup.value) {
        console.log(this.valueService);
      }
    } else {
      alert('Форма заполнена неверно!');
      console.log(this.eventFormGroup.value);
    }
  }
}
