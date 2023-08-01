import React, { useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import useCombinedIngredients from '../../hooks/useCombinedIngredients';
import { useGetRecipeDetailsQuery } from '../../store/services/recipesApi';
import { Ingredient } from '../../model/ingredient';
import styles from './recipeCard.module.css';
import { IngredientMeasure, Recipe } from '../../model/recipe';

interface RecipeCardProps {
  recipeId: number;
}

const getRecipeIngredients = (recipe: Recipe): IngredientMeasure[] => {
    const ingredientsNeeded: [] = [];

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

export const getMissingIngredientsNo = (recipeDetail: Recipe, ingredients: Ingredient[]): number => {

    const ingredientsNeeded = getRecipeIngredients(recipeDetail);

    const matchingIngredients = ingredientsNeeded.filter((ingredient1) =>
        ingredients.some(ingredient2 => ingredient2.strIngredient.toLowerCase() === ingredient1.strIngredient.toLowerCase())
    );
    return ingredientsNeeded.length - matchingIngredients.length
    
    };

    const RecipeCard: React.FC<RecipeCardProps> = ({ recipeId }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const recipe = useGetRecipeDetailsQuery(recipeId)
    const foundIngredients = useCombinedIngredients().data.filter((ingredient) => ingredient.owned);

    if(recipe.isSuccess) {
        return (
            
            <div className={isExpanded ? styles.expandedContainer : styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <CgChevronRight className={isExpanded ? styles.chevronIconExpanded : styles.chevronIconClosed} onClick={() => setIsExpanded(!isExpanded)}/>
                        <div className={styles.headerText}>
                            <h3 className={styles.recipeName}>{recipe.data.strMeal}</h3>
                            { recipe &&
                                <>
                                    <p className={getMissingIngredientsNo(recipe.data, foundIngredients) ? styles.missingIngredients : styles.noMissingIngredients}>{getMissingIngredientsNo(recipe.data, foundIngredients) ? `${getMissingIngredientsNo(recipe.data, foundIngredients)} missing ingredients` : 'Ready to cook ✓'} </p>
                                    <p className={styles.neededIngredients}>{`${getRecipeIngredients(recipe.data).length} ingredients needed`}</p>
                                    <p className={styles.tag}>{recipe?.data.strArea !== 'Unknown' ? recipe?.data.strArea : ''}</p>
                                    
                                </>
                            }
                        </div>
                        
                    </div>
                    <img src={`${recipe.data.strMealThumb}/preview`} className={isExpanded ? styles.previewImage : styles.previewImage}/>
                </div>
                
                {isExpanded &&
                    (
                    <div className={styles.detailsContainer}>
                        <div className={styles.descriptionLeft}>
                            <ul className={styles.ingredientsList}>
                                {getRecipeIngredients(recipe.data).map((ingredient) => {
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
                                {recipe?.data.strInstructions}
                            </p>
                        </div>
                    </div>
                    )
                    }
            </div>
        );
    } else {
        return <></>
    };
}

export default RecipeCard;
