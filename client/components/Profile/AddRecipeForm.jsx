import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import storage from '../../config/firebase';
import defaultConfig from '../../config/default';
import { recipePropTypes } from '../../config/proptypes';
import { addRecipe, updateRecipe } from '../../actions/recipe';
import scrollUp from '../../utils/scrollUp';


import ErrorDisplay from '../shared/ErrorDisplay.jsx';


class AddRecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      renderInput: {
        ingredient: false,
        instruction: false,
      },
      // pending, started, failed, completed
      imageUploadProgress: 'pending',
      addRecipe: {
        allow: true,
        errorMessage: '',
      },
      updateRecipeMode: false
    };
  }

  componentWillMount() {
    if (this.props.isEditMode) {
      this.setState({
        updateRecipeMode: true,
      });
    }
    this.setState({
      recipe: this.props.recipe,
      recipeIndex: this.props.recipeIndex
    });
  }

  /**
   * @param {object} e  - event object
   * @param {object} el - input element
   * @param {string} type - recipe key name whose value is to be updated
   * @return {undefined}
   */
  addItem = (e, el, type) => {
    if (e.keyCode === 13) {
      // Do something
      e.preventDefault();
      const recipe = Object.assign({}, this.state.recipe);
      const text = el.value.trim();
      if (text) {
        recipe[type] = recipe[type].concat(text);
        this.setState({ recipe });
      }
      el.value = '';
    }
  }

  /**
   * @param {object} e  - event object
   * @param {string} type - recipe key name whose value is to be updated
   * @param {number} index - input element
   * @return {undefined}
   */
  removeItem = (e, type, index) => {
    e.preventDefault();
    const recipe = Object.assign({}, this.state.recipe);

    recipe[type] = [
      ...recipe[type].slice(0, index),
      ...recipe[type].slice(index + 1)
    ];
    this.setState({ recipe });
  }

  /**
   * Form submission handler
   * @param {object} e - event object
   * @return {undefined}
   */
  addRecipe = () => {
    const { name, description, img_url, ingredients, instructions } = this.state.recipe;

    if (!name || !description) {
      scrollUp('16.66', '50');
      this.setState({
        addRecipe: {
          allow: false,
          errorMessage: 'recipe name and description are required'
        }
      });
    } else if (!ingredients.length || !instructions.length) {
      scrollUp('16.66', '50');
      this.setState({
        addRecipe: {
          allow: false,
          errorMessage: 'ingredients and instructions cannot be empty'
        }
      });
    } else {
      this.props.dispatch(addRecipe(this.state.recipe));
    }
  }

  updateRecipe = () => {
    this.props.dispatch(updateRecipe(this.state.recipe, this.state.recipeIndex));
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.updateRecipeMode) {
      this.updateRecipe();
    } else {
      this.addRecipe();
    }
  }

  /**
   * @param {object} e - event object
   * @param {string} type - type of input to be show, for ingredients or instructions
   * @return {undefined}
   */
  showInput = (e, type) => {
    e.preventDefault();
    const renderInput = Object.assign({}, this.state.renderInput);

    // if already true do nothing
    if (!renderInput[type]) {
      renderInput[type] = true;
      this.setState({ renderInput });
    }
  }

  /**
   * @param {object} e - event object
   * @param {string} type - type of input to be show, for ingredients or instructions
   * @return {undefined}
   */
  hideInput = (e, type) => {
    const renderInput = Object.assign({}, this.state.renderInput);
    // if already true do nothing
    if (renderInput[type]) {
      renderInput[type] = false;
      this.setState({ renderInput });
    }
  }

  /**
   * Handles image upload
   * @param {object} imageInput - the image input to get image to be uploaded from
   * @return {undefined}
   */
  imageUpload = (imageInput) => {
    // check if the imageInput is empty
    const isDisabled = imageInput.files.length > 0;
    // disable the input if its not
    imageInput.disabled = isDisabled;
    const image = imageInput.files[0];
    // create a storage reference ising the current time as filename
    const storageRef = storage.ref(`recipes/${Date.now()}`);
    // upload the file
    const uploadTask = storageRef.put(image);

    uploadTask.on('state_changed',
      // image upload progress
      () => {
        this.setState({ imageUploadProgress: 'started' });
      },
      // image upload failure
      () => {
        this.setState({ imageUploadProgress: 'failed' });
        // re-enable the upload button
        imageInput.disabled = false;
        // update state to remove warning message
        setTimeout(() => { this.setState({ imageUploadProgress: 'pending' }); }, 5000);
      },
      // image upload success
      () => {
        const { downloadURL: imgUrl } = uploadTask.snapshot;
        const recipe = Object.assign({}, this.state.recipe);
        recipe.img_url = imgUrl;
        this.setState({ recipe, imageUploadProgress: 'completed' });
      }
    );
  }

  /**
   * Adds the recipe name or description to the state
   * @param {object} el - element
   * @param {string} type - property name whose value is to be added, type: 'name' or 'description'
   * @return {undefined}
   */
  addRecipeProp = (el, type) => {
    const text = el.value.trim();
    const recipe = Object.assign({}, this.state.recipe);
    recipe[type] = text;
    this.setState({ recipe });
  }

  /**
   * renderItems returns of a list of item that matches the provide type in state.recipe
   * @param {string} type - the type of item in state to be looped through
   * @return {jsx} - a list of items to be redered
   */
  renderItems = type => this.state.recipe[type].map((item, index) => (
    // TODO: figure out a way not to use array index
    <li key={index}>
      {item}
      <a href="/delete" onClick={e => this.removeItem(e, type, index)}>
        <i className="mdi mdi-delete" />
      </a>
    </li>
  ))


  render() {
    if (!this.props.asOwner) {
      return <Redirect to="/" />;
    }
    return (
      <div id="add" className="col s12 my-recipe__add z-depth-1">
        {
          this.state.addRecipe.allow ?
            null
            :
            <ErrorDisplay message={this.state.addRecipe.errorMessage} />
        }
        <form
          className="my-recipe__add--form"
          onSubmit={this.submitForm}
        >
          <label className="my-recipe__add--form___name" htmlFor="recipe-name">
          Name
            <input
              type="text"
              id="recipe-name"
              name="recipe-name"
              placeholder="e.g: Jollof rice"
              defaultValue={this.state.recipe.name}
              ref={node => this.recipeNameInput = node}
              onChange={() => this.addRecipeProp(this.recipeNameInput, 'name')}
            />
          </label>
          {/*  description-image wrapper  */}
          <div className="description-image">
            <label className="my-recipe__add--form___desc" htmlFor="recipe-description">
            Description
              <textarea
                placeholder="e.g: short description..."
                id="recipe-description"
                defaultValue={this.state.recipe.description}
                ref={node => this.recipeDescInput = node}
                onChange={() => this.addRecipeProp(this.recipeDescInput, 'description')}
              />
            </label>
            <div className="my-recipe__add--form___img">
              <p className="label">Image</p>
              <div className="image-upload">
                <div className="image-upload__preview">
                  <img
                    src={this.state.recipe.img_url}
                    alt={this.state.recipe.name}
                    className="image-upload__preview___image"
                  />
                  <div className="image-upload__progress">
                    {
                      this.state.imageUploadProgress === 'started' &&
                      <img src={defaultConfig.loadingGifUrl} alt="loading" />
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
                  onChange={() => this.imageUpload(this.recipeImageInput)}
                />
              </div>
            </div>
          </div>

          {/* ingredients-instruction wrapper  */}
          <div className="ingredients-instruction">
            <fieldset className="ingredients-form my-recipe__add--form___ingredients">
              <legend>Ingredient(s):</legend>
              <ol>
                {
                  this.renderItems('ingredients')
                }
              </ol>
              {
                this.state.renderInput.ingredient ?
                  <textarea
                    type="text"
                    name="recipe-ingredient__name"
                    placeholder="e.g: egusi"
                    ref={node => this.addIngredientInput = node}
                    onKeyUp={e => this.addItem(e, this.addIngredientInput, 'ingredients')}
                    onBlur={e => this.hideInput(e, 'ingredient')}
                  />
                  :
                  <a href="/add-new" className="add-new" onClick={e => this.showInput(e, 'ingredient')}>
                    <i className="mdi mdi-plus" />
                    <span>Add an ingredient</span>
                  </a>
              }
            </fieldset>
            <fieldset className="instructions-form my-recipe__add--form___instructions">
              <legend>Instruction(s):</legend>
              <ol>
                {
                  this.renderItems('instructions')
                }
              </ol>
              {
                this.state.renderInput.instruction ?
                  <textarea
                    type="text"
                    name="recipe-instruction__name"
                    placeholder="e.g: boil water"
                    ref={node => this.addInstructionInput = node}
                    onKeyUp={e => this.addItem(e, this.addInstructionInput, 'instructions')}
                    onBlur={e => this.hideInput(e, 'instruction')}
                  />
                  :
                  <a href="/add-new" className="add-new" onClick={e => this.showInput(e, 'instruction')}>
                    <i className="mdi mdi-plus" />
                    <span>Add an instruction</span>
                  </a>
              }
            </fieldset>
          </div>
          <div className="form-btns">
            {
              this.state.updateRecipeMode ?
                <button className="form-btn btn form-btn__cancel waves-light">Cancel</button>
                :
                null
            }
            <button
              type="submit"
              className="form__submit z-depth-1"
              ref={btn => this.submitBtn = btn}
            >{this.state.updateRecipeMode ? 'Update' : 'Submit' }</button>
          </div>
        </form>
      </div>
    );
  }
}
AddRecipeForm.defaultProps = {
  recipe: {
    name: '',
    description: '',
    img_url: defaultConfig.recipeImgUrl,
    ingredients: [],
    instructions: []
  }
};

AddRecipeForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  asOwner: PropTypes.bool.isRequired,
  ...recipePropTypes,
  isEditMode: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  recipeIndex: PropTypes.number
};

export default connect(null)(AddRecipeForm);
