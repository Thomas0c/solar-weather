import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 2,
    height: 45,
    marginBottom: 10,
    borderBottomColor: '#343434',
  },
  input: {
    height: 50,
    color: '#343434',
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
      placeholderTextColor="#999"
      selectionColor="#343434"
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
