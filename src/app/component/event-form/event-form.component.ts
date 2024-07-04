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
import { filter, merge, Observable, Subject, takeUntil } from 'rxjs';
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
  protected readonly events$: Observable<Events[]> =
    inject(GetApiDataEvent).getApiEvent();

  protected readonly service$: Observable<Service[]> = inject(
    GetApiAdditionalService,
  ).getApiService();

  public event: Events | undefined;

  protected initialPriceOnePerson: number = 0;
  protected arrayEvent: Array<Events> = [];
  protected valueService: Array<Service> = [];
  protected onChange?: (value: eventFormTypeTest) => void;
  protected onTouched?: () => void;

  private readonly destroy$: Subject<void> = new Subject<void>();

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

  protected readonly eventForm: FormGroup<EventFormType> =
    new FormGroup<EventFormType>({
      countPeoples: new FormControl(0, Validators.min(10)),
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

    this.valueChanges$
      .pipe(
        filter(() => {
          return this.eventForm.valid;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((): void => {
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
