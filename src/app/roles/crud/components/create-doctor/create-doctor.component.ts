import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CrudService } from "../../services/crud.service";
import { Subscription } from "rxjs";
import { UserService } from "../../../../shared/services/user.service";
import { AlertService } from "../../../../shared/services/alert.service";
import { User } from '../../../../shared/models/user.model';


declare var jQuery: any;

@Component({
  selector: 'enginizer-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  model: any = {};
  doctor: User;

  isPasswordSameAsConfirmation = true;

  loading = false;
  idAddMode = true;
  subscription: Subscription;

  @Output()
  createdOrUpdatedDoctor: EventEmitter<any> = new EventEmitter();

  constructor(private doctorService: CrudService, private userService: UserService, private alertService: AlertService) {
    this.subscription = doctorService.doctorActionAsObservable.subscribe(op => {
      this.idAddMode = op == "add";
    });
    this.subscription = doctorService.selectedDoctorAsObservable.subscribe(doctor => {
      this.model = doctor;
    });
  }

  confirmationMatches() {
    if (this.model.password === this.model.passwordConfirmation) {
      this.isPasswordSameAsConfirmation = true;
    } else {
      this.isPasswordSameAsConfirmation = false;
    }
    return this.isPasswordSameAsConfirmation;
  }


  closeModal() {
    jQuery('#createDoctorModal').modal('close');
    jQuery('#doctorForm').trigger('reset');
  }

  ngOnInit() {
  }

  createOrUpdateDoctor() {
    if (this.idAddMode) {
      this.createDoctor();
    } else {
      this.updateDoctor();
    }
  }

  createDoctor() {
    this.loading = true;
    this.model.role = "DOCTOR";

    this.userService.createUser(this.model).subscribe(
      (data) => {
        this.loading = false;
        this.createdOrUpdatedDoctor.emit(data);
        this.closeModal();
      }, (error) => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  updateDoctor() {
    this.loading = true;

    this.userService.updateDoctor(this.model).subscribe(
      (data) => {
        this.loading = false;
        this.createdOrUpdatedDoctor.emit(data);
        this.closeModal();
      },
      (error) => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
