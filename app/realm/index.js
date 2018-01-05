import Realm from 'realm';

import Locations from './locations.model';
import Options from './options.model';
import { Daily, DailyData } from './dailyWeather.model';
import Alert from './alert.model';
import { Hourly, HourlyData } from './hourlyWeather.model';
import Currently from './currentWeather.model';

const realm = new Realm({
	schema: [
		Locations,
		Alert,
		Options,
		Daily,
		DailyData,
		Hourly,
		HourlyData,
		Currently,
	],
	schemaVersion: 78,
	deleteRealmIfMigrationNeeded: true,
});

export const deleteRealm = async () => {
	try {
		await realm.write(async () => {
			realm.deleteAll();
		});
	} catch (err) {
		if (err) Promise.reject(err);
	}
};

export default realm;
