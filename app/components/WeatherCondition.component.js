import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

import Colors from '../utils/colors.utils';
import DateText from '../styled/DateText';
import Temperature from '../utils/temperature.utils';

const formatText = (temp, humidity, precip) => `Feels like ${parseFloat(temp).toFixed(0)}°
Humidity ${parseFloat(humidity * 100).toFixed(0)}% ${precip}`;

export default class WeatherCondition extends PureComponent { // eslint-disable-line
  render() {
    const {
      day,
      toggleDetails,
      unit,
      alerts,
      toggleAlert,
      currently,
    } = this.props;

    const precipProbable = currently.precipProbability > 0.3;
    const precipType = currently.precipType || 'rain';

    // Get temperature and convert if needed
    const temperature = unit === 'c' ? currently.temperature :
      Temperature.convertToFahrenheit(currently.temperature);
    // Get Apparent temperature and convert if needed
    const apparentTemperature = unit === 'c' ? currently.apparentTemperature :
      Temperature.convertToFahrenheit(currently.apparentTemperature);

    const fontColor = Colors.identifyFontColor(currently.icon);
    const fixedTemp = temperature ? parseFloat(temperature).toFixed(0) : 'N/A';
    const fixedFeelsLike = parseFloat(apparentTemperature).toFixed(0);
    const precipNumber = precipProbable ?
      parseFloat(currently.precipProbability * 100).toFixed(0) : 0;
    const precipitation = precipProbable ? `
Chance of ${precipType}: ${precipNumber}%` : '';
    const showAlert = alerts.length > 0;

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={toggleDetails}
        underlayColor="transparent"
      >
        <View style={styles.container}>
          <Text style={[styles.temp, { color: fontColor }]}>{fixedTemp}°</Text>
          { !isNaN(temperature) &&
            <Text style={[styles.condition, { color: fontColor }]}>
              {currently.summary}
              { showAlert &&
                <TouchableHighlight
                  style={{ width: 25, height: 25 }}
                  onPress={toggleAlert}
                  underlayColor="transparent"
                >
                  <Image
                    style={styles.image}
                    source={require('../../assets/alert_icon.png')}
                  />
                </TouchableHighlight>
              }
            </Text>
          }
          { !isNaN(temperature) &&
            <DateText space style={{ color: fontColor, marginBottom: 10 }} day={day}>
              {formatText(fixedFeelsLike, currently.humidity, precipitation)}
            </DateText>
          }
        </View>
      </TouchableHighlight>
    );
  }
}

WeatherCondition.propTypes = {
  currently: PropTypes.shape({}),
  unit: PropTypes.string,
  day: PropTypes.bool,
  toggleAlert: PropTypes.func,
  toggleDetails: PropTypes.func,
  alerts: PropTypes.arrayOf(PropTypes.shape({})),
};

const styles = StyleSheet.create({
  container: {
    top: '9.5%',
    position: 'absolute',
    left: '5%',
    backgroundColor: 'transparent',
  },
  image: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  temp: {
    fontSize: 50,
    fontFamily: 'HelveticaNeue',
    fontWeight: '600',
    color: '#F9F9F9',
  },
  condition: {
    fontSize: 24,
    fontFamily: 'HelveticaNeue',
    fontWeight: '600',
    color: '#F9F9F9',
    marginBottom: 20,
  },
});
