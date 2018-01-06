import moment from 'moment';

import * as creators from './creators.action';
import * as utils from './utils.action';
import realm from '../realm';
import * as settings from './settings.action';

export function updateLocationWithIndex(index) {
	const locs = utils.getStoredLocations();
	const location = locs[index];
	const now = moment();
	const locationUpdatedRecently =
		now.diff(moment(location.last_updated), 'minutes') < 10;

	return async dispatch => {
		if (
			utils.checkLocationExists(locs, location.name) &&
			!locationUpdatedRecently
		) {
			dispatch(creators.locationLoading());
			try {
				const forecast = await utils.forecastRequest(
					location.lat,
					location.lng,
				);
				const extendedLocation = utils.forecastResponseExtended(
					location,
					forecast,
					location.id,
				);
				utils.writeLocationToStore(extendedLocation, location.id);
				dispatch(creators.setLocation(index, extendedLocation));
			} catch (e) {
				dispatch(creators.updateError('Error updating'));
			}
		}
		dispatch(creators.setLocationSettings(index));
	};
}

export function setActiveLocation(index) {
	realm.write(() => {
		realm.create('Options', { key: 1, locationIndex: index }, true);
	});
	return updateLocationWithIndex(index);
}

export const updateAllLocations = () => {
	const locations = utils.getStoredLocations();

	return async dispatch => {
		if (locations.length === 0) {
			return dispatch(
				creators.fetchAllLocationsFailure('No locations to update'),
			);
		}

		dispatch(creators.fetchAllLocations());
		locations.forEach(async (location, idx) => {
			try {
				const forecast = await utils.forecastRequest(
					location.lat,
					location.lng,
				);
				const loc = utils.convertToLocation(location);
				const extendedForecast = utils.forecastResponseExtended(
					loc,
					forecast,
					location.id,
				);
				// Write location to Realm store
				utils.writeLocationToStore(extendedForecast, location.id);
				if (idx === locations.length - 1) {
					// If index is lastIndex, return success
					dispatch(settings.setLatestCollectiveUpdate());
					dispatch(creators.fetchAllLocationsSuccess(locations));
				}
			} catch (e) {
				console.log(e);
				dispatch(
					creators.fetchAllLocationsFailure('An error occurred while updating'),
				);
			}
		});
	};
};

export function getLocationsFromStore() {
	const locs = utils.getStoredLocations();
	return async dispatch => {
		await dispatch(creators.getLocation(locs));
	};
}

export function updateCurrentLocation(location) {
	return async dispatch => {
		dispatch(creators.locationLoading());

		try {
			const forecast = await utils.forecastRequest(location.lat, location.lng);
			const loc = utils.forecastResponseExtended(location, forecast, 0);
			utils.writeLocationToStore(loc, 0);
			dispatch(creators.addIndex(loc));
			dispatch(getLocationsFromStore());
		} catch (e) {
			dispatch(creators.updateError('Error updating'));
		}
	};
}

const createNewLocation = async (locs, index, loc, dispatch) => {
	try {
		const uniqueID = index !== 0 ? new Date().getTime() : index;
		const forecast = await utils.forecastRequest(loc.lat, loc.lng);
		const extendedLocation = utils.forecastResponseExtended(
			loc,
			forecast,
			uniqueID,
		);
		utils.writeLocationToStore(extendedLocation, uniqueID);
		dispatch(creators.addLocation(extendedLocation));
		dispatch(creators.setLocationSettings(index !== 0 ? locs.length : index));
	} catch (e) {
		dispatch(creators.locationError('Error adding location'));
	}
};

export function addNewLocation(loc, index) {
	const locs = utils.getStoredLocations();

	return async dispatch => {
		dispatch(creators.locationLoading());
		if (locs.length === 10) {
			dispatch(creators.locationError('Max. number of locations reached'));
		} else if (
			locs.length < 10 &&
			utils.checkLocationExists(locs, loc.name) &&
			index !== 0
		) {
			dispatch(creators.locationError('Location already exists'));
		} else if (index === 0 && utils.checkIndexExists(locs, index)) {
			dispatch(updateCurrentLocation(loc));
		} else if (locs.length < 10 && !utils.checkLocationExists(locs, loc.name)) {
			await createNewLocation(locs, index, loc, dispatch);
		} else {
			dispatch(creators.locationLoadingDone());
		}
	};
}

const deleteLocation = id => {
	const locations = realm.objects('Location');
	const location = locations.filtered(`id = ${id}`);
	try {
		realm.write(() => {
			realm.delete(location);
		});
	} catch (e) {
		console.log(e);
		return dispatch => {
			dispatch(creators.updateError('Not able to delete location'));
		};
	}
	return dispatch => {
		dispatch(creators.removeLocation(id));
		dispatch(
			creators.setLocationSettings(
				locations.length > 0 ? locations.length - 1 : 0,
			),
		);
	};
};

export function deleteLocationFromStore(id) {
	return dispatch => {
		dispatch(deleteLocation(id));
	};
}
