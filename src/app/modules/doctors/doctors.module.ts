import {NgModule} from "@angular/core";
import {DoctorsComponent} from "./doctors.component";
import {CreateDoctorComponent} from "./create-doctor/create-doctor.component";
import {DoctorService} from "./services/doctor.service";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {AutoCompleteModule, DataTableModule, DialogModule, FileUploadModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {DoctorsRoutingModule} from "./doctors.routing";

@NgModule({
  declarations: [
    DoctorsComponent,
    CreateDoctorComponent,
  ],
  providers: [
    DoctorService
  ],
  imports:[
    CommonModule,
    SharedModule,
    AutoCompleteModule,
    DataTableModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    DoctorsRoutingModule
  ]
})
export class DoctorsModule {

}
