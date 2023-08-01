import { IngredientList } from "../../model/ingredient";

export const filterOwnedIngredients = (ingredientsList: IngredientList | undefined): IngredientList => {
    if(!ingredientsList) return {};
    return Object.fromEntries(
        Object.entries(ingredientsList).filter(([key, ingredient]) => ingredient.owned === true)
    );
}
