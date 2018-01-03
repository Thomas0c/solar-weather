import * as types from './types.action';

const triggerAction = (type, obj) =>
  Object.assign(
    { type },
    obj,
  );

// General Location Handling
export const locationLoading = () =>
  triggerAction(types.LOCATION_LOADING);

export const locationLoadingDone = () =>
  triggerAction(types.LOCATION_LOADING_OFF);

export const locationError = err =>
  triggerAction(types.ADD_LOCATION_ERROR, { err });

export const setLocation = (index, location) =>
  triggerAction(types.SET_LOCATION, { index, location });

export const setLocationSettings = index =>
  triggerAction(types.SET_ACTIVE_LOCATION, { index });

// Add Index Location
export const addIndex = location =>
  triggerAction(types.ADD_INDEX_LOCATION, { location });

// Add Location
export const addLocation = location =>
  triggerAction(types.ADD_LOCATION, { location });

export const updateError = err =>
  triggerAction(types.UPDATE_ERROR, { err });

// Fetch All Locations
export const fetchAllLocations = () =>
  triggerAction(types.FETCH_LOCATIONS);

export const fetchAllLocationsSuccess = locations =>
  triggerAction(types.FETCH_LOCATIONS_SUCCESS, { locations });

export const fetchAllLocationsFailure = err =>
  triggerAction(types.FETCH_LOCATIONS_FAILURE, { err });

// Get Locations (Stored)
export const getLocation = locations =>
  triggerAction(types.GET_LOCATIONS, { locations });

// Remove location
export const removeLocation = id =>
  triggerAction(types.DELETE_LOCATION, { id });
