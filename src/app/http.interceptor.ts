import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable, EMPTY, NEVER, throwError } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedReq = request.clone({});
        modifiedReq = modifiedReq.clone({
            setHeaders: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        });

        if (request.method === 'DELETE') {
            if (!confirm('Jeste li sigurni da želite trajno izbrisati odabrani podatak?')) {
                return NEVER;
            }
        }
        return next.handle(modifiedReq);
    }
}
