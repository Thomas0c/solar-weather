open BsReactNative;

let icons: Js.Dict.t(Image.imageSource) = Js.Dict.empty();

Js.Dict.set(
  icons,
  "clear-day",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/sunny.png"))
  )
);

Js.Dict.set(
  icons,
  "clear-night",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/moon.png"))
  )
);

Js.Dict.set(
  icons,
  "partly-cloudy-day",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/partlycloudy.png")
    )
  )
);

Js.Dict.set(
  icons,
  "partly-cloudy-night",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/mostlycloudy.png")
    )
  )
);

Js.Dict.set(
  icons,
  "cloudy",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/mostlycloudy.png")
    )
  )
);

Js.Dict.set(
  icons,
  "wind",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/wind.png"))
  )
);

Js.Dict.set(
  icons,
  "fog",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/fog.png"))
  )
);

Js.Dict.set(
  icons,
  "hail",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/snow.png"))
  )
);

Js.Dict.set(
  icons,
  "snow",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/snow.png"))
  )
);

Js.Dict.set(
  icons,
  "tornado",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/tornado.png"))
  )
);

Js.Dict.set(
  icons,
  "thunderstorm",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/tstorms.png"))
  )
);

Js.Dict.set(
  icons,
  "rain",
  Image.(
    Required(Packager.require("../../../../assets/weather_icons/rain.png"))
  )
);

Js.Dict.set(
  icons,
  "clear-day_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/sunny_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "clear-night_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/moon_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "partly-cloudy-day_white",
  Image.(
    Required(
      Packager.require(
        "../../../../assets/weather_icons/partlycloudy_white.png"
      )
    )
  )
);

Js.Dict.set(
  icons,
  "partly-cloudy-night_white",
  Image.(
    Required(
      Packager.require(
        "../../../../assets/weather_icons/mostlycloudy_white.png"
      )
    )
  )
);

Js.Dict.set(
  icons,
  "cloudy_white",
  Image.(
    Required(
      Packager.require(
        "../../../../assets/weather_icons/mostlycloudy_white.png"
      )
    )
  )
);

Js.Dict.set(
  icons,
  "wind_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/wind_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "fog_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/fog_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "hail_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/snow_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "tornado_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/tornado_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "thunderstorm_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/tstorms_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "rain_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/rain_white.png")
    )
  )
);

Js.Dict.set(
  icons,
  "snow_white",
  Image.(
    Required(
      Packager.require("../../../../assets/weather_icons/snow_white.png")
    )
  )
);

let identifyIcon = (icon: string) : option(Image.imageSource) =>
  Js.Dict.get(icons, icon);
