import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const SubmitButton = ({ submitText, handleClick, submitLoading }) => (
  <button
    type="submit"
    className={`
    submit-btn z-depth-1
    ${submitLoading ? 'submit-loading' : ''}
    `}
    onClick={handleClick}
    disabled={submitLoading}
  >
    <span>{submitText}</span>
    <ReactLoading
      type="spokes"
      color="#fff"
      height="25px"
      width="25px"
      className="loading-icon"
    />

  </button>
);

SubmitButton.defaultProps = {
  handleClick() {}
};

SubmitButton.propTypes = {
  submitText: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  submitLoading: PropTypes.bool.isRequired
};

export default SubmitButton;
