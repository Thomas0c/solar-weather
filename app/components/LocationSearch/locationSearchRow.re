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
            width(Pct(90.)),
            paddingBottom(Pt(10.)),
            paddingTop(Pt(10.)),
            alignSelf(Center),
            flexDirection(Column),
            alignItems(FlexStart)
          ]),
        "text":
          style([
            flex(1.),
            color(Config.AppColors.black),
            fontFamily(Config.Fonts.baskerville),
            fontSize(Float(windowWidth /. 26.)),
            paddingBottom(Pt(5.))
          ]),
        "secondaryText":
          style([
            flex(1.),
            color(Config.AppColors.grey),
            fontFamily(Config.Fonts.helveticaNeue),
            fontSize(Float(windowWidth /. 30.))
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
          (ReasonReact.stringToElement(primaryText))
        </Text>
        <Text style=styles##secondaryText>
          (ReasonReact.stringToElement(secondaryText))
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
