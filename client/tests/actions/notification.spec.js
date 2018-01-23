import * as actions from '../../actions/notification';
import * as types from '../../actions/types';

describe('notification', () => {
  it('should create an action to show notification', () => {
    const message = 'Finish docs';
    const type = 'success';
    const expectedAction = {
      type: types.SHOW_NOTIFICATION,
      payload: {
        message,
        type
      }
    };
    expect(actions.showNotification({ message, type })).toEqual(expectedAction);
  });

  it('should create an action to hide notification', () => {
    const expectedAction = {
      type: types.HIDE_NOTIFICATION
    };
    expect(actions.hideNotification()).toEqual(expectedAction);
  });
});
