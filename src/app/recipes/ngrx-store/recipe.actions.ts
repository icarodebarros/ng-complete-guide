import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[Recipe] Set Recipes';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPES = '[Recipe] Store Recipes';

export class SetRecipes implements Action {
    type: string = SET_RECIPES;

    constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
    type: string = FETCH_RECIPES;
}

export class AddRecipe implements Action {
    type: string = ADD_RECIPE;

    constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
    type: string = UPDATE_RECIPE;

    constructor(public payload: {index: number, newRecipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
    type: string = DELETE_RECIPE;

    constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
    type: string = STORE_RECIPES;
}

export type RecipesActions = SetRecipes | FetchRecipes | AddRecipe | 
    UpdateRecipe | DeleteRecipe | StoreRecipes;