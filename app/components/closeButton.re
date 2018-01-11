open BsReactNative;

let component = ReasonReact.statelessComponent("CloseButton");

let styles =
  StyleSheet.create(
    Style.(
      {
        "buttonRelative": style([position(Relative), alignSelf(Center)]),
        "text":
          style([
            fontFamily(Config.Fonts.helveticaNeue),
            fontSize(Float(25.)),
            fontWeight(`Bold),
            color(Config.AppColors.white)
          ])
      }
    )
  );

let make = (~toggle, _children) => {
  ...component,
  render: (_self) =>
    <TouchableHighlight
      style=styles##buttonRelative underlayColor="transparent" onPress=toggle>
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
        <Text style=styles##text>
          (ReasonReact.stringToElement({j|×|j}))
        </Text>
      </View>
    </TouchableHighlight>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~toggle=jsProps##toggle, [||])
  );
