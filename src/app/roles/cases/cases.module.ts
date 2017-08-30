import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { AutoCompleteModule, FileUploadModule } from "primeng/primeng";
import { FormsModule } from "@angular/forms";
import { ProtectedComponent } from "./cases.component";
import { CaseCardViewComponent } from "./components/cases/case-card-view/case-card-view.component";
import { CasesRoutingModule } from "./cases.routing";
import { CasesService } from "./services/cases.service";

@NgModule({
  declarations: [
    ProtectedComponent,
    CaseCardViewComponent
  ],
  providers: [
    CasesService
  ],
  imports:[
    CommonModule,
    SharedModule,
    AutoCompleteModule,
    FileUploadModule,
    FormsModule,
    CasesRoutingModule
  ]
})
export class CasesModule { }
