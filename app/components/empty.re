open BsReactNative;

let component = ReasonReact.statelessComponent("Empty");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            justifyContent(Center),
            alignItems(Center),
            alignSelf(Center),
            width(Pct(90.))
          ]),
        "button":
          style([position(Relative), width(Pt(40.)), marginTop(Pt(10.))]),
        "image":
          style([
            alignSelf(Center),
            width(Pct(100.)),
            height(Pt(30.)),
            resizeMode(Contain)
          ])
      }
    )
  );

let make = (~onPress, ~connected: Js.boolean, _children) => {
  ...component,
  render: (_self) => {
    let isConnected = Js.to_bool(connected);
    <View style=styles##container>
      <Text
        style=Style.(
                style([
                  textAlign(Center),
                  color(Config.AppColors.white),
                  backgroundColor(
                    isConnected ? "transparent" : Config.AppColors.red
                  ),
                  padding(Pt(15.)),
                  width(Pct(100.))
                ])
              )>
        (
          ReasonReact.stringToElement(
            isConnected ?
              "Add a location or enable location services" :
              "No internet connection. \nPlease connect in order to add a location."
          )
        )
      </Text>
      (
        isConnected ?
          <TouchableOpacity style=styles##button onPress>
            <Image
              style=styles##image
              source=Image.(
                       Required(
                         Packager.require("../../../../assets/addIcon.png")
                       )
                     )
            />
          </TouchableOpacity> :
          ReasonReact.nullElement
      )
    </View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(~onPress=jsProps##onPress, ~connected=jsProps##connected, [||])
  );
