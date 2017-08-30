import {NgModule} from "@angular/core";
import {CreateDoctorComponent} from "./components/create-doctor/create-doctor.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {AutoCompleteModule, DataTableModule, DialogModule, FileUploadModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {CrudComponent} from "./pages/crud.component";
import {CrudRoutingModule} from "./crud.routing";
import {CrudService} from "./services/crud.service";
import { environment } from '../../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrudMockInterceptor } from './mock/crud.mock';
import { AuthorizationHeaderInterceptor } from '../shared/interceptors/auth-header-interceptor';

// Providers used to create fake backend
let mockProviders: any[] = [];

if (environment.useFakeBackend) {
  mockProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CrudMockInterceptor, multi: true }
  ]
}

@NgModule({
  declarations: [
    CrudComponent,
    CreateDoctorComponent,
  ],
  providers: [
    CrudService,
    mockProviders
  ],
  imports:[
    CommonModule,
    SharedModule,
    AutoCompleteModule,
    DataTableModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    CrudRoutingModule
  ]
})
export class CrudModule {

}
