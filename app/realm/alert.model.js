class Alert {}
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
