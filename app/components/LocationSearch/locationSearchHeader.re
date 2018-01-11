open BsReactNative;

let component = ReasonReact.statelessComponent("LocationSearchHeader");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            width(Pct(90.)),
            flexDirection(Row),
            alignItems(Center),
            alignSelf(Center),
            backgroundColor("transparent"),
            height(Pt(45.)),
            marginTop(Pt(10.)),
            marginBottom(Pt(10.))
          ]),
        "input":
          style([
            width(Pct(88.)),
            height(Pt(50.)),
            color(Config.AppColors.darkGrey),
            fontSize(Float(16.)),
            borderBottomWidth(2.),
            fontFamily(Config.Fonts.helveticaNeue),
            borderBottomColor(Config.AppColors.darkGrey)
          ])
      }
    )
  );

let make = (~onChange, ~toggle, _children) => {
  ...component,
  render: (_self) =>
    <View style=styles##container>
      <TextInput
        style=styles##input
        keyboardAppearance=`dark
        placeholder="Enter City Name"
        placeholderTextColor=Config.AppColors.grey
        selectionColor=Config.AppColors.darkGrey
        spellCheck=false
        autoFocus=true
        underlineColorAndroid="transparent"
        maxLength=40
        autoCorrect=false
        onChangeText=onChange
      />
      <CloseButton toggle />
    </View>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(~onChange=jsProps##onChange, ~toggle=jsProps##toggle, [||])
  );
