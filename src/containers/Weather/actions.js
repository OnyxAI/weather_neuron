/*
 *
 * Weather actions
 *
 */
import {
  GET_TODAY,
  GET_TODAY_ERROR,
  GET_TODAY_SUCCESS,
  GET_TOKEN,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
  SET_TOKEN,
  SET_TOKEN_ERROR,
  SET_TOKEN_SUCCESS,
  CHANGE_TOKEN,
} from './constants';

export function changeToken(token) {
  return {
    type: CHANGE_TOKEN,
    token,
  };
}

export function getToken() {
  return {
    type: GET_TOKEN,
  };
}

export function getTokenSuccess(token) {
  return {
    type: GET_TOKEN_SUCCESS,
    token,
  };
}

export function getTokenError(error) {
  return {
    type: GET_TOKEN_ERROR,
    error,
  };
}

export function getToday() {
  return {
    type: GET_TODAY,
  };
}

export function getTodaySuccess(todayWeather) {
  console.log(todayWeather)
  return {
    type: GET_TODAY_SUCCESS,
    todayWeather,
  };
}

export function getTodayError(error) {
  return {
    type: GET_TODAY_ERROR,
    error,
  };
}

export function setToken() {
  return {
    type: SET_TOKEN,
  };
}

export function setTokenSuccess() {
  return {
    type: SET_TOKEN_SUCCESS,
  };
}

export function setTokenError(error) {
  return {
    type: SET_TOKEN_ERROR,
    error,
  };
}
