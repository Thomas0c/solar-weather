
/* eslint-disable */
const icons = {
  'clear-day': require('../../assets/weather_icons/sunny.png'),
  'clear-night': require('../../assets/weather_icons/moon.png'),
  'partly-cloudy-day': require('../../assets/weather_icons/partlycloudy.png'),
  'partly-cloudy-night': require('../../assets/weather_icons/mostlycloudy.png'),
  cloudy: require('../../assets/weather_icons/mostlycloudy.png'),
  wind: require('../../assets/weather_icons/wind.png'),
  fog: require('../../assets/weather_icons/fog.png'),
  hail: require('../../assets/weather_icons/snow.png'),
  tornado: require('../../assets/weather_icons/tornado.png'),
  thunderstorm: require('../../assets/weather_icons/tstorms.png'),
  rain: require('../../assets/weather_icons/rain.png'),
  snow: require('../../assets/weather_icons/snow.png'),
  'clear-day_white': require('../../assets/weather_icons/sunny_white.png'),
  'clear-night_white': require('../../assets/weather_icons/moon_white.png'),
  'partly-cloudy-day_white': require('../../assets/weather_icons/partlycloudy_white.png'),
  'partly-cloudy-night_white': require('../../assets/weather_icons/mostlycloudy_white.png'),
  cloudy_white: require('../../assets/weather_icons/mostlycloudy_white.png'),
  wind_white: require('../../assets/weather_icons/wind_white.png'),
  fog_white: require('../../assets/weather_icons/fog_white.png'),
  hail_white: require('../../assets/weather_icons/snow_white.png'),
  tornado_white: require('../../assets/weather_icons/tornado_white.png'),
  thunderstorm_white: require('../../assets/weather_icons/tstorms_white.png'),
  rain_white: require('../../assets/weather_icons/rain_white.png'),
  snow_white: require('../../assets/weather_icons/snow_white.png'),
};
/* eslint-enable */

const identifyIcon = (icon) => {
  if (icon in icons) {
    return icons[icon];
  }
  return null;
};

module.exports = {
  icons,
  identifyIcon,
};
