import Drawer from 'react-native-drawer'
import Geocoder from 'react-native-geocoder';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import tz from 'moment-timezone';
import PropTypes from 'prop-types';
import Permissions from 'react-native-permissions';

// Redux Actions
import * as settingsActions from '../actions/settings.action';
import * as locationActions from '../actions/locations.action';

import { isDaylight } from '../utils/time.utils';
import { units, timeTypes, appColors } from '../config/general.config';

// Components
import Background from '../components/Background.component';
import DateDisplay from '../components/DateDisplay.component';
import WeatherCondition from '../components/WeatherCondition.component';
import WeekOverview from '../components/WeekOverview.component';
import LocationDisplay from '../components/LocationDisplay.component';
import Toast from '../components/Toast.component';
import InfoIcon from '../components/InfoIcon.component';
import HourForecast from '../components/HourForecast.component';
import Menu from '../components/Menu.component';
import LocationOverview from '../components/LocationOverview.component';
import LocationSearch from '../components/LocationSearch/LocationSearch.component';
import Modal from '../components/Modal.component';
import AlertContent from '../components/AlertContent.component';
import Empty from '../components/Empty.component';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

import {
  AppRegistry,
  AppState,
  TouchableOpacity,
  NetInfo,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class Dashboard extends PureComponent {
  state = {
    authorized: false,
    lastPosition: {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    },
    isConnected: 'none',
    appState: 'unknown',
    menu: false,
    locationSearch: false,
    openRight: false,
    openLeft: false,
    timestamp: moment(),
    showDetails: true,
    openAlert: false,
    openHours: false,
  };

  updateLocationsAndSetTimestamp() {
    const { locations } = this.props;
    const now = moment();
    const latestUpdate = locations.locations.length > 0 &&
      locations.locations[0].last_updated ?
        locations.locations[0].last_updated :
          moment().subtract(1, 'days');

    if (
      now.diff(latestUpdate, 'minutes') > 10 &&
      !locations.loading
    ) {
      this.props.dispatch(locationActions.updateAllLocations());
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (
      this.props.settings.locationIndex !== nextProps.settings.locationIndex ||
      this.props.locations.locations.length !== nextProps.locations.locations.length
    ) {
      this.updateLocationsAndSetTimestamp();
    }
  }

  updateSegmentIndex(event) {
    const index = event.nativeEvent.selectedSegmentIndex;
    this.props.dispatch(settingsActions.setUnit(units[index], index));
  }

  updateSegmentTimeIndex(event) {
    const index = event.nativeEvent.selectedSegmentIndex;
    this.props.dispatch(settingsActions.setTimeType(timeTypes[index], index));
  }

  toggleLocationSearch() {
    this.setState({
      locationSearch: !this.state.locationSearch,
      openRight: false,
      openLeft: false,
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    AppState.removeEventListener('memoryWarning', this._handleMemoryWarning.bind(this));
    NetInfo.removeEventListener('connectionChange', this.handleNetworkType);
  }

  handleNetworkType(networkType) {
    this.setState({ isConnected: networkType });
  }

  _handleMemoryWarning = () => {
    this.setState({
      memoryWarnings: this.state.memoryWarnings +1
    });
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.updateLocationsAndSetTimestamp();
      this.determineLocationStatus();
      this.setState({
        timestamp: moment(),
        openRight: false,
        openLeft: false,
      });
    }
    this.setState({
      appState: nextAppState,
    });
  }

  async determineLocationStatus() {
    const { locations: { locations }, dispatch } = this.props;
    const indexLoc = locations.filter(item => item.id === 0);
    const res = await Permissions.check('location', 'whenInUse');
    if (res === 'undetermined') {
      Permissions.request('location', 'whenInUse');
    } else if (res !== 'authorized') {
      if (indexLoc.length === 1) {
        dispatch(locationActions.deleteLocationFromStore(0));
        this.updateLocationsAndSetTimestamp();
      }
    } else if (res === 'authorized') {
      this.checkIfLocationHasChanged(indexLoc.length === 0);
    }
    this.setState({
      authorized: res === 'authorized',
    });
  }

  checkIfLocationHasChanged(newLocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { lastPosition } = this.state;
      if (
        lastPosition.coords.latitude !== position.coords.latitude &&
        lastPosition.coords.longitude !== position.coords.longitude
      ) {
        // Geocode position and fetch forecast
        this.geocodePositionAndGetForecast(newLocation, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        this.setState({ lastPosition });
      }
    }, (error) => {
      locationActions.updateError('Not able to find location.');
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  async geocodePositionAndGetForecast(newLocation, pos) {
    try {
      const res = await Geocoder.geocodePosition(pos);
      const loc = {
        name: res[0].locality,
        lat: pos.lat,
        lng: pos.lng,
      };
      this.props.dispatch(
        newLocation ? locationActions.addNewLocation(loc, 0) :
        locationActions.updateCurrentLocation(loc)
      );
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    const { dispatch, settings } = this.props;
    NetInfo.addEventListener('connectionChange', this.handleNetworkType.bind(this));
    AppState.addEventListener('change', this._handleAppStateChange);
    AppState.addEventListener('memoryWarning', this._handleMemoryWarning.bind(this));

    const { isConnected } = this.state;
    const connected = isConnected === 'wifi' || isConnected === 'cell';

    dispatch(settingsActions.getSettings());
    dispatch(locationActions.getLocationsFromStore());

    if (!settings.onboarding) {
      this.determineLocationStatus();
      this.setOnboardingTrue();
    }

    setInterval(() => {
      this.setState({
        timestamp: moment(),
      });
    }, 20000);
  }

  toggleState(key) {
    this.setState({
      [key]: !this.state[key],
    });
  }

  setOnboardingTrue() {
    const { dispatch, locations: { locations } } = this.props;
    dispatch(settingsActions.setOnboarding(true));
    // Default is at least a single location
    if (locations.length === 0) {
      this.toggleLocationSearch();
    }
  }

  resetOnboarding() {
    this.toggleState('menu');
    this.props.dispatch(settingsActions.setOnboarding(false));
  }

  handleOpenSidebar(side) {
    if (this.state[side] === false) {
      this.setState({
        [side]: true,
      });
    }
  }

  handleCloseSidebar(side) {
    if (this.state[side] === true) {
      this.setState({
        [side]: false,
      });
    }
  }

  render() {
    const {
      lastPosition,
      isConnected,
      timestamp,
      showDetails,
      menu,
      openRight,
      openLeft,
      locationSearch,
      openAlert,
      authorized,
      appState,
      openHours,
    } = this.state;

  const {
    settings: {
      locationIndex,
      unit,
      unitIndex,
      timeType,
      timeIndex
    },
    locations: {
      locations,
      locationError,
      loading,
    }
  } = this.props;

  const filteredLocations = authorized ?
    locations.sort((a, b) => a.id - b.id) :
    locations.filter(item => item.id !== 0)
    .sort((a, b) => a.id - b.id);

  const connected = isConnected === 'wifi' || isConnected === 'cell';
  const anyLocation = filteredLocations.length > 0;
  const baseLocation = anyLocation ? filteredLocations[0] : null;
  const activeLocation = filteredLocations.length -1 < locationIndex ?
    filteredLocations[0] : filteredLocations[locationIndex];

  const rightOpen = locationError ? false : null;
  const timezone = activeLocation && activeLocation.timezone ?
    activeLocation.timezone : 'America/New_York';

  const day = timestamp.tz(timezone);
  const eveningTime = day.hour(18).minute(0).second(0);
  const morningTime = day.hour(6).minute(0).second(0);
  const dayTime = day.isBefore(eveningTime) && day.isAfter(morningTime);

  // Alert title and description
  const showAlert = activeLocation ?
    activeLocation.alerts.length > 0 : 0;
  const activeAlertTitle = activeLocation && activeLocation.alerts.length > 0 ?
    activeLocation.alerts[0].title : '';
  const activeAlertDescription = activeLocation && activeLocation.alerts.length > 0 ?
    activeLocation.alerts[0].description : '';

  return (
    <RightSidebar
      menu={menu}
      locationSearch={locationSearch}
      anyLocation={anyLocation}
      openRight={openRight}
      onOpenRightSide={this.handleOpenSidebar.bind(this, 'openRight')}
      onCloseRightSide={this.handleCloseSidebar.bind(this, 'openRight')}
      unit={unit}
      dayTime={dayTime}
      locationIndex={locationIndex}
      toggleLocationSearch={this.toggleLocationSearch.bind(this)}
      filteredLocations={filteredLocations}
    >
      <LeftSidebar
        menu={menu}
        locationSearch={locationSearch}
        anyLocation={anyLocation}
        openLeft={openLeft}
        activeLocation={activeLocation}
        unit={unit}
        timezone={timezone}
        onOpenLeftSide={this.handleOpenSidebar.bind(this, 'openLeft')}
        onCloseLeftSide={this.handleCloseSidebar.bind(this, 'openLeft')}
      >
        <View
          style={styles.container}
        >
          <Modal
            visible={openAlert && showAlert}
            toggleView={this.toggleState.bind(this, 'openAlert')}
            content={<AlertContent title={activeAlertTitle} description={activeAlertDescription} />}
          />
          <LocationSearch
            visible={locationSearch}
            authorized={authorized}
            toggleView={this.toggleLocationSearch.bind(this)}
          />
          <Menu
            menu={menu}
            resetOnboarding={this.resetOnboarding.bind(this)}
            unitIndex={unitIndex}
            timeIndex={timeIndex}
            handleMenu={this.toggleState.bind(this, 'menu')}
            updateIndex={this.updateSegmentIndex.bind(this)}
            updateTimeIndex={this.updateSegmentTimeIndex.bind(this)}
          />
          <InfoIcon onPress={this.toggleState.bind(this, 'menu')} />
          <Toast
            connected={connected}
            error={locationError}
          />
          <StatusBar
            hidden
            animated
          />
          <Background
            day={isDaylight(timezone)}
            condition={activeLocation ? activeLocation.currently : null}
          />
          <DateDisplay
            time={timeType}
            timestamp={timestamp}
            timezone={timezone}
            day={dayTime}
            condition={activeLocation ? activeLocation.currently.icon : ''}
          />
          { !anyLocation &&
            <Empty
              onPress={this.toggleLocationSearch.bind(this)}
            />
          }
          <WeatherCondition
            unit={unit}
            day={dayTime}
            showDetails={showDetails}
            toggleDetails={this.toggleState.bind(this, 'showDetails')}
            toggleAlert={this.toggleState.bind(this, 'openAlert')}
            alerts={Array.from(activeLocation ? activeLocation.alerts : [])}
            currently={activeLocation ? activeLocation.currently : {}}
          />
          <HourForecast
            timeType={timeType}
            toggle
            forecast={Array.from(activeLocation ? activeLocation.hourly.data : [])}
            openHours={openHours}
            unit={unit}
            anyLocation={anyLocation}
            timezone={timezone}
            locationName={activeLocation ? activeLocation.name : ''}
          />
          <LocationDisplay
            onPress={this.toggleState.bind(this, 'openHours')}
            loading={loading}
            location={activeLocation ? activeLocation : null}
          />
        </View>
      </LeftSidebar>
    </RightSidebar>);
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.lightGrey,
  },
});
const mapStateToProps = ({
  locations,
  settings,
}) => ({
  locations,
  settings,
});

export default connect(mapStateToProps)(Dashboard);
