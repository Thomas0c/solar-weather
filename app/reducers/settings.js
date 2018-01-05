import moment from 'moment';
import * as types from '../actions/types.action';

const initialState = {
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

export default function settings(state = initialState, action = {}) {
	switch (action.type) {
		case types.SET_ONBOARDING:
			return {
				...state,
				onboarding: action.value,
			};
		case types.SET_UNIT:
			return {
				...state,
				unit: action.unit,
				unitIndex: action.unitIndex,
			};
		case types.SET_ACTIVE_LOCATION: {
			return {
				...state,
				locationIndex: action.index,
			};
		}
		case types.UPDATE_LATEST_TIMESTAMP: {
			return {
				...state,
				latestUpdate: action.timestamp,
			};
		}
		case types.SET_TIME_TYPE:
			return {
				...state,
				timeType: action.timeType,
				timeIndex: action.timeIndex,
			};
		case types.SET_SETTINGS:
			return {
				...state,
				unit: action.unit,
				unitIndex: action.unitIndex,
				timeType: action.timeType,
				timeIndex: action.timeIndex,
			};
		default:
			return state;
	}
}
