import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from './store/store';
import { addAllIngredients } from './store/features/allIngredientsSlice';
import { useAppSelector } from './store/store';
import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import RecipeList from './components/RecipeList/RecipeList';

function App() {
  const dispatch = useAppDispatch();
  const allIngredients = useAppSelector((state) => state.allIngredients.ingredients);
  const foundIngredients = allIngredients.filter((ingredient) => ingredient.owned)
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v2/9973533/list.php?i=list`)
    .then((response) => {
      dispatch(addAllIngredients({ingredients: response.data.meals}))
    })
  },[])
  return (
    <>
      <h1 style={{margin: '0', padding: '.5rem 0', backgroundColor: '#F6E8EA', color: 'slategrey', fontFamily: 'monospace'}}>🍞 RECIPE GENERATOR 🌽</h1>
      <div className={!foundIngredients[0] ? styles.launchTitle : styles.launchTitleHidden} />
      <div className={styles.App}>
          <section className={foundIngredients[0] ? styles.left : styles.leftHidden}>  
          <h2 className={foundIngredients[0] ? styles.recipeTitle : styles.recipeTitleHidden}>RESULTS</h2>
          <RecipeList />
               
          </section>
    
        <section className={styles.right}>
          
          <SearchBar onSearch={() => {}}/>
          
        </section>
      </div>
    </>
  );
}

export default App;
