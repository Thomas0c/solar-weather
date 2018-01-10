open BsReactNative;

let component = ReasonReact.statelessComponent("WeatherConditionAlert");

let styles =
  StyleSheet.create(
    Style.(
      {
        "condition":
          style([
            fontSize(Float(24.)),
            fontFamily(Config.Fonts.helveticaNeue),
            fontWeight(`_600),
            color(Config.AppColors.whiteGrey),
            marginBottom(Pt(20.))
          ]),
        "image":
          style([
            width(Pt(20.)),
            height(Pt(20.)),
            marginTop(Pt(5.)),
            marginLeft(Pt(10.)),
            resizeMode(Contain)
          ])
      }
    )
  );

let make = (~summary, ~showAlert: bool, ~icon, ~toggleAlert, _children) => {
  ...component,
  render: (_self) => {
    let fontColor = Colors.identifyFontColor(icon);
    <Text style=Style.(concat([styles##condition, style([color(fontColor)])]))>
      (ReasonReact.stringToElement(summary))
      (
        showAlert ?
          <TouchableHighlight
            style=Style.(
                    style([width(Pt(25.)), height(Pt(25.)), marginTop(Pt(3.))])
                  )
            onPress=toggleAlert
            underlayColor="transparent">
            <Image
              style=styles##image
              source=Image.(
                       Required(
                         Packager.require("../../../../assets/alert_icon.png")
                       )
                     )
            />
          </TouchableHighlight> :
          ReasonReact.nullElement
      )
    </Text>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~summary=jsProps##summary,
        ~showAlert=jsProps##showAlert,
        ~icon=jsProps##icon,
        ~toggleAlert=jsProps##toggleAlert,
        [||]
      )
  );
