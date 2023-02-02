import React from "react";
import { FloatingAction } from "react-native-floating-action";
import { colors } from "../../colors";

const FloatingButton = ({ actions, onPress }) => (
  <FloatingAction
    actions={actions}
    color={colors.secondary}
    overlayColor={"#9ea4ab5d"}
    actionsPaddingTopBottom={1}
    onPressItem={actions.length > 0 ? onPress : null}
    onPressMain={actions.length === 0 ? onPress : null}
  />
);
export default FloatingButton;
