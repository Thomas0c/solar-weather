module Tinycolor = {
  type t;
  [@bs.send] external darken : (string, float) => t = "";
  [@bs.send] external toString : t => string = "";
};

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

let shadeColor = (color: string, amount: int) => {
  let r = int_of_string("0x" ++ Js.String.substring(~from=1, ~to_=3, color));
  let g = int_of_string("0x" ++ Js.String.substring(~from=3, ~to_=5, color));
  let b = int_of_string("0x" ++ Js.String.substring(~from=5, ~to_=7, color));
  let parsedR = r * (100 + amount) / 100;
  let parsedG = g * (100 + amount) / 100;
  let parsedB = b * (100 + amount) / 100;
  let finalR = parsedR < 255 ? parsedR : 255;
  let finalG = parsedG < 255 ? parsedG : 255;
  let finalB = parsedB < 255 ? parsedB : 255;
  let rr =
    String.length(Js.Int.toStringWithRadix(finalR, ~radix=16)) === 1 ?
      "0" ++ Js.Int.toStringWithRadix(finalR, ~radix=6) :
      Js.Int.toStringWithRadix(finalR, ~radix=16);
  let gg =
    String.length(Js.Int.toStringWithRadix(finalG, ~radix=16)) === 1 ?
      "0" ++ Js.Int.toStringWithRadix(finalG, ~radix=16) :
      Js.Int.toStringWithRadix(finalG, ~radix=16);
  let bb =
    String.length(Js.Int.toStringWithRadix(finalB, ~radix=16)) === 1 ?
      "0" ++ Js.Int.toStringWithRadix(finalB, ~radix=16) :
      Js.Int.toStringWithRadix(finalB, ~radix=16);
  "#" ++ rr ++ gg ++ bb
};

let identifyBackground = (condition: string, day: bool) : string =>
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
