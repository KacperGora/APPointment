import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "../../../UI/Spinner/Spinner";
import { NewUserData, RightActionArgs } from "../../../../types";
import useFirebase from "../../../../hooks/useFirebase";
const RightActions: React.FC<RightActionArgs> = ({
  progress,
  dragX,
  customer,
  onEdit,
  swipeRef,
}) => {
  const scale = dragX.interpolate({
    inputRange: [-80, 0],
    outputRange: [0.7, 0],
  });
  const { makeFirebaseCall, isLoading } = useFirebase("customers");

  const deleteIconPressHandler = async (customer: NewUserData) => {
    makeFirebaseCall("delete", customer);
    swipeRef.current.close();
  };
  const listRightActionsConfig = [
    {
      id: 1,
      onPress: () => deleteIconPressHandler(customer),
      icon: <AntDesign name="delete" size={24} color="black" />,
      backgroundColorContainer: "#ffc6c4",
    },
    {
      id: 2,
      onPress: () => {
        onEdit(customer);
        swipeRef.current.close();
      },
      icon: <AntDesign name="edit" size={24} color="white" />,
      backgroundColorContainer: "#2e8b57",
    },
  ];
  return (
    <>
      {listRightActionsConfig.map((el) => {
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
