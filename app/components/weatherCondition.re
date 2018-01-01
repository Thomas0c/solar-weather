open BsReactNative;

let component = ReasonReact.statelessComponent("WeatherCondition");

type current = {
  .
  icon: string,
  summary: string,
  temperature: float,
  apparentTemperature: float,
  precipProbability: float,
  precipType: string,
  humidity: float
};

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            top(Pct(9.5)),
            position(Absolute),
            left(Pct(5.)),
            backgroundColor("transparent")
          ]),
        "temp":
          style([
            fontSize(Float(50.)),
            fontFamily("HelveticaNeue"),
            fontWeight(`_600),
            color(Config.AppColors.whiteGrey)
          ]),
        "condition":
          style([
            fontSize(Float(24.)),
            fontFamily("HelveticaNeue"),
            fontWeight(`_600),
            color(Config.AppColors.whiteGrey),
            marginBottom(Pt(20.))
          ])
      }
    )
  );

let make =
    (
      ~condition,
      ~toggleDetails,
      ~unit: string,
      ~alerts,
      ~showDetails,
      ~toggleAlert,
      ~currently: option(Js.t(current)),
      _children
    ) => {
  ...component,
  render: (_self) => {
    let showAlert = Array.length(alerts) > 0;
    let noLocations =
      switch currently {
      | None => "N/A"
      | Some(_) => ""
      };
    let precipProbability =
      switch currently {
      | Some(t) => t##precipProbability
      | None => 0.
      };
    let precipType =
      switch currently {
      | Some(t) => t##precipType
      | None => "rain"
      };
    let precipNumberText =
      precipProbability > 0.3 ?
        Temperature.fixTemperature(precipProbability *. 100.) : "0";
    let precip =
      precipProbability > 0.3 ?
        {j|Chance of $precipType: $precipNumberText%|j} : "";
    let tempFloat =
      switch (unit, currently) {
      | ("c", Some(t)) => t##temperature
      | ("f", Some(t)) => Temperature.convertToFahrenheit(t##temperature)
      | _ => 0.
      };
    let temp = Temperature.fixTemperature(tempFloat);
    let tempFix = {j|$temp°|j};
    let summary =
      switch currently {
      | Some(t) => t##summary
      | None => ""
      };
    let icon =
      switch currently {
      | Some(t) => t##icon
      | None => ""
      };
    let humidity =
      switch currently {
      | Some(t) => t##humidity
      | None => 0.
      };
    let fontColor = Colors.identifyFontColor(condition);
    <TouchableHighlight
      style=styles##container
      onPress=toggleDetails
      underlayColor="transparent">
      <View style=styles##container>
        <Text style=Style.(concat([styles##temp, style([color(fontColor)])]))>
          (
            noLocations === "N/A" ?
              ReasonReact.stringToElement(noLocations) :
              ReasonReact.nullElement
          )
          (
            noLocations === "N/A" ?
              ReasonReact.nullElement : ReasonReact.stringToElement(tempFix)
          )
        </Text>
        <WeatherConditionAlert summary showAlert icon toggleAlert />
        <WeatherConditionText
          text=(Temperature.formatText(tempFloat, humidity, precip))
          condition
          showDetails
        />
      </View>
    </TouchableHighlight>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~condition=jsProps##condition,
        ~toggleDetails=jsProps##toggleDetails,
        ~unit=jsProps##unit,
        ~alerts=jsProps##alerts,
        ~showDetails=jsProps##showDetails,
        ~toggleAlert=jsProps##toggleAlert,
        ~currently=Js.Nullable.to_opt(jsProps##currently),
        [||]
      )
  );
