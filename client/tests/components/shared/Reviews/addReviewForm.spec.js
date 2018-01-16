import React from 'react';
import AddReviewForm from '../../../../components/shared/Reviews/AddReviewForm';
import user from '../../../__mocks__/user.mock';


function setup() {
  const props = {
    dispatch: jest.fn().mockReturnValue(Promise.resolve()),
    recipeId: 1,
    currentUser: user,
    limit: 6
  };

  const wrapper = mount(<AddReviewForm {...props} />);

  return {
    wrapper,
    props
  };
}

describe('Add review form ', () => {
  it('should render with the right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch an action if button is clicked and input field is not empty', () => {
    const { wrapper } = setup();
    const textarea = wrapper.find('textarea');
    const submitButton = wrapper.find('button');
    textarea.at(0).instance().value = 'test';

    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    // const addReviewSpy = jest.spyOn(wrapper.instance(), 'addReview');

    submitButton.simulate('click');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch an action if button is clicked and input field is empty', () => {
    const { wrapper } = setup();
    const textarea = wrapper.find('textarea');
    const submitButton = wrapper.find('button');
    textarea.at(0).instance().value = '';

    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    submitButton.simulate('click');
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });
});
