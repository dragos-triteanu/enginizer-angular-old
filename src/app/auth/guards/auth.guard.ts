import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Log } from 'ng2-logger';

@Injectable()
export class AuthGuard implements CanActivate {
  LOG = Log.create(AuthGuard.name);

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('user_token')) {
      this.LOG.info('canActivate:: User is authenticated');
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.LOG.info('canActivate:: User is not authenticated');
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
