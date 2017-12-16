open BsReactNative;

let component = ReasonReact.statelessComponent("DateText");

let make = (~space, ~condition, ~text, _children) => {
  ...component,
  render: (_self) => {
    let fontColor = Colors.identifyFontColor(condition);
    <Text
      style=Style.(
              style([color(fontColor), lineHeight(space === true ? 25. : 20.)])
            )>
      (ReasonReact.stringToElement(text))
    </Text>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~condition=jsProps##condition,
        ~space=jsProps##space,
        ~text=jsProps##text,
        [||]
      )
  );
