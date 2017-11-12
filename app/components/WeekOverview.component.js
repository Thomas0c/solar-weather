// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import tz from 'moment-timezone';
import { darken } from 'polished';

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Colors from '../utils/colors.utils';

// Components
import WeatherIconWrapper from '../styled/WeatherIconWrapper';
import Icons from '../utils/icons.utils';
import Temperature from '../utils/temperature.utils';

export default class WeekOverview extends PureComponent { // eslint-disable-line
  render() {
    const {
      forecast,
      unit,
      timezone,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.shadow} />
        {forecast.map((day, idx) => {
          if (idx > 4) return null;
          const zone = timezone || 'America/New_York';
          const dayDate = moment.unix(day.time).tz(zone).startOf('day');

          const temperatureMax = unit === 'c' ?
            day.temperatureMax : Temperature.convertToFahrenheit(day.temperatureMax);
          const fixedHighTemp = parseFloat(temperatureMax).toFixed(0);
          const temperatureMin = unit === 'c' ?
            day.temperatureMin : Temperature.convertToFahrenheit(day.temperatureMin);
          const fixedLowTemp = parseFloat(temperatureMin).toFixed(0);
          const time = dayDate.tz(zone);
          const background = darken(0.1, Colors.identifyBackground(day.icon, day));

          return (
            <View style={[forecastDay.container, { backgroundColor: background }]} key={idx}>
              <Text style={forecastDay.dayTitle}>{time.format('dddd')}</Text>
              <WeatherIconWrapper>
                <Image style={forecastDay.image} source={Icons.identifyIcon(`${day.icon}_white`)} />
              </WeatherIconWrapper>
              <Text style={forecastDay.dayHighTemp}>
                {fixedHighTemp}°
                <Text style={forecastDay.dayLowTemp}> / {fixedLowTemp}°</Text>
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
}

WeekOverview.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.shape({})),
  unit: PropTypes.string,
  timezone: PropTypes.string,
};

const forecastDay = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 134,
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    alignSelf: 'center',
    width: '54%',
    resizeMode: 'contain',
  },
  dayTitle: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Baskerville',
  },
  dayHighTemp: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 14,
  },
  dayLowTemp: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '400',
  },
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  shadow: {
    width: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    zIndex: 2,
  },
});
