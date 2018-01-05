import * as types from '../../app/actions/types.action';
import locations, { initialState } from '../../app/reducers/locations';
import { loc } from '../config';

const date = new Date(1515083977 * 1000);
const state = initialState(date);

describe('locations reducer', () => {
  beforeAll(() => {
    jest.genMockFromModule('realm');
  });

  it('should return the initial state', () => {
    expect(locations(state, {})).toMatchSnapshot();
  });

  it('should handle LOCATION_LOADING', () => {
    expect(
      locations(state, {
        type: types.LOCATION_LOADING,
      })
    ).toMatchSnapshot();
  });

  it('should handle ADD_LOCATION and add a location to state', () => {
    expect(
      locations(state, {
        type: types.ADD_LOCATION,
        location: loc,
      })
    ).toMatchSnapshot();
  });

  it('should handle GET_LOCATIONS and add them to state', () => {
    expect(
      locations(state, {
        type: types.GET_LOCATIONS,
        locations: [loc],
      })
    ).toMatchSnapshot();
  });

  it('should handle UPDATE_ERROR', () => {
    expect(
      locations(state, {
        type: types.UPDATE_ERROR,
        err: 'Test Error',
      })
    ).toMatchSnapshot();
  });
});
