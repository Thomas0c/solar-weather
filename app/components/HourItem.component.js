// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import tz from 'moment-timezone';

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

// Components
import Icons from '../utils/icons.utils';
import Temperature from '../utils/temperature.utils';
import WeatherIconWrapper from '../styled/WeatherIconWrapper';

export default class HourItem extends PureComponent { // eslint-disable-line
  render() {
    const {
      unit,
      timeType,
      timezone,
      time,
    } = this.props;

    const temperature = unit === 'c' ? this.props.temperature :
      Temperature.convertToFahrenheit(this.props.temperature);
    const adjustedTemp = parseFloat(temperature).toFixed(0);
    const itemTime = moment.unix(time).tz(timezone);
    const timeFormat = timeType === '24' ? 'HH:00' : 'ha';
    const now = moment().tz(timezone);

    if (itemTime.isAfter(now)) {
      return (
        <View style={styles.hour} key={itemTime}>
          <Text style={styles.hourText}>{itemTime.minutes(0).format(timeFormat)}</Text>
          <WeatherIconWrapper>
            <Image style={styles.image} source={Icons.identifyIcon(`${this.props.icon}_white`)} />
          </WeatherIconWrapper>
          <Text style={styles.temperature}>
            {adjustedTemp}°
          </Text>
        </View>
      );
    }
    return null;
  }
}

HourItem.propTypes = {
  unit: PropTypes.string,
  timeType: PropTypes.string,
  timezone: PropTypes.string,
  temperature: PropTypes.number,
  time: PropTypes.number,
  icon: PropTypes.string,
};

const styles = StyleSheet.create({
  hour: {
    width: '7.65%',
    alignItems: 'center',
    height: '100%',
  },
  hourText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#EFEFEF',
    marginTop: 15,
  },
  image: {
    alignSelf: 'center',
    width: '90%',
    marginTop: -5,
    resizeMode: 'contain',
  },
  temperature: {
    color: '#EFEFEF',
    fontSize: 14,
  },
});
