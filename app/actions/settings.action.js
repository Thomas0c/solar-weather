import moment from 'moment';
import * as types from './types.action';
import realm from '../realm';
import * as creators from './creators.action';

const updateTimeReducer = (timeType, timeIndex) =>
	creators.triggerAction(types.SET_TIME_TYPE, { timeType, timeIndex });

export function setTimeType(timeType, index) {
	realm.write(() => {
		realm.create('Options', { key: 1, timeType, timeIndex: index }, true);
	});
	return dispatch => {
		dispatch(updateTimeReducer(timeType, index));
	};
}

export function setUnit(unit, index) {
	realm.write(() => {
		realm.create(
			'Options',
			{
				key: 1,
				unit,
				unitIndex: index,
			},
			true,
		);
	});

	return dispatch => {
		dispatch({
			type: types.SET_UNIT,
			unit,
			unitIndex: index,
		});
	};
}

export function setLatestCollectiveUpdate() {
	const date = moment()
		.unix()
		.toString();
	realm.write(() => {
		realm.create(
			'Options',
			{
				key: 1,
				latestUpdate: date,
			},
			true,
		);
	});

	return dispatch => {
		dispatch({
			type: types.UPDATE_LATEST_TIMESTAMP,
			timestamp: date,
		});
	};
}

export function setOnboarding(value) {
	realm.write(() => {
		realm.create(
			'Options',
			{
				key: 1,
				onboarding: value,
			},
			true,
		);
	});

	return dispatch => {
		dispatch({
			type: types.SET_ONBOARDING,
			value,
		});
	};
}

export function getSettings() {
	const settings = realm.objects('Options').slice(0, 1)[0];
	const unit = settings ? settings.unit : 'c';
	const unitIndex = settings ? settings.unitIndex : 0;
	const timeType = settings ? settings.timeType : '24';
	const timeIndex = settings ? settings.timeIndex : 0;
	const locationIndex = settings ? settings.locationIndex : 0;
	const onboarding = settings ? settings.onboarding : false;
	const latestUpdate = settings
		? settings.latestUpdate
		: moment()
				.unix()
				.toString();
	if (!settings) {
		realm.write(() => {
			realm.create('Options', {
				unit: 'c',
				unitIndex: 0,
				timeType: '24',
				timeIndex: 0,
				key: 1,
				latestUpdate,
			});
		});
	}
	return async dispatch => {
		await dispatch({
			type: types.SET_SETTINGS,
			unit,
			unitIndex,
			timeType,
			timeIndex,
			locationIndex,
			onboarding,
			latestUpdate,
		});
	};
}
