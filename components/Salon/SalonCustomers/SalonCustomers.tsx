import { Keyboard } from "react-native";
import React, { useContext, useState } from "react";
import CustomersList from "./CustomerList";
import { SafeAreaView } from "react-native-safe-area-context";
import SaloonCustomersListTools from "./SaloonCustomersTools";
import { SaloonContext } from "../../../store/SaloonStore";
import AddNewCustomerBottomSheet from "./AddNewCustomerBottomSheet";
function SalonCustomers() {
  const salonCtx = useContext(SaloonContext);
  const [index, setIndex] = useState(0);
  const [customers, setCustomers] = useState(salonCtx.customers);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

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
    <SafeAreaView style={{ backgroundColor: "white", height: "110%" }}>
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
      <AddNewCustomerBottomSheet index={index} setIndex={setIndex} />
    </SafeAreaView>
  );
}

export default SalonCustomers;
