/* eslint-disable no-undef */
/**
 *
 * Weather
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { Card, CardBody, CardHeader, CardTitle } from 'uikit-react';

import messages from './messages';

export function Weather({ user }) {
  return (
    <div>
      <Helmet>
        <title>Weather</title>
        <meta name="description" content="Description of Weather" />
      </Helmet>
      <Card hover>
        <CardHeader>
          <CardTitle>
            <FormattedMessage {...messages.header} />
          </CardTitle>
          <CardBody>
            <p>Welcome to weather neuron</p>
          </CardBody>
        </CardHeader>
      </Card>
    </div>
  );
}

Weather.propTypes = {
  user: PropTypes.object,
};

export default memo(Weather);
