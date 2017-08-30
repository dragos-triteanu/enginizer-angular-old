import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';

@Injectable()
export class CrudService {

  doctorAction = new Subject<string>();
  doctorActionAsObservable = this.doctorAction.asObservable();

  selectedDoctor = new Subject<User>();
  selectedDoctorAsObservable = this.selectedDoctor.asObservable();

  constructor(private authHttp:HttpClient){}

  announceDoctorAction(string) {
    this.doctorAction.next(string);
  }

  sendSelectDoctor(doctor) {
    this.selectedDoctor.next(doctor);
  }

  getAllDoctors(){
    return this.authHttp.get<User[]>(environment.hostUrl + "/api/user?role=DOCTOR");
  }

  assignDoctor(doctor, caseId){
    return this.authHttp.put(environment.hostUrl + "/api/case/assign?id=" + caseId,  {"doctorId" :doctor.id}).toPromise();
  }
}
