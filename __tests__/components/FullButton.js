import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FullButton from '../../lib/js/app/components/fullButton';

test('renders correctly', () => {
	const tree = renderer
		.create(<FullButton text="Close" toggle={t => t} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
