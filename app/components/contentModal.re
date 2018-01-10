open BsReactNative;

let component = ReasonReact.statelessComponent("ContentModal");

let styles =
  StyleSheet.create(
    Style.(
      {
        "modalWrapper":
          style([
            backgroundColor("transparent"),
            paddingBottom(Pt(20.)),
            alignSelf(Center),
            height(Pct(55.)),
            top(Pt(0.)),
            width(Pct(85.)),
            minHeight(Pt(300.)),
            position(Relative)
          ]),
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
            marginTop(Pct(15.)),
            backgroundColor(Config.AppColors.medGrey),
            height(Pct(85.)),
            width(Pct(100.)),
            alignSelf(Center),
            shadowColor(Config.AppColors.black),
            shadowOffset(~height=0., ~width=0.),
            shadowRadius(5.),
            shadowOpacity(0.8)
          ])
      }
    )
  );

let make =
    (~toggleView, ~visible, ~content: ReasonReact.reactElement, _children) => {
  ...component,
  render: (_self) =>
    <Modal
      onRequestClose=toggleView animationType=`slide visible transparent=true>
      <TouchableHighlight
        onPress=(() => toggleView())
        underlayColor="transparent"
        style=styles##viewWrapper>
        <View />
      </TouchableHighlight>
      <View style=styles##modalWrapper>
        <View style=styles##viewBoxStyle> content </View>
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
