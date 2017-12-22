import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Animated,
} from 'react-native';

import Colors from '../../lib/js/app/utils/colors';
import { appColors } from '../config/general.config';
import WeatherConditionAlert from '../../lib/js/app/components/weatherConditionAlert';
import WeatherConditionText from '../../lib/js/app/components/weatherConditionText';
import Temperature from '../utils/temperature.utils';

const formatText = (temp, humidity, precip) => `Feels like ${parseFloat(temp).toFixed(0)}°
Humidity ${parseFloat(humidity * 100).toFixed(0)}% ${precip}`;

export default class WeatherCondition extends PureComponent { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showDetails !== this.props.showDetails) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    const opacityValue = this.props.showDetails ? 0 : 1;
    Animated.timing(
      this.state.fadeAnim,
      { toValue: opacityValue },
    ).start();
  }

  render() {
    const {
      condition,
      toggleDetails,
      unit,
      alerts,
      showDetails,
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
          <WeatherConditionAlert
            summary={currently ? currently.summary : ''}
            showAlert={showAlert}
            icon={currently ? currently.icon : ''}
            toggleAlert={toggleAlert}
          />
          <WeatherConditionText
            text={formatText(fixedFeelsLike, currently.humidity, precipitation)}
            condition={condition}
            showDetails={showDetails}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

WeatherCondition.propTypes = {
  currently: PropTypes.shape({}),
  unit: PropTypes.string,
  condition: PropTypes.string,
  showDetails: PropTypes.bool,
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
  temp: {
    fontSize: 50,
    fontFamily: 'HelveticaNeue',
    fontWeight: '600',
    color: appColors.whiteGrey,
  },
  condition: {
    fontSize: 24,
    fontFamily: 'HelveticaNeue',
    fontWeight: '600',
    color: appColors.whiteGrey,
    marginBottom: 20,
  },
});
