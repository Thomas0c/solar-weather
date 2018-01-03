module Component = {
  [@bs.module "../../../../app/components/LocationOverview.component.js"]
  external locationOverview : ReasonReact.reactClass =
    "default";
  let make =
      (
        ~locations,
        ~openModal: option((unit => unit))=?,
        ~day: option(Js.boolean)=?,
        ~activeLocation,
        _children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=locationOverview,
      ~props=
        Js.Undefined.(
          {
            "locations": locations,
            "openModal": from_opt(openModal),
            "day": from_opt(day),
            "activeLocation": activeLocation
          }
        ),
      [||]
    );
};
