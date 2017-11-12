// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

// Components
import ColorBackground from '../styled/colorBackground';

export default class Background extends PureComponent { // eslint-disable-line
  render() {
    const { condition, day } = this.props;
    return (
      <View style={styles.container}>
        <ColorBackground
          condition={condition ? condition.icon : ''}
          day={day}
        />
      </View>
    );
  }
}

Background.propTypes = {
  condition: PropTypes.shape({}),
  day: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignSelf: 'stretch',
    backgroundColor: '#C0C0C0',
  },
});
