import * as actions from '../../actions/notification';
import * as types from '../../actions/types';

describe('notification', () => {
  it('should create an action to show notification', () => {
    const message = 'Finish docs';
    const expectedAction = {
      type: types.SHOW_NOTIFICATION,
      message
    };
    expect(actions.showNotification(message)).toEqual(expectedAction);
  });

  it('should create an action to hide notification', () => {
    const expectedAction = {
      type: types.HIDE_NOTIFICATION
    };
    expect(actions.hideNotification()).toEqual(expectedAction);
  });
});
