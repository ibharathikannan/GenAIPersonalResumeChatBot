import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';

@Injectable()
export class AuthGuardService  {
  isAuthenticated: boolean;
  constructor(
    private store: Store<AppState>,
    private readonly router: Router
  ) {}

  canActivate() {
    this.store
      .pipe(select(selectIsAuthenticated))
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
    }

    return this.store.pipe(select(selectIsAuthenticated));
  }
}
