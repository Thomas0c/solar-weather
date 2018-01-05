import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Background from '../../lib/js/app/components/background';

test('renders correctly for clear-night', () => {
	const tree = renderer
		.create(<Background condition="clear-night" day={false} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders correctly for cloudy day', () => {
	const tree = renderer.create(<Background condition="cloudy" day />).toJSON();
	expect(tree).toMatchSnapshot();
});
