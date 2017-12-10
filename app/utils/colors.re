let colors = {
  "white": "#FFF",
  "black": "#000",
  "lightGrey": "EEE",
  "lightOrange": "#F2C992",
  "darkOrange": "#FEC272",
  "lightBlueGrey": "#A5C9D6",
  "darkBlueGrey": "#8093B6",
  "lightMatteBlue": "#A6B6BC",
  "darkMatteBlue": "#7C8FA0",
  "lightBlue": "#94B4BD",
  "darkBlue": "#5B828D",
  "lightBeige": "#CEBA9F",
  "darkBeige": "#A88F70",
  "mattePurple": "#6B7AA7",
  "darkPurple": "#565C71",
  "lightSquash": "#7C718C",
  "darkSquash": "#443E4E",
  "darkGrey": "#757575",
  "subtleGrey": "#EFEFEF",
  "snowGrey": "#C1C7C9",
  "snowWhite": "#DEE3E5"
};

let identifyFontColor = (condition: string) =>
  condition === "snow" ? colors##darkGrey : colors##subtleGrey;

let identifyBackground = (condition: string, day: bool) =>
  switch condition {
  | "clear-night" => colors##darkBlueGrey
  | "clear-day" => colors##darkOrange
  | "cloudy" => day ? colors##lightMatteBlue : colors##darkMatteBlue
  | "partly-cloudy-day" => day ? colors##lightMatteBlue : colors##darkMatteBlue
  | "partly-cloudy-night" =>
    day ? colors##lightMatteBlue : colors##darkMatteBlue
  | "rain" => day ? colors##mattePurple : colors##darkPurple
  | "snow" => colors##snowGrey
  | "thunderstorm" => day ? colors##lightSquash : colors##darkSquash
  | "fog" => day ? colors##lightBlue : colors##darkBlue
  | _ => colors##lightBlueGrey
  };
