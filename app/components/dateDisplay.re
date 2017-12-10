open ReactNative;

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
            position(`absolute),
            height(50.),
            width(200.),
            top(2.5),
            left(5.),
            alignSelf(`center),
            backgroundColor("transparent")
          ])
      }
    )
  );

let make = (~condition, ~day, ~timestamp, ~time, ~timezone, _children) => {
  ...component,
  render: (_self) => {
    let formatString = time === "24" ? "HH:mm" : "h:mma";
    let adjustedTime =
      tz(moment(timestamp), timezone) |> Moment.format(formatString);
    let dateStamp = Moment.format("MMM DD", tz(moment(timestamp), timezone));
    let fontColor = Colors.identifyFontColor(condition);
    <View style=styles##container>
      <DateText day space=false style=Style.(style([color(fontColor)]))>
        (ReasonReact.stringToElement(adjustedTime))
      </DateText>
      <DateText day space=false style=Style.(style([color(fontColor)]))>
        (ReasonReact.stringToElement(dateStamp))
      </DateText>
    </View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~condition=jsProps##condition,
        ~day=jsProps##day,
        ~timestamp=jsProps##timestamp,
        ~time=jsProps##time,
        ~timezone=jsProps##timezone,
        [||]
      )
  );
