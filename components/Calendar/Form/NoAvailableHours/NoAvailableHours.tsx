import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NoAvailableHours = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.informationText}>
        Brak dostępnych godzin w tym dniu, wybierz proszę inny
      </Text>
    </View>
  );
};
export default NoAvailableHours;
const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  informationText: { textAlign: "center", fontSize: 24, marginTop: 200 },
});
