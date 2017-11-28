// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import { appColors } from '../config/general.config';

export default class Toast extends PureComponent { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      topAnim: new Animated.Value(-100),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.error && nextProps.error || // eslint-disable-line
    this.props.connected && !nextProps.connected) { // eslint-disable-line
      this.toggleError(() => {
        Animated.timing(this.state.topAnim, { toValue: 0 }).start();
        const timeout = setTimeout(() => {
          this.toggleError();
          Animated.timing(this.state.topAnim, { toValue: -100 }).start();
          clearTimeout(timeout);
        }, 5000);
      });
    }
  }

  toggleError(cb) {
    this.setState({
      showError: !this.state.showError,
    }, cb);
  }

  render() {
    const { error } = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          { top: this.state.topAnim },
        ]}
      >
        <Text style={styles.text}>{error}.</Text>
      </Animated.View>
    );
  }
}

Toast.propTypes = {
  connected: PropTypes.bool,
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    left: 0,
    padding: 15,
    backgroundColor: appColors.red,
    width: Dimensions.get('window').width,
    height: 50,
  },
  text: {
    textAlign: 'center',
    color: appColors.white,
    fontWeight: '700',
    fontFamily: 'HelveticaNeue',
  },
});
