type IdMeal = string;
type StrMeal = string;
type StrMealThumb = string;
type StrDrinkAlternative = string | null;
type StrCategory = string;
type StrArea = string;
type StrInstructions = string;
type StrTags = string[];
type StrYoutube = string;
export type IngredientMeasure = {
    strIngredient: string;
    measure: string | null;
}
type DateModified = string | null;

export interface RecipeShallowAPIResponse {
    idMeal: IdMeal;
    strMeal: StrMeal;
    strMealThumb: StrMealThumb;
}

interface RecipeDeepAPIResponseKnownValues {
    idMeal: IdMeal;
    strMeal: StrMeal;
    strDrinkAlternative: StrDrinkAlternative;
    strCategory: StrCategory;
    strArea: StrArea;
    strInstructions: StrInstructions;
    strTags: StrTags;
    strYoutube: StrYoutube;
}

// This is here to handle the key/value pairs for ingredient1, ingredient2, ingredient3 etc... 
type RecipeDeepAPIResponseUnknownValues = Record<string, IngredientMeasure>

export type RecipeListShallow = Record<string, RecipeShallowAPIResponse>;
export type RecipeDeepApiResponse = RecipeDeepAPIResponseKnownValues & RecipeDeepAPIResponseUnknownValues;

export interface Recipe {
    idMeal: IdMeal;
    strMeal: StrMeal
    strMealThumb: StrMealThumb;
    strDrinkAlternative: StrDrinkAlternative;
    strCategory: StrCategory;
    strArea: StrArea;
    strInstructions: StrInstructions;
    strTags: StrTags;
    strYoutube: StrYoutube;
    IngredientMeasures: IngredientMeasure[];
    dateModified: DateModified;
}

export type RecipeList = Record<string, Recipe> 