/**
 * API Calls ACTION CREATOR
 */

import { SET_FETCHING, UNSET_FETCHING } from './types';

export const setFetching = () => ({
  type: SET_FETCHING,
  isFetching: true
});

export const unsetFetching = () => ({
  type: UNSET_FETCHING,
  isFetching: false
});
