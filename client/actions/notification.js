import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './types';

export const showNotification = message => ({
  type: SHOW_NOTIFICATION,
  message
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});
