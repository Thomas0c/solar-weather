import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WeatherCondition from '../../lib/js/app/components/weatherCondition';

const currentlyMock = {
  icon: '',
  summary: 'This is a summary used for testing purposes',
  temperature: 0.0,
  apparentTemperature: 0.0,
  precipProbability: 0.0,
  precipType: 'rain',
  humidity: 0.0,
};

test('renders correctly when details are toggled', () => {
  const tree = renderer.create(<WeatherCondition unit="c" alerts={[]} showDetails currently={currentlyMock} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when details are not toggled', () => {
  const tree = renderer.create(<WeatherCondition unit="c" alerts={[]} showDetails={false} currently={currentlyMock} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when precip probability is more than 30%', () => {
  const modifiedMock = currentlyMock;
  modifiedMock.precipProbability = 0.5;
  const tree = renderer.create(<WeatherCondition unit="c" alerts={[]} showDetails currently={modifiedMock} />).toJSON();
  expect(tree).toMatchSnapshot();
});
