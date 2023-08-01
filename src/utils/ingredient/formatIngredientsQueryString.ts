import { Ingredient } from "../../model/ingredient";

export const removeSpaces = (str: string): string => {
    const splitString = str.split(' ');
    const joinedString = splitString.join('_');
    return joinedString;
}

export const formatIngredientsQueryString = (ingredients: Ingredient[]): string => {
    if(ingredients.length === 0) {
        return ''
    }
    const ownedIngredients = ingredients.filter((ingredient) => ingredient.owned);
    const strArray = ownedIngredients.map((ownedIngredient) => ownedIngredient.strIngredient);
    const joinedString = strArray.join(',');
    const completeString = removeSpaces(joinedString);
    return completeString?.toLowerCase();
};

