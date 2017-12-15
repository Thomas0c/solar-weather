open BsReactNative;

open MomentRe;

[@bs.raw "require('moment-timezone)"];

[@bs.send] external tz : (Moment.t, string) => Moment.t = "tz";

let component = ReasonReact.statelessComponent("DateDisplay");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(Absolute),
            height(Pt(50.)),
            width(Pt(200.)),
            top(Pct(2.5)),
            left(Pct(5.)),
            alignSelf(Center),
            backgroundColor("transparent")
          ])
      }
    )
  );

let make = (~condition, ~timestamp, ~time, ~timezone, _children) => {
  ...component,
  render: (_self) => {
    let formatString = time === "24" ? "HH:mm" : "h:mma";
    let adjustedTime = tz(timestamp, timezone) |> Moment.format(formatString);
    let dateStamp = Moment.format("MMM DD", tz(timestamp, timezone));
    <View style=styles##container>
      <DateText space=false condition text=adjustedTime />
      <DateText space=false condition text=dateStamp />
    </View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~condition=jsProps##condition,
        ~timestamp=jsProps##timestamp,
        ~time=jsProps##time,
        ~timezone=jsProps##timezone,
        [||]
      )
  );
