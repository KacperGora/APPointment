import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import React from "react";
import { LayoutAnimation, View } from "react-native";
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
  const snapPoints = useMemo(() => ["15%", "30%", "90%"], []);
  const onClosePressHandler = (index: number) => {
    setIndex(index);
    LayoutAnimation.easeInEaseOut();
  };

  return (
    <BottomSheet
      enablePanDownToClose
      onClose={() => onCloseBottomSheet()}
      onChange={onClosePressHandler}
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
