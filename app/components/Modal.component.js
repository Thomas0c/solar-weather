// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';

import { appColors } from '../config/general.config';
import CloseButton from '../../lib/js/app/components/closeButton';

export default class ModalWrapper extends PureComponent { // eslint-disable-line
  render() {
    const { toggleView, visible, content } = this.props;
    return (
      <Modal
        animationType="slide"
        visible={visible}
        transparent
      >
        <TouchableHighlight
          onPress={toggleView}
          underlayColor="transparent"
          style={viewWrapper}
        >
          <View />
        </TouchableHighlight>
        <View style={viewBoxStyle}>
          { content}
          <CloseButton
            absolute
            toggle={toggleView}
          />
        </View>
      </Modal>
    );
  }
}

const viewWrapper = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: appColors.opaqueBlack70,
};

const viewBoxStyle = {
  position: 'relative',
  marginTop: '15%',
  backgroundColor: appColors.medGrey,
  height: '55%',
  width: '85%',
  alignSelf: 'center',
  shadowColor: appColors.black,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 5,
  shadowOpacity: 0.8,
};

ModalWrapper.propTypes = {
  toggleView: PropTypes.func,
  visible: PropTypes.bool,
  content: PropTypes.element,
};
