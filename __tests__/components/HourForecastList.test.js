import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HourForecastList from '../../lib/js/app/components/hourForecastList';

const mockForecast = [{
  temperature: 0.0,
  icon: 'sunny',
  time: 1515069527,
}];

test('renders correctly if empty forecast is passed', () => {
  const tree = renderer.create(
    <HourForecastList
      openHours
      timeType="24"
      unit="c"
      timezone="America/New_York"
      locationName="Tokyo"
      forecast={[]}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly if populated forecast with past time is passed', () => {
  const tree = renderer.create(
    <HourForecastList
      openHours
      timeType="24"
      unit="c"
      timezone="America/New_York"
      locationName="Tokyo"
      forecast={mockForecast}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
