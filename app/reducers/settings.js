import moment from 'moment';
import * as types from '../../lib/js/app/actions/actions';

const Maybe = require('data.maybe');
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
actionHandlers[types.setOnboarding] = (state, action) => ({
	...updateField(state, 'onboarding', action.value),
});

actionHandlers[types.setUnit] = (state, action) => ({
	...state,
	unit: action.unit,
	unitIndex: action.unitIndex,
});

actionHandlers[types.setActiveLocation] = (state, action) => ({
	...updateField(state, 'locationIndex', action.index),
});

actionHandlers[types.updateLatestTimestamp] = (state, action) => ({
	...updateField(state, 'latestUpdate', action.timestamp),
});

actionHandlers[types.setTimeType] = (state, action) => ({
	...state,
	timeType: action.timeType,
	timeIndex: action.timeIndex,
});

actionHandlers[types.setSettings] = (state, action) => ({
	...state,
	...R.dissoc('type', action),
});

export default function settings(state = initialState, action = {}) {
	return Maybe.fromNullable(actionHandlers[action.type])
		.map(handler => handler(state, action))
		.getOrElse(state);
}
