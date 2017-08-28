import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "../shared/guards/auth.guard";
import {AdminGuard} from "../shared/guards/admin.guard";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth.routing";
import {FormsModule} from "@angular/forms";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";
import {AuthenticationService} from "./services/authentication.service";
import {AuthenticatedHttpService} from "./services/authenticatedHttp.service";


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [CommonModule, SharedModule, FormsModule, AuthRoutingModule],
  providers: [AuthGuard, AdminGuard,AuthenticationService,AuthenticatedHttpService]
})
export class AuthModule {

}
