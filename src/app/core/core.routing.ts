import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { ProtectedComponent } from '../roles/cases/cases.component';
import { CrudComponent } from '../roles/crud/crud.component';

const appRoutes:Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cases', component: ProtectedComponent},
  {path: 'crud', component: CrudComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class CoreRouting {

}
