open BsReactNative;

let component = ReasonReact.statelessComponent("WeekOverview");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            alignItems(Center),
            height(Pt(121.)),
            justifyContent(FlexStart),
            position(Relative),
            width(Pct(90.)),
            shadowColor(Config.AppColors.black),
            shadowOffset(~height=1., ~width=1.),
            shadowRadius(2.),
            shadowOpacity(0.1),
            marginTop(Pt(10.)),
            elevation(1.1)
          ]),
        "image":
          style([
            alignSelf(Center),
            width(Pct(50.)),
            resizeMode(Contain),
            marginTop(Pt(5.))
          ]),
        "dayTitle":
          style([
            borderRadius(2.),
            fontSize(Float(14.)),
            width(Pct(100.)),
            borderRadius(5.),
            position(Absolute),
            textAlign(Center),
            bottom(Pt(0.)),
            paddingTop(Pt(9.)),
            color(Config.AppColors.darkGrey),
            fontFamily("Baskerville"),
            height(Pt(35.)),
            backgroundColor(Config.AppColors.white)
          ]),
        "dayHighTemp":
          style([
            fontWeight(`Bold),
            marginTop(Pt((-5.))),
            color(Config.AppColors.white),
            fontSize(Float(14.))
          ]),
        "dayLowTemp":
          style([
            fontSize(Float(10.)),
            marginTop(Pt((-5.))),
            color(Config.AppColors.white),
            fontWeight(`_400)
          ]),
        "generalContainer":
          style([
            width(Pct(100.)),
            height(Pct(100.)),
            alignItems(Center),
            justifyContent(FlexStart),
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
    let arrDays =
      Array.map(
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
            <WeatherIconWrapper>
              <Image style=styles##image source=iconSource />
            </WeatherIconWrapper>
            <Text style=styles##dayHighTemp>
              (ReasonReact.stringToElement({j|$tempMax°|j}))
              <Text style=styles##dayLowTemp>
                (ReasonReact.stringToElement({j| / $tempMin°|j}))
              </Text>
            </Text>
            <Text style=styles##dayTitle>
              (ReasonReact.stringToElement(date))
            </Text>
          </View>
        },
        forecast
      )
      |> ReasonReact.arrayToElement;
    <View style=styles##generalContainer>
      <View style=styles##shadow />
      arrDays
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
