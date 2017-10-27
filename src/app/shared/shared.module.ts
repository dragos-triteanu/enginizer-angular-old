import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule, DataTableModule, DialogModule, FileUploadModule } from 'primeng/primeng';
import { EnginizerAlertComponent } from './components/alert/alert.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { FabComponent } from './components/fab/fab.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { SearchComponent } from './components/search/search.component';
import { ByCaseStatusPipe } from './utils/ByCaseStatusPipe';


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
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DataTableModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
  ],
  providers: [],
  exports: [
    AutoCompleteModule,
    DataTableModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    LoadingComponent,
    CommonModule,
    EnginizerAlertComponent,
    ByCaseStatusPipe,
    CountdownTimerComponent,
    ModalComponent,
    FabComponent,
    SearchComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {

}
