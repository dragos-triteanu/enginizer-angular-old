import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Case} from "../../../../../models/case";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import {CasesService} from "../../../services/cases.service";


@Component({
  selector: 'enginizer-case-card-view',
  templateUrl: './case-card-view.component.html',
  styleUrls: ['./case-card-view.component.css']
})
export class CaseCardViewComponent implements OnInit {
  @Input("case")
  case: Case;

  isAdmin = true;
  @Output("deleteCase")
  deleteCase: EventEmitter<any> = new EventEmitter();

  constructor(private casesService: CasesService, private router: Router,private authenticationService:AuthenticationService) {
    this.isAdmin = JSON.parse(localStorage.getItem("current_user")).role == "ADMIN";
  }

  deleteCard() {
    this.deleteCase.emit(this.case);
  }

  ngOnInit() {
  }

  goToCaseDetails(selectedCase: Case) {
    this.router.navigate(["caz"], {queryParams: {id: selectedCase.id}});
  }

  isDoctorLoggedIn(){
    return this.authenticationService.isUserWithRole("DOCTOR");
  }

  shouldRenderDelete(){
    return this.case.status == 'in_progress' && this.authenticationService.isUserWithRole("USER");
  }

}
