import { filterOwnedIngredients } from "./filterOwnedIngredients";
import { IngredientList } from '../../model/ingredient';

const mockIngredientsList: IngredientList = {
  apple: { idIngredient: 1, strIngredient: "Apple", strDescription: "", strIngredientThumb: "", strType: "", owned: true },
  banana: { idIngredient: 2, strIngredient: "Banana", strDescription: "", strIngredientThumb: "", strType: "", owned: false },
  carrot: { idIngredient: 3, strIngredient: "Carrot", strDescription: "", strIngredientThumb: "", strType: "", owned: true },
};

describe('filterOwnedIngredients', () => {
  it('should return an IngredientList of owned ingredients', () => {

    const result = filterOwnedIngredients(mockIngredientsList);
    const expected: IngredientList = {
      apple: { idIngredient: 1, strIngredient: "Apple", strDescription: "", strIngredientThumb: "", strType: "", owned: true },
      carrot: { idIngredient: 3, strIngredient: "Carrot", strDescription: "", strIngredientThumb: "", strType: "", owned: true },
    };

    expect(result).toEqual(expected);
  });

  it('should return an empty object if no ingredients are passed', () => {
    const result = filterOwnedIngredients(undefined);
    const expected = {};

    expect(result).toEqual(expected);
  });
});
