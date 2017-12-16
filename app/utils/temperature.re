let convertToFahrenheit = (temp: float) : float =>
  temp *. (9.0 /. 5.0) +. 21.0;

let convertToCelsius = (temp: float) : float => temp -. 32. *. (5. /. 9.);

let fixTemperature = (temp: float) : string =>
  Js.Float.toFixedWithPrecision(temp, ~digits=0);

let convertToCelciusAndFix = (temp: float) =>
  convertToCelsius(temp) |> fixTemperature;

let convertToFahrenheitAndFix = (temp: float) =>
  convertToFahrenheit(temp) |> fixTemperature;
