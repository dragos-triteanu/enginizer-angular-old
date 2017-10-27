import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../../shared/services/index';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'ngnizr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  isPasswordSameAsConfirmation = true;
  isSexSelected = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  confirmationMatches() {
    if (this.model.password === this.model.passwordConfirmation) {
      this.isPasswordSameAsConfirmation = true;
    } else {
      this.isPasswordSameAsConfirmation = false;
    }
    return this.isPasswordSameAsConfirmation;
  }

  checkIfSexSelected() {
    if (this.model.sex === undefined) {
      this.isSexSelected = false;
    } else {
      this.isSexSelected = true;
    }
    return this.isSexSelected;
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  register() {
    const THIS = this;
    this.loading = true;
    this.model.role = 'USER';
    this.authenticationService.signUpUser(this.model)
      .then(function (token) {
        THIS.router.navigate([THIS.returnUrl]);
        THIS.authenticationService.setToken(token);
      }).catch(function (error) {
      THIS.alertService.error(error);
      THIS.loading = false;
    });
  }
}
