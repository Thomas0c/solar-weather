module View = {
  [@bs.module "react-native-swipe-list-view"]
  external swipelist : ReasonReact.reactClass =
    "SwipeListView";
  let make =
      (
        ~useFlatList: option(Js.boolean)=?,
        ~keyExtractor: option((({.. "id": int}, 'a) => string))=?,
        ~disableLeftSwipe: option(Js.boolean)=?,
        ~closeOnScroll: option(Js.boolean)=?,
        ~style: option(BsReactNative.Style.t)=?,
        ~data: option(array(Js.t({..})))=?,
        ~renderItem: option(BsReactNative.FlatList.renderItem(Js.t('a)))=?,
        _children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=swipelist,
      ~props=
        Js.Undefined.(
          {
            "useFlatList": from_opt(useFlatList),
            "keyExtractor": from_opt(keyExtractor),
            "disableLeftSwipe": from_opt(disableLeftSwipe),
            "closeOnScroll": from_opt(closeOnScroll),
            "style": from_opt(style),
            "data": from_opt(data),
            "renderItem": from_opt(renderItem)
          }
        ),
      [||]
    );
};
