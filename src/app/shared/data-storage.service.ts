import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  /**
   * Usando Realtime Database do Firebase no modo teste
   */
  private baseUrl = 'https://ng-complete-guide-b84bf-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient,
    private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(`${this.baseUrl}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(response);
      })
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes.json`)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }

}
