import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DoctorsComponent} from "./doctors.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {AdminGuard} from "../shared/guards/admin.guard";


const appRoutes:Routes = [
  {path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard, AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule {

}
