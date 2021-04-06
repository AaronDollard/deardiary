import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@app/_services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _userService: UserService, private router: Router) {
  }

  canActivate() {
    if (this._userService.loggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    else {
      return true;
    }
  }
}