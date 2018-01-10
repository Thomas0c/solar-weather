let component = ReasonReact.statelessComponent("LeftSidebar");

let weekOverviewContent = (forecast, unit, timezone) =>
  <WeekOverview forecast unit timezone />;

let make =
    (
      ~menu,
      ~locationSearch,
      ~anyLocation,
      ~openLeft: Js.boolean,
      ~forecast,
      ~onOpenLeftSide,
      ~onCloseLeftSide,
      ~unit,
      ~timezone,
      ~children
    ) => {
  ...component,
  render: (_self) => {
    let isMenu = menu === Js.true_;
    let isLocationSearch = locationSearch === Js.true_;
    let isAnyLocation = anyLocation === Js.true_;
    let closeSide =
      isMenu === true || isLocationSearch === true || isAnyLocation === false ?
        Js.true_ : Js.false_;
    <Drawer.Component
      disabled=closeSide
      onOpenStart=onOpenLeftSide
      onCloseStart=onCloseLeftSide
      open_=openLeft
      type_="static"
      tweenEasing="easeInOutSine"
      tweenHandler=((ratio) => Config.drawerTweenHandler(ratio))
      elevation=0.
      styles=Config.drawerStyles
      negotiatePan=Js.true_
      panThreshold=0.1
      openDrawerOffset=0.5
      closedDrawerOffset=0.
      panOpenMask=0.2
      content=(weekOverviewContent(forecast, unit, timezone))>
      children
    </Drawer.Component>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~menu=jsProps##menu,
        ~locationSearch=jsProps##locationSearch,
        ~anyLocation=jsProps##anyLocation,
        ~openLeft=jsProps##openLeft,
        ~forecast=jsProps##forecast,
        ~onOpenLeftSide=jsProps##onOpenLeftSide,
        ~onCloseLeftSide=jsProps##onCloseLeftSide,
        ~unit=jsProps##unit,
        ~timezone=jsProps##timezone,
        ~children=jsProps##children
      )
  );
