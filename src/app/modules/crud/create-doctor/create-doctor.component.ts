import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {CrudService} from "../services/crud.service";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {AlertService} from "../../../services/alert.service";


declare var jQuery: any;

@Component({
  selector: 'enginizer-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  model:any = {};
  doctor:User;

  isPasswordSameAsConfirmation = true;

  loading = false;
  idAddMode = true;
  subscription: Subscription;

  @Output()
  createdOrUpdatedDoctor:EventEmitter<any> = new EventEmitter();

  constructor(private doctorService:CrudService, private userService : UserService, private alertService: AlertService) {
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
    if(this.idAddMode) {
     this.createDoctor();
    }else {
       this.updateDoctor();
    }
  }

  createDoctor(){
    var THIS = this;
    this.loading = true;
    this.model.role="DOCTOR";

     this.userService.createUser(this.model).then(
       function (success) {
         THIS.loading = false;
         THIS.createdOrUpdatedDoctor.emit(success);
         THIS.closeModal();
       },
       function (error) {
         THIS.alertService.error(error);
         THIS.loading = false;
       });
   }

   updateDoctor(){
     var THIS = this;
     this.loading = true;

     this.userService.updateDoctor(this.model).then(
       function (success) {
         THIS.loading = false;
         THIS.createdOrUpdatedDoctor.emit(success);
         THIS.closeModal();
       },
       function (error) {
         THIS.alertService.error(error);
         THIS.loading = false;
       });
   }
}
