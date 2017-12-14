open BsReactNative;

let component = ReasonReact.statelessComponent("Modal");

let styles =
  StyleSheet.create(
    Style.(
      {
        "viewWrapper":
          style([
            position(Absolute),
            top(Pt(0.)),
            left(Pt(0.)),
            width(Pct(100.)),
            height(Pct(100.)),
            backgroundColor(Config.AppColors.opaqueBlack70)
          ]),
        "viewBoxStyle":
          style([
            position(Relative),
            marginTop(Pct(15.)),
            backgroundColor(Config.AppColors.medGrey),
            height(Pct(55.)),
            width(Pct(85.)),
            alignSelf(Center),
            shadowColor(Config.AppColors.black),
            shadowOffset(~height=0., ~width=0.),
            shadowRadius(5.),
            shadowOpacity(0.8)
          ])
      }
    )
  );

let make = (~toggleView, ~visible, ~content, _children) => {
  ...component,
  render: (_self) =>
    <Modal animationType=`slide visible transparent=true>
      <TouchableHighlight
        onPress=toggleView
        underlayColor="transparent"
        style=styles##viewWrapper>
        <View />
      </TouchableHighlight>
      <View style=styles##viewBoxStyle>
        (ReasonReact.stringToElement(content))
        <CloseButton absolute=true toggle=toggleView />
      </View>
    </Modal>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~toggleView=jsProps##toggleView,
        ~visible=jsProps##visible,
        ~content=jsProps##content,
        [||]
      )
  );
