import mockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { deleteLocationFromStore, addNewLocation } from '../../app/actions/locations.action';
import { loc } from '../config';
import { deleteRealm } from '../../app/realm';

const mockApi = new MockAdapter(axios);
// Mock request to/from DarkSky
mockApi.onGet(/\/forecast\//).reply(200, loc);

describe('locations store', () => {
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

  const store = mockStore();
  it('should handle deleteLocationFromStore', async () => {
    await store.dispatch(deleteLocationFromStore(0));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should handle faulty location by returning error', async () => {
    await store.dispatch(addNewLocation({ lat: 0.0, lng: 0.0 }, 1));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should handle correct location by returning success', async () => {
    await store.dispatch(addNewLocation({ lat: 35.689487, lng: 139.691706, name: 'Tokyo' }, 0));
    expect(store.getActions()).toMatchSnapshot();
  });
});
