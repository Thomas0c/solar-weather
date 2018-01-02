open BsReactNative;

type item = {. "temperature": float, "icon": string, "time": int};

type retainedProps = {
  openHours: Js.boolean,
  updateLocations: unit => unit,
  locationName: string,
  forecast: array(item),
  timeType: string,
  timezone: string,
  unit: string
};

type state = {
  bottomAnim: Animated.Value.t,
  forecast: array(item),
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

let keyExtractor = (_, index) => string_of_int(index);

let renderItem = (unit, timeType, timezone) =>
  FlatList.renderItem(
    ({item}) =>
      <HourItem
        unit
        timeType
        timezone
        temperature=item##temperature
        icon=item##icon
        time=item##time
      />
  );

let handleClick = (state) =>
  switch state.scrollRef^ {
  | None => ()
  | Some(r) => ReasonReact.refToJsObj(r)##scrollToOffset(0)
  };

let make =
    (
      ~openHours: Js.boolean,
      ~updateLocations: unit => unit,
      ~timeType: string,
      ~unit: string,
      ~timezone: string,
      ~locationName: string,
      ~forecast,
      _children
    ) => {
  ...component,
  initialState: () => {
    forecast: [||],
    bottomAnim: Animated.Value.create(-. windowHeight /. 10.),
    scrollRef: ref(None)
  },
  retainedProps: {
    openHours,
    updateLocations,
    locationName,
    forecast,
    timeType,
    unit,
    timezone
  },
  reducer: ((), _) => ReasonReact.NoUpdate,
  willReceiveProps: ({retainedProps, state}) =>
    if (retainedProps.openHours !== openHours) {
      if (Array.length(forecast) === 0) {
        updateLocations()
      };
      let value =
        Js.to_bool(openHours) ? windowHeight /. 10. : -. windowHeight /. 10.;
      Animation.animate(state.bottomAnim, value);
      state
    } else if (retainedProps.locationName !== locationName) {
      handleClick(state);
      state
    } else if (retainedProps.forecast !== forecast) {
      let filteredForecast =
        forecast |> Js.Array.filter((item) => Time.isAfterCurrent(item##time));
      {...state, forecast: filteredForecast}
    } else {
      state
    },
  render: ({state, handle}) =>
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
        data=state.forecast
        renderItem=(renderItem(unit, timeType, timezone))
      />
    </Animated.View>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~openHours=jsProps##openHours,
        ~updateLocations=jsProps##updateLocations,
        ~locationName=jsProps##locationName,
        ~forecast=jsProps##forecast,
        ~timeType=jsProps##timeType,
        ~timezone=jsProps##timezone,
        ~unit=jsProps##unit,
        [||]
      )
  );
