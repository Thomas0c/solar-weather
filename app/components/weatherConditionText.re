open BsReactNative;

type state = {fadeAnim: Animated.Value.t};

type retainedProps = {
  showDetails: Js.boolean,
  text: string,
  condition: string
};

let component =
  ReasonReact.reducerComponentWithRetainedProps("WeatherConditionText");

let make =
    (~text: string, ~condition: string, ~showDetails: Js.boolean, _children) => {
  ...component,
  initialState: () => {fadeAnim: Animated.Value.create(1.)},
  retainedProps: {text, condition, showDetails},
  reducer: ((), _) => ReasonReact.NoUpdate,
  willReceiveProps: ({retainedProps, state}) =>
    if (retainedProps.showDetails !== showDetails) {
      let nextValue = Js.to_bool(showDetails) ? 1. : 0.;
      Animation.animate(state.fadeAnim, nextValue);
      state
    } else {
      state
    },
  render: ({state}) =>
    <Animated.View style=Style.(style([opacity(Animated(state.fadeAnim))]))>
      <DateText space=true text condition />
    </Animated.View>
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
