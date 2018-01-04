export default class Realm {
  constructor(params) {
    this.schema = {};
    this.callbackList = [];
    this.data = {};
    params.schema.forEach((schema) => {
      this.data[schema.name] = {};
    });
    params.schema.forEach((schema) => {
      this.schema[schema.name] = schema;
    });
    this.lastLookedUpModel = null;
  }

  objects(schemaName) {
    this.lastLookedUpModel = schemaName;
    const objects = Object.values(this.data[schemaName]);
    objects.filtered = this.filtered ? this.filtered : () => objects;
    objects.sorted = () => objects.sort();
    objects.addListener = this.addListener.bind(this, 'change');
    return objects;
  }

  write(fn) {
    fn();
    this.callbackList.forEach((cb) => { cb(); });
  }

  create(schemaName, object) {
    const modelObject = object;
    const properties = this.schema[schemaName].schema.properties;
    Object.keys(properties).forEach((key) => {
      if (modelObject[key] && modelObject[key].model) {
        this.data[modelObject[key].model][modelObject[key].id] = modelObject[key];
      } else if (modelObject[key] && modelObject[key].length && modelObject[key][0].model) {
        modelObject[key].forEach((obj) => {
          this.data[modelObject[key][0].model][obj.id] = obj;
        });
        modelObject[key].filtered = this.filtered ? this.filtered : () => modelObject[key];
        modelObject[key].sorted = () => modelObject[key].sort();
      } else if (modelObject[key] === undefined) {
        if (typeof properties[key] === 'object' && properties[key].optional) {
          modelObject[key] = null;
        }
        if (typeof properties[key] === 'object' && properties[key].type === 'list') {
          modelObject[key] = [];
          modelObject[key].filtered = () => [];
          modelObject[key].sorted = () => [];
        }
      }
    });

    this.data[schemaName][modelObject.id] = modelObject;
    return modelObject;
  }

  objectForPrimaryKey(model, id) {
    this.lastLookedUpModel = model;
    return this.data[model][id];
  }

  delete(object) {
    if (this.lastLookedUpModel) {
      if (Array.isArray(object)) {
        object.forEach((item) => {
          delete this.data[this.lastLookedUpModel][item.id];
        });
      }
      delete this.data[this.lastLookedUpModel][object.id];
    }
  }

  deleteAll() {
    this.data = {};
    Object.keys(this.schema).forEach((key) => {
      this.data[this.schema[key].name] = {};
    });
  }

  addListener(event, callback) {
    this.callbackList.push(callback);
  }

  prepareData(schemaName, objects) {
    objects.forEach((object) => {
      this.create(schemaName, object);
    });
  }
}

Realm.Object = class Object {
  isValid() { return true; }
};
