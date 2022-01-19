import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../ngrx-store/app.reducer';
import * as AuthActions from './ngrx-store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpTimer!: number | null;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setLogoutTimer(expDuration: number) {
    this.tokenExpTimer = window.setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpTimer) {
      window.clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }
}