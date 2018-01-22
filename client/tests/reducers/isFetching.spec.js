import reducer from '../../reducers/isFetching';
import * as types from '../../actions/types';


describe('isfetching reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(false);
  });

  it('should set isfetching to true', () => {
    expect(reducer(undefined, {
      type: types.SET_FETCHING
    })).toEqual(true);
  });

  it('should set isfetching to false', () => {
    expect(reducer(undefined, {
      type: types.UNSET_FETCHING
    })).toEqual(false);
  });
});
