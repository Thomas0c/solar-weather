open BsReactNative;

let component = ReasonReact.statelessComponent("CloseButton");

let styles =
  StyleSheet.create(
    Style.(
      {
        "button":
          style([position(Absolute), bottom(Pt((-20.))), alignSelf(Center)]),
        "buttonRelative":
          style([position(Relative), alignSelf(Center), marginTop(Pt(30.))]),
        "text":
          style([
            fontFamily("avenir"),
            fontSize(Float(16.)),
            fontWeight(`_700),
            color(Config.AppColors.white)
          ]),
        "image": style([width(Pt(120.)), height(Pt(80.)), resizeMode(Contain)])
      }
    )
  );

let make = (~toggle, ~absolute, _children) => {
  ...component,
  render: (_self) =>
    <TouchableHighlight
      style=(absolute ? styles##button : styles##buttonRelative)
      underlayColor="transparent"
      onPress=toggle>
      <View
        style=Style.(
                style([
                  borderRadius(20.),
                  overflow(Hidden),
                  width(Pt(40.)),
                  height(Pt(40.)),
                  backgroundColor(Config.AppColors.red),
                  borderWidth(0.),
                  alignItems(Center),
                  justifyContent(Center)
                ])
              )>
        <Text style=styles##text> (ReasonReact.stringToElement("X")) </Text>
      </View>
    </TouchableHighlight>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(~toggle=jsProps##toggle, ~absolute=jsProps##absolute, [||])
  );
