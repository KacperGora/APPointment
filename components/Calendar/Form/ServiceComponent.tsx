import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect, SetStateAction } from "react";
import { colors } from "../../colors";
import pickHandler from "../../../Utils/pickHandler";
import { hours, servicesDetails } from "../../../data";
import { MeetingsContext } from "../../../store/store";
import { useRoute } from "@react-navigation/native";
import { DateData } from "react-native-calendars";
type ServiceType = {
  name: string;
  isActive: boolean;
  duration: number;
  price: string;
};
type ParamsProps = {
  params: {
    date: DateData;
    items: any[];
    setItems: React.Dispatch<SetStateAction<any[]>>;
  };
  key: string;
  name: string;
};
type ComponentProp = {
  setService: any;
};
const ServiceComponent: React.FC<ComponentProp> = ({ setService }) => {
  const [services, setServices] = useState(servicesDetails);
  const [pickedService, setPickedService] = useState<ServiceType[]>();
  useEffect(() => {
    const activeService = services.filter(
      (service) => service.isActive === true
    );

    setService(activeService);
  }, [services]);
  const servicePressHandler = (index: number) => {
    pickHandler(index, services, setServices);
  };
  return (
    <View style={styles.serviceBox}>
      {services.map((service, index) => (
        <Pressable
          key={index}
          onPress={servicePressHandler.bind("", index)}
          style={[styles.serviceContainer, service.isActive && styles.active]}
        >
          <Text style={styles.singleService}>{service.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};
export default ServiceComponent;
const styles = StyleSheet.create({
  active: { backgroundColor: "#f954a4c5" },
  serviceBox: {
    margin: 4,
    borderBottomWidth: 1,

    justifyContent: "space-around",
    borderBottomColor: "green",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceContainer: {
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    padding: 4,
    borderColor: colors.primary,
    margin: 4,
    height: 50,
    width: 150,
  },
  singleService: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
