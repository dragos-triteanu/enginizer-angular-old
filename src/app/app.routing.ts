import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";

const appRoutes:Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cases', loadChildren: './modules/cases/cases.module#CasesModule'},
  {path: 'crud', loadChildren: './modules/crud/crud.module#CrudModule'},

  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot(appRoutes);


