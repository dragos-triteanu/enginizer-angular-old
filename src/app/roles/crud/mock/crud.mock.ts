import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../shared/models/user.model';


@Injectable()
export class CrudMockInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url: string = req.url;
    let method: string = req.method;

    return casesBackend(url, method, req) || next.handle(req);
  }
}

export function casesBackend(url: string, method: string, request: HttpRequest<any>): Observable<HttpEvent<any>> {

  // Array in local storage for registered users
  const doctors: any[] = JSON.parse(localStorage.getItem('users')) || [];

  const doctorUser = new User({
    email: 'doctor@mail.com',
    password: 'doctor',
    role: 'DOCTOR'
  });

  if (doctors.length == 0) {
    doctors.push(doctorUser);
  }

  //get all doctors
  if (request.url.endsWith('api/user?role=DOCTOR') && method === "GET") {
    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    if (request.headers.get('Authorization') != null) {

      return new Observable(resp => {
        resp.next(new HttpResponse<any>({
          status: 200,
          body: doctors
        }));
        resp.complete();
      });

    } else {
      // return 401 not authorised if token is null or invalid
      return Observable.throw(new HttpErrorResponse({
        error: 'No login',
        status: 401
      }));
    }
  }
  else if(request.url.endsWith('/api/user/create') && method === 'POST'){
    if (request.headers.get('Authorization') != null) {
      var newDoctor = request.body;
      newDoctor.enabled = true;
      newDoctor.id = doctors.length + 1;
      doctors.push(newDoctor);
      localStorage.setItem('users', JSON.stringify(doctors));

      return new Observable(resp => {
        resp.next(new HttpResponse<any>({
          status: 201,
          body: newDoctor
        }));
        resp.complete();
      });

    } else {
      // return 401 not authorised if token is null or invalid
      return Observable.throw(new HttpErrorResponse({
        error: 'No login',
        status: 401
      }));
    }
  } else if (request.url.endsWith("/api/user/update") && method === 'PUT'){
    if (request.headers.get('Authorization') != null) {
        var doctorUpdate = request.body;
      return new Observable(resp => {
        resp.next(new HttpResponse<any>({
          status: 200,
          body: doctorUpdate
        }));
        resp.complete();
      });


    } else{
      // return 401 not authorised if token is null or invalid
      return Observable.throw(new HttpErrorResponse({
        error: 'No login',
        status: 401
      }));
    }
  }


  return;


}
