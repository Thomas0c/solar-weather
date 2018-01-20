open BsReactNative;

let component = ReasonReact.statelessComponent("HourItem");

let styles =
  StyleSheet.create(
    Style.(
      {
        "hour":
          style([
            height(Pct(100.)),
            paddingLeft(Pt(15.)),
            paddingRight(Pt(15.)),
            alignItems(Center)
          ]),
        "hourText":
          style([
            textAlign(Center),
            fontWeight(`_600),
            color(Config.AppColors.lightGrey),
            marginTop(Pt(15.))
          ]),
        "image":
          style([
            alignSelf(Center),
            width(Pct(170.)),
            marginTop(Pt(-5.)),
            resizeMode(Contain)
          ]),
        "temperature":
          style([color(Config.AppColors.lightGrey), fontSize(Float(14.))])
      }
    )
  );

let make =
    (
      ~unit,
      ~timeType,
      ~temperature: float,
      ~icon: string,
      ~timezone,
      ~time,
      _children
    ) => {
  ...component,
  render: _self => {
    let temperature =
      unit === "c" ?
        Temperature.fixTemperature(temperature) :
        Temperature.convertToFahrenheitAndFix(temperature);
    let formatString = timeType === "24" ? "HH:mm" : "h a";
    let date =
      Time.convertUnixToTimezone(time *. 1000., timezone)
      |> Time.setToStartOf(`minute)
      |> Time.convertToString(formatString);
    let icon = Icons.identifyIcon(icon ++ "_white");
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
    <View style=styles##hour key=date>
      <Text style=styles##hourText> (ReasonReact.stringToElement(date)) </Text>
      <WeatherIconWrapper>
        <Image style=styles##image source=iconSource />
      </WeatherIconWrapper>
      <Text style=styles##temperature>
        (ReasonReact.stringToElement({j|$temperature°|j}))
      </Text>
    </View>;
  }
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~unit=jsProps##unit,
      ~timeType=jsProps##timeType,
      ~temperature=jsProps##temperature,
      ~icon=jsProps##icon,
      ~timezone=jsProps##timezone,
      ~time=jsProps##time,
      [||]
    )
  );
