import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JsonInterceptorService implements HttpInterceptor {
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<HttpEventType>> {
    let url: string = req.url;

    if (!url.endsWith('.json')) {
      url += '.json';
    }

    const clonedReq: HttpRequest<unknown> = req.clone({ url });

    return next.handle(clonedReq);
  }
}
