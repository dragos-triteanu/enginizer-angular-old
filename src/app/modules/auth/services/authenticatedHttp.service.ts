import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";


@Injectable()
export class AuthenticatedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions,private router:Router, private alertService:AlertService ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((error: Response) => {
      if ((error.status === 401 || error.status === 403) && window.location.href.indexOf('login') == -1){
          localStorage.removeItem('user_token');
          localStorage.removeItem("current_user");
          this.router.navigate(['login']);
      }

      if(error.status >= 409) {
        this.alertService.error(error);
      }

      if(error.status >= 500) {
        this.alertService.error(error);
      }

      return Observable.throw(error);
    });
  }
}
