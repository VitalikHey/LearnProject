import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  eventFormTypeTest,
  Events,
  Service,
  Steps,
} from './component/data-type/data-type';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
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

  public titleContinue: string = 'Продолжить';
  public titleApplication: string = 'Отправить заявку';

  protected isShowComponent: number = 0;
  protected readonly Steps: typeof Steps = Steps;
  protected priceEvent: number = 0;
  protected priceOnePerson: number = 0;
  protected arrayEvent: Array<Events> = [];
  protected valueService: Array<Service> = [];
  protected additionalService: number = 0;

  private readonly destroy$: Subject<void> = new Subject<void>();

  protected eventForm: FormControl<eventFormTypeTest | null> = new FormControl(
    null,
    Validators.required,
  );

  public ngOnInit(): void {
    this.service$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Service[]): void => {
        this.valueService = value;
      });
    this.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Events[]): void => {
        this.arrayEvent = value;
      });
    if (this.eventForm.value?.additionalService) {
      this.additionalService = this.eventForm.value?.additionalService;
    }
    this.eventForm.valueChanges.subscribe((): void => {
      switch (this.eventForm.value?.event) {
        case this.arrayEvent[0].name:
          this.priceOnePerson = this.arrayEvent[0].priceOnePerson;
          break;
        case this.arrayEvent[1].name:
          this.priceOnePerson = this.arrayEvent[1].priceOnePerson;
          break;
        case this.arrayEvent[2].name:
          this.priceOnePerson = this.arrayEvent[2].priceOnePerson;
      }

      if (
        this.eventForm.value?.countPeoples &&
        this.eventForm.value?.additionalService
      )
        this.priceEvent =
          this.priceOnePerson * this.eventForm.value?.countPeoples +
          Number(this.eventForm.value?.additionalService);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected nextStep(): void {
    if (this.eventForm.valid) {
      this.isShowComponent = Steps.Contact;
    } else {
      alert('Форма заполнена неверно!');
    }
  }
}
