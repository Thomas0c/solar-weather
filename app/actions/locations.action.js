import axios from 'axios';
import Config from 'react-native-config';
import moment from 'moment';
import * as types from './actionTypes';
import realm from '../realm';

// Utilities
const forecastRequest = async (lat, lng) =>
  axios(`https://api.darksky.net/forecast/${Config.FORECAST_API}/${lat},${lng}`, {
    params: {
      exclude: 'minutely',
      units: 'si',
      lang: 'en',
    },
  });

export const triggerAction = (type, obj) =>
  Object.assign(
    { type },
    obj,
  );

const getStoredLocations = () => {
  const locations = realm.objects('Location').sorted('id');
  const locArray = locations.map(x => Object.assign({}, x));
  return locArray.length > 0 ? locArray : [];
};

const forecastResponseExtended = (location, res, id) => {
  const newDate = new Date().getTime();
  const adjustedId = typeof id !== 'number' ? newDate : id;
  const {
    data: {
      daily,
      alerts,
      currently,
      hourly,
      timezone,
      offset,
    },
  } = res;

  const fiveDaysFromNow = moment().hour(0).add(5, 'days');
  const followingDay = moment().hour(0).add(0, 'days');

  return Object.assign(
    { id: adjustedId },
    location,
    {
      last_updated: newDate,
      timezone,
      offset,
    },
    {
      hourly: {
        summary: hourly.summary,
        icon: hourly.icon,
        data: hourly.data.filter((item, idx) => idx < 15),
      },
    },
    { alerts: alerts || [] },
    { currently },
    {
      daily: {
        summary: daily.summary,
        icon: daily.icon,
        data: daily.data.filter((item) => {
          const isAfter = moment.unix(item.time).isAfter(followingDay);
          const isBefore = moment.unix(item.time).isBefore(fiveDaysFromNow);
          return isAfter && isBefore;
        }),
      },
    },
  );
};

const checkLocationExists = (locs, name) => {
  const filtered = locs.filter(item => item.name === name);
  return filtered.length > 0;
};

const checkIndexExists = (locs, id) => {
  const filtered = locs.filter(item => item.id === id);
  return filtered.length > 0;
};

const writeLocationToStore = (location, id) => {
  const identity = typeof id === 'number' ? id : new Date().getTime();

  realm.write(() => {
    const loc = realm.create('Location', {
      key: identity,
      ...location,
      id: identity,
      last_updated: new Date(),
      created_at: new Date(),
    }, true);

    location.daily.data.forEach((item, idx) => {
      if (idx < 7) {
        loc.daily.data.push(item);
      }
    });
    location.hourly.data.forEach((item, idx) => {
      if (idx < 8) {
        loc.hourly.data.push(item);
      }
    });
  });
};

const setLocation = (index, location) =>
  triggerAction(types.SET_LOCATION, { index, location });

const setLocationSettings = index =>
  triggerAction(types.SET_ACTIVE_LOCATION, { index });

export function setActiveLocation(index) {
  realm.write(() => {
    realm.create('Options', { key: 1, locationIndex: index }, true);
  });
  return dispatch => dispatch(setLocationSettings(index));
}

// Fetch All Locations
const fetchAllLocations = () =>
  triggerAction(types.FETCH_LOCATIONS);

const fetchAllLocationsSuccess = locations =>
  triggerAction(types.FETCH_LOCATIONS_SUCCESS, { locations });

const fetchAllLocationsFailure = err =>
  triggerAction(types.FETCH_LOCATIONS_FAILURE, { err });

const convertToLocation = (loc) => {
  return {
    name: loc.name,
    lng: loc.lng,
    lat: loc.lat,
  };
};

export const updateAllLocations = () => {
  const locations = getStoredLocations();

  return async (dispatch) => {
    if (locations.length === 0) {
      dispatch(fetchAllLocationsFailure('No locations to update'));
    }

    dispatch(fetchAllLocations());
    locations.forEach(async (location, idx) => {
      try {
        const forecast = await forecastRequest(location.lat, location.lng);
        const loc = convertToLocation(location);
        const extendedForecast = forecastResponseExtended(
          loc,
          forecast,
          location.id,
        );
        // Write location to Realm store
        writeLocationToStore(extendedForecast, location.id);
        if (idx === locations.length - 1) {
          // If index is lastIndex, return success
          dispatch(fetchAllLocationsSuccess(locations));
        }
      } catch (e) {
        dispatch(fetchAllLocationsFailure('An error occurred while updating'));
      }
    });
  };
};

// Get Locations (stored)
const getLocation = locations =>
  triggerAction(types.GET_LOCATIONS, { locations });

export function getLocationsFromStore() {
  const locs = getStoredLocations();
  return (dispatch) => {
    dispatch(getLocation(locs));
  };
}

// Add Index Location (current lat/lng)
const addIndex = location =>
  triggerAction(types.ADD_INDEX_LOCATION, { location });

// Add Location
const addLocation = location =>
  triggerAction(types.ADD_LOCATION, { location });

const locationLoading = () =>
  triggerAction(types.LOCATION_LOADING);

const locationLoadingDone = () =>
  triggerAction(types.LOCATION_LOADING_OFF);

const locationError = (err, type) =>
  triggerAction(type, { err });

export const updateError = err =>
  triggerAction(types.UPDATE_ERROR, { err });

export function updateCurrentLocation(location) {
  return async (dispatch) => {
    dispatch(locationLoading());

    try {
      const forecast = await forecastRequest(location.lat, location.lng);
      const loc = forecastResponseExtended(location, forecast, 0);
      writeLocationToStore(loc, 0);
      dispatch(addIndex(loc));
      dispatch(getLocationsFromStore());
    } catch (e) {
      dispatch(locationError('Error updating', types.UPDATE_ERROR));
    }
  };
}

export function updateLocationWithIndex(index) {
  const locs = getStoredLocations();
  const location = locs[index];

  return async (dispatch) => {
    if (checkLocationExists(locs, location.name)) {
      dispatch(locationLoading());
      try {
        const forecast = await forecastRequest(location.lat, location.lng);
        const extendedLocation = forecastResponseExtended(location, forecast, index);
        writeLocationToStore(extendedLocation, index);
        dispatch(setLocation(index, extendedLocation));
      } catch (e) {
        dispatch(locationError('Error updating', types.UPDATE_ERROR));
      }
    }
  };
}

export function addNewLocation(loc, index) {
  const locs = getStoredLocations();

  return async (dispatch) => {
    dispatch(locationLoading());
    if (locs.length === 10) {
      dispatch(locationError('Maximum number of locations reached', types.ADD_LOCATION_ERROR));
    } else if (
      locs.length < 10 &&
      checkLocationExists(locs, loc.name) &&
      index !== 0
    ) {
      dispatch(locationError('Location already added', types.ADD_LOCATION_ERROR));
    } else if (
      index === 0 &&
      checkIndexExists(locs, index)
    ) {
      dispatch(updateCurrentLocation(loc));
    } else if (
      locs.length < 10 &&
      !checkLocationExists(locs, loc.name)
    ) {
      try {
        const forecast = await forecastRequest(loc.lat, loc.lng);
        const extendedLocation = forecastResponseExtended(
          loc,
          forecast,
          index !== 0 ? null : index,
        );
        writeLocationToStore(extendedLocation, index !== 0 ? null : index);
        dispatch(addLocation(extendedLocation));
        dispatch(setLocationSettings(index !== 0 ? locs.length : index));
      } catch (e) {
        dispatch(locationError('Error updating', types.UPDATE_ERROR));
      }
    } else {
      dispatch(locationLoadingDone());
    }
  };
}

// Remove location
const removeLocation = id =>
  triggerAction(types.DELETE_LOCATION, { id });

const deleteLocation = (id) => {
  const locations = realm.objects('Location');
  const location = locations.filtered(`id = ${id}`);
  try {
    realm.write(() => {
      realm.delete(location);
    });
  } catch (e) {
    console.log(e);
    return (dispatch) => {
      dispatch(updateError('Not able to delete location'));
    };
  }
  return (dispatch) => {
    dispatch(removeLocation(id));
    dispatch(setLocationSettings(locations.length - 1));
  };
};

export function deleteLocationFromStore(id) {
  return (dispatch) => {
    dispatch(deleteLocation(id));
  };
}
