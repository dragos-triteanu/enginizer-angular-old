import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './components/loading/loading.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {EnginizerAlertComponent} from './components/alert/alert.component';
import {ByCaseStatusPipe} from './utils/ByCaseStatusPipe';
import {CountdownTimerComponent} from './components/countdown-timer/countdown-timer.component';
import {HttpClientModule} from '@angular/common/http';
import {ModalComponent} from './components/modal/modal.component';
import {FabComponent} from './components/fab/fab.component';
import {SearchComponent} from './components/search/search.component';


@NgModule({
  declarations: [
    LoadingComponent,
    EnginizerAlertComponent,
    ByCaseStatusPipe,
    CountdownTimerComponent,
    ModalComponent,
    FabComponent,
    SearchComponent
  ],
  imports: [CommonModule, HttpClientModule],
  providers: [AuthGuard, AdminGuard],
  exports: [
    LoadingComponent,
    EnginizerAlertComponent,
    ByCaseStatusPipe,
    CountdownTimerComponent,
    ModalComponent,
    FabComponent,
    SearchComponent
  ]
})
export class SharedModule {

}
