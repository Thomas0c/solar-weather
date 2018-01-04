import * as types from '../../app/actions/types.action';
import locations, { initialState } from '../../app/reducers/locations';

const loc = {
  id: 1,
  lat: 0.0,
  lng: 0.0,
  currently: {
    icon: '',
    precipProbability: 0.00,
    precipType: '',
    temperature: 0.00,
    apparentTemperature: 0.00,
    humidity: 0,
    summary: '',
  },
  daily: {
    data: [],
  },
  hourly: {
    data: [],
  },
  alerts: [],
};

const date = new Date(1515083977 * 1000);
const state = initialState(date);

describe('locations reducer', () => {
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
