const convertToFahrenheit = temp => temp * (9/5) + 32; // eslint-disable-line

const convertToCelsius = temp => temp - 32 * (5/9); // eslint-disable-line

const fixTemperature = temp => parseFloat(temp).toFixed(0);

module.exports = {
  convertToCelsius,
  convertToFahrenheit,
  fixTemperature,
};
