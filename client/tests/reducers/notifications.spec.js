import reducer from '../../reducers/notification';
import * as types from '../../actions/types';


describe('notifications reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('');
  });

  it('should handle show notification', () => {
    expect(reducer(undefined, {
      type: types.SHOW_NOTIFICATION,
      message: 'Run the tests'
    })).toEqual('Run the tests');
  });

  it('should handle hide notification', () => {
    expect(reducer(undefined, {
      type: types.HIDE_NOTIFICATION
    })).toEqual('');
  });
});
