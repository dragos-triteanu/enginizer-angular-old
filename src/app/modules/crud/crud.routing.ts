import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../shared/guards/auth.guard";
import {AdminGuard} from "../shared/guards/admin.guard";
import {CrudComponent} from "./pages/crud.component";


const appRoutes:Routes = [
  {path: '', component: CrudComponent, canActivate: [AuthGuard, AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class CrudRoutingModule {

}
