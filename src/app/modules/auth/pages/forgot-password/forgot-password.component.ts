import {Component, OnInit} from '@angular/core';

import {Route, Router} from "@angular/router";
import {AlertService} from "../../../../services/alert.service";
import {RecoveryService} from "../../../../services/recovery.service";

@Component({
  selector: 'enginizer-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  model:any = {};
  loading = false;

  constructor(private alertService:AlertService, private router:Router, private recoveryService:RecoveryService) {
  }

  ngOnInit() {
  }

  callPasswordRecovery() {
    var THIS = this;

    this.recoveryService.recovery(this.model)
      .then(function () {
        THIS.alertService.success('An email has been sent to your email address', true);
        THIS.router.navigate(['/login']);
      }).catch(function (error) {
      THIS.alertService.error(error);
    });
  }

  isEmailValid() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.model.email);
  }

}
