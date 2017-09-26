import React from 'react';
import PropTypes from 'prop-types';

const ErrorDisplay = props => (
  <div className="error z-depth-1">
    <span className="error__cancel">X</span>
    <p className="error__message">{ props.message }</p>
  </div>
);

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorDisplay;
