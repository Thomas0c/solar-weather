import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DateDisplay from '../../lib/js/app/components/dateDisplay';

const date = new Date(1515069527 * 1000);

test('renders correctly', () => {
  const tree = renderer.create(<DateDisplay
    condition="sunny"
    timestamp={date}
    timezone="America/New_York"
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
