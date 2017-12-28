// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';

// Components
import HourItem from '../../lib/js/app/components/hourItem';
import { appColors } from '../config/general.config';

export default class HourForecast extends Component { // eslint-disable-line
  constructor() {
    super();
    this.state = {
      forecast: [],
      bottomAnim: new Animated.Value(-Dimensions.get('window').height / 10),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      openHours,
      anyLocation,
      locationName,
    } = this.props;

    if (nextProps.openHours !== openHours && anyLocation) {
      this.animateBottom();
    }
    if (nextProps.locationName !== locationName) {
      _scrollView.scrollToOffset({ x: 0, y: 0, animated: true });
    }

    if (this.props.forecast !== nextProps.forecast
    ) {
      const filteredForecast =
        nextProps.forecast
          .filter(x => moment.unix(x.time).isAfter(moment()));

      this.setState({
        forecast: filteredForecast,
      });
    }
  }

  _keyExtractor = (item, index) => { return moment(item.time).unix() };

  animateBottom() {
    const bottomValue = this.props.openHours ?
      -Dimensions.get('window').height / 10 : Dimensions.get('window').height / 10;
    Animated.timing(
      this.state.bottomAnim,
      { toValue: bottomValue },
    ).start();
  }

  render() {
    const {
      timeType,
      unit,
      timezone,
      forecast,
    } = this.props;

    return (
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '20%',
          left: 0,
          flex: 1,
          bottom: this.state.bottomAnim,
        }}
      >
        <FlatList
          ref={(scrollView) => { _scrollView = scrollView; }}
          horizontal
          pagingEnabled
          keyExtractor={this._keyExtractor}
          contentContainerStyle={[styles.container, { width: `${forecast.length * 15}%` }]}
          enableEmptySections
          showsHorizontalScrollIndicator={false}
          bounces={false}
          directionalLockEnabled
          data={this.state.forecast}
          renderItem={({item}) => (
            <HourItem
              unit={unit}
              timeType={timeType}
              timezone={timezone}
              temperature={item.temperature}
              icon={item.icon}
              time={item.time}
              rowId={moment(item.time).unix()}
              key={moment(item.time).unix()}
            />
          )}
        />
      </Animated.View>
    );
  }
}

HourForecast.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.shape({})),
  openHours: PropTypes.bool,
  timeType: PropTypes.string,
  locationName: PropTypes.string,
  unit: PropTypes.string,
  timezone: PropTypes.string,
  anyLocation: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: appColors.opaqueBlack,
  },
});
