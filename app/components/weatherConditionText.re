open BsReactNative;

type retainedProps = {
  text: string,
  condition: string,
  showDetails: Js.boolean
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("WeatherConditionText");

let make =
    (~text: string, ~condition: string, ~showDetails: Js.boolean, _children) => {
  ...component,
  retainedProps: {text, condition, showDetails},
  render: (_self) => {
    let detectToValue = (value) =>
      Js.to_bool(value) ?
        Animated.Value.create(0.) : Animated.Value.create(1.);
    let opacityValue = detectToValue(showDetails);
    <Animated.View style=Style.(style([opacity(Animated(opacityValue))]))>
      <DateText space=true text condition />
    </Animated.View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~text=jsProps##text,
        ~condition=jsProps##condition,
        ~showDetails=jsProps##showDetails,
        [||]
      )
  );
