open BsReactNative;

let component = ReasonReact.statelessComponent("AlertContent");

let styles =
  StyleSheet.create(
    Style.(
      {
        "view": style([padding(Pt(20.)), height(Pct(96.))]),
        "headline":
          style([
            fontSize(Float(16.)),
            fontFamily("HelveticaNeue"),
            fontWeight(`_700),
            color(Config.AppColors.darkGrey),
            textAlign(Center),
            marginBottom(Pt(20.))
          ]),
        "description": style([flexDirection(Column)]),
        "text":
          style([
            fontFamily("HelveticaNeue"),
            textAlign(Left),
            fontSize(Float(15.)),
            color(Config.AppColors.darkGrey)
          ])
      }
    )
  );

let make = (~title: string, ~description: string, _children) => {
  ...component,
  render: (_self) => {
    let desc =
      description
      |> Js.String.split("\n")
      |> Array.map(
           (item) =>
             <Text style=styles##text>
               (ReasonReact.stringToElement(item))
             </Text>
         );
    <View style=styles##view>
      <Text style=styles##headline>
        (ReasonReact.stringToElement(title))
      </Text>
      <ScrollView contentContainerStyle=styles##description>
        (ReasonReact.arrayToElement(desc))
      </ScrollView>
    </View>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(~title=jsProps##title, ~description=jsProps##description, [||])
  );
