import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../../services';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: "enginizer-login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model:any = {};
  loading = false;
  returnUrl:string;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private authenticationService:AuthenticationService,
              private alertService:AlertService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    var THIS = this;
    this.loading = true;
    this.authenticationService.login(this.model)
      .then(function (data) {
        THIS.authenticationService.setToken(data);

        if (THIS.authenticationService.getCurrentUser().role === "ADMIN") {
          THIS.router.navigate(['doctors']);
        } else {
          THIS.router.navigate(['cases']);
        }
      }).catch(function (error) {
      THIS.alertService.error(error);
      THIS.loading = false;
    });
  }


}
