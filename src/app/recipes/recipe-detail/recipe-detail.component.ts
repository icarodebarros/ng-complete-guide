import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/ngrx-store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../ngrx-store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/ngrx-store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  public recipe!: Recipe;
  public id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => +params['id']),
        switchMap((recipeId: number) => {
          this.id = recipeId;
          return this.store.select('recipes');
        }),
        map(recipesState => recipesState!.recipes[this.id])
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    //OR 
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
