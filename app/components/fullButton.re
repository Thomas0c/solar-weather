open BsReactNative;

let component = ReasonReact.statelessComponent("FullButton");

let styles =
  StyleSheet.create(
    Style.(
      {
        "button":
          style([
            position(Relative),
            alignSelf(Center),
            width(Pct(100.)),
            marginBottom(Pt(20.))
          ]),
        "text":
          style([
            fontFamily(Config.Fonts.helveticaNeue),
            fontSize(Float(14.)),
            fontWeight(`Bold),
            color(Config.AppColors.white)
          ])
      }
    )
  );

let make = (~toggle, ~text: string, _children) => {
  ...component,
  render: (_self) =>
    <TouchableHighlight
      style=styles##button underlayColor="transparent" onPress=toggle>
      <View
        style=Style.(
                style([
                  width(Pct(90.)),
                  height(Pt(40.)),
                  alignSelf(Center),
                  backgroundColor(Config.AppColors.actionColor),
                  borderWidth(0.),
                  alignItems(Center),
                  justifyContent(Center)
                ])
              )>
        <Text style=styles##text> (ReasonReact.stringToElement(text)) </Text>
      </View>
    </TouchableHighlight>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~toggle=jsProps##toggle, ~text=jsProps##text, [||])
  );
