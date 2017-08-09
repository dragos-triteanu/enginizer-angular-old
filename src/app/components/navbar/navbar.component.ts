import {Component, Input} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {CasesService} from "../../services/cases.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

declare var jQuery:any;

@Component({
  selector: 'enginizer-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input("brandName")
  brandName:string = "";
  activeUrl:string = "";

  selectedTab:string = "in_progress";

  subscription:Subscription;

  constructor(private authService:AuthenticationService, private router:Router, private caseService:CasesService, public translate: TranslateService) {
  }

  isLoggedIn() {
    return this.authService.isUserAuthenticated();
  }

  isDoctorLoggedIn() {
    return this.authService.isUserWithRole("DOCTOR");
  }

  isAdminLoggedIn(){
    return this.authService.isUserWithRole("ADMIN");
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/faq']);
    jQuery(".nav-item.active").removeClass("active");
  }

  isActive(url) {
    return this.router.url.indexOf(url) != -1;
  }

  isNotActive(url) {
    return ! (this.router.url.indexOf(url) != -1);
  }

  onSelect(selected){
    this.selectedTab = selected;
    this.caseService.announceCaseStatusChange(this.selectedTab);
  }
}
