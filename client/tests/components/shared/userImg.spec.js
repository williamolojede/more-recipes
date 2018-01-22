import React from 'react';
import UserImg from '../../../components/shared/UserImg';
import user from '../../__mocks__/user.mock';
import defaultConfig from '../../../config/default';

function setup() {
  const props = {
    user,
    type: 'inReview'
  };
  const wrapper = shallow(<UserImg {...props} />);

  return {
    wrapper,
    props
  };
}

describe('Top Rated Recipes List', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly if user fullname is just one word', () => {
    const { wrapper, props } = setup();
    const propsWithUserImgUrl = Object.assign({}, props);
    propsWithUserImgUrl.user.fullname = 'OneWord';
    wrapper.setProps({ propsWithUserImgUrl });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an img tag if user imgurl is present', () => {
    const { wrapper, props } = setup();
    const propsWithUserImgUrl = Object.assign({}, props);
    propsWithUserImgUrl.user.imgUrl = defaultConfig.userImgUrl;
    wrapper.setProps({ propsWithUserImgUrl });
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
