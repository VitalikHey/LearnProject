import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, Subject, switchMap } from 'rxjs';
import { dataClient } from '../data-type/data-type';

@Injectable()
export class SendingDataService implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public postDataForm(data: dataClient): Observable<Object> {
    return this.getAllData().pipe(
      switchMap((responseData: dataClient) => {
        const isDataExists: boolean = Object.values(responseData).some(
          (item: dataClient) => {
            return (
              item.name === data.name &&
              item.email === data.email &&
              item.dateEvent?.getTime === data.dateEvent?.getTime
            );
          },
        );

        if (isDataExists) {
          return 'Data with the same values already exists on the server.';
        } else {
          return this.postData(data);
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        return of({});
      }),
    );
  }

  private getAllData(): Observable<Object> {
    return this.http.get(
      'https://angularlearn-5bb05-default-rtdb.europe-west1.firebasedatabase.app/formValue.json/',
    );
  }

  private postData(data: dataClient): Observable<Object> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post(
        `https://angularlearn-5bb05-default-rtdb.europe-west1.firebasedatabase.app/formValue.json/`,
        data,
        { headers },
      )
      .pipe(
        catchError((err: unknown) => {
          console.log(err);
          return of({});
        }),
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
