import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../shared/models/user.model';
import {Case} from '../../../shared/models/case.model';


@Injectable()
export class CasesMockInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url: string = req.url;
    const method: string = req.method;

    return casesBackend(url, method, req) || next.handle(req);
  }
}

export function casesBackend(url: string, method: string, request: HttpRequest<any>): Observable<HttpEvent<any>> {

  // Array in local storage for registered users
  const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

  const adminUser = new User({
    name: 'someone',
    email: 'admin@mail.com',
    password: 'admin',
    role: 'ADMIN'
  });

  const doctorUser = new User({
    name: 'someone',
    email: 'doctor@mail.com',
    password: 'doctor',
    role: 'DOCTOR'
  });

  if (users.length === 0) {
    users.push(adminUser, doctorUser);
  }

  // get users
  if (url.endsWith('api/case') && method === 'GET') {
    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    if (request.headers.get('Authorization') != null) {
      const someCase = new Case(1, 'Penis ache', ['http://www.qygjxz.com/data/out/193/3856596-random-image.png'], doctorUser, doctorUser, 24, 'in_progress');

      const cases: Case[] = [someCase];

      return new Observable(resp => {
        resp.next(new HttpResponse<any>({
          status: 200,
          body: cases
        }));
        resp.complete();
      });

    } else {
      return Observable.throw(new HttpErrorResponse({
        error: 'No login',
        status: 401
      }));
    }

  }


  return;


}
