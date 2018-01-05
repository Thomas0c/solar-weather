import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AlertContent from '../../lib/js/app/components/alertContent';

test('renders correctly', () => {
	const tree = renderer
		.create(
			<AlertContent
				title="Alert Title"
				description="Alert Description \n Second Line \n"
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
