import React, { useContext, useEffect, useState } from "react";
import SaloonCustomersListTools from "./components/SaloonCustomersTools";
import { SaloonContext } from "../../../store/SaloonStore";
import AddNewCustomerForm from "./components/AddNewCustomerForm";
import BottomSheetForm from "../../BottomSheet/BottomSheetComponent";
import CustomersList from "./components/CustomerList";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../colors";
import { NewUserData } from "../../../types";

function SalonCustomers() {
  const salonCtx = useContext(SaloonContext);
  const [index, setIndex] = useState(0);
  const [customers, setCustomers] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);

  const searchPressHandler = (value: string) => {
    setCustomers(
      Object.values(customers).filter((el: NewUserData) =>
        el.fullName.toLowerCase().includes(value.toLowerCase())
      )
    );
    value === "" && setCustomers(salonCtx.customers);
  };

  const iconPressHandler = () => {
    setIndex(1);
    setBottomSheetVisible(true);
  };
  useEffect(() => {
    setCustomers(salonCtx.customers);
  }, [salonCtx.customers]);
  const hideBottomSheetHandler = () => {
    setIndex(0);
    setBottomSheetVisible(false);
  };
  return (
    <>
      <SaloonCustomersListTools
        searchPressHandler={searchPressHandler}
        iconPressHandler={iconPressHandler}
      />
      <CustomersList
        customers={customers}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <FloatingAction
        color={colors.secondary}
        showBackground={false}
        overlayColor={"#9ea4ab5d"}
        actionsPaddingTopBottom={1}
        onPressMain={iconPressHandler}
      />
      {bottomSheetVisible ? (
        <BottomSheetForm
          index={index}
          setIndex={setIndex}
          onCloseBottomSheet={hideBottomSheetHandler}
        >
          <AddNewCustomerForm
            hideBottomModal={hideBottomSheetHandler}
            setIndex={setIndex}
          />
        </BottomSheetForm>
      ) : null}
    </>
  );
}

export default SalonCustomers;
