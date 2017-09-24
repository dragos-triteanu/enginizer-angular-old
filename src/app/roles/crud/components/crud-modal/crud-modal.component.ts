import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  doctor: User;

  constructor() {

  }

  ngOnInit() {
  }

  /**
   * Opens the modal and sets up it's specific requirements.
   * @param {any} plant
   */
  open() {
    this.modal.open();
  }

  create() {
    this.onCreate.emit(this.doctor);
    this.modal.close();
  }

  update() {
    this.onUpdate.emit(this.doctor);
    this.modal.close();
  }

  remove() {
    this.onDelete.emit(this.doctor);
    this.modal.close();
  }

}
