open ReactNative;

let component = ReasonReact.statelessComponent("CloseButton");
let styles =
  StyleSheet.create(
    Style.(
      {
        "button":
          style([
            position(`absolute),
            bottom (-20.),
            alignSelf(`center),
          ]),
        "buttonRelative":
          style([
            position(`relative),
            alignSelf(`center),
            marginTop(30.),
          ]),
        "text":
          style([
            fontFamily("avenir"),
            fontSize(16.),
            fontWeight(`_700),
            color("#FFF"),
          ]),
        "image":
          style([
            width(120.),
            height(80.),
            resizeMode(`contain),
          ])
      }
    )
  );

let make = (~toggle, ~absolute, ~appColors, _children) => {
  ...component,
  render: (_self) => {
    <TouchableHighlight
      style=(absolute ? styles##button : styles##buttonRelative)
      underlayColor="transparent"
      onPress=toggle
    >
      <View style=Style.(style([
        borderRadius(20.),
        overflow(`hidden),
        width(40.),
        height(40.),
        backgroundColor(appColors##red),
        borderWidth(0.),
        alignItems(`center),
        justifyContent(`center),
      ]))
    >
      <Text style=styles##text> {ReasonReact.stringToElement("X")} </Text>
    </View>
    </TouchableHighlight>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(
      ~toggle=jsProps##toggle,
      ~appColors=jsProps##appColors,
      ~absolute=jsProps##absolute,
      [||]
    )
  );
