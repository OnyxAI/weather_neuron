import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectWeatherDomain = state => state.weather || initialState;

const makeSelectWeather = () =>
  createSelector(
    selectWeatherDomain,
    substate => substate,
  );

export { makeSelectWeather };
