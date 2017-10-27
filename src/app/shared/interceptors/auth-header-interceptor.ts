import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

/**
 * Interceptor class for adding the JWT Authorization header to all the requests mad to the API.
 */
@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {
  readonly AUTHORIZATION_HEADER = 'Authorization';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({headers: req.headers.set(this.AUTHORIZATION_HEADER, 'Bearer ' + localStorage.getItem('user_token'))});

    return next.handle(clonedRequest).catch((res) => {

      if (res.status === 401 || res.status === 403) {
        console.log('TODO: Handle');
      } else if (res.status === 404) {
        console.log('TODO: Handle');
      } else {
        return Observable.throw(res);
      }
    });
  }
}
