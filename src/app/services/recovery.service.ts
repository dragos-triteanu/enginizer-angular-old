import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {User} from "../models/user";
import {environment} from "../../environments/environment";


@Injectable()
export class RecoveryService {


  constructor(private http:Http) {
  }

  recovery(user:User) {
    return this.http.post(environment.hostUrl + "/api/password/forgot", user)
      .toPromise();
  }

  changePassword(model,token){
    return this.http.post(environment.hostUrl + "/api/password/reset?token="+token, model)
      .map((response:Response) => response.json())
      .toPromise();
  }
}
