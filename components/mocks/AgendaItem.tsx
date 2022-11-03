import isEmpty from "lodash/isEmpty";
import React, { useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { addHours, parseISO } from "date-fns";
import testIDs from "../Calendar/testIds";
import CustomButton from "../UI/CustomButton";

interface ItemProps {
  item: any;
}

const AgendaItem = (props: ItemProps) => {
  const { item } = props;

  const buttonPressed = useCallback(() => {
    Alert.alert("Show me more");
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>Brak spotkań w tym dniu.</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={itemPressed}
      style={styles.item}
      testID={testIDs.agenda.ITEM}
    >
      <View>
        <Text style={styles.itemHourText}>{`${item.hour}-${item.end}`}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <Text style={styles.itemDetailText}>{item.serviceName}</Text>
      </View>
      <View style={styles.itemButtonContainer}>
        <CustomButton onPress={buttonPressed}>Więcej</CustomButton>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  itemDetailText: {
    fontSize: 12,
    alignSelf: "center",
  },
  itemDetails: {
    justifyContent: "center",

    width: 150,
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { height: 2, width: 4 },
    shadowRadius: 1,
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,

    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
