open BsReactNative;

let component = ReasonReact.statelessComponent("InfoIcon");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            position(Absolute),
            zIndex(3),
            right(Pt(15.)),
            height(Pt(20.)),
            width(Pt(20.)),
            top(Pt(15.))
          ]),
        "image": style([width(Pt(20.)), height(Pt(20.))])
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
