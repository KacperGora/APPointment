import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Meeting } from "../../../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import AgendaHourBox from "./AgendaItemHour/AgendaHourBox";
import AgendaItemDetail from "./AgendaItemDetail/AgendaItemDetail";
import AgendaItemInformation from "./AgendaItemInformation/AgendaItemInformation";
import AgendaModalItem from "./AgendaModalItemInformation/AgendaModalItem";

interface ItemProps {
  item: Meeting;
}

const AgendaItem = (props: ItemProps) => {
  const { item } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const itemPressed = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={itemPressed} style={styles.container}>
        <View style={styles.item}>
          <AgendaHourBox item={item} />
          <AgendaItemDetail item={item} />
          <AgendaItemInformation item={item} />
        </View>
      </TouchableOpacity>
      {modalVisible ? (
        <AgendaModalItem
          item={item}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
    </>
  );
};

export default AgendaItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderWidth: 2,
    borderColor: "#c7c7c746",
    borderRadius: 12,
  },
  container: {
    shadowColor: "#d4aeae",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});
