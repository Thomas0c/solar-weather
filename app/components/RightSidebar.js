// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';

import LocationOverview from './LocationOverview.component';

const Config = require('../config/general.config');

export default class RightSidebar extends Component { // eslint-disable-line
  render() {
    const {
      menu,
      children,
      locationSearch,
      anyLocation,
      openRight,
      unit,
      onOpenRightSide,
      onCloseRightSide,
      dayTime,
      locationIndex,
      toggleLocationSearch,
      filteredLocations,
    } = this.props;

    return (
      <Drawer
        disabled={menu || locationSearch || !anyLocation}
        type="static"
        open={openRight && anyLocation}
        onOpen={onOpenRightSide}
        onClose={onCloseRightSide}
        negotiatePan
        tweenEasing="easeInOutSine"
        tweenHandler={ratio => Config.drawerTweenHandler(ratio)}
        styles={Config.drawerStyles}
        panOpenMask={0.2}
        initializeOpen={false}
        closedDrawerOffset={0}
        openDrawerOffset={0.5}
        panThreshold={0.1}
        side="right"
        elevation={1.1}
        content={
          <LocationOverview
            day={dayTime}
            activeLocation={locationIndex}
            openModal={toggleLocationSearch}
            locations={filteredLocations}
            unit={unit}
          />
        }
      >
        {children}
      </Drawer>
    );
  }
}

RightSidebar.propTypes = {
  menu: PropTypes.bool,
  children: PropTypes.shape({}),
  dayTime: PropTypes.bool,
  locationSearch: PropTypes.bool,
  anyLocation: PropTypes.bool,
  openRight: PropTypes.bool,
  unit: PropTypes.string,
  onCloseRightSide: PropTypes.func,
  onOpenRightSide: PropTypes.func,
  locationIndex: PropTypes.number,
  toggleLocationSearch: PropTypes.func,
  filteredLocations: PropTypes.arrayOf(PropTypes.shape({})),
};
