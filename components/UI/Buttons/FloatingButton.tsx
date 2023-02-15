import React, { useRef } from "react";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../colors";

const FloatingButton = ({ actions, onPress }) => {
  const floatingButtonRef = useRef<FloatingAction>();

  return (
    <FloatingAction
      actions={actions}
      color={colors.secondary}
      overlayColor={"#9ea4ab5d"}
      actionsPaddingTopBottom={1}
      ref={floatingButtonRef}
      onPressItem={actions.length > 0 ? onPress : null}
      onPressMain={actions.length === 0 ? onPress : null}
    />
  );
};
export default FloatingButton;
