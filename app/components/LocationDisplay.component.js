// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

export default class LocationDisplay extends PureComponent { // eslint-disable-line
  render() {
    const {
      location,
      onPress,
      loading,
    } = this.props;

    const currentLocation = location && location.name && !loading ?
      `${location.name}` : 'Loading...';

    return (
      <View style={styles.container}>
        <View style={styles.shadow} />
        <TouchableHighlight style={styles.touch} onPress={onPress} underlayColor="transparent">
          <Text style={{ fontSize: 18, fontFamily: 'Baskerville' }}>
            {currentLocation}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

LocationDisplay.propTypes = {
  location: PropTypes.shape({}),
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 10,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  touch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  shadow: {
    width: '100%',
    height: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: -2,
      width: 0,
    },
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: -1,
  },
});
