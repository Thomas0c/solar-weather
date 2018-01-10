open BsReactNative;

let component = ReasonReact.statelessComponent("LocationIcon");

let styles =
  StyleSheet.create(
    Style.(
      {
        "main":
          style([
            width(Pct(100.)),
            height(Pct(100.)),
            alignItems(Center),
            position(Relative),
            justifyContent(Center),
            alignSelf(Center)
          ]),
        "dayTitle":
          style([
            width(Pct(100.)),
            height(Pt(30.)),
            textAlign(Center),
            color(Config.AppColors.darkGrey),
            fontSize(Float(12.)),
            fontFamily(Config.Fonts.baskerville)
          ]),
        "image":
          style([alignSelf(Center), width(Pct(55.)), resizeMode(Contain)])
      }
    )
  );

let make = (~selected: bool, ~icon, ~day: bool, ~name, _children) => {
  ...component,
  render: (_self) => {
    let background =
      selected ?
        Colors.shadeColor(Colors.identifyBackground(icon, day), (-20)) :
        Config.AppColors.lightGrey;
    let fontColor =
      selected ? Config.AppColors.lightGrey : Config.AppColors.darkGrey;
    let iconName = selected ? icon ++ "_white" : icon;
    let icon = Icons.identifyIcon(iconName);
    let iconSource: Image.imageSource =
      switch icon {
      | None =>
        Image.(
          Required(
            Packager.require("../../../../assets/weather_icons/sunny.png")
          )
        )
      | Some(image) => image
      };
    <View
      style=Style.(
              concat([styles##main, style([backgroundColor(background)])])
            )>
      <WeatherIconWrapper>
        <Image style=styles##image source=iconSource />
      </WeatherIconWrapper>
      <Text
        style=Style.(concat([styles##dayTitle, style([color(fontColor)])]))>
        (ReasonReact.stringToElement(name))
      </Text>
    </View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~selected=jsProps##selected,
        ~icon=jsProps##icon,
        ~day=jsProps##day,
        ~name=jsProps##name,
        [||]
      )
  );
