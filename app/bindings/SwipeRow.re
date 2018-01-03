module Row = {
  [@bs.module "react-native-swipe-list-view"]
  external swiperow : ReasonReact.reactClass =
    "SwipeRow";
  let make =
      (
        ~disableLeftSwipe: option(Js.boolean)=?,
        ~ref: option(ReasonReact.reactRef)=?,
        ~key: option(int)=?,
        ~onRowPress: option((unit => unit))=?,
        ~stopRightSwipe: option(float)=?,
        ~style: option(BsReactNative.Style.t)=?,
        ~rightOpenValue: option(float)=?,
        ~swipeToClosePercent: option(float)=?,
        ~swipeToOpenVelocityContribution: option(float)=?,
        ~swipeToOpenPercent: option(float)=?,
        ~directionalDistanceChangeThreshold: option(float)=?,
        ~previewOpenValue: option(float)=?,
        ~previewDuration: option(float)=?,
        ~preview: option(Js.boolean)=?,
        ~onRowDidClose: option((unit => unit))=?,
        ~onRowDidOpen: option((unit => unit))=?,
        ~onRowOpen: option((unit => unit))=?,
        ~swipeGestureBegan: option((unit => unit))=?,
        ~setScrollEnabled: option((unit => unit))=?,
        ~onRowClose: option((unit => unit))=?,
        ~recalculateHiddenLayout: option(Js.boolean)=?,
        ~disableRightSwipe: option(Js.boolean)=?,
        ~closeOnRowPress: option(Js.boolean)=?,
        ~tension: option(float)=?,
        ~friction: option(float)=?,
        ~stopLeftSwipe: option(float)=?,
        ~leftOpenValue: option(float)=?,
        children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=swiperow,
      ~props=
        Js.Undefined.(
          {
            "disableLeftSwipe": from_opt(disableLeftSwipe),
            "ref": from_opt(ref),
            "key": from_opt(key),
            "onRowPress": from_opt(onRowPress),
            "stopRightSwipe": from_opt(stopRightSwipe),
            "style": from_opt(style),
            "rightOpenValue": from_opt(rightOpenValue),
            "swipeToClosePercent": from_opt(swipeToClosePercent),
            "swipeToOpenVelocityContribution":
              from_opt(swipeToOpenVelocityContribution),
            "swipeToOpenPercent": from_opt(swipeToOpenPercent),
            "directionalDistanceChangeThreshold":
              from_opt(directionalDistanceChangeThreshold),
            "previewOpenValue": from_opt(previewOpenValue),
            "previewDuration": from_opt(previewDuration),
            "preview": from_opt(preview),
            "onRowDidClose": from_opt(onRowDidClose),
            "onRowDidOpen": from_opt(onRowDidOpen),
            "onRowOpen": from_opt(onRowOpen),
            "swipeGestureBegan": from_opt(swipeGestureBegan),
            "setScrollEnabled": from_opt(setScrollEnabled),
            "onRowClose": from_opt(onRowClose),
            "recalculateHiddenLayout": from_opt(recalculateHiddenLayout),
            "disableRightSwipe": from_opt(disableRightSwipe),
            "closeOnRowPress": from_opt(closeOnRowPress),
            "tension": from_opt(tension),
            "friction": from_opt(friction),
            "stopLeftSwipe": from_opt(stopLeftSwipe),
            "leftOpenValue": from_opt(leftOpenValue)
          }
        ),
      children
    );
};
