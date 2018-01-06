import * as types from '../actions/types.action';

const Maybe = require('folktale/maybe');

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
actionHandlers[types.LOCATION_LOADING_OFF] = setLoading;
actionHandlers[types.FETCH_LOCATIONS] = state => setLoading(state, true);
actionHandlers[types.LOCATION_LOADING] = state => setLoading(state, true);

actionHandlers[types.GET_LOCATIONS] = (state, action) => ({
	...setLoading(state, false),
	locations: action.locations,
	locationError: null,
});

actionHandlers[types.SET_LOCATION] = (state, action) => {
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

actionHandlers[types.ADD_LOCATION] = (state, action) => ({
	...setLoading(state, false),
	locations: [...state.locations.filter(x => x.id !== 1), action.location],
	locationError: null,
});

actionHandlers[types.FETCH_LOCATIONS_SUCCESS] = (state, action) => ({
	...setLoading(state, false),
	locations: action.locations,
	locationError: null,
});

actionHandlers[types.DELETE_LOCATION] = (state, action) => ({
	...setLoading(state, false),
	locations: [...state.locations.filter(x => x.id !== action.id)],
	locationError: null,
});

actionHandlers[types.FETCH_LOCATIONS_FAILURE] = setError;
actionHandlers[types.ADD_INDEX_LOCATION_ERROR] = setError;
actionHandlers[types.ADD_LOCATION_ERROR] = setError;
actionHandlers[types.SET_ACTIVE_LOCATION_ERROR] = setError;
actionHandlers[types.UPDATE_ERROR] = setError;

export default function locations(state = initialState, action = {}) {
	return Maybe.fromNullable(actionHandlers[action.type])
		.map(handler => handler(state, action))
		.getOrElse(state);
}
