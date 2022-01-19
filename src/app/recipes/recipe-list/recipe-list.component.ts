import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from 'src/app/ngrx-store/app.reducer';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[] = [];
  private subscription!: Subscription;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('recipes')
      .pipe(map(recipesState => recipesState?.recipes!))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }

}
