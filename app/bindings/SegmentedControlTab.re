module Component = {
  [@bs.module "react-native-segmented-control-tab"]
  external segmentedControlTab : ReasonReact.reactClass =
    "default";
  let make =
      (
        ~values: option(array(string))=?,
        ~badges: option(array(string))=?,
        ~multiple: option(Js.boolean)=?,
        ~selectedIndex: option(int)=?,
        ~selectedIndices: option(array(int))=?,
        ~onTabPress: option((unit => unit))=?,
        ~tabsContainerStyle: option(BsReactNative.Style.t)=?,
        ~tabStyle: option(BsReactNative.Style.t)=?,
        ~activeTabStyle: option(BsReactNative.Style.t)=?,
        ~tabTextStyle: option(BsReactNative.Style.t)=?,
        ~activeTabTextStyle: option(BsReactNative.Style.t)=?,
        ~borderRadius: option(float)=?,
        _children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=segmentedControlTab,
      ~props=
        Js.Undefined.(
          {
            "values": from_opt(values),
            "badges": from_opt(badges),
            "multiple": from_opt(multiple),
            "selectedIndex": from_opt(selectedIndex),
            "selectedIndices": from_opt(selectedIndices),
            "onTabPress": from_opt(onTabPress),
            "tabsContainerStyle": from_opt(tabsContainerStyle),
            "tabStyle": from_opt(tabStyle),
            "activeTabStyle": from_opt(activeTabStyle),
            "tabTextStyle": from_opt(tabTextStyle),
            "activeTabTextStyle": from_opt(activeTabTextStyle),
            "borderRadius": from_opt(borderRadius)
          }
        ),
      [||]
    );
};
