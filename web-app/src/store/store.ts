import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AllIngredientsSlice } from "./features/allIngredientsSlice";
import { RecipesSlice } from "./features/recipesSlice";

export const store = configureStore({
    reducer: {
        allIngredients: AllIngredientsSlice.reducer,
        foundRecipes: RecipesSlice.reducer
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;