open ReactNative;

let component = ReasonReact.statelessComponent("Background");

let windowWidth = float_of_int(Dimensions.get(`window)##width);

let windowHeight = float_of_int(Dimensions.get(`window)##height);

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(`absolute),
            top(0.),
            left(0.),
            width(windowWidth),
            height(windowHeight),
            alignSelf(`stretch),
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
