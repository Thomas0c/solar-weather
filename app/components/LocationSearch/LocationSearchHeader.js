import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { appColors } from '../../config/general.config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: appColors.medGrey,
    borderBottomWidth: 2,
    height: 45,
    marginBottom: 10,
    borderBottomColor: appColors.darkGrey,
  },
  input: {
    height: 50,
    color: appColors.darkGrey,
    flex: 1,
    fontSize: 15,
  },
});

const Header = props => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      keyboardAppearance="dark"
      placeholder="Enter City Name"
      placeholderTextColor={appColors.grey}
      selectionColor={appColors.darkGrey}
      spellCheck={false}
      autoFocus
      autoCorrect={false}
      onChangeText={props.onChange}
    />
  </View>
);

Header.propTypes = {
  onChange: PropTypes.func,
};

export default Header;
