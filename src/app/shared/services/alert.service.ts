import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router,
              private translateService: TranslateService) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'success', text: message});
  }

  error(error: Response, keepAfterNavigationChange = false) {

    let message = '';
    switch (error.status) {
      case 401:
        const body = JSON.parse(error.text());
        if (body.path.indexOf('login') !== -1) {
          message = this.translateService.instant('errors.failedLogin');
        }
        break;
      case 409:
        if (error.url.indexOf('register') !== -1) {
          message = this.translateService.instant('errors.duplicateRegistration');
        }
        break;
      default :
        message = 'Server Error';
        break;
    }

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'error', text: message});
  }


  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
