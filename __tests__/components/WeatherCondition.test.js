import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WeatherCondition from '../../lib/js/app/components/weatherCondition';

const currentlyMock = temp => ({
	icon: '',
	summary: 'This is a summary used for testing purposes',
	temperature: temp || 0.0,
	apparentTemperature: 0.0,
	precipProbability: 0.0,
	precipType: 'rain',
	humidity: 0.0,
});

test('renders correctly when details are toggled', () => {
	const tree = renderer
		.create(
			<WeatherCondition
				unit="c"
				alerts={[]}
				showDetails
				currently={currentlyMock()}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders -0 as positive', () => {
	const tree = renderer
		.create(
			<WeatherCondition
				unit="c"
				alerts={[]}
				showDetails
				currently={currentlyMock(-0.0)}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders negative temperature as negative', () => {
	const tree = renderer
		.create(
			<WeatherCondition
				unit="c"
				alerts={[]}
				showDetails
				currently={currentlyMock(-9.9)}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders correctly when details are not toggled', () => {
	const tree = renderer
		.create(
			<WeatherCondition
				unit="c"
				alerts={[]}
				showDetails={false}
				currently={currentlyMock()}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders correctly when precip probability is more than 30%', () => {
	const modifiedMock = currentlyMock();
	modifiedMock.precipProbability = 0.5;
	const tree = renderer
		.create(
			<WeatherCondition
				unit="c"
				alerts={[]}
				showDetails
				currently={modifiedMock}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
