import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";

const appRoutes:Routes = [
  {path: 'home', component: HomeComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot(appRoutes);


