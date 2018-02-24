<div align="center">
  <img alt="Solar logo" width="180" src="https://raw.githubusercontent.com/Thomas0c/solar-weather/master/ios/solar/Images.xcassets/AppIcon.appiconset/Solar_60%403x.png" />
  <h1>
    Solar
  </h1>
  <p>
   A personal project exploring React Native, Realm, Redux & ReasonReact. (iOS only - Android WIP).
  </p>
</div>

[![CircleCI](https://circleci.com/gh/Thomas0c/solar-weather/tree/master.svg?style=svg)](https://circleci.com/gh/Thomas0c/solar-weather/tree/master)

## Get Started

* Make sure you have React Native installed [React Native Docs](https://facebook.github.io/react-native/docs/getting-started.html)
* Make sure you have CocoaPods installed [CocoaPods](https://cocoapods.org/)
* Clone repo
* cd `solar`
* Setup and install ReasonML and BuckleScript [Guide](https://reasonml.github.io/guide/editor-tools/global-installation/)
* Run `npm install` alternatively `yarn install`
* Create a `.env` file in the project root
* Get a forecast.io API key and set `FORECAST_API=[key]` in `.env`
* Get a Google Places for iOS API key and set `PLACES_API=[key]` in `.env`. Get it here: [Google Places iOS](https://console.developers.google.com/apis/api/placesios.googleapis.com/overview)
* Navigate to `ios` folder, `cd ios` and run `pod install`
* Compile ReasonReact components to js. Run `npm run build` or `yarn run build`
* For iOS Run project using `react-native run-ios`
* For Android run project using `react-native run-android`
* For additional logging run `react-native log-[platform]`, e.g. `react-native log-ios` while running app in simulator/emulator.

## About the project

Solar is a side-project created for the learning experience while sharing the result as the project develops. It started as an exploration of React Native, Realm and Redux. I then decided to convert the project file-by-file to [ReasonML](https://reasonml.github.io/reason-react/). I designed the application in Fall 2016, then built a prototype and then decided to try to build an actual working version that could not only benefit myself, but also others. Besides being on GitHub the actual application is also available in the iOS app store as `Solar Weather Collection`.

#### Why ReasonReact?

I wanted to explore a static and safe type system with a fairly familiar syntax. ReasonReact offers the ability to convert component-by-component, which is very convenient to slowly get familiar with syntax and mindset by taking on smaller parts of the codebase while converting to ReasonML. ReasonML is then compiled to JavaScript (using [BuckleScript](https://bucklescript.github.io/) backed by [OCaml](http://ocaml.org/)), which enables great interoperability.

## Features

* [x] [RealmJS](https://github.com/realm/realm-js)
* [x] [Redux](https://github.com/reactjs/redux)
* [x] [Google Places Autocomplete](https://developers.google.com/places/web-service/autocomplete)
* [x] [Forecast.io](http://expressjs.com/)
* [x] [Jest Testing](https://facebook.github.io/jest/)
* [x] [Styled Components](https://github.com/styled-components/styled-components)
* [x] [React Native](https://facebook.github.io/react-native/)
* [x] [React Native Config](https://github.com/luggit/react-native-config)
* [x] [React Native Drawer](https://github.com/root-two/react-native-drawer)
* [ ] WIP - [ReasonReact](https://reasonml.github.io/reason-react/)
* [ ] WIP - Android Support

## Screenshots

![Example 1](https://raw.githubusercontent.com/Thomas0c/solar-weather/master/screenshots/screen_1.png)
![Example 2](https://raw.githubusercontent.com/Thomas0c/solar-weather/master/screenshots/screen_2.png)
![Example 3](https://raw.githubusercontent.com/Thomas0c/solar-weather/master/screenshots/screen_3.png)
![Example 4](https://raw.githubusercontent.com/Thomas0c/solar-weather/master/screenshots/screen_4.png)
