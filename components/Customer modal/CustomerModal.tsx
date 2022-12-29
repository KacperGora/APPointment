import React from "react";
import { Modal,  View, StyleSheet, Pressable } from "react-native";
import { CustomerModalProps } from "../../types";
import RegularButton from "../UI/Buttons/RegularButton";
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
      <Pressable
        onPress={() => setModalVisible(false)}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <CustomerModalInformation item={item} style={styles.modalText} />
          <CustomerModalPhoneNumber
            style={styles.modalText}
            phoneNumber={item.phoneNumber}
          />
          <RegularButton
            onPress={() => setModalVisible(!modalVisible)}
            title="Powrót"
            btnStyles={[styles.button, styles.buttonClose]}
            textStyles={styles.textStyle}
          />
        </View>
      </Pressable>
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

  buttonClose: {
    // backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
