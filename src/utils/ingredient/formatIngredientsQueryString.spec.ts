import { removeSpaces, formatIngredientsQueryString } from './formatIngredientsQueryString';
import { Ingredient } from '../../model/ingredient';

describe('removeSpaces', () => {
  it('should replace spaces with underscores', () => {
    const str = "two words";
    const result = removeSpaces(str);
    expect(result).toBe("two_words");
  });

  it('should replace multiple spaces with underscores', () => {
    const str = "here be four words";
    const result = removeSpaces(str);
    expect(result).toBe("here_be_four_words");
  });
  
  it('should return the same string if there are no spaces', () => {
    const str = "singleWord";
    const result = removeSpaces(str);
    expect(result).toBe("singleWord");
  });
});

const mockIngredients: Ingredient[] = [
    { idIngredient: 1, strIngredient: "Apple", strDescription: "", strIngredientThumb: "", strType: "", owned: true },
    { idIngredient: 2, strIngredient: "Banana Bread", strDescription: "", strIngredientThumb: "", strType: "", owned: true },
    { idIngredient: 3, strIngredient: "Carrot", strDescription: "", strIngredientThumb: "", strType: "", owned: true },
  ];

  const mockIngredientsNoneOwned: Ingredient[] = [
    { idIngredient: 1, strIngredient: "Apple", strDescription: "", strIngredientThumb: "", strType: "", owned: false },
    { idIngredient: 2, strIngredient: "Banana Bread", strDescription: "", strIngredientThumb: "", strType: "", owned: false },
    { idIngredient: 3, strIngredient: "Carrot", strDescription: "", strIngredientThumb: "", strType: "", owned: false },
  ];

  const mockIngredientsEmpty: Ingredient[] = [];

describe('formatIngredientsQueryString', () => {
  it('should format ingredients query string correctly', () => {

    const result = formatIngredientsQueryString(mockIngredients);

    expect(result).toBe("apple,banana_bread,carrot");
  });

  it('should return an empty string if there are no owned ingredients', () => {
    

    const result = formatIngredientsQueryString(mockIngredientsNoneOwned);
    expect(result).toBe("");
  });

  it('should return an empty string if the ingredient list is empty', () => {
    

    const result = formatIngredientsQueryString(mockIngredientsEmpty);
    expect(result).toBe("");
  });
});
