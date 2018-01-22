import React from 'react';
import RecipeCardShort from '../../../../components/shared/RecipeCard/RecipeCardShort.jsx';
import recipesMock from '../../../__mocks__/recipes.mock';

function setup(type) {
  const {
    id,
    name
    // upVoteCount,
    // downVoteCount,
    // favoriteCount,
    // viewCount
  } = recipesMock.recipes[5];

  const props = {
    id,
    name,
    removeRecipe: jest.fn(),
    type
  };
  const wrapper = shallow(<RecipeCardShort {...props} />);

  return {
    wrapper,
    props
  };
}

describe('Recipe Card Info', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup('personal');
    expect(wrapper).toMatchSnapshot();
  });

  it('should call a function to delete a recipe when its clicked', () => {
    const { wrapper, props } = setup('personal');
    const deleteButton = wrapper.find('button');
    expect(deleteButton.length).toBe(1);
    const removeRecipeSpy = jest.spyOn(wrapper.instance().props, 'removeRecipe');

    deleteButton.simulate('click');
    expect(removeRecipeSpy).toHaveBeenCalledTimes(1);
    expect(removeRecipeSpy).toHaveBeenCalledWith(props.id);
  });
});
