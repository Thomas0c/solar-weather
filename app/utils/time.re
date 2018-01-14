open BsLuxon;

let convertToTimezone = (time, timezone) =>
  DateTime.(local(time) |> setZone(timezone));

let convertUnixToTimezone = (epoch: float, timezone) =>
  DateTime.(fromMillis(epoch) |> setZone(timezone));

let convertToString = (format: string) => DateTime.toFormat(format);

let convertToTimezoneAndString = (time, timezone, format) =>
  convertUnixToTimezone(time, timezone) |> convertToString(format);

let isAfterCurrent = (epoch: float) =>
  DateTime.fromMillis(epoch) > DateTime.local();

let isDaylight = (timezone: string) => {
  let time = DateTime.(local() |> setZone(timezone));
  time##hour > 6 && time##hour < 18;
};

let setToTime = (time, h: int) =>
  DateTime.(local(time, ~hour=h) |> startOf(`hour));

let setToStartOf = start => DateTime.startOf(start);
