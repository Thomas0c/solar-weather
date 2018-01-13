import Geocoder from 'react-native-geocoder';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import tz from 'moment-timezone';
import PropTypes from 'prop-types';
import Permissions from 'react-native-permissions';

// Redux Actions
import * as settingsActions from '../actions/settings.action';
import * as locationActions from '../actions/locations.action';
import * as creators from '../actions/creators.action';

import { isDaylight, setToTime } from '../../lib/js/app/utils/time';
import { AppColors, units, timeTypes } from '../../lib/js/app/config/config';

// Components
import AlertContent from '../../lib/js/app/components/alertContent';
import Background from '../../lib/js/app/components/background';
import DateDisplay from '../../lib/js/app/components/dateDisplay';
import Empty from '../../lib/js/app/components/empty';
import InfoIcon from '../../lib/js/app/components/infoIcon';
import HourForecastList from '../../lib/js/app/components/hourForecastList';
import LeftSidebar from '../../lib/js/app/components/leftSidebar';
import RightSidebar from '../../lib/js/app/components/rightSidebar';
import LocationDisplay from '../../lib/js/app/components/locationDisplay';
import LocationSearch from '../components/LocationSearch/LocationSearch.component';
import Menu from '../../lib/js/app/components/menu';
import Modal from '../../lib/js/app/components/contentModal';
import Toast from '../../lib/js/app/components/toast';
import WeatherCondition from '../../lib/js/app/components/weatherCondition';

import { AppState, NetInfo, StatusBar, StyleSheet, View } from 'react-native';

class Dashboard extends PureComponent {
	state = {
		authorized: false,
		lastPosition: {
			coords: {
				latitude: 0,
				longitude: 0,
			},
		},
		isConnected: 'wifi',
		appState: 'inactive',
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
		const { locations, settings } = this.props;
		const now = moment();
		const latestUpdate = moment.unix(settings.latestUpdate);

		if (now.diff(latestUpdate, 'minutes') > 10 && !locations.loading) {
			this.props.dispatch(locationActions.updateAllLocations());
		}
	}

	componentWillReceiveProps = nextProps => {
		if (
			this.props.locations.locations.length !==
			nextProps.locations.locations.length
		) {
			this.updateLocationsAndSetTimestamp();
		}
	};

	updateSegmentIndex(idx) {
		this.props.dispatch(settingsActions.setUnit(units[idx], idx));
	}

	updateSegmentTimeIndex(idx) {
		this.props.dispatch(settingsActions.setTimeType(timeTypes[idx], idx));
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
		AppState.removeEventListener(
			'memoryWarning',
			this._handleMemoryWarning.bind(this),
		);
		NetInfo.removeEventListener('connectionChange', this.handleNetworkType);
	}

	handleNetworkType({ type }) {
		this.setState({ isConnected: type });
	}

	_handleMemoryWarning = () => {
		this.setState({
			memoryWarnings: this.state.memoryWarnings + 1,
		});
	};

	_handleAppStateChange = nextAppState => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
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
	};

	async determineLocationStatus() {
		const { locations: { locations }, dispatch } = this.props;
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
		navigator.geolocation.getCurrentPosition(
			position => {
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
					this.setState({ lastPosition: position });
				}
			},
			error => {
				creators.updateError('Not able to find location.');
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
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
				newLocation
					? locationActions.addNewLocation(loc, 0)
					: locationActions.updateCurrentLocation(loc),
			);
		} catch (e) {
			console.log(e);
		}
	}

	async componentDidMount() {
		const { dispatch, settings, locations } = this.props;
		NetInfo.addEventListener(
			'connectionChange',
			this.handleNetworkType.bind(this),
		);
		AppState.addEventListener('change', this._handleAppStateChange);
		AppState.addEventListener(
			'memoryWarning',
			this._handleMemoryWarning.bind(this),
		);

		if (!locations.loading) {
			await dispatch(locationActions.getLocationsFromStore());
			this.updateLocationsAndSetTimestamp();
		}

		await dispatch(settingsActions.getSettings());

		if (!settings.onboarding) {
			this.determineLocationStatus();
			this.setOnboardingTrue();
		}

		setInterval(() => {
			const time = moment().startOf('minute');
			if (time.isAfter(this.state.timestamp)) {
				this.setState({
					timestamp: time,
				});
			}
		}, 30000);
	}

	toggleState(key) {
		this.setState({
			[key]: !this.state[key],
		});
	}

	setOnboardingTrue() {
		const { dispatch, locations: { locations } } = this.props;
		dispatch(settingsActions.setOnboarding(true));
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
			isConnected,
			timestamp,
			showDetails,
			menu,
			openRight,
			openLeft,
			locationSearch,
			openAlert,
			openHours,
		} = this.state;

		const {
			settings: { locationIndex, unit, unitIndex, timeType, timeIndex },
			locations: { locations, locationError, loading },
		} = this.props;

		const connected = isConnected === 'wifi' || isConnected === 'cell';
		const anyLocation = locations.length > 0;
		const activeLocation =
			locations.length - 1 < locationIndex
				? locations[0]
				: locations[locationIndex];

		const timezone =
			activeLocation && activeLocation.timezone
				? activeLocation.timezone
				: moment.tz.guess();

		// Alert title and description
		const showAlert = activeLocation ? activeLocation.alerts.length > 0 : 0;
		const activeAlertTitle =
			activeLocation && activeLocation.alerts.length > 0
				? activeLocation.alerts[0].title
				: '';
		const activeAlertDescription =
			activeLocation && activeLocation.alerts.length > 0
				? activeLocation.alerts[0].description
				: '';

		return (
			<RightSidebar
				menu={menu}
				locationSearch={locationSearch}
				anyLocation={anyLocation}
				openRight={openRight}
				onRowSelect={(id, lat, lng) =>
					this.props.dispatch(locationActions.setActiveLocation(id, lat, lng))
				}
				onRowDelete={id =>
					this.props.dispatch(locationActions.deleteLocationFromStore(id))
				}
				onOpenRightSide={this.handleOpenSidebar.bind(this, 'openRight')}
				onCloseRightSide={this.handleCloseSidebar.bind(this, 'openRight')}
				unit={unit}
				dayTime={isDaylight(timezone)}
				locationIndex={locationIndex}
				toggleLocationSearch={this.toggleLocationSearch.bind(this)}
				filteredLocations={locations}>
				<LeftSidebar
					menu={menu}
					locationSearch={locationSearch}
					anyLocation={anyLocation}
					openLeft={openLeft}
					forecast={Array.from(activeLocation ? activeLocation.daily.data : [])}
					unit={unit}
					timezone={timezone}
					onOpenLeftSide={this.handleOpenSidebar.bind(this, 'openLeft')}
					onCloseLeftSide={this.handleCloseSidebar.bind(this, 'openLeft')}>
					<View style={styles.container}>
						<Modal
							visible={openAlert && showAlert}
							toggleView={this.toggleState.bind(this, 'openAlert')}
							content={
								<AlertContent
									title={activeAlertTitle}
									description={activeAlertDescription}
								/>
							}
						/>
						<LocationSearch
							visible={locationSearch}
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
							displayError={locationError !== null}
						/>
						<StatusBar hidden animated />
						<Background
							day={isDaylight(timezone)}
							condition={activeLocation ? activeLocation.currently.icon : ''}
						/>
						<DateDisplay
							time={timeType}
							timestamp={timestamp}
							timezone={timezone}
							condition={activeLocation ? activeLocation.currently.icon : ''}
						/>
						{!anyLocation && (
							<Empty
								connected={connected}
								onPress={this.toggleLocationSearch.bind(this)}
							/>
						)}
						<WeatherCondition
							unit={unit}
							condition={activeLocation ? activeLocation.currently.icon : ''}
							showDetails={showDetails}
							toggleDetails={this.toggleState.bind(this, 'showDetails')}
							toggleAlert={this.toggleState.bind(this, 'openAlert')}
							alerts={Array.from(activeLocation ? activeLocation.alerts : [])}
							currently={
								activeLocation && activeLocation.currently
									? activeLocation.currently
									: null
							}
						/>
						<HourForecastList
							timeType={timeType}
							locationIndex={locationIndex}
							forecast={Array.from(
								activeLocation ? activeLocation.hourly.data : [],
							)}
							openHours={openHours}
							unit={unit}
							timezone={timezone}
							locationName={activeLocation ? activeLocation.name : ''}
						/>
						<LocationDisplay
							onPress={this.toggleState.bind(this, 'openHours')}
							loading={loading}
							locationName={activeLocation ? activeLocation.name : ''}
						/>
					</View>
				</LeftSidebar>
			</RightSidebar>
		);
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
		backgroundColor: AppColors.lightGrey,
	},
});
const mapStateToProps = ({ locations, settings }) => ({
	locations,
	settings,
});

export default connect(mapStateToProps)(Dashboard);
