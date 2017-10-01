import React from 'react';
import { errorDisplayPropTypes } from '../../config/proptypes';

const ErrorDisplay = props => (
  <div className="error z-depth-1">
    <span className="error__cancel">X</span>
    <p className="error__message">{ props.message }</p>
  </div>
);

ErrorDisplay.propTypes = errorDisplayPropTypes;

export default ErrorDisplay;
