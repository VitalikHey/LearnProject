import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../data-type/data-type';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class GetApiDataEvent {
  constructor(private http: HttpClient) {}

  public getApiEvent(): Observable<Events[]> {
    return this.http.get<Events[]>('http://localhost:3000/events').pipe(
      catchError((err: unknown) => {
        console.error('Error', err);
        return of([]);
      }),
    );
  }
}
