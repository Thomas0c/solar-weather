import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LocationIcon from '../lib/js/app/components/locationIcon';

test('renders correctly when selected', () => {
  const tree = renderer.create(<LocationIcon selected name="Tokyo" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when not selected', () => {
  const tree = renderer.create(<LocationIcon selected={false} name="Tokyo" />).toJSON();
  expect(tree).toMatchSnapshot();
});
