import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { NewUserData } from "../../../../types";
import { colors } from "../../../colors";
import PhoneLink from "../../../UI/Text/PhoneLink";
import RightActions from "./ItemListRightActions";
import Animated from "react-native-reanimated";
const CustomerSingleListItem = ({
  setModalVisible,
  setCustomerPressed,
  customer,
  onEditCustomerPress,
}) => {
  const swipeRef = useRef<Swipeable>();
  const informationIconPressHandler = (customer: NewUserData) => {
    setModalVisible(true);
    setCustomerPressed(customer);
  };

  return (
    <Swipeable
      ref={swipeRef}
      shouldCancelWhenOutside
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          customer={customer}
          onEdit={onEditCustomerPress}
          swipeRef={swipeRef}
        />
      )}
    >
      <DataTable.Row>
        <DataTable.Cell>{customer.fullName}</DataTable.Cell>
        <DataTable.Cell numeric>
          <PhoneLink style={{}} phoneNumber={customer.phoneNumber} />
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Ionicons
            name="md-information-circle-outline"
            size={24}
            color={colors.secondary}
            onPress={() => informationIconPressHandler(customer)}
          />
        </DataTable.Cell>
      </DataTable.Row>
    </Swipeable>
  );
};
export default CustomerSingleListItem;
