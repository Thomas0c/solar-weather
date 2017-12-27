open BsReactNative;

let component = ReasonReact.statelessComponent("Empty");

let styles =
  StyleSheet.create(
    Style.(
      {
        "container":
          style([
            justifyContent(Center),
            alignItems(Center),
            alignSelf(Center),
            width(Pct(90.))
          ]),
        "button":
          style([position(Relative), width(Pt(40.)), marginTop(Pt(30.))]),
        "image":
          style([
            alignSelf(Center),
            width(Pct(100.)),
            height(Pt(30.)),
            resizeMode(Contain)
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
          source=Image.(
                   Required(Packager.require("../../../../assets/addIcon.png"))
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
