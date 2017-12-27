let convertToFahrenheit = (temp: float) : float =>
  temp *. (9.0 /. 5.0) +. 21.0;

let convertToCelsius = (temp: float) : float => temp -. 32. *. (5. /. 9.);

let fixTemperature = (temp: float) : string => {
  Js.log(temp);
  Js.Float.toFixedWithPrecision(temp, ~digits=0)
};

let convertToCelciusAndFix = (temp: float) =>
  convertToCelsius(temp) |> fixTemperature;

let convertToFahrenheitAndFix = (temp: float) =>
  convertToFahrenheit(temp) |> fixTemperature;

let formatText = (temp: float, humidity: float, precip: string) => {
  let temp = fixTemperature(temp);
  let humid = fixTemperature(humidity *. 100.);
  {j| Feels like $temp° \n Humidity $humid% \n $precip
    |j}
};
