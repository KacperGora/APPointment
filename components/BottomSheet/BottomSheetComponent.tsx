import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import React from "react";
import { View } from "react-native";
import { colors } from "../colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheetProps } from "../../types";
import { ScreenWidth, StyledViewBorder } from "../shared";

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
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
      <StyledViewBorder>
        <KeyboardAwareScrollView horizontal={false} scrollEnabled={false}>
          {children}
        </KeyboardAwareScrollView>
      </StyledViewBorder>
    </BottomSheet>
  );
};
export default React.memo(BottomSheetComponent);
