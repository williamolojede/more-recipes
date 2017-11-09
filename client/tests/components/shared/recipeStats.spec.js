import React from 'react';
import renderer from 'react-test-renderer';
import RecipeStats from '../../../components/shared/RecipeStats';

function setup() {
  const props = {
    stats: {
      downVoteCount: 0,
      favoriteCount: 0,
      upVoteCount: 0,
      viewCount: 0
    },
    favorite: jest.fn(),
    vote: jest.fn()
  };

  const component = renderer.create(<RecipeStats {...props} />);
  const wrapper = shallow(<RecipeStats {...props} />);
  return {
    component,
    wrapper
  };
}

describe('RecipeStats', () => {
  it('should render all expected elements', () => {
    const tree = setup().component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('should ', () => {
  //   const { wrapper } = setup();
  //   const onButtonClickSpy = jest.spyOn(wrapper.instance(), 'onButtonClick');
  //   wrapper.instance().onButtonClick('favorite');
  //   wrapper.instance().onButtonClick('vote', 'up');
  //   wrapper.instance().onButtonClick('vote', 'up');
  //   expect(onButtonClickSpy).toHaveBeenCalledTimes(3);
  // });
  it('should favorite as expected', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('.recipe-stats__favorite button');
    button.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should up vote as expected', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('.recipe-stats__vote-up button');
    button.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should downvote as expected', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('.recipe-stats__vote-down button');
    button.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
