import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Recipe, RecipeDeepApiResponse, RecipeListShallow, RecipeShallowAPIResponse } from '../../model/recipe';
import { Ingredient, IngredientAPIResponse, IngredientList } from '../../model/ingredient';
import { filterOwnedIngredients } from '../../utils/ingredient/filterOwnedIngredients';
import { formatIngredientsQueryString } from '../../utils/ingredient/formatIngredientsQueryString';
import { AxiosPromise } from 'axios';

const baseUrl = `${process.env.REACT_APP_PUBLIC_API}${process.env.REACT_APP_API_KEY}`;
const allIngredientsQuerystr = 'list.php?i=list';
const shallowRecipesQuerystr = 'filter.php?i=';
const recipeDetailsQuerystr = 'lookup.php?i=';

function transformIngredients(ingredients: IngredientAPIResponse[]): IngredientList {
    const transformedResponse: IngredientList = {};
    ingredients.forEach((ingredient: IngredientAPIResponse) => {
        transformedResponse[ingredient.strIngredient] = {
            idIngredient: ingredient.idIngredient,
            strIngredient: ingredient.strIngredient,
            strDescription: ingredient.strDescription,
            strIngredientThumb: `${process.env.REACT_APP_IMAGES_URL}${ingredient.strIngredient}.png`,
            strType: ingredient.strType,
            owned: false
        };
    })
    return transformedResponse;
}

function transformShallowRecipes(recipes: RecipeShallowAPIResponse[]): RecipeListShallow {
    const transformedResponse: RecipeListShallow = {};
    recipes.forEach((recipe: RecipeShallowAPIResponse) => {
        transformedResponse[recipe.idMeal] = {
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb
        }
    })
    return transformedResponse;
}

export const recipesApi = createApi({
    reducerPath: 'ingredientsApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getIngredients: builder.query({
            query: () => allIngredientsQuerystr,
            transformResponse: (response: any): IngredientList => {
                
                return transformIngredients(response.meals);
            }
        }),
        getRecipesByIngredient: builder.query({
            query: (ingredient: Ingredient) => `${shallowRecipesQuerystr}${ingredient?.strIngredient.toLowerCase()}`,
            transformResponse: (response: any) => {
                return response.meals
            }
        }),
        getRecipeDetails: builder.query({
            query: (recipeId) => `${recipeDetailsQuerystr}${recipeId}`,
            transformResponse: (response: any): Recipe => {
                return response.meals[0];
            }
        })
    })
});

export const { useGetIngredientsQuery, useGetRecipesByIngredientQuery, useGetRecipeDetailsQuery } = recipesApi;