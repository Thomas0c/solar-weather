// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';

import LocationOverview from './LocationOverview.component';

export default class RightSidebar extends PureComponent { // eslint-disable-line
  render() {
    const {
      menu,
      children,
      locationSearch,
      anyLocation,
      openRight,
      unit,
      openRightSide,
      closeRightSide,
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
        onOpenStart={openRightSide}
        onCloseStart={closeRightSide}
        negotiatePan
        tweenHandler={Drawer.tweenPresets.parallax}
        panOpenMask={0.2}
        initializeOpen={false}
        closedDrawerOffset={0}
        openDrawerOffset={0.5}
        panThreshold={0.1}
        side="right"
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
  closeRightSide: PropTypes.func,
  openRightSide: PropTypes.func,
  locationIndex: PropTypes.number,
  toggleLocationSearch: PropTypes.func,
  filteredLocations: PropTypes.arrayOf(PropTypes.shape({})),
};
