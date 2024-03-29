import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PickList } from 'primeng/primeng';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { User } from '../../../../shared/models/user.model';

/**
 * Modal form for creating / updating {@link Plant} objects.
 */
@Component({
  selector: 'ngnizr-doctor-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.scss']
})
export class CrudModalComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild(PickList) pickList: PickList;

  @Output('onCreate')
  onCreate: EventEmitter<any> = new EventEmitter();
  @Output('onUpdate')
  onUpdate: EventEmitter<any> = new EventEmitter();
  @Output('onDelete')
  onDelete: EventEmitter<any> = new EventEmitter();

  @Input()
  user: User;
  @Input()
  editMode = false;

  userForm: FormGroup;

  constructor() {

  }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Opens the modal and sets up it's specific requirements.
   * @param {any} user
   */
  open(user = null) {
    this.initForm(user);
    this.modal.open();
  }

  create() {
    if (!this.userForm.invalid) {
      this.onCreate.emit(this.userForm.value);
      this.resetForm();
    }
  }

  update() {
    this.onUpdate.emit(this.userForm.value);
    this.resetForm();
  }

  remove() {
    this.onDelete.emit(this.userForm.value);
    this.resetForm();
  }


  private initForm(user = null) {
    let name = '';
    let email = '';
    this.editMode = false;

    if (user) {
      this.editMode = true;
      this.user = user;
      name = this.user.name;
      email = this.user.email;
    }

    this.userForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email])
    });
  }

  resetForm() {
    this.userForm.reset();
    this.modal.close();
    this.editMode = false;
  }


}
