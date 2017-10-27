import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CrudComponent } from '../roles/crud/crud.component';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CardsComponent } from '../roles/cards/cards.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cards', component: CardsComponent, canActivate: [AuthGuard]},
  {path: 'crud', component: CrudComponent, canActivate: [AdminGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class CoreRouting {

}
