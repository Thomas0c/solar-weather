import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WeekOverview from '../lib/js/app/components/weekOverview';

const mockForecast = [{
  temperature: 0.0,
  icon: 'sunny',
  temperatureMax: 0.0,
  temperatureMin: 0.0,
  time: 1515069527,
}, {
  temperature: 0.0,
  icon: 'rain',
  temperatureMax: 10.0,
  temperatureMin: -5.0,
  time: 1515182400
}];

test('renders correctly if empty forecast is passed', () => {
  const tree = renderer.create(
    <WeekOverview
      unit="c"
      timezone="America/New_York"
      forecast={mockForecast}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
