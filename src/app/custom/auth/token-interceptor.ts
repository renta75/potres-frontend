import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private userName = 'ivan';
    private authToken = '6g0E9e6w1J2y9o9B9j9o';

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: 'Basic ' + btoa(this.userName + ':' + this.authToken)
      }
    });
    return next.handle(request);
  }
}
