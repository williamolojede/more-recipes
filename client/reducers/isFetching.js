import { SET_FETCHING, UNSET_FETCHING } from '../actions/types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case SET_FETCHING:
      // console.log(Object.assign({}, state,);
      // return Object.assign({}, state, true);
      return true;
    case UNSET_FETCHING:
      return false;
    default:
      return state;
  }
};

export default isFetching;
