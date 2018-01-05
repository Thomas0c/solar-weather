import * as actions from '../../app/actions/creators.action';
import * as types from '../../app/actions/types.action';
import { loc } from '../config';

const locs = [loc, loc];

describe('actions', () => {
	it('should create an action to trigger loading', () => {
		const expectedAction = {
			type: types.LOCATION_LOADING,
		};
		expect(actions.locationLoading()).toEqual(expectedAction);
	});

	it('should create an action to stop loading', () => {
		const expectedAction = {
			type: types.LOCATION_LOADING_OFF,
		};
		expect(actions.locationLoadingDone()).toEqual(expectedAction);
	});

	it('should create an action with an error', () => {
		const error = 'This is a test error';
		const expectedAction = {
			type: types.ADD_LOCATION_ERROR,
			err: error,
		};
		expect(actions.locationError(error)).toEqual(expectedAction);
	});

	it('should create an action to set location', () => {
		const expectedAction = {
			type: types.SET_LOCATION,
			index: 0,
			location: loc,
		};
		expect(actions.setLocation(0, loc)).toEqual(expectedAction);
	});

	it('should create an action to set active location', () => {
		const expectedAction = {
			type: types.SET_ACTIVE_LOCATION,
			index: 0,
		};
		expect(actions.setLocationSettings(0)).toEqual(expectedAction);
	});

	it('should create an action to add an index location', () => {
		const expectedAction = {
			type: types.ADD_INDEX_LOCATION,
			location: loc,
		};
		expect(actions.addIndex(loc)).toEqual(expectedAction);
	});

	it('should create an action to add a non-index location', () => {
		const expectedAction = {
			type: types.ADD_LOCATION,
			location: loc,
		};
		expect(actions.addLocation(loc)).toEqual(expectedAction);
	});

	it('should create an action to pass fetched locations', () => {
		const expectedAction = {
			type: types.FETCH_LOCATIONS_SUCCESS,
			locations: locs,
		};
		expect(actions.fetchAllLocationsSuccess(locs)).toEqual(expectedAction);
	});

	it('should create an action to remove a location', () => {
		const expectedAction = {
			type: types.DELETE_LOCATION,
			id: 0,
		};
		expect(actions.removeLocation(0)).toEqual(expectedAction);
	});
});
