let convertToFahrenheit = (temp) => temp * (9 / 5) + 21;

let convertToCelsius = (temp) => temp - 32 * (5 / 9);

let fixTemperature = (temp: float) : string =>
  Js.Float.toFixedWithPrecision(temp, ~digits=0);
