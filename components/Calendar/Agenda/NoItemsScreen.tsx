import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../../types";
type NoItemsScreenProps = {
  heading: string;
  description: string;
  noAgendaEvents?: boolean;
};
const NoItemsScreen: React.FC<NoItemsScreenProps> = ({
  heading,
  description,
  noAgendaEvents,
}) => {
  const navigation = useNavigation<Navigation>();
  return (
    <Pressable onPress={() => navigation.navigate("AddEvent")}>
      <View>
        <Text style={styles.text}>{heading}</Text>
        <Text style={styles.textDetail}>{description}</Text>
        {noAgendaEvents ? (
          <View style={styles.icon}>
            <Ionicons
              name="add"
              size={32}
              color="white"
              style={{ fontWeight: "700" }}
            />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export default NoItemsScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    letterSpacing: 1.2,
    color: "gray",
  },
  textDetail: {
    fontSize: 18,
    color: "lightgray",
    letterSpacing: 1.1,
    textAlign: "center",
    marginVertical: 12,
  },
  icon: {
    alignSelf: "center",
    backgroundColor: "#ec368e6a",
    borderColor: "#ec368e6a",
    borderRadius: 50,
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
  },
});
