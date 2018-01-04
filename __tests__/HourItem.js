import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HourItem from '../lib/js/app/components/hourItem';

test('renders correctly', () => {
  const tree = renderer.create(<HourItem
    unit="c"
    timeType="24"
    temperature={0.0}
    icon="sunny"
    timezone="America/New_York"
    time={1515069527}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
