import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Ingredient } from '../../store/features/allIngredientsSlice';
import { useAppSelector } from '../../store/store';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './searchbar.module.css';
import { CgSearch } from 'react-icons/cg'
import FoundIngredients from '../FoundIngredients/FoundIngredients';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const getRandomPlaceHolder = (ingredients: Ingredient[]): string => {
  const index = Math.floor(Math.random()*ingredients.length)
  return ingredients[index].strIngredient;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [placeholder, setPlaceHolder] = useState<string>('Searching the cupboards...')
  const allIngredients = useAppSelector((state) => state.allIngredients.ingredients)
  const foundIngredients = allIngredients.filter((ingredient) => ingredient.owned)
  useEffect(() => {
    if(!foundIngredients[0]){
      setTimeout(()=> {
        if(allIngredients[0]){
          setPlaceHolder(`${getRandomPlaceHolder(allIngredients)}?`)
        }
      }, 1000)
    } else {
      setPlaceHolder('search ingredients...');
    }
  }, [allIngredients, placeholder]);

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
      <FoundIngredients />
      <form className={styles.container} onSubmit={handleFormSubmit}>
          { !foundIngredients[0] &&
            <p>In the mood for</p>
          }
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
