import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service'

@Injectable({ providedIn: 'root' })
export class UnAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser.hasOwnProperty('id')) {
      return true;
    }

    this.router.navigate(['/dashboard']);

    return false;
  }
}
