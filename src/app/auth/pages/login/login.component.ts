import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../../../shared/services';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'enginizer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authenticationService.login(this.model).subscribe(
      (data: any) => {
        console.log('Login form', data);
        debugger
        this.authenticationService.setToken(data.token);
        this.router.navigate(['home']);
      },
      (error: any) => {
        debugger
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

}
