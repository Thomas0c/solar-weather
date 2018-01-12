import * as types from '../../lib/js/app/actions/actions';
import locations, { initialState } from '../../app/reducers/locations';
import { loc } from '../config';

const state = initialState;

describe('locations reducer', () => {
	beforeAll(() => {
		jest.genMockFromModule('realm');
	});

	it('should return the initial state', () => {
		expect(locations(state, {})).toMatchSnapshot();
	});

	it('should handle LOCATION_LOADING', () => {
		expect(
			locations(state, {
				type: types.locationLoading,
			}),
		).toMatchSnapshot();
	});

	it('should handle ADD_LOCATION and add a location to state', () => {
		expect(
			locations(state, {
				type: types.addLocation,
				location: loc,
			}),
		).toMatchSnapshot();
	});

	it('should handle GET_LOCATIONS and add them to state', () => {
		expect(
			locations(state, {
				type: types.getLocations,
				locations: [loc],
			}),
		).toMatchSnapshot();
	});

	it('should handle UPDATE_ERROR', () => {
		expect(
			locations(state, {
				type: types.updateError,
				err: 'Test Error',
			}),
		).toMatchSnapshot();
	});
});
