import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CrudService } from "./services/crud.service";
import { User } from '../../shared/models/user.model';

declare var jQuery: any;

@Component({
  selector: 'enginizer-doctors',
  templateUrl: 'crud.component.html',
  styleUrls: ['crud.component.scss']
})
export class CrudComponent implements OnInit {

  doctors: User[];

  loading = false;

  constructor(private doctorService: CrudService) {
  }

  ngOnInit() {
    this.loading = true;
    this.doctors = []
    this.doctorService.getAllDoctors().subscribe(
      (data) => {
        this.doctors = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      })
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
    if (event) {

      if (this.doctors.some(value => value.id === event.id)) {
        let duplicateUser = this.doctors.filter(doc => {
          return doc.id === event.id;
        })[0];
        let index = this.doctors.indexOf(duplicateUser);
        this.doctors[index] = event;

      } else {
        this.doctors = [...this.doctors, event];
      }
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

  cloneDoctor(d: User): User {
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
