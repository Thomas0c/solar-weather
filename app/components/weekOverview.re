open BsReactNative;

let component = ReasonReact.statelessComponent("WeekOverview");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            alignItems(Center),
            height(Pt(134.)),
            justifyContent(Center),
            width(Pct(100.))
          ]),
        "image":
          style([alignSelf(Center), width(Pct(54.)), resizeMode(Contain)]),
        "dayTitle":
          style([
            fontSize(Float(14.)),
            color(Config.AppColors.white),
            fontFamily("Baskerville")
          ]),
        "dayHighTemp":
          style([
            fontWeight(`Bold),
            color(Config.AppColors.white),
            fontSize(Float(14.))
          ]),
        "dayLowTemp":
          style([
            fontSize(Float(10.)),
            color(Config.AppColors.white),
            fontWeight(`_400)
          ]),
        "generalContainer":
          style([
            width(Pct(100.)),
            height(Pct(100.)),
            alignItems(Center),
            justifyContent(Center),
            backgroundColor(Config.AppColors.lightGrey)
          ]),
        "shadow":
          style([
            width(Pt(2.)),
            backgroundColor(Config.AppColors.opaqueBlack),
            position(Absolute),
            right(Pt(0.)),
            top(Pt(0.)),
            height(Pct(100.)),
            zIndex(2)
          ])
      }
    )
  );

let make = (~forecast, ~unit, ~timezone, _children) => {
  ...component,
  render: (_self) => {
    let days =
      List.map(
        (item) => {
          let date =
            Time.convertToTimeZoneAndString(item##time, timezone, "dddd");
          let tempMax =
            unit === "c" ?
              Temperature.fixTemperature(item##temperatureMax) :
              Temperature.convertToFahrenheitAndFix(item##temperatureMax);
          let tempMin =
            unit === "c" ?
              Temperature.fixTemperature(item##temperatureMin) :
              Temperature.convertToFahrenheitAndFix(item##temperatureMin);
          let background =
            Colors.shadeColor(
              Colors.identifyBackground(item##icon, true),
              (-10)
            );
          let icon = Icons.identifyIcon(item##icon ++ "_white");
          let iconSource: Image.imageSource =
            switch icon {
            | None =>
              Image.(
                Required(
                  Packager.require(
                    "../../../../assets/weather_icons/sunny.png"
                  )
                )
              )
            | Some(image) => image
            };
          <View
            key=date
            style=Style.(
                    concat([
                      styles##container,
                      style([backgroundColor(background)])
                    ])
                  )>
            <Text style=styles##dayTitle>
              (ReasonReact.stringToElement(date))
            </Text>
            <WeatherIconWrapper>
              <Image style=styles##image source=iconSource />
            </WeatherIconWrapper>
            <Text style=styles##dayHighTemp>
              (ReasonReact.stringToElement(tempMax ++ "\176"))
              <Text style=styles##dayLowTemp>
                (ReasonReact.stringToElement(" / " ++ tempMin ++ "\176"))
              </Text>
            </Text>
          </View>
        },
        Array.to_list(forecast)
      )
      |> Array.of_list
      |> ReasonReact.arrayToElement;
    <View style=styles##generalContainer>
      <View style=styles##shadow />
      days
    </View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~forecast=jsProps##forecast,
        ~unit=jsProps##unit,
        ~timezone=jsProps##timezone,
        [||]
      )
  );
