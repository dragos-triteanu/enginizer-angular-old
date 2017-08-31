import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Case } from '../../../shared/models/case.model';
import { Subject } from 'rxjs/Subject';

declare var jQuery: any;

@Injectable()
export class CasesService {
  activeCaseStatus = new Subject<string>();
  activeCaseStatusAsObservable = this.activeCaseStatus.asObservable();

  constructor(private authHttp: HttpClient) {

  }

  announceCaseStatusChange(string) {
    this.activeCaseStatus.next(string);
  }

  getAllCases() {
    return this.authHttp.get<Case[]>(environment.hostUrl + '/api/case');
  }

  getCaseById(caseId: string) {
    return this.authHttp.get(environment.hostUrl + '/api/case?id=' + caseId)
    .map((response: Response) => {
      const enginizerCase = response.json()[0];
      return enginizerCase;
    })
    .toPromise();
  }

  deleteCase(toDeleteCase: Case) {
    return this.authHttp.delete(environment.hostUrl + '/api/case/delete?id=' + toDeleteCase.id);
  }

}
