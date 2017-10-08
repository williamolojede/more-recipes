import React from 'react';

const InstructionsList = props => (
  <div className="recipe__instructions col s12 m6">
    <h3>Instructions</h3>
    <ol>
      {
        props.instructions.map((instruction, i) => <li key={i}><span>{instruction}</span></li>)
      }
    </ol>
  </div>
);

export default InstructionsList;
