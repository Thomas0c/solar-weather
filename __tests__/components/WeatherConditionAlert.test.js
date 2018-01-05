import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WeatherConditionAlert from '../../lib/js/app/components/weatherConditionAlert';

test('renders correctly when showAlert is true', () => {
  const tree = renderer.create(<WeatherConditionAlert summary="Test Summary" showAlert={1} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when showAlert is false', () => {
  const tree = renderer.create(<WeatherConditionAlert summary="Test Summary" showAlert={0} />).toJSON();
  expect(tree).toMatchSnapshot();
});
