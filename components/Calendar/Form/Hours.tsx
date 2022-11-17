import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { colors } from "../../colors";
import pickHandler from "../../../Utils/pickHandler";
import { hours } from "../../../data";
import { MeetingsContext } from "../../../store/store";
import { Hours, Meeting } from "../../../types";

type ComponentProps = {
  pickedDay: string;
  setPickedHour: any;
  worker: string;
};
const HoursComponent: React.FC<ComponentProps> = ({
  pickedDay,
  setPickedHour,
  worker,
}) => {
  const ctx = useContext(MeetingsContext);
  const meetings = ctx?.meetings;
  const [availableHours, setAvailableHours] = useState<Hours[]>(hours);
  const excludedTimesAtThisDay: string[] = [];

  const meetingsAtThisDay: Meeting[] = meetings[pickedDay]?.filter(
    (meeting) => meeting.worker === worker
  );

  const hourPressHandler = (index: number) => {
    pickHandler(index, availableHours, setAvailableHours);
  };
  useEffect(() => {
    setPickedHour(availableHours.filter((hour) => hour.isActive)[0]?.hour);
  }, [availableHours]);

  useEffect(() => {
    meetingsAtThisDay?.forEach((element) =>
      excludedTimesAtThisDay.push(...element.excludedTimes)
    );
    const res = hours.filter(
      (item) => !excludedTimesAtThisDay.includes(item.hour)
    );
    setAvailableHours(res);
  }, [pickedDay, worker]);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {availableHours.map((hour, index) => (
        <Pressable
          key={index}
          onPress={() => hourPressHandler(index)}
          style={[styles.container, hour.isActive && styles.active]}
        >
          <Text style={styles.hour}>{hour.hour}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
export default HoursComponent;
const styles = StyleSheet.create({
  active: {
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.greydark,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    transform: [{ scaleX: 1.05 }],
  },
  container: {
    margin: 6,
    padding: 12,
    borderRadius: 10,
    borderColor: colors.greydark,
    borderWidth: 0.5,
    height: 50,
  },
  hour: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});