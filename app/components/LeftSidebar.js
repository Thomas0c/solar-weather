// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';

import WeekOverview from './WeekOverview.component';

export default class LeftSidebar extends PureComponent { // eslint-disable-line
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
      openLeft,
      closeLeft
    } = this.props;

    return (
      <Drawer
        disabled={menu || locationSearch || !anyLocation}
        onOpenStart={openLeft}
        onCloseStart={closeLeft}
        open={openLeft}
        type="static"
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
        tweenHandler={Drawer.tweenPresets.parallax}
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
  openLeftSide: PropTypes.func,
  closeLeftSide: PropTypes.func,
};
