import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './recipeList.module.css';
import BarLoader from "react-spinners/BarLoader";
import useFoundRecipes from '../../hooks/useFoundRecipes';

const RecipeList: React.FC = () => {
  const recipes = useFoundRecipes();
  return (
    <div className={styles.outerContainer}>
        {
            <BarLoader color="#F5B841" loading={recipes.isLoading} cssOverride={{margin: 'auto', width: '400px'}}/>
        }
       <ul className={styles.container}>

            {recipes.foundRecipes[0] && 
                <>
                {
                    [...recipes.foundRecipes]
                    .map((recipeId) => {
                        return (
                            <RecipeCard key={recipeId} recipeId={recipeId}/>
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
