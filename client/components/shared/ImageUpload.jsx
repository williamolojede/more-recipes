import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

class ImageUpload extends Component {
  render() {
    const {
      imgUrl,
      altText,
      imageUploadProgress,
      className,
      defaultImgUrl,
      imageUploadHandler
    } = this.props;

    return (
      <div className={`image-upload ${className}`}>
        <div className="image-upload__preview">
          <img
            src={imgUrl || defaultImgUrl}
            alt={altText}
            className="image-upload__preview___image"
          />
          <div className="image-upload__progress">
            {
              imageUploadProgress === 'started' &&
              <ReactLoading
                type="spokes"
                color="#000"
                height="65px"
                width="65px"
                className="loading-icon"
              />
            }
          </div>
        </div>
        <label htmlFor="recipe-image" className="z-depth-1">Upload new picture</label>
        <input
          type="file"
          id="recipe-image"
          name="filename"
          accept="image/gif, image/jpeg, image/png"
          ref={node => this.recipeImageInput = node}
          onChange={() => imageUploadHandler(this.recipeImageInput)}
        />
      </div>
    );
  }
}

ImageUpload.defaultProps = {
  className: '',
  imgUrl: ''
};

ImageUpload.propTypes = {
  className: PropTypes.string,
  imgUrl: PropTypes.string,
  altText: PropTypes.string.isRequired,
  defaultImgUrl: PropTypes.string.isRequired,
  imageUploadProgress: PropTypes.oneOf(['pending', 'started', 'failed', 'completed']).isRequired,
  imageUploadHandler: PropTypes.func.isRequired
};

export default ImageUpload;
