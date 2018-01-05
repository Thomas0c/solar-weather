import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ContentModal from '../../lib/js/app/components/contentModal';

test('renders correctly', () => {
	const tree = renderer
		.create(<ContentModal visible content={<Text>Test component</Text>} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
