import reducer from '../../reducers/notification';
import * as types from '../../actions/types';


describe('notifications reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ message: '', type: 'success' });
  });

  it('should handle show notification', () => {
    expect(reducer(undefined, {
      type: types.SHOW_NOTIFICATION,
      payload: {
        message: 'Run the tests',
        type: 'success'
      }
    })).toEqual({
      message: 'Run the tests',
      type: 'success'
    });
  });

  it('should handle hide notification', () => {
    expect(reducer(undefined, {
      type: types.HIDE_NOTIFICATION
    })).toEqual({ message: '', type: 'success' });
  });
});
