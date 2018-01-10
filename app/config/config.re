let units = [|"c", "f"|];

let timeTypes = [|"24", "12"|];

module Fonts = {
  let baskerville = "LibreBaskerville";
  let helveticaNeue = "OpenSans";
  let avenir = "Muli";
};

module AppColors = {
  let red = "#E77F6D";
  let opaqueBlack = "rgba(0, 0, 0, 0.2)";
  let opaqueBlack70 = "rgba(0, 0, 0, 0.7)";
  let lightGrey = "#EFEFEF";
  let white = "#FFF";
  let whiteGrey = "#F9F9F9";
  let medGrey = "#F0F0F0";
  let black = "#000";
  let darkGrey = "#343434";
  let grey = "#999";
  let medGreyAlt = "#C0C0C0";
};

let drawerTweenHandler = (ratio: float) => {
  "drawerOverlay": {opacity: (1. -. ratio) /. 2.},
  "mainOverlay": {opacity: ratio *. 0.1}
};

let drawerStyles = {
  "drawerOverlay": {backgroundColor: "#000", opacity: 1.},
  "mainOverlay": {backgroundColor: "#000", opacity: 0.}
};
