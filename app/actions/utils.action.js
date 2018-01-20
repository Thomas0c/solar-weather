import axios from 'axios';
import Config from 'react-native-config';
import { DateTime } from 'luxon';
import realm from '../realm';

const R = require('ramda');

// Utilities
export const forecastRequest = async (lat, lng) =>
	axios(
		`https://api.darksky.net/forecast/${Config.FORECAST_API}/${lat},${lng}`,
		{
			params: {
				exclude: 'minutely',
				units: 'si',
				lang: 'en',
			},
		},
	);

export const getStoredLocations = () => {
	const locations = realm.objects('Location').sorted('id');
	const locArray = locations.map(x => Object.assign({}, x));
	return locArray.length > 0 ? locArray : [];
};

export const forecastResponseExtended = (location, res, id) => {
	const newDate =
		process.env.NODE_ENV === 'test' ? new Date(1515149649 * 1000) : new Date();
	const { data: { daily, alerts, currently, hourly, timezone } } = res;

	const timeInZone = DateTime.local().setZone(timezone);
	const followingDay = timeInZone.set({ hour: 0 });
	const fiveDaysFromNow = followingDay.plus({ days: 5 });

	return Object.assign(
		{ id },
		location,
		{
			last_updated: newDate,
			timezone,
		},
		{
			hourly: {
				summary: hourly.summary,
				icon: hourly.icon,
				data: hourly.data.filter((item, idx) => idx < 15),
			},
		},
		{ alerts: alerts || [] },
		{ currently },
		{
			daily: {
				summary: daily.summary,
				icon: daily.icon,
				data: R.uniq(
					daily.data
						.filter(item => {
							const time = DateTime.fromMillis(item.time * 1000);
							return time > followingDay && time < fiveDaysFromNow;
						})
						.slice(0, 5),
				),
			},
		},
	);
};

export const checkLocationExists = (locs, name) => {
	const filtered = locs.filter(item => item.name === name);
	return filtered.length > 0;
};

export const checkIndexExists = (locs, id) => {
	const filtered = locs.filter(item => item.id === id);
	return filtered.length > 0;
};

export const convertToLocation = loc => ({
	name: loc.name,
	lng: loc.lng,
	lat: loc.lat,
});

export const writeLocationToStore = (location, id) => {
	const date = new Date();
	realm.write(() => {
		realm.create(
			'Location',
			{
				key: id,
				...location,
				id,
				last_updated: date,
				created_at: date,
			},
			true,
		);
	});
};
