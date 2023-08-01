import { useEffect, useState } from 'react';
import { Recipe } from '../model/recipe';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useCombinedIngredients } from './useCombinedIngredients';
import axios, { AxiosResponse } from 'axios';
import rateLimit from 'axios-rate-limit';
import { updateRecipes } from '../store/slices/foundRecipesShallow';

const useFoundRecipes = () => {
  const dispatch = useAppDispatch();
  const ingredients = useCombinedIngredients();
  const ownedIngredients = useAppSelector((state) => state.ownedIngredients)
  const [foundRecipes, setFoundRecipes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const foundIngredients = ingredients.data.filter((ingredient) => ingredient.owned);
  const rateLimitedAxiosInstance = rateLimit(axios.create(), { maxRequests: 10, perMilliseconds: 1000 })

  const apiCalls: Promise<AxiosResponse>[] = [];
    
  useEffect(() => {
    const fetchRecipes = async () => {
        setIsLoading(true);
        foundIngredients.forEach((ingredient) => {
            apiCalls.push(rateLimitedAxiosInstance.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredient.strIngredient}`))
        });
        let recipes: Recipe[] = []
      try {
        Promise.all((apiCalls))
        .then((results) => { 
            
            let resultsArr: number[] = [];
            const data = results.map((result) => result.data.meals);
            data.forEach((recipeList) => {
                        if(recipeList !== null){
                            recipeList.forEach((recipe) => {
                                if(!resultsArr.find((recipeId) => recipe.idMeal === recipeId)) {
                                    resultsArr.push(recipe.idMeal);
                                }
                            });
                        }
                    })
            dispatch(updateRecipes(resultsArr))
            setFoundRecipes(resultsArr);
        })
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
      
    };
    if(ownedIngredients[0]) {
        fetchRecipes();
    }
    setIsLoading(false)
  }, [ownedIngredients.length]);

  return {foundRecipes, isLoading};
};

export default useFoundRecipes;