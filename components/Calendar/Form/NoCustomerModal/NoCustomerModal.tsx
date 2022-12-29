import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../colors";
import ActionButtons from "../../../UI/ActionButtons/ActionButtons";
import RegularButton from "../../../UI/Buttons/RegularButton";

const NoCustomerModal = ({
  modalShow,
  setModalShow,
  showBottomSheetHandler,
  cancelButtonPressHandler,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalShow}
      onRequestClose={() => {
        setModalShow(!modalShow);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Nie znaleziono takiego klienta</Text>
          <Text style={styles.modalText}>Czy chcesz go dodać?</Text>
          <ActionButtons
            confirmButton={{
              onPress: showBottomSheetHandler,
              title: "Dodaj",
              primary: true,
            }}
            dismissButton={{
              onPress: cancelButtonPressHandler,
              title: "Powrót",
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default NoCustomerModal;
const styles = StyleSheet.create({
  modalHeader: {
    fontWeight: "600",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1a1a1a56",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.graylight,
    padding: 35,
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
