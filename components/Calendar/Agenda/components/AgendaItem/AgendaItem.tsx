import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Meeting } from "../../../../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import AgendaItemDetail from "./AgendaItemDetail/AgendaItemDetail";
import { SaloonContext } from "../../../../../store/SaloonStore";
import CustomerModal from "../../../../Customer modal/CustomerModal";
import AgendaHourBox from "./AgendaItemHour/AgendaHourBox";

interface ItemProps {
  item: Meeting;
}

const AgendaItem: React.FC<ItemProps> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const currentCustomer = customers.find(
    (customer) => customer.fullName === item.title
  );

  const itemPressed = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={itemPressed} style={styles.container}>
        <View style={styles.item}>
          <AgendaItemDetail item={item} />
          <AgendaHourBox item={item} />
        </View>
      </TouchableOpacity>
      {modalVisible ? (
        <CustomerModal
          item={currentCustomer}
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
