import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Case } from '../../shared/models/case.model';

declare var jQuery:any;

@Injectable()
export class CasesService {
  activeCaseStatus = new Subject<string>();
  activeCaseStatusAsObservable = this.activeCaseStatus.asObservable();

  selectedCase = new Subject<Case>();
  selectedCaseAsObservable = this.selectedCase.asObservable();

  constructor(private authHttp:HttpClient, private router:Router) {

  }

  announceCaseStatusChange(string) {
    this.activeCaseStatus.next(string);
  }

  getAllCases() {
    return this.authHttp.get<Case[]>(environment.hostUrl + "/api/case");
  }

  getCaseById(caseId:string) {
    return this.authHttp.get(environment.hostUrl + "/api/case?id=" + caseId)
    .map((response:Response) => {
      let enginizerCase = response.json()[0];
      return this.mapenginizerCase(enginizerCase);
    })
    .toPromise();
  }

  deleteCase(toDeleteCase:Case) {
    return this.authHttp.delete(environment.hostUrl + "/api/case/delete?id=" + toDeleteCase.id)
    .toPromise();
  }

  setActiveCaseStatus(activeCaseStatus) {
    this.activeCaseStatus = activeCaseStatus;
  }

  getActiveCaseStatus() {
    return this.activeCaseStatus;
  }

  sendSelectedCase(selectedCase) {
    this.selectedCase.next(selectedCase);
  }

  mapStatus(status:string) {
    if (status == "INPROGRESS")
      return "in_progress";
    if (status == "DONE")
      return "DONE"
  }

  mapenginizerCase(enginizerCase:any) {
    var someCase = enginizerCase;

    return someCase;
  }



}
