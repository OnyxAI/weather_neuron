import { call, put, takeLatest, select } from 'redux-saga/effects';
import { request } from 'onyx/utils';
import { GET_TOKEN, GET_TODAY, SET_TOKEN } from './constants';

import {
  getToken,
  getTokenError,
  getTokenSuccess,
  getTodayError,
  getTodaySuccess,
  setTokenError,
  setTokenSuccess,
} from './actions';

import { makeSelectWeather } from './selectors';

// Get Today Weather
export function* loadTodayWeather() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/neuron/weather/today`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getTodaySuccess(result.weather));
    } else if (result && result.status === 'error') {
      yield put(getTodayError(result.message));
    } else {
      yield put(getTodayError('An error has occured'));
    }
  } catch (error) {
    yield put(getTodayError(error.toString()));
  }
}

// Get Token
export function* loadGetToken() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/neuron/weather/token`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getTokenSuccess(result.token));
    } else if (result && result.status === 'error') {
      yield put(getTokenError(result.message));
    } else {
      yield put(getTokenError('An error has occured'));
    }
  } catch (error) {
    yield put(getTokenError(error.toString()));
  }
}

// Set Token
export function* loadSetToken() {
  const token = localStorage.getItem('access_token');

  const weather = yield select(makeSelectWeather());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/neuron/weather/token`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        token: weather.token,
      },
    });
    if (result && result.status === 'success') {
      yield put(getToken());
      yield put(setTokenSuccess());
    } else if (result && result.status === 'error') {
      yield put(setTokenError(result.message));
    } else {
      yield put(setTokenError('An error has occured'));
    }
  } catch (error) {
    yield put(setTokenError(error.toString()));
  }
}

// Individual exports for testing
export default function* weatherSaga() {
  yield takeLatest(GET_TOKEN, loadGetToken);
  yield takeLatest(GET_TODAY, loadTodayWeather);
  yield takeLatest(SET_TOKEN, loadSetToken);
}
