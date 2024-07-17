import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { dataClient } from '../data-type/data-type';
import { ToastService } from './toast.service';

@Injectable()
export class SendingDataService {
  private http: HttpClient;
  constructor(
    http: HttpClient,
    private toastService: ToastService,
  ) {
    this.http = http;
  }

  public postDataForm(data: dataClient): Observable<Object> {
    return this.getAllData().pipe(
      switchMap((responseData: dataClient) => {
        const isDataExists: boolean = Object.values(responseData).some(
          (item: dataClient) => {
            return (
              String(item.dateEvent).substring(0, 10) ===
                String(data.dateEvent).substring(0, 10) &&
              item.name === data.name &&
              item.email === data.email
            );
          },
        );

        if (isDataExists) {
          this.toastService.errorShow(
            `Вы уже забронировали мероприятие на это имя на ${data.dateEvent}`,
          );
          return of({});
        } else {
          this.toastService.successShow('Регистрация прошла успешно!');
          return this.postData(data);
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        return of(false);
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
}
