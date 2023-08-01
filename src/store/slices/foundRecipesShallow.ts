import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: number[] = [];

export const foundRecipesShallow = createSlice({
    name: 'founndRecipesShallow',
    initialState,
    reducers: {
        updateRecipes: (state, action: PayloadAction<number[]>) => {
            state = (action.payload);
        },
    }
})

export const { updateRecipes } = foundRecipesShallow.actions;
export default foundRecipesShallow.reducer;