import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DateDisplay from '../lib/js/app/components/dateDisplay';


test('renders correctly', () => {
  const tree = renderer.create(<DateDisplay
    condition="sunny"
    timestamp={new Date()}
    timezone="America/New_York"
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
