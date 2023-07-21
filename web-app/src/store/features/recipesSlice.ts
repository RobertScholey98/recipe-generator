import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Recipe = {
    strMeal: string;
    strMealThumb: string;
    idMeal: number;
}

export type IngredientDetail = {
    strIngredient: string;
    measure: string | null;
}

export type RecipeDetail = Recipe & {
    strDrinkAlternative: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strTags: string[];
    strYoutube: string;
    ingredients: IngredientDetail[];
    dateModified: string | null;
}

export type RecipeItem = Recipe | RecipeDetail;

interface RecipeList{
    recipes: RecipeItem[]
}

const initialState: RecipeList = {
    recipes: [],
}

export const RecipesSlice = createSlice({
    name: 'foundRecipes',
    initialState,
    reducers: {
        updateRecipes: (state, action: PayloadAction<RecipeItem[]>) => {
            console.log(`updating with action: ${JSON.stringify(action)}`);
            
                    state.recipes = action.payload;
        }
        },
    }
)

export default RecipesSlice.reducer;
export const { updateRecipes } = RecipesSlice.actions;