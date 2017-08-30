import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {RecoveryService} from "../../../shared/services/recovery.service";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'enginizer-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  subscription: Subscription;
  model: any = {};
  token: string = null;
  isPasswordSameAsConfirmation: boolean = true;
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService,
              private recoveryService: RecoveryService, private alertService: AlertService ) {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => this.token = queryParam['token']
    );
  }

  ngOnInit() {
  }

  confirmationMatches() {
    if (this.model.password.indexOf(this.model.confirmedPassword) == 0) {
      this.isPasswordSameAsConfirmation = true;
    } else {
      this.isPasswordSameAsConfirmation = false;
    }
    return this.isPasswordSameAsConfirmation;
  }

  changePassword() {
    var THIS = this;
    this.loading = true;
    this.recoveryService.changePassword(this.model, this.token)
      .then( function (tokenResponse) {
        THIS.router.navigate(['home']);
        THIS.authenticationService.setToken(tokenResponse);
      }).catch(function (error) {
      THIS.alertService.error(error);
      THIS.loading = false;
    });
  }
}
