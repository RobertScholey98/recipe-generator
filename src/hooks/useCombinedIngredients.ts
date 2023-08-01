import { useState, useEffect } from 'react';
import { useAppSelector } from '../store/store';
import { Ingredient, IngredientList } from '../model/ingredient';
import { useGetIngredientsQuery } from '../store/services/recipesApi';
import { hasChild } from '../utils/hasChild';

const findOwnedIngredients = (ingredients: IngredientList, ownedIngredients: number[]): Ingredient[] => {
    let combinedIngredients: Ingredient[] = []
    Object.keys(ingredients).map((key) => {
        const isOwned = ownedIngredients?.includes(ingredients[key].idIngredient);
        const ingredient = ingredients[key]
        combinedIngredients.push({
          ...ingredient,
          owned: isOwned,
        });
      });
      return combinedIngredients
}

export const useCombinedIngredients = () => {
  const { data: ingredients, isLoading, error, isSuccess } = useGetIngredientsQuery(null); 
  const ownedIngredients = useAppSelector((state) => state.ownedIngredients);
  
  const [combinedIngredients, setCombinedIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (ingredients && hasChild(ingredients)) {
      // Merge the RTK query data with the 'owned' property from the slice
      const combinedData = findOwnedIngredients(ingredients, ownedIngredients)

      setCombinedIngredients(combinedData);
    }
  }, [ownedIngredients.length]);
  return { data: combinedIngredients, isLoading, error, isSuccess };
};

export default useCombinedIngredients;
