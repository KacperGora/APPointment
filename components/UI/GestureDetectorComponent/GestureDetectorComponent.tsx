import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const GestureDetectorComponent = ({ children, onGestureStartHandler }) => {
  const show = Gesture.Pan().onStart(onGestureStartHandler);

  return <GestureDetector gesture={show}>{children}</GestureDetector>;
};

export default GestureDetectorComponent;
