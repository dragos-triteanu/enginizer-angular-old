import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Subject} from "rxjs";
import {User} from '../models/user';
import {AuthHttp} from 'angular2-jwt';
import {environment} from "../../environments/environment";

@Injectable()
export class DoctorService {

  doctorAction = new Subject<string>();
  doctorActionAsObservable = this.doctorAction.asObservable();

  selectedDoctor = new Subject<User>();
  selectedDoctorAsObservable = this.selectedDoctor.asObservable();

  constructor(private authHttp:AuthHttp){}

  announceDoctorAction(string) {
    this.doctorAction.next(string);
  }

  sendSelectDoctor(doctor) {
    this.selectedDoctor.next(doctor);
  }

  getAllDoctors(){
    return this.authHttp.get(environment.hostUrl + "/api/user?role=DOCTOR")
      .map((response:Response) => {
        return response.json().map((response) => {
          let doctor = new User();
          doctor.id=response.id;
          doctor.email=response.email;
          doctor.fullName=response.fullName;
          doctor.nrOfCases=response.nrOfCases;
          doctor.enabled=response.enabled;
          return doctor;
        });
      })
      .toPromise();
  }

  assignDoctor(doctor, caseId){
    return this.authHttp.put(environment.hostUrl + "/api/case/assign?id=" + caseId,  {"doctorId" :doctor.id}).toPromise();
  }
}
