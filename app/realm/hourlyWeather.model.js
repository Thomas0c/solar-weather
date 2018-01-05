class HourlyData {}
HourlyData.schema = {
	name: 'HourlyData',
	properties: {
		time: 'int',
		summary: 'string',
		icon: 'string',
		precipIntensity: 'float',
		precipProbability: 'float',
		precipType: { type: 'string', optional: true },
		temperature: 'float',
		humidity: 'float',
	},
};

class Hourly {}
Hourly.schema = {
	name: 'Hourly',
	properties: {
		summary: 'string',
		icon: 'string',
		data: { type: 'list', objectType: 'HourlyData' },
	},
};

module.exports = {
	Hourly,
	HourlyData,
};
