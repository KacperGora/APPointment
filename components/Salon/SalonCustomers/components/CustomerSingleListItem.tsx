import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { NewUserData } from "../../../../types";
import { colors } from "../../../colors";
import PhoneLink from "../../../UI/Text/PhoneLink";
import RightActions from "../../../UI/SwipeRightActions/ItemListRightActions";
import Animated from "react-native-reanimated";
import useFirebase from "../../../../hooks/useFirebase";
import { AntDesign } from "@expo/vector-icons";
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
  const { makeFirebaseCall, isLoading } = useFirebase("customers");

  const deleteIconPressHandler = async (customer: NewUserData) => {
    makeFirebaseCall("delete", customer);
    swipeRef.current.close();
  };

  const listRightActionsConfig = [
    {
      id: 1,
      onPress: () => deleteIconPressHandler(customer),
      icon: <AntDesign name="delete" size={24} color="black" />,
      backgroundColorContainer: "#ffc6c4",
    },
    {
      id: 2,
      onPress: () => {
        onEditCustomerPress(customer);
        swipeRef.current.close();
      },
      icon: <AntDesign name="edit" size={24} color="white" />,
      backgroundColorContainer: "#2e8b57",
    },
  ];
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
          data={listRightActionsConfig}
          isLoading={isLoading}
        />
      )}
    >
      <DataTable.Row>
        <DataTable.Cell>{customer.fullName}</DataTable.Cell>
        <DataTable.Cell numeric>
          <PhoneLink style={{}} phoneNumber={customer?.phoneNumber} />
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
