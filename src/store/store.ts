import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { recipesApi } from "./services/recipesApi";

import foundRecipesShallowReducer from "./slices/foundRecipesShallow";
import ownedIngredientsReducer from "./slices/ownedIngredients";

export const store = configureStore({
    reducer: {
        ownedIngredients: ownedIngredientsReducer,
        foundRecipesShallow: foundRecipesShallowReducer,
        [recipesApi.reducerPath]: recipesApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(recipesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;