import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';
import { darken } from 'polished';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import * as locationActions from '../actions/locations.action';
import LocationIcon from '../../lib/js/app/components/locationIcon';
import { appColors } from '../config/general.config';

class Location extends Component { // eslint-disable-line
  shouldComponentUpdate(nextProps) {
    return nextProps.activeLocation !== this.props.activeLocation ||
    nextProps.icon !== this.props.icon ||
    nextProps.day !== this.props.day;
  }

  render() {
    const {
      name,
      lat,
      lng,
      index,
      icon,
      day,
      id,
      activeLocation,
    } = this.props;

    let item = null;
    const selected = index === activeLocation;

    return (
      <SwipeRow
        disableLeftSwipe={id !== 0}
        ref={ref => item = ref}
        key={id}
        onRowPress={() => {
          this.props.dispatch(locationActions.setActiveLocation(index, lat, lng));
          item.closeRow();
        }}
        onRowOpen={() => {
          setTimeout(() => {
            item.closeRow();
          }, 2000);
        }}
        stopRightSwipe={-40}
        style={styles.container}
        rightOpenValue={-40}
      >
        <TouchableOpacity
          style={styles.standaloneRowBack}
          onPress={() => this.props.dispatch(locationActions.deleteLocationFromStore(id))}
        >
          <Text style={{ display: 'none' }} />
          <View style={styles.hiddenWrapper}>
            <Text style={styles.hiddenText}>X</Text>
          </View>
        </TouchableOpacity>
        <LocationIcon
          icon={icon}
          day={day}
          name={name}
          selected={selected}
        />
      </SwipeRow>
    );
  }
}

Location.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  icon: PropTypes.string,
  lat: PropTypes.number,
  index: PropTypes.number,
  lng: PropTypes.number,
  day: PropTypes.bool,
  dispatch: PropTypes.func,
  activeLocation: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    width: '100%',
  },
  hidden: {
    width: '100%',
    height: '100%',
  },
  hiddenWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: appColors.red,
  },
  hiddenText: {
    color: appColors.lightGrey,
    marginRight: 0,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  dayHighTemp: {
    fontSize: 14,
    marginTop: 5,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: appColors.red,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});

export default connect()(Location);
