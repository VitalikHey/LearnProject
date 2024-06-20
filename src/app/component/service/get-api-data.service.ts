import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events, Service } from '../data-type/data-type';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class GetApiDataService {
  constructor(private http: HttpClient) {}

  public getApiEvent(): Observable<Events[]> {
    return this.http.get<Events[]>('http://localhost:3000/events').pipe(
      catchError((err: unknown) => {
        console.error('Error', err);
        return of([]);
      }),
    );
  }
  public getApiService(): Observable<Service[]> {
    return this.http.get<Service[]>('http://localhost:3000/services').pipe(
      catchError((err: unknown) => {
        console.error('Error', err);
        return of([]);
      }),
    );
  }
}
