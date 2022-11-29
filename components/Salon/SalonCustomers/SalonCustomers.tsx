import {
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { colors } from "../../colors";
import AddNewCustomerForm from "./AddNewCustomerForm";

import BottomSheet from "@gorhom/bottom-sheet";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import CustomersList from "./CustomerList";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import SaloonCustomersListTools from "./SaloonCustomersTools";
import { SaloonContext } from "../../../store/SaloonStore";
import useGetCustomers from "../../../hooks/Salon/useGetCustomers";
function SalonCustomers() {
  const [index, setIndex] = useState(0);
  const salonCtx = useContext(SaloonContext);
  const snapPoints = useMemo(() => ["3%", "80%"], []);
  const [customers, setCustomers] = useState(salonCtx.customers);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const searchInputChangeHandler = (value: string) => {
    setSearchValue(value);
  };

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const bottomSheetRef = useRef<BottomSheet>(null);
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
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
        backgroundStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.contentContainer}>
          <AddNewCustomerForm hideBottomModal={iconPressHandler} />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

export default SalonCustomers;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width - 10,

    alignSelf: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    alignItems: "center",
    padding: 24,
    margin: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    backgroundColor: "white",
    shadowRadius: 4,
  },
  singleInputLine: {
    flexDirection: "row",
    margin: 12,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    padding: 12,
  },
  preInputText: {
    fontWeight: "600",
    width: 120,
    borderRightColor: "red",
    borderRightWidth: 1,
  },
  input: {
    color: "black",
    width: 190,
  },
  headeing: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.greydark,
    opacity: 0.6,
    margin: 24,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: "#F3F4F9",
  },
  header: {
    alignItems: "center",
    // backgroundColor: "white",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
  },
  item: {
    padding: 20,
    justifyContent: "center",
    // backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
  },
});
