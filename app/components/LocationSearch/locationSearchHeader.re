open BsReactNative;

let component = ReasonReact.statelessComponent("LocationSearchHeader");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            flex(1.),
            width(Pct(90.)),
            flexDirection(Row),
            alignItems(Center),
            alignSelf(Center),
            backgroundColor(Config.AppColors.medGrey),
            borderBottomWidth(2.),
            height(Pt(45.)),
            marginBottom(Pt(10.)),
            borderBottomColor(Config.AppColors.darkGrey)
          ]),
        "input":
          style([
            height(Pt(50.)),
            color(Config.AppColors.darkGrey),
            flex(1.),
            fontSize(Float(16.)),
            fontFamily("HelveticaNeue")
          ])
      }
    )
  );

let make = (~onChange, _children) => {
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
        maxLength=40
        autoCorrect=false
        onChangeText=onChange
      />
    </View>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~onChange=jsProps##onChange, [||])
  );
