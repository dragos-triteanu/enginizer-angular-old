import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProtectedComponent} from "./components/cases/cases.component";
import {AuthGuard} from "../shared/guards/auth.guard";

const appRoutes:Routes = [
  {path: 'cases', component: ProtectedComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class CasesRoutingModule {

}
