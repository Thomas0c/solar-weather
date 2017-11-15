import Realm from 'realm';

import Locations from './locations.model';
import Options from './options.model';
import { Daily, DailyData } from './dailyWeather.model';
import Alert from './alert.model';
import { Hourly, HourlyData } from './hourlyWeather.model';
import Currently from './currentWeather.model';

const realm = new Realm({
  schema: [Locations, Alert, Options, Daily, DailyData, Hourly, HourlyData, Currently],
  schemaVersion: 77,
});

export default realm;
