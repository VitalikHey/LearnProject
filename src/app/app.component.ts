import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { eventFormTypeTest, Events } from './component/data-type/data-type';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GetApiDataEvent } from './component/service/get-api-data.event';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  protected events$: Observable<Events[]> =
    inject(GetApiDataEvent).getApiEvent();

  public titleContinue: string = 'Продолжить';
  public titleApplication: string = 'Отправить заявку';

  protected priceEvent: number = 0;
  protected priceOnePerson: number = 0;
  protected arrayEvent: Array<Events> = [];
  protected additionalService: number | undefined | null = 0;

  private readonly destroy$: Subject<void> = new Subject<void>();

  protected eventForm: FormControl<eventFormTypeTest | null> = new FormControl(
    null,
    Validators.required,
  );

  // Если активировать и деактивировать кнопку выбора события, то оно станет неизвестным, до нажатия на новую кнопку

  public ngOnInit(): void {
    this.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Events[]): void => {
        this.arrayEvent = value;
      });
    this.additionalService = this.eventForm.value?.additionalService;
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
          break;
        default:
          this.priceOnePerson = 0;
          break;
      }

      if (this.eventForm.value?.countPeoples)
        this.priceEvent =
          this.priceOnePerson * this.eventForm.value?.countPeoples +
          Number(this.eventForm.value?.additionalService);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected handleStepControl(event: Event): void {
    if (!this.eventForm.value?.dateEvent || !this.eventForm.value?.event) {
      event.preventDefault();
    }
  }
}
