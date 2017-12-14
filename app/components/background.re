open BsReactNative;

let component = ReasonReact.statelessComponent("Background");

let windowWidth = float_of_int(Dimensions.get(`window)##width);

let windowHeight = float_of_int(Dimensions.get(`window)##height);

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(Absolute),
            top(Pt(0.)),
            left(Pt(0.)),
            width(Pt(windowWidth)),
            height(Pt(windowHeight)),
            alignSelf(Stretch),
            backgroundColor(Config.AppColors.medGreyAlt)
          ])
      }
    )
  );

let make = (~condition, ~day, _children) => {
  ...component,
  render: (_self) =>
    <View style=styles##container> <ColorBackground condition day /> </View>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~condition=jsProps##condition, ~day=jsProps##day, [||])
  );
