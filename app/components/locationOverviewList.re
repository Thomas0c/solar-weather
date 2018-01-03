open BsReactNative;

type state = {reference: ref(option(ReasonReact.reactRef))};

let component = ReasonReact.statelessComponent("LocationOverviewList");

let styles =
  StyleSheet.create(
    Style.(
      {
        "main":
          style([
            width(Pct(100.)),
            alignItems(Center),
            height(Pct(100.)),
            justifyContent(FlexStart),
            backgroundColor(Config.AppColors.medGrey),
            position(Relative)
          ]),
        "shadow":
          style([
            width(Pt(2.)),
            backgroundColor(Config.AppColors.opaqueBlack),
            position(Absolute),
            left(Pt(0.)),
            top(Pt(0.)),
            height(Pct(100.)),
            zIndex(2)
          ]),
        "button":
          style([
            position(Absolute),
            bottom(Pt(20.)),
            width(Pt(100.)),
            height(Pt(25.))
          ]),
        "image":
          style([
            alignSelf(Center),
            width(Pct(40.)),
            height(Pt(25.)),
            resizeMode(Contain)
          ]),
        "listView": style([width(Pct(100.))]),
        "listContainer": style([height(Pct(90.)), width(Pct(100.))])
      }
    )
  );

let keyExtractor = (item, _) => string_of_int(item##id);

let renderFlatList = (day: bool, activeLocation: int, onDelete, onSelect) =>
  FlatList.renderItem(
    ({item, index}) => {
      let id: int = item##id;
      let stringId: string = string_of_int(id);
      <Location
        id
        lat=item##lat
        lng=item##lng
        onDelete
        onSelect
        index
        day
        key=stringId
        activeLocation
        name=item##name
        icon=item##currently##icon
      />
    }
  );

let make =
    (
      ~locations,
      ~day: bool,
      ~activeLocation,
      ~openModal,
      ~onDelete,
      ~onSelect,
      _children
    ) => {
  ...component,
  render: (_self) =>
    <View style=styles##main>
      <View style=styles##shadow />
      <View style=styles##listContainer>
        <SwipeList.View
          useFlatList=Js.true_
          keyExtractor
          disableLeftSwipe=Js.true_
          closeOnScroll=Js.true_
          style=styles##listView
          data=locations
          renderItem=(renderFlatList(day, activeLocation, onDelete, onSelect))
        />
      </View>
      <TouchableOpacity style=styles##button onPress=openModal>
        <Image
          style=styles##image
          source=Image.(
                   Required(Packager.require("../../../../assets/addIcon.png"))
                 )
        />
      </TouchableOpacity>
    </View>
};
