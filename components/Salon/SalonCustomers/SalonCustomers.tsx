import { Dimensions, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../colors";
import AddNewCustomerForm from "../../Settings/Customers/AddNewCustomerForm";

import BottomSheet from "@gorhom/bottom-sheet";
function SalonCustomers() {
  const [index, setIndex] = useState(0);
  const snapPoints = useMemo(() => ["3%", "85"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const iconPressHandler = () => {
    if (index === 1) {
      setIndex(0);
    } else setIndex(1);

    Keyboard.dismiss();
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ alignSelf: "flex-end" }}>
        <AntDesign
          onPress={iconPressHandler}
          name="adduser"
          size={28}
          color="black"
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
      >
        <View style={styles.contentContainer}>
          <AddNewCustomerForm hideBottomModal={iconPressHandler} />
        </View>
      </BottomSheet>
      <Text>Baza klientów:</Text>
    </View>
  );
}

export default SalonCustomers;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width - 10,
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
  },
});
