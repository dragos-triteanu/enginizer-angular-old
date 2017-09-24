import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AutoCompleteModule, DataTableModule, DialogModule, FileUploadModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {CrudComponent} from './crud.component';
import {CrudRoutingModule} from './crud.routing';
import {CrudService} from './services/crud.service';
import {CrudModalComponent} from './components/crud-modal/crud-modal.component';

@NgModule({
  declarations: [
    CrudComponent,
    CrudModalComponent
  ],
  providers: [
    CrudService
  ],
  imports: [
    CommonModule,
    SharedModule,
    AutoCompleteModule,
    DataTableModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    CrudRoutingModule
  ]
})
export class CrudModule {

}
