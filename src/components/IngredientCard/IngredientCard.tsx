import React, { useState } from 'react';
import { addIngredient, removeIngredient } from '../../store/slices/ownedIngredients';
import { Ingredient } from '../../model/ingredient';
import styles from './ingredientCard.module.css';
import { CgChevronRight, CgPlayListAdd, CgPlayListCheck } from 'react-icons/cg';
import { useDispatch } from 'react-redux';

interface IngredientCardProps {
  ingredient: Ingredient;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
const dispatch = useDispatch();
const [isExpanded, setIsExpanded] = useState<boolean>(false);

 const handleAddIngredient = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(addIngredient(ingredient.idIngredient));
 }

 const handleRemoveIngredient = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault()
    dispatch(removeIngredient(ingredient.idIngredient));
 }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h3>
                { ingredient.strDescription &&
                    <CgChevronRight className={isExpanded ? styles.chevronIconExpanded : styles.chevronIconClosed} onClick={() => setIsExpanded(!isExpanded)}/>
                }   
                {ingredient.strIngredient}
            </h3>
            { ingredient.owned ?
            <CgPlayListCheck className={styles.addIcon} onClick={(e) => handleRemoveIngredient(e)}/> :
            <CgPlayListAdd className={styles.addIcon} onClick={(e) => handleAddIngredient(e)}/>
            }
        </div>
        {isExpanded &&
            <div className={styles.expandedContainer}>
                <p className={styles.description}>
                    {ingredient.strDescription}
                </p>
                <img src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-small.png`} alt={`the ingredient: ${ingredient.strIngredient}`} className={styles.ingredientImage}/>
            </div>
        }
    </div>
  );
};

export default IngredientCard;
