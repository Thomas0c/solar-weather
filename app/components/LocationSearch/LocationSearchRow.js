import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { appColors } from '../../config/general.config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: appColors.darkGrey,
    fontFamily: 'Baskerville',
    marginLeft: 12,
    fontSize: 20,
  },
});

const Row = props => (
  <TouchableOpacity style={styles.button} onPress={() => { props.handleTap(props); }}>
    <View style={styles.container}>
      <Text style={styles.text}>
        {`${props.primaryText}, ${props.secondaryText}`}
      </Text>
    </View>
  </TouchableOpacity>
);

Row.propTypes = {
  handleTap: PropTypes.func,
  secondaryText: PropTypes.string,
  primaryText: PropTypes.string,
};

export default Row;
