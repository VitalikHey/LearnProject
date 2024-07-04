import {
  Component,
  forwardRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { merge, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import {
  EventFormType,
  eventFormTypeTest,
  Events,
  Service,
} from '../data-type/data-type';
import { GetApiDataEvent } from '../service/get-api-data.event';
import { GetApiAdditionalService } from '../service/get-api-additional.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EventFormComponent),
      multi: true,
    },
  ],
})
export class EventFormComponent
  implements ControlValueAccessor, OnDestroy, OnInit
{
  protected events$: Observable<Events[]> =
    inject(GetApiDataEvent).getApiEvent();
  protected service$: Observable<Service[]> = inject(
    GetApiAdditionalService,
  ).getApiService();

  public event: Events | undefined;

  protected initialPriceOnePerson: number = 0;
  protected arrayEvent: Array<Events> = [];
  protected valueService: Array<Service> = [];
  protected onChange?: (value: eventFormTypeTest) => void;
  protected onTouched?: () => void;

  private destroy$: Subject<void> = new Subject<void>();

  public writeValue(value: EventFormType): void {
    if (value) {
      this.eventForm.patchValue({
        countPeoples: value.countPeoples.value,
        dateEvent: value.dateEvent.value,
        additionalService: value.additionalService.value,
        desiredMenu: value.desiredMenu.value,
        event: value.event.value,
      });
    }
  }

  public registerOnChange(fn: (value: eventFormTypeTest) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

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

  public eventForm: FormGroup<EventFormType> = new FormGroup<EventFormType>({
    countPeoples: new FormControl(null, Validators.required),
    dateEvent: new FormControl(null, Validators.required),
    additionalService: new FormControl(null),
    desiredMenu: new FormControl(null),
    event: new FormControl(null, Validators.required),
  });

  protected valueChanges$: Observable<string | number | null | Date> = merge(
    this.eventForm.controls.event.valueChanges,
    this.eventForm.controls.countPeoples.valueChanges,
    this.eventForm.controls.additionalService.valueChanges,
    this.eventForm.controls.dateEvent.valueChanges,
  ).pipe(takeUntil(this.destroy$));

  public ngOnInit(): void {
    this.valueChanges$.subscribe((): void => {
      if (this.onChange) {
        this.onChange(this.eventForm.getRawValue());
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
