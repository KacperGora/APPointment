import React from "react";
import { Modal, Text, View, StyleSheet, Pressable } from "react-native";
import { CustomerModalProps } from "../../types";
import CustomerModalInformation from "./CustomerModalInformation/CustomerModalInformation";
import CustomerModalPhoneNumber from "./CustomerModalPhoneNumber/CustomerModalPhoneNumber";

const CustomerModal: React.FC<CustomerModalProps> = ({
  modalVisible,
  setModalVisible,
  item,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomerModalInformation item={item} style={styles.modalText} />
          <CustomerModalPhoneNumber
            style={styles.modalText}
            phoneNumber={item.phoneNumber}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Powrót</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default CustomerModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
