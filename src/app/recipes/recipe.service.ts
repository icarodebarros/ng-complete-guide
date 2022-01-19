import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import * as fromApp from "../ngrx-store/app.reducer";
import * as ShoppingListActions from "../shopping-list/ngrx-store/shopping-list.actions";
import { Recipe } from "./recipe.model";


@Injectable() // Necessário apenas quando se quer injetar algo nessa classe
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Grilled steak with potatoes',
    //         'Grilled steak gets a special touch from our Spicy Homemade Seasoning.',
    //         'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_1280.jpg',
    //         [
    //             new Ingredient('Steak', 2),
    //             new Ingredient('Potato', 3),
    //         ]),
    //     new Recipe(
    //         'Chicken strogonoff',
    //         'Classic Brazilian stroganoff recipe that everyone loves.',
    //         'https://img.cybercook.com.br/imagens/receitas/644/strogonoff-de-frango-1-623x350.jpg',
    //         [
    //             new Ingredient('Chicken', 1),
    //             new Ingredient('Rice', 1),
    //             new Ingredient('Potato sticks', 1),
    //         ])
    // ];

    constructor(private store: Store<fromApp.AppState>) { }

    
    getRecipes(): Recipe[] {
        return [...this.recipes];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }

}