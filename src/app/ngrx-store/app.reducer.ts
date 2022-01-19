import { ActionReducerMap } from "@ngrx/store";
import * as fromShoppingLinst from "../shopping-list/ngrx-store/shopping-list.reducer";
import * as fromAuth from "src/app/auth/ngrx-store/auth.reducer";
import * as fromRecipes from "../recipes/ngrx-store/recipe.reducer";

// export const rootReducer = {};

export interface AppState {
    shoppingList?: fromShoppingLinst.ShoppingListState;
    auth?: fromAuth.AuthState;
    recipes?: fromRecipes.RecipeState;
};

export const appReducer: ActionReducerMap<AppState, any> = {
    shoppingList: fromShoppingLinst.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer,
};