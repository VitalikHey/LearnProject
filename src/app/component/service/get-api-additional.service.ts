import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Service } from '../data-type/data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetApiAdditionalService {
  constructor(private http: HttpClient) {}
  public getApiService(): Observable<Service[]> {
    return this.http.get<Service[]>('http://localhost:3000/services').pipe(
      catchError((err: unknown) => {
        console.error('Error', err);
        return of([]);
      }),
    );
  }
}
