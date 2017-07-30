import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {AuthHttp} from 'angular2-jwt';
import {User} from '../models/user';
import {environment} from "../../environments/environment";


declare var firebase:any;

@Injectable()
export class UserService {

  constructor(private authHttp:AuthHttp) {
  }

  updateDoctor(user:User) {
    return this.authHttp.put(environment.hostUrl + "/api/user/update",user)
      .map((response:Response) => response.json())
      .toPromise();
  }

  createUser(user:User){
    return this.authHttp.post(environment.hostUrl + "/api/user/create",user)
      .map((response:Response) => response.json())
      .toPromise();
  }
}
