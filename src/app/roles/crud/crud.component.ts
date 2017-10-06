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
  @ViewChild(CrudModalComponent) userModal: CrudModalComponent;

  users: User[] = [];
  loading = false;
  selectedUser: User;

  constructor(private doctorService: CrudService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getAllUsers();

  }

  onRowSelect(event) {
    this.selectedUser = event.data;
    this.userModal.open(this.selectedUser);
  }

  openCrudModal() {
    this.selectedUser = new User();
    this.userModal.open();
  }


  lookupRowStyleClass(rowData: User) {
    return rowData.enabled ? '' : 'grayed-out';
  }

  getAllUsers() {
    this.doctorService.getAllDoctors().subscribe(
      (data) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }


  createUser(user: User) {
    this.users = [...this.users, user];
  }


}
