let component = ReasonReact.statelessComponent("RightSidebar");

let locationOverviewContent =
    (
      dayTime,
      locationIndex,
      toggleLocationSearch,
      filteredLocations,
      onRowDelete,
      onRowSelect
    ) =>
  <LocationOverviewList
    day=dayTime
    onDelete=onRowDelete
    onSelect=onRowSelect
    activeLocation=locationIndex
    openModal=toggleLocationSearch
    locations=filteredLocations
  />;

let make =
    (
      ~menu,
      ~locationSearch,
      ~anyLocation: Js.boolean,
      ~openRight: Js.boolean,
      ~filteredLocations,
      ~onOpenRightSide,
      ~onCloseRightSide,
      ~dayTime: bool,
      ~locationIndex,
      ~toggleLocationSearch,
      ~onRowSelect,
      ~onRowDelete,
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
    let openRightSide =
      openRight === Js.true_ && anyLocation === Js.true_ ?
        Js.true_ : Js.false_;
    <Drawer.Component
      disabled=closeSide
      onOpenStart=onOpenRightSide
      onCloseStart=onCloseRightSide
      open_=openRightSide
      type_="static"
      tweenEasing="easeInOutSine"
      tweenHandler=((ratio) => Config.drawerTweenHandler(ratio))
      elevation=1.1
      side="right"
      styles=Config.drawerStyles
      negotiatePan=Js.true_
      panThreshold=0.1
      openDrawerOffset=0.5
      closedDrawerOffset=0.
      panOpenMask=0.2
      content=(
        locationOverviewContent(
          dayTime,
          locationIndex,
          toggleLocationSearch,
          filteredLocations,
          onRowDelete,
          onRowSelect
        )
      )>
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
        ~openRight=jsProps##openRight,
        ~filteredLocations=jsProps##filteredLocations,
        ~onOpenRightSide=jsProps##onOpenRightSide,
        ~onCloseRightSide=jsProps##onCloseRightSide,
        ~locationIndex=jsProps##locationIndex,
        ~dayTime=jsProps##dayTime,
        ~onRowSelect=jsProps##onRowSelect,
        ~onRowDelete=jsProps##onRowDelete,
        ~toggleLocationSearch=jsProps##toggleLocationSearch,
        ~children=jsProps##children
      )
  );
