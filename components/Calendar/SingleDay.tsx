import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
interface Props {
  day: Date | string | number;
}
const SingleDay: FunctionComponent<Props> = (props) => {
  console.log("singleday " + props.day);
  return (
    <View style={{ backgroundColor: "blue", paddingTop: 150 }}>
      <Text style={{ fontSize: 24 }}>Hej wybrałeś dzień</Text>
    </View>
  );
};
export default SingleDay;
