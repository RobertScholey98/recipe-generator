import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Ingredient = {
    idIngredient: number;
    strIngredient: string;
    strDescription: string | null;
    strType: string | null;
    owned: boolean;
}

interface IngredientsList{
    ingredients: Ingredient[]
}

const initialState: IngredientsList = {
    ingredients: [],
}

export const AllIngredientsSlice = createSlice({
    name: 'allIngredients',
    initialState,
    reducers: {
        addAllIngredients: (state, action: PayloadAction<IngredientsList>) => {
            action.payload.ingredients.forEach(( ingredient ) => {
                ingredient.owned = false;
                state.ingredients.push(ingredient);
            })
        },
        addIngredient: (state, action: PayloadAction<number>) => {
            const foundIngredient = state.ingredients.find(ingredient => ingredient.idIngredient === action.payload);
            if (foundIngredient) {
                foundIngredient.owned = true;
            }
        },
        removeIngredient: (state, action: PayloadAction<number>) => {
            const foundIngredient = state.ingredients.find(ingredient => ingredient.idIngredient === action.payload);
            if (foundIngredient) {
                foundIngredient.owned = false;
            }
        }
    }
})

export default AllIngredientsSlice.reducer;
export const { addAllIngredients, addIngredient, removeIngredient } = AllIngredientsSlice.actions;