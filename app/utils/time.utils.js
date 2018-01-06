import moment from 'moment';
import tz from 'moment-timezone';

module.exports = {
	isDaylight(currentTimezone) {
		const eveningTime = moment()
			.tz(currentTimezone)
			.hour(18)
			.minute(0)
			.second(0);

		return moment()
			.tz(currentTimezone)
			.isBefore(eveningTime);
	},

	setToTime(time, h, m, s) {
		time
			.clone()
			.hour(h)
			.minute(m)
			.second(s);
	},
};
