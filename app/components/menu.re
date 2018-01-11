open BsReactNative;

let component = ReasonReact.statelessComponent("Menu");

let styles =
  StyleSheet.create(
    Style.(
      {
        "title":
          style([
            fontSize(Float(16.)),
            fontFamily(Config.Fonts.helveticaNeue),
            marginTop(Pt(20.)),
            marginBottom(Pt(20.)),
            color(Config.AppColors.darkGrey),
            fontWeight(`Bold)
          ]),
        "image": style([width(Pt(120.)), height(Pt(80.)), resizeMode(Contain)]),
        "credits": style([alignItems(Center), width(Pct(100.))]),
        "tabContainerStyle":
          style([
            width(Pct(80.)),
            height(Pt(30.)),
            marginBottom(Pt(20.)),
            borderColor(Config.AppColors.tint)
          ]),
        "tabStyle": style([borderColor(Config.AppColors.tint)]),
        "activeTabStyle": style([backgroundColor(Config.AppColors.tint)]),
        "tabTextStyle": style([color(Config.AppColors.tint)]),
        "activeTabTextStyle": style([color(Config.AppColors.white)])
      }
    )
  );

let segmentedControl = (values, selected, onPress) =>
  <SegmentedControlTab.Component
    values
    selectedIndex=selected
    onTabPress=onPress
    tabsContainerStyle=styles##tabContainerStyle
    tabStyle=styles##tabStyle
    activeTabStyle=styles##activeTabStyle
    tabTextStyle=styles##tabTextStyle
    activeTabTextStyle=styles##activeTabTextStyle
  />;

let modalContent =
    (handleClick, unitIndex, updateIndex, timeIndex, updateTimeIndex) =>
  <View style=Style.(style([position(Relative), alignItems(Center)]))>
    <Text style=styles##title>
      (ReasonReact.stringToElement("Settings"))
    </Text>
    (segmentedControl([|"Metric", "Imperial"|], unitIndex, updateIndex))
    (segmentedControl([|"24 Hour", "12 Hour"|], timeIndex, updateTimeIndex))
    <Text
      style=Style.(
              style([
                position(Relative),
                alignItems(Center),
                marginTop(Pt(15.)),
                marginBottom(Pt(10.))
              ])
            )>
      (ReasonReact.stringToElement("Credits"))
    </Text>
    <TouchableHighlight
      underlayColor="transparent"
      onPress=(() => handleClick("http://germanicons.com/"))>
      <Text style=Style.(style([color("#343434")]))>
        (ReasonReact.stringToElement("Icons: Ralf Schmitzer"))
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      underlayColor="transparent"
      onPress=(() => handleClick("http://www.maxrandall.com/"))>
      <Text style=Style.(style([color("#343434")]))>
        (ReasonReact.stringToElement("& Max Randall"))
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      underlayColor="transparent"
      onPress=(() => handleClick("https://darksky.net/poweredby/"))>
      <Image
        style=styles##image
        source=Image.(
                 Required(Packager.require("../../../../assets/poweredby.png"))
               )
      />
    </TouchableHighlight>
  </View>;

let make =
    (
      ~handleMenu,
      ~menu,
      ~unitIndex,
      ~timeIndex,
      ~updateIndex,
      ~updateTimeIndex,
      _children
    ) => {
  let handleClick = (url: string) =>
    Linking.canOpenURL(url)
    |> Js.Promise.then_(
         (a) =>
           switch a {
           | true => Linking.openURL(url)
           | _ => Js.Promise.resolve()
           }
       )
    |> ignore;
  {
    ...component,
    render: (_self) =>
      <ContentModal
        toggleView=handleMenu
        visible=menu
        content=(
          modalContent(
            handleClick,
            unitIndex,
            updateIndex,
            timeIndex,
            updateTimeIndex
          )
        )
      />
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~handleMenu=jsProps##handleMenu,
        ~menu=jsProps##menu,
        ~unitIndex=jsProps##unitIndex,
        ~timeIndex=jsProps##timeIndex,
        ~updateIndex=jsProps##updateIndex,
        ~updateTimeIndex=jsProps##updateTimeIndex,
        [||]
      )
  );
