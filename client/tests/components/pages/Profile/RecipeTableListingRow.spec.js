import React from 'react';
import RecipeTableListingRow from '../../../../components/pages/Profile/RecipeTableListingRow';
import recipes from '../../../../__mocks__/recipes.mock';

function setup(type, asOwner) {
  const props = {
    type,
    asOwner,
    recipe: recipes[0],
    removeRecipe: jest.fn(),
    index: 1
  };
  const wrapper = shallow(<RecipeTableListingRow {...props} />);

  return {
    wrapper,
    props
  };
}


describe('RecipeTableListingRowu', () => {
  it('should render with right amount of elements for favorite recipes', () => {
    const { wrapper } = setup('favorites', true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with right amount of elements for personal-recipe', () => {
    const { wrapper } = setup('personal-recipes', true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch an action to log user out', () => {
    const { wrapper, props } = setup('personal-recipes', true);
    const deleteButton = wrapper.find('button');
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'removeRecipe');
    deleteButton.simulate('click', eventObject);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy)
      .toHaveBeenCalledWith(eventObject, props.recipe.id, props.type, props.index);
  });
});
