// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';

export default class AlertContent extends PureComponent { // eslint-disable-line
  render() {
    const { title, description } = this.props;
    return (
      <View style={styles.view}>
        <Text style={styles.headline}>{title}</Text>
        <ScrollView contentContainerStyle={styles.description}>
          { description.split('\n').map((item, key) => {
            return (<Text style={styles.text} key={key}>{item}</Text>);
          }) }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
    height: '96%',
  },
  headline: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue',
    fontWeight: '700',
    color: '#343434',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    height: 'auto',
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    textAlign: 'left',
    fontSize: 13,
    color: '#343434',
  },
});

AlertContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
