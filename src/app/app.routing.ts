import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/pages/home/home.component";

const appRoutes:Routes = [
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);


