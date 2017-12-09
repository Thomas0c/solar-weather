open ReactNative;

let component = ReasonReact.statelessComponent("Empty");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            justifyContent(`center),
            alignItems(`center),
            alignSelf(`center),
            width(90.)
          ]),
        "button": style([position(`relative), width(40.), marginTop(30.)]),
        "image":
          style([
            alignSelf(`center),
            width(100.),
            height(30.),
            resizeMode(`contain)
          ])
      }
    )
  );

let make = (~onPress, _children) => {
  ...component,
  render: (_self) =>
    <View style=styles##container>
      <Text
        style=Style.(
                style([
                  color(Config.AppColors.white),
                  backgroundColor("transparent")
                ])
              )>
        (
          ReasonReact.stringToElement(
            "Add a location or enable location services"
          )
        )
      </Text>
      <TouchableOpacity style=styles##button onPress>
        <Image
          style=styles##image
          source=(
            URI(Image.(imageURISource(~uri="../../../assets/addIcon.png", ())))
          )
        />
      </TouchableOpacity>
    </View>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~onPress=jsProps##onPress, [||])
  );
