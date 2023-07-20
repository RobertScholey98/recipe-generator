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
  console.log({foundIngredients})
  return (
    <>
      <h1 style={{margin: '0', padding: '.5rem 0', backgroundColor: '#7A9B76', color: '#F6E8EA', fontFamily: 'monospace'}}>RECIPE GENERATOR</h1>
      <div className={styles.App}>
        { foundIngredients[0] &&
          <section className={styles.left}>
            <h2>My ingredients</h2>
            <ul>
              
            </ul>
          </section>
        }
        <section className={styles.right}>
          <SearchBar onSearch={() => {}}/>
        </section>
      </div>
    </>
  );
}

export default App;
