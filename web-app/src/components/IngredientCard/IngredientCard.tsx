import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { addIngredient, Ingredient, removeIngredient } from '../../store/features/allIngredientsSlice';
import { useAppSelector } from '../../store/store';
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
            <div>
                <p className={styles.description}>
                    {ingredient.strDescription}
                </p>
                
            </div>
        }
    </div>
  );
};

export default IngredientCard;
