import React, { useState, ChangeEvent, useEffect } from 'react';
import { useAppSelector } from '../../store/store';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './searchbar.module.css';
import { CgSearch } from 'react-icons/cg'
import FoundIngredients from '../FoundIngredients/FoundIngredients';
import { Ingredient } from '../../model/ingredient';
import useCombinedIngredients from '../../hooks/useCombinedIngredients';

interface SearchBarProps {}

const getRandomPlaceHolder = (ingredients: Ingredient[]): string => {
  const index = Math.floor(Math.random()*ingredients.length)
  return ingredients[index].strIngredient;
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [placeholder, setPlaceHolder] = useState<string>('Searching the cupboards...');
  const allIngredients = useCombinedIngredients();
  const foundIngredients = useAppSelector(state => state.ownedIngredients);
  
  useEffect(() => {
    if(!allIngredients.isLoading && foundIngredients.length === 0 ){
      setTimeout(()=> {
        if(allIngredients.data[0]){
          setPlaceHolder(`${getRandomPlaceHolder(allIngredients.data)}?`)
        }
      }, 1000)
    } else {
      setPlaceHolder('search ingredients...');
    }
  }, [allIngredients.data.length, placeholder]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  if(allIngredients.isSuccess) {
    return (
      <>
        <FoundIngredients />
        <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
            { !FoundIngredients &&
              <p>In the mood for</p>
            }
            <input className={styles.searchbar} type="text" value={searchTerm} onChange={handleInputChange} placeholder={placeholder} />
          
          <CgSearch size={'2rem'}/>
        </form>
        <ul className={styles.ingredientsContainer}>
            {allIngredients.data.map((ingredient: Ingredient, key) => {
              if(ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== '') {
                return <li key={key}><IngredientCard key={ingredient.idIngredient} ingredient={ingredient} /></li>
              }
              return <></>
            })}
          </ul>
      </>
    );
  } else {
    return <></>
  }
};

export default SearchBar;
