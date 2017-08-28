import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Subject} from "rxjs";
import {AuthHttp} from 'angular2-jwt';
import {Router} from "@angular/router";
import {Case} from "../../../models/case";
import {environment} from "../../../../environments/environment";
import {Message} from "../../../models/message";

declare var jQuery:any;

@Injectable()
export class CasesService {
  activeCaseStatus = new Subject<string>();
  activeCaseStatusAsObservable = this.activeCaseStatus.asObservable();

  selectedCase = new Subject<Case>();
  selectedCaseAsObservable = this.selectedCase.asObservable();

  constructor(private authHttp:AuthHttp, private router:Router) {

  }

  announceCaseStatusChange(string) {
    this.activeCaseStatus.next(string);
  }

  create(someCase:Case) {
    // let formData:FormData = new FormData()
    // for (let i = 0; i < someCase.files.length; i++) {
    //   formData.append("files[]", someCase.files[i], someCase.files[i].name);
    // }
    // formData.append("appearanceDetails",someCase.appearanceDetails);
    // formData.append("modificationDetails",someCase.modificationDetails );
    // formData.append("mainSymptoms",someCase.mainSymptoms);
    // formData.append("otherSymptoms",someCase.otherSymptoms);
    // formData.append("otherTreatment",someCase.otherTreatment);
    // formData.append("otherDiseases",someCase.otherDiseases);
    // formData.append("otherInfo",someCase.otherInfo);
    //
    // return this.authHttp.post(environment.hostUrl + "/api/case/create", formData)
    //   .map((response:Response) => {
    //     let enginizerCase = response.json();
    //     return this.mapenginizerCase(enginizerCase);
    //   })
    //   .toPromise();
  }

  getAllCases() {
    return this.authHttp.get(environment.hostUrl + "/api/case")
    .map((response:Response) => {
      return response.json().map((enginizerCase) => {
        return this.mapenginizerCase(enginizerCase);
      });
    })
    .toPromise();
  }

  getCaseById(caseId:string) {
    return this.authHttp.get(environment.hostUrl + "/api/case?id=" + caseId)
    .map((response:Response) => {
      let enginizerCase = response.json()[0];
      return this.mapenginizerCase(enginizerCase);
    })
    .toPromise();
  }

  sendMessage(selectedCase:Case, message:Message, shouldAddMoreImages:boolean) {
    message.dateSent = new Date();
    return this.authHttp.put(environment.hostUrl + "/api/case/message?caseId=" + selectedCase.id, message)
    .map((response:Response) => {
      let asJson = response.json();
      return asJson.id;
    }).toPromise();
  }

  sendFinalAdvice(selectedCase:Case) {
    // let dto = {finalAdvice: selectedCase.finalAdvice};
    // return this.authHttp.put(environment.hostUrl + "/api/case/sendFinalAdvice?caseId=" + selectedCase.id, dto)
    //   .map((response:Response) => {}).toPromise();
  }

  deleteCase(toDeleteCase:Case) {
    return this.authHttp.delete(environment.hostUrl + "/api/case/delete?id=" + toDeleteCase.id)
    .toPromise();
  }

  addPhotosToCase(selectedCase:Case) {
    // var caseId = selectedCase.id;
    // let formData:FormData = new FormData()
    // for (let i = 0; i < selectedCase.files.length; i++) {
    //   formData.append("images[]", selectedCase.files[i], selectedCase.files[i].name);
    // }
    //
    // return this.authHttp.post(environment.hostUrl + "/api/case/update?id=" + selectedCase.id, formData)
    //   .map((response:Response) => {
    //
    //   }).toPromise();
  }

  downloadCaseAsPdf(caseId:number){
    // return this.authHttp.get(environment.hostUrl + "/api/pdf?id=" + caseId,  { responseType: ResponseContentType.Blob })
    //   .map((res) => {
    //     return new Blob([res.blob()], { type: 'application/pdf' })
    //   }).toPromise();
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
