import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CloseButton from '../lib/js/app/components/closeButton';

test('renders correctly', () => {
  const tree = renderer.create(<CloseButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
