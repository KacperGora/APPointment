import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../colors";

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
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[styles.button]}
              onPress={cancelButtonPressHandler}
            >
              <Text style={styles.cancelTextStyle}>Powrót</Text>
            </Pressable>
            <Pressable
              onPress={showBottomSheetHandler}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle}>Dodaj</Text>
            </Pressable>
          </View>
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
  cancelTextStyle: {
    color: "black",
  },
  button: {
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "lightgray",
  },

  buttonClose: {
    backgroundColor: colors.primary,
    borderWidth: 0,
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
