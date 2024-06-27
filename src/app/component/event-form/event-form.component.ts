import {
  Component,
  EventEmitter,
  inject,
  Output,
  OnDestroy
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {combineLatest, debounceTime, distinctUntilChanged, Observable, Subscription} from 'rxjs';
import {EventFormType, Events, Service, steps} from '../data-type/data-type';
import {GetApiDataEvent} from '../service/get-api-data.event';
import {GetApiAdditionalService} from '../service/get-api-additional.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})

export class EventFormComponent implements OnDestroy {
  @Output() public nextStep: EventEmitter<number> = new EventEmitter<number>();
  protected events$: Observable<Events[]> =
    inject(GetApiDataEvent).getApiEvent();
  protected service$: Observable<Service[]> = inject(
    GetApiAdditionalService,
  ).getApiService();

  public priceEvent: number = 0;
  public event: Events | undefined;
  protected arrayEvent: Array<Events> = [];
  protected valueService: Array<Service> = [];


  protected eventsSubscribe: Subscription = this.events$.subscribe((value: Events[]): void => {
    this.arrayEvent = value;
  });
  protected serviceSubscription: Subscription = this.service$.subscribe((value: Service[]): void => {
    this.valueService = value;
  });

  public readonly eventForm: FormGroup<EventFormType> =
    new FormGroup<EventFormType>({
      countPeoples: new FormControl(0, Validators.required),
      dateEvent: new FormControl(null, Validators.required),
      additionalService: new FormControl(null),
      desiredMenu: new FormControl(null),
      event: new FormControl(null, Validators.required),
    });

  protected valueChanges$: Observable<[string | null, number | null, number | null]> = combineLatest([
    this.eventForm.controls.event.valueChanges,
    this.eventForm.controls.countPeoples.valueChanges,
    this.eventForm.controls.additionalService.valueChanges
  ]).pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  protected valueChange$Subscription: Subscription = this.valueChanges$.subscribe(([selectedEvent, countPeoples, additionalService]): void => {
    this.event = this.arrayEvent.find((item: Events): boolean => item.name === selectedEvent);
    if (this.event && countPeoples) {
      this.priceEvent =
        this.event.priceOnePerson *
        countPeoples +
        Number(additionalService);
    }
  })

  public ngOnDestroy(): void {
    this.eventsSubscribe.unsubscribe();
    this.serviceSubscription.unsubscribe();
    this.valueChange$Subscription.unsubscribe();
  }

  protected isValidForm(): void {
    if (!this.eventForm.valid) {
      alert('Проверьте правильность заполнения форм!');
    } else {
      this.nextStep.emit(steps.Contact);
      this.nextStep.subscribe((value: number) => console.log(value));
    }
  }
}
