import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import React from "react";
import { LayoutAnimation, View } from "react-native";
import { colors } from "../colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheetProps } from "../../types";
import { ScreenWidth, StyledViewBorder } from "../shared";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  index,
  children,
  setIndex,
  onCloseBottomSheet,
}) => {
  const snapPoints = useMemo(() => ["30%", "90%"], []);
  const onClosePressHandler = (index: number) => {
    setIndex(index);
    LayoutAnimation.easeInEaseOut();
  };
  const onCloseBottomSheetHandler = () => {
    onCloseBottomSheet();
  };

  return (
    <BottomSheet
      enablePanDownToClose
      onClose={onCloseBottomSheetHandler}
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
