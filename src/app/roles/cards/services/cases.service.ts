import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CardModel } from '../../../shared/models/case.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CasesService {
  activeCaseStatus = new Subject<string>();
  activeCaseStatusAsObservable = this.activeCaseStatus.asObservable();

  constructor(private authHttp: HttpClient) {

  }

  getAllCases() {
    return this.authHttp.get<CardModel[]>(environment.apiUrl + '/api/case');
  }

  getCaseById(caseId: string) {
    return this.authHttp.get(environment.apiUrl + '/api/case?id=' + caseId)
      .map((response: Response) => {
        const enginizerCase = response.json()[0];
        return enginizerCase;
      })
      .toPromise();
  }

  announceCaseStatusChange(string) {
    this.activeCaseStatus.next(string);
  }


  deleteCase(toDeleteCase: CardModel) {
    return this.authHttp.delete(environment.apiUrl + '/api/case/delete?id=' + toDeleteCase.id);
  }

}
