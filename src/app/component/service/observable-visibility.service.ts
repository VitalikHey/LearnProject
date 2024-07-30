import { Inject, Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  shareReplay,
  Subscriber,
} from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ObservableVisibilityService extends Observable<boolean> {
  constructor() {
    const documentRef = Inject(DOCUMENT);
    const $visibilityChange: Observable<boolean> = fromEvent(
      documentRef,
      'visibilitychange',
    ).pipe(
      map((): boolean => documentRef.visibilityState !== 'hidden'),
      distinctUntilChanged(),
      shareReplay(),
    );
    super((subscriber: Subscriber<boolean>) =>
      $visibilityChange.subscribe(subscriber),
    );
  }
}
