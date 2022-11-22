import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { colors } from "../../colors";
import React from "react";
const Spinner = () => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
});
