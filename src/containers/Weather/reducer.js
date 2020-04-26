/*
 *
 * Weather reducer
 *
 */
import produce from 'immer';
import {
  GET_TODAY_ERROR,
  GET_TODAY_SUCCESS,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
  SET_TOKEN_ERROR,
  CHANGE_TOKEN,
} from './constants';

export const initialState = {
  errorText: '',
  token: '',
  todayWeather: {},
};

/* eslint-disable default-case, no-param-reassign */
const weatherReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TOKEN:
        draft.token = action.token;
        break;
      case GET_TOKEN_SUCCESS:
        draft.token = action.token;
        break;
      case GET_TOKEN_ERROR:
        draft.errorText = action.error;
        break;
      case GET_TODAY_SUCCESS:
        draft.todayWeather = action.todayWeather;
        break;
      case GET_TODAY_ERROR:
        draft.errorText = action.error;
        break;
      case SET_TOKEN_ERROR:
        draft.errorText = action.error;
        break;
    }
  });

export default weatherReducer;
