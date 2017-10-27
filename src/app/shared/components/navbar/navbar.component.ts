import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { CasesService } from '../../../roles/cards/services/cases.service';

declare var jQuery: any;

@Component({
  selector: 'ngnizr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input('brandName')
  brandName = '';

  selectedTab = 'in_progress';

  constructor(private authService: AuthenticationService,
              private router: Router,
              private caseService: CasesService,
              public translate: TranslateService) {
  }

  isLoggedIn() {
    return this.authService.isUserAuthenticated();
  }

  isDoctorLoggedIn() {
    return this.authService.isUserWithRole('DOCTOR');
  }

  isAdminLoggedIn() {
    return this.authService.isUserWithRole('ADMIN');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/faq']);
    jQuery('.nav-item.active').removeClass('active');
  }

  isActive(url) {
    return this.router.url.indexOf(url) !== -1;
  }

  isNotActive(url) {
    return !(this.router.url.indexOf(url) !== -1);
  }

  onSelect(selected) {
    this.selectedTab = selected;
    this.caseService.announceCaseStatusChange(this.selectedTab);
  }
}
