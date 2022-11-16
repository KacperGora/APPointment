import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";
import React from "react";

type Navigation = {
  navigate: (destination: string) => void;
};
const ToggleCalendarView: React.FC = ({}) => {
  const navigation = useNavigation<Navigation>();
  const pressHandler = () => {
    navigation.navigate("Timeline");
  };
  return (
    <Pressable style={styles.pressableContainer} onPress={pressHandler}>
      <Ionicons name="map" size={32} color={colors.primary} />
    </Pressable>
  );
};

export default ToggleCalendarView;

const styles = StyleSheet.create({
  pressableContainer: {
    padding: 2,
    width: 48,
    height: 48,
  },
});
