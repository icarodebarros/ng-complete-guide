import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient?: Ingredient;
    editedIngredientIndex?: number;
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: undefined,
    editedIngredientIndex: undefined
};

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActions): ShoppingListState {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, (action as ShoppingListActions.AddIngredient).payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...(action as ShoppingListActions.AddIngredients).payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const updateAction = action as ShoppingListActions.UpdateIngredients;
            const ingredient = state.ingredients[state.editedIngredientIndex!];
            const updatedIngredient = {
                ...ingredient,
                ...updateAction.payload
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex!] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: undefined,
                editedIngredient: undefined
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            const resultIngredients = state.ingredients.filter((_el, index ) => index !==  state.editedIngredientIndex);
            return {
                ...state,
                ingredients: resultIngredients,
                editedIngredientIndex: undefined,
                editedIngredient: undefined
            };
        
        case ShoppingListActions.START_EDIT:
            const startEditAction = action as ShoppingListActions.StartEdit;
            return {
                ...state,
                editedIngredientIndex: startEditAction.payload,
                editedIngredient: {...state.ingredients[startEditAction.payload]}
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: undefined,
                editedIngredient: undefined
            };

        default: 
            return initialState;
    }
}