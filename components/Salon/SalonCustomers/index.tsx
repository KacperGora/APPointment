import React, { useContext, useEffect, useState } from "react";
import SaloonCustomersListTools from "./components/SaloonCustomersTools";
import { SaloonContext } from "../../../store/SaloonStore";
import AddNewCustomerForm from "./components/AddNewCustomerForm";
import BottomSheetForm from "../../BottomSheet/BottomSheetComponent";
import CustomersList from "./components/CustomerList";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../colors";
import { NewUserData } from "../../../types";
import useFetchData from "../../../hooks/calendar/useFetchData";
import useSearchHandler from "../../../hooks/useSearchHandler";

function SalonCustomers() {
  const salonCtx = useContext(SaloonContext);
  const [index, setIndex] = useState(0);
  const { customers } = useFetchData();
  const [customersList, setCustomersList] = useState(customers);
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [customerInEdition, setCustomerInEdition] = useState<NewUserData>(null);
  const { searchFn } = useSearchHandler("customers");

  const searchPressHandler = (value: string) => {
    const result = searchFn(value);
    setCustomersList(result);
    value === "" && setCustomersList(salonCtx.fetchedCustomers);
  };

  const iconPressHandler = () => {
    setIndex(2);
    setBottomSheetVisible(true);
  };
  useEffect(() => {
    setCustomersList(customers);
  }, [customers]);
  const hideBottomSheetHandler = () => {
    setIndex(0);
    setBottomSheetVisible(false);
    setCustomerInEdition(null);
  };
  const onEditCustomerPress = (customer: NewUserData) => {
    setBottomSheetVisible(true);
    setIndex(2);
    setCustomerInEdition(customer);
  };
  return (
    <>
      <SaloonCustomersListTools
        searchPressHandler={searchPressHandler}
        iconPressHandler={iconPressHandler}
      />

      <CustomersList
        customers={customersList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onEditCustomerPress={onEditCustomerPress}
      />

      <FloatingAction
        color={colors.secondary}
        showBackground={false}
        overlayColor={"#9ea4ab5d"}
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
            customerInEdition={customerInEdition}
            editing={!!customerInEdition ? true : false}
          />
        </BottomSheetForm>
      ) : null}
    </>
  );
}

export default SalonCustomers;
