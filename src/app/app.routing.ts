import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot(appRoutes);


