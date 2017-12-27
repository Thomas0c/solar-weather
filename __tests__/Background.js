import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Background from '../lib/js/app/components/background';

test('renders correctly', () => {
  const tree = renderer.create(<Background />).toJSON();
  expect(tree).toMatchSnapshot();
});
