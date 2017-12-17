open MomentRe;

[@bs.raw "require('moment-timezone)"];

[@bs.send] external tz : (Moment.t, string) => Moment.t = "tz";

let convertToTimeZone = (time, timezone) => tz(momentWithUnix(time), timezone);

let convertToTimeZoneAndString = (time, timezone, format) : string =>
  convertToTimeZone(time, timezone) |> Moment.format(format);

let convertToString = (format: string) => Moment.format(format);

let setToStartOf =
    (
      start: [
        | `day
        | `hour
        | `millisecond
        | `minute
        | `month
        | `quarter
        | `second
        | `week
        | `year
      ]
    ) =>
  Moment.startOf(start);
