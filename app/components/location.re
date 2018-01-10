open BsReactNative;

type state = {reference: ref(option(ReasonReact.reactRef))};

let component = ReasonReact.reducerComponent("Location");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([height(Pt(120.)), justifyContent(Center), width(Pct(100.))]),
        "hidden": style([width(Pct(100.)), height(Pct(100.))]),
        "hiddenWrapper":
          style([
            height(Pct(100.)),
            width(Pct(100.)),
            justifyContent(Center),
            backgroundColor(Config.AppColors.red)
          ]),
        "hiddenText":
          style([
            color(Config.AppColors.lightGrey),
            marginRight(Pt(0.)),
            fontWeight(`Bold),
            fontFamily(Config.Fonts.helveticaNeue),
            textAlign(Right)
          ]),
        "dayHighTemp": style([fontSize(Float(14.)), marginTop(Pt(5.))]),
        "standaloneRowBack":
          style([
            alignItems(Center),
            backgroundColor(Config.AppColors.red),
            flex(1.),
            flexDirection(Row),
            justifyContent(SpaceBetween),
            padding(Pt(15.))
          ])
      }
    )
  );

let setRef = (theRef, {ReasonReact.state}) =>
  state.reference := Js.Nullable.to_opt(theRef);

let handleTap = (state) =>
  switch state.reference^ {
  | None => ()
  | Some(r) => ReasonReact.refToJsObj(r)##closeRow()
  };

let make =
    (
      ~name,
      ~lat,
      ~lng,
      ~index,
      ~icon,
      ~onDelete,
      ~onSelect,
      ~day: bool,
      ~id: int,
      ~activeLocation,
      _children
    ) => {
  ...component,
  initialState: () => {reference: ref(None)},
  reducer: ((), _) => ReasonReact.NoUpdate,
  render: ({state, handle}) => {
    let selected = activeLocation === index;
    let disableLeftSwipe = id === 0 ? Js.true_ : Js.false_;
    <SwipeRow.Row
      disableLeftSwipe
      ref=(handle(setRef))
      key=(string_of_int(id))
      style=styles##container
      onRowPress=(
        () => {
          onSelect(index, lat, lng);
          handleTap(state)
        }
      )
      stopRightSwipe=(-40.)
      rightOpenValue=(-40.)>
      <TouchableOpacity
        style=styles##standaloneRowBack onPress=(() => onDelete(id))>
        <Text style=Style.(style([display(None)])) />
        <View style=styles##hiddenWrapper>
          <Text style=styles##hiddenText>
            (ReasonReact.stringToElement("X"))
          </Text>
        </View>
      </TouchableOpacity>
      <LocationIcon icon day name selected />
    </SwipeRow.Row>
  }
};
