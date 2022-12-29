import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheetProps } from "../../types";

const BottomSheetForm: React.FC<BottomSheetProps> = ({
  index,
  children,
  setIndex,
  onCloseBottomSheet,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "90%"], []);
  const onClosePressHandler = (index: number) => {
    setIndex(index);
  };

  return (
    <BottomSheet
      enablePanDownToClose
      onClose={onCloseBottomSheet}
      onChange={onClosePressHandler}
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: colors.primary }}
      backgroundStyle={{ backgroundColor: "transparent" }}
    >
      <KeyboardAwareScrollView
        style={styles.contentContainer}
        extraScrollHeight={30}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {children}
      </KeyboardAwareScrollView>
    </BottomSheet>
  );
};
export default React.memo(BottomSheetForm);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    backgroundColor: "white",
    shadowRadius: 4,
  },
});
