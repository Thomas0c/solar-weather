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
            justifyContent(Center),
            alignSelf(Center)
          ]),
        "dayTitle": style([fontSize(Float(16.)), fontFamily("Baskerville")]),
        "image":
          style([
            alignSelf(Center),
            marginTop(Pct(2.)),
            width(Pct(55.)),
            resizeMode(Contain)
          ])
      }
    )
  );

let make = (~selected: Js.boolean, ~icon, ~day, ~name, _children) => {
  ...component,
  render: (_self) => {
    let reSelected = Js.to_bool(selected);
    let background =
      reSelected ?
        Colors.shadeColor(Colors.identifyBackground(icon, day), (-10)) :
        Config.AppColors.lightGrey;
    let fontColor =
      reSelected ? Config.AppColors.white : Config.AppColors.darkGrey;
    let iconName = reSelected ? icon ++ "_white" : icon;
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
      <Text
        style=Style.(concat([styles##dayTitle, style([color(fontColor)])]))>
        (ReasonReact.stringToElement(name))
      </Text>
      <WeatherIconWrapper>
        <Image style=styles##image source=iconSource />
      </WeatherIconWrapper>
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
