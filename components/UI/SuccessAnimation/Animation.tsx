import React from "react";
import Lottie from "lottie-react-native";
type AnimationSuccess = "success" | "failed";
export default function Animation() {
  return (
    <Lottie
      source={require("../../../assets/animations/success.json")}
      autoPlay
      loop
      style={{
        height: 150,
        width: 150,
        justifyContent: "center",
        alignSelf: "center",
      }}
    />
  );
}
