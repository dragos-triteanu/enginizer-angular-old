import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "../shared/guards/auth.guard";
import {AdminGuard} from "../shared/guards/admin.guard";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth.routing";
import {FormsModule} from "@angular/forms";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [CommonModule, SharedModule, FormsModule, AuthRoutingModule],
  providers: [AuthGuard, AdminGuard]
})
export class AuthModule {

}
