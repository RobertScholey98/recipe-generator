import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from './store/store';
import { addAllIngredients } from './store/features/allIngredientsSlice';
import { useAppSelector } from './store/store';
import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const dispatch = useAppDispatch();
  const allIngredients = useAppSelector((state) => state.allIngredients.ingredients);
  const foundIngredients = allIngredients.filter((ingredient) => ingredient.owned)
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    .then((response) => {
      console.log(response.data.meals)
      dispatch(addAllIngredients({ingredients: response.data.meals}))
    })
  },[])
  return (
    <>
      <h1 style={{margin: '0', padding: '.5rem 0', backgroundColor: '#7A9B76', color: '#F6E8EA', fontFamily: 'monospace'}}>RECIPE GENERATOR</h1>
      {!foundIngredients[0] && 
            <h1 className={styles.launchTitle}>🍞 Add some ingredients to get started 🌽</h1>
          }
      <div className={styles.App}>
          <section className={foundIngredients[0] ? styles.left : styles.leftHidden}>
            
          <h2 className={foundIngredients[0] ? styles.recipeTitle : styles.recipeTitleHidden}>Recipes</h2>
               
          </section>
    
        <section className={styles.right}>
          
          <SearchBar onSearch={() => {}}/>
          
        </section>
      </div>
    </>
  );
}

export default App;
