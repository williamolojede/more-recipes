import React from 'react';
import SubmitButton from '../../../components/shared/SubmitButton';

function setup() {
  const props = {
    submitText: 'Send Message',
    submitLoading: false
  };
  const wrapper = shallow(<SubmitButton {...props} />);

  return {
    props,
    wrapper
  };
}


describe('Submit Button', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should add a class name of submit-loading to button if submitLoading is true', () => {
    const { wrapper } = setup();
    wrapper.setProps({ submitLoading: true });
    expect(wrapper.find('button').hasClass('submit-loading')).toBe(true);
  });
});
