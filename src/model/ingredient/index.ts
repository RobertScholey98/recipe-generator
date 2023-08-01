type idIngredient = number;
type strIngredient = string;
type strDescription = string | null;
type strType = string | null;
type strIngredientThumb = string | null;
type owned = boolean;

export interface IngredientAPIResponse {
    idIngredient: idIngredient;
    strIngredient: strIngredient;
    strDescription: strDescription;
    strType: strType;
};

export interface Ingredient {
    idIngredient: idIngredient;
    strIngredient: strIngredient;
    strDescription: strDescription;
    strIngredientThumb: strIngredientThumb;
    strType: strType;
    owned: owned;
};

export type IngredientList = Record<string, Ingredient>;