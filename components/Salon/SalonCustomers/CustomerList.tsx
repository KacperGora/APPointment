import React, { useState } from "react";
import { Linking } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../colors";
import { Ionicons } from "@expo/vector-icons";

import {
  RectButton,
  ScrollView,
  Swipeable,
} from "react-native-gesture-handler";

import CustomerListHeading from "./CustomerListHeading";
import Animated from "react-native-reanimated";
import CustomerModal from "../../CustomerModal/CustomerModal";
const CustomersList = ({ customers, modalVisible, setModalVisible }) => {
  const [customerPressed, setCustomerPressed] = useState(null);
  const renderLeftActions = (progress, dragX) => {
    return (
      <RectButton onPress={() => console.log("object")}>
        <Animated.Text
          style={[
            {
              transform: [{ translateX: -15 }],
            },
          ]}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </Animated.Text>
      </RectButton>
    );
  };
  return (
    <View style={styles.container}>
      <CustomerListHeading />
      <ScrollView style={styles.scrollList}>
        {customers.map((customer) => {
          return (
            <Swipeable
              key={Math.random()}
              renderRightActions={renderLeftActions}
            >
              <View style={styles.row}>
                <View
                  style={[
                    styles.column,
                    {
                      width: "45%",
                      borderRightColor: "gray",
                      borderRightWidth: 0.2,
                    },
                  ]}
                >
                  <Text style={styles.meetingDetail}>{customer.fullName}</Text>
                </View>
                <View style={styles.column}>
                  <Text
                    style={styles.meetingDetail}
                    onPress={() => {
                      Linking.openURL(`tel:${customer.phoneNumber}`);
                    }}
                  >
                    {customer.phoneNumber}
                  </Text>
                </View>

                <View
                  style={[
                    styles.column,
                    { width: 40, justifyContent: "flex-end" },
                  ]}
                >
                  <Ionicons
                    name="md-information-circle-outline"
                    size={24}
                    color={colors.secondary}
                    onPress={() => {
                      setModalVisible(true);
                      setCustomerPressed(customer);
                    }}
                  />
                </View>
              </View>
            </Swipeable>
          );
        })}
        {modalVisible && (
          <CustomerModal
            item={customerPressed}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.gray,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "white",
    flex: 1,

    zIndex: -1,
  },
  column: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    marginVertical: 12,
    marginHorizontal: 6,
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",

    paddingHorizontal: 6,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.3,
  },

  meetingDetail: {
    fontSize: 14,
    alignSelf: "flex-start",
  },
  scrollList: {
    flex: 1,
  },
});
export default CustomersList;
