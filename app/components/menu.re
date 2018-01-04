open BsReactNative;

let component = ReasonReact.statelessComponent("Menu");

let styles =
  StyleSheet.create(
    Style.(
      {
        "title":
          style([
            fontSize(Float(16.)),
            fontFamily("HelveticaNeue"),
            marginTop(Pt(20.)),
            marginBottom(Pt(20.)),
            color(Config.AppColors.darkGrey),
            fontWeight(`Bold)
          ]),
        "image": style([width(Pt(120.)), height(Pt(80.)), resizeMode(Contain)]),
        "credits": style([alignItems(Center), width(Pct(100.))])
      }
    )
  );

let modalContent =
    (
      handleClick,
      unitIndex,
      updateIndex,
      timeIndex,
      updateTimeIndex,
      resetOnboarding
    ) =>
  <View style=Style.(style([position(Relative), alignItems(Center)]))>
    <Text style=styles##title>
      (ReasonReact.stringToElement("Settings"))
    </Text>
    <SegmentedControllOS
      style=Style.(style([backgroundColor("transparent"), width(Pct(80.))]))
      tintColor="#343434"
      values=["Metric", "Imperial"]
      selectedIndex=unitIndex
      onChange=updateIndex
    />
    <SegmentedControllOS
      style=Style.(
              style([
                backgroundColor("transparent"),
                width(Pct(80.)),
                marginTop(Pt(20.))
              ])
            )
      tintColor="#343434"
      values=["24 Hour", "12 Hour"]
      selectedIndex=timeIndex
      onChange=updateTimeIndex
    />
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
      ~resetOnboarding,
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
            updateTimeIndex,
            resetOnboarding
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
        ~resetOnboarding=jsProps##resetOnboarding,
        [||]
      )
  );
