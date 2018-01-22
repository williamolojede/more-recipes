import React from 'react';
import { PureAddRecipeForm } from '../../../components/shared/AddRecipeForm';
import { initialState } from '../../../reducers/recipe';
import recipesMock from '../../__mocks__/recipes.mock';

jest.useFakeTimers();

function setup() {
  const props = {
    dispatch: jest.fn().mockReturnValue(Promise.resolve()),
    recipe: recipesMock.recipes[1],
    isEditMode: false,
    history: {
      push: jest.fn()
    }
  };
  const editModeProps = {
    dispatch: jest.fn().mockReturnValue(Promise.resolve()),
    recipe: recipesMock.recipes[1],
    isEditMode: true,
    match: {
      params: {
        recipeId: 5
      }
    },
    history: {
      push: jest.fn()
    }
  };

  const wrapper = mount(<PureAddRecipeForm {...props} />);
  const editModeWrapper = shallow(<PureAddRecipeForm {...editModeProps} />);

  return {
    wrapper,
    editModeWrapper,
    props,
    editModeProps
  };
}

describe('AddRecipeForm', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch an action to reset the recipe stored in the store', () => {
    const { wrapper } = setup();
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    wrapper.instance().componentWillUnmount();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should remove item(ingredient or instruction) from state if delete button is clicked', () => {
    const { wrapper, props: { recipe } } = setup();
    const removeIngredientButtons = wrapper.find('.remove-item.remove-ingredients');
    const removeInstructionButtons = wrapper.find('.remove-item.remove-instructions');
    const removeItemSpy = jest.spyOn(wrapper.instance(), 'removeItem');

    expect(removeIngredientButtons.length).toBe(recipe.ingredients.length);
    expect(removeInstructionButtons.length).toBe(recipe.instructions.length);

    removeIngredientButtons.at(1).simulate('click', eventObject);
    removeInstructionButtons.at(1).simulate('click', eventObject);
    expect(removeItemSpy).toHaveBeenCalledTimes(2);

    const { ingredients, instructions } = wrapper.instance().state.recipe;
    expect(ingredients.length).toBe(recipe.ingredients.length - 1);
    expect(instructions.length).toBe(recipe.instructions.length - 1);
  });

  describe('addRecipeProp', () => {
    it('should add recipe name to the state', () => {
      const { wrapper } = setup();
      const nameInput = wrapper.find('#recipe-name');
      const addRecipePropSpy = jest.spyOn(wrapper.instance(), 'addRecipeProp');
      expect(nameInput.length).toBe(1);
      nameInput.simulate('change');
      expect(addRecipePropSpy).toHaveBeenCalledTimes(1);
    });

    it('should add recipe description to the state', () => {
      const { wrapper } = setup();
      const descriptionInput = wrapper.find('#recipe-description');
      const addRecipePropSpy = jest.spyOn(wrapper.instance(), 'addRecipeProp');
      expect(descriptionInput.length).toBe(1);
      descriptionInput.simulate('change');
      expect(addRecipePropSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('showInput/hideInput/addItem', () => {
    it('should render input fields when the add button is clicked and hide them when out of focus', () => {
      const { wrapper, props: { recipe } } = setup();
      const addNewButtons = wrapper.find('.add-new');

      // actions performed
      const showInputSpy = jest.spyOn(wrapper.instance(), 'showInput');
      const hideInputSpy = jest.spyOn(wrapper.instance(), 'hideInput');
      const addItemSpy = jest.spyOn(wrapper.instance(), 'addItem');


      expect(addNewButtons.length).toBe(2);

      // show input
      addNewButtons.forEach((button) => {
        button.simulate('click', eventObject);
      });
      expect(wrapper.instance().state.renderInput.ingredient).toBe(true);
      expect(wrapper.instance().state.renderInput.instruction).toBe(true);
      expect(showInputSpy).toHaveBeenCalledTimes(2);

      const inputFields = wrapper.find('.ingredient-instrution-input');
      expect(inputFields.length).toBe(2);

      // set value of input field
      wrapper.instance().addInstructionInput.value = 'add instruction';
      wrapper.instance().addIngredientInput.value = 'add ingredient';

      // add item and then hide input
      inputFields.forEach((input) => {
        input.simulate('keyUp', {
          ...eventObject,
          keyCode: 13,
          value: 'some text'
        });
        input.simulate('blur', eventObject);
      });

      expect(addItemSpy).toHaveBeenCalledTimes(2);
      expect(hideInputSpy).toHaveBeenCalledTimes(2);

      expect(wrapper.instance().state.renderInput.ingredient).toBe(false);
      expect(wrapper.instance().state.renderInput.instruction).toBe(false);

      const { ingredients, instructions } = wrapper.instance().state.recipe;
      expect(ingredients.length).toBe(recipe.ingredients.length + 1);
      expect(instructions.length).toBe(recipe.instructions.length + 1);
    });
  });

  describe('Edit Mode', () => {
    it('should render with right amount of elements', () => {
      const { editModeWrapper: wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });

    it('should show a preloader while fetching recipe in edit mode', () => {
      const { editModeWrapper: wrapper } = setup();
      wrapper.setProps({ isFetching: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('submitForm', () => {
    it('should call the update function when the form is submitted', () => {
      const { editModeWrapper: wrapper } = setup();
      // const AddRecipeForm = wrapper.find('AddRecipeForm');
      const form = wrapper.find('form');
      expect(form.length).toBe(1);
      const updateRecipeSpy = jest.spyOn(wrapper.instance(), 'updateRecipe');
      // const pushSpy = jest.spyOn(wrapper.instance().props.history, 'push');

      form.simulate('submit', eventObject);
      expect(updateRecipeSpy).toHaveBeenCalledTimes(1);
      jest.runAllTimers();
      // expect(pushSpy).toHaveBeenCalledTimes(1);
    });
    describe('AddRecipeMode', () => {
      it('should warn user when name or description field has not been filled', () => {
        const { wrapper } = setup();
        const form = wrapper.find('form');
        expect(form.length).toBe(1);

        const addRecipeSpy = jest.spyOn(wrapper.instance(), 'addRecipe');

        wrapper.setState({ recipe: initialState.recipe });
        form.simulate('submit', eventObject);
        expect(addRecipeSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().state.addRecipe.allow).toBe(false);
        expect(wrapper.instance().state.addRecipe.errorMessage).toBe('recipe name and description are required');
      });

      it('should warn user when ingredients or instructions has not been filled', () => {
        const { wrapper } = setup();
        const form = wrapper.find('form');
        expect(form.length).toBe(1);

        const addRecipeSpy = jest.spyOn(wrapper.instance(), 'addRecipe');

        wrapper.setState({ recipe: { ...recipesMock.recipes[1], instructions: [] } });
        form.simulate('submit', eventObject);
        expect(addRecipeSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().state.addRecipe.allow).toBe(false);
        expect(wrapper.instance().state.addRecipe.errorMessage).toBe('ingredients and instructions cannot be empty');
      });

      it('should submit the form if there are no errors', () => {
        const { wrapper } = setup();

        const form = wrapper.find('form');
        expect(form.length).toBe(1);

        const addRecipeSpy = jest.spyOn(wrapper.instance(), 'addRecipe');
        // const pushSpy = jest.spyOn(wrapper.instance().props.history, 'push');

        form.simulate('submit', eventObject);
        expect(addRecipeSpy).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        // expect(pushSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
