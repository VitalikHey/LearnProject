import {FormControl} from "@angular/forms";

export enum Steps {
  Events = 0,
  Contact = 1
}

export class Events {
  public id: number;
  public name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Service {
  public id: number;
  public name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface EventFormType {
  countPeoples: FormControl<number | null>
  dateEvent: FormControl<Date | null>
  additionalService: FormControl<string | null>
  desiredMenu: FormControl<string | null>
}
