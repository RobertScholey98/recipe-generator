import axios, { AxiosResponse } from 'axios';
import rateLimit from 'axios-rate-limit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ingredient } from '../../store/features/allIngredientsSlice';
import { Recipe, RecipeDetail, RecipeItem, updateRecipes } from '../../store/features/recipesSlice';
import { useAppSelector } from '../../store/store';
import RecipeCard, { getMissingIngredientsNo } from '../RecipeCard/RecipeCard';
import styles from './recipeList.module.css';
import BarLoader from "react-spinners/BarLoader";

const formatIngredients = (foundIngredients: Ingredient[]): string => {
    const ingredientsString = foundIngredients.map((ingredient) => ingredient.strIngredient).join(',');
    return ingredientsString
}

const filterRecipes = (results: AxiosResponse[]): Recipe[] => {
    const data = results.map((result) => result.data.meals);
    let filteredRecipes: RecipeItem[] = [];
    data.forEach((recipeList) => {
        if(recipeList !== null){
            recipeList.forEach((recipe: RecipeItem) => {
                if(!filteredRecipes.find((targetRecipe) => recipe.idMeal === targetRecipe.idMeal)) {
                    filteredRecipes.push(recipe);
                }
            });
        }
    })
    return filteredRecipes;
}

interface RecipeListProps {

}

const RecipeList: React.FC<RecipeListProps> = () => {
  const dispatch = useDispatch();
  const rateLimitedAxiosInstance = rateLimit(axios.create(), { maxRequests: 10, perMilliseconds: 1000 })
  const [loading, setIsLoading] = useState<boolean>(true);
  const foundIngredients = useAppSelector((state) => state.allIngredients.ingredients).filter((ingredient) => ingredient.owned)
  const foundRecipes = useAppSelector((state) => state.foundRecipes.recipes);
  useEffect(() => {
    setIsLoading(true);
    if(foundIngredients[0]){
        
        const apiCalls: Promise<AxiosResponse>[] = [];
        foundIngredients.forEach((ingredient) => {
            apiCalls.push(rateLimitedAxiosInstance.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredient.strIngredient}`))
        });

        try {
            Promise.all(apiCalls)
            .then((results) => {
                const filteredRecipes =  filterRecipes(results);
                const recipeApiCalls = filteredRecipes.map((recipe => {                    
                        return rateLimitedAxiosInstance.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipe.idMeal}`)
                }))
                try{
                Promise.all(recipeApiCalls)
                .then((recipeResults) => {
                    const detailedRecipes = recipeResults.map((recipeResult) => {
                        
                            return recipeResult.data.meals[0];
                        
                    })
                    setIsLoading(false);
                    dispatch(updateRecipes(detailedRecipes));
                });
                } catch {
                    alert('recipe API rate limit hit, please wait a few moments and remove/add another ingredient to refresh results.');
                }
                
            });
        } catch (err) {
            console.log(err)
        }
    } else {
        
        dispatch(updateRecipes([]))
        setIsLoading(false);
    }
    
  },[foundIngredients.length]);
  return (
    <div className={styles.outerContainer}>
        {
            <BarLoader color="#F5B841" loading={loading} cssOverride={{margin: 'auto', width: '400px'}}/>
        }
       <ul className={styles.container}>
             
            { foundRecipes[0] && 
                <>
                
                {
                    [...foundRecipes]
                    .sort((a, b) => {
                        return (getMissingIngredientsNo(a as RecipeDetail, foundIngredients) - getMissingIngredientsNo(b as RecipeDetail, foundIngredients));
                    })
                    .map((recipe) => {
                        return (
                            <RecipeCard recipeId={recipe.idMeal}/>
                            )
                    })
                }
                
                </>
            }
            
       </ul>
    </div>
  );
};

export default RecipeList;
