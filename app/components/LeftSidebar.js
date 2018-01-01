// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';
import WeekOverview from '../../lib/js/app/components/weekOverview';

const Config = require('../config/general.config');

export default class LeftSidebar extends Component { // eslint-disable-line
  render() {
    const {
      menu,
      children,
      locationSearch,
      anyLocation,
      openLeft,
      activeLocation,
      unit,
      timezone,
      onOpenLeftSide,
      onCloseLeftSide,
    } = this.props;

    return (
      <Drawer
        disabled={menu || locationSearch || !anyLocation}
        onOpenStart={onOpenLeftSide}
        onCloseStart={onCloseLeftSide}
        open={openLeft}
        type="static"
        tweenHandler={ratio => Config.drawerTweenHandler(ratio)}
        styles={Config.drawerStyles}
        elevation={1.1}
        content={
          <WeekOverview
            forecast={Array.from(activeLocation ? activeLocation.daily.data : [])}
            unit={unit}
            timezone={timezone}
          />
        }
        negotiatePan
        panThreshold={0.1}
        openDrawerOffset={0.5}
        closedDrawerOffset={0}
        panOpenMask={0.2}
      >
        {children}
      </Drawer>
    );
  }
}

LeftSidebar.propTypes = {
  menu: PropTypes.bool,
  children: PropTypes.shape({}),
  locationSearch: PropTypes.bool,
  anyLocation: PropTypes.bool,
  openLeft: PropTypes.bool,
  activeLocation: PropTypes.shape({}),
  unit: PropTypes.string,
  timezone: PropTypes.string,
  onOpenLeftSide: PropTypes.func,
  onCloseLeftSide: PropTypes.func,
};
