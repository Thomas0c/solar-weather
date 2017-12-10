open ReactNative;

let component = ReasonReact.statelessComponent("AlertContent");

let styles =
  StyleSheet.create(
    Style.(
      {
        "view": style([padding(20.), height(96.)]),
        "headline":
          style([
            fontSize(16.),
            fontFamily("HelveticaNeue"),
            fontWeight(`_700),
            color(Config.AppColors.darkGrey),
            textAlign(`center),
            marginBottom(20.)
          ]),
        "description": style([flexDirection(`column)]),
        "text":
          style([
            fontFamily("HelveticaNeue"),
            textAlign(`left),
            fontSize(15.),
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
