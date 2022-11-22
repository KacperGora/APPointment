import { Text, View, Pressable, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import pickHandler from "../../../Utils/pickHandler";
import { servicesDetails } from "../../../data";
import { colors } from "../../colors";
import { Service } from "../../../types";
import Separator from "./Separator";
type ServiceProps = {
  getPickedService: Dispatch<SetStateAction<any>>;
};

const Services: React.FC<ServiceProps> = ({ getPickedService }) => {
  const [services, setServices] = useState<Service>(servicesDetails);
  const servicePressHandler = (index: number) => {
    pickHandler(index, services, setServices);
  };
  useEffect(() => {
    getPickedService(
      services.filter((service) => service.isActive === true)[0]
    );
  }, [services]);

  return (
    <>
      {/* <Separator>Wybierz usługę</Separator> */}
      <View style={styles.serviceBox}>
        {services.map((service, index) => (
          <Pressable
            key={index}
            onPress={() => servicePressHandler(index)}
            style={[
              styles.serviceContainer,
              service.isActive ? styles.active : null,
            ]}
          >
            <Text style={styles.singleService}>{service.name}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default Services;

const styles = StyleSheet.create({
  serviceBox: {
    margin: 4,

    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    padding: 4,
    borderColor: colors.greydark,
    margin: 4,
    height: 50,
    width: 150,
  },
  active: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.greydark,
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    transform: [{ scaleX: 1.05 }],
  },
  singleService: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    textShadowColor: "none",
  },
});
