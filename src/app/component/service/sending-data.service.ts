import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SendingDataService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public postDataForm(data: any): Observable<Object> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      `https://angularlearn-5bb05-default-rtdb.europe-west1.firebasedatabase.app/formValue.json/`,
      data,
      { headers },
    );
  }
}
