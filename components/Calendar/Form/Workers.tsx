import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import pickHandler from "../../../Utils/pickHandler";
import { colors } from "../../colors";
const workers = [];
const Workers = ({ getWorkers }) => {
  const [workers, setWorkers] = useState([
    { name: "Justyna", isActive: true },
    { name: "Monika", isActive: false },
  ]);
  const servicePressHandler = (index: number) => {
    pickHandler(index, workers, setWorkers);
  };
  useEffect(() => {
    getWorkers(workers.filter((worker) => worker.isActive === true)[0]);
  }, [workers]);

  return (
    <View style={styles.serviceBox}>
      {workers.map((worker, index) => (
        <Pressable
          key={index}
          onPress={() => servicePressHandler(index)}
          style={[
            styles.serviceContainer,
            worker.isActive ? styles.active : null,
          ]}
        >
          <Text style={styles.singleService}>{worker.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Workers;

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
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.greydark,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
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
