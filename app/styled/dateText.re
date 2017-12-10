[@bs.module] external dateText : ReasonReact.reactClass = "DateText";

let make = (~day: string, ~space: bool, ~style, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=dateText,
    ~props={"day": day, "space": space, "style": style},
    children
  );
