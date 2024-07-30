import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ContactFormControl,
  eventFormTypeTest,
  Events,
} from './component/data-type/data-type';
import { FormControl, Validators } from '@angular/forms';
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  takeWhile,
  timer,
} from 'rxjs';
import { GetApiDataEvent } from './component/service/get-api-data.event';
import { SendingDataService } from './component/service/sending-data.service';
import { ToastrService } from 'ngx-toastr';
import { ObservableFocusService } from './component/service/observable-focus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public titleContinue: string = 'Продолжить';
  public titleApplication: string = 'Отправить заявку';

  protected priceEvent: number = 0;
  protected priceOnePerson: number = 0;
  protected arrayEvent: Array<Events> = [];
  protected additionalService: number | undefined | null = 0;
  protected events$: Observable<Events[]> =
    inject(GetApiDataEvent).getApiEvent();

  private readonly destroy$: Subject<void> = new Subject<void>();

  protected readonly eventForm: FormControl<eventFormTypeTest | null> =
    new FormControl(null, Validators.required);

  protected readonly contactForm: FormControl<ContactFormControl | null> =
    new FormControl(null, Validators.required);

  constructor(
    private focus$: ObservableFocusService,
    private sending: SendingDataService,
    private toastService: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.countDown(0)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number): void => console.log(value));
    this.focus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((target: EventTarget | null): void => {
        console.log(target);
      });
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

  // Обратный отсчет на RxJs

  private countDown(initialNumber: number): Observable<number> {
    return timer(0, 1000).pipe(
      map((value: number) => {
        return initialNumber - value;
      }),
      takeWhile(Boolean, true),
      takeUntil(this.destroy$),
    );
  }

  protected handleClick(): void {
    if (this.eventForm.valid) {
      this.sending
        .postDataForm({ ...this.eventForm.value, ...this.contactForm.value })
        .pipe(
          catchError((err) => {
            this.toastService.error(`Ошибка: ${err}`);
            return of({});
          }),
        )
        .subscribe((): void => {
          this.eventForm.reset();
          this.contactForm.reset();
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly event = event;
}
