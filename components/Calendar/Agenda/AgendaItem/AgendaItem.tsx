import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Meeting, NewUserData } from "../../../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import AgendaHourBox from "./AgendaItemHour/AgendaHourBox";
import AgendaItemDetail from "./AgendaItemDetail/AgendaItemDetail";
import AgendaItemInformation from "./AgendaItemInformation/AgendaItemInformation";
import { SaloonContext } from "../../../../store/SaloonStore";
import CustomerModal from "../../../CustomerModal/CustomerModal";

interface ItemProps {
  item: Meeting;
}

const AgendaItem = (props: ItemProps) => {
  const { item } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const currentCustomer = customers.filter(
    (customer) => customer.fullName === item.title
  )[0];
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
