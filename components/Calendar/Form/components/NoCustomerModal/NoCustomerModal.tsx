import React from "react";
import { Modal } from "react-native";
import ActionButtons from "../../../../UI/ActionButtons/ActionButtons";
import RegularText16 from "../../../../UI/Text/RegularText";
import SmallText from "../../../../UI/Text/SmallText";
import {
  ModalCentredViewContainer,
  ModalContainer,
} from "../../style/Form.style";

const NoCustomerModal = ({
  modalShow,
  setModalShow,
  showBottomSheetHandler,
  cancelButtonPressHandler,
}) => {
  const confirmButton = {
    onPress: showBottomSheetHandler,
    title: "Dodaj",
    primary: true,
  };
  const dismissButton = {
    onPress: cancelButtonPressHandler,
    title: "Powrót",
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalShow}
      onRequestClose={() => {
        setModalShow(!modalShow);
      }}
    >
      <ModalCentredViewContainer>
        <ModalContainer>
          <RegularText16 textStyles={{ marginVertical: 12 }}>
            Nie znaleziono takiego klienta
          </RegularText16>
          <SmallText textStyles={{ marginBottom: 12 }}>
            Czy chcesz go dodać?
          </SmallText>
          <ActionButtons
            confirmButton={confirmButton}
            dismissButton={dismissButton}
          />
        </ModalContainer>
      </ModalCentredViewContainer>
    </Modal>
  );
};
export default NoCustomerModal;
