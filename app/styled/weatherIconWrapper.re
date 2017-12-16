open BsReactNative;

let component = ReasonReact.statelessComponent("WeatherIconWrapper");

let make = (children) => {
  ...component,
  render: (_self) =>
    <View
      style=Style.(
              style([
                height(Pct(50.)),
                width(Pct(50.)),
                alignItems(Center),
                justifyContent(Center)
              ])
            )>
      ...children
    </View>
};

let default = ReasonReact.wrapReasonForJs(~component, (jsProps) => make([||]));
