import * as types from '../../lib/js/app/actions/actions';

const Maybe = require('data.maybe');

export const initialState = {
	locations: [
		{
			id: 1,
			lat: 0.0,
			lng: 0.0,
			currently: {
				icon: '',
				precipProbability: 0.0,
				precipType: '',
				temperature: 0.0,
				apparentTemperature: 0.0,
				humidity: 0,
				summary: '',
			},
			daily: {
				data: [],
			},
			hourly: {
				data: [],
			},
			alerts: [],
		},
	],
	timezone: 'America/New_York',
	locationError: null,
	loading: false,
};

const setLoading = (state, value) => ({
	...state,
	loading: value || false,
});

const setError = (state, action) => ({
	...setLoading(state, false),
	locationError: action.err,
});

const actionHandlers = {};
actionHandlers[types.locationLoadingOff] = setLoading;
actionHandlers[types.fetchLocations] = state => setLoading(state, true);
actionHandlers[types.locationLoading] = state => setLoading(state, true);

actionHandlers[types.getLocations] = (state, action) => ({
	...setLoading(state, false),
	locations: action.locations,
	locationError: null,
});

actionHandlers[types.setLocation] = (state, action) => {
	const currentLocation = Object.assign(
		state.locations[action.index],
		action.location,
	);
	const locs = state.locations;
	locs[action.index] = currentLocation;
	return {
		...setLoading(state, false),
		locations: locs,
		locationError: null,
	};
};

actionHandlers[types.addLocation] = (state, action) => ({
	...setLoading(state, false),
	locations: [...state.locations.filter(x => x.id !== 1), action.location],
	locationError: null,
});

actionHandlers[types.fetchLocationsSuccess] = (state, action) => ({
	...setLoading(state, false),
	locations: action.locations,
	locationError: null,
});

actionHandlers[types.deleteLocation] = (state, action) => ({
	...setLoading(state, false),
	locations: [...state.locations.filter(x => x.id !== action.id)],
	locationError: null,
});

actionHandlers[types.fetchLocationsFailure] = setError;
actionHandlers[types.addIndexLocationError] = setError;
actionHandlers[types.addLocationError] = setError;
actionHandlers[types.setActiveLocationError] = setError;
actionHandlers[types.updateError] = setError;

export default function locations(state = initialState, action = {}) {
	return Maybe.fromNullable(actionHandlers[action.type])
		.map(handler => handler(state, action))
		.getOrElse(state);
}
