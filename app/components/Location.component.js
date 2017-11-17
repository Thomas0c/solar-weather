import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';
import { darken } from 'polished';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import * as locationActions from '../actions/locations.action';
import Icons from '../utils/icons.utils';
import Colors from '../utils/colors.utils';
import WeatherIconWrapper from '../styled/WeatherIconWrapper';

class Location extends PureComponent { // eslint-disable-line
  render() {
    const {
      name,
      lat,
      lng,
      icon,
      day,
      action,
      id,
      index,
      activeLocation,
    } = this.props;

    let item = null;

    const selected = index === activeLocation;
    const background = selected ?
      darken(0.1, Colors.identifyBackground(icon, day)) : '#EFEFEF';
    const iconName = selected ? `${icon}_white` : icon;
    const fontColor = selected ? 'white' : '#343434';

    return (
      <SwipeRow
        disableLeftSwipe={!action}
        ref={ref => item = ref}
        key={icon}
        onRowPress={() => {
          this.props.dispatch(locationActions.setActiveLocation(index, lat, lng));
          item.closeRow();
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
        <View style={[styles.main, { backgroundColor: background }]}>
          <Text style={[styles.dayTitle, { color: fontColor }]}>{name}</Text>
          <WeatherIconWrapper>
            <Image style={styles.image} source={Icons.identifyIcon(iconName)} />
          </WeatherIconWrapper>
        </View>
      </SwipeRow>
    );
  }
}

Location.propTypes = {
  id: PropTypes.number,
  action: PropTypes.bool,
  name: PropTypes.string,
  icon: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  day: PropTypes.bool,
  dispatch: PropTypes.func,
  index: PropTypes.number,
  activeLocation: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    width: '100%',
  },
  main: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  hidden: {
    width: '100%',
    height: '100%',
  },
  hiddenWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#CB4C4C',
  },
  hiddenText: {
    color: '#EFEFEF',
    marginRight: 0,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  image: {
    alignSelf: 'center',
    marginTop: '2%',
    width: '55%',
    resizeMode: 'contain',
  },
  dayTitle: {
    fontSize: 16,
    fontFamily: 'Baskerville',
  },
  dayHighTemp: {
    fontSize: 14,
    marginTop: 5,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#CB4C4C',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});

export default connect()(Location);
