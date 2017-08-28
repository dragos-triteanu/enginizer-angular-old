import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {User} from "../../../models/user";
import {Token} from "../../../models/token";
import {JwtHelper} from "angular2-jwt"
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthenticationService {

  constructor(private http:Http, private jwtHelper:JwtHelper) {
  }

  login(user:User) {

    return this.http.post(environment.hostUrl + "/api/login", user)
      .map((response:Response) => response.json())
      .toPromise();
  }

  signUpUser(user:User) {
    return this.http.post(environment.hostUrl + "/api/register",user)
                    .map((response:Response) => response.json())
                    .toPromise();
  }

  logout() {
    localStorage.removeItem('user_token');
    localStorage.removeItem("current_user");
  }

  isUserAuthenticated() {
    let token = localStorage.getItem('user_token');
    let user = localStorage.getItem('current_user');
    return user != null && token != null;
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('current_user'));
  }

  isUserWithRole(role) {
    return localStorage.getItem("current_user") != null && JSON.parse(localStorage.getItem("current_user")).role === role;
  }

  setToken(token:Token) {
    localStorage.setItem("user_token", token.token);
    let currentUser = JSON.stringify(this.jwtHelper.decodeToken(token.token));

    localStorage.setItem("current_user", currentUser);
  }

  getToken(){
    return localStorage.getItem("user_token");
  }

}
