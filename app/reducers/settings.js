import moment from 'moment';
import * as types from '../actions/types.action';

const Maybe = require('folktale/maybe');
const R = require('ramda');

export const initialState = {
	unit: 'c',
	unitIndex: 0,
	timeType: '24',
	timeIndex: 0,
	onboarding: false,
	locationIndex: 0,
	latestUpdate: moment()
		.subtract(1, 'day')
		.unix()
		.toString(),
};

const updateField = (state, key, value) => ({
	...state,
	[key]: value,
});

const actionHandlers = {};
actionHandlers[types.SET_ONBOARDING] = (state, action) => ({
	...updateField(state, 'onboarding', action.value),
});

actionHandlers[types.SET_UNIT] = (state, action) => ({
	...state,
	unit: action.unit,
	unitIndex: action.unitIndex,
});

actionHandlers[types.SET_ACTIVE_LOCATION] = (state, action) => ({
	...updateField(state, 'locationIndex', action.index),
});

actionHandlers[types.UPDATE_LATEST_TIMESTAMP] = (state, action) => ({
	...updateField(state, 'latestUpdate', action.timestamp),
});

actionHandlers[types.SET_TIME_TYPE] = (state, action) => ({
	...state,
	timeType: action.timeType,
	timeIndex: action.timeIndex,
});

actionHandlers[types.SET_SETTINGS] = (state, action) => ({
	...state,
	...R.dissoc('type', action),
});

export default function settings(state = initialState, action = {}) {
	return Maybe.fromNullable(actionHandlers[action.type])
		.map(handler => handler(state, action))
		.getOrElse(state);
}
