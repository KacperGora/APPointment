import { Keyboard, View } from "react-native";
import React, { useContext, useState } from "react";
import CustomersList from "./CustomerList";

import SaloonCustomersListTools from "./SaloonCustomersTools";
import { SaloonContext } from "../../../store/SaloonStore";
import AddNewCustomerForm from "./AddNewCustomerForm";
import BottomSheetForm from "../../BottomSheet/BottomSheetComponent";

function SalonCustomers() {
  const salonCtx = useContext(SaloonContext);
  const [index, setIndex] = useState(0);
  const [customers, setCustomers] = useState(salonCtx.customers);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchInputChangeHandler = (value: string) => {
    setSearchValue(value);
  };

  const iconPressHandler = () => {
    if (index === 1) {
      setIndex(0);
    } else setIndex(1);
    Keyboard.dismiss();
  };

  return (
    <>
      <SaloonCustomersListTools
        searchInputValue={searchValue}
        searchInputChangeHandler={searchInputChangeHandler}
        iconPressHandler={iconPressHandler}
      />
      <CustomersList
        customers={customers}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <BottomSheetForm index={index} setIndex={setIndex}>
        <AddNewCustomerForm hideBottomModal={iconPressHandler} />
      </BottomSheetForm>
    </>
  );
}

export default SalonCustomers;
