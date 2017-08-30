﻿import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {JwtHelper} from "angular2-jwt"
import {environment} from "../../../environments/environment";
import { User } from '../../shared/models/user.model';
import { Token } from '../../shared/models/token.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http:HttpClient, private jwtHelper:JwtHelper) {
  }

  login(user:User) {
    return this.http.post(environment.hostUrl + "/api/login", user);
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

  setToken(token:any) {
    localStorage.setItem("user_token", token.token);
    let currentUser = JSON.stringify(this.jwtHelper.decodeToken(token));

    localStorage.setItem("current_user", currentUser);
  }

  getToken(){
    return localStorage.getItem("user_token");
  }

}