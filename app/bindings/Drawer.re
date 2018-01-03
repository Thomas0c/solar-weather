module Component = {
  [@bs.module "react-native-drawer"] external drawer : ReasonReact.reactClass =
    "default";
  type styles = {
    .
    "drawerOverlay": {. "backgroundColor": string, "opacity": float},
    "mainOverlay": {. "backgroundColor": string, "opacity": float}
  };
  type tweenHandler =
    float =>
    {
      .
      "drawerOverlay": {. "opacity": float},
      "mainOverlay": {. "opacity": float}
    };
  let make =
      (
        ~acceptDoubleTap: option(Js.boolean)=?,
        ~acceptPan: option(Js.boolean)=?,
        ~acceptTap: option(Js.boolean)=?,
        ~acceptPanOnDrawer: option(Js.boolean)=?,
        ~captureGestures: option(Js.boolean)=?,
        ~closedDrawerOffset: option(float)=?,
        ~content: ReasonReact.reactElement,
        ~disabled: option(Js.boolean)=?,
        ~elevation: option(float)=?,
        ~initializeOpen: option(Js.boolean)=?,
        ~open_: option(bool)=?,
        ~negotiatePan: option(Js.boolean)=?,
        ~onClose: option((unit => unit))=?,
        ~onCloseStart: option((unit => unit))=?,
        ~onOpen: option((unit => unit))=?,
        ~onOpenStart: option((unit => unit))=?,
        ~onDragStart: option((unit => unit))=?,
        ~openDrawerOffset: option(float)=?,
        ~panThreshold: option(float)=?,
        ~panCloseMask: option(float)=?,
        ~panOpenMask: option(float)=?,
        ~side: option(string)=?,
        ~styles: option(styles)=?,
        ~tapToClose: option(Js.boolean)=?,
        ~tweenDuration: option(float)=?,
        ~tweenEasing: option(string)=?,
        ~tweenHandler: option(tweenHandler)=?,
        ~type_: option(string)=?,
        ~useInteractionManager: option(Js.boolean)=?,
        children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=drawer,
      ~props=
        Js.Undefined.(
          {
            "acceptDoubleTap": from_opt(acceptDoubleTap),
            "acceptPan": from_opt(acceptPan),
            "acceptTap": from_opt(acceptTap),
            "acceptPanOnDrawer": from_opt(acceptPanOnDrawer),
            "captureGestures": from_opt(captureGestures),
            "closedDrawerOffset": from_opt(closedDrawerOffset),
            "disabled": from_opt(disabled),
            "elevation": from_opt(elevation),
            "initializeOpen": from_opt(initializeOpen),
            "open": from_opt(open_),
            "negotiatePan": from_opt(negotiatePan),
            "onClose": from_opt(onClose),
            "onCloseStart": from_opt(onCloseStart),
            "onOpen": from_opt(onOpen),
            "onOpenStart": from_opt(onOpenStart),
            "onDragStart": from_opt(onDragStart),
            "openDrawerOffset": from_opt(openDrawerOffset),
            "panThreshold": from_opt(panThreshold),
            "panCloseMask": from_opt(panCloseMask),
            "panOpenMask": from_opt(panOpenMask),
            "side": from_opt(side),
            "styles": from_opt(styles),
            "tapToClose": from_opt(tapToClose),
            "tweenDuration": from_opt(tweenDuration),
            "tweenEasing": from_opt(tweenEasing),
            "tweenHandler": from_opt(tweenHandler),
            "type": from_opt(type_),
            "useInteractionManager": from_opt(useInteractionManager),
            "content": content
          }
        ),
      children
    );
};
