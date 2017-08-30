import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { AlertService, AuthenticationService, UserService } from "./modules/shared/services";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { routing } from "./app.routing";
import { RecoveryService } from "./modules/shared/services/recovery.service";
import { JwtHelper } from "angular2-jwt";
import { DroptdownComponent } from "./components/navbar/dropdown/droptdown.component";
import { AutoCompleteModule, DataTableModule, DialogModule, FileUploadModule } from "primeng/primeng";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { SharedModule } from "./modules/shared/shared.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CasesModule } from "./modules/cases/cases.module";
import { HomeComponent } from "./pages/home/home.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CrudModule } from "./modules/crud/crud.module";
import { CasesService } from "./modules/cases/services/cases.service";


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
    CrudModule,
    routing,
    FileUploadModule,
    AuthModule,
    CasesModule,
    HttpClientModule
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
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
