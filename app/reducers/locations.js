import moment from 'moment';
import * as types from '../actions/types.action';

export const initialState = (date) => {
  return {
    locations: [{
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
    }],
    timezone: 'America/New_York',
    locationError: null,
    loading: false,
    latestCollectiveUpdate: date || moment().subtract(1, 'day'),
  };
};

export default function locations(state = initialState(), action = {}) {
  switch (action.type) {
    case types.LOCATION_LOADING_OFF:
      return {
        ...state,
        loading: false,
      };
    case types.FETCH_LOCATIONS:
    case types.LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
        locationError: null,
        loading: false,
      };
    case types.SET_LOCATION: // eslint-disable-line
      const currentLocation = Object.assign(state.locations[action.index], action.location);
      const locs = state.locations;
      locs[action.index] = currentLocation;
      return {
        ...state,
        locations: locs,
        locationError: null,
        loading: false,
      };
    case types.ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations.filter(x => x.id !== 1), action.location],
        locationError: null,
        loading: false,
      };
    case types.FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.locations,
        locationError: null,
        latestCollectiveUpdate: moment(),
        loading: false,
      };
    case types.DELETE_LOCATION: // eslint-disable-line
      return {
        ...state,
        locations: [...state.locations.filter(x => x.id !== action.id)],
        locationError: null,
        loading: false,
      };
    case types.FETCH_LOCATIONS_FAILURE:
    case types.ADD_INDEX_LOCATION_ERROR:
    case types.ADD_LOCATION_ERROR:
    case types.SET_ACTIVE_LOCATION_ERROR:
    case types.UPDATE_ERROR:
      return {
        ...state,
        locationError: action.err,
        loading: false,
      };
    default:
      return state;
  }
}
