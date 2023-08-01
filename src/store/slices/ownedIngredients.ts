import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: number[] = [];

export const ownedIngredientsSlice = createSlice({
    name: 'ownedIngredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<number>) => {
            state.push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<number>) => {
            const index = state.indexOf(action.payload);
            if (index > -1) {
                state.splice(index, 1);
            }
        }
    }
})

export const { addIngredient, removeIngredient } = ownedIngredientsSlice.actions;
export default ownedIngredientsSlice.reducer;