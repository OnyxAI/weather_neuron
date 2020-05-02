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
import widgetStyle from '../../assets/css/widget.css';
import iconStyle from '../../assets/css/weather-icon.css';
import { compose } from 'redux';

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

export function TodayWidgetComponent({ user, getTodayFunc, weather, ...props }) {
  useInjectReducer({ key: 'weather', reducer });
  useInjectSaga({ key: 'weather', saga });

  useEffect(() => {
    getTodayFunc();
  }, [0]);

  return (
    <Widget className='weather-container' style={props.style} >
        {weather && weather.todayWeather.currently ? (
            <div>
              <div class="city-title ">
                <span id="location"><FormattedMessage {...messages.header} /></span>
              </div>
              <hr />
              <div class="city-weather-temperature">
                <span class="celsius fahrenheit-btn black-text">{`${weather.todayWeather.currently.temperature.toFixed(1)}°C`}</span>
              </div>

              <div class="city-weather-description">
                <span id="icon"><i className={`wi wi-forecast-io-${weather.todayWeather.currently.icon}`} /></span><br/>
                <span id="description" className="black-text">{weather.todayWeather.currently.summary}</span>
              </div>

              <div class="bottom">
                <div class="nav-info clearfix">
                  <div class="add-info">
                    <ul id="details">
                      <li>
                        <span id="todayC" className="black-text">{`${weather.todayWeather.daily.data[0].temperatureMin.toFixed(0)}°/${weather.todayWeather.daily.data[0].temperatureMax.toFixed(0)}°`}</span>
                        <i className={`wi wi-forecast-io-${weather.todayWeather.daily.data[0].icon}`} id="smallIcon" />
                      </li>
                      <li>
                        <span id="tomorrowC" className="black-text">{`${weather.todayWeather.daily.data[1].temperatureMin.toFixed(0)}°/${weather.todayWeather.daily.data[1].temperatureMax.toFixed(0)}°`}</span>
                        <i className={`wi wi-forecast-io-${weather.todayWeather.daily.data[1].icon}`} id="smallIcon" />
                      </li>
                      <li>
                        <span id="afterTomorrowC" className="black-text">{`${weather.todayWeather.daily.data[2].temperatureMin.toFixed(0)}°/${weather.todayWeather.daily.data[2].temperatureMax.toFixed(0)}°`}</span>
                        <i className={`wi wi-forecast-io-${weather.todayWeather.daily.data[2].icon}`} id="smallIcon" />
                      </li>
                      <li>
                        <span id="afterAfterTomorrowC" className="black-text">{`${weather.todayWeather.daily.data[3].temperatureMin.toFixed(0)}°/${weather.todayWeather.daily.data[3].temperatureMax.toFixed(0)}°`}</span>
                        <i className={`wi wi-forecast-io-${weather.todayWeather.daily.data[3].icon}`} id="smallIcon" />
                      </li>

                    </ul>

                  </div>
                  <div><span class="date"></span><a href="http://forecast.io" id="forio">Powered by Dark Sky</a></div>
                </div>

              </div>
            </div>
        ) : (
          <div>
            <div class="weather-loader center" />
          </div>
        )}
    </Widget>
  );
}

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
