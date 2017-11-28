// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { appColors } from '../config/general.config';

export default class Empty extends PureComponent { // eslint-disable-line
  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ color: appColors.white, backgroundColor: 'transparent' }}>
          Add a location or enable location services
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Image
            style={styles.image}
            source={require('../../assets/addIcon.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

Empty.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  button: {
    position: 'relative',
    width: 40,
    marginTop: 30,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 30,
    resizeMode: 'contain',
  },
});
