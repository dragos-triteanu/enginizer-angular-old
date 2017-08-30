import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {AutoCompleteModule, FileUploadModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {ProtectedComponent} from "./cases.component";
import {CaseCardViewComponent} from "./components/cases/case-card-view/case-card-view.component";
import {CasesRoutingModule} from "./cases.routing";
import {CasesService} from "./services/cases.service";
import { environment } from '../../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CasesInterceptor } from './mock/cases.mock';
import { AuthorizationHeaderInterceptor } from '../../shared/interceptors/auth-header-interceptor';

// Providers used to create fake backend
let mockProviders: any[] = [];

if (environment.useFakeBackend) {
  mockProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CasesInterceptor, multi: true }
  ]
}


@NgModule({
  declarations: [
    ProtectedComponent,
    CaseCardViewComponent
  ],
  providers: [
    CasesService,
    mockProviders
  ],
  imports:[
    CommonModule,
    SharedModule,
    AutoCompleteModule,
    FileUploadModule,
    FormsModule,
    CasesRoutingModule
  ]
})
export class CasesModule { }
