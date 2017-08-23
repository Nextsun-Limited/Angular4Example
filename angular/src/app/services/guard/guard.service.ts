import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
