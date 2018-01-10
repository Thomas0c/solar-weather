open BsReactNative;

let component = ReasonReact.statelessComponent("LocationSearchRow");

let windowWidth = float_of_int(Dimensions.get(`window)##width);

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            flex(1.),
            padding(Pt(9.)),
            flexDirection(Row),
            alignItems(Center)
          ]),
        "text":
          style([
            color(Config.AppColors.darkGrey),
            fontFamily(Config.Fonts.baskerville),
            marginLeft(Pt(12.)),
            fontSize(Float(windowWidth /. 22.))
          ])
      }
    )
  );

let make = (~id, ~handleTap, ~secondaryText, ~primaryText, _children) => {
  ...component,
  render: (_self) =>
    <TouchableOpacity onPress=(() => handleTap(id))>
      <View style=styles##container>
        <Text style=styles##text>
          (ReasonReact.stringToElement(primaryText ++ ", " ++ secondaryText))
        </Text>
      </View>
    </TouchableOpacity>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~handleTap=jsProps##handleTap,
        ~secondaryText=jsProps##secondaryText,
        ~id=jsProps##id,
        ~primaryText=jsProps##primaryText,
        [||]
      )
  );
