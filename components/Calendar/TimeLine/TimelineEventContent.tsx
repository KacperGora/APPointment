import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../colors";

const TimelineEventContent = ({ event }) => {
  const worker = event.worker;
  console.log(event);
  return (
    <View style={[{ backgroundColor: event.color }, styles.container]}>
    
      <View
        style={[
          styles.workerBatch,
          {
            backgroundColor:
              worker === "Monia" ? colors.accent : colors.primary,
          },
        ]}
      >
        <Text style={styles.workerBatchText}>{event.worker.slice(0, 1)}</Text>
      </View>
      <Text style={styles.text}>{event.title}</Text>
      <Text style={styles.text}> {event.serviceName}</Text>
      <Text style={styles.text}>
        {event.startHourStr} - {event.endHour.slice(0, 5)}
      </Text>
    </View>
  );
};
export default TimelineEventContent;
const styles = StyleSheet.create({
  // test: {
  //   width: 2,
  //   height: "100%",
  //   backgroundColor: "red",
  //   opacity: 0.5
  // },
  container: {
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { height: 2, width: 12 },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    height: "100%",
    width: "100%",
    borderLeftWidth: 4,
    borderColor: colors.accent,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    position: "relative",
    bottom: 21,
    // marginTop: 4,
  },

  workerBatch: {
    height: 16,
    width: 16,
    backgroundColor: colors.accent,
    borderRadius: 50,
  },
  workerBatchText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    position: "relative",

    shadowColor: "black",
    shadowOffset: { height: 4, width: 6 },
    shadowOpacity: 0.75,
    shadowRadius: 4,
  },
});
