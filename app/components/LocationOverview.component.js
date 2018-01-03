// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SwipeListView } from 'react-native-swipe-list-view';
import R from 'ramda';
import * as locationActions from '../actions/locations.action';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native';

// Components
import Location from '../../lib/js/app/components/location';
import { appColors } from '../config/general.config';

class LocationOverview extends Component { // eslint-disable-line
  shouldComponentUpdate(nextProps) {
    return !R.equals(
      nextProps.locations[0],
      this.props.locations[0]
    ) ||
      nextProps.activeLocation !== this.props.activeLocation ||
      nextProps.day !== this.props.day ||
      nextProps.locations.length !== this.props.locations.length;
  }

  _keyExtractor = item => { return item.id };

  render() {
    const {
      locations,
      openModal,
      day,
      activeLocation,
      dispatch,
    } = this.props;

    const locs = R.sortBy(R.prop('id'), locations);

    return (
      <View style={styles.main}>
        <View style={styles.shadow} />
        <View style={styles.listContainer}>
          <SwipeListView
            useFlatList
            keyExtractor={this._keyExtractor}
            disableLeftSwipe
            closeOnScroll
            style={styles.listView}
            data={locs}
            renderItem={({item, index}) => (
              <Location
                id={item.id}
                onSelect={(id, lat, lng) => this.props.dispatch(locationActions.setActiveLocation(id, lat, lng))}
                onDelete={(id) => this.props.dispatch(locationActions.deleteLocationFromStore(id))}
                lat={item.lat}
                lng={item.lng}
                index={index}
                day={day}
                key={item.id}
                activeLocation={activeLocation}
                name={item.name}
                icon={item.currently.icon}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
        >
          <Image style={styles.image} source={require('../../assets/addIcon.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

LocationOverview.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  day: PropTypes.bool,
  openModal: PropTypes.func,
  dispatch: PropTypes.func,
  activeLocation: PropTypes.number,
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: appColors.medGrey,
    position: 'relative',
  },
  shadow: {
    width: 2,
    backgroundColor: appColors.opaqueBlack,
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: 2,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    width: 100,
    height: 25,
  },
  image: {
    alignSelf: 'center',
    width: '40%',
    height: 25,
    resizeMode: 'contain',
  },
  listView: {
    width: '100%',
  },
  listContainer: {
    height: '90%',
    width: '100%',
  },
});

export default connect()(LocationOverview);
