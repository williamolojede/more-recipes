import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './types';

export const showNotification = ({ message, type }) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    message,
    type
  }
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});
