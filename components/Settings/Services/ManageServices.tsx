import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { servicesDetails } from "../../../data";
import { colors } from "../../colors";
import FloatingButton from "../../UI/Buttons/FloatingButton";
import { AntDesign } from "@expo/vector-icons";
const ManageServices = () => {
  const [services, setServices] = useState(servicesDetails);
  const serviceChangeHandler = () => {};
  const actions = [
    {
      text: "Dodaj usługę",
      icon: <AntDesign name="plus" size={24} color="white" />,
      name: "addSpending",
      position: 1,
      color: colors.secondary,
    },
  ];
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text
        style={{
          margin: 24,
          textAlign: "center",
          fontSize: 24,
          fontWeight: "600",
          color: colors.greydark,
        }}
      >
        Dodaj lub edytuj usługi
      </Text>
      <View>
        {services.map((service) => {
          return (
            <Pressable
              key={service.id}
              style={({ pressed }) => [
                {
                  flexDirection: "row",
                  padding: 12,
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderRadius: 12,
                  marginVertical: 6,
                  marginHorizontal: 12,
                  shadowColor: "gray",
                  shadowOffset: { width: 2, height: 4 },
                  shadowRadius: 2,
                  shadowOpacity: 0.5,
                  backgroundColor: "white",
                },
                ,
                pressed && { opacity: 0.3 },
              ]}
            >
              <Text
                style={{ width: 200, marginHorizontal: 6, marginVertical: 12 }}
              >
                {service.value}
              </Text>
              <Text
                style={{ width: 60, marginHorizontal: 6, marginVertical: 12 }}
              >
                {service.price}
              </Text>
              <Text
                style={{ width: 60, marginHorizontal: 6, marginVertical: 12 }}
              >
                {service.duration}'
              </Text>
            </Pressable>
          );
        })}
      </View>
      <FloatingButton actions={actions} onPress={null} />
    </View>
  );
};

export default ManageServices;
