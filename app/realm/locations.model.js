import Realm from 'realm';
import Alert from './alert.model';

class Locations extends Realm.Object {}
Locations.schema = {
  name: 'Location',
  primaryKey: 'id',
  properties: {
    id: 'int',
    timezone: 'string',
    daily: 'Daily',
    name: 'string',
    hourly: 'Hourly',
    currently: 'Currently',
    alerts: { type: 'list', objectType: 'Alert' },
    lat: 'float',
    lng: 'float',
    last_updated: 'date',
    created_at: 'date',
  },
};

export default Locations;
