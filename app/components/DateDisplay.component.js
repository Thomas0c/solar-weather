import React, { PureComponent } from 'react';
import moment from 'moment';

import tz from 'moment-timezone';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';

// Components
import DateText from '../styled/DateText';
import Colors from '../utils/colors.utils';

export default class DateDisplay extends PureComponent { // eslint-disable-line
  render() {
    const {
      condition,
      day,
      timestamp,
      time,
      timezone,
    } = this.props;

    const formatString = time === '24' ? 'HH:mm' : 'h:mma';
    const adjustedTime = timezone ?
      moment(timestamp).tz(timezone) : moment();
    const formattedTimestamp = adjustedTime.format(formatString);
    const dateStamp = adjustedTime.format('MMMM DD');
    const fontColor = Colors.identifyFontColor(condition);

    return (
      <View style={styles.container}>
        <DateText style={{ color: fontColor }} day={day}>
          {formattedTimestamp}
        </DateText>
        <DateText style={{ color: fontColor }} day={day}>
          {dateStamp}
        </DateText>
      </View>
    );
  }
}

DateDisplay.propTypes = {
  day: PropTypes.bool,
  timestamp: PropTypes.shape({}),
  time: PropTypes.string,
  condition: PropTypes.string,
  timezone: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 50,
    width: 200,
    top: '2.5%',
    left: '5%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
});
