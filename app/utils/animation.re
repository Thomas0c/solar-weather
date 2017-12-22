open BsReactNative;

let easeIn = (x) => x *. x *. x;

let animate = (stateAnim, toValue) =>
  Animated.CompositeAnimation.start(
    Animated.Timing.animate(
      ~value=stateAnim,
      ~toValue=`raw(toValue),
      ~easing=easeIn,
      ()
    ),
    ()
  );
