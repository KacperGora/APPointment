import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { colors } from "../colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Targets from "./Targets/Targets";
import AddNewCustomer from "./Customers/AddNewCustomer";
const SettingsHome = () => {
  const [targetsShown, setTargetsShown] = useState(false);
  const [customersShown, setCustomersShown] = useState(false);
  const [servicesShown, setServicesShown] = useState(false);
  const pressHandler = (comingFrom) => {
    switch (comingFrom) {
      case "target": {
        setTargetsShown(true);
        setServicesShown(false);
        setCustomersShown(false);
        break;
      }
      case "customers": {
        setTargetsShown(false);
        setServicesShown(false);
        setCustomersShown(true);
        break;
      }
      case "services": {
        setTargetsShown(false);
        setServicesShown(true);
        setCustomersShown(false);
        break;
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          width: "100%",
          paddingBottom: 16,
          flexDirection: "row",
        }}
      >
        <Pressable onPress={() => pressHandler("target")}>
          <View style={styles.settingItem}>
            <Text>Dostosuj targety</Text>
            <Feather name="target" size={24} color="black" />
          </View>
        </Pressable>
        <Pressable onPress={() => pressHandler("customers")}>
          <View style={styles.settingItem}>
            <Text>Zarządzaj klientami</Text>
            <Ionicons name="person-add-outline" size={24} color="black" />
          </View>
        </Pressable>
        <Pressable onPress={() => pressHandler("services")}>
          <View style={styles.settingItem}>
            <Text>Zarządzaj usługami</Text>
            <AntDesign name="edit" size={24} color="black" />
          </View>
        </Pressable>
      </ScrollView>
      {targetsShown && <Targets />}
      {customersShown && <AddNewCustomer />}
      {servicesShown && (
        <View>
          <Text>services</Text>
        </View>
      )}
    </View>
  );
};

export default SettingsHome;
const styles = StyleSheet.create({
  container: {
    margin: 12,
    alignItems: "flex-start",
  },
  settingItem: {
    width: 150,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 4 },
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
});
