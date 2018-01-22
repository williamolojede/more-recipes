import React from 'react';
import RecipeCardInfo from '../../../../components/shared/RecipeCard/RecipeCardInfo.jsx';
import recipesMock from '../../../__mocks__/recipes.mock';

function setup() {
  const {
    User,
    upVoteCount,
    downVoteCount,
    favoriteCount,
    viewCount
  } = recipesMock.recipes[5];

  const props = {
    info: {
      User,
      upVoteCount,
      downVoteCount,
      favoriteCount,
      viewCount
    }
  };
  const wrapper = shallow(<RecipeCardInfo {...props} />);

  return {
    wrapper
  };
}

describe('Recipe Card Info', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
