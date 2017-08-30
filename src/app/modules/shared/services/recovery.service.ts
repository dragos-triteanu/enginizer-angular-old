import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';


@Injectable()
export class RecoveryService {


  constructor(private http: HttpClient) {
  }

  recovery(user: User) {
    return this.http.post(environment.hostUrl + "/api/password/forgot", user)
      .toPromise();
  }

  changePassword(model, token) {
    return this.http.post(environment.hostUrl + "/api/password/reset?token=" + token, model)
      .map((response: Response) => response.json())
      .toPromise();
  }
}
