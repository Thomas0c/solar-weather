import * as types from '../../lib/js/app/actions/actions';

export const triggerAction = (type, obj) => Object.assign({ type }, obj);

// General Location Handling
export const locationLoading = () => triggerAction(types.locationLoading);

export const locationLoadingDone = () =>
	triggerAction(types.locationLoadingOff);

export const locationError = err =>
	triggerAction(types.addLocationError, { err });

export const setLocation = (index, location) =>
	triggerAction(types.setLocation, { index, location });

export const setLocationSettings = index =>
	triggerAction(types.setActiveLocation, { index });

// Add Index Location
export const addIndex = location =>
	triggerAction(types.addIndexLocation, { location });

// Add Location
export const addLocation = location =>
	triggerAction(types.addLocation, { location });

export const updateError = err => triggerAction(types.updateError, { err });

// Fetch All Locations
export const fetchAllLocations = () => triggerAction(types.fetchLocations);

export const fetchAllLocationsSuccess = locations =>
	triggerAction(types.fetchLocationsSuccess, { locations });

export const fetchAllLocationsFailure = err =>
	triggerAction(types.fetchLocationsFailure, { err });

// Get Locations (Stored)
export const getLocation = locations =>
	triggerAction(types.getLocations, { locations });

// Remove location
export const removeLocation = id => triggerAction(types.deleteLocation, { id });
