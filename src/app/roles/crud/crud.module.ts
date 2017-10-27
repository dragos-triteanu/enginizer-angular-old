import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CrudModalComponent } from './components/crud-modal/crud-modal.component';
import { CrudComponent } from './crud.component';
import { CrudRoutingModule } from './crud.routing';
import { CrudService } from './services/crud.service';

@NgModule({
  declarations: [
    CrudComponent,
    CrudModalComponent
  ],
  providers: [
    CrudService
  ],
  imports: [
    SharedModule,
    CrudRoutingModule
  ]
})
export class CrudModule {

}
