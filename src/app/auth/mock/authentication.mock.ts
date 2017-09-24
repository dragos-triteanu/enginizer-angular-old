import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user.model';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url: string = req.url;
    const method: string = req.method;

    return authenticationBackend(url, method, req) || next.handle(req);
  }
}

export function authenticationBackend(url: string, method: string, request: HttpRequest<any>): Observable<HttpEvent<any>> {

  // Array in local storage for registered users
  const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

  const adminUser = new User({
    email: 'admin@mail.com',
    password: 'admin',
    role: 'ADMIN'
  });

  const doctorUser = new User({
    email: 'doctor@mail.com',
    password: 'doctor',
    role: 'DOCTOR'
  });

  if (users.length === 0) {
    users.push(adminUser, doctorUser);
  }

  if (url.endsWith('/api/login') && method === 'POST') {
    // Get parameters from POST request
    const params: any = request.body;
    debugger
    // Find if any user matches login credentials
    const filteredUsers = users.filter(user => {
      return user.email === params.email && user.password === params.password;
    });

    // If login details are valid return 200: OK along with user details and a fake JWT Token
    if (filteredUsers.length) {
      let user = filteredUsers[0];

      if (user.role === 'ADMIN') {
        // Return response for user with role ADMIN
        return new Observable(resp => {
          resp.next(new HttpResponse<any>({
            status: 200,
            body: {
              token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImF1ZGllbmNlIjoid2ViIiwicm9sZSI6IkFETUlOIiwiY3JlYXRlZCI6MTUwMTQyOTU4OTgzNCwiZnVsbE5hbWUiOiJBZG1pbiIsImV4cCI6Mjg0MDEzMzYwMDAwMCwidXNlcklkIjoxfQ.qxV4KoW6J7ZuNS_I0ZKIWAB7u-ITGuMIXn2b8v5teRk',
              statusCode: 200
            }
          }));
          resp.complete();
        });
      } else {
        return new Observable(resp => {
          resp.next(new HttpResponse<any>({
            status: 200,
            body: {
              token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb2N0b3JAbWFpbC5jb20iLCJhdWRpZW5jZSI6IndlYiIsInJvbGUiOiJET0NUT1IiLCJjcmVhdGVkIjoxNTAxNDI5NTg5ODM0LCJmdWxsTmFtZSI6IkRvY3RvciIsImV4cCI6Mjg0MDEzMzYwMDAwMCwidXNlcklkIjoyfQ.hMv-2JhDQuTvi4bnILpJ523_vmbp_4fVXaoxSidS-fo',
              statusCode: 200
            }
          }));
          resp.complete();
        });
      }
    } else {
      // Else return 400: Bad request
      return Observable.throw(new HttpErrorResponse({
        error: 'Username or password is incorrect',
        status: 400
      }));
    }
  }

}
