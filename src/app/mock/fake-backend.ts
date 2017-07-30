import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {User} from "../models/user";
import {Case} from "../models/case";

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
  // array in local storage for registered users
  let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

  var adminUser = new User();
  adminUser.id = 1;
  adminUser.email = "admin@mail.com"
  adminUser.fullName = "Admin";
  adminUser.password = "admin"
  adminUser.passwordConfirmation = "admin";
  adminUser.role = "ADMIN";

  var doctorUser = new User();
  doctorUser.id = 2;
  doctorUser.email = "doctor@mail.com"
  doctorUser.fullName = "Doctor";
  doctorUser.password = "doctor"
  doctorUser.passwordConfirmation = "doctor";
  doctorUser.role = "DOCTOR";
  doctorUser.nrOfCases = 1;

  if(users.length == 0){
    users.push(adminUser,doctorUser);
  }

  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    // wrap in timeout to simulate server api call
    setTimeout(() => {

      // authenticate
      if (connection.request.url.endsWith('/api/login') && connection.request.method === RequestMethod.Post) {
        // get parameters from post request
        let params = JSON.parse(connection.request.getBody());

        // find if any user matches login credentials
        let filteredUsers = users.filter(user => {
          return user.email === params.email && user.password === params.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          let user = filteredUsers[0];

          if(user.role === "ADMIN"){
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: {
                token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImF1ZGllbmNlIjoid2ViIiwicm9sZSI6IkFETUlOIiwiY3JlYXRlZCI6MTUwMTQyOTU4OTgzNCwiZnVsbE5hbWUiOiJBZG1pbiIsImV4cCI6Mjg0MDEzMzYwMDAwMCwidXNlcklkIjoxfQ.qxV4KoW6J7ZuNS_I0ZKIWAB7u-ITGuMIXn2b8v5teRk'
              }
            })));
          } else{
            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: {
                token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb2N0b3JAbWFpbC5jb20iLCJhdWRpZW5jZSI6IndlYiIsInJvbGUiOiJET0NUT1IiLCJjcmVhdGVkIjoxNTAxNDI5NTg5ODM0LCJmdWxsTmFtZSI6IkRvY3RvciIsImV4cCI6Mjg0MDEzMzYwMDAwMCwidXNlcklkIjoyfQ.hMv-2JhDQuTvi4bnILpJ523_vmbp_4fVXaoxSidS-fo'
              }
            })));
          }
        } else {
          // else return 400 bad request
          connection.mockError(new Error('Username or password is incorrect'));
        }

        return;
      }

      // get users
      if (connection.request.url.endsWith('api/user?role=DOCTOR') && connection.request.method === RequestMethod.Get) {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') != null) {
          var doctors = users.filter(user => {
            return user.role === "DOCTOR";
          });

          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: doctors })));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }

      // Create users NOT YET DONE
      if (connection.request.url.endsWith('/api/user/create') && connection.request.method === RequestMethod.Post) {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') != null) {
          var newDoctor = JSON.parse(connection.request.getBody());
          newDoctor.enabled = true;
          newDoctor.id = users.length + 1;
          users.push(newDoctor);
          localStorage.setItem('users', JSON.stringify(users));
          connection.mockRespond(new Response(new ResponseOptions({ status: 201, body: doctors })));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }

      // create user
      if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
        // get new user object from post body
        let newUser = JSON.parse(connection.request.getBody());

        // validation
        let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
        if (duplicateUser) {
          return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

        return;
      }

      // delete user
      if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          let urlParts = connection.request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.id === id) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }

          // respond 200 OK
          connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }

      // get users
      if (connection.request.url.endsWith('api/case') && connection.request.method === RequestMethod.Get) {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') != null) {
          var someCase = new Case(1,"Penis ache",["http://www.qygjxz.com/data/out/193/3856596-random-image.png"],doctorUser,doctorUser,24,"in_progress");

          var cases:Case[] = [someCase];
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: cases })));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }


      // pass through any requests not handled above
      let realHttp = new Http(realBackend, options);
      let requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType
      });
      realHttp.request(connection.request.url, requestOptions)
        .subscribe((response: Response) => {
            connection.mockRespond(response);
          },
          (error: any) => {
            connection.mockError(error);
          });

    }, 500);

  });

  return new Http(backend, options);
};

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
