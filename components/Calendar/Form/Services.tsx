import { Text, View, Pressable, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import pickHandler from "../../../Utils/pickHandler";
import { servicesDetails } from "../../../data";
import { colors } from "../../colors";
import { Service } from "../../../types";
type ServiceProps = {
  getServices: Dispatch<SetStateAction<any>>;
};

const Services: React.FC<ServiceProps> = ({ getServices }) => {
  const [services, setServices] = useState<Service>(servicesDetails);
  const servicePressHandler = (index: number) => {
    pickHandler(index, services, setServices);
  };
  useEffect(() => {
    getServices(services.filter((service) => service.isActive === true)[0]);
  }, [services]);

  return (
    <View style={styles.serviceBox}>
      {services.map((service, index) => (
        <Pressable
          key={index}
          onPress={() => servicePressHandler(index)}
          style={[styles.serviceContainer, service.isActive && styles.active]}
        >
          <Text style={styles.singleService}>{service.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  serviceBox: {
    margin: 4,
    borderBottomWidth: 1,
    justifyContent: "space-around",
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
  active: { backgroundColor: "#f954a4c5" },
  singleService: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
