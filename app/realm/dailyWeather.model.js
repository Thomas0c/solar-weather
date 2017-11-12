import Realm from 'realm';

class DailyData extends Realm.Object {}
DailyData.schema = {
  name: 'DailyData',
  properties: {
    time: 'int',
    summary: 'string',
    icon: 'string',
    sunriseTime: 'int',
    sunsetTime: 'int',
    precipIntensity: 'float',
    precipProbability: 'float',
    precipType: { type: 'string', optional: true },
    temperatureMin: 'float',
    temperatureMax: 'float',
    humidity: 'float',
  },
};

class Daily extends Realm.Object {}
Daily.schema = {
  name: 'Daily',
  properties: {
    summary: 'string',
    icon: 'string',
    data: { type: 'list', objectType: 'DailyData' },
  },
};

module.exports = {
  Daily,
  DailyData,
};
