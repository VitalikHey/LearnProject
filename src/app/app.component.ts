import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  ContactFormControl,
  eventFormTypeTest,
  Events,
} from './component/data-type/data-type';
import { FormControl, Validators } from '@angular/forms';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { GetApiDataEvent } from './component/service/get-api-data.event';
import { SendingDataService } from './component/service/sending-data.service';
import { ToastrService } from 'ngx-toastr';

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

  protected sendValueForm: SendingDataService;
  protected priceEvent: number = 0;
  protected priceOnePerson: number = 0;
  protected arrayEvent: Array<Events> = [];
  protected additionalService: number | undefined | null = 0;

  private readonly destroy$: Subject<void> = new Subject<void>();

  protected readonly eventForm: FormControl<eventFormTypeTest | null> =
    new FormControl(null, Validators.required);

  protected readonly contactForm: FormControl<ContactFormControl | null> =
    new FormControl(null, Validators.required);

  constructor(
    sending$: SendingDataService,
    private toastService: ToastrService,
  ) {
    this.sendValueForm = sending$;
  }

  public ngOnInit(): void {
    this.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Events[]): void => {
        this.arrayEvent = value;
      });
    this.additionalService = this.eventForm.value?.additionalService;
    this.eventForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((): void => {
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

  protected handleClick() {
    if (this.eventForm.valid) {
      this.sendValueForm
        .postDataForm({ ...this.eventForm.value, ...this.contactForm.value })
        .pipe(
          catchError((err) => {
            this.toastService.error(`Ошибка: ${err}`);
            return of({});
          }),
        )
        .subscribe((): void => {
          this.toastService.success(`Регистрация мероприятия прошла успешно!`);
          this.eventForm.reset();
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
