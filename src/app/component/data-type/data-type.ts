import { FormControl } from '@angular/forms';

export enum steps {
  Event = 0,
  Contact = 1,
}

export class Events {
  public id: number;
  public name: string;
  public priceOnePerson: number;
  constructor(id: number, name: string, priceOnePerson: number) {
    this.id = id;
    this.name = name;
    this.priceOnePerson = priceOnePerson;
  }
}

export class Service {
  public id: number;
  public name: string;
  public price: number;
  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export type EventType = [
  number | null,
  Date | null,
  number | null,
  string | null,
  number | null,
];

export interface eventFormTypeTest {
  countPeoples: number | null;
  dateEvent: Date | null;
  additionalService: number | null;
  desiredMenu: string | null;
  event: string | null;
}

export interface EventForm {
  eventForm: FormControl<eventFormTypeTest | null>;
}

export interface EventFormType {
  countPeoples: FormControl<number | null>;
  dateEvent: FormControl<Date | null>;
  additionalService: FormControl<number | null>;
  desiredMenu: FormControl<string | null>;
  event: FormControl<string | null>;
}

export interface ContactFormType {
  name: FormControl<string | null>;
  number: FormControl<number | null>;
  email: FormControl<string | null>;
}
