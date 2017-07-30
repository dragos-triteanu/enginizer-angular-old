import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProtectedComponent} from "./components/cases/cases.component";
import {FaqComponent} from "./components/faq/faq.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {DoctorsComponent} from "./components/doctors/doctors.component";
import {AdminGuard} from "./guards/admin.guard";

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'cases', component: ProtectedComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard, AdminGuard]},
  // otherwise redirect to home
  {path: '**', redirectTo: 'faq'}
];

export const routing = RouterModule.forRoot(appRoutes);


