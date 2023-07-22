import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { URL } from 'url';
import { Ingredient } from '../../store/features/allIngredientsSlice';
import { IngredientDetail, RecipeDetail, RecipeItem } from '../../store/features/recipesSlice';
import { useAppSelector } from '../../store/store';
import styles from './recipeCard.module.css';

interface RecipeCardProps {
  recipeId: number;
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

export const getMissingIngredientsNo = (recipeDetail: RecipeDetail, ingredients: Ingredient[]): number => {

    const ingredientsNeeded = getRecipeIngredients(recipeDetail);

    const matchingIngredients = ingredientsNeeded.filter((ingredient1) =>
        ingredients.some(ingredient2 => ingredient2.strIngredient.toLowerCase() === ingredient1.strIngredient.toLowerCase())
    );
    return ingredientsNeeded.length - matchingIngredients.length
    
    };

    const RecipeCard: React.FC<RecipeCardProps> = ({ recipeId }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const recipe = useAppSelector((state) => state.foundRecipes.recipes.find((recipe) => recipe.idMeal === recipeId)) as RecipeDetail;

    const foundIngredients = useAppSelector((state) => state.allIngredients.ingredients).filter((ingredient) => ingredient.owned);

    if(recipe) {
        return (
            
            <div className={isExpanded ? styles.expandedContainer : styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <CgChevronRight className={isExpanded ? styles.chevronIconExpanded : styles.chevronIconClosed} onClick={() => setIsExpanded(!isExpanded)}/>
                        <div className={styles.headerText}>
                            <h3 className={styles.recipeName}>{recipe.strMeal}</h3>
                            { recipe &&
                                <>
                                    <p className={getMissingIngredientsNo(recipe, foundIngredients) ? styles.missingIngredients : styles.noMissingIngredients}>{getMissingIngredientsNo(recipe, foundIngredients) ? `${getMissingIngredientsNo(recipe, foundIngredients)} missing ingredients` : 'Ready to cook ✓'} </p>
                                    <p className={styles.neededIngredients}>{`${getRecipeIngredients(recipe).length} ingredients needed`}</p>
                                    <p className={styles.tag}>{recipe?.strArea !== 'Unknown' ? recipe?.strArea : ''}</p>
                                    
                                </>
                            }
                        </div>
                        
                    </div>
                    <img src={`${recipe.strMealThumb}/preview`} className={isExpanded ? styles.previewImage : styles.previewImage}/>
                </div>
                
                {isExpanded &&
                    (
                    <div className={styles.detailsContainer}>
                        <div className={styles.descriptionLeft}>
                            <ul className={styles.ingredientsList}>
                                {getRecipeIngredients(recipe).map((ingredient) => {
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
                                {recipe?.strInstructions}
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
