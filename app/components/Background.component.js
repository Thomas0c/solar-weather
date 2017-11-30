// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

// Components
import ColorBackground from '../styled/colorBackground';
import { appColors } from '../config/general.config';

export default class Background extends Component { // eslint-disable-line
  shouldComponentUpdate(nextProps) {
    if (nextProps.condition && this.props.condition) {
      return nextProps.condition.icon !== this.props.condition.icon;
    }
    return true;
  }

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
  condition: PropTypes.shape({
    icon: PropTypes.string,
  }),
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
    backgroundColor: appColors.medGreyAlt,
  },
});
