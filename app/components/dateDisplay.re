open BsReactNative;

let component = ReasonReact.statelessComponent("DateDisplay");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(Absolute),
            height(Pt(50.)),
            width(Pct(100.)),
            top(Pct(2.5)),
            left(Pct(4.)),
            backgroundColor("transparent")
          ])
      }
    )
  );

let make = (~condition, ~timestamp, ~time, ~timezone, _children) => {
  ...component,
  render: _self => {
    let formatString = time === "24" ? "H:mm" : "h:mm a";
    let time = Time.convertToTimezone(timestamp, timezone);
    let adjustedTime = time |> Time.convertToString(formatString);
    let dateStamp = time |> Time.convertToString("LLL dd");
    <View style=styles##container>
      <DateText space=false condition text=adjustedTime />
      <DateText space=false condition text=dateStamp />
    </View>;
  }
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~condition=jsProps##condition,
      ~timestamp=jsProps##timestamp,
      ~time=jsProps##time,
      ~timezone=jsProps##timezone,
      [||]
    )
  );
