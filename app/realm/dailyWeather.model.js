class DailyData {}
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

class Daily {}
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
