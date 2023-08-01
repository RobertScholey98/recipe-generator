import { useAppDispatch } from './store/store';
import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import RecipeList from './components/RecipeList/RecipeList';
import useCombinedIngredients from './hooks/useCombinedIngredients';
import useFoundRecipes from './hooks/useFoundRecipes';

function App() {
  const allIngredients = useCombinedIngredients()
  const recipes = useFoundRecipes();
  if(allIngredients.isSuccess) {
    return (
      <>
        <h1 style={{margin: '0', padding: '.5rem 0', backgroundColor: '#F6E8EA', color: 'slategrey', fontFamily: 'monospace'}}>🍞 RECIPE GENERATOR 🌽</h1>
        <div className={!allIngredients.data[0] ? styles.launchTitle : styles.launchTitleHidden} />
        <div className={styles.App}>
            <section className={recipes?.foundRecipes[0] ? styles.left : styles.leftHidden}>  
              <h2 className={recipes?.foundRecipes[0] ? styles.recipeTitle : styles.recipeTitleHidden}>RESULTS</h2>
            <RecipeList />
            </section>
            <section className={styles.right}>
              <SearchBar/>
            </section>
        </div> 
      </>
    );
  }
  return <></>
  
}

export default App;
