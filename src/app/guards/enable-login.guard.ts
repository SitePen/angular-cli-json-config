import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnvironmentService } from '../services/environment.service';

@Injectable()
export class EnableLoginGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private env: EnvironmentService, private router: Router) {}

  canActivate() {
    if (!this.env.environment.enableLogin) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }

  canActivateChild() {
    return this.canActivate();
  }

  canLoad() {
    return this.canActivate();
  }
}
