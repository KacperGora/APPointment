import React from "react";
import { CustomerModalProps, Meeting, Navigation } from "../../types";
import RegularButton from "../UI/Buttons/RegularButton";
import CustomerModalInformation from "./CustomerModalInformation/CustomerModalInformation";
import Modal from "react-native-modal";
import { ModalContentContainer } from "./style/Modal.style";
import { useNavigation } from "@react-navigation/native";
import { LayoutAnimation } from "react-native";
import { PackedEvent } from "@howljs/calendar-kit";
import Animated, { Layout, LightSpeedInLeft } from "react-native-reanimated";
const CustomerModal: React.FC<CustomerModalProps> = ({
  modalVisible,
  setModalVisible,
  item,
}) => {
  const navigation = useNavigation<Navigation>();
  const onDetailPressHandler = (destination: string, item: Meeting) => {
    LayoutAnimation.linear();
    setModalVisible(false);
    navigation.navigate("Tydzień", { date: destination, event: item });
  };

  return (
    <Animated.View entering={LightSpeedInLeft} layout={Layout.springify()}>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        backdropOpacity={0.3}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <ModalContentContainer>
          <CustomerModalInformation
            item={item}
            onPress={onDetailPressHandler}
          />
          <RegularButton
            onPress={() => setModalVisible(!modalVisible)}
            title="Powrót"
            btnStyles={{ borderWidth: 1, borderColor: "lightgray" }}
          />
        </ModalContentContainer>
      </Modal>
    </Animated.View>
  );
};
export default CustomerModal;
