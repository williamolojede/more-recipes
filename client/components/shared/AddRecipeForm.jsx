import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import defaultConfig from '../../config/default';
import { recipePropTypes } from '../../config/proptypes';
import {
  addRecipe,
  updateRecipe,
  fetchSingleRecipe,
  resetSingleRecipe
} from '../../actions/recipe';
import imageUpload from '../../utils/imageUpload';

import ErrorDisplay from './ErrorDisplay';
import Preloader from './Preloader';
import ImageUpload from './ImageUpload';
import SubmitButton from './SubmitButton';


class AddRecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe,
      renderInput: {
        ingredient: false,
        instruction: false,
      },
      submitLoading: false,
      // pending, started, failed, completed
      imageUploadProgress: 'pending',
      addRecipe: {
        allow: true,
        errorMessage: '',
      }
    };
  }

  componentDidMount() {
    if (this.props.isEditMode) {
      this.props.dispatch(fetchSingleRecipe(this.props.match.params.recipeId));
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ recipe: newProps.recipe });
  }

  componentWillUnmount() {
    this.props.dispatch(resetSingleRecipe());
  }

  /**
   * @param {object} event  - event object
   * @param {object} el - input element
   * @param {string} type - recipe key name whose value is to be updated
   * @return {undefined}
   */
  addItem = (event, el, type) => {
    if (event.keyCode === 13) {
      event.preventDefault();
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
   * @param {object} event  - event object
   * @param {string} type - recipe key name whose value is to be updated
   * @param {number} index - input element
   * @return {undefined}
   */
  removeItem = (event, type, index) => {
    event.preventDefault();
    const recipe = Object.assign({}, this.state.recipe);

    recipe[type] = [
      ...recipe[type].slice(0, index),
      ...recipe[type].slice(index + 1)
    ];
    this.setState({ recipe });
  }

  /**
   * Form submission handler
   * @return {undefined}
   */
  addRecipe = () => {
    const {
      name,
      description,
      ingredients,
      instructions
    } = this.state.recipe;

    if (!name || !description) {
      this.setState({
        addRecipe: {
          allow: false,
          errorMessage: 'recipe name and description are required'
        }
      });
    } else if (!ingredients.length || !instructions.length) {
      this.setState({
        addRecipe: {
          allow: false,
          errorMessage: 'ingredients and instructions cannot be empty'
        }
      });
    } else {
      this.setState({ submitLoading: true });
      this.props.dispatch(addRecipe(this.state.recipe))
        .then(this.handleFormSubmitSuccess);
    }
  }

  updateRecipe = () => {
    this.setState({ submitLoading: true });
    this.props.dispatch(updateRecipe(this.state.recipe))
      .then(this.handleFormSubmitSuccess);
  }

  handleFormSubmitSuccess = () => {
    // set submit loading to false and redirect to
    //  all recipes page after .5s
    this.setState({ submitLoading: false });
    setTimeout(() => this.props.history.push('/user/recipes'), 500);
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.props.isEditMode) {
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
  imageUploadHandler = (imageInput) => {
    imageUpload.call(
      this,
      imageInput,
      `recipes/${Date.now()}`,
      (downloadURL) => {
        const recipe = Object.assign({}, this.state.recipe);
        recipe.img_url = downloadURL;
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
    <li key={index}>
      {item}
      <a href="/delete" className={`remove-item remove-${type}`} onClick={e => this.removeItem(e, type, index)}>
        <i className="mdi mdi-delete" />
      </a>
    </li>
  ))

  renderForm = () => (
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
          placeholder={this.state.recipe.name}
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
          <ImageUpload
            imgUrl={this.state.recipe.img_url}
            altText={this.state.recipe.name}
            imageUploadProgress={this.state.imageUploadProgress}
            imageUploadHandler={this.imageUploadHandler}
            defaultImgUrl={defaultConfig.recipeImgUrl}
          />
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
                className="ingredient-instrution-input"
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
                className="ingredient-instrution-input"
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
        <SubmitButton
          submitText={this.props.isEditMode ? 'Update' : 'Submit'}
          submitLoading={this.state.submitLoading}
        />
        {
          this.props.isEditMode ?
            <Link to="/user/recipes">or go back to your recipe list</Link>
            :
            null
        }
      </div>
    </form>
  )

  render() {
    return (
      <div className="container page-manage__add z-depth-1">
        {
          !this.state.addRecipe.allow &&
            <ErrorDisplay message={this.state.addRecipe.errorMessage} />
        }
        {
          (this.props.isEditMode && this.props.isFetching) ? <Preloader />
            : this.renderForm()
        }
      </div>
    );
  }
}

AddRecipeForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ...recipePropTypes,
  isEditMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  isFetching,
  singleRecipe: { recipe }
}) => ({
  isFetching,
  recipe
});

export { AddRecipeForm as PureAddRecipeForm };
export default connect(mapStateToProps)(AddRecipeForm);
