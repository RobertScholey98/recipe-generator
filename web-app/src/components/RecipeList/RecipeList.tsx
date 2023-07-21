import axios, { AxiosResponse } from 'axios';
import { Http2ServerResponse } from 'http2';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ingredient } from '../../store/features/allIngredientsSlice';
import { RecipeItem, updateRecipes } from '../../store/features/recipesSlice';
import { useAppSelector } from '../../store/store';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './recipeList.module.css';

const formatIngredients = (foundIngredients: Ingredient[]): string => {
    const ingredientsString = foundIngredients.map((ingredient) => ingredient.strIngredient).join(',');
    return ingredientsString
}

const filterRecipes = (results: AxiosResponse[]): RecipeItem[] => {
    const data = results.map((result) => result.data.meals);
    let filteredRecipes: RecipeItem[] = [];
    console.log({data})
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
  const foundIngredients = useAppSelector((state) => state.allIngredients.ingredients).filter((ingredient) => ingredient.owned)
  const foundRecipes = useAppSelector((state) => state.foundRecipes.recipes);
  useEffect(() => {
    if(foundIngredients[0]){
        const apiCalls: Promise<AxiosResponse>[] = [];
        foundIngredients.forEach((ingredient) => {
            apiCalls.push(axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`))
        });

        try {
            Promise.all(apiCalls).then((results) => {
                console.log({results});
                const filteredResults =  filterRecipes(results);
                dispatch(updateRecipes(filteredResults));
            })
        } catch (err) {
            console.log(err)
        }
        // axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${formatIngredients(foundIngredients)}`)
        // .then((result) => {
        //     console.log({result})
        
        // })
    } else {
        dispatch(updateRecipes([]))
    }
  },[foundIngredients.length])
  return (
       <ul className={styles.container}>
            { foundRecipes[0] && 
                foundRecipes.map((recipe) => {
                    console.log({recipe})
                    return (
                        <RecipeCard recipe={recipe}/>
                        )
                })
            }
       </ul>
  );
};

export default RecipeList;
