[@bs.module] external colorBackground : ReasonReact.reactClass = "ColorBackground";

let make = (~condition: string, ~day: bool, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=colorBackground,
    ~props={"condition": condition, "day": day},
    children
  );
