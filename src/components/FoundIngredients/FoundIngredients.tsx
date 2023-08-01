import { removeIngredient } from '../../store/slices/ownedIngredients';
import { useAppSelector } from '../../store/store';
import styles from './foundIngredients.module.css';
import { useDispatch } from 'react-redux';
import { CgCloseR } from 'react-icons/cg'
import useCombinedIngredients from '../../hooks/useCombinedIngredients';
import { Ingredient } from '../../model/ingredient';


const FoundIngredients: React.FC = () => {
  const foundIngredients = useAppSelector((state) => state.ownedIngredients);
  const allIngredients = useCombinedIngredients();
  const ingredientsToDisplay = allIngredients.data.filter((ingredient) => foundIngredients.includes(ingredient.idIngredient))
  return (
    <div className={styles.container}>
       <ul className={styles.listContainer}>
            {ingredientsToDisplay.map((ingredient) => {
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
