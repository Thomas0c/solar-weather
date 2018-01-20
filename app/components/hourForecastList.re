open BsReactNative;

type retainedProps = {
  openHours: Js.boolean,
  locationName: string,
  timeType: string,
  timezone: string,
  unit: string
};

type state = {
  bottomAnim: Animated.Value.t,
  scrollRef: ref(option(ReasonReact.reactRef))
};

let windowHeight = float_of_int(Dimensions.get(`window)##height);

let component =
  ReasonReact.reducerComponentWithRetainedProps("HourForecastList");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            height(Pct(100.)),
            backgroundColor(Config.AppColors.opaqueBlack)
          ]),
        "view":
          style([
            position(Absolute),
            width(Pct(100.)),
            height(Pct(20.)),
            left(Pt(0.)),
            flex(1.)
          ])
      }
    )
  );

let setSectionRef = (theRef, {ReasonReact.state}) =>
  state.scrollRef := Js.Nullable.to_opt(theRef);

let keyExtractor = (item, _) => string_of_float(item##time *. 1000.);

let renderItem = (unit, timeType, timezone) =>
  FlatList.renderItem(({item}) =>
    <HourItem
      unit
      timeType
      timezone
      temperature=item##temperature
      icon=item##icon
      time=item##time
    />
  );

let handleClick = state =>
  switch state.scrollRef^ {
  | None => ()
  | Some(r) => ReasonReact.refToJsObj(r)##scrollToOffset(0)
  };

let make =
    (
      ~openHours: Js.boolean,
      ~timeType: string,
      ~unit: string,
      ~timezone: string,
      ~locationName: string,
      ~forecast,
      _children
    ) => {
  ...component,
  initialState: () => {
    bottomAnim: Animated.Value.create(-. windowHeight /. 10.),
    scrollRef: ref(None)
  },
  retainedProps: {
    openHours,
    locationName,
    timeType,
    unit,
    timezone
  },
  reducer: ((), _) => ReasonReact.NoUpdate,
  willReceiveProps: ({retainedProps, state}) =>
    if (retainedProps.openHours !== openHours) {
      let value =
        Js.to_bool(openHours) ? windowHeight /. 10. : -. windowHeight /. 10.;
      Animation.animate(state.bottomAnim, value);
      state;
    } else if (retainedProps.locationName !== locationName) {
      handleClick(state);
      state;
    } else {
      state;
    },
  render: ({state, handle}) => {
    let filteredForecast =
      forecast
      |> Js.Array.filter(item => Time.isAfterCurrent(item##time *. 1000.));
    <Animated.View
      style=Style.(
              concat([
                styles##view,
                style([bottom(Animated(state.bottomAnim))])
              ])
            )>
      <FlatList
        ref=(handle(setSectionRef))
        horizontal=true
        keyExtractor
        pagingEnabled=true
        style=Style.(concat([styles##container, style([width(Pct(100.))])]))
        showsHorizontalScrollIndicator=false
        bounces=false
        data=filteredForecast
        renderItem=(renderItem(unit, timeType, timezone))
      />
    </Animated.View>;
  }
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~openHours=jsProps##openHours,
      ~locationName=jsProps##locationName,
      ~forecast=jsProps##forecast,
      ~timeType=jsProps##timeType,
      ~timezone=jsProps##timezone,
      ~unit=jsProps##unit,
      [||]
    )
  );
