import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Log } from 'ng2-logger';
import { User } from '../../shared/models/user.model';

@Injectable()
export class AdminGuard implements CanActivate {
  LOG = Log.create(AdminGuard.name);

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.LOG.info('canActivate');

    const user: User = this.authenticationService.getCurrentUser();

    if (user.role === 'ADMIN') {
      return true;
    }

    console.log('I\'m an admin');
    this.router.navigate(['/login']);
    return false;
  }
}
