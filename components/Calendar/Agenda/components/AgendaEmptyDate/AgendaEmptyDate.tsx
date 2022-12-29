import React from "react";
import { StyleSheet, View } from "react-native";
import RegularText16 from "../../../../UI/Text/RegularText";

const AgendaEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <RegularText16 textStyles={{ color: "lightgray" }}>
        Brak spotkań w tym dniu
      </RegularText16>
    </View>
  );
};
export default React.memo(AgendaEmptyDate);
const styles = StyleSheet.create({
  emptyDate: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
});
