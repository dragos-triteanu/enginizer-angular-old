import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BaseRequestOptions, Http, HttpModule, RequestOptions} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login";
import {RegisterComponent} from "./components/register";
import {MockBackend} from "@angular/http/testing";
import {EnginizerAlertComponent} from "./utils/alert.component";
import {AuthGuard} from "./guards";
import {AlertService, AuthenticationService, UserService} from "./services";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ProtectedComponent} from "./components/cases/cases.component";
import {routing} from "./app.routing";
import {FaqComponent} from "./components/faq/faq.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {CasesService} from "./services/cases.service";
import {DoctorService} from "./services/doctor.service";
import {CaseCardViewComponent} from "./components/cases/case-card-view/case-card-view.component";
import {ByCaseStatusPipe} from "./utils/ByCaseStatusPipe";
import {RecoveryService} from "./services/recovery.service";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";
import {DroptdownComponent} from "./components/navbar/dropdown/droptdown.component";
import {LoadingComponent} from "./components/loading/loading.component";
import {DoctorsComponent} from "./components/doctors/doctors.component";
import {AutoCompleteModule, DataTableModule, DialogModule, FileUploadModule, SharedModule} from "primeng/primeng";
import {CreateDoctorComponent} from "./components/doctors/create-doctor/create-doctor.component";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {CountdownTimerComponent} from "./components/countdown-timer/countdown-timer.component";
import {AdminGuard} from "./guards/admin.guard";
import {fakeBackendProvider} from "./mock/fake-backend";
import {AuthenticatedHttpService} from "./services/authenticatedHttp.service";


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({ headerName: 'Authorization', 
                                        headerPrefix:'Bearer ', 
                                        tokenName: 'user_token', 
                                        tokenGetter: (() => localStorage.getItem('user_token')), 
                                        noJwtError: true}), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    DialogModule,
    SharedModule,
    AutoCompleteModule,
    routing,
    FileUploadModule
  ],
  declarations: [
    AppComponent,
    EnginizerAlertComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProtectedComponent,
    FaqComponent,
    ForgotPasswordComponent,
    CaseCardViewComponent,
    ByCaseStatusPipe,
    ChangePasswordComponent,
    DroptdownComponent,
    LoadingComponent,
    DoctorsComponent,
    CreateDoctorComponent,
    GalleryComponent,
    MessagesComponent,
    CountdownTimerComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AlertService,
    AuthenticationService,
    UserService,
    CasesService,
    DoctorService,
    RecoveryService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    JwtHelper,
    { provide: Http, useClass: AuthenticatedHttpService },
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
