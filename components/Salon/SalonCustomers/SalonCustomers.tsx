import { Keyboard } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
  useEffect(() => {
    setCustomers(salonCtx.customers);
  }, [salonCtx.customers]);

  const searchPressHandler = (value: string) => {
    setCustomers(
      customers.filter((el) =>
        el.fullName.toLowerCase().includes(value.toLowerCase())
      )
    );
    if (value === "") {
      setCustomers(salonCtx.customers);
    }
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
        searchPressHandler={searchPressHandler}
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
