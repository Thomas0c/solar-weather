import Realm from 'realm';

class Alert extends Realm.Object {}
Alert.schema = {
  name: 'Alert',
  properties: {
    title: 'string',
    time: 'int',
    severity: 'string',
    expires: 'int',
    description: 'string',
    uri: 'string',
  },
};

export default Alert;
