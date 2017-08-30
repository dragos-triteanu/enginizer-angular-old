import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';


declare var firebase: any;

@Injectable()
export class UserService {

  constructor(private authHttp: HttpClient) {
  }

  updateDoctor(user: User) {
    return this.authHttp.put(environment.hostUrl + "/api/user/update", user);
  }

  createUser(user: User) {
    return this.authHttp.post<User>(environment.hostUrl + "/api/user/create", user);
  }
}
