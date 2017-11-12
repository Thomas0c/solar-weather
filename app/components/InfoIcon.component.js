// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class InfoIcon extends PureComponent { // eslint-disable-line
  render() {
    const { onPress } = this.props;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={onPress}
        style={styles.container}
      >
        <Image style={styles.image} source={require('../../assets/infoIcon.png')} />
      </TouchableHighlight>
    );
  }
}

InfoIcon.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    right: 15,
    height: 20,
    width: 20,
    top: 15,
  },
  image: {
    width: 20,
    height: 20,
  },
});
