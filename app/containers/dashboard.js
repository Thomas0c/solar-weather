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
import { units, timeTypes } from '../config/general.config';

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
    lastPosition: 'unknown',
    isConnected: 'none',
    appState: 'unknown',
    menu: false,
    locationSearch: false,
    openRight: false,
    openLeft: false,
    timestamp: moment(),
    openHours: false,
    openAlert: false,
    latestUpdate: moment(),
  };

  updateLocationsAndSetTimestamp() {
    this.props.dispatch(locationActions.updateAllLocations());
    this.setState({ latestUpdate: moment() });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.settings.locationIndex !== nextProps.settings.locationIndex) {
      const now = moment();
      if (now.diff(this.state.latestUpdate, 'minutes') > 5) {
        this.updateLocationsAndSetTimestamp();
      }
    }
  }

  handleMenu() {
    this.setState({
      menu: !this.state.menu,
    });
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
      const latestUpdate = this.props.locations.latestCollectiveUpdate;
      const now = moment();
      if (now.diff(this.state.latestUpdate, 'minutes') > 5) {
        this.updateLocationsAndSetTimestamp();
      }
      this.determineLocationStatus();
      this.setState({
        timestamp: moment(),
        openRight: false,
        openLeft: false,
        appState: nextAppState
      });
    } else {
      this.setState({
        appState: nextAppState,
      });
    }
  }

  determineLocationStatus() {
    const { locations: { locations }, dispatch } = this.props;
    const indexLoc = locations.filter(item => item.id === 0);
    Permissions.check('location', 'whenInUse')
    .then(response => {
      if (response === 'undetermined') {
        Permissions.request('location', 'whenInUse');
      } else if (response !== 'authorized') {
        if (indexLoc.length === 1) {
          dispatch(locationActions.deleteLocationFromStore(0));
          this.updateLocationsAndSetTimestamp();
        }
      } else if (response === 'authorized') {
        if (indexLoc.length === 1) {
          // Check if location has chena
          this.checkIfLocationHasChanged();
        } else if (indexLoc.length === 0) {
          // Create index location based on location
          this.checkIfLocationHasChanged(true);
        }
      }
      this.setState({
        authorized: response === 'authorized',
      });
    });
  }

  fetchForecastForIndex(index) {
    const { locations, dispatch } = this.props;
    const location = locations.locations[index];
    const latestUpdate = location.last_updated;
    const now = moment();

    if (now.diff(latestUpdate, 'minutes') > 10 && index !== 0) {
      dispatch(
        locationActions.updateLocationWithIndex(index)
      );
    }
  }

  checkIfLocationHasChanged(newLocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lastPosition = position;
      if (
        lastPosition.coords.latitude !== position.coords.latitude &&
        lastPosition.coords.longitude !== position.coords.longitude
      ) {
        this.setState({
          lastPosition: position,
        });
        // Geocode position and fetch forecast
        this.geocodePositionAndGetForecast(newLocation, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    }, (error) => {
      locationActions.updateError('Not able to find location.');
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  geocodePositionAndGetForecast(newLocation, pos) {
    Geocoder.geocodePosition(pos)
    .then((res) => {
      const { locality, adminArea } = res[0];
      const { lat, lng } = pos;
      const loc = {
        name: locality,
        lat,
        lng,
      };
      this.props.dispatch(
        newLocation ? locationActions.addNewLocation(loc, 0) :
        locationActions.updateCurrentLocation(loc)
      );
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    NetInfo.addEventListener('connectionChange', this.handleNetworkType.bind(this));
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    AppState.addEventListener('memoryWarning', this._handleMemoryWarning.bind(this));
    const { isConnected } = this.state;
    const connected = isConnected === 'wifi' || isConnected === 'cell';
    dispatch(settingsActions.getSettings());
    dispatch(locationActions.getLocationsFromStore());
    this.setState({
      appState: AppState.currentState,
    });
    // Initiate interval to update timestamp every 20 seconds.
    setInterval(() => {
      this.setState({
        timestamp: moment(),
      });
    }, 20000);
  }

  toggleHours() {
    this.setState({
      openHours: !this.state.openHours,
    });
  }

  toggleAlert() {
    this.setState({
      openAlert: !this.state.openAlert,
    });
  }

  setOnboardingTrue() {
    const { dispatch, locations: { locations } } = this.rpops;
    dispatch(settingsActions.setOnboarding(true));
    this.fetchForecastForIndex(0);
    if (locations.length > 0) {
      dispatch(locationActions.updateAllStoredLocations());
    } else if (locations.length === 0) {
      this.toggleLocationSearch();
    }
  }

  resetOnboarding() {
    this.handleMenu();
    this.props.dispatch(settingsActions.setOnboarding(false));
  }

  render() {
    const {
      lastPosition,
      isConnected,
      timestamp,
      openHours,
      menu,
      openRight,
      openLeft,
      locationSearch,
      openAlert,
      authorized,
      appState,
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

  const filteredLocations = authorized ? locations : locations.filter(item => item.id !== 0);
  const connected = isConnected === 'wifi' || isConnected === 'cell';
  const anyLocation = filteredLocations.length > 0;
  const baseLocation = anyLocation ? filteredLocations[0] : null;
  const activeLocation = filteredLocations.length -1 < locationIndex ?
    baseLocation : filteredLocations[locationIndex];
  const rightOpen = locationError ? false : null;
  const timezone = activeLocation && activeLocation.timezone ?
    activeLocation.timezone : 'America/New_York';

  const day = moment().tz(timezone);
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
    <Drawer
      disabled={menu || locationSearch || !anyLocation}
      type="static"
      open={openRight && anyLocation}
      onOpenStart={() => { this.setState({ openRight: true })}}
      onCloseStart={() => { this.setState({ openRight: false })}}
      negotiatePan={true}
      tweenHandler={Drawer.tweenPresets.parallax}
      panOpenMask={0.2}
      initializeOpen = {false}
      closedDrawerOffset={0}
      openDrawerOffset={0.5}
      panThreshold={0.1}
      side="right"
      content={
        <LocationOverview
          day={dayTime}
          activeLocation={locationIndex}
          openModal={this.toggleLocationSearch.bind(this)}
          locations={filteredLocations}
          unit={unit}
        />
      }
    >
      <Drawer
        disabled={menu || locationSearch || !anyLocation }
        onOpenStart={() => { this.setState({ openLeft: true })}}
        onCloseStart={() => { this.setState({ openLeft: false })}}
        open={openLeft}
        type="static"
        content={
          <WeekOverview
            forecast={Array.from(activeLocation ? activeLocation.daily.data : [])}
            unit={unit}
            timezone={timezone}
          />
        }
        negotiatePan={true}
        panThreshold={0.1}
        openDrawerOffset={0.5}
        closedDrawerOffset={0}
        panOpenMask={0.2}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View style={styles.container}>
          <Modal
            visible={openAlert && showAlert}
            toggleView={this.toggleAlert.bind(this)}
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
            handleMenu={this.handleMenu.bind(this)}
            updateIndex={this.updateSegmentIndex.bind(this)}
            updateTimeIndex={this.updateSegmentTimeIndex.bind(this)}
          />
          <InfoIcon onPress={this.handleMenu.bind(this)} />
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
            toggleAlert={this.toggleAlert.bind(this)}
            alerts={Array.from(activeLocation ? activeLocation.alerts : [])}
            currently={activeLocation ? activeLocation.currently : {}}
          />
          <HourForecast
            timeType={timeType}
            forecast={Array.from(activeLocation ? activeLocation.hourly.data : [])}
            openHours={openHours}
            unit={unit}
            anyLocation={anyLocation}
            timezone={timezone}
            locationName={activeLocation ? activeLocation.name : ''}
          />
          <LocationDisplay
            loading={loading}
            onPress={this.toggleHours.bind(this)}
            location={activeLocation ? activeLocation : null}
          />
        </View>
      </Drawer>
    </Drawer>);
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
    backgroundColor: '#EFEFEF',
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
