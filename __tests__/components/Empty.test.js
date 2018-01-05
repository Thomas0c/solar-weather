import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Empty from '../../lib/js/app/components/empty';

test('renders correctly', () => {
	const tree = renderer.create(<Empty />).toJSON();
	expect(tree).toMatchSnapshot();
});
