open BsReactNative;

type state = {topAnim: Animated.Value.t};

type retainedProps = {
  error: string,
  displayError: Js.boolean,
  connected: Js.boolean
};

let component = ReasonReact.reducerComponentWithRetainedProps("Toast");

let windowWidth = float_of_int(Dimensions.get(`window)##width);

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(Absolute),
            zIndex(3),
            left(Pt(0.)),
            padding(Pt(15.)),
            backgroundColor(Config.AppColors.red),
            width(Pt(windowWidth)),
            height(Pt(50.))
          ]),
        "text":
          style([
            textAlign(Center),
            color(Config.AppColors.white),
            fontWeight(`_700),
            fontFamily("HelveticaNeue")
          ])
      }
    )
  );

let wrapperComponent = (state, children) =>
  <Animated.View
    style=Style.(
            concat([styles##container, style([top(Animated(state.topAnim))])])
          )>
    children
  </Animated.View>;

let make =
    (
      ~error: string,
      ~displayError: Js.boolean,
      ~connected: Js.boolean,
      _children
    ) => {
  ...component,
  initialState: () => {topAnim: Animated.Value.create((-100.))},
  retainedProps: {error, displayError, connected},
  reducer: ((), _) => ReasonReact.NoUpdate,
  willReceiveProps: ({state, retainedProps}) =>
    if (Js.to_bool(displayError)
        && Js.to_bool(retainedProps.displayError) !== true) {
      Animation.animate(state.topAnim, 0.);
      Js.Global.setTimeout(
        () => Animation.animate(state.topAnim, (-100.)),
        5000
      )
      |> ignore;
      state
    } else if (! Js.to_bool(displayError)) {
      Animation.animate(state.topAnim, (-100.));
      state
    } else {
      state
    },
  render: ({state}) => {
    let errorComponent: ReasonReact.reactElement =
      switch (Js.to_bool(connected), Js.to_bool(displayError)) {
      | (true, false) => ReasonReact.nullElement
      | (false, false) =>
        wrapperComponent(
          state,
          <Text style=styles##text>
            (ReasonReact.stringToElement("No Connection"))
          </Text>
        )
      | (true, true) =>
        wrapperComponent(
          state,
          <Text style=styles##text>
            (ReasonReact.stringToElement(error))
          </Text>
        )
      | _ => ReasonReact.nullElement
      };
    errorComponent
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~error=jsProps##error,
        ~displayError=jsProps##displayError,
        ~connected=jsProps##connected,
        [||]
      )
  );
