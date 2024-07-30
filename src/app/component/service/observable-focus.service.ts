import { Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Observable,
  Subscriber,
} from 'rxjs';

@Injectable()
export class ObservableFocusService extends Observable<EventTarget | null> {
  constructor() {
    const focus$: Observable<EventTarget | null> = merge(
      fromEvent(document, 'focusin').pipe(map((event: Event) => event.target)),
      fromEvent(document, 'focusout').pipe(map((event: Event) => event.target)),
    ).pipe(
      distinctUntilChanged(),
      map((target: EventTarget | null) => target || null),
    );

    super((subscriber: Subscriber<EventTarget | null>) =>
      focus$.subscribe(subscriber),
    );
  }
}
