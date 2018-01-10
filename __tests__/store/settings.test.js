import mockStore from 'redux-mock-store';
import { setTimeType, setUnit } from '../../app/actions/settings.action';
import { deleteRealm } from '../../app/realm';

describe('settings store', () => {
	const store = mockStore();

	beforeAll(async () => {
		jest.genMockFromModule('realm');
		// Teardown Realm prior to running tests
		await deleteRealm();
	});

	afterAll(async () => {
		// Clean up after adding to Realm
		await deleteRealm();
	});

	beforeEach(() => {
		store.clearActions();
	});

	it('should handle setTimeType', async () => {
		await store.dispatch(setTimeType('24', 1));
		expect(store.getActions()).toMatchSnapshot();
	});

	it('should handle setUnit', async () => {
		await store.dispatch(setUnit('f', 1));
		expect(store.getActions()).toMatchSnapshot();
	});
});
