import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudService} from './services/crud.service';
import {User} from '../../shared/models/user.model';
import {CrudModalComponent} from './components/crud-modal/crud-modal.component';

@Component({
  selector: 'ngnizr-crud',
  templateUrl: 'crud.component.html',
  styleUrls: ['crud.component.scss']
})
export class CrudComponent implements OnInit {
  @ViewChild(CrudModalComponent) doctorModal: CrudModalComponent;

  doctors: User[] = [];
  loading = false;
  selectedDoctor: User;

  constructor(private doctorService: CrudService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getAllDoctors();

  }

  onRowSelect(event) {
    this.selectedDoctor = event.data;
    this.doctorModal.open();
  }

  openCrudModal() {
    this.selectedDoctor = new User();
    this.doctorModal.open();
  }


  lookupRowStyleClass(rowData: User) {
    return rowData.enabled ? '' : 'grayed-out';
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data) => {
        this.doctors = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }


}
