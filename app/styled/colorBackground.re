open BsReactNative;

let component = ReasonReact.statelessComponent("ColorBackground");

let make = (~condition, ~day, children) => {
  ...component,
  render: (_self) =>
    <View
      style=(
        Style.style([
          Style.width(Pct(100.)),
          Style.height(Pct(100.)),
          Style.backgroundColor(Colors.identifyBackground(condition, day))
        ])
      )>
      ...children
    </View>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~condition=jsProps##condition, ~day=jsProps##day, [||])
  );
