import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Ingredient, removeIngredient } from '../../store/features/allIngredientsSlice';
import { useAppSelector } from '../../store/store';
import styles from './foundIngredients.module.css';
import { useDispatch } from 'react-redux';
import { CgCloseR } from 'react-icons/cg'


const FoundIngredients: React.FC = () => {
  const foundIngredients = useAppSelector((state) => state.allIngredients.ingredients).filter((ingredient) => ingredient.owned);

  return (
    <div className={styles.container}>
       <ul className={styles.listContainer}>
            {foundIngredients.map((ingredient) => {
                return <IngredientTag ingredient={ingredient}/>
            })}
       </ul>
    </div>
  );
};

interface IngredientTagProps {
    ingredient: Ingredient;
}
const IngredientTag: React.FC<IngredientTagProps> = ({ingredient}) => {
const dispatch = useDispatch();

const handleRemove = (event: Event) => {
    event.preventDefault();
    dispatch(removeIngredient(ingredient.idIngredient));
};

    return (
        <li className={styles.ingredientTag}>
            <p>{ingredient.strIngredient}</p> <CgCloseR className={styles.removeIcon} onClick={(e) => handleRemove(e)}/>
        </li>
    )
};

export default FoundIngredients;
