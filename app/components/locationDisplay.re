open BsReactNative;

let component = ReasonReact.statelessComponent("LocationDisplay");

let windowHeight = float_of_int(Dimensions.get(`window)##height) /. 10.;

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(Absolute),
            bottom(Pt(0.)),
            left(Pt(0.)),
            width(Pct(100.)),
            height(Pt(windowHeight)),
            alignItems(Center),
            justifyContent(Center),
            backgroundColor(Config.AppColors.white),
            zIndex(1)
          ]),
        "touch":
          style([
            width(Pct(100.)),
            position(Relative),
            alignItems(Center),
            alignSelf(Center),
            height(Pt(windowHeight)),
            justifyContent(FlexStart)
          ]),
        "text":
          style([
            width(Pct(100.)),
            height(Pct(100.)),
            fontSize(Float(18.)),
            paddingTop(Pt(windowHeight /. 2. -. 12.)),
            alignItems(Center),
            justifyContent(Center),
            textAlign(Center),
            fontFamily("Baskerville"),
            alignSelf(Center)
          ]),
        "shadow":
          style([
            width(Pct(100.)),
            height(Pt(2.)),
            shadowColor(Config.AppColors.black),
            shadowOpacity(0.2),
            shadowRadius(2.),
            shadowOffset(~height=(-2.), ~width=0.),
            position(Absolute),
            top(Pt(0.)),
            backgroundColor(Config.AppColors.white),
            zIndex((-1))
          ])
      }
    )
  );

let make = (~locationName, ~onPress, ~loading, _children) => {
  ...component,
  render: (_self) => {
    let currentLocation =
      locationName !== "" && ! loading ? locationName : "Loading...";
    <View style=styles##container>
      <View style=styles##shadow>
        <TouchableHighlight
          style=styles##touch onPress underlayColor="transparent">
          <Text style=styles##text>
            (ReasonReact.stringToElement(currentLocation))
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~locationName=jsProps##locationName,
        ~onPress=jsProps##onPress,
        ~loading=jsProps##loading,
        [||]
      )
  );