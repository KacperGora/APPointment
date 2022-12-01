import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import AddNewCustomerForm from "./AddNewCustomerForm";
import { colors } from "../../colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
type AddNewCustomerBottomSheetProps = {
  index: number;
  setIndex: any;
  customerName?: string;
};
const AddNewCustomerBottomSheet: React.FC<AddNewCustomerBottomSheetProps> = ({
  index,
  setIndex,
  customerName,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "90%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const iconPressHandler = () => {
    if (index === 1) {
      setIndex(0);
    } else setIndex(1);
    Keyboard.dismiss();
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={{ backgroundColor: colors.primary }}
      backgroundStyle={{ backgroundColor: "transparent" }}
    >
      <KeyboardAwareScrollView
        style={styles.contentContainer}
        extraScrollHeight={60}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <AddNewCustomerForm
          hideBottomModal={iconPressHandler}
          customerName={customerName}
        />
      </KeyboardAwareScrollView>
    </BottomSheet>
  );
};
export default AddNewCustomerBottomSheet;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    backgroundColor: "white",
    shadowRadius: 4,
  },
});
