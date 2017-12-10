open ReactNative;

let component = ReasonReact.statelessComponent("InfoIcon");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(`absolute),
            zIndex(3),
            right(15.),
            height(20.),
            width(20.),
            top(15.)
          ]),
        "image": style([width(20.), height(20.)])
      }
    )
  );

let make = (~onPress, _children) => {
  ...component,
  render: (_self) =>
    <TouchableHighlight
      underlayColor="transparent" onPress style=styles##container>
      <Image
        style=styles##image
        source=(
          URI(Image.(imageURISource(~uri="../../../assets/infoIcon.png", ())))
        )
      />
    </TouchableHighlight>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~onPress=jsProps##onPress, [||])
  );
