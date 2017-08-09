import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BaseRequestOptions, Http, HttpModule, RequestOptions} from "@angular/http";
import {AppComponent} from "./app.component";
import {MockBackend} from "@angular/http/testing";
import {AlertService, AuthenticationService, UserService} from "./services";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {routing} from "./app.routing";
import {CasesService} from "./services/cases.service";
import {RecoveryService} from "./services/recovery.service";
import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";
import {DroptdownComponent} from "./components/navbar/dropdown/droptdown.component";
import {AutoCompleteModule, DataTableModule, DialogModule, FileUploadModule} from "primeng/primeng";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {fakeBackendProvider} from "./mock/fake-backend";
import {AuthenticatedHttpService} from "./services/authenticatedHttp.service";
import {DoctorsModule} from "./modules/doctors/doctors.module";
import {SharedModule} from "./modules/shared/shared.module";
import {AuthModule} from "./modules/auth/auth.module";
import {CasesModule} from "./modules/cases/cases.module";
import {HomeComponent} from "./components/home/home.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({ headerName: 'Authorization', 
                                        headerPrefix:'Bearer ', 
                                        tokenName: 'user_token', 
                                        tokenGetter: (() => localStorage.getItem('user_token')), 
                                        noJwtError: true}), http, options);
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    DataTableModule,
    DialogModule,
    AutoCompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    DoctorsModule,
    routing,
    FileUploadModule,
    AuthModule,
    CasesModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DroptdownComponent,
    GalleryComponent,
    MessagesComponent
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    CasesService,
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
