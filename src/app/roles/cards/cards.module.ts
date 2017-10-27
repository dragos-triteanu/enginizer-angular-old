import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AutoCompleteModule, FileUploadModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { CasesService } from './services/cases.service';
import { CardsComponent } from './cards.component';
import { CardsRoutingModule } from './cards.routing';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    CardsComponent,
    CardComponent,
  ],
  providers: [
    CasesService
  ],
  imports: [
    CommonModule,
    SharedModule,
    AutoCompleteModule,
    FileUploadModule,
    FormsModule,
    CardsRoutingModule
  ]
})
export class CardsModule {
}
