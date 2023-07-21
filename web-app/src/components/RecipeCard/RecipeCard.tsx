import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { URL } from 'url';
import { Ingredient } from '../../store/features/allIngredientsSlice';
import { IngredientDetail, RecipeDetail, RecipeItem } from '../../store/features/recipesSlice';
import { useAppSelector } from '../../store/store';
import styles from './recipeCard.module.css';

interface RecipeCardProps {
  recipe: RecipeItem;
}

const getRecipeIngredients = (recipe: RecipeDetail): IngredientDetail[] => {
    const ingredientsNeeded: IngredientDetail[] = [];

    for(let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        if(recipe[ingredientKey]) {
            ingredientsNeeded.push({
                strIngredient: recipe[ingredientKey],
                measure: recipe[measureKey]
            })
        }
    }
    return ingredientsNeeded
}

const getMissingIngredientsNo = (recipeDetail: RecipeDetail, ingredients: Ingredient[]): number => {
    
    const matchingIngredients: string[] = [];

    const ingredientsNeeded = getRecipeIngredients(recipeDetail);

    ingredientsNeeded.filter((ingredient1) => {
        if(ingredients.find((ingredient2) => ingredient2.strIngredient === ingredient1.strIngredient)) {
            matchingIngredients.push(ingredient1.strIngredient);
        }
    })
    return ingredientsNeeded.length - matchingIngredients.length
    
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
const [isExpanded, setIsExpanded] = useState<boolean>(false);
const [recipeDetails, setRecipeDetails] = useState<RecipeDetail | null>(null)

useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`)
    .then((result) => {
        console.log(JSON.stringify({recipeDetails: result.data.meals[0]}))
        setRecipeDetails(result.data.meals[0]);
    });
},[])

const foundIngredients = useAppSelector((state) => state.allIngredients.ingredients).filter((ingredient) => ingredient.owned);

  return (
    <div className={isExpanded ? styles.expandedContainer : styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <CgChevronRight className={isExpanded ? styles.chevronIconExpanded : styles.chevronIconClosed} onClick={() => setIsExpanded(!isExpanded)}/>
                    <div className={styles.headerText}>
                        <h3 className={styles.recipeName}>{recipe.strMeal}</h3>
                        { recipeDetails &&
                            <>
                                <p className={styles.missingIngredients}>{getMissingIngredientsNo(recipeDetails, foundIngredients)} missing ingredients</p>
                                <p className={styles.tag}>{recipeDetails?.strArea !== 'Unknown' ? recipeDetails?.strArea : ''}</p>
                                
                            </>
                        }
                    </div>
                    
                </div>
                <img src={`${recipe.strMealThumb}/preview`} className={isExpanded ? styles.previewImage : styles.previewImage}/>
            </div>
            
            {isExpanded &&
                (
                recipeDetails ? (
                <div className={styles.detailsContainer}>
                    <div className={styles.descriptionLeft}>
                        <ul className={styles.ingredientsList}>
                            {getRecipeIngredients(recipeDetails).map((ingredient) => {
                                return (
                                    <>
                                        <li className={foundIngredients.find((comparator) => comparator.strIngredient.toLowerCase() === ingredient.strIngredient.toLowerCase()) ? styles.ingredientOwned : styles.ingredient}>{ingredient.strIngredient} - {ingredient.measure}</li>
                                        <hr />
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                    
                    <div className={styles.descriptionRight}>
                        <p className={styles.method}>
                            {recipeDetails?.strInstructions}
                        </p>
                    </div>
                </div>
                 ) :
                <p>Loading...</p>
                )
                }
        
    </div>
  );
};

export default RecipeCard;
