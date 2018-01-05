import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WeatherConditionText from '../../lib/js/app/components/weatherConditionText';

test('renders correctly when showDetails is true', () => {
  const tree = renderer.create(<WeatherConditionText text="Test Text" showDetails />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when showDetails is false', () => {
  const tree = renderer.create(<WeatherConditionText text="Test Text" showDetails={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});
