import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../../types";

const NoEventsAgendaScreen = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <Pressable onPress={() => navigation.navigate("AddEvent")}>
      <View>
        <Text style={styles.text}>Nie masz żadnych spotkań</Text>
        <Text style={styles.textDetail}>dodaj nowe aby zobaczyć je tutaj</Text>
        <View style={styles.icon}>
          <Ionicons
            name="add"
            size={32}
            color="white"
            style={{ fontWeight: "700" }}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default NoEventsAgendaScreen;

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
