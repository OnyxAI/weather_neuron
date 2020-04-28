/* eslint-disable no-undef */
/**
 *
 * Weather
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useInjectSaga } from 'onyx/utils';
import { useInjectReducer } from 'onyx/utils';
import { Container } from 'onyx/components';
import { Widget } from 'onyx/components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { getImg } from './getImg';

import { makeSelectWeather } from './selectors';
import {
  getToken,
  getToday,
  setToken,
  changeToken,
} from './actions';
import saga from './saga';
import reducer from './reducer';

import { Card, CardBody, CardHeader, CardTitle } from 'uikit-react';

import messages from './messages';

export function Weather({ user, getTokenFunc, getTodayFunc, setTokenFunc, changeTokenFunc, weather }) {
  useInjectReducer({ key: 'weather', reducer });
  useInjectSaga({ key: 'weather', saga });

  useEffect(() => {
    getTokenFunc();
    getTodayFunc();
  }, [0]);

  return (
    <div>
      <Helmet>
        <title>Weather</title>
        <meta name="description" content="Description of Weather" />
      </Helmet>
      <Container user={user} title={<FormattedMessage {...messages.header} />}>
        {weather && (
          <div>
            <input value={weather.token} onChange={changeTokenFunc} className="uk-input uk-form-large" type="text" placeholder="Dark Sky API" />
            <div className="uk-padding-small center">
              <button
                type="button"
                onClick={() => setTokenFunc()}
                className="uk-button uk-button-primary uk-button-large"
              >
                <FormattedMessage id="onyx.global.send" />
              </button>
            </div>

            <h1><FormattedMessage {...messages.today} /></h1>

            <div className="center">
              <WeatherImg
                alt="Weather"
                src={weather.todayWeather.currently && getImg(weather.todayWeather.currently.icon)}
              />
            </div>

            <h1 style={{fontSize: '50px'}} className="center">{weather.todayWeather.currently && Math.round(weather.todayWeather.currently.temperature)} °C</h1>
          </div>
        )}
      </Container>
    </div>
  );
}

export function TodayWidgetComponent({ user, getTodayFunc, weather }) {
  useInjectReducer({ key: 'weather', reducer });
  useInjectSaga({ key: 'weather', saga });

  useEffect(() => {
    getTodayFunc();
  }, [0]);

  return (
    <div>
        {weather && (
          <div>
            <div className="center">
              <WeatherImg
                alt="Weather"
                src={weather.todayWeather.currently && getImg(weather.todayWeather.currently.icon)}
              />
            </div>

            <h1 style={{fontSize: '50px'}} className="center">{weather.todayWeather.currently && Math.round(weather.todayWeather.currently.temperature)} °C</h1>
          </div>
        )}
    </div>
  );
}

const WeatherImg = styled.img`
  width: 100px;
  height: 100px;
`;

Weather.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  weather: makeSelectWeather(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTodayFunc: () => {
      dispatch(getToday());
    },
    getTokenFunc: () => {
      dispatch(getToken());
    },
    setTokenFunc: () => {
      dispatch(setToken());
    },
    changeTokenFunc: evt => {
      if(evt && evt.target){
        dispatch(changeToken(evt.target.value));
      }
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const TodayWidget = compose(
  withConnect,
  memo,
)(TodayWidgetComponent);

export default compose(
  withConnect,
  memo,
)(Weather);
