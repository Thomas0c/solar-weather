import 'react-native';
import Temperature from '../lib/js/app/utils/temperature';

test('Converts Celcius to Fahrenheit Correctly', () => {
  const temp = Temperature.convertToFahrenheit(6.0);
  expect(temp).toEqual(42.8);
});

test('Converts Fahrenheit to Celcius Correctly', () => {
  const temp = Temperature.convertToCelsius(32.0);
  expect(temp).toEqual(0.0);
});

test('Converts Temperature to string', () => {
  const temp = Temperature.fixTemperature(32.0);
  expect(temp).toEqual('32');
});

test('Converts temperatures to formatted text', () => {
  const temp = Temperature.formatText(32.0, 0.0, '');
  expect(temp).toContain('Feels like 32° \n Humidity 0%');
});
