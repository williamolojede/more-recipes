/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';

const InstructionsList = ({ instructions }) => (
  <div className="recipe__instructions col s12 m6">
    <h3>Instructions</h3>
    <ol>
      {
        instructions.map((instruction, i) => <li key={i}><span>{instruction}</span></li>)
      }
    </ol>
  </div>
);

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default InstructionsList;
