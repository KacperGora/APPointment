import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { CalendarContext } from "react-native-calendars";
import { MeetingsContext } from "../../store/CalendarStore";

const ToggleCalendarOptions: React.FC = ({}) => {
  const ctx = useContext(MeetingsContext);

  const pressHandler = () => {
    ctx.toggleTools();
  };
  return (
    <Pressable style={styles.pressableContainer} onPress={pressHandler}>
      <Ionicons name="filter" size={24} color={colors.primary} />
    </Pressable>
  );
};

export default ToggleCalendarOptions;

const styles = StyleSheet.create({
  pressableContainer: {
    height: 32,
  },
});
