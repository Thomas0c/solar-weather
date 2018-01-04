import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LocationDisplay from '../../lib/js/app/components/locationDisplay';

test('renders correctly when not loading', () => {
  const tree = renderer.create(<LocationDisplay locationName="Tokyo" loading={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when loading', () => {
  const tree = renderer.create(<LocationDisplay locationName="Tokyo" loading />).toJSON();
  expect(tree).toMatchSnapshot();
});
