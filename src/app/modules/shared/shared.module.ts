import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingComponent} from "./components/loading/loading.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {EnginizerAlertComponent} from "./utils/alert.component";
import {ByCaseStatusPipe} from "./utils/ByCaseStatusPipe";
import {FormsModule} from "@angular/forms";
import {CountdownTimerComponent} from "./components/countdown-timer/countdown-timer.component";


@NgModule({
  declarations: [LoadingComponent, EnginizerAlertComponent, ByCaseStatusPipe, CountdownTimerComponent],
  imports: [CommonModule],
  providers: [AuthGuard, AdminGuard],
  exports: [LoadingComponent, EnginizerAlertComponent, ByCaseStatusPipe, CountdownTimerComponent]
})
export class SharedModule {

}
