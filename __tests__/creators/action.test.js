import * as actions from '../../lib/js/app/actions/creators';
import * as types from '../../lib/js/app/actions/actions';
import { loc } from '../config';

const locs = [loc, loc];

describe('actions', () => {
	it('should create an action to trigger loading', () => {
		const expectedAction = {
			type: types.locationLoading,
		};
		expect(actions.locationLoading()).toEqual(expectedAction);
	});

	it('should create an action to stop loading', () => {
		const expectedAction = {
			type: types.locationLoadingOff,
		};
		expect(actions.locationLoadingDone()).toEqual(expectedAction);
	});

	it('should create an action with an error', () => {
		const error = 'This is a test error';
		const expectedAction = {
			type: types.addLocationError,
			err: error,
		};
		expect(actions.locationError(error)).toEqual(expectedAction);
	});

	it('should create an action to set location', () => {
		const expectedAction = {
			type: types.setLocation,
			index: 0,
			location: loc,
		};
		expect(actions.setLocation(0, loc)).toEqual(expectedAction);
	});

	it('should create an action to set active location', () => {
		const expectedAction = {
			type: types.setActiveLocation,
			index: 0,
		};
		expect(actions.setLocationSettings(0)).toEqual(expectedAction);
	});

	it('should create an action to add an index location', () => {
		const expectedAction = {
			type: types.addIndexLocation,
			location: loc,
		};
		expect(actions.addIndex(loc)).toEqual(expectedAction);
	});

	it('should create an action to add a non-index location', () => {
		const expectedAction = {
			type: types.addLocation,
			location: loc,
		};
		expect(actions.addLocation(loc)).toEqual(expectedAction);
	});

	it('should create an action to pass fetched locations', () => {
		const expectedAction = {
			type: types.fetchLocationsSuccess,
			locations: locs,
		};
		expect(actions.fetchAllLocationsSuccess(locs)).toEqual(expectedAction);
	});

	it('should create an action to remove a location', () => {
		const expectedAction = {
			type: types.deleteLocation,
			id: 0,
		};
		expect(actions.removeLocation(0)).toEqual(expectedAction);
	});
});
