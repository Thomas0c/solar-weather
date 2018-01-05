import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import InfoIcon from '../../lib/js/app/components/infoIcon';

test('renders correctly', () => {
	const tree = renderer.create(<InfoIcon />).toJSON();
	expect(tree).toMatchSnapshot();
});
