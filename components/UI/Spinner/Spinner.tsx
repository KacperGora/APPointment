import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";
import { colors } from "../../colors";

const Spinner = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Progress.Circle
        size={50}
        indeterminate={true}
        color={colors.primary}
        borderWidth={5}
      />
    </View>
  );
};
export default Spinner;
