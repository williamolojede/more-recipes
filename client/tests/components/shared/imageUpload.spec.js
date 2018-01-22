import React from 'react';
import ImageUpload from '../../../components/shared/ImageUpload';
import defaultConfig from '../../../config/default';

function setup() {
  const props = {
    altText: 'beautiful image',
    defaultImgUrl: defaultConfig.userImgUrl,
    imageUploadProgress: 'pending',
    imageUploadHandler: jest.fn()
  };
  const wrapper = mount(<ImageUpload {...props} />);

  return {
    wrapper
  };
}

describe('Image Upload', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a loading component when imgageUploadProgress is started', () => {
    const { wrapper } = setup();
    wrapper.setProps({ imageUploadProgress: 'started' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call a function to handle image upload when file is selected with input field', () => {
    const { wrapper } = setup();
    const uploadInput = wrapper.find('#recipe-image');
    const imageUploadHandlerSpy = jest.spyOn(wrapper.instance().props, 'imageUploadHandler');
    expect(uploadInput.length).toBe(1);
    uploadInput.simulate('change');
    expect(imageUploadHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
