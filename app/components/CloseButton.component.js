// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

export default class CloseButton extends PureComponent { // eslint-disable-line
  render() {
    const { toggle, absolute } = this.props;
    const buttonStyle = absolute ? styles.button : styles.buttonRelative;
    return (
      <TouchableHighlight style={buttonStyle} underlayColor="transparent" onPress={toggle}>
        <View style={{
          borderRadius: 20,
          overflow: 'hidden',
          width: 40,
          height: 40,
          backgroundColor: '#E17C7C',
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <Text style={styles.text}>X</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
  },
  buttonRelative: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: 30,
  },
  text: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  image: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
  },
});

CloseButton.propTypes = {
  toggle: PropTypes.func,
  absolute: PropTypes.bool,
};
