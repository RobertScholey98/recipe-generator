import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Ingredient } from '../../store/features/allIngredientsSlice';
import { useAppSelector } from '../../store/store';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './searchbar.module.css';
import { CgSearch } from 'react-icons/cg'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const getRandomPlaceHolder = (ingredients: Ingredient[]): string => {
  const index = Math.floor(Math.random()*ingredients.length)
  return ingredients[index].strIngredient;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [placeholder, setPlaceHolder] = useState<string>('found')
  const allIngredients = useAppSelector((state) => state.allIngredients.ingredients)

  useEffect(() => {
    setTimeout(()=> {
      if(allIngredients[0]){
        setPlaceHolder(getRandomPlaceHolder(allIngredients))
      }
    }, 1000)
  }, [allIngredients, placeholder]) 

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <>
      <ul>
        {allIngredients.map((ingredient) => {
          return ingredient.owned ? <li>{ingredient.strIngredient}</li> : <></>
        })}
      </ul>
      <form className={styles.container} onSubmit={handleFormSubmit}>
        
        <input className={styles.searchbar} type="text" value={searchTerm} onChange={handleInputChange} placeholder={placeholder} />
        <CgSearch size={'2rem'}/>
      </form>
      <ul className={styles.ingredientsContainer}>
          {allIngredients.map((ingredient) => {
            if(ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== '') {
              return <li><IngredientCard key={ingredient.idIngredient} ingredient={ingredient} /></li>
            }
            return <></>
          })}
        </ul>
    </>
  );
};

export default SearchBar;
