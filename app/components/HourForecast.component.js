// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import R from 'ramda';

import {
  StyleSheet,
  Animated,
  ListView,
  Dimensions,
} from 'react-native';

// Components
import HourItem from './HourItem.component';
import { appColors } from '../config/general.config';

export default class HourForecast extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.time !== r2.time });
    this.state = {
      dataSource: ds.cloneWithRows([]),
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
      _scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }

    if (this.props.forecast !== nextProps.forecast
    ) {
      const filteredForecast =
        nextProps.forecast
          .filter(x => moment.unix(x.time).isAfter(moment()));

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filteredForecast),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      openHours,
      locationName,
      unit,
      forecast,
    } = this.props;

    const forecastWithDefault =
      R.propOr(true, [0]);

    return nextProps.openHours !== openHours ||
      nextProps.locationName !== locationName ||
      nextProps.unit !== unit ||
      forecastWithDefault(nextProps.forecast) !==
        forecastWithDefault(forecast);
  }

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
        <ListView
          ref={(scrollView) => { _scrollView = scrollView; }}
          horizontal
          pagingEnabled
          style={{ flex: 1 }}
          contentContainerStyle={[styles.container, { minWidth: `${forecast.length * 10}%` }]}
          enableEmptySections
          showsHorizontalScrollIndicator={false}
          bounces={false}
          directionalLockEnabled
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <HourItem
              {...rowData}
              unit={unit}
              timeType={timeType}
              timezone={timezone}
              rowId={moment(rowData.time).unix()}
              key={moment(rowData.time).unix()}
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
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    backgroundColor: appColors.opaqueBlack,
    position: 'relative',
  },
});
