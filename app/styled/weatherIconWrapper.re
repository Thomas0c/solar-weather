[@bs.module] external weatherIconWrapper : ReasonReact.reactClass = "weatherIconWrapper";

let make = children =>
  ReasonReact.wrapJsForReason(
    ~reactClass=weatherIconWrapper,
    children
  );
