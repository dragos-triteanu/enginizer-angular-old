import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {CrudService} from "../services/crud.service";

declare var jQuery:any;

@Component({
  selector: 'enginizer-doctors',
  templateUrl: 'crud.component.html',
  styleUrls: ['crud.component.scss']
})
export class CrudComponent implements OnInit {

  doctors:User[];

  loading = false;

  constructor(private doctorService:CrudService) {
  }


  ngOnInit() {
    var THIS = this;
    this.loading = true;
    this.doctors = []
    this.doctorService.getAllDoctors()
      .then(function (data) {
        THIS.doctors = data.slice();
        THIS.loading = false;
      }).catch(function (error) {
      console.log(error);
    });
  }

  onRowSelect(event) {
    this.doctorService.announceDoctorAction("edit");
    this.doctorService.sendSelectDoctor(this.cloneDoctor(event.data))
    this.openCreateDoctorModal();
  }

  createNewDoctor() {
    this.doctorService.announceDoctorAction("add");
    this.openCreateDoctorModal();
  }


  addOrUpdateDoctor(event) {
    let doctor = this.doctors.filter(item=>item.id == event.id)[0];

    if (doctor == undefined || doctor == null) {
      doctor = new Doctor(event.id, event.fullName, event.email, 0, true, null, null, "DOCTOR");
      this.doctors.push(doctor);
    } else {
      doctor.fullName = event.fullName;
      doctor.email = event.email;
      doctor.enabled = event.enabled;
    }
  }

  openCreateDoctorModal() {
    jQuery('#createDoctorModal').modal('open', {
      height: 300,
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
    });
  }

  ngAfterViewChecked() {
    jQuery('.modal').modal();
  }

  cloneDoctor(d:User):User {
    let doctor = new User();
    for (let prop in d) {
      doctor[prop] = d[prop];
    }
    return doctor;
  }

  lookupRowStyleClass(rowData: User) {
    return rowData.enabled ? '' : 'grayed-out';
  }
}

class Doctor implements User {
  constructor(public id, public fullName, public email, public nrOfCases, public enabled, public password, public passwordConfirmation, public role) {
  }
}


