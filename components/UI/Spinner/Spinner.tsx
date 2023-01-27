import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";
import { colors } from "../../colors";

const Spinner = ({ size, borderWidth }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Progress.Circle
        size={size}
        indeterminate={true}
        color={colors.primary}
        borderWidth={borderWidth}
      />
    </View>
  );
};
export default Spinner;
