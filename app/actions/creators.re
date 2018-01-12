let triggerAction = (type_: string, ~obj=?, ()) =>
  switch obj {
  | Some(o) => Js.Obj.assign({"type": type_}, o)
  | None => [%obj {"type": type_}]
  };

let locationLoading = () => triggerAction(Actions.locationLoading, ());

let locationLoadingDone = () => triggerAction(Actions.locationLoadingOff, ());

let updateTime = (timeType: string, timeIndex: int) =>
  triggerAction(Actions.setTimeType, ~obj=[%obj {timeType, timeIndex}], ());

let locationError = (err: string) =>
  triggerAction(Actions.addLocationError, ~obj=[%obj {err: err}], ());

let setLocation = (index: int, location) =>
  triggerAction(Actions.setLocation, ~obj=[%obj {index, location}], ());

let setLocationSettings = (index) =>
  triggerAction(Actions.setActiveLocation, ~obj=[%obj {index: index}], ());

let addIndex = (location) =>
  triggerAction(
    Actions.addIndexLocation,
    ~obj=[%obj {location: location}],
    ()
  );

let addLocation = (location) =>
  triggerAction(Actions.addLocation, ~obj=[%obj {location: location}], ());

let updateError = (err) =>
  triggerAction(Actions.updateError, ~obj=[%obj {err: err}], ());

let fetchAllLocations = () => triggerAction(Actions.fetchLocations, ());

let fetchAllLocationsSuccess = (locations) =>
  triggerAction(
    Actions.fetchLocationsSuccess,
    ~obj=[%obj {locations: locations}],
    ()
  );

let fetchAllLocationsFailure = (err) =>
  triggerAction(Actions.fetchLocationsFailure, ~obj=[%obj {err: err}], ());

let getLocation = (locations) =>
  triggerAction(Actions.getLocations, ~obj=[%obj {locations: locations}], ());

let removeLocation = (id) =>
  triggerAction(Actions.deleteLocation, ~obj=[%obj {id: id}], ());
