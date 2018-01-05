import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Toast from '../../lib/js/app/components/toast';

test('renders correctly if no error is passed', () => {
	const tree = renderer
		.create(<Toast error="" displayError={false} connected />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders correctly if an error is passed', () => {
	const tree = renderer
		.create(<Toast error="This is an error" displayError connected />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders correctly if not connected', () => {
	const tree = renderer
		.create(<Toast error="" displayError={false} connected={false} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
