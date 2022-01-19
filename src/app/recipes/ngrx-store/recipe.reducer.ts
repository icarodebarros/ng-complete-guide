import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";

export interface RecipeState {
    recipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: [],
}

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions): RecipeState {
    switch(action.type) {
        case RecipesActions.SET_RECIPES:
            const actSetRec = action as RecipesActions.SetRecipes;
            return {
                ...state,
                recipes: actSetRec.payload
            }
        case RecipesActions.ADD_RECIPE:
            const actAddRec = action as RecipesActions.AddRecipe;
            return {
                ...state,
                recipes: [...state.recipes, actAddRec.payload]
            }
        case RecipesActions.UPDATE_RECIPE:
            const actUpRec = action as RecipesActions.UpdateRecipe;
            const updatedRec = {...state.recipes[actUpRec.payload.index], ...actUpRec.payload.newRecipe};
            const updatedRecs = [...state.recipes];
            updatedRecs[actUpRec.payload.index] = updatedRec;
            return {
                ...state,
                recipes: updatedRecs
            }
        case RecipesActions.DELETE_RECIPE:
            const actDelRec = action as RecipesActions.DeleteRecipe;
            return {
                ...state,
                recipes: state.recipes.filter((_el, index) => index !== actDelRec.payload)
            }


        default:
            return state;
    }
}