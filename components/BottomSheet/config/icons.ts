import { TextStyle } from "react-native";
import { Meeting } from "../../../types";
import { colors } from "../../colors";
const getIconsConfig = (
  eventMove: boolean,
  editEventHandler: () => void,
  deleteEventHandler: () => void,
  index: number
) => {
  const icons: {
    key: number;
    name: any;
    onPress: () => void;
    color: string;
    style?: TextStyle;
  }[] = [
    {
      key: 1,
      name: eventMove || index === 0 ? "checkcircleo" : "edit",
      onPress: editEventHandler,
      color: eventMove || index === 0 ? "green" : colors.greydark,
    },
    {
      key: 2,
      name: "delete",
      onPress: deleteEventHandler,
      color: eventMove || index === 0 ? "red" : colors.greydark,
      style: { marginLeft: 4, fontWeight: "bold" },
    },
  ];

  return icons;
};
export default getIconsConfig;
