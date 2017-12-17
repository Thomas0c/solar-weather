open BsReactNative;

open MomentRe;

[@bs.raw "require('moment-timezone)"];

[@bs.send] external tz : (Moment.t, string) => Moment.t = "tz";

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
            fontSize(14.),
            color(Config.AppColors.white),
            fontFamily("Baskerville")
          ]),
        "dayHighTemp":
          style([
            fontWeight(`Bold),
            color(Config.AppColors.white),
            fontSize(14.)
          ]),
        "dayLowTemp":
          style([
            fontSize(10.),
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
            tz(momentWithUnix(item##time), timezone) |> Moment.format("dddd");
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
                (ReasonReact.stringToElement("/" ++ tempMin ++ "\176"))
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
/* // Modules
   export default class WeekOverview extends PureComponent { // eslint-disable-line
       return (
         <View style={styles.container}>
           <View style={styles.shadow} />
           {forecast.map((day, idx) => {
             if (idx > 4) return null;

             const time = dayDate.tz(zone);
             const background = darken(0.1, Colors.identifyBackground(day.icon, day));

             return (
                 <Text style={forecastDay.dayTitle}>{time.format('dddd')}</Text>
                 <WeatherIconWrapper>
                   <Image style={forecastDay.image} source={Icons.identifyIcon(`${day.icon}_white`)} />
                 </WeatherIconWrapper>
                 <Text style={forecastDay.dayHighTemp}>
                   {fixedHighTemp}°
                   <Text style={forecastDay.dayLowTemp}> / {fixedLowTemp}°</Text>
                 </Text>
               </View>
             );
           })}
         </View>
       );
     }
   }

   */
