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

const expectedState = customObject => Object.assign({}, initialState, customObject);
const loadingState = expectedState({ loading: true });
const errorState = expectedState({ locationError: 'Test Error', loading: false });
const addLocationState = expectedState({
  locationError: null, loading: false, locations: [loc],
});
const getLocationsState = expectedState({
  locations: [loc],
});

describe('locations reducer', () => {
  it('should return the initial state', () => {
    expect(locations(undefined, {})).toEqual(initialState);
  });

  it('should handle LOCATION_LOADING', () => {
    expect(
      locations(initialState, {
        type: types.LOCATION_LOADING,
      })
    ).toEqual(loadingState);
  });

  it('should handle ADD_LOCATION and add a location to state', () => {
    expect(
      locations(initialState, {
        type: types.ADD_LOCATION,
        location: loc,
      })
    ).toEqual(addLocationState);
  });

  it('should handle GET_LOCATIONS and add them to state', () => {
    expect(
      locations(initialState, {
        type: types.GET_LOCATIONS,
        locations: [loc],
      })
    ).toEqual(getLocationsState);
  });

  it('should handle UPDATE_ERROR', () => {
    expect(
      locations(initialState, {
        type: types.UPDATE_ERROR,
        err: 'Test Error',
      })
    ).toEqual(errorState);
  });
});
