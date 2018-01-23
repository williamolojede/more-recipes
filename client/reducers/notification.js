import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/types';

const initialState = {
  message: '',
  type: 'success',
};
const notification = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.payload;
    case HIDE_NOTIFICATION:
      return { ...state, message: '' };
    default:
      return state;
  }
};

export default notification;
