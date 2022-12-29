import React from "react";
import { Text, View, StyleSheet } from "react-native";
import useSetFontSizeForTimelineEvents from "../../../../hooks/calendar/useSetFontSizeForTimelineEvent";

const TimelineEventContent = ({ event, userPickedView }) => {
  const worker = event.worker;
  const fontSize = useSetFontSizeForTimelineEvents(userPickedView);

  return (
    <View style={[styles.container, { backgroundColor: event.color }]}>
      <View
        style={[
          styles.workerBatch,
          {
            height: fontSize,
            width: fontSize,
            backgroundColor: worker === "Monika" ? "#f160d1" : "#e9e0d08b",
          },
        ]}
      >
        <Text
          style={[
            styles.workerBatchText,
            {
              fontSize: fontSize - 2,
              color: worker === "Monika" ? "white" : "black",
            },
          ]}
        >
          {worker.slice(0, 1)}
        </Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={[styles.customerNameText, { fontSize: fontSize }]}>
          {event.title}
        </Text>
        <Text style={{ fontSize: fontSize, marginBottom: 6 }}>
          {event.serviceName}
        </Text>
      </View>
    </View>
  );
};
export default TimelineEventContent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9ae1f4",
    overflow: "hidden",
    borderLeftWidth: 3,
    borderLeftColor: "#266382",
    padding: 4,
    height: "100%",
    width: "100%",
    borderWidth: 0.5,
    borderColor: "white",
  },

  customerNameText: {
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 6,
  },
  workerBatch: {
    height: 10,
    width: 10,
    alignSelf: "flex-end",
    borderRadius: 50,
    backgroundColor: "#e9e0d08b",
    borderWidth: 0.4,
  },
  workerBatchText: {
    textAlign: "center",
    color: "black",
    fontWeight: "600",
  },
});
