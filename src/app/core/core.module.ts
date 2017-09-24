import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AlertService} from '../shared/services/alert.service';
import {UserService} from '../shared/services/user.service';
import {CasesService} from '../roles/cases/services/cases.service';
import {RecoveryService} from '../shared/services/recovery.service';
import {JwtHelper} from 'angular2-jwt';
import {SharedModule} from '../shared/shared.module';
import {CoreComponent} from './core.component';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {AuthModule} from '../auth/auth.module';
import {HomeComponent} from './pages/home/home.component';
import {DropdownComponent} from '../shared/components/dropdown/droptdown.component';
import {CoreRouting} from './core.routing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {CrudModule} from '../roles/crud/crud.module';
import {CasesModule} from '../roles/cases/cases.module';
import {AuthorizationHeaderInterceptor} from '../shared/interceptors/auth-header-interceptor';
import {CasesMockInterceptor} from '../roles/cases/mock/cases.mock';
import {AuthenticationInterceptor} from '../auth/mock/authentication.mock';
import {CrudMockInterceptor} from '../roles/crud/mock/crud.mock';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    CoreComponent,
    NavbarComponent,
    HomeComponent,
    DropdownComponent],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    SharedModule,
    AuthModule,
    CrudModule,
    CasesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreRouting],
  providers: [
    AlertService,
    UserService,
    CasesService,
    RecoveryService,
    JwtHelper,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CasesMockInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CrudMockInterceptor, multi: true}
  ],
  exports: [CoreComponent]
})
export class CoreModule {

}
