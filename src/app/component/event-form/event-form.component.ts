import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventFormType, Events, Service, steps } from '../data-type/data-type';
import { GetApiDataEvent } from '../service/get-api-data.event';
import { GetApiAdditionalService } from '../service/get-api-additional.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
@Input()
export class EventFormComponent implements OnInit {
  @Output() public nextStep: EventEmitter<number> = new EventEmitter<number>();
  protected events$: Observable<Events[]> =
    inject(GetApiDataEvent).getApiEvent();
  protected service$: Observable<Service[]> = inject(
    GetApiAdditionalService,
  ).getApiService();

  protected isShowTextDownForm: boolean = false;
  public priceEvent: number = 0;
  public event: Events | undefined;
  protected arrayEvent: Array<Events> = [];
  protected valueService: Array<Service> = [];

  public readonly eventForm: FormGroup<EventFormType> =
    new FormGroup<EventFormType>({
      countPeoples: new FormControl(0, Validators.required),
      dateEvent: new FormControl(null, Validators.required),
      additionalService: new FormControl(null),
      desiredMenu: new FormControl(null),
      event: new FormControl(null, Validators.required),
    });

  public ngOnInit(): void {
    this.events$.subscribe((value: Events[]): void => {
      this.arrayEvent = value;
    });
    this.service$.subscribe((value: Service[]): void => {
      this.valueService = value;
    });
    this.eventForm.controls.event.valueChanges.subscribe((): void => {
      this.event = this.arrayEvent.find(
        (item: Events): boolean =>
          item.name === this.eventForm.controls.event.value,
      );
      if (this.event && this.eventForm.controls.countPeoples.value) {
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
      this.nextStep.emit(steps.Contact);
      this.nextStep.subscribe((value: number) => console.log(value));
    }
  }
}
