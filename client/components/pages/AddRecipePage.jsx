import React from 'react';

import ManageRecipes from '../shared/ManageRecipes';
import AddRecipeForm from '../shared/AddRecipeForm';

const AddRecipePage = props => (
  <ManageRecipes>
    <AddRecipeForm isEditMode={false} {...props} />
  </ManageRecipes>
);
export default AddRecipePage;
