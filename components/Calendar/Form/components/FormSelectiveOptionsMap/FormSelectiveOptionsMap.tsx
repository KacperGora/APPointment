import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../../../colors";

const FormSelectiveOptionsMap = ({ data, pressHandler }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator
      horizontal
      style={styles.serviceBox}
    >
      {data.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => pressHandler(index)}
          style={[styles.container, item.isActive ? styles.active : null]}
        >
          <Text style={styles.item}>{item.value}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
export default FormSelectiveOptionsMap;
const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: colors.greydark,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    transform: [{ scaleX: 1.052 }],
  },
  container: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,

    height: "auto",
    borderColor: colors.greydark,
    borderWidth: 0.3,
  },
  item: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  serviceBox: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.3,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
});
