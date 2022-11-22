import isEmpty from "lodash/isEmpty";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Meeting } from "../../../types";
import { colors } from "../../colors";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import AgendaModalItem from "./AgendaModalItem";

interface ItemProps {
  item: Meeting;
}

const AgendaListItem = (props: ItemProps) => {
  const { item } = props;
  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible);
  const itemPressed = useCallback(() => {
    setModalVisible(true);
  }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>Brak spotkań w tym dniu.</Text>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity onPress={itemPressed}>
        <Animated.View style={styles.item}>
          <View style={styles.container}>
            <View style={styles.hoursBox}>
              <Text style={styles.itemHourText}>{`${
                item.startHourStr
              }-${item.endHour.slice(0, 5)}`}</Text>
              <Text style={styles.itemDurationText}>
                {item.serviceDuration} minut
              </Text>
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitleText}>{item.title}</Text>
              <Text style={styles.itemDetailText}>{item.serviceName}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
      {modalVisible && (
        <AgendaModalItem
          item={item}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default React.memo(AgendaListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingBottom: 4,
  },
  hoursBox: {
    padding: 4,
  },
  itemDetailText: {
    fontSize: 12,
    alignSelf: "center",
  },
  itemDetails: {
    justifyContent: "center",
    alignContent: "center",
    width: 150,
  },
  item: {
    padding: 20,
    backgroundColor: "white",

    flexDirection: "row",
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
    margin: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "red",
    shadowColor: "#d4aeae",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
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
