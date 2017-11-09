import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/types';

const notification = (state = '', action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.message;
    case HIDE_NOTIFICATION:
      return '';
    default:
      return state;
  }
};

export default notification;
