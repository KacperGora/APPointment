import React from "react";
import { Animated, TouchableOpacity } from "react-native";

import Spinner from "../Spinner/Spinner";
import { RightActionArgs } from "../../../types";
const RightActions: React.FC<RightActionArgs> = ({
  progress,
  dragX,
  data,
  isLoading,
}) => {
  const scale = dragX.interpolate({
    inputRange: [-80, 0],
    outputRange: [0.7, 0],
  });

  return (
    <>
      {data.map((el) => {
        return (
          <TouchableOpacity key={el.id} onPress={el.onPress}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: el.backgroundColorContainer,
                justifyContent: "center",
                margin: 2,
                shadowColor: "lightgray",
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 2,
                borderRadius: 6,
                transform: [{ scale }],
              }}
            >
              <Animated.Text
                style={{
                  color: "white",
                  paddingHorizontal: 10,
                  fontWeight: "600",
                  transform: [{ scale }],
                }}
              >
                {isLoading ? <Spinner borderWidth={1} size={20} /> : el.icon}
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};
export default RightActions;
