import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/ngrx-store/auth.actions';
import * as fromApp from '../ngrx-store/app.reducer';
import * as RecipesActions from '../recipes/ngrx-store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  public isAuthenticated = false;
  public collapsed = true;

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState?.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      })
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
