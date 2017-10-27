import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user.model';

@Injectable()
export class CrudService {

  constructor(private authHttp: HttpClient) {
  }

  getAllDoctors() {
    return this.authHttp.get<User[]>(environment.apiUrl + '/api/user?role=DOCTOR');
  }
}
