import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { dataClient, responseServer } from '../data-type/data-type';
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

  public postDataForm(data: dataClient): Observable<boolean | responseServer> {
    return this.getAllData().pipe(
      switchMap((responseData: responseServer): Observable<responseServer> => {
        const isDataExists: boolean = Object.values(responseData).some(
          (item: responseServer) => {
            return (
              new Date(String(data.dateEvent)).toLocaleDateString('ru-Ru') ===
                new Date(String(item.dateEvent)).toLocaleDateString('ru-Ru') &&
              item.name === data.name &&
              item.email === data.email
            );
          },
        );

        if (isDataExists) {
          this.toastService.errorShow(
            `Вы уже забронировали мероприятие на это имя на ${new Date(String(data.dateEvent)).toLocaleDateString('ru-Ru')}`,
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

  private getAllData(): Observable<responseServer> {
    return this.http.get(
      'https://angularlearn-5bb05-default-rtdb.europe-west1.firebasedatabase.app/formValue.json/',
    );
  }

  private postData(data: dataClient): Observable<responseServer> {
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
